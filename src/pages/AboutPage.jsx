import React from 'react';
import { Cpu, Server, Shield, Code, Layers, Users } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import GradientText from '@/components/ui/GradientText';

export default function AboutPage({ theme }) {
  const logoMark = theme === 'dark' 
    ? 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/logo-2-FINAL-LM.jpg' 
    : 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/logo-2-FINAL-DM.jpg';

  return (
    <div className="container mx-auto max-w-[1280px] px-6 py-20 relative z-[5] select-none">
      
      {/* 1. Header Area */}
      <div className="text-center mb-20">
        <Badge className="mb-4">Corporate Profile</Badge>
        <h1 className="text-4xl sm:text-5xl font-headline font-bold text-zinc-100 mb-4">
          About <GradientText>Studio Kvantum</GradientText>
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
          Engineering the future of enterprise software, creative design systems, and digital user acquisition paradigms.
        </p>
      </div>

      {/* 2. Visual Identity & Copy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
        
        {/* Story copy */}
        <div className="text-left flex flex-col gap-5 text-sm sm:text-base leading-relaxed text-zinc-400">
          <h2 className="text-2xl sm:text-3xl text-zinc-100 font-bold font-headline mb-2">
            Our Mission: Eradicate Digital Friction
          </h2>
          <p>
            Established in Delhi NCR, Kvantum Tech Solutions (Studio Kvantum) was founded on a simple realization: the modern web is bloated. Heavy libraries, redundant trackers, and unstructured stylesheets have degraded page rendering speeds and compromised search indexing visibility.
          </p>
          <p>
            Our mission is to engineer high-fidelity, high-performance digital portals that run at native execution speed. We blend rigorous logic with curated typography and interactive depth, constructing websites, mobile applications, and AI integrations that represent top-tier design capability.
          </p>
          <p>
            We work as an integrated engineering partner for brands globally. By translating strategic marketing targets into strict code architectures, we make sure your conversions grow systematically.
          </p>
        </div>

        {/* Logo Branding Container */}
        <div className="flex justify-center md:justify-end">
          <Card className="w-full max-w-[420px] p-12 border flex flex-col items-center gap-8 text-center shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
              Secured Identity Node
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
              REGISTERED AS KTS IND. INC.<br />
              STABLE CERTIFICATE: 8a93-ef20-410c
            </div>
          </Card>
        </div>

      </div>

      {/* 3. Tech Stack Matrix Table */}
      <div className="mb-24 text-left">
        <div className="mb-8">
          <h3 className="text-2xl text-zinc-100 font-bold font-headline mb-2.5 flex items-center gap-2">
            <Layers size={20} className="text-cyanCustom" /> Technical Stack Matrix
          </h3>
          <p className="text-zinc-400 text-sm">
            Our structured, multi-layer technologies deployed across our customer portfolio.
          </p>
        </div>

        {/* Scrollable table container */}
        <div className="overflow-x-auto rounded-2xl border border-white/8 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
          <table className="w-full border-collapse text-left min-w-[700px] text-xs sm:text-sm font-mono">
            <thead>
              <tr className="bg-zinc-950/80 border-b border-white/8 text-zinc-300">
                <th className="px-5 py-4 font-semibold text-[13px] tracking-wider">Layer Node</th>
                <th className="px-5 py-4 font-semibold text-[13px] tracking-wider">Technology Stack</th>
                <th className="px-5 py-4 font-semibold text-[13px] tracking-wider">Specialized Focus</th>
                <th className="px-5 py-4 font-semibold text-[13px] tracking-wider">Performance Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8 text-zinc-400 bg-zinc-900/10">
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-5 font-bold text-cyanCustom">FRONTEND</td>
                <td className="px-5 py-5">React, Vite, CSS Custom Props, HTML5 Semantic</td>
                <td className="px-5 py-5">Hardware-Accelerated 3D CSS rendering</td>
                <td className="px-5 py-5 text-emerald-500">100% Lighthouse Performance</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-5 font-bold text-purpleCustom">MOBILE CORE</td>
                <td className="px-5 py-5">React Native, Expo, SQLite, Apple Haptic APIs</td>
                <td className="px-5 py-5">Device caching & native execution triggers</td>
                <td className="px-5 py-5 text-emerald-500">60fps visual fluid transitions</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-5 font-bold text-cyanCustom">BACKEND NODES</td>
                <td className="px-5 py-5">Node.js, MongoDB Atlas, Mongoose schemas</td>
                <td className="px-5 py-5">Structured JSON query models & secure JWT keys</td>
                <td className="px-5 py-5 text-emerald-500">Sub-12ms processing times</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-5 font-bold text-purpleCustom">AI & COGNITIVE</td>
                <td className="px-5 py-5">LangChain, Pinecone DB, OpenAI Assistants</td>
                <td className="px-5 py-5">Retrieval-Augmented Generation (RAG)</td>
                <td className="px-5 py-5 text-emerald-500">85%+ automated query response</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-5 font-bold text-cyanCustom">DEVOPS & EDGE</td>
                <td className="px-5 py-5">GitHub Actions, Docker, Serverless Cloud CDN</td>
                <td className="px-5 py-5">Automated CI-CD pipelines & S3 storage integrations</td>
                <td className="px-5 py-5 text-emerald-500">99.99% Global Uptime Target</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Engineering Principles Grid */}
      <div className="text-left">
        <h3 className="text-2xl text-zinc-100 font-bold font-headline mb-10 flex items-center gap-2">
          <Users size={20} className="text-purpleCustom" /> Our Core Engineering Values
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <Card className="p-9 border flex gap-5">
            <div className="p-2.5 bg-cyanCustom/10 rounded-xl h-fit border border-cyanCustom/20 text-cyanCustom shrink-0">
              <Code size={20} />
            </div>
            <div>
              <h4 className="text-zinc-100 text-lg font-headline font-bold mb-2">Performance-First Compilation</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We avoid massive framework bloat. We use Vanilla CSS styling and compile lean JS bundles. Every script loader is audited to ensure immediate interactivity on mobile devices.
              </p>
            </div>
          </Card>

          <Card className="p-9 border flex gap-5">
            <div className="p-2.5 bg-purpleCustom/10 rounded-xl h-fit border border-purpleCustom/20 text-purpleCustom shrink-0">
              <Cpu size={20} />
            </div>
            <div>
              <h4 className="text-zinc-100 text-lg font-headline font-bold mb-2">Semantic Code Structures</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Our templates follow strict HTML5 semantic definitions to facilitate search engine indexing. Your headers, articles, and navigations are compiled specifically for crawlers to parse instantly.
              </p>
            </div>
          </Card>

          <Card className="p-9 border flex gap-5">
            <div className="p-2.5 bg-purpleCustom/10 rounded-xl h-fit border border-purpleCustom/20 text-purpleCustom shrink-0">
              <Shield size={20} />
            </div>
            <div>
              <h4 className="text-zinc-100 text-lg font-headline font-bold mb-2">Data-Driven Accountability</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We don't rely on guesswork. We configure detailed Meta Pixel configurations, custom Google Analytics tracking, and attribution pipelines to ensure marketing ROAS is transparent.
              </p>
            </div>
          </Card>

          <Card className="p-9 border flex gap-5">
            <div className="p-2.5 bg-cyanCustom/10 rounded-xl h-fit border border-cyanCustom/20 text-cyanCustom shrink-0">
              <Server size={20} />
            </div>
            <div>
              <h4 className="text-zinc-100 text-lg font-headline font-bold mb-2">Edge Scalability Systems</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We execute server processes near the client. By deploying stateless cloud modules across global regional clusters, we achieve absolute network resilience and zero-downtime database failovers.
              </p>
            </div>
          </Card>

        </div>
      </div>

    </div>
  );
}
