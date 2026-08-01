import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Play, CheckCircle2 } from 'lucide-react';
import Badge from '../ui/Badge';

export default function Hero({ settings }) {
  const canvasRef = useRef(null);

  // WebGL / Canvas Liquid Displacement & Digital Mesh background effect
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

    // Mesh Grid Points
    const cols = 28;
    const rows = 16;
    const points = [];

    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        const x = (c / cols) * width;
        const y = (r / rows) * height;
        points.push({ originX: x, originY: y, x, y, vx: 0, vy: 0 });
      }
    }

    let time = 0;
    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      // Ambient Cyber Mesh Rendering
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.08)';
      ctx.lineWidth = 1;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Mouse displacement liquid wave math
        const dx = mouseX - p.originX;
        const dy = mouseY - p.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 220;

        let force = 0;
        if (dist < maxDist) {
          force = (1 - dist / maxDist) * 35;
        }

        const angle = Math.atan2(dy, dx);
        p.x = p.originX - Math.cos(angle) * force + Math.sin(time + p.originX * 0.01) * 8;
        p.y = p.originY - Math.sin(angle) * force + Math.cos(time + p.originY * 0.01) * 8;
      }

      // Draw Grid Mesh Lines
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
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.05 + Math.sin(time + c) * 0.03})`;
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
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center select-none overflow-hidden pt-28 pb-16 px-6">
      {/* Background Interactive Mesh Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-60" />

      {/* Radial Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-pinkCustom/20 via-purpleCustom/20 to-cyanCustom/20 blur-3xl rounded-full pointer-events-none z-0" />

      <div className="relative z-10 container mx-auto max-w-[1280px]">

        {/* Top Tag Badge */}
        <Badge className="mb-6 mx-auto inline-flex items-center gap-2 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
          <Sparkles size={14} className="animate-pulse" /> Software & Automation Built For Modern Businesses
        </Badge>

        {/* 2026 Style Oversized Typography Header */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-headline tracking-tight text-white uppercase leading-[0.95] mb-6">
          AUTOMATE. <br className="hidden sm:inline" />
          <span className="gradient-text">SCALE. </span>
          TRANSFORM.
        </h1>

        {/* Subtitle */}
        <p className="text-zinc-300 max-w-3xl mx-auto text-base sm:text-xl leading-relaxed mb-10 font-sans font-medium">
          Empower your business with intelligent software solutions designed to simplify operations, improve productivity, and accelerate growth. Custom CRM, HRMS, ERP, and WhatsApp Automation.
        </p>

        {/* CTAs Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-9 py-4 rounded-xl text-sm font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-all duration-200 shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:scale-[1.03] cursor-pointer flex items-center justify-center gap-2"
          >
            Explore Solutions <ArrowRight size={16} />
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <Play size={15} fill="currentColor" /> Book Free Demo
          </button>
        </div>

        {/* 4 Trust Checkpoints */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-xs sm:text-sm text-zinc-300 font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-cyanCustom" />
            <span>Custom CRM Systems</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-pinkCustom" />
            <span>Business Process Automation</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-purpleCustom" />
            <span>HRMS & ERP Solutions</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-emerald-400" />
            <span>WhatsApp Business API</span>
          </div>
        </div>

      </div>

      {/* Bottom Marquee Hint */}
      <div className="absolute bottom-3 text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">
        DRAG • EXPLORE • AUTOMATE
      </div>

    </section>
  );
}
