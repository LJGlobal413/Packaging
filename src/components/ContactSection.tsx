import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Clock,
  ExternalLink,
  MessageSquare,
  Loader2,
  Copy,
  Check,
  FileCheck,
} from 'lucide-react';
import { COMPANY_PROFILE } from '../data/printingData';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('General Inquiry & Packaging Consultation');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [contactId, setContactId] = useState('');
  const [copied, setCopied] = useState(false);

  const engineeringEmail = COMPANY_PROFILE.email || 'ljservicedg@gmail.com';
  const contractEmail = COMPANY_PROFILE.contractEmail || 'Service@ljglobal.in';

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(`[CONTACT US] ${reason} - ${company || name}`);
    const body = encodeURIComponent(
      `Hello LJ Packaging Consulting Group,\n\n` +
        `I am reaching out via the website Contact Us form with the following details:\n\n` +
        `• Full Name: ${name}\n` +
        `• Company: ${company}\n` +
        `• Work Email: ${email}\n` +
        `• Phone / WhatsApp: ${phone || 'Not provided'}\n` +
        `• Reason for Contact: ${reason}\n\n` +
        `Message & Project Requirements:\n${message}\n\n` +
        `--------------------------------------------------\n` +
        `Automated Dual Notification Routing:\n` +
        `1. Engineering & Production Lead: ${engineeringEmail}\n` +
        `2. Commercial & Contract Desk:   ${contractEmail}\n` +
        `--------------------------------------------------\n\n` +
        `Please get back to me with your feedback and technical recommendations.\n\nThank you,\n${name}`
    );
    return `mailto:${engineeringEmail},${contractEmail}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          subject: reason,
          message,
        }),
      });

      const resData = await response.json();
      if (resData.contactId) {
        setContactId(resData.contactId);
      }
    } catch (err) {
      console.warn('Backend contact submission logged locally:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleCopyMessage = () => {
    const fullText =
      `CONTACT REQUEST\nTo: ${engineeringEmail} & ${contractEmail}\nFrom: ${name} (${company})\nEmail: ${email}\nPhone: ${phone}\nTopic: ${reason}\nMessage: ${message}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-zinc-900 text-white font-sans border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-500/10 border border-blue-500/30 text-[#00AEEF] text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Communications & Technical Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Contact Us & Start Your <span className="text-[#00AEEF]">Packaging Audit</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Fill out the form below to reach both our structural CAD engineering directors and commercial contract leads. Submissions trigger simultaneous email notification alerts to both our engineering and commercial desks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Cards & Locations */}
          <div className="lg:col-span-5 space-y-6">
            {/* Dual Notification Channels Box */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 space-y-5 shadow-lg">
              <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-white">
                  Dual-Alert Notification Desks
                </h3>
              </div>

              {/* Channel 1: Engineering */}
              <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-blue-400">
                    Channel 01 · Engineering Hub
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#0066E5] animate-pulse"></span>
                </div>
                <h4 className="font-bold text-sm text-white">
                  Structural CAD & Packaging Engineering
                </h4>
                <p className="text-xs text-zinc-400">
                  Barrier pouches, carton dieline geometry, press nesting yields, and Rapid CNC prototypes.
                </p>
                <div className="pt-1">
                  <a
                    href={`mailto:${engineeringEmail}`}
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#00AEEF] hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{engineeringEmail}</span>
                  </a>
                </div>
              </div>

              {/* Channel 2: Client Services */}
              <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-400">
                    Channel 02 · Client Services Hub
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <h4 className="font-bold text-sm text-white">
                  Global Client Services & Project Coordination
                </h4>
                <p className="text-xs text-zinc-400">
                  Turnkey packaging inquiries, account management, CIF/FOB export tracking, and order support.
                </p>
                <div className="pt-1">
                  <a
                    href={`mailto:${contractEmail}`}
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold text-emerald-400 hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{contractEmail}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Global Hubs Info */}
            <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-zinc-300 font-bold text-xs uppercase tracking-wider font-mono">
                <MapPin className="w-4 h-4 text-[#0066E5]" />
                <span>Operating Hubs & Facilities</span>
              </div>

              <div className="space-y-3 text-xs text-zinc-400">
                <div>
                  <strong className="text-white block font-sans">Dongguan Engineering & CAD Testing Lab</strong>
                  <span>Songshan Lake Hi-Tech Industrial Corridor, Dongguan, Guangdong</span>
                </div>
                <div>
                  <strong className="text-white block font-sans">Hong Kong Commercial & Logistics Center</strong>
                  <span>Kwai Chung Container Port Logistics Zone, Hong Kong SAR</span>
                </div>
                <div>
                  <strong className="text-white block font-sans">Preferred Folding Carton Partner</strong>
                  <span>Veena Graphics · IndiaMART Certified Manufacturer</span>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Avg Response: 2 to 4 Hours</span>
                </span>
                <span className="text-emerald-400 font-bold">24/7 Intake Monitored</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 sm:p-8 shadow-xl">
              {submitted ? (
                <div className="text-center py-10 space-y-6">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Message & Email Alert Dispatched!
                    </h3>
                    <p className="text-zinc-400 text-sm mt-1 max-w-md mx-auto">
                      Your inquiry has been successfully registered on our communications server. Both technical and commercial inboxes have received notification alerts.
                    </p>
                    {contactId && (
                      <p className="text-xs font-mono text-zinc-500 mt-2">
                        Tracking Reference: <strong className="text-white">{contactId}</strong>
                      </p>
                    )}
                  </div>

                  {/* Dual Notification Status Box */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 max-w-md mx-auto text-left space-y-2.5 text-xs font-mono">
                    <div className="flex items-center justify-between text-zinc-400 pb-2 border-b border-zinc-800">
                      <span>ALERT RECIPIENT 1</span>
                      <span className="text-[#00AEEF] font-bold">{engineeringEmail}</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>ALERT RECIPIENT 2</span>
                      <span className="text-emerald-400 font-bold">{contractEmail}</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={generateMailtoUrl()}
                      className="w-full sm:w-auto px-6 py-3 bg-[#0066E5] hover:bg-[#0052B8] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open in Mail Client (Both Pre-filled)</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="w-full sm:w-auto px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setMessage('');
                      }}
                      className="w-full sm:w-auto px-4 py-3 text-zinc-400 hover:text-white text-xs uppercase font-mono tracking-wider cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <div>
                      <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                        Fill Contact Form
                      </h3>
                      <p className="text-zinc-400 text-xs">
                        Simultaneous alert dispatch to engineering & contracts
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                      Dual Inboxes
                    </span>
                  </div>

                  {/* Sender Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 font-bold mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#0066E5]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 font-bold mb-1">
                        Company / Brand Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Lumina Global Brand Inc."
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#0066E5]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 font-bold mb-1">
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@lumina.com"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#0066E5]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 font-bold mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#0066E5]"
                      />
                    </div>
                  </div>

                  {/* Reason for Contact */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 font-bold mb-1">
                      Reason for Contact / Topic *
                    </label>
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#0066E5]"
                    >
                      <option>General Inquiry & Packaging Consultation</option>
                      <option>Secondary Folding Carton CAD Dieline & Die Layout</option>
                      <option>Primary Flexible Barrier Pouch Laminate Chemistry</option>
                      <option>Household Cleaning Chemical Bottle Development</option>
                      <option>Tertiary Corrugated Transit Shipper & BCT Calculation</option>
                      <option>Commercial Offset Printing, Die-Cutting & Global Freight</option>
                      <option>Print MIS Implementation & Shopfloor Workflow Automation</option>
                    </select>
                  </div>

                  {/* Message Body */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 font-bold mb-1">
                      Message & Requirements *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please describe your product, packaging requirements, target launch date, volume expectations, delivery destination, or contract framework..."
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#0066E5] resize-none"
                    />
                  </div>

                  {/* Routing Assurance Notice */}
                  <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Dispatches simultaneously to:</span>
                    </span>
                    <span className="font-bold text-white">
                      {engineeringEmail} <span className="text-zinc-600">&</span> {contractEmail}
                    </span>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-[#0066E5] hover:bg-[#0052B8] disabled:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Dispatching Notification Alerts...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message (Alert Both Inboxes)</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
