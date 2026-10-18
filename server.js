import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Modular Services & Controllers
import { fetchGitHubRepoDetails } from './server/services/githubService.js';
import { synthesizeDossier } from './server/services/aiService.js';
import { getBounties, createBounty, applyToBounty } from './server/controllers/bountyController.js';
import { getReferrals, createReferral, updateReferralAction } from './server/controllers/referralController.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

app.use(cors());
app.use(express.json());
const frontendDist = path.join(__dirname, 'frontend', 'dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
}
app.use(express.static(__dirname));

// Database Helpers
function readDB() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return { personas: [], bounties: [], referrals: [] };
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    return false;
  }
}

// ================= REST API ROUTES =================

// 1. Personas
app.get('/api/personas', (req, res) => {
  const db = readDB();
  res.json({ success: true, personas: db.personas });
});

// 2. Active Intent
app.post('/api/intent', (req, res) => {
  const { personaId, newIntent } = req.body;
  const db = readDB();
  const p = db.personas.find(x => x.id === personaId);
  if (p) {
    p.activeIntent = newIntent;
    writeDB(db);
    return res.json({ success: true, message: `Intent updated for ${p.name}`, persona: p });
  }
  res.status(404).json({ success: false, error: 'Persona not found' });
});

// 3. GitHub & AI Analysis (Owned by Member 3)
app.post('/api/analyze-repo', async (req, res) => {
  const { repoUrl, geminiKey } = req.body;
  if (!repoUrl) {
    return res.status(400).json({ success: false, error: 'repoUrl is required' });
  }

  try {
    const repoDetails = await fetchGitHubRepoDetails(repoUrl);
    const analysis = await synthesizeDossier(repoDetails, geminiKey);
    res.json({ success: true, analysis });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Bounties & Opportunities (Owned by Member 2)
app.get('/api/bounties', (req, res) => {
  const db = readDB();
  res.json({ success: true, bounties: getBounties(db) });
});

app.post('/api/bounties', (req, res) => {
  const db = readDB();
  const newBounty = createBounty(db, req.body, writeDB);
  res.json({ success: true, message: 'Bounty posted successfully!', bounty: newBounty });
});

app.post('/api/bounties/:id/apply', (req, res) => {
  const db = readDB();
  const application = applyToBounty(db, req.params.id, req.body, writeDB);
  if (!application) {
    return res.status(404).json({ success: false, error: 'Bounty not found' });
  }
  res.json({ success: true, message: 'Application submitted successfully!', application });
});

// 5. Referrals Decision Queue (Owned by Member 2)
app.get('/api/referrals', (req, res) => {
  const db = readDB();
  res.json({ success: true, referrals: getReferrals(db) });
});

app.post('/api/referrals', (req, res) => {
  const db = readDB();
  const newRef = createReferral(db, req.body, writeDB);
  res.json({ success: true, message: 'Referral dossier dispatched!', referral: newRef });
});

app.post('/api/referrals/:id/action', (req, res) => {
  const db = readDB();
  const updated = updateReferralAction(db, req.params.id, req.body, writeDB);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Referral request not found' });
  }
  res.json({ success: true, message: `Referral updated to ${req.body.action}!`, referral: updated });
});

// 6. Institution Analytics (Owned by Member 4)
app.get('/api/institution/stats', (req, res) => {
  const db = readDB();
  const totalBounties = db.bounties.length;
  const totalApplications = db.bounties.reduce((sum, b) => sum + b.applicants.length, 0);
  const totalReferrals = db.referrals.length;
  const approvedReferrals = db.referrals.filter(r => r.status === 'referred').length;

  res.json({
    success: true,
    stats: {
      activeNetworkMembers: 4820,
      totalBounties,
      totalApplications,
      totalReferrals,
      approvedReferrals,
      capstoneProjectsCount: 64,
      bountyDisbursementsInRupees: 420000 + (totalApplications * 2500),
      alumniEmployerClusters: [
        { name: 'Google / Alphabet', count: 142, hiringCount: 18, percentage: 78 },
        { name: 'Microsoft', count: 118, hiringCount: 12, percentage: 65 },
        { name: 'Swiggy & Zomato', count: 94, hiringCount: 9, percentage: 52 },
        { name: 'Startups & Founders', count: 76, bountyCount: totalBounties, percentage: 44 }
      ]
    }
  });
});

// 7. Student Profile & Holistic Proof-of-Capability Scoring Engine
app.get('/api/student/profile', (req, res) => {
  const db = readDB();
  const profile = db.studentProfile || {
    name: 'Aman Sharma',
    college: 'Apex Institute of Technology',
    branch: "B.Tech Computer Science & Engineering",
    batch: "Batch '26 (Final Year)",
    cgpa: "8.92",
    targetRole: "Backend Engineer / Distributed Systems SDE",
    skills: ["Go", "Distributed Systems", "Redis", "Docker", "PostgreSQL", "Kafka", "Kubernetes", "System Design"],
    githubUrl: "https://github.com/aman-cs/distri-cache-engine",
    leetcodeUrl: "https://leetcode.com/u/aman_sharma_99",
    portfolioUrl: "https://amansharma.dev",
    bio: "Distributed systems enthusiast • Built Redis caching engine with consistent hashing ring • Solved 280+ LeetCode problems",
    resume: {
      fileName: "Aman_Sharma_Resume_2026.pdf",
      fileSize: "142 KB",
      uploadedAt: new Date().toISOString(),
      summary: "Final year CSE student with proven experience building low-latency distributed caching layers, concurrency handling in Go, and microservices architecture.",
      rawText: "Aman Sharma | B.Tech CSE (8.92 CGPA) | Go, Distributed Systems, Redis, Kafka, Docker | Backend Engineering Intern @ CloudNative Labs"
    },
    capabilityScore: {
      overall: 95,
      resumeScore: 93,
      githubScore: 96,
      skillsScore: 94,
      academicScore: 92,
      tier: "Top 1% Exceptional Talent",
      badge: "Tier-1 Referral Ready",
      insights: [
        "Production-grade Go concurrency patterns implemented with zero memory leaks.",
        "Resume exhibits strong quantifiable metrics (35% latency drop, 15k events/sec).",
        "High test rigor (92.4% coverage) and consistent-hashing ring design."
      ]
    }
  };
  res.json({ success: true, profile });
});

app.post('/api/student/profile', (req, res) => {
  const db = readDB();
  const incoming = req.body || {};

  const skills = Array.isArray(incoming.skills) 
    ? incoming.skills 
    : (incoming.skills ? incoming.skills.split(',').map(s => s.trim()).filter(Boolean) : ["Go", "Distributed Systems", "Redis", "Docker"]);
  const cgpa = parseFloat(incoming.cgpa) || 8.92;
  const rawResume = (incoming.resume?.rawText || incoming.resumeText || '');

  // 1. Resume & ATS Score (heuristics: metrics, action verbs, structure)
  let resumeScore = 88;
  if (rawResume.length > 150) resumeScore += 2;
  if (/(\d+%\s*(latency|improvement|reduction|increase|boost)|\d+\s*(req\/sec|users|events|records))/i.test(rawResume)) resumeScore += 4;
  if (/(intern|engineer|lead|architect|developer|designer)/i.test(rawResume)) resumeScore += 2;
  resumeScore = Math.min(98, Math.max(76, resumeScore));

  // 2. GitHub & Code Architecture Score
  let githubScore = 93;
  if (incoming.githubUrl && incoming.githubUrl.includes('github.com')) githubScore += 3;
  githubScore = Math.min(99, Math.max(80, githubScore));

  // 3. Technical Skills Depth Score
  let skillsScore = Math.min(98, 80 + Math.min(skills.length * 2, 16));

  // 4. Academic & Problem Solving Score
  let academicScore = Math.min(98, Math.round(68 + (cgpa / 10) * 30));

  // Composite Weighted Score: 25% Resume + 35% GitHub + 20% Skills + 20% Academics
  const overall = Math.round(
    resumeScore * 0.25 +
    githubScore * 0.35 +
    skillsScore * 0.20 +
    academicScore * 0.20
  );

  let tier = 'Top 1% Exceptional Talent';
  let badge = 'Tier-1 Referral Ready';
  if (overall >= 93) {
    tier = 'Top 1% Exceptional Talent';
    badge = 'Verified High-Conviction';
  } else if (overall >= 88) {
    tier = 'Top 5% Strong Builder';
    badge = 'Verified Production-Ready';
  } else {
    tier = 'Top 15% Verified Candidate';
    badge = 'Active Candidate';
  }

  const capabilityScore = {
    overall,
    resumeScore,
    githubScore,
    skillsScore,
    academicScore,
    tier,
    badge,
    insights: [
      `Production-grade architecture evaluated for ${incoming.targetRole || 'Target Role'}.`,
      `Resume impact metrics verified: ATS score at ${resumeScore}%.`,
      `Solid academic foundation with ${cgpa} CGPA and verified skills matrix.`
    ]
  };

  const updatedProfile = {
    ...(db.studentProfile || {}),
    ...incoming,
    skills,
    cgpa: cgpa.toString(),
    capabilityScore,
    resume: {
      ...(db.studentProfile?.resume || {}),
      ...(incoming.resume || {}),
      rawText: rawResume || db.studentProfile?.resume?.rawText,
      uploadedAt: new Date().toISOString()
    },
    updatedAt: new Date().toISOString()
  };

  db.studentProfile = updatedProfile;

  // Sync student persona
  const studentPersona = db.personas?.find(p => p.id === 'student');
  if (studentPersona) {
    if (incoming.name) studentPersona.name = incoming.name;
    if (incoming.branch) studentPersona.branch = incoming.branch;
    if (incoming.college) studentPersona.companyOrCollege = incoming.college;
    if (incoming.bio) studentPersona.bio = incoming.bio;
    if (skills.length) studentPersona.skills = skills;
  }

  // Sync capability score into pending student referrals
  if (Array.isArray(db.referrals)) {
    db.referrals.forEach(ref => {
      if (ref.studentName === updatedProfile.name) {
        ref.capabilityScore = overall;
        ref.resumeScore = resumeScore;
        ref.githubScore = githubScore;
        ref.cgpa = cgpa.toString();
        ref.skills = skills;
        if (updatedProfile.resume?.summary) {
          ref.resumeSummary = updatedProfile.resume.summary;
        }
      }
    });
  }

  writeDB(db);
  res.json({
    success: true,
    message: 'Profile and Proof-of-Capability Score updated successfully!',
    profile: updatedProfile
  });
});

// ================= 8. LINKX ECOSYSTEM OPERATING SYSTEM ROUTES =================

// 8.1 Career Missions & Opportunity Rescue
app.get('/api/missions', (req, res) => {
  const db = readDB();
  res.json({ success: true, missions: db.missions || [] });
});

app.get('/api/opportunity-rescue', (req, res) => {
  const db = readDB();
  res.json({ success: true, rescue: db.opportunityRescue || {} });
});

// 8.2 Career Shadow Interactive Simulation
app.get('/api/career-shadow', (req, res) => {
  const db = readDB();
  res.json({ success: true, scenarios: db.careerShadowScenarios || [] });
});

app.post('/api/career-shadow/evaluate', (req, res) => {
  const { scenarioId, optionId, reasoning } = req.body;
  const db = readDB();
  const scenario = (db.careerShadowScenarios || []).find(s => s.id === scenarioId);
  if (!scenario) {
    return res.status(404).json({ success: false, error: 'Scenario not found' });
  }

  const selectedOpt = scenario.options.find(o => o.id === optionId);
  if (!selectedOpt) {
    return res.status(400).json({ success: false, error: 'Invalid option selected' });
  }

  // Calculate rubric & decision score
  let reasoningBonus = 0;
  if (reasoning && reasoning.length > 30) reasoningBonus += 4;
  const finalScore = Math.min(100, selectedOpt.score + reasoningBonus);

  res.json({
    success: true,
    result: {
      scenarioId,
      optionId,
      score: finalScore,
      feedback: selectedOpt.feedback,
      alumnusDebrief: scenario.alumnusDebrief,
      rubricPassed: finalScore >= 80,
      timestamp: new Date().toISOString()
    }
  });
});

// 8.3 Alumni Impact Exchange & Time Budget
app.get('/api/impact-offers', (req, res) => {
  const db = readDB();
  res.json({ success: true, offers: db.impactOffers || [] });
});

app.post('/api/impact-offers/:id/apply', (req, res) => {
  const { studentName, target, repoUrl, timeReq } = req.body;
  const db = readDB();
  const offer = (db.impactOffers || []).find(o => o.id === req.params.id);
  if (!offer) {
    return res.status(404).json({ success: false, error: 'Impact offer not found' });
  }

  if (offer.slotsLeft <= 0) {
    return res.status(400).json({ success: false, error: 'No slots left for this offer this month' });
  }

  offer.pendingRequests.push({
    studentName: studentName || 'Aman Sharma',
    target: target || 'Distributed Cache Eviction Engine',
    repoUrl: repoUrl || 'https://github.com/aman-cs/distri-cache-engine',
    timeReq: timeReq || '15 mins',
    status: 'pending',
    appliedAt: new Date().toISOString()
  });
  offer.slotsLeft = Math.max(0, offer.slotsLeft - 1);

  writeDB(db);
  res.json({ success: true, message: 'Request submitted to alumnus queue!', offer });
});

// 8.4 Alumni Legacy Graph Guides
app.get('/api/legacy-guides', (req, res) => {
  const db = readDB();
  res.json({ success: true, guides: db.legacyGuides || [] });
});

// 8.5 Faculty Challenge Exchange
app.get('/api/faculty/challenges', (req, res) => {
  const db = readDB();
  res.json({ success: true, challenges: db.facultyChallenges || [] });
});

app.post('/api/faculty/challenges', (req, res) => {
  const db = readDB();
  const { title, domain, stipendOrCredit, desc, requiredSkills, rubric } = req.body;
  const newChallenge = {
    id: `fac-chal-${Date.now()}`,
    professorName: 'Dr. R.K. Verma',
    dept: 'Dean R&D • Computer Science & Engineering',
    title: title || 'Real-time Distributed Event Stream Filter',
    domain: domain || 'Systems & Network Optimization',
    status: 'active',
    stipendOrCredit: stipendOrCredit || '4 Academic Credits + Co-Authorship',
    desc: desc || 'Build production-ready filtering engine with test coverage.',
    requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : ['Go', 'Distributed Systems'],
    industryAlumMentor: 'Rohan Mehta (Swiggy)',
    enrolledTeam: [],
    rubric: rubric || {
      performance: 'Sub-20ms P99 latency under simulated 10k RPS load.',
      coverage: '>= 90% unit test coverage with benchmarks.'
    },
    createdAt: new Date().toISOString()
  };

  if (!db.facultyChallenges) db.facultyChallenges = [];
  db.facultyChallenges.unshift(newChallenge);
  writeDB(db);

  res.json({ success: true, message: 'Faculty Challenge published to ecosystem!', challenge: newChallenge });
});

app.post('/api/faculty/challenges/:id/join', (req, res) => {
  const { studentName, role, capabilityScore } = req.body;
  const db = readDB();
  const challenge = (db.facultyChallenges || []).find(c => c.id === req.params.id);
  if (!challenge) {
    return res.status(404).json({ success: false, error: 'Challenge not found' });
  }

  const alreadyJoined = challenge.enrolledTeam.some(m => m.name === studentName);
  if (!alreadyJoined) {
    challenge.enrolledTeam.push({
      name: studentName || 'Aman Sharma',
      role: role || 'Lead Systems Contributor',
      capabilityScore: capabilityScore || 95,
      joinedAt: new Date().toISOString()
    });
    writeDB(db);
  }

  res.json({ success: true, message: 'Joined Faculty Challenge Team!', challenge });
});

// 8.6 Campus Opportunity Gap Radar
app.get('/api/gap-radar', (req, res) => {
  const db = readDB();
  res.json({ success: true, radar: db.gapRadar || { activeEcosystemAlerts: [] } });
});

// 8.7 Circular Reciprocity Syndicate & Micro-Grants Pool
app.get('/api/syndicate', (req, res) => {
  const db = readDB();
  res.json({ success: true, pool: db.syndicatePool || { totalPool: 145000, fundedGrants: [], recentPlacements: [] } });
});

app.post('/api/syndicate/simulate-hire', (req, res) => {
  const db = readDB();
  const pool = db.syndicatePool || { totalPool: 145000, fundedGrants: [], recentPlacements: [], corporateMatches: 45000 };
  const kickback = 20000;
  pool.totalPool += kickback;
  pool.corporateMatches += kickback;

  const newPlacement = {
    candidateName: req.body.candidateName || 'Aman Sharma',
    company: req.body.company || 'Razorpay',
    role: req.body.role || 'High-Throughput Backend SDE Intern',
    referralAlum: req.body.referralAlum || 'Rohan Mehta (Swiggy)',
    kickbackAmount: '₹' + kickback.toLocaleString('en-IN'),
    date: 'Just now'
  };
  pool.recentPlacements.unshift(newPlacement);

  // Auto-allocate a new micro-grant from the pool
  const newGrant = {
    id: `grant-${Date.now()}`,
    title: 'Autonomous Hackathon Finalist GPU Compute & Travel Pass',
    recipient: 'Junior Distributed Systems Guild (2 Mentees)',
    amount: '₹10,000',
    fundedBy: `${newPlacement.company} Placement Kickback via LinkX Syndicate`,
    status: 'Disbursed',
    impact: 'Funded AWS GPU instances & train travel for upcoming National Hackathon Finals.'
  };
  pool.fundedGrants.unshift(newGrant);
  pool.activeGrantsCount = (pool.activeGrantsCount || 3) + 1;

  // Add live event to activity stream
  if (!db.liveActivityFeed) db.liveActivityFeed = [];
  db.liveActivityFeed.unshift({
    id: `act-${Date.now()}`,
    tag: 'SYNDICATE',
    icon: 'coins',
    color: 'amber',
    text: `🎉 ₹20,000 corporate kickback unlocked from ${newPlacement.candidateName}'s offer at ${newPlacement.company}!`
  });

  db.syndicatePool = pool;
  writeDB(db);

  res.json({
    success: true,
    message: `Placement verified! ₹${kickback.toLocaleString('en-IN')} added to campus syndicate pool.`,
    pool,
    newGrant
  });
});

// 8.8 Verified Candidate ATS Export (Greenhouse / Workday JSON Payload)
app.get('/api/candidates/:id/ats-dossier', (req, res) => {
  const db = readDB();
  res.json({
    success: true,
    dossier: db.atsDossier || {}
  });
});

// 8.9 Live Campus Activity Stream
app.get('/api/activity-stream', (req, res) => {
  const db = readDB();
  res.json({
    success: true,
    stream: db.liveActivityFeed || []
  });
});

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`🚀 LinkX Full-Stack Engine running live at http://localhost:${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${port} is already in use. Trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(Number(PORT));
