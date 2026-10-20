export type PackagingHierarchyLevel =
  | 'primary' // Flexible barrier pouches, laminates, sachets, direct contact
  | 'secondary' // Folding cartons, CAD dielines, retail presentation boxes, sleeves
  | 'tertiary' // Corrugated shippers, palletization, container freight containment
  | 'production'; // Offset printing, die-cutting, folder-gluing, and global dispatch

export type StructuralCategory =
  | 'flexible-pouch'
  | 'folding-carton'
  | 'corrugated'
  | 'rigid-box'
  | 'bottle-packaging'
  | 'molded-pulp'
  | 'cushioning-insert';

export type ServiceCategory = StructuralCategory;

// Primary Packaging: Flexible Barrier Laminate Structures
export interface LaminateLayerSpec {
  layerOrder: number; // 1 = outer/print, 2 = intermediate barrier, 3 = sealant
  material: string; // e.g. "BOPP", "PET", "AL Foil", "Met-PET", "BOPA Nylon", "LLDPE", "CPP", "MDO-PE"
  thicknessMicron: number;
  functionalRole: string; // e.g. "Reverse Print Carrier & Scuff Resistance", "Oxygen & UV Barrier", "Hermetic Heat Sealant"
}

export interface FlexiblePouchRecommendation {
  id: string;
  name: string;
  pouchType:
    | 'Stand-Up Doyen Pouch'
    | 'Flat-Bottom Box Pouch'
    | 'Three-Side Seal Sachet'
    | 'Side-Gusset Valve Pouch'
    | 'Retort Spout Pouch';
  targetProductCategory: string;
  barrierPerformance: {
    otr: string; // Oxygen Transmission Rate (cc/m²/day)
    wvtr: string; // Water Vapor Transmission Rate (g/m²/day)
    lightShield: '100% Total Foil Block' | '98% Metallized UV Block' | 'Transparent Clear Barrier';
    sealInitiationTemp: string; // e.g. "105°C - 130°C"
  };
  laminateStructure: LaminateLayerSpec[];
  totalThicknessMicron: number;
  recommendedClosure: string;
  sustainabilityStatus: string;
  consultingNotes: string;
}

// Secondary Packaging: Folding Carton & Press Die Layout
export interface FoldingCartonDieSpec {
  id: string;
  standardCode: string; // ECMA A20.20, ECMA A60.20, etc.
  name: string;
  cartonStyle: string;
  boardStock: string;
  caliperPt: number;
  caliperMm: number;
  recommendedGrainDirection: string;
  creaseAllowanceMm: number;
  glueTabAllowanceMm: number;
  dieLayoutNesting: {
    pressSheetSize: string; // "720 × 1020 mm (Full B1 Format)"
    nestingCount: number; // e.g. 6-up or 8-up
    substrateUtilizationYield: number; // e.g. 86.4%
    gripperMarginMm: number;
    gutterBetweenBlanksMm: number;
  };
  folderGluerRunSpeed: string;
  bestApplications: string[];
}

// Tertiary Packaging: Corrugated Shippers & Palletization
export interface TertiaryTransitSpec {
  shipperFormat: string;
  cartonCapacityPerShipper: number;
  shipperOuterDimensionsMm: {
    length: number;
    width: number;
    depth: number;
  };
  fluteSpec: string;
  ectRating: string;
  mckeeCompressiveStrengthKg: number;
  palletization: {
    palletStandard: '1200 × 1000 mm (Export GMA)' | '1200 × 800 mm (Euro Pallet)';
    shippersPerLayer: number;
    layersPerPallet: number;
    totalShippersPerPallet: number;
    totalFoldingCartonsPerPallet: number;
    cubeEfficiencyPercent: number;
  };
}

export interface StructuralSolutionItem {
  id: string;
  category: StructuralCategory;
  standardCode: string;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
  keyFeatures: string[];
  recommendedSubstrates: string[];
  unboxingExperience: string;
  transitSuitability: string;
  moq: string;
  sampleTurnaround: string;
  image: string;
  dielineFeatures: string[];
  bestUseCases: string[];
}

export interface CadDielinePreset {
  id: string;
  name: string;
  standardCode: string;
  category: StructuralCategory;
  defaultLengthMm: number;
  defaultWidthMm: number;
  defaultDepthMm: number;
  defaultCaliperMm: number;
  defaultFlute: string;
  description: string;
  assemblyMethod: string;
  tearStripCompatible: boolean;
}

export interface AIPackagingRecommendation {
  structuralStyle: string;
  recommendedCategory: string;
  materialSpec: string;
  fluteOrCaliper: string;
  primaryLaminateStructure?: {
    recommendedLayers: string;
    pouchStyle: string;
    barrierRating: string;
    sustainabilityOption: string;
  };
  secondaryFoldingCarton?: {
    style: string;
    dielineSpecs: string;
    grainDirection: string;
    dieLayoutYield: string;
  };
  tertiaryShipper?: {
    corrugatedSpec: string;
    bctCompressiveStrength: string;
    palletizationPlan: string;
  };
  printAndDispatch?: {
    printProcess: string;
    finishingAndTooling: string;
    dispatchTimeline: string;
  };
  insertType: string;
  transitTesting: string;
  unboxingUx: string;
  estimatedProductionDays: string;
  expertAdvice: string;
  costEfficiencyTip: string;
}

export interface StructuralCalculatorInput {
  styleId: string;
  lengthMm: number;
  widthMm: number;
  depthMm: number;
  quantity: number;
  materialId: string;
  insertType?: string;
  printFinish?: string;
  transitTestRequired?: boolean;
  destinationRegion?: string;
}

export interface StructuralCalculatorResult {
  blankLengthMm: number;
  blankWidthMm: number;
  blankAreaSqm: number;
  unitPriceRange: [number, number];
  totalPriceRange: [number, number];
  dieToolingCost: number;
  sampleCost: number;
  sampleLeadTimeDays: number;
  productionLeadTimeDays: [number, number];
  mckeeBctCompressiveStrengthKg: number;
  palletEfficiencyUnits: number;
  sheetYieldPerParent: number;
  breakdown: {
    materialCost: number;
    dieCuttingCost: number;
    toolingFee: number;
    shippingEstimate: number;
  };
}

export interface PrintAndDispatchStep {
  stepNumber: string;
  title: string;
  timeline: string;
  description: string;
  qcInspection: string;
  equipment: string;
}

export interface StructuralCaseStudy {
  id: string;
  title: string;
  industry: string;
  structuralType: string;
  standardCode: string;
  category: StructuralCategory;
  challenge: string;
  solution: string;
  metrics: {
    dropProtection: string;
    damageRate: string;
    packoutTimeSaved?: string;
    shippingVolumeReduced?: string;
    sustainability?: string;
    assemblyTime?: string;
  };
  specs: {
    dimensions: string;
    material?: string;
    paper?: string;
    color?: string;
    finishing?: string[];
    insert?: string;
    closure?: string;
  };
  imageUrl: string;
}

