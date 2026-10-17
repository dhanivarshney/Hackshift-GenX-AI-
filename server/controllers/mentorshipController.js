const MENTORS = [
  { id: 'alumnus', name: 'Rohan Mehta', avatar: 'RM', title: 'SDE-2 Backend Engineer', company: 'Swiggy', experience: '6 years', skills: ['Go', 'Distributed Systems', 'Kafka', 'Career guidance'], domain: 'Backend Engineering', bio: 'Builds high-throughput order routing systems; previously at Amazon.', availability: ['10:00', '13:00', '15:00'] },
  { id: 'mentor-aditi', name: 'Aditi Rao', avatar: 'AR', title: 'Cloud Solutions Architect', company: 'Google Cloud', experience: '8 years', skills: ['Kubernetes', 'Cloud', 'AI/ML', 'System design'], domain: 'Cloud & AI', bio: 'Helps early-career engineers grow through cloud architecture and capstone projects.', availability: ['11:00', '14:00', '16:00'] },
  { id: 'mentor-kunal', name: 'Kunal Varma', avatar: 'KV', title: 'Platform Engineer', company: 'Atlassian', experience: '7 years', skills: ['Platform Engineering', 'System design', 'Interview preparation'], domain: 'Platform Engineering', bio: 'Reviews system design and helps students prepare for backend interviews.', availability: ['10:00', '12:00', '15:00'] },
  { id: 'mentor-david', name: 'David Chen', avatar: 'DC', title: 'Research Engineer', company: 'Anthropic', experience: '5 years', skills: ['Python', 'AI/ML', 'Research', 'Project feedback'], domain: 'Artificial Intelligence', bio: 'Works on language model research and enjoys advising student projects.', availability: ['09:00', '13:00', '16:00'] }
];
const TOPICS = ['Career guidance', 'Resume review', 'Interview preparation', 'AI/ML roadmap', 'Project feedback', 'Internship guidance'];
const IDENTITY = { student: { role: 'student' }, alumnus: { role: 'mentor' }, 'mentor-aditi': { role: 'mentor' }, 'mentor-kunal': { role: 'mentor' }, 'mentor-david': { role: 'mentor' } };
let writeQueue = Promise.resolve();

function withLock(operation) {
  const next = writeQueue.then(operation, operation);
  writeQueue = next.catch(() => {});
  return next;
}

function persist(db, writeDB) {
  if (!Array.isArray(db.mentorshipBookings)) db.mentorshipBookings = [];
  const ok = writeDB(db);
  if (!ok) throw Object.assign(new Error('Could not save booking data.'), { status: 500 });
}

function identity(req) {
  const id = req.get('x-linkx-persona-id');
  return id && IDENTITY[id] ? { id, ...IDENTITY[id] } : null;
}

function fail(res, error) { return res.status(error.status || 400).json({ success: false, error: error.message }); }

export function listMentors(req, res) {
  const date = req.query.date;
  const booked = date ? (req.readDB().mentorshipBookings || []).filter(b => b.date === date && ['pending', 'confirmed'].includes(b.status)) : [];
  const mentors = MENTORS.map(mentor => ({ ...mentor, availability: date ? mentor.availability.filter(time => !booked.some(b => b.mentorId === mentor.id && b.time === time)) : mentor.availability }));
  res.json({ success: true, mentors });
}

export function listBookings(req, res) {
  const actor = identity(req);
  if (!actor) return res.status(401).json({ success: false, error: 'Choose a demo persona to continue.' });
  const rows = (req.readDB().mentorshipBookings || []).filter(b => actor.role === 'student' ? b.studentId === actor.id : b.mentorId === actor.id);
  res.json({ success: true, bookings: rows.map(b => ({ ...b, mentorName: MENTORS.find(m => m.id === b.mentorId)?.name || 'Mentor', studentName: 'Aman Sharma' })) });
}

export async function createBooking(req, res) {
  try {
    const actor = identity(req);
    if (!actor) throw Object.assign(new Error('Choose a demo persona to continue.'), { status: 401 });
    if (actor.role !== 'student') throw Object.assign(new Error('Only students can request a mentorship session.'), { status: 403 });
    const { mentorId, date, time, topic, message } = req.body || {};
    const mentor = MENTORS.find(m => m.id === mentorId);
    if (!mentor) throw new Error('Select a valid mentor.');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '') || Number.isNaN(Date.parse(`${date}T00:00:00`)) || new Date(`${date}T00:00:00.000Z`).toISOString().slice(0, 10) !== date || date <= new Date().toISOString().slice(0, 10)) throw new Error('Choose a valid future date.');
    if (!mentor.availability.includes(time)) throw new Error('Choose an available time slot for this mentor.');
    if (!TOPICS.includes(topic)) throw new Error('Choose one of the suggested session topics.');
    if (typeof message !== 'string' || message.trim().length < 20 || message.trim().length > 1000) throw new Error('Message must be between 20 and 1,000 characters.');
    await withLock(async () => {
      const db = req.readDB();
      db.mentorshipBookings ||= [];
      const occupied = db.mentorshipBookings.some(b => b.mentorId === mentorId && b.date === date && b.time === time && ['pending', 'confirmed'].includes(b.status));
      if (occupied) throw Object.assign(new Error('That slot is already requested or booked. Choose another time.'), { status: 409 });
      const now = new Date().toISOString();
      const booking = { id: `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, studentId: actor.id, mentorId, date, time, topic, message: message.trim(), status: 'pending', createdAt: now, updatedAt: null };
      db.mentorshipBookings.unshift(booking);
      persist(db, req.writeDB);
      res.status(201).json({ success: true, booking: { ...booking, mentorName: mentor.name, studentName: 'Aman Sharma' } });
    });
  } catch (error) { fail(res, error); }
}

export async function updateBookingStatus(req, res) {
  try {
    const actor = identity(req);
    if (!actor) throw Object.assign(new Error('Choose a demo persona to continue.'), { status: 401 });
    if (actor.role !== 'mentor') throw Object.assign(new Error('Only mentors can respond to session requests.'), { status: 403 });
    const status = req.body?.status;
    if (!['confirmed', 'declined'].includes(status)) throw new Error('Status must be confirmed or declined.');
    await withLock(async () => {
      const db = req.readDB();
      const booking = (db.mentorshipBookings || []).find(b => b.id === req.params.id);
      if (!booking) throw Object.assign(new Error('Session request not found.'), { status: 404 });
      if (booking.mentorId !== actor.id) throw Object.assign(new Error('Only the intended mentor can respond to this request.'), { status: 403 });
      if (booking.status !== 'pending') throw Object.assign(new Error('This request has already been answered.'), { status: 409 });
      if (status === 'confirmed') {
        const collision = db.mentorshipBookings.some(b => b.id !== booking.id && b.mentorId === booking.mentorId && b.date === booking.date && b.time === booking.time && b.status === 'confirmed');
        if (collision) throw Object.assign(new Error('This slot has since been confirmed for another student.'), { status: 409 });
      }
      booking.status = status;
      booking.updatedAt = new Date().toISOString();
      persist(db, req.writeDB);
      res.json({ success: true, booking: { ...booking, mentorName: MENTORS.find(m => m.id === booking.mentorId)?.name || 'Mentor', studentName: 'Aman Sharma' } });
    });
  } catch (error) { fail(res, error); }
}
