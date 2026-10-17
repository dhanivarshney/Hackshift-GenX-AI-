// server/controllers/challengeController.js

export function ensureInitialChallenges(db, writeDB) {
  if (!Array.isArray(db.facultyChallenges) || db.facultyChallenges.length === 0) {
    db.facultyChallenges = [
      {
        id: 'challenge-1',
        title: 'Autonomous Edge Kubernetes Autoscaler & Cluster Telemetry',
        facultyName: 'Dr. R.K. Verma',
        facultyDept: 'Professor & Dean R&D',
        institution: 'Apex Institute of Technology',
        industryPartner: 'Aditi Rao (Google Cloud)',
        requiredSkills: ['Kubernetes', 'Python', 'Go', 'Prometheus', 'Edge Computing'],
        teamSize: '3-4 Students',
        duration: '12 Weeks (Final Year Capstone)',
        deadline: '2026-11-15',
        deliverables: 'Functional custom K8s CRD operator, Locust load testing telemetry, and draft IEEE conference paper.',
        status: 'Active Applications Open',
        description: 'Joint research capstone project between Apex Institute and Google Cloud alumni. Teams will build an intelligent autoscaling operator that predicts microservice pod demand using ARIMA time-series models at the edge.',
        teamsApplied: [
          {
            teamId: 'team-distri-squad',
            teamName: 'Distributed Edge Squad',
            leadStudent: 'Aman Sharma',
            leadBranch: 'B.Tech CSE \'26',
            membersCount: 3,
            members: ['Aman Sharma (Go/K8s)', 'Priya Nair (ML/Python)', 'Rohan Das (Telemetry/Grafana)'],
            compatibilityScore: 96,
            repoUrl: 'https://github.com/aman-cs/distri-cache-engine',
            status: 'selected',
            appliedAt: '2026-10-12T11:00:00Z',
            milestones: [
              { title: 'Milestone 1: Custom CRD & Kube-Builder Setup', done: true, dueDate: 'Week 3' },
              { title: 'Milestone 2: Prometheus Metrics Collector', done: true, dueDate: 'Week 6' },
              { title: 'Milestone 3: Predictive Autoscaling Logic', done: false, dueDate: 'Week 9' },
              { title: 'Milestone 4: IEEE Paper Draft & Live Demo', done: false, dueDate: 'Week 12' }
            ]
          }
        ]
      },
      {
        id: 'challenge-2',
        title: 'Zero-Knowledge Credential Verification for University Diplomas',
        facultyName: 'Dr. Anita Joshi',
        facultyDept: 'Head of Information Security',
        institution: 'Apex Institute of Technology',
        industryPartner: 'HyperScale AI & Polygon Labs',
        requiredSkills: ['Cryptography', 'Rust / TypeScript', 'Solidity', 'System Design'],
        teamSize: '2-3 Students',
        duration: '8 Weeks',
        deadline: '2026-11-20',
        deliverables: 'ZK-SNARK proof verification smart contract, mobile verification app, and technical documentation.',
        status: 'Active Applications Open',
        description: 'Design a privacy-preserving diploma verification system allowing graduates to prove degree completion to employers without revealing confidential transcript details or personal identifiers.',
        teamsApplied: []
      },
      {
        id: 'challenge-3',
        title: 'High-Frequency Financial Market Microstructure Simulator',
        facultyName: 'Prof. Suresh Nair',
        facultyDept: 'Associate Dean of Computing',
        institution: 'Apex Institute of Technology',
        industryPartner: 'Vikram Seth (Razorpay Tech)',
        requiredSkills: ['C++ / Go', 'Low-Latency Sockets', 'Limit Order Books', 'Concurrency'],
        teamSize: '2-4 Students',
        duration: '10 Weeks',
        deadline: '2026-11-30',
        deliverables: 'Matching engine processing 100k msgs/sec with sub-millisecond tick-to-trade benchmarks.',
        status: 'Active Applications Open',
        description: 'Simulate high-frequency matching engine with L2/L3 order book data structures and lock-free concurrency rings.',
        teamsApplied: []
      }
    ];
    writeDB(db);
  }
}

export function getFacultyChallenges(db) {
  ensureInitialChallenges(db, () => {});
  return db.facultyChallenges || [];
}

export function createFacultyChallenge(db, body, writeDB) {
  const { title, facultyName, facultyDept, institution, industryPartner, requiredSkills, teamSize, duration, deadline, deliverables, description } = body;
  if (!title || !description) throw new Error('Title and description are required.');

  ensureInitialChallenges(db, writeDB);

  const newChallenge = {
    id: `challenge-${Date.now()}`,
    title,
    facultyName: facultyName || 'Faculty Member',
    facultyDept: facultyDept || 'Department of Computer Science',
    institution: institution || 'Apex Institute of Technology',
    industryPartner: industryPartner || 'Alumni Syndicate Partner',
    requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : (requiredSkills ? requiredSkills.split(',').map(s => s.trim()) : ['General Tech']),
    teamSize: teamSize || '2-4 Students',
    duration: duration || '8 Weeks',
    deadline: deadline || 'Open',
    deliverables: deliverables || 'Working prototype and project report.',
    status: 'Active Applications Open',
    description,
    teamsApplied: []
  };

  db.facultyChallenges.unshift(newChallenge);
  writeDB(db);
  return newChallenge;
}

export function applyToChallenge(db, challengeId, body, writeDB) {
  ensureInitialChallenges(db, writeDB);
  const challenge = db.facultyChallenges.find(c => c.id === challengeId);
  if (!challenge) throw new Error('Challenge not found.');

  const { teamName, leadStudent, leadBranch, members, repoUrl, pitch } = body;

  const membersArray = Array.isArray(members) ? members : (members ? members.split(',').map(s => s.trim()) : [leadStudent || 'Student']);

  const teamId = `team-${Date.now()}`;
  const application = {
    id: teamId,
    teamId,
    teamName: teamName || `${leadStudent || 'Student'}'s Team`,
    leadStudent: leadStudent || 'Aman Sharma',
    leadBranch: leadBranch || 'B.Tech CSE \'26',
    membersCount: membersArray.length,
    members: membersArray,
    compatibilityScore: 94,
    repoUrl: repoUrl || 'https://github.com/aman-cs/distri-cache-engine',
    pitch: pitch || 'Applying with verified systems and distributed computing repository.',
    status: 'pending',
    appliedAt: new Date().toISOString(),
    milestones: [
      { title: 'Milestone 1: Architecture Blueprint & Setup', done: false, dueDate: 'Week 2' },
      { title: 'Milestone 2: Core Algorithm Implementation', done: false, dueDate: 'Week 5' },
      { title: 'Milestone 3: Benchmark Testing & Telemetry', done: false, dueDate: 'Week 8' }
    ]
  };

  challenge.teamsApplied ||= [];
  challenge.teamsApplied.unshift(application);
  writeDB(db);
  return application;
}

export function updateChallengeApplicationStatus(db, challengeId, teamId, status, writeDB) {
  ensureInitialChallenges(db, writeDB);
  const challenge = db.facultyChallenges.find(c => c.id === challengeId);
  if (!challenge) throw new Error('Challenge not found.');

  const app = challenge.teamsApplied?.find(t => t.teamId === teamId);
  if (!app) throw new Error('Team application not found.');

  app.status = status; // 'selected', 'declined'
  writeDB(db);
  return app;
}
