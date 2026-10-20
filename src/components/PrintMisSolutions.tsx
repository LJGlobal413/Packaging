import React, { useState } from 'react';
import {
  Cpu,
  Database,
  BarChart3,
  Activity,
  UploadCloud,
  FileSpreadsheet,
  Layers,
  Settings,
  Users,
  Monitor,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sliders,
  ShieldCheck,
  FileText,
  LayoutDashboard,
  Workflow,
  TrendingUp,
  FileCheck,
  ChevronRight,
  Zap,
  Gauge,
  Boxes,
  HelpCircle,
} from 'lucide-react';

interface PrintMisSolutionsProps {
  onOpenRfqModal: (serviceName?: string) => void;
}

interface MisServiceModule {
  id: string;
  name: string;
  shortTag: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  keyFeatures: string[];
  capabilities: { title: string; detail: string }[];
  deliverables: string[];
  metricsSample: { label: string; value: string; change?: string };
}

const MIS_MODULES: MisServiceModule[] = [
  {
    id: 'mis-support',
    name: 'Print MIS Support & Infrastructure',
    shortTag: 'MIS Support',
    badge: 'Core Architecture',
    icon: Database,
    description:
      'End-to-end implementation, legacy database migration, 24/7 technical support, and ERP integration tailored specifically for packaging converters and commercial offset printers.',
    keyFeatures: [
      'Multi-plant database architecture & relational schema tuning',
      'Seamless migration from legacy spreadsheets or outdated print ERPs',
      'Custom API connectors for SAP, Oracle Netsuite, and accounting engines',
      'Guaranteed 99.9% uptime SLA with dedicated prepress/press specialists',
    ],
    capabilities: [
      { title: 'System Diagnostics', detail: 'Real-time database query indexing and bottleneck resolution for high-volume estimators.' },
      { title: 'Multi-Currency & Tax', detail: 'Automated tariff, customs harmonized codes, and cross-border currency conversion.' },
      { title: 'Role Access Control', detail: 'Granular permissions across CSRs, estimators, production planners, and shopfloor operators.' },
    ],
    deliverables: ['Custom Schema Blueprint', 'API Integration Suite', '24/7 Priority Support SLA', 'Operator Training Manuals'],
    metricsSample: { label: 'System Availability', value: '99.98%', change: '+0.4% QoQ' },
  },
  {
    id: 'workflow-automation',
    name: 'Workflow Automation & Prepress JDF/JMF',
    shortTag: 'Workflow Automation',
    badge: 'Hands-Free Pipeline',
    icon: Workflow,
    description:
      'Automated job intake to CTP plate generation. Eliminate repetitive file prep, auto-verify dieline CAD files, normalize artwork, and stream JDF/JMF job tickets directly to press consoles.',
    keyFeatures: [
      'JDF/JMF automated job ticketing straight to Heidelberg & Komori consoles',
      'Automated preflighting: bleed checking, die-cut strike verification & spot ink traps',
      'Rule-based nesting & step-and-repeat imposition based on sheet size',
      'Webhook events triggering customer proof delivery and plate room queues',
    ],
    capabilities: [
      { title: 'Hot-Folder Routing', detail: 'Zero-touch artwork file sorting by substrate type, press sheet size, and color profile.' },
      { title: 'Automated Imposition', detail: 'Dynamic nesting algorithms that calculate optimal blank placement in seconds.' },
      { title: 'Prepress Error Traps', detail: 'Automatic detection of RGB graphics, missing fonts, and insufficient bleed on carton scores.' },
    ],
    deliverables: ['Prepress Automation Engine', 'JDF Direct Press Bridge', 'Automated CTP Triggers', 'Zero-Touch Hot Folders'],
    metricsSample: { label: 'Prepress Touch Time', value: '-78%', change: 'Automated verification' },
  },
  {
    id: 'shopfloor-analytics',
    name: 'Shopfloor Data, IoT & OEE Analytics',
    shortTag: 'Shopfloor Data & Analytics',
    badge: 'Live Plant Telemetry',
    icon: Activity,
    description:
      'Direct press and finishing machine telemetry. Monitor real-time speed, count impressions, detect make-ready bottlenecks, and track Overall Equipment Effectiveness (OEE) across every shift.',
    keyFeatures: [
      'Real-time press impression counters & automated make-ready phase detection',
      'OEE tracking: Availability, Performance, and Quality yield calculations',
      'Downtime reason code logging via operator touchscreen kiosks',
      'Live paperboard and ink consumption tracking against job estimates',
    ],
    capabilities: [
      { title: 'Machine Telemetry', detail: 'Hardware sensors & PLC hooks on offset presses, Bobst die-cutters, and folder-gluers.' },
      { title: 'Make-Ready Optimization', detail: 'Identifies plate-hanging, washup, and die-registration delay patterns.' },
      { title: 'Shift Yield Audits', detail: 'Operator vs. operator performance benchmarks to uncover best practices.' },
    ],
    deliverables: ['IoT Machine Sensor Bridge', 'Touchscreen Floor Kiosks', 'Live OEE Dashboard', 'Shift Performance Reports'],
    metricsSample: { label: 'Press OEE Average', value: '84.6%', change: '+14.2% after implementation' },
  },
  {
    id: 'reports-insights',
    name: 'Reports & Executive Business Intelligence',
    shortTag: 'Reports & BI',
    badge: 'Decision Intelligence',
    icon: BarChart3,
    description:
      'Comprehensive financial and operational dashboards. Track job-by-job contribution margins, scrap paperboard tonnage, machine utilization rates, and customer profitability trends.',
    keyFeatures: [
      'Actual vs. estimated job costing: paperboard, inks, plates, and press hours',
      'Executive KPI scorecards: revenue per press hour, scrap percentage, on-time delivery',
      'Substrate inventory valuation and aging roll/sheet stock visibility',
      'Automated daily executive summary emails and custom PDF board reports',
    ],
    capabilities: [
      { title: 'Contribution Margin', detail: 'Instantly view gross profit per machine hour across folding cartons vs. flexible pouches.' },
      { title: 'Scrap & Waste Auditing', detail: 'Pinpoint which dieline styles generate excess trim waste or die-cutting scrap.' },
      { title: 'Customer Lifetime Value', detail: 'Track account re-order frequency, gross margins, and payment turnaround.' },
    ],
    deliverables: ['Executive KPI Portal', 'Automated Daily Financials', 'Material Scrap Reports', 'Custom Exportable CSV/PDFs'],
    metricsSample: { label: 'Margin Variance Caught', value: '$142k/yr', change: 'Real-time cost tracking' },
  },
  {
    id: 'data-upload',
    name: 'Data Upload & Migration Engine',
    shortTag: 'Data Upload',
    badge: 'Bulk Operations',
    icon: UploadCloud,
    description:
      'High-speed batch import utilities for customer SKU catalogues, paperboard inventory, structural CAD dieline libraries, and legacy pricing matrices without data corruption.',
    keyFeatures: [
      'Intelligent column mapping for Excel, CSV, and XML datasets',
      'Automated CAD dieline bulk ingestion with dimension extraction',
      'Material inventory sync: flute profiles, caliper specs, and roll widths',
      'Data sanitation: duplicate customer elimination and price normalization',
    ],
    capabilities: [
      { title: 'SKU Mass Import', detail: 'Upload 50,000+ packaging SKUs complete with barcoding, board calibers, and pack-outs in minutes.' },
      { title: 'Dieline Archive Parser', detail: 'Parses DXF, CF2, and PDF dielines to automatically populate length, width, and depth.' },
      { title: 'Vendor Price Sync', detail: 'Schedule automated nightly syncs with raw material paper mills and board suppliers.' },
    ],
    deliverables: ['Bulk Migration Suite', 'Data Validation Sandbox', 'Dieline Auto-Parser', 'Vendor Inventory Sync API'],
    metricsSample: { label: 'Import Speed', value: '10k SKUs/min', change: 'Zero manual re-entry' },
  },
  {
    id: 'price-catalog-upload',
    name: 'Price Catalog Upload & Cost Matrices',
    shortTag: 'Price Catalog Upload',
    badge: 'Dynamic Pricing',
    icon: FileSpreadsheet,
    description:
      'Centralized rate card management. Maintain complex paperboard per-ton prices, hourly press rates, spot UV/foil surcharges, and tiered volume discount tables with instant propagation.',
    keyFeatures: [
      'Multi-tiered volume pricing breaks (1,000 to 1,000,000+ units)',
      'Substrate cost matrices: SBS, CCNB, Kraft, and barrier film square-meter rates',
      'Tooling amortization: automatically factor die steel and embossing block costs',
      'Formulaic surcharges for pantone match, soft-touch laminates, and rush dispatch',
    ],
    capabilities: [
      { title: 'Paperboard Weight Calcs', detail: 'Dynamic square-inch to metric ton cost conversion with adjustable waste margins.' },
      { title: 'Machine Hour Rates', detail: 'Differentiated costing for 4-color vs. 6-color presses, die-cutters, and window patchers.' },
      { title: 'Margin Safeguards', detail: 'Automated alerts if market paper price increases erode target gross margins below 25%.' },
    ],
    deliverables: ['Master Rate Matrix', 'Dynamic Margin Guard', 'Tooling Amortization Rules', 'Multi-Tier Price Tables'],
    metricsSample: { label: 'Price Update Cycle', value: '< 2 mins', change: 'Instant plant-wide update' },
  },
  {
    id: 'rfqs-estimation',
    name: "Automated RFQ's & Instant Estimating",
    shortTag: "RFQ's & Estimating",
    badge: 'Instant Turnaround',
    icon: Zap,
    description:
      'Turn complex custom packaging requests into certified, production-ready price quotes within seconds. Factors sheet nesting, press speed, ink coverage, finishing passes, and freight.',
    keyFeatures: [
      'Parametric cost estimation based on folding carton length, width, depth, and board caliper',
      'Automatic calculation of press sheet size (e.g. 720×1020mm) and optimal nested die blanks',
      'Instant generation of customer-ready PDF proposals with 3D folding carton renders',
      'Multi-option quote comparison: 3k vs. 5k vs. 10k units with unit price savings curves',
    ],
    capabilities: [
      { title: 'Nested Blank Math', detail: 'Calculates exact sheet yield, trim waste percentage, and running press hours automatically.' },
      { title: 'Finishing Pass Logic', detail: 'Accumulates soft-touch matte lamination, spot UV, hot-stamp foil, and embossing passes.' },
      { title: 'Freight Matrix Estimator', detail: 'Estimates pallet counts, container cube utilization, and ocean/air freight charges.' },
    ],
    deliverables: ['Instant RFQ Calculation Engine', 'Branded PDF Quote Generator', 'Multi-Quantity Estimator', 'Client Approval Portal'],
    metricsSample: { label: 'Quote Turnaround', value: '45 seconds', change: 'Down from 24-48 hours' },
  },
  {
    id: 'customer-portal',
    name: 'Customer Portal & Proof Approvals',
    shortTag: 'Customer Portal',
    badge: 'Client Experience',
    icon: Users,
    description:
      'A modern white-labeled client portal where brand managers inspect 3D digital soft proofs, approve dieline dimensions, track live production milestones, and re-order in one click.',
    keyFeatures: [
      'Interactive 3D packaging proof visualizer with fold & score animations',
      'Digital sign-off system with timestamped legal approval audit trails',
      'Real-time job tracking: Prepress -> Printing -> Die-Cutting -> Dispatch',
      'Self-service SKU library for re-orders, artwork updates, and shipping archives',
    ],
    capabilities: [
      { title: 'Soft Proof Annotation', detail: 'Brand clients can pinpoint text changes or color corrections directly on the proof canvas.' },
      { title: 'Live Order Milestone Radar', detail: 'Shows exactly which machine bay the job is currently occupying.' },
      { title: 'Document Vault', detail: 'Houses all certificates of compliance, FDA declarations, and pallet manifests.' },
    ],
    deliverables: ['White-Labeled Client Portal', '3D Proof Approval Canvas', 'Milestone Tracking Feed', 'Instant 1-Click Re-Order'],
    metricsSample: { label: 'Proof Approval Time', value: '-65%', change: 'Eliminates email lag' },
  },
  {
    id: 'dashboard',
    name: 'Real-Time Executive Plant Dashboard',
    shortTag: 'Live Dashboard',
    badge: 'Control Tower',
    icon: LayoutDashboard,
    description:
      'A unified operational control tower giving directors and plant managers immediate visibility into ongoing print runs, press bottlenecks, machine capacity, and dispatch schedules.',
    keyFeatures: [
      'Live plant overview: active presses, idle lines, and make-ready status',
      'Color-coded job queue prioritized by dispatch deadlines and plate availability',
      'Real-time alert ticker: substrate shortages, proof rejections, and maintenance alerts',
      'Multi-screen display mode optimized for production office wall monitors',
    ],
    capabilities: [
      { title: 'Capacity Radar', detail: 'Displays upcoming machine load for the next 14 days to prevent delivery bottlenecks.' },
      { title: 'Press Status Ticker', detail: 'Current speed (sheets/hour), target impressions, and remaining time per job.' },
      { title: 'Dispatch Clock', detail: 'Counts down to container loading deadlines and freight carrier cutoffs.' },
    ],
    deliverables: ['Control Tower Wallboard', 'Mobile Management App', 'Live Alerts Engine', 'Machine Schedule Visualizer'],
    metricsSample: { label: 'On-Time Delivery', value: '98.7%', change: 'Real-time tracking' },
  },
  {
    id: 'management-tools',
    name: 'Management Tools & Plant Resource Scheduling',
    shortTag: 'Management Tools',
    badge: 'Operations Hub',
    icon: Settings,
    description:
      'Precision tools for plant managers: intelligent job gang-run scheduling, die & plate room inventory management, maintenance calendars, and dynamic operator shift balancing.',
    keyFeatures: [
      'Smart gang-printing optimizer: groups orders with matching paperboard and ink sets',
      'Physical cutting die & embossing block warehouse tracking with barcode locations',
      'Automated preventive maintenance scheduler based on machine impression counts',
      'Raw material replenishment triggers synced with live warehouse consumption',
    ],
    capabilities: [
      { title: 'Job Ganging Engine', detail: 'Combines multiple short-run cartons onto a single press sheet to slash setup costs.' },
      { title: 'Die Library Archive', detail: 'Logs number of impressions on each steel rule die and flags when re-ruling is required.' },
      { title: 'Labor & Shift Planner', detail: 'Balances operator skill sets across morning, swing, and night shifts.' },
    ],
    deliverables: ['Ganging Optimizer', 'Die Room Management Tool', 'Maintenance Scheduler', 'Labor Allocation Engine'],
    metricsSample: { label: 'Make-Ready Savings', value: '32%', change: 'Ganged production' },
  },
];

export const PrintMisSolutions: React.FC<PrintMisSolutionsProps> = ({
  onOpenRfqModal,
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('mis-support');
  const [activeTab, setActiveTab] = useState<'overview' | 'interactive-demo' | 'deliverables'>('overview');

  const activeModule = MIS_MODULES.find((m) => m.id === selectedModuleId) || MIS_MODULES[0];

  return (
    <section
      id="print-mis"
      className="py-20 bg-zinc-950 text-zinc-100 border-b border-zinc-800 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="max-w-4xl space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="text-[#00AEEF] font-semibold">Print MIS & Automation Infrastructure</span>
            <span aria-hidden="true">·</span>
            <span>Shopfloor Telemetry</span>
            <span aria-hidden="true">·</span>
            <span>JDF/JMF Prepress</span>
            <span aria-hidden="true">·</span>
            <span>Executive BI & Dashboards</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Print MIS Solutions & <br />
            <span className="text-[#0066E5]">Industrial Automation.</span>
          </h2>

          <p className="text-base text-zinc-400 leading-relaxed font-normal">
            Modernize your packaging plant and commercial press floor with specialized Print MIS advisory:
            Workflow Automation, Shopfloor Data & OEE Analytics, Executive Reports, Bulk Data & Price Catalog Uploads,
            Automated RFQs, Self-Service Customer Portals, Live Dashboards, and Advanced Plant Management Tools.
          </p>
        </div>

        {/* Top Horizontal Quick Service Pills for Instant Navigation */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-2.5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold mb-2 px-2 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#00AEEF]" />
            <span>Select Specialized Print MIS Capability:</span>
          </p>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {MIS_MODULES.map((mod) => {
              const isSelected = selectedModuleId === mod.id;
              const IconComp = mod.icon;
              return (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModuleId(mod.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#0066E5] text-white border-[#0066E5] shadow-xs scale-[1.01]'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-400'}`} />
                  <span>{mod.shortTag}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Column Deep-Dive Architecture Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 cols): Module Detail & Feature Breakdown */}
          <div className="lg:col-span-5 space-y-6 bg-zinc-900 border border-zinc-800 rounded-xl p-6 sm:p-7 shadow-xl">
            <div className="flex items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-blue-600/10 border border-blue-500/20 text-[#00AEEF] flex items-center justify-center shrink-0">
                  <activeModule.icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#00AEEF] font-bold">
                    {activeModule.badge}
                  </span>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">
                    {activeModule.name}
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed font-sans">
              {activeModule.description}
            </p>

            {/* Key Capabilities List */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Core Architectural Features:</span>
              </h4>
              <div className="space-y-2">
                {activeModule.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0066E5] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Performance Metric Highlight */}
            <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800/80 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-mono text-zinc-400">{activeModule.metricsSample.label}</p>
                <p className="text-2xl font-black font-mono text-white mt-0.5">{activeModule.metricsSample.value}</p>
              </div>
              {activeModule.metricsSample.change && (
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded">
                  {activeModule.metricsSample.change}
                </span>
              )}
            </div>

            {/* CTA to Inquiry */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onOpenRfqModal(`Print MIS: ${activeModule.name} Implementation`)}
                className="flex-1 py-3 px-4 bg-[#0066E5] hover:bg-[#0052B8] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Request {activeModule.shortTag} Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column (7 cols): Interactive Live Simulation & Capabilities Grid */}
          <div className="lg:col-span-7 space-y-6">
            {/* View Mode Switcher */}
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-md text-xs font-mono uppercase tracking-wider cursor-pointer transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-zinc-800 text-white font-bold border border-zinc-700'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Capabilities & Deep Dive
              </button>
              <button
                onClick={() => setActiveTab('interactive-demo')}
                className={`px-4 py-2 rounded-md text-xs font-mono uppercase tracking-wider cursor-pointer transition-colors flex items-center gap-1.5 ${
                  activeTab === 'interactive-demo'
                    ? 'bg-zinc-800 text-white font-bold border border-zinc-700'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-[#00AEEF]" />
                <span>Live Plant Console Preview</span>
              </button>
              <button
                onClick={() => setActiveTab('deliverables')}
                className={`px-4 py-2 rounded-md text-xs font-mono uppercase tracking-wider cursor-pointer transition-colors ${
                  activeTab === 'deliverables'
                    ? 'bg-zinc-800 text-white font-bold border border-zinc-700'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Deliverables & SLA
              </button>
            </div>

            {/* Tab 1: Detailed Capabilities Cards */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {activeModule.capabilities.map((cap, idx) => (
                    <div
                      key={idx}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-2 hover:border-zinc-700 transition-colors"
                    >
                      <div className="flex items-center gap-2 font-mono font-bold text-xs text-white">
                        <span className="w-5 h-5 rounded-full bg-blue-500/10 text-[#00AEEF] flex items-center justify-center text-[10px]">
                          0{idx + 1}
                        </span>
                        <span>{cap.title}</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                        {cap.detail}
                      </p>
                    </div>
                  ))}
                </div>

                {/* 10-Pillar Ecosystem Grid */}
                <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold flex items-center gap-2">
                      <Boxes className="w-4 h-4 text-[#0066E5]" />
                      <span>Full 10-Service Print MIS Stack:</span>
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-500">10 Modules Integrated</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
                    {MIS_MODULES.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedModuleId(m.id)}
                        className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                          m.id === activeModule.id
                            ? 'bg-blue-600/10 border-blue-500 text-white font-bold'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                        }`}
                      >
                        <p className="text-[10px] font-mono text-zinc-400 truncate">{m.badge}</p>
                        <p className="text-xs font-semibold truncate mt-0.5">{m.shortTag}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Interactive Live Console / Simulation */}
            {activeTab === 'interactive-demo' && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6 shadow-2xl font-mono text-xs">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-white uppercase tracking-wider">
                      Live Shopfloor MIS Telemetry & Automation Hub
                    </span>
                  </div>
                  <span className="text-zinc-500 text-[10px]">Real-Time Sync · JDF 2.0</span>
                </div>

                {/* Simulated Real-Time Metric Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-zinc-950 p-3 rounded border border-zinc-800">
                    <p className="text-[10px] text-zinc-500 uppercase">Active Heidelberg B1</p>
                    <p className="text-base font-bold text-white mt-1">14,200 sh/h</p>
                    <p className="text-[10px] text-emerald-400 mt-0.5">Running ECMA-A60.20</p>
                  </div>
                  <div className="bg-zinc-950 p-3 rounded border border-zinc-800">
                    <p className="text-[10px] text-zinc-500 uppercase">Bobst Die-Cutter</p>
                    <p className="text-base font-bold text-white mt-1">8,100 sh/h</p>
                    <p className="text-[10px] text-blue-400 mt-0.5">Job #7821-B Batch 3</p>
                  </div>
                  <div className="bg-zinc-950 p-3 rounded border border-zinc-800">
                    <p className="text-[10px] text-zinc-500 uppercase">Auto RFQs Queue</p>
                    <p className="text-base font-bold text-white mt-1">24 Processed</p>
                    <p className="text-[10px] text-purple-400 mt-0.5">Avg 42s Response</p>
                  </div>
                  <div className="bg-zinc-950 p-3 rounded border border-zinc-800">
                    <p className="text-[10px] text-zinc-500 uppercase">Customer Portal Proofs</p>
                    <p className="text-base font-bold text-white mt-1">18 Approved</p>
                    <p className="text-[10px] text-emerald-400 mt-0.5">0 Rejections Today</p>
                  </div>
                </div>

                {/* Live Job Table Preview */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                    Recent Automated Production Pipelines:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] uppercase">
                          <th className="py-2 pr-3">Job ID</th>
                          <th className="py-2 px-3">Product Description</th>
                          <th className="py-2 px-3">Substrate / Die Spec</th>
                          <th className="py-2 px-3">Yield / Speed</th>
                          <th className="py-2 pl-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60 text-[11px]">
                        <tr>
                          <td className="py-2.5 pr-3 text-blue-400 font-bold">#PK-9042</td>
                          <td className="py-2.5 px-3 text-white">Organic Coffee 340g Carton</td>
                          <td className="py-2.5 px-3 text-zinc-400">350gsm SBS · 8-Up Bobst</td>
                          <td className="py-2.5 px-3 text-zinc-300">91.4% · 13.8k/h</td>
                          <td className="py-2.5 pl-3 text-emerald-400">In Press</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 pr-3 text-blue-400 font-bold">#PK-9043</td>
                          <td className="py-2.5 px-3 text-white">Liquid Detergent Spout Pouch</td>
                          <td className="py-2.5 px-3 text-zinc-400">PET/ALU/PE Barrier Film</td>
                          <td className="py-2.5 px-3 text-zinc-300">Rotogravure 280m/min</td>
                          <td className="py-2.5 pl-3 text-purple-400">Laminating</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 pr-3 text-blue-400 font-bold">#PK-9044</td>
                          <td className="py-2.5 px-3 text-white">Pharma Diagnostic Mono Carton</td>
                          <td className="py-2.5 px-3 text-zinc-400">300gsm C1S · Tamper Lock</td>
                          <td className="py-2.5 px-3 text-zinc-300">12-Up Sheet · 94.2%</td>
                          <td className="py-2.5 pl-3 text-blue-400">Die-Cutting</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded flex items-center justify-between text-zinc-400 text-[11px]">
                  <span>Connected ERP Engine: Oracle NetSuite & SAP S/4HANA via REST Webhooks</span>
                  <span className="text-[#00AEEF]">Status: All Nodes Nominal</span>
                </div>
              </div>
            )}

            {/* Tab 3: Deliverables & Implementation SLA */}
            {activeTab === 'deliverables' && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <span>Implementation Deliverables for {activeModule.name}:</span>
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Each consulting deployment follows strict ISO 9001 and Lean 6-Sigma quality gates to ensure seamless adoption by press operators and CSR teams.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeModule.deliverables.map((deliv, idx) => (
                    <div key={idx} className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-blue-500/10 text-[#0066E5] flex items-center justify-center shrink-0 font-mono text-xs font-bold">
                        ✓
                      </div>
                      <span className="text-xs font-semibold text-zinc-200">{deliv}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-blue-950/20 border border-blue-500/30 rounded-lg text-xs text-zinc-300 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Full-Spectrum Packaging & Software Assurance</p>
                    <p className="text-zinc-400 mt-0.5 leading-relaxed">
                      We calibrate physical carton engineering (grain orientation, nested dies, flute compression) alongside digital MIS calculations so your estimated margins match real-world factory yields every single run.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
