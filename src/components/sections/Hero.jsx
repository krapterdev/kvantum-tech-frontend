import React, { useEffect, useRef, useState } from 'react';
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

  // Subtle Interactive Mesh Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const cols = 24;
    const rows = 14;
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
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const dx = mouseX - p.originX;
        const dy = mouseY - p.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        let force = 0;
        if (dist < maxDist) {
          force = (1 - dist / maxDist) * 25;
        }

        const angle = Math.atan2(dy, dx);
        p.x = p.originX - Math.cos(angle) * force + Math.sin(time + p.originX * 0.01) * 6;
        p.y = p.originY - Math.sin(angle) * force + Math.cos(time + p.originY * 0.01) * 6;
      }

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * (cols + 1) + c;
          const p1 = points[idx];
          const p2 = points[idx + 1];
          const p3 = points[idx + (cols + 1)];

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.04 + Math.sin(time + c) * 0.02})`;
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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center select-none overflow-hidden pt-28 pb-16 px-6">
      {/* Background Mesh Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-30 dark:opacity-60" />

      {/* Ambient Blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-pink-500/10 blur-3xl rounded-full pointer-events-none z-0" />

      <div className="relative z-10 container mx-auto max-w-[1280px]">

        {/* Top Badge */}
        <Badge className="mb-6 mx-auto inline-flex items-center gap-2 bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400 font-mono text-xs">
          <Sparkles size={14} className="animate-pulse" /> Software & Automation Built For Modern Businesses
        </Badge>

        {/* Minimal High-Contrast Dynamic Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-headline tracking-tight text-slate-900 dark:text-white uppercase leading-[0.98] mb-6">
          <span className="gradient-text transition-all duration-500">
            {rotatingWords[wordIndex] || primaryTitle}
          </span>{' '}
          <br className="hidden sm:inline" />
          <span className="text-slate-900 dark:text-white">SCALE. </span>
          <span className="text-slate-500 dark:text-slate-400">TRANSFORM.</span>
        </h1>

        {/* Clean Subtitle */}
        <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed mb-10 font-sans font-normal">
          {subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-sky-500 hover:bg-sky-600 text-white transition-all duration-200 shadow-md hover:shadow-sky-500/20 hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
          >
            {ctaText} <ArrowRight size={15} />
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/15 text-slate-900 dark:text-white border border-slate-300 dark:border-white/15 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <Play size={14} fill="currentColor" /> Book Free Demo
          </button>
        </div>

        {/* 4 Trust Checkpoints */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-sky-500" />
            <span>Custom CRM Systems</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-purple-500" />
            <span>Business Process Automation</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-pink-500" />
            <span>HRMS & ERP Solutions</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-emerald-500" />
            <span>WhatsApp Business API</span>
          </div>
        </div>

      </div>

    </section>
  );
}
