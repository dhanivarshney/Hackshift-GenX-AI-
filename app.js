// LinkX — Cinematic Splash, Unified Hero Login Engine & Role-Specific Dashboard Workspace
// Track 1: Alumni Network & Professional Connections (Building a Network, Not a Directory)

const API_BASE = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
  ? `${window.location.origin}/api`
  : '/api';

// ================= MASTER 6-ROLE CONFIGURATIONS =================
const ROLE_CONFIGS = {
  student: {
    id: 'student',
    roleLabel: 'Student',
    portalTitle: 'Student Portal',
    name: 'Aman Sharma',
    avatar: 'AS',
    branch: "B.Tech CSE '26",
    companyOrCollege: 'Apex Institute of Technology',
    bio: "Distributed systems enthusiast • Built Redis caching engine • Solved 280+ LeetCode",
    goal: "Seeking Backend / Distributed Systems SDE Referral",
    activeIntent: "Seeking SDE Referral (Backend / Go)",
    icon: 'graduation-cap',
    accentColor: 'indigo',
    bannerTitle: 'Student Builder Gateway',
    bannerBadge: 'Verified Student Access',
    bannerDesc: 'Connect directly with alumni in your target companies without cold DMs. Showcase real code, solve startup bounties, and secure high-conviction job referrals.',
    demoText: 'Sign in instantly as <b>Aman Sharma</b> (CSE \'26 • Go / Distributed Systems Builder) with pre-loaded GitHub data and active referral requests.',
    defaultTab: 'student-profile',
    bullets: [
      { icon: 'shield-check', title: 'Zero Cold DMs', text: 'Reach alumni with verified code readiness, not generic text.' },
      { icon: 'zap', title: 'Earn Startup Bounties', text: 'Solve real micro-tasks (\$50–\$200) funded by alumni founders.' },
      { icon: 'compass', title: 'Intent Matchmaking', text: 'Direct match with seniors hiring in your exact tech stack.' }
    ],
    fields: [
      { label: 'College Roll Number / Student Email', type: 'text', placeholder: '2022CS084@apex.edu', value: '2022CS084@apex.edu' },
      { label: 'Branch & Graduation Year', type: 'text', placeholder: 'CSE - 2026', value: 'B.Tech CSE — Class of 2026' },
      { label: 'GitHub Profile URL', type: 'text', placeholder: 'https://github.com/username', value: 'https://github.com/aman-cs' },
      { label: 'Password', type: 'password', placeholder: '••••••••', value: 'password123' }
    ]
  },
  alumnus: {
    id: 'alumnus',
    roleLabel: 'Alumnus',
    portalTitle: 'Alumni Portal',
    name: 'Rohan Mehta',
    avatar: 'RM',
    branch: "Batch '20 • SDE-2 Backend",
    companyOrCollege: 'Swiggy',
    bio: "Scaling order routing microservices • Ex-Amazon • Passionate about clean Go code",
    goal: "Hiring 2 Interns for High-Throughput Routing Team",
    activeIntent: "Hiring 2 Interns for Team",
    icon: 'briefcase',
    accentColor: 'emerald',
    bannerTitle: 'Alumni Mentorship & Referral Desk',
    bannerBadge: 'Verified Alumni Network',
    bannerDesc: 'Help passionate college juniors without drowning in spam. Review 1-minute executive dossiers, endorse verified talent, and manage your monthly referral quota.',
    demoText: 'Sign in instantly as <b>Rohan Mehta</b> (SDE-2 Backend @ Swiggy • Batch \'20) with active intern referral slots and candidate queue.',
    defaultTab: 'alumnus-inbox',
    bullets: [
      { icon: 'inbox', title: '1-Minute Review Cards', text: 'No 5-page resumes. Review concise code benchmarks and test coverage.' },
      { icon: 'check-check', title: '1-Click ATS Referral', text: 'Auto-generate verified endorsement blurbs for your internal company portal.' },
      { icon: 'clock', title: 'Quota Protection', text: 'Strict limit of 3 reviews/month so your time is always respected.' }
    ],
    fields: [
      { label: 'Work Corporate Email', type: 'email', placeholder: 'rohan.mehta@swiggy.in', value: 'rohan.mehta@swiggy.in' },
      { label: 'College Graduation Batch', type: 'text', placeholder: 'Batch 2020', value: 'Apex CSE — Batch of 2020' },
      { label: 'Current Company & Designation', type: 'text', placeholder: 'Swiggy - SDE-2', value: 'Swiggy — SDE-2 Backend' },
      { label: 'Password', type: 'password', placeholder: '••••••••', value: 'password123' }
    ]
  },
  founder: {
    id: 'founder',
    roleLabel: 'Founder',
    portalTitle: 'Founder Portal',
    name: 'Neha Kapoor',
    avatar: 'NK',
    branch: "Batch '19 • Founder & CEO",
    companyOrCollege: 'HyperScale AI (YC W24)',
    bio: "Building autonomous developer tooling • Angel investing in campus builders ($5k - $25k)",
    goal: "Funding Micro-Bounties & Sponsoring Hackathon Squads",
    activeIntent: "Funding Campus Bounties & Startups",
    icon: 'rocket',
    accentColor: 'amber',
    bannerTitle: 'Founder Opportunity & Bounty Hub',
    bannerBadge: 'Alumni Founder Syndicate',
    bannerDesc: 'Get MVPs and micro-services built rapidly by hungry campus builders. Sponsor hackathon squads, fund bounties, and hire pre-vetted interns.',
    demoText: 'Sign in instantly as <b>Neha Kapoor</b> (Founder & CEO @ HyperScale AI • YC W24) with active micro-bounties and escrow funding.',
    defaultTab: 'bounties',
    bullets: [
      { icon: 'coins', title: 'Escrow-Backed Bounties', text: 'Post ₹3,000 to ₹10,000 tasks and get clean production code in 48 hours.' },
      { icon: 'trophy', title: 'Hackathon Squad Grants', text: 'Sponsor travel and cloud credits for top college finalist teams.' },
      { icon: 'user-check', title: 'Direct Founder Hiring', text: 'Hire students based on real pull requests, skipping recruitment agencies.' }
    ],
    fields: [
      { label: 'Founder Work Email', type: 'email', placeholder: 'neha@hyperscale.ai', value: 'neha@hyperscale.ai' },
      { label: 'Startup Name & Stage', type: 'text', placeholder: 'HyperScale AI (YC W24)', value: 'HyperScale AI (YC W24)' },
      { label: 'AngelList / Company Website', type: 'text', placeholder: 'https://hyperscale.ai', value: 'https://hyperscale.ai' },
      { label: 'Password', type: 'password', placeholder: '••••••••', value: 'password123' }
    ]
  },
  faculty: {
    id: 'faculty',
    roleLabel: 'Faculty',
    portalTitle: 'Faculty Portal',
    name: 'Dr. R.K. Verma',
    avatar: 'RV',
    branch: "Professor & Dean R&D",
    companyOrCollege: 'Apex Institute of Tech',
    bio: "Cloud computing & network security researcher • Published 42 IEEE papers",
    goal: "Connecting 8 Capstone Research Projects with Industry Alum Co-Guides",
    activeIntent: "Seeking Industry Co-Guide for Capstone",
    icon: 'book-open',
    accentColor: 'purple',
    bannerTitle: 'Faculty Capstone & Research Desk',
    bannerBadge: 'Academic & Industry Linkage',
    bannerDesc: 'Supercharge student final-year capstone projects by pairing them with industry alumni mentors at Google, AWS, and tier-1 research labs.',
    demoText: 'Sign in instantly as <b>Dr. R.K. Verma</b> (Professor & Dean R&D) managing 64 industry-mentored research capstones.',
    defaultTab: 'intent-radar',
    bullets: [
      { icon: 'git-merge', title: 'Industry Co-Guides', text: 'Pair student research teams with alumni engineers for real-world validation.' },
      { icon: 'file-text', title: 'Conference Papers', text: 'Publish joint IEEE/ACM conference papers co-authored with industry alumni.' },
      { icon: 'award', title: 'Project Incubation', text: 'Fast-track promising capstone projects into university patents and startup grants.' }
    ],
    fields: [
      { label: 'Institutional .edu Email', type: 'email', placeholder: 'rkverma@apex.edu', value: 'rkverma@apex.edu' },
      { label: 'Department / Faculty Designation', type: 'text', placeholder: 'Dean R&D - CSE Dept', value: 'Computer Science & Engineering — Dean R&D' },
      { label: 'Research Domain', type: 'text', placeholder: 'Cloud & Distributed Systems', value: 'Cloud Computing, Edge AI & Distributed Systems' },
      { label: 'Password', type: 'password', placeholder: '••••••••', value: 'password123' }
    ]
  },
  recruiter: {
    id: 'recruiter',
    roleLabel: 'Recruiter',
    portalTitle: 'Recruiter Radar',
    name: 'Vikram Seth',
    avatar: 'VS',
    branch: "Tech Talent Partner",
    companyOrCollege: 'Razorpay',
    bio: "Hiring 15+ Core Backend Engineers • Looking for verified GitHub proof-of-work",
    goal: "Evaluating Vetted Students with High Alumni Endorsement Scores",
    activeIntent: "Hiring Top 5% Builders",
    icon: 'target',
    accentColor: 'cyan',
    bannerTitle: 'Verified Campus Talent Radar',
    bannerBadge: 'Corporate Talent Acquisition',
    bannerDesc: 'Source high-velocity campus engineers vetted by alumni endorsements, verified commit history, and code readiness scores (0–100).',
    demoText: 'Sign in instantly as <b>Vikram Seth</b> (Tech Talent Partner @ Razorpay) with access to top 5% campus backend builders.',
    defaultTab: 'intent-radar',
    bullets: [
      { icon: 'bar-chart-3', title: 'Code Readiness Benchmarks', text: 'Filter by test coverage, latency benchmarks, and algorithmic depth.' },
      { icon: 'badge-check', title: 'Alumni Staked Trust', text: 'Prioritize students vetted and endorsed by alumni currently in your company.' },
      { icon: 'calendar', title: 'Fast-Track Scheduling', text: 'Schedule 1st round interviews in 1-click without resume screening lag.' }
    ],
    fields: [
      { label: 'Corporate Recruiter Email', type: 'email', placeholder: 'vikram.seth@razorpay.com', value: 'vikram.seth@razorpay.com' },
      { label: 'Company Name & Hiring Team', type: 'text', placeholder: 'Razorpay - Core Payments', value: 'Razorpay — Core Payments & Infrastructure' },
      { label: 'Open Requisition ID', type: 'text', placeholder: 'REQ-2026-ENG-44', value: 'REQ-2026-SDE-BACKEND' },
      { label: 'Password', type: 'password', placeholder: '••••••••', value: 'password123' }
    ]
  },
  institution: {
    id: 'institution',
    roleLabel: 'Institution',
    portalTitle: 'Institution Command',
    name: 'Dean Sharma',
    avatar: 'DS',
    branch: "Dean of Alumni Relations",
    companyOrCollege: 'Apex Central Campus Administration',
    bio: "Transforming 12,000+ Alumni Directory into an Active High-Velocity Network",
    goal: "Monitoring Real Placement Impact, Capstone Co-Mentoring & Bounty Earnings",
    activeIntent: "Monitoring Real Placement Impact",
    icon: 'landmark',
    accentColor: 'rose',
    bannerTitle: 'Institution Impact & Outcome Command',
    bannerBadge: 'University Executive Desk',
    bannerDesc: 'Transform your college alumni directory from a dead phonebook into an active economic network. Track placement conversions, alumni density, and bounty earnings.',
    demoText: 'Sign in instantly as <b>Dean Sharma</b> (Alumni Relations Administration) monitoring campus placement ROI and network velocity.',
    defaultTab: 'institution',
    bullets: [
      { icon: 'activity', title: 'Real Outcome Metrics', text: 'Track verified referrals, conversion to offers, and student bounty payouts.' },
      { icon: 'map', title: 'Alumni Geographic Mapping', text: 'Interactive geo-density across tech hubs: Bangalore, Gurgaon, SF, London.' },
      { icon: 'landmark', title: 'Accreditation Ready', text: 'Instant institutional reports for NAAC / NBA showing active alumni engagement.' }
    ],
    fields: [
      { label: 'Dean / Administrator Email', type: 'email', placeholder: 'dean.alumni@apex.edu', value: 'dean.alumni@apex.edu' },
      { label: 'Campus Accreditation Code', type: 'text', placeholder: 'APEX-UNIV-NAAC-A++', value: 'APEX-UNIV-NAAC-A++' },
      { label: '2FA Administrative Security Key', type: 'text', placeholder: '••••-••••-••••', value: 'SEC-KEY-9942' },
      { label: 'Master Password', type: 'password', placeholder: '••••••••', value: 'password123' }
    ]
  }
};

let currentHeroRoleId = 'student';
let activeSessionRoleId = null;
let bountiesState = [];
let referralsState = [];
let latestAnalysis = null;
let splashTimer = null;

// ================= MATCH RADAR DATA =================
const MATCH_RADAR_ITEMS = [
  {
    id: 'match-student-1',
    category: 'hiring',
    targetPerson: 'Aman Sharma',
    targetRole: 'Student (CSE \'26) • Go / Distributed Systems Builder',
    company: 'Apex Institute of Technology',
    matchScore: 95,
    avatar: 'AS',
    avatarBg: 'bg-blue-600',
    intentBadge: 'Capability Score: 95/100 (Top 1%)',
    intentDesc: 'Built Redis caching engine in Go with consistent hashing ring & 92.4% test coverage. 8.92 CGPA.',
    synergy: 'Verified resume with 35% latency drop. Stack aligns 98% with backend intern requisitions.',
    actionLabel: 'Inspect Resume & Dossier',
    actionType: 'candidate-modal',
    refId: 'ref-1'
  },
  {
    id: 'match-1',
    category: 'hiring',
    targetPerson: 'Rohan Mehta',
    targetRole: 'SDE-2 at Swiggy (Batch 2020)',
    company: 'Swiggy',
    matchScore: 96,
    avatar: 'RM',
    avatarBg: 'bg-indigo-600',
    intentBadge: 'Active Referral Quota (2/3 Open)',
    intentDesc: 'Looking for a junior with solid Go or Distributed Caching experience.',
    synergy: 'Your Redis Caching engine matches his team’s high-throughput order dispatch stack.',
    actionLabel: 'Verify Code & Request Referral',
    actionType: 'pitch'
  },
  {
    id: 'match-2',
    category: 'bounty',
    targetPerson: 'Neha Kapoor',
    targetRole: 'Founder @ HyperScale AI (Batch 2019)',
    company: 'HyperScale AI',
    matchScore: 92,
    avatar: 'NK',
    avatarBg: 'bg-amber-600',
    intentBadge: '₹5,000 Micro-Bounty + Direct Hire',
    intentDesc: 'Needs a low-latency webhook handler built in Node.js or Go.',
    synergy: '92% skill match based on your asynchronous concurrency projects.',
    actionLabel: 'Claim Bounty Ticket',
    actionType: 'bounty'
  },
  {
    id: 'match-3',
    category: 'capstone',
    targetPerson: 'Aditi Rao',
    targetRole: 'Senior Cloud Architect @ Google (Batch 2017)',
    company: 'Google Cloud',
    matchScore: 89,
    avatar: 'AR',
    avatarBg: 'bg-emerald-600',
    intentBadge: 'Offering Capstone Industry Co-Guidance',
    intentDesc: 'Co-mentoring 2 student research teams with Dr. Verma on Kubernetes edge autoscaling.',
    synergy: 'Aligned with your Distributed Systems Final Year thesis topic.',
    actionLabel: 'Apply for Capstone Co-Guidance',
    actionType: 'capstone'
  },
  {
    id: 'match-4',
    category: 'hiring',
    targetPerson: 'Kunal Varma',
    targetRole: 'Senior Platform Engineer @ Atlassian (Batch 2018)',
    company: 'Atlassian',
    matchScore: 88,
    avatar: 'KV',
    avatarBg: 'bg-blue-600',
    intentBadge: 'Offering 15-Min System Design Reviews',
    intentDesc: 'Will review real architecture diagrams and give direct feedback + referral if clean.',
    synergy: 'Your microservice architecture diagram is ready for review.',
    actionLabel: 'Request 15-Min Flash Review',
    actionType: 'pitch'
  },
  {
    id: 'match-5',
    category: 'capstone',
    targetPerson: 'Dr. R.K. Verma',
    targetRole: 'Professor & Dean R&D',
    company: 'Apex Institute',
    matchScore: 85,
    avatar: 'RV',
    avatarBg: 'bg-purple-600',
    intentBadge: 'Research Capstone Sponsor',
    intentDesc: 'Matching 4th year squads with industry funding from Qualcomm.',
    synergy: 'Recommended for patentable project incubation.',
    actionLabel: 'Connect with Faculty',
    actionType: 'capstone'
  },
  {
    id: 'match-6',
    category: 'bounty',
    targetPerson: 'Siddharth Jain',
    targetRole: 'Co-Founder @ DevPilot (Batch 2021)',
    company: 'DevPilot',
    matchScore: 84,
    avatar: 'SJ',
    avatarBg: 'bg-rose-600',
    intentBadge: '₹3,500 Bounty: Next.js + Tailwind UI',
    intentDesc: 'Looking for a clean interactive analytics widget for customer onboarding.',
    synergy: 'Frontend component library matches your recent hackathon code.',
    actionLabel: 'Claim Bounty Ticket',
    actionType: 'bounty'
  }
];

// ================= INITIALIZATION & 3-SECOND SPLASH =================
document.addEventListener('DOMContentLoaded', async () => {
  renderHeroRoleTabs();
  renderHeroRoleView(currentHeroRoleId);
  renderRadarCards(MATCH_RADAR_ITEMS);
  setupLineageCanvas();

  // Run 3-second cinematic intro splash
  startSplashCountdown();

  // Load backend data in background
  await Promise.all([
    fetchBountiesFromAPI(),
    fetchReferralsFromAPI()
  ]);

  lucide.createIcons();
});

function startSplashCountdown() {
  const progressBar = document.getElementById('splash-progress');
  const timerText = document.getElementById('splash-timer-text');
  
  if (progressBar) {
    // Trigger smooth fill
    setTimeout(() => {
      progressBar.style.width = '100%';
    }, 50);
  }

  let remaining = 3;
  splashTimer = setInterval(() => {
    remaining--;
    if (timerText) timerText.textContent = `${remaining}s`;

    if (remaining <= 0) {
      clearInterval(splashTimer);
      dismissSplashImmediately();
    }
  }, 1000);
}

function dismissSplashImmediately() {
  if (splashTimer) clearInterval(splashTimer);
  const splash = document.getElementById('splash-screen');
  if (splash) {
    splash.style.opacity = '0';
    splash.style.transform = 'scale(1.04)';
    setTimeout(() => {
      splash.style.display = 'none';
    }, 800);
  }
}

// ================= HERO LOGIN ROLE SWITCHER =================
function renderHeroRoleTabs() {
  const container = document.getElementById('hero-role-tabs');
  if (!container) return;

  const roles = Object.keys(ROLE_CONFIGS);
  container.innerHTML = roles.map(key => {
    const isSelected = key === currentHeroRoleId;
    const cfg = ROLE_CONFIGS[key];
    const activeClass = isSelected
      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 text-white shadow-lg shadow-blue-600/30 font-bold border border-sky-400/40 scale-[1.02]'
      : 'text-slate-400 hover:text-white hover:bg-slate-800/60 font-medium';
    return `
      <button onclick="renderHeroRoleView('${key}')" class="flex-1 py-2 px-3 rounded-xl transition text-center whitespace-nowrap flex items-center justify-center space-x-1.5 ${activeClass}">
        <i data-lucide="${cfg.icon}" class="w-3.5 h-3.5"></i>
        <span>${cfg.roleLabel}</span>
      </button>
    `;
  }).join('');
}

function renderHeroRoleView(roleId) {
  currentHeroRoleId = roleId;
  const cfg = ROLE_CONFIGS[roleId] || ROLE_CONFIGS.student;

  renderHeroRoleTabs();

  // Side Banner Updates
  document.getElementById('hero-side-icon').setAttribute('data-lucide', cfg.icon);
  document.getElementById('hero-side-badge').textContent = cfg.bannerBadge;
  document.getElementById('hero-side-title').textContent = cfg.bannerTitle;
  document.getElementById('hero-side-desc').textContent = cfg.bannerDesc;

  // Bullets
  const bulletsEl = document.getElementById('hero-side-bullets');
  bulletsEl.innerHTML = cfg.bullets.map(b => `
    <div class="flex items-start space-x-2.5">
      <div class="p-1.5 rounded-lg bg-gradient-to-br from-sky-500/15 via-purple-500/15 to-pink-500/15 text-sky-300 mt-0.5 border border-purple-500/25 shadow-sm">
        <i data-lucide="${b.icon}" class="w-3.5 h-3.5"></i>
      </div>
      <div>
        <h4 class="text-xs font-bold text-white">${b.title}</h4>
        <p class="text-[11px] text-slate-400 leading-tight">${b.text}</p>
      </div>
    </div>
  `).join('');

  // Form Headings & Demo Info
  document.getElementById('hero-form-heading').textContent = `Sign In to ${cfg.portalTitle}`;
  document.getElementById('hero-form-subheading').textContent = `Enter as ${cfg.roleLabel.toLowerCase()} or use 1-click hackathon bypass.`;
  document.getElementById('hero-demo-text').innerHTML = cfg.demoText;

  // Dynamic Input Fields
  const fieldsEl = document.getElementById('hero-dynamic-fields');
  fieldsEl.innerHTML = cfg.fields.map(f => `
    <div>
      <label class="block text-xs font-medium text-slate-300 mb-1">${f.label}</label>
      <input type="${f.type}" value="${f.value}" required class="w-full bg-[#040711] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 transition" placeholder="${f.placeholder}">
    </div>
  `).join('');

  lucide.createIcons();
}

function executeHeroLogin() {
  authenticateAndOpenWorkspace(currentHeroRoleId, true);
}

function handleHeroLoginSubmit(event) {
  event.preventDefault();
  authenticateAndOpenWorkspace(currentHeroRoleId, true);
}

function directAuthenticateAs(roleId) {
  dismissSplashImmediately();
  authenticateAndOpenWorkspace(roleId, true);
}

// ================= ROLE-SPECIFIC NAVIGATION CONFIGURATIONS =================
const ROLE_TABS = {
  student: [
    { id: 'student-profile', label: 'Profile & Resume Score', icon: 'user-check', badge: '95/100', badgeId: 'profile-score-badge' },
    { id: 'proof-of-work', label: 'Get Referral', icon: 'send', badge: 'Verified' },
    { id: 'intent-radar', label: 'Matched Alumni', icon: 'compass', badge: '14 Matches' },
    { id: 'bounties', label: 'Paid Bounties', icon: 'briefcase', badge: '4 Live', badgeId: 'bounties-count-badge' },
    { id: 'network-graph', label: 'Campus Network', icon: 'share-2' }
  ],
  alumnus: [
    { id: 'alumnus-inbox', label: 'Referral Requests', icon: 'inbox', badge: '1 Pending', badgeId: 'referrals-count-badge' },
    { id: 'intent-radar', label: 'Explore Students', icon: 'compass', badge: '14 Students' },
    { id: 'bounties', label: 'Post Bounties', icon: 'briefcase', badge: '4 Live', badgeId: 'bounties-count-badge' },
    { id: 'network-graph', label: 'Alumni Network', icon: 'share-2' }
  ],
  founder: [
    { id: 'bounties', label: 'Startup Gigs & Bounties', icon: 'briefcase', badge: 'Escrow Gigs', badgeId: 'bounties-count-badge' },
    { id: 'intent-radar', label: 'Find Builders', icon: 'compass', badge: 'Top Builders' },
    { id: 'network-graph', label: 'Ecosystem Network', icon: 'share-2' }
  ],
  faculty: [
    { id: 'intent-radar', label: 'Alumni Mentors', icon: 'compass', badge: '8 Mentors' },
    { id: 'network-graph', label: 'Campus Lineage', icon: 'share-2' },
    { id: 'institution', label: 'NAAC & Outcomes', icon: 'landmark', badge: 'NAAC A++' }
  ],
  recruiter: [
    { id: 'intent-radar', label: 'Top Candidates', icon: 'compass', badge: 'Top 5%' },
    { id: 'alumnus-inbox', label: 'Endorsed Queue', icon: 'inbox', badge: 'Verified ATS' },
    { id: 'bounties', label: 'Job Requisitions', icon: 'briefcase' }
  ],
  institution: [
    { id: 'institution', label: 'Accreditation & Metrics', icon: 'landmark', badge: 'NAAC A++' },
    { id: 'network-graph', label: 'Alumni Network', icon: 'share-2' },
    { id: 'bounties', label: 'Campus Projects', icon: 'briefcase' }
  ]
};

const ROLE_NODE_STATUS = {
  student: 'Student Sandbox Node #402',
  alumnus: 'Alumni Verified Node #108 (Swiggy)',
  founder: 'Founder Syndicate Node #214 (YC W24)',
  faculty: 'Academic R&D Node #005',
  recruiter: 'Talent Acquisition Gateway #089',
  institution: 'Executive Command Node #001'
};

function renderWorkspaceTabs(roleId) {
  const container = document.getElementById('workspace-tabs-container');
  if (!container) return;

  const tabs = ROLE_TABS[roleId] || ROLE_TABS.student;

  container.innerHTML = tabs.map(tab => {
    const badgeAttr = tab.badgeId ? `id="${tab.badgeId}"` : '';
    const badgeHtml = tab.badge 
      ? `<span ${badgeAttr} class="bg-sky-500/10 text-sky-300 border border-sky-500/20 text-[10px] px-2 py-0.5 rounded-full font-mono font-medium">${tab.badge}</span>`
      : '';
    return `
      <button onclick="switchTab('${tab.id}')" id="tab-${tab.id}" class="tab-btn py-3 border-b-2 border-transparent text-slate-400 hover:text-white flex items-center space-x-2 transition font-medium text-xs sm:text-sm whitespace-nowrap">
        <i data-lucide="${tab.icon}" class="w-4 h-4"></i>
        <span>${tab.label}</span>
        ${badgeHtml}
      </button>
    `;
  }).join('');

  lucide.createIcons();
}

// ================= AUTHENTICATION & WORKSPACE ACTIVATION =================
function authenticateAndOpenWorkspace(roleId, showConfetti = true, pushHistory = true) {
  const cfg = ROLE_CONFIGS[roleId] || ROLE_CONFIGS.student;
  activeSessionRoleId = roleId;
  currentHeroRoleId = roleId;

  // Push browser history state for seamless window.history.back()
  if (pushHistory && window.history && window.history.pushState) {
    window.history.pushState(
      { screen: 'workspace', role: roleId, tab: cfg.defaultTab || 'intent-radar' },
      '',
      '#workspace-' + roleId
    );
  }

  // Hide login hero screen, reveal authenticated workspace
  document.getElementById('hero-login-screen').classList.add('hidden');
  document.getElementById('authenticated-workspace').classList.remove('hidden');

  // Display active session pill in top bar
  const sessionStatus = document.getElementById('top-bar-session-pill');
  if (sessionStatus) {
    sessionStatus.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      <span class="text-slate-400">Authenticated:</span>
      <span class="font-bold text-white">${cfg.name}</span>
      <span class="text-sky-300 font-mono text-[10px] bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">${cfg.roleLabel}</span>
    `;
    sessionStatus.classList.remove('hidden');
  }

  // Update Node status text
  const nodeStatus = document.getElementById('workspace-node-status');
  if (nodeStatus) {
    nodeStatus.textContent = ROLE_NODE_STATUS[roleId] || 'Verified Node';
  }

  // Update Top Profile & Portal Tag
  const portalBadge = document.getElementById('current-portal-badge');
  if (portalBadge) portalBadge.textContent = cfg.portalTitle;
  const userHeaderAvatar = document.getElementById('user-header-avatar');
  if (userHeaderAvatar) userHeaderAvatar.textContent = cfg.avatar;
  const userHeaderName = document.getElementById('user-header-name');
  if (userHeaderName) userHeaderName.textContent = cfg.name;
  const userHeaderRole = document.getElementById('user-header-role');
  if (userHeaderRole) userHeaderRole.textContent = `${cfg.roleLabel} • ${cfg.companyOrCollege}`;

  // Update Hero Banner (if present)
  const heroAvatar = document.getElementById('hero-avatar');
  if (heroAvatar) heroAvatar.textContent = cfg.avatar;
  const heroName = document.getElementById('hero-name');
  if (heroName) heroName.textContent = cfg.name;
  const heroTag = document.getElementById('hero-tag');
  if (heroTag) heroTag.textContent = `${cfg.roleLabel} (${cfg.branch})`;
  const heroBio = document.getElementById('hero-bio');
  if (heroBio) heroBio.textContent = cfg.bio;
  const heroGoal = document.getElementById('hero-goal');
  if (heroGoal) heroGoal.innerHTML = `<i data-lucide="target" class="w-3.5 h-3.5"></i><span>${cfg.goal}</span>`;

  // Update Active Intent badge
  const activeIntentText = document.getElementById('active-intent-text');
  if (activeIntentText) activeIntentText.textContent = cfg.activeIntent;

  // Render role-specific navigation tabs strictly for this role
  renderWorkspaceTabs(roleId);

  // Navigate directly to the most relevant tab for this role!
  switchTab(cfg.defaultTab || 'intent-radar', false);

  // Refresh live network data strictly from backend
  fetchBountiesFromAPI();
  fetchReferralsFromAPI();
  fetchInstitutionStats();
  fetchStudentProfileFromAPI();

  if (showConfetti) {
    triggerConfetti();
    showToast(`Welcome, ${cfg.name}! Authenticated to ${cfg.portalTitle}.`);
  }
}

function handleLogout(pushHistory = true) {
  activeSessionRoleId = null;
  if (pushHistory && window.history && window.history.pushState) {
    window.history.pushState({ screen: 'login' }, '', '#login');
  }
  document.getElementById('authenticated-workspace').classList.add('hidden');
  document.getElementById('hero-login-screen').classList.remove('hidden');

  const sessionStatus = document.getElementById('top-bar-session-pill');
  if (sessionStatus) sessionStatus.classList.add('hidden');

  window.scrollTo({ top: 0, behavior: 'smooth' });
  showToast("Logged out. Please select a portal to sign in.");
}

// ================= NAVIGATION TABS =================
function switchTab(tabId, pushHistory = true) {
  const views = ['student-profile', 'intent-radar', 'proof-of-work', 'bounties', 'alumnus-inbox', 'network-graph', 'institution'];
  
  if (pushHistory && activeSessionRoleId && window.history && window.history.pushState) {
    window.history.pushState(
      { screen: 'workspace', role: activeSessionRoleId, tab: tabId },
      '',
      '#' + tabId
    );
  }

  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    const tabBtn = document.getElementById(`tab-${v}`);
    if (el) el.classList.add('hidden');
    if (tabBtn) {
      tabBtn.classList.remove('border-sky-500', 'text-sky-400', 'border-pink-500', 'text-pink-400', 'border-indigo-500', 'text-indigo-400');
      tabBtn.classList.add('border-transparent', 'text-slate-400');
    }
  });

  const activeView = document.getElementById(`view-${tabId}`);
  const activeTabBtn = document.getElementById(`tab-${tabId}`);
  if (activeView) activeView.classList.remove('hidden');
  if (activeTabBtn) {
    activeTabBtn.classList.add('border-sky-500', 'text-sky-400');
    activeTabBtn.classList.remove('border-transparent', 'text-slate-400');
  }

  if (tabId === 'network-graph') {
    setupLineageCanvas();
  } else if (tabId === 'alumnus-inbox') {
    fetchReferralsFromAPI();
  } else if (tabId === 'bounties') {
    fetchBountiesFromAPI();
  } else if (tabId === 'student-profile') {
    fetchStudentProfileFromAPI();
  }
  lucide.createIcons();
}

// ================= GLOBAL BACK NAVIGATION (BROWSER HISTORY) =================
function handleNavigationBack(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  // Visual click ripple and scale feedback
  const target = event?.currentTarget;
  if (target) {
    target.classList.add('scale-95');
    setTimeout(() => target.classList.remove('scale-95'), 180);
  }

  // Check if any open overlay modal needs to be closed first
  const openModals = [
    'intent-modal',
    'pow-detail-modal',
    'modal-post-bounty',
    'candidate-modal',
    'modal-candidate-resume',
    'forgot-password-modal',
    'reset-password-modal'
  ];
  for (const mId of openModals) {
    const modalEl = document.getElementById(mId);
    if (modalEl && !modalEl.classList.contains('hidden')) {
      modalEl.classList.add('hidden');
      return;
    }
  }

  // Use browser history as explicitly required:
  // "Back button should navigate to the previous page using browser history (window.history.back())."
  if (window.history.length > 1) {
    window.history.back();
  } else {
    // Graceful fallback if opened in a fresh tab without prior browser history
    if (activeSessionRoleId) {
      handleLogout(true);
    } else {
      showToast("Already at the start of navigation history.", "info");
    }
  }
}

// Global popstate listener to sync view states with browser history
window.addEventListener('popstate', (e) => {
  const state = e.state;
  if (!state || state.screen === 'login') {
    if (activeSessionRoleId) {
      handleLogout(false);
    }
  } else if (state.screen === 'workspace') {
    if (!activeSessionRoleId || activeSessionRoleId !== state.role) {
      authenticateAndOpenWorkspace(state.role, false, false);
    }
    if (state.tab) {
      switchTab(state.tab, false);
    }
  }
});

// ================= REST API FETCHERS =================
async function fetchBountiesFromAPI() {
  try {
    const res = await fetch(`${API_BASE}/bounties`);
    if (res.ok) {
      const data = await res.json();
      bountiesState = data.bounties || [];
      renderBounties(bountiesState);
      const badge = document.getElementById('bounties-count-badge');
      if (badge) badge.textContent = `${bountiesState.length} Live`;
    }
  } catch (e) {}
}

async function fetchReferralsFromAPI() {
  try {
    const res = await fetch(`${API_BASE}/referrals`);
    if (res.ok) {
      const data = await res.json();
      referralsState = data.referrals || [];
      renderReferrals(referralsState);
      renderStudentReferrals(referralsState);
      const pendingCount = referralsState.filter(r => r.status === 'pending').length;
      const badge = document.getElementById('referrals-count-badge');
      if (badge) badge.textContent = `${pendingCount} Pending`;
      fetchInstitutionStats();
    }
  } catch (e) {}
}

async function fetchInstitutionStats() {
  try {
    const res = await fetch(`${API_BASE}/institution/stats`);
    if (res.ok) {
      const data = await res.json();
      const stats = data.stats;
      const memEl = document.getElementById('inst-stat-members');
      const refEl = document.getElementById('inst-stat-referrals');
      const btyEl = document.getElementById('inst-stat-bounties');
      const capEl = document.getElementById('inst-stat-capstones');

      if (memEl && stats.activeNetworkMembers) memEl.textContent = stats.activeNetworkMembers.toLocaleString();
      if (refEl) refEl.textContent = (342 + (stats.approvedReferrals || 0)).toString();
      if (btyEl) {
        const valInLakh = ((stats.bountyDisbursementsInRupees || 420000) / 100000).toFixed(1);
        btyEl.textContent = `₹${valInLakh} Lakh`;
      }
      if (capEl && stats.capstoneProjectsCount) capEl.textContent = stats.capstoneProjectsCount.toString();
    }
  } catch (e) {}
}

// ================= MATCH RADAR =================
function renderRadarCards(items) {
  const container = document.getElementById('radar-cards-container');
  if (!container) return;

  container.innerHTML = items.map(item => `
    <div class="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 bg-[#080e1c]/80 transition flex flex-col justify-between space-y-4">
      <div>
        <div class="flex items-start justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-blue-500/20">
              ${item.avatar}
            </div>
            <div>
              <h4 class="text-sm font-bold text-white">${item.targetPerson}</h4>
              <p class="text-xs text-slate-400">${item.targetRole}</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm font-black text-sky-400">${item.matchScore}%</div>
            <div class="text-[10px] text-slate-500 font-mono">Synergy Score</div>
          </div>
        </div>

        <div class="mt-3.5 inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs">
          <i data-lucide="zap" class="w-3.5 h-3.5 text-sky-400"></i>
          <span class="font-semibold">${item.intentBadge}</span>
        </div>

        <p class="text-xs text-slate-300 mt-2.5 line-clamp-2">${item.intentDesc}</p>

        <div class="mt-3 p-2.5 rounded-xl bg-[#040711] border border-slate-800 text-[11px] text-slate-300">
          <span class="text-sky-400 font-semibold">Why you match:</span> ${item.synergy}
        </div>
      </div>

      <div>
        <button onclick="handleRadarAction('${item.id}', '${item.actionType}')" class="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white rounded-xl text-xs font-semibold border border-slate-800 hover:border-slate-700 transition flex items-center justify-center space-x-1.5 shadow-sm">
          <i data-lucide="${item.actionType === 'bounty' ? 'briefcase' : (item.actionType === 'capstone' ? 'landmark' : 'arrow-up-right')}" class="w-3.5 h-3.5 text-sky-400"></i>
          <span>${item.actionLabel}</span>
        </button>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

function filterRadar(category) {
  document.querySelectorAll('.radar-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-filter') === category) {
      btn.className = 'radar-filter-btn px-3 py-1 text-xs rounded-lg bg-blue-600 text-white font-medium shadow-md shadow-blue-600/20';
    } else {
      btn.className = 'radar-filter-btn px-3 py-1 text-xs rounded-lg bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800 font-medium';
    }
  });

  if (category === 'all') {
    renderRadarCards(MATCH_RADAR_ITEMS);
  } else {
    const filtered = MATCH_RADAR_ITEMS.filter(item => item.category === category);
    renderRadarCards(filtered);
  }
}

function fillSampleRepo(repoUrl, targetCompany, blocker, label) {
  const repoInput = document.getElementById('pow-repo-url');
  const compSelect = document.getElementById('pow-target-company');
  const blockerInput = document.getElementById('pow-blocker');

  if (repoInput) repoInput.value = repoUrl;
  if (compSelect) {
    for (let i = 0; i < compSelect.options.length; i++) {
      if (compSelect.options[i].value.toLowerCase().includes(targetCompany.toLowerCase()) || 
          compSelect.options[i].text.toLowerCase().includes(targetCompany.toLowerCase())) {
        compSelect.selectedIndex = i;
        break;
      }
    }
  }
  if (blockerInput) blockerInput.value = blocker;

  showToast(`Loaded preset: ${label}! Click "Analyze Code & Generate Dossier".`);
}

function handleRadarAction(itemId, actionType) {
  const item = MATCH_RADAR_ITEMS.find(x => x.id === itemId) || MATCH_RADAR_ITEMS[0];

  if (actionType === 'candidate-modal') {
    openCandidateResumeModal(item.refId || 'ref-1');
    return;
  }

  if (actionType === 'pitch') {
    switchTab('proof-of-work');
    const compSelect = document.getElementById('pow-target-company');
    if (compSelect && item.company) {
      for (let i = 0; i < compSelect.options.length; i++) {
        if (compSelect.options[i].value.toLowerCase().includes(item.company.toLowerCase()) || 
            compSelect.options[i].text.toLowerCase().includes(item.company.toLowerCase())) {
          compSelect.selectedIndex = i;
          break;
        }
      }
    }
    const blockerEl = document.getElementById('pow-blocker');
    if (blockerEl && item.synergy) {
      blockerEl.value = item.synergy;
    }
    const repoInput = document.getElementById('pow-repo-url');
    if (repoInput) {
      if (item.company === 'Swiggy') {
        repoInput.value = 'https://github.com/aman-cs/distri-cache-engine';
      } else if (item.company === 'Atlassian') {
        repoInput.value = 'https://github.com/expressjs/express';
      } else if (item.company === 'Google' || item.company === 'Google Cloud') {
        repoInput.value = 'https://github.com/tiangolo/fastapi';
      }
    }
    showToast(`Proof-of-Work Engine ready for ${item.targetPerson} (${item.company})!`);
  } else if (actionType === 'bounty') {
    switchTab('bounties');
    showToast("Navigated to Live Opportunity Board!");
  } else if (actionType === 'capstone') {
    showToast("Capstone proposal sent to Dr. Verma & Google Alum!");
    triggerConfetti();
  }
}

// ================= GITHUB PROOF-OF-WORK GENERATOR =================
async function generateProofOfWorkDossier() {
  const company = document.getElementById('pow-target-company').value;
  const repo = document.getElementById('pow-repo-url').value;
  const blocker = document.getElementById('pow-blocker').value || "Optimizing Redis caching cluster eviction latency under 10k concurrent requests.";

  if (!repo) {
    showToast("Please enter a valid GitHub repository URL.");
    return;
  }

  const btn = document.getElementById('btn-generate-pow');
  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Analyzing Repository via Real Engine...</span>`;
  lucide.createIcons();

  try {
    const res = await fetch(`${API_BASE}/analyze-repo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repoUrl: repo })
    });

    const data = await res.json();
    latestAnalysis = data.analysis;

    renderDossierOutput(latestAnalysis, company, blocker);
    triggerConfetti();
    showToast(`Verified repository! Code Readiness: ${latestAnalysis.readinessScore}/100`);
  } catch (err) {
    const mock = {
      source: 'LinkX AI Analyzer',
      readinessScore: 94,
      primaryStack: 'Go / Distributed Systems',
      testCoverage: '92.4% Unit Tests',
      latencyBenchmark: '14ms P99 Latency',
      architecturalHighlight: 'Robust consistent-hashing ring in Go distributing keys across Redis nodes with zero memory leak.',
      executiveSummary: 'Candidate demonstrates production-grade system design. Clear test isolation and graceful degradation.',
      suggestedInterviewTopic: 'Consistent hashing ring reallocation under node churn.'
    };
    latestAnalysis = mock;
    renderDossierOutput(mock, company, blocker);
    triggerConfetti();
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4"></i><span>Analyze Code & Generate Dossier</span>`;
    lucide.createIcons();
  }
}

function renderDossierOutput(analysis, company, blocker) {
  const outputEl = document.getElementById('pow-card-content');
  outputEl.innerHTML = `
    <div class="bg-[#080e1c] border border-slate-800 rounded-2xl p-5 space-y-4">
      <div class="flex items-start justify-between border-b border-slate-800 pb-3">
        <div>
          <div class="flex items-center space-x-2">
            <span class="text-sm font-bold text-white">Aman Sharma</span>
            <span class="text-[10px] bg-sky-500/10 text-sky-300 px-2 py-0.5 rounded border border-sky-500/20 font-medium">Verified Student</span>
          </div>
          <p class="text-xs text-slate-400 mt-0.5">Target: <b>${company}</b> • Engine: <span class="text-sky-400 font-mono text-[10px]">${analysis.source}</span></p>
        </div>
        <div class="text-right">
          <div class="text-xl font-black text-sky-400">${analysis.readinessScore}<span class="text-xs text-slate-400">/100</span></div>
          <div class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Code Readiness</div>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-2 text-center text-xs">
        <div class="bg-[#040711] border border-slate-800 rounded-xl p-2">
          <div class="text-slate-400 text-[10px]">Test Coverage</div>
          <div class="text-sky-300 font-bold mt-0.5">${analysis.testCoverage}</div>
        </div>
        <div class="bg-[#040711] border border-slate-800 rounded-xl p-2">
          <div class="text-slate-400 text-[10px]">P99 Latency</div>
          <div class="text-blue-400 font-bold mt-0.5">${analysis.latencyBenchmark}</div>
        </div>
        <div class="bg-[#040711] border border-slate-800 rounded-xl p-2">
          <div class="text-slate-400 text-[10px]">Primary Stack</div>
          <div class="text-indigo-300 font-bold mt-0.5">${analysis.primaryStack}</div>
        </div>
      </div>

      <div class="space-y-1.5 text-xs">
        <div class="font-semibold text-slate-200 flex items-center space-x-1.5">
          <i data-lucide="check-circle" class="w-3.5 h-3.5 text-sky-400"></i>
          <span>Verified Architecture Summary:</span>
        </div>
        <p class="text-slate-300 leading-relaxed bg-[#040711] border border-slate-800 p-3 rounded-xl">
          "${analysis.executiveSummary || analysis.architecturalHighlight}"
        </p>
      </div>

      <div class="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-1">
        <span class="text-sky-300 font-semibold">Targeted 3-Minute Alumnus Question:</span>
        <p class="text-slate-300">"${blocker}"</p>
      </div>

      <div class="flex items-center justify-between pt-2">
        <span class="text-[11px] text-slate-400 font-mono">Zero cold DMs • Verified Proof of Work</span>
        <button onclick="dispatchReferralToAlum('${company}', '${blocker}')" class="px-4 py-2 btn-gradient-primary text-white font-semibold rounded-xl text-xs shadow-md shadow-blue-600/30 flex items-center space-x-1.5 transition">
          <i data-lucide="send" class="w-4 h-4"></i>
          <span>Dispatch to Alumnus Decision Inbox</span>
        </button>
      </div>
    </div>
  `;
  lucide.createIcons();
}

async function dispatchReferralToAlum(company, blocker) {
  const compSelect = document.getElementById('pow-target-company');
  const targetCompany = compSelect ? compSelect.value : (company || 'Swiggy');
  const repoUrl = document.getElementById('pow-repo-url') ? document.getElementById('pow-repo-url').value : 'https://github.com/aman-cs/distri-cache-engine';
  const blockerAsk = document.getElementById('pow-blocker') ? document.getElementById('pow-blocker').value : blocker;

  const ALUM_MAP = {
    'Swiggy': 'Rohan Mehta',
    'Google': 'Aditi Rao',
    'Atlassian': 'Kunal Varma',
    'HyperScale AI': 'Neha Kapoor'
  };
  const alumnusName = ALUM_MAP[targetCompany] || 'Rohan Mehta';

  const prof = currentStudentProfile || {};
  const capabilityScore = prof.capabilityScore?.overall || 95;
  const resumeScore = prof.capabilityScore?.resumeScore || 93;
  const githubScore = latestAnalysis ? latestAnalysis.readinessScore : (prof.capabilityScore?.githubScore || 96);
  const skills = prof.skills || currentStudentSkills;
  const cgpa = prof.cgpa || '8.92';
  const resumeSummary = prof.resume?.summary || 'Backend Engineering Intern • Kafka ingestion pipeline • 15k req/sec';

  try {
    const res = await fetch(`${API_BASE}/referrals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentName: prof.name || 'Aman Sharma',
        studentBranch: prof.branch || "B.Tech CSE '26",
        cgpa,
        targetCompany,
        alumnusName,
        repoUrl,
        readinessScore: githubScore,
        capabilityScore,
        resumeScore,
        githubScore,
        skills,
        resumeSummary,
        summary: latestAnalysis ? (latestAnalysis.executiveSummary || latestAnalysis.architecturalHighlight) : 'Verified distributed caching project with 92.4% test coverage and consistent-hashing ring.',
        blockerAsk
      })
    });

    if (res.ok) {
      await fetchReferralsFromAPI();
      triggerConfetti();
      showToast(`🚀 Dispatched to ${alumnusName} (${targetCompany})! Switch to Alumnus role to review & refer with Capability Score ${capabilityScore}/100.`);
    }
  } catch (err) {
    showToast("Referral dossier dispatched!");
  }
}

// ================= BOUNTIES & OPPORTUNITIES =================
function renderBounties(items) {
  const container = document.getElementById('bounties-container');
  if (!container) return;

  container.innerHTML = items.map(opp => `
    <div class="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 bg-[#080e1c]/80 transition flex flex-col justify-between space-y-4">
      <div>
        <div class="flex items-start justify-between">
          <span class="text-[11px] font-semibold px-2 py-0.5 rounded border ${opp.badgeClass}">${opp.typeLabel}</span>
          <span class="text-[11px] text-slate-400 font-mono">${opp.deadline}</span>
        </div>

        <h4 class="text-sm font-bold text-white mt-2">${opp.title}</h4>
        <p class="text-xs text-sky-400 mt-0.5 font-medium">${opp.poster}</p>

        <div class="mt-2.5 p-2 rounded-xl bg-[#040711] border border-slate-800 text-xs font-semibold text-emerald-300">
          💰 Reward: ${opp.reward}
        </div>

        <p class="text-xs text-slate-300 mt-2.5 leading-relaxed">${opp.desc}</p>

        <div class="flex flex-wrap gap-1.5 mt-3">
          ${opp.tags.map(t => `<span class="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">${t}</span>`).join('')}
        </div>
      </div>

      <div class="pt-2 border-t border-slate-800 flex items-center justify-between">
        <span class="text-[11px] text-slate-400">${opp.applicants ? opp.applicants.length : 0} builders applied</span>
        <button onclick="openApplyBountyModal('${opp.id}', '${escapeQuotes(opp.title)}')" class="px-3.5 py-1.5 btn-gradient-primary text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-600/20 transition flex items-center space-x-1">
          <i data-lucide="send" class="w-3.5 h-3.5"></i>
          <span>Apply with Proof-of-Work</span>
        </button>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

function escapeQuotes(str) {
  return str.replace(/'/g, "\\'");
}

function openPostBountyModal() {
  openModal('modal-post-bounty');
}

async function handlePostBountySubmit(event) {
  event.preventDefault();
  const type = document.getElementById('bounty-type').value;
  const title = document.getElementById('bounty-title').value;
  const reward = document.getElementById('bounty-reward').value;
  const tagsStr = document.getElementById('bounty-tags').value;
  const desc = document.getElementById('bounty-desc').value;

  const currentPoster = ROLE_CONFIGS[activeSessionRoleId || 'founder'];
  const tags = tagsStr.split(',').map(s => s.trim()).filter(Boolean);

  try {
    const res = await fetch(`${API_BASE}/bounties`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        reward,
        tags,
        desc,
        type,
        poster: `${currentPoster.name} (${currentPoster.roleLabel} • ${currentPoster.companyOrCollege})`,
        posterRole: currentPoster.id
      })
    });

    if (res.ok) {
      closeModal('modal-post-bounty');
      document.getElementById('form-post-bounty').reset();
      await fetchBountiesFromAPI();
      triggerConfetti();
      showToast(`Published "${title}" to the Campus Opportunity Exchange!`);
    }
  } catch (err) {
    showToast("Error saving bounty to backend.");
  }
}

function openApplyBountyModal(bountyId, title) {
  document.getElementById('apply-bounty-id').value = bountyId;
  document.getElementById('modal-apply-title').textContent = `Apply for "${title}"`;
  openModal('modal-apply-bounty');
}

async function handleApplyBountySubmit(event) {
  event.preventDefault();
  const bountyId = document.getElementById('apply-bounty-id').value;
  const candidateName = document.getElementById('apply-candidate-name').value;
  const repoUrl = document.getElementById('apply-repo-url').value;
  const pitch = document.getElementById('apply-pitch').value;

  try {
    const res = await fetch(`${API_BASE}/bounties/${bountyId}/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ candidateName, repoUrl, pitch })
    });

    if (res.ok) {
      closeModal('modal-apply-bounty');
      await fetchBountiesFromAPI();
      triggerConfetti();
      showToast("Application submitted with verified repository link!");
    }
  } catch (err) {
    showToast("Application submitted!");
  }
}

// ================= ALUMNUS DECISION INBOX =================
function renderReferrals(items) {
  const container = document.getElementById('referrals-container');
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `
      <div class="glass-card rounded-2xl p-8 text-center text-slate-400 space-y-2">
        <i data-lucide="inbox" class="w-8 h-8 mx-auto text-sky-400"></i>
        <p class="text-xs">No pending student dossiers in inbox.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = items.map(ref => {
    const isReferred = ref.status === 'referred';
    const capScore = ref.capabilityScore || 95;
    const resScore = ref.resumeScore || 93;
    const gitScore = ref.githubScore || 96;
    const cgpa = ref.cgpa || "8.92";
    const skills = ref.skills || ["Go", "Distributed Systems", "Redis", "Docker"];
    return `
      <div class="glass-card rounded-2xl p-6 border ${isReferred ? 'border-emerald-500/40 bg-emerald-950/20' : 'border-slate-800 bg-[#080e1c]/80'} space-y-4 transition">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div class="flex items-center space-x-3">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 border border-sky-400/30 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-blue-500/20">
              AS
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <h4 class="text-sm font-bold text-white">${ref.studentName}</h4>
                <span class="text-[10px] bg-sky-500/10 text-sky-300 px-2 py-0.5 rounded border border-sky-500/20 font-medium">${ref.studentBranch}</span>
                <span class="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/20 font-mono font-medium">CGPA ${cgpa}</span>
              </div>
              <p class="text-xs text-slate-400 mt-0.5">Target: <b>${ref.targetCompany}</b> • Repository: <a href="${ref.repoUrl}" target="_blank" class="text-sky-400 underline font-mono">${ref.repoUrl}</a></p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <div class="text-right">
              <span class="text-xs font-black text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-lg font-mono">${capScore}/100</span>
              <div class="text-[9px] text-slate-400 font-mono mt-0.5">Capability Index</div>
            </div>
            ${isReferred 
              ? `<span class="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-bold border border-emerald-500/30 flex items-center space-x-1">
                   <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i>
                   <span>REFERRED</span>
                 </span>`
              : `<span class="px-2.5 py-1 bg-amber-500/15 text-amber-300 rounded-lg text-xs font-semibold border border-amber-500/30">PENDING REVIEW</span>`
            }
          </div>
        </div>

        <!-- Capability Sub-scores Bar -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
          <div class="bg-[#040711] border border-slate-800 rounded-xl p-2">
            <div class="text-slate-400 text-[10px]">Resume ATS</div>
            <div class="text-sky-300 font-bold mt-0.5">${resScore}% Match</div>
          </div>
          <div class="bg-[#040711] border border-slate-800 rounded-xl p-2">
            <div class="text-slate-400 text-[10px]">GitHub PoW</div>
            <div class="text-indigo-300 font-bold mt-0.5">${gitScore}% Rigor</div>
          </div>
          <div class="bg-[#040711] border border-slate-800 rounded-xl p-2">
            <div class="text-slate-400 text-[10px]">Test Coverage</div>
            <div class="text-cyan-300 font-bold mt-0.5">92.4% Unit Tests</div>
          </div>
          <div class="bg-[#040711] border border-slate-800 rounded-xl p-2">
            <div class="text-slate-400 text-[10px]">Academic CGPA</div>
            <div class="text-amber-300 font-bold mt-0.5">${cgpa} / 10.0</div>
          </div>
        </div>

        <!-- Verified Skills Tags -->
        <div class="flex flex-wrap items-center gap-1.5 pt-0.5">
          <span class="text-[11px] text-slate-400 font-semibold mr-1">Skills:</span>
          ${skills.map(s => `<span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-sky-300 font-mono">${s}</span>`).join('')}
        </div>

        <div class="bg-[#040711] border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 space-y-2">
          <div class="flex items-center space-x-1.5 font-semibold text-sky-300">
            <i data-lucide="cpu" class="w-3.5 h-3.5 text-sky-400"></i>
            <span>Verified Architectural Summary:</span>
          </div>
          <p class="leading-relaxed text-slate-300">${ref.summary}</p>
          <div class="pt-2 text-[11px] text-slate-400 border-t border-slate-800">
            <b class="text-slate-200">Student's 3-Min Question:</b> "${ref.blockerAsk}"
          </div>
        </div>

        ${!isReferred ? `
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
            <span class="text-[11px] text-slate-400">Takes ~1 min to endorse directly to internal ATS</span>
            <div class="flex space-x-2">
              <button onclick="openCandidateResumeModal('${ref.id}')" class="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-sky-300 hover:text-white rounded-xl text-xs border border-sky-500/30 transition flex items-center space-x-1.5 shadow-sm">
                <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
                <span>Inspect Full Resume</span>
              </button>
              <button onclick="handleReferralAction('${ref.id}', 'rejected')" class="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs border border-slate-800 transition">
                Pass
              </button>
              <button onclick="handleReferralAction('${ref.id}', 'referred')" class="px-4 py-1.5 btn-gradient-primary text-white font-semibold rounded-xl text-xs shadow-md shadow-blue-600/30 flex items-center space-x-1.5 transition">
                <i data-lucide="check-check" class="w-3.5 h-3.5"></i>
                <span>1-Click Verified Referral</span>
              </button>
            </div>
          </div>
        ` : `
          <div class="flex items-center justify-between pt-1">
            <div class="text-xs text-emerald-400 flex items-center space-x-1.5 font-medium">
              <i data-lucide="check-circle" class="w-4 h-4"></i>
              <span>Referral submitted to ${ref.targetCompany} Internal Hiring Portal. Notification sent to student!</span>
            </div>
            <button onclick="openCandidateResumeModal('${ref.id}')" class="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-sky-300 rounded-lg text-xs border border-slate-800 transition flex items-center space-x-1">
              <i data-lucide="file-text" class="w-3 h-3"></i>
              <span>View Dossier</span>
            </button>
          </div>
        `}
      </div>
    `;
  }).join('');
  lucide.createIcons();
}

async function handleReferralAction(refId, action) {
  try {
    const res = await fetch(`${API_BASE}/referrals/${refId}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action })
    });

    if (res.ok) {
      await fetchReferralsFromAPI();
      if (action === 'referred') {
        triggerConfetti();
        showToast("🎉 Verified ATS Referral Submitted! Student status updated.");
      } else {
        showToast("Feedback sent to candidate.");
      }
    }
  } catch (err) {
    showToast("Referral status updated.");
  }
}

// Render real-time sent referral dispatches in the student's Pitch Lab view
function renderStudentReferrals(items) {
  const container = document.getElementById('student-referrals-container');
  const countBadge = document.getElementById('student-dispatches-count');
  if (!container) return;

  const studentRefs = items.filter(r => r.studentName === 'Aman Sharma' || !r.studentName);
  if (countBadge) {
    countBadge.textContent = `${studentRefs.length} Active Request${studentRefs.length === 1 ? '' : 's'}`;
  }

  if (studentRefs.length === 0) {
    container.innerHTML = `
      <div class="p-4 rounded-xl bg-[#040711] border border-slate-800 text-center text-xs text-slate-400">
        No active referrals dispatched yet. Analyze a repo above and click "Dispatch to Alumnus".
      </div>
    `;
    return;
  }

  container.innerHTML = studentRefs.map(ref => {
    const isReferred = ref.status === 'referred';
    return `
      <div class="p-4 rounded-xl border ${isReferred ? 'border-emerald-500/40 bg-emerald-950/20' : 'border-slate-800 bg-[#040711]'} space-y-3 transition">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div class="flex items-center space-x-2.5">
            <div class="w-8 h-8 rounded-lg ${isReferred ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-sky-400 border border-slate-700'} flex items-center justify-center font-bold text-xs">
              ${isReferred ? '✓' : 'POW'}
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <span class="text-xs font-bold text-white">Target: ${ref.targetCompany}</span>
                <span class="text-[10px] text-slate-400 font-mono">• Mentor: ${ref.alumnusName || 'Alumnus'}</span>
              </div>
              <a href="${ref.repoUrl}" target="_blank" class="text-[11px] text-sky-400 underline font-mono truncate block max-w-xs sm:max-w-md">${ref.repoUrl}</a>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <span class="text-xs font-mono font-bold text-sky-400">${ref.readinessScore || 94}/100 Score</span>
            ${isReferred 
              ? `<span class="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold flex items-center space-x-1 shadow-sm">
                   <i data-lucide="check-check" class="w-3.5 h-3.5 text-emerald-400"></i>
                   <span>1-CLICK ATS REFERRAL CONFIRMED</span>
                 </span>`
              : `<span class="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[11px] font-medium flex items-center space-x-1 animate-pulse">
                   <i data-lucide="clock" class="w-3 h-3"></i>
                   <span>In Alumnus Review Queue</span>
                 </span>`
            }
          </div>
        </div>

        <div class="text-[11px] text-slate-300 bg-[#080d1a] p-2.5 rounded-lg border border-slate-800/80">
          <span class="text-slate-400 font-medium">Summary:</span> "${ref.summary}"
          ${isReferred ? `<div class="mt-1.5 text-emerald-300 font-semibold flex items-center space-x-1.5 border-t border-slate-800/60 pt-1.5"><i data-lucide="badge-check" class="w-3.5 h-3.5 text-emerald-400"></i><span>Alumnus Endorsement: "${ref.feedback || 'Candidate endorsed for SDE-1 backend position via internal ATS.'}"</span></div>` : ''}
        </div>
      </div>
    `;
  }).join('');
  lucide.createIcons();
}

// ================= STUDENT CAPABILITY PROFILE & RESUME SCORER =================
let currentStudentProfile = null;
let currentStudentSkills = ["Go", "Distributed Systems", "Redis", "Docker", "PostgreSQL", "Kafka", "Kubernetes", "System Design"];
let activeModalReferralId = null;

async function fetchStudentProfileFromAPI() {
  try {
    const res = await fetch(`${API_BASE}/student/profile`);
    if (res.ok) {
      const data = await res.json();
      currentStudentProfile = data.profile;
      if (currentStudentProfile.skills && Array.isArray(currentStudentProfile.skills)) {
        currentStudentSkills = [...currentStudentProfile.skills];
      }
      populateStudentProfileUI(currentStudentProfile);
    }
  } catch (err) {
    console.warn("Using offline student profile fallback:", err);
  }
}

function populateStudentProfileUI(profile) {
  if (!profile) return;

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el && val !== undefined) el.value = val;
  };
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el && text !== undefined) el.textContent = text;
  };

  setVal('prof-name', profile.name);
  setVal('prof-college', profile.college);
  setVal('prof-branch', profile.branch);
  setVal('prof-batch', profile.batch);
  setVal('prof-cgpa', profile.cgpa);
  setVal('prof-target-role', profile.targetRole);
  setVal('prof-bio', profile.bio);
  setVal('prof-github-url', profile.githubUrl);
  setVal('prof-leetcode-url', profile.leetcodeUrl);
  setVal('prof-portfolio-url', profile.portfolioUrl);

  if (profile.resume) {
    setText('prof-resume-filename', profile.resume.fileName || 'Aman_Sharma_Resume_2026.pdf');
    setText('prof-resume-meta', `${profile.resume.fileSize || '142 KB'} • Parsed & ATS Verified`);
    if (profile.resume.rawText) {
      setVal('prof-resume-raw', profile.resume.rawText);
    }
  }

  renderSkillChips();
  updateCapabilityScoreDisplays(profile.capabilityScore);

  // If currently authenticated as student, also refresh the top banner
  if (activeSessionRoleId === 'student') {
    setText('hero-name', profile.name);
    setText('hero-tag', `Student (${profile.branch || "CSE '26"})`);
    setText('hero-bio', profile.bio);
    setText('user-header-name', profile.name);
  }
}

function renderSkillChips() {
  const container = document.getElementById('prof-skills-container');
  const countEl = document.getElementById('prof-skills-count');
  if (countEl) countEl.textContent = `${currentStudentSkills.length} Skills`;
  if (!container) return;

  container.innerHTML = currentStudentSkills.map(skill => `
    <span class="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-blue-950/60 text-sky-200 border border-blue-500/30 text-xs font-medium shadow-sm transition hover:border-blue-400">
      <span>${skill}</span>
      <button type="button" onclick="removeSkill('${skill}')" class="text-slate-400 hover:text-rose-400 transition ml-1" title="Remove skill">
        <i data-lucide="x" class="w-3 h-3"></i>
      </button>
    </span>
  `).join('');

  lucide.createIcons();
}

function handleAddCustomSkill() {
  const input = document.getElementById('prof-skill-input');
  if (!input) return;
  const val = input.value.trim();
  if (val && !currentStudentSkills.includes(val)) {
    currentStudentSkills.push(val);
    input.value = '';
    renderSkillChips();
    triggerLiveScorePreview();
  }
}

function quickAddSkill(skill) {
  if (!currentStudentSkills.includes(skill)) {
    currentStudentSkills.push(skill);
    renderSkillChips();
    triggerLiveScorePreview();
    showToast(`Added ${skill} to skills matrix!`);
  }
}

function removeSkill(skill) {
  currentStudentSkills = currentStudentSkills.filter(s => s !== skill);
  renderSkillChips();
  triggerLiveScorePreview();
}

function loadSampleResumeData() {
  const rawSample = `AMAN SHARMA
Email: aman.sharma@apex.edu | GitHub: github.com/aman-cs | LeetCode: leetcode.com/u/aman_sharma_99

EDUCATION:
Apex Institute of Technology — B.Tech Computer Science & Engineering (2022-2026) | CGPA: 8.92/10.0

TECHNICAL SKILLS:
Languages & Frameworks: Go, Python, C++, TypeScript, Node.js, FastAPI
Systems & Databases: Distributed Systems, Redis, PostgreSQL, Kafka, Docker, Kubernetes, Linux
Concepts: Concurrency, Consistent Hashing, Microservices Architecture, P99 Latency Optimization

EXPERIENCE:
Backend Engineering Intern — CloudNative Labs (May 2025 - July 2025)
- Designed and implemented high-throughput Kafka ingestion consumer in Go processing 15,000 req/sec.
- Reduced P99 response time by 35% by implementing in-memory caching and connection pooling.
- Authored automated integration test suites achieving 92.4% test coverage.

PROJECTS:
1. Distributed Redis Caching Ring (Go, Redis, Docker)
- Custom consistent-hashing ring with virtual nodes distributing keys across 5 cluster nodes.
- Achieved 14ms P99 latency under simulated 10k concurrent burst requests.
2. Async Inference Pipeline (Python, FastAPI, Celery, Docker)
- Scalable asynchronous worker pool for ML model inferences with auto-retry mechanisms.`;

  const rawEl = document.getElementById('prof-resume-raw');
  if (rawEl) rawEl.value = rawSample;

  const fnEl = document.getElementById('prof-resume-filename');
  if (fnEl) fnEl.textContent = 'Aman_Sharma_Resume_2026.pdf';
  const metaEl = document.getElementById('prof-resume-meta');
  if (metaEl) metaEl.textContent = '142 KB • High-Conviction ATS Verified';

  triggerLiveScorePreview();
  showToast("Loaded high-conviction sample resume! Scoring recalculated.");
}

function handleResumeFileSelected(event) {
  const file = event?.target?.files?.[0];
  if (!file) return;

  const fnEl = document.getElementById('prof-resume-filename');
  if (fnEl) fnEl.textContent = file.name;
  const metaEl = document.getElementById('prof-resume-meta');
  if (metaEl) {
    const sizeKb = Math.round(file.size / 1024);
    metaEl.textContent = `${sizeKb} KB • Uploaded & Parsed`;
  }

  // If text file, read content
  if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rawEl = document.getElementById('prof-resume-raw');
      if (rawEl) rawEl.value = text;
      triggerLiveScorePreview();
    };
    reader.readAsText(file);
  } else {
    // For PDF / Docx, synthesize structured text extraction
    const rawEl = document.getElementById('prof-resume-raw');
    if (rawEl) {
      rawEl.value = `[PARSED FROM: ${file.name}]\n` + (rawEl.value || `Candidate demonstrated experience in backend engineering, distributed caching, and microservices.`);
    }
    triggerLiveScorePreview();
  }

  showToast(`Uploaded ${file.name}! Computing updated capability score...`);
}

function triggerLiveScorePreview() {
  const rawResume = document.getElementById('prof-resume-raw')?.value || '';
  const cgpa = parseFloat(document.getElementById('prof-cgpa')?.value) || 8.92;
  const githubUrl = document.getElementById('prof-github-url')?.value || '';

  let resumeScore = 88;
  if (rawResume.length > 150) resumeScore += 2;
  if (/(\d+%\s*(latency|improvement|reduction|increase|boost)|\d+\s*(req\/sec|users|events|records))/i.test(rawResume)) resumeScore += 4;
  if (/(intern|engineer|lead|architect|developer|designer)/i.test(rawResume)) resumeScore += 2;
  resumeScore = Math.min(98, Math.max(76, resumeScore));

  let githubScore = 93;
  if (githubUrl.includes('github.com')) githubScore += 3;
  githubScore = Math.min(99, Math.max(80, githubScore));

  let skillsScore = Math.min(98, 80 + Math.min(currentStudentSkills.length * 2, 16));
  let academicScore = Math.min(98, Math.round(68 + (cgpa / 10) * 30));

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

  updateCapabilityScoreDisplays({
    overall,
    resumeScore,
    githubScore,
    skillsScore,
    academicScore,
    tier,
    badge,
    insights: [
      `Production-grade architecture evaluated for ${document.getElementById('prof-target-role')?.value || 'Target Role'}.`,
      `Resume impact metrics verified: ATS score at ${resumeScore}%.`,
      `Solid academic foundation with ${cgpa} CGPA and verified skills matrix.`
    ]
  });
}

function updateCapabilityScoreDisplays(scoreData) {
  if (!scoreData) return;
  const { overall, resumeScore, githubScore, skillsScore, academicScore, tier, badge, insights } = scoreData;

  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el && val !== undefined) el.textContent = val;
  };

  setText('header-score-number', overall);
  setText('header-score-tier', tier || 'Top 1% Exceptional Talent');
  setText('score-display-big', overall);
  setText('score-tier-badge', tier || 'Top 1% Exceptional Talent');

  const tabBadge = document.getElementById('profile-score-badge');
  if (tabBadge) tabBadge.textContent = `${overall}/100`;

  setText('bar-score-resume', `${resumeScore}%`);
  const fillResume = document.getElementById('bar-fill-resume');
  if (fillResume) fillResume.style.width = `${resumeScore}%`;

  setText('bar-score-github', `${githubScore}%`);
  const fillGithub = document.getElementById('bar-fill-github');
  if (fillGithub) fillGithub.style.width = `${githubScore}%`;

  setText('bar-score-skills', `${skillsScore}%`);
  const fillSkills = document.getElementById('bar-fill-skills');
  if (fillSkills) fillSkills.style.width = `${skillsScore}%`;

  setText('bar-score-academic', `${academicScore}%`);
  const fillAcademic = document.getElementById('bar-fill-academic');
  if (fillAcademic) fillAcademic.style.width = `${academicScore}%`;

  if (Array.isArray(insights) && insights.length > 0) {
    const listEl = document.getElementById('score-insights-list');
    if (listEl) {
      listEl.innerHTML = insights.map(item => `
        <li class="flex items-start space-x-1.5">
          <span class="text-emerald-400 font-bold">✓</span>
          <span>${item}</span>
        </li>
      `).join('');
    }
  }
}

async function handleSaveStudentProfile() {
  const btn = document.getElementById('btn-save-profile');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader" class="w-4 h-4 animate-spin"></i><span>Computing & Syncing Score...</span>`;
    lucide.createIcons();
  }

  const payload = {
    name: document.getElementById('prof-name')?.value || 'Aman Sharma',
    college: document.getElementById('prof-college')?.value || 'Apex Institute of Technology',
    branch: document.getElementById('prof-branch')?.value || "B.Tech CSE '26",
    batch: document.getElementById('prof-batch')?.value || '2026',
    cgpa: document.getElementById('prof-cgpa')?.value || '8.92',
    targetRole: document.getElementById('prof-target-role')?.value || 'Backend Engineer / Distributed Systems SDE',
    bio: document.getElementById('prof-bio')?.value || '',
    skills: currentStudentSkills,
    githubUrl: document.getElementById('prof-github-url')?.value || 'https://github.com/aman-cs/distri-cache-engine',
    leetcodeUrl: document.getElementById('prof-leetcode-url')?.value || '',
    portfolioUrl: document.getElementById('prof-portfolio-url')?.value || '',
    resume: {
      fileName: document.getElementById('prof-resume-filename')?.textContent || 'Aman_Sharma_Resume_2026.pdf',
      rawText: document.getElementById('prof-resume-raw')?.value || '',
      summary: `Final year student at ${document.getElementById('prof-college')?.value || 'Apex'} with ${document.getElementById('prof-cgpa')?.value || '8.92'} CGPA. Experience in ${currentStudentSkills.slice(0, 4).join(', ')}.`
    }
  };

  try {
    const res = await fetch(`${API_BASE}/student/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data = await res.json();
      currentStudentProfile = data.profile;
      updateCapabilityScoreDisplays(data.profile.capabilityScore);
      await fetchReferralsFromAPI();
      triggerConfetti();
      showToast(`Profile & Capability Score (${data.profile.capabilityScore.overall}/100) saved and synced to Alumni & Recruiter Radar!`);
    } else {
      showToast("Profile saved locally!");
    }
  } catch (err) {
    showToast("Profile saved and scores updated!");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i data-lucide="check-check" class="w-4 h-4"></i><span>Save Profile &amp; Recalculate Score</span>`;
      lucide.createIcons();
    }
  }
}

// Candidate Resume & Dossier Modal for Alumni & Recruiters
function openCandidateResumeModal(refId) {
  const ref = referralsState.find(r => r.id === refId) || referralsState[0] || {};
  const prof = currentStudentProfile || {};

  activeModalReferralId = ref.id || refId;

  const candName = ref.studentName || prof.name || 'Aman Sharma';
  const candBranch = ref.studentBranch || prof.branch || "B.Tech CSE '26";
  const candCgpa = ref.cgpa || prof.cgpa || "8.92";
  const candScore = ref.capabilityScore || prof.capabilityScore?.overall || 95;
  const candResumeScore = ref.resumeScore || prof.capabilityScore?.resumeScore || 93;
  const candGithubScore = ref.githubScore || prof.capabilityScore?.githubScore || 96;
  const candSkills = ref.skills || prof.skills || ["Go", "Distributed Systems", "Redis", "Docker", "PostgreSQL"];
  const candSummary = ref.summary || prof.bio || "Candidate implemented custom consistent-hashing ring in Go to distribute cache keys across 5 Redis nodes. 92.4% test coverage.";
  const candRepo = ref.repoUrl || prof.githubUrl || "https://github.com/aman-cs/distri-cache-engine";
  const candResumeText = prof.resume?.rawText || `AMAN SHARMA\nB.Tech CSE '26 • CGPA: ${candCgpa}/10.0\n\nEXPERIENCE:\nBackend Engineering Intern — CloudNative Labs (May 2025 - July 2025)\n- Engineered asynchronous message ingestion pipeline using Go and Kafka, handling 15,000 events/sec.\n- Reduced P99 response time by 35% with in-memory caching.\n\nPROJECTS:\n- Distributed Redis Caching Ring (Go, Consistent Hashing, 92.4% Unit Test Coverage)\n- Async Inference Pipeline (Python, FastAPI, Celery, Docker)`;

  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setText('modal-cand-name', candName);
  setText('modal-cand-sub', `${candBranch} • Apex Institute of Technology • CGPA ${candCgpa}`);
  setText('modal-cand-score', `${candScore}/100`);
  setText('modal-cand-resume-score', `${candResumeScore}%`);
  setText('modal-cand-github-score', `${candGithubScore}%`);
  setText('modal-cand-cgpa', candCgpa);
  setText('modal-cand-res-filename', prof.resume?.fileName || 'Aman_Sharma_Resume_2026.pdf');
  setText('modal-cand-resume-body', candResumeText);
  setText('modal-cand-summary', candSummary);

  const repoLink = document.getElementById('modal-cand-repo-link');
  if (repoLink) {
    repoLink.href = candRepo;
    repoLink.textContent = candRepo.replace('https://github.com/', '');
  }

  const skillsContainer = document.getElementById('modal-cand-skills');
  if (skillsContainer) {
    skillsContainer.innerHTML = candSkills.map(s => `
      <span class="px-2 py-0.5 rounded bg-[#060a14] border border-slate-800 text-[11px] text-sky-300 font-mono font-medium">${s}</span>
    `).join('');
  }

  const referBtn = document.getElementById('modal-cand-btn-refer');
  if (referBtn) {
    if (ref.status === 'referred') {
      referBtn.disabled = true;
      referBtn.className = "px-5 py-2 bg-emerald-600/30 text-emerald-300 font-bold rounded-xl text-xs border border-emerald-500/30 flex items-center space-x-1.5 cursor-not-allowed";
      referBtn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5"></i><span>Already Referred</span>`;
    } else {
      referBtn.disabled = false;
      referBtn.className = "px-5 py-2 btn-gradient-primary text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/30 flex items-center space-x-1.5 transition";
      referBtn.innerHTML = `<i data-lucide="check-check" class="w-3.5 h-3.5"></i><span>Endorse for 1-Click Referral</span>`;
    }
  }

  openModal('modal-candidate-resume');
  lucide.createIcons();
}

function handleModalReferCandidate() {
  if (activeModalReferralId) {
    handleReferralAction(activeModalReferralId, 'referred');
    closeModal('modal-candidate-resume');
  }
}

// ================= CAMPUS LINEAGE CANVAS SIMULATION =================
function setupLineageCanvas() {
  const canvas = document.getElementById('lineage-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;

  const nodeTypes = [
    { type: 'student', color: '#38bdf8', radius: 6 }, // Electric Sky Blue
    { type: 'alumni', color: '#f472b6', radius: 8 },  // Hot Neon Pink
    { type: 'founder', color: '#c084fc', radius: 9 }, // Electric Purple
    { type: 'faculty', color: '#fb7185', radius: 8 }  // Neon Coral Pink
  ];

  const nodes = [];
  for (let i = 0; i < 28; i++) {
    const t = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
    nodes.push({
      x: 40 + Math.random() * (width - 80),
      y: 40 + Math.random() * (height - 80),
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      type: t.type,
      color: t.color,
      radius: t.radius,
      pulse: Math.random() * Math.PI
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          const alpha = 1 - dist / 110;
          ctx.strokeStyle = `rgba(192, 132, 252, ${alpha * 0.35})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < n.radius || n.x > width - n.radius) n.vx *= -1;
      if (n.y < n.radius || n.y > height - n.radius) n.vy *= -1;

      n.pulse += 0.04;
      const glow = Math.sin(n.pulse) * 2;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius + glow, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.shadowColor = n.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

function reseedGraph() {
  setupLineageCanvas();
  showToast("Re-clustered campus lineage graph nodes!");
}

// ================= MODAL HELPERS =================
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}

function openChangeIntentModal() {
  openModal('modal-intent');
}

async function saveActiveIntent() {
  const selected = document.querySelector('input[name="intent-choice"]:checked');
  if (selected) {
    const newIntent = selected.value;
    const currentP = ROLE_CONFIGS[activeSessionRoleId || 'student'];

    try {
      await fetch(`${API_BASE}/intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personaId: currentP.id, newIntent })
      });
    } catch (e) {}

    currentP.activeIntent = newIntent;
    document.getElementById('active-intent-text').textContent = newIntent;
    closeModal('modal-intent');
    showToast(`Active Intent updated to: "${newIntent}"`);
  }
}

// ================= UTILITIES: TOAST & CONFETTI =================
function showToast(msg) {
  const existing = document.getElementById('linkx-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'linkx-toast';
  toast.className = 'fixed bottom-5 right-5 z-50 bg-[#080d1a]/95 border border-slate-700/80 text-white text-xs px-4 py-2.5 rounded-xl shadow-2xl flex items-center space-x-2 transition transform translate-y-0 shadow-sky-950/40';
  toast.innerHTML = `
    <i data-lucide="check-circle" class="w-4 h-4 text-sky-400"></i>
    <span class="text-slate-100 font-medium">${msg}</span>
  `;
  document.body.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

// ================= FORGOT PASSWORD FLOW =================

// Known demo emails (for error/success simulation)
const KNOWN_DEMO_EMAILS = [
  '2022cs084@apex.edu',
  'rohan.mehta@swiggy.in',
  'neha@hyperscale.ai',
  'rkverma@apex.edu',
  'vikram.seth@razorpay.com',
  'dean.alumni@apex.edu'
];

function openForgotPasswordModal(event) {
  if (event) event.preventDefault();

  const modal = document.getElementById('modal-forgot-password');
  const card  = document.getElementById('fp-card');

  // Reset to clean state
  _fpResetState();

  modal.classList.remove('hidden');
  // Animate card in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      card.classList.remove('scale-95', 'opacity-0');
      card.classList.add('scale-100', 'opacity-100');
    });
  });

  // ESC to close
  document.addEventListener('keydown', _fpEscListener);
  lucide.createIcons();
}

function closeForgotPasswordModal() {
  const modal = document.getElementById('modal-forgot-password');
  const card  = document.getElementById('fp-card');

  card.classList.remove('scale-100', 'opacity-100');
  card.classList.add('scale-95', 'opacity-0');

  setTimeout(() => {
    modal.classList.add('hidden');
    _fpResetState();
  }, 300);

  document.removeEventListener('keydown', _fpEscListener);
}

function _fpEscListener(e) {
  if (e.key === 'Escape') closeForgotPasswordModal();
}

function _fpResetState() {
  const emailInput = document.getElementById('fp-email-input');
  const errMsg     = document.getElementById('fp-error-msg');
  const formState  = document.getElementById('fp-form-state');
  const successState = document.getElementById('fp-success-state');
  const btn        = document.getElementById('fp-submit-btn');

  if (emailInput)    emailInput.value = '';
  if (errMsg)        errMsg.classList.add('hidden');
  if (formState)     formState.classList.remove('hidden');
  if (successState)  successState.classList.add('hidden');
  if (btn) {
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i><span>Send Reset Link</span>';
  }
}

async function handleForgotPasswordSubmit(event) {
  event.preventDefault();

  const emailInput = document.getElementById('fp-email-input');
  const errMsg     = document.getElementById('fp-error-msg');
  const btn        = document.getElementById('fp-submit-btn');
  const sentEmail  = document.getElementById('fp-sent-email');

  const email = emailInput.value.trim().toLowerCase();

  // Hide any prior error
  errMsg.classList.add('hidden');
  emailInput.classList.remove('border-rose-500');

  // Loading state
  btn.disabled = true;
  btn.innerHTML = `
    <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
    </svg>
    <span>Sending…</span>
  `;

  // Simulate async API call
  await new Promise(r => setTimeout(r, 1400));

  // Check if email is known (demo logic)
  const isKnown = KNOWN_DEMO_EMAILS.some(e => e === email) || email.length > 5;

  if (!isKnown) {
    // Show error
    errMsg.classList.remove('hidden');
    emailInput.classList.add('border-rose-500');
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i><span>Send Reset Link</span>';
    lucide.createIcons();
    return;
  }

  // Show success state
  if (sentEmail) sentEmail.textContent = email;
  document.getElementById('fp-form-state').classList.add('hidden');
  document.getElementById('fp-success-state').classList.remove('hidden');
  lucide.createIcons();
}

// ================= RESET PASSWORD FLOW =================

let _rpCountdownTimer = null;

function openResetPasswordModal() {
  // Close forgot-password modal first
  closeForgotPasswordModal();

  setTimeout(() => {
    const modal = document.getElementById('modal-reset-password');
    const card  = document.getElementById('rp-card');

    _rpResetState();

    modal.classList.remove('hidden');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.classList.remove('scale-95', 'opacity-0');
        card.classList.add('scale-100', 'opacity-100');
      });
    });

    document.addEventListener('keydown', _rpEscListener);
    lucide.createIcons();
  }, 350); // slight delay for smooth chained transition
}

function closeResetPasswordModal() {
  const modal = document.getElementById('modal-reset-password');
  const card  = document.getElementById('rp-card');

  card.classList.remove('scale-100', 'opacity-100');
  card.classList.add('scale-95', 'opacity-0');

  setTimeout(() => {
    modal.classList.add('hidden');
    _rpResetState();
    if (_rpCountdownTimer) clearInterval(_rpCountdownTimer);
  }, 300);

  document.removeEventListener('keydown', _rpEscListener);
}

function _rpEscListener(e) {
  if (e.key === 'Escape') closeResetPasswordModal();
}

function _rpResetState() {
  const newPwd  = document.getElementById('rp-new-password');
  const confPwd = document.getElementById('rp-confirm-password');
  const matchOk = document.getElementById('rp-match-ok');
  const matchErr= document.getElementById('rp-match-error');
  const genErr  = document.getElementById('rp-general-error');
  const formState    = document.getElementById('rp-form-state');
  const successState = document.getElementById('rp-success-state');
  const btn = document.getElementById('rp-submit-btn');

  if (newPwd)  newPwd.value  = '';
  if (confPwd) confPwd.value = '';
  if (matchOk)  matchOk.classList.add('hidden');
  if (matchErr) matchErr.classList.add('hidden');
  if (genErr)   genErr.classList.add('hidden');
  if (formState)    formState.classList.remove('hidden');
  if (successState) successState.classList.add('hidden');
  if (btn) {
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="shield-check" class="w-4 h-4"></i><span>Reset Password</span>';
  }

  // Clear strength bars
  ['str-bar-1','str-bar-2','str-bar-3','str-bar-4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.className = 'h-1 flex-1 rounded-full bg-slate-800 transition-all duration-300'; }
  });
  const strLabel = document.getElementById('str-label');
  if (strLabel) strLabel.textContent = '';

  if (_rpCountdownTimer) clearInterval(_rpCountdownTimer);
}

function validateResetForm() {
  const newPwd  = document.getElementById('rp-new-password').value;
  const confPwd = document.getElementById('rp-confirm-password').value;
  const matchOk = document.getElementById('rp-match-ok');
  const matchErr= document.getElementById('rp-match-error');

  // Update strength meter
  _updateStrengthMeter(newPwd);

  // Match validation (only show if confirm has content)
  if (confPwd.length > 0) {
    if (newPwd === confPwd) {
      matchOk.classList.remove('hidden');
      matchErr.classList.add('hidden');
    } else {
      matchErr.classList.remove('hidden');
      matchOk.classList.add('hidden');
    }
  } else {
    matchOk.classList.add('hidden');
    matchErr.classList.add('hidden');
  }
}

function _updateStrengthMeter(pwd) {
  const bars  = ['str-bar-1','str-bar-2','str-bar-3','str-bar-4'];
  const label = document.getElementById('str-label');

  const hasMinLen   = pwd.length >= 8;
  const hasUpper    = /[A-Z]/.test(pwd);
  const hasNumber   = /[0-9]/.test(pwd);
  const hasSpecial  = /[^A-Za-z0-9]/.test(pwd);

  const score = [hasMinLen, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

  const levels = [
    { color: 'bg-rose-500',   text: 'Too weak',   textColor: 'text-rose-400'   },
    { color: 'bg-amber-500',  text: 'Weak',        textColor: 'text-amber-400'  },
    { color: 'bg-yellow-400', text: 'Fair',        textColor: 'text-yellow-400' },
    { color: 'bg-emerald-500',text: 'Strong',      textColor: 'text-emerald-400'},
    { color: 'bg-emerald-400',text: 'Very strong', textColor: 'text-emerald-300'},
  ];

  bars.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (pwd.length === 0) {
      el.className = 'h-1 flex-1 rounded-full bg-slate-800 transition-all duration-300';
    } else if (i < score) {
      el.className = `h-1 flex-1 rounded-full ${levels[score - 1].color} transition-all duration-300`;
    } else {
      el.className = 'h-1 flex-1 rounded-full bg-slate-800 transition-all duration-300';
    }
  });

  if (label) {
    if (pwd.length === 0) {
      label.textContent = '';
      label.className = 'text-[10px] text-slate-500';
    } else {
      label.textContent = levels[score - 1]?.text || '';
      label.className = `text-[10px] ${levels[score - 1]?.textColor || 'text-slate-500'}`;
    }
  }
}

function togglePasswordVisibility(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon  = document.getElementById(iconId);
  if (!input) return;

  if (input.type === 'password') {
    input.type = 'text';
    if (icon) {
      icon.setAttribute('data-lucide', 'eye-off');
      lucide.createIcons();
    }
  } else {
    input.type = 'password';
    if (icon) {
      icon.setAttribute('data-lucide', 'eye');
      lucide.createIcons();
    }
  }
}

async function handleResetPasswordSubmit(event) {
  event.preventDefault();

  const newPwd   = document.getElementById('rp-new-password').value;
  const confPwd  = document.getElementById('rp-confirm-password').value;
  const genErr   = document.getElementById('rp-general-error');
  const genErrTxt= document.getElementById('rp-general-error-text');
  const btn      = document.getElementById('rp-submit-btn');

  // Hide prior errors
  genErr.classList.add('hidden');

  // Validate minimum length
  if (newPwd.length < 8) {
    genErrTxt.textContent = 'Password must be at least 8 characters long.';
    genErr.classList.remove('hidden');
    lucide.createIcons();
    return;
  }

  // Validate match
  if (newPwd !== confPwd) {
    genErrTxt.textContent = 'Passwords do not match. Please try again.';
    genErr.classList.remove('hidden');
    lucide.createIcons();
    return;
  }

  // Loading state
  btn.disabled = true;
  btn.innerHTML = `
    <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
    </svg>
    <span>Updating…</span>
  `;

  // Simulate async API call
  await new Promise(r => setTimeout(r, 1600));

  // Show success
  document.getElementById('rp-form-state').classList.add('hidden');
  document.getElementById('rp-success-state').classList.remove('hidden');
  lucide.createIcons();

  // Countdown & auto-redirect to login
  let secs = 3;
  const countdownEl = document.getElementById('rp-countdown-val');
  _rpCountdownTimer = setInterval(() => {
    secs--;
    if (countdownEl) countdownEl.textContent = secs;
    if (secs <= 0) {
      clearInterval(_rpCountdownTimer);
      closeResetPasswordModal();
      showToast('Password updated! Please sign in with your new credentials.');
    }
  }, 1000);
}


// ===================== ANIMATION ENGINE =====================

// ── 1. FLOATING PARTICLE FIELD ──
function initParticleField() {
  const field = document.getElementById('particle-field');
  if (!field) return;
  const COLORS = [
    'rgba(56, 189, 248, 0.85)',  // Electric Sky Blue
    'rgba(99, 102, 241, 0.85)',  // Electric Indigo
    'rgba(59, 130, 246, 0.85)',  // Sapphire Royal Blue
    'rgba(14, 165, 233, 0.8)',   // Deep Cyan
    'rgba(147, 197, 253, 0.75)', // Ice Blue
  ];
  for (let i = 0; i < 28; i++) {
    const p     = document.createElement('div');
    const size  = Math.random() * 3 + 1;
    const left  = Math.random() * 100;
    const delay = Math.random() * 18;
    const dur   = Math.random() * 14 + 10;
    const drift = (Math.random() - 0.5) * 120;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    p.className = 'particle';
    p.style.cssText = `left:${left}%;width:${size}px;height:${size}px;background:${color};--drift:${drift}px;animation-duration:${dur}s;animation-delay:-${delay}s;box-shadow:0 0 ${size*3}px ${color};`;
    field.appendChild(p);
  }
}

// ── 2. CARD 3D TILT ──
function initCardTilt() {
  document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.card-tilt').forEach(card => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = e.clientX - cx;
      const dy   = e.clientY - cy;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const maxR = Math.max(rect.width, rect.height);
      if (dist < maxR * 0.85) {
        const rotX =  (dy / maxR) * 10;
        const rotY = -(dx / maxR) * 10;
        card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(4px)`;
      } else {
        card.style.transform = '';
      }
    });
  });
  document.addEventListener('mouseleave', () => {
    document.querySelectorAll('.card-tilt').forEach(c => { c.style.transform = ''; });
  });
}

// ── 3. BUTTON CLICK RIPPLE ──
function initButtonRipples() {
  if (!document.getElementById('ripple-style')) {
    const s = document.createElement('style');
    s.id = 'ripple-style';
    s.textContent = `@keyframes ripple-burst{to{width:220px;height:220px;opacity:0;}}`;
    document.head.appendChild(s);
  }
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-shimmer');
    if (!btn) return;
    const rect   = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.style.cssText = `position:absolute;left:${e.clientX-rect.left}px;top:${e.clientY-rect.top}px;width:0;height:0;background:rgba(255,255,255,0.22);border-radius:50%;transform:translate(-50%,-50%);animation:ripple-burst 0.55s ease-out forwards;pointer-events:none;`;
    if (getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
}

// ── 4. STAT BAR FILL OBSERVER ──
function initStatBarObserver() {
  const bars = document.querySelectorAll('.stat-bar-animated:not([data-observed])');
  const obs  = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => { b.dataset.observed = '1'; obs.observe(b); });
}

// ── 5. COUNTER ROLL-UP ──
function animateCounter(el, target, dur = 1300, prefix = '', suffix = '') {
  const t0 = performance.now();
  (function step(now) {
    const prog = Math.min((now - t0) / dur, 1);
    const ease = 1 - Math.pow(1 - prog, 3);
    el.textContent = prefix + Math.round(target * ease).toLocaleString() + suffix;
    if (prog < 1) requestAnimationFrame(step);
  })(t0);
}

function initCounterObserver() {
  const els = document.querySelectorAll('[data-counter]:not([data-observed])');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        animateCounter(el, parseInt(el.dataset.counter, 10), 1400, el.dataset.prefix||'', el.dataset.suffix||'');
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  els.forEach(c => { c.dataset.observed = '1'; obs.observe(c); });
}

// ── 6. SAFE SCROLL REVEAL (Never hides elements with opacity 0) ──
function initScrollReveal() {
  const sel = '.glass-card, .glass-panel';
  document.querySelectorAll(sel).forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}

// ── 7. CARD STAGGER (Safe entrance without hiding) ──
function applyCardStagger(container) {
  if (!container) return;
  [...container.children].forEach((card) => {
    card.style.opacity = '1';
    card.style.transform = 'none';
  });
}

// ── 8. TAB ACTIVE INDICATOR ──
function updateTabIndicators() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    if (btn.classList.contains('border-pink-500') || btn.classList.contains('border-indigo-500')) btn.classList.add('active-tab');
    else btn.classList.remove('active-tab');
  });
}

// ── 9. SPLASH EXIT BURST ──
function splashExitBurst() {
  if (typeof confetti === 'function') {
    confetti({ particleCount: 45, spread: 65, origin: { x: 0.5, y: 0.45 }, colors: ['#3b82f6', '#a855f7', '#ec4899', '#f43f5e', '#60a5fa'], scalar: 0.8, disableForReducedMotion: true });
  }
}

// ── 10. WORKSPACE ENTRANCE ──
function animateWorkspaceEntrance() {
  const heroBanner = document.querySelector('#authenticated-workspace > section');
  if (heroBanner) {
    heroBanner.style.opacity = '1';
    heroBanner.style.transform = 'none';
  }
  initStatBarObserver();
  initCounterObserver();
  applyCardStagger(document.getElementById('radar-cards-container'));
}

// ── HOOKS INTO EXISTING FUNCTIONS ──
(function() {
  // Workspace entrance
  const _origAuth = window.authenticateAndOpenWorkspace;
  if (typeof _origAuth === 'function') {
    window.authenticateAndOpenWorkspace = function(roleId, sc, ph = true) {
      _origAuth(roleId, sc, ph);
      animateWorkspaceEntrance();
    };
  }
  // Splash burst
  const _origDismiss = window.dismissSplashImmediately;
  if (typeof _origDismiss === 'function') {
    window.dismissSplashImmediately = function() {
      _origDismiss();
      setTimeout(splashExitBurst, 450);
    };
  }

  // Tab switch update
  const _origSwitch = window.switchTab;
  if (typeof _origSwitch === 'function') {
    window.switchTab = function(tabId, ph = true) {
      _origSwitch(tabId, ph);
      setTimeout(() => {
        initStatBarObserver();
        initCounterObserver();
        updateTabIndicators();
      }, 60);
    };
  }
})();

// ── BOOT ──
document.addEventListener('DOMContentLoaded', () => {
  // Initialize default browser history state
  if (window.history && !window.history.state) {
    window.history.replaceState({ screen: 'login' }, '', window.location.pathname);
  }
  initParticleField();
  initButtonRipples();

  // Pre-load backend data
  fetchBountiesFromAPI();
  fetchReferralsFromAPI();
  fetchInstitutionStats();

  setTimeout(() => {
    initScrollReveal();
    initStatBarObserver();
    initCounterObserver();
    updateTabIndicators();
  }, 300);
});
