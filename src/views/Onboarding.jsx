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
  Users,
  Code2,
  Building,
  Mail,
  UserCheck,
  FileCode,
  Award,
  Lock,
  Compass,
  Coins,
  Trophy,
  GitMerge,
  BarChart3,
  Activity,
  Check
} from 'lucide-react';

const ROLE_MODAL_CONFIGS = {
  student: {
    bannerTitle: 'Student Builder Gateway',
    bannerBadge: 'Verified Student Access',
    bannerDesc: 'Connect directly with alumni in your target companies without cold DMs. Showcase real code, solve startup bounties, and secure high-conviction job referrals.',
    bullets: [
      { icon: Shield, title: 'Zero Cold DMs', text: 'Reach alumni with verified code readiness, not generic unread text.' },
      { icon: Zap, title: 'Earn Startup Bounties', text: 'Solve real micro-tasks (₹5,000–₹25,000) funded directly by alumni founders.' },
      { icon: Compass, title: 'Intent Matchmaking', text: 'Direct match with seniors hiring in your exact tech stack.' }
    ],
    fields: [
      { label: 'College Roll Number / Campus Email', key: 'email', type: 'text', placeholder: '2022CS084@apex.edu', defaultValue: '2022CS084@apex.edu', icon: Mail },
      { label: 'Branch & Graduation Year', key: 'branch', type: 'text', placeholder: 'B.Tech CSE — Class of 2026', defaultValue: 'B.Tech CSE — Class of 2026', icon: GraduationCap },
      { label: 'GitHub Profile URL', key: 'github', type: 'text', placeholder: 'https://github.com/aman-cs', defaultValue: 'https://github.com/aman-cs', icon: Code2 },
      { label: 'Password / Passkey', key: 'password', type: 'password', placeholder: '••••••••', defaultValue: 'password123', icon: KeyRound }
    ]
  },
  alumnus: {
    bannerTitle: 'Alumni Mentorship & Referral Desk',
    bannerBadge: 'Verified Alumni Network',
    bannerDesc: 'Help passionate college juniors without drowning in spam. Review 1-minute executive dossiers, endorse verified talent, and manage your monthly referral quota.',
    bullets: [
      { icon: FileCode, title: '1-Minute Review Cards', text: 'No 5-page resumes. Review concise code benchmarks and test coverage.' },
      { icon: CheckCircle2, title: '1-Click ATS Referral', text: 'Auto-generate verified endorsement blurbs for your internal company portal.' },
      { icon: Shield, title: 'Quota Protection', text: 'Strict limit of 3 reviews/month so your time is always respected.' }
    ],
    fields: [
      { label: 'Work Corporate Email', key: 'email', type: 'email', placeholder: 'rohan.mehta@swiggy.in', defaultValue: 'rohan.mehta@swiggy.in', icon: Mail },
      { label: 'Current Company & Designation', key: 'company', type: 'text', placeholder: 'Swiggy — SDE-2 Backend', defaultValue: 'Swiggy — SDE-2 Backend', icon: Briefcase },
      { label: 'College Graduation Batch', key: 'batch', type: 'text', placeholder: 'Apex CSE — Batch of 2020', defaultValue: 'Apex CSE — Batch of 2020', icon: GraduationCap },
      { label: 'Password / SSO Passkey', key: 'password', type: 'password', placeholder: '••••••••', defaultValue: 'password123', icon: KeyRound }
    ]
  },
  founder: {
    bannerTitle: 'Founder Opportunity & Bounty Hub',
    bannerBadge: 'Alumni Founder Syndicate',
    bannerDesc: 'Get MVPs and micro-services built rapidly by hungry campus builders. Sponsor hackathon squads, fund bounties, and hire pre-vetted interns.',
    bullets: [
      { icon: Coins, title: 'Escrow-Backed Bounties', text: 'Post ₹5,000 to ₹25,000 tasks and get clean production code in 48 hours.' },
      { icon: Trophy, title: 'Hackathon Squad Grants', text: 'Sponsor travel and cloud credits for top college finalist teams.' },
      { icon: UserCheck, title: 'Direct Founder Hiring', text: 'Hire students based on real pull requests, skipping recruitment agencies.' }
    ],
    fields: [
      { label: 'Founder Work Email', key: 'email', type: 'email', placeholder: 'neha@hyperscale.ai', defaultValue: 'neha@hyperscale.ai', icon: Mail },
      { label: 'Startup Name & Stage', key: 'company', type: 'text', placeholder: 'HyperScale AI (YC W24)', defaultValue: 'HyperScale AI (YC W24)', icon: Rocket },
      { label: 'AngelList / Company Website', key: 'website', type: 'text', placeholder: 'https://hyperscale.ai', defaultValue: 'https://hyperscale.ai', icon: Code2 },
      { label: 'Password / SSO Passkey', key: 'password', type: 'password', placeholder: '••••••••', defaultValue: 'password123', icon: KeyRound }
    ]
  },
  faculty: {
    bannerTitle: 'Faculty Capstone & Research Desk',
    bannerBadge: 'Academic & Industry Linkage',
    bannerDesc: 'Supercharge student final-year capstone projects by pairing them with industry alumni mentors at Google, AWS, and tier-1 research labs.',
    bullets: [
      { icon: GitMerge, title: 'Industry Co-Guides', text: 'Pair student research teams with alumni engineers for real-world validation.' },
      { icon: FileCode, title: 'Conference Papers', text: 'Publish joint IEEE/ACM conference papers co-authored with industry alumni.' },
      { icon: Award, title: 'Project Incubation', text: 'Fast-track promising capstone projects into university patents and startup grants.' }
    ],
    fields: [
      { label: 'Institutional .edu Email', key: 'email', type: 'email', placeholder: 'rkverma@apex.edu', defaultValue: 'rkverma@apex.edu', icon: Mail },
      { label: 'Department / Faculty Designation', key: 'designation', type: 'text', placeholder: 'Computer Science — Dean R&D', defaultValue: 'Computer Science — Dean R&D', icon: BookOpen },
      { label: 'Research Lab / Domain', key: 'domain', type: 'text', placeholder: 'Cloud Computing, Edge AI & Distributed Systems', defaultValue: 'Cloud Computing, Edge AI & Distributed Systems', icon: Code2 },
      { label: 'Password / Campus SSO Passkey', key: 'password', type: 'password', placeholder: '••••••••', defaultValue: 'password123', icon: KeyRound }
    ]
  },
  recruiter: {
    bannerTitle: 'Verified Campus Talent Radar',
    bannerBadge: 'Corporate Talent Acquisition',
    bannerDesc: 'Source high-velocity campus engineers vetted by alumni endorsements, verified commit history, and code readiness scores (0–100).',
    bullets: [
      { icon: BarChart3, title: 'Code Readiness Benchmarks', text: 'Filter candidates by test coverage, latency benchmarks, and algorithmic depth.' },
      { icon: Shield, title: 'Alumni Staked Trust', text: 'Prioritize students vetted and endorsed by alumni currently in your company.' },
      { icon: Zap, title: 'Fast-Track Scheduling', text: 'Schedule 1st round interviews in 1-click without resume screening lag.' }
    ],
    fields: [
      { label: 'Corporate Recruiter Email', key: 'email', type: 'email', placeholder: 'vikram.seth@razorpay.com', defaultValue: 'vikram.seth@razorpay.com', icon: Mail },
      { label: 'Company Name & Hiring Team', key: 'company', type: 'text', placeholder: 'Razorpay — Core Payments & Infrastructure', defaultValue: 'Razorpay — Core Payments & Infrastructure', icon: Building },
      { label: 'Open Campus Requisition ID', key: 'requisition', type: 'text', placeholder: 'REQ-2026-SDE-BACKEND', defaultValue: 'REQ-2026-SDE-BACKEND', icon: Target },
      { label: 'Password / SSO Passkey', key: 'password', type: 'password', placeholder: '••••••••', defaultValue: 'password123', icon: KeyRound }
    ]
  },
  institution: {
    bannerTitle: 'Institution Impact & Outcome Command',
    bannerBadge: 'University Executive Desk',
    bannerDesc: 'Transform your college alumni directory from a dead phonebook into an active economic network. Track placement conversions, alumni density, and bounty earnings.',
    bullets: [
      { icon: Activity, title: 'Real Outcome Metrics', text: 'Track verified referrals, conversion to offers, and student bounty payouts.' },
      { icon: Landmark, title: 'Alumni Geographic Mapping', text: 'Interactive geo-density across tech hubs: Bangalore, Gurgaon, SF, London.' },
      { icon: Award, title: 'Accreditation Proof', text: 'Export real-time outcome telemetry for NAAC, NIRF, and ABET accreditation.' }
    ],
    fields: [
      { label: 'Institutional Admin SSO Email', key: 'email', type: 'email', placeholder: 'dean.alumni@apex.edu', defaultValue: 'dean.alumni@apex.edu', icon: Mail },
      { label: 'Campus Administration Unit', key: 'adminUnit', type: 'text', placeholder: 'Apex Central Campus Administration', defaultValue: 'Apex Central Campus Administration', icon: Landmark },
      { label: 'Institution Security Passkey', key: 'passkey', type: 'text', placeholder: 'ADMIN-APEX-9042', defaultValue: 'ADMIN-APEX-9042', icon: Shield },
      { label: 'Password / SSO Passkey', key: 'password', type: 'password', placeholder: '••••••••', defaultValue: 'password123', icon: KeyRound }
    ]
  }
};

export default function Onboarding() {
  const { personas, loginAs } = useNexus();
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAuthTab, setModalAuthTab] = useState('fast-track'); // 'fast-track' | 'sso-form'
  const [formValues, setFormValues] = useState({});

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
      btnGlow: 'from-indigo-600 to-purple-600 shadow-indigo-500/25',
      glowClass: 'glow-indigo',
      badgeGradient: 'from-indigo-500/20 via-indigo-600/30 to-purple-600/20 text-indigo-300 border-indigo-500/40'
    },
    alumnus: {
      borderHover: 'hover:border-emerald-500/60',
      iconBg: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30',
      tag: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      textAccent: 'text-emerald-400',
      btnGlow: 'from-emerald-600 to-teal-600 shadow-emerald-500/25',
      glowClass: 'glow-emerald',
      badgeGradient: 'from-emerald-500/20 via-emerald-600/30 to-teal-600/20 text-emerald-300 border-emerald-500/40'
    },
    founder: {
      borderHover: 'hover:border-amber-500/60',
      iconBg: 'bg-amber-600/20 text-amber-400 border-amber-500/30',
      tag: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      textAccent: 'text-amber-400',
      btnGlow: 'from-amber-600 to-orange-600 shadow-amber-500/25',
      glowClass: 'glow-amber',
      badgeGradient: 'from-amber-500/20 via-amber-600/30 to-orange-600/20 text-amber-300 border-amber-500/40'
    },
    faculty: {
      borderHover: 'hover:border-purple-500/60',
      iconBg: 'bg-purple-600/20 text-purple-400 border-purple-500/30',
      tag: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      textAccent: 'text-purple-400',
      btnGlow: 'from-purple-600 to-pink-600 shadow-purple-500/25',
      glowClass: 'glow-purple',
      badgeGradient: 'from-purple-500/20 via-purple-600/30 to-pink-600/20 text-purple-300 border-purple-500/40'
    },
    recruiter: {
      borderHover: 'hover:border-cyan-500/60',
      iconBg: 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30',
      tag: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      textAccent: 'text-cyan-400',
      btnGlow: 'from-cyan-600 to-blue-600 shadow-cyan-500/25',
      glowClass: 'glow-cyan',
      badgeGradient: 'from-cyan-500/20 via-cyan-600/30 to-blue-600/20 text-cyan-300 border-cyan-500/40'
    },
    institution: {
      borderHover: 'hover:border-rose-500/60',
      iconBg: 'bg-rose-600/20 text-rose-400 border-rose-500/30',
      tag: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      textAccent: 'text-rose-400',
      btnGlow: 'from-rose-600 to-red-600 shadow-rose-500/25',
      glowClass: 'glow-rose',
      badgeGradient: 'from-rose-500/20 via-rose-600/30 to-red-600/20 text-rose-300 border-rose-500/40'
    }
  };

  const handleOpenModal = (roleId) => {
    setSelectedRoleId(roleId);
    setModalAuthTab('fast-track');
    const cfg = ROLE_MODAL_CONFIGS[roleId];
    if (cfg) {
      const initial = {};
      cfg.fields.forEach(f => {
        initial[f.key] = f.defaultValue;
      });
      setFormValues(initial);
    }
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
  const activeRoleConfig = ROLE_MODAL_CONFIGS[activePersonaModal.id] || ROLE_MODAL_CONFIGS.student;

  return (
    <section className="flex-1 flex flex-col justify-center items-center px-4 py-12 max-w-7xl mx-auto w-full">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold shadow-inner">
          <Zap className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
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
          <span className="flex items-center space-x-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-200">4,820 Active Campus Nodes</span>
          </span>
          <span className="flex items-center space-x-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
            <span className="text-slate-200">342 Warm Referrals Dispatched</span>
          </span>
          <span className="flex items-center space-x-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="text-slate-200">₹4.2L Micro-Bounties Paid</span>
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
                  <span className={`text-[10px] font-mono px-3 py-1 rounded-full border ${theme.tag}`}>
                    Demo: {persona.name.split(' ')[0]}
                  </span>
                </div>

                {/* Portal Title & Target Details */}
                <div className="flex items-center space-x-2">
                  <h3 className={`text-lg font-bold text-white group-hover:${theme.textAccent} transition`}>
                    {persona.portalTitle}
                  </h3>
                  <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border ${theme.badgeGradient}`}>
                    Portal
                  </span>
                </div>
                
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
                <div className="w-8 h-8 rounded-full bg-slate-800 group-hover:bg-indigo-600 flex items-center justify-center text-slate-300 group-hover:text-white transition shadow-sm">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Role-Specific Dark-Mode Login Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={`bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden ${activeColorTheme.glowClass}`}>
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Role Brand Header & Portal Badge */}
            <div className="text-center space-y-2">
              <div
                className={`w-14 h-14 rounded-2xl ${activeColorTheme.iconBg} flex items-center justify-center mx-auto shadow-lg`}
              >
                <ActiveIcon className="w-7 h-7" />
              </div>
              <div className="flex items-center justify-center space-x-2">
                <h3 className="text-xl font-bold text-white">
                  Sign In to {activePersonaModal.portalTitle}
                </h3>
                <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${activeColorTheme.badgeGradient}`}>
                  {activePersonaModal.roleLabel}
                </span>
              </div>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                {activeRoleConfig.bannerDesc}
              </p>
            </div>

            {/* 3 Key Role Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-1">
              {activeRoleConfig.bullets.map((b, idx) => {
                const BulletIcon = b.icon;
                return (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-left space-y-1">
                    <div className="flex items-center space-x-1.5 text-slate-200 text-[11px] font-bold">
                      <BulletIcon className={`w-3.5 h-3.5 ${activeColorTheme.textAccent}`} />
                      <span className="truncate">{b.title}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      {b.text}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Tab Selector: Fast-Track Demo vs SSO Form */}
            <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setModalAuthTab('fast-track')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition flex items-center justify-center space-x-1.5 ${
                  modalAuthTab === 'fast-track'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>1-Click Fast-Track Demo</span>
              </button>
              <button
                type="button"
                onClick={() => setModalAuthTab('sso-form')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition flex items-center justify-center space-x-1.5 ${
                  modalAuthTab === 'sso-form'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-indigo-400" />
                <span>Role SSO Credentials</span>
              </button>
            </div>

            {/* Content: 1-Click Fast-Track Demo */}
            {modalAuthTab === 'fast-track' && (
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs space-y-3.5">
                <div className="flex items-center justify-between text-indigo-300 font-semibold border-b border-slate-800 pb-2">
                  <span className="flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-white">Active Verified Demo Persona</span>
                  </span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
                    Preloaded State
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className={`w-11 h-11 rounded-xl ${activeColorTheme.iconBg} font-extrabold flex items-center justify-center text-sm shadow-md`}>
                    {activePersonaModal.avatar}
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className="font-bold text-white text-sm flex items-center space-x-2">
                      <span>{activePersonaModal.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({activePersonaModal.companyOrCollege})</span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {activePersonaModal.goal}
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] space-y-1">
                  <div className="text-slate-400 font-semibold text-[10px] uppercase flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-indigo-400" />
                    <span>Preloaded Intent:</span>
                  </div>
                  <div className="text-emerald-400 font-medium truncate">
                    "{activePersonaModal.activeIntent}"
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleExecuteLogin()}
                  className={`w-full py-3 bg-gradient-to-r ${activeColorTheme.btnGlow} text-white font-bold rounded-xl text-xs shadow-lg transition flex items-center justify-center space-x-2`}
                >
                  <Zap className="w-4 h-4" />
                  <span>Authenticate to {activePersonaModal.portalTitle}</span>
                </button>
              </div>
            )}

            {/* Content: Tailored Role SSO Form */}
            {modalAuthTab === 'sso-form' && (
              <form onSubmit={handleExecuteLogin} className="space-y-3 pt-1">
                {activeRoleConfig.fields.map(field => {
                  const FieldIcon = field.icon;
                  return (
                    <div key={field.key}>
                      <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center justify-between">
                        <span>{field.label}</span>
                        <span className="text-[10px] text-slate-500 font-mono">Verified</span>
                      </label>
                      <div className="relative">
                        <input
                          type={field.type}
                          value={formValues[field.key] || ''}
                          onChange={(e) => setFormValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                          required
                          placeholder={field.placeholder}
                          className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-3.5 pr-9 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition font-mono"
                        />
                        <FieldIcon className="w-4 h-4 text-slate-500 absolute right-3 top-2.5 pointer-events-none" />
                      </div>
                    </div>
                  );
                })}

                <button
                  type="submit"
                  className={`w-full py-2.5 bg-gradient-to-r ${activeColorTheme.btnGlow} text-white font-bold rounded-xl text-xs shadow-lg transition flex items-center justify-center space-x-2 mt-4`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Sign In with SSO Identity</span>
                </button>
              </form>
            )}

            <div className="text-center text-[10px] text-slate-500 font-mono pt-1">
              Protected by Campus Lineage Trust Protocol • 2026
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
