import React from 'react';

export default function KvantumLogo({ className = "h-8 sm:h-10", variant = "full" }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official KVANTUM Logo Graphic Banner */}
      <svg
        viewBox="0 0 450 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto max-w-full drop-shadow-[0_0_12px_rgba(59,130,246,0.3)]"
      >
        {/* K */}
        <path d="M15 15V70M15 42.5L50 15M25 36.5L52 70" stroke="#FFFFFF" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* V */}
        <path d="M62 15L85 70L108 15" stroke="#FFFFFF" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Stylized Glowing Blue A */}
        <g>
          <path d="M120 70L145 15L170 70" stroke="#3B82F6" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="130" y1="52" x2="160" y2="52" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round" />
          <circle cx="145" cy="40" r="5" fill="#60A5FA" className="animate-pulse" />
          <circle cx="145" cy="40" r="8" stroke="#93C5FD" strokeWidth="2" opacity="0.8" />
        </g>
        
        {/* N */}
        <path d="M182 70V15L222 70V15" stroke="#FFFFFF" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* T */}
        <path d="M232 15H272M252 15V70" stroke="#FFFFFF" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* U */}
        <path d="M284 15V52C284 62 292 70 304 70C316 70 324 62 324 52V15" stroke="#FFFFFF" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* M */}
        <path d="M336 70V15L360 48L384 15V70" stroke="#FFFFFF" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Bottom Subtitle: TECH SOLUTIONS */}
        {variant === "full" && (
          <g>
            <line x1="15" y1="84" x2="105" y2="84" stroke="#94A3B8" strokeWidth="1.8" />
            <text x="115" y="87" fill="#CBD5E1" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="600" letterSpacing="5.5">
              TECH SOLUTIONS
            </text>
            <line x1="295" y1="84" x2="385" y2="84" stroke="#94A3B8" strokeWidth="1.8" />
          </g>
        )}
      </svg>
    </div>
  );
}
