export type ConsultationType = 'in_clinic' | 'virtual_video' | 'vip_surgical_planning';

export interface Service {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  fullOverview: string;
  category: 'surgical' | 'non_surgical' | 'specialized';
  recoveryTime: string;
  duration: string;
  densityTarget: string;
  priceStartingAt: number;
  featured: boolean;
  idealFor: string[];
  keyHighlights: string[];
  techniqueSpecs: {
    bladeType?: string;
    incisionRequired?: boolean;
    anesthesia: string;
    graftSurvivalRate: string;
    shavingRequired: string;
  };
}

export interface Specialist {
  id: string;
  name: string;
  title: string;
  degrees: string;
  ishrsMember: boolean;
  experienceYears: number;
  surgeriesCompleted: number;
  specialty: string;
  avatarUrl: string;
  bio: string;
  availableDays: string[]; // e.g. ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
}

export interface NorwoodStage {
  stage: number;
  label: string;
  subtitle: string;
  description: string;
  minGrafts: number;
  maxGrafts: number;
  primaryZone: string;
  recommendedTechnique: string;
  hairlinePattern: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  patientProfile: string; // e.g. "Male, 34 · London"
  procedure: string;
  technique: string;
  graftCount: number;
  monthsPostOp: number;
  hairLossStage: string;
  surgeonNote: string;
  patientQuote: string;
  beforeImage: string;
  afterImage: string;
}

export interface Appointment {
  id: string;
  referenceCode: string;
  consultationType: ConsultationType;
  serviceId: string;
  specialistId: string;
  date: string;
  timeSlot: string;
  patientName: string;
  email: string;
  phone: string;
  hairLossPattern?: string;
  estimatedGrafts?: number;
  notes?: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  paymentMethod: 'pay_at_clinic' | 'deposit_authorized';
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  procedure: string;
  grafts: number;
  rating: number;
  review: string;
  timeframe: string;
  verified: boolean;
}
