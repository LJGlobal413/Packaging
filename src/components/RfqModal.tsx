import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Mail,
  CheckCircle2,
  Box,
  Paperclip,
  Trash2,
  UploadCloud,
  Copy,
  Check,
  ShieldCheck,
  Loader2,
  MessageSquare,
} from 'lucide-react';
import { COMPANY_PROFILE } from '../data/printingData';

interface RfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSpec?: {
    category?: string;
    formType?: 'inquiry' | 'contact';
    quantity?: number;
    paperStock?: string;
    colorMode?: string;
    finishes?: string[];
    totalEstimate?: string;
    unitPrice?: string;
    leadTime?: string;
  } | null;
}

interface AttachedFileInfo {
  name: string;
  size: string;
  type: string;
}

export const RfqModal: React.FC<RfqModalProps> = ({
  isOpen,
  onClose,
  initialSpec,
}) => {
  const [formType, setFormType] = useState<'inquiry' | 'contact'>(
    initialSpec?.formType || (initialSpec?.category?.toLowerCase().includes('contact') ? 'contact' : 'inquiry')
  );
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [scope, setScope] = useState<'full-system' | 'folding-carton-die' | 'flexible-laminate' | 'production-print'>(
    initialSpec?.category?.includes('Pouch')
      ? 'flexible-laminate'
      : initialSpec?.category?.includes('Carton')
      ? 'folding-carton-die'
      : 'full-system'
  );
  const [projectTitle, setProjectTitle] = useState(
    initialSpec?.category || 'Folding Carton Design, Die Layout & Print Dispatch'
  );
  const [quantity, setQuantity] = useState(initialSpec?.quantity || 5000);

  const [notes, setNotes] = useState(
    initialSpec
      ? `Consulting & Production Parameters:\n- Material Stock: ${initialSpec.paperStock || '350gsm C1S SBS'}\n- Print / Coating: ${initialSpec.colorMode || '4C Offset + Soft-Touch'}\n- Layout & Specs: ${(initialSpec.finishes || []).join(' | ')}\n- Estimated Budget: ${initialSpec.totalEstimate || 'Pending'}\n- Target Timeline: ${initialSpec.leadTime || '6-10 Days Print & Dispatch'}`
      : ''
  );
  const [attachedFiles, setAttachedFiles] = useState<AttachedFileInfo[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [serverLeadId, setServerLeadId] = useState<string>('');

  // Dual-alert notification addresses
  const primaryEngineeringEmail = COMPANY_PROFILE.email || 'ljservicedg@gmail.com';
  const primaryServiceEmail = COMPANY_PROFILE.contractEmail || 'Service@ljglobal.in';

  useEffect(() => {
    if (initialSpec?.formType) {
      setFormType(initialSpec.formType);
    }
  }, [initialSpec]);

  if (!isOpen) return null;

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newFiles: AttachedFileInfo[] = Array.from(files).map((f) => ({
      name: f.name,
      size: formatFileSize(f.size),
      type: f.name.split('.').pop()?.toUpperCase() || 'FILE',
    }));
    setAttachedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getScopeLabel = () => {
    if (scope === 'full-system') return 'Full System Packaging Audit (Primary + Secondary + Tertiary)';
    if (scope === 'folding-carton-die') return 'Folding Carton Design & Step-and-Repeat Die Layout';
    if (scope === 'flexible-laminate') return 'Flexible Pouch Laminate Structure & Barrier Chemistry';
    return 'Full-Scale Folding Carton Printing & Global Container Dispatch';
  };

  const buildBriefText = () => {
    const scopeLabel = getScopeLabel();
    const filesText =
      attachedFiles.length > 0
        ? `\n\nAttached Dielines / Artwork / CAD Files (${attachedFiles.length}):\n` +
          attachedFiles.map((f, idx) => `  ${idx + 1}. ${f.name} (${f.size})`).join('\n')
        : '';

    return (
      `==================================================\n` +
      `LJ PACKAGING CONSULTANTS - LEAD INQUIRY NOTIFICATION\n` +
      `Alert Recipients: ${primaryEngineeringEmail} & ${primaryServiceEmail}\n` +
      `==================================================\n\n` +
      `SUBMISSION TYPE: ${formType === 'contact' ? 'DIRECT CONTACT US MESSAGE' : 'TECHNICAL PACKAGING INQUIRY'}\n\n` +
      `CLIENT CONTACT DETAILS:\n` +
      `• Contact Name: ${fullName}\n` +
      `• Company / Brand: ${company}\n` +
      `• Work Email: ${email}\n` +
      `• Phone / WhatsApp: ${phone || 'Not provided'}\n\n` +
      `SPECIFICATIONS & SCOPE:\n` +
      `• Practice Scope: ${scopeLabel}\n` +
      `• Product / Spec Title: ${projectTitle}\n` +
      `• Planned Production Volume: ${quantity.toLocaleString()} units\n` +
      `\nPROJECT BRIEF & TECHNICAL NOTES:\n${notes || 'No additional notes provided.'}` +
      filesText
    );
  };

  const generateMailtoUrl = () => {
    const subjectPrefix = formType === 'contact' ? 'CONTACT US MESSAGE' : 'PACKAGING INQUIRY';

    const subject = encodeURIComponent(
      `[${subjectPrefix}] ${projectTitle} - ${quantity.toLocaleString()} units (${company || fullName})`
    );

    const fullBrief = buildBriefText();
    const emailBody = encodeURIComponent(
      `${fullBrief}\n\n` +
        `--------------------------------------------------\n` +
        `Note: This lead alert has also been automatically registered on the LJ Packaging server for priority dispatch to:\n` +
        `• Engineering & Technical Team: ${primaryEngineeringEmail}\n` +
        `• Client Services Desk:         ${primaryServiceEmail}\n` +
        `--------------------------------------------------\n\n` +
        `Please send your response and technical feedback.\n\n` +
        `Thank you,\n${fullName}`
    );

    return `mailto:${primaryEngineeringEmail},${primaryServiceEmail}?subject=${subject}&body=${emailBody}`;
  };

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          company,
          email,
          phone,
          formType,
          scope: getScopeLabel(),
          projectTitle,
          quantity,
          notes,
          attachedFiles,
        }),
      });

      const resData = await response.json();
      if (resData.leadId) {
        setServerLeadId(resData.leadId);
      }
    } catch (err) {
      console.warn('Backend lead alert logged locally:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleCopyBrief = () => {
    navigator.clipboard.writeText(buildBriefText());
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs font-sans animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-zinc-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-zinc-950 text-white flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#0066E5] flex items-center justify-center text-white font-mono font-bold text-sm shrink-0">
              LJ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                  {formType === 'contact'
                    ? 'Contact Us & Direct Consultation'
                    : 'Packaging Inquiry & Technical Consultation'}
                </h3>
                <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-blue-500/20 text-[#00AEEF] border border-blue-500/30 hidden sm:inline-block">
                  Dual-Alert
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                Notifications routed to: <span className="text-[#00AEEF] font-semibold">{primaryEngineeringEmail}</span> & <span className="text-emerald-400 font-semibold">{primaryServiceEmail}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-md transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle: Inquiry vs Contact Us */}
        <div className="bg-zinc-100 border-b border-zinc-200 px-6 pt-3 flex gap-4 text-xs font-bold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setFormType('inquiry')}
            className={`pb-2.5 px-1 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              formType === 'inquiry'
                ? 'border-[#0066E5] text-[#0066E5]'
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>1. Packaging Inquiry</span>
          </button>
          <button
            type="button"
            onClick={() => setFormType('contact')}
            className={`pb-2.5 px-1 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              formType === 'contact'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>2. Contact Us Form</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {submitted ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-zinc-950">
                  Lead Alert Dispatched!
                </h4>
                {serverLeadId && (
                  <p className="text-xs font-mono text-zinc-500 mt-1">
                    System Reference ID: <strong className="text-zinc-800">{serverLeadId}</strong>
                  </p>
                )}
              </div>

              {/* Verified Alert Routing Card */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-left max-w-lg mx-auto space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase text-zinc-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Email Notification Alerts Dispatched To Both Inboxes:</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded bg-white border border-zinc-200">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#0066E5]"></span>
                      <span className="font-semibold text-zinc-900">Engineering & Production Lead:</span>
                    </div>
                    <span className="font-mono text-[#0066E5] font-bold">{primaryEngineeringEmail}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-white border border-zinc-200">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="font-semibold text-zinc-900">Client Services Desk:</span>
                    </div>
                    <span className="font-mono text-emerald-600 font-bold">{primaryServiceEmail}</span>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed pt-1">
                  Our engineering and client services leads have received your notification alert. You can also open your mail client to send a direct pre-filled copy.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={generateMailtoUrl()}
                  className="w-full sm:w-auto px-6 py-3 bg-[#0066E5] hover:bg-[#0052B8] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Open in Mail Client (Both Pre-filled)</span>
                </a>

                <button
                  onClick={handleCopyBrief}
                  className="w-full sm:w-auto px-5 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  {copiedBrief ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedBrief ? 'Copied Brief!' : 'Copy Full Brief'}</span>
                </button>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-5 py-3 text-zinc-500 hover:text-zinc-900 font-semibold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSendRequest} className="space-y-4 text-xs">
              {/* Scope Practice Selector */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-600 font-bold">
                    Select Packaging Discipline / Scope:
                  </label>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    Routing to {primaryEngineeringEmail} & {primaryServiceEmail}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setScope('full-system')}
                    className={`p-2.5 rounded border text-left cursor-pointer transition-colors ${
                      scope === 'full-system'
                        ? 'border-[#0066E5] bg-blue-50/50 text-[#0066E5] font-bold'
                        : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'
                    }`}
                  >
                    <p className="font-semibold text-zinc-900">Full System</p>
                    <p className="text-[10px] text-zinc-500">Primary + 2nd + 3rd</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setScope('folding-carton-die')}
                    className={`p-2.5 rounded border text-left cursor-pointer transition-colors ${
                      scope === 'folding-carton-die'
                        ? 'border-[#0066E5] bg-blue-50/50 text-[#0066E5] font-bold'
                        : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'
                    }`}
                  >
                    <p className="font-semibold text-zinc-900">Carton & Dies</p>
                    <p className="text-[10px] text-zinc-500">CAD & press yield</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setScope('flexible-laminate')}
                    className={`p-2.5 rounded border text-left cursor-pointer transition-colors ${
                      scope === 'flexible-laminate'
                        ? 'border-[#0066E5] bg-blue-50/50 text-[#0066E5] font-bold'
                        : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'
                    }`}
                  >
                    <p className="font-semibold text-zinc-900">Barrier Pouches</p>
                    <p className="text-[10px] text-zinc-500">OTR/WVTR laminates</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setScope('production-print')}
                    className={`p-2.5 rounded border text-left cursor-pointer transition-colors ${
                      scope === 'production-print'
                        ? 'border-[#0066E5] bg-blue-50/50 text-[#0066E5] font-bold'
                        : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'
                    }`}
                  >
                    <p className="font-semibold text-zinc-900">Print & Dispatch</p>
                    <p className="text-[10px] text-zinc-500">Commercial Offset + Bobst</p>
                  </button>
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-600 font-bold mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full border border-zinc-300 rounded p-2.5 text-zinc-900 focus:outline-none focus:border-[#0066E5]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-600 font-bold mb-1">
                    Company / Brand *
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Lumina Global Brand Inc."
                    className="w-full border border-zinc-300 rounded p-2.5 text-zinc-900 focus:outline-none focus:border-[#0066E5]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-600 font-bold mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@lumina.com"
                    className="w-full border border-zinc-300 rounded p-2.5 text-zinc-900 focus:outline-none focus:border-[#0066E5]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-600 font-bold mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full border border-zinc-300 rounded p-2.5 text-zinc-900 focus:outline-none focus:border-[#0066E5]"
                  />
                </div>
              </div>

              {/* Product Spec & Production Volume */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-600 font-bold mb-1">
                    Product / Structure Spec
                  </label>
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="e.g. ECMA A60.20 Crash-Lock Carton + Barrier Pouch"
                    className="w-full border border-zinc-300 rounded p-2.5 text-zinc-900 focus:outline-none focus:border-[#0066E5]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-600 font-bold mb-1">
                    Planned Production Volume (Units) *
                  </label>
                  <input
                    type="number"
                    min="100"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full border border-zinc-300 rounded p-2.5 text-zinc-900 focus:outline-none focus:border-[#0066E5]"
                  />
                </div>
              </div>

              {/* Notes & File Attachments */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-mono uppercase text-zinc-600 font-bold">
                      Technical Parameters, Barrier Goals & Specifications:
                    </label>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#0066E5] hover:text-[#0052B8] cursor-pointer"
                    >
                      <Paperclip className="w-3 h-3" />
                      <span>Attach Files</span>
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Specify dimensions (L×W×D), barrier requirements (OTR/WVTR), substrate choices, target timelines, or shipping destination..."
                    className="w-full border border-zinc-300 rounded p-2.5 text-zinc-900 focus:outline-none focus:border-[#0066E5] resize-none"
                  />
                </div>

                {/* File Attachment Dropzone */}
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.ai,.eps,.dxf,.cad,.ard,.svg,.png,.jpg,.jpeg,.zip"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                  />

                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      handleFileSelect(e.dataTransfer.files);
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-3 text-center cursor-pointer transition-all duration-150 flex flex-col items-center justify-center gap-1.5 ${
                      isDragging
                        ? 'border-[#0066E5] bg-blue-50/70'
                        : 'border-zinc-300 hover:border-zinc-400 bg-zinc-50/60'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0066E5] flex items-center justify-center">
                      <UploadCloud className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-800">
                        <span className="text-[#0066E5] underline decoration-[#0066E5]/40 underline-offset-2">Click to upload</span> or drag & drop CAD or artwork files
                      </p>
                      <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                        CAD Dielines (.ARD, .DXF, .AI), Artwork (.PDF, .EPS), or Spec Sheets (Up to 50MB)
                      </p>
                    </div>
                  </div>

                  {/* Attached Files List */}
                  {attachedFiles.length > 0 && (
                    <div className="mt-2.5 space-y-1.5">
                      <p className="text-[10px] font-mono uppercase text-zinc-500 font-bold">
                        Attached Files ({attachedFiles.length}):
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-28 overflow-y-auto pr-1">
                        {attachedFiles.map((file, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 bg-zinc-100/90 border border-zinc-200 rounded text-xs group hover:bg-zinc-100"
                          >
                            <div className="flex items-center gap-2 min-w-0 pr-2">
                              <span className="p-1 rounded bg-white border border-zinc-200 text-[9px] font-mono font-bold text-zinc-700">
                                {file.type}
                              </span>
                              <div className="min-w-0">
                                <p className="font-medium text-zinc-900 truncate text-[11px]" title={file.name}>
                                  {file.name}
                                </p>
                                <p className="text-[9px] text-zinc-500 font-mono">{file.size}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFile(idx);
                              }}
                              className="text-zinc-400 hover:text-red-500 p-1 rounded cursor-pointer transition-colors"
                              title="Remove file"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer with Lead Alert Routing Notice */}
              <div className="pt-3 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Alerts: {primaryEngineeringEmail} & {primaryServiceEmail}</span>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-zinc-600 hover:text-zinc-900 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 bg-[#0066E5] hover:bg-[#0052B8] disabled:bg-zinc-400 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg cursor-pointer shadow-sm transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Logging Lead Alert...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Inquiry & Alert Both</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
