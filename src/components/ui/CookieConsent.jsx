import React, { useState, useEffect } from 'react';
import { ShieldCheck, Check, Cookie, X } from 'lucide-react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('kts_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('kts_cookie_consent', JSON.stringify({
      acceptedAt: new Date().toISOString(),
      termsAccepted: true,
      cookiesAccepted: true
    }));
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[99999] max-w-[380px] p-6 rounded-3xl bg-zinc-950/95 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl text-left select-none animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyanCustom bg-cyanCustom/10 border border-cyanCustom/20 px-3 py-1 rounded-full">
          <Cookie size={14} /> Cookies & Terms Consent
        </div>
        <button onClick={() => setShow(false)} className="text-zinc-400 hover:text-white p-1">
          <X size={16} />
        </button>
      </div>

      <p className="text-zinc-300 text-xs leading-relaxed mb-4">
        We use essential cookies and analytics to ensure you get the best experience on Kvantum Tech Solutions. By clicking Accept, you agree to our <a href="/terms" className="text-cyanCustom hover:underline">Terms of Service</a> & <a href="/privacy" className="text-cyanCustom hover:underline">Privacy Policy</a>.
      </p>

      <div className="flex items-center gap-3">
        <button
          onClick={handleAccept}
          className="w-full py-2.5 rounded-xl text-xs font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-colors flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(236,72,153,0.35)] cursor-pointer"
        >
          <Check size={14} /> Accept Cookies & Terms
        </button>
      </div>
    </div>
  );
}
