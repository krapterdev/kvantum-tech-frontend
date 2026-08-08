import React, { useRef, useEffect, useState } from 'react';

const TOOLBAR_BUTTONS = [
  { cmd: 'bold', label: 'B', title: 'Bold (Ctrl+B)', style: 'font-bold text-xs' },
  { cmd: 'italic', label: 'I', title: 'Italic (Ctrl+I)', style: 'italic text-xs' },
  { cmd: 'underline', label: 'U', title: 'Underline (Ctrl+U)', style: 'underline text-xs' },
  { cmd: 'strikeThrough', label: 'S̶', title: 'Strikethrough', style: 'line-through text-xs' },
  { type: 'sep' },
  { cmd: 'formatBlock', value: 'h2', label: 'H2 (Heading)', title: 'Heading 2', style: 'font-bold text-xs' },
  { cmd: 'formatBlock', value: 'h3', label: 'H3 (Subheading)', title: 'Heading 3', style: 'font-bold text-xs' },
  { cmd: 'formatBlock', value: 'p', label: 'P (Paragraph)', title: 'Normal Text', style: 'text-xs' },
  { type: 'sep' },
  { cmd: 'insertUnorderedList', label: '• Bullet List', title: 'Bullet List' },
  { cmd: 'insertOrderedList', label: '1. Numbered List', title: 'Numbered List' },
  { type: 'sep' },
  { cmd: 'createLink', label: '🔗 Link', title: 'Insert Link', prompt: true },
  { cmd: 'insertImage', label: '🖼️ Image', title: 'Insert Image URL', prompt: true },
  { type: 'sep' },
  { cmd: 'removeFormat', label: '🧹 Clear Format', title: 'Clear Formatting & Bolding' },
];

export default function RichTextEditor({ value = '', onChange, placeholder }) {
  const editorRef = useRef(null);
  const [mode, setMode] = useState('visual'); // 'visual' | 'html'
  const isInternalChange = useRef(false);

  // Sync content into editable div ONLY when external value changes and not from active typing
  useEffect(() => {
    if (editorRef.current && mode === 'visual') {
      if (isInternalChange.current) {
        isInternalChange.current = false;
        return;
      }
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value, mode]);

  const exec = (cmd, val = null, prompt = false) => {
    if (prompt) {
      const url = window.prompt(cmd === 'createLink' ? 'Enter Link URL (e.g. https://...):' : 'Enter Image URL:');
      if (url) {
        document.execCommand(cmd, false, url);
      }
    } else {
      document.execCommand(cmd, false, val);
    }
    if (editorRef.current) {
      editorRef.current.focus();
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="flex flex-col border border-white/10 rounded-2xl overflow-hidden bg-zinc-950/60 shadow-xl">
      {/* Editor Top Bar with Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-zinc-900 border-b border-white/10 select-none">
        <div className="flex flex-wrap items-center gap-1">
          {mode === 'visual' && TOOLBAR_BUTTONS.map((btn, idx) =>
            btn.type === 'sep' ? (
              <span key={idx} className="w-px h-5 bg-white/15 mx-1" />
            ) : (
              <button
                key={idx}
                type="button"
                title={btn.title}
                onMouseDown={(e) => {
                  e.preventDefault();
                  exec(btn.cmd, btn.value || null, btn.prompt);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono text-zinc-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer select-none ${btn.style || ''}`}
              >
                {btn.label}
              </button>
            )
          )}
          {mode === 'html' && (
            <span className="text-xs font-mono text-cyanCustom px-2">Raw HTML Mode (Direct Control)</span>
          )}
        </div>

        <div className="flex items-center gap-1.5 font-mono text-xs">
          <button
            type="button"
            onClick={() => setMode('visual')}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              mode === 'visual' ? 'bg-cyanCustom/20 text-cyanCustom border border-cyanCustom/30 font-bold' : 'text-zinc-400 hover:bg-white/5'
            }`}
          >
            🎨 Visual Editor
          </button>
          <button
            type="button"
            onClick={() => setMode('html')}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              mode === 'html' ? 'bg-cyanCustom/20 text-cyanCustom border border-cyanCustom/30 font-bold' : 'text-zinc-400 hover:bg-white/5'
            }`}
          >
            📝 Code / HTML Mode
          </button>
        </div>
      </div>

      {/* Editor Body */}
      {mode === 'visual' ? (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onBlur={handleInput}
          data-placeholder={placeholder || 'Write your blog content here...'}
          className="min-h-[350px] max-h-[600px] p-6 text-zinc-100 text-sm leading-relaxed outline-none overflow-y-auto font-sans
            [&_h1]:text-2xl [&_h1]:font-black [&_h1]:text-white [&_h1]:mt-6 [&_h1]:mb-3
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-5 [&_h2]:mb-2.5 [&_h2]:border-b [&_h2]:border-white/10 [&_h2]:pb-1
            [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-cyanCustom [&_h3]:mt-4 [&_h3]:mb-2
            [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-zinc-200
            [&_a]:text-cyanCustom [&_a]:underline [&_a]:font-medium
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
            [&_li]:mb-1.5 [&_strong]:font-bold [&_strong]:text-white [&_em]:italic [&_img]:max-w-full [&_img]:rounded-xl [&_img]:my-4 [&_img]:border [&_img]:border-white/10
            empty:before:content-[attr(data-placeholder)] empty:before:text-zinc-600 empty:before:pointer-events-none"
        />
      ) : (
        <textarea
          rows={15}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste or write HTML tags directly (e.g. <h2>Subheading</h2><p>Text...</p>)"
          className="min-h-[350px] w-full p-6 text-zinc-200 text-xs leading-relaxed outline-none bg-zinc-950 font-mono resize-y focus:border-cyanCustom/40"
        />
      )}
    </div>
  );
}
