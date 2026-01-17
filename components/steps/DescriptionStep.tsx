'use client';

import { useState } from 'react';
import { useAppBuilder } from '@/lib/store';
import { motion } from 'framer-motion';

interface DescriptionStepProps {
  onNext: () => Promise<void>;
}

export function DescriptionStep({ onNext }: DescriptionStepProps) {
  const { appDescription, setAppDescription } = useAppBuilder();
  const [isLoading, setIsLoading] = useState(false);

  const examples = [
    '📱 A mobile-friendly todo list app with cloud sync',
    '🛒 An e-commerce store with product search and checkout',
    '💬 A real-time chat application for teams',
    '📊 A dashboard for tracking project analytics',
    '🎵 A music playlist manager with search and recommendations',
  ];

  const handleNext = async () => {
    if (!appDescription.trim()) return;
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
          <h2 className="text-3xl font-bold mb-2">What do you want to build?</h2>
          <p className="text-slate-400">
            Describe the app you'd like to create. Be specific about the main purpose and features.
          </p>
        </div>

        {/* Description input */}
        <div className="mb-6">
          <textarea
            value={appDescription}
            onChange={(e) => setAppDescription(e.target.value)}
            placeholder="E.g., A note-taking app that syncs across devices with AI-powered organization..."
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 min-h-32 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        {/* Examples */}
        <div className="mb-8">
          <p className="text-sm text-slate-400 mb-3">Or try one of these examples:</p>
          <div className="grid grid-cols-1 gap-2">
            {examples.map((example, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setAppDescription(example)}
                className="p-3 text-left bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 rounded-lg transition-colors text-sm"
              >
                {example}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Next button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          disabled={!appDescription.trim() || isLoading}
          className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating questions...' : 'Continue →'}
        </motion.button>

        {/* Info box */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-sm text-blue-300">
            <span className="font-semibold">💡 Tip:</span> The more specific you are, the better the AI can understand your needs. Mention specific features, user types, and technologies if you have preferences.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
