import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/clinicData';
import { Calendar, Check, MoveHorizontal, Sparkles, Quote, Award } from 'lucide-react';

interface BeforeAfterGalleryProps {
  onOpenBooking: () => void;
}

export const BeforeAfterGallery: React.FC<BeforeAfterGalleryProps> = ({ onOpenBooking }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CASE_STUDIES[0].id);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [viewMode, setViewMode] = useState<'slider' | 'side_by_side'>('slider');

  const activeCase = CASE_STUDIES.find(c => c.id === selectedCaseId) || CASE_STUDIES[0];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(5, Math.min(95, position)));
  };

  return (
    <section id="results" className="py-20 bg-slate-950 border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-800">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
              Verified Clinical Outcomes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Patient Transformations &amp; Case Studies
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every hairline is tailored with artistic irregularity and single-hair micro-feathering.
              Explore interactive high-resolution clinical results at 9 to 14 months post-operation.
            </p>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setViewMode('slider')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                viewMode === 'slider' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Interactive Slider
            </button>
            <button
              onClick={() => setViewMode('side_by_side')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                viewMode === 'side_by_side' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Side-by-Side
            </button>
          </div>
        </div>

        {/* Case Study Selection Buttons */}
        <div className="flex flex-wrap gap-2 my-8">
          {CASE_STUDIES.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedCaseId(item.id);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                item.id === selectedCaseId
                  ? 'border-amber-400 bg-amber-500/10 text-amber-300 shadow-md'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <span>{item.title}</span>
              <span className="ml-2 text-[10px] text-slate-500">({item.graftCount} Grafts)</span>
            </button>
          ))}
        </div>

        {/* Interactive Comparison Visualizer & Medical Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visualizer Display Column */}
          <div className="lg:col-span-7">
            {viewMode === 'slider' ? (
              <div
                className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 select-none cursor-ew-resize shadow-2xl"
                onMouseMove={handleSliderMove}
                onTouchMove={handleSliderMove}
              >
                {/* After Image (Full background) */}
                <img
                  src={activeCase.afterImage}
                  alt={`${activeCase.title} - After Result`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-xs font-bold text-amber-400 border border-slate-800">
                  After · {activeCase.monthsPostOp} Months ({activeCase.graftCount} Grafts)
                </span>

                {/* Before Image (Clipped overlay) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={activeCase.beforeImage}
                    alt={`${activeCase.title} - Before Procedure`}
                    className="absolute inset-0 h-full w-full object-cover max-w-none"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <span className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-xs font-bold text-slate-300 border border-slate-800">
                    Before · {activeCase.hairLossStage}
                  </span>
                </div>

                {/* Divider Line & Drag Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-lg pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center shadow-xl">
                    <MoveHorizontal className="h-4 w-4 text-amber-400" />
                  </div>
                </div>

                {/* Instruction hint */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] text-slate-300 border border-slate-800 flex items-center gap-1.5 pointer-events-none">
                  <MoveHorizontal className="h-3 w-3 text-amber-400" />
                  <span>Drag or move cursor to compare</span>
                </div>
              </div>
            ) : (
              /* Side by Side Dual View */
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
                  <img
                    src={activeCase.beforeImage}
                    alt="Before"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-sm text-xs font-bold text-slate-300 border border-slate-800">
                    Before: {activeCase.hairLossStage}
                  </div>
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
                  <img
                    src={activeCase.afterImage}
                    alt="After"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-sm text-xs font-bold text-amber-400 border border-slate-800">
                    After: {activeCase.monthsPostOp} Months
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Clinical Case Study Details */}
          <div className="lg:col-span-5 space-y-6 bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
                <Award className="h-4 w-4" />
                <span>Verified Patient Case Study</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">{activeCase.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{activeCase.patientProfile}</p>
            </div>

            {/* Metric pill cards */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Transplanted Grafts</span>
                <span className="text-base font-bold font-serif text-white mt-0.5 block">
                  {activeCase.graftCount.toLocaleString()} Grafts
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Follow-Up Period</span>
                <span className="text-base font-bold font-serif text-amber-400 mt-0.5 block">
                  {activeCase.monthsPostOp} Months Post-Op
                </span>
              </div>
            </div>

            {/* Surgical Notes */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Surgeon Clinical Notes
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
                {activeCase.surgeonNote}
              </p>
            </div>

            {/* Patient Quote */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Quote className="h-3.5 w-3.5 text-amber-400" />
                <span>Patient Perspective</span>
              </h4>
              <blockquote className="text-xs italic text-slate-300 border-l-2 border-amber-400 pl-3">
                "{activeCase.patientQuote}"
              </blockquote>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={onOpenBooking}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 py-3 px-4 font-bold text-xs transition-colors cursor-pointer shadow"
              >
                <Calendar className="h-4 w-4" />
                <span>Schedule a Consultation for Similar Results</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
