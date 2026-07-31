import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, X, Send, CheckCircle2, ArrowUp, Headphones } from 'lucide-react';
import { submitContact } from '@/services/contactService';

export default function FloatingQuickActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', service: 'custom-software' });
  const [status, setStatus] = useState('idle');

  // Track scroll position to show Scroll-to-Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setStatus('submitting');

    try {
      await submitContact({
        name: formData.name,
        phone: formData.phone,
        service: formData.service,
        email: 'quickcall@kvantumtechsolutions.com',
        message: 'Quick Callback Request from Floating Widget'
      });
      setStatus('success');
    } catch (err) {
      const saved = localStorage.getItem('kts_local_leads');
      const list = saved ? JSON.parse(saved) : [];
      list.push({
        _id: 'quick_' + Math.random().toString(36).substr(2, 9),
        name: formData.name,
        phone: formData.phone,
        service: formData.service,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('kts_local_leads', JSON.stringify(list));
      setStatus('success');
    }
  };

  return (
    <>
      {/* Floating Buttons Stack (Fixed Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 select-none">

        {/* Scroll To Top Button (Appears when scrolled down) */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-white/20 shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-110 cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        )}

        {/* WhatsApp Direct Chat Button */}
        <a
          href="https://wa.me/919811661828?text=Hi%20Kvantum%20Tech%20Team,%20I%20want%20to%20know%20more%20about%20your%20software%20and%20automation%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_10px_25px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-105 cursor-pointer border border-emerald-400/30"
          title="Chat on WhatsApp"
        >
          <MessageSquare size={20} className="fill-white text-emerald-500 group-hover:rotate-12 transition-transform shrink-0" />
          <span className="text-xs font-bold font-headline hidden sm:inline-block pr-1">WhatsApp Us</span>
        </a>

        {/* Floating Call / Quick Request Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-pinkCustom hover:bg-pink-600 text-white shadow-[0_10px_25px_rgba(236,72,153,0.4)] transition-all duration-300 hover:scale-105 cursor-pointer border border-pink-400/30"
          title="Request Quick Callback"
        >
          {isOpen ? (
            <>
              <X size={20} className="shrink-0" />
              <span className="text-xs font-bold font-headline hidden sm:inline-block pr-1">Close Form</span>
            </>
          ) : (
            <>
              <Phone size={18} className="animate-bounce shrink-0" />
              <span className="text-xs font-bold font-headline hidden sm:inline-block pr-1">Book Callback</span>
            </>
          )}
        </button>

      </div>

      {/* Quick Callback Modal Pop-up */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[9999] w-[320px] sm:w-[360px] p-6 rounded-3xl bg-zinc-950/95 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl text-left select-none animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-pinkCustom bg-pinkCustom/10 border border-pinkCustom/20 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Headphones size={13} /> Quick Callback
            </span>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white cursor-pointer p-1">
              <X size={18} />
            </button>
          </div>

          {status === 'success' ? (
            <div className="py-6 text-center flex flex-col items-center gap-3">
              <CheckCircle2 size={48} className="text-pinkCustom" />
              <h4 className="text-zinc-100 font-bold font-headline text-base">Callback Requested!</h4>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Our technical team will call you at <strong className="text-zinc-200">{formData.phone}</strong> within 15 minutes.
              </p>
              <button
                onClick={() => { setStatus('idle'); setIsOpen(false); }}
                className="mt-2 text-xs font-mono text-pinkCustom hover:underline cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-zinc-100 text-xs placeholder-zinc-600 outline-none focus:border-pinkCustom/50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-zinc-100 text-xs placeholder-zinc-600 outline-none focus:border-pinkCustom/50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Requirement</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-zinc-100 text-xs outline-none focus:border-pinkCustom/50 cursor-pointer"
                >
                  <option value="custom-software">Custom Software</option>
                  <option value="crm">CRM System</option>
                  <option value="hrms">HRMS Software</option>
                  <option value="automation">Business Automation</option>
                  <option value="whatsapp">WhatsApp API</option>
                  <option value="mobile-app">Mobile App</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full mt-2 py-3 rounded-xl text-xs font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-colors flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(236,72,153,0.35)] cursor-pointer"
              >
                {status === 'submitting' ? 'Submitting...' : 'Call Me Back'} <Send size={13} />
              </button>

              <div className="text-[10px] text-zinc-500 font-mono text-center mt-1">
                ⚡ We respond within 15 minutes during working hours.
              </div>
            </form>
          )}

        </div>
      )}
    </>
  );
}
