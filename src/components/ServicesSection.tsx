import React, { useState } from 'react';
import {
  Package,
  Layers,
  Box,
  Truck,
  ArrowRight,
  CheckCircle2,
  Sliders,
  ExternalLink,
  ShieldCheck,
  FileCheck,
  Printer,
} from 'lucide-react';
import {
  PACKAGING_HIERARCHY_SERVICES,
  STRUCTURAL_SOLUTIONS,
  COMPANY_PROFILE,
} from '../data/printingData';
import { StructuralCategory, PackagingHierarchyLevel } from '../types';

interface ServicesSectionProps {
  onSelectForQuote: (category: StructuralCategory) => void;
  onOpenRfqModal: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectForQuote,
  onOpenRfqModal,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  return (
    <section
      id="structures"
      className="py-20 bg-zinc-50 border-b border-zinc-200 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span className="font-semibold text-[#0066E5]">Consulting Practices</span>
            <span aria-hidden="true">·</span>
            <span>Primary, Secondary & Tertiary Systems</span>
            <span aria-hidden="true">·</span>
            <span>Full Factory Execution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 uppercase tracking-tight">
            Comprehensive Packaging <span className="text-[#0066E5] font-black tracking-tight underline decoration-[#0066E5]/40 underline-offset-4">Consulting & Engineering.</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
            We consult across every layer of your packaging ecosystem: direct-contact flexible pouches,
            precision folding carton die layouts, and corrugated palletized freight shippers—paired with
            commercial offset printing and dispatch.
          </p>
        </div>

        {/* 4 Pillars of Consulting Hierarchy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PACKAGING_HIERARCHY_SERVICES.map((srv, idx) => {
            return (
              <div
                key={srv.level}
                className="bg-white border border-zinc-200 rounded-xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow group"
              >
                <div>
                  {/* Card Header Image */}
                  <div className="relative h-44 overflow-hidden bg-zinc-100">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                      <span className="text-[10px] font-mono text-white uppercase font-bold tracking-wider bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                        Pillar 0{idx + 1} · {srv.level.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-bold text-zinc-950 tracking-tight leading-snug">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed font-sans line-clamp-3">
                      {srv.description}
                    </p>

                    {/* Deliverables Bullet List */}
                    <div className="space-y-1.5 pt-2 border-t border-zinc-100">
                      <p className="text-[10px] font-mono uppercase text-zinc-500 font-semibold tracking-wider">
                        Key Deliverables:
                      </p>
                      {srv.deliverables.slice(0, 3).map((del, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-1.5 text-[11px] text-zinc-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => {
                      if (srv.level === 'primary') {
                        const el = document.getElementById('primary-packaging');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      } else if (srv.level === 'secondary') {
                        onSelectForQuote('folding-carton');
                      } else if (srv.level === 'tertiary') {
                        onSelectForQuote('corrugated');
                      } else {
                        const el = document.getElementById('pipeline');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full py-2.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-900 border border-zinc-200 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Explore {srv.level} Solutions</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0066E5]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Consulting Deep Dive Spotlight: Secondary Folding Carton & Die Layout */}
        <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono text-[#0066E5] uppercase font-bold tracking-wider">
                Secondary Packaging Focus
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight uppercase">
                Folding Carton Design & Low-Waste Printing Layouts
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Poor box design causes cartons to tear, jam on automated packaging lines, or waste excess paperboard.
                Our packaging experts align paper grain to prevent cracks, reinforce corner folds, and interlock box shapes
                cleanly across the printing sheet to cut raw material costs.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-zinc-50 rounded border border-zinc-200">
                  <p className="text-[10px] font-mono uppercase text-zinc-500 font-bold">Grain Alignment</p>
                  <p className="text-sm font-bold text-zinc-950 font-mono mt-0.5">Smooth Clean Folds</p>
                  <p className="text-[10px] text-zinc-500">Zero corner cracks or tears</p>
                </div>
                <div className="p-3 bg-zinc-50 rounded border border-zinc-200">
                  <p className="text-[10px] font-mono uppercase text-zinc-500 font-bold">Paper Efficiency</p>
                  <p className="text-sm font-bold text-emerald-600 font-mono mt-0.5">Low-Waste Layout</p>
                  <p className="text-[10px] text-zinc-500">Cuts paperboard trim scrap</p>
                </div>
                <div className="p-3 bg-zinc-50 rounded border border-zinc-200 col-span-2 sm:col-span-1">
                  <p className="text-[10px] font-mono uppercase text-zinc-500 font-bold">Production Ready</p>
                  <p className="text-sm font-bold text-[#0066E5] font-mono mt-0.5">Automated Assembly</p>
                  <p className="text-[10px] text-zinc-500">Fast folding & gluing</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onSelectForQuote('folding-carton')}
                  className="px-5 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Launch Folding Carton CAD & Die Layout Lab</span>
                </button>
                <button
                  onClick={() => onOpenRfqModal('Folding Carton Die Layout & Print RFQ')}
                  className="px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  Request Dieline Feasibility Audit
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-zinc-950 p-6 rounded-lg text-white font-mono text-xs space-y-4 border border-zinc-800">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-[#00AEEF] font-bold">Die Layout Engineering Telemetry</span>
                <span className="text-zinc-500">ECMA Standards</span>
              </div>
              <div className="space-y-2 text-zinc-300">
                <div className="flex justify-between">
                  <span>Parent Press Sheet:</span>
                  <span className="text-white font-bold">720 × 1020 mm (B1)</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Gripper Margin:</span>
                  <span className="text-white font-bold">12 mm Lead Edge</span>
                </div>
                <div className="flex justify-between">
                  <span>Inter-Blank Gutter:</span>
                  <span className="text-white font-bold">3 - 4 mm Double Knife</span>
                </div>
                <div className="flex justify-between">
                  <span>Folder-Gluer Infeed:</span>
                  <span className="text-emerald-400 font-bold">35,000 cartons / hr</span>
                </div>
                <div className="flex justify-between">
                  <span>Laser Dieboard Tol:</span>
                  <span className="text-[#00AEEF] font-bold">± 0.05 mm Pertinax</span>
                </div>
              </div>
              <div className="p-3 bg-zinc-900 rounded border border-zinc-800 text-[11px] text-zinc-400 font-sans">
                "Our CAD engineering eliminates trial-and-error tooling charges by validating blank nesting and auto-erecting creases prior to cutting steel rule dies."
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
