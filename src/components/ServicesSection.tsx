import React, { useState } from 'react';
import { CLINIC_SERVICES } from '../data/clinicData';
import { Service } from '../types/clinic';
import { Calendar, CheckCircle2, Clock, Sparkles, ChevronRight, Activity, X } from 'lucide-react';
import { formatCurrency } from '../utils/calculator';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'surgical' | 'specialized' | 'non_surgical'>('all');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<Service | null>(null);

  const filteredServices = CLINIC_SERVICES.filter(service => {
    if (activeCategory === 'all') return true;
    return service.category === activeCategory;
  });

  return (
    <section id="services" className="py-20 bg-slate-950 border-b border-slate-800/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-800">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
              World-Class Surgical Specializations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Clinical Procedures &amp; Advanced Techniques
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every procedure is customized to facial bone structure, donor density, and hair curl.
              We deploy the world's most refined micro-punches and sapphire crystal blades for natural results.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Procedures ({CLINIC_SERVICES.length})
            </button>
            <button
              onClick={() => setActiveCategory('surgical')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'surgical'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              FUE &amp; DHI Surgical
            </button>
            <button
              onClick={() => setActiveCategory('specialized')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'specialized'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Beard, Eyebrow &amp; Female
            </button>
            <button
              onClick={() => setActiveCategory('non_surgical')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'non_surgical'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Regenerative PRF
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-amber-500/40 hover:bg-slate-900 transition-all duration-300 shadow-lg"
            >
              {/* Card Top */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                      {service.category === 'surgical'
                        ? 'Surgical Micro-Transplant'
                        : service.category === 'specialized'
                        ? 'Specialized Restoration'
                        : 'Regenerative Therapy'}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-200 transition-colors mt-1">
                      {service.name}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Key specs row */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Clock className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Activity className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{service.recoveryTime}</span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-1.5 pt-2 text-xs text-slate-400">
                  {service.keyHighlights.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-amber-400/80 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Bottom / Action Row */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">Starting Investment</span>
                  <span className="font-serif text-lg font-bold text-white">
                    {formatCurrency(service.priceStartingAt)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedServiceForModal(service)}
                    className="p-2 rounded-lg border border-slate-700 hover:border-slate-500 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="View technical details & clinical protocols"
                    aria-label={`View clinical details for ${service.name}`}
                  >
                    Specs
                  </button>

                  <button
                    onClick={() => onSelectServiceForBooking(service.id)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                    aria-label={`Book appointment for ${service.name}`}
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Technical Specifications & Candidate Guide */}
        {selectedServiceForModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-service-title"
          >
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 text-white shadow-2xl">
              {/* Close Button */}
              <button
                onClick={() => setSelectedServiceForModal(null)}
                aria-label="Close procedure modal"
                className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase font-bold text-amber-400">Clinical Protocol &amp; Specs</span>
                  <h3 id="modal-service-title" className="font-serif text-2xl font-bold text-white mt-1">
                    {selectedServiceForModal.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{selectedServiceForModal.tagline}</p>
                </div>

                {/* Detailed Overview */}
                <div className="text-sm text-slate-300 leading-relaxed space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">Surgical Rationale</h4>
                  <p>{selectedServiceForModal.fullOverview}</p>
                </div>

                {/* Technical Specs Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block">Blade / Instrument</span>
                    <span className="font-semibold text-slate-200 mt-0.5 block">
                      {selectedServiceForModal.techniqueSpecs.bladeType || 'Micro-Surgical Apparatus'}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block">Graft Retention Rate</span>
                    <span className="font-semibold text-emerald-400 mt-0.5 block">
                      {selectedServiceForModal.techniqueSpecs.graftSurvivalRate}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block">Anesthesia Protocol</span>
                    <span className="font-semibold text-slate-200 mt-0.5 block">
                      {selectedServiceForModal.techniqueSpecs.anesthesia}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block">Shaving Requirements</span>
                    <span className="font-semibold text-slate-200 mt-0.5 block">
                      {selectedServiceForModal.techniqueSpecs.shavingRequired}
                    </span>
                  </div>
                </div>

                {/* Ideal Candidates */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Ideal Candidate Profile
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {selectedServiceForModal.idealFor.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded bg-slate-950/40 border border-slate-800/60">
                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal CTA */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Procedure Starting At</span>
                    <span className="font-serif text-xl font-bold text-white">
                      {formatCurrency(selectedServiceForModal.priceStartingAt)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const id = selectedServiceForModal.id;
                      setSelectedServiceForModal(null);
                      onSelectServiceForBooking(id);
                    }}
                    className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 font-bold text-xs cursor-pointer shadow"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Proceed to Book Consultation</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
