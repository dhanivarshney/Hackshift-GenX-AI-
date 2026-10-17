import React, { useState } from 'react';
import { useNexus } from '../context/NexusContext';
import {
  GraduationCap,
  Briefcase,
  Rocket,
  BookOpen,
  Target,
  Landmark,
  ArrowRight,
  Zap,
  CheckCircle2,
  X,
  Sparkles,
  Shield,
  KeyRound,
  Users
} from 'lucide-react';

export default function Onboarding() {
  const { personas, loginAs } = useNexus();
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('password123');

  const roleIcons = {
    student: GraduationCap,
    alumnus: Briefcase,
    founder: Rocket,
    faculty: BookOpen,
    recruiter: Target,
    institution: Landmark
  };

  const roleColors = {
    student: {
      borderHover: 'hover:border-indigo-500/60',
      iconBg: 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30',
      tag: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      textAccent: 'text-indigo-400',
      btnGlow: 'from-indigo-600 to-purple-600'
    },
    alumnus: {
      borderHover: 'hover:border-emerald-500/60',
      iconBg: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30',
      tag: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      textAccent: 'text-emerald-400',
      btnGlow: 'from-emerald-600 to-teal-600'
    },
    founder: {
      borderHover: 'hover:border-amber-500/60',
      iconBg: 'bg-amber-600/20 text-amber-400 border-amber-500/30',
      tag: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      textAccent: 'text-amber-400',
      btnGlow: 'from-amber-600 to-orange-600'
    },
    faculty: {
      borderHover: 'hover:border-purple-500/60',
      iconBg: 'bg-purple-600/20 text-purple-400 border-purple-500/30',
      tag: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      textAccent: 'text-purple-400',
      btnGlow: 'from-purple-600 to-pink-600'
    },
    recruiter: {
      borderHover: 'hover:border-cyan-500/60',
      iconBg: 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30',
      tag: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      textAccent: 'text-cyan-400',
      btnGlow: 'from-cyan-600 to-blue-600'
    },
    institution: {
      borderHover: 'hover:border-rose-500/60',
      iconBg: 'bg-rose-600/20 text-rose-400 border-rose-500/30',
      tag: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      textAccent: 'text-rose-400',
      btnGlow: 'from-rose-600 to-red-600'
    }
  };

  const handleOpenModal = (roleId) => {
    setSelectedRoleId(roleId);
    setEmailInput(`${roleId}@apex.edu`);
    setPasswordInput('password123');
    setIsModalOpen(true);
  };

  const handleExecuteLogin = (e) => {
    if (e) e.preventDefault();
    setIsModalOpen(false);
    loginAs(selectedRoleId || 'student');
  };

  const activePersonaModal = personas.find(p => p.id === selectedRoleId) || personas[0];
  const ActiveIcon = roleIcons[activePersonaModal.id] || GraduationCap;
  const activeColorTheme = roleColors[activePersonaModal.id] || roleColors.student;

  return (
    <section className="flex-1 flex flex-col justify-center items-center px-4 py-12 max-w-7xl mx-auto w-full">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold shadow-inner">
          <Zap className="w-3.5 h-3.5 text-indigo-400" />
          <span>Multi-Portal Authentication Gateway</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
          Building a Network,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
            Not a Directory.
          </span>
        </h1>
        
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          NexusIQ connects students, alumni, faculty, founders, recruiters, and institutions through
          <b className="text-white"> verified GitHub proof-of-work, active reciprocation intent, and direct opportunity exchange</b>.
        </p>

        {/* Global Impact Micro-Counter */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
          <span className="flex items-center space-x-1.5 bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>4,820 Active Campus Nodes</span>
          </span>
          <span className="flex items-center space-x-1.5 bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
            <span>342 Warm Referrals Dispatched</span>
          </span>
          <span className="flex items-center space-x-1.5 bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>₹4.2L Micro-Bounties Paid</span>
          </span>
        </div>
      </div>

      {/* 6 Role Portals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {personas.map((persona) => {
          const Icon = roleIcons[persona.id] || GraduationCap;
          const theme = roleColors[persona.id] || roleColors.student;

          return (
            <div
              key={persona.id}
              onClick={() => handleOpenModal(persona.id)}
              className={`glass-panel glass-card-hover rounded-3xl p-6 sm:p-7 cursor-pointer border border-slate-800/80 ${theme.borderHover} transition-all duration-300 relative overflow-hidden group flex flex-col justify-between`}
            >
              <div>
                {/* Portal Icon & Preset User Badge */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-13 h-13 rounded-2xl ${theme.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${theme.tag}`}>
                    Demo: {persona.name.split(' ')[0]}
                  </span>
                </div>

                {/* Portal Title & Target Details */}
                <h3 className={`text-lg font-bold text-white group-hover:${theme.textAccent} transition`}>
                  {persona.portalTitle}
                </h3>
                
                <div className="text-xs text-slate-400 font-medium mt-1">
                  {persona.name} • <span className="text-slate-300">{persona.companyOrCollege}</span>
                </div>

                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {persona.bio}
                </p>

                {/* Intent Preview Box */}
                <div className="mt-4 p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-300 space-y-1">
                  <div className="flex items-center space-x-1.5 text-indigo-400 font-semibold text-[10px] uppercase tracking-wider">
                    <Zap className="w-3 h-3" />
                    <span>Active Gateway Intent</span>
                  </div>
                  <p className="truncate font-medium text-slate-200">
                    "{persona.activeIntent}"
                  </p>
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold">
                <span className={theme.textAccent}>Launch {persona.portalTitle}</span>
                <div className="w-7 h-7 rounded-full bg-slate-800 group-hover:bg-indigo-600 flex items-center justify-center text-slate-300 group-hover:text-white transition">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Role-Specific Dark-Mode Login Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden glow-indigo">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Role Brand Header */}
            <div className="text-center space-y-2">
              <div
                className={`w-14 h-14 rounded-2xl ${activeColorTheme.iconBg} flex items-center justify-center mx-auto shadow-lg`}
              >
                <ActiveIcon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Sign In to {activePersonaModal.portalTitle}
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Authenticate with institutional SSO, enterprise credentials, or instant 1-click bypass.
              </p>
            </div>

            {/* 1-Click Demo Quick Bypass */}
            <div className="p-4 bg-indigo-950/40 border border-indigo-500/20 rounded-2xl text-xs space-y-3">
              <div className="flex items-center justify-between text-indigo-300 font-semibold">
                <span className="flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Instant Demo Credentials</span>
                </span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-mono">
                  1-Click Fast-Track
                </span>
              </div>

              <div className="text-[11px] text-slate-300 space-y-1">
                <div>User: <b className="text-white">{activePersonaModal.name}</b></div>
                <div>Entity: <span className="text-emerald-400">{activePersonaModal.companyOrCollege}</span></div>
                <div>Role: <span className="text-amber-400">{activePersonaModal.roleLabel}</span></div>
              </div>

              <button
                type="button"
                onClick={() => handleExecuteLogin()}
                className={`w-full py-2.5 bg-gradient-to-r ${activeColorTheme.btnGlow} text-white font-bold rounded-xl text-xs shadow-lg transition flex items-center justify-center space-x-2`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>1-Click Authenticate as {activePersonaModal.name.split(' ')[0]}</span>
              </button>
            </div>

            {/* Standard Form Alternative */}
            <form onSubmit={handleExecuteLogin} className="space-y-3.5 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Institutional SSO / Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    placeholder="name@apex.edu"
                  />
                  <Shield className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <KeyRound className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs border border-slate-700 transition"
              >
                Sign In with SSO Identity
              </button>
            </form>

            <div className="text-center text-[10px] text-slate-500 font-mono">
              Protected by Campus Lineage Trust Protocol • 2026
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
