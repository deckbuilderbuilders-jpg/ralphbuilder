'use client';

import { useEffect, useRef } from 'react';
import { useAppBuilder } from '@/lib/store';
import { motion } from 'framer-motion';

interface BuildingStepProps {
  onComplete: () => void;
}

export function BuildingStep({ onComplete }: BuildingStepProps) {
  const { buildProgress, buildLog, appDescription } = useAppBuilder();
  const logEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [buildLog]);

  // Check if building is complete
  useEffect(() => {
    if (buildProgress >= 100 && buildLog.length > 0) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [buildProgress, buildLog.length, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Building Your App</h2>
          <p className="text-slate-400">
            Sit back and watch Ralph build your app using the Claude AI.
          </p>
        </div>

        {/* Progress bar */}
        <motion.div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">Building Progress</span>
            <span className="text-cyan-400 font-semibold">{buildProgress}%</span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${buildProgress}%` }}
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 animate-pulse-glow"
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Build log */}
        <div className="mb-8">
          <h3 className="text-white font-semibold mb-4">Build Log</h3>
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm">
            {buildLog.length === 0 ? (
              <div className="text-slate-500 flex items-center justify-center h-full">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="inline-block text-3xl mb-2"
                  >
                    ⚙️
                  </motion.div>
                  <p>Initializing Ralph loop...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                {buildLog.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-slate-300"
                  >
                    <span className="text-cyan-400">{log.split(']')[0]}]</span>
                    {log.substring(log.indexOf(']') + 1)}
                  </motion.div>
                ))}
                <div ref={logEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Status card */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-slate-800 border border-slate-700 rounded-lg p-6"
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="text-3xl"
            >
              ⚙️
            </motion.div>
            <div>
              <p className="text-white font-semibold">Ralph is working hard...</p>
              <p className="text-slate-400 text-sm">
                Building: <span className="text-cyan-400">{appDescription.substring(0, 50)}...</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tips */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-sm text-blue-300">
            <span className="font-semibold">💡 Fun fact:</span> The Ralph technique was named after Ralph Wiggum from The Simpsons—a character known for persistent, naive determination. That's exactly what your AI is doing right now!
          </p>
        </div>
      </div>
    </motion.div>
  );
}
