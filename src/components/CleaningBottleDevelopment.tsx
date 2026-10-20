import React, { useState } from 'react';
import {
  Droplets,
  FlaskConical,
  Ruler,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  Maximize2,
} from 'lucide-react';
import {
  CLEANING_BOTTLE_CAD_IMAGE,
  CLEANING_BOTTLE_LAB_IMAGE,
  CLEANING_BOTTLE_LINEUP_IMAGE,
} from '../data/printingData';

interface CleaningBottleDevelopmentProps {
  onOpenRfqModalWithSpec?: (spec: any) => void;
}

export const CleaningBottleDevelopment: React.FC<CleaningBottleDevelopmentProps> = ({
  onOpenRfqModalWithSpec,
}) => {
  const [selectedPhase, setSelectedPhase] = useState<number>(0);

  const developmentPhases = [
    {
      id: 'cad-prototyping',
      phaseNumber: '01',
      title: '3D Design & Ergonomic Shape Development',
      subtitle: 'Comfortable grip shapes, leakproof neck threads & physical 3D-printed prototypes',
      image: CLEANING_BOTTLE_CAD_IMAGE,
      alt: '3D CAD wireframe modeling and 3D printed bottle prototypes on engineering workbench',
      badge: 'Design & Prototyping',
      keyHighlights: [
        'Comfortable ergonomic grip designed to balance bottle weight and reduce hand fatigue during cleaning',
        'Engineered bottom corners and parting lines to prevent thin spots and weak seams',
        'Rapid physical 3D-printed samples delivered quickly to test trigger sprayers and cap fit in your hands',
        'Consistent wall thickness designed for durable strength and smooth, effortless liquid dispensing',
      ],
      technicalSpecs: [
        { label: 'Bottle Capacity', value: 'Standard & Large Sizes Available' },
        { label: 'Neck Fit', value: 'Tight-Lock Anti-Loosening Thread' },
        { label: 'Tooling Method', value: 'Custom High-Precision Mold' },
        { label: 'Rapid Prototype', value: 'Full-Scale 3D Physical Models' },
      ],
    },
    {
      id: 'lab-validation',
      phaseNumber: '02',
      title: 'Leakproof & Drop Safety Testing',
      subtitle: 'Chemical stress-crack resistance, crush strength & rough parcel drop validation',
      image: CLEANING_BOTTLE_LAB_IMAGE,
      alt: 'Indian packaging engineer conducting leak integrity and drop tests on household cleaner bottles in testing lab',
      badge: 'Quality & Safety Testing',
      keyHighlights: [
        'Tested with concentrated cleaning detergents to ensure bottles never crack, leak, or split at the base',
        'Drop tested onto hard concrete floors from multiple angles to guarantee zero bursting during delivery',
        'Airtight vacuum tested so trigger sprayers and caps never leak during courier transit or air freight',
        'Heavy top-load crush tested so bottom bottles never buckle under tall warehouse stacks',
      ],
      technicalSpecs: [
        { label: 'Impact Durability', value: 'Survives Hard Multi-Angle Drops' },
        { label: 'Chemical Safety', value: 'Resists Detergents & Surfactants' },
        { label: 'Seal Integrity', value: '100% Leakproof Vacuum Verified' },
        { label: 'Stack Strength', value: 'Crush-Resistant Warehouse Ready' },
      ],
    },
    {
      id: 'commercial-lineup',
      phaseNumber: '03',
      title: 'Finished Bottles & Dispensing Systems',
      subtitle: 'Durable recycled plastics, smooth-action spray triggers & full-wrap waterproof labels',
      image: CLEANING_BOTTLE_LINEUP_IMAGE,
      alt: 'Showcase lineup of commercial household cleaning bottles with trigger sprayers, floor cleaner jugs, and squeeze bottles',
      badge: 'Production & Labeling',
      keyHighlights: [
        'Durable plastic containers with optional post-consumer recycled plastic to meet your sustainability goals',
        'Smooth compatibility with automated factory filling lines and high-speed capping equipment',
        'Full-wrap waterproof shrink sleeve labels that keep colors vivid and never peel from chemical spills',
        'Multi-function spray triggers offering fine mist, direct stream, and child-safe locking positions',
      ],
      technicalSpecs: [
        { label: 'Plastic Options', value: 'High-Density Polyethylene & Recycled Resin' },
        { label: 'Dispenser Types', value: 'Dual-Pattern Spray, Jet Stream, Push-Pull, Cap' },
        { label: 'Label Style', value: '360° Full-Body Waterproof Sleeves' },
        { label: 'Pallet Fit', value: 'Maximized Export Pallet Efficiency' },
      ],
    },
  ];

  const currentPhase = developmentPhases[selectedPhase];

  const handleInquireBottleSpec = () => {
    if (onOpenRfqModalWithSpec) {
      onOpenRfqModalWithSpec({
        title: 'Household Cleaning Bottle & Dispenser Package Development',
        category: 'Rigid Plastic Containers & Trigger Bottles',
        paperStock: 'HDPE / 30% PCR rHDPE + 45µm PETG Shrink Sleeve',
        colorMode: '8-Color Gravure Shrink Sleeve + Matte Varnish',
        finishes: [
          'Ergonomic Trigger Handle Cavity',
          'ASTM D2561 ESCR Stress Tested',
          'Ratchet Anti-Backing 28/400 Neck',
          'Leakproof Negative Pressure Vacuum Tested',
        ],
        totalEstimate: 'Custom Mold Tooling & High-Speed Blow Molding',
        unitPrice: 'Inquire by Volume',
        leadTime: '15-20 Days Tooling / 10-14 Days Mass Production',
      });
    }
  };

  return (
    <section id="cleaning-bottles" className="py-20 bg-zinc-900 text-white border-b border-zinc-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00AEEF]">
              <span className="w-2 h-2 rounded-full bg-[#00AEEF] animate-pulse" />
              <span className="uppercase tracking-widest font-bold">Rigid Plastic Development Case Study</span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-400">Home Care & Cleaning Chemicals</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Household Cleaning Bottle Package Development.
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed">
              Explore our turnkey rigid container engineering pipeline: from ergonomic 3D CAD blow-mold geometry
              and ESCR stress cracking prevention to ASTM laboratory validation and commercial multi-surface trigger lineups.
            </p>
          </div>

          <button
            type="button"
            onClick={handleInquireBottleSpec}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0066E5] hover:bg-[#0052B8] text-white text-xs font-bold font-mono uppercase tracking-wider rounded transition-all cursor-pointer shadow-md shrink-0 self-start md:self-auto"
          >
            <span>Inquire Bottle Tooling & Run</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Development Phases Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {developmentPhases.map((phase, idx) => (
            <button
              key={phase.id}
              type="button"
              onClick={() => setSelectedPhase(idx)}
              className={`text-left p-5 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                selectedPhase === idx
                  ? 'bg-zinc-800/90 border-[#0066E5] ring-1 ring-[#0066E5] shadow-lg'
                  : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-950'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    selectedPhase === idx
                      ? 'bg-[#0066E5] text-white'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    PHASE {phase.phaseNumber}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase">
                    {phase.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white leading-snug">
                  {phase.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2">
                  {phase.subtitle}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                <span className={selectedPhase === idx ? 'text-[#00AEEF]' : 'text-zinc-500'}>
                  {selectedPhase === idx ? 'Active View' : 'Click to inspect'}
                </span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                  selectedPhase === idx ? 'text-[#0066E5] translate-x-1' : 'text-zinc-600'
                }`} />
              </div>
            </button>
          ))}
        </div>

        {/* Detailed Showcase of Selected Phase */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual Image */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 group shadow-md aspect-16/10">
              <img
                src={currentPhase.image}
                alt={currentPhase.alt}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-black/75 backdrop-blur-sm border border-white/10 text-white font-mono text-xs font-semibold rounded-md shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00AEEF] animate-ping" />
                  Phase {currentPhase.phaseNumber}: {currentPhase.badge}
                </span>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 text-white">
                <p className="text-sm font-bold">{currentPhase.title}</p>
                <p className="text-xs text-zinc-300 font-mono mt-0.5">{currentPhase.subtitle}</p>
              </div>
            </div>

            {/* Thumbnail Strip to toggle or view all 3 at glance */}
            <div className="grid grid-cols-3 gap-3">
              {developmentPhases.map((phase, idx) => (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => setSelectedPhase(idx)}
                  className={`relative rounded-lg overflow-hidden border h-16 sm:h-20 transition-all cursor-pointer ${
                    selectedPhase === idx
                      ? 'border-[#0066E5] ring-2 ring-[#0066E5]/40 opacity-100'
                      : 'border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-600'
                  }`}
                >
                  <img
                    src={phase.image}
                    alt={phase.alt}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-1.5">
                    <span className="text-[10px] font-mono font-bold text-white truncate">
                      P{phase.phaseNumber} · {phase.badge}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Technical Specifications & Engineering Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Technical Development Benchmarks</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {currentPhase.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                {currentPhase.subtitle}
              </p>
            </div>

            {/* Key Highlights Checklist */}
            <div className="space-y-2.5">
              <p className="text-[11px] font-mono uppercase text-zinc-500 font-bold tracking-wider">
                Engineering Execution Checklist:
              </p>
              {currentPhase.keyHighlights.map((highlight, hIdx) => (
                <div key={hIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{highlight}</span>
                </div>
              ))}
            </div>

            {/* Technical Specs Grid */}
            <div className="grid grid-cols-2 gap-2.5 p-3.5 bg-zinc-900/90 rounded-xl border border-zinc-800">
              {currentPhase.technicalSpecs.map((spec, sIdx) => (
                <div key={sIdx} className="space-y-0.5">
                  <p className="text-[10px] font-mono uppercase text-zinc-500 font-bold">
                    {spec.label}
                  </p>
                  <p className="text-xs font-bold text-zinc-200">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleInquireBottleSpec}
                className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg border border-zinc-700 transition-colors cursor-pointer"
              >
                <FlaskConical className="w-3.5 h-3.5 text-[#00AEEF]" />
                <span>Request Custom Cleaning Bottle Specification</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
