import React, { useState, useEffect, useCallback } from 'react';
import QRCode from 'qrcode';
import {
  QrCode,
  Download,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Sliders,
  FileCode,
  Layers,
  Info,
  ExternalLink,
  Printer,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export interface PackagingQrGeneratorProps {
  onApplyQrToPackaging?: (qrDataUrl: string, qrSvgString: string, text: string) => void;
  currentPackagingTitle?: string;
}

export interface QrPreset {
  id: string;
  label: string;
  iconName: string;
  defaultText: string;
  description: string;
}

const PRESETS: QrPreset[] = [
  {
    id: 'verify',
    label: 'Product Verification / Anti-Fake',
    iconName: 'ShieldCheck',
    defaultText: 'https://ljglobalservice.com/verify?batch=2026-LJ9842&sn=00189',
    description: 'Directs buyers to a verified anti-counterfeiting authenticity check page.',
  },
  {
    id: 'smart-packaging',
    label: 'Smart AR & Unboxing Experience',
    iconName: 'Sparkles',
    defaultText: 'https://ljglobalservice.com/ar-packaging/experience-v1',
    description: 'Launches 3D product view or webAR video manual upon scanning.',
  },
  {
    id: 'website',
    label: 'Official Brand Website',
    iconName: 'ExternalLink',
    defaultText: 'https://ljglobalservice.com',
    description: 'Standard digital entry point for brand portfolios and corporate landing pages.',
  },
  {
    id: 'manual',
    label: 'Digital Manual & PDF Certificate',
    iconName: 'FileCode',
    defaultText: 'https://ljglobalservice.com/docs/product-spec-2026.pdf',
    description: 'Replaces printed paper inserts with eco-friendly digital PDF documentation.',
  },
  {
    id: 'reorder',
    label: 'VIP Re-Order & Custom RFQ',
    iconName: 'Printer',
    defaultText: 'https://ljglobalservice.com/reorder?client=LJ-VIP-2026',
    description: 'Instant re-ordering link for retail store managers and procurement agents.',
  },
];

const COLOR_PALETTES = [
  { id: 'monochrome', name: 'Offset Pure Black', fg: '#09090b', bg: '#ffffff', note: 'Standard high-contrast for paper stock' },
  { id: 'luxury-gold', name: 'Hot Stamped Foil Look', fg: '#b48a31', bg: '#09090b', note: 'Luxury dark box contrast' },
  { id: 'cmyk-cyan', name: 'CMYK Cyan Accent', fg: '#00aeef', bg: '#ffffff', note: 'Commercial print brand color' },
  { id: 'cmyk-magenta', name: 'CMYK Magenta Accent', fg: '#ec008c', bg: '#ffffff', note: 'Vibrant packaging accent' },
  { id: 'deep-navy', name: 'Royal Navy Blue', fg: '#1e3a8a', bg: '#f8fafc', note: 'Corporate documentation & wine labels' },
];

export const PackagingQrGenerator: React.FC<PackagingQrGeneratorProps> = ({
  onApplyQrToPackaging,
  currentPackagingTitle = 'Custom Packaging Box / Label',
}) => {
  const [qrText, setQrText] = useState<string>(PRESETS[0].defaultText);
  const [activePreset, setActivePreset] = useState<string>(PRESETS[0].id);
  const [fgColor, setFgColor] = useState<string>('#09090b');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('H');
  const [quietZoneMargin, setQuietZoneMargin] = useState<number>(4);
  const [targetPrintWidthMm, setTargetPrintWidthMm] = useState<number>(20);
  const [includeCenterLogo, setIncludeCenterLogo] = useState<boolean>(true);

  const [svgString, setSvgString] = useState<string>('');
  const [dataUrl, setDataUrl] = useState<string>('');
  const [isCopiedSvg, setIsCopiedSvg] = useState<boolean>(false);
  const [isAppliedToMockup, setIsAppliedToMockup] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Generate QR Code SVG & Data URL
  const generateQr = useCallback(async () => {
    if (!qrText.trim()) return;
    setIsGenerating(true);
    try {
      // 1. Generate clean SVG string
      const svg = await QRCode.toString(qrText, {
        type: 'svg',
        margin: quietZoneMargin,
        errorCorrectionLevel: errorCorrection,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      });

      // If center logo requested, we can inject a stylized center logo badge into SVG
      let finalSvg = svg;
      if (includeCenterLogo) {
        // Inject a white rounded box with "LJ" or "SCAN" in center
        const logoBadge = `
          <g transform="translate(42, 42)">
            <rect x="0" y="0" width="16" height="16" rx="3" fill="${bgColor}" stroke="${fgColor}" stroke-width="0.8"/>
            <text x="8" y="11" font-family="Arial, sans-serif" font-size="6" font-weight="900" fill="${fgColor}" text-anchor="middle">LJ</text>
          </g>
        `;
        // Find insert index before </svg>
        const svgEndIndex = svg.lastIndexOf('</svg>');
        if (svgEndIndex !== -1) {
          finalSvg = svg.slice(0, svgEndIndex) + logoBadge + svg.slice(svgEndIndex);
        }
      }

      setSvgString(finalSvg);

      // 2. Generate High-Res 300 DPI Data URL (1200px width)
      const dataUri = await QRCode.toDataURL(qrText, {
        width: 1200,
        margin: quietZoneMargin,
        errorCorrectionLevel: errorCorrection,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      });
      setDataUrl(dataUri);
    } catch (err) {
      console.error('Failed to generate QR code:', err);
    } finally {
      setIsGenerating(false);
    }
  }, [qrText, quietZoneMargin, errorCorrection, fgColor, bgColor, includeCenterLogo]);

  useEffect(() => {
    generateQr();
  }, [generateQr]);

  const handleSelectPreset = (preset: QrPreset) => {
    setActivePreset(preset.id);
    setQrText(preset.defaultText);
  };

  const handleApplyPalette = (palette: typeof COLOR_PALETTES[0]) => {
    setFgColor(palette.fg);
    setBgColor(palette.bg);
  };

  const handleDownloadSvg = () => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `LJ-Packaging-QR-${targetPrintWidthMm}mm-Vector.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPng = () => {
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `LJ-Packaging-QR-300DPI-${targetPrintWidthMm}mm.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopySvg = () => {
    if (!svgString) return;
    navigator.clipboard.writeText(svgString);
    setIsCopiedSvg(true);
    setTimeout(() => setIsCopiedSvg(false), 2500);
  };

  const handleApplyToPackagingMockup = () => {
    if (onApplyQrToPackaging && dataUrl) {
      onApplyQrToPackaging(dataUrl, svgString, qrText);
      setIsAppliedToMockup(true);
      setTimeout(() => setIsAppliedToMockup(false), 3000);
    }
  };

  // 300 DPI calculations
  const pixelDimensionsAt300Dpi = Math.round((targetPrintWidthMm / 25.4) * 300);
  const isPrintSafeSize = targetPrintWidthMm >= 15;
  const isHighErrorCorrection = errorCorrection === 'H' || errorCorrection === 'Q';

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 sm:p-8 space-y-8 text-zinc-100 font-sans shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#00AEEF]/10 border border-[#00AEEF]/30 text-[#00AEEF] text-xs font-mono font-bold uppercase tracking-widest rounded">
            <QrCode className="w-3.5 h-3.5" />
            <span>Pre-Press Packaging Utility</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase italic tracking-tight">
            Printable Packaging QR Code <span className="text-[#00AEEF]">Generator</span>
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            Generate 300 DPI vector SVG and high-resolution QR codes optimized for offset plate-making, hot foil stamping, and digital CAD dielines.
          </p>
        </div>

        {onApplyQrToPackaging && (
          <button
            onClick={handleApplyToPackagingMockup}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded transition-all shrink-0 cursor-pointer shadow-lg ${
              isAppliedToMockup
                ? 'bg-emerald-600 text-white'
                : 'bg-[#EC008C] hover:bg-[#c90077] text-white'
            }`}
          >
            {isAppliedToMockup ? (
              <>
                <Check className="w-4 h-4" />
                <span>Applied to Mockup!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Simulate on Packaging Mockup</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Main Grid: Left Controls (7 cols) + Right Real-time Preview & Pre-press Specs (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Preset Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#00AEEF]" />
              <span>1. Select Packaging QR Target Preset</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRESETS.map((preset) => {
                const isSelected = activePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`p-3 text-left border rounded transition-all text-xs cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-zinc-800 border-[#00AEEF] text-white shadow-md'
                        : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-white mb-1">
                      <span>{preset.label}</span>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-[#00AEEF]" />}
                    </div>
                    <p className="text-[11px] text-zinc-400 line-clamp-2">{preset.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target URL / Text Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-mono font-bold uppercase tracking-wider text-zinc-300">
                2. Encoded Payload (URL, Serial #, or Text)
              </label>
              <span className="text-[11px] text-zinc-400 font-mono">
                {qrText.length} Characters
              </span>
            </div>
            <input
              type="text"
              value={qrText}
              onChange={(e) => {
                setQrText(e.target.value);
                setActivePreset('custom');
              }}
              placeholder="e.g. https://yourdomain.com/product/verify"
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3.5 py-2.5 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-[#00AEEF] transition-colors"
            />
          </div>

          {/* Color Palettes & Custom Picker */}
          <div className="space-y-3">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#EC008C]" />
              <span>3. Color Scheme & Substrate Contrast</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {COLOR_PALETTES.map((pal) => (
                <button
                  key={pal.id}
                  onClick={() => handleApplyPalette(pal)}
                  className={`flex items-center gap-2 px-3 py-1.5 border rounded text-xs transition-all cursor-pointer ${
                    fgColor === pal.fg && bgColor === pal.bg
                      ? 'bg-zinc-800 border-[#00AEEF] text-white font-bold'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-zinc-700 shrink-0"
                    style={{ backgroundColor: pal.fg }}
                  />
                  <span>{pal.name}</span>
                </button>
              ))}
            </div>

            {/* Custom Color Pickers */}
            <div className="grid grid-cols-2 gap-4 bg-zinc-950 p-3 border border-zinc-800 rounded text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Foreground Ink:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-zinc-200 uppercase">{fgColor}</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-l border-zinc-800 pl-4">
                <span className="text-zinc-400">Substrate / Bg:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-zinc-200 uppercase">{bgColor}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Print Tolerance & Quiet Zone Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-zinc-950 p-4 border border-zinc-800 rounded">
            {/* Error Correction */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold uppercase text-zinc-400 block">
                Error Correction Level
              </label>
              <select
                value={errorCorrection}
                onChange={(e) => setErrorCorrection(e.target.value as any)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#00AEEF]"
              >
                <option value="L">Low (7% recovery)</option>
                <option value="M">Medium (15% recovery)</option>
                <option value="Q">Quartile (25% recovery)</option>
                <option value="H">High (30% - Print Recommended)</option>
              </select>
              <p className="text-[10px] text-zinc-500">
                High (H) protects against scratches or Spot UV overlay.
              </p>
            </div>

            {/* Quiet Zone Margin */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold uppercase text-zinc-400 block">
                Quiet Zone (Border)
              </label>
              <select
                value={quietZoneMargin}
                onChange={(e) => setQuietZoneMargin(Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#00AEEF]"
              >
                <option value={0}>0 Modules (Border Only)</option>
                <option value={2}>2 Modules (Compact)</option>
                <option value={4}>4 Modules (Recommended Standard)</option>
                <option value={6}>6 Modules (Safe Bleed Margin)</option>
              </select>
              <p className="text-[10px] text-zinc-500">
                Min 4 modules required for reliable camera scan compliance.
              </p>
            </div>

            {/* Physical Print Size (mm) */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold uppercase text-zinc-400 block">
                Target Width on Box (mm)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={10}
                  max={100}
                  value={targetPrintWidthMm}
                  onChange={(e) => setTargetPrintWidthMm(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#00AEEF]"
                />
                <span className="text-xs text-zinc-400 font-mono">mm</span>
              </div>
              <p className="text-[10px] text-zinc-500">
                At 300 DPI = {pixelDimensionsAt300Dpi}px raster.
              </p>
            </div>
          </div>

          {/* Optional Center Logo Toggle */}
          <div className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded text-xs">
            <div className="space-y-0.5">
              <span className="font-mono font-bold text-white">Embed Center Brand Emblem ("LJ")</span>
              <p className="text-[11px] text-zinc-400">
                Adds a central quiet zone badge with LJ Global insignia. Requires High (H) error correction.
              </p>
            </div>
            <button
              onClick={() => setIncludeCenterLogo(!includeCenterLogo)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                includeCenterLogo ? 'bg-[#00AEEF] justify-end' : 'bg-zinc-800 justify-start'
              }`}
            >
              <span className="w-4 h-4 bg-white rounded-full shadow-md" />
            </button>
          </div>
        </div>

        {/* Right Column: Live Vector Preview & Download Pre-Press Files */}
        <div className="lg:col-span-5 space-y-6">
          {/* Vector Preview Box */}
          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl flex flex-col items-center justify-center space-y-4 shadow-inner relative overflow-hidden">
            <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-500 border-b border-zinc-800/80 pb-2">
              <span className="flex items-center gap-1 text-zinc-300">
                <Printer className="w-3.5 h-3.5 text-[#00AEEF]" />
                <span>PRE-PRESS VECTOR CANVAS</span>
              </span>
              <span>{targetPrintWidthMm}mm × {targetPrintWidthMm}mm</span>
            </div>

            {/* QR Render Window */}
            <div
              className="p-4 rounded border border-zinc-800 transition-all duration-300 shadow-xl flex items-center justify-center max-w-[220px] max-h-[220px] aspect-square"
              style={{ backgroundColor: bgColor }}
            >
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-8 text-zinc-500 text-xs font-mono space-y-2">
                  <RefreshCw className="w-5 h-5 animate-spin text-[#00AEEF]" />
                  <span>Generating Vector...</span>
                </div>
              ) : svgString ? (
                <div
                  className="w-full h-full flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: svgString }}
                />
              ) : null}
            </div>

            {/* Physical Print Dimension Note */}
            <div className="text-center space-y-1">
              <p className="text-xs font-mono text-zinc-300 font-bold">
                Output Dimension: {targetPrintWidthMm}mm ({pixelDimensionsAt300Dpi}px @ 300 DPI)
              </p>
              <div className="flex items-center justify-center gap-2 text-[11px]">
                {isPrintSafeSize ? (
                  <span className="text-emerald-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> High Scan Reliability
                  </span>
                ) : (
                  <span className="text-amber-400 font-mono flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Size &lt;15mm may affect smartphone focus
                  </span>
                )}
              </div>
            </div>

            {/* Export Buttons */}
            <div className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800">
              <button
                onClick={handleDownloadSvg}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#00AEEF] hover:bg-[#0092C8] text-zinc-950 font-bold text-xs uppercase tracking-wider rounded transition-all cursor-pointer shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Vector SVG</span>
              </button>

              <button
                onClick={handleDownloadPng}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider rounded border border-zinc-700 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>300 DPI PNG</span>
              </button>
            </div>

            <button
              onClick={handleCopySvg}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-white font-mono text-xs border border-zinc-800 rounded transition-all cursor-pointer"
            >
              {isCopiedSvg ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">SVG Markup Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Raw SVG Code</span>
                </>
              )}
            </button>
          </div>

          {/* Pre-Press Verification Checklist */}
          <div className="bg-zinc-950 p-4 border border-zinc-800 rounded-xl space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-white font-bold pb-2 border-b border-zinc-800">
              <ShieldCheck className="w-4 h-4 text-[#00AEEF]" />
              <span>Packaging Compliance Checklist</span>
            </div>

            <ul className="space-y-2 text-[11px] text-zinc-400">
              <li className="flex items-start gap-2">
                <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isPrintSafeSize ? 'text-emerald-400' : 'text-zinc-600'}`} />
                <span>
                  <strong>Physical Scale:</strong> {targetPrintWidthMm}mm width is {isPrintSafeSize ? 'above the 15mm' : 'below 15mm recommended'} minimum for smartphone camera lenses.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isHighErrorCorrection ? 'text-emerald-400' : 'text-amber-400'}`} />
                <span>
                  <strong>Error Correction Level ({errorCorrection}):</strong> {isHighErrorCorrection ? 'Protects against varnish/spot UV coverage' : 'Consider High (H) if applying metallic foil overlay'}.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Quiet Zone ({quietZoneMargin} modules):</strong> Ensures surrounding artwork does not bleed into corner alignment patterns.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Plate Ready:</strong> Vector SVG download can be placed directly on CAD dieline layers in Adobe Illustrator or InDesign.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
