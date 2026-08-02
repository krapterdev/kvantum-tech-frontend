import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ArrowRight, User } from 'lucide-react';
import Badge from '../ui/Badge';

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

      {/* Wide Editorial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {displayBlogs.map((post) => {
          const blogTarget = `/blog/${post.id || post.slug || post._id}`;
          return (
            <Link
              key={post.id || post._id}
              to={blogTarget}
              className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 overflow-hidden hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-md dark:shadow-xl hover:-translate-y-1"
            >
              {/* Image Thumbnail - Full View (No Cropping) */}
              <div className="relative h-52 w-full bg-slate-900/90 dark:bg-zinc-950/80 p-2 flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-zinc-800">
                <img
                  src={post.image || post.ogImage || post.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80'}
                  alt={post.title}
                  className="w-full h-full object-contain rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-900/90 text-white border border-white/20 backdrop-blur-md">
                    {post.category || 'Engineering'}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-7 flex flex-col justify-between flex-1 gap-4 text-left">
                <div>
                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-500 dark:text-zinc-400 mb-3">
                    <div className="flex items-center gap-1">
                      <User size={12} className="text-cyan-500" />
                      <span>{post.author || 'Kvantum Team'}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="text-slate-400" />
                      <span>{post.date || 'August 2026'}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-slate-400" />
                      <span>{post.readTime || '5 min'}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-headline font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed line-clamp-3 font-sans">
                    {post.summary || post.shortDesc}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 group-hover:underline pt-4 border-t border-slate-100 dark:border-zinc-800 mt-auto">
                  Read Full Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </Link>
          );
        })}
      </div>

    </section>
  );
}
