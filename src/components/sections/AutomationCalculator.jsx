import React, { useState } from 'react';
import { Calculator, Clock, IndianRupee, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import Badge from '../ui/Badge';

export default function AutomationCalculator() {
  const [teamSize, setTeamSize] = useState(10);
  const [hoursPerDay, setHoursPerDay] = useState(3);
  const [hourlyRate, setHourlyRate] = useState(400); // Avg cost per hour in INR

  // Calculations: 22 working days per month
  const monthlyHoursPerPerson = hoursPerDay * 22;
  const totalMonthlyHoursSaved = Math.round(monthlyHoursPerPerson * teamSize * 0.75); // 75% automation efficiency
  const monthlySavings = Math.round(totalMonthlyHoursSaved * hourlyRate);
  const annualSavings = monthlySavings * 12;

  return (
    <section className="bg-zinc-950/60 border-y border-white/10 py-24 select-none relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[280px] bg-gradient-to-r from-pinkCustom/15 via-purpleCustom/15 to-cyanCustom/15 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="container mx-auto max-w-[1280px] px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-14">
          <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-cyanCustom/10 border-cyanCustom/20 text-cyanCustom">
            <Calculator size={14} className="animate-pulse" /> Automation ROI Calculator
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
            Calculate How Much Time & Money You Can Save <br />
            <span className="gradient-text">Through Business Automation</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Adjust the sliders below to match your team size and manual task workload. See live estimated monthly hours reclaimed and cost savings.
          </p>
        </div>

        {/* Calculator Outer Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full max-w-[1180px] mx-auto">

          {/* Left Panel: Sliders & Controls (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-zinc-900/80 border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex flex-col justify-between gap-8 text-left">
            
            {/* Slider 1: Team Size */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <label className="text-sm font-headline font-bold text-zinc-100">
                  Team Size <span className="text-zinc-400 font-normal text-xs">(Doing manual work)</span>
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
                className="w-full h-2.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-pinkCustom"
              />
              <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                <span>1 Person</span>
                <span>50 People</span>
                <span>100+ People</span>
              </div>
            </div>

            {/* Slider 2: Manual Work Hours */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <label className="text-sm font-headline font-bold text-zinc-100">
                  Manual Work Hours <span className="text-zinc-400 font-normal text-xs">(/ day / employee)</span>
                </label>
                <span className="text-base font-mono font-extrabold text-cyanCustom bg-cyanCustom/10 px-3.5 py-1 rounded-xl border border-cyanCustom/30">
                  {hoursPerDay} Hours / day
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="0.5"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                className="w-full h-2.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyanCustom"
              />
              <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                <span>1 Hr (Light)</span>
                <span>4 Hrs (Moderate)</span>
                <span>8 Hrs (Heavy paperwork)</span>
              </div>
            </div>

            {/* Slider 3: Hourly Cost */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <label className="text-sm font-headline font-bold text-zinc-100">
                  Average Hourly Cost <span className="text-zinc-400 font-normal text-xs">(per employee)</span>
                </label>
                <span className="text-base font-mono font-extrabold text-purpleCustom bg-purpleCustom/10 px-3.5 py-1 rounded-xl border border-purpleCustom/30">
                  ₹{hourlyRate} / hour
                </span>
              </div>
              <input
                type="range"
                min="150"
                max="1500"
                step="50"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purpleCustom"
              />
              <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                <span>₹150/hr (Junior)</span>
                <span>₹500/hr (Mid-level)</span>
                <span>₹1,500/hr (Executive)</span>
              </div>
            </div>

            <div className="border-t border-white/8 pt-4 text-xs text-zinc-400 font-mono leading-relaxed">
              *Calculated using a 75% process efficiency gain benchmarks observed across 250+ Kvantum software deployments.
            </div>

          </div>

          {/* Right Panel: ROI Impact Results (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="h-full p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-pinkCustom/20 via-purpleCustom/20 to-cyanCustom/20 border border-white/20 flex flex-col justify-between gap-6 shadow-[0_25px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl text-left">
              
              {/* Header Badge */}
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-pinkCustom bg-pinkCustom/15 border border-pinkCustom/30 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                  <Sparkles size={13} /> Estimated Impact
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                  75% Automation Gain
                </span>
              </div>

              {/* Result 1: Monthly Hours */}
              <div className="bg-zinc-950/80 border border-white/12 rounded-2xl p-5 shadow-inner">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
                  <Clock size={15} className="text-cyanCustom" />
                  <span>MONTHLY HOURS RECLAIMED</span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-headline text-cyanCustom tracking-tight">
                  {totalMonthlyHoursSaved.toLocaleString()} <span className="text-lg font-normal text-zinc-400">hrs / mo</span>
                </div>
              </div>

              {/* Result 2: Monthly Savings */}
              <div className="bg-zinc-950/80 border border-white/12 rounded-2xl p-5 shadow-inner">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
                  <IndianRupee size={15} className="text-pinkCustom" />
                  <span>ESTIMATED MONTHLY SAVINGS</span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-headline text-pinkCustom tracking-tight">
                  ₹{monthlySavings.toLocaleString('en-IN')} <span className="text-lg font-normal text-zinc-400">/ mo</span>
                </div>
              </div>

              {/* Result 3: Annual Savings */}
              <div className="bg-gradient-to-r from-pinkCustom/30 to-purpleCustom/30 border border-pinkCustom/40 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center gap-2 text-zinc-200 text-xs font-mono mb-1">
                  <TrendingUp size={15} className="text-emerald-400" />
                  <span>ANNUAL OPERATIONAL SAVINGS</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black font-headline text-white tracking-tight">
                  ₹{annualSavings.toLocaleString('en-IN')} <span className="text-sm font-normal text-zinc-300">/ year</span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => {
                  const el = document.getElementById('contact') || document.getElementById('contact-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else window.location.href = '/contact';
                }}
                className="w-full py-4 rounded-xl text-sm font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-all duration-200 shadow-[0_0_25px_rgba(236,72,153,0.35)] hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
              >
                Automate Your Business Now <ArrowRight size={16} />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
