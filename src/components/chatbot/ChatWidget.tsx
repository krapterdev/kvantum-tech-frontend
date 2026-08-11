'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MessageCircle, X } from 'lucide-react';
import dynamic from 'next/dynamic';

const ChatWindow = dynamic(() => import('./ChatWindow'), { ssr: false });

export default function ChatWidget() {
  const [open, setOpen]         = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [unread, setUnread]     = useState(1);
  const [mounted, setMounted]   = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  if (!mounted) return null;

  const handleToggle = () => {
    if (minimized) { setMinimized(false); setOpen(true); }
    else setOpen(prev => !prev);
    setUnread(0);
  };

  // Render ChatWindow via portal so it ALWAYS sits at document.body root level
  // This completely bypasses any parent z-index / overflow / stacking context
  const chatWindowPortal = open && !minimized
    ? createPortal(
        /* ── Mobile: full-screen overlay | Desktop: floating card ── */
        <div
          className="
            /* Mobile: fixed full screen */
            fixed inset-0 z-[99999]
            flex flex-col
            /* Desktop: position above the button (bottom-right) */
            sm:inset-auto sm:bottom-28 sm:right-6
            sm:w-[360px] sm:h-[520px]
          "
        >
          <div className="animate-slide-up h-full">
            <ChatWindow
              onClose={() => setOpen(false)}
              onMinimize={() => { setMinimized(true); setOpen(false); }}
            />
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      {/* Render ChatWindow at body root via portal */}
      {chatWindowPortal}

      {/* ── Floating toggle button ── */}
      {/* 
        Desktop: bottom-6 right-6 — ABOVE the FloatingQuickActions which are below 
        Mobile:  bottom-6 left-4  — left side, FloatingQuickActions stay on right 
      */}
      <div className="fixed bottom-6 left-4 sm:left-auto sm:right-6 sm:bottom-48 z-[9999]">
        <button
          onClick={handleToggle}
          className={`
            relative w-14 h-14 rounded-full shadow-2xl
            transition-all duration-300 hover:scale-110 active:scale-95
            flex items-center justify-center
            ${open
              ? 'bg-slate-700 border border-slate-600 shadow-black/40'
              : 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/40'
            }
          `}
          aria-label="Chat with Kvantum Assistant"
          title="Chat with us"
        >
          {open ? (
            <X size={22} className="text-white" />
          ) : (
            <>
              <MessageCircle size={24} className="text-white" />
              {/* Pulse ring animation */}
              <span className="absolute inset-0 rounded-full animate-ping bg-cyan-400 opacity-20 pointer-events-none" />
            </>
          )}

          {/* Unread badge */}
          {!open && unread > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center shadow-lg animate-bounce">
              {unread}
            </span>
          )}
        </button>

        {/* Tooltip label below button */}
        {!open && (
          <p className="mt-1 text-center text-[9px] text-white/70 font-mono whitespace-nowrap leading-tight select-none">
            Chat
          </p>
        )}
      </div>
    </>
  );
}
