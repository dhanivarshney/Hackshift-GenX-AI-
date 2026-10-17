import React, { useState } from 'react';
import { useNexus } from '../context/NexusContext';
import { X, Zap, Target, Sparkles, Check } from 'lucide-react';

const PRESET_INTENTS = [
  'Seeking SDE Referral (Backend / Go)',
  'Hiring 2 Interns for High-Throughput Routing Team',
  'Funding Campus Bounties & Startups ($5k - $25k)',
  'Seeking Industry Co-Guide for Capstone Research',
  'Offering 15-Min System Design Flash Reviews',
  'Hiring Top 5% Vetted Builders (Direct Fast-Track)',
  'Connecting Research Squads with Alum Mentors'
];

export default function IntentModal() {
  const { isIntentModalOpen, setIsIntentModalOpen, activePersona, updateIntent } = useNexus();
  const [selectedIntent, setSelectedIntent] = useState(activePersona.activeIntent);
  const [customIntent, setCustomIntent] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  if (!isIntentModalOpen) return null;

  const handleSave = () => {
    const finalIntent = isCustom && customIntent.trim() ? customIntent.trim() : selectedIntent;
    updateIntent(finalIntent);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl relative overflow-hidden glow-indigo">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Broadcast Your Active Intent</h3>
              <p className="text-[11px] text-slate-400">Your intent informs matches in the Dashboard & Graph.</p>
            </div>
          </div>
          <button
            onClick={() => setIsIntentModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Persona info */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-300 font-bold flex items-center justify-center text-[10px]">
              {activePersona.avatar}
            </div>
            <div>
              <span className="font-bold text-white">{activePersona.name}</span>
              <span className="text-slate-400 ml-1.5 font-mono text-[10px]">({activePersona.portalTitle})</span>
            </div>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
            Active Pulse
          </span>
        </div>

        {/* Presets */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300">Choose from High-Signal Presets:</label>
          <div className="space-y-1.5 max-h-56 overflow-y-auto custom-scrollbar pr-1">
            {PRESET_INTENTS.map((intent, idx) => {
              const isSelected = !isCustom && selectedIntent === intent;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setIsCustom(false);
                    setSelectedIntent(intent);
                  }}
                  className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer text-xs transition ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-white font-medium shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Target className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                    <span>{intent}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Input */}
        <div className="space-y-1.5 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300">Or type custom high-signal intent:</label>
            {isCustom && <span className="text-[10px] text-indigo-400 font-mono">Custom mode active</span>}
          </div>
          <div className="relative">
            <input
              type="text"
              value={customIntent}
              onChange={(e) => {
                setCustomIntent(e.target.value);
                setIsCustom(true);
              }}
              onFocus={() => setIsCustom(true)}
              placeholder="e.g. Sponsoring 2 Final-Year Cloud Projects ($1,000 grant)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            onClick={() => setIsIntentModalOpen(false)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-indigo-600/30 flex items-center space-x-1.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Save & Broadcast Intent</span>
          </button>
        </div>
      </div>
    </div>
  );
}
