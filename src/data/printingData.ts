import {
  StructuralCategory,
  StructuralSolutionItem,
  CadDielinePreset,
  FlexiblePouchRecommendation,
  FoldingCartonDieSpec,
  TertiaryTransitSpec,
  PrintAndDispatchStep,
  PackagingHierarchyLevel,
} from '../types';

export const CONSULTING_HERO_IMAGE = '/src/assets/images/indian_packaging_hero_1790137892514.jpg';
export const FLEXIBLE_POUCH_IMAGE = '/src/assets/images/indian_pouch_lab_1790137902492.jpg';
export const CAD_LAB_IMAGE = '/src/assets/images/indian_cad_engineer_1790137915834.jpg';
export const FOLDING_CARTON_IMAGE = '/src/assets/images/indian_pharma_carton_1790137926713.jpg';
export const CORRUGATED_IMAGE = '/src/assets/images/indian_logistics_hub_1790137938511.jpg';
export const MOLDED_PULP_IMAGE = '/src/assets/images/molded_pulp_engineering_1790132928736.jpg';
export const RIGID_BOX_IMAGE = '/src/assets/images/rigid_box_engineering_1790132909329.jpg';
export const CLEANING_BOTTLE_CAD_IMAGE = '/src/assets/images/cleaner_cad_dev_1790138974766.jpg';
export const CLEANING_BOTTLE_LAB_IMAGE = '/src/assets/images/cleaner_lab_test_1790138985930.jpg';
export const CLEANING_BOTTLE_LINEUP_IMAGE = '/src/assets/images/cleaner_lineup_dev_1790138997401.jpg';

// Backwards compatibility image export
export const HERO_IMAGE = CONSULTING_HERO_IMAGE;
export const CORRUGATED_MAILER_IMAGE = CORRUGATED_IMAGE;

export const COMPANY_PROFILE = {
  name: 'LJ Packaging Consulting Group',
  division: 'Primary, Secondary & Tertiary Packaging Engineering & Dispatch',
  tagline: 'End-to-End Packaging Advisory: Flexible Laminates, Folding Carton Die Layouts, Commercial Printing & Global Export Dispatch',
  email: 'ljservicedg@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/lj-global-service-4aa247424/',
  preferredCartonManufacturer: {
    name: 'Veena Graphics',
    title: 'Preferred Folding Carton Manufacturer',
    specialty: 'Printed Mono Carton Boxes, Die-Cut & Lock-Bottom Folding Cartons',
    url: 'https://www.indiamart.com/veena-graphics/',
  },
  location: 'Dongguan CAD & Printing Hub · Global Export Center',
  phone: '+86 769 8890 XXXX (Packaging Consulting Dept)',
  establishedYear: '2014',
  stats: [
    { label: 'Packaging Audits Completed', value: '3,200+', detail: 'Primary barrier, folding carton & shipper optimizations' },
    { label: 'CNC Sample & Die Turnaround', value: '24-48h', detail: 'Rapid knife-cut carton dummies & pouch prototypes' },
    { label: 'Press Sheet Yield Optimization', value: 'Up to 92%', detail: 'Step-and-repeat nested Bobst die layout engineering' },
    { label: 'Annual Mass Dispatch', value: '60M+ Units', detail: 'Commercial offset printing, folding-gluing & international sea/air freight' },
  ],
  coreValues: [
    {
      title: 'Full-Spectrum Packaging Hierarchy',
      description: 'We consult on the entire packaging ecosystem: direct-contact primary flexible laminates, retail folding cartons with nested die layouts, and corrugated tertiary shipping palletization.',
    },
    {
      title: 'Laminate Science & Barrier Engineering',
      description: 'Calculated barrier selection balancing Oxygen Transmission Rates (OTR), Water Vapor Transmission Rates (WVTR), puncture resistance, and recyclable mono-material compliance.',
    },
    {
      title: 'Precision Die Layout & Grain Engineering',
      description: 'Parametric CAD dielines engineered for automated cartoning. We calibrate grain direction along critical fold lines to eliminate corner cracking and optimize sheet nesting yields.',
    },
    {
      title: 'Commercial Printing & Global Dispatch',
      description: 'We don’t stop at blueprints. We manage high-speed commercial offset printing, Bobst die-cutting, optical glue inspection, pallet optimization, and customs export dispatch.',
    },
  ],
  linkedinProfileHighlights: [
    'Consulting Across Primary (Flexible), Secondary (Carton) & Tertiary (Shipper) Packaging',
    'Specialists in High-Barrier Laminate Films & Recyclable Mono-PE/PP Pouches',
    'ArtiosCAD & Esko Certified Dielines with Step-and-Repeat Press Die Layouts',
    'G7 Master Certified Color Calibration & High-Speed Inline Finishing',
    'Full Factory Production Execution with Global Container Port Dispatch',
  ],
};

// Hierarchy Services
export const PACKAGING_HIERARCHY_SERVICES = [
  {
    level: 'primary' as PackagingHierarchyLevel,
    title: 'Primary Packaging: Flexible Pouches & Laminates',
    subtitle: 'Direct product contact barrier films, stand-up pouches, sachets & recyclable mono-materials',
    iconName: 'Package',
    description:
      'Engineered multi-layer laminate structures tailored to your product chemistry (moisture-sensitive dry powders, coffee beans, oily snacks, cosmetic serums, or retort foods). We calculate exact layer gauges (PET, AL, BOPA, EVOH, LLDPE, CPP) to guarantee target shelf life.',
    deliverables: [
      'Layer-by-layer laminate thickness & barrier specifications (OTR & WVTR)',
      'Stand-Up Doyen, Flat-Bottom Box, 3-Side Seal & Spout Pouch designs',
      'Seal initiation temperature & hot-tack strength validation',
      'How2Recycle Store Drop-off & APR-compliant Mono-PE recyclable alternatives',
    ],
    image: FLEXIBLE_POUCH_IMAGE,
  },
  {
    level: 'secondary' as PackagingHierarchyLevel,
    title: 'Secondary Packaging: Folding Cartons & Die Layouts',
    subtitle: 'Retail presentation cartons, parametric CAD dielines & press sheet nesting optimization',
    iconName: 'Layers',
    description:
      'We engineer precision folding carton geometries (ECMA A20.20, ECMA A60.20 crash-lock, reverse tuck) calibrated for high-speed automated packaging lines. We deliver step-and-repeat press die layouts that align paper grain direction and maximize substrate yield.',
    deliverables: [
      'Zero-tolerance ArtiosCAD vector dielines with calibrated crease allowances',
      'Step-and-repeat nested dieboard layouts for 720×1020mm & 1060mm press sheets',
      'Grain direction analysis to prevent cracked hinges and bowed carton faces',
      '24-hour unprinted CNC knife mockups for physical product fit verification',
    ],
    image: FOLDING_CARTON_IMAGE,
  },
  {
    level: 'tertiary' as PackagingHierarchyLevel,
    title: 'Tertiary Packaging: Shippers & Palletization',
    subtitle: 'Corrugated master cartons, crush-proof stacking & export pallet optimization',
    iconName: 'Box',
    description:
      'Protect your product through rough warehouse and overseas shipping. We engineer custom corrugated master shipping cartons designed to withstand high stacking loads, moisture, and long shipping journeys without crushing.',
    deliverables: [
      'Heavy-duty compression testing to prevent box crushing in tall stacks',
      'Optimized pallet packing layouts to eliminate wasted shipping space',
      'Custom protective sizing with zero interior empty space',
      'Drop and vibration transit protection certification',
    ],
    image: CORRUGATED_IMAGE,
  },
  {
    level: 'production' as PackagingHierarchyLevel,
    title: 'Manufacturing Execution: Printing, Assembly & Global Dispatch',
    subtitle: 'High-speed offset printing, automated folding-gluing & international sea/air freight',
    iconName: 'Truck',
    description:
      'Our consulting translates seamlessly into factory floor execution. We handle pre-press G7 color proofing, high-speed commercial offset lithography, automated Bobst die-cutting and folding-gluing, comprehensive quality control, and export container freight dispatch.',
    deliverables: [
      '6-Color / 7-Color Extended Gamut Offset Printing with inline spot coatings',
      'Bobst Novacut automated blanking & Expertfold gluing with barcode verification',
      'Rigid box corner wrapping and automated window patching lines',
      'Full export documentation, fumigated pallets, and international container port shipping',
    ],
    image: CAD_LAB_IMAGE,
  },
];

// Flexible Pouch & Barrier Laminate Catalog
export const FLEXIBLE_LAMINATE_PRESETS: FlexiblePouchRecommendation[] = [
  {
    id: 'coffee-high-barrier',
    name: 'Coffee & Roasted Whole Bean Barrier Pouch',
    pouchType: 'Side-Gusset Valve Pouch',
    targetProductCategory: 'Coffee, Teas & Roasted Botanicals (Aroma & CO2 Sensitive)',
    barrierPerformance: {
      otr: '< 0.5 cc/m²/day',
      wvtr: '< 0.5 g/m²/day',
      lightShield: '98% Metallized UV Block',
      sealInitiationTemp: '115°C - 135°C',
    },
    laminateStructure: [
      { layerOrder: 1, material: 'Matte BOPP', thicknessMicron: 19, functionalRole: 'Tactile premium matte finish, reverse rotogravure/flexo printing surface' },
      { layerOrder: 2, material: 'Metallized PET (Met-PET)', thicknessMicron: 12, functionalRole: 'High barrier against oxygen, moisture, and ultraviolet degradation' },
      { layerOrder: 3, material: 'LLDPE Sealant', thicknessMicron: 80, functionalRole: 'Hermetic thermal seal layer, puncture resistance against sharp bean edges' },
    ],
    totalThicknessMicron: 111,
    recommendedClosure: 'One-Way Degassing Valve + Pocket Tear Zipper',
    sustainabilityStatus: 'High Barrier Multi-Layer (Recyclable PE Alternative Available)',
    consultingNotes: 'Degassing valve vents internal CO2 release without allowing atmospheric O2 entry, preserving crema oils for up to 18 months.',
  },
  {
    id: 'retort-liquid-spout',
    name: 'Retort Liquid, Soup & Wet Food Spout Pouch',
    pouchType: 'Retort Spout Pouch',
    targetProductCategory: 'Sauces, Broths, Ready-to-Eat Meals & Wet Pet Food (Sterilization 121°C)',
    barrierPerformance: {
      otr: '< 0.05 cc/m²/day',
      wvtr: '< 0.05 g/m²/day',
      lightShield: '100% Total Foil Block',
      sealInitiationTemp: '160°C - 185°C',
    },
    laminateStructure: [
      { layerOrder: 1, material: 'PET (Heat-Set)', thicknessMicron: 12, functionalRole: 'Thermal resistance during high-pressure autoclave retort cycle (121°C / 30 min)' },
      { layerOrder: 2, material: 'BOPA (Oriented Nylon)', thicknessMicron: 15, functionalRole: 'Superior flex-crack resistance and burst protection under hydraulic drop' },
      { layerOrder: 3, material: 'Aluminum Foil (AL)', thicknessMicron: 9, functionalRole: 'Absolute zero transmission barrier against light, oxygen, and vapor' },
      { layerOrder: 4, material: 'Cast Polypropylene (R-CPP)', thicknessMicron: 70, functionalRole: 'High-temperature retortable sealant with oil and acid resistance' },
    ],
    totalThicknessMicron: 106,
    recommendedClosure: 'Corner Tamper-Evident HDPE Spout & Cap',
    sustainabilityStatus: 'Heavy Duty Barrier (Replaces Metal Tin Cans & Glass Jars, 85% Lighter Freight)',
    consultingNotes: 'BOPA layer prevents pinholing in the aluminum foil during shipping vibration, maintaining a shelf life of up to 24 months without refrigeration.',
  },
  {
    id: 'mono-pe-recyclable',
    name: '100% Recyclable Mono-PE Barrier Stand-Up Pouch',
    pouchType: 'Stand-Up Doyen Pouch',
    targetProductCategory: 'Dry Granules, Powders, Pet Kibble, Confectionery & Eco Beauty Refills',
    barrierPerformance: {
      otr: '< 1.2 cc/m²/day',
      wvtr: '< 1.0 g/m²/day',
      lightShield: 'Transparent Clear Barrier',
      sealInitiationTemp: '105°C - 120°C',
    },
    laminateStructure: [
      { layerOrder: 1, material: 'MDO-PE (Machine Direction Oriented PE)', thicknessMicron: 25, functionalRole: 'Stiff, high-clarity print carrier with high heat resistance for sealing jaw contact' },
      { layerOrder: 2, material: 'High-Barrier EVOH Coating', thicknessMicron: 3, functionalRole: 'Ultra-thin oxygen barrier layer that does not contaminate the PE recycling stream' },
      { layerOrder: 3, material: 'Low-Initiation Metallocene LLDPE', thicknessMicron: 65, functionalRole: 'Broad thermal seal window, strong seal integrity through powder contamination' },
    ],
    totalThicknessMicron: 93,
    recommendedClosure: '100% PE Mono-Material Press-to-Close Zipper',
    sustainabilityStatus: 'RIC #4 LDPE Curbside / How2Recycle Store Drop-off Certified',
    consultingNotes: 'All-polyethylene structure complies with CEFLEX and APR design guides, allowing brands to claim 100% circular recyclable packaging.',
  },
  {
    id: 'sachet-pharma-cosmetic',
    name: 'Pharma & Serum Hermetic Sachet Laminate',
    pouchType: 'Three-Side Seal Sachet',
    targetProductCategory: 'Cosmetic Serums, Diagnostic Reagents, Single-Dose Powders & Creams',
    barrierPerformance: {
      otr: '< 0.01 cc/m²/day',
      wvtr: '< 0.01 g/m²/day',
      lightShield: '100% Total Foil Block',
      sealInitiationTemp: '120°C - 140°C',
    },
    laminateStructure: [
      { layerOrder: 1, material: 'PET', thicknessMicron: 12, functionalRole: 'High chemical resistance and dimensional stability' },
      { layerOrder: 2, material: 'Aluminum Foil (AL)', thicknessMicron: 7, functionalRole: 'Hermetic zero-leakage barrier against active chemical evaporation' },
      { layerOrder: 3, material: 'Surlyn / Special LLDPE', thicknessMicron: 40, functionalRole: 'Fast-seal hot-tack adhesive that seals cleanly through liquid splashes on fast form-fill-seal lines' },
    ],
    totalThicknessMicron: 59,
    recommendedClosure: 'V-Cut Laser Easy-Tear Perforation Notch',
    sustainabilityStatus: 'Maximum Shelf Stability & Product Active Potency Preservation',
    consultingNotes: 'Surlyn ionomer sealant prevents active botanical oils and surfactants from delaminating the aluminum foil layer.',
  },
];

// Secondary Packaging: Folding Carton & Press Die Layout Presets
export const FOLDING_CARTON_DIE_PRESETS: FoldingCartonDieSpec[] = [
  {
    id: 'ecma-a6020-crash',
    standardCode: 'ECMA A60.20',
    name: 'Crash-Lock Auto Bottom Carton with Tuck Top',
    cartonStyle: 'High-Speed Auto-Erecting Folding Carton',
    boardStock: '350gsm (20pt) C1S Solid Bleached Sulfate (SBS)',
    caliperPt: 20,
    caliperMm: 0.52,
    recommendedGrainDirection: 'Machine grain parallel to 4 main vertical crease rules (prevents corner bursting)',
    creaseAllowanceMm: 0.52,
    glueTabAllowanceMm: 15,
    dieLayoutNesting: {
      pressSheetSize: '720 × 1020 mm (Standard B1 Press Sheet)',
      nestingCount: 6,
      substrateUtilizationYield: 86.8,
      gripperMarginMm: 12,
      gutterBetweenBlanksMm: 4,
    },
    folderGluerRunSpeed: 'Up to 35,000 cartons/hour on Bobst Expertfold 110',
    bestApplications: ['Cosmetic Bottles', 'Pharmaceutical Syrups', 'Nutraceuticals', 'Retail Electronics'],
  },
  {
    id: 'ecma-a2020-ste',
    standardCode: 'ECMA A20.20',
    name: 'Straight Tuck End (STE) with 5th Panel Display Hanger',
    cartonStyle: 'Retail Pegboard Hanging Carton with Tuck Flaps',
    boardStock: '400gsm (24pt) High-Stiffness Virgin SBS Board',
    caliperPt: 24,
    caliperMm: 0.61,
    recommendedGrainDirection: 'Vertical grain alignment along box height to resist pegboard sag',
    creaseAllowanceMm: 0.6,
    glueTabAllowanceMm: 14,
    dieLayoutNesting: {
      pressSheetSize: '720 × 1020 mm (Standard B1 Press Sheet)',
      nestingCount: 8,
      substrateUtilizationYield: 89.2,
      gripperMarginMm: 12,
      gutterBetweenBlanksMm: 3,
    },
    folderGluerRunSpeed: 'Up to 42,000 cartons/hour on Bobst Novacut line',
    bestApplications: ['Hardware Accessories', 'Earbuds & Audio Tech', 'Medical Diagnostic Kits', 'Stationery'],
  },
  {
    id: 'ecma-a2010-rte',
    standardCode: 'ECMA A20.10',
    name: 'Reverse Tuck End (RTE) Interlocking Blank Layout',
    cartonStyle: 'Maximized Yield Standard Folding Box',
    boardStock: '300gsm (18pt) Folding Boxboard (FBB / GC1)',
    caliperPt: 18,
    caliperMm: 0.45,
    recommendedGrainDirection: 'Cross-direction grain balancing tuck-in tab friction and side-wall rigidity',
    creaseAllowanceMm: 0.45,
    glueTabAllowanceMm: 13,
    dieLayoutNesting: {
      pressSheetSize: '720 × 1020 mm (Standard B1 Press Sheet)',
      nestingCount: 12,
      substrateUtilizationYield: 91.5,
      gripperMarginMm: 10,
      gutterBetweenBlanksMm: 3,
    },
    folderGluerRunSpeed: 'Up to 50,000 cartons/hour on automated high-speed line',
    bestApplications: ['High-Volume Consumer Goods', 'Confectionery', 'Cosmetic Tubes', 'Daily FMCG'],
  },
];

// Commercial Print & Global Dispatch Execution Roadmap
export const PRINT_DISPATCH_PHASES: PrintAndDispatchStep[] = [
  {
    stepNumber: '01',
    title: 'Consulting & Structural CAD Architecture',
    timeline: 'Day 1 - 2',
    description:
      'Our consulting engineers evaluate your primary barrier, secondary folding carton, and tertiary shipper as a unified system. We deliver 3D CAD dielines, laminate barrier calculations, and step-and-repeat press die layouts.',
    qcInspection: 'Tolerance check ±0.05mm, fold-loss clearance audit, barrier OTR/WVTR model simulation',
    equipment: 'ArtiosCAD 22, SolidWorks 3D, Esko DeskPack & Esko Studio 3D Visualizer',
  },
  {
    stepNumber: '02',
    title: 'CNC Knife Dummy Prototyping & Seal Testing',
    timeline: 'Day 2 - 3',
    description:
      'We fabricate unprinted white dummy folding cartons on digital flatbed knife tables and sample flexible pouch mockups with calibrated heat seals for physical product fit and transit verification without tooling charges.',
    qcInspection: 'Heat seal burst test (ASTM F1140), caliper micrometer verification, product snug-fit test',
    equipment: 'Kongsberg C-Series & Zünd G3 digital cutters, LabThink heat seal tester',
  },
  {
    stepNumber: '03',
    title: 'Pre-Press G7 Color Proofing & Laser Steel Rule Dieboards',
    timeline: 'Day 3 - 5',
    description:
      'High-power CO2 laser systems cut steel rule dieboards with micro-ground serrated cutting rules and Pertinax counter channels. Pre-press files are calibrated to ISO 12647-2 / G7 Master standard with GMG color management.',
    qcInspection: '100% digital overlay of dieboard CAD vs art file, spectrophotometer Delta-E < 1.5 check',
    equipment: 'RotoMetrics Laser Dieboard Burner, Pertinax channel routing, Epson Stylus Pro proofers',
  },
  {
    stepNumber: '04',
    title: 'High-Speed Offset Printing, Die-Cutting & Automated Gluing',
    timeline: 'Day 5 - 8',
    description:
      'Offset lithography on high-speed commercial 6-color offset presses with inline aqueous soft-touch coating. Sheets pass through Bobst Novacut automated die-cutters, followed by high-speed crash-lock folding and gluing with optical barcode verification.',
    qcInspection: 'Inline camera scanning for glue bead consistency, Sutherland ink rub test (ASTM D5264)',
    equipment: 'Commercial 6-Color Offset Press (+ Coater), Bobst Novacut 106 E, Bobst Expertfold 110',
  },
  {
    stepNumber: '05',
    title: 'Cape Systems Palletization, Export QC & International Dispatch',
    timeline: 'Day 8 - 10',
    description:
      'Finished folding cartons and flexible pouches are packed into B-flute master shippers, strapped onto fumigated export pallets (ISPM-15) with edge protectors, and dispatched directly through international export ports via sea container or air courier.',
    qcInspection: 'Pre-shipment strict quality audit, crush resistance verification, export documentation',
    equipment: 'Cape Systems 3D Palletization, Lantech automated stretch wrapper, Global Cargo Freight Hub',
  },
];

// Presets and calculations compatibility
export const CAD_DIELINE_PRESETS: CadDielinePreset[] = [
  {
    id: 'ecma-a6020',
    name: 'ECMA A60.20 Crash-Lock Auto Bottom Carton',
    standardCode: 'ECMA A60.20',
    category: 'folding-carton',
    defaultLengthMm: 95,
    defaultWidthMm: 65,
    defaultDepthMm: 175,
    defaultCaliperMm: 0.52,
    defaultFlute: 'SBS 20pt',
    description: 'Premier retail folding box engineered with pre-glued diagonal fold lines for instant snap-erect assembly on fulfillment lines.',
    assemblyMethod: 'Pre-glued 3-point factory join; snap-erects in under 0.8 seconds',
    tearStripCompatible: true,
  },
  {
    id: 'fefco-0427',
    name: 'FEFCO 0427 Roll End Tuck Front (RETF) Mailer',
    standardCode: 'FEFCO 0427',
    category: 'corrugated',
    defaultLengthMm: 240,
    defaultWidthMm: 160,
    defaultDepthMm: 70,
    defaultCaliperMm: 1.5,
    defaultFlute: 'E-Flute',
    description: 'Structural corrugated e-commerce mailer box with self-locking roll-over side walls and friction tuck front closure.',
    assemblyMethod: 'Manual fold-and-tuck (No adhesive or tape required)',
    tearStripCompatible: true,
  },
  {
    id: 'ecma-a2020',
    name: 'ECMA A20.20 Straight Tuck End (STE)',
    standardCode: 'ECMA A20.20',
    category: 'folding-carton',
    defaultLengthMm: 80,
    defaultWidthMm: 45,
    defaultDepthMm: 140,
    defaultCaliperMm: 0.5,
    defaultFlute: 'SBS 20pt',
    description: 'Classic cosmetic folding carton where both top and bottom closure flaps tuck from the front to the rear.',
    assemblyMethod: 'Single longitudinal side seam glue tab with manual or automated tuck closures',
    tearStripCompatible: false,
  },
  {
    id: 'fefco-0201',
    name: 'FEFCO 0201 Regular Slotted Container (RSC Master Shipper)',
    standardCode: 'FEFCO 0201',
    category: 'corrugated',
    defaultLengthMm: 380,
    defaultWidthMm: 270,
    defaultDepthMm: 240,
    defaultCaliperMm: 3.2,
    defaultFlute: 'B-Flute 44 ECT',
    description: 'High-volume export master shipper where outer flaps meet at the center line for taped or hot-melt container dispatch.',
    assemblyMethod: 'Manufacturer joint glued/stitched; top and bottom sealed with tape or strapping',
    tearStripCompatible: false,
  },
  {
    id: 'rigid-neck-box',
    name: 'Two-Piece Telescope Rigid Shoulder Box',
    standardCode: 'ISO-RIGID-02',
    category: 'rigid-box',
    defaultLengthMm: 180,
    defaultWidthMm: 130,
    defaultDepthMm: 55,
    defaultCaliperMm: 2.0,
    defaultFlute: '1800gsm Greyboard',
    description: 'Heavy chipboard core with 90-degree V-groove sharp corners, custom insert cavity, and smooth vacuum slide reveal.',
    assemblyMethod: 'Automated rigid box corner-taping and outer paper wrapping machine',
    tearStripCompatible: false,
  },
];

export const STRUCTURAL_SOLUTIONS: StructuralSolutionItem[] = [
  {
    id: 'primary-flexible-pouch-sol',
    category: 'flexible-pouch',
    standardCode: 'ISO-FLEX-01',
    title: 'High-Barrier Flexible Pouches & Laminates',
    subtitle: 'Primary Packaging: Stand-Up Doyen, Retort & Recyclable Mono-PE Barrier Pouches',
    iconName: 'Package',
    description:
      'Custom multi-layer film laminations tailored to product shelf-life requirements. Engineered with verified OTR and WVTR ratings, aroma barriers, hermetic seal integrity, and laser-scored tear notches for effortless consumer opening.',
    keyFeatures: [
      'Multi-layer barrier laminates (BOPP, PET, AL Foil, BOPA Nylon, LLDPE, CPP, EVOH)',
      'Certified Mono-PE recyclable structures compliant with CEFLEX and APR standards',
      'Hermetic heat seals preventing active ingredient evaporation or moisture ingress',
      'Integrated one-way degassing valves, resealable press zippers, and tamper-evident spouts',
    ],
    recommendedSubstrates: ['Matte BOPP / Met-PET / PE', 'PET / AL Foil / BOPA / CPP', 'MDO-PE / EVOH / PE Mono-Material'],
    unboxingExperience: 'Smooth tactile matte finish with easy laser-scored tear initiation and clean resealable zipper haptics.',
    transitSuitability: 'ASTM F1140 burst test verified; withstands air freight decompression without leakage.',
    moq: '5,000 units (Rotogravure / Digital short-run available from 1,000 units)',
    sampleTurnaround: '48 Hours (Pre-formed pouch physical mockups)',
    image: FLEXIBLE_POUCH_IMAGE,
    dielineFeatures: ['Laser score lines for easy tear', 'K-Seal / Round Bottom Gusset', 'Degassing valve placement', 'Zipper channel clearance'],
    bestUseCases: ['Whole Bean Coffee & Teas', 'Nutritional Powders & Supplements', 'Cosmetic Serums & Refills', 'Gourmet Sauces & Pet Food'],
  },
  {
    id: 'secondary-folding-carton-sol',
    category: 'folding-carton',
    standardCode: 'ECMA A60.20',
    title: 'Precision Folding Cartons & Die Layouts',
    subtitle: 'Secondary Packaging: Auto-Bottom, Straight Tuck & High-Density Retail Packaging',
    iconName: 'Layers',
    description:
      'Engineered with calibrated crease allowances, anti-buckle locking ears, and optimized grain direction. Every folding carton is supplied with a step-and-repeat press die layout that maximizes sheet utilization on B1 commercial offset press and Bobst equipment.',
    keyFeatures: [
      'Crash-lock auto bottoms erect in < 0.8 seconds on fulfillment packing lines',
      'Grain direction alignment parallel to main creases eliminates fractured corner edges',
      'Step-and-repeat nested press die layouts achieving up to 91% sheet utilization',
      'G7 Master certified offset lithography with inline soft-touch matte dispersion',
    ],
    recommendedSubstrates: ['350gsm (20pt) C1S Virgin SBS Board', '400gsm (24pt) High-Stiffness SBS', 'Recycled Kraft Back Board (FBB)'],
    unboxingExperience: 'Crisp tactile friction fit with reinforced bottom load strength and precision edge definition.',
    transitSuitability: 'Conforms to ASTM D4169 distribution cycle; high vertical compression stiffness.',
    moq: '1,000 units for mass production (1-5 units for CNC rapid prototype)',
    sampleTurnaround: '24 Hours (Zünd & Kongsberg digital cutting tables)',
    image: FOLDING_CARTON_IMAGE,
    dielineFeatures: ['45-degree diagonal pre-crease lines', '15mm glue tab with fiber-tear emulsion', 'Friction tuck locks', '5th panel hanger'],
    bestUseCases: ['Cosmetics & Fragrance Cartons', 'Pharmaceutical & Nutraceutical Boxes', 'Retail Consumer Hardware', 'Luxury Food Confectionery'],
  },
  {
    id: 'tertiary-corrugated-shipper-sol',
    category: 'corrugated',
    standardCode: 'FEFCO 0201 / 0427',
    title: 'Engineered Shippers & Palletization',
    subtitle: 'Tertiary Packaging: B/C Flute RSC Master Cartons & Container Cube Optimization',
    iconName: 'Box',
    description:
      'Master corrugated containers designed to hold pouches and folding cartons with zero wasted interior space. Built with heavy-duty crush-resistant fluting to resist shipping container stacking loads and high-humidity export journeys.',
    keyFeatures: [
      'Heavy-duty crush strength built to resist tall warehouse stacking',
      'Optimized pallet patterns maximizing floor footprint without overhang',
      'Drop-tested for parcel delivery safety and transit shock protection',
      'High-grade reinforced single-wall and double-wall corrugated options',
    ],
    recommendedSubstrates: ['B-Flute 44 ECT Heavy Corrugated', 'C-Flute 48 ECT Export Liner', 'BC Double-Wall 71 ECT'],
    unboxingExperience: 'Easy-strip rip cord or center flap tape seal with clean carton stack access.',
    transitSuitability: 'ISTA 3A Parcel certified; supports multi-pallet static warehouse stacking up to 3 tiers.',
    moq: '500 units',
    sampleTurnaround: '24-48 Hours (CNC sample table)',
    image: CORRUGATED_IMAGE,
    dielineFeatures: ['Slotted flap tolerances', 'Stitch/glue manufacturer joint', 'Pallet tie interlocking geometry', 'Hand-hole tear reliefs'],
    bestUseCases: ['Master Export Shippers', 'E-Commerce DTC Mailer Boxes', 'Wholesale Pallet Shipper Displays', 'Ocean Container Freight'],
  },
];

export const STRUCTURAL_CATEGORIES = [
  { id: 'flexible-pouch' as StructuralCategory, name: 'Primary: Flexible Pouches', iconName: 'Package', countText: 'Stand-Up / Retort / Mono-PE' },
  { id: 'folding-carton' as StructuralCategory, name: 'Secondary: Folding Cartons', iconName: 'Layers', countText: 'ECMA Dielines & Die Layouts' },
  { id: 'corrugated' as StructuralCategory, name: 'Tertiary: Master Shippers', iconName: 'Box', countText: 'FEFCO Shippers & Palletization' },
  { id: 'rigid-box' as StructuralCategory, name: 'Luxury Rigid Set-Up Boxes', iconName: 'PackageCheck', countText: '90° V-Groove Greyboard' },
];

export const SERVICE_CATEGORIES = STRUCTURAL_CATEGORIES;

export const PACKAGING_MATERIALS = [
  {
    id: 'sbs-20pt',
    name: 'Virgin Solid Bleached Sulfate (SBS 20pt / 350gsm)',
    materialType: 'Solid Bleached Sulfate' as const,
    caliperMm: 0.52,
    strengthRating: 'High Stiffness Taber 28 mN·m / Zero Fiber Shedding',
    description: 'The global standard for premium cosmetic, pharma, and retail folding cartons. Brilliant white surface on both sides for pristine color reproduction.',
    sustainabilityRating: 'FSC Mix Credit Certified / 100% Recyclable',
    priceFactor: 1.15,
  },
  {
    id: 'sbs-24pt',
    name: 'Heavyweight SBS Board (24pt / 400gsm)',
    materialType: 'Solid Bleached Sulfate' as const,
    caliperMm: 0.61,
    strengthRating: 'Superior Caliper Stiffness Taber 42 mN·m',
    description: 'Extra-stiff virgin bleached board engineered for larger folding boxes, retail 5th panel hanging cartons, and heavy bottle packaging.',
    sustainabilityRating: 'FSC Certified / Recyclable',
    priceFactor: 1.25,
  },
  {
    id: 'e-flute-kraft',
    name: 'E-Flute Corrugated (Virgin Kraft / 32 ECT)',
    materialType: 'Corrugated Flute' as const,
    caliperMm: 1.5,
    strengthRating: '32 ECT (Edge Crush Test) / 200# Burst',
    description: '90 flutes/ft. Crisp folding definition and smooth surface for mailers and unboxing kits.',
    sustainabilityRating: '100% Recyclable / FSC Mix',
    priceFactor: 1.0,
  },
  {
    id: 'b-flute-kraft',
    name: 'B-Flute Corrugated (Export Master Shipper / 44 ECT)',
    materialType: 'Corrugated Flute' as const,
    caliperMm: 3.0,
    strengthRating: '44 ECT / 250# Mullen Burst',
    description: '47 flutes/ft. Maximum puncture resistance and side-cushioning for tertiary export shipping cartons.',
    sustainabilityRating: '100% Recyclable / 80% Post-Consumer',
    priceFactor: 1.15,
  },
  {
    id: 'greyboard-1800',
    name: 'High-Density Greyboard (1800gsm / 2.5mm Caliper)',
    materialType: 'Rigid Greyboard' as const,
    caliperMm: 2.5,
    strengthRating: 'Static Crush Resistance > 400 kg',
    description: 'Dense chipboard for luxury rigid set-up boxes, diamond V-grooved at 90° for crisp razor-sharp corners.',
    sustainabilityRating: '100% Recycled Post-Consumer Waste',
    priceFactor: 1.45,
  },
];

export const FINISHING_EFFECTS = [
  {
    id: 'spot-uv',
    name: 'High-Build Tactile Spot UV Coating',
    shortDesc: 'Liquid gloss polymer screen-printed up to 60 microns thick.',
    detailDesc: 'Selectively applied over folding carton brand typography and dieline embossing for a high-contrast liquid sheen.',
    visualStyle: { bgGradient: 'from-blue-950/60 to-zinc-900', borderStyle: 'border-[#00AEEF]/50', textEffect: 'text-[#00AEEF]', badgeColor: 'bg-[#00AEEF]/10 text-[#00AEEF]', highlightColor: '#00AEEF' },
    bestUsedOn: 'Secondary folding carton logo zones, flexible pouch matte/gloss contrast',
    priceImpact: 'Low (+5-10%)' as const,
  },
  {
    id: 'hot-foil',
    name: 'Precision CNC Hot Foil Stamping',
    shortDesc: 'Hardened brass die heat-transfer of metallic gold, silver or holographic foil.',
    detailDesc: 'Transfers metallic micro-pigments with sub-millimeter edge precision, anti-flaking adherence to aqueous and soft-touch laminates.',
    visualStyle: { bgGradient: 'from-amber-950/60 to-zinc-900', borderStyle: 'border-[#FFF200]/50', textEffect: 'text-amber-400', badgeColor: 'bg-amber-400/10 text-amber-300', highlightColor: '#F59E0B' },
    bestUsedOn: 'Luxury folding cartons, cosmetic boxes, specialty pouch accent seals',
    priceImpact: 'Moderate (+15-25%)' as const,
  },
  {
    id: 'blind-emboss',
    name: 'Multi-Level Sculptural Embossing',
    shortDesc: 'CNC brass male/female dies raising fibrous paperboard into sculptural relief.',
    detailDesc: 'Deforms virgin SBS fibers in multi-level depths without ink, creating understated luxury shadows and tactile texture.',
    visualStyle: { bgGradient: 'from-zinc-900 to-zinc-800', borderStyle: 'border-zinc-500', textEffect: 'text-zinc-100', badgeColor: 'bg-zinc-800 text-zinc-300', highlightColor: '#9CA3AF' },
    bestUsedOn: 'Folding cartons, organic skincare boxes, certified sustainable packaging',
    priceImpact: 'Moderate (+15-25%)' as const,
  },
  {
    id: 'soft-touch',
    name: 'Inline Soft-Touch Matte Dispersion',
    shortDesc: 'Silky peach-skin tactile coating applied inline on commercial offset press.',
    detailDesc: 'Eliminates fingerprint smudging and scuffing on dark colors, delivering a velvety unboxing friction.',
    visualStyle: { bgGradient: 'from-indigo-950/60 to-zinc-900', borderStyle: 'border-indigo-400/50', textEffect: 'text-indigo-300', badgeColor: 'bg-indigo-400/10 text-indigo-300', highlightColor: '#6366F1' },
    bestUsedOn: 'Full outer face of folding cartons, rigid boxes, and luxury carton sleeves',
    priceImpact: 'Low (+5-10%)' as const,
  },
];

// Helper to calculate BCT via McKee Formula
export function calculateMcKeeBct(ect: number, caliperMm: number, lengthMm: number, widthMm: number): number {
  const perimeterInches = (2 * (lengthMm + widthMm)) / 25.4;
  const caliperInches = caliperMm / 25.4;
  const ectLbsPerInch = ect;
  const bctLbs = 5.87 * ectLbsPerInch * Math.sqrt(caliperInches * perimeterInches);
  const bctKg = Math.round(bctLbs * 0.453592);
  return Math.max(80, bctKg);
}

// Calculate Structural & Die Layout Estimate
export function calculateStructuralEstimate(input: any): any {
  const preset = CAD_DIELINE_PRESETS.find((p) => p.id === input.styleId) || CAD_DIELINE_PRESETS[0];
  const material = PACKAGING_MATERIALS.find((m) => m.id === input.materialId) || PACKAGING_MATERIALS[0];

  const L = input.lengthMm || 95;
  const W = input.widthMm || 65;
  const D = input.depthMm || 175;
  const quantity = input.quantity || 1000;

  // Blank dimensions calculation
  let blankLengthMm = 0;
  let blankWidthMm = 0;

  if (preset.id === 'ecma-a6020') {
    blankLengthMm = Math.round(2 * (L + W) + 20);
    blankWidthMm = Math.round(D + W + 30);
  } else if (preset.id === 'fefco-0427') {
    blankLengthMm = Math.round(2 * D + 2 * W + 40);
    blankWidthMm = Math.round(L + 2 * D + 40);
  } else if (preset.id === 'ecma-a2020') {
    blankLengthMm = Math.round(2 * (L + W) + 15);
    blankWidthMm = Math.round(D + 2 * (W * 0.75));
  } else {
    blankLengthMm = Math.round(2 * (L + W) + 35);
    blankWidthMm = Math.round(D + W);
  }

  const blankAreaSqm = (blankLengthMm * blankWidthMm) / 1000000;

  // Master Sheet Yield (720 x 1020 mm press sheet)
  const sheetL = 1020;
  const sheetW = 720;
  const fitWay1 = Math.floor(sheetL / (blankLengthMm + 6)) * Math.floor(sheetW / (blankWidthMm + 6));
  const fitWay2 = Math.floor(sheetL / (blankWidthMm + 6)) * Math.floor(sheetW / (blankLengthMm + 6));
  const sheetYieldPerParent = Math.max(1, Math.max(fitWay1, fitWay2));

  // McKee BCT
  const ectRating = material.materialType === 'Corrugated Flute' ? 44 : 26;
  const bctKg = calculateMcKeeBct(ectRating, material.caliperMm, L, W);

  // Pallet capacity (1200x1000mm)
  const boxOuterL = L + material.caliperMm * 2;
  const boxOuterW = W + material.caliperMm * 2;
  const boxOuterD = D + material.caliperMm * 2;
  const unitsPerLayer = Math.max(4, Math.floor((1200 / boxOuterL) * (1000 / boxOuterW)));
  const layers = Math.max(1, Math.floor(1800 / boxOuterD));
  const palletEfficiencyUnits = Math.min(3000, Math.max(40, unitsPerLayer * layers));

  // Pricing calculations
  const baseRate = material.priceFactor * 0.35;
  let scaleFactor = 1.0;
  if (quantity >= 1000) scaleFactor = 0.65;
  if (quantity >= 3000) scaleFactor = 0.45;
  if (quantity >= 5000) scaleFactor = 0.36;
  if (quantity >= 10000) scaleFactor = 0.28;

  const unitCost = Number((baseRate * scaleFactor + 0.12).toFixed(2));
  const minUnit = Number((unitCost * 0.92).toFixed(2));
  const maxUnit = Number((unitCost * 1.15).toFixed(2));
  const toolingCost = preset.category === 'folding-carton' ? 180 : 250;

  const totalMin = Math.round(minUnit * quantity + toolingCost);
  const totalMax = Math.round(maxUnit * quantity + toolingCost);

  return {
    blankLengthMm,
    blankWidthMm,
    blankAreaSqm: Number(blankAreaSqm.toFixed(3)),
    unitPriceRange: [minUnit, maxUnit],
    totalPriceRange: [totalMin, totalMax],
    dieToolingCost: toolingCost,
    sampleCost: 50,
    sampleLeadTimeDays: 1,
    productionLeadTimeDays: [6, 10],
    mckeeBctCompressiveStrengthKg: bctKg,
    palletEfficiencyUnits,
    sheetYieldPerParent,
    breakdown: {
      materialCost: Math.round(blankAreaSqm * 1.5 * quantity),
      dieCuttingCost: Math.round(unitCost * 0.4 * quantity),
      toolingFee: toolingCost,
      shippingEstimate: Math.round(quantity * 0.08),
    },
  };
}

export const STRUCTURAL_CASE_STUDIES = [
  {
    id: 'case-coffee-barrier',
    title: 'Cold-Brew & Roasted Whole Bean Packaging System',
    industry: 'Specialty Beverage & Coffee',
    structuralType: 'Primary Barrier Pouch + Secondary Retail Folding Carton',
    standardCode: 'ISO-FLEX-01 / ECMA A60.20',
    category: 'folding-carton' as const,
    challenge: 'Aroma loss and lipid rancidity within 90 days; retail carton sagging on humid supermarket shelves.',
    solution: 'Engineered a 3-ply laminate pouch (Matte BOPP / Met-PET / LLDPE) with a one-way degassing valve (OTR < 0.5), housed inside a 350gsm SBS crash-lock carton with grain direction aligned vertically.',
    metrics: {
      dropProtection: 'ISTA 3A Passed (1.2m free fall)',
      damageRate: '0.00% across 85,000 units',
      packoutTimeSaved: '45% Faster Packing Line',
      shippingVolumeReduced: '22% Cube Reduction',
      sustainability: 'FSC Virgin SBS + Recyclable Mono-PE option',
      assemblyTime: '0.8s snap-erect auto bottom',
    },
    specs: {
      dimensions: 'Pouch: 250g / Carton: 95 × 65 × 175 mm',
      material: '350gsm C1S Virgin SBS + 111µm Barrier Film',
      paper: '350gsm C1S SBS',
      color: '6-Color Offset + Soft-Touch Matte Dispersion',
      finishing: ['Spot Gloss UV on typography', 'One-Way Degassing Valve', 'Gold Hot-Foil Stamp'],
      insert: 'Cushioned Pouch Bottom Gusset Seat',
      closure: 'Auto-Bottom Snap Lock & Friction Tuck Top',
    },
    imageUrl: FOLDING_CARTON_IMAGE,
  },
  {
    id: 'case-cosmetic-die-layout',
    title: 'Clean Beauty Serum: Low-Waste Layout & Drop Protection',
    industry: 'Cosmetics & Skincare',
    structuralType: 'Secondary Folding Carton + Internal Buffer Insert',
    standardCode: 'Straight Tuck End Folding Carton',
    category: 'folding-carton' as const,
    challenge: 'Fragile glass bottle breakage and excessive paperboard trim scrap on initial printer dielines.',
    solution: 'Redesigned the packaging dieline into an interlocking low-waste layout, maximizing usable paper and replacing plastic foam with an all-paperboard protective cushion.',
    metrics: {
      dropProtection: 'Drop-Safe Cushioning',
      damageRate: 'Zero Transit Breakage',
      packoutTimeSaved: 'Quick Assembly',
      shippingVolumeReduced: 'Compact Freight Packing',
      sustainability: '100% Curbside Paperboard (Zero Plastic Foam)',
      assemblyTime: 'High-speed automated cartoning',
    },
    specs: {
      dimensions: 'Custom Fit for 30ml & 50ml Dropper Bottles',
      material: 'High-Stiffness Virgin Paperboard',
      paper: 'High-Stiffness Virgin Paperboard',
      color: 'Full Color Offset + Protective Matte Finish',
      finishing: ['Embossed brand logomark', 'Interlocking bottom tuck lock'],
      insert: '100% Recyclable Folded Paperboard Cushion',
      closure: 'Friction-Fit Straight Tuck End',
    },
    imageUrl: CAD_LAB_IMAGE,
  },
  {
    id: 'case-pharma-sachet',
    title: 'Single-Dose Diagnostic Reagents & Export Shippers',
    industry: 'Biotech & Healthcare',
    structuralType: 'Hermetic Foil Sachet + Tamper-Evident Shipper',
    standardCode: 'Airtight Barrier / Export Shipper',
    category: 'corrugated' as const,
    challenge: 'Sensitive liquid reagent evaporation and shipping carton collapse during long-distance transit.',
    solution: 'Designed high-barrier airtight foil sachets and reinforced crush-proof corrugated master cartons optimized for export container shipping.',
    metrics: {
      dropProtection: 'Drop & Shock Certified',
      damageRate: 'Zero Leakage Guarantee',
      packoutTimeSaved: 'Fast Automated Packing',
      shippingVolumeReduced: 'Maximized Container Density',
      sustainability: '100% Recyclable corrugated shipper',
      assemblyTime: 'Automated high-speed packing line',
    },
    specs: {
      dimensions: 'Custom Sachet & Master Shipping Carton Sizes',
      material: 'High-Barrier Foil Laminate + Heavy-Duty Corrugated Board',
      paper: 'Heavy-Duty Corrugated Board',
      color: 'Custom 2-Color Master Shipper Print',
      finishing: ['Easy-tear notch', 'Barcoded export labels'],
      insert: 'Corrugated Protective Cell Dividers',
      closure: 'Secure Center-Flap Tape Seal',
    },
    imageUrl: CORRUGATED_IMAGE,
  },
  {
    id: 'case-cleaning-bottle-development',
    title: 'Household Cleaning Bottle: Durable Mold & Ergonomic Trigger Development',
    industry: 'Home Care & FMCG Chemicals',
    structuralType: 'Durable Plastic Bottle with Integrated Handle & Spray Trigger',
    standardCode: 'Leakproof & Drop-Safe Standard',
    category: 'bottle-packaging' as const,
    challenge: 'Bottles cracking at the base and liquid leaking from spray triggers during courier transit.',
    solution: 'Redesigned bottle base with rounded smooth contours, durable recycled plastic, and a tight-locking thread neck that keeps triggers securely sealed.',
    metrics: {
      dropProtection: 'Survives Hard Drops Filled',
      damageRate: 'Zero Leakage or Cracking',
      packoutTimeSaved: 'Fast Line Filling',
      shippingVolumeReduced: 'Optimized Pallet Packing',
      sustainability: 'Eco-Friendly Recycled Plastic Options',
      assemblyTime: 'Smooth high-speed filling & capping',
    },
    specs: {
      dimensions: 'Standard 500ml Spray & 1-Litre Jug Formats',
      material: 'Durable Polyethylene with Recycled Plastic Options',
      paper: 'Full-Body Waterproof Shrink Sleeve',
      color: 'Vibrant Multi-Color Reverse-Printed Sleeve',
      finishing: ['Textured ergonomic grip ribs', 'Liquid measurement view strip', 'Child-safety lock tab'],
      insert: 'Built-in handle cavity & tight-locking neck thread',
      closure: 'Leakproof trigger sprayer (Spray, Stream, Lock)',
    },
    imageUrl: CLEANING_BOTTLE_LINEUP_IMAGE,
  },
];

