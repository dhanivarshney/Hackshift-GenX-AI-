// NexusIQ — Core Engine & Interactive State Management
// Track 1: Alumni Network & Professional Connections (Building a Network, Not a Directory)

// ================= 1. STATE & PERSONA DATA =================
const PERSONAS = [
  {
    id: 'student',
    roleLabel: 'Student',
    name: 'Aman Sharma',
    avatar: 'AS',
    branch: "B.Tech CSE '26",
    companyOrCollege: 'Apex Institute of Technology',
    bio: "Distributed systems enthusiast • Built Redis caching engine • Solved 280+ LeetCode",
    goal: "Seeking Backend / Distributed Systems SDE Referral",
    activeIntent: "Seeking SDE Referral (Backend / Go)",
    badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
  },
  {
    id: 'alumnus',
    roleLabel: 'Alumnus',
    name: 'Rohan Mehta',
    avatar: 'RM',
    branch: "Batch '20 • SDE-2 Backend",
    companyOrCollege: 'Swiggy',
    bio: "Scaling order routing microservices • Ex-Amazon • Passionate about clean Go code",
    goal: "Hiring 2 Interns for High-Throughput Routing Team",
    activeIntent: "Hiring 2 Interns for MVP / Team",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
  },
  {
    id: 'founder',
    roleLabel: 'Founder',
    name: 'Neha Kapoor',
    avatar: 'NK',
    branch: "Batch '19 • Founder & CEO",
    companyOrCollege: 'HyperScale AI (Y-Combinator W24)',
    bio: "Building autonomous developer tooling • Angel investing in campus builders ($5k - $25k)",
    goal: "Funding Micro-Bounties & Sponsoring Hackathon Squads",
    activeIntent: "Hiring 2 Interns for MVP",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30"
  },
  {
    id: 'faculty',
    roleLabel: 'Faculty',
    name: 'Dr. R.K. Verma',
    avatar: 'RV',
    branch: "Professor & Dean R&D",
    companyOrCollege: 'Apex Institute of Tech',
    bio: "Cloud computing & network security researcher • Published 42 IEEE papers",
    goal: "Connecting 8 Capstone Research Projects with Industry Alum Co-Guides",
    activeIntent: "Seeking Industry Co-Guide for Capstone",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30"
  },
  {
    id: 'recruiter',
    roleLabel: 'Recruiter',
    name: 'Vikram Seth',
    avatar: 'VS',
    branch: "Tech Talent Partner",
    companyOrCollege: 'Razorpay',
    bio: "Hiring 15+ Core Backend Engineers • Looking for verified GitHub proof-of-work",
    goal: "Evaluating Vetted Students with High Alumni Endorsement Scores",
    activeIntent: "Hiring 2 Interns for MVP",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
  },
  {
    id: 'institution',
    roleLabel: 'Institution',
    name: 'Apex Institute of Tech',
    avatar: 'AIT',
    branch: "Dean of Alumni Relations",
    companyOrCollege: 'Central Campus Administration',
    bio: "Transforming 12,000+ Alumni Directory into an Active High-Velocity Network",
    goal: "Monitoring Real Placement Impact, Capstone Co-Mentoring & Bounty Earnings",
    activeIntent: "Monitoring Real Placement Impact",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30"
  }
];

let currentRoleIndex = 0; // Starts as Student (Aman Sharma)

// ================= 2. MATCH RADAR DATA =================
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

// ================= 3. OPPORTUNITY / BOUNTY DATA =================
const OPPORTUNITIES = [
  {
    id: 'opp-1',
    type: 'bounty',
    typeLabel: 'Micro-Bounty',
    badgeClass: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    title: 'Build Distributed Webhook Ingestion Service',
    poster: 'Neha Kapoor (Founder, HyperScale AI • Batch 2019)',
    reward: '₹5,000 + Summer SDE Intern Offer',
    tags: ['Go / Node.js', 'Kafka / Redis', '48hr Delivery'],
    desc: 'We need an idempotent webhook receiver handling 2,000 RPS with automated signature verification. Best code submission gets direct job offer.',
    applicants: 4,
    deadline: '2 Days Left'
  },
  {
    id: 'opp-2',
    type: 'referral',
    typeLabel: 'Referral Radar',
    badgeClass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    title: 'Swiggy Backend SDE-1 / Intern Referral Pool',
    poster: 'Rohan Mehta (SDE-2 Backend • Batch 2020)',
    reward: 'Direct Interview Call from Swiggy Recruiting',
    tags: ['Go / Java', 'Distributed Caching', 'LeetCode 1800+'],
    desc: 'My team is expanding our real-time order matching infra. Submit your GitHub project with concurrency handling for a warm internal referral.',
    applicants: 12,
    deadline: '3 Referral Slots Left'
  },
  {
    id: 'opp-3',
    type: 'capstone',
    typeLabel: 'Industry Capstone',
    badgeClass: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    title: 'Autonomous Edge Kubernetes Autoscaler',
    poster: 'Aditi Rao (Google) & Dr. R.K. Verma (Dean R&D)',
    reward: 'IEEE Conference Paper + Cloud Credits ($1,000)',
    tags: ['Kubernetes', 'Python', 'Edge Computing'],
    desc: 'Joint research capstone project between Apex Institute and Google Cloud mentors. Co-author an IEEE paper with production validation.',
    applicants: 3,
    deadline: 'Final Year CSE / IT Only'
  },
  {
    id: 'opp-4',
    type: 'bounty',
    typeLabel: 'Hackathon Squad Sponsorship',
    badgeClass: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    title: 'Smart India Hackathon Squad Travel & Cloud Grant',
    poster: 'Alumni Tech Angels Syndicate (5 Alumni Backers)',
    reward: '₹20,000 Travel Grant + AWS Credits',
    tags: ['Team of 4-6', 'Hackathon Finalists', 'Pitch Deck'],
    desc: 'Alumni syndicate sponsoring top 3 campus teams traveling to national hackathon finals. Mentorship included prior to the grand finale.',
    applicants: 8,
    deadline: 'Closes Sunday'
  }
];

// ================= 4. INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  renderRolePills();
  renderRadarCards(MATCH_RADAR_ITEMS);
  renderBounties(OPPORTUNITIES);
  setupLineageCanvas();
  lucide.createIcons();
});

// ================= 5. ROLE SWITCHER SYSTEM =================
function renderRolePills() {
  const container = document.getElementById('role-pill-container');
  const mobileContainer = document.getElementById('mobile-role-pills');
  
  let html = '';
  PERSONAS.forEach((p, idx) => {
    const isSelected = idx === currentRoleIndex;
    const activeClass = isSelected
      ? 'bg-indigo-600 text-white font-bold shadow-sm'
      : 'text-slate-400 hover:text-white hover:bg-slate-800';
    html += `
      <button onclick="switchRole(${idx})" class="px-2.5 py-1 rounded-lg transition text-xs whitespace-nowrap ${activeClass}">
        ${p.roleLabel}
      </button>
    `;
  });

  if (container) container.innerHTML = html;
  if (mobileContainer) mobileContainer.innerHTML = html;
}

function switchRole(index) {
  currentRoleIndex = index;
  const p = PERSONAS[index];

  // Update Hero elements
  document.getElementById('hero-avatar').textContent = p.avatar;
  document.getElementById('hero-name').textContent = p.name;
  document.getElementById('hero-tag').textContent = `${p.roleLabel} (${p.branch})`;
  document.getElementById('hero-bio').textContent = p.bio;
  document.getElementById('hero-goal').innerHTML = `<i data-lucide="target" class="w-3.5 h-3.5"></i><span>${p.goal}</span>`;

  // Update Active Intent badge
  document.getElementById('active-intent-text').textContent = p.activeIntent;

  renderRolePills();
  lucide.createIcons();

  // If Alumnus is selected, give a smart toast
  if (p.id === 'alumnus') {
    showToast(`Switched to Alumnus View (Rohan @ Swiggy). Referral inbox active!`);
  } else if (p.id === 'founder') {
    showToast(`Switched to Founder View (Neha @ HyperScale). Micro-bounties live!`);
  } else if (p.id === 'institution') {
    showToast(`Switched to Institution Portal (Dean Sharma). Impact dashboard ready.`);
  }
}

// ================= 6. NAVIGATION TABS =================
function switchTab(tabId) {
  const views = ['intent-radar', 'proof-of-work', 'bounties', 'network-graph', 'institution'];
  
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
  }
  lucide.createIcons();
}

// ================= 7. MATCH RADAR RENDERING =================
function renderRadarCards(items) {
  const container = document.getElementById('radar-cards-container');
  if (!container) return;

  container.innerHTML = items.map(item => `
    <div class="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 transition flex flex-col justify-between space-y-4">
      <div>
        <!-- Top row: Avatar + Match Score -->
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

        <!-- Intent Badge -->
        <div class="mt-3.5 inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs">
          <i data-lucide="zap" class="w-3.5 h-3.5 text-indigo-400"></i>
          <span class="font-semibold">${item.intentBadge}</span>
        </div>

        <!-- Description -->
        <p class="text-xs text-slate-300 mt-2.5 line-clamp-2">${item.intentDesc}</p>

        <!-- Technical Synergy Box -->
        <div class="mt-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400">
          <span class="text-indigo-400 font-semibold">Why you match:</span> ${item.synergy}
        </div>
      </div>

      <!-- Action Button -->
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
    showToast("Navigated to Proof-of-Work Pitch Lab with target pre-selected!");
  } else if (actionType === 'bounty') {
    switchTab('bounties');
    showToast("Opening live Bounty Board...");
  } else if (actionType === 'capstone') {
    showToast("Capstone inquiry dispatched to Faculty Dr. Verma & Google Alum!");
    triggerConfetti();
  }
}

// ================= 8. PROOF-OF-WORK DOSSIER GENERATOR =================
function generateProofOfWorkDossier() {
  const company = document.getElementById('pow-target-company').value;
  const repo = document.getElementById('pow-repo-url').value;
  const blocker = document.getElementById('pow-blocker').value || "Optimizing Redis caching cluster eviction latency under 10k concurrent requests.";

  const btn = document.getElementById('btn-generate-pow');
  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Analyzing Repository & Architecture...</span>`;
  lucide.createIcons();

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4"></i><span>Analyze Code & Generate Dossier</span>`;

    const outputEl = document.getElementById('pow-card-content');
    outputEl.innerHTML = `
      <div class="bg-slate-950 border border-indigo-500/30 rounded-2xl p-5 space-y-4 glow-indigo">
        
        <!-- Header -->
        <div class="flex items-start justify-between border-b border-slate-800/80 pb-3">
          <div>
            <div class="flex items-center space-x-2">
              <span class="text-sm font-bold text-white">Aman Sharma</span>
              <span class="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30 font-medium">Verified Student</span>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">Target: <b>${company}</b> • Repository: <span class="font-mono text-indigo-400">${repo}</span></p>
          </div>
          <div class="text-right">
            <div class="text-xl font-black text-emerald-400">94<span class="text-xs text-slate-400">/100</span></div>
            <div class="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Code Readiness</div>
          </div>
        </div>

        <!-- Technical Metrics Grid -->
        <div class="grid grid-cols-3 gap-2 text-center text-xs">
          <div class="bg-slate-900 border border-slate-800 rounded-xl p-2">
            <div class="text-slate-400 text-[10px]">Test Coverage</div>
            <div class="text-emerald-400 font-bold mt-0.5">92.4% Unit Tests</div>
          </div>
          <div class="bg-slate-900 border border-slate-800 rounded-xl p-2">
            <div class="text-slate-400 text-[10px]">P99 Latency</div>
            <div class="text-indigo-400 font-bold mt-0.5">14ms Benchmark</div>
          </div>
          <div class="bg-slate-900 border border-slate-800 rounded-xl p-2">
            <div class="text-slate-400 text-[10px]">Architecture</div>
            <div class="text-amber-400 font-bold mt-0.5">Go + Redis Cluster</div>
          </div>
        </div>

        <!-- Synthesized 1-Minute Executive Summary -->
        <div class="space-y-1.5 text-xs">
          <div class="font-semibold text-slate-300 flex items-center space-x-1.5">
            <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-400"></i>
            <span>Executive Code Summary:</span>
          </div>
          <p class="text-slate-300 leading-relaxed bg-slate-900/60 border border-slate-850 p-3 rounded-xl">
            "Candidate implemented custom consistent-hashing ring in Go to distribute cache keys across 5 Redis nodes. Successfully handled graceful node failure recovery with 0 memory leaks in profiling."
          </p>
        </div>

        <!-- Specific Blocker Ask -->
        <div class="p-3 bg-indigo-950/30 border border-indigo-500/20 rounded-xl text-xs space-y-1">
          <span class="text-indigo-300 font-semibold">Targeted 3-Minute Alumnus Question:</span>
          <p class="text-slate-300">"${blocker}"</p>
        </div>

        <!-- Alumnus Action Buttons -->
        <div class="flex items-center justify-between pt-2">
          <span class="text-[11px] text-slate-400 font-mono">No cold-DM spam • Direct proof of ability</span>
          <div class="flex space-x-2">
            <button onclick="openModal('modal-referral')" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs shadow-md shadow-emerald-600/30 flex items-center space-x-1.5 transition">
              <i data-lucide="check-check" class="w-4 h-4"></i>
              <span>1-Click Verified Referral</span>
            </button>
          </div>
        </div>

      </div>
    `;
    lucide.createIcons();
    triggerConfetti();
    showToast("Proof-of-Work Dossier generated with 94/100 code readiness!");
  }, 1200);
}

// ================= 9. BOUNTIES & OPPORTUNITIES =================
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
        <span class="text-[11px] text-slate-400">${opp.applicants} students applied</span>
        <button onclick="applyToOpportunity('${opp.title}')" class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 transition flex items-center space-x-1">
          <i data-lucide="send" class="w-3.5 h-3.5"></i>
          <span>Apply with Proof-of-Work</span>
        </button>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

function applyToOpportunity(title) {
  showToast(`Application with your GitHub Dossier submitted for "${title}"!`);
  triggerConfetti();
}

function openPostBountyModal() {
  showToast("Alumni/Founders can fund bounties with direct escrow balance.");
}

// ================= 10. CAMPUS LINEAGE CANVAS SIMULATION =================
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

  // Generate 24 nodes of different entity types
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

    // Draw connection lines between nearby nodes
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

    // Update & draw nodes
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

// ================= 11. MODAL HELPERS =================
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}

function confirmReferralAction() {
  closeModal('modal-referral');
  triggerConfetti();
  showToast("Referral successfully confirmed and dispatched to Swiggy Internal ATS!");
}

function openChangeIntentModal() {
  openModal('modal-intent');
}

function saveActiveIntent() {
  const selected = document.querySelector('input[name="intent-choice"]:checked');
  if (selected) {
    document.getElementById('active-intent-text').textContent = selected.value;
    PERSONAS[currentRoleIndex].activeIntent = selected.value;
    closeModal('modal-intent');
    showToast(`Active Intent updated to: "${selected.value}"`);
  }
}

// ================= 12. UTILITIES: TOAST & CONFETTI =================
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
