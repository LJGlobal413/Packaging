import React, { useState, useMemo } from 'react';
import {
  Box,
  Layers,
  Compass,
  Download,
  RotateCcw,
  Sliders,
  Send,
  ShieldCheck,
  CheckCircle2,
  Maximize2,
  Cpu,
  Eye,
  Grid,
  Truck,
  ArrowRight,
} from 'lucide-react';
import {
  CAD_DIELINE_PRESETS,
  PACKAGING_MATERIALS,
  calculateStructuralEstimate,
  calculateMcKeeBct,
} from '../data/printingData';
import { StructuralCategory } from '../types';

interface QuoteCalculatorProps {
  initialCategory?: StructuralCategory;
  onOpenRfqModalWithSpec: (specSummary: {
    category: string;
    quantity: number;
    paperStock: string;
    colorMode: string;
    finishes: string[];
    totalEstimate: string;
    unitPrice: string;
    leadTime: string;
  }) => void;
}

export const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({
  initialCategory,
  onOpenRfqModalWithSpec,
}) => {
  // Preset selection
  const [selectedPresetId, setSelectedPresetId] = useState<string>('ecma-a6020');

  const activePreset = useMemo(() => {
    return (
      CAD_DIELINE_PRESETS.find((p) => p.id === selectedPresetId) ||
      CAD_DIELINE_PRESETS[0]
    );
  }, [selectedPresetId]);

  // Dimensions state
  const [lengthMm, setLengthMm] = useState<number>(activePreset.defaultLengthMm);
  const [widthMm, setWidthMm] = useState<number>(activePreset.defaultWidthMm);
  const [depthMm, setDepthMm] = useState<number>(activePreset.defaultDepthMm);

  // Substrate & configuration
  const [materialId, setMaterialId] = useState<string>(PACKAGING_MATERIALS[0].id);
  const [printFinish, setPrintFinish] = useState<'offset-4c-matte' | 'raw-kraft' | 'flexo-1c' | 'foil-emboss-luxury'>('offset-4c-matte');
  const [quantity, setQuantity] = useState<number>(3000);
  const [dispatchOption, setDispatchOption] = useState<'ocean-container' | 'air-express' | 'fob-port'>('ocean-container');

  // Visualization mode: 2D CAD dieline vs 3D folding box vs Step-and-Repeat Die Sheet Layout
  const [viewMode, setViewMode] = useState<'2d-dieline' | '3d-folding' | 'die-sheet-layout'>('2d-dieline');
  const [foldProgress, setFoldProgress] = useState<number>(75);
  const [rotationX, setRotationX] = useState<number>(25);
  const [rotationY, setRotationY] = useState<number>(-35);

  const activeMaterial = useMemo(() => {
    return (
      PACKAGING_MATERIALS.find((m) => m.id === materialId) ||
      PACKAGING_MATERIALS[0]
    );
  }, [materialId]);

  // Update dimensions when preset changes
  const handlePresetSelect = (presetId: string) => {
    setSelectedPresetId(presetId);
    const p = CAD_DIELINE_PRESETS.find((item) => item.id === presetId);
    if (p) {
      setLengthMm(p.defaultLengthMm);
      setWidthMm(p.defaultWidthMm);
      setDepthMm(p.defaultDepthMm);
    }
  };

  // Dimensional presets (Quick size buttons)
  const applyQuickDimension = (type: 'small-cosmetic' | 'retail-box' | 'ecom-mailer' | 'supplement-bottle') => {
    switch (type) {
      case 'small-cosmetic':
        setLengthMm(60);
        setWidthMm(40);
        setDepthMm(130);
        break;
      case 'supplement-bottle':
        setLengthMm(85);
        setWidthMm(85);
        setDepthMm(160);
        break;
      case 'retail-box':
        setLengthMm(120);
        setWidthMm(80);
        setDepthMm(200);
        break;
      case 'ecom-mailer':
        setLengthMm(260);
        setWidthMm(180);
        setDepthMm(75);
        break;
    }
  };

  // Perform structural engineering calculations
  const calculationResult = useMemo(() => {
    return calculateStructuralEstimate({
      styleId: selectedPresetId,
      lengthMm,
      widthMm,
      depthMm,
      quantity,
      materialId,
      printFinish,
      transitTestRequired: true,
      destinationRegion: 'north-america',
    });
  }, [selectedPresetId, lengthMm, widthMm, depthMm, quantity, materialId, printFinish]);

  // Step-and-Repeat Press Die Layout metrics (Standard B1 720 × 1020 mm press sheet)
  const dieLayoutMetrics = useMemo(() => {
    const sheetWidth = 1020;
    const sheetHeight = 720;
    const blankL = calculationResult.blankLengthMm;
    const blankW = calculationResult.blankWidthMm;

    // Across & Down nesting
    const across = Math.max(1, Math.floor((sheetWidth - 20) / (blankL + 4)));
    const down = Math.max(1, Math.floor((sheetHeight - 25) / (blankW + 4)));
    const totalBlanks = across * down;

    const usedArea = totalBlanks * (blankL * blankW);
    const sheetArea = sheetWidth * sheetHeight;
    const sheetUtilizationPercent = Math.min(94, Math.max(65, Number(((usedArea / sheetArea) * 100).toFixed(1))));
    const scrapWastePercent = Number((100 - sheetUtilizationPercent).toFixed(1));

    return {
      across,
      down,
      totalBlanks,
      sheetUtilizationPercent,
      scrapWastePercent,
      pressFormat: '720 × 1020 mm (Commercial B1 Press)',
      grainOrientation: 'Grain Parallel to Height Creases',
    };
  }, [calculationResult.blankLengthMm, calculationResult.blankWidthMm]);

  // Handler to export SVG dieline file
  const handleDownloadDielineSvg = () => {
    const svgElement = document.getElementById('cad-dieline-svg');
    if (!svgElement) return;
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `${activePreset.standardCode}_${lengthMm}x${widthMm}x${depthMm}mm_Dieline.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };

  // Push into RFQ modal
  const handleSendToRfq = () => {
    onOpenRfqModalWithSpec({
      category: `${activePreset.standardCode} - ${activePreset.name}`,
      quantity,
      paperStock: `${activeMaterial.name} (${activeMaterial.strengthRating})`,
      colorMode: printFinish.toUpperCase().replace('-', ' '),
      finishes: [
        `Dimensions: ${lengthMm} × ${widthMm} × ${depthMm} mm`,
        `Nesting: ${dieLayoutMetrics.totalBlanks}-Up on 720×1020mm Sheet (${dieLayoutMetrics.sheetUtilizationPercent}% Yield)`,
        `Grain: ${dieLayoutMetrics.grainOrientation}`,
        `Dispatch: ${dispatchOption.replace('-', ' ').toUpperCase()}`,
      ],
      totalEstimate: `$${calculationResult.totalPriceRange[0].toLocaleString()} - $${calculationResult.totalPriceRange[1].toLocaleString()} USD`,
      unitPrice: `$${calculationResult.unitPriceRange[0]} - $${calculationResult.unitPriceRange[1]} USD`,
      leadTime: `24h CNC Mockup / ${calculationResult.productionLeadTimeDays[0]}-${calculationResult.productionLeadTimeDays[1]}d Print & Dispatch`,
    });
  };

  return (
    <section
      id="cad-lab"
      className="py-20 bg-zinc-950 text-zinc-100 border-b border-zinc-800 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="text-[#00AEEF] font-semibold">Secondary Packaging Engineering</span>
            <span aria-hidden="true">·</span>
            <span>Folding Carton CAD Dielines</span>
            <span aria-hidden="true">·</span>
            <span>Step-and-Repeat Die Layouts</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Folding Carton Design, <br />
            <span className="text-zinc-500">Die Layout & Print Dispatch.</span>
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            Modify product carton dimensions, calibrate paperboard grain direction, inspect the nested press die layout
            on 720×1020mm sheets, and calculate commercial offset printing and export logistics.
          </p>
        </div>

        {/* Style Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {CAD_DIELINE_PRESETS.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(preset.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                  isSelected
                    ? 'bg-[#0066E5] text-white border-[#0066E5] shadow-xs'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{preset.standardCode}</span>
                <span className="text-[10px] opacity-80 hidden sm:inline">
                  ({preset.name.split(' ')[0]})
                </span>
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Lab Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 cols): Parameter Controls */}
          <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  1. Product Carton Dimensions (mm)
                </h3>
                <p className="text-[11px] text-zinc-500">Length (L) × Width (W) × Depth (D)</p>
              </div>
              {/* Quick Dimension Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => applyQuickDimension('small-cosmetic')}
                  className="px-2 py-0.5 text-[10px] font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded cursor-pointer"
                  title="Cosmetic Serum Bottle"
                >
                  Cosmetic
                </button>
                <button
                  onClick={() => applyQuickDimension('supplement-bottle')}
                  className="px-2 py-0.5 text-[10px] font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded cursor-pointer"
                  title="Nutraceutical Bottle"
                >
                  Pharma
                </button>
                <button
                  onClick={() => applyQuickDimension('retail-box')}
                  className="px-2 py-0.5 text-[10px] font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded cursor-pointer"
                  title="Retail Hardware Box"
                >
                  Retail
                </button>
              </div>
            </div>

            {/* Dimensional Sliders */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                  <span>Length (L):</span>
                  <span className="text-white font-bold tabular-nums">{lengthMm} mm</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="350"
                  step="5"
                  value={lengthMm}
                  onChange={(e) => setLengthMm(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#0066E5]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                  <span>Width (W):</span>
                  <span className="text-white font-bold tabular-nums">{widthMm} mm</span>
                </div>
                <input
                  type="range"
                  min="35"
                  max="250"
                  step="5"
                  value={widthMm}
                  onChange={(e) => setWidthMm(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#0066E5]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                  <span>Depth / Height (D):</span>
                  <span className="text-white font-bold tabular-nums">{depthMm} mm</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="320"
                  step="5"
                  value={depthMm}
                  onChange={(e) => setDepthMm(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#0066E5]"
                />
              </div>
            </div>

            {/* 2. Board Stock & Grain Direction */}
            <div className="space-y-2 pt-3 border-t border-zinc-800">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
                  2. Board Caliper & Grain Direction
                </label>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  {dieLayoutMetrics.grainOrientation}
                </span>
              </div>
              <select
                value={materialId}
                onChange={(e) => setMaterialId(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 text-zinc-200 text-xs px-3 py-2.5 rounded focus:outline-none focus:border-[#0066E5]"
              >
                {PACKAGING_MATERIALS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} — {m.strengthRating}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-zinc-500 font-mono">
                Grain runs parallel to vertical corner creases to avoid board cracking during high-speed Bobst folder-gluer runs.
              </p>
            </div>

            {/* 3. Commercial Printing & Dispatch Options */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-800">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-mono mb-1.5">
                  Print & Coating Finish
                </label>
                <select
                  value={printFinish}
                  onChange={(e) => setPrintFinish(e.target.value as any)}
                  className="w-full bg-zinc-950 border border-zinc-700 text-zinc-200 text-xs px-2.5 py-2 rounded focus:outline-none focus:border-[#0066E5]"
                >
                  <option value="offset-4c-matte">4C Offset + Soft-Touch Matte</option>
                  <option value="foil-emboss-luxury">6C + Gold Foil & Emboss</option>
                  <option value="flexo-1c">1-Color Line Flexo</option>
                  <option value="raw-kraft">Raw Unprinted White Dummy</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-mono mb-1.5">
                  Export Dispatch Route
                </label>
                <select
                  value={dispatchOption}
                  onChange={(e) => setDispatchOption(e.target.value as any)}
                  className="w-full bg-zinc-950 border border-zinc-700 text-zinc-200 text-xs px-2.5 py-2 rounded focus:outline-none focus:border-[#0066E5]"
                >
                  <option value="ocean-container">Ocean Container (LCL / FCL)</option>
                  <option value="air-express">Air Express Direct to Door</option>
                  <option value="fob-port">FOB International Customs Port</option>
                </select>
              </div>
            </div>

            {/* 4. Production Run Quantity */}
            <div className="space-y-2 pt-3 border-t border-zinc-800">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
                  3. Production Run Quantity
                </label>
                <span className="text-xs font-mono text-[#00AEEF] font-bold tabular-nums">
                  {quantity.toLocaleString()} Cartons
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[1000, 3000, 5000, 10000].map((qty) => (
                  <button
                    key={qty}
                    type="button"
                    onClick={() => setQuantity(qty)}
                    className={`py-1.5 text-xs font-mono rounded cursor-pointer transition-colors ${
                      quantity === qty
                        ? 'bg-[#0066E5] text-white font-bold'
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {qty.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleSendToRfq}
                className="w-full flex items-center justify-center gap-2 bg-[#0066E5] hover:bg-[#0052B8] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded transition-colors cursor-pointer shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Request Production Print & Dispatch Quotation</span>
              </button>
              <button
                onClick={handleDownloadDielineSvg}
                className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs uppercase tracking-wider py-2.5 rounded transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export Vector SVG Dieline Template</span>
              </button>
            </div>
          </div>

          {/* Right Column (7 cols): Interactive Viewport (2D Dieline / 3D Box / Step-and-Repeat Die Sheet) */}
          <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-6 shadow-xl flex flex-col justify-between">
            {/* Viewport Header Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  {activePreset.standardCode} Engineering CAD Engine
                </span>
              </div>

              {/* View Selector Tabs */}
              <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded border border-zinc-800">
                <button
                  onClick={() => setViewMode('2d-dieline')}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-semibold rounded cursor-pointer transition-colors ${
                    viewMode === '2d-dieline'
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <Compass className="w-3 h-3" />
                  <span>2D Dieline</span>
                </button>

                <button
                  onClick={() => setViewMode('die-sheet-layout')}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-semibold rounded cursor-pointer transition-colors ${
                    viewMode === 'die-sheet-layout'
                      ? 'bg-[#0066E5] text-white'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <Grid className="w-3 h-3" />
                  <span>Die Sheet Layout</span>
                </button>

                <button
                  onClick={() => setViewMode('3d-folding')}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-semibold rounded cursor-pointer transition-colors ${
                    viewMode === '3d-folding'
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <Box className="w-3 h-3" />
                  <span>3D Fold Box</span>
                </button>
              </div>
            </div>

            {/* Interactive Canvas Area */}
            <div className="relative w-full h-84 sm:h-96 bg-zinc-950 border border-zinc-800 rounded-md overflow-hidden flex items-center justify-center">
              {/* CAD Grid Backdrop */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #3f3f46 1px, transparent 1px), linear-gradient(to bottom, #3f3f46 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              {viewMode === 'die-sheet-layout' ? (
                /* Step-and-Repeat Press Sheet Die Layout Visualization */
                <div className="w-full h-full flex flex-col items-center justify-between p-4 relative">
                  <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-zinc-800 pb-1.5">
                    <span>Press Format: <strong className="text-white">720 × 1020 mm (B1)</strong></span>
                    <span className="text-emerald-400 font-bold">
                      Nesting: {dieLayoutMetrics.totalBlanks}-Up ({dieLayoutMetrics.sheetUtilizationPercent}% Yield)
                    </span>
                  </div>

                  {/* Visual Press Sheet Rectangle */}
                  <div className="w-full h-56 border-2 border-emerald-500/60 bg-zinc-900/60 p-2 flex items-center justify-center relative">
                    {/* Gripper Margin Bar */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-amber-500/30 text-[8px] font-mono text-amber-300 flex items-center justify-center">
                      GRIPPER EDGE (12mm)
                    </div>

                    {/* Nested Blanks Grid */}
                    <div
                      className="grid gap-2 w-full h-44 mt-3 p-1"
                      style={{
                        gridTemplateColumns: `repeat(${dieLayoutMetrics.across}, minmax(0, 1fr))`,
                        gridTemplateRows: `repeat(${dieLayoutMetrics.down}, minmax(0, 1fr))`,
                      }}
                    >
                      {Array.from({ length: dieLayoutMetrics.totalBlanks }).map((_, idx) => (
                        <div
                          key={idx}
                          className="border border-[#00AEEF]/80 bg-blue-950/30 rounded-xs flex flex-col items-center justify-center p-1 text-center relative group hover:bg-[#0066E5]/40 transition-colors"
                        >
                          <span className="text-[9px] font-mono font-bold text-white">
                            Blank #{idx + 1}
                          </span>
                          <span className="text-[8px] font-mono text-zinc-400">
                            {lengthMm}×{widthMm}×{depthMm}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-between text-[10px] font-mono text-zinc-400 bg-zinc-900/80 px-3 py-1.5 rounded border border-zinc-800">
                    <span>Substrate Yield: <strong className="text-emerald-400 font-bold">{dieLayoutMetrics.sheetUtilizationPercent}%</strong></span>
                    <span>Trim Scrap: <strong className="text-amber-400">{dieLayoutMetrics.scrapWastePercent}%</strong></span>
                    <span>Gutter: <strong>3mm</strong></span>
                    <span>Bobst Speed: <strong>35k/hr</strong></span>
                  </div>
                </div>
              ) : viewMode === '2d-dieline' ? (
                /* 2D CAD Dieline SVG Vector Blueprint */
                <div className="w-full h-full flex flex-col items-center justify-center p-4 relative">
                  <svg
                    id="cad-dieline-svg"
                    viewBox="0 0 500 360"
                    className="w-full h-full max-h-80 select-none"
                  >
                    <defs>
                      <marker
                        id="arrow"
                        viewBox="0 0 10 10"
                        refX="5"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                      >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#00AEEF" />
                      </marker>
                    </defs>

                    {/* Outer Bleed Perimeter */}
                    <rect
                      x="40"
                      y="30"
                      width="420"
                      height="300"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.5"
                    />

                    {/* Parametric Carton Geometry (ECMA A60.20 Crash-Lock Default) */}
                    <g>
                      {/* Glue Tab */}
                      <polygon
                        points="60,90 75,90 75,270 60,265"
                        fill="#27272a"
                        stroke="#EF4444"
                        strokeWidth="2"
                      />
                      {/* Panel 1: Rear */}
                      <rect
                        x="75"
                        y="90"
                        width="95"
                        height="180"
                        fill="#18181b"
                        stroke="#06B6D4"
                        strokeWidth="1.5"
                        strokeDasharray="5 3"
                      />
                      {/* Panel 2: Side */}
                      <rect
                        x="170"
                        y="90"
                        width="65"
                        height="180"
                        fill="#18181b"
                        stroke="#06B6D4"
                        strokeWidth="1.5"
                        strokeDasharray="5 3"
                      />
                      {/* Panel 3: Front */}
                      <rect
                        x="235"
                        y="90"
                        width="95"
                        height="180"
                        fill="#18181b"
                        stroke="#06B6D4"
                        strokeWidth="1.5"
                        strokeDasharray="5 3"
                      />
                      {/* Panel 4: Side */}
                      <rect
                        x="330"
                        y="90"
                        width="65"
                        height="180"
                        fill="#18181b"
                        stroke="#EF4444"
                        strokeWidth="2"
                      />
                      {/* Top Tuck Lid with friction lock */}
                      <polygon
                        points="235,90 235,40 330,40 330,90"
                        fill="#27272a"
                        stroke="#EF4444"
                        strokeWidth="2"
                      />
                      <polygon
                        points="240,40 250,25 315,25 325,40"
                        fill="#27272a"
                        stroke="#EF4444"
                        strokeWidth="2"
                      />
                      {/* Crash-Lock Diagonal Creased Bottom Flaps */}
                      <polygon
                        points="75,270 75,320 170,320 170,270"
                        fill="#1f1f23"
                        stroke="#EF4444"
                        strokeWidth="1.5"
                      />
                      <line
                        x1="75"
                        y1="270"
                        x2="170"
                        y2="320"
                        stroke="#06B6D4"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                      <polygon
                        points="235,270 235,320 330,320 330,270"
                        fill="#1f1f23"
                        stroke="#EF4444"
                        strokeWidth="1.5"
                      />
                      <line
                        x1="235"
                        y1="270"
                        x2="330"
                        y2="320"
                        stroke="#06B6D4"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                    </g>

                    {/* Grain Direction Vector Indicator */}
                    <g transform="translate(420, 140)">
                      <line x1="0" y1="0" x2="0" y2="70" stroke="#FFF200" strokeWidth="2" markerEnd="url(#arrow)" />
                      <line x1="0" y1="70" x2="0" y2="0" stroke="#FFF200" strokeWidth="2" markerEnd="url(#arrow)" />
                      <text x="-5" y="40" fill="#FFF200" fontSize="9" fontFamily="monospace" textAnchor="end">
                        GRAIN
                      </text>
                    </g>

                    {/* Dimension Callout Markers */}
                    <line
                      x1="235"
                      y1="260"
                      x2="330"
                      y2="260"
                      stroke="#00AEEF"
                      strokeWidth="1.5"
                      markerStart="url(#arrow)"
                      markerEnd="url(#arrow)"
                    />
                    <text
                      x="282"
                      y="255"
                      fill="#00AEEF"
                      fontSize="10"
                      fontFamily="monospace"
                      textAnchor="middle"
                      fontWeight="bold"
                    >
                      L: {lengthMm} mm
                    </text>

                    <line
                      x1="220"
                      y1="90"
                      x2="220"
                      y2="270"
                      stroke="#00AEEF"
                      strokeWidth="1.5"
                      markerStart="url(#arrow)"
                      markerEnd="url(#arrow)"
                    />
                    <text
                      x="210"
                      y="180"
                      fill="#00AEEF"
                      fontSize="10"
                      fontFamily="monospace"
                      textAnchor="middle"
                      fontWeight="bold"
                      transform="rotate(-90 210 180)"
                    >
                      D: {depthMm} mm
                    </text>
                  </svg>

                  {/* CAD Legend */}
                  <div className="absolute bottom-2 left-3 right-3 flex flex-wrap items-center justify-between text-[10px] font-mono text-zinc-400 bg-zinc-900/90 px-3 py-1.5 rounded border border-zinc-800 backdrop-blur-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 bg-[#EF4444] inline-block" />
                      <span>Cut Line</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 border-b border-[#06B6D4] border-dashed inline-block" />
                      <span>Crease / Score</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 bg-[#FFF200] inline-block" />
                      <span>Paper Grain</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 border-b border-[#10B981] border-dashed inline-block" />
                      <span>Bleed (3mm)</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* 3D Kinematic Folding Simulation */
                <div className="w-full h-full flex flex-col items-center justify-center p-6 relative">
                  <div
                    className="w-64 h-64 flex items-center justify-center"
                    style={{ perspective: '900px' }}
                  >
                    <div
                      className="relative w-40 h-28 transition-transform duration-200"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
                      }}
                    >
                      {/* Box Base */}
                      <div
                        className="absolute inset-0 bg-[#2b2b2e] border border-[#06B6D4] flex items-center justify-center text-[10px] font-mono text-zinc-300 shadow-2xl"
                        style={{ transform: 'translateZ(0px)' }}
                      >
                        <span>AUTO-BOTTOM</span>
                      </div>

                      {/* Front Wall */}
                      <div
                        className="absolute w-40 h-28 origin-top bg-[#36363a] border border-[#EF4444] flex items-center justify-center text-[9px] font-mono text-zinc-300"
                        style={{
                          top: '100%',
                          transform: `rotateX(${-foldProgress * 0.9}deg)`,
                          transition: 'transform 0.15s ease-out',
                        }}
                      >
                        <span>FRONT ({lengthMm}×{depthMm})</span>
                      </div>

                      {/* Rear Wall & Lid */}
                      <div
                        className="absolute w-40 h-28 origin-bottom bg-[#27272b] border border-[#06B6D4] flex items-center justify-center text-[9px] font-mono text-zinc-300"
                        style={{
                          bottom: '100%',
                          transform: `rotateX(${foldProgress * 0.9}deg)`,
                          transition: 'transform 0.15s ease-out',
                        }}
                      >
                        <div
                          className="absolute w-40 h-20 origin-bottom bg-[#3f3f46] border border-[#EF4444] flex items-center justify-center text-[9px] font-mono text-white"
                          style={{
                            bottom: '100%',
                            transform: `rotateX(${-foldProgress * 0.9}deg)`,
                            transition: 'transform 0.15s ease-out',
                          }}
                        >
                          <span className="font-bold">TUCK LID ({lengthMm}×{widthMm})</span>
                        </div>
                      </div>

                      {/* Left Wall */}
                      <div
                        className="absolute w-20 h-28 origin-right bg-[#303034] border border-[#06B6D4] flex items-center justify-center text-[9px] font-mono text-zinc-300"
                        style={{
                          right: '100%',
                          transform: `rotateY(${-foldProgress * 0.9}deg)`,
                          transition: 'transform 0.15s ease-out',
                        }}
                      >
                        <span>SIDE</span>
                      </div>

                      {/* Right Wall */}
                      <div
                        className="absolute w-20 h-28 origin-left bg-[#323236] border border-[#06B6D4] flex items-center justify-center text-[9px] font-mono text-zinc-300"
                        style={{
                          left: '100%',
                          transform: `rotateY(${foldProgress * 0.9}deg)`,
                          transition: 'transform 0.15s ease-out',
                        }}
                      >
                        <span>SIDE</span>
                      </div>
                    </div>
                  </div>

                  {/* 3D Controls */}
                  <div className="absolute bottom-2 left-4 right-4 bg-zinc-900/90 border border-zinc-800 p-2.5 rounded backdrop-blur-xs flex items-center gap-4 text-xs font-mono">
                    <span className="text-zinc-400 whitespace-nowrap">
                      Fold: <strong className="text-white">{foldProgress}%</strong>
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={foldProgress}
                      onChange={(e) => setFoldProgress(Number(e.target.value))}
                      className="w-full h-1.5 bg-zinc-800 rounded accent-[#00AEEF] cursor-pointer"
                    />
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setRotationY((prev) => prev - 20)}
                        className="p-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded cursor-pointer"
                        title="Rotate Left"
                      >
                        ◀
                      </button>
                      <button
                        onClick={() => setRotationY((prev) => prev + 20)}
                        className="p-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded cursor-pointer"
                        title="Rotate Right"
                      >
                        ▶
                      </button>
                      <button
                        onClick={() => {
                          setRotationX(25);
                          setRotationY(-35);
                          setFoldProgress(75);
                        }}
                        className="p-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded cursor-pointer"
                        title="Reset Camera"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Simple Performance & Quality Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-zinc-950 p-3 rounded border border-zinc-800">
                <p className="text-[10px] font-mono text-zinc-500 uppercase">
                  Material Efficiency
                </p>
                <p className="text-base font-black font-mono text-emerald-400 mt-0.5">
                  Low-Waste Layout
                </p>
                <p className="text-[10px] text-zinc-400">Minimizes paperboard trim scrap</p>
              </div>

              <div className="bg-zinc-950 p-3 rounded border border-zinc-800">
                <p className="text-[10px] font-mono text-zinc-500 uppercase">
                  Shipping Density
                </p>
                <p className="text-base font-black font-mono text-[#00AEEF] mt-0.5">
                  Compact Packing
                </p>
                <p className="text-[10px] text-zinc-400">Fits neatly into export pallets</p>
              </div>

              <div className="bg-zinc-950 p-3 rounded border border-zinc-800">
                <p className="text-[10px] font-mono text-zinc-500 uppercase">
                  Box Strength
                </p>
                <p className="text-base font-black font-mono text-purple-400 mt-0.5">
                  Crush Resistant
                </p>
                <p className="text-[10px] text-zinc-400">Withstands high warehouse stacking</p>
              </div>

              <div className="bg-zinc-950 p-3 rounded border border-zinc-800">
                <p className="text-[10px] font-mono text-zinc-500 uppercase">
                  Turnaround Speed
                </p>
                <p className="text-base font-black font-mono text-amber-400 mt-0.5">
                  Fast Dispatch
                </p>
                <p className="text-[10px] text-zinc-400">Quick samples & prompt delivery</p>
              </div>
            </div>

            {/* Production & Dispatch Budget Summary */}
            <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase text-zinc-400">
                  Production Estimate ({quantity.toLocaleString()} Cartons):
                </p>
                <p className="text-xl font-black text-white font-mono mt-0.5">
                  Custom Factory Quotation
                </p>
                <p className="text-[11px] text-zinc-400 font-mono">
                  Competitive volume pricing · Includes physical prototype & custom die tooling
                </p>
              </div>

              <button
                onClick={handleSendToRfq}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#0066E5] hover:bg-[#0052B8] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer whitespace-nowrap shadow-sm"
              >
                Request Quotation & Samples →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
