'use client';

import React, { useState, useEffect, Component, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { MessageCircle, X, AlertTriangle, RotateCcw } from 'lucide-react';
import ChatWindow from './ChatWindow';

// React Error Boundary to prevent chatbot errors from crashing the page
class ChatErrorBoundary extends Component<{ children: ReactNode; onClose: () => void }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; onClose: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('[CHATBOT ERROR BOUNDARY]', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-slate-950 border border-slate-800 rounded-2xl text-white">
          <AlertTriangle size={32} className="text-amber-400 mb-3" />
          <h3 className="text-base font-bold mb-1">Chat Assistant Error</h3>
          <p className="text-xs text-slate-400 mb-4">
            An unexpected error occurred in the assistant window.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => this.setState({ hasError: false })}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors"
            >
              <RotateCcw size={13} /> Reset Chat
            </button>
            <button
              onClick={this.props.onClose}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function ChatWidget() {
  const [open, setOpen]           = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [unread, setUnread]       = useState(1);
  const [mounted, setMounted]     = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  if (!mounted || typeof document === 'undefined') return null;

  const handleToggle = () => {
    if (minimized) { setMinimized(false); setOpen(true); }
    else setOpen(prev => !prev);
    setUnread(0);
  };

  const portalContent = open && !minimized && document.body
    ? createPortal(
        <div
          className="
            fixed inset-0 z-[99999] flex flex-col
            sm:inset-auto sm:bottom-28 sm:right-6
            sm:w-[360px] sm:h-[520px]
          "
        >
          <div className="animate-slide-up h-full w-full">
            <ChatErrorBoundary onClose={() => setOpen(false)}>
              <ChatWindow
                onClose={() => setOpen(false)}
                onMinimize={() => { setMinimized(true); setOpen(false); }}
              />
            </ChatErrorBoundary>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      {portalContent}

      {/* Floating toggle button (Fixed Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-[95]">
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
              <span className="absolute inset-0 rounded-full animate-ping bg-cyan-400 opacity-20 pointer-events-none" />
            </>
          )}

          {!open && unread > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center shadow-lg animate-bounce">
              {unread}
            </span>
          )}
        </button>

        {!open && (
          <p className="mt-1 text-center text-[9px] text-white/70 font-mono whitespace-nowrap leading-tight select-none">
            Chat
          </p>
        )}
      </div>
    </>
  );
}
