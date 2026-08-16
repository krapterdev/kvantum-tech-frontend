'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { fallbackServices } from '@/data/services';
import { InstagramIcon, LinkedinIcon, FacebookIcon, GithubIcon } from '@/components/ui/SocialIcons';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  theme: string;
  settings?: any;
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function MobileMenu({ isOpen, onClose, theme, settings }: MobileMenuProps) {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const contact = settings?.contact || {};

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  if (!isOpen) return null;

  // Use static services from data — no network call
  const services = fallbackServices?.slice(0, 8) || [];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />

      {/* Slide-in drawer from right */}
      <div
        className="fixed top-0 right-0 h-full w-[300px] max-w-[85vw] z-[95] flex flex-col lg:hidden shadow-2xl"
        style={{
          background: 'linear-gradient(180deg, #0b0f1a 0%, #060a12 100%)',
          borderLeft: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">Menu</p>
            <p className="text-sm font-bold text-white">Kvantum Tech</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`flex items-center px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive(link.href)
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />
              )}
            </Link>
          ))}

          {/* Services Dropdown */}
          <div>
            <button
              onClick={() => setServicesOpen(p => !p)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                pathname?.startsWith('/services')
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              Services
              {servicesOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {servicesOpen && (
              <div className="mt-1 ml-3 pl-3 border-l border-slate-700 space-y-0.5">
                <Link
                  href="/services"
                  onClick={onClose}
                  className="block px-3 py-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  All Services →
                </Link>
                {services.map((svc: any) => (
                  <Link
                    key={svc.slug || svc.id || svc._id}
                    href={`/services/${svc.slug || svc.id || svc._id}`}
                    onClick={onClose}
                    className="block px-3 py-2 text-xs text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all leading-tight"
                  >
                    {svc.name || svc.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* CTA Section */}
        <div className="px-4 pb-6 pt-3 border-t border-white/5 space-y-3">
          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/kvantumtechsolutions/"
              target="_blank" rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-pink-500/20 text-slate-400 hover:text-pink-400 transition-all"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/kvantum-tech-solutions-75916a41b/"
              target="_blank" rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 transition-all"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61591468234442"
              target="_blank" rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 transition-all"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/krapterdev"
              target="_blank" rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-purple-500/20 text-slate-400 hover:text-purple-400 transition-all"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/919811661828?text=Hi%20Kvantum%20Tech%20Team`}
              target="_blank" rel="noopener noreferrer"
              className="ml-auto p-2.5 rounded-xl bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12.004 0C5.373 0 0 5.374 0 12.004c0 2.116.553 4.1 1.518 5.82L.057 23.999l6.307-1.651A11.944 11.944 0 0012.004 24C18.627 24 24 18.627 24 12.004 24 5.373 18.627 0 12.004 0zm0 21.946a9.943 9.943 0 01-5.047-1.37l-.361-.215-3.746.982 1-3.648-.236-.374a9.903 9.903 0 01-1.52-5.317c0-5.481 4.458-9.94 9.91-9.94 5.453 0 9.911 4.459 9.911 9.94 0 5.48-4.458 9.942-9.911 9.942z"/>
              </svg>
            </a>
          </div>

          {/* Get in Touch CTA */}
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20"
          >
            Get in Touch <ArrowRight size={15} />
          </Link>

          <p className="text-[10px] text-slate-600 text-center font-mono">
            Mon–Sat • 9AM–7PM • +91 98116 61828
          </p>
        </div>
      </div>
    </>
  );
}
