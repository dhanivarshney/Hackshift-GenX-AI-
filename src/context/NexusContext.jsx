import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  MASTER_PERSONAS,
  DASHBOARD_POSTS,
  INSTITUTIONS_DATA,
  INITIAL_BOUNTIES,
  INITIAL_REFERRALS,
  SAMPLE_REPOS,
  GAMIFICATION_LEADERBOARD,
  BADGES_CATALOG
} from '../data/mockData';

const NexusContext = createContext();

export function NexusProvider({ children }) {
  const [personas, setPersonas] = useState(MASTER_PERSONAS);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [activeCategory, setActiveCategory] = useState('all');
  const [posts, setPosts] = useState(DASHBOARD_POSTS);
  const [bounties, setBounties] = useState(INITIAL_BOUNTIES);
  const [referrals, setReferrals] = useState(INITIAL_REFERRALS);
  const [latestAnalysis, setLatestAnalysis] = useState(null);
  const [institutions, setInstitutions] = useState(INSTITUTIONS_DATA);
  const [activeInstitutionId, setActiveInstitutionId] = useState('apex');
  const [toasts, setToasts] = useState([]);
  const [isIntentModalOpen, setIsIntentModalOpen] = useState(false);

  const activePersona = personas[currentRoleIndex] || personas[0];
  const activeInstitution = institutions.find(i => i.id === activeInstitutionId) || institutions[0];

  // Load saved session on mount & sync history
  useEffect(() => {
    const savedRole = localStorage.getItem('nexusiq_session_role');
    const savedAuth = localStorage.getItem('nexusiq_session_auth');
    if (savedAuth === 'true' && savedRole) {
      const idx = MASTER_PERSONAS.findIndex(p => p.id === savedRole);
      if (idx !== -1) {
        setCurrentRoleIndex(idx);
        setIsAuthenticated(true);
      }
    }

    if (typeof window !== 'undefined' && window.history && !window.history.state) {
      window.history.replaceState(
        { view: 'onboarding', roleId: savedRole || 'student', isAuthenticated: savedAuth === 'true' },
        '',
        window.location.pathname
      );
    }
  }, []);

  // Listen to popstate for browser history navigation
  useEffect(() => {
    const handlePopState = (e) => {
      const state = e.state;
      if (!state || state.isAuthenticated === false || state.view === 'onboarding') {
        setIsAuthenticated(false);
      } else if (state.isAuthenticated) {
        setIsAuthenticated(true);
        if (state.roleId) {
          const idx = personas.findIndex(p => p.id === state.roleId);
          if (idx !== -1) setCurrentRoleIndex(idx);
        }
        if (state.view) {
          setActiveView(state.view);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [personas]);

  const goBack = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (typeof window !== 'undefined' && window.history && window.history.length > 1) {
      window.history.back();
    } else {
      if (isAuthenticated) {
        if (activeView !== 'dashboard') {
          setActiveView('dashboard');
        } else {
          logout();
        }
      } else {
        showToast('Already at the initial screen.', 'info');
      }
    }
  };

  const triggerCelebration = () => {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.65 },
        colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#38bdf8']
      });
    }
  };

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const loginAs = (roleId, showCelebrationToast = true) => {
    const targetIdx = personas.findIndex(p => p.id === roleId);
    if (targetIdx === -1) return;

    setCurrentRoleIndex(targetIdx);
    setIsAuthenticated(true);
    localStorage.setItem('nexusiq_session_role', roleId);
    localStorage.setItem('nexusiq_session_auth', 'true');

    const targetPersona = personas[targetIdx];

    // Context-aware default views for each role
    let targetView = 'dashboard';
    if (roleId === 'alumnus') {
      targetView = 'referrals';
    } else if (roleId === 'founder') {
      targetView = 'bounties';
    } else if (roleId === 'institution') {
      targetView = 'institution';
    } else if (roleId === 'recruiter') {
      targetView = 'bounties';
    } else {
      targetView = 'dashboard';
    }
    setActiveView(targetView);

    if (typeof window !== 'undefined' && window.history && window.history.pushState) {
      window.history.pushState(
        { view: targetView, roleId, isAuthenticated: true },
        '',
        '#' + targetView
      );
    }

    if (showCelebrationToast) {
      triggerCelebration();
      showToast(`Welcome, ${targetPersona.name}! Authenticated to ${targetPersona.portalTitle}.`, 'success');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('nexusiq_session_auth');
    if (typeof window !== 'undefined' && window.history && window.history.pushState) {
      window.history.pushState(
        { view: 'onboarding', roleId: null, isAuthenticated: false },
        '',
        '#onboarding'
      );
    }
    showToast('Signed out from workspace. Select a role gateway.', 'info');
  };

  const switchRole = (roleId) => {
    const targetIdx = personas.findIndex(p => p.id === roleId);
    if (targetIdx === -1) return;
    setCurrentRoleIndex(targetIdx);
    localStorage.setItem('nexusiq_session_role', roleId);
    const target = personas[targetIdx];

    // Context-aware tab suggestion
    let nextView = activeView;
    if (roleId === 'alumnus' && activeView !== 'referrals') {
      nextView = 'referrals';
      setActiveView('referrals');
    } else if (roleId === 'founder' && activeView !== 'bounties') {
      nextView = 'bounties';
      setActiveView('bounties');
    } else if (roleId === 'institution' && activeView !== 'institution') {
      nextView = 'institution';
      setActiveView('institution');
    }

    if (typeof window !== 'undefined' && window.history && window.history.pushState) {
      window.history.pushState(
        { view: nextView, roleId, isAuthenticated: true },
        '',
        '#' + nextView
      );
    }

    showToast(`Switched view to ${target.portalTitle} (${target.name})`, 'info');
  };

  const updateIntent = (newIntent) => {
    setPersonas(prev => prev.map((p, idx) => {
      if (idx === currentRoleIndex) {
        return { ...p, activeIntent: newIntent };
      }
      return p;
    }));
    setIsIntentModalOpen(false);
    showToast(`Active Intent updated: "${newIntent}"`, 'success');
  };

  const upvotePost = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const hasUpvoted = post.userHasUpvoted;
        return {
          ...post,
          upvotes: hasUpvoted ? post.upvotes - 1 : post.upvotes + 1,
          userHasUpvoted: !hasUpvoted
        };
      }
      return post;
    }));
  };

  const createPost = (postData) => {
    const newPost = {
      id: `post-${Date.now()}`,
      author: activePersona.name,
      authorRole: `${activePersona.roleLabel} • ${activePersona.companyOrCollege}`,
      authorAvatar: activePersona.avatar,
      authorColor: activePersona.accentColor,
      institution: activePersona.companyOrCollege,
      category: postData.category || 'mentorship',
      title: postData.title,
      content: postData.content,
      intentBadge: postData.intentBadge || activePersona.activeIntent,
      tags: postData.tags || ['Community', 'NexusIQ'],
      timestamp: 'Just now',
      upvotes: 1,
      commentsCount: 0,
      proofOfWorkRequired: Boolean(postData.proofOfWorkRequired),
      userHasUpvoted: true,
      targetRoles: ['student', 'alumnus', 'founder', 'faculty', 'recruiter', 'institution']
    };

    setPosts(prev => [newPost, ...prev]);
    triggerCelebration();
    showToast('Broadcasting intent to the campus network!', 'success');
  };

  const analyzeRepo = (repoUrl, companyTarget, blockerAsk) => {
    // Check if matching sample exists
    const matchingSample = SAMPLE_REPOS.find(s => s.url.toLowerCase() === repoUrl.toLowerCase()) || SAMPLE_REPOS[0];

    const result = {
      ...matchingSample.metrics,
      repoUrl,
      companyTarget: companyTarget || matchingSample.companyTarget,
      blockerAsk: blockerAsk || matchingSample.blockerAsk
    };

    setLatestAnalysis(result);
    triggerCelebration();
    showToast(`Verified repository! Code Readiness: ${result.readinessScore}/100`, 'success');
    return result;
  };

  const dispatchReferral = (analysisData) => {
    const targetComp = analysisData.companyTarget || 'Swiggy';
    const newRef = {
      id: `ref-${Date.now()}`,
      studentName: activePersona.name,
      studentBranch: activePersona.branch,
      targetCompany: targetComp,
      alumnusName: targetComp === 'Swiggy' ? 'Rohan Mehta' : (targetComp === 'HyperScale AI' ? 'Neha Kapoor' : 'Aditi Rao'),
      repoUrl: analysisData.repoUrl || 'https://github.com/aman-cs/distri-cache-engine',
      readinessScore: analysisData.readinessScore || 94,
      summary: analysisData.executiveSummary || analysisData.architecturalHighlight || 'High-throughput code benchmarked with production test suites.',
      blockerAsk: analysisData.blockerAsk || 'Optimizing microservice latency under 10k RPS.',
      status: 'pending',
      timestamp: 'Just now',
      atsStatus: 'Ready for 1-Click Push'
    };

    setReferrals(prev => [newRef, ...prev]);
    triggerCelebration();
    showToast(`Dossier dispatched to ${targetComp} Alumnus Decision Inbox!`, 'success');
  };

  const applyToBounty = (bountyId, candidateName, repoUrl, pitch) => {
    setBounties(prev => prev.map(b => {
      if (b.id === bountyId) {
        const newApplicant = {
          name: candidateName || activePersona.name,
          repo: repoUrl,
          pitch,
          status: 'Under Review'
        };
        return {
          ...b,
          applicants: [...(b.applicants || []), newApplicant]
        };
      }
      return b;
    }));

    triggerCelebration();
    showToast('Application submitted with verified repository link!', 'success');
  };

  const postBounty = (bountyData) => {
    const newBounty = {
      id: `bounty-${Date.now()}`,
      type: bountyData.type || 'bounty',
      typeLabel: bountyData.type === 'capstone' ? 'Faculty-Alumni Capstone' : (bountyData.type === 'referral' ? 'Referral Radar Slot' : (bountyData.type === 'recruiter-job' ? 'Targeted Campus Job' : 'Micro-Bounty')),
      badgeClass: bountyData.type === 'capstone' ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' : (bountyData.type === 'referral' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-amber-500/10 text-amber-300 border-amber-500/20'),
      title: bountyData.title,
      poster: `${activePersona.name} (${activePersona.roleLabel} • ${activePersona.companyOrCollege})`,
      posterRole: activePersona.id,
      reward: bountyData.reward,
      deadline: 'Active for 7 Days',
      desc: bountyData.desc,
      tags: bountyData.tags || ['Bounty', 'NexusIQ'],
      applicants: []
    };

    setBounties(prev => [newBounty, ...prev]);
    triggerCelebration();
    showToast(`Published "${bountyData.title}" to Opportunity Exchange!`, 'success');
  };

  const updateReferralStatus = (refId, newStatus, feedback = '') => {
    setReferrals(prev => prev.map(ref => {
      if (ref.id === refId) {
        return {
          ...ref,
          status: newStatus,
          feedback,
          atsStatus: newStatus === 'referred' ? 'Pushed to Company ATS (Direct Fast-Track)' : 'Passed with Feedback'
        };
      }
      return ref;
    }));

    if (newStatus === 'referred') {
      triggerCelebration();
      showToast('1-Click Referral pushed directly into Internal ATS!', 'success');
    } else {
      showToast('Constructive feedback sent to student.', 'info');
    }
  };

  return (
    <NexusContext.Provider
      value={{
        personas,
        currentRoleIndex,
        activePersona,
        isAuthenticated,
        activeView,
        activeCategory,
        posts,
        bounties,
        referrals,
        latestAnalysis,
        institutions,
        activeInstitution,
        activeInstitutionId,
        setActiveInstitutionId,
        toasts,
        isIntentModalOpen,
        setIsIntentModalOpen,
        leaderboard: GAMIFICATION_LEADERBOARD,
        badgesCatalog: BADGES_CATALOG,
        goBack,
        loginAs,
        logout,
        switchRole,
        setActiveView,
        setActiveCategory,
        upvotePost,
        createPost,
        analyzeRepo,
        dispatchReferral,
        applyToBounty,
        postBounty,
        updateReferralStatus,
        updateIntent,
        triggerCelebration,
        showToast,
        removeToast
      }}
    >
      {children}
    </NexusContext.Provider>
  );
}

export function useNexus() {
  const context = useContext(NexusContext);
  if (!context) {
    throw new Error('useNexus must be used within a NexusProvider');
  }
  return context;
}
