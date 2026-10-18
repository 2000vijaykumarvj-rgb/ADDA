export interface FacultyProfile {
  id: string;
  name: string;
  designation: string;
  department: 'Management' | 'Commerce and Finance' | 'Computer Applications' | 'Science' | 'Arts';
  qualification: string;
  specialization: string;
  verificationType: 'Verified Leadership & Senior Faculty' | 'Departmental Academic Chair (Profile Representative)';
}

export const FACULTY_PROFILES: FacultyProfile[] = [
  {
    id: 'fac-1',
    name: 'Dr. H.R. Venkatesha',
    designation: 'Director — MBA & Senior Professor',
    department: 'Management',
    qualification: 'Ph.D., M.Com, MBA',
    specialization: 'Strategic Management, Corporate Finance & Accreditation Governance',
    verificationType: 'Verified Leadership & Senior Faculty',
  },
  {
    id: 'fac-2',
    name: 'Dr. Rajesh C.',
    designation: 'Principal & Professor',
    department: 'Management',
    qualification: 'Ph.D., MBA',
    specialization: 'Academic Administration, Marketing Strategy & Consumer Insights',
    verificationType: 'Verified Leadership & Senior Faculty',
  },
  {
    id: 'fac-3',
    name: 'Chair, Quantitative & Business Analytics Wing',
    designation: 'Professor & Area Chair',
    department: 'Management',
    qualification: 'Ph.D. in Management Science / Operations',
    specialization: 'Predictive Modelling, Operations Research & Supply Chain Analytics',
    verificationType: 'Departmental Academic Chair (Profile Representative)',
  },
  {
    id: 'fac-4',
    name: 'Chair, Department of Commerce & Global Finance',
    designation: 'Associate Professor & Head of Department',
    department: 'Commerce and Finance',
    qualification: 'Ph.D. in Commerce, M.Com, NET',
    specialization: 'International Financial Reporting (IFRS), Direct Taxation & Corporate Auditing',
    verificationType: 'Departmental Academic Chair (Profile Representative)',
  },
  {
    id: 'fac-5',
    name: 'Chair, Department of Computer Applications (AI & ML)',
    designation: 'Professor & Head — Computing Studies',
    department: 'Computer Applications',
    qualification: 'Ph.D. in Computer Science, MCA',
    specialization: 'Machine Learning Architectures, Distributed Systems & Cloud Engineering',
    verificationType: 'Departmental Academic Chair (Profile Representative)',
  },
  {
    id: 'fac-6',
    name: 'Chair, Department of Life & Forensic Sciences',
    designation: 'Associate Professor & Lab Coordinator',
    department: 'Science',
    qualification: 'Ph.D. in Biotechnology / Microbiology',
    specialization: 'Molecular Genetics, Bioprocess Technology & Analytical Instrumentation',
    verificationType: 'Departmental Academic Chair (Profile Representative)',
  },
  {
    id: 'fac-7',
    name: 'Chair, Department of Liberal Arts, Media & Psychology',
    designation: 'Assistant Professor & Program Coordinator',
    department: 'Arts',
    qualification: 'Ph.D. / M.A. in Psychology & Mass Communication, NET',
    specialization: 'Behavioral Psychology, Media Ethics & Corporate Communication',
    verificationType: 'Departmental Academic Chair (Profile Representative)',
  },
  {
    id: 'fac-8',
    name: 'Chair, Banking, Financial Services & Insurance (PGDM-BFSI)',
    designation: 'Professor of Practice & Corporate Mentor',
    department: 'Commerce and Finance',
    qualification: 'MBA (Finance), CAIIB / Industry Fellow',
    specialization: 'Commercial Banking, Risk Management, Capital Markets & Fintech',
    verificationType: 'Departmental Academic Chair (Profile Representative)',
  },
];

export interface PlacementPillar {
  step: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const PLACEMENT_PILLARS: PlacementPillar[] = [
  {
    step: '01',
    title: 'Diagnostic Assessment & Career Mapping',
    description:
      'Every incoming student undergoes a baseline evaluation of quantitative aptitude, verbal reasoning, domain fundamentals, and career aspirations during Semester I.',
    deliverables: [
      'Individualized competency scorecard',
      'Specialization alignment counselling (Finance, Marketing, Analytics, Tech, Life Sciences)',
      'Resume architecture and LinkedIn portfolio workshop',
    ],
  },
  {
    step: '02',
    title: 'Pre-Placement Training & Technical Bootcamps',
    description:
      'Structured 120+ hour training tracks embedded alongside regular coursework covering corporate communication, spreadsheet modelling, coding interviews, and case analysis.',
    deliverables: [
      'Quantitative aptitude, logical reasoning, and psychometric test drills',
      'Mock Group Discussions (GD) and Extempore speaking clinics',
      'Technical mock interviews with alumni and industry panelists',
    ],
  },
  {
    step: '03',
    title: 'Mandatory Summer Internships & Live Projects',
    description:
      'Students complete supervised 6-to-8 week corporate internships or laboratory industrial training, translating classroom theory into measurable organizational deliverables.',
    deliverables: [
      'Faculty-mentor and corporate-mentor dual evaluation',
      'Pre-Placement Offer (PPO) pathway for high-performing interns',
      'Bound Summer Internship Project Report and viva voce',
    ],
  },
  {
    step: '04',
    title: 'Campus Recruitment Drives & Career Placement Cell',
    description:
      'The ABBS Placement & Career Development Cell coordinates pre-placement talks, assessment rounds, and final interviews across banking, consulting, IT, retail, and biotech sectors.',
    deliverables: [
      'Pre-placement corporate presentations and role briefings',
      'Transparent eligibility and shortlisting governance',
      'Post-offer onboarding support and alumni mentorship network',
    ],
  },
];

export const HISTORICAL_PLACEMENT_CLAIMS_NOTE = {
  suppliedMetrics: [
    {
      label: 'Supplied Profile Highest Package',
      figure: '22.5 LPA',
      qualification: 'Unverified Historical Profile Claim — Subject to Academic Year & Audit Confirmation',
    },
    {
      label: 'Supplied Profile Average Package',
      figure: '~7.5 LPA',
      qualification: 'Unverified Historical Profile Claim — Subject to Program & Batch Verification',
    },
    {
      label: 'Supplied Profile Recruiter Network',
      figure: '150+ Organizations',
      qualification: 'Unverified Historical Profile Claim — Cumulative Corporate Engagement Figure',
    },
  ],
  disclaimer:
    'Important Disclosure: The figures above (22.5 LPA highest package, ~7.5 LPA average package, and 150+ recruiters) originate from the supplied institutional profile and must be treated as historical claims until the specific academic year, program scope (MBA/PGDM vs UG), calculation methodology, and audited placement report are verified from official ABBS records. Placement outcomes depend on individual student academic performance, skill proficiency, and prevailing macroeconomic recruitment conditions. ABBS does not guarantee placement or a predetermined salary package to every student.',
};

export const RECRUITER_SECTORS = [
  {
    sector: 'Banking, Financial Services & Insurance (BFSI)',
    roles: 'Credit Analyst, Wealth Advisory Associate, Retail Banking Officer, Tax & Audit Analyst, Risk Executive',
    engagementType: 'Campus Recruitment & Summer Internships',
  },
  {
    sector: 'Information Technology, Analytics & Consulting',
    roles: 'Business Analyst, Junior AI/ML Engineer, Full-Stack Developer, ERP Functional Associate, Research Analyst',
    engagementType: 'Technical Assessments, Hackathons & Placement Drives',
  },
  {
    sector: 'FMCG, Retail, E-Commerce & Aviation Operations',
    roles: 'Area Sales & Brand Executive, Supply Chain Coordinator, Airport Terminal Operations & Cargo Executive',
    engagementType: 'Management Trainee & Operations Intake',
  },
  {
    sector: 'Biotechnology, Pharmaceuticals & Clinical Diagnostics',
    roles: 'Quality Control Microbiologist, Molecular Lab Associate, Clinical Data Coordinator, Regulatory Executive',
    engagementType: 'Laboratory Internships & Scientific Placements',
  },
];

export interface ResearchPillar {
  id: string;
  title: string;
  category: string;
  summary: string;
  outputs: string[];
}

export const RESEARCH_PILLARS: ResearchPillar[] = [
  {
    id: 'res-1',
    title: 'Centre for Management & Economic Policy Research',
    category: 'Doctoral & Postgraduate Research',
    summary:
      'Supports Ph.D. scholars and MBA/PGDM faculty in conducting empirical studies on emerging markets, corporate governance, sustainable finance, and digital consumer behavior.',
    outputs: [
      'Peer-reviewed publications in UGC-CARE, Scopus, and ABDC listed journals',
      'Biannual Doctoral Research Colloquia and Methodology Workshops',
      'Case study authoring based on Indian SMEs and Bengaluru technology enterprises',
    ],
  },
  {
    id: 'res-2',
    title: 'ABBS Business Incubation & Startup Studio',
    category: 'Entrepreneurship & Venture Creation',
    summary:
      'Provides pre-incubation workspace, business model validation clinics, and mentorship for student entrepreneurs across MBA, PGDM, BBA, and BCA cohorts.',
    outputs: [
      'Annual Business Plan & Venture Pitch Competition',
      'Mentorship clinics on MSME registration, seed funding, and intellectual property',
      'Industry-academia problem statements in retail, fintech, and sustainability',
    ],
  },
  {
    id: 'res-3',
    title: 'Applied AI, Data Science & Computing Lab Projects',
    category: 'Technology & Analytics Innovation',
    summary:
      'Bridges BCA (AI & ML), MCA, and Business Analytics students to build predictive models, natural language interfaces, and enterprise software prototypes.',
    outputs: [
      'Undergraduate and postgraduate software engineering capstones',
      'Open-dataset benchmarking and predictive analytics demonstrations',
      'Workshops on ethical AI, data privacy, and cloud deployment',
    ],
  },
  {
    id: 'res-4',
    title: 'Life Sciences & Microbial Biotechnology Inquiry',
    category: 'Scientific Laboratory Research',
    summary:
      'Engages B.Sc. (Biotechnology, Microbiology, Forensic Science) students in hands-on experimental projects including environmental microbiology, phytochemical analysis, and forensic instrumentation.',
    outputs: [
      'Supervised undergraduate laboratory dissertations',
      'National science day poster presentations and bio-innovation seminars',
      'Training in Good Laboratory Practices (GLP) and biosafety standards',
    ],
  },
];

export interface NewsEventItem {
  id: string;
  type: 'Academic Conference' | 'Admissions Notice' | 'Campus Life' | 'Industry Lecture';
  title: string;
  dateLabel: string;
  summary: string;
  location: string;
  actionLabel: string;
  actionRoute: string;
}

export const NEWS_AND_EVENTS: NewsEventItem[] = [
  {
    id: 'evt-1',
    type: 'Admissions Notice',
    title: 'Information Sessions & Campus Counselling for Upcoming Academic Intake',
    dateLabel: 'Ongoing · Prior Appointment Recommended',
    summary:
      'Prospective applicants and parents can meet faculty program chairs for MBA, PGDM, BBA, BCA, B.Com, B.Sc., BA, and Ph.D. programs and tour campus academic facilities.',
    location: 'Admissions Office, ABBS Campus, Andrahalli Main Road, Bengaluru',
    actionLabel: 'Schedule Counselling',
    actionRoute: '/admissions#enquiry-form',
  },
  {
    id: 'evt-2',
    type: 'Academic Conference',
    title: 'International Symposium on Business Analytics, Sustainable Finance & Emerging Technologies',
    dateLabel: 'Annual Academic Calendar Feature',
    summary:
      'Convenes researchers, corporate practitioners, and postgraduate scholars to present empirical papers on digital transformation, BFSI risk, and sustainable enterprise strategy.',
    location: 'Main Auditorium, Acharya Bangalore B-School',
    actionLabel: 'Explore Research Cell',
    actionRoute: '/research',
  },
  {
    id: 'evt-3',
    type: 'Industry Lecture',
    title: 'C-Suite Leadership & Corporate Interface Series',
    dateLabel: 'Monthly Term Colloquium',
    summary:
      'Interactive practitioner sessions connecting students with leaders from banking, aviation operations, software engineering, and biopharmaceutical organizations.',
    location: 'Executive Seminar Hall, ABBS Bengaluru',
    actionLabel: 'View Career Initiatives',
    actionRoute: '/placements',
  },
  {
    id: 'evt-4',
    type: 'Campus Life',
    title: 'Regalia — Inter-Collegiate Management, Cultural & Literary Festival',
    dateLabel: 'Annual Student Conclave',
    summary:
      'Student-led competitions featuring business case challenges, finance simulations, coding sprints, debate forums, and performing arts showcases.',
    location: 'ABBS Campus Amphitheatre & Auditorium',
    actionLabel: 'Discover Campus Life',
    actionRoute: '/campus-life',
  },
];

export const GENERAL_ADMISSIONS_FAQS = [
  {
    question: 'Is Acharya Bangalore B-School (ABBS) an accredited and recognized institution?',
    answer:
      'Yes. Established in 2008 under the Samagra Sikshana Samithi Trust (SSST), ABBS is accredited with Grade "A" by NAAC (3 cycles), holds NBA accreditation for its MBA department, IACBE (USA) international business accreditation, AICTE approval for its technical/management programs, and affiliation to Bangalore University with UGC 2(f) & 12(b) recognition.',
  },
  {
    question: 'How do I verify the exact tuition fees and scholarship eligibility for my program?',
    answer:
      'To ensure accuracy and prevent outdated fee figures, ABBS provides official program-wise fee schedules directly through the Admissions Office. Submit the online Admissions Enquiry Form on this page or email admissions@abbs.edu.in to receive the verified fee structure for your chosen course and quota.',
  },
  {
    question: 'Can I book an in-person campus visit before submitting my application?',
    answer:
      'Absolutely. Students and parents are encouraged to visit the campus at Andrahalli Main Road, Off Magadi Road, Bengaluru 560091. You can check the "Request Campus Visit" option in our enquiry form or call +91 91417 07070 to arrange a guided tour of the classrooms, laboratories, library, and hostels.',
  },
  {
    question: 'Which entrance exams are accepted for MBA and PGDM admissions?',
    answer:
      'Valid scores from CAT, XAT, MAT, CMAT, KMAT, Karnataka PGCET, and ABBSSAT are accepted for postgraduate management admissions, followed by a Personal Interview (PI) round.',
  },
  {
    question: 'Are hostel facilities available for outstation and international students?',
    answer:
      'Yes. Separate residential hostels for men and women are available near the campus with dining facilities, Wi-Fi, 24/7 security supervision, and resident wardens.',
  },
];
