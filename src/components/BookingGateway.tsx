import React, { useState, useEffect } from 'react';
import { CLINIC_SERVICES, SPECIALISTS } from '../data/clinicData';
import { ConsultationType, Appointment } from '../types/clinic';
import {
  validateAppointmentForm,
  generateBookingReference,
  formatCurrency,
} from '../utils/calculator';
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Download,
  AlertCircle,
  Video,
  Building2,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  X,
} from 'lucide-react';

interface BookingGatewayProps {
  initialServiceId?: string;
  initialAssessment?: {
    stage: number;
    grafts: number;
    technique: string;
    stageLabel: string;
  } | null;
  onAppointmentBooked: (appointment: Appointment) => void;
  isOpenAsModal?: boolean;
  onCloseModal?: () => void;
}

export const BookingGateway: React.FC<BookingGatewayProps> = ({
  initialServiceId,
  initialAssessment,
  onAppointmentBooked,
  isOpenAsModal = false,
  onCloseModal,
}) => {
  // Step indicator: 1 = Modality & Service, 2 = Specialist & Schedule, 3 = Patient Info, 4 = Confirmed
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [consultationType, setConsultationType] = useState<ConsultationType>('in_clinic');
  const [serviceId, setServiceId] = useState<string>(initialServiceId || CLINIC_SERVICES[0].id);
  const [specialistId, setSpecialistId] = useState<string>(SPECIALISTS[0].id);
  const [date, setDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('10:30 AM');
  const [patientName, setPatientName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [hairLossNotes, setHairLossNotes] = useState<string>('');

  // Sync if initial props change
  useEffect(() => {
    if (initialServiceId) {
      setServiceId(initialServiceId);
    }
  }, [initialServiceId]);

  useEffect(() => {
    if (initialAssessment) {
      setHairLossNotes(
        `Calculated via Norwood Tool: ${initialAssessment.stageLabel} (~${initialAssessment.grafts} Grafts recommended via ${initialAssessment.technique})`
      );
    }
  }, [initialAssessment]);

  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Set default appointment date to 3 days from now
  useEffect(() => {
    const future = new Date();
    future.setDate(future.getDate() + 3);
    const yyyy = future.getFullYear();
    const mm = String(future.getMonth() + 1).padStart(2, '0');
    const dd = String(future.getDate()).padStart(2, '0');
    setDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '11:45 AM',
    '01:30 PM',
    '03:00 PM',
    '04:30 PM',
    '06:00 PM (VIP)',
  ];

  const selectedService = CLINIC_SERVICES.find(s => s.id === serviceId) || CLINIC_SERVICES[0];
  const selectedSpecialist = SPECIALISTS.find(s => s.id === specialistId) || SPECIALISTS[0];

  const handleNextToStep2 = () => {
    if (!serviceId) {
      setErrors({ serviceId: 'Please select a procedure or concern.' });
      return;
    }
    setErrors({});
    setCurrentStep(2);
  };

  const handleNextToStep3 = () => {
    if (!date) {
      setErrors({ date: 'Please select an appointment date.' });
      return;
    }
    if (!timeSlot) {
      setErrors({ timeSlot: 'Please choose an available time slot.' });
      return;
    }
    setErrors({});
    setCurrentStep(3);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateAppointmentForm({
      patientName,
      email,
      phone,
      date,
      timeSlot,
      serviceId,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    const newBooking: Appointment = {
      id: 'apt-' + Date.now(),
      referenceCode: generateBookingReference(),
      consultationType,
      serviceId,
      specialistId,
      date,
      timeSlot,
      patientName: patientName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      hairLossPattern: initialAssessment?.stageLabel || 'Personal Consultation',
      estimatedGrafts: initialAssessment?.grafts,
      notes: hairLossNotes,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      paymentMethod: 'pay_at_clinic',
    };

    // Save to local storage
    try {
      const existingRaw = localStorage.getItem('cf_appointments');
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      localStorage.setItem('cf_appointments', JSON.stringify([newBooking, ...existing]));
    } catch {
      // LocalStorage fallback
    }

    setConfirmedBooking(newBooking);
    onAppointmentBooked(newBooking);
    setCurrentStep(4);
  };

  // Generate .ICS Calendar File
  const handleDownloadCalendar = () => {
    if (!confirmedBooking) return;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Crown & Follicle Institute//Hair Restoration Consultation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:Hair Restoration Consultation - Crown & Follicle Institute (${confirmedBooking.referenceCode})`,
      `DESCRIPTION:Consultation with ${selectedSpecialist.name} for ${selectedService.name}. Ref: ${confirmedBooking.referenceCode}`,
      `LOCATION:${confirmedBooking.consultationType === 'in_clinic' ? 'Flagship Surgical Center, 740 Park Avenue, New York, NY' : 'Secure HD Video Suite (Link will be emailed)'}`,
      `DTSTART:${confirmedBooking.date.replace(/-/g, '')}T100000Z`,
      `DTEND:${confirmedBooking.date.replace(/-/g, '')}T110000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `appointment-${confirmedBooking.referenceCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const containerContent = (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl overflow-hidden">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-amber-400">
              Official Appointment Gateway
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Book Your Surgical Consultation
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Confidential 1-on-1 assessment with board-certified hair restoration specialists.
          </p>
        </div>

        {isOpenAsModal && onCloseModal && (
          <button
            onClick={onCloseModal}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close booking gateway"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Progress Stepper */}
      <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-950 text-xs">
        <div
          className={`py-3 px-4 text-center font-semibold border-b-2 transition-all ${
            currentStep === 1
              ? 'border-amber-400 text-amber-300 bg-slate-900/40'
              : currentStep > 1
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-500'
          }`}
        >
          1. Modality &amp; Service
        </div>
        <div
          className={`py-3 px-4 text-center font-semibold border-b-2 transition-all ${
            currentStep === 2
              ? 'border-amber-400 text-amber-300 bg-slate-900/40'
              : currentStep > 2
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-500'
          }`}
        >
          2. Specialist &amp; Slot
        </div>
        <div
          className={`py-3 px-4 text-center font-semibold border-b-2 transition-all ${
            currentStep === 3
              ? 'border-amber-400 text-amber-300 bg-slate-900/40'
              : currentStep === 4
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-500'
          }`}
        >
          3. Patient Confirmation
        </div>
      </div>

      {/* Main Form Body */}
      <div className="p-6 sm:p-8">
        {/* STEP 1: Modality & Service Selection */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Consultation Modality Toggle */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Choose Consultation Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setConsultationType('in_clinic')}
                  className={`flex items-start gap-3.5 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    consultationType === 'in_clinic'
                      ? 'border-amber-400 bg-amber-500/10 shadow-md'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  <Building2
                    className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                      consultationType === 'in_clinic' ? 'text-amber-400' : 'text-slate-400'
                    }`}
                  />
                  <div>
                    <div className="font-semibold text-sm text-white flex items-center gap-1.5">
                      <span>In-Clinic VIP Suite</span>
                      <span className="text-[10px] text-amber-400 font-normal">3D Scalp Scan</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Microscopic trichoscopy scan, live surgical hairline drawing, and donor density analysis.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultationType('virtual_video')}
                  className={`flex items-start gap-3.5 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    consultationType === 'virtual_video'
                      ? 'border-amber-400 bg-amber-500/10 shadow-md'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  <Video
                    className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                      consultationType === 'virtual_video' ? 'text-amber-400' : 'text-slate-400'
                    }`}
                  />
                  <div>
                    <div className="font-semibold text-sm text-white flex items-center gap-1.5">
                      <span>HD Virtual Video Session</span>
                      <span className="text-[10px] text-emerald-400 font-normal">Remote Friendly</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Encrypted telehealth consultation for out-of-town and international patients.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Assessment Pre-Fill Notice */}
            {initialAssessment && (
              <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span className="text-slate-200">
                    Imported from Norwood Calculator:{' '}
                    <strong className="text-amber-300">{initialAssessment.stageLabel}</strong> (~
                    {initialAssessment.grafts} Grafts)
                  </span>
                </div>
                <span className="text-[11px] text-emerald-400 font-bold">Synchronized</span>
              </div>
            )}

            {/* Service Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Select Procedure or Concern
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                {CLINIC_SERVICES.map(srv => {
                  const isSelected = srv.id === serviceId;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setServiceId(srv.id)}
                      className={`flex flex-col p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-400 bg-amber-500/10 shadow-sm'
                          : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{srv.name}</span>
                        <span className="text-[11px] font-semibold text-amber-400">
                          From {formatCurrency(srv.priceStartingAt)}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                        {srv.tagline}
                      </p>
                    </button>
                  );
                })}
              </div>
              {errors.serviceId && (
                <p className="text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>{errors.serviceId}</span>
                </p>
              )}
            </div>

            {/* Continue Button */}
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={handleNextToStep2}
                className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 text-xs font-bold transition-all cursor-pointer shadow"
              >
                <span>Continue to Specialist &amp; Slot</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Specialist & Schedule */}
        {currentStep === 2 && (
          <div className="space-y-6">
            {/* Specialist Picker */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Select Senior Surgeon or Specialist
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SPECIALISTS.map(spec => {
                  const isSelected = spec.id === specialistId;
                  return (
                    <button
                      key={spec.id}
                      type="button"
                      onClick={() => setSpecialistId(spec.id)}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-400 bg-amber-500/10 shadow-sm'
                          : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
                      }`}
                    >
                      <img
                        src={spec.avatarUrl}
                        alt={spec.name}
                        className="h-12 w-12 rounded-xl object-cover border border-slate-700 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white truncate">{spec.name}</div>
                        <div className="text-[10px] text-amber-400">{spec.title}</div>
                        <div className="text-[10px] text-slate-400 mt-1 truncate">
                          {spec.experienceYears} Years Exp · {spec.surgeriesCompleted}+ Procedures
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date & Time Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Date Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  Select Consultation Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                {errors.date && <p className="text-xs text-rose-400">{errors.date}</p>}
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  Available Time Slots
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map(slot => {
                    const isSelected = slot === timeSlot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-amber-400 bg-amber-500 text-slate-950 font-bold shadow'
                            : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                {errors.timeSlot && <p className="text-xs text-rose-400">{errors.timeSlot}</p>}
              </div>
            </div>

            {/* Stepper Navigation */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNextToStep3}
                className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 text-xs font-bold transition-all cursor-pointer shadow"
              >
                <span>Continue to Patient Details</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Patient Information Form */}
        {currentStep === 3 && (
          <form onSubmit={handleFinalSubmit} className="space-y-6">
            {/* Booking Summary Card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">Procedure</span>
                <span className="font-semibold text-white">{selectedService.shortName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Surgeon</span>
                <span className="font-semibold text-amber-300">{selectedSpecialist.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Time Slot</span>
                <span className="font-semibold text-white">
                  {date} at {timeSlot}
                </span>
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  Full Legal Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="e.g. Alexander Sterling"
                    value={patientName}
                    onChange={e => setPatientName(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
                {errors.patientName && <p className="text-xs text-rose-400">{errors.patientName}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
                {errors.email && <p className="text-xs text-rose-400">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  Mobile Telephone *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
                {errors.phone && <p className="text-xs text-rose-400">{errors.phone}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  Hair Loss Duration / Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Thinning past 4 years, family history"
                  value={hairLossNotes}
                  onChange={e => setHairLossNotes(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Clinical Guarantee Note */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 flex items-start gap-2.5 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                Zero pre-payment or credit card required for consultation reservation. Free cancellation or
                rescheduling up to 24 hours prior. All medical data protected under strict HIPAA &amp; GDPR compliance.
              </span>
            </div>

            {/* Stepper Navigation */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 px-7 py-3.5 text-xs font-bold shadow-lg shadow-amber-500/20 hover:brightness-105 active:scale-98 transition-all cursor-pointer"
              >
                <CheckCircle2 className="h-4 w-4 text-slate-950" />
                <span>Confirm &amp; Issue Consultation Pass</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Confirmed Booking Gateway Pass */}
        {currentStep === 4 && confirmedBooking && (
          <div className="space-y-6 text-center sm:text-left">
            {/* Success Header */}
            <div className="flex flex-col sm:flex-row items-center gap-4 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 font-bold">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  Appointment Confirmed &amp; Reserved
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                  Welcome, {confirmedBooking.patientName}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Your appointment pass has been registered in the surgical scheduling queue.
                </p>
              </div>
              <div className="text-center sm:text-right">
                <span className="text-[10px] text-slate-400 uppercase block">Booking Reference</span>
                <span className="font-mono text-lg font-bold text-amber-300 px-3 py-1 bg-slate-950 rounded-lg border border-slate-800 inline-block mt-0.5">
                  {confirmedBooking.referenceCode}
                </span>
              </div>
            </div>

            {/* Appointment Details Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Consultation Details Summary
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                  <span className="text-slate-500 block">Date &amp; Time</span>
                  <span className="font-semibold text-white mt-0.5 block">
                    {confirmedBooking.date}
                  </span>
                  <span className="text-amber-400 text-[11px] block">{confirmedBooking.timeSlot}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                  <span className="text-slate-500 block">Format</span>
                  <span className="font-semibold text-white mt-0.5 block">
                    {confirmedBooking.consultationType === 'in_clinic' ? 'In-Clinic VIP Suite' : 'HD Virtual Video'}
                  </span>
                  <span className="text-slate-400 text-[11px] block">Private Examination</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                  <span className="text-slate-500 block">Attending Surgeon</span>
                  <span className="font-semibold text-white mt-0.5 block">
                    {selectedSpecialist.name}
                  </span>
                  <span className="text-slate-400 text-[11px] block">Chief Specialist</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                  <span className="text-slate-500 block">Procedure Focus</span>
                  <span className="font-semibold text-white mt-0.5 block">
                    {selectedService.shortName}
                  </span>
                  <span className="text-emerald-400 text-[11px] block">Assessment Included</span>
                </div>
              </div>

              {/* Pre-Consultation Instructions */}
              <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300 space-y-2">
                <span className="font-bold text-amber-300 block">
                  Pre-Consultation Clinical Checklist:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                    <span>Bring any recent blood work or medical history</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                    <span>Avoid heavy hair styling waxes or fibers on consultation morning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                    <span>Virtual sessions: ensure high-resolution lighting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                    <span>Confirmation SMS and calendar invite sent to {confirmedBooking.phone}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Actions: Download Calendar, Book Another, Close */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadCalendar}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-3 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
              >
                <Download className="h-4 w-4 text-amber-400" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCurrentStep(1);
                  setConfirmedBooking(null);
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 text-slate-300 px-5 py-3 text-xs font-medium transition-colors cursor-pointer"
              >
                <span>Book Another Appointment</span>
              </button>

              {isOpenAsModal && onCloseModal && (
                <button
                  type="button"
                  onClick={onCloseModal}
                  className="w-full sm:w-auto ml-auto flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 text-xs font-bold transition-colors cursor-pointer"
                >
                  <span>Done</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (isOpenAsModal) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {containerContent}
      </div>
    );
  }

  return (
    <section id="book" className="py-20 bg-slate-950 border-b border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{containerContent}</div>
    </section>
  );
};
