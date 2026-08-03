import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Calendar, Clock, ArrowRight, User, Search, ArrowLeft, 
  ArrowUpRight, Send, CheckCircle2, Sparkles, AlertCircle 
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import FAQ, { blogFaqs } from '@/components/sections/FAQ';
import { submitContact } from '@/services/contactService';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80';

// ─── Relative Time Ago Helper (Facebook / Social Style) ──────────────────────
export function formatTimeAgo(dateString) {
  if (!dateString) return 'Recently';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 0) return 'Just now';
  if (diffInSeconds < 60) return 'Just now';

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} mo ago`;

  const years = Math.floor(months / 12);
  return `${years}y ago`;
}

// ─── Blog Article Detail View ───────────────────────────────────────────────
function BlogDetail({ post, allBlogs = [] }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, error: '' });

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

    setOg('og:type',        post.ogType || 'article');
    setOg('og:title',       post.ogTitle || title);
    setOg('og:description', post.ogDesc || desc);
    setOg('og:image',       image);
    setOg('og:url',         canonical);
    setOg('og:site_name',   'Kvantum Tech Solutions');
    setOg('article:published_time', datePublished);
    setOg('article:author', author);

    setMeta('twitter:card',        post.twitterCard || 'summary_large_image');
    setMeta('twitter:title',       post.twitterTitle || title);
    setMeta('twitter:description', post.twitterDesc || desc);
    setMeta('twitter:image',       image);
    setMeta('twitter:site',        '@kvantumtech');

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

  // Filter related/recent articles excluding current post
  const recentArticles = allBlogs.filter(b => (b.id || b.slug || b._id) !== (post.id || post.slug || post._id)).slice(0, 5);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please enter your name.';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email.';
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      errors.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please enter details (at least 10 chars).';
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus({ loading: true, error: '' });
    try {
      await submitContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: `Inquiry regarding article: ${post.title}`,
        notes: `Message: ${formData.message.trim()}`,
      });
      setStatus({ loading: false, error: '' });
      navigate('/thank-you');
    } catch (err) {
      setStatus({ loading: false, error: err.response?.data?.message || 'Submission failed.' });
    }
  };

  const relativeTime = formatTimeAgo(post.createdAt || post.date);

  return (
    <div className="container mx-auto max-w-[1000px] px-6 py-12 text-left select-none space-y-12">
      <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-sky-600 dark:text-sky-400 hover:underline">
        <ArrowLeft size={14} /> Back to All Articles
      </Link>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
            {post.category || 'Engineering'}
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
            <span>{post.readTime || '5 min read'}</span>
          </div>
        </div>
      </div>

      {/* Cover Image Container */}
      <div className="w-full aspect-[16/9] max-h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-zinc-800 bg-slate-900 relative">
        <img 
          src={post.image || post.ogImage || post.coverImage || FALLBACK_IMG} 
          alt={post.imageAlt || post.keywords || post.title} 
          title={post.imageTitle || post.title}
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Article Content Body */}
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

      {/* TOP: Contact Consultation Form Section (Requested by User) */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white dark:bg-zinc-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="space-y-2">
          <Badge className="bg-pink-500/10 border-pink-500/30 text-pink-400 font-mono text-xs">
            <Sparkles size={14} /> Direct Engineering Consultation
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-black font-headline uppercase leading-tight">
            Have Questions About This Article or Need Custom Software?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm">
            Discuss your requirements directly with our technical engineering lead.
          </p>
        </div>

        <form onSubmit={handleContactSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {status.error && (
            <div className="sm:col-span-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
              ⚠️ {status.error}
            </div>
          )}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1 font-bold">Your Name *</label>
            <input
              type="text"
              placeholder="Sahil Kumar"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white text-xs outline-none focus:border-sky-500"
            />
            {fieldErrors.name && <span className="text-[10px] text-red-400 font-mono mt-1 block">⚠️ {fieldErrors.name}</span>}
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1 font-bold">Email Address *</label>
            <input
              type="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white text-xs outline-none focus:border-sky-500"
            />
            {fieldErrors.email && <span className="text-[10px] text-red-400 font-mono mt-1 block">⚠️ {fieldErrors.email}</span>}
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1 font-bold">Phone Number (10 Digits) *</label>
            <input
              type="tel"
              placeholder="9811661828"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white text-xs outline-none focus:border-sky-500 font-mono"
            />
            {fieldErrors.phone && <span className="text-[10px] text-red-400 font-mono mt-1 block">⚠️ {fieldErrors.phone}</span>}
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1 font-bold">Project Requirements *</label>
            <input
              type="text"
              placeholder="Tell us what you want to automate / build..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white text-xs outline-none focus:border-sky-500"
            />
            {fieldErrors.message && <span className="text-[10px] text-red-400 font-mono mt-1 block">⚠️ {fieldErrors.message}</span>}
          </div>

          <div className="sm:col-span-2 pt-2">
            <button
              type="submit"
              disabled={status.loading}
              className="w-full py-3.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs font-mono uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
            >
              {status.loading ? 'Submitting...' : 'SUBMIT CONSULTATION REQUEST →'}
            </button>
          </div>
        </form>
      </div>

      {/* BOTTOM: Recent News / Related Articles List Section (Image 3 Style Layout) */}
      {recentArticles.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-headline font-black text-slate-900 dark:text-white uppercase">
              Recent News & Engineering Articles
            </h3>
            <Link to="/blog" className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 hover:underline">
              View All →
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {recentArticles.map((article) => {
              const articleUrl = `/blog/${article.id || article.slug || article._id}`;
              const relTime = formatTimeAgo(article.createdAt || article.date);
              return (
                <Link
                  key={article.id || article.slug || article._id}
                  to={articleUrl}
                  className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-sky-500/40 transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center gap-4 group"
                >
                  <div className="w-full sm:w-44 h-28 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-100 dark:border-zinc-800">
                    <img
                      src={article.image || article.ogImage || article.coverImage || FALLBACK_IMG}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="space-y-1.5 flex-1 text-left">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 dark:text-zinc-400">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-bold uppercase">
                        {article.category || 'Tech'}
                      </span>
                      <span>•</span>
                      <span>⏱️ {relTime}</span>
                      <span>•</span>
                      <span>{article.date || 'Aug 2026'}</span>
                    </div>

                    <h4 className="text-base font-headline font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h4>

                    <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                      <span>By {article.author || 'Kvantum Team'}</span>
                      <span>•</span>
                      <span>{article.readTime || '5 min read'}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Article Specific Custom FAQs or Default Blog FAQs at bottom */}
      <FAQ 
        items={Array.isArray(post.faqs) && post.faqs.length > 0 ? post.faqs : blogFaqs} 
        title="Article FAQs & Technical Insights" 
        subtitle="Frequently Asked Questions" 
      />
    </div>
  );
}

// ─── Blog Listing Grid (Modern Bento Layout Inspired by Image 2) ────────────
export default function BlogPage({ blogs = [] }) {
  const { slug } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const displayBlogs = blogs;

  // Single Article Detail View
  if (slug) {
    const post = displayBlogs.find(b => b.id === slug || b.slug === slug || b._id === slug);
    return <BlogDetail post={post} allBlogs={displayBlogs} />;
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
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500 shadow-md font-sans"
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
        /* Modern Bento Card Grid (Inspired by Image 2) */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredBlogs.map((post, index) => {
            const blogTarget = `/blog/${post.id || post.slug || post._id}`;
            const relTime = formatTimeAgo(post.createdAt || post.date);
            return (
              <Link
                key={post.id || post.slug || post._id}
                to={blogTarget}
                className="rounded-[32px] bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 p-3 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-sky-500/50 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer relative"
              >
                {/* Bento Image Box with Top Pills & Bottom Right Arrow Button */}
                <div className="relative aspect-[16/10] w-full rounded-[24px] overflow-hidden bg-slate-900 border border-slate-100 dark:border-zinc-800/80">
                  <img
                    src={post.image || post.ogImage || post.coverImage || FALLBACK_IMG}
                    alt={post.imageAlt || post.keywords || post.title}
                    title={post.imageTitle || post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Pill Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-900/80 text-white border border-white/20 backdrop-blur-md">
                      {post.category || 'Engineering'}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-white/90 dark:bg-zinc-900/90 text-slate-900 dark:text-white border border-white/20 backdrop-blur-md">
                      ⏱️ {relTime}
                    </span>
                  </div>

                  {/* Circular Floating Arrow Button (Image 2 Style) */}
                  <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-900/90 text-slate-900 dark:text-white flex items-center justify-center shadow-lg border border-white/20 backdrop-blur-md group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                    <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Card Info Body */}
                <div className="p-5 flex flex-col justify-between flex-1 gap-3 text-left">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-zinc-400 mb-2">
                      <span>By {post.author || 'Kvantum Team'}</span>
                      <span>•</span>
                      <span>{post.date || 'August 2026'}</span>
                      <span>•</span>
                      <span>{post.readTime || '5 min'}</span>
                    </div>

                    <h3 className="text-lg font-headline font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors leading-snug mb-2">
                      {post.title}
                    </h3>

                    <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed line-clamp-2 font-sans">
                      {post.summary || post.shortDesc}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-sky-600 dark:text-sky-400 group-hover:underline pt-3 border-t border-slate-100 dark:border-zinc-800/60 mt-auto">
                    Read Article <ArrowUpRight size={14} />
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
