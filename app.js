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
    defaultTab: 'faculty-dashboard',
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
    defaultTab: 'institution-overview',
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
let currentActiveTab = null;
let appNavHistory = [];
let bountiesState = [];
let referralsState = [];
let facultyStudentsState = [];
let institutionDepartmentsState = [];
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
    { id: 'career-missions', label: 'Career Mission & Rescue', icon: 'compass', badge: 'Active', badgeId: 'missions-badge' },
    { id: 'student-profile', label: 'Profile & Resume Score', icon: 'user-check', badge: '95/100', badgeId: 'profile-score-badge' },
    { id: 'proof-of-work', label: 'Get Referral', icon: 'send', badge: 'Verified' },
    { id: 'bridge-finder', label: 'Hidden Bridge Finder', icon: 'git-merge', badge: '3 Paths' },
    { id: 'career-shadow', label: 'Career Shadow AI', icon: 'cpu', badge: 'Simulations' },
    { id: 'mentorship', label: 'Alumni Impact Exchange', icon: 'calendar', badge: 'Mentoring' },
    { id: 'bounties', label: 'Paid Bounties & Gigs', icon: 'briefcase', badge: '4 Live', badgeId: 'bounties-count-badge' },
    { id: 'legacy-graph', label: 'Legacy Knowledge', icon: 'book-open' },
    { id: 'intent-radar', label: 'Matched Alumni', icon: 'users' },
    { id: 'network-graph', label: 'Campus Lineage', icon: 'share-2' }
  ],
  alumnus: [
    { id: 'alumnus-inbox', label: 'Referral Requests', icon: 'inbox', badge: '1 Pending', badgeId: 'referrals-count-badge' },
    { id: 'alumni-mentorship', label: 'Impact Exchange & Mentoring', icon: 'calendar', badge: 'Active' },
    { id: 'legacy-graph', label: 'Share Legacy Lessons', icon: 'book-open', badge: 'Repository' },
    { id: 'bounties', label: 'Post Bounties & Gigs', icon: 'briefcase', badge: '4 Live', badgeId: 'bounties-count-badge' },
    { id: 'intent-radar', label: 'Explore Students', icon: 'compass', badge: '14 Students' },
    { id: 'network-graph', label: 'Alumni Network', icon: 'share-2' }
  ],
  founder: [
    { id: 'hiring-copilot', label: 'LinkX Hiring Copilot', icon: 'sparkles', badge: 'AI Matcher' },
    { id: 'bounties', label: 'Startup Gigs & Bounties', icon: 'briefcase', badge: 'Escrow Gigs', badgeId: 'bounties-count-badge' },
    { id: 'intent-radar', label: 'Find Builders', icon: 'compass', badge: 'Top Builders' },
    { id: 'legacy-graph', label: 'Founder Lessons', icon: 'book-open' }
  ],
  faculty: [
    { id: 'faculty-dashboard', label: 'Faculty Dashboard', icon: 'layout-dashboard', badge: 'Active' },
    { id: 'faculty-challenges', label: 'Challenge Exchange', icon: 'award', badge: 'Capstones' },
    { id: 'faculty-students', label: 'Student Roster', icon: 'users', badge: 'Dossiers' },
    { id: 'faculty-supervision', label: 'Supervision & Reviews', icon: 'clipboard-check', badge: '3 Pending', badgeId: 'faculty-reviews-badge' },
    { id: 'faculty-collaborations', label: 'Alumni Co-Guides', icon: 'handshake', badge: '6 Active' },
    { id: 'faculty-profile', label: 'Faculty Profile', icon: 'user-check' }
  ],
  recruiter: [
    { id: 'hiring-copilot', label: 'LinkX Hiring Copilot', icon: 'sparkles', badge: 'NLP Copilot' },
    { id: 'alumnus-inbox', label: 'Endorsed Queue', icon: 'inbox', badge: 'Verified ATS' },
    { id: 'bounties', label: 'Job Requisitions', icon: 'briefcase' },
    { id: 'intent-radar', label: 'Top Candidates', icon: 'compass', badge: 'Top 5%' }
  ],
  institution: [
    { id: 'institution-overview', label: 'Executive Overview', icon: 'layout-dashboard', badge: 'Command' },
    { id: 'institution-intelligence', label: 'Placement Intelligence', icon: 'trending-up', badge: 'Trends' },
    { id: 'gap-radar', label: 'Opportunity Gap Radar', icon: 'radar', badge: 'Live Gaps' },
    { id: 'institution-departments', label: 'Department Quotas', icon: 'layers', badge: '5 Units' },
    { id: 'institution-outcomes', label: 'Accreditation & Outcomes', icon: 'landmark', badge: 'NAAC A++' },
    { id: 'institution-governance', label: 'Governance & Audits', icon: 'shield-check' }
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
  const views = [
    'student-profile', 'intent-radar', 'proof-of-work', 'bounties', 'alumnus-inbox',
    'network-graph', 'career-missions', 'career-shadow', 'bridge-finder',
    'mentorship', 'legacy-graph', 'faculty-challenges', 'hiring-copilot', 'gap-radar',
    'messages', 'notifications',
    // Dedicated Faculty Views
    'faculty-dashboard', 'faculty-students', 'faculty-supervision', 'faculty-collaborations', 'faculty-profile',
    // Dedicated Institution Views
    'institution-overview', 'institution-intelligence', 'institution-departments', 'institution-outcomes', 'institution-governance',
    // Dedicated Alumni Mentorship View
    'alumni-mentorship'
  ];
  
  // In-app navigation history tracking for Back button
  if (pushHistory && currentActiveTab && currentActiveTab !== tabId) {
    if (appNavHistory.length >= 25) appNavHistory.shift();
    appNavHistory.push(currentActiveTab);
  }
  currentActiveTab = tabId;

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
      tabBtn.classList.remove('border-sky-500', 'text-sky-400', 'border-purple-500', 'text-purple-400', 'border-rose-500', 'text-rose-400', 'border-pink-500', 'text-pink-400', 'border-indigo-500', 'text-indigo-400');
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

  // Update Dynamic Breadcrumbs in Workspace Header
  const crumbPortal = document.getElementById('crumb-portal');
  const crumbTab = document.getElementById('crumb-tab');
  const portalName = (ROLE_CONFIGS[activeSessionRoleId] || {}).roleLabel || 'Portal';
  const tabConfig = (ROLE_TABS[activeSessionRoleId] || []).find(t => t.id === tabId);
  const tabLabel = tabConfig ? tabConfig.label : tabId.replace(/-/g, ' ');
  if (crumbPortal) crumbPortal.textContent = portalName;
  if (crumbTab) crumbTab.textContent = tabLabel;

  // Update Header Back button tooltip
  const backTooltip = document.getElementById('header-back-tooltip');
  if (backTooltip) {
    if (appNavHistory.length > 0) {
      const prevTabId = appNavHistory[appNavHistory.length - 1];
      const prevConfig = (ROLE_TABS[activeSessionRoleId] || []).find(t => t.id === prevTabId);
      backTooltip.textContent = `Back to ${prevConfig ? prevConfig.label : 'Previous Screen'}`;
    } else {
      backTooltip.textContent = 'Dashboard Home';
    }
  }

  // Route to the appropriate view data fetchers
  if (tabId === 'network-graph') {
    // Founders no longer have Ecosystem Network — redirect gracefully
    if (activeSessionRoleId === 'founder') {
      showToast('Ecosystem Network has been removed. Redirecting to Hiring Copilot.', 'info');
      setTimeout(() => switchTab('hiring-copilot', false), 150);
      return;
    }
    setupLineageCanvas();
  } else if (tabId === 'alumnus-inbox') {
    fetchReferralsFromAPI();
  } else if (tabId === 'bounties') {
    fetchBountiesFromAPI();
  } else if (tabId === 'student-profile') {
    fetchStudentProfileFromAPI();
  } else if (tabId === 'career-missions') {
    fetchStudentMissions();
  } else if (tabId === 'career-shadow') {
    fetchShadowScenarios();
  } else if (tabId === 'bridge-finder') {
    fetchBridgePaths();
  } else if (tabId === 'mentorship') {
    fetchMentorshipHub();
  } else if (tabId === 'alumni-mentorship') {
    fetchAlumniMentorshipDashboard();
  } else if (tabId === 'legacy-graph') {
    fetchLegacyGraph();
  } else if (tabId === 'faculty-challenges') {
    fetchFacultyChallenges();
  } else if (tabId === 'faculty-dashboard') {
    fetchFacultyDashboard();
  } else if (tabId === 'faculty-students') {
    fetchFacultyStudents();
  } else if (tabId === 'faculty-supervision') {
    fetchFacultySupervisions();
  } else if (tabId === 'faculty-collaborations') {
    fetchFacultyCollaborations();
  } else if (tabId === 'faculty-profile') {
    fetchFacultyProfile();
  } else if (tabId === 'institution-overview') {
    fetchInstitutionOverview();
  } else if (tabId === 'institution-intelligence') {
    fetchInstitutionIntelligence();
  } else if (tabId === 'institution-departments') {
    fetchInstitutionDepartments();
  } else if (tabId === 'institution-outcomes') {
    fetchInstitutionOutcomes();
  } else if (tabId === 'institution-governance') {
    fetchInstitutionGovernance();
  } else if (tabId === 'hiring-copilot') {
    initHiringCopilot();
  } else if (tabId === 'gap-radar') {
    fetchOpportunityGapRadar();
  } else if (tabId === 'messages') {
    fetchMessages();
  } else if (tabId === 'notifications') {
    fetchNotificationsFeed();
  }
  lucide.createIcons();
}

// ================= GLOBAL SAFE BACK NAVIGATION =================
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

  // 1. Check if any open overlay modal needs to be closed first
  const openModals = [
    'intent-modal',
    'pow-detail-modal',
    'modal-post-bounty',
    'modal-apply-bounty',
    'candidate-modal',
    'modal-candidate-resume',
    'forgot-password-modal',
    'reset-password-modal',
    'modal-account-settings',
    'modal-auth-dialog',
    'modal-new-mission',
    'modal-opportunity-rescue',
    'modal-book-mentorship',
    'modal-new-legacy',
    'modal-post-challenge',
    'modal-apply-challenge',
    'modal-invite-interview',
    'modal-bridge-intro',
    'modal-faculty-review',
    'modal-faculty-invite-coguide',
    'modal-institution-add-dept'
  ];
  for (const mId of openModals) {
    const modalEl = document.getElementById(mId);
    if (modalEl && !modalEl.classList.contains('hidden')) {
      modalEl.classList.add('hidden');
      return;
    }
  }

  // 2. In-app navigation stack pop
  if (appNavHistory && appNavHistory.length > 0) {
    const previousTab = appNavHistory.pop();
    switchTab(previousTab, false);
    return;
  }

  // 3. If no in-app stack, return to role's default dashboard tab if currently elsewhere
  const defaultTab = ROLE_CONFIGS[activeSessionRoleId]?.defaultTab;
  if (defaultTab && currentActiveTab !== defaultTab) {
    switchTab(defaultTab, false);
    return;
  }

  // 4. Safe notification instead of accidental logout
  showToast("You are on your main role dashboard.", "info");
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
  fetchNotificationsFeed();
  setAppTheme(localStorage.getItem('linkx_theme') || 'dark', false);

  setTimeout(() => {
    initScrollReveal();
    initStatBarObserver();
    initCounterObserver();
    updateTabIndicators();
  }, 300);
});

// ================= THREE PERSISTENT THEMES (LIGHT, DARK, HYBRID) =================
let currentTheme = localStorage.getItem('linkx_theme') || 'dark';

function setAppTheme(theme, persistToServer = true) {
  if (!['light', 'dark', 'hybrid'].includes(theme)) theme = 'dark';
  currentTheme = theme;
  localStorage.setItem('linkx_theme', theme);

  document.documentElement.className = 'theme-' + theme + (theme === 'dark' ? ' dark' : '');

  const wsLabel = document.getElementById('ws-theme-label');
  if (wsLabel) wsLabel.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
  const landingLabel = document.getElementById('landing-theme-label');
  if (landingLabel) landingLabel.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);

  ['light', 'dark', 'hybrid'].forEach(t => {
    const btn = document.getElementById(`theme-btn-${t}`);
    if (btn) {
      if (t === theme) {
        btn.classList.add('border-2', 'border-sky-500');
        btn.classList.remove('border-slate-800');
      } else {
        btn.classList.remove('border-2', 'border-sky-500');
        btn.classList.add('border-slate-800');
      }
    }
  });

  const m1 = document.getElementById('ws-theme-menu');
  if (m1) m1.classList.add('hidden');
  const m2 = document.getElementById('landing-theme-menu');
  if (m2) m2.classList.add('hidden');

  if (persistToServer && activeSessionRoleId) {
    fetch(`${API_BASE}/auth/settings`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-linkx-persona-id': activeSessionRoleId },
      body: JSON.stringify({ themePreference: theme })
    }).catch(() => {});
  }
}

function toggleThemeDropdown(menuId) {
  const menu = document.getElementById(menuId);
  if (menu) menu.classList.toggle('hidden');
}

// ================= SETTINGS & AUTH =================
function openSettingsModal() {
  setAppTheme(currentTheme, false);
  openModal('modal-account-settings');
}

async function handleSaveUserSettings() {
  const consentIntro = document.getElementById('setting-consent-intro')?.checked ?? true;
  const publicProfile = document.getElementById('setting-public-profile')?.checked ?? true;
  const maskContact = document.getElementById('setting-contact-privacy')?.checked ?? false;

  try {
    const res = await fetch(`${API_BASE}/auth/settings`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-linkx-persona-id': activeSessionRoleId || 'student' },
      body: JSON.stringify({
        themePreference: currentTheme,
        privacy: {
          consentIntroductions: consentIntro,
          profileVisibility: publicProfile ? 'public' : 'private',
          showContactInfo: !maskContact
        }
      })
    });
    const data = await res.json();
    if (data.success) {
      showToast('Settings & Theme preferences saved successfully!');
      closeModal('modal-account-settings');
    }
  } catch (err) {
    showToast('Preferences updated locally!');
    closeModal('modal-account-settings');
  }
}

function switchAuthTab(mode) {
  const signinTab = document.getElementById('tab-auth-signin');
  const registerTab = document.getElementById('tab-auth-register');
  const signinForm = document.getElementById('form-auth-signin');
  const registerForm = document.getElementById('form-auth-register');

  if (mode === 'signin') {
    signinTab.classList.add('bg-blue-600', 'text-white', 'font-bold');
    signinTab.classList.remove('text-slate-400');
    registerTab.classList.remove('bg-blue-600', 'text-white', 'font-bold');
    registerTab.classList.add('text-slate-400');
    signinForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
  } else {
    registerTab.classList.add('bg-blue-600', 'text-white', 'font-bold');
    registerTab.classList.remove('text-slate-400');
    signinTab.classList.remove('bg-blue-600', 'text-white', 'font-bold');
    signinTab.classList.add('text-slate-400');
    registerForm.classList.remove('hidden');
    signinForm.classList.add('hidden');
  }
}

async function handleAuthSignInSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('auth-signin-email')?.value;
  const password = document.getElementById('auth-signin-password')?.value;

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
      closeModal('modal-auth-dialog');
      directAuthenticateAs(data.user?.role || 'student');
      showToast(`Welcome back, ${data.user?.name}!`);
    } else {
      showToast(data.error || 'Invalid credentials');
    }
  } catch (err) {
    showToast('Authentication error. Please try demo role selection.');
  }
}

async function handleAuthRegisterSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('auth-reg-name')?.value;
  const email = document.getElementById('auth-reg-email')?.value;
  const role = document.getElementById('auth-reg-role')?.value || 'student';
  const batch = document.getElementById('auth-reg-batch')?.value || '2026';
  const password = document.getElementById('auth-reg-password')?.value;

  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, role, branch: `Class of ${batch}`, password })
    });
    const data = await res.json();
    if (data.success) {
      closeModal('modal-auth-dialog');
      directAuthenticateAs(role);
      showToast(`Account created! Welcome to LinkX, ${name}!`);
      triggerConfetti();
    } else {
      showToast(data.error || 'Registration failed');
    }
  } catch (err) {
    showToast('Registration submitted.');
  }
}

// ================= CAREER MISSIONS & RESCUE =================
let currentMissions = [];

async function fetchStudentMissions() {
  try {
    const res = await fetch(`${API_BASE}/student/missions?studentId=${activeSessionRoleId || 'student'}`);
    const data = await res.json();
    if (data.success && data.missions && data.missions.length > 0) {
      currentMissions = data.missions;
      renderMissionRoadmap(data.missions[0]);
    }
  } catch (err) {
    console.warn('Failed to fetch missions:', err);
  }
}

function renderMissionRoadmap(mission) {
  const goalDisplay = document.getElementById('mission-goal-display');
  if (goalDisplay) goalDisplay.textContent = mission.goal;

  const progressNum = document.getElementById('mission-progress-number');
  if (progressNum) progressNum.textContent = `${mission.progressPercent}% Completed`;

  const progressBar = document.getElementById('mission-progress-bar');
  if (progressBar) progressBar.style.width = `${mission.progressPercent}%`;

  const phasesContainer = document.getElementById('mission-phases-container');
  if (!phasesContainer) return;

  phasesContainer.innerHTML = (mission.phases || []).map(phase => {
    const isCompleted = phase.status === 'completed';
    const statusBadge = isCompleted 
      ? '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">Completed</span>'
      : (phase.status === 'in-progress' 
        ? '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/25">In Progress</span>'
        : '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400">Pending</span>');

    return `
      <div class="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
        <div class="flex items-center justify-between">
          <h4 class="text-xs font-bold text-white">${phase.title}</h4>
          ${statusBadge}
        </div>
        <div class="w-full bg-[#030611] h-1.5 rounded-full overflow-hidden border border-slate-800">
          <div class="h-full bg-gradient-to-r from-blue-500 to-sky-400 rounded-full" style="width: ${phase.progress}%"></div>
        </div>
        <div class="space-y-2 pt-1 text-xs">
          ${(phase.tasks || []).map(task => `
            <label class="flex items-start space-x-2.5 cursor-pointer">
              <input type="checkbox" ${task.done ? 'checked' : ''} onchange="handleToggleMissionTask('${mission.id}', '${task.id}', this.checked)" class="mt-0.5 rounded border-slate-700 bg-slate-900 text-sky-500">
              <span class="${task.done ? 'line-through text-slate-500' : 'text-slate-200'}">${task.title}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
  lucide.createIcons();
}

async function handleToggleMissionTask(missionId, taskId, isDone) {
  try {
    const res = await fetch(`${API_BASE}/student/missions/${missionId}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: isDone })
    });
    const data = await res.json();
    if (data.success && data.mission) {
      renderMissionRoadmap(data.mission);
      showToast('Mission task updated!');
    }
  } catch (err) {
    showToast('Task updated locally.');
  }
}

async function handleGenerateMissionSubmit(event) {
  event.preventDefault();
  const goal = document.getElementById('mission-goal-input')?.value;
  const timeline = document.getElementById('mission-timeline-select')?.value;
  const stack = document.getElementById('mission-stack-input')?.value;

  try {
    const res = await fetch(`${API_BASE}/student/missions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: activeSessionRoleId || 'student',
        goal,
        targetTimeline: timeline,
        currentSkills: stack.split(',').map(s => s.trim())
      })
    });
    const data = await res.json();
    if (data.success && data.mission) {
      closeModal('modal-new-mission');
      renderMissionRoadmap(data.mission);
      showToast('Personalized AI Career Mission Roadmap generated!');
      triggerConfetti();
    }
  } catch (err) {
    showToast('Failed to generate mission.');
  }
}

async function triggerOpportunityRescue() {
  // Show modal immediately with loading state
  openModal('modal-opportunity-rescue');
  const loadingEl  = document.getElementById('rescue-loading-state');
  const errorEl    = document.getElementById('rescue-error-state');
  const contentEl  = document.getElementById('rescue-content-state');
  if (loadingEl)  { loadingEl.classList.remove('hidden'); }
  if (errorEl)    { errorEl.classList.add('hidden'); }
  if (contentEl)  { contentEl.classList.add('hidden'); }

  try {
    const res = await fetch(`${API_BASE}/student/opportunity-rescue`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId: activeSessionRoleId || 'student' })
    });
    const data = await res.json();

    if (!data.success) throw new Error(data.error || 'Failed to fetch rescue plan');

    // Hide loading, show content
    if (loadingEl) loadingEl.classList.add('hidden');
    if (contentEl) contentEl.classList.remove('hidden');

    // Diagnosed obstacle
    const obstacleEl = document.getElementById('rescue-obstacle-text');
    if (obstacleEl) obstacleEl.textContent = (data.rescuePlan && data.rescuePlan.diagnosedObstacle) ? data.rescuePlan.diagnosedObstacle : 'No active pipeline bottleneck detected.';
    const goalEl = document.getElementById('rescue-goal-text');
    if (goalEl) goalEl.textContent = (data.rescuePlan && data.rescuePlan.studentGoal) ? data.rescuePlan.studentGoal : (data.studentGoal || 'Career Goal not set.');

    // 3 Actionable pivots
    const pivotsContainer = document.getElementById('rescue-pivots-container');
    if (pivotsContainer) {
      const pivots = (data.rescuePlan && data.rescuePlan.pivotOptions) ? data.rescuePlan.pivotOptions : (data.pivots || []);
      if (pivots.length === 0) {
        pivotsContainer.innerHTML = `<p class="text-slate-400 italic text-xs">No pivot options available at this time.</p>`;
      } else {
        pivotsContainer.innerHTML = pivots.map(p => {
          const actionColors = {
            'book-mentor': 'border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/15',
            'claim-bounty': 'border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/15',
            'apply-capstone': 'border-sky-500/40 bg-sky-500/10 hover:bg-sky-500/15'
          };
          const actionIcons = {
            'book-mentor': 'users',
            'claim-bounty': 'briefcase',
            'apply-capstone': 'graduation-cap'
          };
          const colorClass = actionColors[p.actionType] || 'border-slate-700 bg-slate-800/50 hover:bg-slate-800';
          const iconName = actionIcons[p.actionType] || 'arrow-right';
          return `
            <div class="p-3.5 rounded-xl border ${colorClass} transition space-y-2">
              <div class="flex items-start justify-between gap-3">
                <div class="space-y-0.5 flex-1">
                  <div class="flex items-center space-x-2">
                    <i data-lucide="${iconName}" class="w-4 h-4 text-slate-300 shrink-0"></i>
                    <span class="font-bold text-white text-xs">${escapeHTML(p.title)}</span>
                  </div>
                  <p class="text-[11px] text-slate-300 leading-relaxed pl-6">${escapeHTML(p.rationale || p.description || '')}</p>
                  ${p.badge ? `<span class="ml-6 inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-sky-300 border border-sky-500/20">${escapeHTML(p.badge)}</span>` : ''}
                </div>
                <button onclick="handleRescuePivotAction('${p.actionType}', '${escapeHTML(p.refId || '')}')"
                  class="shrink-0 px-3 py-1.5 btn-gradient-primary rounded-xl text-xs font-bold text-white shadow-md whitespace-nowrap">
                  ${p.actionType === 'book-mentor' ? 'Book Session' : p.actionType === 'claim-bounty' ? 'Claim Bounty' : 'Apply Now'}
                </button>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // Rapid skill sprint
    const sprintBox = document.getElementById('rescue-sprint-container');
    const sprint = data.recommendedPracticeAction || data.skillSprint;
    if (sprintBox && sprint) {
      sprintBox.innerHTML = `
        <div class="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">Recommended Skill Sprint</div>
        <div class="font-bold text-amber-300 text-xs">${escapeHTML(sprint.title)}</div>
        <p class="text-[11px] text-slate-300">${escapeHTML(sprint.description)}</p>
        <div class="pt-1 text-[10px] font-mono text-amber-400">Target Deliverable: ${escapeHTML(sprint.targetBounty || sprint.targetDeliverable || '')}</div>
      `;
    }

    // Strategic insights
    const insightsList = document.getElementById('rescue-insights-list');
    if (insightsList && data.insights && data.insights.length) {
      insightsList.innerHTML = data.insights.map(i => `<li>${escapeHTML(i)}</li>`).join('');
    }

    lucide.createIcons();

  } catch (err) {
    if (loadingEl) loadingEl.classList.add('hidden');
    if (errorEl) {
      errorEl.classList.remove('hidden');
      const errMsg = document.getElementById('rescue-error-msg');
      if (errMsg) errMsg.textContent = err.message || 'Unable to load opportunity rescue plan.';
    }
  }
}

function handleRescuePivotAction(actionType, refId) {
  closeModal('modal-opportunity-rescue');
  if (actionType === 'book-mentor') {
    switchTab('mentorship', true);
    showToast('Navigated to Alumni Impact Exchange to book a mentorship session.');
  } else if (actionType === 'claim-bounty') {
    switchTab('bounties', true);
    showToast('Navigated to Bounties — find and claim a relevant paid gig.');
  } else if (actionType === 'apply-capstone') {
    switchTab('career-shadow', true);
    showToast('Navigated to Career Shadow — explore capstone and simulation paths.');
  }
}

// ================= UPDATE CAREER GOAL MODAL =================
function openUpdateCareerGoalModal() {
  // Pre-fill from current mission data if available
  const mission = currentMissions[0];
  if (mission) {
    const roleEl = document.getElementById('mission-target-role');
    if (roleEl) roleEl.value = mission.targetRole || '';

    const goalEl = document.getElementById('mission-goal-input');
    if (goalEl) goalEl.value = mission.goal || '';

    const interestsEl = document.getElementById('mission-interests-input');
    if (interestsEl) interestsEl.value = (mission.interests || []).join(', ');

    const skillsEl = document.getElementById('mission-skills-input');
    if (skillsEl) skillsEl.value = (mission.skillsToDevelop || []).join(', ');

    const timelineEl = document.getElementById('mission-timeline-select');
    if (timelineEl && mission.timeline) {
      for (const opt of timelineEl.options) {
        if (opt.value === mission.timeline) { opt.selected = true; break; }
      }
    }

    const priorityEl = document.getElementById('mission-priority-select');
    if (priorityEl && mission.priority) {
      for (const opt of priorityEl.options) {
        if (opt.value === mission.priority) { opt.selected = true; break; }
      }
    }
  }
  openModal('modal-new-mission');
}

async function handleUpdateCareerGoalSubmit(event) {
  event.preventDefault();
  const btn = document.getElementById('btn-save-career-goal');
  if (btn) { btn.disabled = true; btn.textContent = 'Saving…'; }

  const targetRole = document.getElementById('mission-target-role')?.value?.trim();
  const goal       = document.getElementById('mission-goal-input')?.value?.trim();
  const interests  = document.getElementById('mission-interests-input')?.value?.trim();
  const skills     = document.getElementById('mission-skills-input')?.value?.trim();
  const timeline   = document.getElementById('mission-timeline-select')?.value;
  const priority   = document.getElementById('mission-priority-select')?.value;

  try {
    const res = await fetch(`${API_BASE}/student/missions/goal`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: activeSessionRoleId || 'student',
        targetRole,
        goal,
        interests: interests ? interests.split(',').map(s => s.trim()).filter(Boolean) : [],
        skillsToDevelop: skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : [],
        timeline,
        priority
      })
    });
    const data = await res.json();
    if (data.success && data.mission) {
      closeModal('modal-new-mission');
      // Refresh current missions
      currentMissions = [data.mission, ...currentMissions.slice(1)];
      renderMissionRoadmap(data.mission);
      showToast('Career goal updated! Your roadmap progress has been preserved.');
    } else {
      showToast(data.error || 'Failed to update career goal.', 'error');
    }
  } catch (err) {
    showToast('Network error — please try again.', 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i><span>Save Career Goal</span>'; lucide.createIcons(); }
  }
}



// ================= CAREER SHADOW AI =================
let currentShadowScenarios = [];
let activeShadowScenario = null;
let currentShadowStage = 1;

async function fetchShadowScenarios() {
  try {
    const res = await fetch(`${API_BASE}/career-shadow/scenarios`);
    const data = await res.json();
    if (data.success && data.scenarios) {
      currentShadowScenarios = data.scenarios;
      renderShadowScenarios(data.scenarios);
      if (!activeShadowScenario && data.scenarios.length > 0) {
        selectShadowScenario(data.scenarios[0].id);
      }
    }
  } catch (err) {
    console.warn('Failed to load shadow scenarios:', err);
  }
}

function renderShadowScenarios(scenarios) {
  const container = document.getElementById('shadow-scenarios-list');
  if (!container) return;

  container.innerHTML = scenarios.map((s, idx) => `
    <div onclick="selectShadowScenario('${s.id}')" class="cursor-pointer glass-card rounded-2xl p-4 border border-slate-800 hover:border-purple-500/50 transition space-y-2">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-bold uppercase tracking-wider text-purple-400 font-mono">${s.difficulty}</span>
        <span class="text-[10px] text-slate-400">${s.company}</span>
      </div>
      <h4 class="text-xs font-bold text-white">${s.title}</h4>
      <p class="text-[11px] text-slate-400 line-clamp-2">${s.overview}</p>
    </div>
  `).join('');
  lucide.createIcons();
}

async function selectShadowScenario(scenarioId) {
  try {
    const res = await fetch(`${API_BASE}/career-shadow/scenarios/${scenarioId}`);
    const data = await res.json();
    if (data.success && data.scenario) {
      activeShadowScenario = data.scenario;
      currentShadowStage = 1;
      renderActiveShadowStage();
    }
  } catch (err) {
    console.warn('Failed to select scenario:', err);
  }
}

function renderActiveShadowStage() {
  if (!activeShadowScenario) return;
  const stage = (activeShadowScenario.stages || []).find(st => st.stageNumber === currentShadowStage) || activeShadowScenario.stages[0];

  document.getElementById('shadow-scenario-company').textContent = activeShadowScenario.company;
  document.getElementById('shadow-scenario-title').textContent = activeShadowScenario.title;
  document.getElementById('shadow-scenario-stage').textContent = `Stage ${currentShadowStage} of ${activeShadowScenario.stages.length}`;
  document.getElementById('shadow-scenario-overview').textContent = activeShadowScenario.overview;
  document.getElementById('shadow-prompt-text').textContent = stage.prompt;

  const feedbackBox = document.getElementById('shadow-feedback-box');
  if (feedbackBox) feedbackBox.classList.add('hidden');

  const optionsContainer = document.getElementById('shadow-options-container');
  if (optionsContainer) {
    optionsContainer.innerHTML = (stage.options || []).map(opt => `
      <div onclick="handleSelectShadowOption('${opt.id}', ${opt.scoreDelta}, '${opt.analysis.replace(/'/g, "\\'")}')" class="shadow-opt-card cursor-pointer p-3.5 rounded-xl bg-[#040711] border border-slate-800 hover:border-purple-500/50 hover:bg-slate-900/60 transition space-y-1">
        <div class="text-xs font-semibold text-white">${opt.label}</div>
      </div>
    `).join('');
  }
  lucide.createIcons();
}

async function handleSelectShadowOption(optId, scoreDelta, analysis) {
  try {
    const res = await fetch(`${API_BASE}/career-shadow/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenarioId: activeShadowScenario.id,
        stageNumber: currentShadowStage,
        selectedOptionId: optId,
        studentId: activeSessionRoleId || 'student'
      })
    });
    const data = await res.json();
    if (data.success && data.evaluation) {
      const feedbackBox = document.getElementById('shadow-feedback-box');
      if (feedbackBox) {
        feedbackBox.className = `p-4 rounded-xl border space-y-3 ${data.evaluation.scoreAwarded >= 35 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-amber-500/10 border-amber-500/30 text-amber-300'}`;
        feedbackBox.classList.remove('hidden');
        feedbackBox.innerHTML = `
          <div class="flex items-center justify-between">
            <span class="font-bold text-xs uppercase tracking-wider">Evaluation Verdict: ${data.evaluation.feedback.soundness}</span>
            <span class="font-mono font-bold text-xs">+${data.evaluation.scoreAwarded} Pts</span>
          </div>
          <p class="text-xs leading-relaxed text-slate-200">${data.evaluation.analysis}</p>
          <div class="pt-2 flex justify-end">
            ${data.evaluation.isFinalStage 
              ? `<button onclick="finishShadowSimulation()" class="px-4 py-1.5 btn-gradient-primary rounded-xl text-xs font-bold text-white shadow-md">Complete Simulation &amp; Record Score</button>`
              : `<button onclick="advanceShadowStage()" class="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold">Advance to Stage 2 &rarr;</button>`}
          </div>
        `;
      }
    }
  } catch (err) {
    showToast('Simulation evaluated.');
  }
}

function advanceShadowStage() {
  currentShadowStage++;
  renderActiveShadowStage();
}

function finishShadowSimulation() {
  showToast('Simulation recorded with high rubric score!');
  triggerConfetti();
  selectShadowScenario(activeShadowScenario.id);
}

// ================= HIDDEN BRIDGE FINDER =================
async function fetchBridgePaths() {
  const targetCompany = document.getElementById('bridge-target-select')?.value || 'Swiggy';
  try {
    const res = await fetch(`${API_BASE}/bridge/paths?targetCompany=${encodeURIComponent(targetCompany)}`);
    const data = await res.json();
    if (data.success && data.paths) {
      renderBridgePaths(data.paths);
    }
    fetchBridgeIntroductions();
  } catch (err) {
    console.warn('Failed to load bridge paths:', err);
  }
}

function renderBridgePaths(paths) {
  const container = document.getElementById('bridge-paths-container');
  if (!container) return;

  container.innerHTML = paths.map(p => {
    const hopsHtml = (p.connectionHops || []).map((h, i) => `
      <div class="flex items-center space-x-2 text-xs">
        <div class="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-bold flex items-center justify-center shrink-0">
          ${h.hopIndex}
        </div>
        <div>
          <div class="font-bold text-white">${h.name} <span class="text-[10px] text-slate-400">(${h.role})</span></div>
          <div class="text-[10px] text-slate-400">${h.evidence || h.relationship || ''}</div>
        </div>
      </div>
      ${i < p.connectionHops.length - 1 ? '<i data-lucide="arrow-right" class="w-4 h-4 text-slate-600 mx-2 shrink-0 hidden sm:block"></i>' : ''}
    `).join('');

    const targetAlum = p.connectionHops[p.connectionHops.length - 1]?.name || 'Alumnus';
    const intermediary = p.connectionHops[1]?.name || 'Dr. R.K. Verma';

    return `
      <div class="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-sky-400 font-mono">${p.bridgeType}</span>
            <h3 class="text-base font-bold text-white">${p.targetEntity}</h3>
          </div>
          <div class="flex items-center space-x-2">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">${p.confidenceScore}% Confidence</span>
            <button onclick="openBridgeIntroModal('${p.id}', '${intermediary}', '${targetAlum}', '${p.targetEntity}')" class="px-3 py-1.5 btn-gradient-primary rounded-xl text-xs font-bold text-white shadow-md">
              Request Warm Intro
            </button>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center gap-2 py-1">
          ${hopsHtml}
        </div>

        <div class="p-3 rounded-xl bg-[#080e1c] border border-slate-800 text-xs text-slate-300">
          <span class="text-sky-400 font-semibold">Why this works:</span> ${p.explanation}
        </div>
      </div>
    `;
  }).join('');
  lucide.createIcons();
}

function openBridgeIntroModal(pathId, intermediary, targetAlumnus, targetCompany) {
  document.getElementById('bridge-path-id').value = pathId;
  document.getElementById('bridge-intermediary').value = intermediary;
  document.getElementById('bridge-target-alumnus').value = targetAlumnus;
  document.getElementById('bridge-target-company').value = targetCompany;
  document.getElementById('bridge-intro-note').value = `Requesting an introduction to ${targetAlumnus} based on verified distributed systems proof-of-work in Go.`;
  openModal('modal-bridge-intro');
}

async function handleBridgeIntroSubmit(event) {
  event.preventDefault();
  const pathId = document.getElementById('bridge-path-id')?.value;
  const intermediary = document.getElementById('bridge-intermediary')?.value;
  const targetAlumnus = document.getElementById('bridge-target-alumnus')?.value;
  const targetCompany = document.getElementById('bridge-target-company')?.value;
  const note = document.getElementById('bridge-intro-note')?.value;

  try {
    const res = await fetch(`${API_BASE}/bridge/intro-request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pathId, intermediary, targetAlumnus, targetCompany, note })
    });
    const data = await res.json();
    if (data.success) {
      closeModal('modal-bridge-intro');
      showToast('Consent-based introduction request dispatched!');
      fetchBridgeIntroductions();
    }
  } catch (err) {
    showToast('Introduction request dispatched.');
  }
}

async function fetchBridgeIntroductions() {
  try {
    const res = await fetch(`${API_BASE}/bridge/introductions?role=${activeSessionRoleId || 'student'}`);
    const data = await res.json();
    const list = document.getElementById('bridge-intros-list');
    if (!list) return;

    if (data.success && data.introductions && data.introductions.length > 0) {
      list.innerHTML = data.introductions.map(i => {
        const statusColors = {
          'Pending':   'bg-amber-500/10 text-amber-400 border-amber-500/20',
          'Accepted':  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          'Declined':  'bg-rose-500/10 text-rose-400 border-rose-500/20',
          'Cancelled': 'bg-slate-800 text-slate-500 border-slate-700',
        };
        const statusClass = statusColors[i.status] || 'bg-slate-800 text-slate-400 border-slate-700';
        const canCancel = activeSessionRoleId === 'student' && i.status === 'Pending';
        return `
          <div class="p-3 rounded-xl bg-[#040711] border border-slate-800 flex items-start justify-between gap-3">
            <div class="space-y-0.5 flex-1 min-w-0">
              <div class="font-bold text-white text-xs truncate">Intro to ${escapeHTML(i.targetAlumnus || '')} (${escapeHTML(i.targetCompany || '')})</div>
              <div class="text-[10px] text-slate-400 truncate">Via: ${escapeHTML(i.intermediary || '')} • ${escapeHTML(i.note || '')}</div>
              ${i.reason ? `<div class="text-[10px] text-slate-500 italic">${escapeHTML(i.reason)}</div>` : ''}
            </div>
            <div class="flex items-center space-x-2 shrink-0">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusClass}">${i.status}</span>
              ${canCancel ? `<button onclick="cancelBridgeIntroduction('${i.id}')" class="px-2.5 py-1 bg-slate-900 border border-rose-500/30 text-rose-400 text-[10px] font-bold rounded-lg hover:bg-rose-500/10 transition">Cancel</button>` : ''}
            </div>
          </div>
        `;
      }).join('');
    } else {
      list.innerHTML = `<div class="text-slate-500 italic text-xs">No introduction requests in progress.</div>`;
    }
  } catch (err) {}
}

async function cancelBridgeIntroduction(introId) {
  try {
    const res = await fetch(`${API_BASE}/bridge/introductions/${introId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Cancelled', reason: 'Cancelled by student' })
    });
    const data = await res.json();
    if (data.success) {
      showToast('Introduction request cancelled.');
      fetchBridgeIntroductions();
    } else {
      showToast(data.error || 'Failed to cancel request.', 'error');
    }
  } catch (err) {
    showToast('Network error cancelling request.', 'error');
  }
}



// ================= ALUMNI IMPACT EXCHANGE & MENTORSHIP =================
async function fetchMentorshipHub() {
  try {
    const [mentorsRes, bookingsRes] = await Promise.all([
      fetch(`${API_BASE}/mentors`),
      fetch(`${API_BASE}/mentorship/bookings`, {
        headers: { 'x-linkx-persona-id': activeSessionRoleId || 'student' }
      })
    ]);
    const mentorsData = await mentorsRes.json();
    const bookingsData = await bookingsRes.json();

    if (mentorsData.success && mentorsData.mentors) {
      renderMentorsGrid(mentorsData.mentors);
    }
    if (bookingsData.success && bookingsData.bookings) {
      renderBookingsList(bookingsData.bookings);
    }
  } catch (err) {
    console.warn('Mentorship fetch error:', err);
  }
}

function renderMentorsGrid(mentors) {
  const container = document.getElementById('mentorship-mentors-grid');
  if (!container) return;

  container.innerHTML = mentors.map(m => `
    <div class="glass-card rounded-2xl p-5 border border-slate-800 space-y-3 flex flex-col justify-between">
      <div class="space-y-2.5">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-bold flex items-center justify-center text-sm shrink-0">
            ${m.avatar}
          </div>
          <div>
            <h4 class="text-sm font-bold text-white">${m.name}</h4>
            <p class="text-[11px] text-slate-400">${m.title} @ ${m.company}</p>
          </div>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">${m.bio}</p>
        <div class="flex flex-wrap gap-1.5 pt-1">
          ${(m.skills || []).map(s => `<span class="px-2 py-0.5 rounded-md text-[10px] bg-slate-900 border border-slate-800 text-slate-300">${s}</span>`).join('')}
        </div>
      </div>
      <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
        <span class="text-[11px] text-emerald-400 font-mono font-medium">${(m.availability || []).length} Slots Available</span>
        <button onclick="openBookMentorshipModal('${m.id}', '${m.name}')" class="px-3 py-1.5 btn-gradient-primary rounded-xl text-xs font-bold text-white shadow-md">
          Book Session
        </button>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

function renderBookingsList(bookings) {
  const list = document.getElementById('mentorship-bookings-list');
  if (!list) return;

  if (bookings.length === 0) {
    list.innerHTML = `<div class="text-slate-500 italic p-3">No mentorship bookings scheduled yet.</div>`;
    return;
  }

  list.innerHTML = bookings.map(b => {
    const isMentor = activeSessionRoleId === 'alumnus' || activeSessionRoleId === b.mentorId;
    return `
      <div class="p-3.5 rounded-xl bg-[#040711] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div class="space-y-0.5">
          <div class="font-bold text-white">${b.topic} with ${b.mentorName}</div>
          <div class="text-[11px] text-slate-400">${b.date} at ${b.time} • Student: ${b.studentName}</div>
          <div class="text-[11px] text-slate-300 italic">"${b.message}"</div>
        </div>
        <div class="flex items-center space-x-2 shrink-0">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${b.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' : (b.status === 'declined' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400 border border-amber-500/25')}">
            ${b.status}
          </span>
          ${isMentor && b.status === 'pending' ? `
            <button onclick="handleBookingStatusUpdate('${b.id}', 'confirmed')" class="px-2.5 py-1 text-[11px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg">Accept</button>
            <button onclick="handleBookingStatusUpdate('${b.id}', 'declined')" class="px-2.5 py-1 text-[11px] font-bold bg-rose-950 text-rose-400 rounded-lg">Decline</button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
  lucide.createIcons();
}

function openBookMentorshipModal(mentorId, mentorName) {
  document.getElementById('book-mentor-id').value = mentorId;
  document.getElementById('book-mentor-name').value = mentorName;
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  document.getElementById('book-mentor-date').value = tomorrow;
  document.getElementById('book-mentor-date').min = tomorrow;
  openModal('modal-book-mentorship');
}

async function handleBookMentorshipSubmit(event) {
  event.preventDefault();
  const mentorId = document.getElementById('book-mentor-id')?.value;
  const date = document.getElementById('book-mentor-date')?.value;
  const time = document.getElementById('book-mentor-time')?.value;
  const topic = document.getElementById('book-mentor-topic')?.value;
  const message = document.getElementById('book-mentor-message')?.value;

  try {
    const res = await fetch(`${API_BASE}/mentorship/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-linkx-persona-id': activeSessionRoleId || 'student'
      },
      body: JSON.stringify({ mentorId, date, time, topic, message })
    });
    const data = await res.json();
    if (data.success) {
      closeModal('modal-book-mentorship');
      showToast('Mentorship request booked successfully!');
      fetchMentorshipHub();
      triggerConfetti();
    } else {
      showToast(data.error || 'Booking failed');
    }
  } catch (err) {
    showToast('Session request queued.');
  }
}

async function handleBookingStatusUpdate(bookingId, status) {
  try {
    const res = await fetch(`${API_BASE}/mentorship/bookings/${bookingId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-linkx-persona-id': activeSessionRoleId || 'alumnus'
      },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (data.success) {
      showToast(`Booking marked as ${status}!`);
      fetchMentorshipHub();
    } else {
      showToast(data.error || 'Failed to update');
    }
  } catch (err) {
    showToast('Updated status.');
  }
}

// ================= ALUMNI LEGACY GRAPH =================
let currentLegacyTag = '';

async function fetchLegacyGraph(tag = '', search = '') {
  try {
    let url = `${API_BASE}/legacy-graph`;
    const params = [];
    if (tag) params.push(`tag=${encodeURIComponent(tag)}`);
    if (search) params.push(`search=${encodeURIComponent(search)}`);
    if (params.length) url += '?' + params.join('&');

    const res = await fetch(url);
    const data = await res.json();
    if (data.success && data.posts) {
      renderLegacyPosts(data.posts);
    }
  } catch (err) {
    console.warn('Legacy graph fetch error:', err);
  }
}

function renderLegacyPosts(posts) {
  const container = document.getElementById('legacy-posts-container');
  if (!container) return;

  container.innerHTML = posts.map(p => `
    <div class="glass-card rounded-2xl p-5 border border-slate-800 space-y-3 flex flex-col justify-between">
      <div class="space-y-2">
        <div class="flex items-center justify-between text-xs">
          <span class="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">${p.category}</span>
          <span class="text-[10px] text-slate-400">${p.readTime}</span>
        </div>
        <h3 class="text-sm font-bold text-white">${p.title}</h3>
        <p class="text-xs text-slate-300 leading-relaxed">${p.summary}</p>
        <div class="flex flex-wrap gap-1.5 pt-1">
          ${(p.tags || []).map(t => `<span class="px-2 py-0.5 rounded-md text-[10px] bg-slate-900 border border-slate-800 text-slate-300">#${t}</span>`).join('')}
        </div>
      </div>
      <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
        <div>
          <span class="font-bold text-white">${p.author}</span>
          <span class="text-[10px] text-slate-400 block">${p.authorRole}</span>
        </div>
        <button onclick="handleUpvoteLegacy('${p.id}')" class="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-slate-200 hover:text-amber-300 transition flex items-center space-x-1.5">
          <i data-lucide="thumbs-up" class="w-3.5 h-3.5"></i>
          <span class="font-bold font-mono">${p.upvotes || 0}</span>
        </button>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

function filterLegacyTag(tag) {
  currentLegacyTag = tag;
  fetchLegacyGraph(tag);
}

function handleLegacySearch() {
  const q = document.getElementById('legacy-search-input')?.value || '';
  fetchLegacyGraph(currentLegacyTag, q);
}

async function handleUpvoteLegacy(postId) {
  try {
    const res = await fetch(`${API_BASE}/legacy-graph/${postId}/upvote`, { method: 'POST' });
    const data = await res.json();
    if (data.success) {
      fetchLegacyGraph(currentLegacyTag);
    }
  } catch (err) {}
}

async function handleNewLegacySubmit(event) {
  event.preventDefault();
  const title = document.getElementById('legacy-new-title')?.value;
  const category = document.getElementById('legacy-new-category')?.value;
  const tags = document.getElementById('legacy-new-tags')?.value;
  const content = document.getElementById('legacy-new-content')?.value;

  try {
    const res = await fetch(`${API_BASE}/legacy-graph`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        category,
        tags: tags.split(',').map(s => s.trim()),
        content,
        author: activeSessionRoleId === 'alumnus' ? 'Rohan Mehta' : 'Alumni Contributor',
        authorRole: activeSessionRoleId === 'alumnus' ? 'SDE-2 @ Swiggy' : 'Alumnus'
      })
    });
    const data = await res.json();
    if (data.success) {
      closeModal('modal-new-legacy');
      showToast('Knowledge lesson published to Legacy Graph!');
      fetchLegacyGraph();
    }
  } catch (err) {
    showToast('Lesson published.');
  }
}

// ================= FACULTY CHALLENGE EXCHANGE =================
async function fetchFacultyChallenges() {
  try {
    const res = await fetch(`${API_BASE}/faculty/challenges`);
    const data = await res.json();
    if (data.success && data.challenges) {
      renderFacultyChallenges(data.challenges);
    }
  } catch (err) {}
}

function renderFacultyChallenges(challenges) {
  const container = document.getElementById('faculty-challenges-list');
  if (!container) return;

  container.innerHTML = challenges.map(c => `
    <div class="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-purple-400 font-mono">${c.status}</span>
          <h3 class="text-base font-bold text-white">${c.title}</h3>
          <p class="text-xs text-slate-400">${c.facultyName} (${c.facultyDept}) • Industry Co-Guide: ${c.industryPartner}</p>
        </div>
        <div class="flex items-center space-x-2">
          <span class="px-2.5 py-1 rounded-full text-xs bg-slate-900 border border-slate-800 text-slate-300 font-mono">${c.teamSize}</span>
          <button onclick="openApplyChallengeModal('${c.id}', '${c.title.replace(/'/g, "\\'")}')" class="px-3.5 py-1.5 btn-gradient-primary rounded-xl text-xs font-bold text-white shadow-md">
            Apply as Squad
          </button>
        </div>
      </div>

      <p class="text-xs text-slate-300 leading-relaxed">${c.description}</p>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#080e1c] p-3 rounded-xl border border-slate-800">
        <div><span class="text-slate-400">Deliverables:</span> <span class="text-white">${c.deliverables}</span></div>
        <div><span class="text-slate-400">Required Skills:</span> <span class="text-sky-400">${(c.requiredSkills || []).join(', ')}</span></div>
      </div>

      <!-- Teams Applied -->
      <div class="space-y-2 pt-1">
        <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Applicant Teams &amp; Squads (${(c.teamsApplied || []).length})</div>
        ${(c.teamsApplied || []).map(team => `
          <div class="p-3 rounded-xl bg-[#040711] border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span class="font-bold text-white">${team.teamName}</span>
              <span class="text-[10px] text-slate-400"> • Lead: ${team.leadStudent} (${team.leadBranch})</span>
              <p class="text-[10px] text-sky-400">${team.members.join(' • ')}</p>
            </div>
            <div class="flex items-center space-x-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold ${team.status === 'selected' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' : 'bg-slate-800 text-slate-400'}">
                ${team.status}
              </span>
              ${activeSessionRoleId === 'faculty' && team.status === 'pending' ? `
                <button onclick="handleChallengeTeamStatus('${c.id}', '${team.teamId}', 'selected')" class="px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold">Select Team</button>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

function openApplyChallengeModal(challengeId, title) {
  document.getElementById('apply-chal-id').value = challengeId;
  document.getElementById('modal-apply-chal-title').textContent = `Apply to: ${title}`;
  openModal('modal-apply-challenge');
}

async function handleApplyChallengeSubmit(event) {
  event.preventDefault();
  const challengeId = document.getElementById('apply-chal-id')?.value;
  const teamName = document.getElementById('apply-chal-teamname')?.value;
  const members = document.getElementById('apply-chal-members')?.value;
  const repoUrl = document.getElementById('apply-chal-repo')?.value;
  const pitch = document.getElementById('apply-chal-pitch')?.value;

  try {
    const res = await fetch(`${API_BASE}/faculty/challenges/${challengeId}/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teamName, members: members.split(',').map(s => s.trim()), repoUrl, pitch, leadStudent: 'Aman Sharma' })
    });
    const data = await res.json();
    if (data.success) {
      closeModal('modal-apply-challenge');
      showToast('Squad application submitted for faculty capstone review!');
      fetchFacultyChallenges();
      triggerConfetti();
    }
  } catch (err) {}
}

async function handleChallengeTeamStatus(challengeId, teamId, status) {
  try {
    const res = await fetch(`${API_BASE}/faculty/challenges/${challengeId}/teams/${teamId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (data.success) {
      showToast(`Team ${status}!`);
      fetchFacultyChallenges();
    }
  } catch (err) {}
}

async function handlePostChallengeSubmit(event) {
  event.preventDefault();
  const title = document.getElementById('chal-new-title')?.value;
  const partner = document.getElementById('chal-new-partner')?.value;
  const teamSize = document.getElementById('chal-new-teamsize')?.value;
  const skills = document.getElementById('chal-new-skills')?.value;
  const desc = document.getElementById('chal-new-desc')?.value;

  try {
    const res = await fetch(`${API_BASE}/faculty/challenges`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        industryPartner: partner,
        teamSize,
        requiredSkills: skills.split(',').map(s => s.trim()),
        description: desc,
        facultyName: 'Dr. R.K. Verma',
        facultyDept: 'Dean R&D'
      })
    });
    const data = await res.json();
    if (data.success) {
      closeModal('modal-post-challenge');
      showToast('New faculty challenge posted!');
      fetchFacultyChallenges();
    }
  } catch (err) {}
}

// ================= RECRUITER & FOUNDER HIRING COPILOT =================
let currentShortlistCandidates = [];

function initHiringCopilot() {
  handleCopilotExtractSubmit();
}

function fillCopilotPreset(key) {
  const input = document.getElementById('copilot-input-text');
  if (!input) return;
  if (key === 'go') {
    input.value = 'We need a final-year SDE intern who has built distributed cache or high throughput Kafka pipelines in Go, available for immediate 6-month internship in Bengaluru or remote.';
  } else if (key === 'ai') {
    input.value = 'Looking for fullstack AI Agent builder who knows Next.js, Python, RAG pipelines with vector databases, and has high test coverage on GitHub.';
  }
}

async function handleCopilotExtractSubmit() {
  const promptText = document.getElementById('copilot-input-text')?.value || 'We need a backend engineer proficient in Go and distributed systems.';
  try {
    const res = await fetch(`${API_BASE}/recruiter/copilot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ promptText })
    });
    const data = await res.json();
    if (data.success && data.extractedCriteria) {
      const criteriaBox = document.getElementById('copilot-criteria-box');
      const tagsBox = document.getElementById('copilot-criteria-tags');
      if (criteriaBox && tagsBox) {
        criteriaBox.classList.remove('hidden');
        tagsBox.innerHTML = `
          <span class="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">Role: ${data.extractedCriteria.targetRole}</span>
          <span class="px-2.5 py-1 rounded-md bg-blue-500/10 text-sky-300 border border-blue-500/25">Skills: ${data.extractedCriteria.skills.join(', ')}</span>
          <span class="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">Min Score: ${data.extractedCriteria.minScore}%</span>
          <span class="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/25">${data.extractedCriteria.workArrangement}</span>
        `;
      }
      const shortlistRes = await fetch(`${API_BASE}/recruiter/shortlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.extractedCriteria)
      });
      const shortlistData = await shortlistRes.json();
      if (shortlistData.success && shortlistData.shortlist) {
        currentShortlistCandidates = shortlistData.shortlist;
        renderShortlistCards(shortlistData.shortlist);
      }
    }
  } catch (err) {
    console.warn('Copilot error:', err);
  }
}

function renderShortlistCards(candidates) {
  const container = document.getElementById('copilot-shortlist-container');
  if (!container) return;

  container.innerHTML = candidates.map(c => `
    <div class="glass-card rounded-2xl p-5 border border-slate-800 space-y-3 flex flex-col justify-between">
      <div class="space-y-2.5">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2.5">
            <div class="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-bold flex items-center justify-center text-xs">
              ${c.avatar}
            </div>
            <div>
              <h4 class="text-xs font-bold text-white">${c.name}</h4>
              <p class="text-[10px] text-slate-400">${c.branch} • ${c.cgpa} CGPA</p>
            </div>
          </div>
          <span class="px-2 py-0.5 rounded-full text-xs font-bold font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">${c.matchPercentage}% Match</span>
        </div>

        <div class="p-2.5 rounded-xl bg-[#040711] border border-slate-800 space-y-1 text-xs">
          <div class="flex justify-between text-[11px]">
            <span class="text-slate-400">Proof Repo:</span>
            <a href="${c.githubUrl}" target="_blank" class="text-sky-400 hover:underline font-mono">${c.repoName}</a>
          </div>
          <div class="flex justify-between text-[11px]">
            <span class="text-slate-400">Test Rigor:</span>
            <span class="text-emerald-400 font-mono font-medium">${c.testCoverage}</span>
          </div>
          <div class="flex justify-between text-[11px]">
            <span class="text-slate-400">Latency:</span>
            <span class="text-amber-400 font-mono font-medium">${c.latencyMetric}</span>
          </div>
        </div>

        <p class="text-[11px] text-slate-300 italic border-l-2 border-emerald-500/60 pl-2">${c.endorsement}</p>
      </div>

      <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
        <span class="text-[10px] text-emerald-400 font-medium">${c.alumnusEndorsed ? 'Verified Endorsed' : 'Active Candidate'}</span>
        <button onclick="openInterviewModal('${c.id}', '${c.name.replace(/'/g, "\\'")}')" class="px-3 py-1.5 btn-gradient-primary rounded-xl text-xs font-bold text-white shadow-md">
          Invite to Screen
        </button>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

function openInterviewModal(candId, candName) {
  document.getElementById('invite-cand-id').value = candId;
  document.getElementById('invite-cand-name').value = candName;
  openModal('modal-invite-interview');
}

async function handleSendInterviewSubmit(event) {
  event.preventDefault();
  const candidateId = document.getElementById('invite-cand-id')?.value;
  const candidateName = document.getElementById('invite-cand-name')?.value;
  const company = document.getElementById('invite-company')?.value;
  const roleTitle = document.getElementById('invite-role')?.value;
  const note = document.getElementById('invite-note')?.value;

  try {
    const res = await fetch(`${API_BASE}/recruiter/invite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ candidateId, candidateName, company, roleTitle, note })
    });
    const data = await res.json();
    if (data.success) {
      closeModal('modal-invite-interview');
      showToast(`Interview invitation dispatched to ${candidateName}!`);
      triggerConfetti();
    }
  } catch (err) {}
}

async function handleExportCSV() {
  try {
    const res = await fetch(`${API_BASE}/recruiter/export-csv`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ candidates: currentShortlistCandidates })
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'linkx_proof_of_work_shortlist.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast('Candidate shortlist exported to CSV!');
  } catch (err) {
    showToast('CSV export downloaded.');
  }
}

// ================= OPPORTUNITY GAP RADAR =================
async function fetchOpportunityGapRadar() {
  try {
    const res = await fetch(`${API_BASE}/institution/gap-radar`);
    const data = await res.json();
    if (data.success && data.radarMetrics) {
      renderGapRadar(data);
    }
  } catch (err) {}
}

function renderGapRadar(data) {
  const container = document.getElementById('gap-radar-cards-container');
  if (!container) return;

  container.innerHTML = data.radarMetrics.map(r => `
    <div class="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
      <div class="flex items-center justify-between">
        <h4 class="text-sm font-bold text-white">${r.domain}</h4>
        <span class="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${r.gapColor} bg-slate-900 border border-slate-800">${r.gapSeverity}</span>
      </div>
      
      <div class="space-y-1.5 text-xs">
        <div class="flex justify-between text-slate-400">
          <span>Student Demand: ${r.studentDemandScore}%</span>
          <span>Alumni Capacity: ${r.alumniMentorshipCapacity}%</span>
        </div>
        <div class="w-full bg-[#030611] h-2 rounded-full overflow-hidden border border-slate-800 flex">
          <div class="bg-blue-500 h-full" style="width: ${r.studentDemandScore * 0.5}%"></div>
          <div class="bg-emerald-500 h-full" style="width: ${r.alumniMentorshipCapacity * 0.5}%"></div>
        </div>
      </div>

      <p class="text-xs text-slate-300 leading-relaxed">${r.insight}</p>

      <div class="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
        <span class="text-[11px] text-slate-400 font-semibold">Recommended Intervention:</span>
        <button onclick="showToast('Intervention dispatched: ' + '${r.recommendedAction.replace(/'/g, "\\'")}')" class="px-2.5 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/25 rounded-lg hover:bg-sky-500/20 font-bold">
          Execute Action
        </button>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

// ================= NOTIFICATIONS & STRUCTURED MESSAGES =================
let currentConversations = [];
let activeConversationId = null;

async function fetchNotificationsFeed() {
  try {
    const res = await fetch(`${API_BASE}/notifications?role=${activeSessionRoleId || 'student'}`);
    const data = await res.json();
    if (data.success && data.notifications) {
      const unreadCount = data.notifications.filter(n => !n.read).length;
      const badge = document.getElementById('notif-badge-count');
      if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
      }

      const popoverList = document.getElementById('notif-dropdown-items');
      if (popoverList) {
        popoverList.innerHTML = data.notifications.slice(0, 5).map(n => `
          <div onclick="handleMarkNotifRead('${n.id}')" class="p-2 rounded-xl ${n.read ? 'bg-[#040711] text-slate-400' : 'bg-[#0c142c] text-white border border-sky-500/20'} cursor-pointer space-y-0.5">
            <div class="font-bold text-xs">${n.title}</div>
            <div class="text-[10px] text-slate-400">${n.message}</div>
          </div>
        `).join('');
      }

      const fullList = document.getElementById('notifications-full-list');
      if (fullList) {
        fullList.innerHTML = data.notifications.map(n => `
          <div class="glass-card rounded-2xl p-4 border border-slate-800 flex items-center justify-between">
            <div class="space-y-0.5">
              <div class="text-xs font-bold text-white">${n.title}</div>
              <div class="text-[11px] text-slate-300">${n.message}</div>
              <div class="text-[10px] text-slate-500">${new Date(n.createdAt).toLocaleTimeString()}</div>
            </div>
            ${!n.read ? `<button onclick="handleMarkNotifRead('${n.id}')" class="px-2.5 py-1 text-[11px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/25 rounded-lg">Mark Read</button>` : ''}
          </div>
        `).join('');
      }
    }
  } catch (err) {}
}

function toggleNotificationsDropdown() {
  const popover = document.getElementById('notif-dropdown-popover');
  if (popover) popover.classList.toggle('hidden');
}

async function handleMarkNotifRead(id) {
  try {
    await fetch(`${API_BASE}/notifications/${id}/read`, { method: 'PATCH' });
    fetchNotificationsFeed();
  } catch (err) {}
}

async function handleMarkAllNotifsRead() {
  try {
    await fetch(`${API_BASE}/notifications/read-all`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: activeSessionRoleId || 'student' })
    });
    fetchNotificationsFeed();
    showToast('All notifications marked as read.');
  } catch (err) {}
}

async function fetchMessages() {
  try {
    const res = await fetch(`${API_BASE}/messages?role=${activeSessionRoleId || 'student'}`);
    const data = await res.json();
    if (data.success && data.conversations) {
      currentConversations = data.conversations;
      renderConversationsList(data.conversations);
      if (!activeConversationId && data.conversations.length > 0) {
        selectConversation(data.conversations[0].id);
      }
    }
  } catch (err) {}
}

function renderConversationsList(conversations) {
  const container = document.getElementById('conversations-list');
  if (!container) return;

  container.innerHTML = conversations.map(c => `
    <div onclick="selectConversation('${c.id}')" class="cursor-pointer p-2.5 rounded-xl ${c.id === activeConversationId ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-[#060a14] border border-slate-800 hover:border-slate-700'} transition space-y-0.5">
      <div class="font-bold text-white text-xs truncate">${c.title}</div>
      <div class="text-[10px] text-slate-400 truncate">${(c.messages || []).slice(-1)[0]?.text || 'No messages yet'}</div>
    </div>
  `).join('');
  lucide.createIcons();
}

function selectConversation(convId) {
  activeConversationId = convId;
  const conv = currentConversations.find(c => c.id === convId);
  if (!conv) return;

  document.getElementById('active-chat-title').textContent = conv.title;
  renderMessagesStream(conv.messages || []);
  renderConversationsList(currentConversations);
}

function renderMessagesStream(messages) {
  const stream = document.getElementById('messages-stream');
  if (!stream) return;

  stream.innerHTML = messages.map(m => {
    const isMe = m.sender === (activeSessionRoleId || 'student');
    return `
      <div class="flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1">
        <span class="text-[10px] text-slate-500">${m.senderName}</span>
        <div class="max-w-md p-3 rounded-2xl text-xs ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-[#080e1c] text-slate-200 border border-slate-800 rounded-bl-none'}">
          ${m.text}
        </div>
      </div>
    `;
  }).join('');
  stream.scrollTop = stream.scrollHeight;
}

async function handleSendMessageSubmit(event) {
  event.preventDefault();
  const input = document.getElementById('message-input-text');
  const text = input?.value;
  if (!text || !activeConversationId) return;

  try {
    const res = await fetch(`${API_BASE}/messages/${activeConversationId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: activeSessionRoleId || 'student',
        senderName: activeSessionRoleId === 'alumnus' ? 'Rohan Mehta' : (activeSessionRoleId === 'faculty' ? 'Dr. R.K. Verma' : 'Aman Sharma'),
        text
      })
    });
    const data = await res.json();
    if (data.success && data.message) {
      input.value = '';
      const conv = currentConversations.find(c => c.id === activeConversationId);
      if (conv) {
        conv.messages ||= [];
        conv.messages.push(data.message);
        renderMessagesStream(conv.messages);
      }
    }
  } catch (err) {}
}

// ================= AUTH & SECURITY HELPER =================
function getAuthHeaders() {
  return {
    'Content-Type': 'application/json',
    'x-user-role': activeSessionRoleId || 'student'
  };
}

function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ================= FACULTY PANEL CONTROLLERS =================

async function fetchFacultyDashboard() {
  try {
    const res = await fetch(`${API_BASE}/faculty/dashboard`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!data.success) return;

    const stats = data.dashboard?.stats || {};
    const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setTxt('faculty-stat-projects', stats.assignedProjects || 8);
    setTxt('faculty-stat-teams', stats.activeStudentTeams || 12);
    setTxt('faculty-stat-pending', stats.pendingMilestones || 3);
    setTxt('faculty-stat-coguides', stats.alumniCoGuides || 6);

    // Render active supervisions
    const supContainer = document.getElementById('faculty-dashboard-supervisions');
    if (supContainer) {
      const sups = data.dashboard?.activeSupervisions || [];
      if (sups.length === 0) {
        supContainer.innerHTML = `<div class="p-4 text-center text-slate-500 text-xs">No active capstone projects currently supervised.</div>`;
      } else {
        supContainer.innerHTML = sups.map(s => {
          const latestMs = s.milestones?.[s.milestones.length - 1] || {};
          const statusColors = {
            'Approved': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            'Needs Revision': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
            'In Review': 'bg-amber-500/10 text-amber-300 border-amber-500/20'
          };
          const pillClass = statusColors[latestMs.status] || 'bg-slate-800 text-slate-300 border-slate-700';
          return `
            <div class="bg-[#050916] border border-slate-800 rounded-xl p-3.5 space-y-2 hover:border-slate-700 transition">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <div class="font-bold text-white text-xs">${escapeHTML(s.title)}</div>
                  <div class="text-[11px] text-slate-400 flex items-center space-x-2 mt-0.5">
                    <span class="text-purple-300">${escapeHTML(s.squadName)}</span>
                    <span>•</span>
                    <span>${escapeHTML(s.department)}</span>
                    <span>•</span>
                    <span class="font-mono text-slate-500">${escapeHTML(s.year)}</span>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono border ${pillClass}">${escapeHTML(latestMs.status || 'Active')}</span>
              </div>
              <div class="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80">
                <span class="text-slate-400">Current: <span class="text-slate-200">${escapeHTML(latestMs.title || 'Ongoing')}</span></span>
                <button onclick="openMilestoneReviewModal('${s.id}', '${latestMs.id}', '${escapeHTML(s.title + ' - ' + latestMs.title)}')" class="text-purple-400 hover:text-purple-300 font-semibold flex items-center space-x-1">
                  <i data-lucide="edit-3" class="w-3 h-3"></i>
                  <span>Review &amp; Grade</span>
                </button>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // Render pending reviews in dashboard
    const reviewsContainer = document.getElementById('faculty-dashboard-reviews');
    if (reviewsContainer) {
      const reviews = data.dashboard?.pendingReviews || [];
      if (reviews.length === 0) {
        reviewsContainer.innerHTML = `<div class="p-3 text-center text-slate-500 text-xs">All submitted milestones evaluated.</div>`;
      } else {
        reviewsContainer.innerHTML = reviews.map(r => `
          <div class="bg-[#050916] border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-3">
            <div class="min-w-0">
              <div class="text-xs font-bold text-white truncate">${escapeHTML(r.milestoneTitle)}</div>
              <div class="text-[10px] text-slate-400 truncate">${escapeHTML(r.squadName)} • ${escapeHTML(r.projectTitle)}</div>
            </div>
            <button onclick="openMilestoneReviewModal('${r.supervisionId}', '${r.milestoneId}', '${escapeHTML(r.projectTitle + ' - ' + r.milestoneTitle)}')" class="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-lg text-[11px] font-bold shrink-0 hover:bg-amber-500/20 transition">
              Assess
            </button>
          </div>
        `).join('');
      }
    }

    // Render upcoming deadlines
    const dlContainer = document.getElementById('faculty-dashboard-deadlines');
    if (dlContainer) {
      const deadlines = data.dashboard?.upcomingDeadlines || [];
      dlContainer.innerHTML = deadlines.map(d => `
        <div class="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/60 last:border-0">
          <div class="flex items-center space-x-2">
            <span class="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
            <span class="text-slate-300 font-medium">${escapeHTML(d.milestone)}</span>
          </div>
          <span class="font-mono text-slate-400 text-[11px]">${escapeHTML(d.date)}</span>
        </div>
      `).join('');
    }

    lucide.createIcons();
  } catch (err) {
    console.error('fetchFacultyDashboard error:', err);
  }
}

async function fetchFacultyStudents() {
  try {
    const res = await fetch(`${API_BASE}/faculty/students`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (data.success) {
      facultyStudentsState = data.students || [];
      renderFacultyStudents(facultyStudentsState);
    }
  } catch (err) {
    console.error('fetchFacultyStudents error:', err);
  }
}

function handleFacultyStudentFilter() {
  const query = (document.getElementById('faculty-student-search-input')?.value || '').toLowerCase().trim();
  const branch = document.getElementById('faculty-student-branch-select')?.value || 'all';

  const filtered = facultyStudentsState.filter(s => {
    const matchQuery = !query || 
      (s.name && s.name.toLowerCase().includes(query)) || 
      (s.skills && s.skills.some(sk => sk.toLowerCase().includes(query))) || 
      (s.collegeRoll && s.collegeRoll.toLowerCase().includes(query));
    const matchBranch = branch === 'all' || (s.branch && s.branch.toLowerCase().includes(branch.toLowerCase()));
    return matchQuery && matchBranch;
  });

  renderFacultyStudents(filtered);
}

function renderFacultyStudents(students) {
  const container = document.getElementById('faculty-students-cards-container');
  if (!container) return;

  if (!students || students.length === 0) {
    container.innerHTML = `<div class="col-span-full glass-panel rounded-2xl p-8 text-center text-slate-400 text-xs">No matching students found. Try adjusting your search query or branch filter.</div>`;
    return;
  }

  container.innerHTML = students.map(s => {
    const skillsHtml = (s.skills || []).slice(0, 4).map(sk => `
      <span class="bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] px-2 py-0.5 rounded-md font-mono">${escapeHTML(sk)}</span>
    `).join('');

    return `
      <div class="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3.5 hover:border-slate-700 transition flex flex-col justify-between">
        <div class="space-y-3">
          <div class="flex items-start justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
                ${escapeHTML(s.avatar || (s.name ? s.name.substring(0, 2).toUpperCase() : 'ST'))}
              </div>
              <div>
                <h4 class="font-bold text-white text-xs">${escapeHTML(s.name)}</h4>
                <p class="text-[11px] text-slate-400">${escapeHTML(s.branch)} • CGPA: <span class="text-amber-400 font-mono font-bold">${escapeHTML(s.cgpa)}</span></p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-xs font-black text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded font-mono">${s.capabilityScore || 90}/100</span>
              <div class="text-[9px] text-slate-500 mt-0.5 font-mono">Capability</div>
            </div>
          </div>

          <p class="text-slate-300 text-xs line-clamp-2 leading-relaxed">${escapeHTML(s.bio || 'Active campus builder and open-source contributor.')}</p>

          <div class="flex flex-wrap gap-1.5 pt-1">
            ${skillsHtml}
          </div>
        </div>

        <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <a href="${escapeHTML(s.githubUrl || 'https://github.com')}" target="_blank" class="text-slate-400 hover:text-white flex items-center space-x-1.5 text-[11px]">
            <i data-lucide="github" class="w-3.5 h-3.5"></i>
            <span>GitHub Proof</span>
          </a>
          <button onclick="handleAssignStudentModal('${s.id}', '${escapeHTML(s.name)}')" class="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg text-[11px] flex items-center space-x-1 transition shadow-sm">
            <i data-lucide="user-plus" class="w-3 h-3"></i>
            <span>Assign Capstone</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

function handleAssignStudentModal(studentId, studentName) {
  showToast(`Initiating Capstone Guidance Proposal for ${studentName}.`, 'success');
  switchTab('faculty-challenges');
}

async function fetchFacultySupervisions() {
  try {
    const res = await fetch(`${API_BASE}/faculty/supervision`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!data.success) return;

    const container = document.getElementById('faculty-supervision-cards-container');
    if (!container) return;

    const sups = data.supervisions || [];
    if (sups.length === 0) {
      container.innerHTML = `<div class="glass-panel rounded-2xl p-8 text-center text-slate-500 text-xs">No supervised projects recorded.</div>`;
      return;
    }

    container.innerHTML = sups.map(s => {
      const milestonesHtml = (s.milestones || []).map(m => {
        const statusColors = {
          'Approved': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
          'Needs Revision': 'bg-rose-500/10 text-rose-400 border-rose-500/25',
          'In Review': 'bg-amber-500/10 text-amber-300 border-amber-500/25'
        };
        const badgeClass = statusColors[m.status] || 'bg-slate-800 text-slate-300 border-slate-700';

        return `
          <div class="bg-[#050916] border border-slate-800 rounded-xl p-3.5 space-y-2">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div class="flex items-center space-x-2">
                <span class="w-2 h-2 rounded-full ${m.status === 'Approved' ? 'bg-emerald-400' : (m.status === 'Needs Revision' ? 'bg-rose-400' : 'bg-amber-400')}"></span>
                <span class="font-bold text-white text-xs">${escapeHTML(m.title)}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-mono border ${badgeClass}">${escapeHTML(m.status)}</span>
                ${m.score ? `<span class="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/10 text-sky-300 border border-sky-500/20 font-bold">${m.score}/100</span>` : ''}
              </div>
            </div>

            <div class="text-[11px] text-slate-300 leading-relaxed bg-[#030611] rounded-lg p-2.5 border border-slate-800/80">
              <span class="text-slate-500 font-semibold block mb-0.5">Faculty Feedback:</span>
              ${escapeHTML(m.feedback || 'Pending assessment.')}
            </div>

            <div class="flex items-center justify-between text-[11px] pt-1">
              <span class="text-slate-500 font-mono">Evaluated: ${escapeHTML(m.submittedAt || 'Recent')}</span>
              <button onclick="openMilestoneReviewModal('${s.id}', '${m.id}', '${escapeHTML(s.title + ' - ' + m.title)}')" class="px-2.5 py-1 btn-gradient-primary rounded-lg text-white font-bold text-[11px] flex items-center space-x-1 shadow-sm">
                <i data-lucide="edit-2" class="w-3 h-3"></i>
                <span>Grade / Revise</span>
              </button>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <div class="flex items-center space-x-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/25">${escapeHTML(s.squadName)}</span>
                <span class="text-xs text-slate-400">${escapeHTML(s.department)} • ${escapeHTML(s.year)}</span>
              </div>
              <h3 class="text-sm font-bold text-white mt-1">${escapeHTML(s.title)}</h3>
            </div>
            <div class="flex items-center space-x-2">
              <a href="${escapeHTML(s.githubRepo || 'https://github.com')}" target="_blank" class="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-xl text-xs flex items-center space-x-1.5 transition">
                <i data-lucide="github" class="w-3.5 h-3.5"></i>
                <span>View Repository</span>
              </a>
            </div>
          </div>

          <div class="space-y-3">
            <h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Milestone Assessments</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              ${milestonesHtml}
            </div>
          </div>
        </div>
      `;
    }).join('');

    lucide.createIcons();
  } catch (err) {
    console.error('fetchFacultySupervisions error:', err);
  }
}

function openMilestoneReviewModal(supId, msId, title) {
  const supInp = document.getElementById('fac-review-sup-id');
  const msInp = document.getElementById('fac-review-ms-id');
  const titleDisp = document.getElementById('fac-review-title-display');
  
  if (supInp) supInp.value = supId;
  if (msInp) msInp.value = msId;
  if (titleDisp) titleDisp.value = title;

  openModal('modal-faculty-review');
}

async function handleFacultyReviewSubmit(event) {
  event.preventDefault();
  const supId = document.getElementById('fac-review-sup-id')?.value;
  const msId = document.getElementById('fac-review-ms-id')?.value;
  const score = parseInt(document.getElementById('fac-review-score')?.value, 10);
  const status = document.getElementById('fac-review-status')?.value;
  const feedback = document.getElementById('fac-review-feedback')?.value;

  try {
    const res = await fetch(`${API_BASE}/faculty/supervision/review`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        supervisionId: supId,
        milestoneId: msId,
        score,
        status,
        feedback
      })
    });
    const data = await res.json();
    if (data.success) {
      closeModal('modal-faculty-review');
      showToast('Milestone evaluation saved successfully!', 'success');
      fetchFacultySupervisions();
      fetchFacultyDashboard();
    } else {
      showToast(data.error || 'Failed to submit evaluation', 'error');
    }
  } catch (err) {
    showToast('Network error while saving milestone evaluation', 'error');
  }
}

async function fetchFacultyCollaborations() {
  try {
    const res = await fetch(`${API_BASE}/faculty/collaborations`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!data.success) return;

    const container = document.getElementById('faculty-collaborations-cards-container');
    if (!container) return;

    const collabs = data.collaborations || [];
    if (collabs.length === 0) {
      container.innerHTML = `<div class="col-span-full glass-panel rounded-2xl p-8 text-center text-slate-500 text-xs">No alumni co-guide collaborations registered yet.</div>`;
      return;
    }

    container.innerHTML = collabs.map(c => `
      <div class="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3.5 hover:border-slate-700 transition flex flex-col justify-between">
        <div class="space-y-3">
          <div class="flex items-start justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
                ${escapeHTML(c.partnerName ? c.partnerName.substring(0, 2).toUpperCase() : 'AL')}
              </div>
              <div>
                <h4 class="font-bold text-white text-xs">${escapeHTML(c.partnerName)}</h4>
                <p class="text-[11px] text-emerald-400 font-semibold">${escapeHTML(c.company)}</p>
              </div>
            </div>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono ${c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'}">${escapeHTML(c.status || 'Active')}</span>
          </div>

          <div>
            <div class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Project Title</div>
            <div class="text-xs font-bold text-slate-200 mt-0.5">${escapeHTML(c.title)}</div>
          </div>

          <div>
            <div class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Focus Area</div>
            <span class="inline-block mt-0.5 px-2 py-0.5 bg-slate-800/80 text-sky-300 text-[10px] rounded font-mono">${escapeHTML(c.area || 'Distributed Systems')}</span>
          </div>

          <p class="text-slate-400 text-xs leading-relaxed bg-[#040814] p-2.5 rounded-xl border border-slate-800/70">${escapeHTML(c.notes || 'Collaborative guidance underway.')}</p>
        </div>

        <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <span class="text-[11px] text-slate-500 font-mono">Sessions: 4 Completed</span>
          <button onclick="showToast('Review session sync link dispatched to ${escapeHTML(c.partnerName)}', 'success')" class="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-sky-400 font-bold rounded-lg text-[11px] flex items-center space-x-1 transition">
            <i data-lucide="calendar" class="w-3 h-3"></i>
            <span>Schedule Sync</span>
          </button>
        </div>
      </div>
    `).join('');

    lucide.createIcons();
  } catch (err) {
    console.error('fetchFacultyCollaborations error:', err);
  }
}

async function handleFacultyInviteSubmit(event) {
  event.preventDefault();
  const partnerName = document.getElementById('fac-invite-partner-name')?.value;
  const company = document.getElementById('fac-invite-company')?.value;
  const title = document.getElementById('fac-invite-title')?.value;
  const area = document.getElementById('fac-invite-area')?.value;
  const notes = document.getElementById('fac-invite-notes')?.value;

  try {
    const res = await fetch(`${API_BASE}/faculty/collaborations/invite`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ partnerName, company, title, area, notes })
    });
    const data = await res.json();
    if (data.success) {
      closeModal('modal-faculty-invite-coguide');
      showToast(`Collaboration invitation dispatched to ${partnerName}!`, 'success');
      document.getElementById('form-faculty-invite')?.reset();
      fetchFacultyCollaborations();
      fetchFacultyDashboard();
    } else {
      showToast(data.error || 'Failed to send invite', 'error');
    }
  } catch (err) {
    showToast('Network error while dispatching invite', 'error');
  }
}

async function fetchFacultyProfile() {
  try {
    const res = await fetch(`${API_BASE}/faculty/profile`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (data.success && data.profile) {
      const p = data.profile;
      const setVal = (id, val) => { const el = document.getElementById(id); if (el && val !== undefined) el.value = val; };
      setVal('fac-prof-name', p.name);
      setVal('fac-prof-dept', p.department);
      setVal('fac-prof-research', Array.isArray(p.researchDomains) ? p.researchDomains.join(', ') : p.researchDomains);
      setVal('fac-prof-office', p.officeHours);
      setVal('fac-prof-capacity', p.mentorshipPreferences);

      const toggle = document.getElementById('fac-prof-active-toggle');
      if (toggle) toggle.checked = p.visibility !== 'Private';
    }
  } catch (err) {
    console.error('fetchFacultyProfile error:', err);
  }
}

async function handleSaveFacultyProfile(event) {
  event.preventDefault();
  const name = document.getElementById('fac-prof-name')?.value;
  const department = document.getElementById('fac-prof-dept')?.value;
  const domainsStr = document.getElementById('fac-prof-research')?.value || '';
  const officeHours = document.getElementById('fac-prof-office')?.value;
  const mentorshipPreferences = document.getElementById('fac-prof-capacity')?.value;
  const isAccepting = document.getElementById('fac-prof-active-toggle')?.checked;

  try {
    const res = await fetch(`${API_BASE}/faculty/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name,
        department,
        researchDomains: domainsStr.split(',').map(s => s.trim()).filter(Boolean),
        officeHours,
        mentorshipPreferences,
        visibility: isAccepting ? 'Public' : 'Private'
      })
    });
    const data = await res.json();
    if (data.success) {
      showToast('Faculty academic profile updated and published!', 'success');
    } else {
      showToast(data.error || 'Failed to update profile', 'error');
    }
  } catch (err) {
    showToast('Network error updating profile', 'error');
  }
}

// ================= INSTITUTION PANEL CONTROLLERS =================

async function fetchInstitutionOverview() {
  try {
    const res = await fetch(`${API_BASE}/institution/overview`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!data.success) return;

    const ov = data.overview || {};
    const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setTxt('inst-stat-students', ov.activeStudents?.toLocaleString() || '1,480');
    setTxt('inst-stat-alumni', ov.verifiedAlumni?.toLocaleString() || '3,340');
    setTxt('inst-stat-faculty', ov.activeFaculty || '86');
    setTxt('inst-stat-employers', ov.employerPartners || '142');
    setTxt('inst-stat-outcomes', ov.verifiedOutcomes || '428');
    setTxt('inst-stat-bounties-amount', '₹' + (ov.bountiesDisbursedLakh || '4.2') + 'L');

    // Render recruiters
    const recContainer = document.getElementById('inst-overview-recruiters');
    if (recContainer) {
      const recruiters = ov.topRecruiters || [];
      recContainer.innerHTML = recruiters.map(r => `
        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="text-slate-300 font-medium">${escapeHTML(r.name)}</span>
            <span class="text-sky-400 font-bold">${r.alumniCount} Alumni (${r.openRoles} Hiring)</span>
          </div>
          <div class="w-full bg-[#030611] h-2 rounded-full overflow-hidden border border-slate-800">
            <div class="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full" style="width: ${r.fillPercentage || 65}%"></div>
          </div>
        </div>
      `).join('');
    }

    // Render recent outcomes
    const outContainer = document.getElementById('inst-overview-recent-outcomes');
    if (outContainer) {
      const outcomes = ov.recentOutcomes || [];
      outContainer.innerHTML = outcomes.map(o => `
        <div class="bg-[#050916] border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs">
          <div>
            <div class="font-bold text-white">${escapeHTML(o.studentName)}</div>
            <div class="text-[11px] text-slate-400">${escapeHTML(o.role)} @ <span class="text-sky-300 font-semibold">${escapeHTML(o.company)}</span></div>
          </div>
          <div class="text-right">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">${escapeHTML(o.package || 'Verified')}</span>
            <div class="text-[9px] text-slate-500 font-mono mt-0.5">${escapeHTML(o.date || 'Recent')}</div>
          </div>
        </div>
      `).join('');
    }

    lucide.createIcons();
  } catch (err) {
    console.error('fetchInstitutionOverview error:', err);
  }
}

async function fetchInstitutionIntelligence() {
  try {
    const res = await fetch(`${API_BASE}/institution/intelligence`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!data.success) return;

    const intel = data.intelligence || {};
    const trendsContainer = document.getElementById('inst-intel-trends');
    if (trendsContainer) {
      const trends = intel.sectorDemand || [];
      trendsContainer.innerHTML = trends.map(t => `
        <div class="space-y-1.5">
          <div class="flex justify-between text-xs font-semibold">
            <span class="text-slate-200">${escapeHTML(t.sector)}</span>
            <span class="text-sky-400 font-mono">${t.demandScore}% Market Demand</span>
          </div>
          <div class="w-full bg-[#030611] h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div class="bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 h-full rounded-full" style="width: ${t.demandScore}%"></div>
          </div>
          <div class="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>Campus Skill Coverage: ${t.readinessScore || 78}%</span>
            <span>Active Openings: ${t.openingsCount || 42}</span>
          </div>
        </div>
      `).join('');
    }

    const underContainer = document.getElementById('inst-intel-underserved');
    if (underContainer) {
      const underserved = intel.underservedPrograms || [];
      underContainer.innerHTML = underserved.map(u => `
        <div class="bg-[#050916] border border-slate-800 rounded-xl p-3.5 space-y-2">
          <div class="flex items-start justify-between">
            <h4 class="font-bold text-white text-xs">${escapeHTML(u.department)}</h4>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">${u.gapPercentage}% Gap</span>
          </div>
          <p class="text-[11px] text-slate-300">${escapeHTML(u.reason)}</p>
          <div class="pt-1 flex items-center justify-between text-[11px]">
            <span class="text-slate-500 font-mono">Intervention:</span>
            <button onclick="showToast('Intervention deployed: Alumni mentorship sprint scheduled for ${escapeHTML(u.department)}', 'success')" class="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold rounded-lg transition">
              Deploy Mentorship Surge
            </button>
          </div>
        </div>
      `).join('');
    }

    lucide.createIcons();
  } catch (err) {
    console.error('fetchInstitutionIntelligence error:', err);
  }
}

async function fetchInstitutionDepartments() {
  try {
    const res = await fetch(`${API_BASE}/institution/departments`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!data.success) return;

    institutionDepartmentsState = data.departments || [];
    const tbody = document.getElementById('inst-departments-table-body');
    if (!tbody) return;

    if (institutionDepartmentsState.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="py-6 text-center text-slate-500">No departments configured yet. Click 'Add Department' to create one.</td></tr>`;
      return;
    }

    tbody.innerHTML = institutionDepartmentsState.map(d => `
      <tr class="hover:bg-slate-800/30 transition">
        <td class="py-3 px-4 font-semibold text-white">
          <div>${escapeHTML(d.name)}</div>
          <span class="font-mono text-[10px] text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">${escapeHTML(d.code)}</span>
        </td>
        <td class="py-3 px-4 text-slate-300">${escapeHTML(d.head)}</td>
        <td class="py-3 px-4 text-center font-mono text-slate-200">${d.facultyCount}</td>
        <td class="py-3 px-4 text-center font-mono text-slate-200">${d.enrolledStudents}</td>
        <td class="py-3 px-4 text-center">
          <span class="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">${d.placementRate || 85}%</span>
        </td>
        <td class="py-3 px-4 text-center font-mono text-slate-300">${d.cohortTarget || 90}%</td>
        <td class="py-3 px-4 text-right">
          <button onclick="deleteInstitutionDepartment('${d.id}')" class="p-1.5 hover:bg-rose-500/20 text-rose-400 rounded-lg transition" title="Delete Department">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </td>
      </tr>
    `).join('');

    lucide.createIcons();
  } catch (err) {
    console.error('fetchInstitutionDepartments error:', err);
  }
}

function openAddDepartmentModal() {
  document.getElementById('form-institution-add-dept')?.reset();
  openModal('modal-institution-add-dept');
}

async function handleInstitutionAddDeptSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('inst-dept-input-name')?.value;
  const code = document.getElementById('inst-dept-input-code')?.value;
  const head = document.getElementById('inst-dept-input-head')?.value;
  const facultyCount = parseInt(document.getElementById('inst-dept-input-faculty')?.value, 10);
  const enrolledStudents = parseInt(document.getElementById('inst-dept-input-students')?.value, 10);
  const targetPlacement = parseInt(document.getElementById('inst-dept-input-target')?.value, 10);

  try {
    const res = await fetch(`${API_BASE}/institution/departments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name,
        code,
        head,
        facultyCount,
        enrolledStudents,
        cohortTarget: targetPlacement,
        placementRate: 85
      })
    });
    const data = await res.json();
    if (data.success) {
      closeModal('modal-institution-add-dept');
      showToast(`Academic Department ${name} created successfully!`, 'success');
      fetchInstitutionDepartments();
      fetchInstitutionOverview();
    } else {
      showToast(data.error || 'Failed to create department', 'error');
    }
  } catch (err) {
    showToast('Network error creating department', 'error');
  }
}

async function deleteInstitutionDepartment(id) {
  if (!confirm('Are you sure you want to remove this academic department?')) return;
  try {
    const res = await fetch(`${API_BASE}/institution/departments/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (data.success) {
      showToast('Department deleted successfully.', 'success');
      fetchInstitutionDepartments();
    } else {
      showToast(data.error || 'Failed to delete department', 'error');
    }
  } catch (err) {
    showToast('Network error deleting department', 'error');
  }
}

async function fetchInstitutionOutcomes() {
  try {
    const res = await fetch(`${API_BASE}/institution/outcomes`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!data.success) return;

    const summary = data.summary || {};
    const setTxt = (id, val) => { const el = document.getElementById(id); if (el && val) el.textContent = val; };
    setTxt('inst-outcomes-median-ctc', summary.medianCTC || '₹14.2 LPA');
    setTxt('inst-outcomes-higher-ed', (summary.higherStudies || 68) + ' Students');
    setTxt('inst-outcomes-patents', (summary.patents || 42) + ' Published');

    const tbody = document.getElementById('inst-outcomes-table-body');
    if (!tbody) return;

    const verified = data.verifiedPlacements || [];
    tbody.innerHTML = verified.map(v => `
      <tr class="hover:bg-slate-800/30 transition font-mono text-[11px]">
        <td class="py-2.5 px-4 font-semibold text-white">
          <div>${escapeHTML(v.studentName)}</div>
          <span class="text-slate-500 text-[10px]">${escapeHTML(v.rollNo || '2022CS084')}</span>
        </td>
        <td class="py-2.5 px-4 text-slate-300 font-sans">${escapeHTML(v.department)} • ${escapeHTML(v.batch || '2026')}</td>
        <td class="py-2.5 px-4 text-sky-400 font-sans font-bold">${escapeHTML(v.employer)}</td>
        <td class="py-2.5 px-4 text-slate-200 font-sans">${escapeHTML(v.role)} (${escapeHTML(v.package)})</td>
        <td class="py-2.5 px-4 text-slate-400">${escapeHTML(v.verificationMethod || 'Alumni Endorsed & ATS Sync')}</td>
        <td class="py-2.5 px-4 text-center">
          <span class="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">Verified</span>
        </td>
      </tr>
    `).join('');

    lucide.createIcons();
  } catch (err) {
    console.error('fetchInstitutionOutcomes error:', err);
  }
}

function exportInstitutionOutcomesCSV() {
  const role = activeSessionRoleId || 'institution';
  const downloadUrl = `${API_BASE}/institution/export-outcomes-csv?role=${role}`;
  showToast('Generating official NAAC/NIRF accreditation outcomes CSV...', 'info');

  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', 'LinkX_Accreditation_Outcomes.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => {
    showToast('Official accreditation CSV exported successfully!', 'success');
  }, 1000);
}

async function fetchInstitutionGovernance() {
  try {
    const res = await fetch(`${API_BASE}/institution/governance`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!data.success) return;

    const settings = data.settings || {};
    const domainInp = document.getElementById('gov-inst-domain');
    if (domainInp && settings.allowedDomain) domainInp.value = settings.allowedDomain;

    const scrapeLock = document.getElementById('gov-scrape-lock');
    if (scrapeLock && settings.publicScrapeProtection !== undefined) scrapeLock.checked = settings.publicScrapeProtection;

    const outreachPolicy = document.getElementById('gov-outreach-policy');
    if (outreachPolicy && settings.alumniOutreachRateLimit !== undefined) outreachPolicy.checked = settings.alumniOutreachRateLimit;

    const atsLock = document.getElementById('gov-ats-lock');
    if (atsLock && settings.externalATSWebhookLock !== undefined) atsLock.checked = settings.externalATSWebhookLock;

    const tbody = document.getElementById('inst-audit-logs-body');
    if (!tbody) return;

    const logs = data.auditLogs || [];
    tbody.innerHTML = logs.map(l => `
      <tr class="hover:bg-slate-800/30 transition">
        <td class="py-2 px-2.5 text-slate-400 whitespace-nowrap">${escapeHTML(l.timestamp ? new Date(l.timestamp).toLocaleTimeString() : '12:00:00')}</td>
        <td class="py-2 px-2.5 text-purple-300 font-semibold">${escapeHTML(l.actor)}</td>
        <td class="py-2 px-2.5 text-slate-200">
          <span class="text-sky-400 font-bold">${escapeHTML(l.action)}</span>
          <span class="text-slate-400 ml-1 font-sans">(${escapeHTML(l.entity)})</span>
        </td>
        <td class="py-2 px-2.5 text-right">
          <span class="px-2 py-0.5 rounded text-[10px] ${l.status === 'Success' ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-300 bg-amber-500/10'}">${escapeHTML(l.status)}</span>
        </td>
      </tr>
    `).join('');

    lucide.createIcons();
  } catch (err) {
    console.error('fetchInstitutionGovernance error:', err);
  }
}

async function saveInstitutionGovernance(event) {
  event.preventDefault();
  const allowedDomain = document.getElementById('gov-inst-domain')?.value;
  const publicScrapeProtection = document.getElementById('gov-scrape-lock')?.checked;
  const alumniOutreachRateLimit = document.getElementById('gov-outreach-policy')?.checked;
  const externalATSWebhookLock = document.getElementById('gov-ats-lock')?.checked;

  try {
    const res = await fetch(`${API_BASE}/institution/governance`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        allowedDomain,
        publicScrapeProtection,
        alumniOutreachRateLimit,
        externalATSWebhookLock
      })
    });
    const data = await res.json();
    if (data.success) {
      showToast('Institutional governance policy and security rules saved!', 'success');
      fetchInstitutionGovernance();
    } else {
      showToast(data.error || 'Failed to save governance policy', 'error');
    }
  } catch (err) {
    showToast('Network error saving governance policy', 'error');
  }
}

// ================= ALUMNI MENTORSHIP CONTRIBUTION DESK =================
let currentAlumniMentorshipOfferId = null; // track edit vs create

async function fetchAlumniMentorshipDashboard() {
  try {
    const res = await fetch(`${API_BASE}/alumni/mentorship/dashboard?alumniId=${activeSessionRoleId || 'alumnus'}`);
    const data = await res.json();
    if (!data.success) { console.warn('Alumni mentorship fetch failed:', data.error); return; }
    renderAlumniMentorshipDashboard(data);
  } catch (err) {
    console.warn('Alumni mentorship fetch error:', err);
  }
}

function renderAlumniMentorshipDashboard(data) {
  const d = data.dashboard || {};

  // KPI cards — IDs match HTML element IDs in view-alumni-mentorship
  const kpiMap = {
    'alumni-stat-offers':    d.stats?.activeOffers ?? 0,
    'alumni-stat-pending':   d.stats?.pendingRequests ?? 0,
    'alumni-stat-upcoming':  d.stats?.confirmedSessions ?? 0,
    'alumni-stat-completed': d.stats?.completedSessions ?? 0
  };
  Object.entries(kpiMap).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  });

  // Active offers grid
  const offersGrid = document.getElementById('alumni-offers-grid');
  if (offersGrid) {
    const offers = d.offers || [];
    if (offers.length === 0) {
      offersGrid.innerHTML = `<div class="col-span-full text-slate-500 italic text-xs text-center py-6">No active offers yet. Click "Post New Offer" to create your first contribution.</div>`;
    } else {
      offersGrid.innerHTML = offers.map(o => `
        <div class="glass-card rounded-2xl p-4 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">${escapeHTML(o.type || 'Mentoring')}</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold border ${o.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' : 'bg-slate-800 text-slate-500 border-slate-700'}">
                ${o.status === 'active' ? 'Active' : 'Paused'}
              </span>
            </div>
            <h4 class="text-sm font-bold text-white leading-tight">${escapeHTML(o.title)}</h4>
            <p class="text-[11px] text-slate-400 leading-relaxed">${escapeHTML(o.description || '')}</p>
            ${o.slots ? `<div class="text-[10px] text-sky-300 font-mono">${o.slotsUsed || 0}/${o.slots} slots used</div>` : ''}
          </div>
          <div class="flex items-center space-x-2 pt-2 border-t border-slate-800">
            <button onclick="openAlumniOfferModal('${o.id}')"
              class="flex-1 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-bold rounded-lg hover:bg-slate-800 transition">
              Edit
            </button>
            <button onclick="handleToggleAlumniOfferStatus('${o.id}', '${o.status}')"
              class="flex-1 py-1.5 ${o.status === 'active' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'} border text-[11px] font-bold rounded-lg hover:opacity-80 transition">
              ${o.status === 'active' ? 'Pause' : 'Activate'}
            </button>
            <button onclick="handleDeleteAlumniOffer('${o.id}')"
              class="py-1.5 px-2.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11px] font-bold rounded-lg hover:bg-rose-500/20 transition">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      `).join('');
    }
  }

  // Incoming student requests
  const requestsList = document.getElementById('alumni-incoming-requests');
  if (requestsList) {
    const requests = d.incomingRequests || [];
    if (requests.length === 0) {
      requestsList.innerHTML = `<div class="text-slate-500 italic text-xs py-4 text-center">No pending student requests.</div>`;
    } else {
      requestsList.innerHTML = requests.map(r => `
        <div class="p-3.5 rounded-xl bg-[#040711] border border-slate-800 space-y-2.5">
          <div class="flex items-start justify-between gap-3">
            <div class="space-y-0.5 flex-1">
              <div class="font-bold text-white text-xs">${escapeHTML(r.studentName || 'Student')}</div>
              <div class="text-[11px] text-slate-300">${escapeHTML(r.offerTitle || 'Mentorship Request')}</div>
              <div class="text-[10px] text-slate-400">${escapeHTML(r.studentNote || '')}</div>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">${r.status || 'Pending'}</span>
          </div>
          ${r.status === 'Pending' ? `
          <div class="flex items-center space-x-2">
            <button onclick="handleAlumniRequestRespond('${r.id}', 'Accepted')"
              class="flex-1 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold rounded-lg hover:bg-emerald-500/20 transition">
              Accept
            </button>
            <button onclick="handleAlumniRequestRespond('${r.id}', 'Declined')"
              class="flex-1 py-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11px] font-bold rounded-lg hover:bg-rose-500/20 transition">
              Decline
            </button>
          </div>` : ''}
        </div>
      `).join('');
    }
  }

  // Upcoming sessions
  const sessionsList = document.getElementById('alumni-upcoming-sessions');
  if (sessionsList) {
    const sessions = d.upcomingSessions || [];
    if (sessions.length === 0) {
      sessionsList.innerHTML = `<div class="text-slate-500 italic text-xs py-4 text-center">No confirmed upcoming sessions.</div>`;
    } else {
      sessionsList.innerHTML = sessions.map(s => `
        <div class="p-3.5 rounded-xl bg-[#040711] border border-slate-800 flex items-start justify-between gap-3">
          <div class="space-y-0.5 flex-1">
            <div class="font-bold text-white text-xs">${escapeHTML(s.studentName || 'Student')}</div>
            <div class="text-[11px] text-sky-300">${escapeHTML(s.offerTitle || '')}</div>
            <div class="text-[10px] text-slate-400">${s.scheduledAt ? new Date(s.scheduledAt).toLocaleString() : 'TBD'}</div>
          </div>
          <button onclick="openAlumniCompleteSessionModal('${s.id}')"
            class="px-3 py-1.5 btn-gradient-primary rounded-xl text-xs font-bold text-white shadow-md shrink-0">
            Complete
          </button>
        </div>
      `).join('');
    }
  }

  // Warm intro review queue
  const introList = document.getElementById('alumni-bridge-queue');
  if (introList) {
    const intros = d.pendingIntroReviews || [];
    if (intros.length === 0) {
      introList.innerHTML = `<div class="text-slate-500 italic text-xs py-4 text-center">No pending introduction review requests.</div>`;
    } else {
      introList.innerHTML = intros.map(i => `
        <div class="p-3.5 rounded-xl bg-[#040711] border border-slate-800 space-y-2">
          <div class="flex items-start justify-between gap-3">
            <div class="space-y-0.5 flex-1">
              <div class="font-bold text-white text-xs">${escapeHTML(i.requesterName || 'Student')}</div>
              <div class="text-[11px] text-slate-300">Wants intro to: ${escapeHTML(i.targetAlumnus || '')}</div>
              <div class="text-[10px] text-slate-400 italic">"${escapeHTML(i.note || '')}"</div>
            </div>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">Needs Review</span>
          </div>
          <div class="flex items-center space-x-2">
            <button onclick="handleAlumniIntroReview('${i.id}', 'Accepted')"
              class="flex-1 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold rounded-lg hover:bg-emerald-500/20 transition">
              Facilitate Intro
            </button>
            <button onclick="handleAlumniIntroReview('${i.id}', 'Declined')"
              class="flex-1 py-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11px] font-bold rounded-lg hover:bg-rose-500/20 transition">
              Decline
            </button>
          </div>
        </div>
      `).join('');
    }
  }

  // Completed history
  const historyList = document.getElementById('alumni-contribution-history');
  if (historyList) {
    const history = d.completedSessions || [];
    if (history.length === 0) {
      historyList.innerHTML = `<div class="text-slate-500 italic text-xs py-4 text-center">No completed sessions yet.</div>`;
    } else {
      historyList.innerHTML = history.map(h => `
        <div class="p-3 rounded-xl bg-[#040711] border border-slate-800 flex items-start justify-between gap-3">
          <div class="space-y-0.5 flex-1">
            <div class="font-bold text-white text-xs">${escapeHTML(h.studentName || 'Student')}</div>
            <div class="text-[11px] text-emerald-400">${escapeHTML(h.offerTitle || '')}</div>
            ${h.notes ? `<div class="text-[10px] text-slate-400 italic">${escapeHTML(h.notes)}</div>` : ''}
            <div class="text-[10px] text-slate-500">${h.completedAt ? new Date(h.completedAt).toLocaleDateString() : ''}</div>
          </div>
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">Completed</span>
        </div>
      `).join('');
    }
  }

  lucide.createIcons();
}

function openAlumniOfferModal(offerId = null) {
  currentAlumniMentorshipOfferId = offerId;
  const titleEl = document.getElementById('modal-alumni-offer-title');
  const form = document.getElementById('form-alumni-offer');
  if (titleEl) titleEl.textContent = offerId ? 'Edit Mentoring Offer' : 'Offer Mentoring & Expertise';

  // Clear form
  if (form) form.reset();

  // Pre-fill if editing
  if (offerId) {
    fetch(`${API_BASE}/alumni/mentorship/offers?alumniId=${activeSessionRoleId || 'alumnus'}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          const offer = (data.offers || []).find(o => o.id === offerId);
          if (offer) {
            const f = id => document.getElementById(id);
            if (f('alumni-offer-title-input')) f('alumni-offer-title-input').value = offer.title || '';
            if (f('alumni-offer-type-select')) f('alumni-offer-type-select').value = offer.type || 'Code & Architecture Review';
            if (f('alumni-offer-desc-input')) f('alumni-offer-desc-input').value = offer.description || '';
            if (f('alumni-offer-max-sessions')) f('alumni-offer-max-sessions').value = offer.slots || 3;
          }
        }
      })
      .catch(() => {});
  }
  openModal('modal-alumni-offer');
}

async function handleSaveAlumniOfferSubmit(event) {
  event.preventDefault();
  const btn = document.getElementById('btn-save-alumni-offer');
  if (btn) { btn.disabled = true; btn.textContent = 'Saving…'; }

  const title       = document.getElementById('alumni-offer-title-input')?.value?.trim();
  const type        = document.getElementById('alumni-offer-type-select')?.value;
  const description = document.getElementById('alumni-offer-desc-input')?.value?.trim();
  const slots       = parseInt(document.getElementById('alumni-offer-max-sessions')?.value || '3', 10);

  try {
    const method = currentAlumniMentorshipOfferId ? 'PUT' : 'POST';
    const url = currentAlumniMentorshipOfferId
      ? `${API_BASE}/alumni/mentorship/offers/${currentAlumniMentorshipOfferId}`
      : `${API_BASE}/alumni/mentorship/offers`;
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alumniId: activeSessionRoleId || 'alumnus', title, type, description, slots })
    });
    const data = await res.json();
    if (data.success) {
      closeModal('modal-alumni-offer');
      showToast(currentAlumniMentorshipOfferId ? 'Mentoring offer updated!' : 'Mentoring offer published!');
      currentAlumniMentorshipOfferId = null;
      fetchAlumniMentorshipDashboard();
    } else {
      showToast(data.error || 'Failed to save offer.', 'error');
    }
  } catch (err) {
    showToast('Network error saving offer.', 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Publish Offer'; }
  }
}

async function handleToggleAlumniOfferStatus(offerId, currentStatus) {
  const newStatus = currentStatus === 'active' ? 'paused' : 'active';
  try {
    const res = await fetch(`${API_BASE}/alumni/mentorship/offers/${offerId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alumniId: activeSessionRoleId || 'alumnus', status: newStatus })
    });
    const data = await res.json();
    if (data.success) {
      showToast(`Offer ${newStatus === 'active' ? 'activated' : 'paused'}.`);
      fetchAlumniMentorshipDashboard();
    } else {
      showToast(data.error || 'Failed to update offer status.', 'error');
    }
  } catch (err) {
    showToast('Network error updating offer status.', 'error');
  }
}

async function handleDeleteAlumniOffer(offerId) {
  if (!confirm('Delete this mentoring offer? This cannot be undone.')) return;
  try {
    const res = await fetch(`${API_BASE}/alumni/mentorship/offers/${offerId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alumniId: activeSessionRoleId || 'alumnus' })
    });
    const data = await res.json();
    if (data.success) {
      showToast('Mentoring offer deleted.');
      fetchAlumniMentorshipDashboard();
    } else {
      showToast(data.error || 'Failed to delete offer.', 'error');
    }
  } catch (err) {
    showToast('Network error deleting offer.', 'error');
  }
}

async function handleAlumniRequestRespond(bookingId, action) {
  try {
    const res = await fetch(`${API_BASE}/alumni/mentorship/requests/${bookingId}/respond`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alumniId: activeSessionRoleId || 'alumnus', action })
    });
    const data = await res.json();
    if (data.success) {
      showToast(`Request ${action.toLowerCase()}!`);
      fetchAlumniMentorshipDashboard();
    } else {
      showToast(data.error || `Failed to ${action.toLowerCase()} request.`, 'error');
    }
  } catch (err) {
    showToast('Network error responding to request.', 'error');
  }
}

async function handleAlumniIntroReview(introId, action) {
  try {
    const res = await fetch(`${API_BASE}/bridge/introductions/${introId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: action, reason: action === 'Declined' ? 'Alumni chose not to facilitate' : '' })
    });
    const data = await res.json();
    if (data.success) {
      showToast(action === 'Accepted' ? 'Introduction facilitated!' : 'Introduction declined.');
      fetchAlumniMentorshipDashboard();
    } else {
      showToast(data.error || 'Failed to process introduction.', 'error');
    }
  } catch (err) {
    showToast('Network error processing introduction.', 'error');
  }
}

let currentAlumniSessionId = null;
function openAlumniCompleteSessionModal(sessionId) {
  currentAlumniSessionId = sessionId;
  const form = document.getElementById('form-alumni-complete-session');
  if (form) form.reset();
  openModal('modal-alumni-complete-session');
}

async function handleCompleteAlumniSessionSubmit(event) {
  event.preventDefault();
  const notes   = document.getElementById('alumni-complete-feedback')?.value?.trim();
  const outcome = document.getElementById('alumni-complete-rating')?.value;
  const endorse = true; // completing always implies endorsement in this modal

  try {
    const res = await fetch(`${API_BASE}/alumni/mentorship/sessions/${currentAlumniSessionId}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alumniId: activeSessionRoleId || 'alumnus', notes, outcome, endorse })
    });
    const data = await res.json();
    if (data.success) {
      closeModal('modal-alumni-complete-session');
      showToast('Session completed and recorded!');
      triggerConfetti();
      currentAlumniSessionId = null;
      fetchAlumniMentorshipDashboard();
    } else {
      showToast(data.error || 'Failed to complete session.', 'error');
    }
  } catch (err) {
    showToast('Network error completing session.', 'error');
  }
}

// ================= PASSWORD SHOW / HIDE TOGGLE =================
function togglePasswordVisibility(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon  = document.getElementById(iconId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    if (icon) { icon.setAttribute('data-lucide', 'eye-off'); lucide.createIcons(); }
  } else {
    input.type = 'password';
    if (icon) { icon.setAttribute('data-lucide', 'eye'); lucide.createIcons(); }
  }
}

// ================= ENHANCED AUTH SIGN-IN (Role-Validated) =================
async function handleAuthSignInSubmit(event) {
  event.preventDefault();
  const email    = document.getElementById('auth-signin-email')?.value?.trim();
  const password = document.getElementById('auth-signin-password')?.value;
  const roleEl   = document.getElementById('auth-signin-role');
  const role     = roleEl?.value || '';
  const btn      = event.target.querySelector('[type="submit"]');
  const errBox   = document.getElementById('auth-signin-error');

  if (errBox) errBox.classList.add('hidden');
  if (btn)   { btn.disabled = true; btn.textContent = 'Signing in…'; }

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    });
    const data = await res.json();
    if (data.success) {
      closeModal('modal-auth-dialog');
      const userRole = data.user?.roles?.[0] || role || 'student';
      authenticateAndOpenWorkspace(userRole, true, true);
    } else {
      if (errBox) {
        errBox.textContent = data.error || 'Invalid credentials.';
        errBox.classList.remove('hidden');
      } else {
        showToast(data.error || 'Invalid credentials.', 'error');
      }
    }
  } catch (err) {
    const msg = 'Network error — please try again.';
    if (errBox) { errBox.textContent = msg; errBox.classList.remove('hidden'); }
    else showToast(msg, 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Sign In to LinkX'; }
  }
}
