import React, { useState } from 'react';
import { useNexus } from '../context/NexusContext';
import { CATEGORY_FILTERS } from '../data/mockData';
import {
  Sparkles,
  Compass,
  Briefcase,
  Lightbulb,
  Calendar,
  Zap,
  ArrowUpRight,
  Flame,
  Award,
  PlusCircle,
  ThumbsUp,
  MessageSquare,
  Share2,
  Cpu,
  CheckCircle2,
  ExternalLink,
  Target,
  Trophy,
  Filter
} from 'lucide-react';

export default function Dashboard() {
  const {
    posts,
    activePersona,
    activeCategory,
    setActiveCategory,
    upvotePost,
    createPost,
    setActiveView,
    leaderboard,
    badgesCatalog,
    setIsIntentModalOpen
  } = useNexus();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('mentorship');
  const [newTags, setNewTags] = useState('');
  const [powRequired, setPowRequired] = useState(true);

  // Filter posts
  const filteredPosts = posts.filter(post => {
    if (activeCategory === 'all') return true;
    return post.category === activeCategory;
  });

  // Personalized Suggestions based on active role + intent
  const personalizedSuggestions = [
    {
      id: 'sug-1',
      title: activePersona.id === 'student'
        ? 'Swiggy Routing Team Referral Match (96% Synergy)'
        : (activePersona.id === 'alumnus' ? '2 Vetted Go Candidates Ready for ATS Push' : 'Top 3 Student Capstones Ready for Industry Sponsor'),
      description: activePersona.id === 'student'
        ? 'Rohan Mehta has 2 open referral slots. Your Redis engine matches his high-throughput stack.'
        : 'Aman Sharma passed AST benchmarks with 94/100 code readiness on his consistent hashing ring.',
      actionLabel: activePersona.id === 'student' ? 'Launch Pitch Lab' : 'View In Decision Inbox',
      targetView: activePersona.id === 'student' ? 'proof-of-work' : 'referrals',
      badge: 'High Intent Match',
      accent: 'emerald'
    },
    {
      id: 'sug-2',
      title: 'HyperScale AI ₹15,000 Micro-Bounty',
      description: 'Neha Kapoor posted an escrow-backed challenge for Next.js WebStreams latency testing.',
      actionLabel: 'Claim Bounty',
      targetView: 'bounties',
      badge: 'Escrow Backed',
      accent: 'amber'
    },
    {
      id: 'sug-3',
      title: 'Stanford & Apex DeepTech Consortium Demo',
      description: 'Cross-campus interactive lineage link active. Explore 48 interconnected nodes.',
      actionLabel: 'Open Lineage Graph',
      targetView: 'graph',
      badge: 'Live Graph Node',
      accent: 'indigo'
    }
  ];

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    createPost({
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      proofOfWorkRequired: powRequired,
      intentBadge: activePersona.activeIntent
    });

    setNewTitle('');
    setNewContent('');
    setNewTags('');
    setIsCreateModalOpen(false);
  };

  const getCategoryIcon = (id) => {
    switch (id) {
      case 'mentorship': return Compass;
      case 'jobs': return Briefcase;
      case 'startup': return Lightbulb;
      case 'events': return Calendar;
      default: return Sparkles;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Personalized Role + Intent Hero Bar */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-extrabold flex items-center justify-center text-xl shadow-lg shrink-0">
              {activePersona.avatar}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-white">{activePersona.name}</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-semibold font-mono">
                  {activePersona.portalTitle}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {activePersona.branch || activePersona.companyOrCollege}
                </span>
              </div>
              
              <p className="text-xs text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
                {activePersona.bio}
              </p>

              {/* Badges Earned */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Badges:</span>
                {activePersona.badges.map((badgeName, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[11px] font-medium"
                  >
                    <Award className="w-3 h-3 text-indigo-400" />
                    <span>{badgeName}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Active Persona Intent Box & Broadcast Trigger */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 bg-slate-950/80 border border-slate-800/80 p-4 rounded-2xl min-w-[280px]">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                <span>Active Matched Intent:</span>
              </div>
              <div className="text-xs font-bold text-emerald-400 mt-1">
                "{activePersona.activeIntent}"
              </div>
            </div>

            <div className="flex items-center space-x-2 w-full lg:w-auto">
              <button
                onClick={() => setIsIntentModalOpen(true)}
                className="flex-1 lg:flex-none text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                Change Intent
              </button>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex-1 lg:flex-none text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition flex items-center justify-center space-x-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Broadcast Post</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main 3-Column Layout: Filter Sidebar (Left), Feed (Center), Leaderboard & Suggestions (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar: Categories & Personal Intent Highlights */}
        <div className="lg:col-span-3 space-y-5">
          
          {/* Category Filters */}
          <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 px-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>Feed Filters</span>
              <Filter className="w-3.5 h-3.5 text-slate-500" />
            </div>

            <div className="space-y-1">
              {CATEGORY_FILTERS.map(cat => {
                const Icon = getCategoryIcon(cat.id);
                const isSelected = activeCategory === cat.id;
                const count = cat.id === 'all'
                  ? posts.length
                  : posts.filter(p => p.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-bold'
                        : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                      <span>{cat.label}</span>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                        isSelected ? 'bg-indigo-800 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Personalized Suggestions Widget */}
          <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
              <Zap className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Personalized Matches
              </h3>
            </div>

            <div className="space-y-3">
              {personalizedSuggestions.map(sug => (
                <div
                  key={sug.id}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition space-y-2"
                >
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-xs font-bold text-white leading-snug">{sug.title}</h4>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono shrink-0">
                      {sug.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {sug.description}
                  </p>
                  <button
                    onClick={() => setActiveView(sug.targetView)}
                    className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white text-[11px] font-semibold transition flex items-center justify-center space-x-1"
                  >
                    <span>{sug.actionLabel}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Center Column: Intent-Driven Posts Feed */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Quick Broadcast Banner */}
          <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center text-xs">
                {activePersona.avatar}
              </div>
              <input
                type="text"
                readOnly
                onClick={() => setIsCreateModalOpen(true)}
                placeholder="Broadcast a project milestone, referral need, or bounty..."
                className="bg-slate-900 hover:bg-slate-850 text-slate-300 placeholder-slate-500 border border-slate-800 rounded-xl px-4 py-2 text-xs w-full cursor-pointer focus:outline-none transition"
              />
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/30 flex items-center space-x-1.5 shrink-0 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Post</span>
            </button>
          </div>

          {/* Posts Cards */}
          <div className="space-y-4">
            {filteredPosts.map(post => {
              const CategoryIcon = getCategoryIcon(post.category);

              return (
                <div
                  key={post.id}
                  className="glass-card glass-card-hover rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4 transition"
                >
                  {/* Post Author Bar */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600/25 border border-indigo-500/30 text-indigo-300 font-bold flex items-center justify-center text-sm">
                        {post.authorAvatar}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-bold text-white">{post.author}</h4>
                          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                            {post.authorRole}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center space-x-2 mt-0.5">
                          <span>{post.institution}</span>
                          <span>•</span>
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    {/* Category Pill */}
                    <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      <CategoryIcon className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="capitalize text-[11px] font-medium">{post.category}</span>
                    </div>
                  </div>

                  {/* Intent Reciprocation Badge */}
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                    <Zap className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{post.intentBadge}</span>
                  </div>

                  {/* Title & Body */}
                  <div>
                    <h3 className="text-base font-bold text-white hover:text-indigo-300 transition cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {post.content}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Proof of Work Prompt Banner if required */}
                  {post.proofOfWorkRequired && (
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center space-x-2 text-slate-300">
                        <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Requires verified GitHub readiness metrics. Zero cold messages.</span>
                      </div>
                      <button
                        onClick={() => setActiveView('proof-of-work')}
                        className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-semibold rounded-lg text-xs shadow-md transition flex items-center justify-center space-x-1 shrink-0"
                      >
                        <span>Pitch Code</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Engagement Bar */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => upvotePost(post.id)}
                        className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg transition ${
                          post.userHasUpvoted
                            ? 'bg-indigo-600/20 text-indigo-400 font-bold border border-indigo-500/30'
                            : 'hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{post.upvotes} Upvotes</span>
                      </button>

                      <button className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg hover:bg-slate-800 hover:text-white transition">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{post.commentsCount} Comments</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setActiveView('graph')}
                      className="flex items-center space-x-1 hover:text-indigo-400 transition"
                      title="Inspect Lineage Node"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Graph Link</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Gamification Leaderboard, Badges & Campus Streak */}
        <div className="lg:col-span-3 space-y-5">
          
          {/* Contributor Leaderboard */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Top Contributors
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Real Karma</span>
            </div>

            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div
                  key={user.rank}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="w-5 text-center font-bold text-slate-400 font-mono">
                      #{user.rank}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-300 font-bold flex items-center justify-center text-xs">
                      {user.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-white">{user.name}</div>
                      <div className="text-[10px] text-slate-400">{user.role}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-amber-400">
                      {user.karma}
                    </div>
                    <div className="text-[10px] text-slate-500 flex items-center justify-end space-x-0.5">
                      <Flame className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                      <span>{user.streak}d</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gamification Profile Badges Catalog */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
              <Award className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Network Badges
              </h3>
            </div>

            <div className="space-y-2.5">
              {badgesCatalog.map(badge => (
                <div
                  key={badge.id}
                  className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center space-x-1.5">
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                      <span>{badge.name}</span>
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 font-mono">
                      {badge.rarity}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    {badge.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Modal: Broadcast New Intent Post */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <PlusCircle className="w-5 h-5 text-indigo-400" />
                <span>Broadcast High-Signal Post</span>
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePostSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="mentorship">Mentorship & Architecture Reviews</option>
                  <option value="jobs">Jobs & Direct Referrals</option>
                  <option value="startup">Startup Ideas & Campus Grants</option>
                  <option value="events">Events & Technical Hackathons</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Post Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Sponsoring 2 Final-Year Cloud Projects with AWS Credits"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Description & Ask</label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="State specifically what you are offering or seeking. Zero generic spam."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Go, Kubernetes, Mentorship, YC"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="chk-pow"
                  checked={powRequired}
                  onChange={(e) => setPowRequired(e.target.checked)}
                  className="rounded border-slate-700 text-indigo-600 focus:ring-0"
                />
                <label htmlFor="chk-pow" className="text-xs text-slate-300 cursor-pointer">
                  Require verified Proof-of-Work repo dossier to reply
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs shadow-md shadow-indigo-600/30"
                >
                  Publish Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
