import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Clock, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import FAQ, { contactFaqs } from '@/components/sections/FAQ';
import { submitContact } from '@/services/contactService';

export default function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Custom Software Development',
    message: '',
  });

  const [status, setStatus] = useState({ loading: false, error: '' });

  const validateForm = () => {
    if (!formData.name || formData.name.trim().length < 2) {
      return 'Please enter a valid full name.';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email.trim())) {
      return 'Please enter a valid email address (e.g. name@company.com).';
    }
    const phoneDigits = formData.phone.replace(/[^0-9]/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 13) {
      return 'Please enter a valid 10-digit phone number (e.g. 9811661828).';
    }
    if (!formData.message || formData.message.trim().length < 10) {
      return 'Please enter project details (at least 10 characters).';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setStatus({ loading: false, error: validationError });
      return;
    }

    setStatus({ loading: true, error: '' });

    try {
      await submitContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        notes: `Message: ${formData.message.trim()}`,
      });

      setStatus({ loading: false, error: '' });
      navigate('/thank-you');
    } catch (err) {
      setStatus({ loading: false, error: err.response?.data?.message || 'Failed to send inquiry. Please try again.' });
    }
  };

  return (
    <div className="container mx-auto max-w-[1280px] px-4 sm:px-6 py-12 text-left select-none overflow-hidden">
      
      {/* Page Title */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <Badge className="mb-4 mx-auto inline-flex items-center gap-1.5 bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400">
          <Sparkles size={14} /> Direct Technical Contact
        </Badge>
        <h1 className="text-3xl sm:text-6xl font-black font-headline text-slate-900 dark:text-white uppercase leading-tight mb-4">
          LET'S DISCUSS YOUR <br />
          <span className="gradient-text">SOFTWARE & AUTOMATION PROJECT</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
          Connect directly with our engineering team to map out your software architecture, request project quotes, or schedule a 1-on-1 demo.
        </p>
      </div>

      {/* Split Screen Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

        {/* Left Column: Direct Info Cards */}
        <div className="flex flex-col gap-6 w-full max-w-full">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-lg">
            <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white mb-6">Contact Matrix</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-500 border border-sky-500/20 shrink-0">
                  <Mail size={20} />
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-mono text-slate-400 block uppercase">Email Support</span>
                  <a href="mailto:info@kvantumtechsolutions.com" className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-sky-500 transition-colors break-all">
                    info@kvantumtechsolutions.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-pink-500/10 text-pink-500 border border-pink-500/20 shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block uppercase">Direct Hotlines</span>
                  <div className="flex flex-col gap-1 text-sm font-bold text-slate-900 dark:text-white mt-1">
                    <a href="tel:+919811661828" className="hover:text-pink-500 transition-colors">+91 9811661828</a>
                    <a href="tel:+919811663433" className="hover:text-pink-500 transition-colors">+91 9811663433</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500 border border-purple-500/20 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block uppercase">Office Address</span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-relaxed mt-1">
                    Kvantum Tech Solutions, A33, 64, Tahirpur Rd, Priyadarshini Vihar, Taharpur Village, Dilshad Garden, Delhi, 110095
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 flex items-center gap-4">
            <Clock size={28} className="text-emerald-500 shrink-0" />
            <div>
              <h4 className="text-sm font-headline font-bold text-slate-900 dark:text-white">Rapid Response SLA</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                All client inquiries submitted through this form are assigned to a senior engineer within 2 hours during business hours.
              </p>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl w-full max-w-full box-border">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-full">
            <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white mb-1">Send a Direct Message</h3>

            {status.error && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center gap-2 font-mono">
                <AlertCircle size={16} className="shrink-0" />
                <span>{status.error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="w-full">
                <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Sahil Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full box-border px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500"
                />
              </div>
              <div className="w-full">
                <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full box-border px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="w-full">
                <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Phone Number (10 digits) *</label>
                <input
                  type="tel"
                  required
                  placeholder="9811661828"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full box-border px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500 font-mono"
                />
              </div>
              <div className="w-full">
                <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Target Service *</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full box-border px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500 font-mono"
                >
                  <option value="Custom Software Development">Custom Software Development</option>
                  <option value="CRM Software Development">CRM Software System</option>
                  <option value="Business Automation">Business Process Automation</option>
                  <option value="HRMS Software">HRMS & Payroll System</option>
                  <option value="WhatsApp Automation">WhatsApp Business API</option>
                  <option value="Web & Mobile App Development">Web & Mobile Apps</option>
                  <option value="AI & Chatbots">AI Chatbots & Integration</option>
                  <option value="Digital Marketing & SEO">Digital Marketing & SEO</option>
                </select>
              </div>
            </div>

            <div className="w-full">
              <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold font-headline">Project / Automation Details *</label>
              <textarea
                rows={4}
                required
                placeholder="Tell us about your project requirements, current workflows, or software goals..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full box-border px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="w-full py-4 rounded-xl text-sm font-bold bg-pink-500 text-white hover:bg-pink-600 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer font-mono uppercase tracking-wider"
            >
              {status.loading ? 'Submitting Inquiry...' : 'SEND INQUIRY →'}
            </button>
          </form>
        </div>

      </div>

      {/* Embedded Google Map */}
      <div className="w-full h-[380px] rounded-3xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-xl">
        <iframe
          title="Kvantum Office Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.07981103231!2d77.31714817631126!3d28.687259075634913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x25c5e1dca1c46e7d%3A0x50a81aafe13b66c0!2sKvantum%20Tech%20Solutions!5e0!3m2!1sen!2sin!4v1785574819803!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Contact Specific FAQ */}
      <FAQ items={contactFaqs} title="Contact & Consultation" subtitle="Frequently Asked Questions" />

    </div>
  );
}
