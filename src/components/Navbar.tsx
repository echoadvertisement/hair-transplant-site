import React, { useState } from 'react';
import { Calendar, Phone, Sparkles, UserCheck, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenMyAppointments: () => void;
  appointmentCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenMyAppointments,
  appointmentCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      {/* Top emergency and trust strip */}
      <div className="border-b border-slate-900 bg-slate-900/60 px-4 py-1.5 text-xs text-slate-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Surgical Suites Open
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">JCI-Accredited Excellence · ISHRS Certified Surgeons</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:18004244247"
              className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors font-medium"
            >
              <Phone className="h-3 w-3 text-amber-400" />
              <span>+1 (800) 424-HAIR</span>
            </a>
            <span className="text-slate-700">·</span>
            <span className="text-slate-400">Harley St · Manhattan · Beverly Hills</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-amber-950/30 border border-amber-500/40 shadow-sm group-hover:border-amber-400 transition-colors">
            <Sparkles className="h-5 w-5 text-amber-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-tight text-white group-hover:text-amber-200 transition-colors">
              CROWN &amp; FOLLICLE
            </span>
            <span className="text-[10px] tracking-widest uppercase text-slate-400 font-medium">
              Institute of Hair Restoration
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#services" className="hover:text-amber-400 transition-colors">
            Services &amp; Techniques
          </a>
          <a href="#calculator" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <span>Graft Calculator</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Norwood Tool
            </span>
          </a>
          <a href="#results" className="hover:text-amber-400 transition-colors">
            Results &amp; Cases
          </a>
          <a href="#specialists" className="hover:text-amber-400 transition-colors">
            Surgeons
          </a>
          <a href="#standards" className="hover:text-amber-400 transition-colors">
            Clinical Standards
          </a>
          <a href="#faqs" className="hover:text-amber-400 transition-colors">
            FAQs
          </a>
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          {/* My Appointments Button */}
          <button
            onClick={onOpenMyAppointments}
            aria-label={`View my scheduled appointments (${appointmentCount})`}
            className="relative flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:border-slate-600 hover:bg-slate-800 transition-all cursor-pointer"
          >
            <UserCheck className="h-4 w-4 text-amber-400" />
            <span>My Bookings</span>
            {appointmentCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-slate-950">
                {appointmentCount}
              </span>
            )}
          </button>

          {/* Primary Gateway CTA */}
          <button
            onClick={() => onOpenBooking()}
            aria-label="Book a surgical or virtual consultation appointment"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/10 hover:shadow-amber-500/25 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            <Calendar className="h-4 w-4 text-slate-950" />
            <span>Book Consultation</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => onOpenBooking()}
            className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-slate-950"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="p-2 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-300">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400"
            >
              Services &amp; Techniques
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400 flex items-center justify-between"
            >
              <span>Graft Calculator</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Interactive
              </span>
            </a>
            <a
              href="#results"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400"
            >
              Before &amp; After Results
            </a>
            <a
              href="#specialists"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400"
            >
              Surgical Team
            </a>
            <a
              href="#standards"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400"
            >
              Clinical Standards
            </a>
            <a
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400"
            >
              FAQs
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyAppointments();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 py-2.5 text-xs font-semibold text-slate-200"
            >
              <UserCheck className="h-4 w-4 text-amber-400" />
              <span>My Bookings ({appointmentCount})</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 py-2.5 text-xs font-bold text-slate-950"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment Gateway</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
