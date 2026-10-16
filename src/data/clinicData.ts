import { Service, Specialist, NorwoodStage, CaseStudy, Testimonial } from '../types/clinic';

export const CLINIC_SERVICES: Service[] = [
  {
    id: 'fue-sapphire',
    name: 'Sapphire FUE Precision Hair Transplant',
    shortName: 'Sapphire FUE',
    tagline: 'Gem-grade sapphire blades create micro-channels for ultra-dense, natural hairline restoration.',
    description: 'Our flagship surgical procedure uses medical-grade sapphire crystal blades to create V-shaped incisions, yielding microscopic channels, minimal tissue trauma, zero linear scarring, and over 98.5% graft survival.',
    fullOverview: 'Sapphire Follicular Unit Extraction is the gold standard for restoring hairline contours, frontal density, and crown coverage. Individual follicular units (1-4 hairs each) are delicately harvested using micro-punches (0.7mm - 0.85mm) and kept in chilled HypoThermosol holding solution enriched with ATP to preserve vitality. V-shaped micro-channels allow tighter packing up to 55 grafts per cm² without damaging neighbouring follicles.',
    category: 'surgical',
    recoveryTime: '7 - 10 Days to full crust shedding',
    duration: '5 - 7 Hours (Single Day Outpatient)',
    densityTarget: '45 - 55 Grafts / cm²',
    priceStartingAt: 3200,
    featured: true,
    idealFor: [
      'Receding temple peaks and maturing hairlines',
      'Extensive Norwood Stage 3 to 6 thinning',
      'Patients desiring maximum graft density in single session',
      'Zero linear scars for short or faded hairstyles'
    ],
    keyHighlights: [
      'Gem-grade sapphire blades minimize cellular trauma',
      'V-shaped channel openings prevent graft rotation or dislodging',
      'Local needle-free painless anesthesia protocol',
      'Lifetime graft growth guarantee'
    ],
    techniqueSpecs: {
      bladeType: 'V-Profile Single-Crystal Sapphire (0.8mm - 1.0mm)',
      incisionRequired: true,
      anesthesia: 'Needle-Free High-Pressure Comfort Local Anesthesia',
      graftSurvivalRate: '98.7% Verified Graft Retention',
      shavingRequired: 'Donor area shaved, partial or full recipient options'
    }
  },
  {
    id: 'dhi-choi',
    name: 'DHI Direct Hair Implantation',
    shortName: 'DHI Implantation',
    tagline: 'Choi Implanter Pen technology with zero prior channel incising for millimeter angle control.',
    description: 'Direct Hair Implantation extracts follicles and places them directly into the scalp simultaneously using the patented Choi Implanter Pen. Complete control over depth, angle (40-45°), and curl direction.',
    fullOverview: 'DHI is ideal for high-precision hairline framing, filling in thinning gaps between existing native hairs, and patients who cannot shave their recipient area for professional reasons. Because channel creation and graft placement occur in one gentle motion, grafts spend significantly less time outside the scalp, ensuring optimal micro-vascular reconnection.',
    category: 'surgical',
    recoveryTime: '5 - 7 Days rapid epithelialization',
    duration: '6 - 8 Hours',
    densityTarget: '50 - 65 Grafts / cm²',
    priceStartingAt: 3900,
    featured: true,
    idealFor: [
      'Hairline micro-sculpting and crown swirls',
      'Patients requiring an unshaven procedure',
      'Dense packing between existing fragile hairs',
      'Maximum control over natural hair growth direction'
    ],
    keyHighlights: [
      'No prior canal incision needed — zero puncture scalpel cuts',
      'Direct 360-degree angle control matching natural whorls',
      'Shorter out-of-body time for extracted grafts',
      'Ideal for active professionals with tight schedules'
    ],
    techniqueSpecs: {
      bladeType: 'Choi Implanter Pen hollow needle tips (0.64mm - 0.8mm)',
      incisionRequired: false,
      anesthesia: 'Targeted nerve block & comfort sedation',
      graftSurvivalRate: '99.1% High-Retention Rate',
      shavingRequired: 'Unshaven recipient option available (U-FUE / DHI)'
    }
  },
  {
    id: 'robotic-artas',
    name: 'Robotic & AI-Assisted Artas iX Restoration',
    shortName: 'Robotic Artas iX',
    tagline: 'Multi-camera 3D stereoscopic vision and robotic arm harvest each graft with zero human tremor.',
    description: 'The FDA-cleared Artas iX system uses machine vision algorithms to analyze donor hair angles, density, and follicle groups at 60 scans per second, harvesting the healthiest follicles with microscopic precision.',
    fullOverview: 'Artas iX combines artificial intelligence and robotic engineering to deliver consistent harvesting speed and accuracy throughout 4,000+ graft mega-sessions. Digital scalp mapping creates a 3D digital model of the patient’s head, simulating outcome density and custom hairline profiles before surgery starts.',
    category: 'surgical',
    recoveryTime: '5 - 8 Days',
    duration: '6 - 7 Hours',
    densityTarget: '45 - 55 Grafts / cm²',
    priceStartingAt: 4800,
    featured: false,
    idealFor: [
      'High-graft mega-sessions where operator fatigue could impact results',
      'Patients wanting computerized digital simulation & harvesting',
      'Homogeneous donor preservation without overharvesting zones'
    ],
    keyHighlights: [
      '7-axis robotic arm with intelligent tremor dampening',
      'Autonomous detection of strongest multi-hair follicular units',
      '3D hairline visualizer pre-op simulation',
      'Minimal transection rate under 3%'
    ],
    techniqueSpecs: {
      bladeType: 'Dual-needle digital robotic punch (0.9mm)',
      incisionRequired: true,
      anesthesia: 'Computer-controlled buffered anesthesia delivery',
      graftSurvivalRate: '98.2%',
      shavingRequired: 'Donor area clipped for robotic camera tracking'
    }
  },
  {
    id: 'beard-facial',
    name: 'Facial Hair & Beard Micro-Restoration',
    shortName: 'Beard & Mustache',
    tagline: 'Artistic facial restoration for patchy cheeks, thin goatees, sideburns, and trauma scars.',
    description: 'Restore a masculine, thick, and well-defined beard or mustache. Single-hair follicles are implanted at acute 15 to 25-degree angles flat against the facial skin to replicate natural growth patterns.',
    fullOverview: 'Beard restoration requires an aesthetic eye for facial geometry. Grafts are selected primarily from the lower occipital scalp or under-jawline donor hair where texture matches facial hair. Each graft is individually placed to ensure soft transitions along the cheek line and robust density throughout the goatee and chin.',
    category: 'specialized',
    recoveryTime: '5 - 7 Days (facial redness subsides quickly)',
    duration: '4 - 6 Hours',
    densityTarget: '30 - 45 Grafts / cm²',
    priceStartingAt: 2800,
    featured: true,
    idealFor: [
      'Men with genetically patchy or absent beard growth',
      'Camouflaging acne scars, cleft lip scars, or burn marks',
      'Reshaping uneven cheek lines and creating dense jawlines'
    ],
    keyHighlights: [
      'Ultra-acute acute insertion angles flat to facial contours',
      'Solely single-hair grafts along perimeter for authentic stubble',
      'Can be shaved, trimmed, and groomed normally once healed',
      'Immediate framing impact to facial symmetry'
    ],
    techniqueSpecs: {
      bladeType: 'Micro-Sapphire Blades & 0.6mm Micro-Pen',
      incisionRequired: true,
      anesthesia: 'Mild oral relaxation + gentle dental-style facial blocks',
      graftSurvivalRate: '98.5%',
      shavingRequired: 'Donor shaved; facial hair kept at 2mm stubble'
    }
  },
  {
    id: 'eyebrow-transplant',
    name: 'Artistic Eyebrow Follicular Reconstruction',
    shortName: 'Eyebrow Restoration',
    tagline: 'Permanent, three-dimensional eyebrow restoration tailored to your facial architecture.',
    description: 'For over-plucked, genetically sparse, or scarred brows. Micro-grafts containing fine single hairs are placed with microscopic precision to recreate natural brow arches, heads, and tails.',
    fullOverview: 'Unlike microblading or tattooing which fades to flat discoloration, an eyebrow transplant provides genuine, living, growing hair. Surgeons mimic the complex multi-directional orientation of natural brows — hairs pointing upward at the head, horizontally through the body, and tapering downward at the tail.',
    category: 'specialized',
    recoveryTime: '4 - 6 Days',
    duration: '3 - 4 Hours',
    densityTarget: 'High-density feathering (250 - 450 grafts per brow)',
    priceStartingAt: 2400,
    featured: false,
    idealFor: [
      'Individuals with over-plucked or alopecia-affected eyebrows',
      'Patients wanting permanent 3D natural brows instead of tattoos',
      'Covering traumatic facial scars through the brow ridge'
    ],
    keyHighlights: [
      'Surgeon-sculpted bespoke arch template aligned with brow bone',
      'Strictly single-hair follicular units sorted under 20x microscopy',
      'Hairs grow continuously and can be trimmed to preference',
      'Permanent natural solution'
    ],
    techniqueSpecs: {
      bladeType: '0.6mm Ultra-Fine Micro-Sapphire blade',
      incisionRequired: true,
      anesthesia: 'Superficial orbital nerve block (painless)',
      graftSurvivalRate: '99%',
      shavingRequired: 'Tiny 2cm donor window concealed beneath long hair'
    }
  },
  {
    id: 'female-hairline',
    name: 'Female Hair Restoration & Hairline Lowering',
    shortName: 'Female Restoration',
    tagline: 'Specialized non-shaven solutions for female diffuse thinning and high foreheads.',
    description: 'Designed exclusively for women experiencing androgenetic alopecia, traction alopecia from tight hairstyles, or desiring a softer, lower rounded hairline contour with zero visible donor shaving.',
    fullOverview: 'Female hair patterns differ substantially from male pattern baldness, typically manifesting as diffuse thinning along the central parting (Ludwig scale) or high frontal corners. Our no-shave technique conceals the donor extraction site beneath existing hair lengths while creating a rounded, feminine hairline with delicate cowlick whorls.',
    category: 'specialized',
    recoveryTime: '5 - 7 Days',
    duration: '5 - 7 Hours',
    densityTarget: '45 - 60 Grafts / cm²',
    priceStartingAt: 3600,
    featured: true,
    idealFor: [
      'Women seeking to lower a high forehead or rounded temples',
      'Traction alopecia along edges and temples',
      'Widened central hair partings (Ludwig Stages 1 and 2)',
      'Patients requiring complete privacy without head shaving'
    ],
    keyHighlights: [
      'Zero-shave procedure: no one will know you underwent surgery',
      'Soft transition feathering with natural micro-irregularities',
      'Integrated hormone balance & trichology support',
      'Tailored to feminine skull geometry'
    ],
    techniqueSpecs: {
      bladeType: 'Sapphire Micro-Slit + Choi Implanter Pen Combo',
      incisionRequired: true,
      anesthesia: 'Twilight relaxation + twilight nerve block',
      graftSurvivalRate: '98.9%',
      shavingRequired: 'Completely unshaven (hair concealed above and below)'
    }
  },
  {
    id: 'prp-exosome',
    name: 'Autologous PRF & Exosome Cellular Therapy',
    shortName: 'PRF & Exosomes',
    tagline: 'Concentrated autologous growth factors and stem cell exosomes to awaken miniaturizing hair.',
    description: 'An advanced non-surgical regenerative treatment using 100% natural platelet-rich fibrin (PRF) and bio-identical exosome growth factors to thicken thinning shafts, boost micro-circulation, and prolong anagen growth.',
    fullOverview: 'While transplants replace lost follicles, cellular biostimulation rejuvenates sluggish existing follicles before they fully atrophy. PRF contains higher concentrations of leukocytes, mesenchymal stem cells, and slow-release vascular endothelial growth factors (VEGF) than traditional PRP, stimulating robust blood supply to the scalp.',
    category: 'non_surgical',
    recoveryTime: 'Zero downtime (resume normal activities immediately)',
    duration: '45 - 60 Minutes per session',
    densityTarget: 'Shaft diameter increase of 28% - 35% on average',
    priceStartingAt: 850,
    featured: false,
    idealFor: [
      'Early-stage thinning and shedding prevention',
      'Post-transplant graft acceleration and healing boost',
      'Patients not yet candidates for surgical intervention',
      'Diffuse thinning across crown and vertex'
    ],
    keyHighlights: [
      'Autologous: zero risk of allergic reaction or rejection',
      'High-velocity centrifugation preserves cellular matrix',
      'Often combined with low-level laser light stimulation',
      'Visible decrease in daily shedding within 4 to 6 weeks'
    ],
    techniqueSpecs: {
      bladeType: 'Needleless Meso-Injector or 32G micro-cannula',
      incisionRequired: false,
      anesthesia: 'Topical lidocaine chilling spray',
      graftSurvivalRate: 'N/A (Non-Surgical Biostimulation)',
      shavingRequired: 'No shaving required'
    }
  },
  {
    id: 'revision-repair',
    name: 'Corrective & Scar Revision Hair Restoration',
    shortName: 'Revision & Repair',
    tagline: 'Expert corrective reconstruction for unnatural hairlines, FUT strip scars, and outdated plugs.',
    description: 'Reconstructive procedures for patients dissatisfied with prior low-quality surgeries elsewhere. We extract misplaced thick grafts, soften hairline angles, and camouflage linear FUT scars.',
    fullOverview: 'Poorly performed hair transplants — characterized by misangled "doll’s hair" plugs, harsh straight hairlines, or overharvested "moth-eaten" donor zones — require advanced reconstructive surgery. Our specialists delicately excise unsightly large follicular clusters with micro-punches, redistribute them into micro-grafts, and camouflage scars using FUE or scalp micropigmentation.',
    category: 'specialized',
    recoveryTime: '7 - 10 Days',
    duration: '6 - 8 Hours',
    densityTarget: 'Customized reconstructive density',
    priceStartingAt: 4200,
    featured: false,
    idealFor: [
      'Unnatural straight or harsh hairlines from previous clinics',
      'Pluggy, misdirected grafts pointing in incorrect angles',
      'Prominent linear FUT scars from older strip procedures',
      'Depleted donor areas needing body-hair transplant (BHT) integration'
    ],
    keyHighlights: [
      'Gentle extraction and redistribution of misplaced historic plugs',
      'Camouflage grafting into fibrous scar tissue',
      'Re-establishing anatomical hairline asymmetry',
      'Restoring patient confidence and psychological relief'
    ],
    techniqueSpecs: {
      bladeType: 'Micro-coring extraction punches (0.7mm) + Sapphire',
      incisionRequired: true,
      anesthesia: 'Comfort block with tumescent anesthesia',
      graftSurvivalRate: '96.5% (in fibrotic scar tissue)',
      shavingRequired: 'Depends on revision scope'
    }
  }
];

export const SPECIALISTS: Specialist[] = [
  {
    id: 'dr-julian-vance',
    name: 'Dr. Julian Vance, MD, FISHRS',
    title: 'Medical Director & Chief Hair Restoration Surgeon',
    degrees: 'MD (Johns Hopkins), Fellowship ISHRS, ABHRS Certified',
    ishrsMember: true,
    experienceYears: 19,
    surgeriesCompleted: 6800,
    specialty: 'High-Density Sapphire FUE, Mega-Sessions & Aesthetic Hairlines',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600&auto=format&fit=crop',
    bio: 'Globally recognized pioneer in micro-channel Sapphire FUE. Dr. Vance has trained over 120 surgeons internationally, published 18 peer-reviewed clinical papers on graft preservation fluids, and personally oversees surgical design for VIP patients.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  },
  {
    id: 'dr-elena-rostova',
    name: 'Dr. Elena Rostova, MD, PhD',
    title: 'Senior Micro-Surgical Specialist & DHI Master Fellow',
    degrees: 'MD (Charité Berlin), PhD Micro-Vascular Surgery',
    ishrsMember: true,
    experienceYears: 13,
    surgeriesCompleted: 4200,
    specialty: 'Choi Pen DHI, Female Hairline Lowering & Unshaven Procedures',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop',
    bio: 'Specializing in ultra-refined micro-graft placement and female hair restoration. Dr. Rostova combines surgical accuracy with artistic facial framing, renowned for zero-detection natural hairlines that flow organically.',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  {
    id: 'dr-marcus-sterling',
    name: 'Dr. Marcus Sterling, MD',
    title: 'Board Certified Plastic Surgeon & Facial Restoration Lead',
    degrees: 'MD (Columbia University), Board Certified Plastic & Reconstructive',
    ishrsMember: true,
    experienceYears: 15,
    surgeriesCompleted: 4900,
    specialty: 'Beard & Mustache Reconstruction, Eyebrow Transplants & Scar Camouflage',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop',
    bio: 'Renowned for facial aesthetic balance, Dr. Sterling applies plastic surgery precision to facial hair and corrective revision cases. His mastery of acute hair angles ensures natural facial growth.',
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Friday']
  },
  {
    id: 'dr-soraya-almansoor',
    name: 'Dr. Soraya Al-Mansoor, MD',
    title: 'Director of Trichology & Regenerative Cellular Medicine',
    degrees: 'MD (Imperial College London), Board Certified Dermatologist',
    ishrsMember: true,
    experienceYears: 11,
    surgeriesCompleted: 2800,
    specialty: 'Autologous PRF, Exosome Therapy & Pre/Post-Surgical Trichology',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813583-097434a9844f?q=80&w=600&auto=format&fit=crop',
    bio: 'An authority on follicular biology and regenerative medicine. Dr. Al-Mansoor spearheads our cellular therapy protocols to dramatically accelerate graft maturation and protect native donor zones.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Saturday']
  }
];

export const NORWOOD_STAGES: NorwoodStage[] = [
  {
    stage: 1,
    label: 'Norwood Stage I / Early Preventative',
    subtitle: 'Minimal or No Recession',
    description: 'Adolescent hairline with no noticeable recession along temples or crown. Ideal for preventative non-surgical therapies or micro hairline touch-ups.',
    minGrafts: 800,
    maxGrafts: 1200,
    primaryZone: 'Hairline Contour / Preventative',
    recommendedTechnique: 'DHI Direct Implantation or PRF Therapy',
    hairlinePattern: 'Flat to gentle juvenile curve'
  },
  {
    stage: 2,
    label: 'Norwood Stage II / Mature Hairline',
    subtitle: 'Mild Triangular Recession at Temples',
    description: 'Slight symmetrical recession at the temples forming a classic mature M-shape. Frontal tuft remains dense; early sign of androgenetic recession.',
    minGrafts: 1200,
    maxGrafts: 1800,
    primaryZone: 'Frontal Temporal Angles (Left & Right Peaks)',
    recommendedTechnique: 'Sapphire FUE or DHI Choi Pen',
    hairlinePattern: 'Mild triangular recession'
  },
  {
    stage: 3,
    label: 'Norwood Stage III / Definite Thinning',
    subtitle: 'Deep Bilateral Temple Recesses',
    description: 'First medically significant stage of baldness. Deep bilateral symmetrical recession at the temples that is bare or only sparsely covered with fine hair.',
    minGrafts: 1800,
    maxGrafts: 2600,
    primaryZone: 'Frontal Third & Temporal Points',
    recommendedTechnique: 'Sapphire FUE High-Density Packing',
    hairlinePattern: 'Deep M, U, or V shaped recession'
  },
  {
    stage: 4,
    label: 'Norwood Stage IV / Mid-Scalp & Vertex',
    subtitle: 'Frontal Recession with Emerging Crown Thinning',
    description: 'Severe frontal recession combined with a distinct thinning spot on the crown (vertex). The two bald areas are separated by a moderately dense band of hair.',
    minGrafts: 2500,
    maxGrafts: 3400,
    primaryZone: 'Hairline + Frontal Core + Early Crown Vortex',
    recommendedTechnique: 'Sapphire FUE with Strategic Density Gradient',
    hairlinePattern: 'Frontal bridge separating crown spot'
  },
  {
    stage: 5,
    label: 'Norwood Stage V / Advancing Convergence',
    subtitle: 'Bridge Between Front and Crown Narrows',
    description: 'Frontal and vertex bald areas are significantly larger. The band of hair between them has narrowed to a fine strip with diminished density.',
    minGrafts: 3200,
    maxGrafts: 4200,
    primaryZone: 'Comprehensive Frontal, Mid-Scalp & Crown',
    recommendedTechnique: 'Sapphire FUE Mega-Session + PRF Boost',
    hairlinePattern: 'Narrow fragile bridge'
  },
  {
    stage: 6,
    label: 'Norwood Stage VI / Extensive Hair Loss',
    subtitle: 'Single Continuous Bald Area',
    description: 'The bridge of hair separating the forehead and vertex has completely vanished, creating a single continuous expanse of baldness across the top of the skull.',
    minGrafts: 4000,
    maxGrafts: 5200,
    primaryZone: 'Frontal Reconstruction + Mid-Scalp Density',
    recommendedTechnique: 'Two-Stage FUE or Maximum Density Mega-Session',
    hairlinePattern: 'Horse-shoe side perimeter'
  },
  {
    stage: 7,
    label: 'Norwood Stage VII / Advanced Alopecia',
    subtitle: 'Narrow Horseshoe Band Remaining',
    description: 'The most severe stage. Only a narrow horseshoe-shaped band of hair remains on the sides and back of the head. Requires meticulous donor zone preservation.',
    minGrafts: 5000,
    maxGrafts: 6500,
    primaryZone: 'Frontal Framing + Donor Zone Camouflage',
    recommendedTechnique: 'Staged FUE + Body Hair (BHT) Integration',
    hairlinePattern: 'Low occipital perimeter'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'Norwood III to Dense Youthful Hairline',
    patientProfile: 'Male, 33 · Software Executive',
    procedure: 'Sapphire FUE Hairline Reconstruction',
    technique: 'Sapphire 0.85mm Blades with Single-Hair Feathering',
    graftCount: 2850,
    monthsPostOp: 12,
    hairLossStage: 'Norwood Stage III Vertex',
    surgeonNote: 'Patient presented with deep temple recession and early crown thinning. We designed a conservative, masculine hairline curve with 45 single-hair micro-follicles per cm² along the edge, transitioning to 55 multi-follicles behind.',
    patientQuote: 'Walking into meetings without wondering if anyone is staring at my temples has completely transformed how I carry myself. The density looks 100% natural.',
    beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=700&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=700&auto=format&fit=crop'
  },
  {
    id: 'case-2',
    title: 'Crown Swirl & Frontal Restoration Mega-Session',
    patientProfile: 'Male, 42 · Architect',
    procedure: 'Combined FUE + PRF Cellular Therapy',
    technique: 'Two-Team Hybrid Extraction & Implantation',
    graftCount: 3950,
    monthsPostOp: 14,
    hairLossStage: 'Norwood Stage V',
    surgeonNote: 'Significant vertex bald spot with advanced temple recession. Reconstructed the crown vortex following the natural spiral orientation. Supplemented with autologous PRF to accelerate vascular integration.',
    patientQuote: 'At 42, I felt like I was looking 55. The team restored my crown spiral so cleanly that my regular barber was amazed and couldn’t spot any scars.',
    beforeImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=700&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=700&auto=format&fit=crop'
  },
  {
    id: 'case-3',
    title: 'High-Definition Facial Beard Reconstruction',
    patientProfile: 'Male, 29 · Creative Director',
    procedure: 'Beard & Mustache Follicular Placement',
    technique: 'Choi Pen Implanter with 20° Acute Insertion',
    graftCount: 2100,
    monthsPostOp: 9,
    hairLossStage: 'Genetic Patchy Facial Alopecia',
    surgeonNote: 'Patient suffered from genetic patchy growth on cheekbones and chin. Extracted single-hair follicles from lower neck donor zone. Positioned each graft at a flat 18-degree angle to lay flush with facial skin.',
    patientQuote: 'I could never grow a full beard my entire twenties. Now I can style a sharp, solid beard that connects seamlessly from sideburn to jawline.',
    beforeImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=700&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=700&auto=format&fit=crop'
  },
  {
    id: 'case-4',
    title: 'Female Hairline Lowering & Parting Densification',
    patientProfile: 'Female, 37 · Attorney',
    procedure: 'Unshaven DHI Female Hairline Sculpting',
    technique: 'Zero-Shave Micro-Grafting with Organic Contours',
    graftCount: 2200,
    monthsPostOp: 11,
    hairLossStage: 'Ludwig Stage II & High Frontal Forehead',
    surgeonNote: 'Lowered the anterior hairline by 1.8cm while maintaining delicate feminine cowlick whorls. No shaving required; patient returned to client court appearances within 6 days.',
    patientQuote: 'I was terrified of having to shave my head. Crown & Follicle preserved all my existing hair, and my new hairline frames my face beautifully.',
    beforeImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=700&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=700&auto=format&fit=crop'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Harrison Sterling',
    location: 'London, UK',
    procedure: 'Sapphire FUE 3,200 Grafts',
    grafts: 3200,
    rating: 5,
    review: 'From the initial 3D trichoscopy consultation to the 12-month follow-up, the medical rigor at Crown & Follicle is unmatched. Dr. Vance and his surgical team operated with surgical mastery. Painless anesthesia was truly painless.',
    timeframe: '14 months post-op',
    verified: true
  },
  {
    id: 't-2',
    name: 'Dr. Michael Chen',
    location: 'San Francisco, CA',
    procedure: 'DHI Direct Implantation 2,400 Grafts',
    grafts: 2400,
    rating: 5,
    review: 'As a practicing physician myself, I examined multiple clinics worldwide before choosing Dr. Vance. Their sterile surgical suite protocols, HypoThermosol graft storage, and optical microscopy exceed university hospital standards.',
    timeframe: '10 months post-op',
    verified: true
  },
  {
    id: 't-3',
    name: 'David O’Connor',
    location: 'Dublin, Ireland',
    procedure: 'Corrective Scar Revision + 1,900 Grafts',
    grafts: 1900,
    rating: 5,
    review: 'I had an old linear FUT scar from 2012 that left me embarrassed to swim or cut my hair short. Dr. Sterling camouflaged the entire scar with FUE grafts and softened my hairline. Best medical decision I ever made.',
    timeframe: '18 months post-op',
    verified: true
  },
  {
    id: 't-4',
    name: 'Sophia Laurent',
    location: 'Geneva, Switzerland',
    procedure: 'Unshaven Hairline Lowering 1,850 Grafts',
    grafts: 1850,
    rating: 5,
    review: 'The discretion and luxury care at the clinic was exceptional. My hairline was lowered naturally by Dr. Rostova without a single person at work guessing I had a procedure.',
    timeframe: '12 months post-op',
    verified: true
  }
];

export const FAQS = [
  {
    question: 'How long do hair transplant results last?',
    answer: 'Hair transplants using follicles harvested from the permanent donor zone (occipital and parietal scalp) are genetically resistant to DHT (dihydrotestosterone) and last a lifetime. The transplanted hair will continue to grow naturally, shed, and cycle just like your original hair.'
  },
  {
    question: 'What is the recovery timeline and when can I return to work?',
    answer: 'Most patients return to desk work within 3 to 5 days. Redness and micro-scabs typically wash away between Day 7 and Day 10 using our provided post-operative cleansing protocol. Light cardio can be resumed after 10 days, and full gym workouts after 3 weeks.'
  },
  {
    question: 'Is the hair transplant procedure painful?',
    answer: 'We utilize a needle-free, high-pressure jet injection system to administer local anesthesia, followed by micro-dosed numbing. Once numb, you will feel zero pain during the procedure — patients typically watch Netflix, listen to podcasts, or nap comfortably throughout.'
  },
  {
    question: 'What is the difference between Sapphire FUE and DHI?',
    answer: 'In Sapphire FUE, micro-channels are opened first with custom sapphire blades, followed by graft insertion with micro-forceps — ideal for large surface areas and maximum single-session graft volume. In DHI, channels and placement occur simultaneously using the Choi Implanter Pen — ideal for precise hairline sculpting and unshaven procedures.'
  },
  {
    question: 'What is "Shock Loss" and when will I see my final results?',
    answer: 'Around weeks 3 to 8, transplanted hair shafts shed as follicles transition into a temporary resting phase (telogen effluvium). This is completely normal and expected. New growth visibly sprouts by Month 3-4, reaches 60-70% density by Month 6-8, and reaches full 100% mature thickness by Month 12 to 14.'
  },
  {
    question: 'Do you offer virtual consultations for international or out-of-town patients?',
    answer: 'Yes! We host HD video trichoscopy assessments with our surgical directors. Patients submit clear photos of their hairline, crown, and donor area, receiving a full computerized graft count analysis and treatment plan before travelling.'
  }
];
