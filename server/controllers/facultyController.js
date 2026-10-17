// server/controllers/facultyController.js
// Dedicated Faculty Teaching, Mentoring & Project Supervision Controller

export function ensureFacultyData(db, writeDB) {
  let changed = false;

  if (!db.facultyProfile) {
    db.facultyProfile = {
      id: 'faculty-rkverma',
      name: 'Dr. R.K. Verma',
      title: 'Professor & Dean of Research & Development',
      department: 'Computer Science & Engineering',
      institution: 'Apex Institute of Technology',
      avatar: 'RV',
      email: 'rkverma@apex.edu',
      researchDomains: ['Cloud & Edge Computing', 'Distributed Systems', 'Network Security', 'Autonomous Systems'],
      publicationsCount: 42,
      officeHours: 'Tuesdays & Thursdays (14:00 - 17:00 UTC)',
      mentorshipPreferences: 'Accepting up to 4 final-year capstone squads in Distributed Systems & Kubernetes',
      visibilitySettings: {
        showPublications: true,
        showOfficeHours: true,
        allowDirectStudentPitch: true,
        requireSquadProposal: true
      }
    };
    changed = true;
  }

  if (!Array.isArray(db.facultySupervisions) || db.facultySupervisions.length === 0) {
    db.facultySupervisions = [
      {
        id: 'sup-1',
        challengeId: 'challenge-1',
        challengeTitle: 'Autonomous Kubernetes Autoscaler via Reinforcement Learning',
        teamId: 'team-edge-1',
        teamName: 'Distributed Edge Squad',
        leadStudent: 'Aman Sharma',
        members: ['Aman Sharma (CSE \'26)', 'Priya Nair (CSE \'26)', 'Siddharth Roy (IT \'26)'],
        repoUrl: 'https://github.com/aman-cs/distri-cache-engine',
        status: 'in_progress',
        currentMilestoneIndex: 1,
        milestones: [
          {
            id: 'm-1',
            title: 'Milestone 1: Architecture Blueprint & Load Simulation Harness',
            dueDate: '2026-10-25',
            submittedAt: '2026-10-16T14:30:00Z',
            submissionNotes: 'Implemented Locust load generation scripts and Locust telemetry Prometheus export.',
            status: 'approved',
            feedback: 'Excellent separation of concerns. Baseline latency figures confirmed.',
            reviewedAt: '2026-10-17T09:00:00Z'
          },
          {
            id: 'm-2',
            title: 'Milestone 2: RL Reward Function & Metric Feedback Loop',
            dueDate: '2026-11-10',
            submittedAt: '2026-10-18T01:15:00Z',
            submissionNotes: 'Drafted Q-learning policy agent with CPU throttled state penalty. Ready for faculty review.',
            status: 'pending_review',
            feedback: null,
            reviewedAt: null
          },
          {
            id: 'm-3',
            title: 'Milestone 3: Cluster Chaos Engineering & IEEE Paper Draft',
            dueDate: '2026-11-30',
            submittedAt: null,
            submissionNotes: null,
            status: 'not_started',
            feedback: null,
            reviewedAt: null
          }
        ],
        reviewHistory: [
          {
            milestoneId: 'm-1',
            reviewer: 'Dr. R.K. Verma',
            decision: 'approved',
            feedback: 'Architecture blueprint verified. Proceed to live policy integration.',
            timestamp: '2026-10-17T09:00:00Z'
          }
        ]
      },
      {
        id: 'sup-2',
        challengeId: 'challenge-2',
        challengeTitle: 'Zero-Knowledge Credential Verification for University Diplomas',
        teamId: 'team-zk-2',
        teamName: 'CryptoTrust Squad',
        leadStudent: 'Karan Mehra',
        members: ['Karan Mehra (CSE \'26)', 'Ananya Sen (CSE \'26)'],
        repoUrl: 'https://github.com/cryptotrust-apex/zk-diploma-snark',
        status: 'in_progress',
        currentMilestoneIndex: 0,
        milestones: [
          {
            id: 'm-2-1',
            title: 'Milestone 1: Circom ZK Circuit Definition',
            dueDate: '2026-10-28',
            submittedAt: '2026-10-17T18:00:00Z',
            submissionNotes: 'Circom constraints compile with 14,200 non-linear constraints. Requesting faculty review.',
            status: 'pending_review',
            feedback: null,
            reviewedAt: null
          }
        ],
        reviewHistory: []
      }
    ];
    changed = true;
  }

  if (!Array.isArray(db.facultyCollaborations) || db.facultyCollaborations.length === 0) {
    db.facultyCollaborations = [
      {
        id: 'collab-1',
        challengeId: 'challenge-1',
        challengeTitle: 'Autonomous Kubernetes Autoscaler',
        alumnusId: 'mentor-aditi',
        alumnusName: 'Aditi Rao',
        alumnusRole: 'Solutions Architect @ Google Cloud (Batch \'18)',
        topic: 'Industry Co-Guide for Kubernetes Infrastructure & Cloud Credits',
        status: 'accepted',
        invitedAt: '2026-10-01T10:00:00Z',
        respondedAt: '2026-10-02T14:00:00Z',
        nextSession: '2026-10-26 (Google Meet Cloud Review)',
        notes: 'Aditi confirmed \$2,500 Google Cloud credit grant for the capstone team.'
      },
      {
        id: 'collab-2',
        challengeId: 'challenge-3',
        challengeTitle: 'High-Frequency Financial Market Simulator',
        alumnusId: 'alumnus',
        alumnusName: 'Rohan Mehta',
        alumnusRole: 'SDE-2 Backend @ Swiggy (Batch \'20)',
        topic: 'Low-Latency Lock-Free Data Structures Code Review',
        status: 'invited',
        invitedAt: '2026-10-15T11:30:00Z',
        respondedAt: null,
        nextSession: 'Pending confirmation',
        notes: 'Invited Rohan to host a 1-hour weekend architecture teardown with 2 capstone teams.'
      }
    ];
    changed = true;
  }

  if (changed && writeDB) {
    writeDB(db);
  }
}

// 1. Faculty Dashboard Summary
export function getFacultyDashboard(db) {
  ensureFacultyData(db, () => {});

  const supervisions = db.facultySupervisions || [];
  const challenges = db.facultyChallenges || [];
  const collabs = db.facultyCollaborations || [];

  const activeSupervisions = supervisions.filter(s => s.status === 'in_progress');
  const pendingReviews = [];
  
  supervisions.forEach(s => {
    (s.milestones || []).forEach(m => {
      if (m.status === 'pending_review') {
        pendingReviews.push({
          supervisionId: s.id,
          teamName: s.teamName,
          leadStudent: s.leadStudent,
          challengeTitle: s.challengeTitle,
          milestoneId: m.id,
          milestoneTitle: m.title,
          submittedAt: m.submittedAt,
          submissionNotes: m.submissionNotes,
          dueDate: m.dueDate
        });
      }
    });
  });

  const totalStudents = supervisions.reduce((sum, s) => sum + (s.members ? s.members.length : 0), 0);
  const activeCoGuides = collabs.filter(c => c.status === 'accepted').length;

  const dashboardStats = {
    assignedProjects: activeSupervisions.length,
    activeStudentTeams: supervisions.length,
    pendingMilestones: pendingReviews.length,
    alumniCoGuides: activeCoGuides
  };

  const deadlinesFormatted = [
    { milestone: 'Milestone 1 Final Verification (Edge Squad)', date: '2026-10-25', task: 'Milestone 1 Final Verification (Edge Squad)' },
    { milestone: 'Circom ZK Circuit Review (CryptoTrust)', date: '2026-10-28', task: 'Circom ZK Circuit Review (CryptoTrust)' },
    { milestone: 'Mid-Term Capstone Evaluation & Faculty Grade Submission', date: '2026-11-05', task: 'Mid-Term Capstone Evaluation & Faculty Grade Submission' }
  ];

  return {
    success: true,
    profile: db.facultyProfile,
    dashboard: {
      stats: dashboardStats,
      activeSupervisions: supervisions,
      pendingReviews,
      upcomingDeadlines: deadlinesFormatted
    },
    summary: {
      supervisedProjectsCount: activeSupervisions.length,
      activeStudentTeamsCount: supervisions.length,
      totalGuidedStudents: totalStudents,
      pendingMilestoneReviewsCount: pendingReviews.length,
      activeAlumniCoGuidesCount: activeCoGuides,
      activePublishedChallengesCount: challenges.length
    },
    pendingReviews,
    activeProjects: supervisions.map(s => ({
      id: s.id,
      challengeTitle: s.challengeTitle,
      teamName: s.teamName,
      leadStudent: s.leadStudent,
      membersCount: s.members ? s.members.length : 0,
      repoUrl: s.repoUrl,
      currentMilestone: s.milestones[s.currentMilestoneIndex]?.title || 'Final Wrap-up',
      progressPercent: Math.round(((s.milestones.filter(m => m.status === 'approved').length) / Math.max(1, s.milestones.length)) * 100)
    })),
    upcomingDeadlines: deadlinesFormatted
  };
}

// 2. Discover Students & Evidence Dossiers
export function getFacultyStudents(db, query = {}) {
  ensureFacultyData(db, () => {});
  const { skill, search } = query;

  // Pool of verified candidate students from profiles & referrals
  const students = [
    {
      id: 'student-aman',
      name: 'Aman Sharma',
      branch: 'B.Tech CSE \'26',
      cgpa: '8.92',
      skills: ['Go', 'Distributed Systems', 'Redis', 'Docker', 'Kubernetes'],
      capabilityScore: 95,
      tier: 'Top 1% Exceptional Talent',
      activeSquad: 'Distributed Edge Squad',
      githubUrl: 'https://github.com/aman-cs/distri-cache-engine',
      repoName: 'distri-cache-engine',
      verifiedTestCoverage: '92.4% Unit Tests',
      alumniEndorsed: true,
      endorser: 'Rohan Mehta (Swiggy SDE-2)'
    },
    {
      id: 'student-priya',
      name: 'Priya Nair',
      branch: 'B.Tech CSE \'26',
      cgpa: '9.14',
      skills: ['Python', 'Kafka', 'Docker', 'FastAPI', 'PostgreSQL'],
      capabilityScore: 92,
      tier: 'Top 5% Strong Builder',
      activeSquad: 'Distributed Edge Squad',
      githubUrl: 'https://github.com/priya-nair/async-stream-pipeline',
      repoName: 'async-stream-pipeline',
      verifiedTestCoverage: '89.1% Unit Tests',
      alumniEndorsed: true,
      endorser: 'Aditi Rao (Google Cloud)'
    },
    {
      id: 'student-siddharth',
      name: 'Siddharth Roy',
      branch: 'B.Tech IT \'26',
      cgpa: '8.65',
      skills: ['Go', 'Kubernetes', 'Prometheus', 'Chaos Mesh'],
      capabilityScore: 88,
      tier: 'Top 10% Verified Candidate',
      activeSquad: 'Distributed Edge Squad',
      githubUrl: 'https://github.com/siddharth-r/k8s-pod-telemetry',
      repoName: 'k8s-pod-telemetry',
      verifiedTestCoverage: '86.0% Unit Tests',
      alumniEndorsed: false,
      endorser: 'Academic Capstone Contributor'
    },
    {
      id: 'student-karan',
      name: 'Karan Mehra',
      branch: 'B.Tech CSE \'26',
      cgpa: '8.80',
      skills: ['Circom', 'Rust', 'Solidity', 'Cryptography'],
      capabilityScore: 90,
      tier: 'Top 5% Strong Builder',
      activeSquad: 'CryptoTrust Squad',
      githubUrl: 'https://github.com/cryptotrust-apex/zk-diploma-snark',
      repoName: 'zk-diploma-snark',
      verifiedTestCoverage: '91.2% Unit Tests',
      alumniEndorsed: false,
      endorser: 'Dr. R.K. Verma Research Mentee'
    }
  ];

  let filtered = students;
  if (skill) {
    const sLower = skill.toLowerCase();
    filtered = filtered.filter(s => s.skills.some(sk => sk.toLowerCase().includes(sLower)));
  }
  if (search) {
    const qLower = search.toLowerCase();
    filtered = filtered.filter(s => s.name.toLowerCase().includes(qLower) || s.branch.toLowerCase().includes(qLower) || s.activeSquad.toLowerCase().includes(qLower));
  }

  return { success: true, count: filtered.length, students: filtered };
}

// 3. Project Supervision & Milestone Review
export function getFacultySupervisions(db) {
  ensureFacultyData(db, () => {});
  return { success: true, supervisions: db.facultySupervisions || [] };
}

export function submitMilestoneReview(db, body, writeDB) {
  ensureFacultyData(db, writeDB);
  const { supervisionId, milestoneId, decision, status, score, feedback, reviewer = 'Dr. R.K. Verma' } = body || {};

  if (!supervisionId || !milestoneId) throw new Error('supervisionId and milestoneId are required.');

  const rawDecision = (decision || status || 'approved').toLowerCase().replace(' ', '_');
  const normalizedDecision = (rawDecision === 'approved' || rawDecision === 'pass') ? 'approved' : 'revision_requested';

  const sup = (db.facultySupervisions || []).find(s => s.id === supervisionId);
  if (!sup) throw new Error('Supervised project not found.');

  const milestone = sup.milestones.find(m => m.id === milestoneId) || sup.milestones[0];
  if (!milestone) throw new Error('Milestone not found.');

  milestone.status = (status === 'Approved' || normalizedDecision === 'approved') ? 'Approved' : 'Needs Revision';
  milestone.score = score !== undefined ? Number(score) : (milestone.score || 90);
  milestone.feedback = feedback || (normalizedDecision === 'approved' ? 'Milestone verified and approved.' : 'Please revise code benchmarks and test coverage.');
  milestone.reviewedAt = new Date().toISOString();

  sup.reviewHistory ||= [];
  sup.reviewHistory.unshift({
    milestoneId: milestone.id,
    milestoneTitle: milestone.title,
    reviewer,
    decision: normalizedDecision,
    score: milestone.score,
    feedback: milestone.feedback,
    timestamp: milestone.reviewedAt
  });

  // If approved and has next milestone, advance index
  if (normalizedDecision === 'approved') {
    const nextIdx = sup.milestones.findIndex(m => m.status === 'not_started' || m.status === 'in_progress');
    if (nextIdx !== -1) {
      sup.currentMilestoneIndex = nextIdx;
      sup.milestones[nextIdx].status = 'in_progress';
    }
  }

  // Notify student lead
  db.notifications ||= [];
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    recipient: 'student',
    type: 'milestone_review',
    title: normalizedDecision === 'approved' ? '✅ Capstone Milestone Approved!' : '⚠️ Milestone Revision Requested',
    message: `${reviewer} has reviewed ${milestone.title}: "${milestone.feedback}"`,
    actionUrl: '#faculty-challenges',
    read: false,
    createdAt: new Date().toISOString()
  });

  writeDB(db);
  return {
    success: true,
    review: {
      score: milestone.score,
      status: milestone.status,
      feedback: milestone.feedback
    },
    milestone,
    supervision: sup
  };
}

// 4. Alumni Co-Guide Collaborations
export function getFacultyCollaborations(db) {
  ensureFacultyData(db, () => {});
  return { success: true, collaborations: db.facultyCollaborations || [] };
}

export function inviteAlumniCoGuide(db, body, writeDB) {
  ensureFacultyData(db, writeDB);
  const { challengeId, challengeTitle, title, alumnusId, alumnusName, partnerName, company, alumnusRole, topic, area, notes } = body || {};

  const resolvedName = alumnusName || partnerName;
  const resolvedTitle = challengeTitle || title;
  const resolvedRole = alumnusRole || company || 'Industry Alumni Expert';
  const resolvedTopic = topic || area || 'Industry Co-Guidance & Architectural Validation';

  if (!resolvedTitle || !resolvedName) throw new Error('Project title and partner/alumnus name are required.');

  const newCollab = {
    id: `collab-${Date.now()}`,
    challengeId: challengeId || 'challenge-1',
    challengeTitle: resolvedTitle,
    title: resolvedTitle,
    alumnusId: alumnusId || 'mentor-alumnus',
    alumnusName: resolvedName,
    partnerName: resolvedName,
    company: resolvedRole,
    alumnusRole: resolvedRole,
    topic: resolvedTopic,
    area: resolvedTopic,
    status: 'invited',
    invitedAt: new Date().toISOString(),
    respondedAt: null,
    nextSession: 'Awaiting alumnus confirmation',
    notes: notes || 'Faculty requested industry co-guidance for final-year student capstone squad.'
  };

  db.facultyCollaborations ||= [];
  db.facultyCollaborations.unshift(newCollab);

  // Send in-app notification to alumni
  db.notifications ||= [];
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    recipient: 'alumnus',
    type: 'coguide_invite',
    title: '🎓 Faculty Co-Guide Invitation from Dr. R.K. Verma',
    message: `You have been invited as an industry co-guide for "${resolvedTitle}".`,
    actionUrl: '#mentorship',
    read: false,
    createdAt: new Date().toISOString()
  });

  writeDB(db);
  return { success: true, collaboration: newCollab };
}

// 5. Faculty Profile & Availability
export function getFacultyProfile(db) {
  ensureFacultyData(db, () => {});
  return { success: true, profile: db.facultyProfile };
}

export function updateFacultyProfile(db, body, writeDB) {
  ensureFacultyData(db, writeDB);
  const current = db.facultyProfile || {};
  const { researchDomains, officeHours, mentorshipPreferences, visibilitySettings, name, title, department } = body || {};

  db.facultyProfile = {
    ...current,
    name: name || current.name,
    title: title || current.title,
    department: department || current.department,
    researchDomains: Array.isArray(researchDomains) ? researchDomains : (researchDomains ? researchDomains.split(',').map(s => s.trim()) : current.researchDomains),
    officeHours: officeHours || current.officeHours,
    mentorshipPreferences: mentorshipPreferences || current.mentorshipPreferences,
    visibilitySettings: { ...current.visibilitySettings, ...(visibilitySettings || {}) },
    updatedAt: new Date().toISOString()
  };

  writeDB(db);
  return { success: true, profile: db.facultyProfile };
}

// 6. Challenge Application Decision (Accept/Reject Squad)
export function decideChallengeApplication(db, challengeId, teamId, decision, rationale, writeDB) {
  ensureFacultyData(db, writeDB);
  const challenge = (db.facultyChallenges || []).find(c => c.id === challengeId);
  if (!challenge) throw new Error('Challenge not found.');

  const app = (challenge.teamsApplied || []).find(t => t.teamId === teamId || t.id === teamId);
  if (!app) throw new Error('Team application not found.');

  app.status = decision; // 'accepted' | 'rejected'
  app.decisionRationale = rationale || (decision === 'accepted' ? 'Application accepted for faculty supervision.' : 'Application declined.');
  app.decidedAt = new Date().toISOString();

  // If accepted, instantiate supervision record if not exists
  if (decision === 'accepted') {
    db.facultySupervisions ||= [];
    const exists = db.facultySupervisions.some(s => s.challengeId === challengeId && s.teamId === teamId);
    if (!exists) {
      db.facultySupervisions.push({
        id: `sup-${Date.now()}`,
        challengeId: challenge.id,
        challengeTitle: challenge.title,
        teamId: app.teamId,
        teamName: app.teamName,
        leadStudent: app.leadStudent,
        members: app.members || [app.leadStudent],
        repoUrl: app.repoUrl || 'https://github.com/aman-cs/distri-cache-engine',
        status: 'in_progress',
        currentMilestoneIndex: 0,
        milestones: app.milestones || [
          { id: `m-${Date.now()}-1`, title: 'Milestone 1: Architecture Blueprint & Setup', dueDate: '2 Weeks', status: 'in_progress', feedback: null },
          { id: `m-${Date.now()}-2`, title: 'Milestone 2: Core Algorithm Implementation', dueDate: '5 Weeks', status: 'not_started', feedback: null },
          { id: `m-${Date.now()}-3`, title: 'Milestone 3: Benchmark Testing & Telemetry', dueDate: '8 Weeks', status: 'not_started', feedback: null }
        ],
        reviewHistory: []
      });
    }
  }

  // Notify lead student
  db.notifications ||= [];
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    recipient: 'student',
    type: 'application_decision',
    title: decision === 'accepted' ? '🎉 Capstone Squad Application Accepted!' : 'Capstone Application Update',
    message: `Dr. R.K. Verma has ${decision} your squad application for "${challenge.title}".`,
    actionUrl: '#faculty-challenges',
    read: false,
    createdAt: new Date().toISOString()
  });

  writeDB(db);
  return { success: true, application: app };
}
