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
import { registerUser, loginUser, getCurrentUser, forgotPassword, resetPassword, updateUserSettings, ensureInitialUsers } from './server/controllers/authController.js';
import { getStudentMissions, generateCareerMission, updateMissionTask, getOpportunityRescuePlan, updateCareerGoal } from './server/controllers/missionController.js';
import { listCareerShadowScenarios, getScenarioDetail, evaluateSimulationStep, getStudentShadowHistory } from './server/controllers/shadowController.js';
import { findBridgePaths, requestBridgeIntroduction, listIntroductions, updateIntroductionStatus } from './server/controllers/bridgeController.js';
import { getLegacyPosts, createLegacyPost, upvoteLegacyPost, ensureInitialLegacyPosts } from './server/controllers/legacyController.js';
import { getFacultyChallenges, createFacultyChallenge, applyToChallenge, updateChallengeApplicationStatus, ensureInitialChallenges } from './server/controllers/challengeController.js';
import { extractHiringRequirements, generateProofOfWorkShortlist, sendInterviewInvitation, exportShortlistToCSV } from './server/controllers/recruiterController.js';
import { getNotifications, markNotificationAsRead, markAllNotificationsRead, getConversations, sendMessageInConversation, getOpportunityGapRadar } from './server/controllers/communicationController.js';
import {
  ensureFacultyData,
  getFacultyDashboard,
  getFacultyStudents,
  getFacultySupervisions,
  submitMilestoneReview,
  getFacultyCollaborations,
  inviteAlumniCoGuide,
  getFacultyProfile,
  updateFacultyProfile,
  decideChallengeApplication
} from './server/controllers/facultyController.js';
import {
  ensureInstitutionData,
  getInstitutionOverview,
  getInstitutionIntelligence,
  getInstitutionDepartments,
  saveInstitutionDepartment,
  deleteInstitutionDepartment,
  getInstitutionOutcomes,
  exportOutcomesToCSV,
  getInstitutionGovernance,
  updateInstitutionGovernance,
  getInstitutionAuditLogs
} from './server/controllers/institutionController.js';
import {
  ensureAlumniMentorshipData,
  getAlumniMentorshipDashboard,
  createAlumniMentorshipOffer,
  updateAlumniMentorshipOffer,
  deleteAlumniMentorshipOffer,
  respondToAlumniMentorshipRequest,
  completeAlumniMentorshipSession
} from './server/controllers/alumniMentorshipController.js';

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

// Alumni Mentorship Exchange endpoints
app.get('/api/alumni/mentorship/slots', (req, res) => {
  const slots = [
    { id: 'slot-1', mentorId: 'alumnus', mentorName: 'Rohan Mehta', role: 'SDE-2 Backend @ Swiggy', time: '14:00 - 14:45 UTC', topic: 'System Design & Distributed Concurrency', available: true },
    { id: 'slot-2', mentorId: 'mentor-aditi', mentorName: 'Aditi Rao', role: 'Cloud Architect @ Google Cloud', time: '16:00 - 16:45 UTC', topic: 'Cloud Infrastructure & K8s Architecture', available: true },
    { id: 'slot-3', mentorId: 'mentor-kunal', mentorName: 'Kunal Varma', role: 'Platform Engineer @ Atlassian', time: '11:00 - 11:45 UTC', topic: 'Mock Technical Interview & Resume Teardown', available: true }
  ];
  res.json({ success: true, slots });
});

app.post('/api/alumni/mentorship/book', (req, res) => {
  try {
    const db = req.readDB();
    const { slotId = 'slot-1', topic = 'Career Guidance', message = '' } = req.body;
    db.mentorshipBookings ||= [];
    const newBooking = {
      id: `booking-${Date.now()}`,
      slotId,
      studentId: 'student',
      studentName: 'Aman Sharma',
      mentorName: 'Rohan Mehta (Swiggy)',
      topic,
      message,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    db.mentorshipBookings.unshift(newBooking);
    req.writeDB(db);
    res.status(201).json({ success: true, booking: newBooking });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/alumni/mentorship/status', (req, res) => {
  try {
    const db = req.readDB();
    const { bookingId, status = 'confirmed', feedbackRating = 5 } = req.body;
    db.mentorshipBookings ||= [];
    let booking = db.mentorshipBookings.find(b => b.id === bookingId);
    if (!booking && db.mentorshipBookings.length > 0) {
      booking = db.mentorshipBookings[0];
    }
    if (!booking) {
      booking = { id: bookingId || `booking-${Date.now()}`, status: 'pending' };
      db.mentorshipBookings.unshift(booking);
    }
    booking.status = status;
    booking.feedbackRating = feedbackRating;
    booking.updatedAt = new Date().toISOString();
    req.writeDB(db);
    res.json({ success: true, booking });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// ================= DEDICATED ALUMNI IMPACT EXCHANGE & MENTORSHIP ROUTES =================
app.get('/api/alumni/mentorship/dashboard', (req, res) => {
  try {
    const db = req.readDB();
    const alumnusId = req.headers['x-linkx-persona-id'] || req.headers['x-user-role'] || 'alumnus';
    const data = getAlumniMentorshipDashboard(db, alumnusId);
    res.json(data);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.get('/api/alumni/mentorship/offers', (req, res) => {
  try {
    const db = req.readDB();
    const alumnusId = req.headers['x-linkx-persona-id'] || req.headers['x-user-role'] || 'alumnus';
    const data = getAlumniMentorshipDashboard(db, alumnusId);
    res.json({ success: true, offers: data.offers });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/alumni/mentorship/offers', (req, res) => {
  try {
    const db = req.readDB();
    const alumnusId = req.headers['x-linkx-persona-id'] || req.headers['x-user-role'] || 'alumnus';
    const offer = createAlumniMentorshipOffer(db, alumnusId, req.body, req.writeDB);
    res.status(201).json({ success: true, offer, message: 'Mentoring contribution offer created successfully.' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.put('/api/alumni/mentorship/offers/:id', (req, res) => {
  try {
    const db = req.readDB();
    const alumnusId = req.headers['x-linkx-persona-id'] || req.headers['x-user-role'] || 'alumnus';
    const offer = updateAlumniMentorshipOffer(db, alumnusId, req.params.id, req.body, req.writeDB);
    res.json({ success: true, offer, message: 'Mentoring offer updated successfully.' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.delete('/api/alumni/mentorship/offers/:id', (req, res) => {
  try {
    const db = req.readDB();
    const alumnusId = req.headers['x-linkx-persona-id'] || req.headers['x-user-role'] || 'alumnus';
    deleteAlumniMentorshipOffer(db, alumnusId, req.params.id, req.writeDB);
    res.json({ success: true, message: 'Mentoring offer withdrawn successfully.' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.get('/api/alumni/mentorship/requests', (req, res) => {
  try {
    const db = req.readDB();
    const alumnusId = req.headers['x-linkx-persona-id'] || req.headers['x-user-role'] || 'alumnus';
    const data = getAlumniMentorshipDashboard(db, alumnusId);
    res.json({ success: true, pendingRequests: data.pendingRequests, upcomingSessions: data.upcomingSessions });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/alumni/mentorship/requests/:id/respond', (req, res) => {
  try {
    const db = req.readDB();
    const alumnusId = req.headers['x-linkx-persona-id'] || req.headers['x-user-role'] || 'alumnus';
    const { action, notes } = req.body;
    const booking = respondToAlumniMentorshipRequest(db, alumnusId, req.params.id, action, notes, req.writeDB);
    res.json({ success: true, booking, message: `Mentorship request has been ${booking.status.toLowerCase()}.` });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/alumni/mentorship/sessions/:id/complete', (req, res) => {
  try {
    const db = req.readDB();
    const alumnusId = req.headers['x-linkx-persona-id'] || req.headers['x-user-role'] || 'alumnus';
    const booking = completeAlumniMentorshipSession(db, alumnusId, req.params.id, req.body, req.writeDB);
    res.json({ success: true, booking, message: 'Mentorship session marked as completed.' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

const handleStats = (req, res) => {
  const db = readDB();
  const totalBounties = db.bounties?.length || 0;
  const totalApplications = db.bounties?.reduce((sum, b) => sum + (b.applicants?.length || 0), 0) || 0;
  const totalReferrals = db.referrals?.length || 0;
  const approvedReferrals = db.referrals?.filter(r => r.status === 'referred').length || 0;

  const stats = {
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
  };

  res.json({
    success: true,
    stats,
    analytics: stats
  });
};
app.get('/api/institution/stats', handleStats);
app.get('/api/analytics', handleStats);

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
// Ensure initial data seeded
try {
  const initDb = readDB();
  ensureInitialUsers(initDb, writeDB);
  ensureInitialLegacyPosts(initDb, writeDB);
  ensureInitialChallenges(initDb, writeDB);
  ensureFacultyData(initDb, writeDB);
  ensureInstitutionData(initDb, writeDB);
  ensureAlumniMentorshipData(initDb, writeDB);
} catch (e) {
  console.warn('Initial seeding notice:', e.message);
}

// ================= AUTH & USER ROUTES =================
app.post('/api/auth/register', (req, res) => {
  try {
    const db = req.readDB();
    const result = registerUser(db, req.body, req.writeDB);
    res.status(201).json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const db = req.readDB();
    const result = loginUser(db, req.body, req.writeDB);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(401).json({ success: false, error: err.message });
  }
});

app.get('/api/auth/me', (req, res) => {
  const db = req.readDB();
  const user = getCurrentUser(db, req);
  if (!user) return res.status(401).json({ success: false, error: 'Not authenticated.' });
  res.json({ success: true, user });
});

app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.get('Authorization') || req.get('x-auth-token');
  const token = authHeader ? authHeader.replace(/^Bearer\s+/i, '') : null;
  if (token) {
    const db = req.readDB();
    if (db.sessions && db.sessions[token]) {
      delete db.sessions[token];
      req.writeDB(db);
    }
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

app.post('/api/auth/forgot-password', (req, res) => {
  try {
    const db = req.readDB();
    const result = forgotPassword(db, req.body, req.writeDB);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/auth/reset-password', (req, res) => {
  try {
    const db = req.readDB();
    const result = resetPassword(db, req.body, req.writeDB);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

const handleUpdateSettings = (req, res) => {
  try {
    const db = req.readDB();
    const user = getCurrentUser(db, req);
    const userId = user ? user.id : (req.body.userId || 'user-student');
    const updated = updateUserSettings(db, userId, req.body, req.writeDB);
    res.json({ success: true, user: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
app.patch('/api/auth/settings', handleUpdateSettings);
app.post('/api/auth/settings', handleUpdateSettings);

// ================= STUDENT CAREER MISSION & RESCUE ROUTES =================
app.get('/api/student/missions', (req, res) => {
  const db = req.readDB();
  const studentId = req.query.studentId || 'student';
  const missions = getStudentMissions(db, studentId);
  res.json({ success: true, missions, mission: missions[0] || null });
});

app.post('/api/student/missions', (req, res) => {
  try {
    const db = req.readDB();
    const mission = generateCareerMission(db, req.body, req.writeDB);
    res.status(201).json({ success: true, mission });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.patch('/api/student/missions/:id/tasks/:taskId', (req, res) => {
  try {
    const db = req.readDB();
    const done = req.body.done !== undefined ? Boolean(req.body.done) : true;
    const mission = updateMissionTask(db, req.params.id, req.params.taskId, done, req.writeDB);
    res.json({ success: true, mission });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/student/missions/tasks/toggle', (req, res) => {
  try {
    const db = req.readDB();
    const missionId = req.body.missionId || db.studentMissions?.[0]?.id || 'mission-1';
    const taskId = req.body.taskId || 't1';
    const done = req.body.done !== undefined ? Boolean(req.body.done) : true;
    const mission = updateMissionTask(db, missionId, taskId, done, req.writeDB);
    res.json({ success: true, mission });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

const handleUpdateCareerGoal = (req, res) => {
  try {
    const db = req.readDB();
    const studentId = req.headers['x-linkx-persona-id'] || req.headers['x-user-role'] || req.body.studentId || 'student';
    const payload = { ...req.body, studentId };
    const mission = updateCareerGoal(db, payload, req.writeDB);
    res.json({ success: true, mission, message: 'Career goal and roadmap updated successfully.' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
app.put('/api/student/missions/goal', handleUpdateCareerGoal);
app.post('/api/student/missions/goal', handleUpdateCareerGoal);

const handleOpportunityRescue = (req, res) => {
  try {
    const db = req.readDB();
    const studentId = req.headers['x-linkx-persona-id'] || req.headers['x-user-role'] || req.body.studentId || 'student';
    const plan = getOpportunityRescuePlan(db, { ...req.body, studentId });
    res.json(plan);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
app.post('/api/student/rescue', handleOpportunityRescue);
app.post('/api/student/opportunity-rescue', handleOpportunityRescue);

// ================= CAREER SHADOW SIMULATION ROUTES =================
app.get('/api/career-shadow/scenarios', (req, res) => {
  res.json({ success: true, scenarios: listCareerShadowScenarios() });
});

app.get('/api/career-shadow/scenarios/:id', (req, res) => {
  res.json({ success: true, scenario: getScenarioDetail(req.params.id) });
});

app.post('/api/career-shadow/evaluate', (req, res) => {
  try {
    const db = req.readDB();
    const evaluation = evaluateSimulationStep(db, req.body, req.writeDB);
    res.json({ success: true, evaluation });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.get('/api/career-shadow/history', (req, res) => {
  const db = req.readDB();
  const studentId = req.query.studentId || 'student';
  res.json({ success: true, history: getStudentShadowHistory(db, studentId) });
});

// ================= OPPORTUNITY BRIDGE AI ROUTES =================
app.get('/api/bridge/paths', (req, res) => {
  const db = req.readDB();
  const result = findBridgePaths(db, req.query);
  res.json(result);
});

const handleBridgeIntro = (req, res) => {
  try {
    const db = req.readDB();
    const request = requestBridgeIntroduction(db, req.body, req.writeDB);
    res.status(201).json({ success: true, introduction: request, request });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
app.post('/api/bridge/intro-request', handleBridgeIntro);
app.post('/api/bridge/request', handleBridgeIntro);

app.get('/api/bridge/introductions', (req, res) => {
  const db = req.readDB();
  res.json({ success: true, introductions: listIntroductions(db, req.query.role || 'student') });
});

app.patch('/api/bridge/introductions/:id/status', (req, res) => {
  try {
    const db = req.readDB();
    const reason = req.body.reason || req.body.notes || '';
    const updated = updateIntroductionStatus(db, req.params.id, req.body.status, reason, req.writeDB);
    res.json({ success: true, introduction: updated, request: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/bridge/status', (req, res) => {
  try {
    const db = req.readDB();
    const id = req.body.requestId || req.body.id || req.body.introductionId;
    const reason = req.body.reason || req.body.notes || '';
    const updated = updateIntroductionStatus(db, id, req.body.status, reason, req.writeDB);
    res.json({ success: true, introduction: updated, request: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// ================= ALUMNI LEGACY GRAPH ROUTES =================
app.get('/api/legacy-graph', (req, res) => {
  const db = req.readDB();
  res.json({ success: true, posts: getLegacyPosts(db, req.query) });
});

const handleCreateLegacyPost = (req, res) => {
  try {
    const db = req.readDB();
    const post = createLegacyPost(db, req.body, req.writeDB);
    res.status(201).json({ success: true, post });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
app.post('/api/legacy-graph', handleCreateLegacyPost);
app.post('/api/legacy-graph/posts', handleCreateLegacyPost);

app.post('/api/legacy-graph/:id/upvote', (req, res) => {
  try {
    const db = req.readDB();
    const post = upvoteLegacyPost(db, req.params.id, req.writeDB);
    res.json({ success: true, post });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/legacy-graph/upvote', (req, res) => {
  try {
    const db = req.readDB();
    const postId = req.body.postId || req.body.id;
    const post = upvoteLegacyPost(db, postId, req.writeDB);
    res.json({ success: true, post });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// ================= FACULTY CHALLENGE EXCHANGE ROUTES =================
app.get('/api/faculty/challenges', (req, res) => {
  const db = req.readDB();
  res.json({ success: true, challenges: getFacultyChallenges(db) });
});

app.post('/api/faculty/challenges', (req, res) => {
  try {
    const db = req.readDB();
    const challenge = createFacultyChallenge(db, req.body, req.writeDB);
    res.status(201).json({ success: true, challenge });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/faculty/challenges/:id/apply', (req, res) => {
  try {
    const db = req.readDB();
    const application = applyToChallenge(db, req.params.id, req.body, req.writeDB);
    res.status(201).json({ success: true, application });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/faculty/challenges/apply', (req, res) => {
  try {
    const db = req.readDB();
    const challengeId = req.body.challengeId || db.facultyChallenges?.[0]?.id || 'chal-1';
    const application = applyToChallenge(db, challengeId, req.body, req.writeDB);
    res.status(201).json({ success: true, application });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.patch('/api/faculty/challenges/:id/teams/:teamId/status', (req, res) => {
  try {
    const db = req.readDB();
    const app = updateChallengeApplicationStatus(db, req.params.id, req.params.teamId, req.body.status, req.writeDB);
    res.json({ success: true, application: app });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/faculty/challenges/:id/applications/:appId/decision', (req, res) => {
  try {
    const db = req.readDB();
    const { decision, rationale } = req.body;
    const result = decideChallengeApplication(db, req.params.id, req.params.appId, decision, rationale, req.writeDB);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// ================= DEDICATED FACULTY TEACHING & SUPERVISION ROUTES =================
app.get('/api/faculty/dashboard', (req, res) => {
  const db = req.readDB();
  res.json(getFacultyDashboard(db));
});

app.get('/api/faculty/students', (req, res) => {
  const db = req.readDB();
  res.json(getFacultyStudents(db, req.query));
});

app.get('/api/faculty/supervision', (req, res) => {
  const db = req.readDB();
  res.json(getFacultySupervisions(db));
});

app.post('/api/faculty/supervision/review', (req, res) => {
  try {
    const db = req.readDB();
    const result = submitMilestoneReview(db, req.body, req.writeDB);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.get('/api/faculty/collaborations', (req, res) => {
  const db = req.readDB();
  res.json(getFacultyCollaborations(db));
});

app.post('/api/faculty/collaborations/invite', (req, res) => {
  try {
    const db = req.readDB();
    const result = inviteAlumniCoGuide(db, req.body, req.writeDB);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.get('/api/faculty/profile', (req, res) => {
  const db = req.readDB();
  res.json(getFacultyProfile(db));
});

const handleUpdateFacultyProfile = (req, res) => {
  try {
    const db = req.readDB();
    const result = updateFacultyProfile(db, req.body, req.writeDB);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
app.patch('/api/faculty/profile', handleUpdateFacultyProfile);
app.put('/api/faculty/profile', handleUpdateFacultyProfile);
app.post('/api/faculty/profile', handleUpdateFacultyProfile);

// ================= RECRUITER & FOUNDER HIRING COPILOT ROUTES =================
app.post('/api/recruiter/copilot', (req, res) => {
  try {
    const result = extractHiringRequirements(req.body);
    const db = req.readDB();
    const shortlist = generateProofOfWorkShortlist(db, result.extractedCriteria);
    res.json({ ...result, ...shortlist });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/recruiter/shortlist', (req, res) => {
  try {
    const db = req.readDB();
    const result = generateProofOfWorkShortlist(db, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/recruiter/invite', (req, res) => {
  try {
    const db = req.readDB();
    const invitation = sendInterviewInvitation(db, req.body, req.writeDB);
    res.status(201).json({ success: true, invitation });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

const handleExportCSV = (req, res) => {
  let candidates = req.body?.candidates;
  if (!candidates || !candidates.length) {
    const db = req.readDB();
    const generated = generateProofOfWorkShortlist(db);
    candidates = generated.shortlist;
  }
  const csvData = exportShortlistToCSV(candidates);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="linkx_proof_of_work_shortlist.csv"');
  res.send(csvData);
};
app.post('/api/recruiter/export-csv', handleExportCSV);
app.get('/api/recruiter/export-csv', handleExportCSV);

// ================= NOTIFICATIONS & MESSAGING ROUTES =================
const handleGetNotifications = (req, res) => {
  const db = req.readDB();
  const role = req.query.role || req.get('x-linkx-persona-id') || 'student';
  res.json({ success: true, notifications: getNotifications(db, role) });
};
app.get('/api/notifications', handleGetNotifications);

app.patch('/api/notifications/:id/read', (req, res) => {
  const db = req.readDB();
  const notif = markNotificationAsRead(db, req.params.id, req.writeDB);
  res.json({ success: true, notification: notif });
});

app.post('/api/notifications/read-all', (req, res) => {
  const db = req.readDB();
  const role = req.body.role || req.get('x-linkx-persona-id') || 'student';
  const result = markAllNotificationsRead(db, role, req.writeDB);
  res.json(result);
});

app.post('/api/notifications/mark-read', (req, res) => {
  const db = req.readDB();
  const notifId = req.body.notificationId || req.body.id;
  if (notifId === 'all') {
    const role = req.body.role || req.get('x-linkx-persona-id') || 'student';
    const result = markAllNotificationsRead(db, role, req.writeDB);
    return res.json(result);
  }
  const notif = markNotificationAsRead(db, notifId, req.writeDB);
  res.json({ success: true, notification: notif });
});

const handleGetConversations = (req, res) => {
  const db = req.readDB();
  const role = req.query.role || req.get('x-linkx-persona-id') || 'student';
  res.json({ success: true, conversations: getConversations(db, role) });
};
app.get('/api/messages', handleGetConversations);
app.get('/api/messages/conversations', handleGetConversations);

app.post('/api/messages/send', (req, res) => {
  try {
    const db = req.readDB();
    const convId = req.body.conversationId || req.body.convId || db.conversations?.[0]?.id || 'conv-1';
    const msg = sendMessageInConversation(db, convId, req.body, req.writeDB);
    res.status(201).json({ success: true, message: msg });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/messages/:id', (req, res) => {
  try {
    const db = req.readDB();
    const msg = sendMessageInConversation(db, req.params.id, req.body, req.writeDB);
    res.status(201).json({ success: true, message: msg });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.get('/api/institution/gap-radar', (req, res) => {
  const db = req.readDB();
  res.json(getOpportunityGapRadar(db));
});

// ================= DEDICATED INSTITUTION ADMINISTRATION & STRATEGY ROUTES =================
function checkInstitutionAdmin(req, res, next) {
  const role = req.get('x-user-role') || req.get('x-linkx-persona-id') || req.user?.role || req.query.role || req.body?.role;
  if (role && !['institution', 'admin', 'platform_admin'].includes(role.toLowerCase())) {
    return res.status(403).json({ success: false, error: 'Access denied. Institutional administrator privileges required.' });
  }
  next();
}

app.get('/api/institution/overview', (req, res) => {
  const db = req.readDB();
  res.json(getInstitutionOverview(db));
});

app.get('/api/institution/intelligence', (req, res) => {
  const db = req.readDB();
  res.json(getInstitutionIntelligence(db));
});

app.get('/api/institution/departments', (req, res) => {
  const db = req.readDB();
  res.json(getInstitutionDepartments(db));
});

app.post('/api/institution/departments', checkInstitutionAdmin, (req, res) => {
  try {
    const db = req.readDB();
    const result = saveInstitutionDepartment(db, req.body, req.writeDB);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.delete('/api/institution/departments/:id', checkInstitutionAdmin, (req, res) => {
  try {
    const db = req.readDB();
    const result = deleteInstitutionDepartment(db, req.params.id, req.writeDB);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.get('/api/institution/outcomes', (req, res) => {
  const db = req.readDB();
  res.json(getInstitutionOutcomes(db));
});

app.get('/api/institution/export-outcomes-csv', (req, res) => {
  const db = req.readDB();
  const csvData = exportOutcomesToCSV(db);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="linkx_institutional_accreditation_outcomes.csv"');
  res.send(csvData);
});

app.get('/api/institution/governance', checkInstitutionAdmin, (req, res) => {
  const db = req.readDB();
  res.json(getInstitutionGovernance(db));
});

app.post('/api/institution/governance', checkInstitutionAdmin, (req, res) => {
  try {
    const db = req.readDB();
    const result = updateInstitutionGovernance(db, req.body, req.writeDB);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.get('/api/institution/audit-logs', checkInstitutionAdmin, (req, res) => {
  const db = req.readDB();
  ensureInstitutionData(db, () => {});
  res.json({ success: true, auditLogs: db.institutionAuditLogs || [] });
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
