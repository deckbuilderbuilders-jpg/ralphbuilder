'use client';

import { useState } from 'react';
import { useAppBuilder } from '@/lib/store';
import { motion } from 'framer-motion';

interface PRDStepProps {
  onNext: () => Promise<void>;
  onBack: () => void;
}

export function PRDStep({ onNext, onBack }: PRDStepProps) {
  const { prd, setPrd } = useAppBuilder();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
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
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Review Your App Specification</h2>
          <p className="text-slate-400">
            This is the detailed specification we'll use to build your app. Feel free to edit if needed.
          </p>
        </div>

        {/* PRD Display/Edit */}
        <div className="mb-8 bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          {isEditing ? (
            <textarea
              value={prd}
              onChange={(e) => setPrd(e.target.value)}
              className="w-full h-96 p-6 bg-slate-800 border-0 text-white font-mono text-sm resize-none focus:outline-none"
            />
          ) : (
            <div className="p-6 prose prose-invert max-w-none">
              <div className="text-white whitespace-pre-wrap font-mono text-sm leading-relaxed">
                {prd}
              </div>
            </div>
          )}
        </div>

        {/* Edit toggle */}
        <div className="mb-8 flex justify-end">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
          >
            {isEditing ? '✓ Done editing' : '✏️ Edit specification'}
          </button>
        </div>

        {/* Info box */}
        <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-sm text-blue-300">
            <span className="font-semibold">📋 What's next:</span> We'll estimate the cost and number of iterations needed to build your app, then you can approve the build.
          </p>
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
            disabled={!prd || isLoading}
            className="flex-1 btn-primary py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Estimating costs...' : 'Continue to Cost Estimate →'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
