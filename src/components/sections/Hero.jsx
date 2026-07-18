import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Cpu, ShieldCheck, Activity } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import GradientText from '../ui/GradientText';

export default function Hero() {
  const [liveUptime, setLiveUptime] = useState(99.994);
  const [activeNodes, setActiveNodes] = useState(4192);
  const [cpuLoad, setCpuLoad] = useState(34);
  const navigate = useNavigate();

  // Statistics counters ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUptime(() => +(99.99 + Math.random() * 0.005).toFixed(3));
      setActiveNodes(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      setCpuLoad(() => Math.floor(25 + Math.random() * 15));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="container mx-auto max-w-[1280px] min-h-[80vh] flex items-center px-6 py-10 md:py-20 select-none">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        
        {/* Left Side: Info & Actions */}
        <div className="flex flex-col items-start text-left">
          <Badge className="mb-6 flex items-center gap-1.5">
            <Activity size={12} className="animate-pulse text-cyanCustom" />
            SYSTEM PROTOCOL v5.0.0 SECURED
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold text-zinc-100 leading-[1.08] tracking-tight mb-6">
            We engineer <GradientText>digital fluidity</GradientText> <br />
            at enterprise scale.
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-[600px] mb-9">
            Architecting ultra-high performance ecosystems through logic-heavy software engineering and precision design. We deploy robust, containerized systems built for high traffic.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => {
                const el = document.getElementById('contact-handshake');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else navigate('/contact');
              }}
              variant="primary"
            >
              Initialize Project <ArrowRight size={16} />
            </Button>
            <Button
              onClick={() => navigate('/services')}
              variant="secondary"
            >
              Explore Services
            </Button>
          </div>
        </div>

        {/* Right Side: Interactive Telemetry Card */}
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
                    <h4 className="text-zinc-100 text-sm font-semibold">Core Node Engine</h4>
                    <span className="text-zinc-500 text-[11px] font-mono block">NODE_STATUS: STABLE</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                  <span className="text-[11px] font-mono text-zinc-400">ONLINE</span>
                </div>
              </div>

              {/* Stat 1: Conversion Rate */}
              <div>
                <span className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Success Conversion Rate
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-cyanCustom font-headline leading-none">{liveUptime}%</span>
                  <span className="text-emerald-500 text-xs font-semibold">+0.001%</span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyanCustom to-purpleCustom rounded-full transition-all duration-300"
                    style={{ width: `${liveUptime}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-5 border-t border-white/8 pt-5">
                <div>
                  <span className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                    Active Nodes
                  </span>
                  <span className="text-xl font-bold text-zinc-100">{activeNodes.toLocaleString()}</span>
                </div>
                <div>
                  <span className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                    Processor Stress
                  </span>
                  <span className="text-xl font-bold text-purpleCustom">{cpuLoad}%</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-2.5 bg-white/[0.01] p-3 rounded-lg border border-white/8">
                <ShieldCheck size={16} className="text-cyanCustom" />
                <span className="text-[11px] font-mono text-zinc-400">
                  Secure Handshake Protocol Active
                </span>
              </div>

            </div>
          </Card>
        </div>

      </div>
    </section>
  );
}
