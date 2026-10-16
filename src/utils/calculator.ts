/**
 * Pure calculation logic for Hair Restoration graft estimators,
 * financial planning, and booking validation.
 */

export interface GraftCalculationResult {
  minGrafts: number;
  maxGrafts: number;
  recommendedGrafts: number;
  estimatedHours: number;
  recommendedTechnique: string;
  techniqueReason: string;
  priceEstimate: {
    min: number;
    max: number;
    average: number;
  };
  monthlyFinancing: number; // 24-month 0% APR calculation
  follicularUnitsEstimate: number; // hairs = ~2.2 hairs per graft
}

export function calculateGrafts(
  stage: number,
  densityMultiplier: 'standard' | 'high_density' | 'maximum' = 'high_density',
  hairTexture: 'fine' | 'medium' | 'coarse' = 'medium'
): GraftCalculationResult {
  // Base grafts by Norwood stage
  const baseRangeMap: Record<number, { min: number; max: number; baseHours: number }> = {
    1: { min: 800, max: 1200, baseHours: 3.5 },
    2: { min: 1200, max: 1800, baseHours: 4.5 },
    3: { min: 1800, max: 2600, baseHours: 5.5 },
    4: { min: 2500, max: 3400, baseHours: 6.5 },
    5: { min: 3200, max: 4200, baseHours: 7.5 },
    6: { min: 4000, max: 5200, baseHours: 8.5 },
    7: { min: 5000, max: 6500, baseHours: 9.5 },
  };

  const selectedBase = baseRangeMap[stage] || { min: 2000, max: 3000, baseHours: 5.5 };

  // Density factor
  let densityFactor = 1.0;
  if (densityMultiplier === 'standard') densityFactor = 0.85;
  if (densityMultiplier === 'maximum') densityFactor = 1.25;

  // Hair texture adjustments: Coarse hair provides higher optical coverage,
  // so slightly fewer grafts are required for the same visual density
  let textureFactor = 1.0;
  if (hairTexture === 'coarse') textureFactor = 0.9;
  if (hairTexture === 'fine') textureFactor = 1.15;

  const minGrafts = Math.round((selectedBase.min * densityFactor * textureFactor) / 50) * 50;
  const maxGrafts = Math.round((selectedBase.max * densityFactor * textureFactor) / 50) * 50;
  const recommendedGrafts = Math.round((minGrafts + maxGrafts) / 2);

  // Technique recommendation
  let recommendedTechnique = 'Sapphire FUE Precision';
  let techniqueReason = 'Ideal for natural feathering and dense hairline micro-grafting.';
  if (stage <= 2) {
    recommendedTechnique = 'DHI Direct Implantation (Choi Pen)';
    techniqueReason = 'Direct insertion allows zero-incision precision and no shaving needed for hairline touchups.';
  } else if (stage >= 5) {
    recommendedTechnique = 'Combined Mega-Session (FUE Sapphire + PRP)';
    techniqueReason = 'High graft count requires specialized multi-team extraction for maximum follicle viability.';
  }

  // Cost calculation based on clinical standard rate (~$2.80 to $3.40 per graft)
  const minCost = Math.round(minGrafts * 2.8);
  const maxCost = Math.round(maxGrafts * 3.4);
  const averageCost = Math.round((minCost + maxCost) / 2);
  const monthlyFinancing = Math.round(averageCost / 24);
  const follicularUnitsEstimate = Math.round(recommendedGrafts * 2.2);

  const estimatedHours = Math.min(10, Math.max(3, Math.round(selectedBase.baseHours * densityFactor * 10) / 10));

  return {
    minGrafts,
    maxGrafts,
    recommendedGrafts,
    estimatedHours,
    recommendedTechnique,
    techniqueReason,
    priceEstimate: {
      min: minCost,
      max: maxCost,
      average: averageCost,
    },
    monthlyFinancing,
    follicularUnitsEstimate,
  };
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateAppointmentForm(data: {
  patientName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  serviceId: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.patientName || data.patientName.trim().length < 2) {
    errors.patientName = 'Please enter your full name (minimum 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address for appointment confirmation.';
  }

  const phoneRegex = /^[\d\s+\-()]{7,20}$/;
  if (!data.phone || !phoneRegex.test(data.phone.trim())) {
    errors.phone = 'Please provide a valid contact telephone number.';
  }

  if (!data.date) {
    errors.date = 'Please select a preferred appointment date.';
  }

  if (!data.timeSlot) {
    errors.timeSlot = 'Please select a consultation time slot.';
  }

  if (!data.serviceId) {
    errors.serviceId = 'Please select a primary service or procedure.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateBookingReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'CF-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
