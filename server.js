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

app.listen(PORT, () => {
  console.log(`🚀 NexusIQ Full-Stack Engine running live at http://localhost:${PORT}`);
});
