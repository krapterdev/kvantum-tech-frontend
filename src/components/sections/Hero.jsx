import React, { useEffect, useRef, useState } from 'react';
import { useSafeNavigate as useNavigate } from '@/utils/navigation';
import { ArrowRight, Sparkles, Play, CheckCircle2 } from 'lucide-react';
import Badge from '../ui/Badge';

const defaultWords = [
  'AUTOMATE.',
  'SCALE.',
  'TRANSFORM.',
  'INNOVATE.',
  'OPTIMIZE.',
  'STREAMLINE.'
];

export default function Hero({ settings }) {
  const canvasRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);

  const heroData = settings?.hero || {};
  const rotatingWords = heroData.rotatingWords && heroData.rotatingWords.length > 0 ? heroData.rotatingWords : defaultWords;
  const primaryTitle = heroData.title || 'AUTOMATE.';
  const subtitle = heroData.subtitle || 'Empower your business with intelligent software solutions designed to simplify operations, improve productivity, and accelerate growth. Custom CRM, HRMS, ERP, and WhatsApp Automation.';
  const ctaText = heroData.ctaText || 'Explore Solutions';

  // Dynamic Word Rotation Timer (2.8s)
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  // Subtle Interactive Mesh Canvas (Desktop Only, minimal 5x6 grid)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Minimal 5x6 grid = 30 points (was 336) — 91% TBT reduction
    const cols = 5;
    const rows = 6;
    const points = [];

    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        const x = (c / cols) * width;
        const y = (r / rows) * height;
        points.push({ originX: x, originY: y, x, y });
      }
    }

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * (cols + 1) + c;
          const p1 = points[idx];
          const p2 = points[idx + 1];
          const p3 = points[idx + (cols + 1)];

          p1.x = p1.originX + Math.sin(time + p1.originX * 0.005) * 8;
          p1.y = p1.originY + Math.cos(time + p1.originY * 0.005) * 8;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.03 + Math.sin(time + c) * 0.015})`;
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const navigate = useNavigate();

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center select-none overflow-hidden pt-28 pb-16 px-6">
      {/* Background Mesh Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-30 dark:opacity-60" />

      {/* Ambient Blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-pink-500/10 blur-3xl rounded-full pointer-events-none z-0" />

      <div className="relative z-10 container mx-auto max-w-[1280px]">

        {/* Top Badge */}
        <Badge className="mb-6 mx-auto inline-flex items-center gap-2 bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400 font-mono text-xs">
          <Sparkles size={14} className="animate-pulse" /> Custom Software & Business Automation Solutions
        </Badge>

        {/* Exact Specified H1 with Animated Flowing Brand Gradient */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-headline tracking-tight leading-[1.1] mb-6 max-w-5xl mx-auto">
          <span className="bg-gradient-to-r from-cyan-500 via-sky-500 to-pink-500 dark:from-cyan-400 dark:via-sky-400 dark:to-pink-400 bg-clip-text text-transparent">Custom Software Development Company</span>{' '}
          <span className="text-slate-900 dark:text-white">for Growing Businesses</span>
        </h1>

        {/* Sub-Tagline */}
        <p className="text-sky-500 dark:text-cyanCustom font-semibold text-lg sm:text-xl mb-4 font-headline">
          Build software around your business—not your business around software.
        </p>

        {/* Clean Body Copy */}
        <div className="text-slate-600 dark:text-zinc-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed mb-10 font-sans space-y-3">
          <p>
            Kvantum Tech Solutions designs and develops <strong>custom software, web applications, mobile apps, and business automation solutions</strong> that help growing businesses simplify operations, connect teams, improve customer experiences, and scale with confidence.
          </p>
          <p className="text-sm sm:text-base text-slate-500 dark:text-zinc-400">
            From CRM and HRMS to ERP, workflow automation, and custom business applications, we turn complex requirements into secure, scalable, and easy-to-use digital solutions built around the way your business works.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            onClick={() => {
              const el = document.getElementById('contact') || document.getElementById('contact-form');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else navigate('/contact');
            }}
            aria-label="Discuss Your Project"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-sky-500 hover:bg-sky-600 text-white transition-all duration-200 shadow-md hover:shadow-sky-500/20 hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
          >
            Discuss Your Project <ArrowRight size={15} />
          </button>
          <button
            onClick={() => navigate('/services')}
            aria-label="Explore Our Services"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/15 text-slate-900 dark:text-white border border-slate-300 dark:border-white/15 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            Explore Our Services <ArrowRight size={14} />
          </button>
        </div>

        {/* Small Trust Line */}
        <div className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-mono tracking-wide border-t border-slate-200 dark:border-white/10 pt-6 max-w-4xl mx-auto">
          <strong className="text-slate-800 dark:text-zinc-200">Custom Software</strong> • CRM • HRMS • ERP • Business Automation • Web Apps • Mobile Apps
        </div>

      </div>

    </section>
  );
}
