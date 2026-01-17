'use client';

import { useState } from 'react';
import { useAppBuilder } from '@/lib/store';
import { motion } from 'framer-motion';
import { FiDownload, FiCopy, FiGithub } from 'react-icons/fi';

export function CompleteStep() {
  const { builtAppCode, builtAppUrl, appDescription, reset } = useAppBuilder();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(builtAppCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(builtAppCode));
    element.setAttribute('download', 'app.tsx');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full"
    >
      <div className="max-w-4xl mx-auto">
        {/* Success banner */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 p-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-2">Your App is Ready!</h2>
          <p className="text-green-300">
            Ralph successfully built a working application in 15 iterations.
          </p>
        </motion.div>

        {/* App details */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-slate-800 border border-slate-700 rounded-lg p-6"
        >
          <h3 className="text-white font-semibold mb-4">Project Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-slate-400 text-sm mb-1">Application</p>
              <p className="text-white font-medium">{appDescription.substring(0, 50)}...</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Status</p>
              <p className="flex items-center gap-2 text-white font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Production Ready
              </p>
            </div>
          </div>
        </motion.div>

        {/* Code preview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h3 className="text-white font-semibold mb-4">Source Code</h3>
          <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
            <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
              <p className="text-slate-400 text-sm font-mono">app.tsx</p>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className="p-2 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-white"
                  title="Copy code"
                >
                  <FiCopy size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="p-2 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-white"
                  title="Download code"
                >
                  <FiDownload size={18} />
                </motion.button>
              </div>
            </div>
            <div className="p-4 h-64 overflow-y-auto font-mono text-sm text-slate-300">
              {builtAppCode}
            </div>
          </div>
          {copied && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-sm text-green-400"
            >
              ✓ Copied to clipboard!
            </motion.p>
          )}
        </motion.div>

        {/* Next steps */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-lg"
        >
          <h3 className="text-white font-semibold mb-4">What's Next?</h3>
          <ol className="space-y-3 text-slate-300 text-sm">
            <li className="flex gap-3">
              <span className="text-cyan-400 font-semibold">1.</span>
              <span>Download your source code and review it</span>
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-400 font-semibold">2.</span>
              <span>Customize and deploy to your hosting platform</span>
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-400 font-semibold">3.</span>
              <span>Use Ralph again to iterate on features or build another app</span>
            </li>
          </ol>
        </motion.div>

        {/* Action buttons */}
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FiDownload />
            Download Code
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => reset()}
            className="flex-1 btn-secondary py-3 font-semibold"
          >
            Build Another App
          </motion.button>
        </div>

        {/* Footer message */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            Built with ❤️ using Ralph, Claude, and the power of AI
          </p>
        </div>
      </div>
    </motion.div>
  );
}
