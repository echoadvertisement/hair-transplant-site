import React from 'react';
import { ShieldCheck, Microscope, HeartPulse, Sparkles, CheckCircle2, Award } from 'lucide-react';

export const ClinicalStandards: React.FC = () => {
  const standards = [
    {
      icon: Microscope,
      title: 'HypoThermosol & ATP Cell Media',
      subtitle: '98.7% Graft Survival Rate',
      description:
        'Harvested follicles are placed immediately into chilled (4°C) bio-preservation solution enriched with ATP, maintaining intracellular osmotic pressure and preventing reperfusion injury.',
    },
    {
      icon: HeartPulse,
      title: 'Needle-Free Jet Anesthesia',
      subtitle: 'Pain-Free Patient Protocol',
      description:
        'We eliminate dental-style needles using an advanced high-velocity pneumatic jet injector, numbing subcutaneous nerves in under 0.2 seconds with virtually zero patient discomfort.',
    },
    {
      icon: ShieldCheck,
      title: '20x Stereoscopic Microscopy',
      subtitle: '100% Micro-Inspection',
      description:
        'Every single follicular unit is inspected and trimmed by surgical technicians under dual-optical Mantis microscopes, sorting single-hair units for soft hairlines and multi-hair units for density.',
    },
    {
      icon: Sparkles,
      title: 'V-Profile Sapphire Blades',
      subtitle: 'Micro-Incision Precision',
      description:
        'Crafted from synthetic corundum gemstone, our custom 0.7mm - 0.9mm sapphire blades generate microscopic V-shaped channels that heal cleanly without collagen scar tissue.',
    },
    {
      icon: Award,
      title: 'Positive Pressure HEPA Suites',
      subtitle: 'Hospital-Grade Sterility',
      description:
        'Our surgical theaters operate under sterile laminar airflows filtering 99.99% of particulate matter, exceeding outpatient JCI and AAAASF surgical safety thresholds.',
    },
    {
      icon: CheckCircle2,
      title: 'Lifetime Follicle Warranty',
      subtitle: 'Certified Clinical Guarantee',
      description:
        'Because permanent donor follicles are DHT-immune, all transplanted follicles carry our written lifetime viability guarantee. Should any graft fail to take, we replace it at zero surgical cost.',
    },
  ];

  return (
    <section id="standards" className="py-20 bg-slate-950 border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
            Surgical Rigor &amp; Laboratory Excellence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            The Science Behind Our 98.7% Retention Rate
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            A successful hair transplant is not just about moving hairs — it is an exacting micro-vascular procedure
            requiring advanced preservation biology, surgical instrumentation, and sterile protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {standards.map((std, idx) => {
            const Icon = std.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-white">{std.title}</h3>
                    <span className="text-[11px] font-semibold text-emerald-400">{std.subtitle}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-1">{std.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
