import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Package,
  Layers,
  Box,
  Truck,
  ArrowRight,
  RefreshCw,
  Sliders,
  CheckCircle2,
  Info,
  Compass,
} from 'lucide-react';
import { AIPackagingRecommendation } from '../types';

interface AiPackagingEngineerProps {
  onApplyRecommendation: (rec: AIPackagingRecommendation) => void;
  onOpenRfqWithAdvice: (rec: AIPackagingRecommendation) => void;
}

export const AiPrintAdvisor: React.FC<AiPackagingEngineerProps> = ({
  onApplyRecommendation,
  onOpenRfqWithAdvice,
}) => {
  const [prompt, setPrompt] = useState<string>(
    'Organic roasted whole bean coffee (340g): needs high-barrier flexible valve pouch, secondary folding carton with crash-lock auto-bottom, 8-up nested die layout on 720×1020mm sheet, plus commercial offset printing and sea freight export.'
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<AIPackagingRecommendation | null>({
    structuralStyle: 'ECMA A60.20 Crash-Lock Carton + Side-Gusset Valve Pouch',
    recommendedCategory: 'folding-carton',
    materialSpec: '350gsm C1S Virgin SBS Board + Matte BOPP 19µ / Met-PET 12µ / LLDPE 80µ',
    fluteOrCaliper: 'High-Stiffness Paperboard',
    primaryLaminateStructure: {
      recommendedLayers: 'Multi-Layer Airtight Film (Moisture & Oxygen Barrier)',
      pouchStyle: 'Side-Gusset Pouch with Freshness Valve & Resealable Zipper',
      barrierRating: 'Maximum Freshness Protection (Blocks Air, Humidity & Light)',
      sustainabilityOption: '100% Recyclable Mono-PE Eco Alternative Available',
    },
    secondaryFoldingCarton: {
      style: 'Fast-Assembly Snap-Lock Auto-Bottom Carton with Tuck Top',
      dielineSpecs: 'High-Grade Virgin Board with Reinforced Clean-Fold Creases',
      grainDirection: 'Grain aligned parallel to folds to eliminate cracked edges',
      dieLayoutYield: 'Interlocking low-waste press layout to minimize paper scrap',
    },
    tertiaryShipper: {
      corrugatedSpec: 'Reinforced Corrugated Master Shipping Carton',
      bctCompressiveStrength: 'Heavy-Duty Crush-Resistant: Built to prevent collapse in tall warehouse stacks',
      palletizationPlan: 'Optimized export pallet arrangement with zero wasted shipping space',
    },
    printAndDispatch: {
      printProcess: 'Commercial Full-Color Offset Printing with Premium Soft-Touch Matte Finish',
      finishingAndTooling: 'Automated high-speed precision die-cutting and folding-gluing',
      dispatchTimeline: 'Fast 3D/Physical Samples -> Mass Printing -> Global Warehouse Dispatch',
    },
    insertType: 'Integrated Folded Paperboard Cushion (Zero Plastic Foam)',
    transitTesting: 'Certified Drop & Vibration Transit Protection',
    unboxingUx: 'Effortless tuck release with smooth premium feel and clean interior presentation',
    estimatedProductionDays: 'Fast Physical Mockup / Swift Mass Production & Delivery',
    expertAdvice:
      'Pairing the airtight barrier pouch with a reinforced outer box keeps goods protected from tropical humidity during shipping, guaranteeing fresh retail presentation.',
    costEfficiencyTip:
      'Interlocking the carton shapes tightly on the parent sheet eliminates excess trim scrap, significantly reducing raw material costs on large production runs.',
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const samplePrompts = [
    'Organic whole bean coffee (340g): barrier pouch with valve, secondary auto-bottom carton & export shipper.',
    'Liquid cosmetic serum dropper: high-barrier foil sachet, straight tuck carton with 8-up die layout, commercial air dispatch.',
    'Eco nutritional powder: 100% recyclable mono-PE stand-up pouch, folding carton with grain alignment, ocean container freight.',
    'Pharmaceutical diagnostic kits: 3-side seal foil laminate, tamper-evident crash-lock carton, and ISTA 3A transit report.',
  ];

  const handleConsultEngineer = async (customText?: string) => {
    const query = customText || prompt;
    if (!query.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });

      if (!response.ok) {
        throw new Error(`Consulting service responded with status ${response.status}`);
      }

      const resData = await response.json();
      if (resData.success && resData.data) {
        setRecommendation(resData.data);
      } else {
        throw new Error('Could not parse structural engineering recommendation');
      }
    } catch (err: any) {
      console.warn('Consulting API call failed, falling back:', err);
      setErrorMsg('Using offline consulting engineering engine.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="ai-engineer"
      className="py-20 bg-zinc-950 text-zinc-100 border-b border-zinc-800 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="text-[#00AEEF] font-semibold">AI Packaging Systems Advisory</span>
            <span aria-hidden="true">·</span>
            <span>Primary, Secondary & Tertiary Synthesis</span>
            <span aria-hidden="true">·</span>
            <span>Live Dieline & Die Layout Modeler</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            AI Principal Packaging <br />
            <span className="text-zinc-500">Consultant & Systems Architect.</span>
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            Describe your product type, target shelf life, and shipping channels. Our AI advisor formulates the
            exact primary flexible barrier laminate, secondary folding carton CAD dieline with nested press die layout,
            tertiary export shipper, and commercial offset print & dispatch timeline.
          </p>
        </div>

        {/* Input Interface */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4 shadow-xl">
          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
            Enter Product Specification & Packaging Hierarchy Requirements:
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. 500g whey protein powder: needs recyclable stand-up pouch with zipper, retail carton with hang tab and 8-up die layout, plus offset printing and sea freight..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-4 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#0066E5] font-sans resize-none"
            />
            <button
              onClick={() => handleConsultEngineer()}
              disabled={isLoading || !prompt.trim()}
              className="absolute right-3 bottom-3 flex items-center gap-2 bg-[#0066E5] hover:bg-[#0052B8] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded transition-colors cursor-pointer shadow-sm"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Calculating Systems...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run Packaging Audit</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Scenario Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-mono text-zinc-500 shrink-0">Sample Audits:</span>
            {samplePrompts.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPrompt(sample);
                  handleConsultEngineer(sample);
                }}
                className="text-[11px] font-sans text-zinc-400 hover:text-white bg-zinc-800/60 hover:bg-zinc-800 px-3 py-1 rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 border border-zinc-700/50"
              >
                {sample.split(':')[0]}
              </button>
            ))}
          </div>

          {errorMsg && (
            <p className="text-xs font-mono text-amber-400">{errorMsg}</p>
          )}
        </div>

        {/* Deliverable Results: 4-Tier Systems Architecture */}
        {recommendation && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-xs font-mono text-[#00AEEF] uppercase font-bold tracking-wider">
                  Audit Deliverable: Complete Packaging Ecosystem
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {recommendation.structuralStyle}
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1 rounded font-bold">
                {recommendation.estimatedProductionDays}
              </span>
            </div>

            {/* 4 Pillars Output Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Pillar 1: Primary Laminate */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-blue-400 uppercase">
                    <Package className="w-4 h-4" />
                    <span>1. Primary Barrier</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">Flexible</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    {recommendation.primaryLaminateStructure?.pouchStyle || 'Stand-Up Barrier Pouch'}
                  </p>
                  <p className="text-[11px] text-zinc-400 font-mono mt-1">
                    {recommendation.primaryLaminateStructure?.recommendedLayers || 'Matte BOPP / Met-PET / LLDPE'}
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-800 text-[10px] font-mono text-zinc-400 space-y-1">
                  <p className="text-emerald-400 font-semibold">
                    {recommendation.primaryLaminateStructure?.barrierRating || 'OTR < 0.5 / WVTR < 0.5'}
                  </p>
                  <p className="text-zinc-500">
                    Eco: {recommendation.primaryLaminateStructure?.sustainabilityOption || 'Mono-PE stream'}
                  </p>
                </div>
              </div>

              {/* Pillar 2: Secondary Folding Carton */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400 uppercase">
                    <Layers className="w-4 h-4" />
                    <span>2. Secondary Carton</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">CAD & Die</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    {recommendation.secondaryFoldingCarton?.style || 'ECMA A60.20 Crash-Lock Carton'}
                  </p>
                  <p className="text-[11px] text-zinc-400 font-mono mt-1">
                    {recommendation.secondaryFoldingCarton?.dielineSpecs || '350gsm C1S SBS, 0.52mm crease'}
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-800 text-[10px] font-mono text-zinc-400 space-y-1">
                  <p className="text-amber-400 font-semibold">
                    {recommendation.secondaryFoldingCarton?.grainDirection || 'Grain parallel to height creases'}
                  </p>
                  <p className="text-emerald-400">
                    {recommendation.secondaryFoldingCarton?.dieLayoutYield || '6-up nested on 720×1020mm (87% yield)'}
                  </p>
                </div>
              </div>

              {/* Pillar 3: Tertiary Shipper & Pallet */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-purple-400 uppercase">
                    <Box className="w-4 h-4" />
                    <span>3. Tertiary Shipper</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">Transit</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    {recommendation.tertiaryShipper?.corrugatedSpec || 'B-Flute 44 ECT Master Shipper'}
                  </p>
                  <p className="text-[11px] text-zinc-400 font-mono mt-1">
                    {recommendation.tertiaryShipper?.bctCompressiveStrength || 'Heavy-Duty: Crush-resistant stacking strength'}
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-800 text-[10px] font-mono text-zinc-400 space-y-1">
                  <p className="text-blue-400">
                    {recommendation.tertiaryShipper?.palletizationPlan || '40 cases per 1200×1000mm pallet'}
                  </p>
                  <p className="text-zinc-500">
                    Test: {recommendation.transitTesting || 'ISTA 3A Parcel certified'}
                  </p>
                </div>
              </div>

              {/* Pillar 4: Print & Dispatch Execution */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-400 uppercase">
                    <Truck className="w-4 h-4" />
                    <span>4. Print & Dispatch</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">Execution</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    {recommendation.printAndDispatch?.printProcess || '6-Color Offset + Soft-Touch Matte'}
                  </p>
                  <p className="text-[11px] text-zinc-400 font-mono mt-1">
                    {recommendation.printAndDispatch?.finishingAndTooling || 'Bobst Novacut + Pertinax counter'}
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-800 text-[10px] font-mono text-zinc-400 space-y-1">
                  <p className="text-white font-semibold">
                    {recommendation.printAndDispatch?.dispatchTimeline || '7d Print -> Global Port Export'}
                  </p>
                  <p className="text-zinc-500">
                    AQL 1.0 zero-defect batch inspection
                  </p>
                </div>
              </div>
            </div>

            {/* Consulting Advisory Rationale & Cost Tip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg space-y-1">
                <p className="text-xs font-mono text-[#00AEEF] uppercase font-bold">
                  Consulting Engineering Guidance:
                </p>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {recommendation.expertAdvice}
                </p>
              </div>

              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg space-y-1">
                <p className="text-xs font-mono text-emerald-400 uppercase font-bold">
                  Substrate & Tooling Cost Optimization Tip:
                </p>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {recommendation.costEfficiencyTip}
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <span className="text-xs font-mono text-zinc-500">
                Full manufacturing & dispatch managed by LJ Global Dongguan facility
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onApplyRecommendation(recommendation)}
                  className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Load Into CAD Lab</span>
                </button>
                <button
                  onClick={() => onOpenRfqWithAdvice(recommendation)}
                  className="px-5 py-2.5 bg-[#0066E5] hover:bg-[#0052B8] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
                >
                  <span>Request Production Print & Dispatch Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
