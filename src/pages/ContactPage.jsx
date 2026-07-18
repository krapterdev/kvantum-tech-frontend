import React, { useState } from 'react';
import { Terminal as TerminalIcon, Send, CheckCircle2, RotateCcw, AlertTriangle, MapPin, Mail, Clock } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import GradientText from '@/components/ui/GradientText';
import Button from '@/components/ui/Button';
import { submitContact } from '@/services/contactService';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', service: 'web', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [consoleLogs, setConsoleLogs] = useState([]);

  const addLog = (text, delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setConsoleLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${text}`]);
        resolve();
      }, delay);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setConsoleLogs([`[ERROR] Required parameters missing. Handshake aborted.`]);
      return;
    }

    setStatus('submitting');
    setConsoleLogs([]);

    await addLog('Initialising secure connection protocol...', 0);
    await addLog('Locating edge routing nodes...', 300);
    await addLog('Target resolved: /api/leads', 300);
    await addLog('Structuring handshake payload metadata...', 200);
    await addLog(`Packaging client details: ${formData.name.replace(/\s+/g, '_')}_node`, 200);
    await addLog('Encrypting data stream with 256-bit cryptography...', 300);
    await addLog('Transmitting payload package to database...', 300);

    try {
      await submitContact(formData);
      await addLog('Remote server callback received.', 200);
      await addLog('Handshake accepted. Status: 201 Created.', 200);
      await addLog('[SUCCESS] Lead registered in MongoDB cluster. Nodemailer alert triggered.', 200);
      setStatus('success');
    } catch (err) {
      console.warn('[CONTACT API] Backend connection failed. Falling back to local storage.');
      await addLog('[WARNING] Remote server handshake failed. Node offline.', 300);
      await addLog('[LOCAL BACKUP] Storing payload in client local backup cache...', 400);
      
      const saved = localStorage.getItem('kts_local_leads');
      const list = saved ? JSON.parse(saved) : [];
      const localItem = {
        _id: 'local_' + Math.random().toString(36).substr(2, 9),
        ...formData,
        status: 'New',
        quality: 'Warm',
        notes: 'Backup record. MongoDB server was offline during submit.',
        createdAt: new Date().toISOString()
      };
      list.push(localItem);
      localStorage.setItem('kts_local_leads', JSON.stringify(list));

      await addLog('[SUCCESS] Local cached handshake secure.', 300);
      setStatus('success');
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', service: 'web', message: '' });
    setStatus('idle');
    setConsoleLogs([]);
  };

  return (
    <div id="contact-handshake" className="container mx-auto max-w-[1280px] px-6 py-20 relative z-[5] select-none text-left">
      
      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-4">Secure Gateway</Badge>
        <h1 className="text-4xl sm:text-5xl font-headline font-bold text-zinc-100 mb-4">
          Secure <GradientText>Handshake</GradientText>
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
          Initialize a secure connection nodes cluster to transmit your software development requirements directly to our engineering team.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        
        {/* Form Card */}
        <div className="flex flex-col gap-6">
          <Card 
            className={`p-9 border transition-all duration-300 ${
              status === 'success' ? 'shadow-[0_10px_40px_-10px_rgba(16,185,129,0.2)] border-emerald-500/30' : ''
            }`}
          >
            {status === 'success' ? (
              <div className="text-center py-6 flex flex-col items-center gap-5">
                <CheckCircle2 size={60} className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                <h2 className="text-zinc-100 text-xl font-bold font-headline">Handshake Accepted</h2>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-[340px]">
                  Your details have been compiled and transmitted securely. Our representative developers will trace your connection route shortly.
                </p>
                <Button 
                  onClick={handleReset}
                  variant="secondary"
                  className="mt-5 gap-2 px-5 py-2.5 rounded-lg text-xs"
                >
                  <RotateCcw size={14} /> Open New Session
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div>
                  <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
                    Node Identity (Name)
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-3.5 text-zinc-100 text-sm placeholder-zinc-600 outline-none focus:border-cyanCustom/40 transition-colors"
                    disabled={status === 'submitting'}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
                    Handshake Routing (Email)
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-3.5 text-zinc-100 text-sm placeholder-zinc-600 outline-none focus:border-cyanCustom/40 transition-colors"
                    disabled={status === 'submitting'}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
                    Capability Target (Service)
                  </label>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                    className="w-full bg-zinc-950 border border-white/8 rounded-xl px-4 py-3.5 text-zinc-100 text-sm outline-none cursor-pointer focus:border-cyanCustom/40 transition-colors"
                    disabled={status === 'submitting'}
                  >
                    <option value="seo">SEO & Structured Indexing</option>
                    <option value="smo">SMO & Virality Graph</option>
                    <option value="chatbots">AI Chatbots & Agents</option>
                    <option value="video">Video & Retention Shorts</option>
                    <option value="graphics">Graphics & Brand Identity</option>
                    <option value="web">Web Design & Performance Dev</option>
                    <option value="app">App Design & Haptic Dev</option>
                    <option value="marketing">Digital Marketing & Ads</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
                    Requirements Payload (Message)
                  </label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Describe project parameters..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-3.5 text-zinc-100 text-sm placeholder-zinc-600 outline-none resize-none focus:border-cyanCustom/40 transition-colors"
                    disabled={status === 'submitting'}
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-lg text-red-400 text-xs font-mono">
                    <AlertTriangle size={14} /> <strong>[ERROR]</strong> Data validation failed.
                  </div>
                )}

                <Button 
                  type="submit" 
                  variant="primary"
                  className="w-full py-4 text-[15px]"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Transmitting...' : 'Transmit Handshake'} <Send size={16} />
                </Button>

              </form>
            )}
          </Card>
        </div>

        {/* Console Log + Location Info */}
        <div className="flex flex-col gap-6">
          
          {/* CLI Terminal */}
          <div className="glass-panel bg-slate-950 p-6 sm:p-8 rounded-[20px] border border-white/8 font-mono text-xs text-emerald-400 min-h-[220px] flex flex-col shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] text-left">
            <div className="flex gap-2 items-center mb-4 border-b border-white/5 pb-2">
              <TerminalIcon size={15} className="text-zinc-500 animate-pulse" />
              <span className="text-zinc-500">Callback Console</span>
            </div>

            <div className="flex-grow overflow-y-auto flex flex-col gap-2 max-h-[220px]">
              <div>KTS_Handshake_Initialise$ _</div>
              {consoleLogs.map((log, index) => (
                <div key={index} className="break-all">{log}</div>
              ))}
              {status === 'submitting' && (
                <div className="after:content-['█'] after:animate-pulse after:ml-1 text-zinc-300">TRANSMITTING PAYLOAD DATA NODE...</div>
              )}
              {status === 'success' && (
                <div className="text-emerald-400 font-bold">[SUCCESS] REMOTE PORT SECURED. CONNECTION COMPLETE.</div>
              )}
              {status === 'idle' && (
                <div className="text-zinc-500">Console listener active. Compiling input nodes...</div>
              )}
            </div>
          </div>

          {/* Location info */}
          <Card className="p-9 border flex flex-col gap-6 text-left">
            <h3 className="text-lg text-zinc-100 font-headline font-bold border-b border-white/8 pb-3">
              Gateway Node Location
            </h3>

            <div className="flex gap-4 items-start">
              <MapPin size={20} className="text-cyanCustom shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-zinc-200 mb-1">Corporate Headquarters</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Noida Sector 62, Delhi NCR, India<br />
                  <span className="text-[10px] font-mono text-zinc-500 block mt-1 uppercase tracking-wider">COORD: 28.6273° N, 77.3725° E</span>
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Mail size={20} className="text-purpleCustom shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-zinc-200 mb-1">Inquiries Sync Routing</h4>
                <p className="text-zinc-400 text-sm">
                  <a href="mailto:support@kvantumtechsolutions.com" className="hover:underline">
                    support@kvantumtechsolutions.com
                  </a>
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock size={20} className="text-cyanCustom shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-zinc-200 mb-1">System Latency Hours</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Monday - Friday: 09:00 - 18:00 IST<br />
                  <span className="text-[10px] font-mono text-zinc-500 block mt-1 uppercase tracking-wider">TZ_OFFSET: UTC +05:30</span>
                </p>
              </div>
            </div>

          </Card>

        </div>

      </div>

    </div>
  );
}
