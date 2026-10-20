/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { FlexiblePouchConsulting } from './components/FlexiblePouchConsulting';
import { QuoteCalculator } from './components/QuoteCalculator';
import { FinishingVisualizer } from './components/FinishingVisualizer';
import { AiPrintAdvisor } from './components/AiPrintAdvisor';
import { PortfolioGallery } from './components/PortfolioGallery';
import { CleaningBottleDevelopment } from './components/CleaningBottleDevelopment';
import { PrintMisSolutions } from './components/PrintMisSolutions';
import { ProcessAndLogistics } from './components/ProcessAndLogistics';
import { AboutAndLinkedIn } from './components/AboutAndLinkedIn';
import { RfqModal } from './components/RfqModal';
import { ExportCodeModal } from './components/ExportCodeModal';
import { StructuralCategory, AIPackagingRecommendation } from './types';
import { COMPANY_PROFILE } from './data/printingData';
import { ExternalLink, Mail, Package, Layers, Truck } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('top');
  const [isRfqModalOpen, setIsRfqModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [rfqInitialSpec, setRfqInitialSpec] = useState<any | null>(null);
  const [quoteInitialCategory, setQuoteInitialCategory] =
    useState<StructuralCategory | undefined>(undefined);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenRfqModal = (serviceName?: string) => {
    if (serviceName && typeof serviceName === 'string') {
      setRfqInitialSpec({
        category: serviceName,
        quantity: 3000,
        paperStock: '350gsm C1S Virgin SBS Board + Barrier Film',
        colorMode: '4C Offset + Soft-Touch Matte Coating',
        finishes: ['Step-and-Repeat Die Layout', 'Cape Systems Palletization'],
        totalEstimate: 'Custom Consulting & Production Quote',
        unitPrice: 'TBD',
        leadTime: '24-48h CNC Sample / 6-10d Print & Dispatch',
      });
    } else {
      setRfqInitialSpec(null);
    }
    setIsRfqModalOpen(true);
  };

  const handleOpenRfqModalWithSpec = (spec: {
    category: string;
    quantity: number;
    paperStock: string;
    colorMode: string;
    finishes: string[];
    totalEstimate: string;
    unitPrice: string;
    leadTime: string;
  }) => {
    setRfqInitialSpec(spec);
    setIsRfqModalOpen(true);
  };

  const handleSelectServiceForQuote = (category: StructuralCategory) => {
    setQuoteInitialCategory(category);
    handleNavigate('cad-lab');
  };

  const handleQuoteSimilarSpec = (item: any) => {
    setRfqInitialSpec({
      category: item.category,
      quantity: 3000,
      paperStock: item.specs?.paper || '350gsm C1S Virgin SBS',
      colorMode: item.specs?.color || '6C Extended Gamut Offset',
      finishes: item.specs?.finishing || ['High-Speed Bobst Die-Cutting'],
      totalEstimate: 'Based on Case Reference',
      unitPrice: 'TBD',
      leadTime: '6-10 Days Factory Dispatch',
    });
    setIsRfqModalOpen(true);
  };

  const handleApplyRecommendation = (rec: AIPackagingRecommendation) => {
    setRfqInitialSpec({
      category: rec.structuralStyle,
      quantity: 3000,
      paperStock: rec.materialSpec,
      colorMode: rec.fluteOrCaliper,
      finishes: [
        rec.primaryLaminateStructure?.recommendedLayers || 'Barrier Film',
        rec.secondaryFoldingCarton?.dieLayoutYield || 'Nested Die Layout',
        rec.tertiaryShipper?.corrugatedSpec || 'Export Shipper',
      ],
      totalEstimate: 'AI Optimized Consulting Spec',
      unitPrice: 'Optimized',
      leadTime: rec.estimatedProductionDays,
    });
    handleNavigate('cad-lab');
  };

  const handleOpenRfqWithAdvice = (rec: AIPackagingRecommendation) => {
    setRfqInitialSpec({
      category: rec.structuralStyle,
      quantity: 3000,
      paperStock: rec.materialSpec,
      colorMode: rec.fluteOrCaliper,
      finishes: [
        rec.primaryLaminateStructure?.recommendedLayers || 'Barrier Film',
        rec.secondaryFoldingCarton?.dieLayoutYield || 'Nested Die Layout',
        rec.tertiaryShipper?.corrugatedSpec || 'Export Shipper',
      ],
      totalEstimate: 'AI Optimized Consulting Spec',
      unitPrice: 'Optimized',
      leadTime: rec.estimatedProductionDays,
    });
    setIsRfqModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#0066E5] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenQuoteModal={() => handleOpenRfqModal()}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onNavigate={handleNavigate}
          onOpenQuoteModal={() => handleOpenRfqModal()}
        />

        {/* 4 Pillars of Packaging Consulting Hierarchy */}
        <ServicesSection
          onSelectForQuote={handleSelectServiceForQuote}
          onOpenRfqModal={handleOpenRfqModal}
        />

        {/* Primary Packaging: Flexible Pouches & Laminate Structure Consulting */}
        <FlexiblePouchConsulting
          onOpenConsultingModal={(spec) => handleOpenRfqModal(spec)}
        />

        {/* Secondary Packaging: Folding Carton Design & Step-and-Repeat Press Die Layout Lab */}
        <QuoteCalculator
          initialCategory={quoteInitialCategory}
          onOpenRfqModalWithSpec={handleOpenRfqModalWithSpec}
        />

        {/* Substrates, Drop Cushion Simulation & Dynamic Recycling QR Codes */}
        <FinishingVisualizer />

        {/* Print MIS Solutions, Workflow Automation & Shopfloor Analytics */}
        <PrintMisSolutions onOpenRfqModal={handleOpenRfqModal} />

        {/* AI Principal Packaging Consultant */}
        <AiPrintAdvisor
          onApplyRecommendation={handleApplyRecommendation}
          onOpenRfqModalWithAdvice={handleOpenRfqWithAdvice}
        />

        {/* Rigid Plastic Container: Household Cleaning Bottle Package Development */}
        <CleaningBottleDevelopment
          onOpenRfqModalWithSpec={handleOpenRfqModalWithSpec}
        />

        {/* Commercial Deployments & Case Studies */}
        <PortfolioGallery onQuoteSimilarSpec={handleQuoteSimilarSpec} />

        {/* Full-Service Printing, Automated Gluing & Global Export Dispatch Pipeline */}
        <ProcessAndLogistics onOpenRfqModal={() => handleOpenRfqModal('Factory Production Capacity Inquiry')} />

        {/* About LJ Packaging Consultants, Lab Credentials & FAQs */}
        <AboutAndLinkedIn onOpenRfqModal={() => handleOpenRfqModal('General Packaging Consulting Inquiry')} />
      </main>

      {/* Consulting Firm Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-12 text-zinc-400 font-mono text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-8 flex items-center shrink-0">
                <img
                  src="/logo.svg"
                  alt="LJ Global Service Logo"
                  className="h-7 w-auto object-contain"
                />
              </div>
              <p className="font-bold text-white text-sm tracking-wide">
                {COMPANY_PROFILE.name}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs">
              <a
                href={COMPANY_PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00AEEF] hover:underline flex items-center gap-1.5 font-bold transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <span className="text-zinc-700 hidden sm:inline" aria-hidden="true">|</span>
              <a
                href={`mailto:${COMPANY_PROFILE.email}`}
                className="text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-[#0066E5]" />
                <span>{COMPANY_PROFILE.email}</span>
              </a>
            </div>
          </div>

          {/* Preferred Folding Carton Manufacturing Partner */}
          <div className="mt-8 pt-6 border-t border-zinc-900">
            <div className="bg-zinc-900/60 border border-zinc-800/90 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-blue-500/10 text-[#00AEEF] border border-blue-500/30">
                    Preferred Manufacturer
                  </span>
                  <span className="text-white font-bold text-sm tracking-tight">
                    {COMPANY_PROFILE.preferredCartonManufacturer.name}
                  </span>
                </div>
                <span className="text-zinc-700 hidden sm:inline" aria-hidden="true">·</span>
                <span className="text-zinc-400 text-xs font-sans">
                  {COMPANY_PROFILE.preferredCartonManufacturer.title} ({COMPANY_PROFILE.preferredCartonManufacturer.specialty})
                </span>
              </div>

              <a
                href={COMPANY_PROFILE.preferredCartonManufacturer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00AEEF] hover:text-white hover:underline transition-colors shrink-0 group"
              >
                <span>IndiaMART Profile</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 text-[11px]">
            <p>
              © {new Date().getFullYear()} {COMPANY_PROFILE.name}. Primary Flexible Barrier Laminates, Secondary Folding Carton Die Layouts & Global Dispatch.
            </p>
            <p className="uppercase tracking-widest font-mono">
              Commercial 6-Color Offset · Bobst Novacut & Expertfold · ISPM-15 Certified Export Pallets
            </p>
          </div>
        </div>
      </footer>

      {/* RFQ & Consulting Audit Modal */}
      <RfqModal
        isOpen={isRfqModalOpen}
        onClose={() => setIsRfqModalOpen(false)}
        initialSpec={rfqInitialSpec}
      />

      {/* HTML, CSS & JavaScript Standalone Export Modal */}
      <ExportCodeModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
