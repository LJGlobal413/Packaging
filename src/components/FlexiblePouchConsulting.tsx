import React, { useState } from 'react';
import {
  Package,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Leaf,
  Activity,
  Sliders,
  Send,
  Info,
} from 'lucide-react';
import {
  FLEXIBLE_LAMINATE_PRESETS,
  FLEXIBLE_POUCH_IMAGE,
} from '../data/printingData';
import { FlexiblePouchRecommendation } from '../types';

interface FlexiblePouchConsultingProps {
  onOpenConsultingModal: (specSummary: string) => void;
}

export const FlexiblePouchConsulting: React.FC<FlexiblePouchConsultingProps> = ({
  onOpenConsultingModal,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    FLEXIBLE_LAMINATE_PRESETS[0].id
  );

  const activePreset: FlexiblePouchRecommendation =
    FLEXIBLE_LAMINATE_PRESETS.find((p) => p.id === selectedPresetId) ||
    FLEXIBLE_LAMINATE_PRESETS[0];

  // Custom simulation sliders
  const [desiredShelfLifeMonths, setDesiredShelfLifeMonths] = useState<number>(18);
  const [targetPackWeightGrams, setTargetPackWeightGrams] = useState<number>(250);

  return (
    <section
      id="primary-packaging"
      className="py-20 bg-white text-zinc-900 border-b border-zinc-200 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span className="text-[#0066E5] font-semibold">Primary Packaging Advisory</span>
            <span aria-hidden="true">·</span>
            <span>Flexible Pouches</span>
            <span aria-hidden="true">·</span>
            <span>Freshness & Barrier Protection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 uppercase tracking-tight">
            Flexible Pouches & <span className="text-[#0066E5]">Barrier Packaging Consulting.</span>
          </h2>
          <p className="text-base text-zinc-600 leading-relaxed">
            Protect food, beverage, and chemical products with custom airtight pouches. We formulate multi-layer packaging
            films that lock in freshness, block moisture and oxygen, and run smoothly on automated packaging machines.
          </p>
        </div>

        {/* Preset Selector Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {FLEXIBLE_LAMINATE_PRESETS.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all min-w-[220px] sm:min-w-[260px] shrink-0 ${
                  isSelected
                    ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                    : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider opacity-75">
                    {preset.pouchType}
                  </span>
                  {preset.id.includes('recyclable') && (
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">
                      Eco Mono-PE
                    </span>
                  )}
                </div>
                <p className="text-xs font-bold truncate mt-1">
                  {preset.name}
                </p>
                <p className="text-[11px] opacity-70 truncate mt-0.5">
                  {preset.targetProductCategory.split('(')[0]}
                </p>
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Consulting Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 cols): Visual Asset & Barrier Chemistry */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-zinc-200 rounded-xl overflow-hidden bg-zinc-100 shadow-sm relative group">
              <img
                src={FLEXIBLE_POUCH_IMAGE}
                alt="Indian packaging quality engineer inspecting barrier pouch laminate structure in lab"
                className="w-full h-64 sm:h-72 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[11px] font-mono text-[#00AEEF] uppercase font-bold tracking-wider">
                  {activePreset.pouchType}
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  {activePreset.name}
                </h3>
                <p className="text-xs text-zinc-300 font-mono mt-1">
                  High Barrier Protection · {activePreset.recommendedClosure}
                </p>
              </div>
            </div>

            {/* Shelf-Life & Weight Calculator Controls */}
            <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-700">
                  Target Product Parameters
                </span>
                <span className="text-[11px] font-mono text-zinc-500">Barrier Modeler</span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-600 mb-1">
                  <span>Target Shelf Life:</span>
                  <strong className="text-zinc-900">{desiredShelfLifeMonths} Months</strong>
                </div>
                <input
                  type="range"
                  min="3"
                  max="24"
                  step="3"
                  value={desiredShelfLifeMonths}
                  onChange={(e) => setDesiredShelfLifeMonths(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 rounded appearance-none cursor-pointer accent-[#0066E5]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-600 mb-1">
                  <span>Net Content Weight:</span>
                  <strong className="text-zinc-900">{targetPackWeightGrams} g</strong>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="50"
                  value={targetPackWeightGrams}
                  onChange={(e) => setTargetPackWeightGrams(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 rounded appearance-none cursor-pointer accent-[#0066E5]"
                />
              </div>

              <div className="p-3 bg-white rounded border border-zinc-200 text-xs text-zinc-600 space-y-1">
                <p>
                  <strong className="text-zinc-900">Seal Initiation Temp:</strong>{' '}
                  <span className="font-mono text-[#0066E5] font-semibold">{activePreset.barrierPerformance.sealInitiationTemp}</span>
                </p>
                <p>
                  <strong className="text-zinc-900">Light Shielding:</strong>{' '}
                  <span className="font-mono">{activePreset.barrierPerformance.lightShield}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Layer-by-Layer Micro-Structure & Advice */}
          <div className="lg:col-span-7 bg-zinc-50 border border-zinc-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#0066E5] uppercase font-bold tracking-wider">
                  Engineered Cross-Section (Film Gauge Breakdown)
                </span>
                <h3 className="text-xl font-bold text-zinc-950 tracking-tight mt-0.5">
                  Multi-Layer Barrier Laminate Structure
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-semibold">
                {activePreset.sustainabilityStatus.split('(')[0]}
              </span>
            </div>

            {/* Layer-by-Layer Visual Diagram */}
            <div className="space-y-2.5">
              <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Layer Breakdown (Outer Face → Inner Sealant Face):
              </p>
              {activePreset.laminateStructure.map((layer) => (
                <div
                  key={layer.layerOrder}
                  className="p-3.5 bg-white rounded-lg border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:border-zinc-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-zinc-900 text-white font-mono text-xs flex items-center justify-center font-bold shrink-0">
                      L{layer.layerOrder}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-zinc-950 font-mono">
                        {layer.material}
                      </p>
                      <p className="text-[11px] text-zinc-500">
                        {layer.functionalRole}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0066E5] sm:text-right shrink-0 bg-blue-50 px-2.5 py-1 rounded">
                    {layer.thicknessMicron} µm
                  </span>
                </div>
              ))}
            </div>

            {/* Barrier Telemetry Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-white rounded-lg border border-zinc-200">
                <p className="text-[10px] font-mono uppercase text-zinc-500 font-bold">
                  Oxygen Protection
                </p>
                <p className="text-sm font-bold font-mono text-blue-600 mt-0.5">
                  Airtight Freshness Lock
                </p>
                <p className="text-[10px] text-zinc-500 mt-0.5">Protects flavors, aroma & taste</p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-zinc-200">
                <p className="text-[10px] font-mono uppercase text-zinc-500 font-bold">
                  Moisture Protection
                </p>
                <p className="text-sm font-bold font-mono text-emerald-600 mt-0.5">
                  Maximum Dryness Shield
                </p>
                <p className="text-[10px] text-zinc-500 mt-0.5">Prevents humidity, sogginess & caking</p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-zinc-200">
                <p className="text-[10px] font-mono uppercase text-zinc-500 font-bold">
                  Puncture Strength
                </p>
                <p className="text-sm font-bold font-mono text-purple-600 mt-0.5">
                  Heavy-Duty Tear Resistant
                </p>
                <p className="text-[10px] text-zinc-500 mt-0.5">Durable multi-layer film</p>
              </div>
            </div>

            {/* Consulting Engineer's Rationale */}
            <div className="p-4 bg-blue-50/60 border border-blue-200/80 rounded-lg space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#0066E5] font-bold uppercase tracking-wider">
                <Info className="w-4 h-4" />
                <span>Consultant's Barrier Rationale:</span>
              </div>
              <p className="text-xs text-zinc-700 leading-relaxed font-sans">
                {activePreset.consultingNotes}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200">
              <span className="text-xs font-mono text-zinc-500">
                Custom rollstock or pre-formed pouches available
              </span>
              <button
                onClick={() =>
                  onOpenConsultingModal(
                    `Primary Pouch Spec: ${activePreset.name} (${activePreset.totalThicknessMicron}µm, OTR: ${activePreset.barrierPerformance.otr}, Target: ${desiredShelfLifeMonths} mos)`
                  )
                }
                className="w-full sm:w-auto px-5 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Request Pouch Barrier Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
