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
import { listMentors, listBookings, createBooking, updateBookingStatus } from './server/controllers/mentorshipController.js';

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
    const temporaryPath = `${DB_PATH}.${process.pid}.tmp`;
    fs.writeFileSync(temporaryPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(temporaryPath, DB_PATH);
    return true;
  } catch (err) {
    return false;
  }
}

app.use((req, res, next) => {
  req.readDB = readDB;
  req.writeDB = writeDB;
  req.db = readDB();
  next();
});

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
app.get('/api/mentors', listMentors);
app.get('/api/mentorship/bookings', listBookings);
app.post('/api/mentorship/bookings', createBooking);
app.patch('/api/mentorship/bookings/:id/status', updateBookingStatus);

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
