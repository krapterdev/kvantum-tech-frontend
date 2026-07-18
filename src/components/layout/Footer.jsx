import React from 'react';
import { Link } from 'react-router-dom';
import InteractiveCanvas from '../InteractiveCanvas';

export default function Footer({ seoPages = [], theme }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-panel relative z-10 mt-[120px] border-t border-white/8 border-x-0 border-b-0 px-6 py-[60px] select-none text-center">
      <div className="container mx-auto max-w-[1280px]">
        
        {/* Centered Globe Network Node */}
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="relative w-[220px] h-[220px] rounded-full overflow-hidden border border-white/8 bg-zinc-950/40 shadow-[0_0_30px_rgba(0,210,255,0.05)]">
            <InteractiveCanvas 
              theme={theme} 
              isStatic={true} 
              width={220} 
              height={220} 
              className="absolute inset-0 block" 
            />
          </div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-4">
            Global Connectivity Hub
          </span>
        </div>

        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-[60px] text-left">
          
          {/* Logo column */}
          <div className="flex flex-col gap-4">
            <span className="gradient-text text-2xl font-extrabold font-headline block">
              Kvantum
            </span>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-[300px]">
              Engineering the future of digital interaction through logic-heavy development and high-fidelity aesthetics.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                Operational Node Active
              </span>
            </div>
          </div>

          {/* Links 1: Navigation */}
          <div className="flex flex-col gap-6">
            <h5 className="text-zinc-100 text-sm font-mono uppercase tracking-widest font-bold">
              Navigation
            </h5>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link to="/" className="text-zinc-400 hover:text-cyanCustom transition-colors duration-200">
                  Home Portal
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-zinc-400 hover:text-cyanCustom transition-colors duration-200">
                  Capabilities Matrix
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-zinc-400 hover:text-cyanCustom transition-colors duration-200">
                  About stack profile
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-zinc-400 hover:text-cyanCustom transition-colors duration-200">
                  Developer Logs
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2: Regional Gateways (SEO Dynamic Pages list!) */}
          <div className="flex flex-col gap-6">
            <h5 className="text-zinc-100 text-sm font-mono uppercase tracking-widest font-bold">
              Regional Ports
            </h5>
            <ul className="flex flex-col gap-3 text-sm">
              {seoPages.length > 0 ? (
                seoPages.map(page => (
                  <li key={page.slug}>
                    <Link to={`/keyword/${page.slug}`} className="text-zinc-400 hover:text-cyanCustom transition-colors duration-200">
                      {page.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-zinc-500 italic">No active portals</li>
              )}
            </ul>
          </div>

          {/* Links 3: Administration */}
          <div className="flex flex-col gap-6">
            <h5 className="text-zinc-100 text-sm font-mono uppercase tracking-widest font-bold">
              Administration
            </h5>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link to="/admin" className="text-cyanCustom hover:brightness-110 font-medium transition-all duration-200">
                  Console Control [Admin]
                </Link>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-cyanCustom transition-colors duration-200">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-cyanCustom transition-colors duration-200">
                  LinkedIn Protocol
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/8 pt-6 flex flex-wrap justify-between items-center text-[11px] font-mono text-zinc-500 gap-4">
          <div>
            &copy; {currentYear} STUDIO KVANTUM. ALL SYSTEMS VERIFIED DYNAMICALLY.
          </div>
          <div className="flex gap-6">
            <span>LATENCY: 3.2ms</span>
            <span className="flex items-center gap-1.5">
              DATABASE: CLUSTER
              <div className="w-1.5 h-1.5 rounded-full bg-purpleCustom shadow-[0_0_8px_#8a2be2]"></div>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
