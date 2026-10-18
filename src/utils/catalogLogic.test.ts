import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterPrograms,
  validateEnquiryForm,
  validateContactForm,
  formatSubmissionReference,
  filterApplications,
  computeApplicationMetrics,
  generateApplicationsCsv,
  type AcademicProgram,
  type ApplicationRecord,
} from './catalogLogic.ts';

const samplePrograms: AcademicProgram[] = [
  {
    slug: 'mba',
    code: 'PG-MBA',
    title: 'Master of Business Administration (MBA)',
    shortTitle: 'MBA',
    level: 'Postgraduate',
    discipline: 'Management',
    specializations: ['General', 'Business Analytics', 'Entrepreneurship'],
    duration: '2 Years (4 Semesters)',
    durationVerification: 'Verified',
    affiliationAndApproval: 'Affiliated to Bangalore University · AICTE Approved · NBA Accredited',
    eligibility: 'Bachelor degree with minimum 50% aggregate marks',
    eligibilityVerification: 'Verified',
    overview: 'Flagship postgraduate management program.',
    academicHighlight: 'NBA Accredited MBA Department',
    curriculum: [],
    curriculumNote: 'Verified core framework',
    learningOutcomes: ['Strategic leadership'],
    careerOpportunities: ['Management Consultant', 'Business Analyst'],
    admissionProcess: ['Submit application'],
    faqs: [],
    visualTheme: 'management',
  },
  {
    slug: 'bca-ai-ml',
    code: 'UG-BCA',
    title: 'Bachelor of Computer Applications (BCA with AI and Machine Learning)',
    shortTitle: 'BCA (AI & ML)',
    level: 'Undergraduate',
    discipline: 'Computer Applications',
    specializations: ['Artificial Intelligence', 'Machine Learning'],
    duration: '3 Years / 4 Years (Honours)',
    durationVerification: 'Information to be confirmed',
    affiliationAndApproval: 'Affiliated to Bangalore University · AICTE Approved',
    eligibility: '10+2 / PUC or equivalent',
    eligibilityVerification: 'Verified',
    overview: 'Undergraduate computing program with AI & ML.',
    academicHighlight: 'Applied AI & Software Lab Track',
    curriculum: [],
    curriculumNote: 'Subject to university syllabus updates',
    learningOutcomes: ['Software engineering'],
    careerOpportunities: ['AI Engineer', 'Full-Stack Developer'],
    admissionProcess: ['Apply online'],
    faqs: [],
    visualTheme: 'computing',
  },
  {
    slug: 'phd-management',
    code: 'DOC-PHD',
    title: 'Ph.D. in Management',
    shortTitle: 'Ph.D. Management',
    level: 'Doctoral',
    discipline: 'Management',
    specializations: ['Organizational Behavior', 'Finance & Strategy'],
    duration: 'Minimum 3 Years (As per University Regulations)',
    durationVerification: 'Information to be confirmed',
    affiliationAndApproval: 'Recognized Research Centre',
    eligibility: 'Master degree with minimum 55% marks',
    eligibilityVerification: 'Information to be confirmed',
    overview: 'Doctoral research program in management sciences.',
    academicHighlight: 'Empirical & Policy Research',
    curriculum: [],
    curriculumNote: 'Coursework as per doctoral regulations',
    learningOutcomes: ['Scholarly publication'],
    careerOpportunities: ['University Professor', 'Policy Researcher'],
    admissionProcess: ['Research proposal review'],
    faqs: [],
    visualTheme: 'doctoral',
  },
];

test('filterPrograms filters accurately by level, discipline, and keyword query', () => {
  const all = filterPrograms(samplePrograms, { level: 'All', discipline: 'All', searchQuery: '' });
  assert.equal(all.length, 3);

  const pgOnly = filterPrograms(samplePrograms, { level: 'Postgraduate' });
  assert.equal(pgOnly.length, 1);
  assert.equal(pgOnly[0].slug, 'mba');

  const managementAllLevels = filterPrograms(samplePrograms, { discipline: 'Management' });
  assert.equal(managementAllLevels.length, 2);

  const searchAi = filterPrograms(samplePrograms, { searchQuery: 'machine learning' });
  assert.equal(searchAi.length, 1);
  assert.equal(searchAi[0].slug, 'bca-ai-ml');

  const noMatch = filterPrograms(samplePrograms, {
    level: 'Doctoral',
    discipline: 'Computer Applications',
  });
  assert.equal(noMatch.length, 0);
});

test('validateEnquiryForm rejects empty or invalid inputs and passes valid inputs', () => {
  const invalidResult = validateEnquiryForm({
    fullName: 'A',
    email: 'invalid-email',
    phone: '12345',
    programOfInterest: '',
    currentQualification: '',
    preferredContactMethod: '',
    consentAccepted: false,
  });

  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.fullName);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.phone);
  assert.ok(invalidResult.errors.programOfInterest);
  assert.ok(invalidResult.errors.currentQualification);
  assert.ok(invalidResult.errors.preferredContactMethod);
  assert.ok(invalidResult.errors.consentAccepted);

  const validResult = validateEnquiryForm({
    fullName: 'Ananya Rao',
    email: 'ananya.rao@example.com',
    phone: '+91 98450 12345',
    programOfInterest: 'MBA (General, Business Analytics, Entrepreneurship)',
    currentQualification: 'Final Year B.Com',
    preferredContactMethod: 'Phone',
    consentAccepted: true,
  });

  assert.equal(validResult.valid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});

test('validateEnquiryForm blocks honeypot spam bots', () => {
  const botAttempt = validateEnquiryForm({
    fullName: 'Bot User',
    email: 'bot@example.com',
    phone: '+91 98450 12345',
    programOfInterest: 'MBA',
    currentQualification: 'Graduate',
    preferredContactMethod: 'Email',
    consentAccepted: true,
    honeypot: 'http://spam-link.example',
  });

  assert.equal(botAttempt.valid, false);
  assert.ok(botAttempt.errors.form);
});

test('validateContactForm validates message length and contact fields', () => {
  const shortMsg = validateContactForm({
    fullName: 'Vikram Sharma',
    email: 'vikram@example.com',
    phone: '+91 91417 07070',
    department: 'Admissions Office',
    inquiryType: 'Campus Visit',
    message: 'Too short',
    consentAccepted: true,
  });

  assert.equal(shortMsg.valid, false);
  assert.ok(shortMsg.errors.message);

  const validContact = validateContactForm({
    fullName: 'Vikram Sharma',
    email: 'vikram@example.com',
    phone: '+91 91417 07070',
    department: 'Admissions Office',
    inquiryType: 'Campus Visit',
    message: 'I would like to schedule a guided campus tour on Friday morning.',
    consentAccepted: true,
  });

  assert.equal(validContact.valid, true);
});

test('formatSubmissionReference formats institutional receipt numbers with tabular padding', () => {
  assert.equal(formatSubmissionReference('ABBS-ENQ', 2026, 7), 'ABBS-ENQ-2026-0007');
  assert.equal(formatSubmissionReference('ABBS-CNT', 2026, 142), 'ABBS-CNT-2026-0142');
});

test('filterApplications, computeApplicationMetrics, and generateApplicationsCsv work accurately', () => {
  const sampleApps: ApplicationRecord[] = [
    {
      referenceId: 'ABBS-ENQ-2026-0001',
      fullName: 'Aarav Kulkarni',
      email: 'aarav@example.com',
      phone: '+91 98450 11223',
      programOfInterest: 'Master of Business Administration (MBA)',
      currentQualification: "Graduate (Bachelor's Completed)",
      preferredContactMethod: 'Phone',
      campusVisitRequested: true,
      preferredVisitDate: '2026-11-10',
      consentAccepted: true,
      submittedAt: '2026-10-17T10:00:00.000Z',
      deliveryStatus: 'Synced with Supabase (bzcgrdgiufdhvayvwzwx)',
      status: 'Shortlisted',
      adminNotes: 'Strong CAT percentile',
      supabaseSynced: true,
    },
    {
      referenceId: 'ABBS-ENQ-2026-0002',
      fullName: 'Divya Menon',
      email: 'divya@example.com',
      phone: '+91 98450 44556',
      programOfInterest: 'Bachelor of Computer Applications (BCA with AI and Machine Learning)',
      currentQualification: '10+2 / II PUC Appearing or Completed',
      preferredContactMethod: 'WhatsApp',
      campusVisitRequested: false,
      consentAccepted: true,
      submittedAt: '2026-10-17T12:00:00.000Z',
      deliveryStatus: 'Recorded in Registry',
      status: 'New',
      adminNotes: '',
      supabaseSynced: false,
    },
  ];

  const metrics = computeApplicationMetrics(sampleApps);
  assert.equal(metrics.total, 2);
  assert.equal(metrics.newCount, 1);
  assert.equal(metrics.shortlistedOrAdmittedCount, 1);
  assert.equal(metrics.campusVisitCount, 1);
  assert.equal(metrics.supabaseSyncedCount, 1);

  const shortlistedOnly = filterApplications(sampleApps, { statusFilter: 'Shortlisted' });
  assert.equal(shortlistedOnly.length, 1);
  assert.equal(shortlistedOnly[0].fullName, 'Aarav Kulkarni');

  const searchDivya = filterApplications(sampleApps, { searchQuery: 'divya' });
  assert.equal(searchDivya.length, 1);
  assert.equal(searchDivya[0].referenceId, 'ABBS-ENQ-2026-0002');

  const csv = generateApplicationsCsv(sampleApps);
  assert.ok(csv.includes('Reference ID,Full Name,Email'));
  assert.ok(csv.includes('ABBS-ENQ-2026-0001,Aarav Kulkarni'));
});
