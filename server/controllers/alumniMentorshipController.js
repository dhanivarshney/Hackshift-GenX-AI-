// server/controllers/alumniMentorshipController.js
// Dedicated controller for Alumni Impact Exchange & Mentorship Desk

export function ensureAlumniMentorshipData(db, writeDB) {
  let modified = false;

  db.mentorshipOffers ||= [];
  if (db.mentorshipOffers.length === 0) {
    db.mentorshipOffers = [
      {
        id: 'offer-1',
        alumnusId: 'alumnus',
        alumnusName: 'Rohan Mehta',
        company: 'Swiggy',
        title: 'High-Throughput Go Systems Architecture & Code Review',
        type: 'Code & Architecture Review',
        duration: '30 min',
        maxSessionsPerMonth: 3,
        topics: ['Go Concurrency', 'Distributed Caching', 'P99 Latency Optimization', 'ATS Referral'],
        preferredDays: 'Tuesdays & Thursdays (6:00 PM - 8:00 PM IST)',
        status: 'Active',
        createdAt: new Date().toISOString()
      },
      {
        id: 'offer-2',
        alumnusId: 'alumnus',
        alumnusName: 'Rohan Mehta',
        company: 'Swiggy',
        title: 'Backend SDE-1 Mock System Design & ATS Screening',
        type: 'Mock Interview',
        duration: '45 min',
        maxSessionsPerMonth: 2,
        topics: ['System Design', 'Consistent Hashing', 'API Design', 'Resume Feedback'],
        preferredDays: 'Saturdays (11:00 AM - 1:00 PM IST)',
        status: 'Active',
        createdAt: new Date().toISOString()
      }
    ];
    modified = true;
  }

  db.mentorshipBookings ||= [];
  // Ensure default pending booking from student exists
  if (!db.mentorshipBookings.some(b => b.mentorId === 'alumnus' || b.mentorName?.includes('Rohan'))) {
    db.mentorshipBookings.push({
      id: 'book-seed-1',
      studentId: 'student',
      studentName: 'Aman Sharma',
      studentBranch: "B.Tech CSE '26",
      studentGpa: '8.92 CGPA',
      studentCodeScore: '95/100 (Top 1%)',
      mentorId: 'alumnus',
      mentorName: 'Rohan Mehta',
      mentorCompany: 'Swiggy',
      topic: 'Systems Architecture Review & Caching Optimization',
      message: 'Built Redis caching engine in Go with consistent hashing ring & 92.4% test coverage. Looking for 30-min architectural audit and referral consideration for Swiggy backend intern roles.',
      date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
      time: '18:30 - 19:00',
      status: 'Pending',
      requestedAt: new Date().toISOString(),
      meetingLink: null
    });

    // Seed one completed session for realistic contribution history
    db.mentorshipBookings.push({
      id: 'book-seed-comp',
      studentId: 'student-2',
      studentName: 'Priya Patel',
      studentBranch: "B.Tech CSE '25",
      mentorId: 'alumnus',
      mentorName: 'Rohan Mehta',
      mentorCompany: 'Swiggy',
      topic: 'Kafka Consumer Group Rebalancing & Zero-Loss Ingestion',
      message: 'Wanted senior engineer review on idempotent Kafka consumer group architecture.',
      date: new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10),
      time: '17:00 - 17:30',
      status: 'Completed',
      requestedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
      completedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      rating: 5,
      feedback: 'Outstanding grasp of partition reassignment and offset commits. Directly endorsed to hiring team.'
    });

    modified = true;
  }

  if (modified && writeDB) {
    writeDB(db);
  }
}

export function getAlumniMentorshipDashboard(db, alumnusId = 'alumnus') {
  db.mentorshipOffers ||= [];
  db.mentorshipBookings ||= [];
  db.introductions ||= [];

  const offers = db.mentorshipOffers.filter(o => o.alumnusId === alumnusId || o.alumnusId === 'alumnus');
  const allBookings = db.mentorshipBookings.filter(b => b.mentorId === alumnusId || b.mentorId === 'alumnus' || b.mentorName?.includes('Rohan'));
  
  const pendingRequests = allBookings.filter(b => b.status === 'Pending');
  const upcomingSessions = allBookings.filter(b => b.status === 'Confirmed' || b.status === 'Accepted');
  const completedHistory = allBookings.filter(b => b.status === 'Completed');
  const bridgeIntroductions = db.introductions.filter(i => i.targetAlumnus?.toLowerCase().includes('rohan') || i.targetAlumnus?.toLowerCase().includes('mehta'));

  const stats = {
    activeOffersCount: offers.filter(o => o.status === 'Active').length,
    pendingRequestsCount: pendingRequests.length,
    upcomingSessionsCount: upcomingSessions.length,
    completedContributionsCount: completedHistory.length
  };

  return {
    success: true,
    stats,
    offers,
    pendingRequests,
    upcomingSessions,
    completedHistory,
    bridgeIntroductions
  };
}

export function createAlumniMentorshipOffer(db, alumnusId, body, writeDB) {
  const { title, type, duration = '30 min', maxSessionsPerMonth = 3, topics = [], preferredDays = '', description = '' } = body;
  if (!title || !title.trim()) {
    throw new Error('Offer title is required.');
  }

  db.mentorshipOffers ||= [];
  const newOffer = {
    id: `offer-${Date.now()}`,
    alumnusId: alumnusId || 'alumnus',
    alumnusName: body.alumnusName || 'Rohan Mehta',
    company: body.company || 'Swiggy',
    title: title.trim(),
    type: type || 'Career & Project Guidance',
    duration,
    maxSessionsPerMonth: parseInt(maxSessionsPerMonth, 10) || 3,
    topics: Array.isArray(topics) ? topics : (topics ? topics.split(',').map(t => t.trim()).filter(Boolean) : ['System Design', 'Code Review']),
    preferredDays: preferredDays.trim() || 'Flexible by appointment',
    description: description.trim(),
    status: 'Active',
    createdAt: new Date().toISOString()
  };

  db.mentorshipOffers.unshift(newOffer);
  writeDB(db);
  return newOffer;
}

export function updateAlumniMentorshipOffer(db, alumnusId, offerId, body, writeDB) {
  db.mentorshipOffers ||= [];
  const offer = db.mentorshipOffers.find(o => o.id === offerId);
  if (!offer) {
    throw new Error('Mentorship offer not found.');
  }

  if (body.title) offer.title = body.title.trim();
  if (body.type) offer.type = body.type;
  if (body.duration) offer.duration = body.duration;
  if (body.maxSessionsPerMonth) offer.maxSessionsPerMonth = parseInt(body.maxSessionsPerMonth, 10);
  if (body.preferredDays !== undefined) offer.preferredDays = body.preferredDays;
  if (body.description !== undefined) offer.description = body.description;
  if (body.topics) {
    offer.topics = Array.isArray(body.topics) ? body.topics : body.topics.split(',').map(t => t.trim()).filter(Boolean);
  }
  if (body.status) {
    offer.status = body.status; // 'Active' or 'Paused'
  }
  offer.updatedAt = new Date().toISOString();

  writeDB(db);
  return offer;
}

export function deleteAlumniMentorshipOffer(db, alumnusId, offerId, writeDB) {
  db.mentorshipOffers ||= [];
  const idx = db.mentorshipOffers.findIndex(o => o.id === offerId);
  if (idx === -1) {
    throw new Error('Mentorship offer not found.');
  }
  db.mentorshipOffers.splice(idx, 1);
  writeDB(db);
  return { success: true };
}

export function respondToAlumniMentorshipRequest(db, alumnusId, bookingId, action, notes = '', writeDB) {
  db.mentorshipBookings ||= [];
  const booking = db.mentorshipBookings.find(b => b.id === bookingId);
  if (!booking) {
    throw new Error('Mentorship request not found.');
  }

  let normalized = action;
  if (/accept|confirm/i.test(action)) normalized = 'Confirmed';
  else if (/decline|reject/i.test(action)) normalized = 'Declined';

  booking.status = normalized;
  booking.responseNotes = notes;
  booking.respondedAt = new Date().toISOString();

  if (normalized === 'Confirmed') {
    booking.meetingLink = `https://meet.linkx.edu/session-${booking.id}`;
  }

  // Notify student
  db.notifications ||= [];
  db.notifications.unshift({
    id: `notif-${Date.now()}-book`,
    recipient: booking.studentId || 'student',
    type: 'mentorship_response',
    title: `Mentorship Request ${normalized}: ${booking.mentorName}`,
    message: `${booking.mentorName} (${booking.mentorCompany}) has ${normalized.toLowerCase()} your session request on "${booking.topic}".${booking.meetingLink ? ` Meeting link: ${booking.meetingLink}` : ''}`,
    actionUrl: '#mentorship',
    read: false,
    createdAt: new Date().toISOString()
  });

  writeDB(db);
  return booking;
}

export function completeAlumniMentorshipSession(db, alumnusId, bookingId, body = {}, writeDB) {
  db.mentorshipBookings ||= [];
  const booking = db.mentorshipBookings.find(b => b.id === bookingId);
  if (!booking) {
    throw new Error('Mentorship session not found.');
  }

  booking.status = 'Completed';
  booking.completedAt = new Date().toISOString();
  booking.rating = body.rating || 5;
  booking.feedback = body.feedback || 'Completed 1:1 guidance session. Strong systems depth demonstrated.';

  // Notify student
  db.notifications ||= [];
  db.notifications.unshift({
    id: `notif-${Date.now()}-comp`,
    recipient: booking.studentId || 'student',
    type: 'mentorship_completed',
    title: `Mentorship Session Completed!`,
    message: `${booking.mentorName} has marked your session as completed with feedback: "${booking.feedback}".`,
    actionUrl: '#mentorship',
    read: false,
    createdAt: new Date().toISOString()
  });

  writeDB(db);
  return booking;
}
