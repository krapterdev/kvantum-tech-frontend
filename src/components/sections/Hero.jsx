import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Cpu, ShieldCheck, Activity } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import GradientText from '../ui/GradientText';

export default function Hero({ settings }) {
  const [pageSpeed, setPageSpeed] = useState(99);
  const [loadTime, setLoadTime] = useState(0.72);
  const [uptime, setUptime] = useState(99.99);
  const navigate = useNavigate();

  const hero = settings?.hero || {};

  // Realistic statistics ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setPageSpeed(() => Math.floor(98 + Math.random() * 3));
      setLoadTime(() => +(0.65 + Math.random() * 0.15).toFixed(2));
      setUptime(() => +(99.98 + Math.random() * 0.019).toFixed(3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="container mx-auto max-w-[1280px] min-h-[80vh] flex items-center px-6 py-10 md:py-20 select-none">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        
        {/* Left Side: Info & Actions */}
        <div className="flex flex-col items-start text-left">
          <Badge className="mb-6 flex items-center gap-1.5 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
            Business Automation & Custom Software Development
          </Badge>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-zinc-100 leading-[1.15] tracking-tight mb-6">
            {hero.title || "Custom Software Development & Business Automation Solutions for Growing Businesses"}
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-[600px] mb-8 font-sans">
            {hero.subtitle || "Transform your business with intelligent automation, powerful CRM software, WhatsApp automation, HRMS, ERP solutions, and custom web & mobile applications. Kvantum Tech Solutions helps businesses streamline operations, improve productivity, and accelerate growth through scalable software solutions."}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-4 w-full sm:w-auto">
            <button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else navigate('/contact');
              }}
              className="px-6 py-3.5 rounded-xl text-sm font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-all duration-200 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-[1.02] cursor-pointer text-center"
            >
              {hero.ctaText || "Request Free Consultation"}
            </button>
            <Button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else navigate('/contact');
              }}
              variant="secondary"
              className="px-6 py-3.5 rounded-xl text-sm text-center"
            >
              Book Live Demo
            </Button>
          </div>
          
          {/* Trust Text Grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mt-6 text-[11px] sm:text-xs font-mono text-zinc-450 border-t border-white/5 pt-6 w-full">
            <div className="flex items-center gap-2">
              <span className="text-cyanCustom">✔</span> Custom CRM Development
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyanCustom">✔</span> Business Automation
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyanCustom">✔</span> HRMS Software
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyanCustom">✔</span> WhatsApp Automation
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyanCustom">✔</span> ERP Solutions
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyanCustom">✔</span> Mobile & Web Applications
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Performance Metrics Card */}
        <div className="flex justify-center w-full">
          <Card 
            tilt 
            scanline
            className="w-full max-w-[420px] p-9 shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
          >
            <div className="flex flex-col gap-6">
              
              {/* Card Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-cyanCustom/10 rounded-lg">
                    <Cpu size={18} className="text-cyanCustom" />
                  </div>
                  <div>
                    <h4 className="text-zinc-100 text-sm font-semibold">Performance Core</h4>
                    <span className="text-zinc-500 text-[11px] font-mono block">Vitals Status: Optimized</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                  <span className="text-[11px] font-mono text-zinc-400">ACTIVE</span>
                </div>
              </div>

              {/* Stat 1: Lighthouse Score */}
              <div>
                <span className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Lighthouse Speed Index
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-cyanCustom font-headline leading-none">{pageSpeed}/100</span>
                  <span className="text-emerald-500 text-xs font-semibold">Core Web Vitals Pass</span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyanCustom to-purpleCustom rounded-full transition-all duration-300"
                    style={{ width: `${pageSpeed}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-5 border-t border-white/8 pt-5 text-left">
                <div>
                  <span className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                    Avg Load Time
                  </span>
                  <span className="text-xl font-bold text-zinc-100">{loadTime}s</span>
                </div>
                <div>
                  <span className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                    Platform Uptime
                  </span>
                  <span className="text-xl font-bold text-purpleCustom">{uptime}%</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-2.5 bg-white/[0.01] p-3 rounded-lg border border-white/8">
                <ShieldCheck size={16} className="text-cyanCustom" />
                <span className="text-[11px] font-mono text-zinc-400">
                  Clean Semantic Build — React 19 / Vite
                </span>
              </div>

            </div>
          </Card>
        </div>

      </div>
    </section>
  );
}
