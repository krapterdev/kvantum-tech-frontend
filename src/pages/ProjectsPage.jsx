import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import GradientText from '@/components/ui/GradientText';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');

  const portfolios = [
    {
      title: "Finova Payment Pipeline",
      category: "Fintech",
      desc: "Architected a custom Postgres connection pool handling 4,000+ API handshakes per minute under 3.2ms edge speeds.",
      tags: ["Node.js", "PostgreSQL", "Docker"]
    },
    {
      title: "Headless E-commerce Store",
      category: "E-commerce",
      desc: "Built a React storefront rendering dynamic catalog search inputs, increasing shopping checkout conversions by 65%.",
      tags: ["React", "Vite", "Stripe API"]
    },
    {
      title: "Autonomous RAG Chatbot Core",
      category: "AI Solutions",
      desc: "Compiled vector index matching routines with Pinecone and streaming websockets, resolving support tickets automatically.",
      tags: ["LLM Agents", "RAG", "Websockets"]
    },
    {
      title: "Apex Logistics Dashboard",
      category: "Fintech",
      desc: "Real-time telemetry and tracking interfaces displaying telemetry analytics with low-latency event synchronization.",
      tags: ["React", "Websockets", "Tailwind CSS"]
    },
    {
      title: "Decentralized Auth Gateway",
      category: "AI Solutions",
      desc: "Tokenized session verification services executing secure validation checks for remote worker identities.",
      tags: ["JWT", "Redis", "Node.js"]
    }
  ];

  const categories = ['All', 'Fintech', 'E-commerce', 'AI Solutions'];

  const filteredPortfolios = filter === 'All' 
    ? portfolios 
    : portfolios.filter(p => p.category === filter);

  return (
    <div className="container mx-auto max-w-[1280px] px-6 py-20 relative z-[5] select-none text-left">
      
      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-4">Case Studies</Badge>
        <h1 className="text-4xl sm:text-5xl font-headline font-bold text-zinc-100 mb-4">
          Featured <GradientText>Deployments</GradientText>
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
          Explore production platforms and high-traffic pipelines built for our enterprise clients.
        </p>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide border transition-all duration-200 cursor-pointer ${
              filter === cat 
                ? 'bg-emerald-500 text-zinc-950 border-emerald-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
                : 'bg-zinc-900/40 text-zinc-400 border-white/8 hover:text-zinc-100 hover:border-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPortfolios.map((p, idx) => (
          <Card key={idx} className="p-8 flex flex-col justify-between min-h-[320px] border hover:-translate-y-1.5 transition-all duration-300">
            <div className="flex flex-col gap-4">
              <span className="text-[11px] font-mono text-cyanCustom uppercase tracking-wider block">
                {p.category}
              </span>
              <h4 className="text-zinc-100 text-xl font-headline font-bold flex justify-between items-center group cursor-pointer">
                {p.title}
                <ArrowUpRight size={18} className="text-zinc-500 group-hover:text-cyanCustom transition-colors" />
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-8">
              {p.tags.map((t, tIdx) => (
                <span key={tIdx} className="text-[10px] font-mono bg-white/[0.02] border border-white/8 px-2.5 py-1 rounded-md text-zinc-400">
                  {t}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
}
