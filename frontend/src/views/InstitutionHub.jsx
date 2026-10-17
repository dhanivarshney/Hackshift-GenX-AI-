import React, { useState } from 'react';
import { useNexus } from '../context/NexusContext';
import {
  Landmark,
  TrendingUp,
  Users,
  Briefcase,
  DollarSign,
  GraduationCap,
  Calendar,
  Building,
  MapPin,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Check,
  Activity,
  Award,
  Zap,
  ExternalLink
} from 'lucide-react';

export default function InstitutionHub() {
  const {
    institutions,
    activeInstitutionId,
    setActiveInstitutionId,
    setActiveView,
    showToast,
    triggerCelebration
  } = useNexus();

  const [rsvpEvents, setRsvpEvents] = useState({});

  const currentInst = institutions.find(i => i.id === activeInstitutionId) || institutions[0];

  const handleToggleRsvp = (eventTitle) => {
    const isCurrentlyRsvpd = rsvpEvents[eventTitle];
    setRsvpEvents(prev => ({
      ...prev,
      [eventTitle]: !isCurrentlyRsvpd
    }));

    if (!isCurrentlyRsvpd) {
      triggerCelebration();
      showToast(`RSVP Confirmed for "${eventTitle}"! Added to campus calendar.`, 'success');
    } else {
      showToast(`Cancelled RSVP for "${eventTitle}".`, 'info');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Active Node Command Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-gradient-to-r from-slate-900 via-rose-950/20 to-slate-900 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-600/20 border border-rose-500/30 text-rose-400 flex items-center justify-center text-2xl shadow-lg shrink-0 glow-rose">
              <Landmark className="w-8 h-8" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-black text-white">{currentInst.name}</h2>
                <span className="text-xs px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 font-semibold font-mono">
                  {currentInst.badge}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center space-x-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Active Network Node • {currentInst.status}</span>
                </span>
              </div>

              <p className="text-xs text-slate-300 mt-2 max-w-2xl leading-relaxed">
                {currentInst.motto}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2.5">
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{currentInst.location}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1.5 text-emerald-400 font-medium">
                  <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>Real-Time Autonomous Sync Enabled</span>
                </div>
                <span>•</span>
                <div className="text-slate-400 font-mono text-[11px]">
                  Node ID: 0x{currentInst.id.toUpperCase()}-NODE-2026
                </div>
              </div>
            </div>
          </div>

          {/* Institution Node Switcher Pills */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 bg-slate-950/80 border border-slate-800 p-4 rounded-2xl shrink-0">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center space-x-1.5">
              <Share2 className="w-3 h-3 text-rose-400" />
              <span>Switch Active Command Node:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {institutions.map(inst => {
                const isSelected = inst.id === currentInst.id;
                return (
                  <button
                    key={inst.id}
                    onClick={() => {
                      setActiveInstitutionId(inst.id);
                      showToast(`Switched active command node to ${inst.name}`);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      isSelected
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 font-bold'
                        : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {inst.name.split(' ')[0]} Hub
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setActiveView('graph')}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 font-medium transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Inspect in Lineage Topology Graph</span>
            </button>
          </div>

        </div>
      </div>

      {/* Impact Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="glass-panel glass-card-hover rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Active Network Size</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-white">
            {currentInst.impactMetrics.activeNetworkSize}
          </div>
          <div className="text-xs text-emerald-400 flex items-center space-x-1 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{currentInst.impactMetrics.networkLift}</span>
          </div>
        </div>

        <div className="glass-panel glass-card-hover rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Verified Warm Referrals</span>
            <Briefcase className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">
            {currentInst.impactMetrics.verifiedWarmReferrals}
          </div>
          <div className="text-xs text-slate-300">
            {currentInst.impactMetrics.referralConversion}
          </div>
        </div>

        <div className="glass-panel glass-card-hover rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Bounty Disbursements</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400">
            {currentInst.impactMetrics.studentBountyEarnings}
          </div>
          <div className="text-xs text-slate-300">
            {currentInst.impactMetrics.disbursementType}
          </div>
        </div>

        <div className="glass-panel glass-card-hover rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Capstone Research Links</span>
            <GraduationCap className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-purple-400">
            {currentInst.impactMetrics.industryCapstoneProjects}
          </div>
          <div className="text-xs text-slate-300">
            {currentInst.impactMetrics.capstoneCoMentors}
          </div>
        </div>

      </div>

      {/* Two-Column Layout: Alumni Highlights (Left) & Active Recruiters + Events (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Notable Alumni Highlights */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Active Alumni Champions ({currentInst.alumniHighlights.length})
              </h3>
            </div>
            <span className="text-xs text-slate-400">Zero cold outreach • Verified reciprocity</span>
          </div>

          <div className="space-y-4">
            {currentInst.alumniHighlights.map((alum, idx) => (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 rounded-xl bg-indigo-600/25 border border-indigo-500/30 text-indigo-300 font-bold flex items-center justify-center text-sm shadow-md">
                      {alum.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{alum.name}</h4>
                      <p className="text-xs text-slate-400">
                        {alum.role} • <span className="text-indigo-400 font-medium">{alum.company}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full text-slate-300">
                    {alum.batch}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 italic">
                  "{alum.quote}"
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-[11px] text-emerald-400 font-medium flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active in Decision Inbox</span>
                  </span>
                  <button
                    onClick={() => setActiveView('proof-of-work')}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition flex items-center space-x-1 shadow-sm"
                  >
                    <span>Pitch Proof-of-Work</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Active Recruiters & Upcoming Node Events */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Active Recruiters Partner Radar */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Targeted Recruiters on Radar
                </h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-400">Direct Pipelines</span>
            </div>

            <div className="space-y-2.5">
              {currentInst.recruiters.map((rec, rIdx) => (
                <div
                  key={rIdx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-xs">
                      {rec.logoText}
                    </div>
                    <div>
                      <div className="font-bold text-white">{rec.name}</div>
                      <div className="text-[10px] text-slate-400">{rec.activeJobs} Active Campus Roles</div>
                    </div>
                  </div>

                  {rec.fastTrack && (
                    <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
                      Fast-Track ATS
                    </span>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveView('bounties')}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition text-center flex items-center justify-center space-x-1.5"
            >
              <span>View Recruiter Job Cards in Exchange</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Upcoming Node Events with Interactive RSVP */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-rose-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Upcoming Node Events
                </h3>
              </div>
              <span className="text-[10px] font-mono text-rose-400">Live Campus Calendar</span>
            </div>

            <div className="space-y-3">
              {currentInst.upcomingEvents.map((event, eIdx) => {
                const isRsvpd = rsvpEvents[event.title];

                return (
                  <div
                    key={eIdx}
                    className={`p-3.5 rounded-xl border text-xs space-y-2 transition ${
                      isRsvpd
                        ? 'bg-rose-950/20 border-rose-500/40 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-white text-xs leading-snug">{event.title}</h4>
                      <span className="text-[10px] text-rose-400 font-mono bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                        {event.type}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{event.date}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-slate-400">
                        {isRsvpd ? (
                          <span className="text-emerald-400 font-bold flex items-center space-x-1">
                            <Check className="w-3 h-3" />
                            <span>You are attending!</span>
                          </span>
                        ) : (
                          <span className="text-amber-400 font-medium">{event.spotsLeft}</span>
                        )}
                      </span>

                      <button
                        onClick={() => handleToggleRsvp(event.title)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition ${
                          isRsvpd
                            ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                            : 'bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white'
                        }`}
                      >
                        {isRsvpd ? 'RSVP Confirmed' : 'RSVP Now'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
