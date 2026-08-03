import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Calendar, Clock, ArrowRight, User, Search, ArrowLeft, 
  Sparkles, Eye, Share2, MessageSquare, Send
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import FAQ, { blogFaqs } from '@/components/sections/FAQ';
import { submitContact } from '@/services/contactService';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80';

// ─── Dynamic Facebook-Style Relative Time Ago Helper ────────────────────────
export function formatTimeAgo(dateString) {
  if (!dateString) return 'Recently';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 0 || diffInSeconds < 60) return 'Just now';

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

  // Filter related articles excluding current post
  const relatedArticles = allBlogs.filter(b => (b.id || b.slug || b._id) !== (post.id || post.slug || post._id)).slice(0, 3);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please enter your full name.';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      errors.phone = 'Please enter a 10-digit mobile number.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please enter project details (at least 10 chars).';
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

      {/* Cover Image Banner */}
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
        className="text-slate-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed space-y-6 font-sans border-b border-slate-200 dark:border-zinc-800 pb-12
          [&_h1]:text-3xl [&_h1]:font-black [&_h1]:font-headline [&_h1]:text-slate-900 [&_h1]:dark:text-white [&_h1]:mt-8 [&_h1]:mb-4
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:font-headline [&_h2]:text-slate-900 [&_h2]:dark:text-white [&_h2]:mt-8 [&_h2]:mb-4
          [&_h3]:text-xl [&_h3]:font-bold [&_h3]:font-headline [&_h3]:text-slate-900 [&_h3]:dark:text-white [&_h3]:mt-6 [&_h3]:mb-3
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4
          [&_li]:mb-2 [&_a]:text-sky-600 [&_a]:underline [&_strong]:font-bold [&_em]:italic
          [&_img]:max-w-full [&_img]:rounded-3xl [&_img]:my-6 [&_p]:mb-4"
        dangerouslySetInnerHTML={{ __html: post.content || post.summary }}
      />

      {/* CONTACT CONSULTATION FORM (PLACED DIRECTLY ABOVE RELATED BLOGS) */}
      <div id="article-contact-form" className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white dark:bg-zinc-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="space-y-2">
          <Badge className="bg-pink-500/10 border-pink-500/30 text-pink-400 font-mono text-xs">
            <Sparkles size={14} /> Talk to Solution Architects
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-black font-headline uppercase leading-tight">
            Need Custom IT Solutions or Software Development?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm">
            Discuss your business automation, web, or mobile app requirements directly with our technical team.
          </p>
        </div>

        <form onSubmit={handleContactSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {status.error && (
            <div className="sm:col-span-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
              ⚠️ {status.error}
            </div>
          )}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1.5 font-bold">Your Name *</label>
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
            <label className="block text-[11px] font-mono text-slate-400 mb-1.5 font-bold">Email Address *</label>
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
            <label className="block text-[11px] font-mono text-slate-400 mb-1.5 font-bold">Phone Number (10 Digits) *</label>
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
            <label className="block text-[11px] font-mono text-slate-400 mb-1.5 font-bold">Project Details *</label>
            <input
              type="text"
              placeholder="Tell us what software/system you need..."
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
              className="w-full py-4 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs font-mono uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
            >
              {status.loading ? 'Submitting...' : 'SUBMIT CONSULTATION REQUEST →'}
            </button>
          </div>
        </form>
      </div>

      {/* RELATED BLOGS GRID SECTION (DIRECTLY UNDER CONTACT FORM) */}
      {relatedArticles.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-headline font-black text-slate-900 dark:text-white uppercase">
              Related Engineering Articles
            </h3>
            <Link to="/blog" className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 hover:underline">
              View All Articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relPost) => {
              const relTarget = `/blog/${relPost.id || relPost.slug || relPost._id}`;
              const relTime = formatTimeAgo(relPost.createdAt || relPost.date);
              return (
                <Link
                  key={relPost.id || relPost.slug || relPost._id}
                  to={relTarget}
                  className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-md flex flex-col justify-between group hover:border-sky-500/40 transition-all duration-200 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-slate-900">
                    <img
                      src={relPost.image || relPost.ogImage || relPost.coverImage || FALLBACK_IMG}
                      alt={relPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1 gap-3 text-left">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-zinc-400 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold uppercase">
                          {relPost.category || 'Tech'}
                        </span>
                        <span>⏱️ {relTime}</span>
                      </div>

                      <h4 className="text-base font-headline font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors leading-snug line-clamp-2">
                        {relPost.title}
                      </h4>

                      <p className="text-slate-600 dark:text-zinc-400 text-xs line-clamp-2 mt-2">
                        {relPost.summary || relPost.shortDesc}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-1 text-xs font-mono font-bold text-sky-600 dark:text-sky-400 group-hover:underline pt-3 border-t border-slate-100 dark:border-zinc-800 mt-auto">
                      Read Article <ArrowRight size={13} />
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

// ─── Blog Listing Main Grid (Modern Premium Clean Grid) ─────────────────────
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

  const categories = ['All', ...new Set(displayBlogs.map(b => b.category).filter(Boolean))];

  const filteredBlogs = displayBlogs.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.summary && post.summary.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const featuredPost = filteredBlogs[0];
  const regularPosts = filteredBlogs.slice(1);

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
        <div className="space-y-12">
          
          {/* Main Featured Article (If available) */}
          {featuredPost && (
            <Link
              to={`/blog/${featuredPost.id || featuredPost.slug || featuredPost._id}`}
              className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 group hover:border-sky-500/50 transition-all duration-300 cursor-pointer"
            >
              <div className="lg:col-span-7 aspect-[16/9] lg:aspect-auto w-full h-full overflow-hidden bg-slate-900">
                <img
                  src={featuredPost.image || featuredPost.ogImage || featuredPost.coverImage || FALLBACK_IMG}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between text-left gap-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                      {featuredPost.category || 'Featured'}
                    </span>
                    <span className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
                      ⏱️ {formatTimeAgo(featuredPost.createdAt || featuredPost.date)}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-headline font-black text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-slate-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed line-clamp-3 font-sans">
                    {featuredPost.summary || featuredPost.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-sky-500" />
                    <span className="font-bold text-slate-800 dark:text-zinc-200">{featuredPost.author || 'Kvantum Team'}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 font-bold text-sky-600 dark:text-sky-400 group-hover:underline">
                    Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* 3-Column Clean Card Grid for Remaining Posts */}
          {regularPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {regularPosts.map((post) => {
                const blogTarget = `/blog/${post.id || post.slug || post._id}`;
                const relTime = formatTimeAgo(post.createdAt || post.date);
                return (
                  <Link
                    key={post.id || post.slug || post._id}
                    to={blogTarget}
                    className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-sky-500/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    {/* Clean Aspect 16/9 Image Container without text overlap */}
                    <div className="aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-slate-100 dark:border-zinc-800">
                      <img
                        src={post.image || post.ogImage || post.coverImage || FALLBACK_IMG}
                        alt={post.imageAlt || post.keywords || post.title}
                        title={post.imageTitle || post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6 flex flex-col justify-between flex-1 gap-4 text-left">
                      <div>
                        {/* Category & Time Ago Badges */}
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

        </div>
      )}

      {/* Blog Specific FAQ */}
      <FAQ items={blogFaqs} title="Engineering Blog" subtitle="Frequently Asked Questions" />

    </div>
  );
}
