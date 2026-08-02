import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, PhoneCall, Mail, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';

export default function ThankYouPage() {
  return (
    <div className="container mx-auto max-w-[900px] px-6 py-16 text-center select-none space-y-10">
      {/* Icon & Badge */}
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-500 animate-bounce shadow-xl">
          <CheckCircle2 size={44} />
        </div>
        <Badge className="bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-xs px-4 py-1.5">
          ✨ Lead Received & Verified
        </Badge>
      </div>

      {/* Main Heading */}
      <div className="space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-black font-headline text-slate-900 dark:text-white uppercase leading-tight">
          THANK YOU FOR <br />
          <span className="gradient-text">REACHING OUT TO US!</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          Your project details have been successfully submitted to our engineering & solutions team. We are reviewing your requirements right now.
        </p>
      </div>

      {/* Next Steps Box */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
        <Card className="p-6 bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 flex flex-col gap-3">
          <div className="p-3 rounded-xl bg-sky-500/10 text-sky-500 w-fit">
            <Clock size={22} />
          </div>
          <h3 className="font-headline font-bold text-slate-900 dark:text-white text-base">2-Hour Response</h3>
          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
            Our technical consultant will review your submission and contact you within 2 business hours.
          </p>
        </Card>

        <Card className="p-6 bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 flex flex-col gap-3">
          <div className="p-3 rounded-xl bg-pink-500/10 text-pink-500 w-fit">
            <ShieldCheck size={22} />
          </div>
          <h3 className="font-headline font-bold text-slate-900 dark:text-white text-base">NDA Protection</h3>
          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
            All details, concepts, and architectural ideas shared with Kvantum Tech Solutions remain 100% confidential.
          </p>
        </Card>

        <Card className="p-6 bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 flex flex-col gap-3">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 w-fit">
            <Sparkles size={22} />
          </div>
          <h3 className="font-headline font-bold text-slate-900 dark:text-white text-base">Free Technical Consultation</h3>
          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
            We will provide a custom project roadmap, technology stack recommendations, and cost estimate.
          </p>
        </Card>
      </div>

      {/* Immediate Support Hotline */}
      <div className="p-6 rounded-3xl bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-white/10 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <h4 className="text-xs font-mono font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-widest">Need Immediate Assistance?</h4>
          <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">Call our Direct Solutions Desk</p>
        </div>
        <a
          href="tel:+919811661828"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 text-white font-bold text-xs hover:bg-sky-600 transition-colors shadow-md shrink-0 font-mono"
        >
          <PhoneCall size={14} /> +91 9811661828
        </a>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-opacity shadow-lg"
        >
          <ArrowLeft size={16} /> Return to Home Page
        </Link>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-800 font-bold text-xs hover:border-sky-500/40 transition-colors"
        >
          Explore Our Projects →
        </Link>
      </div>
    </div>
  );
}
