import React, { useState } from 'react';
import { Send, CheckCircle, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import Badge from '../ui/Badge';
import { submitContact } from '@/services/contactService';

export default function HomeContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'custom-software',
    message: '',
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      await submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        notes: `Company: ${formData.company} | Message: ${formData.message}`,
      });

      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', phone: '', company: '', service: 'custom-software', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.response?.data?.message || 'Failed to send message. Please try again.' });
    }
  };

  return (
    <section id="contact" className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left relative z-10">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Left Info Column */}
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
          {status.success ? (
            <div className="text-center py-12 flex flex-col items-center gap-4">
              <CheckCircle size={48} className="text-emerald-500" />
              <h3 className="text-2xl font-bold font-headline text-slate-900 dark:text-white">Request Received!</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md">
                Thank you for contacting Kvantum Tech Solutions. Our technical team will review your requirement and reach out within 2 hours.
              </p>
              <button
                onClick={() => setStatus({ loading: false, success: false, error: '' })}
                className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white mb-2">Request Free Consultation</h3>

              {status.error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs">
                  {status.error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Sahil Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9811661828"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500"
                  />
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
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500"
                >
                  <option value="custom-software">Custom Software Development</option>
                  <option value="business-automation">Business Process Automation</option>
                  <option value="crm-systems">CRM Software System</option>
                  <option value="hrms-payroll">HRMS & Payroll System</option>
                  <option value="whatsapp-api">WhatsApp Business API</option>
                  <option value="web-mobile-apps">Web & Mobile Apps</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Tell us what you want to automate / build</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your process, workflow, or software requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-4 rounded-xl text-sm font-bold bg-pink-500 text-white hover:bg-pink-600 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {status.loading ? 'Sending Request...' : 'SEND REQUEST →'}
              </button>
            </form>
          )}
        </div>

      </div>

    </section>
  );
}
