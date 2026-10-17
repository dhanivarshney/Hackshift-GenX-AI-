import React, { useState } from 'react';
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
  ChevronDown,
  Menu,
  X,
  Sparkles,
  CheckCircle2
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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPortalDropdownOpen, setIsPortalDropdownOpen] = useState(false);

  const pendingReferrals = referrals.filter(r => r.status === 'pending').length;

  const roleThemeMap = {
    indigo: {
      badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      activeBtn: 'bg-indigo-600 text-white shadow-indigo-600/30',
      dot: 'bg-indigo-400'
    },
    emerald: {
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      activeBtn: 'bg-emerald-600 text-white shadow-emerald-600/30',
      dot: 'bg-emerald-400'
    },
    amber: {
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      activeBtn: 'bg-amber-600 text-white shadow-amber-600/30',
      dot: 'bg-amber-400'
    },
    purple: {
      badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      activeBtn: 'bg-purple-600 text-white shadow-purple-600/30',
      dot: 'bg-purple-400'
    },
    cyan: {
      badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      activeBtn: 'bg-cyan-600 text-white shadow-cyan-600/30',
      dot: 'bg-cyan-400'
    },
    rose: {
      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      activeBtn: 'bg-rose-600 text-white shadow-rose-600/30',
      dot: 'bg-rose-400'
    }
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

  const currentTheme = roleThemeMap[activePersona.accentColor] || roleThemeMap.indigo;

  return (
    <header className="sticky top-0 z-40 bg-[#060911]/95 backdrop-blur-md border-b border-slate-800">
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
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shadow-sm ${currentTheme.badge}`}
              >
                {activePersona.portalTitle}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">
              {activePersona.companyOrCollege} • Network Node
            </p>
          </div>
        </div>

        {/* Context-Aware 6-Role Switcher with Portal Badges (Desktop) */}
        <div className="hidden lg:flex items-center bg-slate-900/90 border border-slate-800 rounded-2xl p-1 shadow-inner">
          <span className="text-[10px] font-bold uppercase text-slate-500 px-2.5 flex items-center space-x-1">
            <span>Portal:</span>
          </span>
          <div className="flex space-x-1 text-xs">
            {personas.map((p) => {
              const isSelected = p.id === activePersona.id;
              const theme = roleThemeMap[p.accentColor] || roleThemeMap.indigo;

              return (
                <button
                  key={p.id}
                  onClick={() => switchRole(p.id)}
                  className={`px-2.5 py-1 rounded-xl transition text-xs whitespace-nowrap flex items-center space-x-1.5 shadow-sm ${
                    isSelected
                      ? `${theme.activeBtn} font-bold shadow-md`
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                  title={`Switch to ${p.portalTitle} (${p.name})`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${theme.dot} ${isSelected ? 'animate-pulse' : 'opacity-70'}`}></span>
                  <span>{p.roleLabel}</span>
                  {isSelected && (
                    <span className="text-[9px] bg-black/20 px-1.5 py-0.2 rounded font-mono font-medium">
                      Active
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current User Profile, Streak, Intent & Actions */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          
          {/* Gamification Streak & Karma */}
          <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs shadow-sm">
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
            <span className="text-slate-400 font-medium">Intent:</span>
            <span className="font-bold text-white max-w-[120px] truncate">{activePersona.activeIntent}</span>
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
            <div className={`w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold flex items-center justify-center text-xs shadow-sm`}>
              {activePersona.avatar}
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-white leading-tight">{activePersona.name}</div>
              <div className="text-[10px] text-slate-400 leading-tight truncate max-w-[110px]">
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

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition"
            title="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer (Visible when hamburger open) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 px-4 py-4 space-y-4 animate-in slide-in-from-top-2 duration-150">
          
          {/* Mobile Role Switcher with Portal Badges */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider flex items-center space-x-1.5">
              <span>Switch Active Workspace Portal:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {personas.map((p) => {
                const isSelected = p.id === activePersona.id;
                const theme = roleThemeMap[p.accentColor] || roleThemeMap.indigo;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      switchRole(p.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`p-2 rounded-xl border text-left text-xs transition flex flex-col justify-between ${
                      isSelected
                        ? `${theme.activeBtn} border-transparent font-bold shadow-md`
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{p.roleLabel}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`}></span>
                    </div>
                    <span className="text-[10px] opacity-80 truncate mt-0.5">{p.portalTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Streak & Active Intent */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs">
            <div className="flex items-center space-x-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-bold text-amber-400">{activePersona.streak}d Streak</span>
              <span className="text-slate-600">|</span>
              <Award className="w-4 h-4 text-indigo-400" />
              <span className="font-mono text-indigo-300">{activePersona.karma} Karma</span>
            </div>
            <button
              onClick={() => {
                setIsIntentModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-between bg-indigo-950/60 border border-indigo-500/30 p-2 rounded-xl text-indigo-300"
            >
              <span className="truncate">Intent: {activePersona.activeIntent}</span>
              <Zap className="w-3.5 h-3.5 text-indigo-400 ml-1 shrink-0" />
            </button>
          </div>

        </div>
      )}

      {/* Main Navigation Tabs */}
      <div className="border-t border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-3 sm:space-x-6 text-sm font-medium overflow-x-auto custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setIsMobileMenuOpen(false);
                }}
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
