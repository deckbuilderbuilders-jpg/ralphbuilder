'use client';

import { useState } from 'react';
import { useAppBuilder } from '@/lib/store';
import { motion } from 'framer-motion';

interface ClarificationStepProps {
  onNext: () => Promise<void>;
  onBack: () => void;
}

export function ClarificationStep({ onNext, onBack }: ClarificationStepProps) {
  const { questions, answers, setAnswer } = useAppBuilder();
  const [isLoading, setIsLoading] = useState(false);
  const allAnswered = questions.every((q) => answers[q]);

  const handleNext = async () => {
    if (!allAnswered) return;
    setIsLoading(true);
    try {
      await onNext();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Let's clarify the details</h2>
          <p className="text-slate-400">
            Answer these questions to help us understand your app better.
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-6 mb-8">
          {questions.map((question, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800 border border-slate-700 rounded-lg p-6"
            >
              <div className="flex items-start gap-4">
                <div className="step-circle w-8 h-8 flex-shrink-0 bg-cyan-500/20 border-cyan-500 text-cyan-400 text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <label className="block text-white font-medium mb-3">
                    {question}
                  </label>
                  <textarea
                    value={answers[question] || ''}
                    onChange={(e) => setAnswer(question, e.target.value)}
                    placeholder="Your answer..."
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 min-h-20 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 btn-secondary"
          >
            ← Back
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            disabled={!allAnswered || isLoading}
            className="flex-1 btn-primary py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating PRD...' : 'Continue to Review →'}
          </motion.button>
        </div>

        {/* Progress indicator */}
        <div className="mt-8 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-cyan-300">
              Answered: <span className="font-semibold">{Object.values(answers).filter(Boolean).length}</span> of{' '}
              <span className="font-semibold">{questions.length}</span>
            </span>
            <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(Object.values(answers).filter(Boolean).length / questions.length) * 100}%`,
                }}
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
