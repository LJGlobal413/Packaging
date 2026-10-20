import {
  StructuralCalculatorInput,
  StructuralCalculatorResult,
} from '../types';
import {
  calculateStructuralEstimate,
  calculateMcKeeBct,
} from '../data/printingData';

export { calculateStructuralEstimate, calculateMcKeeBct };

// Legacy compatibility types if referenced anywhere
export type QuoteCalculationInput = StructuralCalculatorInput;
export type QuoteCalculationResult = StructuralCalculatorResult;

export function calculatePrintQuote(input: any): any {
  return calculateStructuralEstimate({
    styleId: input.styleId || 'fefco-0427',
    lengthMm: input.lengthMm || 240,
    widthMm: input.widthMm || 160,
    depthMm: input.depthMm || 70,
    quantity: input.quantity || 1000,
    materialId: input.materialId || 'e-flute-kraft',
    insertType: input.insertType || 'origami-corrugated',
    printFinish: input.printFinish || 'offset-4c-matte',
    transitTestRequired: true,
    destinationRegion: input.destinationRegion || 'north-america',
  });
}
