'use client';

import { useAppBuilder } from '@/lib/store';
import { motion } from 'framer-motion';
import { FiCheck, FiX } from 'react-icons/fi';

interface CostStepProps {
  onApprove: () => void;
  onBack: () => void;
}

export function CostStep({ onApprove, onBack }: CostStepProps) {
  const { estimatedTokens, estimatedCost, costApproved, approveCost } = useAppBuilder();

  const handleApprove = () => {
    approveCost();
    onApprove();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Cost Estimate</h2>
          <p className="text-slate-400">
            Here's what it will cost to build your app using the Ralph technique.
          </p>
        </div>

        {/* Main cost card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-slate-800 border border-cyan-500/50 rounded-lg p-8 mb-8"
        >
          <div className="text-center">
            <p className="text-slate-400 text-sm mb-2">Estimated Total Cost</p>
            <div className="text-5xl font-bold mb-4">
              <span className="text-3xl text-cyan-400">$</span>
              <span className="text-white">{estimatedCost.toFixed(2)}</span>
            </div>
            <p className="text-slate-400 text-sm">
              for approximately {estimatedTokens.toLocaleString()} API tokens
            </p>
          </div>
        </motion.div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800 border border-slate-700 rounded-lg p-4"
          >
            <p className="text-slate-400 text-sm mb-1">Iterations</p>
            <p className="text-2xl font-bold">~15</p>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800 border border-slate-700 rounded-lg p-4"
          >
            <p className="text-slate-400 text-sm mb-1">Build Time</p>
            <p className="text-2xl font-bold">~10 min</p>
          </motion.div>
        </div>

        {/* Features included */}
        <div className="mb-8">
          <h3 className="text-white font-semibold mb-4">What's Included</h3>
          <div className="space-y-2">
            {[
              'Full source code',
              'Working application',
              'Production-ready code',
              'Tests and validation',
              'Git history with commits',
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 text-slate-300"
              >
                <FiCheck className="text-green-400 flex-shrink-0" />
                {feature}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-sm text-yellow-300">
            <span className="font-semibold">⚠️ Important:</span> This is an estimate based on your app's complexity. Actual costs may vary slightly depending on how the AI iterates during development.
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
            onClick={handleApprove}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
          >
            ✓ Approve & Pay ${estimatedCost.toFixed(2)}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
