// Member 2: Backend API & Database Lead
// File: server/controllers/referralController.js

export function getReferrals(db) {
  return db.referrals || [];
}

export function createReferral(db, body, writeDB) {
  const { 
    studentName, 
    targetCompany, 
    alumnusName, 
    repoUrl, 
    readinessScore, 
    capabilityScore, 
    resumeScore, 
    githubScore, 
    cgpa, 
    skills, 
    resumeSummary, 
    summary, 
    blockerAsk 
  } = body;

  const profile = db.studentProfile || {};

  const newRef = {
    id: `ref-${Date.now()}`,
    studentName: studentName || profile.name || 'Aman Sharma',
    studentBranch: profile.branch || "B.Tech CSE '26",
    cgpa: cgpa || profile.cgpa || "8.92",
    targetCompany: targetCompany || 'Swiggy',
    alumnusName: alumnusName || 'Rohan Mehta',
    repoUrl: repoUrl || profile.githubUrl || 'https://github.com/aman-cs/distri-cache-engine',
    readinessScore: readinessScore || 94,
    capabilityScore: capabilityScore || profile.capabilityScore?.overall || 95,
    resumeScore: resumeScore || profile.capabilityScore?.resumeScore || 93,
    githubScore: githubScore || profile.capabilityScore?.githubScore || 96,
    skills: skills || profile.skills || ["Go", "Distributed Systems", "Redis", "Docker"],
    resumeSummary: resumeSummary || profile.resume?.summary || 'Backend Engineering Intern • Kafka Ingestion Pipeline • 15k req/sec',
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
