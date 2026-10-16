import React from 'react';
import { Sparkles, Phone, Mail, MapPin, ShieldCheck, Award, HeartHandshake } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenMyAppointments: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenMyAppointments }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs">
      {/* Locations and Contact Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-amber-950/30 border border-amber-500/40">
                <Sparkles className="h-5 w-5 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-tight text-white">
                  CROWN &amp; FOLLICLE
                </span>
                <span className="text-[10px] tracking-widest uppercase text-slate-400 font-medium">
                  Institute of Hair Restoration
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              Global leaders in ultra-refined Sapphire FUE, Choi Pen Direct Hair Implantation (DHI), and regenerative trichology.
              Restoring anatomical hairlines with lifetime permanence.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-amber-300">
                <Award className="h-3.5 w-3.5" />
                <span>ISHRS Center of Excellence</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>JCI Quality Standard</span>
              </div>
            </div>
          </div>

          {/* Flagship Locations */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px]">
              Surgical Centers
            </h4>
            <div className="space-y-3 text-slate-300">
              <div>
                <strong className="text-amber-300 block font-medium">New York Flagship</strong>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  740 Park Avenue, Suite 4A<br />
                  Upper East Side, NY 10021
                </p>
              </div>

              <div>
                <strong className="text-amber-300 block font-medium">London Clinic</strong>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  10 Harley Street, Marylebone<br />
                  London W1G 9PF, UK
                </p>
              </div>

              <div>
                <strong className="text-amber-300 block font-medium">Beverly Hills Pavilion</strong>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  9400 Wilshire Boulevard<br />
                  Beverly Hills, CA 90212
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px]">
              Clinical Services
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Sapphire FUE Precision
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  DHI Direct Implantation
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Artas iX Robotic Hair
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Beard &amp; Mustache Restoration
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Female Hairline Lowering
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Autologous PRF Therapy
                </a>
              </li>
            </ul>
          </div>

          {/* Patient Portal & Hotline */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px]">
              Patient Gateway
            </h4>
            <div className="space-y-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-center block transition-colors cursor-pointer"
              >
                Book Consultation
              </button>
              <button
                onClick={onOpenMyAppointments}
                className="w-full py-2 px-3 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-center block transition-colors cursor-pointer"
              >
                Access My Bookings
              </button>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Phone className="h-3.5 w-3.5 text-amber-400" />
                <span>+1 (800) 424-4247</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Mail className="h-3.5 w-3.5 text-amber-400" />
                <span>concierge@crownfollicle.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-900 space-y-3 text-[11px] text-slate-400">
          <p className="leading-relaxed">
            <strong>Medical Disclaimer:</strong> The information provided on this website is for informational and educational
            purposes only and does not substitute professional medical advice, diagnosis, or treatment. Individual surgical
            results may vary based on donor density, scalp physiology, and post-operative adherence. Surgical procedures are
            performed exclusively by board-certified physicians in fully accredited outpatient surgical facilities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-slate-400">
            <div>
              © 2026 Crown &amp; Follicle Institute of Hair Restoration Inc. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="hover:text-slate-300 cursor-pointer">Privacy Policy (HIPAA / GDPR)</span>
              <span>·</span>
              <span className="hover:text-slate-300 cursor-pointer">Surgical Terms &amp; Warranties</span>
              <span>·</span>
              <span className="hover:text-slate-300 cursor-pointer">Accreditations</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
