import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';
import Button from '../ui/Button';
import { subscribeNewsletter } from '@/services/newsletterService';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ idle: true, sending: false, success: false, error: '' });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus({ idle: false, sending: true, success: false, error: '' });
    try {
      await subscribeNewsletter(email);
      setStatus({ idle: false, sending: false, success: true, error: '' });
      setEmail('');
      setTimeout(() => {
        setStatus({ idle: true, sending: false, success: false, error: '' });
      }, 5000);
    } catch (err) {
      setStatus({ idle: false, sending: false, success: false, error: err.response?.data?.error || 'Subscription offline.' });
    }
  };

  return (
    <section className="container mx-auto max-w-[680px] px-6 py-20 border-t border-white/8 select-none">
      <div className="text-center mb-10">
        <span className="tech-badge mb-4">Newsletter Node</span>
        <h2 className="text-3xl font-headline font-bold text-zinc-100 leading-tight">
          Subscribe to <span className="gradient-text">Insights</span>
        </h2>
        <p className="text-zinc-400 text-sm mt-2">
          Get latency reports, SEO algorithm updates, and system architectural diagrams delivered to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
        <div className="relative flex items-center">
          <input
            type="email"
            required
            placeholder="e.g. subscriber@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-5 py-4 pr-32 text-zinc-100 text-sm font-sans placeholder-zinc-500 outline-none focus:border-cyanCustom/40 transition-colors"
          />
          <Button
            type="submit"
            disabled={status.sending}
            variant="primary"
            className="absolute right-2 px-4 py-2.5 rounded-lg text-xs"
          >
            {status.sending ? 'Sending...' : <><span className="hidden sm:inline">Subscribe</span> <Send size={12} /></>}
          </Button>
        </div>

        {status.success && (
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-lg text-emerald-400 text-xs font-mono">
            <Check size={14} /> <strong>[SUCCESS]</strong> Telemetry mail synced. Thank you for subscribing!
          </div>
        )}

        {status.error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-lg text-red-400 text-xs font-mono">
            <strong>[ERROR]</strong> {status.error}
          </div>
        )}
      </form>
    </section>
  );
}
