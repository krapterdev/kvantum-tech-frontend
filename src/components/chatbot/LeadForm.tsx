'use client';

import React, { useState } from 'react';
import { X, Send, User, Phone, Mail, Briefcase, FileText } from 'lucide-react';

interface LeadFormProps {
  sessionId: string;
  onClose: () => void;
  onSubmit: () => void;
  initialService?: string;
}

export default function LeadForm({ sessionId, onClose, onSubmit, initialService }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '',
    service: initialService || 'Custom Software Development',
    requirement: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const services = [
    'Website Development', 'eCommerce Development', 'WhatsApp Automation',
    'CRM Software', 'HRMS/ERP System', 'Mobile App Development',
    'Business Automation', 'Custom Software Development',
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.length < 2) errs.name = 'Naam required (min 2 chars)';
    if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[^0-9]/g, ''))) errs.phone = 'Valid 10-digit Indian phone required';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      await fetch('/api/chatbot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, leadData: formData }),
      });
      onSubmit();
    } catch (e) {
      onSubmit(); // Still close on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 mx-2 mb-2 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-sm font-bold text-white">Quick Callback Request</h4>
          <p className="text-[11px] text-slate-400">Team 30 min mein contact karegi</p>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
          <X size={14} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        {/* Name */}
        <div>
          <div className="relative">
            <User size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Aapka naam *"
              value={formData.name}
              onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
              className="w-full pl-8 pr-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>
          {errors.name && <p className="text-[10px] text-red-400 mt-0.5">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <div className="relative">
            <Phone size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="tel"
              placeholder="Phone number *"
              value={formData.phone}
              onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
              className="w-full pl-8 pr-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none font-mono"
            />
          </div>
          {errors.phone && <p className="text-[10px] text-red-400 mt-0.5">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div className="relative">
          <Mail size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="email"
            placeholder="Email (optional)"
            value={formData.email}
            onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
            className="w-full pl-8 pr-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Service */}
        <div className="relative">
          <Briefcase size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            value={formData.service}
            onChange={e => setFormData(p => ({ ...p, service: e.target.value }))}
            className="w-full pl-8 pr-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:border-cyan-500 focus:outline-none appearance-none"
          >
            {services.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Requirement */}
        <div className="relative">
          <FileText size={12} className="absolute left-3 top-3 text-slate-400" />
          <textarea
            rows={2}
            placeholder="Brief requirement (optional)"
            value={formData.requirement}
            onChange={e => setFormData(p => ({ ...p, requirement: e.target.value }))}
            className="w-full pl-8 pr-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? 'Submitting...' : '📤 Submit — Team Will Call Back'}
        </button>
      </form>
    </div>
  );
}
