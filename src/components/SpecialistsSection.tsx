import React from 'react';
import { SPECIALISTS } from '../data/clinicData';
import { Award, Calendar, CheckCircle2, GraduationCap, ShieldCheck } from 'lucide-react';

interface SpecialistsSectionProps {
  onSelectSurgeon: (surgeonId: string) => void;
}

export const SpecialistsSection: React.FC<SpecialistsSectionProps> = ({ onSelectSurgeon }) => {
  return (
    <section id="specialists" className="py-20 bg-slate-900/60 border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
            Surgical Faculty &amp; Board Members
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            World-Renowned Hair Restoration Surgeons
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Our surgeons do not delegate critical surgical steps. Every hairline is artistically designed and
            every micro-channel is personally executed by our board-certified medical leaders.
          </p>
        </div>

        {/* Specialists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECIALISTS.map(spec => (
            <div
              key={spec.id}
              className="group rounded-2xl border border-slate-800 bg-slate-950 p-5 flex flex-col justify-between hover:border-amber-500/40 hover:shadow-xl transition-all duration-300"
            >
              <div>
                {/* Doctor Avatar with badge */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-900 mb-4 flex items-center justify-center">
                  <img
                    src={spec.avatarUrl}
                    alt={spec.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 -z-0 flex items-center justify-center bg-slate-900 text-amber-400 font-serif text-2xl font-bold">
                    {spec.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  {spec.ishrsMember && (
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-amber-400 border border-slate-800 flex items-center gap-1 z-10">
                      <Award className="h-3 w-3" />
                      <span>ISHRS Fellow</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-1.5">
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {spec.name}
                  </h3>
                  <div className="text-xs font-semibold text-amber-400">{spec.title}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <GraduationCap className="h-3.5 w-3.5 text-slate-500 flex-shrink-0" />
                    <span className="truncate">{spec.degrees}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mt-3 line-clamp-4">
                  {spec.bio}
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-900 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Experience</span>
                    <span className="font-bold text-white">{spec.experienceYears}+ Years</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Surgeries</span>
                    <span className="font-bold text-emerald-400">{spec.surgeriesCompleted.toLocaleString()}+</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectSurgeon(spec.id)}
                className="mt-5 w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 py-2.5 text-xs font-bold text-slate-200 hover:border-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Book With {spec.name.split(' ')[1]}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
