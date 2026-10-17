import React, { useState } from 'react';
import { useNexus } from '../context/NexusContext';
import {
  Inbox,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ShieldCheck,
  CheckCheck,
  MessageSquare,
  Cpu,
  Clock,
  Sparkles,
  ArrowUpRight,
  GitPullRequest
} from 'lucide-react';

export default function ReferralInbox() {
  const {
    referrals,
    updateReferralStatus,
    activePersona,
    setActiveView
  } = useNexus();

  const [feedbackModalId, setFeedbackModalId] = useState(null);
  const [feedbackText, setFeedbackText] = useState('Clean project structure! Consider adding benchmarks for key-reallocation under high node churn before reapplying.');

  const pendingCount = referrals.filter(r => r.status === 'pending').length;

  const handlePassWithFeedback = (refId) => {
    updateReferralStatus(refId, 'passed', feedbackText);
    setFeedbackModalId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Zero-Spam Decision Desk
              </span>
              <span className="text-xs text-slate-400 font-mono">1-Minute Reviews</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Incoming Verified Referral Dossiers
            </h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Every card below is backed by verified AST metrics, unit test coverage, and benchmark profiles. No generic spam.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950/80 border border-slate-800 p-3 rounded-2xl shrink-0">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Monthly Quota:</div>
              <div className="text-sm font-bold text-emerald-400">2 / 3 Slots Left</div>
            </div>
            <span className="text-slate-700">|</span>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Pending:</div>
              <div className="text-sm font-bold text-amber-400">{pendingCount} Dossiers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Referrals Cards List */}
      <div className="space-y-4">
        {referrals.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center text-slate-400 space-y-3 border border-slate-800">
            <Inbox className="w-10 h-10 mx-auto text-slate-600" />
            <h4 className="text-base font-bold text-white">Inbox is Clean!</h4>
            <p className="text-xs max-w-md mx-auto text-slate-400">
              No pending student dossiers right now. As students analyze repositories in the Proof-of-Work Lab, verified flash cards will appear here.
            </p>
          </div>
        ) : (
          referrals.map(ref => {
            const isReferred = ref.status === 'referred';
            const isPassed = ref.status === 'passed';

            return (
              <div
                key={ref.id}
                className={`glass-card rounded-3xl p-6 border transition-all duration-300 space-y-4 ${
                  isReferred
                    ? 'border-emerald-500/40 bg-emerald-950/15'
                    : isPassed
                    ? 'border-slate-800 opacity-75'
                    : 'border-slate-800/90 glow-indigo'
                }`}
              >
                {/* Header: Student Profile + Status Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold flex items-center justify-center text-sm shadow-md">
                      {ref.studentName.split(' ').map(s => s[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-bold text-white">{ref.studentName}</h4>
                        <span className="text-[10px] bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/20 font-medium">
                          {ref.studentBranch}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 flex flex-wrap items-center gap-2">
                        <span>Target: <b className="text-white">{ref.targetCompany}</b></span>
                        <span>•</span>
                        <a
                          href={ref.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-400 hover:text-indigo-300 underline font-mono text-[11px] flex items-center space-x-1"
                        >
                          <GitPullRequest className="w-3 h-3" />
                          <span>{ref.repoUrl.replace('https://github.com/', '')}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-base font-black text-emerald-400">
                        {ref.readinessScore}<span className="text-xs text-slate-400">/100</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">AST Code Score</div>
                    </div>

                    {isReferred && (
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-xl text-xs font-bold border border-emerald-500/30 flex items-center space-x-1.5 shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>REFERRED TO ATS</span>
                      </span>
                    )}

                    {isPassed && (
                      <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-xl text-xs font-semibold border border-slate-700">
                        FEEDBACK SENT
                      </span>
                    )}

                    {!isReferred && !isPassed && (
                      <span className="px-3 py-1 bg-amber-500/15 text-amber-300 rounded-xl text-xs font-semibold border border-amber-500/30 animate-pulse">
                        PENDING 1-MIN REVIEW
                      </span>
                    )}
                  </div>
                </div>

                {/* Architecture Summary Box */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300 space-y-2.5">
                  <div className="flex items-center space-x-1.5 font-semibold text-indigo-300">
                    <Cpu className="w-4 h-4 text-indigo-400" />
                    <span>Verified Architectural Summary:</span>
                  </div>
                  <p className="leading-relaxed text-slate-300 font-sans">
                    {ref.summary}
                  </p>

                  <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800">
                    <b className="text-slate-200">Student's 3-Min Blocker Ask:</b> "{ref.blockerAsk}"
                  </div>
                </div>

                {/* Actions Bar */}
                {!isReferred && !isPassed ? (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 text-xs">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Takes ~1 min to endorse directly to {ref.targetCompany} Internal ATS
                    </span>

                    <div className="flex items-center space-x-2.5 w-full sm:w-auto">
                      <button
                        onClick={() => setFeedbackModalId(ref.id)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium border border-slate-700 transition"
                      >
                        Pass with Feedback
                      </button>

                      <button
                        onClick={() => updateReferralStatus(ref.id, 'referred')}
                        className="flex-1 sm:flex-none px-5 py-2 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-1.5 transition"
                      >
                        <CheckCheck className="w-4 h-4" />
                        <span>1-Click Verified Referral</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs flex items-center justify-between">
                    <span className="text-slate-300 flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{ref.atsStatus}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{ref.timestamp}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Pass with Feedback */}
      {feedbackModalId && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>Provide Constructive Feedback</span>
              </h3>
              <button
                onClick={() => setFeedbackModalId(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400">
              LinkX encourages constructive feedback so students can refactor code and re-apply when ready.
            </p>

            <textarea
              rows={4}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
            />

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setFeedbackModalId(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handlePassWithFeedback(feedbackModalId)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs border border-slate-700"
              >
                Send Feedback & Archive
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
