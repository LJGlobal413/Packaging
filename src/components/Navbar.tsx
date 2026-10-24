import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Package, Box, Layers, Truck, Sparkles, Code2 } from 'lucide-react';
import { COMPANY_PROFILE } from '../data/printingData';

interface NavbarProps {
  onOpenQuoteModal: (initialService?: string, formType?: 'inquiry' | 'contract') => void;
  onOpenExportModal?: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

interface PackagingSubService {
  id: string;
  label: string;
  shortTag: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuoteModal,
  onOpenExportModal,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [packagingDropdownOpen, setPackagingDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const packagingServices: PackagingSubService[] = [
    { id: 'primary-packaging', label: 'Primary: Flexible Pouches', shortTag: 'Barrier Pouches & Films', icon: Package },
    { id: 'cad-lab', label: 'Secondary: Cartons & Dies', shortTag: 'Folding Carton CAD Dielines', icon: Box },
    { id: 'cleaning-bottles', label: 'Household Cleaning Bottles', shortTag: 'Chemical Containers & Spouts', icon: Sparkles },
    { id: 'structures', label: 'Tertiary: Transit Shippers', shortTag: 'Corrugated Shippers & Pallets', icon: Layers },
    { id: 'pipeline', label: 'Commercial Print & Dispatch', shortTag: 'Offset Printing & Freight', icon: Truck },
  ];

  const directNavItems = [
    { id: 'print-mis', label: 'Print MIS & Automation' },
    { id: 'ai-engineer', label: 'AI Consultant' },
    { id: 'about', label: 'About & Lab' },
  ];

  const isPackagingActive = packagingServices.some((s) => s.id === activeSection);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPackagingDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200 text-zinc-900 shadow-2xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark */}
        <button
          onClick={() => onNavigate('top')}
          className="text-left cursor-pointer group flex items-center shrink-0 min-w-max"
          aria-label="LJ Packaging Consulting Home"
        >
          <div className="h-[34px] sm:h-[38px] flex items-center shrink-0">
            <img
              src="/logo.svg"
              alt="LJ Global Service Logo"
              className="h-[34px] sm:h-[38px] w-auto object-contain"
            />
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-semibold uppercase tracking-wider text-zinc-600">
          {/* Merged Packaging Solutions Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setPackagingDropdownOpen(true)}
            onMouseLeave={() => setPackagingDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setPackagingDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer py-2 whitespace-nowrap ${
                isPackagingActive
                  ? 'text-[#0066E5] font-bold border-b-2 border-[#0066E5]'
                  : 'hover:text-zinc-950'
              }`}
            >
              <span>Packaging Solutions</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  packagingDropdownOpen ? 'rotate-180 text-[#0066E5]' : 'text-zinc-400'
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {packagingDropdownOpen && (
              <div className="absolute top-full left-0 w-72 pt-2 z-50">
                <div className="bg-white border border-zinc-200 rounded-xl shadow-xl p-2 font-sans space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold border-b border-zinc-100">
                    Packaging Hierarchy & Development
                  </div>
                  {packagingServices.map((srv) => {
                    const isSelected = activeSection === srv.id;
                    const IconComp = srv.icon;
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => {
                          onNavigate(srv.id);
                          setPackagingDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50 text-[#0066E5] font-bold'
                            : 'hover:bg-zinc-50 text-zinc-700 hover:text-zinc-950'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-md bg-blue-50 text-[#0066E5] flex items-center justify-center shrink-0">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold leading-tight truncate">
                            {srv.label}
                          </p>
                          <p className="text-[10px] text-zinc-500 font-normal truncate mt-0.5">
                            {srv.shortTag}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Direct Nav Items */}
          {directNavItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`transition-colors cursor-pointer py-1 whitespace-nowrap ${
                  isActive
                    ? 'text-[#0066E5] font-bold border-b-2 border-[#0066E5]'
                    : 'hover:text-zinc-950'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          {onOpenExportModal && (
            <button
              onClick={onOpenExportModal}
              className="group bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider px-3 py-2.5 rounded-lg border border-slate-300 transition-all duration-150 cursor-pointer flex items-center gap-1.5 shadow-2xs hover:shadow-xs active:scale-[0.98]"
              title="View, copy, and download pure standalone HTML, CSS, and JavaScript files"
            >
              <Code2 className="w-3.5 h-3.5 text-[#0066E5]" />
              <span>HTML / CSS</span>
            </button>
          )}

          <button
            onClick={() => onOpenQuoteModal('Commercial Packaging Supply Agreement', 'contract')}
            className="group bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-lg border border-emerald-300 transition-all duration-150 cursor-pointer flex items-center gap-1.5 shadow-2xs hover:shadow-xs active:scale-[0.98]"
            title="Submit Commercial Supply Agreement, MSA, or Volume Call-Off Contract"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Contract Agreement</span>
          </button>

          <button
            onClick={() => onOpenQuoteModal('General Packaging Inquiry', 'inquiry')}
            className="group bg-[#0066E5] hover:bg-[#0052B8] text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all duration-150 cursor-pointer flex items-center gap-2 shadow-sm hover:shadow active:scale-[0.98]"
          >
            <span>Submit Inquiry</span>
            <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-700 hover:text-zinc-950 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-zinc-200 px-6 py-4 space-y-3 font-mono text-xs max-h-[80vh] overflow-y-auto">
          <div className="pb-1 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            Packaging Solutions
          </div>
          <div className="pl-2 border-l-2 border-blue-500 space-y-2">
            {packagingServices.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-1.5 font-bold uppercase text-zinc-700 hover:text-[#0066E5]"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-zinc-100 space-y-2">
            {directNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 font-bold uppercase text-zinc-700 hover:text-[#0066E5]"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-zinc-100 space-y-2">
            {onOpenExportModal && (
              <button
                onClick={() => {
                  onOpenExportModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold uppercase text-center rounded-lg border border-slate-300 flex items-center justify-center gap-2"
              >
                <Code2 className="w-4 h-4 text-[#0066E5]" />
                <span>Export HTML / CSS / JS</span>
              </button>
            )}

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  onOpenQuoteModal('Commercial Packaging Supply Agreement', 'contract');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 font-bold uppercase text-center rounded-lg text-xs"
              >
                Contract Form
              </button>
              <button
                onClick={() => {
                  onOpenQuoteModal('General Packaging Inquiry', 'inquiry');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-[#0066E5] hover:bg-[#0052B8] text-white font-bold uppercase text-center rounded-lg text-xs shadow-sm"
              >
                Submit Inquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
