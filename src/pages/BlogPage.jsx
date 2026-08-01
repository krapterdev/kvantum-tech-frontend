import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ArrowRight, User, Search, ArrowLeft } from 'lucide-react';
import Badge from '@/components/ui/Badge';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80';

// ─── Blog Article Detail View ───────────────────────────────────────────────
function BlogDetail({ post }) {
  useEffect(() => {
    if (!post) return;
    const siteUrl = 'https://kvantumtechsolutions.com';
    const slug = post.id || post.slug || post._id || '';
    const title   = post.metaTitle || post.title || 'Kvantum Tech Blog';
    const desc    = post.metaDesc || post.summary || '';
    const image   = post.ogImage || post.image || FALLBACK_IMG;
    const canonical = post.canonical || `${siteUrl}/blog/${slug}`;
    const author  = post.author || 'Kvantum Tech Team';
    const datePublished = post.date || new Date().toISOString();

    // title
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
    setMeta('keywords', post.keywords || '');
    setMeta('author', author);
    setMeta('robots', 'index, follow');
    setLink('canonical', canonical);

    // Open Graph
    setOg('og:type',        post.ogType || 'article');
    setOg('og:title',       post.ogTitle || title);
    setOg('og:description', post.ogDesc || desc);
    setOg('og:image',       image);
    setOg('og:url',         canonical);
    setOg('og:site_name',   'Kvantum Tech Solutions');
    setOg('article:published_time', datePublished);
    setOg('article:author', author);

    // Twitter Card
    setMeta('twitter:card',        post.twitterCard || 'summary_large_image');
    setMeta('twitter:title',       post.twitterTitle || title);
    setMeta('twitter:description', post.twitterDesc || desc);
    setMeta('twitter:image',       image);
    setMeta('twitter:site',        '@kvantumtech');

    // Article JSON-LD Schema
    const schema = {
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
    schemaEl.textContent = JSON.stringify(schema);

    return () => {
      // restore on unmount
      document.title = 'Kvantum Tech Solutions | Best IT Solutions Company in Delhi NCR';
    };
  }, [post]);

  if (!post) {
    return (
      <div className="container mx-auto max-w-[900px] px-6 py-24 text-center">
        <p className="text-4xl mb-4">📄</p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Article Not Found</h2>
        <Link to="/blog" className="text-sky-500 hover:underline font-mono text-sm">← Back to all articles</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-[900px] px-6 py-12 text-left select-none space-y-8">
      <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-sky-600 dark:text-sky-400 hover:underline">
        <ArrowLeft size={14} /> Back to All Articles
      </Link>

      <div className="space-y-4">
        <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
          {post.category || 'IT Solutions'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-headline text-slate-900 dark:text-white leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 border-y border-slate-200 dark:border-zinc-800 py-3">
          <div className="flex items-center gap-1.5">
            <User size={14} className="text-sky-500" />
            <span>{post.author || 'Kvantum Tech Team'}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-slate-400" />
            <span>{post.date || 'August 2026'}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-slate-400" />
            <span>{post.readTime || '6 min read'}</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[380px] rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-zinc-800">
        <img src={post.image || FALLBACK_IMG} alt={post.title} className="w-full h-full object-cover" />
      </div>

      <div
        className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 font-sans border-b border-slate-200 dark:border-zinc-800 pb-12
          [&_h1]:text-3xl [&_h1]:font-black [&_h1]:font-headline [&_h1]:text-slate-900 [&_h1]:dark:text-white [&_h1]:mt-6 [&_h1]:mb-3
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:font-headline [&_h2]:text-slate-900 [&_h2]:dark:text-white [&_h2]:mt-6 [&_h2]:mb-3
          [&_h3]:text-xl [&_h3]:font-bold [&_h3]:font-headline [&_h3]:text-slate-900 [&_h3]:dark:text-white [&_h3]:mt-5 [&_h3]:mb-2
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4
          [&_li]:mb-1.5 [&_a]:text-sky-600 [&_a]:underline [&_strong]:font-bold [&_em]:italic
          [&_img]:max-w-full [&_img]:rounded-2xl [&_img]:my-4"
        dangerouslySetInnerHTML={{ __html: post.content || post.summary }}
      />

      <div className="p-8 rounded-3xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
        <div>
          <h4 className="text-lg font-headline font-bold text-slate-900 dark:text-white mb-1">Need IT Solutions for Your Business?</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">Get custom web apps, mobile applications, CRM software, & digital marketing.</p>
        </div>
        <Link to="/contact" className="px-6 py-3 rounded-xl bg-pink-500 text-white font-bold text-xs hover:bg-pink-600 transition-colors shadow-md shrink-0">
          Discuss Your Project →
        </Link>
      </div>
    </div>
  );
}

// ─── Blog Listing Grid ───────────────────────────────────────────────────────
export default function BlogPage({ blogs = [] }) {
  const { slug } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const displayBlogs = blogs;

  // Single Article Detail View
  if (slug) {
    const post = displayBlogs.find(b => b.id === slug || b.slug === slug || b._id === slug);
    return <BlogDetail post={post} />;
  }

  // Categories from real data
  const categories = ['All', ...new Set(displayBlogs.map(b => b.category).filter(Boolean))];

  const filteredBlogs = displayBlogs.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

      {/* Empty States */}
      {displayBlogs.length === 0 ? (
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredBlogs.map((post) => (
            <div
              key={post.id || post.slug || post._id}
              className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-sky-500/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={post.image || FALLBACK_IMG}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-900/85 text-white border border-white/20 backdrop-blur-md">
                    {post.category || 'Engineering'}
                  </span>
                </div>
              </div>

              <div className="p-7 flex flex-col justify-between flex-1 gap-4">
                <div>
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
      )}
    </div>
  );
}
