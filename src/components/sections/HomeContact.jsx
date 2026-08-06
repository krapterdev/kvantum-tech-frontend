import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle, Mail, Phone, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import Badge from '../ui/Badge';
import { submitContact } from '@/services/contactService';

export default function HomeContact({ settings }) {
  const navigate = useNavigate();
  const contact = settings?.contact || {};
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Custom Software Development',
    message: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, error: '' });

  const validate = () => {
    const errors = {};
    const trimmedName = formData.name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      errors.name = 'Please enter your full name (at least 2 characters).';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(trimmedEmail)) {
      errors.email = 'Invalid email format (e.g. name@company.com). Please enter a valid email.';
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (cleanPhone.length !== 10) {
      errors.phone = `Phone number must be exactly 10 digits (you entered ${cleanPhone.length} digits).`;
    } else if (!indianPhoneRegex.test(cleanPhone)) {
      errors.phone = 'Indian mobile numbers must start with 6, 7, 8, or 9 (e.g. 9811661828).';
    }

    const trimmedMsg = formData.message.trim();
    if (!trimmedMsg) {
      errors.message = 'Please describe your project requirements.';
    } else if (trimmedMsg.length < 10) {
      errors.message = `Message is too short (currently ${trimmedMsg.length} chars). Please write at least 10 characters so we understand your requirement.`;
    }

    setFieldErrors(errors);
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    const errorKeys = Object.keys(errors);

    if (errorKeys.length > 0) {
      const firstErrorField = errorKeys[0];
      setStatus({ 
        loading: false, 
        error: `Please fix errors in the form: ${errors[firstErrorField]}` 
      });
      return;
    }

    setStatus({ loading: true, error: '' });

    try {
      await submitContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        service: formData.service,
        notes: `Message: ${formData.message.trim()}`,
      });

      setStatus({ loading: false, error: '' });
      navigate('/thank-you');
    } catch (err) {
      const backendMessage = err.response?.data?.message || err.message;
      setStatus({ 
        loading: false, 
        error: backendMessage ? `Server Error: ${backendMessage}` : 'Unable to connect to server. Please check your internet connection or try again.' 
      });
    }
  };

  return (
    <section id="contact-form" className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left relative z-10">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        
        {/* Left Info Card */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <Badge className="mb-5 inline-flex items-center gap-1.5 bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400">
              <Sparkles size={14} /> Get In Touch
            </Badge>

            <h2 className="text-4xl sm:text-5xl font-black font-headline text-slate-900 dark:text-white uppercase leading-tight mb-6">
              LET'S BUILD <br />
              <span className="gradient-text">SOMETHING POWERFUL.</span>
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-8">
              Have a process that should be automated? Want custom software built for your business? Talk directly to our technical engineering lead.
            </p>

            <div className="space-y-4 font-mono text-sm mb-8">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                <Mail size={18} className="text-sky-500 shrink-0" />
                <a href="mailto:info@kvantumtechsolutions.com" className="hover:underline">info@kvantumtechsolutions.com</a>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                <Phone size={18} className="text-pink-500 shrink-0" />
                <span>+91 9811661828 / +91 9811663433</span>
              </div>
              <div className="flex items-start gap-3 text-slate-700 dark:text-slate-200">
                <MapPin size={18} className="text-purple-500 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-500 dark:text-slate-400">A33, 64, Tahirpur Rd, Priyadarshini Vihar, Dilshad Garden, Delhi, 110095</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-white/12 shadow-xl dark:shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white mb-1">Request Free Consultation</h3>

            {status.error && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-start gap-2.5 font-mono">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold block uppercase tracking-wider">Form Validation Alert</span>
                  <span>{status.error}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Your Full Name *</label>
                <input
                  type="text"
                  placeholder="Sahil Kumar"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (fieldErrors.name) setFieldErrors(prev => ({ ...prev, name: '' }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl text-slate-900 dark:text-white text-sm outline-none transition-colors ${
                    fieldErrors.name
                      ? 'bg-red-500/10 border-2 border-red-500 focus:border-red-600'
                      : 'bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/10 focus:border-sky-500'
                  }`}
                />
                {fieldErrors.name && (
                  <span className="text-[11px] font-mono text-red-400 mt-1.5 block font-semibold">
                    ⚠️ {fieldErrors.name}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Email Address *</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: '' }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl text-slate-900 dark:text-white text-sm outline-none transition-colors ${
                    fieldErrors.email
                      ? 'bg-red-500/10 border-2 border-red-500 focus:border-red-600'
                      : 'bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/10 focus:border-sky-500'
                  }`}
                />
                {fieldErrors.email && (
                  <span className="text-[11px] font-mono text-red-400 mt-1.5 block font-semibold">
                    ⚠️ {fieldErrors.email}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Phone Number (10 Digits) *</label>
                <input
                  type="tel"
                  placeholder="9811661828"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (fieldErrors.phone) setFieldErrors(prev => ({ ...prev, phone: '' }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl text-slate-900 dark:text-white text-sm outline-none font-mono transition-colors ${
                    fieldErrors.phone
                      ? 'bg-red-500/10 border-2 border-red-500 focus:border-red-600'
                      : 'bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/10 focus:border-sky-500'
                  }`}
                />
                {fieldErrors.phone && (
                  <span className="text-[11px] font-mono text-red-400 mt-1.5 block font-semibold">
                    ⚠️ {fieldErrors.phone}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Company / Organization</label>
                <input
                  type="text"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Target Service Requirement</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500 font-mono"
              >
                <option value="Custom Software Development">Custom Software Development</option>
                <option value="Business Process Automation">Business Process Automation</option>
                <option value="CRM Software System">CRM Software System</option>
                <option value="HRMS & Payroll System">HRMS & Payroll System</option>
                <option value="WhatsApp Business API">WhatsApp Business API</option>
                <option value="Web & Mobile Apps">Web & Mobile Apps</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Tell us what you want to automate / build *</label>
              <textarea
                rows={4}
                placeholder="Describe your process, workflow, or software requirements (min 10 chars)..."
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (fieldErrors.message) setFieldErrors(prev => ({ ...prev, message: '' }));
                }}
                className={`w-full px-4 py-3 rounded-xl text-slate-900 dark:text-white text-sm outline-none resize-none transition-colors ${
                  fieldErrors.message
                    ? 'bg-red-500/10 border-2 border-red-500 focus:border-red-600'
                    : 'bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/10 focus:border-sky-500'
                }`}
              />
              {fieldErrors.message && (
                <span className="text-[11px] font-mono text-red-400 mt-1.5 block font-semibold">
                  ⚠️ {fieldErrors.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="w-full py-4 rounded-xl text-sm font-bold bg-pink-500 text-white hover:bg-pink-600 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2 font-mono uppercase tracking-wider"
            >
              {status.loading ? 'Sending Request...' : 'SEND REQUEST →'}
            </button>
          </form>
        </div>

      </div>

    </section>
  );
}
