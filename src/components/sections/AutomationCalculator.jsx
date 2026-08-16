import React, { useState } from 'react';
import Badge from '../ui/Badge';
import { Calculator, ArrowRight, TrendingUp, Clock, IndianRupee } from 'lucide-react';

export default function AutomationCalculator() {
  const [teamSize, setTeamSize] = useState(5);
  const [hoursPerPerson, setHoursPerPerson] = useState(3);
  const [hourlyCost, setHourlyCost] = useState(400);

  // Calculation formulas
  const totalDailyManualHours = teamSize * hoursPerPerson;
  const totalMonthlyHours = totalDailyManualHours * 22; // 22 working days per month
  const totalMonthlyManualCost = totalMonthlyHours * hourlyCost;

  // Automation efficiency savings (est. 70% reduction in manual effort)
  const automationEfficiency = 0.70;
  const totalMonthlyHoursSaved = Math.round(totalMonthlyHours * automationEfficiency);
  const monthlySavings = Math.round(totalMonthlyManualCost * automationEfficiency);
  const annualSavings = monthlySavings * 12;

  return (
    <section className="bg-slate-100/70 dark:bg-zinc-950/60 border-y border-slate-200 dark:border-white/10 py-24 select-none relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[280px] bg-gradient-to-r from-pinkCustom/15 via-purpleCustom/15 to-cyanCustom/15 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="container mx-auto max-w-[1280px] px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-14">
          <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-cyanCustom/10 border-cyanCustom/20 text-cyanCustom">
            <Calculator size={14} className="animate-pulse" /> Automation ROI Calculator
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-900 dark:text-zinc-100 leading-tight mb-5">
            Calculate How Much Time & Money You Can Save <br />
            <span className="gradient-text">Through Business Automation</span>
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Adjust the sliders below to match your team size and manual task workload. See live estimated monthly hours reclaimed and cost savings.
          </p>
        </div>

        {/* Calculator Outer Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full max-w-[1180px] mx-auto">

          {/* Left Panel: Sliders & Controls (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-white/12 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex flex-col justify-between gap-8 text-left">
            
            {/* Slider 1: Team Size */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <label className="text-sm font-headline font-bold text-slate-900 dark:text-zinc-100">
                  Team Size <span className="text-slate-500 dark:text-zinc-400 font-normal text-xs">(Doing manual work)</span>
                </label>
                <span className="text-base font-mono font-extrabold text-pinkCustom bg-pinkCustom/10 px-3.5 py-1 rounded-xl border border-pinkCustom/30">
                  {teamSize} People
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-pinkCustom"
              />
            </div>

            {/* Slider 2: Hours Per Person */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <label className="text-sm font-headline font-bold text-slate-900 dark:text-zinc-100">
                  Manual Hours / Person / Day
                </label>
                <span className="text-base font-mono font-extrabold text-cyanCustom bg-cyanCustom/10 px-3.5 py-1 rounded-xl border border-cyanCustom/30">
                  {hoursPerPerson} Hours
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={hoursPerPerson}
                onChange={(e) => setHoursPerPerson(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyanCustom"
              />
            </div>

            {/* Slider 3: Hourly Cost */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <label className="text-sm font-headline font-bold text-slate-900 dark:text-zinc-100">
                  Average Hourly Employee Cost
                </label>
                <span className="text-base font-mono font-extrabold text-purpleCustom bg-purpleCustom/10 px-3.5 py-1 rounded-xl border border-purpleCustom/30">
                  ₹{hourlyCost} / hr
                </span>
              </div>
              <input
                type="range"
                min="150"
                max="2500"
                step="50"
                value={hourlyCost}
                onChange={(e) => setHourlyCost(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purpleCustom"
              />
            </div>

          </div>

          {/* Right Panel: Output ROI Summary (5 cols) */}
          <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-white/12 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex flex-col justify-between gap-8 text-left">
            <div>
              <h3 className="text-lg font-headline font-bold text-slate-900 dark:text-zinc-100 mb-2">
                Estimated Automation Impact
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mb-6">
                Based on ~70% manual workflow efficiency gain.
              </p>

              <div className="space-y-4">
                {/* Result 1: Monthly Hours */}
                <div className="bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-white/12 rounded-2xl p-5 shadow-inner">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-xs font-mono mb-1">
                    <Clock size={15} className="text-cyanCustom" />
                    <span>MONTHLY HOURS RECLAIMED</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold font-headline text-cyanCustom tracking-tight">
                    {totalMonthlyHoursSaved.toLocaleString()} <span className="text-lg font-normal text-slate-500 dark:text-zinc-400">hrs / mo</span>
                  </div>
                </div>

                {/* Result 2: Monthly Savings */}
                <div className="bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-white/12 rounded-2xl p-5 shadow-inner">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-xs font-mono mb-1">
                    <IndianRupee size={15} className="text-pinkCustom" />
                    <span>ESTIMATED MONTHLY SAVINGS</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold font-headline text-pinkCustom tracking-tight">
                    ₹{monthlySavings.toLocaleString('en-IN')} <span className="text-lg font-normal text-slate-500 dark:text-zinc-400">/ mo</span>
                  </div>
                </div>

                {/* Result 3: Annual Savings */}
                <div className="bg-gradient-to-r from-pinkCustom/20 via-purpleCustom/20 to-cyanCustom/20 border border-pinkCustom/40 rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center gap-2 text-slate-800 dark:text-zinc-200 text-xs font-mono mb-1">
                    <TrendingUp size={15} className="text-emerald-500 dark:text-emerald-400" />
                    <span>ANNUAL OPERATIONAL SAVINGS</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-black font-headline text-slate-900 dark:text-white tracking-tight">
                    ₹{annualSavings.toLocaleString('en-IN')} <span className="text-sm font-normal text-slate-700 dark:text-zinc-300">/ year</span>
                  </div>
                </div>

              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => {
                const el = document.getElementById('contact') || document.getElementById('contact-form');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else window.location.href = '/contact';
              }}
              className="w-full py-4 rounded-xl text-sm font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-all duration-200 shadow-[0_0_25px_rgba(236,72,153,0.35)] hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2 mt-6"
            >
              Automate Your Business Now <ArrowRight size={16} />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
