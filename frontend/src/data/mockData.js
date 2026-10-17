// LinkX — Master Mock Data Store & Semantic Graph Definitions
// Track 1: Alumni Network & Professional Connections (Building a Network, Not a Directory)

export const MASTER_PERSONAS = [
  {
    id: 'student',
    roleLabel: 'Student',
    portalTitle: 'Student Portal',
    name: 'Aman Sharma',
    avatar: 'AS',
    branch: "B.Tech CSE '26",
    companyOrCollege: 'Apex Institute of Technology',
    institutionId: 'apex',
    bio: "Distributed systems enthusiast • Built Redis caching engine • Solved 280+ LeetCode",
    goal: "Seeking Backend / Distributed Systems SDE Referral",
    activeIntent: "Seeking SDE Referral (Backend / Go)",
    icon: 'GraduationCap',
    accentColor: 'indigo',
    badges: ['Placement Hero Candidate', 'Code Craftsperson', 'Fast Responder'],
    streak: 12,
    karma: 840,
    stats: {
      bountiesCompleted: 3,
      verifiedDossiers: 4,
      referralInterviews: 2
    }
  },
  {
    id: 'alumnus',
    roleLabel: 'Alumnus',
    portalTitle: 'Alumni Portal',
    name: 'Rohan Mehta',
    avatar: 'RM',
    branch: "Batch '20 • SDE-2 Backend",
    companyOrCollege: 'Swiggy',
    institutionId: 'apex',
    bio: "Scaling order routing microservices • Ex-Amazon • Passionate about clean Go code",
    goal: "Hiring 2 Interns for High-Throughput Routing Team",
    activeIntent: "Hiring 2 Interns for Team",
    icon: 'Briefcase',
    accentColor: 'emerald',
    badges: ['Mentor Guru', 'Placement Hero', '1-Min Reviewer'],
    streak: 28,
    karma: 2450,
    stats: {
      referralsPushed: 14,
      bountiesSponsored: 4,
      codeReviewsGiven: 32
    }
  },
  {
    id: 'founder',
    roleLabel: 'Founder',
    portalTitle: 'Founder Portal',
    name: 'Neha Kapoor',
    avatar: 'NK',
    branch: "Batch '19 • Founder & CEO",
    companyOrCollege: 'HyperScale AI (YC W24)',
    institutionId: 'apex',
    bio: "Building autonomous developer tooling • Angel investing in campus builders ($5k - $25k)",
    goal: "Funding Micro-Bounties & Sponsoring Hackathon Squads",
    activeIntent: "Funding Campus Bounties & Startups",
    icon: 'Rocket',
    accentColor: 'amber',
    badges: ['Startup Connector', 'Top Angel Sponsor', 'Hackathon Patron'],
    streak: 45,
    karma: 4120,
    stats: {
      bountiesFunded: 9,
      campusBuildersHired: 5,
      grantDisbursed: '₹3.5 Lakh'
    }
  },
  {
    id: 'faculty',
    roleLabel: 'Faculty',
    portalTitle: 'Faculty Portal',
    name: 'Dr. R.K. Verma',
    avatar: 'RV',
    branch: "Professor & Dean R&D",
    companyOrCollege: 'Apex Institute of Tech',
    institutionId: 'apex',
    bio: "Cloud computing & network security researcher • Published 42 IEEE papers",
    goal: "Connecting 8 Capstone Research Projects with Industry Alum Co-Guides",
    activeIntent: "Seeking Industry Co-Guide for Capstone",
    icon: 'BookOpen',
    accentColor: 'purple',
    badges: ['Research Luminary', 'Capstone Champion', 'Patent Mentor'],
    streak: 19,
    karma: 3190,
    stats: {
      capstonesMentored: 18,
      patentsFiled: 6,
      industryAlumPartners: 22
    }
  },
  {
    id: 'recruiter',
    roleLabel: 'Recruiter',
    portalTitle: 'Recruiter Radar',
    name: 'Vikram Seth',
    avatar: 'VS',
    branch: "Tech Talent Partner",
    companyOrCollege: 'Razorpay',
    institutionId: 'apex',
    bio: "Hiring 15+ Core Backend Engineers • Looking for verified GitHub proof-of-work",
    goal: "Evaluating Vetted Students with High Alumni Endorsement Scores",
    activeIntent: "Hiring Top 5% Builders",
    icon: 'Target',
    accentColor: 'cyan',
    badges: ['Direct Interview Fast-Track', 'Campus Talent Scout', 'Placement Hero'],
    streak: 8,
    karma: 1890,
    stats: {
      campusHiresMade: 26,
      fastTrackInterviews: 48,
      averageTimeToOffer: '4 days'
    }
  },
  {
    id: 'institution',
    roleLabel: 'Institution',
    portalTitle: 'Institution Command',
    name: 'Dean Sharma',
    avatar: 'DS',
    branch: "Dean of Alumni Relations",
    companyOrCollege: 'Apex Central Campus Administration',
    institutionId: 'apex',
    bio: "Transforming 12,000+ Alumni Directory into an Active High-Velocity Network",
    goal: "Monitoring Real Placement Impact, Capstone Co-Mentoring & Bounty Earnings",
    activeIntent: "Monitoring Real Placement Impact",
    icon: 'Landmark',
    accentColor: 'rose',
    badges: ['Network Architect', 'Campus Catalyst', 'Lifelong Mentor'],
    streak: 60,
    karma: 5600,
    stats: {
      activeNetworkMembers: 4820,
      placementLift: '+34%',
      alumniEndowedBounties: '₹12.4 Lakh'
    }
  }
];

export const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Feeds', icon: 'Sparkles', color: 'indigo' },
  { id: 'mentorship', label: 'Mentorship', icon: 'Compass', color: 'purple' },
  { id: 'jobs', label: 'Jobs & Referrals', icon: 'Briefcase', color: 'emerald' },
  { id: 'startup', label: 'Startup Ideas', icon: 'Lightbulb', color: 'amber' },
  { id: 'events', label: 'Events & Meetups', icon: 'Calendar', color: 'rose' }
];

export const DASHBOARD_POSTS = [
  {
    id: 'post-1',
    author: 'Rohan Mehta',
    authorRole: 'Alumnus • SDE-2 @ Swiggy',
    authorAvatar: 'RM',
    authorColor: 'emerald',
    institution: 'Apex Institute of Technology',
    category: 'jobs',
    title: 'Hiring 2 Junior SDEs for Order Routing Team (Go / Distributed Systems)',
    content: "Our team at Swiggy is scaling dispatch algorithms handling 120k orders/min during peak lunch hour. Looking for 2 juniors from Apex who actually understand concurrent channels, Redis pipelines, or p99 tail latency. Please submit your GitHub repo through the Proof-of-Work lab — zero cold messages, immediate ATS fast-track if readiness score > 88.",
    intentBadge: 'Direct ATS Fast-Track (2 Open Slots)',
    tags: ['Golang', 'Distributed Systems', 'Redis', 'High Throughput'],
    timestamp: '2 hours ago',
    upvotes: 42,
    commentsCount: 9,
    proofOfWorkRequired: true,
    userHasUpvoted: false,
    targetRoles: ['student', 'alumnus', 'recruiter']
  },
  {
    id: 'post-2',
    author: 'Neha Kapoor',
    authorRole: 'Founder @ HyperScale AI (YC W24)',
    authorAvatar: 'NK',
    authorColor: 'amber',
    institution: 'Apex Institute of Technology',
    category: 'startup',
    title: 'Campus Hackathon Bounty: ₹15,000 for Best LLM Streaming Evaluation Widget',
    content: "We're sponsoring a micro-grant for campus developers. Build an ultra-responsive Next.js + Tailwind streaming evaluation widget that benchmarks latency across Anthropic, Gemini, and OpenAI API endpoints. Winner receives ₹15,000 cash grant + direct invite to interview for paid summer fellowship at our Bangalore incubator.",
    intentBadge: '₹15,000 Cash Grant + Fellowship',
    tags: ['Next.js', 'LLMs', 'TailwindCSS', 'Bounty'],
    timestamp: '5 hours ago',
    upvotes: 68,
    commentsCount: 18,
    proofOfWorkRequired: true,
    userHasUpvoted: true,
    targetRoles: ['student', 'founder', 'faculty']
  },
  {
    id: 'post-3',
    author: 'Aditi Rao',
    authorRole: 'Senior Cloud Architect @ Google Cloud',
    authorAvatar: 'AR',
    authorColor: 'indigo',
    institution: 'Apex Institute of Technology',
    category: 'mentorship',
    title: 'Offering 15-Minute System Design Flash Reviews for Final-Year Students',
    content: "Reviewing 4 architecture diagrams this Saturday. If you are building a capstone or personal project dealing with distributed consensus, Kubernetes operators, or event sourcing, package your architecture summary through the Proof-of-Work Lab. I will record a personalized 5-minute Loom with production refactoring tips and direct referrals to Google Cloud teams.",
    intentBadge: '4 / 4 Slots Open for Saturday',
    tags: ['System Design', 'GCP', 'Architecture', 'Mentorship'],
    timestamp: '8 hours ago',
    upvotes: 89,
    commentsCount: 24,
    proofOfWorkRequired: true,
    userHasUpvoted: false,
    targetRoles: ['student', 'faculty', 'alumnus']
  },
  {
    id: 'post-4',
    author: 'Dr. R.K. Verma',
    authorRole: 'Dean R&D @ Apex Institute',
    authorAvatar: 'RV',
    authorColor: 'purple',
    institution: 'Apex Institute of Technology',
    category: 'mentorship',
    title: 'Seeking Industry Co-Guides: 6 Capstone Research Papers on Edge AI & Robotics',
    content: "We have selected the top 6 undergraduate research proposals spanning edge computer vision and federated telemetry. Calling alumni currently working in autonomous systems, Qualcomm, NVIDIA, or Tesla to join as industry co-guides. Your guidance directly co-authors IEEE/ACM submissions and bridges academia with production robotics.",
    intentBadge: 'Industry-Academic Research Synergy',
    tags: ['Edge AI', 'Research Capstone', 'IEEE', 'Robotics'],
    timestamp: '1 day ago',
    upvotes: 54,
    commentsCount: 11,
    proofOfWorkRequired: false,
    userHasUpvoted: false,
    targetRoles: ['faculty', 'alumnus', 'institution']
  },
  {
    id: 'post-5',
    author: 'Vikram Seth',
    authorRole: 'Tech Talent Partner @ Razorpay',
    authorAvatar: 'VS',
    authorColor: 'cyan',
    institution: 'Apex Institute of Technology',
    category: 'jobs',
    title: 'Razorpay Campus Radar: Priority Hiring for Candidates with High Alum Endorsements',
    content: "Razorpay is opening an exclusive campus sprint for Apex students who hold at least one verified Proof-of-Work endorsement from an alumnus. We skip the generic aptitude test round entirely and proceed straight to the technical system pairing round. View the job cards in the Opportunity Exchange to apply.",
    intentBadge: 'Skip Round 1 Screening',
    tags: ['Fintech', 'Core Backend', 'Golang', 'FastTrack'],
    timestamp: '1 day ago',
    upvotes: 112,
    commentsCount: 31,
    proofOfWorkRequired: true,
    userHasUpvoted: false,
    targetRoles: ['student', 'recruiter', 'institution']
  },
  {
    id: 'post-6',
    author: 'Dean Sharma',
    authorRole: 'Dean Alumni Relations',
    authorAvatar: 'DS',
    authorColor: 'rose',
    institution: 'Apex Institute of Technology',
    category: 'events',
    title: 'Annual Apex Global Alumni Founder & Tech Summit 2026 Announced',
    content: "Mark your calendars for November 14th! Featuring keynotes from 18 alumni founders, a ₹50 Lakh campus startup demo day, and hands-on system architecture teardowns with engineers from London, San Francisco, and Bangalore. Free physical + virtual passes for verified network members.",
    intentBadge: 'Physical + Hybrid Global Summit',
    tags: ['Summit', 'Alumni Reunion', 'Demo Day', 'Fundraising'],
    timestamp: '2 days ago',
    upvotes: 145,
    commentsCount: 42,
    proofOfWorkRequired: false,
    userHasUpvoted: true,
    targetRoles: ['student', 'alumnus', 'founder', 'faculty', 'recruiter', 'institution']
  }
];

export const INSTITUTIONS_DATA = [
  {
    id: 'apex',
    name: 'Apex Institute of Technology',
    location: 'Bangalore, India',
    badge: 'Flagship Network Node #01',
    motto: 'Transforming Campus Intelligence into High-Velocity Network Capital',
    accentColor: 'indigo',
    glowClass: 'glow-indigo',
    status: 'Active Node: 48 Live Connections',
    impactMetrics: {
      activeNetworkSize: '4,820',
      networkLift: '+34% vs Static Directories',
      verifiedWarmReferrals: '342',
      referralConversion: '89% conversion to interview',
      studentBountyEarnings: '₹4.2 Lakh',
      disbursementType: 'Instant Escrow to Students',
      industryCapstoneProjects: '64',
      capstoneCoMentors: 'Faculty & Alum Co-Guides'
    },
    alumniHighlights: [
      {
        name: 'Rohan Mehta',
        batch: "Batch '20",
        role: 'SDE-2 Backend',
        company: 'Swiggy',
        avatar: 'RM',
        accent: 'emerald',
        quote: 'Referred 14 students who passed GitHub readiness benchmarks. 100% passed phone screen.'
      },
      {
        name: 'Neha Kapoor',
        batch: "Batch '19",
        role: 'Founder & CEO',
        company: 'HyperScale AI (YC W24)',
        avatar: 'NK',
        accent: 'amber',
        quote: 'Hired 3 interns through campus micro-bounties without going through external job boards.'
      },
      {
        name: 'Aditi Rao',
        batch: "Batch '17",
        role: 'Senior Cloud Architect',
        company: 'Google Cloud',
        avatar: 'AR',
        accent: 'purple',
        quote: 'Co-mentored 4 IEEE research papers on distributed edge computing with Dr. Verma.'
      },
      {
        name: 'Kunal Varma',
        batch: "Batch '18",
        role: 'Senior Platform Engineer',
        company: 'Atlassian',
        avatar: 'KV',
        accent: 'blue',
        quote: 'Host bi-weekly system architecture mock interviews for final-year candidates.'
      }
    ],
    recruiters: [
      { name: 'Razorpay', activeJobs: 8, fastTrack: true, logoText: 'RP' },
      { name: 'Swiggy', activeJobs: 4, fastTrack: true, logoText: 'SW' },
      { name: 'Google Cloud', activeJobs: 6, fastTrack: true, logoText: 'GC' },
      { name: 'Atlassian', activeJobs: 3, fastTrack: false, logoText: 'AT' },
      { name: 'HyperScale AI', activeJobs: 2, fastTrack: true, logoText: 'HA' }
    ],
    upcomingEvents: [
      {
        title: 'System Design Flash Teardown with Swiggy SDEs',
        date: 'Oct 24, 2026 • 6:00 PM IST',
        type: 'Virtual Workshop',
        spotsLeft: '14 spots left'
      },
      {
        title: 'Apex Campus Incubator Pitch Demo Day',
        date: 'Nov 02, 2026 • 2:00 PM IST',
        type: 'Campus Auditorium & Live Stream',
        spotsLeft: 'Open Registration'
      },
      {
        title: 'Alumni-Faculty Capstone Co-Guidance Matchmaking',
        date: 'Nov 10, 2026 • 4:30 PM IST',
        type: 'Hybrid Roundtable',
        spotsLeft: '8 Faculty Squads'
      }
    ]
  },
  {
    id: 'stanford',
    name: 'Stanford Engineering Node',
    location: 'Palo Alto, California',
    badge: 'Silicon Valley Partner Node',
    motto: 'Accelerating Deep Tech Venturing & High-Consequence Research',
    accentColor: 'rose',
    glowClass: 'glow-rose',
    status: 'Active Node: 32 Live Connections',
    impactMetrics: {
      activeNetworkSize: '3,210',
      networkLift: '+41% cross-campus collaboration',
      verifiedWarmReferrals: '280',
      referralConversion: '94% conversion to interview',
      studentBountyEarnings: '$64,000',
      disbursementType: 'Stripe Direct Escrow',
      industryCapstoneProjects: '48',
      capstoneCoMentors: 'Sand Hill Road Founders'
    },
    alumniHighlights: [
      {
        name: 'David Chen',
        batch: "MS '21",
        role: 'Staff ML Engineer',
        company: 'Anthropic',
        avatar: 'DC',
        accent: 'rose',
        quote: 'Sponsored 4 student bounties on interpretability benchmarks.'
      },
      {
        name: 'Elena Rostova',
        batch: "BS '22",
        role: 'Partner',
        company: 'Sequoia Capital',
        avatar: 'ER',
        accent: 'emerald',
        quote: 'Regularly review pitch decks packaged directly by student builders.'
      }
    ],
    recruiters: [
      { name: 'Anthropic', activeJobs: 5, fastTrack: true, logoText: 'AN' },
      { name: 'OpenAI', activeJobs: 4, fastTrack: true, logoText: 'OA' },
      { name: 'Stripe', activeJobs: 7, fastTrack: true, logoText: 'ST' }
    ],
    upcomingEvents: [
      {
        title: 'Silicon Valley Founders & Alumni Dinner',
        date: 'Nov 18, 2026 • 7:00 PM PST',
        type: 'In-Person Palo Alto',
        spotsLeft: '22 spots'
      }
    ]
  },
  {
    id: 'iitb',
    name: 'IIT Bombay Tech Hub',
    location: 'Mumbai, India',
    badge: 'National Innovation Node #03',
    motto: 'Pioneering Sovereign AI, Embedded Hardware & Quantum Algorithms',
    accentColor: 'emerald',
    glowClass: 'glow-emerald',
    status: 'Active Node: 56 Live Connections',
    impactMetrics: {
      activeNetworkSize: '5,400',
      networkLift: '+29% placement acceleration',
      verifiedWarmReferrals: '410',
      referralConversion: '91% conversion to interview',
      studentBountyEarnings: '₹6.8 Lakh',
      disbursementType: 'UPI Instant Escrow',
      industryCapstoneProjects: '82',
      capstoneCoMentors: 'ISRO, DRDO & Global Tech'
    },
    alumniHighlights: [
      {
        name: 'Pooja Iyer',
        batch: "Batch '18",
        role: 'Director of Robotics',
        company: 'Agility Robotics',
        avatar: 'PI',
        accent: 'cyan',
        quote: 'Connected 12 dual-degree theses with robotics testing hardware.'
      }
    ],
    recruiters: [
      { name: 'Texas Instruments', activeJobs: 9, fastTrack: true, logoText: 'TI' },
      { name: 'Qualcomm', activeJobs: 6, fastTrack: true, logoText: 'QC' },
      { name: 'Google Research', activeJobs: 5, fastTrack: true, logoText: 'GR' }
    ],
    upcomingEvents: [
      {
        title: 'Hardware & Quantum Tech Demo Showcase',
        date: 'Dec 04, 2026 • 10:00 AM IST',
        type: 'Powai Campus',
        spotsLeft: '50 Registrations'
      }
    ]
  }
];

export const GRAPH_DATA = {
  institutions: [
    {
      id: 'inst-apex',
      label: 'Apex Institute of Technology',
      short: 'Apex Node',
      type: 'institution',
      x: 350,
      y: 250,
      radius: 42,
      color: '#6366f1',
      glow: 'rgba(99, 102, 241, 0.6)',
      membersCount: 4820,
      activeBounties: 12,
      stats: '4,820 Active Nodes • 342 Referrals'
    },
    {
      id: 'inst-stanford',
      label: 'Stanford Engineering Node',
      short: 'Stanford Node',
      type: 'institution',
      x: 720,
      y: 160,
      radius: 36,
      color: '#f43f5e',
      glow: 'rgba(244, 63, 94, 0.6)',
      membersCount: 3210,
      activeBounties: 8,
      stats: '3,210 Active Nodes • 280 Referrals'
    },
    {
      id: 'inst-iitb',
      label: 'IIT Bombay Tech Hub',
      short: 'IIT-B Hub',
      type: 'institution',
      x: 580,
      y: 420,
      radius: 38,
      color: '#10b981',
      glow: 'rgba(16, 185, 129, 0.6)',
      membersCount: 5400,
      activeBounties: 15,
      stats: '5,400 Active Nodes • 410 Referrals'
    }
  ],
  people: [
    {
      id: 'p-aman',
      name: 'Aman Sharma',
      role: 'Student (CSE 26)',
      type: 'student',
      color: '#818cf8',
      radius: 18,
      institutionId: 'inst-apex',
      initialX: 240,
      initialY: 170,
      readinessScore: 94,
      intent: 'Seeking Go SDE Referral',
      synergy: 'Matches Swiggy routing stack'
    },
    {
      id: 'p-rohan',
      name: 'Rohan Mehta',
      role: 'Alumnus (Swiggy)',
      type: 'alumnus',
      color: '#34d399',
      radius: 20,
      institutionId: 'inst-apex',
      initialX: 220,
      initialY: 340,
      readinessScore: 99,
      intent: 'Hiring 2 Interns',
      synergy: 'Active ATS Fast-Track'
    },
    {
      id: 'p-neha',
      name: 'Neha Kapoor',
      role: 'Founder (YC W24)',
      type: 'founder',
      color: '#fbbf24',
      radius: 21,
      institutionId: 'inst-apex',
      initialX: 470,
      initialY: 130,
      readinessScore: 98,
      intent: 'Funding ₹15k Bounties',
      synergy: 'Angel sponsor'
    },
    {
      id: 'p-verma',
      name: 'Dr. R.K. Verma',
      role: 'Faculty Dean',
      type: 'faculty',
      color: '#c084fc',
      radius: 19,
      institutionId: 'inst-apex',
      initialX: 430,
      initialY: 360,
      readinessScore: 96,
      intent: 'Seeking Co-Guides for Capstones',
      synergy: '6 IEEE research papers'
    },
    {
      id: 'p-vikram',
      name: 'Vikram Seth',
      role: 'Recruiter (Razorpay)',
      type: 'recruiter',
      color: '#22d3ee',
      radius: 19,
      institutionId: 'inst-apex',
      initialX: 180,
      initialY: 250,
      readinessScore: 95,
      intent: 'Campus Talent Scout',
      synergy: 'Skip Round 1 Coding'
    },
    {
      id: 'p-aditi',
      name: 'Aditi Rao',
      role: 'Alumnus (Google)',
      type: 'alumnus',
      color: '#34d399',
      radius: 20,
      institutionId: 'inst-apex',
      initialX: 520,
      initialY: 260,
      readinessScore: 97,
      intent: 'Capstone Co-Mentor',
      synergy: 'GCP Edge Architecture'
    },
    {
      id: 'p-david',
      name: 'David Chen',
      role: 'Alumnus (Anthropic)',
      type: 'alumnus',
      color: '#f43f5e',
      radius: 18,
      institutionId: 'inst-stanford',
      initialX: 840,
      initialY: 120,
      readinessScore: 98,
      intent: 'LLM Bounties',
      synergy: 'Interpretability Labs'
    },
    {
      id: 'p-elena',
      name: 'Elena Rostova',
      role: 'Founder & VC',
      type: 'founder',
      color: '#fbbf24',
      radius: 18,
      institutionId: 'inst-stanford',
      initialX: 780,
      initialY: 260,
      readinessScore: 95,
      intent: 'Seed Grants ($10k)',
      synergy: 'Deep Tech Syndicate'
    },
    {
      id: 'p-pooja',
      name: 'Pooja Iyer',
      role: 'Director (Agility)',
      type: 'alumnus',
      color: '#10b981',
      radius: 19,
      institutionId: 'inst-iitb',
      initialX: 680,
      initialY: 480,
      readinessScore: 96,
      intent: 'Robotics Hardware Grants',
      synergy: 'Embedded Control'
    },
    {
      id: 'p-kunal',
      name: 'Kunal Varma',
      role: 'Platform Eng (Atlassian)',
      type: 'alumnus',
      color: '#34d399',
      radius: 17,
      institutionId: 'inst-apex',
      initialX: 300,
      initialY: 410,
      readinessScore: 94,
      intent: 'System Design Mock Reviews',
      synergy: 'Mentorship'
    }
  ],
  edges: [
    {
      source: 'inst-apex',
      target: 'p-aman',
      type: 'affiliation',
      label: 'Enrolled CSE 26',
      color: '#6366f1',
      width: 2
    },
    {
      source: 'inst-apex',
      target: 'p-rohan',
      type: 'affiliation',
      label: 'Batch 2020 Alum',
      color: '#6366f1',
      width: 2
    },
    {
      source: 'inst-apex',
      target: 'p-neha',
      type: 'affiliation',
      label: 'Batch 2019 Alum',
      color: '#6366f1',
      width: 2
    },
    {
      source: 'inst-apex',
      target: 'p-verma',
      type: 'affiliation',
      label: 'Dean R&D Faculty',
      color: '#6366f1',
      width: 2
    },
    {
      source: 'p-aman',
      target: 'p-rohan',
      type: 'referral',
      label: 'Verified Proof-of-Work Referral',
      color: '#10b981',
      width: 3.5,
      details: 'Redis Engine analyzed: 94/100 code readiness. Pushed to Swiggy internal ATS.'
    },
    {
      source: 'p-neha',
      target: 'p-aman',
      type: 'bounty',
      label: '₹15,000 Next.js Bounty Claim',
      color: '#f59e0b',
      width: 3,
      details: 'Aman submitted streaming DAG visualizer repo for HyperScale AI incubator.'
    },
    {
      source: 'p-aditi',
      target: 'p-verma',
      type: 'collaboration',
      label: 'IEEE Edge Research Co-Guidance',
      color: '#a855f7',
      width: 3,
      details: 'Joint research on Kubernetes edge telemetry published at IEEE Cloud 2026.'
    },
    {
      source: 'p-vikram',
      target: 'inst-apex',
      type: 'recruitment',
      label: 'Razorpay Fast-Track Radar',
      color: '#06b6d4',
      width: 2.5,
      details: 'Direct pipeline bypassing Round 1 coding tests for vetted students.'
    },
    {
      source: 'inst-apex',
      target: 'inst-stanford',
      type: 'collaboration',
      label: 'Cross-Campus DeepTech Consortium',
      color: '#ec4899',
      width: 2,
      details: 'Joint AI benchmark exchange between Apex students and Stanford lab.'
    },
    {
      source: 'p-david',
      target: 'inst-stanford',
      type: 'affiliation',
      label: 'Stanford MS Alum',
      color: '#f43f5e',
      width: 2
    },
    {
      source: 'p-pooja',
      target: 'inst-iitb',
      type: 'affiliation',
      label: 'IIT-B B.Tech Alum',
      color: '#10b981',
      width: 2
    },
    {
      source: 'inst-iitb',
      target: 'inst-apex',
      type: 'collaboration',
      label: 'National Research Grid',
      color: '#10b981',
      width: 2,
      details: 'Shared access to high-performance computing clusters for capstone teams.'
    },
    {
      source: 'p-aman',
      target: 'inst-apex',
      type: 'post',
      label: 'Intent Post: Seeking Go SDE Referral',
      color: '#818cf8',
      width: 2.5,
      details: 'Aman broadcasted Redis caching project milestone with Proof-of-Work dossier to Apex network.'
    },
    {
      source: 'p-rohan',
      target: 'inst-apex',
      type: 'post',
      label: 'Intent Post: Hiring 2 SDE Interns for Swiggy',
      color: '#818cf8',
      width: 2.5,
      details: 'Rohan broadcasted mentorship and referral availability for Go backend campus engineers.'
    },
    {
      source: 'p-neha',
      target: 'inst-apex',
      type: 'post',
      label: 'Intent Post: ₹15,000 Micro-Bounty Launch',
      color: '#818cf8',
      width: 2.5,
      details: 'Neha broadcasted ₹15,000 Next.js WebStreams micro-bounty challenge for campus builders.'
    },
    {
      source: 'p-verma',
      target: 'inst-apex',
      type: 'post',
      label: 'Intent Post: Seeking Capstone Alum Co-Guides',
      color: '#818cf8',
      width: 2.5,
      details: 'Dr. Verma broadcasted call for industry alum co-guides for 8 final-year research capstones.'
    }
  ]
};

export const SAMPLE_REPOS = [
  {
    name: 'Distributed Redis Caching Engine',
    url: 'https://github.com/aman-cs/distri-cache-engine',
    stack: 'Go / Distributed Systems / Redis',
    companyTarget: 'Swiggy',
    blockerAsk: 'Optimizing consistent-hashing ring re-allocation under high-churn node failures.',
    metrics: {
      source: 'LinkX Deep AST Code Engine',
      readinessScore: 94,
      testCoverage: '92.4% Unit & Integration',
      latencyBenchmark: '14ms P99 Latency (10k RPS)',
      cyclomaticComplexity: 'Low (Clean Abstractions)',
      memoryLeakCheck: 'Zero Leaks (Go pprof verified)',
      architecturalHighlight: 'Robust virtual-node consistent hashing ring distributing keys across cache clusters with zero key drop.',
      executiveSummary: 'Candidate demonstrates production-grade system design. Clear test isolation, graceful failover, and comprehensive concurrency primitives.',
      suggestedInterviewTopic: 'Consistent hashing ring reallocation under node churn.'
    }
  },
  {
    name: 'Low-Latency Streaming Evaluation DAG',
    url: 'https://github.com/aman-cs/ai-stream-evaluator',
    stack: 'TypeScript / Node.js / Server-Sent Events',
    companyTarget: 'HyperScale AI',
    blockerAsk: 'Preventing client-side backpressure choking on 200+ concurrent LLM token streams.',
    metrics: {
      source: 'LinkX Deep AST Code Engine',
      readinessScore: 96,
      testCoverage: '95.1% Automated Tests',
      latencyBenchmark: '8ms Internal Queue Time',
      cyclomaticComplexity: 'Minimal / Functional',
      memoryLeakCheck: 'Garbage Collection Optimized',
      architecturalHighlight: 'Asynchronous event stream multiplexer utilizing WebStreams API with dynamic backpressure throttle.',
      executiveSummary: 'Exceptional asynchronous programming discipline. Production ready error boundaries and telemetry hooks.',
      suggestedInterviewTopic: 'Backpressure flow control in reactive streaming systems.'
    }
  },
  {
    name: 'Kubernetes Edge Autoscaler Operator',
    url: 'https://github.com/aman-cs/k8s-edge-autoscaler',
    stack: 'Go / Kubernetes CRD / Prometheus',
    companyTarget: 'Google Cloud',
    blockerAsk: 'Evaluating Prometheus custom metric query latency against edge node clock drift.',
    metrics: {
      source: 'LinkX Deep AST Code Engine',
      readinessScore: 91,
      testCoverage: '88.5% Integration Suites',
      latencyBenchmark: '22ms Reconcile Loop',
      cyclomaticComplexity: 'Well-structured Controller',
      memoryLeakCheck: 'No Goroutine Leaks Detected',
      architecturalHighlight: 'Custom Controller-Runtime operator with exponential backoff reconcile loops and Prometheus exporter integration.',
      executiveSummary: 'Candidate understands modern cloud-native operator patterns. Highly suitable for infrastructure and platform engineering teams.',
      suggestedInterviewTopic: 'Handling split-brain consensus across edge node clusters.'
    }
  }
];

export const INITIAL_BOUNTIES = [
  {
    id: 'bounty-1',
    type: 'bounty',
    typeLabel: 'Micro-Bounty',
    badgeClass: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    title: 'Build Low-Latency Streaming LLM Token Benchmarking Widget',
    poster: 'Neha Kapoor (Founder @ HyperScale AI • Batch 2019)',
    posterRole: 'founder',
    reward: '₹15,000 + Summer Fellowship Interview',
    deadline: '48h Left • 3 Slots',
    desc: 'Need an ultra-clean Next.js widget that measures first-token latency and token-per-second streaming rates across multiple AI endpoints with real-time charting.',
    tags: ['Next.js', 'TailwindCSS', 'WebStreams', 'Paid Gig'],
    applicants: [
      { name: 'Aman Sharma', repo: 'https://github.com/aman-cs/ai-stream-evaluator', status: 'Under Review' },
      { name: 'Priya Patel', repo: 'https://github.com/priya-code/stream-bench', status: 'Pending' }
    ]
  },
  {
    id: 'bounty-2',
    type: 'referral',
    typeLabel: 'Referral Radar Slot',
    badgeClass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    title: 'Swiggy Order Routing SDE-1 Referral Slot (Batch 2026)',
    poster: 'Rohan Mehta (SDE-2 Backend @ Swiggy • Batch 2020)',
    posterRole: 'alumnus',
    reward: '1-Click ATS Referral + System Pairing Prep Call',
    deadline: 'Active Referral Quota (1/3 Open)',
    desc: 'Opening my internal referral quota for students with verified Go or Distributed Systems projects. Provide your repo link; candidates with >90 readiness get immediate ATS submission.',
    tags: ['Golang', 'Distributed Systems', 'Redis', 'Direct Referral'],
    applicants: [
      { name: 'Aman Sharma', repo: 'https://github.com/aman-cs/distri-cache-engine', status: 'Endorsed' }
    ]
  },
  {
    id: 'bounty-3',
    type: 'capstone',
    typeLabel: 'Faculty-Alumni Capstone',
    badgeClass: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    title: 'Autonomous Drone Fleet Path Planning under Dynamic Obstacles',
    poster: 'Dr. R.K. Verma & Aditi Rao (Dean R&D + Google Cloud Alum)',
    posterRole: 'faculty',
    reward: 'Sponsored Qualcomm Hardware Kit + Co-Authored IEEE Paper',
    deadline: '2 Weeks to Finalize Cohort',
    desc: 'Joint research project between Apex Robotics Lab and Google Cloud alumni. Looking for 3 student developers skilled in C++, ROS2, or reinforcement learning path optimization.',
    tags: ['Robotics', 'ROS2', 'C++', 'IEEE Paper', 'Hardware Grant'],
    applicants: [
      { name: 'Ravi Kumar', repo: 'https://github.com/ravi-k/ros2-slam-agent', status: 'Interviewing' }
    ]
  },
  {
    id: 'bounty-4',
    type: 'recruiter-job',
    typeLabel: 'Targeted Campus Job',
    badgeClass: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    title: 'Core Platform Software Engineer (Fintech Infrastructure)',
    poster: 'Vikram Seth (Tech Talent Partner @ Razorpay)',
    posterRole: 'recruiter',
    reward: '₹18 - ₹24 LPA + Equity Grants',
    deadline: 'Immediate Campus Hiring Sprint',
    desc: 'Razorpay is hiring high-conviction campus builders from Apex. Candidates with verified proof-of-work in concurrency, databases, and microservices bypass aptitude filters.',
    tags: ['Razorpay', 'Full Time SDE', 'Go/Java', 'Pre-Vetted Fast-Track'],
    applicants: [
      { name: 'Aman Sharma', repo: 'https://github.com/aman-cs/distri-cache-engine', status: 'Pre-Screen Passed' },
      { name: 'Karthik S', repo: 'https://github.com/karthik/zk-proof-verifier', status: 'Final Round' }
    ]
  }
];

export const INITIAL_REFERRALS = [
  {
    id: 'ref-1',
    studentName: 'Aman Sharma',
    studentBranch: "B.Tech CSE '26",
    targetCompany: 'Swiggy',
    alumnusName: 'Rohan Mehta',
    repoUrl: 'https://github.com/aman-cs/distri-cache-engine',
    readinessScore: 94,
    summary: 'Candidate demonstrated production-grade Go system design. Custom consistent hashing ring handles 10k concurrent RPS with 92.4% unit test coverage and zero goroutine leak.',
    blockerAsk: 'Optimizing consistent-hashing ring re-allocation under high-churn node failures.',
    status: 'pending',
    timestamp: 'Today, 2:15 PM',
    atsStatus: 'Ready for 1-Click Push'
  },
  {
    id: 'ref-2',
    studentName: 'Priya Patel',
    studentBranch: "B.Tech CSE '26",
    targetCompany: 'HyperScale AI',
    alumnusName: 'Neha Kapoor',
    repoUrl: 'https://github.com/priya-code/stream-bench',
    readinessScore: 96,
    summary: 'Built Next.js 14 streaming token evaluator with reactive WebStreams API. p99 latency under 8ms with automated regression testing.',
    blockerAsk: 'Client-side memory buffering under 200 concurrent token streams.',
    status: 'referred',
    timestamp: 'Yesterday',
    atsStatus: 'Endorsed & Submitted to Team Lead'
  }
];

export const GAMIFICATION_LEADERBOARD = [
  {
    rank: 1,
    name: 'Neha Kapoor',
    role: 'Founder (Batch 19)',
    company: 'HyperScale AI',
    karma: 4120,
    streak: 45,
    badges: ['Startup Connector', 'Top Angel Sponsor'],
    contributions: '9 Bounties Funded • 5 Hires',
    avatar: 'NK',
    accent: 'amber'
  },
  {
    rank: 2,
    name: 'Dr. R.K. Verma',
    role: 'Faculty Dean',
    company: 'Apex Institute',
    karma: 3190,
    streak: 19,
    badges: ['Research Luminary', 'Capstone Champion'],
    contributions: '18 Capstones • 6 Patents',
    avatar: 'RV',
    accent: 'purple'
  },
  {
    rank: 3,
    name: 'Rohan Mehta',
    role: 'Alumnus (Batch 20)',
    company: 'Swiggy',
    karma: 2450,
    streak: 28,
    badges: ['Mentor Guru', 'Placement Hero'],
    contributions: '14 Referrals Pushed • 32 Code Reviews',
    avatar: 'RM',
    accent: 'emerald'
  },
  {
    rank: 4,
    name: 'Vikram Seth',
    role: 'Recruiter Partner',
    company: 'Razorpay',
    karma: 1890,
    streak: 8,
    badges: ['Direct Fast-Track', 'Placement Hero'],
    contributions: '26 Hires Made • 48 Interviews',
    avatar: 'VS',
    accent: 'cyan'
  },
  {
    rank: 5,
    name: 'Aman Sharma',
    role: 'Student (CSE 26)',
    company: 'Apex Institute',
    karma: 840,
    streak: 12,
    badges: ['Code Craftsperson', 'Fast Responder'],
    contributions: '3 Bounties Solved • 94 Readiness Score',
    avatar: 'AS',
    accent: 'indigo'
  }
];

export const BADGES_CATALOG = [
  {
    id: 'mentor-guru',
    name: 'Mentor Guru',
    desc: 'Awarded for providing 10+ verified architectural code reviews to students.',
    icon: 'Compass',
    gradient: 'from-purple-500 to-indigo-500',
    rarity: 'Legendary'
  },
  {
    id: 'startup-connector',
    name: 'Startup Connector',
    desc: 'Funded or mentored 3+ campus builder MVPs with real monetary or equity grants.',
    icon: 'Rocket',
    gradient: 'from-amber-500 to-rose-500',
    rarity: 'Epic'
  },
  {
    id: 'placement-hero',
    name: 'Placement Hero',
    desc: 'Generated 5+ successful internal ATS referrals resulting in direct full-time offers.',
    icon: 'Briefcase',
    gradient: 'from-emerald-500 to-teal-500',
    rarity: 'Mythic'
  },
  {
    id: 'code-craftsperson',
    name: 'Code Craftsperson',
    desc: 'Maintained 90+ GitHub proof-of-work readiness score with production-grade test coverage.',
    icon: 'Cpu',
    gradient: 'from-blue-500 to-cyan-500',
    rarity: 'Rare'
  },
  {
    id: 'fast-responder',
    name: 'Fast Responder',
    desc: 'Responded to incoming proof-of-work dossiers within an average of 2 hours.',
    icon: 'Zap',
    gradient: 'from-rose-500 to-amber-500',
    rarity: 'Special'
  }
];
