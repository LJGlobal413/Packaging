import React, { useState } from 'react';
import {
  Layers,
  Shield,
  QrCode,
  Sparkles,
  Leaf,
  CheckCircle2,
  AlertCircle,
  Activity,
  Box,
} from 'lucide-react';
import { PACKAGING_MATERIALS, FINISHING_EFFECTS } from '../data/printingData';
import { PackagingQrGenerator } from './PackagingQrGenerator';

export const FinishingVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'materials' | 'finishing' | 'qr'>('materials');
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>(PACKAGING_MATERIALS[0].id);

  // Drop Test Simulation State (Low, Standard, High)
  const [simulatedDropLevel, setSimulatedDropLevel] = useState<'standard' | 'high' | 'extreme'>('standard');

  const activeMaterial =
    PACKAGING_MATERIALS.find((m) => m.id === selectedMaterialId) ||
    PACKAGING_MATERIALS[0];

  const getDropSafety = () => {
    if (simulatedDropLevel === 'standard') {
      return {
        levelLabel: 'Standard Handling (Waist Height)',
        rating: 'Full Protection',
        ratingColor: 'text-emerald-400',
        detail: 'Cushions fragile items safely through standard delivery handling.',
      };
    } else if (simulatedDropLevel === 'high') {
      return {
        levelLabel: 'Rough Transit (Shoulder Height)',
        rating: 'High Cushioning',
        ratingColor: 'text-[#00AEEF]',
        detail: 'Absorbs heavy parcel impacts with zero damage to contents.',
      };
    } else {
      return {
        levelLabel: 'Extreme Stacking & Drop (Pallet Height)',
        rating: 'Heavy-Duty Reinforced',
        ratingColor: 'text-purple-400',
        detail: 'Reinforced fiber flutes resist high impacts and heavy loads.',
      };
    }
  };

  const dropSafety = getDropSafety();

  return (
    <section
      id="materials"
      className="py-20 bg-zinc-900 text-zinc-100 border-b border-zinc-800 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="text-[#00AEEF] font-semibold">Substrate & Material Science</span>
            <span aria-hidden="true">·</span>
            <span>ASTM Shock Attenuation</span>
            <span aria-hidden="true">·</span>
            <span>Smart Packaging Codes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Materials, Cushioning & Finishing Lab.
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            Test flute profiles, simulate kinetic drop deceleration curves, inspect luxury embellishment dies, and
            generate printable vector compliance QR codes for consumer packaging.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <button
            onClick={() => setActiveTab('materials')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer ${
              activeTab === 'materials'
                ? 'bg-[#0066E5] text-white'
                : 'text-zinc-400 hover:text-white bg-zinc-950/60'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>1. Substrates & Flute Profiles</span>
          </button>

          <button
            onClick={() => setActiveTab('finishing')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer ${
              activeTab === 'finishing'
                ? 'bg-[#0066E5] text-white'
                : 'text-zinc-400 hover:text-white bg-zinc-950/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>2. Tactile Die Finishing</span>
          </button>

          <button
            onClick={() => setActiveTab('qr')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer ${
              activeTab === 'qr'
                ? 'bg-[#0066E5] text-white'
                : 'text-zinc-400 hover:text-white bg-zinc-950/60'
            }`}
          >
            <QrCode className="w-3.5 h-3.5 text-emerald-400" />
            <span>3. Smart QR & Recycling Codes</span>
          </button>
        </div>

        {/* Tab 1: Materials & Cushioning Lab */}
        {activeTab === 'materials' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Material Selection (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                Select Packaging Substrate:
              </p>
              {PACKAGING_MATERIALS.map((mat) => {
                const isSelected = selectedMaterialId === mat.id;
                return (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMaterialId(mat.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-zinc-800 border-[#0066E5] shadow-md'
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-white uppercase">
                        {mat.name}
                      </span>
                      <span className="text-[11px] font-mono text-[#00AEEF] bg-blue-950/60 px-2 py-0.5 rounded">
                        {mat.caliperMm}mm Caliper
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                      {mat.description}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-500 mt-2">
                      <span>{mat.strengthRating}</span>
                      <span>·</span>
                      <span className="text-emerald-400">{mat.sustainabilityRating}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Substrate Inspection & Drop Simulator (7 cols) */}
            <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-lg p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Substrate Micro-Structure & Drop Cushioning
                  </h3>
                  <p className="text-xs text-zinc-500">
                    {activeMaterial.name} ({activeMaterial.materialType})
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-400 px-2 py-1 bg-emerald-950/40 border border-emerald-800/60 rounded">
                  FSC & RoHS Tested
                </span>
              </div>

              {/* Substrate Structural Cross-Section Graphic */}
              <div className="h-44 bg-zinc-900 border border-zinc-800 rounded-md p-4 flex flex-col justify-between relative overflow-hidden">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  Cross-Section Flute Geometry (Scale 4:1)
                </p>

                {/* Animated Cross Section SVG */}
                <div className="w-full flex items-center justify-center py-2">
                  <svg viewBox="0 0 400 60" className="w-full h-16">
                    {/* Top Liner Paper */}
                    <rect x="0" y="5" width="400" height="6" fill="#71717a" rx="1" />
                    {/* Fluting Sine Wave or Solid Density */}
                    {activeMaterial.materialType === 'Corrugated Flute' ? (
                      <path
                        d="M 0,35 Q 15,10 30,35 T 60,35 T 90,35 T 120,35 T 150,35 T 180,35 T 210,35 T 240,35 T 270,35 T 300,35 T 330,35 T 360,35 T 390,35"
                        fill="none"
                        stroke="#00AEEF"
                        strokeWidth="3.5"
                      />
                    ) : activeMaterial.materialType === 'Rigid Greyboard' ? (
                      <rect x="0" y="11" width="400" height="38" fill="#3f3f46" />
                    ) : (
                      <g>
                        <rect x="0" y="11" width="400" height="38" fill="#14b8a6" opacity="0.3" />
                        <line x1="0" y1="30" x2="400" y2="30" stroke="#14b8a6" strokeWidth="2" strokeDasharray="6 4" />
                      </g>
                    )}
                    {/* Bottom Liner Paper */}
                    <rect x="0" y="49" width="400" height="6" fill="#71717a" rx="1" />
                  </svg>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Caliper: {activeMaterial.caliperMm} mm</span>
                  <span>{activeMaterial.strengthRating}</span>
                  <span className="text-emerald-400">100% Recyclable</span>
                </div>
              </div>

              {/* Simple Impact & Drop Protection Simulator */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-md p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#00AEEF]" />
                    <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                      Drop & Impact Protection Test
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">
                    Intensity: <strong className="text-white capitalize">{simulatedDropLevel}</strong>
                  </span>
                </div>

                {/* Drop Intensity Selector Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  {(['standard', 'high', 'extreme'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSimulatedDropLevel(level)}
                      className={`py-2 px-3 rounded text-xs font-mono font-bold capitalize transition-colors cursor-pointer border ${
                        simulatedDropLevel === level
                          ? 'bg-[#0066E5] text-white border-[#0066E5]'
                          : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      {level} Drop
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3 bg-zinc-950 rounded border border-zinc-800">
                    <p className="text-[10px] font-mono text-zinc-500 uppercase">
                      Cushion Performance
                    </p>
                    <p className={`text-base font-bold font-mono mt-0.5 ${dropSafety.ratingColor}`}>
                      {dropSafety.rating}
                    </p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">{dropSafety.detail}</p>
                  </div>

                  <div className="p-3 bg-zinc-950 rounded border border-zinc-800">
                    <p className="text-[10px] font-mono text-zinc-500 uppercase">
                      Protection Status
                    </p>
                    <p className="text-sm font-bold font-mono text-emerald-400 mt-1">
                      ✓ Fragile Items Safe
                    </p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Survives parcel drops without damage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Tactile Die Finishing */}
        {activeTab === 'finishing' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FINISHING_EFFECTS.map((effect) => (
              <div
                key={effect.id}
                className="bg-zinc-950 border border-zinc-800 rounded-lg p-5 space-y-4 hover:border-zinc-700 transition-colors flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white uppercase">
                      {effect.name}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                      {effect.priceImpact}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {effect.detailDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800 text-[11px] text-zinc-500 font-mono">
                  <span className="text-zinc-400 font-semibold">Recommended for:</span> {effect.bestUsedOn}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Packaging QR Code Generator */}
        {activeTab === 'qr' && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
            <PackagingQrGenerator />
          </div>
        )}
      </div>
    </section>
  );
};
