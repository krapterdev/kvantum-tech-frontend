import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import BlogPreview from '@/components/sections/BlogPreview';

export default function BlogPage({ blogs = [] }) {
  return (
    <div className="space-y-16">
      
      {/* Page Header */}
      <div className="container mx-auto max-w-[1280px] px-6 pt-8 text-center select-none">
        <Badge className="mb-4 mx-auto inline-flex items-center gap-1.5 bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400 font-mono text-xs">
          <BookOpen size={14} /> Kvantum Knowledge Base
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black font-headline text-slate-900 dark:text-white uppercase leading-tight mb-4">
          ENGINEERING INSIGHTS & <br />
          <span className="gradient-text">BUSINESS AUTOMATION GUIDES</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base">
          Articles, architectural blueprints, and best practices on custom software, WhatsApp API automation, CRM development, and cloud scalability.
        </p>
      </div>

      {/* Blog Articles Grid */}
      <BlogPreview blogs={blogs} />

    </div>
  );
}
