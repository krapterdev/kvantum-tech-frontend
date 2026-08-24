'use client';

import React from 'react';
import Link from '../ui/SafeLink';
import EarthGlobe from '../sections/EarthGlobe';
import { 
  InstagramIcon, LinkedinIcon, FacebookIcon, TwitterIcon, 
  WhatsappIcon, YoutubeIcon, GithubIcon, PinterestIcon, TelegramIcon 
} from '../ui/SocialIcons';
import KvantumLogo from '../ui/KvantumLogo';
import { MapPin, Phone, Mail, Globe, ShieldCheck, Share2 } from 'lucide-react';

class FooterErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.warn('[Footer Error Boundary]:', error, info);
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default function Footer({ seoPages = [], theme, settings, services = [], blogs = [] }) {
  const currentYear = new Date().getFullYear();
  const contact = settings?.contact || {};
  
  const socialLinks = [
    { id: 'insta', platform: 'Instagram', url: 'https://www.instagram.com/kvantumtechsolutions/', icon: InstagramIcon },
    { id: 'linkedin', platform: 'LinkedIn', url: 'https://www.linkedin.com/in/kvantum-tech-solutions-75916a41b/', icon: LinkedinIcon },
    { id: 'fb', platform: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61591468234442', icon: FacebookIcon },
    { id: 'gh', platform: 'GitHub', url: 'https://github.com/krapterdev', icon: GithubIcon },
  ];

  return (
    <footer className="relative z-10 mt-[100px] px-6 py-[70px] select-none text-center border-t border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-950/95 text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      <div className="container mx-auto max-w-[1340px]">
        
        {/* Top Call-To-Action Banner */}
        <div className="text-center mb-14 border-b border-slate-200 dark:border-white/8 pb-12">
          <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400 uppercase tracking-[0.3em] font-bold block mb-2">
            READY TO AUTOMATE & SCALE YOUR BUSINESS?
          </span>
          <h2 className="text-4xl sm:text-6xl font-black font-headline text-slate-900 dark:text-white tracking-tight uppercase">
            LET'S TALK SOLUTIONS.
          </h2>
          <a href="mailto:info@kvantumtechsolutions.com" className="text-pink-600 dark:text-pink-400 text-lg sm:text-2xl font-mono font-bold hover:underline mt-2 inline-block">
            info@kvantumtechsolutions.com
          </a>
        </div>

        {/* 360 Degree Rotating Real 3D Earth Planet (NASA Style) */}
        <FooterErrorBoundary>
          <div className="flex flex-col items-center justify-center mb-16 overflow-hidden">
            <div className="w-full max-w-[650px]">
              <EarthGlobe />
            </div>
          </div>
        </FooterErrorBoundary>

        {/* Interactive Google Map Section in Footer */}
        <div className="mb-16 border-b border-slate-200 dark:border-white/8 pb-12 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-sky-400 uppercase tracking-widest font-bold mb-3">
            <MapPin size={16} /> Official Headquarters & Location Map
          </div>
          <div className="w-full h-[280px] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg">
            <iframe
              title="Kvantum Tech Solutions Office Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.07981103231!2d77.31714817631126!3d28.687259075634913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x25c5e1dca1c46e7d%3A0x50a81aafe13b66c0!2sKvantum%20Tech%20Solutions!5e0!3m2!1sen!2sin!4v1785574819803!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Justdial-Style Mega Directory Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-14 text-left border-b border-slate-200 dark:border-white/8 pb-12">
          
          {/* Column 1: Brand Info & Dynamic Socials */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <div className="mb-2">
              <KvantumLogo className="h-16 sm:h-24" />
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Kvantum Tech Solutions is an enterprise software development & business automation agency.
            </p>

            {/* Dynamic Social Media Links Bar */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {socialLinks.map((soc) => {
                const Icon = soc.icon || Share2;
                return (
                  <a
                    key={soc.id || soc.platform}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Kvantum Tech ${soc.platform}`}
                    title={soc.platform}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:text-sky-500 transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Software Solutions */}
          <div className="flex flex-col gap-3">
            <h5 className="text-slate-900 dark:text-zinc-100 text-xs font-mono uppercase tracking-widest font-bold border-b border-slate-200 dark:border-white/8 pb-2">
              Software Solutions
            </h5>
            <ul className="flex flex-col gap-2 text-xs">
              <li><Link to="/services" className="text-slate-600 dark:text-zinc-400 hover:text-pink-500 transition-colors">Custom Software Dev</Link></li>
              <li><Link to="/services" className="text-slate-600 dark:text-zinc-400 hover:text-pink-500 transition-colors">CRM Platforms</Link></li>
              <li><Link to="/services" className="text-slate-600 dark:text-zinc-400 hover:text-pink-500 transition-colors">HRMS & Payroll</Link></li>
              <li><Link to="/services" className="text-slate-600 dark:text-zinc-400 hover:text-pink-500 transition-colors">ERP Systems</Link></li>
              <li><Link to="/services" className="text-slate-600 dark:text-zinc-400 hover:text-pink-500 transition-colors">Business Automation</Link></li>
              <li><Link to="/services" className="text-slate-600 dark:text-zinc-400 hover:text-pink-500 transition-colors">WhatsApp API Automation</Link></li>
              <li><Link to="/services" className="text-slate-600 dark:text-zinc-400 hover:text-pink-500 transition-colors">Web & Mobile Apps</Link></li>
            </ul>
          </div>

          {/* Column 3: Industries We Serve */}
          <div className="flex flex-col gap-3">
            <h5 className="text-slate-900 dark:text-zinc-100 text-xs font-mono uppercase tracking-widest font-bold border-b border-slate-200 dark:border-white/8 pb-2">
              Industries Served
            </h5>
            <ul className="flex flex-col gap-2 text-xs">
              <li><Link to="/services" className="text-slate-600 dark:text-zinc-400 hover:text-sky-500 transition-colors">Hotels & Hospitality</Link></li>
              <li><Link to="/services" className="text-slate-600 dark:text-zinc-400 hover:text-sky-500 transition-colors">Real Estate Agencies</Link></li>
              <li><Link to="/services" className="text-slate-600 dark:text-zinc-400 hover:text-sky-500 transition-colors">Healthcare & Clinics</Link></li>
              <li><Link to="/services" className="text-slate-600 dark:text-zinc-400 hover:text-sky-500 transition-colors">Manufacturing & Supply</Link></li>
              <li><Link to="/services" className="text-slate-600 dark:text-zinc-400 hover:text-sky-500 transition-colors">Education & Schools</Link></li>
              <li><Link to="/services" className="text-slate-600 dark:text-zinc-400 hover:text-sky-500 transition-colors">Retail & Ecommerce</Link></li>
            </ul>
          </div>

          {/* Column 4: Latest Blog Articles */}
          <div className="flex flex-col gap-3">
            <h5 className="text-slate-900 dark:text-zinc-100 text-xs font-mono uppercase tracking-widest font-bold border-b border-slate-200 dark:border-white/8 pb-2">
              Latest Articles
            </h5>
            {blogs.length > 0 ? (
              <ul className="flex flex-col gap-2 text-xs">
                {blogs.slice(0, 4).map((blog) => (
                  <li key={blog.id || blog._id}>
                    <Link
                      to={`/blog/${blog.id || blog.slug || blog._id}`}
                      className="text-slate-600 dark:text-zinc-400 hover:text-pink-500 transition-colors line-clamp-2 leading-snug"
                    >
                      {blog.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/blog" className="text-sky-500 hover:text-sky-600 font-bold transition-colors mt-1 inline-block">
                    View All Articles →
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="flex flex-col gap-2 text-xs">
                <li><Link to="/blog" className="text-slate-600 dark:text-zinc-400 hover:text-pink-500 transition-colors">Blog & Articles</Link></li>
                <li><Link to="/blog" className="text-slate-600 dark:text-zinc-400 hover:text-pink-500 transition-colors">Engineering Insights</Link></li>
                <li><Link to="/blog" className="text-slate-600 dark:text-zinc-400 hover:text-pink-500 transition-colors">Business Automation Guides</Link></li>
              </ul>
            )}
          </div>

          {/* Column 5: Cities & Target Regions */}
          <div className="flex flex-col gap-3">
            <h5 className="text-slate-900 dark:text-zinc-100 text-xs font-mono uppercase tracking-widest font-bold border-b border-slate-200 dark:border-white/8 pb-2">
              Popular Locations
            </h5>
            <ul className="flex flex-col gap-2 text-xs font-mono text-slate-600 dark:text-zinc-400">
              <li>Delhi NCR, India</li>
              <li>Noida & Greater Noida</li>
              <li>Gurgaon & Haryana</li>
              <li>Mumbai & Maharashtra</li>
              <li>Bengaluru & South</li>
              <li>Dubai & GCC Region</li>
            </ul>
          </div>

          {/* Column 6: Contact Info & Support */}
          <div className="flex flex-col gap-3">
            <h5 className="text-slate-900 dark:text-zinc-100 text-xs font-mono uppercase tracking-widest font-bold border-b border-slate-200 dark:border-white/8 pb-2">
              Get In Touch
            </h5>
            <ul className="flex flex-col gap-2 text-xs">
              <li>
                <a href="mailto:info@kvantumtechsolutions.com" className="text-slate-800 dark:text-zinc-300 hover:text-pink-500 transition-colors block break-all font-mono">
                  info@kvantumtechsolutions.com
                </a>
              </li>
              <li className="flex flex-col gap-1 text-slate-800 dark:text-zinc-300 font-mono">
                <a href="tel:+919811661828" className="hover:text-pink-500 transition-colors">+91 9811661828</a>
                <a href="tel:+919811663433" className="hover:text-pink-500 transition-colors">+91 9811663433</a>
              </li>
              <li className="text-[11px] text-slate-700 dark:text-zinc-400 font-mono leading-relaxed mt-1">
                Kvantum Tech Solutions, A33, 64, Tahirpur Rd, Priyadarshini Vihar, Taharpur Village, Dilshad Garden, Delhi, 110095
              </li>
            </ul>
          </div>

        </div>

        {/* Justdial-Style Keyword Directory Bar */}
        {seoPages.length > 0 && (
          <div className="border-b border-slate-200 dark:border-white/8 pb-8 text-left mb-10">
            <span className="text-[10px] font-mono text-slate-700 dark:text-zinc-400 uppercase tracking-widest block mb-3 font-bold">
              Popular Directory Searches & Services:
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {seoPages.map((page) => (
                <Link
                  key={page.slug}
                  to={`/keyword/${page.slug}`}
                  className="text-slate-800 dark:text-zinc-300 hover:text-pink-500 font-mono text-[11px] bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 px-3 py-1 rounded-lg transition-colors"
                >
                  {page.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Section 20 Mega Typography Footer */}
        <div className="pt-4 pb-6 overflow-hidden select-none">
          <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-black font-headline text-slate-300 dark:text-white/20 tracking-[0.08em] uppercase leading-none whitespace-nowrap">
            K V A N T U M
          </h1>
          <span className="text-xs sm:text-sm font-mono text-slate-700 dark:text-zinc-400 tracking-[0.4em] uppercase block mt-2 font-bold">
            TECH SOLUTIONS — ENTERPRISE DIGITAL ENGINEERING
          </span>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-700 dark:text-zinc-400">
          <div>
            © {currentYear} Kvantum Tech Solutions. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6 justify-center">
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-sky-500 transition-colors">
              sitemap.xml
            </a>
            <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-sky-500 transition-colors">
              robots.txt
            </a>
            <Link to="/privacy" className="hover:text-slate-900 dark:hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-900 dark:hover:text-zinc-300 transition-colors">Terms of Service</Link>
            <Link to="/admin" className="text-slate-400 dark:text-zinc-600 hover:text-slate-700 dark:hover:text-zinc-400 transition-colors">[Admin Portal]</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
