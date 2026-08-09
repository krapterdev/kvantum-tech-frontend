'use client';

import React, { useState, useEffect } from 'react';
import Link from '@/components/ui/SafeLink';
import { useSafeNavigate as useNavigate } from '@/utils/navigation';
import { 
  BookOpen, Calendar, Clock, ArrowRight, User, Search, ArrowLeft, 
  Sparkles, Eye, Share2, MessageSquare, Send, CheckCircle2
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import FAQ, { blogFaqs } from '@/components/sections/FAQ';
import { submitContact } from '@/services/contactService';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80';

export function slugifyTitle(title) {
  if (!title) return '';
  return String(title)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const DEFAULT_SEED_BLOG = {
  id: 'why-kvantum-tech-solutions-is-the-best-it-solutions-company-in-delhi-ncr',
  slug: 'why-kvantum-tech-solutions-is-the-best-it-solutions-company-in-delhi-ncr',
  title: 'Why Kvantum Tech Solutions is the Best IT Solutions Company in Delhi NCR',
  category: 'Engineering & Software',
  date: '2026-08-01',
  createdAt: '2026-08-01',
  readTime: '3d ago',
  author: 'Kvantum Tech Team',
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
  summary: 'Discover why startups and enterprises trust Kvantum Tech Solutions for custom software development, SaaS, WhatsApp API automation, and CRM software in Delhi NCR.',
  content: `
    <h2>Empowering Businesses with Scalable IT Infrastructure</h2>
    <p>In today's fast-paced digital economy, businesses in Delhi NCR require robust, custom-tailored software solutions rather than off-the-shelf software. At Kvantum Tech Solutions, we specialize in high-performance web applications, business automation, CRM tools, and enterprise SaaS products built for growth.</p>
    <h3>Core Areas of Expertise</h3>
    <ul>
      <li><strong>Custom Software Development:</strong> Scalable enterprise management tools, ERPs, and workflow automation.</li>
      <li><strong>WhatsApp API & CRM Automation:</strong> Automated customer engagement and multi-channel lead management.</li>
      <li><strong>Web & Mobile Application Architecture:</strong> Modern React, Node.js, and cloud-native solutions.</li>
    </ul>
    <p>Whether you are a growing SME or an established enterprise, our team helps digitize, automate, and scale your operations.</p>
  `,
  keywords: 'Best IT solutions company Delhi NCR, Custom software development, WhatsApp automation, CRM software'
};

export const SECOND_SEED_BLOG = {
  id: 'why-custom-software-services-are-essential-for-business-growth-kvantum-tech-solutions',
  slug: 'why-custom-software-services-are-essential-for-business-growth-kvantum-tech-solutions',
  title: 'Why Custom Software Services are Essential for Business Growth | Kvantum Tech Solutions',
  category: 'Custom Software',
  date: '2026-08-05',
  createdAt: '2026-08-05',
  readTime: '3d ago',
  author: 'Kvantum Tech Team',
  image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
  summary: 'Explore why off-the-shelf software holds growing companies back and how custom software development accelerates ROI, security, and scalability.',
  content: `
    <h2>The Competitive Advantage of Custom Software</h2>
    <p>As companies scale, rigid generic tools introduce bottlenecks. Custom software engineered specifically for your business processes eliminates operational friction, automates repetitive work, and ensures complete data ownership.</p>
    <h3>Key Benefits for Growing Enterprises</h3>
    <ul>
      <li><strong>Seamless API Integrations:</strong> Connect your CRM, ERP, and payment systems into a single unified workflow.</li>
      <li><strong>Higher Security & Compliance:</strong> Custom software gives you full control over user permissions, encryption, and data sovereignty.</li>
      <li><strong>Long-term Cost Efficiency:</strong> No recurring per-user licensing fees as your headcount grows.</li>
    </ul>
  `,
  keywords: 'Why custom software is essential, Custom software development Delhi NCR, Business software development'
};

export const fallbackBlogs = [ DEFAULT_SEED_BLOG, SECOND_SEED_BLOG ];

// ─── Dynamic Relative Time Ago Parser & Calculator ────────────────────────
export function parseAndFormatTimeAgo(customInput, fallbackCreatedAt) {
  const now = new Date();
  let targetDate = null;

  // 1. Try parsing fallbackCreatedAt (e.g. ISO timestamp or date string)
  if (fallbackCreatedAt) {
    const parsed = new Date(fallbackCreatedAt);
    if (!isNaN(parsed.getTime())) {
      targetDate = parsed;
    }
  }

  // 2. If no valid fallbackCreatedAt, try parsing customInput if it's a date string
  if (!targetDate && customInput) {
    const parsed = new Date(customInput);
    if (!isNaN(parsed.getTime())) {
      targetDate = parsed;
    }
  }

  // 3. If we have a valid targetDate, calculate real-time difference from now!
  if (targetDate) {
    const diffInSeconds = Math.max(0, Math.floor((now.getTime() - targetDate.getTime()) / 1000));
    if (diffInSeconds < 60) return 'Just now';
    const mins = Math.floor(diffInSeconds / 60);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} mo ago`;
    const yrs = Math.floor(months / 12);
    return `${yrs}y ago`;
  }

  // 4. Fallback for relative strings if date parsing failed
  if (typeof customInput === 'string' && customInput.trim()) {
    const str = customInput.trim();
    if (str.toLowerCase().includes('just') || str.toLowerCase() === 'now') return 'Just now';

    const relMatch = str.match(/^(\d+)\s*([a-z]+)(\s*ago)?$/i);
    if (relMatch) {
      const amount = parseInt(relMatch[1], 10);
      const unit = relMatch[2].toLowerCase();

      let baseTimeMs = now.getTime();
      if (unit.startsWith('m') && !unit.startsWith('mo')) baseTimeMs -= amount * 60 * 1000;
      else if (unit.startsWith('h')) baseTimeMs -= amount * 60 * 60 * 1000;
      else if (unit.startsWith('d')) baseTimeMs -= amount * 24 * 60 * 60 * 1000;
      else if (unit.startsWith('w')) baseTimeMs -= amount * 7 * 24 * 60 * 60 * 1000;
      else if (unit.startsWith('mo')) baseTimeMs -= amount * 30 * 24 * 60 * 60 * 1000;
      else if (unit.startsWith('y')) baseTimeMs -= amount * 365 * 24 * 60 * 60 * 1000;

      const diffInSeconds = Math.max(0, Math.floor((now.getTime() - baseTimeMs) / 1000));
      if (diffInSeconds < 60) return 'Just now';
      const mins = Math.floor(diffInSeconds / 60);
      if (mins < 60) return `${mins}m ago`;
      const hrs = Math.floor(mins / 60);
      if (hrs < 24) return `${hrs}h ago`;
      const days = Math.floor(hrs / 24);
      if (days < 30) return `${days}d ago`;
      const months = Math.floor(days / 30);
      if (months < 12) return `${months} mo ago`;
      const yrs = Math.floor(months / 12);
      return `${yrs}y ago`;
    }

    return str;
  }

  return 'Recently';
}

export function formatTimeAgo(readTimeOrPost, fallbackDate) {
  if (readTimeOrPost && typeof readTimeOrPost === 'object') {
    return parseAndFormatTimeAgo(readTimeOrPost.readTime, readTimeOrPost.createdAt || readTimeOrPost.date);
  }
  return parseAndFormatTimeAgo(readTimeOrPost, fallbackDate);
}

// ─── Blog Article Detail View (Split 2-Column Desktop Layout) ────────────────
function BlogDetail({ post, allBlogs = [] }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, error: '' });

  useEffect(() => {
    if (!post) return;
    const siteUrl = 'https://kvantumtechsolutions.com';
    const titleSlug = slugifyTitle(post.title);
    const slug = post.slug || titleSlug || post.id || post._id || '';
    const title   = post.metaTitle || post.title || 'Kvantum Tech Blog';
    const desc    = post.metaDesc || post.summary || '';
    const image   = post.ogImage || post.image || FALLBACK_IMG;
    const canonical = `${siteUrl}/blog/${slug}`; // 100% IDENTICAL to blog URL
    const author  = post.author || 'Kvantum Tech Team';
    const datePublished = post.date || new Date().toISOString();

    document.title = title;

    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    const setOg = (property, content) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el); }
      el.setAttribute('href', href);
    };

    setMeta('description', desc);
    setMeta('keywords', post.keywords || 'IT Solutions, Software Development, Custom CRM, Automation, Delhi NCR');
    setMeta('author', author);
    setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setLink('canonical', canonical);

    // Open Graph Complete Protocol Tags
    setOg('og:site_name',   'Kvantum Tech Solutions');
    setOg('og:url',         canonical);
    setOg('og:type',        post.ogType || 'article');
    setOg('og:title',       post.ogTitle || title);
    setOg('og:description', post.ogDesc || desc);
    setOg('og:image',       image);
    setOg('og:image:secure_url', image);
    setOg('og:image:width',  '1200');
    setOg('og:image:height', '630');
    setOg('og:image:alt',    post.imageAlt || title);
    setOg('og:image:type',   'image/jpeg');
    setOg('og:locale',       'en_US');
    setOg('og:locale:alternate', 'en_IN');
    setMeta('theme-color', '#080B14');

    // Article Specific Protocol Tags
    setOg('article:published_time', datePublished);
    setOg('article:modified_time',  post.updatedAt || post.dateModified || datePublished);
    setOg('article:author',        author);
    setOg('article:section',       post.category || 'Engineering & Software');
    if (post.keywords) {
      setOg('article:tag', post.keywords);
    }

    // Twitter Card Complete Protocol Tags
    setMeta('twitter:card',        post.twitterCard || 'summary_large_image');
    setMeta('twitter:site',        '@kvantumtech');
    setMeta('twitter:creator',     '@kvantumtech');
    setMeta('twitter:title',       post.twitterTitle || title);
    setMeta('twitter:description', post.twitterDesc || desc);
    setMeta('twitter:image',       image);
    setMeta('twitter:image:alt',   post.imageAlt || title);

    // 1. Core JSON-LD Schema
    const defaultSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": title,
      "description": desc,
      "image": image,
      "author": { "@type": "Person", "name": author },
      "publisher": {
        "@type": "Organization",
        "name": "Kvantum Tech Solutions",
        "logo": { "@type": "ImageObject", "url": `${siteUrl}/logo.png` }
      },
      "datePublished": datePublished,
      "dateModified": datePublished,
      "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
      "url": canonical,
    };
    let schemaEl = document.getElementById('blog-schema-ld');
    if (!schemaEl) {
      schemaEl = document.createElement('script');
      schemaEl.id = 'blog-schema-ld';
      schemaEl.type = 'application/ld+json';
      document.head.appendChild(schemaEl);
    }
    schemaEl.textContent = JSON.stringify(defaultSchema);

    // 2. Custom Other SEO Tags Injection
    let customTagsContainer = document.getElementById('blog-custom-seo-tags');
    if (post.otherSeoTags && post.otherSeoTags.trim() !== '') {
      if (!customTagsContainer) {
        customTagsContainer = document.createElement('div');
        customTagsContainer.id = 'blog-custom-seo-tags';
        document.head.appendChild(customTagsContainer);
      }
      customTagsContainer.innerHTML = post.otherSeoTags;
    } else if (customTagsContainer) {
      customTagsContainer.innerHTML = '';
    }

    // Cleanup
    return () => {
      document.title = 'Kvantum Tech Solutions | Best IT Solutions Company in Delhi NCR';
      const cContainer = document.getElementById('blog-custom-seo-tags');
      if (cContainer) cContainer.innerHTML = '';
    };
  }, [post]);

  if (!post) {
    return (
      <div className="container mx-auto max-w-[1280px] px-6 py-12 text-left animate-pulse space-y-8 select-none">
        <div className="h-4 w-36 bg-sky-500/20 rounded-full" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex gap-3">
              <div className="h-6 w-28 bg-sky-500/20 rounded-full" />
              <div className="h-6 w-20 bg-pink-500/20 rounded-full" />
            </div>
            <div className="h-10 w-full bg-slate-800/80 rounded-2xl" />
            <div className="h-8 w-3/4 bg-slate-800/60 rounded-2xl" />
            <div className="w-full aspect-[16/9] bg-slate-800/70 rounded-3xl" />
            <div className="space-y-3 pt-4">
              <div className="h-4 w-full bg-slate-800/50 rounded-lg" />
              <div className="h-4 w-11/12 bg-slate-800/50 rounded-lg" />
              <div className="h-4 w-4/5 bg-slate-800/50 rounded-lg" />
            </div>
          </div>
          <div className="lg:col-span-4 hidden lg:block">
            <div className="h-[450px] w-full bg-slate-800/60 rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  // Filter recent articles excluding current post
  const recentArticles = allBlogs.filter(b => (b.id || b.slug || b._id) !== (post.id || post.slug || post._id));

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Enter name.';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Enter valid email.';
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      errors.phone = 'Enter 10-digit phone.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Enter details (at least 10 chars).';
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus({ loading: true, error: '' });
    try {
      await submitContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: `Inquiry via Article: ${post.title}`,
        message: formData.message.trim(),
        notes: `Message: ${formData.message.trim()}`,
      });
      setStatus({ loading: false, error: '' });
      navigate('/thank-you');
    } catch (err) {
      setStatus({ loading: false, error: '' });
      navigate('/thank-you');
    }
  };

  const relativeTime = parseAndFormatTimeAgo(post.readTime || post.date, post.createdAt);

  return (
    <div className="container mx-auto max-w-[1280px] px-6 py-10 text-left select-none space-y-12">
      
      <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-sky-600 dark:text-sky-400 hover:underline">
        <ArrowLeft size={14} /> Back to All Articles
      </Link>

      {/* 2-COLUMN SPLIT DESKTOP LAYOUT (IMAGE 1 REQUIREMENT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT / MAIN COLUMN (8 COLS): FULL ARTICLE CONTENT */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Header Metadata */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                {post.category || 'IT Solutions'}
              </span>
              <span className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
                ⏱️ {relativeTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-headline text-slate-900 dark:text-white leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 border-y border-slate-200 dark:border-zinc-800 py-3">
              <div className="flex items-center gap-1.5">
                <User size={14} className="text-sky-500" />
                <span className="font-bold text-slate-900 dark:text-white">{post.author || 'Kvantum Tech Team'}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-slate-400" />
                <span>{post.date || 'August 2026'}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-slate-400" />
                <span>{post.readTime || '5 min read'}</span>
              </div>
            </div>
          </div>

          {/* Main Cover Image Banner */}
          <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-zinc-800 bg-slate-900">
            <img 
              src={post.image || post.ogImage || post.coverImage || FALLBACK_IMG} 
              alt={post.imageAlt || post.keywords || post.title} 
              title={post.imageTitle || post.title}
              loading="lazy"
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Article Content Body */}
          <div
            className="text-slate-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed space-y-6 font-sans border-b border-slate-200 dark:border-zinc-800 pb-10
              [&_h1]:text-3xl [&_h1]:font-black [&_h1]:font-headline [&_h1]:text-slate-900 [&_h1]:dark:text-white [&_h1]:mt-8 [&_h1]:mb-4
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:font-headline [&_h2]:text-slate-900 [&_h2]:dark:text-white [&_h2]:mt-8 [&_h2]:mb-4
              [&_h3]:text-xl [&_h3]:font-bold [&_h3]:font-headline [&_h3]:text-slate-900 [&_h3]:dark:text-white [&_h3]:mt-6 [&_h3]:mb-3
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4
              [&_li]:mb-2 [&_a]:text-sky-600 [&_a]:underline [&_strong]:font-bold [&_em]:italic
              [&_img]:max-w-full [&_img]:rounded-3xl [&_img]:my-6 [&_p]:mb-4"
            dangerouslySetInnerHTML={{ __html: post.content || post.summary }}
          />

        </div>

        {/* RIGHT SIDEBAR COLUMN (4 COLS): CONTACT FORM ON TOP + RECENT BLOGS LIST BELOW */}
        <div className="lg:col-span-4 space-y-8 sticky top-24">
          
          {/* TOP: COMPACT CONTACT CONSULTATION FORM (IMAGE 1 REQUIREMENT) */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 text-white dark:bg-zinc-900 border border-slate-800 shadow-2xl space-y-4">
            <div className="space-y-1 text-left">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-pink-500/20 text-pink-400 font-bold uppercase inline-flex items-center gap-1">
                <Sparkles size={12} /> Free IT Consultation
              </span>
              <h3 className="text-xl font-headline font-bold uppercase text-white">
                Request Project Quote
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Need custom software or business automation? Get in touch with our technical lead.
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-3 text-left">
              {status.error && (
                <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                  ⚠️ {status.error}
                </div>
              )}

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 font-bold">Your Name *</label>
                <input
                  type="text"
                  placeholder="Sahil Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white text-xs outline-none focus:border-sky-500"
                />
                {fieldErrors.name && <span className="text-[10px] text-red-400 font-mono mt-0.5 block">⚠️ {fieldErrors.name}</span>}
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 font-bold">Email Inbox *</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white text-xs outline-none focus:border-sky-500"
                />
                {fieldErrors.email && <span className="text-[10px] text-red-400 font-mono mt-0.5 block">⚠️ {fieldErrors.email}</span>}
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 font-bold">Mobile Phone *</label>
                <input
                  type="tel"
                  placeholder="9811661828"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white text-xs outline-none focus:border-sky-500 font-mono"
                />
                {fieldErrors.phone && <span className="text-[10px] text-red-400 font-mono mt-0.5 block">⚠️ {fieldErrors.phone}</span>}
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 font-bold">Requirements *</label>
                <textarea
                  rows={2}
                  placeholder="Software / App requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white text-xs outline-none focus:border-sky-500 resize-none"
                />
                {fieldErrors.message && <span className="text-[10px] text-red-400 font-mono mt-0.5 block">⚠️ {fieldErrors.message}</span>}
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs font-mono uppercase tracking-wider transition-colors shadow-lg cursor-pointer mt-1"
              >
                {status.loading ? 'Submitting...' : 'SUBMIT REQUEST →'}
              </button>
            </form>
          </div>

          {/* BOTTOM: RECENT BLOGS SIDEBAR LIST (IMAGE 1 REQUIREMENT) */}
          {recentArticles.length > 0 && (
            <div className="space-y-4 text-left">
              <h4 className="text-lg font-headline font-black text-slate-900 dark:text-white uppercase border-b border-slate-200 dark:border-zinc-800 pb-2">
                Recent Articles
              </h4>

              <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1">
                {recentArticles.map((article) => {
                  const articleUrl = `/blog/${article.id || article.slug || article._id}`;
                  const relTime = formatTimeAgo(article);
                  return (
                    <Link
                      key={article.id || article.slug || article._id}
                      to={articleUrl}
                      className="flex items-start gap-3.5 p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-sky-500/40 transition-all duration-200 group cursor-pointer"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-100 dark:border-zinc-800">
                        <img
                          src={article.image || article.ogImage || article.coverImage || FALLBACK_IMG}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-[9px] font-mono text-slate-500 dark:text-zinc-400">
                          <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold uppercase truncate max-w-[90px]">
                            {article.category || 'Tech'}
                          </span>
                          <span>⏱️ {relTime}</span>
                        </div>

                        <h5 className="text-xs font-headline font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors leading-snug line-clamp-2">
                          {article.title}
                        </h5>

                        <span className="text-[10px] font-mono text-slate-400 block">
                          {article.readTime || '5 min read'}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* CENTERED BLOG DETAIL FAQ SECTION */}
      <div className="w-full max-w-[960px] mx-auto text-center border-t border-slate-200 dark:border-zinc-800 pt-12">
        <FAQ 
          items={Array.isArray(post.faqs) && post.faqs.length > 0 ? post.faqs : blogFaqs} 
          title="Article Technical Insights & FAQs" 
          subtitle="Frequently Asked Questions" 
        />
      </div>

    </div>
  );
}

// ─── Blog Listing Main Grid (Clean Professional 3-Column Grid) ─────────────
export default function BlogPage({ blogs = [], loading = false }) {
  const slug = null;
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const displayBlogs = Array.isArray(blogs) ? blogs : [];

  // Single Article Detail View
  if (slug) {
    const post = displayBlogs.find(b => 
      b.id === slug || 
      b.slug === slug || 
      b._id === slug || 
      slugifyTitle(b.title) === slug
    ) || null;

    if (loading && !post) {
      return (
        <div className="container mx-auto max-w-[1000px] px-6 py-16 text-left animate-pulse space-y-8 select-none">
          <div className="h-8 w-36 bg-white/10 rounded-xl" />
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
            <div className="h-6 w-32 bg-cyan-500/20 rounded-full" />
            <div className="h-12 w-3/4 bg-white/10 rounded-2xl" />
            <div className="h-6 w-full bg-white/5 rounded-xl" />
          </div>
        </div>
      );
    }

    return <BlogDetail post={post} allBlogs={displayBlogs} />;
  }

  const categories = ['All', ...new Set(displayBlogs.map(b => b.category).filter(Boolean))];

  const filteredBlogs = displayBlogs.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.summary && post.summary.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="container mx-auto max-w-[1280px] px-6 py-12 text-left select-none space-y-14">

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

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles & engineering guides..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500 shadow-md font-sans"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      {categories.length > 1 && (
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
      )}

      {/* Loading Skeleton vs Empty State vs Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-3xl bg-zinc-900/60 border border-zinc-800 p-4 space-y-4 shadow-xl">
              <div className="aspect-[16/9] w-full bg-white/10 rounded-2xl" />
              <div className="h-4 w-24 bg-cyan-500/20 rounded-full" />
              <div className="h-6 w-full bg-white/10 rounded-xl" />
              <div className="h-12 w-full bg-white/5 rounded-xl" />
            </div>
          ))}
        </div>
      ) : displayBlogs.length === 0 ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-12 bg-white/[0.02] border border-white/8 rounded-3xl max-w-xl mx-auto my-8 space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-2">
            <BookOpen size={32} className="text-cyanCustom animate-pulse" />
          </div>
          <h3 className="text-2xl font-headline font-bold text-zinc-100">No Articles Published Yet</h3>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
            No articles published yet. Fresh engineering insights, SaaS tutorials, and technology updates will appear here as soon as they are published from the Admin Portal!
          </p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-5xl mb-4">✍️</p>
          <h3 className="text-xl font-bold font-headline text-slate-900 dark:text-white mb-2">No Articles Published Yet</h3>
          <p className="text-slate-600 dark:text-zinc-400 text-sm">Stay tuned — new engineering insights and guides are coming soon!</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-5xl mb-4">🔍</p>
          <h3 className="text-xl font-bold font-headline text-slate-900 dark:text-white mb-2">No Articles Found</h3>
          <p className="text-slate-600 dark:text-zinc-400 text-sm">Try a different search term or category.</p>
        </div>
      ) : (
        /* Uniform Clean Professional 3-Column Grid for All Blog Posts */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredBlogs.map((post) => {
            const blogTarget = `/blog/${post.id || post.slug || post._id}`;
            const relTime = formatTimeAgo(post);
            return (
              <Link
                key={post.id || post.slug || post._id}
                to={blogTarget}
                className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-sky-500/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                {/* 16:9 Image Container without text overlap */}
                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-slate-100 dark:border-zinc-800">
                  <img
                    src={post.image || post.ogImage || post.coverImage || FALLBACK_IMG}
                    alt={post.imageAlt || post.keywords || post.title}
                    title={post.imageTitle || post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex flex-col justify-between flex-1 gap-4 text-left">
                  <div>
                    {/* Category & Relative Time Badges Below Image */}
                    <div className="flex items-center justify-between text-[11px] font-mono mb-3">
                      <span className="px-3 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-bold uppercase">
                        {post.category || 'Engineering'}
                      </span>
                      <span className="text-slate-500 dark:text-zinc-400 font-bold">
                        ⏱️ {relTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-headline font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors leading-snug mb-2">
                      {post.title}
                    </h3>

                    <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed line-clamp-3 font-sans">
                      {post.summary || post.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-zinc-400 mt-auto">
                    <span className="font-bold text-slate-700 dark:text-zinc-300">{post.author || 'Kvantum Team'}</span>
                    <span className="inline-flex items-center gap-1 font-bold text-sky-600 dark:text-sky-400 group-hover:underline">
                      Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Blog Specific FAQ */}
      <FAQ items={blogFaqs} title="Engineering Blog" subtitle="Frequently Asked Questions" />

    </div>
  );
}
