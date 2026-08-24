import React, { useState } from 'react';
import { useSafeNavigate as useNavigate } from '@/utils/navigation';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    const trimmedName = (formData.name || '').trim();
    if (!trimmedName) {
      errors.name = 'Please enter your name.';
    }

    const trimmedEmail = (formData.email || '').trim();
    if (!trimmedEmail) {
      errors.email = 'Email address is required.';
    }

    const rawPhone = (formData.phone || '').trim();
    const phoneDigits = rawPhone.replace(/[^0-9]/g, '');
    if (!rawPhone) {
      errors.phone = 'Phone number is required.';
    } else if (phoneDigits.length < 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    const trimmedMsg = (formData.message || '').trim();
    if (!trimmedMsg) {
      errors.message = 'Please describe your project requirements.';
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      setStatus({ loading: false, error: firstError });
      return;
    }

    setStatus({ loading: true, error: '' });

    try {
      const payload = {
        name: trimmedName,
        email: trimmedEmail,
        phone: phoneDigits.length >= 10 ? phoneDigits.slice(-10) : rawPhone,
        company: (formData.company || '').trim(),
        service: formData.service || 'Custom Software Development',
        message: trimmedMsg,
        notes: `Company: ${(formData.company || '').trim()} | Message: ${trimmedMsg}`,
      };

      await submitContact(payload);
      setStatus({ loading: false, error: '' });
      navigate('/thank-you');
    } catch (err) {
      setStatus({ loading: false, error: '' });
      navigate('/thank-you');
    }
  };

  return (
    <section id="contact" className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left relative z-10">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        
        {/* Left Info Card */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <Badge className="mb-5 inline-flex items-center gap-1.5 bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400">
              <Sparkles size={14} /> Get In Touch
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-900 dark:text-white leading-tight mb-4">
              Let's Build Something That Moves Your Business Forward
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Tell us what you want to build, improve, or automate. Speak directly to our technical engineering team.
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
                <label htmlFor="contact-name" className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Your Full Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  aria-label="Your Full Name"
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
                <label htmlFor="contact-email" className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Email Address *</label>
                <input
                  id="contact-email"
                  type="email"
                  aria-label="Email Address"
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
                <label htmlFor="contact-phone" className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Phone Number (10 Digits) *</label>
                <input
                  id="contact-phone"
                  type="tel"
                  aria-label="Phone Number"
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
                <label htmlFor="contact-company" className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Company / Organization</label>
                <input
                  id="contact-company"
                  type="text"
                  aria-label="Company or Organization Name"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-service" className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Target Service Requirement</label>
              <select
                id="contact-service"
                aria-label="Target Service Requirement"
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
              <label htmlFor="contact-message" className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Tell us what you want to automate / build *</label>
              <textarea
                id="contact-message"
                rows={4}
                aria-label="Describe your project requirements"
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
              aria-label="Submit Free Proposal Request"
              className="w-full py-4 rounded-xl text-sm font-bold bg-sky-500 hover:bg-sky-600 text-white transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2 font-mono uppercase tracking-wider"
            >
              {status.loading ? 'Sending Request...' : 'Discuss My Project →'}
            </button>
          </form>
        </div>

      </div>

    </section>
  );
}
