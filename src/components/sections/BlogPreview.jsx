import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ArrowRight, User } from 'lucide-react';
import Badge from '../ui/Badge';
import { formatTimeAgo, fallbackBlogs } from '@/pages/BlogPage';

export default function BlogPreview({ blogs = [], blogsLoading = false }) {
  if (blogsLoading) {
    return (
      <section id="blog" className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left relative z-10 animate-pulse space-y-12">
        <div className="text-center space-y-4">
          <div className="h-6 w-44 bg-cyan-500/20 rounded-full mx-auto" />
          <div className="h-10 w-2/3 bg-white/10 rounded-2xl mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-3xl bg-zinc-900/60 border border-zinc-800 p-4 space-y-4 shadow-xl">
              <div className="aspect-[16/9] w-full bg-white/10 rounded-2xl" />
              <div className="h-4 w-24 bg-cyan-500/20 rounded-full" />
              <div className="h-6 w-full bg-white/10 rounded-xl" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  const activeBlogs = Array.isArray(blogs) && blogs.length > 0 ? blogs : fallbackBlogs;
  const displayBlogs = activeBlogs.slice(0, 3);
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

      {/* Clean 3-Column Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {displayBlogs.map((post) => {
          const blogTarget = `/blog/${post.id || post.slug || post._id}`;
          const relTime = formatTimeAgo(post);
          return (
            <Link
              key={post.id || post._id}
              to={blogTarget}
              className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Clean Image Container without text overlap */}
              <div className="aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-slate-100 dark:border-zinc-800">
                <img
                  src={post.image || post.ogImage || post.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80'}
                  alt={post.imageAlt || post.keywords || post.title}
                  title={post.imageTitle || post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content Body */}
              <div className="p-6 flex flex-col justify-between flex-1 gap-4 text-left">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono mb-3">
                    <span className="px-3 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-bold uppercase">
                      {post.category || 'Engineering'}
                    </span>
                    <span className="text-slate-500 dark:text-zinc-400 font-bold">
                      ⏱️ {relTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-headline font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors leading-snug mb-2">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed line-clamp-3 font-sans">
                    {post.summary || post.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-zinc-400 mt-auto">
                  <span className="font-bold text-slate-700 dark:text-zinc-300">{post.author || 'Kvantum Team'}</span>
                  <span className="inline-flex items-center gap-1 font-bold text-cyan-600 dark:text-cyan-400 group-hover:underline">
                    Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
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
