import React, { useState } from 'react';
import { useNexus } from '../context/NexusContext';
import {
  Briefcase,
  PlusCircle,
  DollarSign,
  Send,
  Zap,
  Clock,
  Tag,
  Building,
  CheckCircle2,
  ExternalLink,
  X,
  FileCode,
  Sparkles,
  Users,
  Target,
  Award,
  ShieldCheck,
  ArrowUpRight,
  Code2
} from 'lucide-react';

export default function BountyBoard() {
  const {
    bounties,
    activePersona,
    applyToBounty,
    postBounty,
    setActiveView
  } = useNexus();

  const [activeFilter, setActiveFilter] = useState('all');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedBounty, setSelectedBounty] = useState(null);
  const [candidateName, setCandidateName] = useState(activePersona.name);
  const [repoUrl, setRepoUrl] = useState('https://github.com/aman-cs/distri-cache-engine');
  const [pitchText, setPitchText] = useState('Built custom ring buffer handling 10k RPS with 92.4% test coverage. Ready to adapt for your service.');

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postType, setPostType] = useState('bounty');
  const [postTitle, setPostTitle] = useState('');
  const [postReward, setPostReward] = useState('');
  const [postTags, setPostTags] = useState('');
  const [postDesc, setPostDesc] = useState('');

  const filteredBounties = bounties.filter(b => {
    if (activeFilter === 'all') return true;
    return b.type === activeFilter;
  });

  const handleOpenApply = (bounty) => {
    setSelectedBounty(bounty);
    setCandidateName(activePersona.name);
    setIsApplyModalOpen(true);
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!selectedBounty) return;

    applyToBounty(selectedBounty.id, candidateName, repoUrl, pitchText);
    setIsApplyModalOpen(false);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!postTitle.trim() || !postReward.trim() || !postDesc.trim()) return;

    postBounty({
      type: postType,
      title: postTitle.trim(),
      reward: postReward.trim(),
      tags: postTags.split(',').map(s => s.trim()).filter(Boolean),
      desc: postDesc.trim()
    });

    setPostTitle('');
    setPostReward('');
    setPostTags('');
    setPostDesc('');
    setIsPostModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Controls & Banner */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-1">
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
              <span>Campus Opportunity & Micro-Bounty Exchange</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              Escrow-Backed Gigs • Fast-Track Referrals • Campus-Targeted Jobs
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Funded & mentored directly by verified alumni, founders, and partnering tech talent scouts.
            </p>
          </div>

          <button
            onClick={() => setIsPostModalOpen(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-amber-600/20 transition flex items-center space-x-1.5 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Opportunity</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800/80 text-xs">
          <span className="text-slate-500 font-bold uppercase text-[10px] mr-1">Filter View:</span>
          {[
            { id: 'all', label: `All Opportunities (${bounties.length})` },
            { id: 'bounty', label: 'Micro-Bounties' },
            { id: 'referral', label: 'Referral Radar Slots' },
            { id: 'capstone', label: 'Research Capstones' },
            { id: 'recruiter-job', label: 'Recruiter Campus Jobs' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1 rounded-xl transition text-xs font-medium ${
                activeFilter === f.id
                  ? 'bg-amber-600 text-white font-bold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recruiter Radar Spotlight Banner */}
      <div className="glass-panel rounded-2xl p-5 border border-cyan-500/30 bg-gradient-to-r from-cyan-950/30 via-slate-900 to-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4 glow-cyan">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-bold flex items-center justify-center text-sm shadow-md">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <span>Recruiter Dashboard Spotlight: Institution-Targeted Jobs</span>
              <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded font-mono">
                Round 1 Coding Waived
              </span>
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Partners like Razorpay, Swiggy, and Google Cloud evaluate verified GitHub AST readiness scores directly from campus nodes.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveFilter('recruiter-job')}
          className="px-4 py-2 bg-slate-800 hover:bg-cyan-600 text-slate-200 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 transition shrink-0"
        >
          Filter Recruiter Jobs
        </button>
      </div>

      {/* Bounties & Jobs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBounties.map(bounty => {
          const isRecruiterJob = bounty.type === 'recruiter-job';

          return (
            <div
              key={bounty.id}
              className={`glass-card glass-card-hover rounded-3xl p-6 border transition flex flex-col justify-between space-y-4 ${
                isRecruiterJob ? 'border-cyan-500/30 glow-cyan' : 'border-slate-800'
              }`}
            >
              <div>
                {/* Top Type Pill & Deadline */}
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${bounty.badgeClass}`}>
                    {bounty.typeLabel}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{bounty.deadline}</span>
                  </span>
                </div>

                {/* Title & Poster */}
                <h3 className="text-base font-bold text-white mt-3 leading-snug">
                  {bounty.title}
                </h3>
                <p className="text-xs text-indigo-400 mt-1 font-medium">
                  {bounty.poster}
                </p>

                {/* Recruiter Badge if Job */}
                {isRecruiterJob && (
                  <div className="mt-2.5 flex items-center space-x-1.5 text-[11px] text-cyan-300 bg-cyan-950/40 border border-cyan-500/20 px-2.5 py-1 rounded-xl">
                    <Building className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Target: Apex Institute & Linked Partner Campuses</span>
                  </div>
                )}

                {/* Reward Highlight Box */}
                <div className="mt-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-semibold text-emerald-400 flex items-center space-x-1.5 shadow-inner">
                  <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Reward / Comp: {bounty.reward}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {bounty.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {bounty.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer with Applicants & Apply Button */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span>{bounty.applicants ? bounty.applicants.length : 0} builders applied</span>
                </span>

                <button
                  onClick={() => handleOpenApply(bounty)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-md transition flex items-center space-x-1 ${
                    isRecruiterJob
                      ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/30'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isRecruiterJob ? 'Apply with Dossier' : 'Apply with Repo'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Apply to Bounty with Proof-of-Work Repo Link */}
      {isApplyModalOpen && selectedBounty && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-4 shadow-2xl relative glow-indigo">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Send className="w-4 h-4 text-indigo-400" />
                <h3 className="text-base font-bold text-white">
                  Apply with Proof-of-Work Repository Link
                </h3>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <div className="text-[10px] text-slate-500 uppercase font-bold">Target Opportunity:</div>
              <div className="text-white font-bold text-sm">{selectedBounty.title}</div>
              <div className="text-emerald-400 font-semibold mt-0.5">Reward Highlight: {selectedBounty.reward}</div>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Candidate Name & Affiliation
                </label>
                <input
                  type="text"
                  required
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                  <span>Proof-of-Work GitHub Repo / PR Link</span>
                  <span className="text-[10px] text-emerald-400 font-mono">AST Verified</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/username/project"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                  <Code2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Technical Pitch & Solution Summary (2-3 sentences)
                </label>
                <textarea
                  rows={3}
                  required
                  value={pitchText}
                  onChange={(e) => setPitchText(e.target.value)}
                  placeholder="Explain why your code readiness solves this deliverable..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl text-xs shadow-md transition"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Post New Bounty */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-4 shadow-2xl relative glow-amber">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <PlusCircle className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Post Campus Opportunity or Bounty
                </h3>
              </div>
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Opportunity Type</label>
                <select
                  value={postType}
                  onChange={(e) => setPostType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="bounty">Micro-Bounty (Paid Gig + Referral)</option>
                  <option value="referral">Alumni Referral Radar Slot</option>
                  <option value="capstone">Faculty-Alumni Research Capstone</option>
                  <option value="recruiter-job">Targeted Campus Job (Recruiter Fast-Track)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. Build Real-time Redis Rate Limiter in Go"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Reward / Compensation</label>
                  <input
                    type="text"
                    required
                    value={postReward}
                    onChange={(e) => setPostReward(e.target.value)}
                    placeholder="₹15,000 + SDE Fast-Track"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={postTags}
                    onChange={(e) => setPostTags(e.target.value)}
                    placeholder="Go, Redis, 48hr"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description & Requirements</label>
                <textarea
                  rows={3}
                  required
                  value={postDesc}
                  onChange={(e) => setPostDesc(e.target.value)}
                  placeholder="Explain the specific deliverable and how student work will be reviewed..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs shadow-md shadow-amber-600/30 transition"
                >
                  Publish to Network
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
