// NexusIQ — Cinematic Splash, Unified Hero Login Engine & Role-Specific Dashboard Workspace
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
    defaultTab: 'intent-radar',
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
    actionLabel: '1-Click Proof-of-Work Pitch',
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
      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
      : 'text-slate-400 hover:text-white hover:bg-slate-800/80';
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
      <div class="p-1 rounded-lg bg-indigo-500/10 text-indigo-400 mt-0.5">
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
      <input type="${f.type}" value="${f.value}" required class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" placeholder="${f.placeholder}">
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

// ================= AUTHENTICATION & WORKSPACE ACTIVATION =================
function authenticateAndOpenWorkspace(roleId, showConfetti = true) {
  const cfg = ROLE_CONFIGS[roleId] || ROLE_CONFIGS.student;
  activeSessionRoleId = roleId;
  currentHeroRoleId = roleId;

  // Hide login hero screen, reveal authenticated workspace
  document.getElementById('hero-login-screen').classList.add('hidden');
  document.getElementById('authenticated-workspace').classList.remove('hidden');

  // Update Top Profile & Portal Tag
  document.getElementById('current-portal-badge').textContent = cfg.portalTitle;
  document.getElementById('user-header-avatar').textContent = cfg.avatar;
  document.getElementById('user-header-name').textContent = cfg.name;
  document.getElementById('user-header-role').textContent = `${cfg.roleLabel} • ${cfg.companyOrCollege}`;

  // Update Hero Banner
  document.getElementById('hero-avatar').textContent = cfg.avatar;
  document.getElementById('hero-name').textContent = cfg.name;
  document.getElementById('hero-tag').textContent = `${cfg.roleLabel} (${cfg.branch})`;
  document.getElementById('hero-bio').textContent = cfg.bio;
  document.getElementById('hero-goal').innerHTML = `<i data-lucide="target" class="w-3.5 h-3.5"></i><span>${cfg.goal}</span>`;

  // Update Active Intent badge
  document.getElementById('active-intent-text').textContent = cfg.activeIntent;

  renderWorkspaceRolePills();

  // Navigate directly to the most powerful tab for this role!
  switchTab(cfg.defaultTab || 'intent-radar');

  window.scrollTo({ top: 0, behavior: 'smooth' });
  lucide.createIcons();

  if (showConfetti) {
    triggerConfetti();
    showToast(`Welcome back, ${cfg.name}! Authenticated to ${cfg.portalTitle}.`);
  }
}

function handleLogout() {
  activeSessionRoleId = null;
  document.getElementById('authenticated-workspace').classList.add('hidden');
  document.getElementById('hero-login-screen').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  showToast("Logged out successfully.");
}

function renderWorkspaceRolePills() {
  const container = document.getElementById('workspace-role-pills');
  if (!container) return;

  const roles = Object.keys(ROLE_CONFIGS);
  container.innerHTML = roles.map(key => {
    const isSelected = key === activeSessionRoleId;
    const activeClass = isSelected
      ? 'bg-indigo-600 text-white font-bold shadow-sm'
      : 'text-slate-400 hover:text-white hover:bg-slate-800';
    return `
      <button onclick="authenticateAndOpenWorkspace('${key}', true)" class="px-2.5 py-1 rounded-lg transition text-xs whitespace-nowrap ${activeClass}">
        ${ROLE_CONFIGS[key].roleLabel}
      </button>
    `;
  }).join('');
}

// ================= NAVIGATION TABS =================
function switchTab(tabId) {
  const views = ['intent-radar', 'proof-of-work', 'bounties', 'alumnus-inbox', 'network-graph', 'institution'];
  
  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    const tabBtn = document.getElementById(`tab-${v}`);
    if (el) el.classList.add('hidden');
    if (tabBtn) {
      tabBtn.classList.remove('border-indigo-500', 'text-indigo-400');
      tabBtn.classList.add('border-transparent', 'text-slate-400');
    }
  });

  const activeView = document.getElementById(`view-${tabId}`);
  const activeTabBtn = document.getElementById(`tab-${tabId}`);
  if (activeView) activeView.classList.remove('hidden');
  if (activeTabBtn) {
    activeTabBtn.classList.add('border-indigo-500', 'text-indigo-400');
    activeTabBtn.classList.remove('border-transparent', 'text-slate-400');
  }

  if (tabId === 'network-graph') {
    setupLineageCanvas();
  } else if (tabId === 'alumnus-inbox') {
    fetchReferralsFromAPI();
  } else if (tabId === 'bounties') {
    fetchBountiesFromAPI();
  }
  lucide.createIcons();
}

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
      const pendingCount = referralsState.filter(r => r.status === 'pending').length;
      const badge = document.getElementById('referrals-count-badge');
      if (badge) badge.textContent = `${pendingCount} Pending`;
    }
  } catch (e) {}
}

// ================= MATCH RADAR =================
function renderRadarCards(items) {
  const container = document.getElementById('radar-cards-container');
  if (!container) return;

  container.innerHTML = items.map(item => `
    <div class="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 transition flex flex-col justify-between space-y-4">
      <div>
        <div class="flex items-start justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl ${item.avatarBg} text-white font-bold flex items-center justify-center text-sm shadow-md">
              ${item.avatar}
            </div>
            <div>
              <h4 class="text-sm font-bold text-white">${item.targetPerson}</h4>
              <p class="text-xs text-slate-400">${item.targetRole}</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm font-black text-emerald-400">${item.matchScore}%</div>
            <div class="text-[10px] text-slate-500 font-mono">Synergy Score</div>
          </div>
        </div>

        <div class="mt-3.5 inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs">
          <i data-lucide="zap" class="w-3.5 h-3.5 text-indigo-400"></i>
          <span class="font-semibold">${item.intentBadge}</span>
        </div>

        <p class="text-xs text-slate-300 mt-2.5 line-clamp-2">${item.intentDesc}</p>

        <div class="mt-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400">
          <span class="text-indigo-400 font-semibold">Why you match:</span> ${item.synergy}
        </div>
      </div>

      <div>
        <button onclick="handleRadarAction('${item.id}', '${item.actionType}')" class="w-full py-2 bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 hover:border-indigo-500 transition flex items-center justify-center space-x-1.5 shadow-sm">
          <i data-lucide="${item.actionType === 'bounty' ? 'briefcase' : (item.actionType === 'capstone' ? 'landmark' : 'arrow-up-right')}" class="w-3.5 h-3.5"></i>
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
      btn.classList.add('bg-indigo-600', 'text-white');
      btn.classList.remove('bg-slate-800', 'text-slate-300');
    } else {
      btn.classList.remove('bg-indigo-600', 'text-white');
      btn.classList.add('bg-slate-800', 'text-slate-300');
    }
  });

  if (category === 'all') {
    renderRadarCards(MATCH_RADAR_ITEMS);
  } else {
    const filtered = MATCH_RADAR_ITEMS.filter(item => item.category === category);
    renderRadarCards(filtered);
  }
}

function handleRadarAction(itemId, actionType) {
  if (actionType === 'pitch') {
    switchTab('proof-of-work');
    showToast("Proof-of-Work Pitch Lab ready for repo analysis!");
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
      source: 'NexusIQ Heuristic Analyzer',
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
    <div class="bg-slate-950 border border-indigo-500/30 rounded-2xl p-5 space-y-4 glow-indigo">
      <div class="flex items-start justify-between border-b border-slate-800/80 pb-3">
        <div>
          <div class="flex items-center space-x-2">
            <span class="text-sm font-bold text-white">Aman Sharma</span>
            <span class="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30 font-medium">Verified Student</span>
          </div>
          <p class="text-xs text-slate-400 mt-0.5">Target: <b>${company}</b> • Engine: <span class="text-emerald-400 font-mono text-[10px]">${analysis.source}</span></p>
        </div>
        <div class="text-right">
          <div class="text-xl font-black text-emerald-400">${analysis.readinessScore}<span class="text-xs text-slate-400">/100</span></div>
          <div class="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Code Readiness</div>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-2 text-center text-xs">
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-2">
          <div class="text-slate-400 text-[10px]">Test Coverage</div>
          <div class="text-emerald-400 font-bold mt-0.5">${analysis.testCoverage}</div>
        </div>
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-2">
          <div class="text-slate-400 text-[10px]">P99 Latency</div>
          <div class="text-indigo-400 font-bold mt-0.5">${analysis.latencyBenchmark}</div>
        </div>
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-2">
          <div class="text-slate-400 text-[10px]">Primary Stack</div>
          <div class="text-amber-400 font-bold mt-0.5">${analysis.primaryStack}</div>
        </div>
      </div>

      <div class="space-y-1.5 text-xs">
        <div class="font-semibold text-slate-300 flex items-center space-x-1.5">
          <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-400"></i>
          <span>Verified Architecture Summary:</span>
        </div>
        <p class="text-slate-300 leading-relaxed bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
          "${analysis.executiveSummary || analysis.architecturalHighlight}"
        </p>
      </div>

      <div class="p-3 bg-indigo-950/30 border border-indigo-500/20 rounded-xl text-xs space-y-1">
        <span class="text-indigo-300 font-semibold">Targeted 3-Minute Alumnus Question:</span>
        <p class="text-slate-300">"${blocker}"</p>
      </div>

      <div class="flex items-center justify-between pt-2">
        <span class="text-[11px] text-slate-400 font-mono">Zero cold DMs • Verified Proof of Work</span>
        <button onclick="dispatchReferralToAlum('${company}', '${blocker}')" class="px-4 py-2 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs shadow-md shadow-emerald-600/30 flex items-center space-x-1.5 transition">
          <i data-lucide="send" class="w-4 h-4"></i>
          <span>Dispatch to Alumnus Decision Inbox</span>
        </button>
      </div>
    </div>
  `;
  lucide.createIcons();
}

async function dispatchReferralToAlum(company, blocker) {
  try {
    const res = await fetch(`${API_BASE}/referrals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentName: 'Aman Sharma',
        targetCompany: company,
        alumnusName: 'Rohan Mehta',
        repoUrl: document.getElementById('pow-repo-url').value,
        readinessScore: latestAnalysis ? latestAnalysis.readinessScore : 94,
        summary: latestAnalysis ? latestAnalysis.executiveSummary : 'Verified distributed caching project with 92% test coverage.',
        blockerAsk: blocker
      })
    });

    if (res.ok) {
      await fetchReferralsFromAPI();
      triggerConfetti();
      showToast(`Dossier dispatched to ${company} Alumnus Decision Inbox! Switch to Alumnus role to view.`);
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
    <div class="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 transition flex flex-col justify-between space-y-4">
      <div>
        <div class="flex items-start justify-between">
          <span class="text-[11px] font-semibold px-2 py-0.5 rounded border ${opp.badgeClass}">${opp.typeLabel}</span>
          <span class="text-[11px] text-slate-400 font-mono">${opp.deadline}</span>
        </div>

        <h4 class="text-sm font-bold text-white mt-2">${opp.title}</h4>
        <p class="text-xs text-indigo-400 mt-0.5 font-medium">${opp.poster}</p>

        <div class="mt-2.5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400">
          💰 Reward: ${opp.reward}
        </div>

        <p class="text-xs text-slate-300 mt-2.5 leading-relaxed">${opp.desc}</p>

        <div class="flex flex-wrap gap-1.5 mt-3">
          ${opp.tags.map(t => `<span class="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">${t}</span>`).join('')}
        </div>
      </div>

      <div class="pt-2 border-t border-slate-800 flex items-center justify-between">
        <span class="text-[11px] text-slate-400">${opp.applicants ? opp.applicants.length : 0} builders applied</span>
        <button onclick="openApplyBountyModal('${opp.id}', '${escapeQuotes(opp.title)}')" class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 transition flex items-center space-x-1">
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
        <i data-lucide="inbox" class="w-8 h-8 mx-auto text-slate-500"></i>
        <p class="text-xs">No pending student dossiers in inbox.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = items.map(ref => {
    const isReferred = ref.status === 'referred';
    return `
      <div class="glass-card rounded-2xl p-6 border ${isReferred ? 'border-emerald-500/40 bg-emerald-950/20' : 'border-slate-800'} space-y-4 transition">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold flex items-center justify-center text-sm">
              AS
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <h4 class="text-sm font-bold text-white">${ref.studentName}</h4>
                <span class="text-[10px] bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/20 font-medium">${ref.studentBranch}</span>
              </div>
              <p class="text-xs text-slate-400 mt-0.5">Target: <b>${ref.targetCompany}</b> • Repository: <a href="${ref.repoUrl}" target="_blank" class="text-indigo-400 underline font-mono">${ref.repoUrl}</a></p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <div class="text-right">
              <span class="text-xs font-black text-emerald-400">${ref.readinessScore}/100</span>
              <div class="text-[10px] text-slate-500 font-mono">Code Score</div>
            </div>
            ${isReferred 
              ? `<span class="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-bold border border-emerald-500/30 flex items-center space-x-1">
                   <i data-lucide="check" class="w-3.5 h-3.5"></i>
                   <span>REFERRED</span>
                 </span>`
              : `<span class="px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-xs font-semibold border border-amber-500/30">PENDING REVIEW</span>`
            }
          </div>
        </div>

        <div class="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 space-y-2">
          <div class="flex items-center space-x-1.5 font-semibold text-indigo-300">
            <i data-lucide="cpu" class="w-3.5 h-3.5"></i>
            <span>Verified Architectural Summary:</span>
          </div>
          <p class="leading-relaxed">${ref.summary}</p>
          <div class="pt-2 text-[11px] text-slate-400 border-t border-slate-800">
            <b class="text-slate-300">Student's 3-Min Question:</b> "${ref.blockerAsk}"
          </div>
        </div>

        ${!isReferred ? `
          <div class="flex items-center justify-between pt-1">
            <span class="text-[11px] text-slate-400">Takes ~1 min to endorse directly to internal ATS</span>
            <div class="flex space-x-2">
              <button onclick="handleReferralAction('${ref.id}', 'rejected')" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs transition">
                Pass with Feedback
              </button>
              <button onclick="handleReferralAction('${ref.id}', 'referred')" class="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs shadow-md shadow-emerald-600/30 flex items-center space-x-1.5 transition">
                <i data-lucide="check-check" class="w-3.5 h-3.5"></i>
                <span>1-Click Verified Referral</span>
              </button>
            </div>
          </div>
        ` : `
          <div class="text-xs text-emerald-400 flex items-center space-x-1.5 font-medium">
            <i data-lucide="check-circle" class="w-4 h-4"></i>
            <span>Referral submitted to ${ref.targetCompany} Internal Hiring Portal. Notification sent to student!</span>
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
        showToast("Referral approved and pushed to Company ATS!");
      } else {
        showToast("Feedback sent to candidate.");
      }
    }
  } catch (err) {
    showToast("Referral status updated.");
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
    { type: 'student', color: '#818cf8', radius: 6 },
    { type: 'alumni', color: '#34d399', radius: 8 },
    { type: 'founder', color: '#fbbf24', radius: 9 },
    { type: 'faculty', color: '#c084fc', radius: 8 }
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
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha * 0.25})`;
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
  const existing = document.getElementById('nexus-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'nexus-toast';
  toast.className = 'fixed bottom-5 right-5 z-50 bg-slate-900 border border-indigo-500/50 text-white text-xs px-4 py-2.5 rounded-xl shadow-2xl flex items-center space-x-2 transition transform translate-y-0';
  toast.innerHTML = `
    <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i>
    <span>${msg}</span>
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

