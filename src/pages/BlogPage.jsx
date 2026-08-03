import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Calendar, Clock, ArrowRight, User, Search, ArrowLeft, 
  ArrowUpRight, Send, CheckCircle2, Sparkles, AlertCircle, Eye, Share2, ChevronLeft, ChevronRight
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import FAQ, { blogFaqs } from '@/components/sections/FAQ';
import { submitContact } from '@/services/contactService';
import { InstagramIcon, LinkedinIcon, FacebookIcon, TwitterIcon } from '@/components/ui/SocialIcons';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80';

// ─── Relative Time Ago Helper (Facebook / TechCrunch Style) ─────────────────
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

  // Filter recent news articles excluding current post
  const recentNews = allBlogs.filter(b => (b.id || b.slug || b._id) !== (post.id || post.slug || post._id));

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
      errors.message = 'Please enter project requirements (at least 10 chars).';
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
    <div className="container mx-auto max-w-[1020px] px-6 py-12 text-left select-none space-y-12">
      <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-sky-600 dark:text-sky-400 hover:underline">
        <ArrowLeft size={14} /> Back to All Articles
      </Link>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900">
            {post.category || 'Engineering'}
          </span>
          <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
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
      <div className="w-full aspect-[16/9] max-h-[520px] rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 dark:border-zinc-800 bg-slate-900 relative">
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

      {/* CONTACT CONSULTATION FORM (TOP REQUIREMENT) */}
      <div id="contact-form" className="p-8 sm:p-10 rounded-[32px] bg-slate-900 text-white dark:bg-zinc-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="space-y-2">
          <Badge className="bg-pink-500/10 border-pink-500/30 text-pink-400 font-mono text-xs">
            <Sparkles size={14} /> Request Free Consultation
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-black font-headline uppercase leading-tight">
            Need IT Solutions or Custom Software for Your Business?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm">
            Fill in your project details below and our technical solution lead will reach out within 2 hours.
          </p>
        </div>

        <form onSubmit={handleContactSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {status.error && (
            <div className="sm:col-span-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
              ⚠️ {status.error}
            </div>
          )}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1.5 font-bold">Your Full Name *</label>
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
              className="w-full py-4 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs font-mono uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
            >
              {status.loading ? 'Submitting Request...' : 'SEND CONSULTATION INQUIRY →'}
            </button>
          </div>
        </form>
      </div>

      {/* TECHCRUNCH STYLE RECENT NEWS LIST VIEW (IMAGE 3 LAYOUT REQUIREMENT) */}
      {recentNews.length > 0 && (
        <div className="space-y-6 pt-8 border-t border-slate-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl sm:text-3xl font-headline font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Recent News
            </h3>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center justify-center cursor-pointer">
                <ChevronLeft size={16} />
              </button>
              <button className="w-8 h-8 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center justify-center cursor-pointer">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {recentNews.slice(0, 6).map((article) => {
              const articleUrl = `/blog/${article.id || article.slug || article._id}`;
              const relTime = formatTimeAgo(article.createdAt || article.date);
              return (
                <Link
                  key={article.id || article.slug || article._id}
                  to={articleUrl}
                  className="flex flex-col sm:flex-row items-start gap-5 group border-b border-slate-100 dark:border-zinc-800/80 pb-6 last:border-b-0"
                >
                  {/* Left Square Thumbnail (Image 3 Style) */}
                  <div className="w-full sm:w-36 h-36 sm:h-36 rounded-2xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200 dark:border-zinc-800 shadow-md">
                    <img
                      src={article.image || article.ogImage || article.coverImage || FALLBACK_IMG}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Right Meta & Title */}
                  <div className="space-y-2 flex-1 text-left">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                        {article.category || 'Business'}
                      </span>
                      <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                        <Clock size={12} /> {article.date || '24 July, 2026'} ({relTime})
                      </span>
                    </div>

                    <h4 className="text-lg sm:text-xl font-headline font-bold text-slate-900 dark:text-white underline decoration-slate-300 dark:decoration-zinc-700 group-hover:decoration-sky-500 group-hover:text-sky-500 transition-colors leading-snug">
                      {article.title}
                    </h4>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 dark:text-zinc-400 pt-1">
                      <span className="flex items-center gap-1 text-slate-700 dark:text-zinc-300 font-bold">
                        <User size={13} className="text-sky-500" /> {article.author || 'Gabbar Shingh'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye size={13} className="text-amber-500" /> {article.views || '1,117'} Views
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Share2 size={13} className="text-emerald-500" /> {article.shares || '0'} Shares
                      </span>
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

// ─── Blog Listing Grid (ASH GRAY BENTO GRID - IMAGE 2 EXACT REQUIREMENT) ──
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

  // Pick top items for the Ash Gray Bento Grid
  const card001 = filteredBlogs[0] || {
    title: 'Whispers of Wisdom',
    category: 'Financing',
    date: 'Oct 16, 2024',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    summary: 'Exploring financial technology and modern wealth strategies.'
  };

  const card002 = filteredBlogs[1] || {
    title: 'Ink-Stained Insights',
    category: 'Lifestyle',
    date: 'Oct 23, 2024',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=80',
    summary: 'Engineering workflows, developer culture, and digital transformations.'
  };

  const mainHeroCard = filteredBlogs[2] || filteredBlogs[0] || {
    title: 'Journey Through Life\'s Spectrum',
    category: 'Architecture',
    date: 'Nov 01, 2024',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&auto=format&fit=crop&q=80',
    summary: 'A deep dive into software systems, cloud infrastructure, and business scalability.'
  };

  const card003 = filteredBlogs[3] || filteredBlogs[1] || {
    title: 'Musings in Grayscale',
    category: 'Community',
    date: 'Dec 4, 2024',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    summary: 'Building high-performance teams and fostering innovation.'
  };

  const remainingBlogs = filteredBlogs.length > 4 ? filteredBlogs.slice(4) : filteredBlogs;

  return (
    <div className="container mx-auto max-w-[1320px] px-4 sm:px-6 py-10 text-left select-none space-y-16">

      {/* TOP ASH GRAY BENTO GRID (IMAGE 2 EXACT SPECIFICATION) */}
      <div className="bg-[#f5f4ef] dark:bg-zinc-950 p-6 sm:p-10 rounded-[40px] border border-slate-200/80 dark:border-zinc-800 shadow-2xl space-y-10 text-slate-900 dark:text-white">
        
        {/* Bento Grid 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Left Stack (001 & 002) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-8">
            
            {/* Card 001 */}
            <Link
              to={`/blog/${card001.id || card001.slug || card001._id || '#'}`}
              className="relative rounded-[32px] overflow-hidden bg-slate-900 group h-[260px] shadow-xl border border-slate-200/60 dark:border-zinc-800 flex flex-col justify-between p-5 cursor-pointer"
            >
              <img
                src={card001.image || card001.ogImage || card001.coverImage || FALLBACK_IMG}
                alt={card001.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Top Pills */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-4 py-1.5 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-md">
                  {card001.category || 'Financing'}
                </span>
                <span className="text-xs font-mono font-bold px-4 py-1.5 rounded-full bg-white/80 text-slate-900 backdrop-blur-md">
                  {card001.date ? (card001.date.includes('-') || card001.date.includes('T') ? formatTimeAgo(card001.date) : card001.date) : 'Oct 16, 2024'}
                </span>
              </div>

              {/* Bottom Cutout & Title Overlay */}
              <div className="relative z-10 flex items-end justify-between gap-3 pt-12">
                <div>
                  <span className="text-xs font-mono text-slate-300 font-bold block mb-0.5">001</span>
                  <h3 className="text-xl font-headline font-black text-white leading-tight drop-shadow-md group-hover:text-sky-400 transition-colors">
                    {card001.title}
                  </h3>
                </div>
                {/* Circular Arrow Button (Asymmetric Cutout Overlay) */}
                <div className="w-12 h-12 rounded-full bg-[#e8e6dd] text-slate-900 flex items-center justify-center shadow-lg shrink-0 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                  <ArrowUpRight size={22} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Card 002 */}
            <Link
              to={`/blog/${card002.id || card002.slug || card002._id || '#'}`}
              className="relative rounded-[32px] overflow-hidden bg-slate-900 group h-[260px] shadow-xl border border-slate-200/60 dark:border-zinc-800 flex flex-col justify-between p-5 cursor-pointer"
            >
              <img
                src={card002.image || card002.ogImage || card002.coverImage || FALLBACK_IMG}
                alt={card002.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Top Pills */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-4 py-1.5 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-md">
                  {card002.category || 'Lifestyle'}
                </span>
                <span className="text-xs font-mono font-bold px-4 py-1.5 rounded-full bg-white/80 text-slate-900 backdrop-blur-md">
                  {card002.date ? (card002.date.includes('-') || card002.date.includes('T') ? formatTimeAgo(card002.date) : card002.date) : 'Oct 23, 2024'}
                </span>
              </div>

              {/* Bottom Cutout & Title Overlay */}
              <div className="relative z-10 flex items-end justify-between gap-3 pt-12">
                <div>
                  <span className="text-xs font-mono text-slate-300 font-bold block mb-0.5">002</span>
                  <h3 className="text-xl font-headline font-black text-white leading-tight drop-shadow-md group-hover:text-sky-400 transition-colors">
                    {card002.title}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#e8e6dd] text-slate-900 flex items-center justify-center shadow-lg shrink-0 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                  <ArrowUpRight size={22} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>

          </div>

          {/* Column 2: Center Main Hero Feature Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <Link
              to={`/blog/${mainHeroCard.id || mainHeroCard.slug || mainHeroCard._id || '#'}`}
              className="group flex flex-col justify-between h-full space-y-4"
            >
              <div className="relative w-full h-[380px] sm:h-[430px] rounded-[36px] overflow-hidden bg-slate-900 border border-slate-200/60 dark:border-zinc-800 shadow-2xl">
                <img
                  src={mainHeroCard.image || mainHeroCard.ogImage || mainHeroCard.coverImage || FALLBACK_IMG}
                  alt={mainHeroCard.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="space-y-2 text-left pt-2">
                <h2 className="text-3xl sm:text-5xl font-black font-headline text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-sky-500 transition-colors">
                  {mainHeroCard.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-2">
                  {mainHeroCard.summary || 'A realm of reflection, inspiration, and discovery where engineering insights illuminate growth.'}
                </p>
              </div>
            </Link>
          </div>

          {/* Column 3: Right Header Note & Card 003 */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-8">
            
            {/* Top Right Header & Newsletter Note */}
            <div className="space-y-5 text-left bg-white/60 dark:bg-zinc-900/60 p-6 rounded-[32px] border border-slate-200/60 dark:border-zinc-800">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans font-medium">
                Welcome to Kvantum Tech Blog: A realm of engineering reflection, business automation, and technical discovery.
              </p>
              
              <div className="flex items-center gap-3 flex-wrap">
                <Link
                  to="/contact"
                  className="px-6 py-2.5 rounded-full bg-[#2d2d2d] text-white hover:bg-black font-bold text-xs font-mono transition-colors shadow-md shrink-0"
                >
                  Join Now
                </Link>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <a href="https://instagram.com/kvantumtechsolutions" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-slate-300 dark:border-zinc-700 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors">
                    <InstagramIcon size={14} />
                  </a>
                  <a href="https://facebook.com/kvantumtechsolutions" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-slate-300 dark:border-zinc-700 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors">
                    <FacebookIcon size={14} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-slate-300 dark:border-zinc-700 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors">
                    <LinkedinIcon size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Card 003 */}
            <Link
              to={`/blog/${card003.id || card003.slug || card003._id || '#'}`}
              className="relative rounded-[32px] overflow-hidden bg-slate-900 group h-[260px] shadow-xl border border-slate-200/60 dark:border-zinc-800 flex flex-col justify-between p-5 cursor-pointer"
            >
              <img
                src={card003.image || card003.ogImage || card003.coverImage || FALLBACK_IMG}
                alt={card003.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Top Pills */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-4 py-1.5 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-md">
                  {card003.category || 'Community'}
                </span>
                <span className="text-xs font-mono font-bold px-4 py-1.5 rounded-full bg-white/80 text-slate-900 backdrop-blur-md">
                  {card003.date ? (card003.date.includes('-') || card003.date.includes('T') ? formatTimeAgo(card003.date) : card003.date) : 'Dec 4, 2024'}
                </span>
              </div>

              {/* Bottom Cutout & Title Overlay */}
              <div className="relative z-10 flex items-end justify-between gap-3 pt-12">
                <div>
                  <span className="text-xs font-mono text-slate-300 font-bold block mb-0.5">003</span>
                  <h3 className="text-xl font-headline font-black text-white leading-tight drop-shadow-md group-hover:text-sky-400 transition-colors">
                    {card003.title}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#e8e6dd] text-slate-900 flex items-center justify-center shadow-lg shrink-0 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                  <ArrowUpRight size={22} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>

          </div>

        </div>

      </div>

      {/* SEARCH & CATEGORY FILTER TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-slate-200 dark:border-zinc-800">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                  : 'bg-white dark:bg-zinc-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-800 hover:border-sky-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-xs outline-none focus:border-sky-500 shadow-sm"
          />
        </div>
      </div>

      {/* TECHCRUNCH STYLE RECENT NEWS LIST (IMAGE 3 REQUIREMENT) */}
      <div className="space-y-8 pt-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-4">
          <h2 className="text-3xl sm:text-4xl font-black font-headline text-slate-900 dark:text-white uppercase tracking-tight">
            Recent News & Articles
          </h2>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center justify-center cursor-pointer">
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center justify-center cursor-pointer">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {remainingBlogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-2">🔍</p>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Additional Articles Found</h3>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {remainingBlogs.map((post) => {
              const blogTarget = `/blog/${post.id || post.slug || post._id}`;
              const relTime = formatTimeAgo(post.createdAt || post.date);
              return (
                <Link
                  key={post.id || post.slug || post._id}
                  to={blogTarget}
                  className="flex flex-col sm:flex-row items-start gap-6 group border-b border-slate-200 dark:border-zinc-800 pb-8 last:border-b-0 cursor-pointer"
                >
                  {/* Left Square Thumbnail (Image 3 TechCrunch Layout) */}
                  <div className="w-full sm:w-44 h-44 sm:h-44 rounded-2xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200 dark:border-zinc-800 shadow-md">
                    <img
                      src={post.image || post.ogImage || post.coverImage || FALLBACK_IMG}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Right Content */}
                  <div className="space-y-3 flex-1 text-left">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                        {post.category || 'Business'}
                      </span>
                      <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                        <Clock size={13} /> {post.date || 'August 2026'} ({relTime})
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-headline font-bold text-slate-900 dark:text-white underline decoration-slate-300 dark:decoration-zinc-700 group-hover:decoration-sky-500 group-hover:text-sky-500 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed line-clamp-2 font-sans">
                      {post.summary || post.shortDesc}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-zinc-400 pt-2">
                      <span className="flex items-center gap-1.5 text-slate-800 dark:text-zinc-200 font-bold">
                        <User size={13} className="text-sky-500" /> {post.author || 'Gabbar Shingh'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye size={13} className="text-amber-500" /> {post.views || '1,117'} Views
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Share2 size={13} className="text-emerald-500" /> {post.shares || '0'} Shares
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Blog Specific FAQ */}
      <FAQ items={blogFaqs} title="Engineering Blog" subtitle="Frequently Asked Questions" />

    </div>
  );
}
