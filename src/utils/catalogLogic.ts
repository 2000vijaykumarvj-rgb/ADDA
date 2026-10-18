export type ProgramLevel = 'Postgraduate' | 'Undergraduate' | 'Doctoral';

export type ProgramDiscipline =
  | 'Management'
  | 'Commerce and Finance'
  | 'Computer Applications'
  | 'Science'
  | 'Arts';

export interface CurriculumModule {
  term: string;
  focus: string;
  subjects: string[];
  verificationNote?: string;
}

export interface ProgramFAQ {
  question: string;
  answer: string;
}

export interface AcademicProgram {
  slug: string;
  code: string;
  title: string;
  shortTitle: string;
  level: ProgramLevel;
  discipline: ProgramDiscipline;
  specializations: string[];
  duration: string;
  durationVerification: 'Verified' | 'Information to be confirmed';
  affiliationAndApproval: string;
  eligibility: string;
  eligibilityVerification: 'Verified' | 'Information to be confirmed';
  overview: string;
  academicHighlight: string;
  curriculum: CurriculumModule[];
  curriculumNote: string;
  learningOutcomes: string[];
  careerOpportunities: string[];
  admissionProcess: string[];
  faqs: ProgramFAQ[];
  visualTheme:
    | 'management'
    | 'pgdm'
    | 'commerce'
    | 'bcom'
    | 'computing'
    | 'bca'
    | 'bba'
    | 'science'
    | 'arts'
    | 'doctoral';
}

export interface ProgramFilterCriteria {
  level?: string;
  discipline?: string;
  searchQuery?: string;
}

/**
 * Pure function to filter and search academic programs.
 */
export function filterPrograms(
  programs: AcademicProgram[],
  criteria: ProgramFilterCriteria
): AcademicProgram[] {
  const levelFilter = (criteria.level || 'All').trim();
  const disciplineFilter = (criteria.discipline || 'All').trim();
  const query = (criteria.searchQuery || '').trim().toLowerCase();

  return programs.filter((program) => {
    if (levelFilter !== 'All' && program.level !== levelFilter) {
      return false;
    }
    if (disciplineFilter !== 'All' && program.discipline !== disciplineFilter) {
      return false;
    }
    if (!query) {
      return true;
    }

    const searchableFields = [
      program.title,
      program.shortTitle,
      program.code,
      program.level,
      program.discipline,
      program.overview,
      ...program.specializations,
      ...program.careerOpportunities,
    ]
      .join(' ')
      .toLowerCase();

    return searchableFields.includes(query);
  });
}

export type ApplicationStatus =
  | 'New'
  | 'Under Review'
  | 'Shortlisted'
  | 'Contacted'
  | 'Admitted';

export interface EnquiryFormInput {
  fullName: string;
  email: string;
  phone: string;
  programOfInterest: string;
  currentQualification: string;
  preferredContactMethod: 'Phone' | 'Email' | 'WhatsApp' | '';
  campusVisitRequested?: boolean;
  preferredVisitDate?: string;
  message?: string;
  consentAccepted: boolean;
  honeypot?: string;
}

export interface ApplicationRecord extends EnquiryFormInput {
  referenceId: string;
  submittedAt: string;
  deliveryStatus: string;
  status: ApplicationStatus;
  adminNotes: string;
  supabaseSynced: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_DIGITS_REGEX = /^\+?[0-9\s\-()]{10,18}$/;

/**
 * Validates the Admissions Enquiry Form input on both client and server.
 */
export function validateEnquiryForm(input: EnquiryFormInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (input.honeypot && input.honeypot.trim().length > 0) {
    errors.form = 'Automated spam submission detected.';
    return { valid: false, errors };
  }

  const fullName = (input.fullName || '').trim();
  if (fullName.length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  } else if (fullName.length > 100) {
    errors.fullName = 'Full name cannot exceed 100 characters.';
  }

  const email = (input.email || '').trim();
  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address (e.g., name@domain.com).';
  }

  const rawPhone = (input.phone || '').trim();
  const digitsOnly = rawPhone.replace(/\D/g, '');
  if (!rawPhone) {
    errors.phone = 'Please enter a contact phone number.';
  } else if (!PHONE_DIGITS_REGEX.test(rawPhone) || digitsOnly.length < 10 || digitsOnly.length > 15) {
    errors.phone = 'Please enter a valid 10 to 15 digit phone number.';
  }

  if (!(input.programOfInterest || '').trim()) {
    errors.programOfInterest = 'Please select a program of interest.';
  }

  if (!(input.currentQualification || '').trim()) {
    errors.currentQualification = 'Please specify your current qualification.';
  }

  if (
    !input.preferredContactMethod ||
    !['Phone', 'Email', 'WhatsApp'].includes(input.preferredContactMethod)
  ) {
    errors.preferredContactMethod = 'Please choose a preferred contact method.';
  }

  if (!input.consentAccepted) {
    errors.consentAccepted =
      'Please confirm your consent for Acharya Bangalore B-School Admissions to contact you.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface ContactFormInput {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  inquiryType: 'General Enquiry' | 'Campus Visit' | 'Academic Collaboration' | 'Placement Cell';
  message: string;
  consentAccepted: boolean;
  honeypot?: string;
}

/**
 * Validates the Contact & Campus Visit form input on both client and server.
 */
export function validateContactForm(input: ContactFormInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (input.honeypot && input.honeypot.trim().length > 0) {
    errors.form = 'Automated spam submission detected.';
    return { valid: false, errors };
  }

  if ((input.fullName || '').trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  const email = (input.email || '').trim();
  if (!email || !EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  const rawPhone = (input.phone || '').trim();
  const digitsOnly = rawPhone.replace(/\D/g, '');
  if (!rawPhone || !PHONE_DIGITS_REGEX.test(rawPhone) || digitsOnly.length < 10 || digitsOnly.length > 15) {
    errors.phone = 'Please enter a valid 10 to 15 digit phone number.';
  }

  if (!(input.department || '').trim()) {
    errors.department = 'Please select the relevant office or department.';
  }

  if ((input.message || '').trim().length < 10) {
    errors.message = 'Please enter a message of at least 10 characters.';
  }

  if (!input.consentAccepted) {
    errors.consentAccepted = 'Please confirm consent to process your enquiry.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Generates a deterministic institutional reference code for confirmed backend submissions.
 */
export function formatSubmissionReference(
  prefix: 'ABBS-ENQ' | 'ABBS-CNT',
  year: number,
  sequenceNumber: number
): string {
  const padded = String(Math.max(1, sequenceNumber)).padStart(4, '0');
  return `${prefix}-${year}-${padded}`;
}

export interface AdminApplicationFilter {
  searchQuery?: string;
  statusFilter?: string;
  programFilter?: string;
}

/**
 * Pure function to filter applications in the Admin Portal.
 */
export function filterApplications(
  applications: ApplicationRecord[],
  filter: AdminApplicationFilter
): ApplicationRecord[] {
  const status = (filter.statusFilter || 'All').trim();
  const program = (filter.programFilter || 'All').trim();
  const q = (filter.searchQuery || '').trim().toLowerCase();

  return applications.filter((app) => {
    if (status !== 'All' && app.status !== status) {
      return false;
    }
    if (program !== 'All' && app.programOfInterest !== program) {
      return false;
    }
    if (!q) {
      return true;
    }

    const haystack = [
      app.referenceId,
      app.fullName,
      app.email,
      app.phone,
      app.programOfInterest,
      app.currentQualification,
      app.status,
      app.adminNotes || '',
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(q);
  });
}

export interface ApplicationMetrics {
  total: number;
  newCount: number;
  shortlistedOrAdmittedCount: number;
  campusVisitCount: number;
  supabaseSyncedCount: number;
}

/**
 * Pure function to compute summary KPI metrics for the Admin Dashboard.
 */
export function computeApplicationMetrics(applications: ApplicationRecord[]): ApplicationMetrics {
  return {
    total: applications.length,
    newCount: applications.filter((a) => a.status === 'New' || a.status === 'Under Review').length,
    shortlistedOrAdmittedCount: applications.filter(
      (a) => a.status === 'Shortlisted' || a.status === 'Admitted'
    ).length,
    campusVisitCount: applications.filter((a) => Boolean(a.campusVisitRequested)).length,
    supabaseSyncedCount: applications.filter((a) => Boolean(a.supabaseSynced)).length,
  };
}

/**
 * Pure function to serialize applications into RFC-compliant CSV format.
 */
export function generateApplicationsCsv(applications: ApplicationRecord[]): string {
  const headers = [
    'Reference ID',
    'Full Name',
    'Email',
    'Phone',
    'Program of Interest',
    'Qualification',
    'Preferred Contact',
    'Campus Visit',
    'Visit Date',
    'Status',
    'Supabase Synced',
    'Submitted At',
    'Admin Notes',
  ];

  const escapeCsvCell = (val: string | boolean | undefined): string => {
    const str = String(val ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = applications.map((a) =>
    [
      a.referenceId,
      a.fullName,
      a.email,
      a.phone,
      a.programOfInterest,
      a.currentQualification,
      a.preferredContactMethod,
      a.campusVisitRequested ? 'Yes' : 'No',
      a.preferredVisitDate || '',
      a.status,
      a.supabaseSynced ? 'Synced' : 'Local Registry',
      a.submittedAt,
      a.adminNotes || '',
    ]
      .map(escapeCsvCell)
      .join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}
