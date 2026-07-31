import React from 'react';
import { Link } from 'react-router-dom';
import EarthGlobe from '../sections/EarthGlobe';

export default function Footer({ seoPages = [], theme, settings, services = [] }) {
  const currentYear = new Date().getFullYear();
  const contact = settings?.contact || {};
  const displayServices = services.slice(0, 6);

  return (
    <footer className="glass-panel relative z-10 mt-[100px] px-6 py-[60px] select-none text-center border-t border-white/10">
      <div className="container mx-auto max-w-[1280px]">
        
        {/* 360 Degree Earth Globe Canvas (GitHub style) */}
        <div className="flex flex-col items-center justify-center mb-10 overflow-hidden">
          <div className="w-full max-w-[650px]">
            <EarthGlobe />
          </div>
        </div>

        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-[60px] text-left">
          
          {/* Logo & Intro column */}
          <div className="flex flex-col gap-4">
            <span className="gradient-text text-2xl font-extrabold font-headline block">
              Kvantum Tech Solutions
            </span>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-[300px]">
              Empowering businesses through Custom Software Development, Business Automation, CRM, HRMS, ERP, and Scalable Digital Solutions.
            </p>
          </div>

          {/* Links 1: Quick Links */}
          <div className="flex flex-col gap-5">
            <h5 className="text-zinc-100 text-xs font-mono uppercase tracking-widest font-bold">
              Quick Links
            </h5>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link to="/" className="text-zinc-400 hover:text-pinkCustom transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-zinc-400 hover:text-pinkCustom transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-zinc-400 hover:text-pinkCustom transition-colors">Services & Solutions</Link></li>
              <li><Link to="/projects" className="text-zinc-400 hover:text-pinkCustom transition-colors">Portfolio & Case Studies</Link></li>
              <li><Link to="/blog" className="text-zinc-400 hover:text-pinkCustom transition-colors">Blog & Resources</Link></li>
              <li><Link to="/contact" className="text-zinc-400 hover:text-pinkCustom transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Links 2: Services list */}
          <div className="flex flex-col gap-5">
            <h5 className="text-zinc-100 text-xs font-mono uppercase tracking-widest font-bold">
              Core Offerings
            </h5>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link to="/services" className="text-zinc-400 hover:text-pinkCustom transition-colors">Custom Software Development</Link></li>
              <li><Link to="/services" className="text-zinc-400 hover:text-pinkCustom transition-colors">CRM Software</Link></li>
              <li><Link to="/services" className="text-zinc-400 hover:text-pinkCustom transition-colors">HRMS & Payroll Software</Link></li>
              <li><Link to="/services" className="text-zinc-400 hover:text-pinkCustom transition-colors">Business Automation</Link></li>
              <li><Link to="/services" className="text-zinc-400 hover:text-pinkCustom transition-colors">WhatsApp Business API</Link></li>
              <li><Link to="/services" className="text-zinc-400 hover:text-pinkCustom transition-colors">Web & Mobile Apps</Link></li>
            </ul>
          </div>

          {/* Links 3: Contact details */}
          <div className="flex flex-col gap-5">
            <h5 className="text-zinc-100 text-xs font-mono uppercase tracking-widest font-bold">
              Get In Touch
            </h5>
            <ul className="flex flex-col gap-2.5 text-sm">
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
              <li className="text-xs text-zinc-500 font-mono mt-1">
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

        {/* Footer Bottom Bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {currentYear} Kvantum Tech Solutions. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
            <Link to="/admin" className="text-zinc-600 hover:text-zinc-400 transition-colors">[Admin Portal]</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
