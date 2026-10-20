import React, { useState, useRef } from 'react';
import { X, Send, Mail, CheckCircle2, Box, Layers, Package, Truck, Compass, Paperclip, FileText, Trash2, UploadCloud } from 'lucide-react';
import { COMPANY_PROFILE, CAD_DIELINE_PRESETS, PACKAGING_MATERIALS } from '../data/printingData';

interface RfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSpec?: {
    category?: string;
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
  const [quantity, setQuantity] = useState(initialSpec?.quantity || 3000);
  const [notes, setNotes] = useState(
    initialSpec
      ? `Consulting & Production Parameters:\n- Material Stock: ${initialSpec.paperStock || '350gsm C1S SBS'}\n- Print / Coating: ${initialSpec.colorMode || '4C Offset + Soft-Touch'}\n- Layout & Specs: ${(initialSpec.finishes || []).join(' | ')}\n- Estimated Budget: ${initialSpec.totalEstimate || 'Pending'}\n- Target Timeline: ${initialSpec.leadTime || '6-10 Days Print & Dispatch'}`
      : ''
  );
  const [attachedFiles, setAttachedFiles] = useState<AttachedFileInfo[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateMailtoUrl = () => {
    const scopeLabel =
      scope === 'full-system'
        ? 'Full System Packaging Audit (Primary + Secondary + Tertiary)'
        : scope === 'folding-carton-die'
        ? 'Folding Carton Design & Step-and-Repeat Die Layout'
        : scope === 'flexible-laminate'
        ? 'Flexible Pouch Laminate Structure & Barrier Chemistry'
        : 'Full-Scale Folding Carton Printing & Global Container Dispatch';

    const filesText =
      attachedFiles.length > 0
        ? `\n\nAttached Dielines / Artwork / CAD Files (${attachedFiles.length}):\n` +
          attachedFiles.map((f, idx) => `  ${idx + 1}. ${f.name} (${f.size})`).join('\n') +
          `\n*(Please attach these files directly to this email before sending)*`
        : '';

    const subject = encodeURIComponent(
      `Packaging Consulting & Production RFQ: [${scopeLabel}] - ${quantity} units (${company || fullName})`
    );
    const body = encodeURIComponent(
      `Hello LJ Packaging Consulting Group Team,\n\n` +
        `I would like to engage your consulting and production team with the following requirements:\n\n` +
        `• Contact Name: ${fullName}\n` +
        `• Company / Brand: ${company}\n` +
        `• Work Email: ${email}\n` +
        `• Phone / WhatsApp: ${phone}\n\n` +
        `• Consulting Scope: ${scopeLabel}\n` +
        `• Project / Product Title: ${projectTitle}\n` +
        `• Planned Production Volume: ${quantity} units\n\n` +
        `Technical Parameters & Project Brief:\n${notes}${filesText}\n\n` +
        `Please send your consulting feedback, CAD dieline layout proposal, and production printing & dispatch quotation.\n\nThank you,\n${fullName}`
    );
    return `mailto:${COMPANY_PROFILE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-zinc-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-zinc-950 text-white flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#0066E5] flex items-center justify-center text-white font-mono font-bold text-sm">
              LJ
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                Request Packaging Consulting & Production Dispatch
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                Primary Pouches · Secondary Cartons & Dies · Global Dispatch
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

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-zinc-950">
                Consulting Specification Logged!
              </h4>
              <p className="text-sm text-zinc-600 max-w-md mx-auto">
                Click below to dispatch your parameters directly to our senior packaging consultants and manufacturing
                leads at <strong className="text-zinc-950">{COMPANY_PROFILE.email}</strong>.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={generateMailtoUrl()}
                  className="w-full sm:w-auto px-6 py-3 bg-[#0066E5] hover:bg-[#0052B8] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Open in Mail Client</span>
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSendRequest} className="space-y-4 text-xs">
              {/* Consulting Practice Scope Selector */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-600 font-bold mb-1.5">
                  Select Consulting & Production Practice:
                </label>
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
                    placeholder="Lumina Organics / Studio"
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
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full border border-zinc-300 rounded p-2.5 text-zinc-900 focus:outline-none focus:border-[#0066E5]"
                  />
                </div>
              </div>

              {/* Box Format & Quantity */}
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
                    Planned Production Volume
                  </label>
                  <input
                    type="number"
                    min="100"
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
                      Product Details (Dimensions, Shelf-Life Goal, Barrier Needs, Shipping Destination)
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
                    placeholder="Specify product form (liquid, powder, solid), dimensions L×W×D, barrier sensitivity (oxygen/moisture), target shelf-life, printing finishes, and port destination..."
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
                        <span className="text-[#0066E5] underline decoration-[#0066E5]/40 underline-offset-2">Click to upload</span> or drag & drop packaging files
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

              {/* Footer */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-zinc-600 hover:text-zinc-900 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#0066E5] hover:bg-[#0052B8] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit to Consulting & Factory Team</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
