import React from 'react';
import { Cpu, Server, Shield, Code, Layers, Users, Smartphone, Bot, Globe } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import GradientText from '@/components/ui/GradientText';

export default function AboutPage({ theme, settings }) {
  const logoMark = theme === 'dark' 
    ? 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/logo-2-FINAL-LM.jpg' 
    : 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/logo-2-FINAL-DM.jpg';

  const techStack = [
    {
      layer: "Frontend",
      tech: "React, Vite, CSS variables, Semantic HTML5",
      focus: "Hardware-accelerated rendering and animations",
      target: "Lighthouse Performance Score near 100%",
      icon: Code,
      color: "text-cyanCustom"
    },
    {
      layer: "Backend",
      tech: "Node.js, Express, PostgreSQL / SQL queries",
      focus: "Structured query modeling and secure auth patterns",
      target: "Fast server processing and reliable endpoints",
      icon: Server,
      color: "text-purpleCustom"
    },
    {
      layer: "Mobile App",
      tech: "React Native, Expo, Native Device APIs",
      focus: "Offline caching and native fluid animations",
      target: "60fps high-fidelity mobile performance",
      icon: Smartphone,
      color: "text-cyanCustom"
    },
    {
      layer: "AI & Integrations",
      tech: "OpenAI API, Custom RAG systems, Vector indexes",
      focus: "Intelligent database search and helper agents",
      target: "Automated business workflow automation",
      icon: Bot,
      color: "text-purpleCustom"
    }
  ];

  const aboutText = settings?.about?.description || 'Based in Delhi NCR, Studio Kvantum (Kvantum Tech Solutions) was founded to solve a major issue in modern web development: bloat. Overly complex frameworks, heavy page loaders, and chaotic stylesheets frequently degrade load times and impact search ranking visibility.';

  return (
    <div className="container mx-auto max-w-[1280px] px-6 py-20 relative z-[5] select-none">
      
      {/* 1. Header Area */}
      <div className="text-center mb-20">
        <Badge className="mb-4">Our Profile</Badge>
        <h1 className="text-4xl sm:text-5xl font-headline font-bold text-zinc-100 mb-4">
          About <GradientText>Studio Kvantum</GradientText>
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
          Designing and engineering high-performance websites, custom web applications, and growth-focused search strategy.
        </p>
      </div>

      {/* 2. Visual Identity & Copy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
        
        {/* Story copy */}
        <div className="text-left flex flex-col gap-5 text-sm sm:text-base leading-relaxed text-zinc-400">
          <h2 className="text-2xl sm:text-3xl text-zinc-100 font-bold font-headline mb-2">
            Our Mission: Build Fast, Clean, and Effective Web Products
          </h2>
          <p>
            {aboutText}
          </p>
          <p>
            We build web products that run quickly and look beautiful. By combining clean engineering with thoughtful layout design and smooth interactions, we construct digital spaces that help your business convert visitors into clients.
          </p>
          <p>
            We operate as an integrated technical partner. By translating business marketing targets into solid code execution, we help you scale your digital presence systematically.
          </p>
        </div>

        {/* Logo Branding Container */}
        <div className="flex justify-center md:justify-end">
          <Card className="w-full max-w-[420px] p-12 border flex flex-col items-center gap-8 text-center shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
              Digital Product Studio
            </span>
            
            <div className="flex flex-col items-center gap-4">
              <img 
                src={logoMark} 
                alt="Kvantum Brand Mark Logo" 
                className="h-20 w-20 object-contain rounded-2xl border border-white/8 p-2.5 bg-white/[0.01]"
              />
              <span className="text-2xl font-extrabold text-zinc-100 font-headline tracking-wide mt-2">
                Kvantum
              </span>
            </div>

            <div className="text-xs text-zinc-400 font-mono leading-relaxed">
              STUDIO KVANTUM<br />
              DELHI NCR, INDIA
            </div>
          </Card>
        </div>

      </div>

      {/* 3. Tech Stack Matrix Grid */}
      <div className="mb-24 text-left">
        <div className="mb-10">
          <h3 className="text-2xl text-zinc-100 font-bold font-headline mb-2.5 flex items-center gap-2">
            <Layers size={20} className="text-cyanCustom" /> Our Technology Stack
          </h3>
          <p className="text-zinc-400 text-sm">
            We use a modern, lightweight set of tools configured specifically for performance and scaling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {techStack.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <Card key={idx} className="p-8 border flex flex-col justify-between gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-white/[0.02] border border-white/8 rounded-lg ${tech.color}`}>
                      <Icon size={18} />
                    </div>
                    <h4 className="text-zinc-100 font-headline font-bold text-lg">{tech.layer}</h4>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-0.5 rounded-full">
                    {tech.target}
                  </span>
                </div>
                <div className="text-sm text-zinc-400 flex flex-col gap-2 mt-2">
                  <p><strong>Stack:</strong> {tech.tech}</p>
                  <p><strong>Focus:</strong> {tech.focus}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 4. Engineering Principles Grid */}
      <div className="text-left">
        <h3 className="text-2xl text-zinc-100 font-bold font-headline mb-10 flex items-center gap-2">
          <Users size={20} className="text-purpleCustom" /> Our Core Values
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <Card className="p-9 border flex gap-5">
            <div className="p-2.5 bg-cyanCustom/10 rounded-xl h-fit border border-cyanCustom/20 text-cyanCustom shrink-0">
              <Code size={20} />
            </div>
            <div>
              <h4 className="text-zinc-100 text-lg font-headline font-bold mb-2">Performance-First Approach</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We avoid massive framework bloat. We use tailored CSS and build lightweight JS bundles. Every script loader is audited to ensure immediate interactivity on mobile and desktop devices.
              </p>
            </div>
          </Card>

          <Card className="p-9 border flex gap-5">
            <div className="p-2.5 bg-purpleCustom/10 rounded-xl h-fit border border-purpleCustom/20 text-purpleCustom shrink-0">
              <Cpu size={20} />
            </div>
            <div>
              <h4 className="text-zinc-100 text-lg font-headline font-bold mb-2">SEO-First Engineering</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Our templates follow strict HTML5 semantic definitions to facilitate search engine indexing. Your headers, layouts, and page structures are built specifically for web crawlers to read instantly.
              </p>
            </div>
          </Card>

          <Card className="p-9 border flex gap-5">
            <div className="p-2.5 bg-purpleCustom/10 rounded-xl h-fit border border-purpleCustom/20 text-purpleCustom shrink-0">
              <Shield size={20} />
            </div>
            <div>
              <h4 className="text-zinc-100 text-lg font-headline font-bold mb-2">Transparent Metrics</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We believe in clear targets. We configure precise tracking setups and conversion metrics so you can measure the real business growth your web app drives.
              </p>
            </div>
          </Card>

          <Card className="p-9 border flex gap-5">
            <div className="p-2.5 bg-cyanCustom/10 rounded-xl h-fit border border-cyanCustom/20 text-cyanCustom shrink-0">
              <Server size={20} />
            </div>
            <div>
              <h4 className="text-zinc-100 text-lg font-headline font-bold mb-2">Scalable Architecture</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We host static client modules on global edge servers close to your visitors. This setup ensures fast delivery speeds, high security, and minimal latency.
              </p>
            </div>
          </Card>

        </div>
      </div>

    </div>
  );
}
