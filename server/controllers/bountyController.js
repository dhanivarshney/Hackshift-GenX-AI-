// Member 2: Backend API & Database Lead
// File: server/controllers/bountyController.js

export function getBounties(db) {
  return db.bounties || [];
}

export function createBounty(db, body, writeDB) {
  const { title, poster, posterRole, reward, tags, desc, type, deadline } = body;

  const newBounty = {
    id: `bounty-${Date.now()}`,
    type: type || 'bounty',
    typeLabel: type === 'referral' ? 'Referral Radar' : (type === 'capstone' ? 'Industry Capstone' : 'Micro-Bounty'),
    badgeClass: type === 'referral' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    title,
    poster: poster || 'Alumni Contributor',
    posterRole: posterRole || 'alumnus',
    reward,
    tags: Array.isArray(tags) ? tags : ['General', 'Campus Talent'],
    desc,
    deadline: deadline || 'Open',
    applicants: []
  };

  db.bounties.unshift(newBounty);
  writeDB(db);
  return newBounty;
}

export function applyToBounty(db, bountyId, body, writeDB) {
  const { candidateName, candidateRole, repoUrl, pitch } = body;
  const bounty = db.bounties.find(b => b.id === bountyId);

  if (!bounty) return null;

  const application = {
    candidateName: candidateName || 'Aman Sharma',
    candidateRole: candidateRole || 'CSE \'26',
    repoUrl: repoUrl || 'https://github.com/aman-cs/project',
    pitch: pitch || 'Submitting active repository for consideration.',
    appliedAt: new Date().toISOString()
  };

  bounty.applicants.push(application);
  writeDB(db);
  return application;
}
