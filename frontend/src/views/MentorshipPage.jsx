import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CalendarDays, Clock3, Search, GraduationCap, Check, X, Send, LoaderCircle } from 'lucide-react';
import { useNexus } from '../context/NexusContext';

const TOPICS = ['Career guidance', 'Resume review', 'Interview preparation', 'AI/ML roadmap', 'Project feedback', 'Internship guidance'];
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const earliestDate = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
const inputClass = 'w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-indigo-400';

export default function MentorshipPage() {
  const { activePersona, mentors, bookings, loadMentorship, createBooking, updateBookingStatus, showToast } = useNexus();
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('all');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [form, setForm] = useState({ date: '', time: '', topic: TOPICS[0], message: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sessionFilter, setSessionFilter] = useState('all');
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!selectedMentor) return undefined;
    const dialog = dialogRef.current;
    dialog?.focus();
    const handleKeyDown = event => {
      if (event.key === 'Escape') setSelectedMentor(null);
      if (event.key === 'Tab' && dialog) {
        const focusable = [...dialog.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])')];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedMentor]);

  useEffect(() => {
    let active = true;
    loadMentorship().catch(e => showToast(e.message, 'error')).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [loadMentorship, showToast]);

  const domains = [...new Set(mentors.map(m => m.domain))];
  const filteredMentors = useMemo(() => mentors.filter(m => {
    const query = search.toLowerCase();
    return (domain === 'all' || m.domain === domain) && [m.name, m.company, m.domain, ...m.skills].some(s => s.toLowerCase().includes(query));
  }), [mentors, search, domain]);
  const visibleBookings = bookings.filter(booking => {
    if (sessionFilter === 'upcoming') return booking.status === 'confirmed' && booking.date >= earliestDate;
    return sessionFilter === 'all' || booking.status === sessionFilter;
  });

  const submit = async event => {
    event.preventDefault(); setError('');
    if (!form.date || form.date < earliestDate) return setError('Choose a future date.');
    if (!form.time) return setError('Choose an available time.');
    if (form.message.trim().length < 20) return setError('Please share at least 20 characters about your goals.');
    setSaving(true);
    try {
      await createBooking({ mentorId: selectedMentor.id, ...form });
      setSelectedMentor(null); setForm({ date: '', time: '', topic: TOPICS[0], message: '' });
      showToast('Request sent. Your session is pending mentor approval.', 'success');
      await loadMentorship();
    } catch (e) { setError(e.message); }
    finally { setSaving(false); }
  };

  const answer = async (booking, status) => {
    try { await updateBookingStatus(booking.id, status); showToast(`Request ${status}.`, 'success'); }
    catch (e) { showToast(e.message, 'error'); }
  };

  return <section className="space-y-7">
    <div className="rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 p-6 sm:p-8">
      <div className="flex items-center gap-3 text-indigo-300"><GraduationCap/><span className="text-xs font-bold uppercase tracking-[.18em]">Alumni network</span></div>
      <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">Mentorship, made intentional.</h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-300">Find an experienced alum, share what you want to work on, and request a time that fits. Every session is confirmed by the mentor.</p>
      <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-300"><span className="rounded-full border border-slate-700 px-3 py-1.5">{mentors.length} mentors</span><span className="rounded-full border border-slate-700 px-3 py-1.5">Approval required</span><span className="rounded-full border border-slate-700 px-3 py-1.5">Demo role: {activePersona.roleLabel}</span></div>
    </div>

    {activePersona.id === 'student' && <>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-slate-500"/><span className="sr-only">Search mentors by name, company, skills, or domain</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search mentors, companies, skills..." className={`${inputClass} pl-10`} /></label>
        <label className="sr-only" htmlFor="domain-filter">Filter by domain</label><select id="domain-filter" value={domain} onChange={e => setDomain(e.target.value)} className={`${inputClass} sm:w-56`}><option value="all">All domains</option>{domains.map(d => <option key={d}>{d}</option>)}</select>
      </div>
      {loading ? <div className="flex items-center gap-2 py-10 text-slate-400"><LoaderCircle className="animate-spin"/>Loading mentors...</div> : filteredMentors.length ? <div className="grid gap-4 md:grid-cols-2">{filteredMentors.map(mentor => <article key={mentor.id} className="glass-card glass-card-hover rounded-2xl p-5">
        <div className="flex gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/20 font-bold text-indigo-200">{mentor.avatar}</div><div className="min-w-0 flex-1"><h2 className="font-bold text-white">{mentor.name}</h2><p className="text-sm text-indigo-300">{mentor.title} · {mentor.company}</p><p className="mt-1 text-xs text-slate-400">{mentor.experience} experience · {mentor.domain}</p></div></div>
        <p className="mt-4 text-sm leading-relaxed text-slate-300">{mentor.bio}</p><div className="mt-3 flex flex-wrap gap-1.5">{mentor.skills.map(skill => <span key={skill} className="rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1 text-[11px] text-slate-300">{skill}</span>)}</div>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-800 pt-4"><span className="flex items-center gap-1 text-xs text-slate-400"><Clock3 className="h-3.5 w-3.5"/>Slots {mentor.availability.join(' · ')}</span><button onClick={() => { setSelectedMentor(mentor); setError(''); }} className="rounded-xl bg-indigo-600 px-3 py-2 text-xs font-bold text-white hover:bg-indigo-500">Request a Session</button></div>
      </article>)}</div> : <p className="rounded-2xl border border-slate-800 p-8 text-center text-slate-400">No mentors match those filters. Try another skill or domain.</p>}
    </>}

    <div className="space-y-4"><div><h2 className="text-xl font-bold text-white">{activePersona.id === 'student' ? 'My Sessions' : 'Incoming Requests'}</h2><p className="mt-1 text-sm text-slate-400">{activePersona.id === 'student' ? 'Follow the status of your mentorship requests.' : 'Review requests addressed to your mentor profile.'}</p></div>
      <div className="flex flex-wrap gap-2" aria-label="Filter sessions">{['all', 'upcoming', 'pending', 'confirmed', 'declined'].map(filter => <button key={filter} onClick={() => setSessionFilter(filter)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${sessionFilter === filter ? 'border-indigo-500 bg-indigo-500/20 text-indigo-200' : 'border-slate-700 text-slate-400 hover:text-white'}`}>{filter === 'all' ? 'All sessions' : filter}</button>)}</div>
      {loading ? <p className="py-6 text-sm text-slate-400">Loading sessions...</p> : visibleBookings.length ? <div className="grid gap-3">{visibleBookings.map(booking => <article key={booking.id} className="glass-card rounded-2xl p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="flex items-center gap-2"><h3 className="font-bold text-white">{booking.topic}</h3><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${booking.status === 'confirmed' ? 'bg-emerald-500/15 text-emerald-300' : booking.status === 'declined' ? 'bg-rose-500/15 text-rose-300' : 'bg-amber-500/15 text-amber-300'}`}>{booking.status}</span></div><p className="mt-1 text-sm text-indigo-300">{activePersona.id === 'student' ? booking.mentorName : booking.studentName}</p></div><div className="flex items-center gap-3 text-xs text-slate-400"><span className="flex items-center gap-1"><CalendarDays className="h-4 w-4"/>{booking.date}</span><span className="flex items-center gap-1"><Clock3 className="h-4 w-4"/>{booking.time}</span></div></div><p className="mt-3 whitespace-pre-wrap text-sm text-slate-300">{booking.message}</p>
        {activePersona.id !== 'student' && booking.status === 'pending' && <div className="mt-4 flex gap-2"><button onClick={() => answer(booking, 'confirmed')} className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white"><Check className="h-4 w-4"/>Accept</button><button onClick={() => answer(booking, 'declined')} className="flex items-center gap-1 rounded-lg border border-rose-500/30 px-3 py-2 text-xs font-bold text-rose-300"><X className="h-4 w-4"/>Decline</button></div>}</article>)}</div> : <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-400">{bookings.length ? `No ${sessionFilter} sessions to show.` : activePersona.id === 'student' ? 'No sessions yet. Choose a mentor above to send your first request.' : 'No incoming mentorship requests yet.'}</div>}
    </div>

    {selectedMentor && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" onMouseDown={e => e.target === e.currentTarget && setSelectedMentor(null)}><section ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="booking-title" className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-slate-700 bg-slate-900 p-5 shadow-2xl outline-none sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-indigo-300">Session request</p><h2 id="booking-title" className="mt-1 text-xl font-bold text-white">Request time with {selectedMentor.name}</h2><p className="mt-1 text-sm text-slate-400">{selectedMentor.title} · {selectedMentor.company}</p></div><button onClick={() => setSelectedMentor(null)} aria-label="Close booking form" className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"><X/></button></div>
      <form onSubmit={submit} className="mt-5 space-y-4"><div className="grid gap-4 sm:grid-cols-2"><label className="space-y-1.5 text-xs font-semibold text-slate-300">Preferred date<input required type="date" min={earliestDate} value={form.date} onChange={async e => { const date = e.target.value; setForm({...form, date, time:''}); try { const fresh = await loadMentorship(date); setSelectedMentor(current => ({...current, availability: fresh.find(m => m.id === current.id)?.availability || []})); } catch (loadError) { setError(loadError.message); } }} className={inputClass}/></label><label className="space-y-1.5 text-xs font-semibold text-slate-300">Available time<select required value={form.time} onChange={e => setForm({...form, time:e.target.value})} className={inputClass}><option value="">Choose a slot</option>{selectedMentor.availability.map(time => <option key={time} value={time}>{time}</option>)}</select></label></div>
        <label className="block space-y-1.5 text-xs font-semibold text-slate-300">Session topic<select value={form.topic} onChange={e => setForm({...form, topic:e.target.value})} className={inputClass}>{TOPICS.map(topic => <option key={topic}>{topic}</option>)}</select></label><label className="block space-y-1.5 text-xs font-semibold text-slate-300">What would you like help with?<textarea required minLength={20} maxLength={1000} rows={4} value={form.message} onChange={e => setForm({...form, message:e.target.value})} placeholder="Share your goals and a little context (20–1,000 characters)." className={inputClass}/><span className="block text-right font-normal text-slate-500">{form.message.length}/1000</span></label>
        {error && <p role="alert" className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200">{error}</p>}<p className="text-xs text-slate-500">This sends a pending request. The session is not confirmed until the mentor accepts.</p><div className="flex justify-end gap-2"><button type="button" onClick={() => setSelectedMentor(null)} className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm text-slate-300">Cancel</button><button disabled={saving} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60"><Send className="h-4 w-4"/>{saving ? 'Sending…' : 'Send request'}</button></div>
      </form></section></div>}
  </section>;
}
