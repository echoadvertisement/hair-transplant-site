import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateGrafts,
  validateAppointmentForm,
  generateBookingReference,
  formatCurrency,
} from './calculator.ts';

test('calculateGrafts returns valid graft ranges for Norwood Stage 3', () => {
  const result = calculateGrafts(3, 'high_density', 'medium');
  assert.ok(result.minGrafts >= 1500, `Expected minGrafts >= 1500, got ${result.minGrafts}`);
  assert.ok(result.maxGrafts <= 3500, `Expected maxGrafts <= 3500, got ${result.maxGrafts}`);
  assert.ok(result.recommendedGrafts >= result.minGrafts);
  assert.ok(result.recommendedGrafts <= result.maxGrafts);
  assert.ok(result.priceEstimate.average > 0);
  assert.ok(result.monthlyFinancing > 0);
  assert.ok(result.follicularUnitsEstimate > result.recommendedGrafts);
});

test('calculateGrafts adjusts for fine and coarse hair texture', () => {
  const fineHair = calculateGrafts(3, 'high_density', 'fine');
  const coarseHair = calculateGrafts(3, 'high_density', 'coarse');

  // Fine hair needs more grafts for equivalent optical coverage
  assert.ok(fineHair.recommendedGrafts > coarseHair.recommendedGrafts);
});

test('calculateGrafts suggests DHI for early stage and mega-session for advanced stage', () => {
  const early = calculateGrafts(2);
  assert.match(early.recommendedTechnique, /DHI/i);

  const advanced = calculateGrafts(6);
  assert.match(advanced.recommendedTechnique, /Combined Mega-Session|FUE/i);
});

test('validateAppointmentForm rejects empty fields with clear messages', () => {
  const emptyForm = validateAppointmentForm({
    patientName: '',
    email: 'invalid-email',
    phone: '',
    date: '',
    timeSlot: '',
    serviceId: '',
  });

  assert.equal(emptyForm.valid, false);
  assert.ok(emptyForm.errors.patientName);
  assert.ok(emptyForm.errors.email);
  assert.ok(emptyForm.errors.phone);
  assert.ok(emptyForm.errors.date);
  assert.ok(emptyForm.errors.timeSlot);
  assert.ok(emptyForm.errors.serviceId);
});

test('validateAppointmentForm succeeds for valid patient data', () => {
  const validForm = validateAppointmentForm({
    patientName: 'Alexander Sterling',
    email: 'alex.sterling@example.com',
    phone: '+1 (555) 234-5678',
    date: '2026-10-25',
    timeSlot: '10:30 AM',
    serviceId: 'fue-sapphire',
  });

  assert.equal(validForm.valid, true);
  assert.equal(Object.keys(validForm.errors).length, 0);
});

test('generateBookingReference produces code matching CF- prefix and 6 alphanumeric chars', () => {
  const code = generateBookingReference();
  assert.match(code, /^CF-[A-Z0-9]{6}$/);
});

test('formatCurrency formats USD amounts correctly', () => {
  const formatted = formatCurrency(4500);
  assert.match(formatted, /\$4,500/);
});
