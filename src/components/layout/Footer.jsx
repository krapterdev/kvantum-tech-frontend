import React from 'react';
import { Link } from 'react-router-dom';
import EarthGlobe from '../sections/EarthGlobe';
import { InstagramIcon, LinkedinIcon, FacebookIcon } from '../ui/SocialIcons';
import KvantumLogo from '../ui/KvantumLogo';

export default function Footer({ seoPages = [], theme, settings, services = [] }) {
  const currentYear = new Date().getFullYear();
  const contact = settings?.contact || {};
  const instagramUrl = contact.instagram || 'https://www.instagram.com/kvantumtechsolutions/';
  const linkedinUrl = contact.linkedin || 'https://www.linkedin.com/in/kvantum-tech-solutions-75916a41b';
  const facebookUrl = contact.facebook || 'https://facebook.com/kvantumtechsolutions';

  return (
    <footer className="glass-panel relative z-10 mt-[120px] px-6 py-[70px] select-none text-center border-t border-white/10 bg-zinc-950/90">
      <div className="container mx-auto max-w-[1280px]">
        
        {/* 360 Degree Rotating Real 3D Earth Planet (GitHub Style) */}
        <div className="flex flex-col items-center justify-center mb-14 overflow-hidden">
          <div className="w-full max-w-[650px]">
            <EarthGlobe />
          </div>
        </div>

        {/* Expanded 5-Column Professional Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-[60px] text-left">
          
          {/* Column 1: Logo & Brand Summary */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <div className="mb-2">
              <KvantumLogo className="h-9 sm:h-11" variant="full" />
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Kvantum Tech Solutions delivers custom software development, business automation, CRM systems, HRMS platforms, ERP solutions, and web & mobile applications.
            </p>
            {/* Social Icons Bar */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-pinkCustom hover:border-pinkCustom/40 hover:bg-pinkCustom/10 transition-all duration-300"
                title="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-cyanCustom hover:border-cyanCustom/40 hover:bg-cyanCustom/10 transition-all duration-300"
                title="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-blue-400 hover:border-blue-400/40 hover:bg-blue-400/10 transition-all duration-300"
                title="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Core Solutions & Services */}
          <div className="flex flex-col gap-4">
            <h5 className="text-zinc-100 text-xs font-mono uppercase tracking-widest font-bold">
              Core Offerings
            </h5>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              <li><Link to="/services" className="text-zinc-400 hover:text-pinkCustom transition-colors">Custom Software Development</Link></li>
              <li><Link to="/services" className="text-zinc-400 hover:text-pinkCustom transition-colors">CRM Software Systems</Link></li>
              <li><Link to="/services" className="text-zinc-400 hover:text-pinkCustom transition-colors">HRMS & Payroll Software</Link></li>
              <li><Link to="/services" className="text-zinc-400 hover:text-pinkCustom transition-colors">Business Automation</Link></li>
              <li><Link to="/services" className="text-zinc-400 hover:text-pinkCustom transition-colors">WhatsApp Business API</Link></li>
              <li><Link to="/services" className="text-zinc-400 hover:text-pinkCustom transition-colors">Web & Mobile Apps</Link></li>
            </ul>
          </div>

          {/* Column 3: Portfolio & Case Studies */}
          <div className="flex flex-col gap-4">
            <h5 className="text-zinc-100 text-xs font-mono uppercase tracking-widest font-bold">
              Portfolio & Projects
            </h5>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              <li><Link to="/projects" className="text-zinc-400 hover:text-cyanCustom transition-colors">Custom CRM Platforms</Link></li>
              <li><Link to="/projects" className="text-zinc-400 hover:text-cyanCustom transition-colors">Automation Systems</Link></li>
              <li><Link to="/projects" className="text-zinc-400 hover:text-cyanCustom transition-colors">ERP & Inventory Solutions</Link></li>
              <li><Link to="/projects" className="text-zinc-400 hover:text-cyanCustom transition-colors">Healthcare & Hotel Software</Link></li>
              <li><Link to="/projects" className="text-zinc-400 hover:text-cyanCustom transition-colors">Ecommerce & Mobile Apps</Link></li>
            </ul>
          </div>

          {/* Column 4: Latest Articles & Blogs */}
          <div className="flex flex-col gap-4">
            <h5 className="text-zinc-100 text-xs font-mono uppercase tracking-widest font-bold">
              Blogs & Articles
            </h5>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              <li><Link to="/blog" className="text-zinc-400 hover:text-pinkCustom transition-colors">Custom Software Productivity</Link></li>
              <li><Link to="/blog" className="text-zinc-400 hover:text-pinkCustom transition-colors">CRM vs ERP Differences</Link></li>
              <li><Link to="/blog" className="text-zinc-400 hover:text-pinkCustom transition-colors">Business Automation Guide</Link></li>
              <li><Link to="/blog" className="text-zinc-400 hover:text-pinkCustom transition-colors">WhatsApp Automation Strategy</Link></li>
              <li><Link to="/blog" className="text-zinc-400 hover:text-pinkCustom transition-colors">HRMS Software Benefits</Link></li>
            </ul>
          </div>

          {/* Column 5: Get in Touch & Direct Support */}
          <div className="flex flex-col gap-4">
            <h5 className="text-zinc-100 text-xs font-mono uppercase tracking-widest font-bold">
              Get In Touch
            </h5>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              <li>
                <a href={`mailto:${contact.email || 'info@kvantumtechsolutions.com'}`} className="text-zinc-400 hover:text-pinkCustom transition-colors block break-all">
                  {contact.email || 'info@kvantumtechsolutions.com'}
                </a>
              </li>
              <li className="flex flex-col gap-1 text-zinc-400">
                <a href="tel:+919811661828" className="hover:text-pinkCustom transition-colors">+91 9811661828</a>
                <a href="tel:+919811663433" className="hover:text-pinkCustom transition-colors">+91 9811663433</a>
                <a href="tel:+919811663121" className="hover:text-pinkCustom transition-colors">+91 9811663121</a>
              </li>
              <li className="text-xs text-zinc-500 font-mono mt-1 leading-relaxed">
                A33, 64, Tahirpur Rd, Priyadarshini Vihar, Dilshad Garden, Delhi, 110095
              </li>
            </ul>
          </div>

        </div>

        {/* Dynamic Local SEO Landing Pages Bar */}
        {seoPages.length > 0 && (
          <div className="border-t border-white/8 pt-6 pb-6 text-left">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-3">
              Locations & Specialized Solutions:
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {seoPages.slice(0, 10).map((page) => (
                <Link
                  key={page.slug}
                  to={`/keyword/${page.slug}`}
                  className="text-zinc-400 hover:text-pinkCustom font-mono text-[11px] bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-md transition-colors"
                >
                  {page.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer Bottom Bar with robots.txt & sitemap.xml links */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {currentYear} Kvantum Tech Solutions. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6 justify-center">
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-cyanCustom transition-colors">
              sitemap.xml
            </a>
            <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-cyanCustom transition-colors">
              robots.txt
            </a>
            <Link to="/privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
            <Link to="/admin" className="text-zinc-600 hover:text-zinc-400 transition-colors">[Admin Portal]</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
