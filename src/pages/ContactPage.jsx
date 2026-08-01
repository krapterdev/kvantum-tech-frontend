import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { submitContact } from '@/services/contactService';

export default function ContactPage() {
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
      setStatus({ loading: false, success: false, error: err.response?.data?.message || 'Failed to send message.' });
    }
  };

  return (
    <div className="container mx-auto max-w-[1280px] px-6 py-12 text-left select-none">
      
      {/* Page Title */}
      <div className="text-center mb-16">
        <Badge className="mb-4 mx-auto inline-flex items-center gap-1.5 bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400">
          <Sparkles size={14} /> Direct Technical Contact
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black font-headline text-slate-900 dark:text-white uppercase leading-tight mb-4">
          LET'S DISCUSS YOUR <br />
          <span className="gradient-text">SOFTWARE & AUTOMATION PROJECT</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base">
          Connect directly with our engineering team to map out your software architecture, request project quotes, or schedule a 1-on-1 demo.
        </p>
      </div>

      {/* Split Screen Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

        {/* Left Column: Direct Info Cards */}
        <div className="flex flex-col gap-6">
          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-lg">
            <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white mb-6">Contact Matrix</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-500 border border-sky-500/20 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block uppercase">Email Support</span>
                  <a href="mailto:info@kvantumtechsolutions.com" className="text-base font-bold text-slate-900 dark:text-white hover:text-sky-500 transition-colors">
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
                    <a href="tel:+919811663121" className="hover:text-pink-500 transition-colors">+91 9811663121</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500 border border-purple-500/20 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block uppercase">Office Address</span>
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed mt-1">
                    Kvantum Tech Solutions, A33, 64, Tahirpur Rd, Priyadarshini Vihar, Taharpur Village, Dilshad Garden, Delhi, 110095
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 flex items-center gap-4">
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
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl">
          {status.success ? (
            <div className="text-center py-12 flex flex-col items-center gap-4">
              <CheckCircle size={48} className="text-emerald-500" />
              <h3 className="text-2xl font-bold font-headline text-slate-900 dark:text-white">Inquiry Submitted!</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md">
                Thank you. Our technical lead will review your software requirement and get back to you shortly.
              </p>
              <button
                onClick={() => setStatus({ loading: false, success: false, error: '' })}
                className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white"
              >
                Submit Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white mb-1">Send a Direct Message</h3>

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
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500"
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
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500"
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
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Company Name</label>
                  <input
                    type="text"
                    placeholder="Company Ltd"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Requirement Category</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500"
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
                <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5 font-bold">Project / Automation Details</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your requirements, current workflows, or software goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-4 rounded-xl text-sm font-bold bg-pink-500 text-white hover:bg-pink-600 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {status.loading ? 'Submitting...' : 'SEND INQUIRY →'}
              </button>
            </form>
          )}
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

    </div>
  );
}
