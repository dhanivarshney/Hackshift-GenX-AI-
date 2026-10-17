import React, { useRef, useEffect, useState } from 'react';
import { useNexus } from '../context/NexusContext';
import { GRAPH_DATA } from '../data/mockData';
import {
  Share2,
  Filter,
  Sparkles,
  Info,
  RefreshCw,
  Zap,
  Target,
  Cpu,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Users
} from 'lucide-react';

export default function GraphView() {
  const { setActiveView, showToast } = useNexus();
  const canvasRef = useRef(null);

  const [activeEdgeFilter, setActiveEdgeFilter] = useState('all');
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [hoveredEntity, setHoveredEntity] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Physics nodes state ref to persist during animation frame
  const nodesRef = useRef([]);
  const edgesRef = useRef([]);
  const draggedNodeRef = useRef(null);
  const animFrameIdRef = useRef(null);

  // Initialize or re-cluster nodes
  const initGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth || 900;
    const height = canvas.clientHeight || 560;

    // Build Institution Nodes
    const instNodes = GRAPH_DATA.institutions.map(inst => ({
      id: inst.id,
      label: inst.label,
      short: inst.short,
      isInstitution: true,
      x: (inst.x / 900) * width,
      y: (inst.y / 560) * height,
      vx: 0,
      vy: 0,
      radius: inst.radius,
      color: inst.color,
      glow: inst.glow,
      membersCount: inst.membersCount,
      stats: inst.stats,
      pulse: Math.random() * Math.PI
    }));

    // Build People Nodes
    const peopleNodes = GRAPH_DATA.people.map(person => ({
      id: person.id,
      name: person.name,
      role: person.role,
      type: person.type,
      isInstitution: false,
      x: (person.initialX / 900) * width + (Math.random() - 0.5) * 40,
      y: (person.initialY / 560) * height + (Math.random() - 0.5) * 40,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: person.radius,
      color: person.color,
      readinessScore: person.readinessScore,
      intent: person.intent,
      synergy: person.synergy,
      institutionId: person.institutionId,
      pulse: Math.random() * Math.PI
    }));

    nodesRef.current = [...instNodes, ...peopleNodes];
    edgesRef.current = GRAPH_DATA.edges;
  };

  useEffect(() => {
    initGraph();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const animate = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const edges = edgesRef.current;

      // 1. Draw Edges with filter
      edges.forEach(edge => {
        if (activeEdgeFilter !== 'all' && edge.type !== activeEdgeFilter) return;

        const srcNode = nodes.find(n => n.id === edge.source);
        const tgtNode = nodes.find(n => n.id === edge.target);

        if (srcNode && tgtNode) {
          ctx.beginPath();
          ctx.moveTo(srcNode.x, srcNode.y);
          ctx.lineTo(tgtNode.x, tgtNode.y);

          // Edge styling
          ctx.strokeStyle = edge.color;
          ctx.lineWidth = edge.width || 2;
          ctx.globalAlpha = 0.45;

          if (edge.type === 'referral') {
            ctx.setLineDash([6, 4]);
          } else {
            ctx.setLineDash([]);
          }

          ctx.stroke();
          ctx.setLineDash([]);
          ctx.globalAlpha = 1;

          // Animated particle on active referrals/bounties
          if (edge.type === 'referral' || edge.type === 'bounty') {
            const time = Date.now() * 0.0015;
            const progress = (time % 1);
            const px = srcNode.x + (tgtNode.x - srcNode.x) * progress;
            const py = srcNode.y + (tgtNode.y - srcNode.y) * progress;

            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fillStyle = edge.color;
            ctx.shadowColor = edge.color;
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      // 2. Physics & Node Positions Update
      nodes.forEach(n => {
        if (draggedNodeRef.current && draggedNodeRef.current.id === n.id) {
          // Being dragged, skip physics velocity
          return;
        }

        n.pulse += 0.035;

        // Subtle gentle drift
        n.x += n.vx;
        n.y += n.vy;

        // Soft screen bounce
        if (n.x < n.radius + 15 || n.x > width - n.radius - 15) n.vx *= -1;
        if (n.y < n.radius + 15 || n.y > height - n.radius - 15) n.vy *= -1;
      });

      // 3. Draw Nodes (Institutions Large Neon, People Compact Neon)
      nodes.forEach(n => {
        const isHovered = hoveredEntity && hoveredEntity.id === n.id;
        const isSelected = selectedEntity && selectedEntity.id === n.id;
        const pulseEffect = Math.sin(n.pulse) * (n.isInstitution ? 3.5 : 1.5);

        // Glow ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + (n.isInstitution ? 10 : 5) + pulseEffect, 0, Math.PI * 2);
        ctx.fillStyle = n.isInstitution ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255, 255, 255, 0.04)';
        ctx.fill();

        // Main Node Body
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + (isHovered || isSelected ? 4 : 0), 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = n.isInstitution ? 22 : 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Outer Border
        ctx.lineWidth = isSelected ? 3.5 : (n.isInstitution ? 3 : 1.5);
        ctx.strokeStyle = isSelected ? '#ffffff' : (isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.4)');
        ctx.stroke();

        // Inner core
        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(2, n.radius * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fill();

        // Node Label
        ctx.font = n.isInstitution ? 'bold 11px Plus Jakarta Sans, sans-serif' : '10px Plus Jakarta Sans, sans-serif';
        ctx.fillStyle = '#f8fafc';
        ctx.textAlign = 'center';
        ctx.fillText(n.isInstitution ? n.short : n.name.split(' ')[0], n.x, n.y + n.radius + 14);

        if (n.isInstitution) {
          ctx.font = '9px JetBrains Mono, monospace';
          ctx.fillStyle = '#a5b4fc';
          ctx.fillText(`${n.membersCount} nodes`, n.x, n.y + n.radius + 25);
        }
      });

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [activeEdgeFilter, hoveredEntity, selectedEntity]);

  // Pointer interactions
  const handlePointerDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const hit = nodesRef.current.find(n => {
      const dx = n.x - x;
      const dy = n.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= n.radius + 6;
    });

    if (hit) {
      draggedNodeRef.current = hit;
      setSelectedEntity(hit);
    } else {
      setSelectedEntity(null);
    }
  };

  const handlePointerMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (draggedNodeRef.current) {
      draggedNodeRef.current.x = Math.max(20, Math.min(canvas.clientWidth - 20, x));
      draggedNodeRef.current.y = Math.max(20, Math.min(canvas.clientHeight - 20, y));
      return;
    }

    const hit = nodesRef.current.find(n => {
      const dx = n.x - x;
      const dy = n.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= n.radius + 6;
    });

    setHoveredEntity(hit || null);
    if (hit) {
      setTooltipPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handlePointerUp = () => {
    draggedNodeRef.current = null;
  };

  const handleReseed = () => {
    initGraph();
    showToast('Re-clustered campus lineage graph topology!');
  };

  return (
    <div className="space-y-6">
      
      {/* Topology Header & Filters */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
              <Share2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Interactive Campus Lineage & Collaboration Graph</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              Institutions as Anchor Nodes • People as High-Velocity Connectors
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Drag nodes to explore topology. Hover for real-time synergy scores and verified proof-of-work ties.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleReseed}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition flex items-center space-x-1.5 shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Re-cluster Nodes</span>
            </button>
          </div>
        </div>

        {/* Edge Filter Chips & Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
          
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-500 font-bold uppercase text-[10px] mr-1">Filter Ties:</span>
            {[
              { id: 'all', label: 'All Connections' },
              { id: 'referral', label: '⚡ Verified Referrals', color: 'emerald' },
              { id: 'bounty', label: '💰 Paid Bounties', color: 'amber' },
              { id: 'collaboration', label: '🔬 Research Capstone', color: 'purple' },
              { id: 'recruitment', label: '🎯 Talent Pipelines', color: 'cyan' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setActiveEdgeFilter(f.id)}
                className={`px-3 py-1 rounded-xl transition text-xs font-medium ${
                  activeEdgeFilter === f.id
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3 text-[11px] text-slate-400">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 ring-2 ring-indigo-500/40"></span>
              <span>Institution Hub</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span>Alumni</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span>Founders</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-300"></span>
              <span>Students</span>
            </span>
          </div>

        </div>
      </div>

      {/* Main Canvas Area + Side Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Canvas Display */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-2 border border-slate-800 relative overflow-hidden bg-[#070b13] min-h-[560px] flex items-center justify-center">
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="w-full h-[560px] cursor-grab active:cursor-grabbing block"
          />

          <div className="absolute bottom-4 left-4 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono">
            Spring Physics: Active • 13 Connected Multi-Campuses
          </div>
        </div>

        {/* Right Entity Inspector */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel rounded-3xl p-5 border border-slate-800 space-y-4 min-h-[560px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Node Telemetry Inspector
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Live State
                </span>
              </div>

              {selectedEntity ? (
                <div className="space-y-4 pt-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg text-sm"
                      style={{ backgroundColor: selectedEntity.color }}
                    >
                      {selectedEntity.isInstitution ? 'HUB' : selectedEntity.name.split(' ').map(s => s[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">
                        {selectedEntity.isInstitution ? selectedEntity.label : selectedEntity.name}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {selectedEntity.isInstitution ? 'Anchor Campus Network Node' : selectedEntity.role}
                      </p>
                    </div>
                  </div>

                  {selectedEntity.isInstitution ? (
                    <div className="space-y-3 pt-2 text-xs">
                      <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-indigo-400 font-semibold text-[11px]">Campus Telemetry:</span>
                        <div className="text-slate-300">{selectedEntity.stats}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-[10px] text-slate-500">Active Nodes</div>
                          <div className="text-lg font-bold text-white mt-0.5">{selectedEntity.membersCount}</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-[10px] text-slate-500">Live Bounties</div>
                          <div className="text-lg font-bold text-amber-400 mt-0.5">12</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveView('institution')}
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs transition flex items-center justify-center space-x-1"
                      >
                        <span>Open Full Institution Page</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 pt-2 text-xs">
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-[10px] text-slate-500">Code Readiness</div>
                          <div className="text-lg font-black text-emerald-400 mt-0.5">
                            {selectedEntity.readinessScore}/100
                          </div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-[10px] text-slate-500">Node Type</div>
                          <div className="text-sm font-bold text-indigo-400 mt-1 capitalize">
                            {selectedEntity.type}
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-amber-400 font-semibold text-[11px]">Active Intent:</span>
                        <p className="text-slate-300">"{selectedEntity.intent}"</p>
                      </div>

                      <div className="p-3 bg-indigo-950/30 rounded-xl border border-indigo-500/20 space-y-1">
                        <span className="text-indigo-300 font-semibold text-[11px]">Synergy Rationale:</span>
                        <p className="text-slate-300">{selectedEntity.synergy}</p>
                      </div>

                      <button
                        onClick={() => setActiveView('proof-of-work')}
                        className="w-full py-2 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs transition flex items-center justify-center space-x-1.5"
                      >
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Pitch Proof-of-Work to Node</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-24 text-center space-y-3 text-slate-400">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                    <Target className="w-6 h-6" />
                  </div>
                  <p className="text-xs max-w-xs mx-auto">
                    Click any neon institution node or member circle on the canvas to inspect its real-time lineage parameters.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
              NexusIQ Lineage Protocol • Real Graph Weights
            </div>
          </div>
        </div>

      </div>

      {/* Floating Hover Tooltip */}
      {hoveredEntity && (
        <div
          className="fixed pointer-events-none z-50 bg-slate-900/95 backdrop-blur-xl border border-indigo-500/40 p-3 rounded-2xl shadow-2xl text-xs space-y-1 max-w-xs transition-opacity duration-150"
          style={{
            left: `${tooltipPos.x + 15}px`,
            top: `${tooltipPos.y + 15}px`
          }}
        >
          <div className="flex items-center space-x-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: hoveredEntity.color }}
            ></span>
            <span className="font-bold text-white">
              {hoveredEntity.isInstitution ? hoveredEntity.label : hoveredEntity.name}
            </span>
          </div>
          <div className="text-[11px] text-slate-400">
            {hoveredEntity.isInstitution
              ? `${hoveredEntity.membersCount} connected alumni & students`
              : `${hoveredEntity.role} • Intent: ${hoveredEntity.intent}`}
          </div>
          {!hoveredEntity.isInstitution && (
            <div className="text-[10px] text-emerald-400 font-mono font-semibold pt-0.5">
              Code Readiness: {hoveredEntity.readinessScore}/100
            </div>
          )}
        </div>
      )}

    </div>
  );
}
