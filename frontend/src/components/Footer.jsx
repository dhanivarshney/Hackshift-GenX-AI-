import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNexus } from '../context/NexusContext';

export default function Footer() {
  const { goBack } = useNexus();

  return (
    <footer className="mt-auto sticky bottom-0 z-30 bg-[#0d0d0d]/95 backdrop-blur-md border-t border-slate-800/80 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
        {/* Left: Redundant Back Navigation Button / Link */}
        <div className="flex items-center space-x-3">
          <button
            onClick={goBack}
            className="neon-back-footer-btn group relative"
            title="Go Back"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#00ffff] transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back</span>
            <span className="neon-tooltip">Go Back</span>
          </button>
          <span className="text-slate-500 hidden sm:inline text-[11px]">• Previous Screen</span>
        </div>

        {/* Center: Protocol Badge */}
        <div className="hidden md:flex items-center space-x-2 text-slate-400 text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="font-mono text-slate-300">NexusIQ Lineage Protocol</span>
          <span className="text-slate-600">|</span>
          <span>Autonomous Intent &amp; Proof-of-Work</span>
        </div>

        {/* Right: Track Information */}
        <div className="flex items-center space-x-3 text-[11px] text-slate-400">
          <span className="hidden sm:inline">Track 1: Alumni Network</span>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <span className="text-slate-500 font-mono">v1.0.0</span>
        </div>
      </div>
    </footer>
  );
}
