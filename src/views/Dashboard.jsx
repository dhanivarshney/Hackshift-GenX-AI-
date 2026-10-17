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
  Filter,
  Send,
  X,
  Code2,
  Clock,
  ShieldCheck,
  Building
} from 'lucide-react';

const ROLE_SUGGESTIONS_MAP = {
  student: [
    {
      id: 'sug-s1',
      title: 'Swiggy Routing Team Referral Match (96% Synergy)',
      description: 'Rohan Mehta has 2 open referral slots. Your Redis caching engine matches his high-throughput Go stack.',
      actionLabel: 'Launch Pitch Lab',
      targetView: 'proof-of-work',
      badge: 'High Intent Match',
      accent: 'emerald'
    },
    {
      id: 'sug-s2',
      title: 'HyperScale AI ₹15,000 Micro-Bounty',
      description: 'Neha Kapoor posted an escrow-backed challenge for Next.js WebStreams latency testing.',
      actionLabel: 'Claim Bounty',
      targetView: 'bounties',
      badge: 'Escrow Backed',
      accent: 'amber'
    },
    {
      id: 'sug-s3',
      title: 'Razorpay Backend Talent Radar (Fast-Track ATS)',
      description: 'Vikram Seth is evaluating candidates with AST code readiness > 90/100.',
      actionLabel: 'View Campus Roles',
      targetView: 'bounties',
      badge: 'Targeted Hiring',
      accent: 'cyan'
    }
  ],
  alumnus: [
    {
      id: 'sug-a1',
      title: '2 Vetted Go Dossiers Awaiting Review',
      description: 'Aman Sharma submitted distri-cache-engine (94/100 AST score). Ready for 1-click ATS push.',
      actionLabel: 'Review in Decision Inbox',
      targetView: 'referrals',
      badge: 'Zero-Spam Queue',
      accent: 'emerald'
    },
    {
      id: 'sug-a2',
      title: 'Apex Capstone: Raft Consensus Engine Co-Guide',
      description: 'Dr. R.K. Verma is looking for a distributed systems alum to co-guide final year capstone.',
      actionLabel: 'Inspect Capstones',
      targetView: 'bounties',
      badge: 'Academic Tie',
      accent: 'purple'
    },
    {
      id: 'sug-a3',
      title: 'Sponsor a ₹10,000 Micro-Bounty',
      description: 'Fund a high-impact campus task and get production code from hungry builders in 48 hours.',
      actionLabel: 'Post on Exchange',
      targetView: 'bounties',
      badge: 'Ecosystem Impact',
      accent: 'amber'
    }
  ],
  founder: [
    {
      id: 'sug-f1',
      title: '4 High-Readiness Campus Builders Active',
      description: 'Top students with verified GitHub AST metrics (>90) available for micro-bounties and internships.',
      actionLabel: 'Explore Opportunity Exchange',
      targetView: 'bounties',
      badge: 'Pre-Vetted Talent',
      accent: 'amber'
    },
    {
      id: 'sug-f2',
      title: 'Stanford & Apex Lineage Syndicate Demo',
      description: 'Connect with 18 alumni founders and angel syndicates investing in campus-born ventures.',
      actionLabel: 'Open Lineage Graph',
      targetView: 'graph',
      badge: 'Angel Network',
      accent: 'indigo'
    },
    {
      id: 'sug-f3',
      title: 'Sponsor Hackathon Squad Grants',
      description: 'Disburse cloud credits or ₹25,000 hackathon grants for finalist student squads.',
      actionLabel: 'Post Bounty / Grant',
      targetView: 'bounties',
      badge: 'Escrow Backed',
      accent: 'emerald'
    }
  ],
  faculty: [
    {
      id: 'sug-fc1',
      title: '14 Industry Alum Co-Guides Available',
      description: 'SDE-2 and Staff Engineers at Swiggy, AWS, and Razorpay ready to co-mentor final-year capstones.',
      actionLabel: 'Review Co-Guides',
      targetView: 'bounties',
      badge: 'Capstone Syndicate',
      accent: 'purple'
    },
    {
      id: 'sug-fc2',
      title: 'Apex & Stanford Joint Research Lineage Node',
      description: 'Explore active academic collaboration edges between Apex R&D and Stanford AI Lab.',
      actionLabel: 'View Lineage Graph',
      targetView: 'graph',
      badge: 'Active Node',
      accent: 'indigo'
    },
    {
      id: 'sug-fc3',
      title: 'Publish Joint IEEE Capstone Paper',
      description: 'Partner student projects with alumni researchers for verified conference submissions.',
      actionLabel: 'Open Institution Hub',
      targetView: 'institution',
      badge: 'Accreditation Lift',
      accent: 'rose'
    }
  ],
  recruiter: [
    {
      id: 'sug-r1',
      title: 'Top 5% Campus Backend Builders Radar',
      description: '8 students with verified AST scores > 90 ready for fast-track 1st round scheduling.',
      actionLabel: 'Evaluate Candidates',
      targetView: 'bounties',
      badge: 'High Signal',
      accent: 'cyan'
    },
    {
      id: 'sug-r2',
      title: 'Alumni Staked Trust Endorsements',
      description: 'Review candidates endorsed with staked karma by senior alumni in your company.',
      actionLabel: 'View Referral Queue',
      targetView: 'referrals',
      badge: 'Staked Vouch',
      accent: 'emerald'
    },
    {
      id: 'sug-r3',
      title: 'Campus Node Placement Pipeline',
      description: 'Direct pipeline established with Apex Institute. 4,820 active engineering nodes.',
      actionLabel: 'Inspect Institution Node',
      targetView: 'institution',
      badge: 'Direct Pipeline',
      accent: 'rose'
    }
  ],
  institution: [
    {
      id: 'sug-i1',
      title: 'Real-Time Placement Outcome Metrics Up +38%',
      description: 'Verified warm referrals have doubled full-time offer conversion versus cold applications.',
      actionLabel: 'Inspect Hub Telemetry',
      targetView: 'institution',
      badge: 'Outcome ROI',
      accent: 'rose'
    },
    {
      id: 'sug-i2',
      title: '4,820 Campus Nodes Connected on Lineage Graph',
      description: 'Institutions functioning as large anchor nodes with active alumni and recruiter ties.',
      actionLabel: 'Explore Lineage Topology',
      targetView: 'graph',
      badge: 'Lineage Node',
      accent: 'indigo'
    },
    {
      id: 'sug-i3',
      title: '₹4.2 Lakhs in Escrow Bounties Disbursed',
      description: 'Students earning while learning through alumni-funded micro-bounties and capstone grants.',
      actionLabel: 'View Opportunity Exchange',
      targetView: 'bounties',
      badge: 'Disbursement Lift',
      accent: 'amber'
    }
  ]
};

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
    setIsIntentModalOpen,
    showToast
  } = useNexus();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('mentorship');
  const [newTags, setNewTags] = useState('');
  const [powRequired, setPowRequired] = useState(true);

  // Comments state per post
  const [openCommentsPostId, setOpenCommentsPostId] = useState(null);
  const [postComments, setPostComments] = useState({
    'post-1': [
      { id: 'c1', author: 'Aman Sharma', text: 'Just ran Redis distributed benchmarks on my fork, down to 1.4ms latency! Sending dossier now.', time: '10m ago' }
    ]
  });
  const [newCommentText, setNewCommentText] = useState('');

  // Filter posts by category
  const filteredPosts = posts.filter(post => {
    if (activeCategory === 'all') return true;
    return post.category === activeCategory;
  });

  // Role-specific personalized suggestions
  const personalizedSuggestions = ROLE_SUGGESTIONS_MAP[activePersona.id] || ROLE_SUGGESTIONS_MAP.student;

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

  const handleAddComment = (postId) => {
    if (!newCommentText.trim()) return;
    const commentObj = {
      id: `c-${Date.now()}`,
      author: activePersona.name,
      text: newCommentText.trim(),
      time: 'Just now'
    };
    setPostComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), commentObj]
    }));
    setNewCommentText('');
    showToast('Comment posted to intent thread!', 'success');
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
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 shadow-xl">
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
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Earned Badges:</span>
                {activePersona.badges.map((badgeName, idx) => (
                  <button
                    key={idx}
                    onClick={() => setIsBadgesModalOpen(true)}
                    className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[11px] font-medium hover:border-indigo-400 transition"
                    title="Click to view full badges catalog"
                  >
                    <Award className="w-3 h-3 text-indigo-400" />
                    <span>{badgeName}</span>
                  </button>
                ))}
                <button
                  onClick={() => setIsBadgesModalOpen(true)}
                  className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-2 ml-1"
                >
                  View All
                </button>
              </div>
            </div>
          </div>

          {/* Active Persona Intent Box & Broadcast Trigger */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 bg-slate-950/80 border border-slate-800/80 p-4 rounded-2xl min-w-[280px]">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                <span>Active Broadcast Intent:</span>
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

      {/* Main 3-Column Layout: Filter Sidebar (Left), Feed (Center), Leaderboard & Badges (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar: Categories & Personal Intent Highlights */}
        <div className="lg:col-span-3 space-y-5">
          
          {/* Category Filters */}
          <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 px-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>Feed Categories</span>
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
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Personalized For You
                </h3>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono font-semibold">
                {activePersona.roleLabel}
              </span>
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
                    className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white text-[11px] font-semibold transition flex items-center justify-center space-x-1 shadow-sm"
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
            <div className="flex items-center space-x-3 w-full">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center text-xs shrink-0">
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
            {filteredPosts.length === 0 ? (
              <div className="glass-panel rounded-2xl p-8 text-center text-slate-400 space-y-2 border border-slate-800">
                <Compass className="w-8 h-8 mx-auto text-slate-600" />
                <p className="text-sm font-semibold text-white">No posts in this category yet</p>
                <p className="text-xs text-slate-500">Be the first to broadcast an intent in this category!</p>
              </div>
            ) : (
              filteredPosts.map(post => {
                const CategoryIcon = getCategoryIcon(post.category);
                const comments = postComments[post.id] || [];
                const isCommentsOpen = openCommentsPostId === post.id;

                return (
                  <div
                    key={post.id}
                    className="glass-card glass-card-hover rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4 transition"
                  >
                    {/* Post Author Bar */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600/25 border border-indigo-500/30 text-indigo-300 font-bold flex items-center justify-center text-sm shadow-sm">
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
                      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
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

                        <button
                          onClick={() => setOpenCommentsPostId(isCommentsOpen ? null : post.id)}
                          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg transition ${
                            isCommentsOpen ? 'bg-slate-800 text-indigo-300' : 'hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{comments.length || post.commentsCount} Comments</span>
                        </button>
                      </div>

                      <button
                        onClick={() => setActiveView('graph')}
                        className="flex items-center space-x-1 hover:text-indigo-400 transition"
                        title="Inspect Lineage Node"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Lineage Node</span>
                      </button>
                    </div>

                    {/* Expandable Comments Section */}
                    {isCommentsOpen && (
                      <div className="pt-3 border-t border-slate-800/80 space-y-3 animate-in fade-in duration-150">
                        <div className="space-y-2">
                          {comments.length === 0 ? (
                            <p className="text-[11px] text-slate-500 italic">No comments yet. Start the conversation!</p>
                          ) : (
                            comments.map(c => (
                              <div key={c.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1">
                                <div className="flex items-center justify-between text-slate-400">
                                  <span className="font-bold text-white text-[11px]">{c.author}</span>
                                  <span className="text-[10px] font-mono">{c.time}</span>
                                </div>
                                <p className="text-slate-300 text-[11px]">{c.text}</p>
                              </div>
                            ))
                          )}
                        </div>

                        {/* Add Comment Input */}
                        <div className="flex items-center space-x-2 pt-1">
                          <input
                            type="text"
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(post.id); }}
                            placeholder="Add your verified comment..."
                            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                          />
                          <button
                            onClick={() => handleAddComment(post.id)}
                            className="p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition"
                            title="Send Comment"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
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
              <span className="text-[10px] text-slate-400 font-mono">Live Karma</span>
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

          {/* Gamification Profile Badges Catalog Widget */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-indigo-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Network Badges
                </h3>
              </div>
              <button
                onClick={() => setIsBadgesModalOpen(true)}
                className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Inspect All
              </button>
            </div>

            <div className="space-y-2.5">
              {badgesCatalog.slice(0, 4).map(badge => (
                <div
                  key={badge.id}
                  onClick={() => setIsBadgesModalOpen(true)}
                  className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1 cursor-pointer hover:border-indigo-500/40 transition"
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
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative glow-indigo">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <PlusCircle className="w-5 h-5 text-indigo-400" />
                <span>Broadcast High-Signal Post</span>
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
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
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
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
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Go, Kubernetes, Mentorship, YC"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
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
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs shadow-md shadow-indigo-600/30 transition"
                >
                  Publish Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Badges Catalog & Gamification Showcase */}
      {isBadgesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-7 space-y-5 shadow-2xl relative glow-indigo max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <Award className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">LinkX Badges & Reputation Catalog</h3>
              </div>
              <button
                onClick={() => setIsBadgesModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Badges are minted on the Lineage Graph based on real proof-of-work, zero-spam reviews, and verified referrals.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {badgesCatalog.map(badge => {
                const hasEarned = activePersona.badges.includes(badge.name);
                return (
                  <div
                    key={badge.id}
                    className={`p-3.5 rounded-2xl border transition space-y-2 ${
                      hasEarned
                        ? 'bg-indigo-950/40 border-indigo-500/40 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 opacity-75'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="font-bold text-white text-xs flex items-center space-x-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{badge.name}</span>
                      </div>
                      <span className={`text-[9px] px-2 py-0.5 rounded font-mono ${
                        hasEarned ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {hasEarned ? 'Unlocked' : badge.rarity}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {badge.desc}
                    </p>

                    <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800/80 flex items-center justify-between">
                      <span>Requirement:</span>
                      <span className="text-indigo-300 font-mono">{badge.requirement}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 text-center text-[10px] text-slate-500 font-mono">
              Reputation Engine • Verifiable On-Chain Credentials
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
