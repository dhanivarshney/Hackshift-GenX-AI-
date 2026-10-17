// server/controllers/bridgeController.js

export function findBridgePaths(db, query = {}) {
  const { targetRole = 'Backend SDE', targetCompany = 'Swiggy' } = query;

  // Multi-step connection paths computed across campus network
  const paths = [
    {
      id: 'bridge-path-1',
      targetEntity: `${targetCompany} — Core Engineering`,
      targetRole,
      confidenceScore: 94,
      connectionHops: [
        {
          hopIndex: 1,
          type: 'student',
          name: 'Aman Sharma',
          role: 'CSE \'26 (You)',
          evidence: 'Verified Consistent-Hashing Go Engine (96/100 code readiness)'
        },
        {
          hopIndex: 2,
          type: 'faculty',
          name: 'Dr. R.K. Verma',
          role: 'Dean R&D • Distributed Systems Lead',
          relationship: 'B.Tech Capstone Project Faculty Guide',
          endorsement: 'Verified Academic & Systems Rigor'
        },
        {
          hopIndex: 3,
          type: 'alumnus',
          name: 'Rohan Mehta',
          role: 'SDE-2 Backend @ Swiggy (Batch \'20)',
          relationship: 'Co-mentored on Apex Autonomous Cloud Capstone',
          status: 'Actively Hiring 2 Interns for Team'
        }
      ],
      explanation: 'Dr. R.K. Verma co-guided Rohan Mehta’s capstone in 2020. Rohan has an active referral slot for Go engineers with distributed systems proof-of-work matching your exact repo.',
      consentRequired: true,
      bridgeType: 'Academic Lineage -> Alumnus Referral'
    },
    {
      id: 'bridge-path-2',
      targetEntity: 'HyperScale AI (YC W24)',
      targetRole: 'Founding Infrastructure Intern',
      confidenceScore: 91,
      connectionHops: [
        {
          hopIndex: 1,
          type: 'student',
          name: 'Aman Sharma',
          role: 'CSE \'26 (You)',
          evidence: 'Active Micro-Bounty Code Submission (Webhook Ingestion Engine)'
        },
        {
          hopIndex: 2,
          type: 'founder',
          name: 'Neha Kapoor',
          role: 'Founder & CEO @ HyperScale AI (Batch \'19)',
          relationship: 'Funded Campus Micro-Bounty',
          status: 'Direct Review Queue Active'
        }
      ],
      explanation: 'Direct economic proof-of-work link: Your code submission for Neha’s ₹5,000 webhook bounty qualifies you for direct founder interview skipping standard recruiter screening.',
      consentRequired: false,
      bridgeType: 'Proof-of-Work Bounty -> Founder Syndicate'
    },
    {
      id: 'bridge-path-3',
      targetEntity: 'Google Cloud Platform',
      targetRole: 'Cloud Solutions Associate',
      confidenceScore: 88,
      connectionHops: [
        {
          hopIndex: 1,
          type: 'student',
          name: 'Aman Sharma',
          role: 'CSE \'26 (You)',
          evidence: 'K8s Containerization Proof-of-Capability'
        },
        {
          hopIndex: 2,
          type: 'alumnus',
          name: 'Aditi Rao',
          role: 'Cloud Architect @ Google Cloud (Batch \'18)',
          relationship: 'Alumni Impact Exchange Mentor',
          status: '3 Open Guidance Slots This Month'
        }
      ],
      explanation: 'Aditi Rao is an active alumni mentor on LinkX with 8+ years cloud experience. Booking a 1:1 portfolio review unlocks internal Google referral channel.',
      consentRequired: true,
      bridgeType: 'Alumni Impact Exchange -> Enterprise Referral'
    }
  ];

  return {
    success: true,
    targetCompany,
    targetRole,
    pathsCount: paths.length,
    paths: paths.map(p => ({ ...p, nodes: p.connectionHops }))
  };
}

export function requestBridgeIntroduction(db, body, writeDB) {
  const { pathId, studentName = 'Aman Sharma', targetAlumnus = 'Rohan Mehta', targetCompany = 'Swiggy', intermediary = 'Dr. R.K. Verma', note } = body;

  db.introductions ||= [];
  
  const introRequest = {
    id: `intro-${Date.now()}`,
    pathId,
    studentName,
    intermediary,
    targetAlumnus,
    targetCompany,
    note: note || 'Requesting warm endorsement based on verified distributed caching proof-of-work.',
    status: 'pending_intermediary_consent',
    createdAt: new Date().toISOString(),
    statusHistory: [
      { status: 'pending_intermediary_consent', timestamp: new Date().toISOString(), message: `Intro request dispatched to ${intermediary} for consent.` }
    ]
  };

  db.introductions.unshift(introRequest);
  
  // Also create a notification for the intermediary
  db.notifications ||= [];
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    recipient: 'faculty',
    type: 'bridge_introduction',
    title: `Bridge Introduction Request from ${studentName}`,
    message: `${studentName} requested an introduction to alumnus ${targetAlumnus} at ${targetCompany}.`,
    actionUrl: '#bridge-finder',
    read: false,
    createdAt: new Date().toISOString()
  });

  writeDB(db);
  return introRequest;
}

export function listIntroductions(db, roleId = 'student') {
  db.introductions ||= [];
  return db.introductions;
}

export function updateIntroductionStatus(db, introId, action, writeDB) {
  db.introductions ||= [];
  const intro = db.introductions.find(i => i.id === introId);
  if (!intro) throw new Error('Introduction request not found.');

  intro.status = action; // 'approved', 'declined', 'withdrawn'
  intro.statusHistory ||= [];
  intro.statusHistory.push({
    status: action,
    timestamp: new Date().toISOString(),
    message: `Introduction was ${action}.`
  });

  writeDB(db);
  return intro;
}
