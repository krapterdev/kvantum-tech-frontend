import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Cpu, GitBranch, Layers, CheckCircle2, Zap, ArrowRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import GradientText from '@/components/ui/GradientText';
import LucideIcon from '@/components/ui/LucideIcon';
import { getAllServices } from '@/services/serviceService';

export default function ServiceDetailPage({ services = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [localService, setLocalService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Explicit 301 Redirect for legacy /services/web-development -> /services/web-mobile-app-development
    if (id === 'web-development') {
      navigate('/services/web-mobile-app-development', { replace: true });
      return;
    }

    const service = services.find(s => s.id === id);
    if (service) {
      setLocalService(service);
      setLoading(false);
      return;
    }

    // Fallback API fetch
    getAllServices()
      .then(data => {
        const found = data.find(s => s.id === id);
        if (found) {
          setLocalService(found);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id, services, navigate]);

  // Inject noindex meta tag for non-existent 404 service pages
  useEffect(() => {
    if (!loading && !localService) {
      document.title = '404 Capability Node Not Found | Kvantum Tech Solutions';
      let metaRobots = document.querySelector('meta[name="robots"]');
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.setAttribute('name', 'robots');
        document.head.appendChild(metaRobots);
      }
      metaRobots.setAttribute('content', 'noindex, follow');

      return () => {
        metaRobots.setAttribute('content', 'index, follow');
      };
    }
  }, [loading, localService]);

  if (loading) {
    return (
      <div className="container mx-auto max-w-[1000px] px-6 py-16 text-left animate-pulse space-y-8 select-none">
        <div className="h-8 w-36 bg-white/10 rounded-xl" />
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="h-6 w-32 bg-cyan-500/20 rounded-full" />
          <div className="h-12 w-3/4 bg-white/10 rounded-2xl" />
          <div className="h-6 w-full bg-white/5 rounded-xl" />
          <div className="h-6 w-2/3 bg-white/5 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="h-40 bg-slate-900/40 border border-slate-800 rounded-2xl p-6" />
          <div className="h-40 bg-slate-900/40 border border-slate-800 rounded-2xl p-6" />
        </div>
      </div>
    );
  }

  if (!localService) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center px-6">
        <span className="text-red-500 font-mono text-xs uppercase tracking-widest">[ERR 404] Node not registered</span>
        <h2 className="text-2xl font-bold font-headline text-zinc-200">Capability Node Not Found</h2>
        <p className="text-zinc-500 text-sm max-w-md leading-relaxed">
          The requested service parameter key does not map to any active system capabilities. It may have been deprecated or moved.
        </p>
        <button onClick={() => navigate('/services')} className="mt-4 px-5 py-2.5 bg-white/[0.04] border border-white/8 rounded-xl text-xs font-semibold text-zinc-300 hover:border-cyanCustom/30 hover:text-cyanCustom transition-colors flex items-center gap-2">
          <ArrowLeft size={14} /> Back to Capabilities
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-[1000px] px-6 py-16 relative z-[5] select-none text-left">
      {/* Back button */}
      <button 
        onClick={() => navigate('/services')}
        className="mb-8 px-4 py-2 bg-white/[0.01] border border-white/5 hover:border-white/10 text-zinc-400 hover:text-zinc-200 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer w-fit"
      >
        <ArrowLeft size={14} /> Back to Capabilities
      </button>

      {/* Hero header section */}
      <div className="flex flex-col md:flex-row md:items-center gap-8 border-b border-white/5 pb-12 mb-12">
        <div 
          className="w-20 h-20 rounded-2xl bg-white/[0.02] border flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(255,255,255,0.02)]"
          style={{ 
            borderColor: localService.color || 'var(--accent-cyan)',
            color: localService.color || 'var(--accent-cyan)',
            boxShadow: `0 0 30px ${(localService.color || 'rgba(0,210,255,0.15)')}30`
          }}
        >
          <LucideIcon name={localService.iconName} size={36} />
        </div>
        <div>
          <Badge className="mb-2 uppercase font-mono tracking-widest" style={{ color: localService.color || 'var(--accent-cyan)', borderColor: (localService.color || 'var(--accent-cyan)') + '30' }}>
            System Node: {localService.id}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-headline text-zinc-100 tracking-tight leading-none">
            {localService.title}
          </h1>
          <p className="text-zinc-400 text-sm mt-3 max-w-[650px] leading-relaxed">
            {localService.shortDesc}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left main analysis */}
        <div className="md:col-span-2 flex flex-col gap-8">
          {/* Blueprint detail */}
          <div className="bg-zinc-950/20 border border-white/5 p-8 rounded-2xl flex flex-col gap-4">
            <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2 border-b border-white/5 pb-3">
              <Cpu size={16} style={{ color: localService.color || 'var(--accent-cyan)' }} /> Capability Profile
            </h3>
            <p className="text-zinc-300 text-[15px] leading-relaxed whitespace-pre-wrap">
              {localService.longDesc}
            </p>
          </div>

          {/* Workflow blueprint steps */}
          <div className="bg-zinc-950/20 border border-white/5 p-8 rounded-2xl flex flex-col gap-6">
            <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2 border-b border-white/5 pb-3">
              <Zap size={16} className="text-pinkCustom" /> Workflow Blueprint
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-start">
                <span className="w-6 h-6 rounded-full bg-cyanCustom/10 border border-cyanCustom/20 text-cyanCustom font-mono text-xs flex items-center justify-center shrink-0">1</span>
                <div>
                  <h4 className="text-sm font-bold text-zinc-200">Architecture Mapping</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">We trace current layouts, design schemas, and set conversion triggers matching index performance targets.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="w-6 h-6 rounded-full bg-pinkCustom/10 border border-pinkCustom/20 text-pinkCustom font-mono text-xs flex items-center justify-center shrink-0">2</span>
                <div>
                  <h4 className="text-sm font-bold text-zinc-200">Custom Engineering & Integration</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">No drag-and-drop page builders. We write pixel-perfect react/native components with optimized server routes.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="w-6 h-6 rounded-full bg-purpleCustom/10 border border-purpleCustom/20 text-purpleCustom font-mono text-xs flex items-center justify-center shrink-0">3</span>
                <div>
                  <h4 className="text-sm font-bold text-zinc-200">Bootstrap Verification</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">We perform Lighthouse verification, load test database schemas, and deploy with canonical search index support.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side diagnostics info */}
        <div className="flex flex-col gap-6">
          {/* Tech stack */}
          <div className="bg-zinc-950/20 border border-white/5 p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2 border-b border-white/5 pb-3">
              <GitBranch size={16} className="text-purpleCustom" /> Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {localService.techStack ? (
                localService.techStack.split(',').map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1.5 bg-zinc-950/40 border border-white/8 rounded-lg text-xs font-mono text-zinc-300"
                  >
                    {tech.trim()}
                  </span>
                ))
              ) : (
                <span className="text-xs text-zinc-600 font-mono">No nodes active</span>
              )}
            </div>
          </div>

          {/* Goal Metric */}
          <div className="bg-zinc-950/20 border border-white/5 p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2 border-b border-white/5 pb-3">
              <Layers size={16} className="text-emerald-500" /> Target Metric
            </h3>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
              <span className="text-zinc-200 text-sm font-semibold">{localService.metrics || 'High performance conversion guaranteed'}</span>
            </div>
          </div>

          {/* Call to action card */}
          <div className="bg-gradient-to-br from-[#0e172a] to-[#1e112a] border border-white/8 p-6 rounded-2xl flex flex-col gap-4 shadow-xl">
            <h4 className="text-base font-bold text-zinc-100">Need Custom Solutions?</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Connect with our development experts to schedule a technical walkthrough and map out your specifications today.
            </p>
            <Link 
              to="/contact" 
              className="mt-2 py-2.5 px-4 bg-pinkCustom text-white hover:bg-pink-600 rounded-xl text-xs font-bold transition-all shadow-[0_0_15px_rgba(236,72,153,0.3)] text-center flex items-center justify-center gap-2"
            >
              Let's Talk <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
