'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, RotateCcw, X, Minus, Globe } from 'lucide-react';
import Message, { MessageData } from './Message';
import TypingIndicator from './TypingIndicator';
import LeadForm from './LeadForm';
import { Language } from '@/lib/chatbot/config/responses';

const WELCOME_MESSAGES: Record<Language, string> = {
  en: 'Hello! 👋 Welcome to Kvantum Tech Solutions. I am your virtual assistant.\n\nFeel free to ask about **Websites**, **WhatsApp Automation**, **CRM**, **HRMS**, or **Custom Software**!',
  hinglish: 'Namaste! 🙏 Main Kvantum Tech Solutions ka virtual assistant hoon.\n\nAap **Website**, **WhatsApp Automation**, **CRM**, **HRMS** ya kisi bhi **Custom Software** ke baare mein pooch sakte hain!',
  hi: 'नमस्ते! 🙏 मैं क्वैंटम टेक सॉल्यूशंस का वर्चुअल सहायक हूँ।\n\nआप **वेबसाइट**, **व्हाट्सएप ऑटोमेशन**, **CRM**, **HRMS** या **कस्टम सॉफ्टवेयर** के बारे में पूछ सकते हैं!',
};

const INITIAL_QUICK_REPLIES: Record<Language, string[]> = {
  en:       ['Our Services', 'Pricing Info', 'View Portfolio', 'Contact Team'],
  hinglish: ['Services kya hain?', 'Pricing batao', 'Portfolio dikhao', 'Contact details'],
  hi:       ['हमारी सेवाएं', 'कीमत की जानकारी', 'पोर्टफोलियो देखें', 'संपर्क करें'],
};

interface ChatWindowProps {
  onClose: () => void;
  onMinimize: () => void;
}

export default function ChatWindow({ onClose, onMinimize }: ChatWindowProps) {
  // 1. Language State with localStorage persistence
  const [language, setLanguage] = useState<Language>('hinglish');

  // 2. Session Key State
  const [sessionKey, setSessionKey] = useState<string>('');

  // 3. Messages State with localStorage restoration
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<string>('');
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [pendingService, setPendingService] = useState<string | undefined>(undefined);
  const [initialized, setInitialized] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Restore session, language & message history from localStorage on client mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Language
    const savedLang = localStorage.getItem('kts_chat_lang') as Language;
    const initialLang: Language = (savedLang === 'en' || savedLang === 'hi' || savedLang === 'hinglish') ? savedLang : 'hinglish';
    setLanguage(initialLang);

    // Session Key
    let key = localStorage.getItem('kts_chat_session_key');
    if (!key) {
      key = `kts_chat_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      localStorage.setItem('kts_chat_session_key', key);
    }
    setSessionKey(key);

    // Messages History
    const savedMsgs = localStorage.getItem('kts_chat_messages');
    if (savedMsgs) {
      try {
        const parsed = JSON.parse(savedMsgs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          setQuickReplies(INITIAL_QUICK_REPLIES[initialLang]);
          setInitialized(true);
          return;
        }
      } catch (e) {
        // Fallback
      }
    }

    // Default Initial Welcome Message
    setMessages([
      {
        id: 'welcome',
        role: 'bot',
        content: WELCOME_MESSAGES[initialLang],
        timestamp: new Date(),
      }
    ]);
    setQuickReplies(INITIAL_QUICK_REPLIES[initialLang]);
    setInitialized(true);
  }, []);

  // Save messages to localStorage on state changes
  useEffect(() => {
    if (!initialized || typeof window === 'undefined') return;
    try {
      localStorage.setItem('kts_chat_messages', JSON.stringify(messages));
      localStorage.setItem('kts_chat_lang', language);
    } catch (e) {
      // Storage error ignored
    }
  }, [messages, language, initialized]);

  // Auto-scroll to latest message
  useEffect(() => {
    try {
      if (messagesEndRef.current && typeof messagesEndRef.current.scrollIntoView === 'function') {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (e) {
      // Scroll error ignored
    }
  }, [messages, loading, showLeadForm]);

  // Handle language switch
  const handleLangChange = (newLang: Language) => {
    if (newLang === language) return;
    setLanguage(newLang);
    setQuickReplies(INITIAL_QUICK_REPLIES[newLang]);

    // Add a language switch notice message
    const langNames: Record<Language, string> = {
      en: '🇬🇧 Switched to English',
      hinglish: '🇮🇳 Switched to Hinglish',
      hi: '🇮🇳 हिंदी में स्विच किया गया',
    };

    const sysMsg: MessageData = {
      role: 'bot',
      content: `🌐 **${langNames[newLang]}**`,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, sysMsg]);
  };

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
        body: JSON.stringify({ message: text.trim(), sessionKey, language }),
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
      setQuickReplies(data.quickReplies ?? INITIAL_QUICK_REPLIES[language]);

      if (data.needsLead && !leadSubmitted) {
        setTimeout(() => setShowLeadForm(true), 800);
      }
    } catch (e) {
      setMessages(prev => [...prev, {
        role: 'bot',
        content: '🔌 Network error. Direct contact: **+91 98116 61828**',
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
    if (typeof window !== 'undefined') {
      localStorage.removeItem('kts_chat_messages');
    }
    setMessages([{
      id: 'welcome',
      role: 'bot',
      content: WELCOME_MESSAGES[language],
      timestamp: new Date(),
    }]);
    setQuickReplies(INITIAL_QUICK_REPLIES[language]);
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
      content: language === 'hi'
        ? '✅ **आपकी जानकारी दर्ज कर ली गई है!**\n\nहमारी टीम जल्द ही आपसे संपर्क करेगी। 📞'
        : language === 'en'
        ? '✅ **Thank you! Your details have been submitted.**\n\nOur expert will contact you shortly. 📞'
        : '✅ **Aapki requirement note kar li gayi!**\n\nHamare team member jald hi aapse sampark karenge. 📞',
      timestamp: new Date(),
    }]);
    setQuickReplies(INITIAL_QUICK_REPLIES[language]);
  };

  return (
    <div className="
      flex flex-col w-full h-full bg-slate-950 overflow-hidden
      border border-slate-800 sm:rounded-2xl shadow-2xl shadow-black/50
    ">

      {/* Header with Language Selector & Action Controls */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border-b border-slate-700/60 shrink-0">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-black text-white shadow-lg shadow-cyan-500/30">
              K
            </div>
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border-2 border-slate-900" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white leading-tight">Kvantum Assistant</h3>
            <p className="text-[9px] text-green-400 font-mono leading-none">● Online</p>
          </div>
        </div>

        {/* Controls: Language Selector + Clear + Minimize + Close */}
        <div className="flex items-center gap-1.5">
          {/* Language Toggle Pills */}
          <div className="flex items-center p-0.5 bg-slate-800 border border-slate-700 rounded-lg text-[10px] font-mono">
            <button
              onClick={() => handleLangChange('en')}
              className={`px-1.5 py-0.5 rounded ${language === 'en' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => handleLangChange('hinglish')}
              className={`px-1.5 py-0.5 rounded ${language === 'hinglish' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Hinglish"
            >
              Hing
            </button>
            <button
              onClick={() => handleLangChange('hi')}
              className={`px-1.5 py-0.5 rounded ${language === 'hi' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              title="हिंदी"
            >
              हिंदी
            </button>
          </div>

          <button
            onClick={handleClear}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-all"
            title="Reset Chat"
          >
            <RotateCcw size={12} />
          </button>
          <button
            onClick={onMinimize}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-all"
            title="Minimize"
          >
            <Minus size={12} />
          </button>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-all"
            title="Close"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5 scrollbar-thin scrollbar-thumb-slate-700">
        {messages.map((msg, i) => (
          <Message key={msg.id ?? i} msg={msg} onFeedback={handleFeedback} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reply Suggestions */}
      {quickReplies.length > 0 && !loading && (
        <div className="px-3 pb-2 flex flex-wrap gap-1.5 shrink-0">
          {quickReplies.slice(0, 4).map(qr => (
            <button
              key={qr}
              onClick={() => sendMessage(qr)}
              className="px-2.5 py-1 text-[11px] font-mono bg-slate-800/90 border border-slate-700 text-slate-300 rounded-full hover:border-cyan-500 hover:text-cyan-400 hover:bg-slate-800 transition-all active:scale-95"
            >
              {qr}
            </button>
          ))}
        </div>
      )}

      {/* Lead Form */}
      {showLeadForm && !leadSubmitted && (
        <div className="shrink-0">
          <LeadForm
            sessionId={sessionId}
            onClose={() => setShowLeadForm(false)}
            onSubmit={handleLeadSubmit}
            initialService={pendingService}
          />
        </div>
      )}

      {/* Input Area */}
      <div className="px-3 pb-3 pt-1 border-t border-slate-800/60 shrink-0">
        <div className="flex items-end gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 focus-within:border-cyan-500 transition-colors">
          <textarea
            ref={inputRef}
            rows={1}
            placeholder={
              language === 'hi' ? 'संदेश लिखें... (Enter)' : language === 'en' ? 'Type a message... (Enter)' : 'Message likhein... (Enter)'
            }
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className="flex-1 bg-transparent text-xs text-white placeholder:text-slate-500 resize-none outline-none leading-relaxed max-h-20 disabled:opacity-50"
            style={{ minHeight: '20px' }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="p-1.5 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
          >
            <Send size={13} />
          </button>
        </div>
        <p className="text-[8px] text-slate-600 text-center mt-1 font-mono">
          Powered by Kvantum Engine
        </p>
      </div>
    </div>
  );
}
