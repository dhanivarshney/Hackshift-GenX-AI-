// server/controllers/communicationController.js

export function ensureInitialNotifications(db, writeDB) {
  if (!Array.isArray(db.notifications) || db.notifications.length === 0) {
    db.notifications = [
      {
        id: 'notif-1',
        recipient: 'student',
        type: 'referral_accepted',
        title: '✅ Swiggy Referral Endorsed!',
        message: 'Rohan Mehta (SDE-2 @ Swiggy) verified your code and submitted internal ATS referral blurb.',
        actionUrl: '#alumnus-inbox',
        read: false,
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'notif-2',
        recipient: 'student',
        type: 'bounty_match',
        title: '💰 New ₹5,000 Micro-Bounty Matches Your Skills',
        message: 'HyperScale AI posted "Build Distributed Webhook Ingestion Service" matching Go & Redis.',
        actionUrl: '#bounties',
        read: false,
        createdAt: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: 'notif-3',
        recipient: 'alumnus',
        type: 'mentorship_requested',
        title: '📅 New Mentorship Booking Request',
        message: 'Aman Sharma requested a 30-minute system design feedback session.',
        actionUrl: '#mentorship',
        read: false,
        createdAt: new Date(Date.now() - 10800000).toISOString()
      },
      {
        id: 'notif-4',
        recipient: 'faculty',
        type: 'capstone_application',
        title: '🎓 Team Applied to Autonomous K8s Capstone',
        message: 'Distributed Edge Squad (Lead: Aman Sharma) applied with verified Go repository.',
        actionUrl: '#faculty-challenges',
        read: false,
        createdAt: new Date(Date.now() - 14400000).toISOString()
      }
    ];
    writeDB(db);
  }
}

export function getNotifications(db, roleId = 'student') {
  ensureInitialNotifications(db, () => {});
  return (db.notifications || []).filter(n => n.recipient === roleId || n.recipient === 'all');
}

export function markNotificationAsRead(db, notifId, writeDB) {
  ensureInitialNotifications(db, writeDB);
  const notif = (db.notifications || []).find(n => n.id === notifId);
  if (notif) {
    notif.read = true;
    writeDB(db);
  }
  return notif;
}

export function markAllNotificationsRead(db, roleId = 'student', writeDB) {
  ensureInitialNotifications(db, writeDB);
  (db.notifications || []).forEach(n => {
    if (n.recipient === roleId || n.recipient === 'all') {
      n.read = true;
    }
  });
  writeDB(db);
  return { success: true };
}

// ================= STRUCTURED MESSAGING =================
export function ensureInitialMessages(db, writeDB) {
  if (!Array.isArray(db.conversations) || db.conversations.length === 0) {
    db.conversations = [
      {
        id: 'conv-1',
        title: 'Rohan Mehta (Swiggy SDE-2) • Referral & Code Review',
        participants: ['student', 'alumnus'],
        participantNames: { student: 'Aman Sharma', alumnus: 'Rohan Mehta' },
        updatedAt: new Date(Date.now() - 1800000).toISOString(),
        messages: [
          {
            id: 'm-1',
            sender: 'student',
            senderName: 'Aman Sharma',
            text: 'Hi Rohan! I submitted my distributed cache repository for your Swiggy referral queue. Looking forward to your thoughts on the consistent hashing logic.',
            timestamp: new Date(Date.now() - 7200000).toISOString()
          },
          {
            id: 'm-2',
            sender: 'alumnus',
            senderName: 'Rohan Mehta',
            text: 'Hey Aman! Just inspected your repo and the 1-minute dossier. Very clean Go concurrency patterns. I have submitted your internal referral to our hiring team.',
            timestamp: new Date(Date.now() - 3600000).toISOString()
          },
          {
            id: 'm-3',
            sender: 'student',
            senderName: 'Aman Sharma',
            text: 'Thank you so much Rohan! That means a lot. Preparing for system design rounds now.',
            timestamp: new Date(Date.now() - 1800000).toISOString()
          }
        ]
      },
      {
        id: 'conv-2',
        title: 'Neha Kapoor (HyperScale AI) • Webhook Micro-Bounty',
        participants: ['student', 'founder'],
        participantNames: { student: 'Aman Sharma', founder: 'Neha Kapoor' },
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        messages: [
          {
            id: 'm-2-1',
            sender: 'founder',
            senderName: 'Neha Kapoor',
            text: 'Saw your application on the ₹5k webhook bounty. Can you make sure the signature verifier supports HMAC SHA-256?',
            timestamp: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: 'm-2-2',
            sender: 'student',
            senderName: 'Aman Sharma',
            text: 'Yes! Implemented constant-time comparison with crypto/subtle in Go to prevent timing attacks.',
            timestamp: new Date(Date.now() - 82800000).toISOString()
          }
        ]
      }
    ];
    writeDB(db);
  }
}

export function getConversations(db, roleId = 'student') {
  ensureInitialMessages(db, () => {});
  return (db.conversations || []).filter(c => c.participants.includes(roleId));
}

export function sendMessageInConversation(db, convId, body = {}, writeDB) {
  ensureInitialMessages(db, writeDB);
  let conv = (db.conversations || []).find(c => c.id === convId);
  if (!conv && Array.isArray(db.conversations) && db.conversations.length > 0) {
    conv = db.conversations[0];
  }
  if (!conv) {
    conv = {
      id: convId || `conv-${Date.now()}`,
      participants: ['student', body.recipientId || 'alumnus'],
      participantNames: { student: 'Aman Sharma', [body.recipientId || 'alumnus']: 'Peer Network' },
      topic: 'Network Collaboration',
      updatedAt: new Date().toISOString(),
      messages: []
    };
    db.conversations ||= [];
    db.conversations.push(conv);
  }

  const text = (body.text || body.message || '').trim();
  if (!text) throw new Error('Message text is required.');

  const sender = body.sender || 'student';
  const senderName = body.senderName || 'Aman Sharma';

  const msg = {
    id: `m-${Date.now()}`,
    sender,
    senderName,
    text,
    timestamp: new Date().toISOString()
  };

  conv.messages.push(msg);
  conv.updatedAt = msg.timestamp;
  writeDB(db);
  return msg;
}

// ================= OPPORTUNITY GAP RADAR =================
export function getOpportunityGapRadar(db) {
  const radarMetrics = [
    {
      domain: 'Distributed Systems & Go',
      studentDemandScore: 92,
      alumniMentorshipCapacity: 38,
      gapSeverity: 'High Gap',
      gapColor: 'text-rose-400',
      insight: '42 students actively preparing for backend roles, but only 2 verified alumni mentors with open slots.',
      recommendedAction: 'Invite Swiggy & Razorpay alumni to host an exclusive weekend Capstone Code Review Sprint.'
    },
    {
      domain: 'Edge Computing & K8s',
      studentDemandScore: 78,
      alumniMentorshipCapacity: 70,
      gapSeverity: 'Balanced',
      gapColor: 'text-emerald-400',
      insight: 'Dr. Verma capstone partnership with Google Cloud alumni maintains healthy co-guide coverage.',
      recommendedAction: 'Maintain current cohort quota and co-author next IEEE batch paper.'
    },
    {
      domain: 'AI Agents & LLM Infrastructure',
      studentDemandScore: 96,
      alumniMentorshipCapacity: 45,
      gapSeverity: 'Critical Gap',
      gapColor: 'text-amber-400',
      insight: 'Student demand surging by 140% month-over-month. High interest in micro-bounties and YC startup roles.',
      recommendedAction: 'Partner with Neha Kapoor (HyperScale AI) to launch sponsored campus AI Agent bounty series.'
    },
    {
      domain: 'FinTech High-Frequency SDE',
      studentDemandScore: 65,
      alumniMentorshipCapacity: 30,
      gapSeverity: 'Moderate Gap',
      gapColor: 'text-indigo-400',
      insight: 'Razorpay talent gateway seeks candidates with low-latency socket experience.',
      recommendedAction: 'Embed Vikram Seth’s market simulator capstone into 7th semester elective curriculum.'
    }
  ];

  const radar = {
    institutionName: 'Apex Institute of Technology',
    placementVelocity: 94.6,
    activeCorporatePartners: 24,
    skillGaps: [
      { skill: 'Distributed Systems & Go', gapIndex: 'High (-54%)', priority: 'Critical' },
      { skill: 'AI Agents & LLM Infrastructure', gapIndex: 'Severe (-51%)', priority: 'Immediate' },
      { skill: 'FinTech High-Frequency SDE', gapIndex: 'Moderate (-35%)', priority: 'Medium' },
      { skill: 'Edge Computing & K8s', gapIndex: 'Optimal (-8%)', priority: 'Low' }
    ],
    alumniDestinations: [
      { company: 'Google / Alphabet', alumniCount: 142, hiringVelocity: 'High' },
      { company: 'Microsoft', alumniCount: 118, hiringVelocity: 'Steady' },
      { company: 'Swiggy & Zomato', alumniCount: 94, hiringVelocity: 'High' },
      { company: 'YC & HyperScale Startups', alumniCount: 76, hiringVelocity: 'Very High' }
    ]
  };

  return {
    success: true,
    institution: 'Apex Institute of Technology',
    generatedAt: new Date().toISOString(),
    radar,
    radarMetrics,
    recommendedInterventions: [
      {
        id: 'int-1',
        title: 'Launch 48-Hour Alumni Mentorship Flash Drive',
        impact: 'Unlocks +15 mentor slots for high-demand Go/Kubernetes students.',
        status: 'Ready to Dispatch'
      },
      {
        id: 'int-2',
        title: 'Subsidize Cloud Credits for Autonomous Autoscaler Capstone',
        impact: 'Enables 8 capstone teams to run production Kubernetes clusters on Google Cloud.',
        status: 'Budget Allocated ($2,500)'
      }
    ]
  };
}
