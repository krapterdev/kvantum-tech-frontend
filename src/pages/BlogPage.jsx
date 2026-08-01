import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ArrowRight, User, Search, Sparkles, Send } from 'lucide-react';
import Badge from '@/components/ui/Badge';

const defaultBlogs = [
  {
    id: 'custom-software-vs-saas-2026',
    title: 'Custom Software vs Off-the-Shelf SaaS: Why Growing Businesses Need Custom Code in 2026',
    category: 'Custom Software',
    readTime: '5 min read',
    date: 'July 30, 2026',
    author: 'Sahil Kumar (Head of Tech)',
    summary: 'Discover how custom software eliminates recurring subscription bloat, locks in 100% data privacy, and scales tailored to your exact business workflows.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'whatsapp-business-api-automation-guide',
    title: 'How WhatsApp Business API Automation Can Double Sales Conversion Under 5 Seconds',
    category: 'WhatsApp Automation',
    readTime: '6 min read',
    date: 'July 28, 2026',
    author: 'Anil Thapa (Head of SMO)',
    summary: 'Learn how automated WhatsApp lead qualification bots, instant PDF quotation triggers, and 24/7 drip messaging turn ad clicks into paying clients.',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'building-scalable-crm-hrms-systems',
    title: 'The Blueprint for Building Enterprise-Grade CRM & HRMS Platforms That Scale',
    category: 'Enterprise Solutions',
    readTime: '7 min read',
    date: 'July 25, 2026',
    author: 'Bhavya Nigam (Head of Growth)',
    summary: 'Explore core architectural principles for multi-tenant CRM databases, biometric attendance sync, automated payroll generation, and audit logging.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
  },
];

export default function BlogPage({ blogs = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const displayBlogs = blogs.length > 0 ? blogs : defaultBlogs;

  const categories = ['All', 'Custom Software', 'WhatsApp Automation', 'Enterprise Solutions'];

  const filteredBlogs = displayBlogs.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (post.summary && post.summary.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="container mx-auto max-w-[1280px] px-6 py-12 text-left select-none space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-4xl mx-auto">
        <Badge className="mb-4 mx-auto inline-flex items-center gap-1.5 bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400 font-mono text-xs">
          <BookOpen size={14} /> Knowledge Base & Architecture Insights
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black font-headline text-slate-900 dark:text-white uppercase leading-tight mb-4">
          ENGINEERING INSIGHTS & <br />
          <span className="gradient-text">BUSINESS AUTOMATION GUIDES</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-8">
          Articles, architectural blueprints, and best practices on custom software, WhatsApp API automation, CRM development, and cloud scalability.
        </p>

        {/* Search Bar & Category Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
          <div className="relative w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles & engineering guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500 shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all duration-200 cursor-pointer ${
              activeCategory === cat
                ? 'bg-sky-500 text-white shadow-md'
                : 'bg-white dark:bg-zinc-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-800 hover:border-sky-500/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Editorial Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredBlogs.map((post) => (
          <div
            key={post.id || post._id}
            className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-sky-500/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            {/* Image Thumbnail */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={post.image || defaultBlogs[0].image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-900/85 text-white border border-white/20 backdrop-blur-md">
                  {post.category || 'Engineering'}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-7 flex flex-col justify-between flex-1 gap-4">
              <div>
                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-500 dark:text-zinc-400 mb-3">
                  <div className="flex items-center gap-1">
                    <User size={12} className="text-sky-500" />
                    <span>{post.author || 'Kvantum Team'}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar size={12} className="text-slate-400" />
                    <span>{post.date || 'July 2026'}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock size={12} className="text-slate-400" />
                    <span>{post.readTime || '5 min'}</span>
                  </div>
                </div>

                <h3 className="text-lg font-headline font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors leading-snug mb-3">
                  {post.title}
                </h3>

                <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {post.summary || post.shortDesc}
                </p>
              </div>

              <Link
                to={`/blog/${post.id || post.slug || post._id}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-sky-600 dark:text-sky-400 hover:underline pt-4 border-t border-slate-100 dark:border-zinc-800 mt-auto"
              >
                Read Full Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
