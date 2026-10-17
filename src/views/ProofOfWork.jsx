import React, { useState } from 'react';
import { useNexus } from '../context/NexusContext';
import { SAMPLE_REPOS } from '../data/mockData';
import {
  Cpu,
  ShieldCheck,
  Send,
  Sparkles,
  GitPullRequest,
  CheckCircle2,
  ExternalLink,
  Code2,
  Zap,
  Activity,
  Layers,
  FileCode,
  Loader2,
  Check,
  Gauge,
  Timer,
  CheckCheck
} from 'lucide-react';

export default function ProofOfWork() {
  const {
    activePersona,
    analyzeRepo,
    dispatchReferral,
    latestAnalysis,
    setActiveView,
    showToast
  } = useNexus();

  const [selectedRepoUrl, setSelectedRepoUrl] = useState(SAMPLE_REPOS[0].url);
  const [targetCompany, setTargetCompany] = useState('Swiggy');
  const [blockerText, setBlockerText] = useState(SAMPLE_REPOS[0].blockerAsk);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(latestAnalysis || null);

  const handleSelectSample = (sample) => {
    setSelectedRepoUrl(sample.url);
    setTargetCompany(sample.companyTarget);
    setBlockerText(sample.blockerAsk);
  };

  const handleAnalyze = () => {
    if (!selectedRepoUrl.trim()) {
      showToast('Please enter a valid GitHub repository URL', 'info');
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeRepo(selectedRepoUrl, targetCompany, blockerText);
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 1100);
  };

  const handleDispatch = () => {
    if (!analysisResult) return;
    dispatchReferral(analysisResult);
    setActiveView('referrals');
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden glow-indigo shadow-2xl">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>The Anti-Cold-DM Engine • Proof-of-Work Pitch Lab</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Zero Spam. High-Conviction Proof-of-Work Dossiers.
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Alumni ignore 98% of cold DMs like <i>"Sir please refer me"</i>. In LinkX, you cannot send raw text.
            Input your GitHub repo or PR; our AST engine analyzes your actual code, computes a <b>Readiness Score</b>,
            benchmarks <b>Test Coverage & P99 Latency</b>, and packages a <b>1-Minute Executive Flash Dossier</b> for the alumnus!
          </p>
        </div>

        <div className="absolute right-6 bottom-4 opacity-15 hidden lg:block pointer-events-none">
          <ShieldCheck className="w-48 h-48 text-indigo-400" />
        </div>
      </div>

      {/* Preset Fast-Pick Samples */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Quick-Load Verified Repositories (One-Click Demo):</span>
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Real Benchmark Data</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SAMPLE_REPOS.map((sample, idx) => {
            const isCurrent = selectedRepoUrl === sample.url;
            return (
              <div
                key={idx}
                onClick={() => handleSelectSample(sample)}
                className={`p-3 rounded-xl border cursor-pointer text-xs transition ${
                  isCurrent
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span className="truncate">{sample.name}</span>
                  {isCurrent && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                </div>
                <div className="text-[11px] text-indigo-400 font-mono mt-0.5 truncate">{sample.stack}</div>
                <div className="text-[10px] text-slate-400 mt-1">Target: {sample.companyTarget}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column: Input Form (Left) & Live AI Dossier Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Form */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
            <GitPullRequest className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Package Verified Pitch
            </h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Target Company & Alumnus Inbox
            </label>
            <select
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="Swiggy">Swiggy (Rohan Mehta • SDE-2 Backend • Batch '20)</option>
              <option value="HyperScale AI">HyperScale AI (Neha Kapoor • Founder • Batch '19)</option>
              <option value="Google Cloud">Google Cloud (Aditi Rao • Cloud Architect • Batch '17)</option>
              <option value="Razorpay">Razorpay (Vikram Seth • Talent Partner)</option>
              <option value="Atlassian">Atlassian (Kunal Varma • Platform Engineer • Batch '18)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              GitHub Repository or Pull Request URL
            </label>
            <div className="relative">
              <input
                type="text"
                value={selectedRepoUrl}
                onChange={(e) => setSelectedRepoUrl(e.target.value)}
                placeholder="https://github.com/username/project"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
              <FileCode className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              LinkX reads project structure, unit test ratios, and benchmark profiles.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Specific Production Blocker or 3-Minute Question
            </label>
            <textarea
              rows={3}
              value={blockerText}
              onChange={(e) => setBlockerText(e.target.value)}
              placeholder="State a concrete technical bottleneck you ran into..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Running AST Heuristics & Benchmark Checks...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Code & Generate Flash Card</span>
              </>
            )}
          </button>
        </div>

        {/* Right Preview Output: Glassmorphic Dossier Card */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Glassmorphism GitHub Repo Analysis Card
              </h3>
            </div>
            <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
              Executive Flash Format
            </span>
          </div>

          {analysisResult ? (
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
              
              {/* Glassmorphic Dossier Card */}
              <div className="glass-card border border-indigo-500/30 rounded-2xl p-5 sm:p-6 space-y-4 glow-indigo shadow-xl">
                
                {/* Header with Candidate + Readiness Score */}
                <div className="flex items-start justify-between border-b border-slate-800/80 pb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-base font-bold text-white">{activePersona.name}</span>
                      <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-medium border border-indigo-500/30">
                        Verified Student Builder
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Target: <b className="text-white">{analysisResult.companyTarget}</b> • Engine:{' '}
                      <span className="text-emerald-400 font-mono text-[10px]">{analysisResult.source}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-black text-emerald-400 flex items-center justify-end space-x-1">
                      <Gauge className="w-6 h-6 text-emerald-400 mr-1" />
                      <span>{analysisResult.readinessScore}</span>
                      <span className="text-xs text-slate-400 font-normal">/100</span>
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                      Readiness Score
                    </div>
                  </div>
                </div>

                {/* 3 Benchmark Cards: Test Coverage, Latency Benchmarks, Memory Checks */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
                  <div className="glass-panel border border-slate-800 rounded-xl p-3">
                    <div className="text-slate-400 text-[10px] font-semibold flex items-center justify-center space-x-1">
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Test Coverage</span>
                    </div>
                    <div className="text-emerald-400 font-bold mt-1 text-sm">
                      {analysisResult.testCoverage}
                    </div>
                    <div className="text-[9px] text-slate-500 mt-0.5">Unit + Integration</div>
                  </div>

                  <div className="glass-panel border border-slate-800 rounded-xl p-3">
                    <div className="text-slate-400 text-[10px] font-semibold flex items-center justify-center space-x-1">
                      <Timer className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Latency Benchmarks</span>
                    </div>
                    <div className="text-indigo-400 font-bold mt-1 text-sm">
                      {analysisResult.latencyBenchmark}
                    </div>
                    <div className="text-[9px] text-slate-500 mt-0.5">P99 @ 10k RPS</div>
                  </div>

                  <div className="glass-panel border border-slate-800 rounded-xl p-3">
                    <div className="text-slate-400 text-[10px] font-semibold flex items-center justify-center space-x-1">
                      <Activity className="w-3.5 h-3.5 text-amber-400" />
                      <span>Memory Profile</span>
                    </div>
                    <div className="text-amber-400 font-bold mt-1 text-sm">
                      {analysisResult.memoryLeakCheck}
                    </div>
                    <div className="text-[9px] text-slate-500 mt-0.5">Zero Leak Proof</div>
                  </div>
                </div>

                {/* Architecture Summary */}
                <div className="space-y-1.5 text-xs">
                  <div className="font-semibold text-slate-300 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified Architecture Summary:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed bg-slate-900/60 border border-slate-800 p-3 rounded-xl font-sans">
                    "{analysisResult.executiveSummary || analysisResult.architecturalHighlight}"
                  </p>
                </div>

                {/* 3-Min Question Box */}
                <div className="p-3 bg-indigo-950/30 border border-indigo-500/20 rounded-xl text-xs space-y-1">
                  <span className="text-indigo-300 font-semibold flex items-center space-x-1">
                    <Zap className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Targeted 3-Minute Alumnus Question:</span>
                  </span>
                  <p className="text-slate-300">"{analysisResult.blockerAsk}"</p>
                </div>

                {/* Dispatch Button */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Zero spam text • 1-min review format
                  </span>

                  <button
                    onClick={handleDispatch}
                    className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>Dispatch to Alumni Inbox</span>
                  </button>
                </div>

              </div>

            </div>
          ) : (
            <div className="py-24 text-center space-y-3 text-slate-400">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <FileCode className="w-7 h-7" />
              </div>
              <h4 className="text-sm font-bold text-white">No Repo Analyzed Yet</h4>
              <p className="text-xs max-w-sm mx-auto">
                Select a quick sample above or paste your public GitHub repository URL, then click <b>"Analyze Code & Generate Flash Card"</b>.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
