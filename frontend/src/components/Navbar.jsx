import React from 'react';
import { useNexus } from '../context/NexusContext';
import { Sparkles, Network, Activity } from 'lucide-react';

export default function Navbar() {
  const { personas, activePersona, switchRole, triggerCelebration, isAuthenticated } = useNexus();

  return (
    <div className="bg-slate-950/90 border-b border-slate-800/80 px-4 py-2 text-xs flex items-center justify-between text-slate-300">
      <div className="flex items-center space-x-2.5">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-bold text-white tracking-wide flex items-center space-x-1.5">
          <Network className="w-3.5 h-3.5 text-indigo-400" />
          <span>NexusIQ Network Engine</span>
        </span>
        <span className="text-slate-600 hidden sm:inline">|</span>
        <span className="text-slate-400 hidden sm:inline">
          Track 1: Building a Network, Not a Directory
        </span>
      </div>

      <div className="flex items-center space-x-3">
        {/* Quick Demo Switcher */}
        {isAuthenticated && (
          <div className="hidden lg:flex items-center space-x-1 text-[11px] font-medium bg-slate-900 border border-slate-800 rounded-lg p-1">
            <span className="text-slate-500 px-1.5 font-bold uppercase text-[9px] flex items-center space-x-1">
              <Activity className="w-3 h-3 text-indigo-400" />
              <span>Demo Switch:</span>
            </span>
            {personas.map((p) => {
              const isCurrent = p.id === activePersona.id;
              return (
                <button
                  key={p.id}
                  onClick={() => switchRole(p.id)}
                  className={`px-2 py-0.5 rounded transition ${
                    isCurrent
                      ? 'bg-indigo-600 text-white font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {p.roleLabel}
                </button>
              );
            })}
          </div>
        )}

        <button
          onClick={triggerCelebration}
          className="flex items-center space-x-1 px-2.5 py-1 bg-indigo-600/25 hover:bg-indigo-600/40 text-indigo-300 rounded-lg border border-indigo-500/40 text-[11px] font-semibold transition shadow-sm"
          title="Celebrate Campus Synergy"
        >
          <Sparkles className="w-3 h-3 text-indigo-400" />
          <span>Pitch Aha!</span>
        </button>
      </div>
    </div>
  );
}
