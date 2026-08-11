'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, RotateCcw, X, Minus } from 'lucide-react';
import Message, { MessageData } from './Message';
import TypingIndicator from './TypingIndicator';
import LeadForm from './LeadForm';

const BOT_WELCOME: MessageData = {
  id: 'welcome',
  role: 'bot',
  content: 'Namaste! 🙏 Main Kvantum Tech Solutions ka virtual assistant hoon.\n\nAap **services**, **pricing**, **portfolio** ya **contact** ke baare mein kuch bhi pooch sakte hain!',
  timestamp: new Date(),
};

const INITIAL_QUICK_REPLIES = ['Services kya hain?', 'Pricing batao', 'Contact details', 'Demo chahiye'];

interface ChatWindowProps {
  onClose: () => void;
  onMinimize: () => void;
}

export default function ChatWindow({ onClose, onMinimize }: ChatWindowProps) {
  const [messages, setMessages] = useState<MessageData[]>([BOT_WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [quickReplies, setQuickReplies] = useState(INITIAL_QUICK_REPLIES);
  const [sessionKey] = useState(() => `kts_chat_${Date.now()}_${Math.random().toString(36).slice(2)}`);
  const [sessionId, setSessionId] = useState<string>('');
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [pendingService, setPendingService] = useState<string | undefined>(undefined);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, showLeadForm]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: MessageData = {
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setQuickReplies([]);
    setShowLeadForm(false);

    try {
      const res = await fetch('/api/chatbot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), sessionKey }),
      });

      const data = await res.json();

      if (data.sessionId && !sessionId) setSessionId(data.sessionId);

      const botMsg: MessageData = {
        id: data.messageId,
        role: 'bot',
        content: data.reply || 'Maafi chahta hoon, kuch technical issue aa gayi. Dobara try karein! 🙏',
        intent: data.intent,
        confidence: data.confidence,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMsg]);
      setQuickReplies(data.quickReplies ?? []);

      // Show lead form for booking/quotation intents
      if (data.needsLead && !leadSubmitted) {
        setTimeout(() => setShowLeadForm(true), 800);
        if (data.intent === 'booking' || data.intent === 'quotation') {
          // Extract service from conversation context if possible
        }
      }
    } catch (e) {
      setMessages(prev => [...prev, {
        role: 'bot',
        content: '🔌 Network error. Seedha contact karein: **+91 98116 61828**',
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleFeedback = async (messageId: string, helpful: boolean) => {
    await fetch('/api/chatbot/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messageId, helpful }),
    }).catch(() => null);
  };

  const handleClear = () => {
    setMessages([BOT_WELCOME]);
    setQuickReplies(INITIAL_QUICK_REPLIES);
    setShowLeadForm(false);
    setLeadSubmitted(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleLeadSubmit = () => {
    setShowLeadForm(false);
    setLeadSubmitted(true);
    setMessages(prev => [...prev, {
      role: 'bot',
      content: '✅ **Aapki requirement note kar li gayi!**\n\nHamare team member jald hi aapse sampark karenge. Koi aur sawaal? 😊',
      timestamp: new Date(),
    }]);
    setQuickReplies(['Services batao', 'Pricing kya hai?', 'Portfolio dikhao']);
  };

  return (
    <div className="
      flex flex-col bg-slate-950 overflow-hidden
      fixed inset-0 z-[9995]
      sm:static sm:inset-auto sm:w-[360px] sm:max-w-[95vw] sm:h-[520px] sm:max-h-[80vh]
      sm:border sm:border-slate-800 sm:rounded-2xl sm:shadow-2xl sm:shadow-black/50
    ">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700/60">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-black text-white shadow-lg shadow-cyan-500/30">
              K
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-slate-900" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-tight">Kvantum Assistant</h3>
            <p className="text-[10px] text-green-400 font-mono">● Online — Reply in seconds</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleClear}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
            title="Clear chat"
          >
            <RotateCcw size={13} />
          </button>
          <button
            onClick={onMinimize}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
            title="Minimize"
          >
            <Minus size={13} />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-all"
            title="Close"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5 scrollbar-thin scrollbar-thumb-slate-700">
        {messages.map((msg, i) => (
          <Message key={msg.id ?? i} msg={msg} onFeedback={handleFeedback} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {quickReplies.length > 0 && !loading && (
        <div className="px-3 pb-2 flex flex-wrap gap-1.5">
          {quickReplies.slice(0, 4).map(qr => (
            <button
              key={qr}
              onClick={() => sendMessage(qr)}
              className="px-2.5 py-1 text-[11px] font-mono bg-slate-800 border border-slate-700 text-slate-300 rounded-full hover:border-cyan-500 hover:text-cyan-400 transition-all"
            >
              {qr}
            </button>
          ))}
        </div>
      )}

      {/* Lead Form */}
      {showLeadForm && !leadSubmitted && (
        <LeadForm
          sessionId={sessionId}
          onClose={() => setShowLeadForm(false)}
          onSubmit={handleLeadSubmit}
          initialService={pendingService}
        />
      )}

      {/* Input */}
      <div className="px-3 pb-3 pt-1 border-t border-slate-800/60">
        <div className="flex items-end gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 focus-within:border-cyan-500 transition-colors">
          <textarea
            ref={inputRef}
            rows={1}
            placeholder="Message likhein... (Enter to send)"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 resize-none outline-none leading-relaxed max-h-20 disabled:opacity-50"
            style={{ minHeight: '20px' }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="p-1.5 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
          >
            <Send size={14} />
          </button>
        </div>
        <p className="text-[9px] text-slate-600 text-center mt-1.5 font-mono">
          Shift+Enter for newline • Powered by Kvantum Engine
        </p>
      </div>
    </div>
  );
}
