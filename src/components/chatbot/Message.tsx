'use client';

import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export interface MessageData {
  id?: string;
  role: 'user' | 'bot';
  content: string;
  intent?: string;
  confidence?: number;
  timestamp?: Date;
}

interface MessageProps {
  msg: MessageData;
  onFeedback?: (messageId: string, helpful: boolean) => void;
}

export default function Message({ msg, onFeedback }: MessageProps) {
  const isBot = msg.role === 'bot';
  const [feedbackGiven, setFeedbackGiven] = React.useState<boolean | null>(null);

  const handleFeedback = (helpful: boolean) => {
    if (!msg.id || feedbackGiven !== null) return;
    setFeedbackGiven(helpful);
    onFeedback?.(msg.id, helpful);
  };

  // Render markdown-like formatting for bot messages
  const renderContent = (text: string) => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3 animate-fade-in`}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0 mr-2 mt-1 shadow-lg shadow-cyan-500/30">
          K
        </div>
      )}

      <div className={`max-w-[80%] ${isBot ? 'items-start' : 'items-end'} flex flex-col gap-1`}>
        <div
          className={`
            px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed
            ${isBot
              ? 'bg-slate-800/90 border border-slate-700/60 text-slate-100 rounded-tl-none shadow-md'
              : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-tr-none shadow-lg shadow-cyan-500/20'
            }
          `}
          dangerouslySetInnerHTML={isBot ? { __html: renderContent(msg.content) } : undefined}
        >
          {!isBot && msg.content}
        </div>

        {/* Timestamp */}
        {msg.timestamp && (
          <span className="text-[10px] text-slate-500 font-mono px-1">
            {msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}

        {/* Feedback buttons for bot messages */}
        {isBot && msg.id && feedbackGiven === null && (
          <div className="flex items-center gap-1.5 px-1">
            <span className="text-[10px] text-slate-500">Helpful?</span>
            <button
              onClick={() => handleFeedback(true)}
              className="p-0.5 rounded text-slate-500 hover:text-green-400 transition-colors"
              title="Helpful"
            >
              <ThumbsUp size={11} />
            </button>
            <button
              onClick={() => handleFeedback(false)}
              className="p-0.5 rounded text-slate-500 hover:text-red-400 transition-colors"
              title="Not helpful"
            >
              <ThumbsDown size={11} />
            </button>
          </div>
        )}
        {isBot && feedbackGiven !== null && (
          <span className="text-[10px] text-slate-500 px-1">
            {feedbackGiven ? '✅ Thanks!' : '📝 Noted, improving...'}
          </span>
        )}
      </div>
    </div>
  );
}
