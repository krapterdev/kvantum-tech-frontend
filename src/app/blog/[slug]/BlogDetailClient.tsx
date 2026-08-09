/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import FAQ from '@/components/sections/FAQ';
import { ArrowLeft, Calendar, Clock, User, BookOpen, Share2 } from 'lucide-react';
import { fallbackBlogs } from '@/data/blogs';
import * as blogService from '@/services/blogService';

const FALLBACK_IMG = 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/logo-2-FINAL-DM.jpg';

function formatDate(dateStr: any): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? String(dateStr) : d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogDetailClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<any>(null);
  const [allBlogs, setAllBlogs] = useState<any[]>(fallbackBlogs as any[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const findPost = (list: any[]) => list.find((b: any) => b.slug === slug || b.id === slug || b._id === slug);

    const fetchBlogs = async () => {
      try {
        const data = await (blogService as any).getAllBlogs();
        if (Array.isArray(data) && data.length > 0) {
          setAllBlogs(data);
          const found = findPost(data);
          if (found) { setPost(found); setLoading(false); return; }
        }
      } catch (e) {}

      const found = findPost(fallbackBlogs as any[]);
      setPost(found || (fallbackBlogs as any[])[0]);
      setLoading(false);
    };

    fetchBlogs();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto max-w-[1000px] px-6 py-16 animate-pulse space-y-8">
        <div className="h-8 w-36 bg-white/10 rounded-xl" />
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="h-6 w-32 bg-cyan-500/20 rounded-full" />
          <div className="h-12 w-3/4 bg-white/10 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto max-w-[1000px] px-6 py-24 text-center">
        <h1 className="text-4xl font-black text-white mb-4">Article Not Found</h1>
        <p className="text-slate-400 mb-8">The blog post you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-all">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  const recentArticles = allBlogs.filter((b: any) => (b.slug || b.id) !== (post.slug || post.id)).slice(0, 5);
  const contentHtml: string = post.content || post.longDesc || '';
  const faqs: any[] = Array.isArray(post.faqs) && post.faqs.length > 0 ? post.faqs : [];

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-12">

      <div className="mb-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors font-mono">
          <ArrowLeft size={14} /> Back to Blog
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">

        {/* Main Article */}
        <article className="flex-1 min-w-0">
          {(post.image || post.ogImage || post.coverImage) && (
            <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden mb-8 border border-slate-800">
              <img
                src={post.image || post.ogImage || post.coverImage}
                alt={post.imageAlt || post.title}
                title={post.imageTitle || post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {post.category && (
            <Badge className="mb-4 bg-sky-500/10 border-sky-500/20 text-sky-400 font-mono text-xs">
              <BookOpen size={12} /> {post.category}
            </Badge>
          )}

          <h1 className="text-3xl sm:text-5xl font-black font-headline text-white leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono mb-8 pb-8 border-b border-slate-800">
            {post.author && <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>}
            {(post.date || post.createdAt) && <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(post.date || post.createdAt)}</span>}
            {post.readTime && <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>}
          </div>

          {post.summary && (
            <p className="text-slate-300 text-lg leading-relaxed mb-8 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              {post.summary}
            </p>
          )}

          {contentHtml ? (
            <div
              className="blog-content prose prose-invert prose-slate max-w-none text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : null}

          {faqs.length > 0 && (
            <div className="mt-16 pt-12 border-t border-slate-800">
              <FAQ items={faqs} title="Frequently Asked Questions" subtitle="Quick Answers" />
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-slate-800 flex items-center gap-4">
            <span className="text-xs text-slate-500 font-mono flex items-center gap-1"><Share2 size={12} /> Share:</span>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=https://kvantumtechsolutions.com/blog/${post.slug || post.id}`}
              target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-blue-600/20 border border-blue-600/30 text-blue-400 text-xs hover:bg-blue-600/40 transition-all font-mono"
            >LinkedIn</a>
            <a
              href={`https://twitter.com/intent/tweet?url=https://kvantumtechsolutions.com/blog/${post.slug || post.id}&text=${encodeURIComponent(post.title)}`}
              target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-sky-600/20 border border-sky-600/30 text-sky-400 text-xs hover:bg-sky-600/40 transition-all font-mono"
            >Twitter / X</a>
          </div>
        </article>

        {/* Sidebar */}
        {recentArticles.length > 0 && (
          <aside className="w-full lg:w-[300px] shrink-0 space-y-4">
            <h4 className="text-sm font-headline font-black text-white uppercase tracking-widest pb-2 border-b border-slate-800">
              Recent Articles
            </h4>
            <div className="flex flex-col gap-4">
              {recentArticles.map((article: any) => (
                <Link
                  key={article.id || article.slug || article._id}
                  href={`/blog/${article.slug || article.id}`}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition-all group"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                    <img
                      src={article.image || FALLBACK_IMG}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors leading-snug line-clamp-2 mb-1">
                      {article.title}
                    </h5>
                    <span className="text-[10px] font-mono text-slate-500">{article.readTime || '5 min read'}</span>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        )}

      </div>
    </div>
  );
}
