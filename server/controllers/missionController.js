// server/controllers/missionController.js

export function getStudentMissions(db, studentId = 'student') {
  db.missions ||= [];
  let userMissions = db.missions.filter(m => m.studentId === studentId);
  
  if (userMissions.length === 0) {
    // Seed default mission for Aman Sharma
    const defaultMission = {
      id: `mission-${Date.now()}`,
      studentId,
      goal: 'Secure Backend / Distributed Systems SDE Role at High-Scale Tech Company',
      targetRole: 'Distributed Systems SDE-1',
      targetCompanies: ['Swiggy', 'Razorpay', 'Google Cloud', 'HyperScale AI'],
      progressPercent: 65,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      phases: [
        {
          id: 'phase-1',
          title: 'Phase 1: Deep Systems Architecture & Code Proof',
          status: 'completed',
          progress: 100,
          tasks: [
            { id: 'task-1-1', title: 'Implement consistent hashing ring in Go with virtual nodes', done: true },
            { id: 'task-1-2', title: 'Achieve 90%+ unit test coverage with concurrent race detector', done: true },
            { id: 'task-1-3', title: 'Synthesize verified 1-minute GitHub executive dossier', done: true }
          ]
        },
        {
          id: 'phase-2',
          title: 'Phase 2: Alumni Review & Industry Endorsement',
          status: 'in-progress',
          progress: 60,
          tasks: [
            { id: 'task-2-1', title: 'Book 1:1 systems architecture review with Rohan Mehta (Swiggy)', done: true },
            { id: 'task-2-2', title: 'Incorporate P99 latency benchmarks into project dossier', done: true },
            { id: 'task-2-3', title: 'Request consent-based introduction to Swiggy hiring team', done: false }
          ]
        },
        {
          id: 'phase-3',
          title: 'Phase 3: Production Micro-Bounty & Capstone Delivery',
          status: 'in-progress',
          progress: 35,
          tasks: [
            { id: 'task-3-1', title: 'Submit code proposal for HyperScale AI Webhook Bounty (₹5,000)', done: true },
            { id: 'task-3-2', title: 'Apply to Autonomous Edge Autoscaler Capstone with Dr. Verma', done: false },
            { id: 'task-3-3', title: 'Simulate high-throughput production incident in Career Shadow', done: false }
          ]
        },
        {
          id: 'phase-4',
          title: 'Phase 4: Interview Conversion & Offer Securing',
          status: 'pending',
          progress: 0,
          tasks: [
            { id: 'task-4-1', title: 'Complete Career Shadow Technical Systems Mock Interview', done: false },
            { id: 'task-4-2', title: 'Convert Alumni referral dossier into recruiter interview call', done: false }
          ]
        }
      ],
      recommendations: {
        projects: [
          { name: 'Distributed Key-Value Store', tech: 'Go, Raft, LevelDB', relevance: 'High' },
          { name: 'Idempotent Webhook Engine', tech: 'Redis, Kafka, Docker', relevance: 'Active Bounty' }
        ],
        mentors: [
          { name: 'Rohan Mehta', role: 'SDE-2 @ Swiggy', matchReason: 'Specializes in high-throughput Go backend services' },
          { name: 'Aditi Rao', role: 'Solutions Architect @ Google Cloud', matchReason: 'Expertise in Kubernetes and cloud scaling' }
        ],
        opportunities: [
          { title: 'Swiggy Backend SDE-1 Referral Pool', type: 'Alumni Referral', matchRate: '96%' },
          { title: 'HyperScale AI Micro-Bounty', type: 'Paid Bounty (₹5,000)', matchRate: '92%' }
        ]
      }
    };
    db.missions.push(defaultMission);
    userMissions = [defaultMission];
  }

  return userMissions;
}

export function generateCareerMission(db, body, writeDB) {
  const { studentId = 'student', goal, currentSkills, targetTimeline } = body;
  if (!goal) throw new Error('Career goal description is required.');

  const skillsList = Array.isArray(currentSkills) ? currentSkills : ['Go', 'Distributed Systems', 'Redis'];
  
  // Deterministic smart roadmapping based on goal keywords
  const isAI = /ai|ml|machine learning|llm|deep learning|vision/i.test(goal);
  const isCloud = /cloud|devops|kubernetes|docker|aws|gcp/i.test(goal);
  
  const phases = [
    {
      id: 'phase-1',
      title: `Phase 1: ${isAI ? 'Model Architecture & Evaluation Sandbox' : (isCloud ? 'Infrastructure as Code & Container Mastery' : 'Core Systems Architecture & Evidence')}`,
      status: 'in-progress',
      progress: 33,
      tasks: [
        { id: 'task-1-1', title: `Build production-grade ${isAI ? 'RAG pipeline with vector search' : (isCloud ? 'K8s operator with automated failover' : 'caching engine with zero memory leaks')}`, done: true },
        { id: 'task-1-2', title: 'Synthesize automated Proof-of-Work GitHub dossier', done: false },
        { id: 'task-1-3', title: 'Benchmark latency & throughput under simulated load', done: false }
      ]
    },
    {
      id: 'phase-2',
      title: 'Phase 2: Alumni Endorsement & Project Feedback',
      status: 'pending',
      progress: 0,
      tasks: [
        { id: 'task-2-1', title: 'Book 1:1 guidance session with industry alumnus', done: false },
        { id: 'task-2-2', title: 'Refine repository based on senior engineer code review', done: false },
        { id: 'task-2-3', title: 'Receive verified capability endorsement', done: false }
      ]
    },
    {
      id: 'phase-3',
      title: 'Phase 3: Campus Capstone & Startup Opportunity Application',
      status: 'pending',
      progress: 0,
      tasks: [
        { id: 'task-3-1', title: 'Deliver real micro-bounty for campus founder', done: false },
        { id: 'task-3-2', title: 'Complete Career Shadow professional simulation', done: false }
      ]
    },
    {
      id: 'phase-4',
      title: 'Phase 4: Direct Recruiter Dispatch & Interview Conversion',
      status: 'pending',
      progress: 0,
      tasks: [
        { id: 'task-4-1', title: 'Unlock Recruiter Proof-of-Work shortlist visibility', done: false },
        { id: 'task-4-2', title: 'Finalize summer internship / full-time role placement', done: false }
      ]
    }
  ];

  const mission = {
    id: `mission-${Date.now()}`,
    studentId,
    goal,
    targetRole: isAI ? 'AI / ML Research Engineer' : (isCloud ? 'Cloud Systems Engineer' : 'Backend & Distributed Systems SDE'),
    targetCompanies: isAI ? ['Anthropic', 'HyperScale AI', 'Google Cloud'] : ['Swiggy', 'Razorpay', 'Atlassian'],
    progressPercent: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    phases,
    recommendations: {
      projects: [
        { name: isAI ? 'Vector DB Retriever' : 'Distributed Key-Value Engine', tech: skillsList.slice(0, 3).join(', '), relevance: 'High' }
      ],
      mentors: [
        { name: isAI ? 'David Chen (Anthropic)' : 'Rohan Mehta (Swiggy)', matchReason: 'Direct domain synergy with target goal' }
      ],
      opportunities: (db.bounties || []).slice(0, 2).map(b => ({ title: b.title, type: b.typeLabel, matchRate: '94%' }))
    }
  };

  db.missions ||= [];
  db.missions.unshift(mission);
  writeDB(db);
  return mission;
}

export function updateMissionTask(db, missionId, taskId, done, writeDB) {
  db.missions ||= [];
  let mission = db.missions.find(m => m.id === missionId);
  if (!mission && db.missions.length > 0) {
    mission = db.missions[0];
  }
  if (!mission) {
    const defaultList = getStudentMissions(db, 'student');
    mission = defaultList[0];
  }

  let totalTasks = 0;
  let completedTasks = 0;
  let taskFound = false;

  mission.phases.forEach(ph => {
    let phaseTotal = ph.tasks.length;
    let phaseCompleted = 0;
    ph.tasks.forEach(t => {
      if (t.id === taskId || t.id.includes(taskId) || t.id.endsWith(taskId)) {
        t.done = done;
        taskFound = true;
      }
      if (t.done) {
        phaseCompleted++;
        completedTasks++;
      }
      totalTasks++;
    });
    ph.progress = Math.round((phaseCompleted / phaseTotal) * 100);
    ph.status = ph.progress === 100 ? 'completed' : (ph.progress > 0 ? 'in-progress' : 'pending');
  });

  if (!taskFound && mission.phases[0]?.tasks[0]) {
    mission.phases[0].tasks[0].done = done;
    completedTasks++;
  }

  mission.progressPercent = Math.round((completedTasks / totalTasks) * 100);
  mission.progressScore = mission.progressPercent;
  mission.updatedAt = new Date().toISOString();
  writeDB(db);
  return mission;
}

export function getOpportunityRescuePlan(db, body = {}) {
  const reason = body.reason || 'closed_opportunity';
  const missedRole = body.missedRole || body.targetRole || 'Backend SDE';
  const missedCompany = body.missedCompany || body.targetCompany || 'Swiggy';
  const missingSkill = body.missingSkill || 'Kafka & High-Throughput Pub/Sub';

  // Active alternative mentors with availability
  const availableMentors = [
    {
      id: 'alumnus',
      name: 'Rohan Mehta',
      company: 'Swiggy',
      domain: 'Backend & High-Throughput Microservices',
      openSlotsCount: 3,
      verifiedDate: 'Today (Live Verified)',
      reason: 'Direct match for distributed systems & Go pipelines'
    },
    {
      id: 'mentor-aditi',
      name: 'Aditi Rao',
      company: 'Google Cloud',
      domain: 'Cloud Architecture & Kubernetes',
      openSlotsCount: 2,
      verifiedDate: 'Today (Live Verified)',
      reason: 'Active capstone co-guide with Google Cloud credits'
    }
  ];

  // Verified alternative opportunities in db
  const alternativeOpportunities = (db.bounties || []).filter(b => b.deadline !== 'Closed').map(b => ({
    id: b.id,
    title: b.title,
    reward: b.reward,
    type: b.typeLabel,
    poster: b.poster,
    tags: b.tags,
    status: 'Verified Active'
  }));

  const recommendedPracticeAction = {
    title: `Rapid Skill Sprint: Master ${missingSkill} via Practical Capstone`,
    description: `Close the ${missingSkill} gap in 48 hours by building an idempotent consumer group with automated offset management.`,
    targetBounty: 'Build Distributed Webhook Ingestion Service',
    estimatedTime: '2-3 days'
  };

  const rescuePlan = {
    missedTarget: `${missedRole} at ${missedCompany}`,
    portfolioBridge: 'High-Throughput Go Distributed Cache Engine (96/100 readiness)',
    pivotOptions: [
      {
        pathId: 'pivot-1',
        title: 'Alumni-Endorsed Fast-Track Referral',
        targetCompany: 'Razorpay / Stripe Partner',
        matchConfidence: 94,
        rationale: 'Core systems match your consistent-hashing ring proof-of-work.'
      },
      {
        pathId: 'pivot-2',
        title: 'High-Impact Paid Startup Micro-Bounty',
        targetCompany: 'HyperScale AI (YC W24)',
        matchConfidence: 91,
        rationale: 'Direct paid bounty converts to summer engineering internship in 48 hours.'
      },
      {
        pathId: 'pivot-3',
        title: 'Faculty IEEE Research Co-Guide Capstone',
        targetCompany: 'Google Cloud Academic Syndicate',
        matchConfidence: 89,
        rationale: 'Co-publish Kubernetes cluster autoscaler with Dr. Verma & Google Cloud mentor.'
      }
    ]
  };

  return {
    success: true,
    triggerReason: reason,
    timestamp: new Date().toISOString(),
    status: 'Plan Generated',
    rescuePlan,
    availableMentors,
    alternativeOpportunities,
    recommendedPracticeAction,
    insights: [
      'Opportunity rescue avoids dead ends by keeping 3 active parallel pipelines open.',
      'Alumni mentors Rohan Mehta & Aditi Rao are accepting student bookings this week.',
      'HyperScale AI Micro-Bounty is actively looking for candidates with your exact code profile.'
    ]
  };
}
