import React, { useState } from 'react';
import { Calculator, Clock, IndianRupee, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

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
    <section className="bg-zinc-950/40 border-y border-white/5 py-24 select-none relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-r from-pinkCustom/10 via-purpleCustom/10 to-cyanCustom/10 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="container mx-auto max-w-[1280px] px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-cyanCustom/10 border-cyanCustom/20 text-cyanCustom">
            <Calculator size={14} className="animate-pulse" /> Automation ROI Calculator
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
            Calculate How Much Time & Money You Can Save <br />
            <span className="gradient-text">Through Business Automation</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Move sliders to match your team size and manual task hours. See instant estimates on hours reclaimed and operational costs saved.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Controls (7 cols) */}
          <Card className="lg:col-span-7 p-8 md:p-10 border flex flex-col justify-between gap-8 text-left bg-zinc-950/60 backdrop-blur-xl">

            {/* Slider 1: Team Size */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-headline font-bold text-zinc-200 flex items-center gap-2">
                  <span>Team Size (Employees doing manual work)</span>
                </label>
                <span className="text-lg font-mono font-extrabold text-pinkCustom bg-pinkCustom/10 px-3 py-1 rounded-lg border border-pinkCustom/20">
                  {teamSize} People
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pinkCustom"
              />
              <div className="flex justify-between text-[11px] font-mono text-zinc-500 mt-2">
                <span>1 Person</span>
                <span>50 People</span>
                <span>100+ People</span>
              </div>
            </div>

            {/* Slider 2: Manual Hours per Day */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-headline font-bold text-zinc-200 flex items-center gap-2">
                  <span>Manual Work Hours / Day / Person</span>
                </label>
                <span className="text-lg font-mono font-extrabold text-cyanCustom bg-cyanCustom/10 px-3 py-1 rounded-lg border border-cyanCustom/20">
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
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyanCustom"
              />
              <div className="flex justify-between text-[11px] font-mono text-zinc-500 mt-2">
                <span>1 Hr (Light)</span>
                <span>4 Hrs (Moderate)</span>
                <span>8 Hrs (Heavy paperwork)</span>
              </div>
            </div>

            {/* Slider 3: Average Hourly Cost */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-headline font-bold text-zinc-200 flex items-center gap-2">
                  <span>Avg. Hourly Cost per Employee</span>
                </label>
                <span className="text-lg font-mono font-extrabold text-purpleCustom bg-purpleCustom/10 px-3 py-1 rounded-lg border border-purpleCustom/20">
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
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purpleCustom"
              />
              <div className="flex justify-between text-[11px] font-mono text-zinc-500 mt-2">
                <span>₹150/hr (Junior)</span>
                <span>₹500/hr (Mid-level)</span>
                <span>₹1,500/hr (Executive)</span>
              </div>
            </div>

            <div className="border-t border-white/8 pt-5 text-xs text-zinc-500 font-mono leading-relaxed">
              *Estimates based on a conservative 75% process automation efficiency achieved across our 250+ delivered business systems.
            </div>

          </Card>

          {/* Right Results Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="h-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-pinkCustom/20 via-purpleCustom/15 to-cyanCustom/20 border border-white/15 flex flex-col justify-between gap-6 relative overflow-hidden shadow-[0_20px_50px_rgba(236,72,153,0.15)] text-left">
              
              {/* Card Badge */}
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-pinkCustom bg-pinkCustom/10 border border-pinkCustom/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Sparkles size={13} /> Estimated Impact
                </span>
                <span className="text-[11px] font-mono text-zinc-400">75% Efficiency Boost</span>
              </div>

              {/* Monthly Hours Reclaimed */}
              <div className="bg-zinc-950/50 border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
                  <Clock size={15} className="text-cyanCustom" />
                  <span>MONTHLY HOURS RECLAIMED</span>
                </div>
                <div className="text-4xl font-extrabold font-headline text-cyanCustom tracking-tight">
                  {totalMonthlyHoursSaved.toLocaleString()} <span className="text-xl font-normal text-zinc-400">hrs / mo</span>
                </div>
              </div>

              {/* Monthly Cost Savings */}
              <div className="bg-zinc-950/50 border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
                  <IndianRupee size={15} className="text-pinkCustom" />
                  <span>ESTIMATED MONTHLY SAVINGS</span>
                </div>
                <div className="text-4xl font-extrabold font-headline text-pinkCustom tracking-tight">
                  ₹{monthlySavings.toLocaleString('en-IN')} <span className="text-xl font-normal text-zinc-400">/ mo</span>
                </div>
              </div>

              {/* Annual Savings Highlight */}
              <div className="bg-gradient-to-r from-pinkCustom/20 to-purpleCustom/20 border border-pinkCustom/30 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-zinc-300 text-xs font-mono mb-1">
                  <TrendingUp size={15} className="text-emerald-400" />
                  <span>ANNUAL OPERATIONAL SAVINGS</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black font-headline text-white tracking-tight">
                  ₹{annualSavings.toLocaleString('en-IN')} <span className="text-base font-normal text-zinc-300">/ year</span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
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
