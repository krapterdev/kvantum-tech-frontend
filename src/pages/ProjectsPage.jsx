import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import GradientText from '@/components/ui/GradientText';

export default function ProjectsPage({ portfolios = [] }) {
  const [filter, setFilter] = useState('All');

  const displayPortfolios = portfolios.length > 0 ? portfolios.map(p => ({
    ...p,
    tags: Array.isArray(p.tags) ? p.tags : (typeof p.tags === 'string' ? p.tags.split(',').map(t => t.trim()) : [])
  })) : [
    {
      title: "Finova Pay Gateway",
      category: "Fintech",
      desc: "Designed and built a custom payment gateway handling thousands of secure API calls per minute under sub-second load times.",
      tags: ["Node.js", "PostgreSQL", "Docker"]
    },
    {
      title: "NovaStore Headless Shop",
      category: "E-Commerce",
      desc: "Created a modern headless e-commerce store with dynamic catalog filtering, resulting in a 35% increase in purchase conversions.",
      tags: ["React", "Vite", "Stripe API"]
    },
    {
      title: "DexAI Support Assistant",
      category: "AI Integration",
      desc: "Developed a context-aware customer support chatbot that uses retrieval-augmented generation to handle client queries in real-time.",
      tags: ["LLM Agents", "RAG", "Websockets"]
    },
    {
      title: "Apex Logistics Platform",
      category: "Custom Systems",
      desc: "Built a real-time tracking interface displaying shipment analytics with low-latency updates.",
      tags: ["React", "Websockets", "Tailwind CSS"]
    },
    {
      title: "Secure Gate Auth",
      category: "Custom Systems",
      desc: "Created a tokenized session verification service executing secure validations for enterprise user authentication.",
      tags: ["JWT", "Redis", "Node.js"]
    }
  ];

  const categories = ['All', ...new Set(displayPortfolios.map(p => p.category))];

  const filteredPortfolios = filter === 'All' 
    ? displayPortfolios 
    : displayPortfolios.filter(p => p.category === filter);

  return (
    <div className="container mx-auto max-w-[1280px] px-6 py-20 relative z-[5] select-none text-left">
      
      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-4">Case Studies</Badge>
        <h1 className="text-4xl sm:text-5xl font-headline font-bold text-zinc-100 mb-4">
          Featured <GradientText>Projects</GradientText>
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
          Explore web products, apps, and custom platforms built for our clients.
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
