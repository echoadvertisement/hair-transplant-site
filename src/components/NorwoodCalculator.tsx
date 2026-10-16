import React, { useState } from 'react';
import { NORWOOD_STAGES } from '../data/clinicData';
import { calculateGrafts, formatCurrency } from '../utils/calculator';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, HelpCircle, Layers, Check } from 'lucide-react';

interface NorwoodCalculatorProps {
  onTransferToBooking: (assessment: {
    stage: number;
    grafts: number;
    technique: string;
    stageLabel: string;
  }) => void;
}

export const NorwoodCalculator: React.FC<NorwoodCalculatorProps> = ({ onTransferToBooking }) => {
  const [selectedStage, setSelectedStage] = useState<number>(3);
  const [density, setDensity] = useState<'standard' | 'high_density' | 'maximum'>('high_density');
  const [hairTexture, setHairTexture] = useState<'fine' | 'medium' | 'coarse'>('medium');

  const currentStageInfo = NORWOOD_STAGES.find(s => s.stage === selectedStage) || NORWOOD_STAGES[2];
  const calculation = calculateGrafts(selectedStage, density, hairTexture);

  const handleBookWithAssessment = () => {
    onTransferToBooking({
      stage: selectedStage,
      grafts: calculation.recommendedGrafts,
      technique: calculation.recommendedTechnique,
      stageLabel: currentStageInfo.label,
    });
  };

  return (
    <section id="calculator" className="py-20 bg-slate-900/90 border-b border-slate-800 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Clinical Assessment</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Norwood Scale Graft &amp; Density Estimator
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Select the illustration closest to your current hair loss pattern to compute personalized graft requirements,
            donor zone feasibility, optimal micro-surgical technique, and financing options.
          </p>
        </div>

        {/* Norwood Stage Selector Strip */}
        <div className="mb-10">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center sm:text-left">
            Step 1: Select Your Current Hairline Pattern (Norwood Scale I - VII)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {NORWOOD_STAGES.map(item => {
              const isSelected = item.stage === selectedStage;
              return (
                <button
                  key={item.stage}
                  onClick={() => setSelectedStage(item.stage)}
                  aria-pressed={isSelected}
                  className={`group relative flex flex-col items-center text-center p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                      : 'border-slate-800 bg-slate-950/70 hover:border-slate-700 hover:bg-slate-950'
                  }`}
                >
                  {/* Stage Badge */}
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full mb-2 ${
                      isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Stage {item.stage}
                  </span>

                  {/* Stylized Hairline Icon / Visual Representation */}
                  <div className="h-14 w-14 my-1 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 relative overflow-hidden">
                    {/* Stylized hairline curves representing stages */}
                    <div className="absolute inset-2 rounded-full border border-slate-700"></div>
                    {item.stage === 1 && (
                      <div className="w-9 h-9 rounded-full border-t-4 border-amber-400 mt-2"></div>
                    )}
                    {item.stage === 2 && (
                      <div className="w-8 h-8 rounded-full border-t-4 border-amber-400/90 mt-3 -rotate-6"></div>
                    )}
                    {item.stage === 3 && (
                      <div className="w-7 h-7 rounded-full border-t-4 border-amber-400/80 mt-4"></div>
                    )}
                    {item.stage === 4 && (
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-4 border-t-2 border-amber-400/70"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60 mt-1"></div>
                      </div>
                    )}
                    {item.stage === 5 && (
                      <div className="flex flex-col items-center">
                        <div className="w-5 h-3 border-t-2 border-amber-400/60"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-amber-500/70 mt-1"></div>
                      </div>
                    )}
                    {item.stage === 6 && (
                      <div className="w-7 h-7 rounded-full border-b-2 border-r-2 border-l-2 border-slate-600 border-t-transparent mt-1"></div>
                    )}
                    {item.stage === 7 && (
                      <div className="w-8 h-8 rounded-full border-b-4 border-slate-600 border-t-transparent mt-2"></div>
                    )}
                  </div>

                  <span className="text-xs font-semibold text-white mt-1 line-clamp-1">{item.subtitle}</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    {item.minGrafts} - {item.maxGrafts} Grafts
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Calculation Parameters & Results Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6 bg-slate-950 p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-xl">
            {/* Selected Stage Summary */}
            <div className="pb-4 border-b border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Selected Clinical Profile
              </span>
              <h3 className="font-serif text-xl font-bold text-white mt-0.5">{currentStageInfo.label}</h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{currentStageInfo.description}</p>
              <div className="mt-2 text-xs text-slate-400">
                <span className="text-slate-500">Primary Focus Zone:</span> {currentStageInfo.primaryZone}
              </div>
            </div>

            {/* Density Selector */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Target Hairline Density
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setDensity('standard')}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                    density === 'standard'
                      ? 'border-amber-400 bg-amber-500/20 text-white font-bold'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  Standard
                  <span className="block text-[10px] font-normal text-slate-400 mt-0.5">40-45 / cm²</span>
                </button>
                <button
                  onClick={() => setDensity('high_density')}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                    density === 'high_density'
                      ? 'border-amber-400 bg-amber-500/20 text-white font-bold'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  High Density
                  <span className="block text-[10px] font-normal text-slate-400 mt-0.5">50-55 / cm²</span>
                </button>
                <button
                  onClick={() => setDensity('maximum')}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                    density === 'maximum'
                      ? 'border-amber-400 bg-amber-500/20 text-white font-bold'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  Maximum
                  <span className="block text-[10px] font-normal text-slate-400 mt-0.5">60-65 / cm²</span>
                </button>
              </div>
            </div>

            {/* Hair Caliber / Texture */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Hair Shaft Caliber (Diameter)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['fine', 'medium', 'coarse'] as const).map(tex => (
                  <button
                    key={tex}
                    onClick={() => setHairTexture(tex)}
                    className={`py-2 px-3 rounded-lg text-xs capitalize border text-center transition-all cursor-pointer ${
                      hairTexture === tex
                        ? 'border-amber-400 bg-amber-500/20 text-white font-bold'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {tex}
                    <span className="block text-[10px] font-normal text-slate-400 mt-0.5">
                      {tex === 'fine' ? 'High count' : tex === 'coarse' ? 'High cover' : 'Average'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                    Surgical Estimation Summary
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                    Recommended Prescription
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Procedure Duration</span>
                  <span className="font-serif text-lg font-bold text-amber-300">
                    ~{calculation.estimatedHours} Hours
                  </span>
                </div>
              </div>

              {/* Major Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4">
                  <span className="text-xs text-slate-400 block">Target Grafts</span>
                  <div className="text-3xl font-serif font-bold text-white mt-1">
                    {calculation.recommendedGrafts.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-amber-400 mt-0.5 block">
                    Range: {calculation.minGrafts} - {calculation.maxGrafts}
                  </span>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4">
                  <span className="text-xs text-slate-400 block">Estimated Hairs</span>
                  <div className="text-3xl font-serif font-bold text-emerald-400 mt-1">
                    ~{calculation.follicularUnitsEstimate.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    ~2.2 hairs / follicular unit
                  </span>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4">
                  <span className="text-xs text-slate-400 block">Est. Investment</span>
                  <div className="text-2xl font-serif font-bold text-white mt-1">
                    {formatCurrency(calculation.priceEstimate.average)}
                  </div>
                  <span className="text-[11px] text-emerald-400 mt-0.5 block">
                    Or {formatCurrency(calculation.monthlyFinancing)}/mo (0% APR)
                  </span>
                </div>
              </div>

              {/* Recommended Surgical Technique */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Recommended Technique:
                  </span>
                  <span className="text-xs font-semibold text-amber-300">
                    {calculation.recommendedTechnique}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-6">
                  {calculation.techniqueReason}
                </p>
              </div>

              {/* Action Banner to Gateway */}
              <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400 text-center sm:text-left">
                  <span>✓ 3D Virtual Trichoscopy included</span>
                  <span className="mx-2">·</span>
                  <span>✓ No obligation quotation</span>
                </div>

                <button
                  onClick={handleBookWithAssessment}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 px-6 py-3.5 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:brightness-105 active:scale-98 transition-all cursor-pointer"
                >
                  <Calendar className="h-4 w-4 text-slate-950" />
                  <span>Book Consultation With This Plan</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
