/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { NorwoodCalculator } from './components/NorwoodCalculator';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { BookingGateway } from './components/BookingGateway';
import { SpecialistsSection } from './components/SpecialistsSection';
import { ClinicalStandards } from './components/ClinicalStandards';
import { TimelineSection } from './components/TimelineSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { MyAppointmentsModal } from './components/MyAppointmentsModal';
import { Appointment } from './types/clinic';

// Demo initial appointment so the patient portal works immediately
const INITIAL_DEMO_APPOINTMENT: Appointment = {
  id: 'demo-apt-01',
  referenceCode: 'CF-V83P9Q',
  consultationType: 'in_clinic',
  serviceId: 'fue-sapphire',
  specialistId: 'dr-julian-vance',
  date: '2026-10-24',
  timeSlot: '10:30 AM',
  patientName: 'Alexander Sterling',
  email: 'alex.sterling@example.com',
  phone: '+1 (555) 234-5678',
  hairLossPattern: 'Norwood Stage III Vertex',
  estimatedGrafts: 2800,
  notes: 'Interested in hairline contour refinement and crown densification.',
  status: 'confirmed',
  createdAt: new Date().toISOString(),
  paymentMethod: 'pay_at_clinic',
};

export default function App() {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const stored = localStorage.getItem('cf_appointments');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return [INITIAL_DEMO_APPOINTMENT];
  });

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMyAppointmentsOpen, setIsMyAppointmentsOpen] = useState(false);
  const [activeBookingServiceId, setActiveBookingServiceId] = useState<string | undefined>(undefined);
  const [activeAssessment, setActiveAssessment] = useState<{
    stage: number;
    grafts: number;
    technique: string;
    stageLabel: string;
  } | null>(null);

  // Sync appointments to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cf_appointments', JSON.stringify(appointments));
    } catch {
      // ignore
    }
  }, [appointments]);

  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) {
      setActiveBookingServiceId(serviceId);
    }
    // Smooth scroll to integrated booking section, or open modal if mobile/deep in page
    const bookEl = document.getElementById('book');
    if (bookEl) {
      bookEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsBookingModalOpen(true);
    }
  };

  const handleTransferAssessmentToBooking = (assessment: {
    stage: number;
    grafts: number;
    technique: string;
    stageLabel: string;
  }) => {
    setActiveAssessment(assessment);
    const bookEl = document.getElementById('book');
    if (bookEl) {
      bookEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToCalculator = () => {
    const calcEl = document.getElementById('calculator');
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAppointmentBooked = (newApt: Appointment) => {
    setAppointments(prev => [newApt, ...prev.filter(a => a.id !== newApt.id)]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const handleSelectSurgeon = (_surgeonId: string) => {
    handleOpenBooking();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Navigation Bar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenMyAppointments={() => setIsMyAppointmentsOpen(true)}
        appointmentCount={appointments.length}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onScrollToCalculator={handleScrollToCalculator}
        />

        {/* Clinical Services */}
        <ServicesSection onSelectServiceForBooking={handleOpenBooking} />

        {/* Interactive Norwood Scale & Graft Calculator */}
        <NorwoodCalculator onTransferToBooking={handleTransferAssessmentToBooking} />

        {/* Results Before & After Interactive Slider */}
        <BeforeAfterGallery onOpenBooking={() => handleOpenBooking()} />

        {/* Central Appointment Booking Gateway */}
        <BookingGateway
          initialServiceId={activeBookingServiceId}
          initialAssessment={activeAssessment}
          onAppointmentBooked={handleAppointmentBooked}
        />

        {/* Surgical Specialists & Board Faculty */}
        <SpecialistsSection onSelectSurgeon={handleSelectSurgeon} />

        {/* Clinical Standards & Science */}
        <ClinicalStandards />

        {/* 12-Month Post-Op Recovery Journey */}
        <TimelineSection />

        {/* Patient FAQs */}
        <FaqSection onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenMyAppointments={() => setIsMyAppointmentsOpen(true)}
      />

      {/* Modal: My Appointments Patient Portal */}
      <MyAppointmentsModal
        isOpen={isMyAppointmentsOpen}
        onClose={() => setIsMyAppointmentsOpen(false)}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        onOpenNewBooking={() => {
          setIsMyAppointmentsOpen(false);
          handleOpenBooking();
        }}
      />

      {/* Modal: Booking Gateway (when triggered as modal) */}
      {isBookingModalOpen && (
        <BookingGateway
          isOpenAsModal={true}
          initialServiceId={activeBookingServiceId}
          initialAssessment={activeAssessment}
          onCloseModal={() => setIsBookingModalOpen(false)}
          onAppointmentBooked={apt => {
            handleAppointmentBooked(apt);
          }}
        />
      )}
    </div>
  );
}
