// Member 2: Backend API & Database Lead
// File: server/controllers/referralController.js

export function getReferrals(db) {
  return db.referrals || [];
}

export function createReferral(db, body, writeDB) {
  const { studentName, targetCompany, alumnusName, repoUrl, readinessScore, summary, blockerAsk } = body;

  const newRef = {
    id: `ref-${Date.now()}`,
    studentName: studentName || 'Aman Sharma',
    studentBranch: "B.Tech CSE '26",
    targetCompany: targetCompany || 'Swiggy',
    alumnusName: alumnusName || 'Rohan Mehta',
    repoUrl: repoUrl || 'https://github.com/aman-cs/distri-cache-engine',
    readinessScore: readinessScore || 94,
    summary: summary || 'Demonstrates strong distributed systems architecture with verified unit tests.',
    blockerAsk: blockerAsk || 'Requesting 15-minute system design feedback or warm referral.',
    status: 'pending',
    submittedAt: new Date().toISOString()
  };

  db.referrals.unshift(newRef);
  writeDB(db);
  return newRef;
}

export function updateReferralAction(db, refId, body, writeDB) {
  const { action, feedback } = body;
  const ref = db.referrals.find(r => r.id === refId);

  if (!ref) return null;

  ref.status = action;
  ref.feedback = feedback || (action === 'referred' ? 'Candidate endorsed for SDE-1 backend position via internal ATS.' : 'Feedback shared.');
  ref.actionedAt = new Date().toISOString();

  writeDB(db);
  return ref;
}
