import React from 'react';
import { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Ralph Builder - No-Code App Creation',
  description: 'Build production-ready apps without coding. Powered by Claude and the Ralph technique.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white min-h-screen">
        <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-slate-950">
                  ⚙
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Ralph Builder
                </h1>
              </div>
              <p className="text-slate-400 text-sm">Powered by Claude</p>
            </div>
          </div>
        </nav>
        
        <main className="min-h-screen">
          {children}
        </main>

        <footer className="border-t border-slate-800 bg-slate-900/30 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <p className="text-slate-400 text-sm text-center">
              Built with Claude AI • Powered by the Ralph Wiggum technique
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
