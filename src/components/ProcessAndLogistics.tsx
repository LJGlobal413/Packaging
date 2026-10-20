import React from 'react';
import {
  Compass,
  Box,
  ShieldCheck,
  Cpu,
  Layers,
  Truck,
  CheckCircle2,
  Printer,
  ArrowRight,
} from 'lucide-react';
import { PRINT_DISPATCH_PHASES, COMPANY_PROFILE } from '../data/printingData';

interface ProcessAndLogisticsProps {
  onOpenRfqModal?: () => void;
}

export const ProcessAndLogistics: React.FC<ProcessAndLogisticsProps> = ({
  onOpenRfqModal,
}) => {
  return (
    <section
      id="pipeline"
      className="py-20 bg-zinc-950 text-zinc-100 border-b border-zinc-800 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="text-[#00AEEF] font-semibold">Consulting & Execution Roadmap</span>
            <span aria-hidden="true">·</span>
            <span>CAD to High-Speed Offset & Global Port</span>
            <span aria-hidden="true">·</span>
            <span>Zero Failure Tolerance</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Folding Carton Printing, <br />
            <span className="text-zinc-500">Automated Gluing & Global Dispatch.</span>
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            Our consulting firm takes responsibility from initial barrier modeling and dieline drafting all the way
            through high-speed offset lithography, automated Bobst folding-gluing, and international sea/air freight.
          </p>
        </div>

        {/* 5-Step Process Roadmap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRINT_DISPATCH_PHASES.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4 hover:border-zinc-700 transition-colors flex flex-col justify-between shadow-xs group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black font-mono text-[#00AEEF]">
                    {step.stepNumber}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800">
                    {step.timeline}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight">
                  {step.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  {step.description}
                </p>

                <div className="pt-2 text-[11px] font-mono text-zinc-400 space-y-1">
                  <p>
                    <strong className="text-zinc-300">QC Standard:</strong> {step.qcInspection}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 text-[11px] font-mono text-zinc-500">
                <span className="text-zinc-400 font-semibold">Machinery:</span>{' '}
                <span className="text-zinc-300">{step.equipment}</span>
              </div>
            </div>
          ))}

          {/* 6th Card: Factory Capabilities Banner */}
          <div className="bg-gradient-to-br from-blue-950/40 via-zinc-900 to-zinc-900 border border-blue-900/60 rounded-lg p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#00AEEF] uppercase font-bold tracking-wider">
                Production Floor Capacity
              </span>
              <h3 className="text-lg font-bold text-white">
                Automated Production Line & International Port Dispatch
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Operating high-speed commercial 6-color offset presses, Bobst Novacut automated blanking,
                and Bobst Expertfold folding-gluers running up to 35,000 units/hour.
              </p>
            </div>

            <div className="p-3 bg-zinc-950 rounded border border-zinc-800 text-xs font-mono space-y-1 text-zinc-300">
              <div className="flex justify-between">
                <span>Monthly Folding Cartons:</span>
                <span className="text-emerald-400 font-bold">5,000,000+</span>
              </div>
              <div className="flex justify-between">
                <span>Direct Container Port:</span>
                <span className="text-white font-bold">International Freight Hub</span>
              </div>
            </div>

            {onOpenRfqModal && (
              <button
                onClick={onOpenRfqModal}
                className="w-full py-2.5 bg-[#0066E5] hover:bg-[#0052B8] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer text-center"
              >
                Inquire Production Capacity
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
