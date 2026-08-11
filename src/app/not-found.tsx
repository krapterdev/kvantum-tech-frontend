'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, Search, MessageCircle } from 'lucide-react';

const QUICK_LINKS = [
  { href: '/', label: '🏠 Home' },
  { href: '/services', label: '⚙️ Services' },
  { href: '/projects', label: '🎨 Projects' },
  { href: '/blog', label: '📝 Blog' },
  { href: '/contact', label: '📞 Contact' },
  { href: '/about', label: '🏢 About' },
];

export default function NotFound() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const t = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full text-center space-y-6">
        {/* Error code */}
        <div className="relative">
          <p className="text-[120px] sm:text-[160px] font-extrabold leading-none select-none"
            style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #6366f1 50%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              opacity: 0.15,
            }}
          >
            404
          </p>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl sm:text-5xl font-extrabold text-white mb-1">
              404
            </div>
            <div className="text-sm font-mono text-cyan-400 tracking-widest uppercase">
              Page Not Found{dots}
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl space-y-5">
          <div>
            <h1 className="text-xl font-bold text-white mb-2">Oops! Yeh page nahi mila 🔍</h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              The page you're looking for doesn't exist, was moved, or the URL may be incorrect.
              Neeche se navigate karein ya home par wapas jayein.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20"
            >
              <Home size={15} />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-all border border-slate-700"
            >
              <ArrowLeft size={15} />
              Go Back
            </button>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-3">Quick Links</p>
            <div className="grid grid-cols-3 gap-2">
              {QUICK_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-2 py-2 text-xs text-slate-400 bg-slate-800/60 hover:bg-slate-700/80 hover:text-white rounded-xl transition-all text-center border border-slate-700/40 hover:border-slate-600"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl border border-slate-700/40">
            <MessageCircle size={14} className="text-cyan-400 shrink-0" />
            <p className="text-xs text-slate-400">
              Help chahiye?{' '}
              <a href="https://wa.me/919811661828" target="_blank" rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                WhatsApp karein
              </a>{' '}
              ya{' '}
              <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                contact form
              </Link>{' '}
              bharo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
