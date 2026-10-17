// server/controllers/recruiterController.js

export function extractHiringRequirements(body = {}) {
  const promptText = body.promptText || body.jobQuery || body.prompt || body.query || '';
  if (!promptText) throw new Error('Please describe the hiring requirement.');

  const lower = promptText.toLowerCase();

  // Smart natural language criteria extractor
  const skills = [];
  if (lower.includes('go') || lower.includes('golang')) skills.push('Go');
  if (lower.includes('distributed') || lower.includes('systems')) skills.push('Distributed Systems');
  if (lower.includes('redis')) skills.push('Redis');
  if (lower.includes('kafka')) skills.push('Kafka');
  if (lower.includes('docker') || lower.includes('container')) skills.push('Docker');
  if (lower.includes('kubernetes') || lower.includes('k8s')) skills.push('Kubernetes');
  if (lower.includes('python')) skills.push('Python');
  if (lower.includes('ai') || lower.includes('llm') || lower.includes('agent')) skills.push('AI Agents');
  if (lower.includes('react') || lower.includes('next.js') || lower.includes('frontend')) skills.push('Next.js');
  if (skills.length === 0) skills.push('Go', 'Distributed Systems', 'Redis');

  let role = 'Core Backend Engineer';
  if (lower.includes('frontend')) role = 'Frontend Engineer';
  else if (lower.includes('ai') || lower.includes('ml')) role = 'AI Infrastructure Engineer';
  else if (lower.includes('cloud') || lower.includes('devops')) role = 'Cloud Platform SDE';

  let location = 'Bengaluru / Hybrid';
  if (lower.includes('remote')) location = 'Remote (India)';
  else if (lower.includes('mumbai') || lower.includes('delhi')) location = 'On-Site / Metro Hub';

  let type = 'Summer SDE Internship (6 Months)';
  if (lower.includes('full time') || lower.includes('full-time') || lower.includes('fresher')) type = 'Full-Time SDE-1';

  return {
    success: true,
    extractedCriteria: {
      targetRole: role,
      skills,
      minScore: 88,
      workArrangement: location,
      employmentType: type,
      targetBatch: "Class of 2026 / Final Year",
      keyRequirement: "Demonstrated concurrency, unit test coverage >85%, and active GitHub proof-of-work."
    }
  };
}

export function generateProofOfWorkShortlist(db, criteria = {}) {
  const profile = db.studentProfile || {};
  const requestedSkills = criteria.skills || ['Go', 'Distributed Systems', 'Redis'];

  // Seed pool of verified candidates with realistic proof-of-work
  const candidatePool = [
    {
      id: 'cand-1',
      name: profile.name || 'Aman Sharma',
      avatar: 'AS',
      college: profile.college || 'Apex Institute of Technology',
      branch: profile.branch || "B.Tech CSE '26",
      cgpa: profile.cgpa || '8.92',
      capabilityScore: profile.capabilityScore?.overall || 95,
      tier: profile.capabilityScore?.tier || 'Top 1% Exceptional Talent',
      skills: profile.skills || ['Go', 'Distributed Systems', 'Redis', 'Docker', 'Kafka'],
      githubUrl: profile.githubUrl || 'https://github.com/aman-cs/distri-cache-engine',
      repoName: 'distri-cache-engine',
      testCoverage: '92.4% Unit Tests',
      latencyMetric: '14ms P99 Latency',
      endorsement: 'Verified by Rohan Mehta (SDE-2 @ Swiggy): "Clean consistent hashing ring with zero race conditions."',
      alumnusEndorsed: true,
      availability: 'Available for Immediate Summer SDE Internship',
      status: 'shortlisted'
    },
    {
      id: 'cand-2',
      name: 'Priya Nair',
      avatar: 'PN',
      college: 'Apex Institute of Technology',
      branch: "B.Tech CSE '26",
      cgpa: '9.14',
      capabilityScore: 92,
      tier: 'Top 5% Strong Builder',
      skills: ['Python', 'Kafka', 'Docker', 'FastAPI', 'PostgreSQL'],
      githubUrl: 'https://github.com/priya-nair/async-stream-pipeline',
      repoName: 'async-stream-pipeline',
      testCoverage: '89.1% Unit Tests',
      latencyMetric: '18ms P99 Latency',
      endorsement: 'Verified by Aditi Rao (Google Cloud): "High-throughput async event processor with structured logging."',
      alumnusEndorsed: true,
      availability: 'Available June 2026',
      status: 'shortlisted'
    },
    {
      id: 'cand-3',
      name: 'Siddharth Roy',
      avatar: 'SR',
      college: 'Apex Institute of Technology',
      branch: "B.Tech IT '26",
      cgpa: '8.65',
      capabilityScore: 88,
      tier: 'Top 10% Verified Candidate',
      skills: ['Go', 'Kubernetes', 'Prometheus', 'Docker'],
      githubUrl: 'https://github.com/siddharth-r/k8s-pod-telemetry',
      repoName: 'k8s-pod-telemetry',
      testCoverage: '86.0% Unit Tests',
      latencyMetric: '22ms P99 Latency',
      endorsement: 'Dr. R.K. Verma Capstone Participant',
      alumnusEndorsed: false,
      availability: 'Available Immediately',
      status: 'shortlisted'
    }
  ];

  // Calculate dynamic match % for each candidate
  const shortlist = candidatePool.map(cand => {
    const matchingSkills = cand.skills.filter(s => requestedSkills.some(rs => rs.toLowerCase() === s.toLowerCase()));
    const missingSkills = requestedSkills.filter(rs => !cand.skills.some(s => s.toLowerCase() === rs.toLowerCase()));
    const matchScore = Math.min(99, Math.round((matchingSkills.length / Math.max(1, requestedSkills.length)) * 50 + (cand.capabilityScore * 0.5)));

    return {
      ...cand,
      matchPercentage: matchScore,
      matchingSkills,
      missingSkills,
      matchExplanation: `${cand.name} matches ${matchingSkills.length} of ${requestedSkills.length} required skills with verified GitHub evidence and ${cand.testCoverage}.`
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  return {
    success: true,
    totalMatches: shortlist.length,
    shortlist
  };
}

export function sendInterviewInvitation(db, body, writeDB) {
  const { candidateId, candidateName, company = 'Razorpay', roleTitle = 'Backend SDE-1', interviewDate, note } = body;

  db.interviewInvitations ||= [];
  const invitation = {
    id: `interview-${Date.now()}`,
    candidateId,
    candidateName: candidateName || 'Aman Sharma',
    company,
    roleTitle,
    interviewDate: interviewDate || 'Flexible (Next Week)',
    note: note || 'We were impressed by your verified distributed caching proof-of-work on LinkX.',
    status: 'invitation_sent',
    sentAt: new Date().toISOString()
  };

  db.interviewInvitations.unshift(invitation);

  // Send in-app notification to candidate
  db.notifications ||= [];
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    recipient: 'student',
    type: 'interview_invitation',
    title: `🎉 Interview Invitation from ${company}!`,
    message: `${company} has shortlisted your proof-of-work for ${roleTitle}.`,
    actionUrl: '#student-profile',
    read: false,
    createdAt: new Date().toISOString()
  });

  writeDB(db);
  return invitation;
}

export function exportShortlistToCSV(candidates = []) {
  const headers = ['Candidate Name', 'College', 'CGPA', 'Capability Score', 'Match %', 'Skills', 'GitHub Repository', 'Test Coverage', 'Alumni Endorsed', 'Availability'];
  const rows = candidates.map(c => [
    `"${c.name}"`,
    `"${c.college}"`,
    `"${c.cgpa}"`,
    `"${c.capabilityScore}"`,
    `"${c.matchPercentage}%"`,
    `"${c.skills.join(', ')}"`,
    `"${c.githubUrl}"`,
    `"${c.testCoverage}"`,
    `"${c.alumnusEndorsed ? 'YES' : 'NO'}"`,
    `"${c.availability}"`
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}
