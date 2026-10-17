import React from 'react';
import { useNexus } from '../context/NexusContext';
import {
  Network,
  Compass,
  Cpu,
  Briefcase,
  Inbox,
  Share2,
  Landmark,
  Zap,
  LogOut,
  Flame,
  Award,
  ChevronRight
} from 'lucide-react';

export default function Header() {
  const {
    personas,
    activePersona,
    activeView,
    setActiveView,
    switchRole,
    logout,
    setIsIntentModalOpen,
    bounties,
    referrals
  } = useNexus();

  const pendingReferrals = referrals.filter(r => r.status === 'pending').length;

  const roleBadgeStyles = {
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  };

  const navItems = [
    {
      id: 'dashboard',
      label: 'Intent Feed',
      icon: Compass,
      badge: 'Feed Radar'
    },
    {
      id: 'proof-of-work',
      label: 'Proof-of-Work Lab',
      icon: Cpu,
      badge: 'Anti-Spam',
      badgeClass: 'bg-emerald-500/20 text-emerald-300'
    },
    {
      id: 'bounties',
      label: 'Opportunity Exchange',
      icon: Briefcase,
      badge: `${bounties.length} Live`,
      badgeClass: 'bg-amber-500/20 text-amber-300'
    },
    {
      id: 'referrals',
      label: 'Decision Inbox',
      icon: Inbox,
      badge: pendingReferrals > 0 ? `${pendingReferrals} Pending` : 'All Clean',
      badgeClass: pendingReferrals > 0 ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-400'
    },
    {
      id: 'graph',
      label: 'Lineage Graph',
      icon: Share2,
      badge: 'Interactive'
    },
    {
      id: 'institution',
      label: 'Institution Hub',
      icon: Landmark,
      badge: 'Active Node'
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#060911]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Portal Tag */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
            <Network className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-black tracking-tight text-white">
                Nexus<span className="text-indigo-400">IQ</span>
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                  roleBadgeStyles[activePersona.accentColor] || roleBadgeStyles.indigo
                }`}
              >
                {activePersona.portalTitle}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">
              {activePersona.companyOrCollege} • Network Node
            </p>
          </div>
        </div>

        {/* 6-Role Switcher Pills with Portal Badges */}
        <div className="hidden xl:flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 shadow-inner">
          <span className="text-[10px] font-bold uppercase text-slate-500 px-2.5">Portal Switch:</span>
          <div className="flex space-x-1 text-xs">
            {personas.map((p) => {
              const isSelected = p.id === activePersona.id;
              return (
                <button
                  key={p.id}
                  onClick={() => switchRole(p.id)}
                  className={`px-2.5 py-1 rounded-lg transition text-xs whitespace-nowrap flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>{p.roleLabel}</span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current User Profile, Streak, Intent & Actions */}
        <div className="flex items-center space-x-3">
          
          {/* Gamification Streak & Karma */}
          <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <div className="flex items-center space-x-1 text-amber-400" title={`${activePersona.streak} Day Contribution Streak`}>
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold text-[11px]">{activePersona.streak}d</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center space-x-1 text-indigo-400" title={`${activePersona.karma} Network Karma Points`}>
              <Award className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px] font-bold">{activePersona.karma}</span>
            </div>
          </div>

          {/* Active Intent Pill */}
          <button
            onClick={() => setIsIntentModalOpen(true)}
            className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs hover:border-indigo-400 hover:bg-indigo-900/40 transition shadow-sm"
            title="Click to edit and broadcast your active intent"
          >
            <Zap className="w-3.5 h-3.5 text-indigo-400 animate-pulse shrink-0" />
            <span className="text-slate-300 font-medium">Intent:</span>
            <span className="font-bold text-white max-w-[130px] truncate">{activePersona.activeIntent}</span>
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold flex items-center justify-center text-xs shadow-sm">
              {activePersona.avatar}
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-white leading-tight">{activePersona.name}</div>
              <div className="text-[10px] text-slate-400 leading-tight truncate max-w-[120px]">
                {activePersona.branch || activePersona.roleLabel}
              </div>
            </div>
            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
              title="Sign Out to Gateway"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Main Navigation Tabs */}
      <div className="border-t border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-4 sm:space-x-6 text-sm font-medium overflow-x-auto custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`py-3 border-b-2 flex items-center space-x-2 transition whitespace-nowrap text-xs sm:text-sm ${
                  isActive
                    ? 'border-indigo-500 text-indigo-400 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      item.badgeClass || (isActive ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800 text-slate-400')
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
