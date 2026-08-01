import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ArrowRight, User, Search, Sparkles, Send, ArrowLeft } from 'lucide-react';
import Badge from '@/components/ui/Badge';

const defaultBlogs = [
  {
    id: 'why-kvantum-tech-solutions-is-the-best-it-solutions-company-in-delhi-ncr',
    slug: 'why-kvantum-tech-solutions-is-the-best-it-solutions-company-in-delhi-ncr',
    title: 'Why Kvantum Tech Solutions Is the Best IT Solutions Company in Delhi NCR',
    category: 'IT Solutions',
    readTime: '6 min read',
    date: 'August 1, 2026',
    author: 'Kvantum Tech Team',
    summary: 'In today’s digital world, every business really needs reliable technology to stay competitive. Learn why Kvantum Tech Solutions is the leading IT solutions & services company in Delhi NCR.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    content: `
      <p>In today’s digital world, every business really needs reliable technology to stay competitive. Like from building a professional website to handling custom software development, and even boosting your online visibility, it all comes down to the right technology partner. If you’re searching for the Best IT Solutions Company in Delhi NCR, Kvantum Tech Solutions offers innovative, scalable, and outcome-focused IT services that are tailored for what your business actually needs.</p>
      <p>As a trusted IT solutions and services firm, we help startups, smaller businesses, and big enterprises reach digital success with smart technology and customized frameworks.</p>
      
      <h3 className="text-xl font-bold font-headline mt-6 mb-3 text-slate-900 dark:text-white">Why Your Business Needs an IT Solutions Company</h3>
      <p>Technology is no longer optional; it's basically a key part of business growth. A professional IT partner helps you streamline operations, sharpen the customer experience, and boost productivity without all the usual friction.</p>
      <p>At Kvantum Tech Solutions we know that every business is slightly different. So we build customized IT solutions that match your goals and back up long-term growth.</p>

      <h3 className="text-xl font-bold font-headline mt-6 mb-3 text-slate-900 dark:text-white">Comprehensive IT Solutions and Services</h3>
      <p>As a leading IT solutions and services company, Kvantum Tech Solutions offers a wide range of digital services under one roof:</p>
      <ul className="list-disc pl-6 space-y-2 my-4">
        <li><strong>Custom Website Development:</strong> We build fast, responsive, and user-friendly websites that feel smooth across every device.</li>
        <li><strong>Mobile App Development:</strong> We design and develop Android as well as iOS apps with modern capabilities and solid performance.</li>
        <li><strong>Custom Software Development:</strong> Designed to boost efficiency, automate operations, and back business growth.</li>
        <li><strong>UI/UX Design:</strong> Clean, appealing, and easy-to-use layouts that boost customer engagement.</li>
        <li><strong>AI Chatbot Solutions:</strong> Automate customer support and make response times faster.</li>
        <li><strong>Digital Marketing Services:</strong> SEO, Social Media Marketing (SMM), and Google Business Profile Optimization.</li>
      </ul>

      <h3 className="text-xl font-bold font-headline mt-6 mb-3 text-slate-900 dark:text-white">Why Choose Kvantum Tech Solutions?</h3>
      <p>Businesses trust Kvantum Tech Solutions because we offer experienced IT professionals, customized business solutions, transparent communication, affordable pricing, and reliable technical support.</p>

      <h3 className="text-xl font-bold font-headline mt-6 mb-3 text-slate-900 dark:text-white">Frequently Asked Questions (FAQs)</h3>
      <p className="mt-3"><strong>1. Why is Kvantum Tech Solutions seen as the Best IT Solutions Company in Delhi NCR?</strong><br />Kvantum Tech Solutions provides tailored IT services, seasoned professionals, current tools, and dedicated customer support so companies can reach their digital goals.</p>
      <p className="mt-3"><strong>2. What kind of services does Kvantum Tech Solutions provide?</strong><br />We do website development, mobile app development, custom software development, UI/UX design, AI chatbot solutions, SEO, social media marketing, and digital transformation services.</p>
    `
  },
  {
    id: 'custom-software-vs-saas-2026',
    slug: 'custom-software-vs-saas-2026',
    title: 'Custom Software vs Off-the-Shelf SaaS: Why Growing Businesses Need Custom Code in 2026',
    category: 'Custom Software',
    readTime: '5 min read',
    date: 'July 30, 2026',
    author: 'Sahil Kumar (Head of Tech)',
    summary: 'Discover how custom software eliminates recurring subscription bloat, locks in 100% data privacy, and scales tailored to your exact business workflows.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    content: '<p>Custom software development provides long-term competitive advantages over generic off-the-shelf SaaS platforms...</p>'
  },
  {
    id: 'whatsapp-business-api-automation-guide',
    slug: 'whatsapp-business-api-automation-guide',
    title: 'How WhatsApp Business API Automation Can Double Sales Conversion Under 5 Seconds',
    category: 'WhatsApp Automation',
    readTime: '6 min read',
    date: 'July 28, 2026',
    author: 'Anil Thapa (Head of SMO)',
    summary: 'Learn how automated WhatsApp lead qualification bots, instant PDF quotation triggers, and 24/7 drip messaging turn ad clicks into paying clients.',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&auto=format&fit=crop&q=80',
    content: '<p>WhatsApp Business API automation gives enterprises instant speed-to-lead capabilities...</p>'
  },
];

export default function BlogPage({ blogs = [] }) {
  const { slug } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const displayBlogs = blogs.length > 0 ? blogs : defaultBlogs;

  // Single Article Detail View
  if (slug) {
    const post = displayBlogs.find(b => b.id === slug || b.slug === slug || b._id === slug) || displayBlogs[0];

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
          <img src={post.image || defaultBlogs[0].image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div
          className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 font-sans border-b border-slate-200 dark:border-zinc-800 pb-12"
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

  // Articles Grid Index View
  const categories = ['All', 'IT Solutions', 'Custom Software', 'WhatsApp Automation', 'Enterprise Solutions'];

  const filteredBlogs = displayBlogs.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

        {/* Search Bar & Category Filters */}
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

      {/* Editorial Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredBlogs.map((post) => (
          <div
            key={post.id || post.slug || post._id}
            className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-sky-500/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            {/* Image Thumbnail */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={post.image || defaultBlogs[0].image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-900/85 text-white border border-white/20 backdrop-blur-md">
                  {post.category || 'Engineering'}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-7 flex flex-col justify-between flex-1 gap-4">
              <div>
                {/* Meta info */}
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

    </div>
  );
}
