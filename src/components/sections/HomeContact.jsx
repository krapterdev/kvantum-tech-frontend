import React, { useState } from 'react';
import { Send, CheckCircle2, RotateCcw, AlertTriangle, MapPin, Mail, Clock, Phone } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import GradientText from '../ui/GradientText';
import Button from '../ui/Button';
import { submitContact } from '@/services/contactService';

export default function HomeContact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: 'web', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [honeypot, setHoneypot] = useState('');
  const [formLoadTime] = useState(Date.now());

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Anti-bot check 1: Honeypot field (bots fill this field, humans do not see it)
    if (honeypot) {
      console.warn('[ANTI-BOT] Spam submission blocked via honeypot.');
      setStatus('success'); // Pretend success so bots do not try other forms
      return;
    }

    // Anti-bot check 2: Speed check (bots submit within 1-2 seconds, humans take longer)
    const timeSpent = Date.now() - formLoadTime;
    if (timeSpent < 2000) {
      console.warn('[ANTI-BOT] Spam submission blocked via submission speed check:', timeSpent, 'ms');
      setStatus('success'); // Pretend success
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      await submitContact(formData);
      setStatus('success');
    } catch (err) {
      console.warn('[CONTACT API] Backend connection failed. Falling back to local storage.');
      
      const saved = localStorage.getItem('kts_local_leads');
      const list = saved ? JSON.parse(saved) : [];
      const localItem = {
        _id: 'local_' + Math.random().toString(36).substr(2, 9),
        ...formData,
        status: 'New',
        quality: 'Warm',
        notes: 'Backup record. MongoDB server was offline during submit.',
        createdAt: new Date().toISOString()
      };
      list.push(localItem);
      localStorage.setItem('kts_local_leads', JSON.stringify(list));

      setStatus('success');
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', service: 'web', message: '' });
    setHoneypot('');
    setStatus('idle');
  };

  return (
    <section id="contact" className="container mx-auto max-w-[1280px] px-6 py-20 relative z-[5] select-none text-left">
      
      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">Get in Touch</Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 mb-4">
          Let's Build <GradientText className="from-pinkCustom to-purpleCustom">Something Together</GradientText>
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
          Whether you have a fully mapped blueprint or a rough idea, we're here to help build what you need.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch">
        
        {/* Form Card */}
        <div className="flex flex-col">
          <Card 
            className={`p-9 border h-full flex flex-col justify-center transition-all duration-300 ${
              status === 'success' ? 'shadow-[0_10px_40px_-10px_rgba(236,72,153,0.2)] border-pinkCustom/30' : ''
            }`}
          >
            {status === 'success' ? (
              <div className="text-center py-6 flex flex-col items-center gap-5">
                <CheckCircle2 size={60} className="text-pinkCustom drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]" />
                <h2 className="text-zinc-100 text-xl font-bold font-headline">Message Sent</h2>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-[340px]">
                  Thank you for reaching out. We have received your request and our team will get back to you shortly.
                </p>
                <Button 
                  onClick={handleReset}
                  variant="secondary"
                  className="mt-5 gap-2 px-5 py-2.5 rounded-lg text-xs"
                >
                  <RotateCcw size={14} /> Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div>
                  <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-3.5 text-zinc-100 text-sm placeholder-zinc-600 outline-none focus:border-pinkCustom/40 transition-colors"
                    disabled={status === 'submitting'}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
                      Your Email
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-3.5 text-zinc-100 text-sm placeholder-zinc-600 outline-none focus:border-pinkCustom/40 transition-colors"
                      disabled={status === 'submitting'}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-3.5 text-zinc-100 text-sm placeholder-zinc-600 outline-none focus:border-pinkCustom/40 transition-colors"
                      disabled={status === 'submitting'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
                    What Service Do You Need?
                  </label>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                    className="w-full bg-zinc-950 border border-white/8 rounded-xl px-4 py-3.5 text-zinc-100 text-sm outline-none cursor-pointer focus:border-pinkCustom/40 transition-colors"
                    disabled={status === 'submitting'}
                  >
                    <option value="web">Web Development</option>
                    <option value="app">App Development</option>
                    <option value="ui">UI/UX Design</option>
                    <option value="seo">SEO & Marketing</option>
                    <option value="software">Custom Software</option>
                    <option value="consulting">IT Consulting</option>
                    <option value="not_sure">Not Sure Yet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
                    Your Message
                  </label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-3.5 text-zinc-100 text-sm placeholder-zinc-600 outline-none resize-none focus:border-pinkCustom/40 transition-colors"
                    disabled={status === 'submitting'}
                  />
                </div>

                {/* Honeypot field (anti-bot protection) */}
                <div className="hidden" aria-hidden="true">
                  <input 
                    type="text" 
                    name="website_confirm" 
                    tabIndex={-1} 
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    placeholder="Leave this empty"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-lg text-red-400 text-xs font-mono">
                    <AlertTriangle size={14} /> Please fill in all required fields correctly.
                  </div>
                )}

                <button 
                  type="submit" 
                  className="w-full py-4 rounded-xl text-[15px] font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.35)] flex items-center justify-center gap-2 cursor-pointer"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'} <Send size={16} />
                </button>

              </form>
            )}
          </Card>
        </div>

        {/* Contact Details Column */}
        <div className="flex flex-col justify-between gap-6 h-full">
          
          <Card className="p-9 border flex flex-col gap-8 text-left h-full justify-center">
            <h3 className="text-xl text-zinc-100 font-headline font-bold border-b border-white/8 pb-4">
              Get in touch
            </h3>

            <div className="flex gap-4 items-start">
              <Mail size={22} className="text-pinkCustom shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-zinc-200 mb-1">Email</h4>
                <p className="text-zinc-400 text-sm flex flex-col gap-1">
                  <a href="mailto:info@kvantumtechsolutions.com" className="hover:underline">
                    info@kvantumtechsolutions.com
                  </a>
                  <a href="mailto:service@kvantumtechsolutions.com" className="hover:underline">
                    service@kvantumtechsolutions.com
                  </a>
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Phone size={22} className="text-cyanCustom shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-zinc-200 mb-1">Phone</h4>
                <p className="text-zinc-400 text-sm">
                  <a href="tel:+919811661828" className="hover:underline">
                    +91 9811661828
                  </a>
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock size={22} className="text-purpleCustom shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-zinc-200 mb-1">Working Hours</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Mon — Sat: 10:00 AM — 7:00 PM<br />
                  Sunday: Closed <span className="text-xs font-mono text-zinc-500">(we need sleep too)</span>
                </p>
              </div>
            </div>

            {/* Note */}
            <div className="border-t border-white/8 pt-6 mt-2 text-xs text-zinc-500 font-mono leading-relaxed">
              We typically respond within 2-4 hours during working days. If it's urgent, just call.
            </div>

          </Card>

        </div>

      </div>

    </section>
  );
}
