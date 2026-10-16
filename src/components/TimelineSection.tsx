import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      time: 'Days 1 - 3',
      title: 'Initial Healing & Follicle Anchorage',
      summary: 'Grafts establish vital micro-vascular capillary connections in their new recipient sites.',
      details: [
        'Donor and recipient areas remain lightly bandaged for 24 hours.',
        'Zero friction on grafts; sleep elevated at a 45-degree angle.',
        'Painless saline spray mist applied every 2 hours to keep grafts hydrated.',
        'No pain, slight tightness managed with mild over-the-counter analgesics.',
      ],
      state: 'Anchor Phase',
    },
    {
      time: 'Day 10',
      title: 'Crust & Scab Shedding (Social Return)',
      summary: 'Scalp washes clean, recipient redness softens into a light sunburn appearance.',
      details: [
        'Gentle massaging wash cleanses all micro-scabs and crusts completely.',
        'Follicular roots are permanently locked beneath the skin surface.',
        'Patient can return to work, casual social gatherings, and wear loose hats.',
        'Light cardiovascular exercise (walking, brisk cycling) can resume.',
      ],
      state: 'Clean Scalp',
    },
    {
      time: 'Month 2 - 3',
      title: 'The "Shock Loss" Phase (Expected & Normal)',
      summary: 'Transplanted hair shafts shed as hair bulbs transition into a resting telogen phase.',
      details: [
        'The temporary shedding of transplanted hair shafts is a medically normal stage.',
        'The living dermal papilla and stem cells remain safely alive under the skin.',
        'PRP or PRF booster sessions can be scheduled to stimulate vascular awakening.',
        'Patience is key: follicles are preparing for robust lifelong anagen growth.',
      ],
      state: 'Dormancy Cycle',
    },
    {
      time: 'Month 6',
      title: 'Active Sprouting & 50-60% Density',
      summary: 'Fine, youthful hairs sprout rapidly across the entire hairline and recipient zones.',
      details: [
        'Visible new growth accelerates across temples and crown.',
        'Hair can be washed, styled, combed, and trimmed normally.',
        'Texture starts as fine hair and gradually thickens over the next 180 days.',
        'First comprehensive 6-month clinical review with your surgeon.',
      ],
      state: 'New Hair Growth',
    },
    {
      time: 'Month 12 - 14',
      title: 'Full Mature Density & Complete Aesthetic Result',
      summary: '100% of transplanted follicles reach full caliber, mature curl, and natural thickness.',
      details: [
        'Final aesthetic density achieved with organic natural hair direction.',
        'Zero visible scar lines in donor area even with a close fade or buzzcut.',
        'Transplanted hair is permanent, genetically resistant to DHT, and cycles for life.',
        'Final photographic trichoscopy comparison and lifetime warranty sign-off.',
      ],
      state: 'Final Result',
    },
  ];

  return (
    <section className="py-20 bg-slate-900/40 border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
            Post-Operative Recovery Roadmap
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            What to Expect: From Day 1 to Month 12
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Understanding the biological hair cycle ensures complete peace of mind. We provide continuous
            round-the-clock surgeon access and scheduled milestone reviews throughout your year of growth.
          </p>
        </div>

        {/* Timeline Stage Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {stages.map((st, i) => (
            <button
              key={i}
              onClick={() => setActiveStage(i)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                activeStage === i
                  ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-md'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              <span className="font-mono text-amber-400/80 mr-1.5">{st.time}:</span>
              <span>{st.state}</span>
            </button>
          ))}
        </div>

        {/* Selected Stage Detail Card */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                Milestone: {stages[activeStage].time}
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                {stages[activeStage].title}
              </h3>
            </div>
            <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              {stages[activeStage].state}
            </span>
          </div>

          <p className="text-sm text-slate-300 font-medium py-4 leading-relaxed">
            {stages[activeStage].summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {stages[activeStage].details.map((detail, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300"
              >
                <CheckCircle2 className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
