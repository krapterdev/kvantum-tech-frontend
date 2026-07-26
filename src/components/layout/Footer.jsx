import React from 'react';
import { Link } from 'react-router-dom';
import InteractiveCanvas from '../InteractiveCanvas';

export default function Footer({ seoPages = [], theme, settings, services = [] }) {
  const currentYear = new Date().getFullYear();
  const contact = settings?.contact || {};
  const displayServices = services.slice(0, 6);

  return (
    <footer className="glass-panel relative z-10 mt-[120px] px-6 py-[60px] select-none text-center">
      <div className="container mx-auto max-w-[1280px]">
        
        {/* Centered Globe Network Node */}
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="relative w-[220px] h-[220px] rounded-full overflow-hidden border border-white/8 bg-zinc-950/40 shadow-[0_0_30px_rgba(236,72,153,0.05)]">
            <InteractiveCanvas 
              theme={theme} 
              isStatic={true} 
              width={220} 
              height={220} 
              className="absolute inset-0 block" 
            />
          </div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-4">
            Studio Kvantum
          </span>
        </div>

        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-[60px] text-left">
          
          {/* Logo column */}
          <div className="flex flex-col gap-4">
            <span className="gradient-text text-2xl font-extrabold font-headline block">
              Kvantum
            </span>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-[300px]">
              Kvantum Tech Solutions. Real People. Real Code. Real Results. Custom software, fast loading websites, and clear search strategies.
            </p>
          </div>

          {/* Links 1: Navigation */}
          <div className="flex flex-col gap-6">
            <h5 className="text-zinc-100 text-sm font-mono uppercase tracking-widest font-bold">
              Quick Links
            </h5>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link to="/" className="text-zinc-400 hover:text-pinkCustom transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-zinc-400 hover:text-pinkCustom transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-zinc-400 hover:text-pinkCustom transition-colors">Services</Link></li>
              <li><Link to="/projects" className="text-zinc-400 hover:text-pinkCustom transition-colors">Portfolio</Link></li>
              <li><Link to="/blog" className="text-zinc-400 hover:text-pinkCustom transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-zinc-400 hover:text-pinkCustom transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Links 2: Services list */}
          <div className="flex flex-col gap-6">
            <h5 className="text-zinc-100 text-sm font-mono uppercase tracking-widest font-bold">
              Services
            </h5>
            <ul className="flex flex-col gap-3 text-sm">
              {displayServices.map(ser => (
                <li key={ser.id}>
                  <Link to={`/services/${ser.id}`} className="text-zinc-400 hover:text-pinkCustom transition-colors">
                    {ser.title}
                  </Link>
                </li>
              ))}
              {displayServices.length === 0 && (
                <>
                  <li><Link to="/services" className="text-zinc-400 hover:text-pinkCustom transition-colors">Web Development</Link></li>
                  <li><Link to="/services" className="text-zinc-400 hover:text-pinkCustom transition-colors">App Development</Link></li>
                  <li><Link to="/services" className="text-zinc-400 hover:text-pinkCustom transition-colors">UI/UX Design</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Links 3: Contact details */}
          <div className="flex flex-col gap-6">
            <h5 className="text-zinc-100 text-sm font-mono uppercase tracking-widest font-bold">
              Contact
            </h5>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a href={`mailto:${contact.email || 'info@kvantumtechsolutions.com'}`} className="text-zinc-400 hover:text-pinkCustom transition-colors block break-all">
                  {contact.email || 'info@kvantumtechsolutions.com'}
                </a>
              </li>
              <li className="flex flex-col gap-2">
                <a href="tel:+919811661828" className="text-zinc-400 hover:text-pinkCustom transition-colors block">
                  +91 9811661828
                </a>
                <a href="tel:+919811663433" className="text-zinc-400 hover:text-pinkCustom transition-colors block">
                  +91 9811663433
                </a>
                <a href="tel:+919811663121" className="text-zinc-400 hover:text-pinkCustom transition-colors block">
                  +91 9811663121
                </a>
              </li>
              <li>
                <Link to="/admin" className="text-xs font-mono text-zinc-650 hover:text-pinkCustom transition-colors">
                  [Admin Portal]
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-wrap justify-between items-center text-[11px] font-mono text-zinc-500 gap-4">
          <div>
            &copy; {currentYear} Kvantum Tech Solutions. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-pinkCustom">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-pinkCustom">Terms & Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
