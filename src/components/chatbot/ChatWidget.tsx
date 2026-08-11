'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import dynamic from 'next/dynamic';

const ChatWindow = dynamic(() => import('./ChatWindow'), { ssr: false });

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [unread, setUnread] = useState(1); // welcome message counts
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Clear unread when opened
  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-20 right-6 z-[9998] flex flex-col items-end gap-3">
      {/* Chat Window */}
      {open && !minimized && (
        <div className="animate-slide-up">
          <ChatWindow
            onClose={() => setOpen(false)}
            onMinimize={() => { setMinimized(true); setOpen(false); }}
          />
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={() => {
          if (minimized) { setMinimized(false); setOpen(true); }
          else setOpen(prev => !prev);
          setUnread(0);
        }}
        className={`
          relative w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110
          flex items-center justify-center group
          ${open
            ? 'bg-slate-700 border border-slate-600'
            : 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/30'
          }
        `}
        aria-label="Chat with us"
      >
        {open ? (
          <X size={22} className="text-white" />
        ) : (
          <>
            <MessageCircle size={24} className="text-white" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full animate-ping bg-cyan-400 opacity-20" />
          </>
        )}

        {/* Unread badge */}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center shadow-lg">
            {unread}
          </span>
        )}
      </button>

      {/* Tooltip on hover */}
      {!open && (
        <div className="absolute bottom-16 right-0 bg-slate-900 border border-slate-700 text-white text-xs px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
          💬 Chat with us!
        </div>
      )}
    </div>
  );
}
