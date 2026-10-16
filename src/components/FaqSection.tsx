import React, { useState } from 'react';
import { FAQS } from '../data/clinicData';
import { ChevronDown, HelpCircle, Phone, Calendar } from 'lucide-react';

interface FaqSectionProps {
  onOpenBooking: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenBooking }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-20 bg-slate-950 border-b border-slate-800">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Patient Guidance &amp; Clear Answers</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Frequently Asked Clinical Questions
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Everything you need to know about anesthesia, hair survival, downtime, and long-term results.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-serif text-base font-bold text-white hover:text-amber-300 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-amber-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-950/40">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Strip */}
        <div className="mt-12 p-6 rounded-2xl border border-slate-800 bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white">Have a specific medical or surgical inquiry?</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Our clinical patient coordinators are available 24/7 to review your hair case privately.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:18004244247"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-600 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-amber-400" />
              <span>Call Clinic</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer shadow"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Book Consultation</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
