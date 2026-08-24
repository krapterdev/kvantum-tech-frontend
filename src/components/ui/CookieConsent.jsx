import React, { useState, useEffect } from 'react';
import Link from './SafeLink';

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [showManage, setShowManage] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('kts_cookie_consent');
    if (!consent) {
      const showConsent = () => {
        setShow(true);
        window.removeEventListener('scroll', showConsent);
        window.removeEventListener('click', showConsent);
      };
      window.addEventListener('scroll', showConsent, { once: true, passive: true });
      window.addEventListener('click', showConsent, { once: true, passive: true });
      const timer = setTimeout(() => setShow(true), 4000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', showConsent);
        window.removeEventListener('click', showConsent);
      };
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('kts_cookie_consent', JSON.stringify({
      acceptedAt: new Date().toISOString(),
      termsAccepted: true,
      cookiesAccepted: true,
      analytics: true,
      marketing: true
    }));
    setShow(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('kts_cookie_consent', JSON.stringify({
      acceptedAt: new Date().toISOString(),
      termsAccepted: true,
      cookiesAccepted: true,
      analytics: false,
      marketing: false
    }));
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[99999] p-3 sm:p-4 md:p-6 pointer-events-none animate-in fade-in slide-in-from-bottom-6 duration-300">
      <div className="max-w-[1280px] mx-auto bg-white/95 dark:bg-zinc-950/95 border border-slate-200 dark:border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl p-5 sm:p-6 pointer-events-auto transition-all">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-8">
          
          {/* Left Content: Title & Clear Descriptive Consent Statement */}
          <div className="flex-1 text-left select-none space-y-1 sm:space-y-1.5">
            <h4 className="text-base sm:text-lg font-bold font-headline text-slate-900 dark:text-white tracking-tight">
              Cookie Consent
            </h4>
            <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
              By clicking &ldquo;Accept All Cookies&rdquo;, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.{' '}
              <Link
                to="/privacy"
                aria-label="Read Privacy Policy"
                className="text-sky-600 dark:text-sky-400 font-semibold hover:underline cursor-pointer inline-block"
              >
                Privacy policy
              </Link>
            </p>
          </div>

          {/* Right Content: Dual Action Buttons */}
          <div className="flex flex-row items-center gap-3 w-full sm:w-auto shrink-0 justify-end">
            <button
              onClick={handleEssentialOnly}
              aria-label="Manage Cookies"
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-sky-500 text-sky-600 dark:text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 active:scale-95 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer text-center whitespace-nowrap"
            >
              Manage cookies
            </button>
            <button
              onClick={handleAcceptAll}
              aria-label="Accept All Cookies"
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-lg shadow-sky-500/25 transition-all duration-200 cursor-pointer text-center whitespace-nowrap"
            >
              Accept all
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

