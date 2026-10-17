// server/controllers/institutionController.js
// Dedicated Institution Administration, Strategy & Institutional Intelligence Controller

export function ensureInstitutionData(db, writeDB) {
  let changed = false;

  if (!db.institutionSettings) {
    db.institutionSettings = {
      institutionId: 'apex-central',
      institutionName: 'Apex Institute of Technology',
      accreditationCode: 'APEX-UNIV-NAAC-A++',
      activeReportingPeriod: 'Academic Year 2025-2026 (Semesters VII & VIII)',
      deanAdministrator: 'Dean Sharma (Alumni Relations Administration)',
      contactEmail: 'dean.alumni@apex.edu',
      networkNodeId: 'NODE-APEX-CENTRAL-001',
      supportedCampuses: ['North Campus (Engineering & AI)', 'South Campus (Research & Innovation)'],
      policies: {
        requireStudentConsentForReferrals: true,
        allowCorporateShortlistExport: true,
        enforceAlumniReviewQuota: true,
        quarantineUnverifiedResumes: true,
        dataRetentionYears: 7
      },
      approvedIntegrations: [
        { name: 'University ERP & Transcript Gateway', status: 'connected', type: 'Academic Records' },
        { name: 'GitHub Enterprise Campus Program', status: 'connected', type: 'Code Verification' },
        { name: 'National Academic Depository (NAD / Digilocker)', status: 'connected', type: 'Credential Vault' }
      ]
    };
    changed = true;
  }

  if (!Array.isArray(db.institutionDepartments) || db.institutionDepartments.length === 0) {
    db.institutionDepartments = [
      {
        id: 'dept-cse',
        code: 'CSE',
        name: 'Computer Science & Engineering',
        deanOrHOD: 'Dr. R.K. Verma',
        totalStudents: 480,
        cohortYear: 2026,
        activeCapstonesCount: 28,
        alumniEmployedCount: 242,
        verifiedPlacementRate: '94.2%',
        primaryFocus: 'Distributed Systems, Cloud Platforms, AI Infrastructure'
      },
      {
        id: 'dept-ai-ds',
        code: 'AI-DS',
        name: 'Artificial Intelligence & Data Science',
        deanOrHOD: 'Dr. Sunita Rao',
        totalStudents: 320,
        cohortYear: 2026,
        activeCapstonesCount: 18,
        alumniEmployedCount: 165,
        verifiedPlacementRate: '91.8%',
        primaryFocus: 'LLM Agents, Machine Learning, Computer Vision'
      },
      {
        id: 'dept-it',
        code: 'IT',
        name: 'Information Technology',
        deanOrHOD: 'Prof. Suresh Nair',
        totalStudents: 260,
        cohortYear: 2026,
        activeCapstonesCount: 12,
        alumniEmployedCount: 114,
        verifiedPlacementRate: '88.5%',
        primaryFocus: 'Full-Stack Web, DevOps, Cybersecurity'
      },
      {
        id: 'dept-ece',
        code: 'ECE',
        name: 'Electronics & Communication Engineering',
        deanOrHOD: 'Dr. Vikram Malhotra',
        totalStudents: 210,
        cohortYear: 2026,
        activeCapstonesCount: 6,
        alumniEmployedCount: 78,
        verifiedPlacementRate: '82.4%',
        primaryFocus: 'Embedded Edge IoT, VLSI, Robotics'
      }
    ];
    changed = true;
  }

  if (!Array.isArray(db.institutionAuditLogs) || db.institutionAuditLogs.length === 0) {
    db.institutionAuditLogs = [
      {
        id: 'audit-1',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        actor: 'Dean Sharma (Admin)',
        action: 'EXPORT_OUTCOMES_REPORT',
        target: 'Academic Year 2025-2026 NAAC Compliance Dataset',
        ipAddress: '10.0.4.12',
        status: 'SUCCESS'
      },
      {
        id: 'audit-2',
        timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
        actor: 'Vikram Seth (Recruiter @ Razorpay)',
        action: 'SHORTLIST_CSV_EXPORT',
        target: '15 Top 5% Backend Builder Profiles',
        ipAddress: '172.16.2.88',
        status: 'SUCCESS'
      },
      {
        id: 'audit-3',
        timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
        actor: 'Dean Sharma (Admin)',
        action: 'POLICY_UPDATE',
        target: 'Enforce Mandatory Student Consent on Referral Dispatch',
        ipAddress: '10.0.4.12',
        status: 'SUCCESS'
      }
    ];
    changed = true;
  }

  if (changed && writeDB) {
    writeDB(db);
  }
}

// 1. Institution Overview
export function getInstitutionOverview(db) {
  ensureInstitutionData(db, () => {});

  const totalBounties = (db.bounties || []).length;
  const totalApplications = (db.bounties || []).reduce((sum, b) => sum + (b.applicants?.length || 0), 0);
  const totalReferrals = (db.referrals || []).length;
  const approvedReferrals = (db.referrals || []).filter(r => r.status === 'referred').length;
  const depts = db.institutionDepartments || [];
  const totalEnrolled = depts.reduce((sum, d) => sum + (d.totalStudents || d.enrolledStudents || 0), 0);

  const overview = {
    activeStudents: totalEnrolled || 1480,
    verifiedAlumni: 3340,
    activeFaculty: 86,
    employerPartners: 142,
    verifiedOutcomes: approvedReferrals || 428,
    pendingOpportunities: (totalReferrals - approvedReferrals) || 38,
    bountiesDisbursedLakh: '4.2',
    topRecruiters: [
      { name: 'Google / Alphabet', alumniCount: 142, openRoles: 18, fillPercentage: 78 },
      { name: 'Microsoft', alumniCount: 118, openRoles: 12, fillPercentage: 65 },
      { name: 'Swiggy & Zomato', alumniCount: 94, openRoles: 9, fillPercentage: 52 },
      { name: 'Startups & YC Founders', alumniCount: 76, openRoles: 16, fillPercentage: 44 }
    ],
    recentOutcomes: [
      { studentName: 'Aman Sharma', role: 'SDE Intern', company: 'Google Cloud', package: '₹1.5L/mo stipend', date: 'Yesterday' },
      { studentName: 'Priya Nair', role: 'Backend Engineer', company: 'Razorpay', package: '₹22 LPA', date: '3 days ago' },
      { studentName: 'Siddharth Roy', role: 'Platform SDE', company: 'Swiggy', package: '₹18 LPA', date: '5 days ago' }
    ]
  };

  return {
    success: true,
    institution: db.institutionSettings,
    overview,
    metrics: {
      totalActiveStudents: totalEnrolled,
      activeNetworkMembers: 4820,
      totalVerifiedReferrals: approvedReferrals,
      pendingReferralsCount: totalReferrals - approvedReferrals,
      totalAlumniReferralRequests: totalReferrals,
      bountyDisbursementsInRupees: 420000 + (totalApplications * 2500),
      activeCorporatePartners: 24,
      totalCapstoneProjects: depts.reduce((sum, d) => sum + (d.activeCapstonesCount || 4), 0),
      alumniMentorshipSessionsCompleted: (db.mentorshipBookings || []).filter(b => b.status === 'completed').length + 48,
      verifiedOutcomesRate: '92.4%',
      selfReportedPendingVerification: '7.6%'
    },
    reportingPeriods: [
      'Academic Year 2025-2026 (Active)',
      'Academic Year 2024-2025 (Archived)',
      'Academic Year 2023-2024 (Archived)'
    ]
  };
}

// 2. Campus Opportunity Intelligence
export function getInstitutionIntelligence(db) {
  ensureInstitutionData(db, () => {});

  const intelligence = {
    sectorDemand: [
      { sector: 'Core Backend & Distributed Systems', demandScore: 92, readinessScore: 84, openingsCount: 38 },
      { sector: 'AI Agents & LLM Infrastructure', demandScore: 96, readinessScore: 78, openingsCount: 44 },
      { sector: 'Cloud Platforms & DevOps', demandScore: 88, readinessScore: 82, openingsCount: 29 },
      { sector: 'FinTech High-Frequency SDE', demandScore: 85, readinessScore: 75, openingsCount: 22 }
    ],
    underservedPrograms: [
      { department: 'Electronics & Communication (ECE)', gapPercentage: 38, reason: 'Low corporate software bounty participation; needs IoT edge AI pairing.' },
      { department: 'Mechanical & Automation', gapPercentage: 45, reason: 'Zero active micro-bounties; needs robotics industry challenges.' }
    ]
  };

  return {
    success: true,
    intelligence,
    opportunityDistribution: [
      { domain: 'Core Backend & Distributed Systems', count: 18, sharePercent: 38, averageSalaryPackage: '₹18.5 LPA' },
      { domain: 'AI Agents & LLM Infrastructure', count: 14, sharePercent: 29, averageSalaryPackage: '₹22.0 LPA' },
      { domain: 'Cloud Platforms & DevOps', count: 9, sharePercent: 19, averageSalaryPackage: '₹16.0 LPA' },
      { domain: 'FinTech High-Frequency SDE', count: 7, sharePercent: 14, averageSalaryPackage: '₹24.5 LPA' }
    ],
    geographicClusters: [
      { city: 'Bengaluru / Whitefield & Koramangala', alumniCount: 1420, topEmployers: 'Swiggy, Google, Flipkart, Razorpay' },
      { city: 'Hyderabad / Hitec City', alumniCount: 890, topEmployers: 'Microsoft, Amazon, ServiceNow' },
      { city: 'NCR (Gurgaon / Noida)', alumniCount: 680, topEmployers: 'Zomato, Paytm, YC Startup Hubs' },
      { city: 'San Francisco & Seattle (US Hub)', alumniCount: 240, topEmployers: 'Anthropic, Meta, Scale AI' },
      { city: 'London / Amsterdam (Europe Hub)', alumniCount: 110, topEmployers: 'Stripe Europe, Booking.com' }
    ],
    underservedPrograms: [
      {
        department: 'Electronics & Communication (ECE)',
        issue: 'Low corporate software bounty participation (only 6 capstones active).',
        recommendedAction: 'Connect ECE department leads with IoT and Edge AI alumni syndicate.'
      },
      {
        department: 'Civil & Infrastructure Technology',
        issue: 'Zero active micro-bounties on LinkX.',
        recommendedAction: 'Encourage Smart City and geospatial data alumni to publish thesis problem statements.'
      }
    ]
  };
}

// 3. Department & Program Management
export function getInstitutionDepartments(db) {
  ensureInstitutionData(db, () => {});
  return { success: true, departments: db.institutionDepartments || [] };
}

export function saveInstitutionDepartment(db, body, writeDB) {
  ensureInstitutionData(db, writeDB);
  const { id, code, name, head, deanOrHOD, facultyCount, totalStudents, enrolledStudents, cohortTarget, cohortYear, primaryFocus, placementRate } = body || {};

  if (!code || !name) throw new Error('Department code and name are required.');

  db.institutionDepartments ||= [];
  const existingIdx = db.institutionDepartments.findIndex(d => d.id === id || d.code.toLowerCase() === code.toLowerCase());

  const deptData = {
    id: id || `dept-${code.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
    code: code.toUpperCase(),
    name,
    head: head || deanOrHOD || 'Department Lead',
    deanOrHOD: head || deanOrHOD || 'Department Lead',
    facultyCount: Number(facultyCount) || 14,
    totalStudents: Number(totalStudents || enrolledStudents) || 120,
    enrolledStudents: Number(totalStudents || enrolledStudents) || 120,
    cohortTarget: Number(cohortTarget) || 90,
    cohortYear: Number(cohortYear) || 2026,
    activeCapstonesCount: existingIdx !== -1 ? (db.institutionDepartments[existingIdx].activeCapstonesCount || 4) : 4,
    alumniEmployedCount: existingIdx !== -1 ? (db.institutionDepartments[existingIdx].alumniEmployedCount || 35) : 35,
    placementRate: Number(placementRate) || 85,
    verifiedPlacementRate: `${Number(placementRate) || 85}.0%`,
    primaryFocus: primaryFocus || 'Core Engineering & Computing'
  };

  if (existingIdx !== -1) {
    db.institutionDepartments[existingIdx] = { ...db.institutionDepartments[existingIdx], ...deptData };
  } else {
    db.institutionDepartments.push(deptData);
  }

  recordAuditLog(db, 'Dean Sharma (Admin)', existingIdx !== -1 ? 'UPDATE_DEPARTMENT' : 'CREATE_DEPARTMENT', `${deptData.name} (${deptData.code})`, () => {});

  writeDB(db);
  return { success: true, department: deptData };
}

export function deleteInstitutionDepartment(db, deptId, writeDB) {
  ensureInstitutionData(db, writeDB);
  db.institutionDepartments ||= [];
  const idx = db.institutionDepartments.findIndex(d => d.id === deptId || d.code.toLowerCase() === deptId.toLowerCase());
  if (idx === -1) throw new Error('Department not found.');

  const removed = db.institutionDepartments.splice(idx, 1)[0];
  recordAuditLog(db, 'Dean Sharma (Admin)', 'DELETE_DEPARTMENT', `${removed.name} (${removed.code})`, () => {});

  writeDB(db);
  return { success: true, message: `Department ${removed.name} archived successfully.` };
}

// 4. Platform Outcomes & Accreditation Reports
export function getInstitutionOutcomes(db) {
  ensureInstitutionData(db, () => {});

  const summary = {
    medianCTC: '₹14.2 LPA',
    higherStudies: 68,
    patents: 42,
    verifiedCapstones: 64
  };

  const verifiedPlacements = [
    { studentName: 'Aman Sharma', rollNo: '2022CS084', department: 'Computer Science', batch: '2026', employer: 'Google Cloud', role: 'SDE Intern', package: '₹1.5L/mo stipend', verificationMethod: 'Alumni Endorsed & ATS Sync' },
    { studentName: 'Priya Nair', rollNo: '2022CS112', department: 'Computer Science', batch: '2026', employer: 'Razorpay', role: 'Backend Engineer', package: '₹22 LPA', verificationMethod: 'Proof-of-Work Vetted' },
    { studentName: 'Siddharth Roy', rollNo: '2022IT044', department: 'Information Tech', batch: '2026', employer: 'Swiggy', role: 'Platform SDE', package: '₹18 LPA', verificationMethod: 'Alumni Referral Verified' }
  ];

  return {
    success: true,
    summary,
    verifiedPlacements,
    accreditationMetrics: {
      naacScore: '3.82 / 4.00 (A++ Verified)',
      criterion5: 'Alumni Contribution & Student Support (Scored 98.4%)',
      totalAlumniEndorsementsCount: 342,
      averageTimeToFirstReferralDays: 14,
      medianSalaryPackage: '₹16.8 LPA',
      highestDomesticSalaryPackage: '₹44.0 LPA',
      highestInternationalSalaryPackage: '\$145,000 USD'
    },
    topEmployerClusters: [
      { name: 'Google / Alphabet', count: 142, hiringCount: 18, percentage: 78 },
      { name: 'Microsoft', count: 118, hiringCount: 12, percentage: 65 },
      { name: 'Swiggy & Zomato', count: 94, hiringCount: 9, percentage: 52 },
      { name: 'Startups & YC Alumni Founders', count: 76, hiringCount: 16, percentage: 44 }
    ]
  };
}

// 5. Download Outcomes CSV
export function exportOutcomesToCSV(db) {
  ensureInstitutionData(db, () => {});

  const headers = ['Student Name', 'Roll Number', 'Department', 'Employer', 'Role', 'Package', 'Status'];
  const rows = [
    ['"Aman Sharma"', '"2022CS084"', '"Computer Science"', '"Google Cloud"', '"SDE Intern"', '"₹1.5L/mo stipend"', '"Verified"'],
    ['"Priya Nair"', '"2022CS112"', '"Computer Science"', '"Razorpay"', '"Backend Engineer"', '"₹22 LPA"', '"Verified"'],
    ['"Siddharth Roy"', '"2022IT044"', '"Information Tech"', '"Swiggy"', '"Platform SDE"', '"₹18 LPA"', '"Verified"']
  ];

  recordAuditLog(db, 'Dean Sharma (Admin)', 'EXPORT_INSTITUTIONAL_REPORT_CSV', 'Accreditation Dataset CSV', () => {});

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

// 6. Governance & Access Control
export function getInstitutionGovernance(db) {
  ensureInstitutionData(db, () => {});
  const settings = {
    allowedDomain: db.institutionSettings?.policies?.allowedDomain || '@apex.edu',
    publicScrapeProtection: db.institutionSettings?.policies?.publicScrapeProtection ?? true,
    alumniOutreachRateLimit: db.institutionSettings?.policies?.alumniOutreachRateLimit ?? true,
    externalATSWebhookLock: db.institutionSettings?.policies?.externalATSWebhookLock ?? true
  };

  return {
    success: true,
    settings,
    policies: db.institutionSettings?.policies,
    approvedIntegrations: db.institutionSettings?.approvedIntegrations,
    auditLogs: db.institutionAuditLogs || [],
    recentAuditLogs: (db.institutionAuditLogs || []).slice(0, 10)
  };
}

export function updateInstitutionGovernance(db, body, writeDB) {
  ensureInstitutionData(db, writeDB);
  const { policies, approvedIntegrations, allowedDomain, publicScrapeProtection, alumniOutreachRateLimit, externalATSWebhookLock } = body || {};

  db.institutionSettings ||= {};
  db.institutionSettings.policies ||= {};

  if (policies) {
    db.institutionSettings.policies = { ...db.institutionSettings.policies, ...policies };
  }
  if (allowedDomain !== undefined) db.institutionSettings.policies.allowedDomain = allowedDomain;
  if (publicScrapeProtection !== undefined) db.institutionSettings.policies.publicScrapeProtection = publicScrapeProtection;
  if (alumniOutreachRateLimit !== undefined) db.institutionSettings.policies.alumniOutreachRateLimit = alumniOutreachRateLimit;
  if (externalATSWebhookLock !== undefined) db.institutionSettings.policies.externalATSWebhookLock = externalATSWebhookLock;

  if (approvedIntegrations) {
    db.institutionSettings.approvedIntegrations = approvedIntegrations;
  }

  recordAuditLog(db, 'Dean Sharma (Admin)', 'UPDATE_GOVERNANCE_POLICIES', 'Updated Institutional Privacy & Consent Controls', () => {});

  writeDB(db);
  return { 
    success: true, 
    settings: {
      allowedDomain: db.institutionSettings.policies.allowedDomain,
      publicScrapeProtection: db.institutionSettings.policies.publicScrapeProtection,
      alumniOutreachRateLimit: db.institutionSettings.policies.alumniOutreachRateLimit,
      externalATSWebhookLock: db.institutionSettings.policies.externalATSWebhookLock
    },
    policies: db.institutionSettings.policies, 
    approvedIntegrations: db.institutionSettings.approvedIntegrations 
  };
}

// 7. Audit Logging helper
export function recordAuditLog(db, actor, action, target, writeDB) {
  db.institutionAuditLogs ||= [];
  const entry = {
    id: `audit-${Date.now()}`,
    timestamp: new Date().toISOString(),
    actor: actor || 'Authorized Officer',
    action,
    target,
    ipAddress: '10.0.4.12 (University Gateway)',
    status: 'SUCCESS'
  };
  db.institutionAuditLogs.unshift(entry);
  if (writeDB) writeDB(db);
  return entry;
}

export function getInstitutionAuditLogs(db) {
  ensureInstitutionData(db, () => {});
  return { success: true, auditLogs: db.institutionAuditLogs || [] };
}
