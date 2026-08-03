import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ArrowRight, User, ArrowUpRight } from 'lucide-react';
import Badge from '../ui/Badge';
import { formatTimeAgo } from '@/pages/BlogPage';

export default function BlogPreview({ blogs = [] }) {
  const displayBlogs = blogs.slice(0, 3);
  if (displayBlogs.length === 0) return null;

  return (
    <section id="blog" className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left relative z-10">
      
      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-4 mx-auto inline-flex items-center gap-1.5 bg-cyan-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-mono text-xs">
          <BookOpen size={14} /> Articles & Engineering Insights
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-900 dark:text-white leading-tight mb-4">
          Latest Insights on Software, <br />
          <span className="gradient-text">Automation & Enterprise Growth</span>
        </h2>
      </div>

      {/* Modern Bento Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {displayBlogs.map((post) => {
          const blogTarget = `/blog/${post.id || post.slug || post._id}`;
          const relTime = formatTimeAgo(post.createdAt || post.date);
          return (
            <Link
              key={post.id || post._id}
              to={blogTarget}
              className="rounded-[32px] bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 p-3 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-sky-500/50 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer relative"
            >
              {/* Bento Image Container */}
              <div className="relative aspect-[16/10] w-full rounded-[24px] overflow-hidden bg-slate-900 border border-slate-100 dark:border-zinc-800/80">
                <img
                  src={post.image || post.ogImage || post.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80'}
                  alt={post.imageAlt || post.keywords || post.title}
                  title={post.imageTitle || post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-900/80 text-white border border-white/20 backdrop-blur-md">
                    {post.category || 'Engineering'}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-white/90 dark:bg-zinc-900/90 text-slate-900 dark:text-white border border-white/20 backdrop-blur-md">
                    ⏱️ {relTime}
                  </span>
                </div>

                {/* Circular Arrow Button (Image 2 style) */}
                <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-900/90 text-slate-900 dark:text-white flex items-center justify-center shadow-lg border border-white/20 backdrop-blur-md group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                  <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex flex-col justify-between flex-1 gap-3 text-left">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-zinc-400 mb-2">
                    <span>By {post.author || 'Kvantum Team'}</span>
                    <span>•</span>
                    <span>{post.date || 'August 2026'}</span>
                    <span>•</span>
                    <span>{post.readTime || '5 min'}</span>
                  </div>

                  <h3 className="text-lg font-headline font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors leading-snug mb-2">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed line-clamp-2 font-sans">
                    {post.summary || post.shortDesc}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 group-hover:underline pt-3 border-t border-slate-100 dark:border-zinc-800/60 mt-auto">
                  Read Article <ArrowUpRight size={14} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-xs font-mono font-bold hover:border-cyan-500/50 transition-all shadow-md group"
        >
          View All Engineering Articles <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </section>
  );
}
