import React, { useState } from 'react';
import { Appointment } from '../types/clinic';
import { CLINIC_SERVICES, SPECIALISTS } from '../data/clinicData';
import {
  Calendar,
  Clock,
  UserCheck,
  X,
  Trash2,
  Download,
  AlertCircle,
  Building2,
  Video,
  ExternalLink,
} from 'lucide-react';

interface MyAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onOpenNewBooking: () => void;
}

export const MyAppointmentsModal: React.FC<MyAppointmentsModalProps> = ({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment,
  onOpenNewBooking,
}) => {
  const [confirmingCancelId, setConfirmingCancelId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownloadICS = (apt: Appointment) => {
    const srv = CLINIC_SERVICES.find(s => s.id === apt.serviceId) || CLINIC_SERVICES[0];
    const spec = SPECIALISTS.find(s => s.id === apt.specialistId) || SPECIALISTS[0];

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Crown & Follicle Institute//Hair Restoration Consultation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:Hair Consultation - ${srv.shortName} (${apt.referenceCode})`,
      `DESCRIPTION:Consultation with ${spec.name} for ${srv.name}. Ref: ${apt.referenceCode}`,
      `LOCATION:${apt.consultationType === 'in_clinic' ? 'Flagship Surgical Center, 740 Park Avenue, New York, NY' : 'Secure HD Video Suite'}`,
      `DTSTART:${apt.date.replace(/-/g, '')}T100000Z`,
      `DTEND:${apt.date.replace(/-/g, '')}T110000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `appointment-${apt.referenceCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="my-appointments-title"
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 id="my-appointments-title" className="font-serif text-xl font-bold text-white">
                My Consultation Bookings
              </h2>
              <p className="text-xs text-slate-400">
                Manage your scheduled appointments, clinical instructions, and calendar invites.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close my appointments dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-4">
          {appointments.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/80 text-slate-400">
                <Calendar className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-white">No Appointments Reserved Yet</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  You haven't scheduled a hair restoration consultation yet. Use our booking gateway to reserve a VIP in-clinic or virtual session.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenNewBooking();
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 text-xs font-bold transition-all cursor-pointer shadow"
              >
                <Calendar className="h-4 w-4" />
                <span>Book First Consultation</span>
              </button>
            </div>
          ) : (
            appointments.map(apt => {
              const service = CLINIC_SERVICES.find(s => s.id === apt.serviceId) || CLINIC_SERVICES[0];
              const specialist = SPECIALISTS.find(s => s.id === apt.specialistId) || SPECIALISTS[0];

              return (
                <div
                  key={apt.id}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      Ref: {apt.referenceCode}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {apt.status === 'confirmed' ? 'Confirmed & Active' : apt.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <span className="text-slate-500 block">Procedure</span>
                      <span className="font-semibold text-white text-sm mt-0.5 block">
                        {service.name}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block">Attending Surgeon</span>
                      <span className="font-semibold text-amber-300 text-sm mt-0.5 block">
                        {specialist.name}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block">Date &amp; Time</span>
                      <span className="font-semibold text-white mt-0.5 flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>{apt.date} at {apt.timeSlot}</span>
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block">Format</span>
                      <span className="font-semibold text-white mt-0.5 flex items-center gap-1.5">
                        {apt.consultationType === 'in_clinic' ? (
                          <>
                            <Building2 className="h-3.5 w-3.5 text-amber-400" />
                            <span>In-Clinic VIP Suite (Manhattan)</span>
                          </>
                        ) : (
                          <>
                            <Video className="h-3.5 w-3.5 text-emerald-400" />
                            <span>HD Virtual Video Session</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {apt.notes && (
                    <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-500 font-medium">Notes:</span> {apt.notes}
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleDownloadICS(apt)}
                      className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download Calendar Event (.ics)</span>
                    </button>

                    {confirmingCancelId === apt.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400">Cancel booking?</span>
                        <button
                          onClick={() => {
                            onCancelAppointment(apt.id);
                            setConfirmingCancelId(null);
                          }}
                          className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[11px] font-bold hover:bg-rose-500/30 cursor-pointer"
                        >
                          Yes, Cancel
                        </button>
                        <button
                          onClick={() => setConfirmingCancelId(null)}
                          className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-[11px] hover:text-white cursor-pointer"
                        >
                          Keep
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmingCancelId(apt.id)}
                        className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Cancel Booking</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {appointments.length > 0 && (
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                onClose();
                onOpenNewBooking();
              }}
              className="text-xs text-amber-400 hover:underline cursor-pointer"
            >
              + Book Another Consultation
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
