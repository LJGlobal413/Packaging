import React, { useState } from 'react';
import {
  ShieldCheck,
  Compass,
  Box,
  Layers,
  ExternalLink,
  Mail,
  ChevronDown,
  ChevronUp,
  Cpu,
  CheckCircle2,
  Package,
  Truck,
} from 'lucide-react';
import { COMPANY_PROFILE } from '../data/printingData';

interface AboutAndLinkedInProps {
  onOpenRfqModal: () => void;
}

const CONSULTING_FAQS = [
  {
    category: 'Primary Packaging',
    question: 'How do you engineer laminate structures for flexible pouches based on product sensitivity?',
    answer:
      'We tailor the packaging film layers to protect your specific product. For items that spoil quickly with air or moisture (like ground coffee or powders), we combine airtight barrier shields that seal out humidity, oxygen, and UV light to lock in freshness. We also offer certified 100% recyclable single-material options that can be dropped off at store recycling bins.',
  },
  {
    category: 'Secondary Packaging',
    question: 'How do you design folding carton dielines to prevent cracked score lines and gluing jams?',
    answer:
      'We align the paperboard grain with your carton fold lines so edges fold smoothly without cracking, tearing, or looking worn. We also design clean adhesive tabs and pre-creased folds so your boxes pop open easily and run smoothly on automated assembly and packing machines.',
  },
  {
    category: 'Die Layouts & Yield',
    question: 'How does your step-and-repeat press die layout save money on mass production?',
    answer:
      'By nesting folding carton shapes tightly on the master printing sheet like a puzzle, we maximize usable paper and keep trim scrap to a minimum. This cuts raw material costs and passes direct paper savings on to your production run.',
  },
  {
    category: 'Tertiary & Logistics',
    question: 'How do you calculate master shipper strength and container palletization?',
    answer:
      'We test and reinforce our outer shipping cartons so they never buckle or crush during shipping, even in tall warehouse stacks or humid overseas shipping containers. We optimize the packing arrangement on pallets to eliminate empty space, reduce freight costs, and ensure zero transit damage.',
  },
  {
    category: 'Commercial Printing & Dispatch',
    question: 'Can you handle both consulting design and the physical printing & global dispatch?',
    answer:
      'Yes, we provide end-to-end execution. Once your design and color proofs are approved, our manufacturing facility handles high-speed printing, precision die-cutting, automated folding and gluing, and coordinates sea or air container delivery straight to your warehouse or distribution centers.',
  },
];

export const AboutAndLinkedIn: React.FC<AboutAndLinkedInProps> = ({
  onOpenRfqModal,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('All');

  const categories = ['All', 'Primary Packaging', 'Secondary Packaging', 'Die Layouts & Yield', 'Tertiary & Logistics', 'Commercial Printing & Dispatch'];

  const filteredFaqs =
    selectedFaqCategory === 'All'
      ? CONSULTING_FAQS
      : CONSULTING_FAQS.filter((f) => f.category === selectedFaqCategory);

  return (
    <section id="about" className="py-20 bg-white text-zinc-900 border-b border-zinc-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Top Profile Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left info column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <span className="text-[#0066E5] font-semibold">Consulting & Factory Hub</span>
              <span aria-hidden="true">·</span>
              <span>Automated Machine Bay</span>
              <span aria-hidden="true">·</span>
              <span>Global Container Logistics</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight uppercase">
              About <span className="text-[#0066E5]">{COMPANY_PROFILE.name}</span>
            </h2>

            <p className="text-base text-zinc-600 leading-relaxed">
              Operating at the intersection of packaging science and high-speed factory execution,{' '}
              <strong className="text-zinc-950 font-semibold">{COMPANY_PROFILE.name}</strong> advises international
              consumer brands on primary flexible pouch barrier chemistry, secondary folding carton CAD dielines & press
              die layouts, and tertiary palletized shipping—backed by high-precision offset lithography and international
              container export dispatch.
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {COMPANY_PROFILE.coreValues.map((val, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-50 p-4 border border-zinc-200 rounded-md space-y-1.5"
                >
                  <div className="flex items-center gap-2 text-zinc-950 font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{val.title}</span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={COMPANY_PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#0066E5] hover:bg-[#0052B8] text-white font-bold px-5 py-3 rounded text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
              >
                <span>CONNECT WITH US ON LINKEDIN</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${COMPANY_PROFILE.email}`}
                className="flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold px-5 py-3 rounded text-xs uppercase tracking-wider transition-colors cursor-pointer font-mono"
              >
                <Mail className="w-4 h-4 text-[#0066E5]" />
                <span>Email Engineering: {COMPANY_PROFILE.email}</span>
              </a>
            </div>
          </div>

          {/* Right Profile Showcase Card */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-50 border border-zinc-200 p-8 rounded-xl shadow-md space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-zinc-950 text-white rounded-lg flex items-center justify-center font-mono font-black text-xl shrink-0">
                  LJ
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-950 uppercase tracking-tight">
                    {COMPANY_PROFILE.name}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#0066E5]">
                    {COMPANY_PROFILE.division}
                  </p>
                </div>
              </div>

              {/* Lab Highlights */}
              <div className="space-y-2 pt-2 border-t border-zinc-200">
                <p className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                  Advisory & Execution Credentials:
                </p>
                {COMPANY_PROFILE.linkedinProfileHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onOpenRfqModal}
                className="w-full py-3 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer text-center shadow-xs"
              >
                Request Packaging System Audit
              </button>
            </div>
          </div>
        </div>

        {/* Consulting FAQ Section */}
        <div className="space-y-6 pt-10 border-t border-zinc-200">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#0066E5] font-semibold">
              Technical Packaging Advisory
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 uppercase tracking-tight">
              Frequently Asked Consulting Questions.
            </h3>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFaqCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap ${
                  selectedFaqCategory === cat
                    ? 'bg-zinc-950 text-white'
                    : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-zinc-200 rounded-lg overflow-hidden transition-colors bg-zinc-50"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-bold text-sm sm:text-base text-zinc-950">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-zinc-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-200 pt-3 font-sans">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
