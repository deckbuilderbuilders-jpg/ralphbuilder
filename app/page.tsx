'use client';

import { useState, useEffect } from 'react';
import { useAppBuilder } from '@/lib/store';
import { DescriptionStep } from '@/components/steps/DescriptionStep';
import { ClarificationStep } from '@/components/steps/ClarificationStep';
import { PRDStep } from '@/components/steps/PRDStep';
import { CostStep } from '@/components/steps/CostStep';
import { BuildingStep } from '@/components/steps/BuildingStep';
import { CompleteStep } from '@/components/steps/CompleteStep';
import { motion } from 'framer-motion';

export default function Builder() {
  const {
    currentStep,
    setCurrentStep,
    appDescription,
    setQuestions,
    setPrd,
    setEstimate,
    approveCost,
    setBuildProgress,
    addBuildLog,
    setBuiltAppCode,
  } = useAppBuilder();

  const [isLoading, setIsLoading] = useState(false);

  // Step handlers
  const handleDescriptionNext = async () => {
    setIsLoading(true);
    addBuildLog('Generating clarifying questions...');
    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appDescription }),
      });

      if (!response.ok) throw new Error('Failed to generate questions');
      const data = await response.json();
      setQuestions(data.questions);
      addBuildLog(`Generated ${data.questions.length} clarifying questions`);
      setCurrentStep('clarification');
    } catch (error) {
      addBuildLog(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClarificationNext = async () => {
    setIsLoading(true);
    addBuildLog('Generating PRD from answers...');
    try {
      const { answers, appDescription: desc, questions } = useAppBuilder.getState();
      const questionsAndAnswers: Record<string, string> = {};
      questions.forEach((q) => {
        questionsAndAnswers[q] = answers[q];
      });

      const response = await fetch('/api/generate-prd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appDescription: desc, questionsAndAnswers }),
      });

      if (!response.ok) throw new Error('Failed to generate PRD');
      const data = await response.json();
      setPrd(data.prd);
      addBuildLog('PRD generated successfully');
      setCurrentStep('prd');
    } catch (error) {
      addBuildLog(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePRDNext = async () => {
    setIsLoading(true);
    addBuildLog('Estimating costs...');
    try {
      const { prd } = useAppBuilder.getState();
      const response = await fetch('/api/estimate-cost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prd }),
      });

      if (!response.ok) throw new Error('Failed to estimate cost');
      const data = await response.json();
      setEstimate(data.estimates.totalTokens, data.pricing.totalCost);
      addBuildLog(
        `Cost estimated: $${data.pricing.totalCost} for ~${data.estimates.totalTokens} tokens`
      );
      setCurrentStep('cost');
    } catch (error) {
      addBuildLog(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCostApproval = async () => {
    approveCost();
    setCurrentStep('payment');
    // In production, redirect to Stripe checkout
    setCurrentStep('building');
    await handleRalphBuild();
  };

  const handleRalphBuild = async () => {
    setIsLoading(true);
    setBuildProgress(5);
    addBuildLog('Initializing Ralph loop...');

    try {
      const { prd } = useAppBuilder.getState();

      // Simulate progress
      const progressInterval = setInterval(() => {
        setBuildProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 20;
        });
      }, 2000);

      const response = await fetch('/api/run-ralph', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prd, appName: appDescription, maxIterations: 15 }),
      });

      clearInterval(progressInterval);

      if (!response.ok) throw new Error('Failed to run Ralph');
      const data = await response.json();

      setBuiltAppCode(data.code);
      setBuildProgress(100);
      addBuildLog('✓ App built successfully!');
      addBuildLog(`Completed in ${data.iterations} iterations`);
    } catch (error) {
      addBuildLog(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuildingComplete = () => {
    setCurrentStep('complete');
  };

  const stepIndicators = [
    { key: 'description', label: 'Describe', number: 1 },
    { key: 'clarification', label: 'Clarify', number: 2 },
    { key: 'prd', label: 'Review', number: 3 },
    { key: 'cost', label: 'Estimate', number: 4 },
    { key: 'payment', label: 'Pay', number: 5 },
    { key: 'building', label: 'Build', number: 6 },
    { key: 'complete', label: 'Done', number: 7 },
  ];

  const currentStepIndex = stepIndicators.findIndex((s) => s.key === currentStep);

  return (
    <div className="min-h-screen py-12 px-6">
      {/* Step indicators */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="flex items-center justify-between mb-8">
          {stepIndicators.map((step, index) => (
            <motion.div key={step.key} className="flex items-center flex-1">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`step-circle ${
                  index < currentStepIndex
                    ? 'completed'
                    : index === currentStepIndex
                    ? 'active'
                    : ''
                }`}
              >
                {index < currentStepIndex ? '✓' : step.number}
              </motion.div>
              <p className="text-sm text-slate-400 ml-2 whitespace-nowrap">{step.label}</p>
              {index < stepIndicators.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: index < currentStepIndex ? 1 : 0,
                  }}
                  className="flex-1 h-1 mx-4 bg-gradient-to-r from-green-500 to-cyan-500 rounded origin-left"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-6xl mx-auto">
        {currentStep === 'description' && (
          <DescriptionStep onNext={handleDescriptionNext} />
        )}
        {currentStep === 'clarification' && (
          <ClarificationStep
            onNext={handleClarificationNext}
            onBack={() => setCurrentStep('description')}
          />
        )}
        {currentStep === 'prd' && (
          <PRDStep onNext={handlePRDNext} onBack={() => setCurrentStep('clarification')} />
        )}
        {currentStep === 'cost' && (
          <CostStep
            onApprove={handleCostApproval}
            onBack={() => setCurrentStep('prd')}
          />
        )}
        {currentStep === 'building' && <BuildingStep onComplete={handleBuildingComplete} />}
        {currentStep === 'complete' && <CompleteStep />}
      </div>
    </div>
  );
}
