import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, CheckCircle2, Award, Sparkles, Activity } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onScrollToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onScrollToCalculator }) => {
  return (
    <section className="relative overflow-hidden border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Clinic Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clinical Prestige Kicker */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
              <Award className="h-3.5 w-3.5 text-amber-400" />
              <span>ISHRS Accredited Medical Specialists · Micro-Sapphire &amp; DHI</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              Architectural Precision in{' '}
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                Hair Restoration
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
              Experience the pinnacle of natural hair transplantation. Our board-certified surgeons combine
              gem-grade Sapphire FUE and direct Choi implantation to sculpt microscopic angles, dense hairlines,
              and permanent youthful contours with zero linear scarring.
            </p>

            {/* Key Value Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>98.7% Verified Follicle Retention Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>Needle-Free High-Pressure Anesthesia</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>Single-Hair Natural Feathery Hairlines</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>Lifetime Graft Viability Guarantee</span>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onOpenBooking}
                className="flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 px-6 py-4 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:brightness-105 active:scale-98 transition-all cursor-pointer"
              >
                <Calendar className="h-5 w-5 text-slate-950" />
                <span>Book Consultation Gateway</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onScrollToCalculator}
                className="flex items-center justify-center gap-2.5 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-4 text-sm font-semibold text-slate-200 hover:border-amber-500/50 hover:bg-slate-800 transition-all cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>Norwood Graft Calculator</span>
              </button>
            </div>

            {/* Social Proof & Doctor Endorsement */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-slate-900 object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
                  alt="Verified Patient"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-slate-900 object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
                  alt="Verified Patient"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-slate-900 object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
                  alt="Verified Patient"
                />
              </div>
              <div className="text-xs">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <span>★ ★ ★ ★ ★</span>
                  <span className="text-slate-300 ml-1">4.98 / 5.0</span>
                </div>
                <p className="text-slate-400">Over 12,000+ satisfied restoration patients worldwide</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Clinic Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                    <Activity className="h-4 w-4 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Surgical Standard of Care</h3>
                    <p className="text-[11px] text-slate-400">Crown &amp; Follicle Clinical Protocol</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Active Intake
                </span>
              </div>

              {/* Clinic Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 my-5">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5">
                  <div className="text-2xl font-bold font-serif text-white">55+</div>
                  <div className="text-xs font-medium text-slate-300">Grafts / cm²</div>
                  <p className="text-[10px] text-slate-500 mt-0.5">High-density micro-packing</p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5">
                  <div className="text-2xl font-bold font-serif text-amber-400">0.7 mm</div>
                  <div className="text-xs font-medium text-slate-300">Micro-Sapphire</div>
                  <p className="text-[10px] text-slate-500 mt-0.5">V-groove incision technology</p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5">
                  <div className="text-2xl font-bold font-serif text-emerald-400">98.7%</div>
                  <div className="text-xs font-medium text-slate-300">Survival Yield</div>
                  <p className="text-[10px] text-slate-500 mt-0.5">HypoThermosol + ATP holding</p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5">
                  <div className="text-2xl font-bold font-serif text-white">0% APR</div>
                  <div className="text-xs font-medium text-slate-300">Flexible Financing</div>
                  <p className="text-[10px] text-slate-500 mt-0.5">From $149 / month</p>
                </div>
              </div>

              {/* Consultation Quick Pathway Banner */}
              <div className="rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-950 to-slate-950 p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Private Surgical Planning &amp; Trichoscopy</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                      Meet directly with our surgical director via In-Clinic VIP suite or high-definition virtual consultation.
                    </p>
                  </div>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow"
                >
                  <span>Select Time Slot &amp; Specialist</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Bottom Assurance */}
              <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400 px-1">
                <span>Free 3D Follicle Density Scan</span>
                <span>·</span>
                <span>No Obligation Assessment</span>
                <span>·</span>
                <span>Confidential HIPAA/GDPR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
