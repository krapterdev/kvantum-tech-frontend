import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Card from '../ui/Card';
import SectionHeading from '../ui/SectionHeading';
import Badge from '../ui/Badge';

export default function Projects() {
  const portfolios = [
    {
      title: "Finova Pay Gateway",
      category: "Fintech Platform",
      desc: "Designed and built a custom payment gateway handling thousands of secure API calls per minute under sub-second load times.",
      tags: ["Node.js", "PostgreSQL", "Docker"]
    },
    {
      title: "NovaStore Headless Shop",
      category: "E-Commerce Ecosystem",
      desc: "Created a modern headless e-commerce store with dynamic catalog filtering, resulting in a 35% increase in purchase conversions.",
      tags: ["React", "Vite", "Stripe API"]
    },
    {
      title: "DexAI Support Assistant",
      category: "AI Integration",
      desc: "Developed a context-aware customer support chatbot that uses retrieval-augmented generation to handle client queries in real-time.",
      tags: ["LLM Agents", "RAG", "Websockets"]
    }
  ];

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-20 select-none">
      <SectionHeading
        badge="Case Studies"
        title="Featured Work"
        subtitle="Recent web applications and custom platforms launched for our clients."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portfolios.map((p, idx) => (
          <Card key={idx} className="p-8 flex flex-col justify-between min-h-[300px] border text-left hover:-translate-y-1 transition-all duration-300">
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
            
            <div className="flex flex-wrap gap-2 mt-6">
              {p.tags.map((t, tIdx) => (
                <span key={tIdx} className="text-[10px] font-mono bg-white/[0.02] border border-white/8 px-2.5 py-1 rounded-md text-zinc-400">
                  {t}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
