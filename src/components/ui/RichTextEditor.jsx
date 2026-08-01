import React, { useRef, useCallback } from 'react';

const TOOLBAR_BUTTONS = [
  { cmd: 'bold', label: 'B', title: 'Bold', style: 'font-bold' },
  { cmd: 'italic', label: 'I', title: 'Italic', style: 'italic' },
  { cmd: 'underline', label: 'U', title: 'Underline', style: 'underline' },
  { cmd: 'strikeThrough', label: 'S̶', title: 'Strikethrough', style: 'line-through' },
  { type: 'sep' },
  { cmd: 'formatBlock', value: 'h1', label: 'H1', title: 'Heading 1', style: 'font-bold' },
  { cmd: 'formatBlock', value: 'h2', label: 'H2', title: 'Heading 2', style: 'font-bold' },
  { cmd: 'formatBlock', value: 'h3', label: 'H3', title: 'Heading 3', style: 'font-bold' },
  { cmd: 'formatBlock', value: 'p', label: 'P', title: 'Paragraph', style: '' },
  { type: 'sep' },
  { cmd: 'insertUnorderedList', label: '• List', title: 'Bullet List' },
  { cmd: 'insertOrderedList', label: '1. List', title: 'Numbered List' },
  { type: 'sep' },
  { cmd: 'justifyLeft', label: '⬅', title: 'Align Left' },
  { cmd: 'justifyCenter', label: '≡', title: 'Align Center' },
  { cmd: 'justifyRight', label: '➡', title: 'Align Right' },
  { type: 'sep' },
  { cmd: 'createLink', label: '🔗', title: 'Insert Link', prompt: true },
  { cmd: 'insertImage', label: '🖼', title: 'Insert Image URL', prompt: true },
  { type: 'sep' },
  { cmd: 'removeFormat', label: '✕ Format', title: 'Clear Formatting' },
];

export default function RichTextEditor({ value, onChange, placeholder }) {
  const editorRef = useRef(null);

  const exec = useCallback((cmd, val = null, prompt = false) => {
    if (prompt) {
      const url = window.prompt(cmd === 'createLink' ? 'Enter URL:' : 'Enter image URL:');
      if (url) document.execCommand(cmd, false, url);
    } else {
      document.execCommand(cmd, false, val);
    }
    editorRef.current?.focus();
    onChange(editorRef.current?.innerHTML || '');
  }, [onChange]);

  const handleInput = () => {
    onChange(editorRef.current?.innerHTML || '');
  };

  // Sync content on mount
  const handleRef = (el) => {
    editorRef.current = el;
    if (el && value && el.innerHTML !== value) {
      el.innerHTML = value;
    }
  };

  return (
    <div className="flex flex-col border border-white/10 rounded-xl overflow-hidden bg-zinc-950/40">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-zinc-900/80 border-b border-white/10">
        {TOOLBAR_BUTTONS.map((btn, idx) =>
          btn.type === 'sep' ? (
            <span key={idx} className="w-px h-5 bg-white/15 mx-1" />
          ) : (
            <button
              key={idx}
              type="button"
              title={btn.title}
              onMouseDown={(e) => { e.preventDefault(); exec(btn.cmd, btn.value || null, btn.prompt); }}
              className="px-2 py-1 rounded text-[11px] font-mono text-zinc-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer select-none"
            >
              {btn.label}
            </button>
          )
        )}
      </div>

      {/* Editable Area */}
      <div
        ref={handleRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleInput}
        data-placeholder={placeholder || 'Write your blog content here...'}
        className="min-h-[320px] p-5 text-zinc-100 text-sm leading-relaxed outline-none overflow-y-auto
          [&_h1]:text-2xl [&_h1]:font-black [&_h1]:font-headline [&_h1]:text-white [&_h1]:mt-4 [&_h1]:mb-2
          [&_h2]:text-xl [&_h2]:font-bold [&_h2]:font-headline [&_h2]:text-white [&_h2]:mt-4 [&_h2]:mb-2
          [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-3 [&_h3]:mb-1
          [&_p]:mb-3 [&_p]:leading-relaxed [&_a]:text-cyanCustom [&_a]:underline
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3
          [&_li]:mb-1 [&_strong]:font-bold [&_em]:italic [&_img]:max-w-full [&_img]:rounded-lg [&_img]:my-2
          empty:before:content-[attr(data-placeholder)] empty:before:text-zinc-600 empty:before:pointer-events-none"
      />
    </div>
  );
}
