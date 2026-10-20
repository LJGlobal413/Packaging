import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Compass,
  Layers,
  Box,
  Truck,
  Package,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';
import {
  CONSULTING_HERO_IMAGE,
} from '../data/printingData';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenQuoteModal }) => {
  return (
    <section
      id="top"
      className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 bg-white text-zinc-900 border-b border-zinc-200 overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (7 cols): Consulting Positioning Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category Navigation Pills */}
            <div className="w-full flex items-center justify-between gap-1 sm:gap-1.5 text-xs font-mono text-zinc-500 pb-1">
              <button
                type="button"
                onClick={() => onNavigate('cleaning-bottles')}
                className="flex-1 min-w-0 font-bold text-slate-800 hover:text-[#0066E5] bg-slate-100 hover:bg-blue-50 border border-slate-300 hover:border-blue-300 px-1 py-1 rounded text-[9px] sm:text-[10px] uppercase tracking-tight sm:tracking-wider transition-all cursor-pointer shadow-2xs inline-flex items-center justify-center active:scale-[0.98] whitespace-nowrap text-center"
                title="Household Cleaning & Chemical Packaging Development"
              >
                Household
              </button>
              <button
                type="button"
                onClick={() => onNavigate('primary-packaging')}
                className="flex-1 min-w-0 font-bold text-slate-800 hover:text-[#0066E5] bg-slate-100 hover:bg-blue-50 border border-slate-300 hover:border-blue-300 px-1 py-1 rounded text-[9px] sm:text-[10px] uppercase tracking-tight sm:tracking-wider transition-all cursor-pointer shadow-2xs inline-flex items-center justify-center active:scale-[0.98] whitespace-nowrap text-center"
                title="Food & Beverage Pouch & Barrier Solutions"
              >
                Food & Bev
              </button>
              <button
                type="button"
                onClick={() => onNavigate('case-studies')}
                className="flex-1 min-w-0 font-bold text-slate-800 hover:text-[#0066E5] bg-slate-100 hover:bg-blue-50 border border-slate-300 hover:border-blue-300 px-1 py-1 rounded text-[9px] sm:text-[10px] uppercase tracking-tight sm:tracking-wider transition-all cursor-pointer shadow-2xs inline-flex items-center justify-center active:scale-[0.98] whitespace-nowrap text-center"
                title="Medicine & Pharmaceutical Secondary Packaging"
              >
                Pharma
              </button>
              <button
                type="button"
                onClick={() => onNavigate('materials')}
                className="flex-1 min-w-0 font-bold text-slate-800 hover:text-[#0066E5] bg-slate-100 hover:bg-blue-50 border border-slate-300 hover:border-blue-300 px-1 py-1 rounded text-[9px] sm:text-[10px] uppercase tracking-tight sm:tracking-wider transition-all cursor-pointer shadow-2xs inline-flex items-center justify-center active:scale-[0.98] whitespace-nowrap text-center"
                title="Packaging Material Selection & Substrates Lab"
              >
                Materials
              </button>
              <button
                type="button"
                onClick={() => onNavigate('print-mis')}
                className="flex-1 min-w-0 font-bold text-[#0066E5] hover:text-white bg-blue-50 hover:bg-[#0066E5] border border-blue-200 hover:border-[#0066E5] px-1 py-1 rounded text-[9px] sm:text-[10px] uppercase tracking-tight sm:tracking-wider transition-all cursor-pointer shadow-2xs inline-flex items-center justify-center active:scale-[0.98] whitespace-nowrap text-center"
                title="Print MIS Support, Workflow Automation & Shopfloor Data"
              >
                Print MIS
              </button>
            </div>

            {/* Primary Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-zinc-950 tracking-tight uppercase leading-[1.08]">
              Packaging Consulting, <br />
              Structural Development & <br />
              <span className="text-[#0066E5]">Print MIS Solutions.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl font-sans">
              Specialized packaging development across household cleaning, food & beverage, and medicine: surfactant-proof chemical containers & refill pouches, FDA-compliant food barrier mono cartons, and tamper-evident pharmaceutical secondary packaging.
            </p>

            {/* Consulting Scope Quick Pills (Zero-Pill Anti-Slop Compliant, quiet structured list) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-zinc-950 font-mono">
                  <Package className="w-3.5 h-3.5 text-blue-600" />
                  <span>Household Cleaning</span>
                </div>
                <p className="text-[11px] text-zinc-500">
                  Surfactant-resistant barrier pouches, spouts, trigger bottles & child-resistant seals
                </p>
              </div>

              <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-zinc-950 font-mono">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Food & Beverage</span>
                </div>
                <p className="text-[11px] text-zinc-500">
                  FDA food mono cartons, vacuum pouches, OTR/WVTR barrier films & nested dies
                </p>
              </div>

              <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-zinc-950 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                  <span>Medicine & Pharma</span>
                </div>
                <p className="text-[11px] text-zinc-500">
                  Tamper-evident cartons, blister lidding, serialization & secondary shippers
                </p>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('cad-lab')}
                className="px-6 py-3.5 bg-[#0066E5] hover:bg-[#0052B8] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center gap-2 shadow-sm hover:shadow active:scale-[0.98]"
              >
                <Box className="w-4 h-4 text-blue-200" />
                <span>Cleaning, Food & Medicine Mono Cartons CAD</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('primary-packaging')}
                className="px-5 py-3.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold text-xs uppercase tracking-wider rounded-lg border border-zinc-200 transition-colors cursor-pointer flex items-center gap-2 shadow-2xs"
              >
                <Package className="w-4 h-4 text-zinc-600" />
                <span>Chemical, Food & Pharma Pouch Specs</span>
              </button>

              <button
                onClick={() => onOpenQuoteModal('Household Cleaning, Food & Medicine Packaging Development Audit')}
                className="px-5 py-3.5 text-zinc-700 hover:text-zinc-950 font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <FileCheck className="w-4 h-4 text-[#0066E5]" />
                <span>Multi-Sector Package Audit</span>
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): Consulting Showcase Visual Card */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden shadow-lg p-2 relative h-full flex flex-col justify-center">
              <div className="relative rounded-lg overflow-hidden h-80 sm:h-96 lg:h-[480px] bg-zinc-100">
                <img
                  src={CONSULTING_HERO_IMAGE}
                  alt="Packaging engineering team collaborating on barrier pouches, mono cartons, and CAD dielines"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/40 to-transparent flex flex-col justify-end p-6 text-white backdrop-blur-[0.5px] transition-all">
                  <span className="text-xs font-mono text-[#00AEEF] uppercase font-bold tracking-wider inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF] animate-pulse" />
                    Packaging Engineering Consultation Desk
                  </span>
                  <h2 className="text-lg font-bold text-white mt-1">
                    Multi-Tier Packaging Systems Architecture
                  </h2>
                  <p className="text-xs text-zinc-300 font-mono mt-1">
                    CAD & Prototyping Bay · FMCG and Pharma Advisory
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
