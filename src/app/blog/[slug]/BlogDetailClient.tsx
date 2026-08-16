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
        <div className="h-8 w-36 bg-slate-200 dark:bg-white/10 rounded-xl" />
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="h-6 w-32 bg-cyan-500/20 rounded-full" />
          <div className="h-12 w-3/4 bg-slate-200 dark:bg-white/10 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto max-w-[1000px] px-6 py-24 text-center">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Article Not Found</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">The blog post you&apos;re looking for doesn&apos;t exist or has been moved.</p>
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
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-12 text-left">

      <div className="mb-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-mono font-bold">
          <ArrowLeft size={14} /> Back to Blog
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">

        {/* Main Article */}
        <article className="flex-1 min-w-0">
          {(post.image || post.ogImage || post.coverImage) && (
            <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden mb-8 border border-slate-200 dark:border-slate-800 shadow-md">
              <img
                src={post.image || post.ogImage || post.coverImage}
                alt={post.imageAlt || post.title}
                title={post.imageTitle || post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {post.category && (
            <Badge className="mb-4 bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400 font-mono text-xs">
              <BookOpen size={12} /> {post.category}
            </Badge>
          )}

          <h1 className="text-3xl sm:text-5xl font-black font-headline text-slate-900 dark:text-white leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400 font-mono mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
            {post.author && <span className="flex items-center gap-1 font-semibold"><User size={12} /> {post.author}</span>}
            {(post.date || post.createdAt) && <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(post.date || post.createdAt)}</span>}
            {post.readTime && <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>}
          </div>

          {/* Article HTML Content with Light/Dark Mode Styling & Paragraph Spacing */}
          {contentHtml ? (
            <div
              className="blog-content prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed sm:leading-8 space-y-6 [&_p]:mb-6 [&_p]:leading-relaxed sm:[&_p]:leading-8 [&_h2]:text-slate-900 [&_h2]:dark:text-white [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-black [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-slate-900 [&_h3]:dark:text-white [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-3 [&_li]:text-slate-800 [&_li]:dark:text-slate-200 [&_blockquote]:border-l-4 [&_blockquote]:border-cyan-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-700 [&_blockquote]:dark:text-slate-300"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : null}

          {faqs.length > 0 && (
            <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
              <FAQ items={faqs} title="Frequently Asked Questions" subtitle="Quick Answers" />
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <span className="text-xs text-slate-500 font-mono flex items-center gap-1"><Share2 size={12} /> Share:</span>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=https://kvantumtechsolutions.com/blog/${post.slug || post.id}`}
              target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-blue-600/10 dark:bg-blue-600/20 border border-blue-600/30 text-blue-600 dark:text-blue-400 text-xs hover:bg-blue-600/30 transition-all font-mono font-bold"
            >LinkedIn</a>
            <a
              href={`https://twitter.com/intent/tweet?url=https://kvantumtechsolutions.com/blog/${post.slug || post.id}&text=${encodeURIComponent(post.title)}`}
              target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-sky-600/10 dark:bg-sky-600/20 border border-sky-600/30 text-sky-600 dark:text-sky-400 text-xs hover:bg-sky-600/30 transition-all font-mono font-bold"
            >Twitter / X</a>
          </div>
        </article>

        {/* Sidebar */}
        {recentArticles.length > 0 && (
          <aside className="w-full lg:w-[320px] shrink-0 space-y-4">
            <h4 className="text-sm font-headline font-black text-slate-900 dark:text-white uppercase tracking-widest pb-2 border-b border-slate-200 dark:border-slate-800">
              Recent Articles
            </h4>
            <div className="flex flex-col gap-4">
              {recentArticles.map((article: any) => (
                <Link
                  key={article.id || article.slug || article._id}
                  href={`/blog/${article.slug || article.id}`}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 hover:border-sky-500/40 transition-all group shadow-sm"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 shrink-0">
                    <img
                      src={article.image || FALLBACK_IMG}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug line-clamp-2 mb-1">
                      {article.title}
                    </h5>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{article.readTime || '5 min read'}</span>
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
