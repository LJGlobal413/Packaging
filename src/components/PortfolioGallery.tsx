import React, { useState } from 'react';
import { Box, Layers, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { STRUCTURAL_CASE_STUDIES } from '../data/printingData';
import { StructuralCaseStudy } from '../types';

interface PortfolioGalleryProps {
  onQuoteSimilarSpec: (item: any) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  onQuoteSimilarSpec,
}) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const activeCase = STRUCTURAL_CASE_STUDIES[activeCaseIndex];

  return (
    <section id="case-studies" className="py-20 bg-white text-zinc-900 border-b border-zinc-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span className="text-[#0066E5] font-semibold">Engineered Case Studies</span>
            <span aria-hidden="true">·</span>
            <span>ISTA 3A Validated</span>
            <span aria-hidden="true">·</span>
            <span>Damage Rate &lt; 0.05%</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 uppercase tracking-tight">
            Proven Structural Deployments.
          </h2>
          <p className="text-base text-zinc-600 leading-relaxed">
            Real packaging engineering challenges solved with custom CAD geometry, sustainable fiber cushioning,
            and rigorous drop testing.
          </p>
        </div>

        {/* Case Study Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {STRUCTURAL_CASE_STUDIES.map((study, idx) => (
            <button
              key={study.id}
              onClick={() => setActiveCaseIndex(idx)}
              className={`text-left p-3.5 rounded-lg border transition-all cursor-pointer min-w-[240px] sm:min-w-[280px] shrink-0 ${
                activeCaseIndex === idx
                  ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm'
                  : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-zinc-300'
              }`}
            >
              <p className="text-[10px] font-mono uppercase tracking-wider opacity-75">
                {study.industry}
              </p>
              <p className="text-xs font-bold truncate mt-0.5">
                {study.title}
              </p>
              <p className="text-[10px] font-mono mt-1 opacity-60">
                {study.standardCode}
              </p>
            </button>
          ))}
        </div>

        {/* Featured Case Study Detail Card */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm">
          {/* Left Media (5 cols) */}
          <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-full bg-zinc-200 min-h-[300px]">
            <img
              src={activeCase.imageUrl}
              alt={activeCase.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-xs text-white text-xs font-mono px-3 py-1 rounded">
              {activeCase.standardCode}
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xs p-3 rounded border border-zinc-200 text-xs font-mono text-zinc-700">
              <span className="font-bold text-zinc-900">Dimensions:</span> {activeCase.specs.dimensions}
            </div>
          </div>

          {/* Right Case Analysis (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                <span>{activeCase.industry}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-[#0066E5]">{activeCase.structuralType}</span>
              </div>

              <h3 className="text-2xl font-bold text-zinc-950 tracking-tight">
                {activeCase.title}
              </h3>

              <div className="space-y-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                <p>
                  <strong className="text-zinc-900 font-semibold">Engineering Challenge:</strong> {activeCase.challenge}
                </p>
                <p>
                  <strong className="text-zinc-900 font-semibold">Structural Solution:</strong> {activeCase.solution}
                </p>
              </div>

              {/* Quantified Impact Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-200 text-xs">
                <div className="p-3 bg-white rounded border border-zinc-200">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">
                    Transit Drop Testing
                  </p>
                  <p className="font-bold text-zinc-900 font-mono mt-0.5 text-emerald-600">
                    {activeCase.metrics.dropProtection}
                  </p>
                </div>

                <div className="p-3 bg-white rounded border border-zinc-200">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">
                    Damage Rate Result
                  </p>
                  <p className="font-bold text-zinc-900 font-mono mt-0.5 text-blue-600">
                    {activeCase.metrics.damageRate}
                  </p>
                </div>

                <div className="p-3 bg-white rounded border border-zinc-200">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">
                    Packout Speed
                  </p>
                  <p className="font-bold text-zinc-900 font-mono mt-0.5">
                    {activeCase.metrics.packoutTimeSaved}
                  </p>
                </div>

                <div className="p-3 bg-white rounded border border-zinc-200">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">
                    Volume Optimization
                  </p>
                  <p className="font-bold text-zinc-900 font-mono mt-0.5">
                    {activeCase.metrics.shippingVolumeReduced}
                  </p>
                </div>
              </div>

              {/* Structural Specification Tags */}
              <div className="p-3 bg-zinc-100 rounded text-xs font-mono text-zinc-700 space-y-1">
                <p>
                  <span className="text-zinc-500">Board Caliper:</span> {activeCase.specs.material}
                </p>
                <p>
                  <span className="text-zinc-500">Insert Cushion:</span> {activeCase.specs.insert}
                </p>
                <p>
                  <span className="text-zinc-500">Closure Haptics:</span> {activeCase.specs.closure}
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono text-zinc-500">
                Ready for rapid CNC sampling in 24-48 hours
              </span>

              <button
                onClick={() =>
                  onQuoteSimilarSpec({
                    category: activeCase.structuralType,
                    specs: {
                      paper: activeCase.specs.material,
                      color: 'Custom Brand Print / Unprinted',
                      finishing: [activeCase.specs.insert, activeCase.specs.closure],
                    },
                  })
                }
                className="flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded transition-colors cursor-pointer shadow-xs"
              >
                <span>Request Sample Based on This Spec</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
