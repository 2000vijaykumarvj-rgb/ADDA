import type { AcademicProgram } from '../utils/catalogLogic';

export interface AnnouncementConfig {
  id: string;
  category: string;
  message: string;
  ctaLabel: string;
  ctaLink: string;
  verificationNote: string;
}

export const INITIAL_ANNOUNCEMENTS: AnnouncementConfig[] = [
  {
    id: 'adm-open',
    category: 'Admissions Notice',
    message:
      'Admissions open for Undergraduate, Postgraduate & Doctoral programs. Schedule a personal counselling session or guided campus tour at our Bengaluru campus.',
    ctaLabel: 'Enquire Now',
    ctaLink: '/admissions#enquiry-form',
    verificationNote: 'Official schedules & seat availability confirmed directly by the Admissions Office.',
  },
  {
    id: 'naac-accreditation',
    category: 'Institutional Milestone',
    message:
      'Acharya Bangalore B-School holds NAAC "A" Grade accreditation across 3 cycles, NBA accreditation for the MBA Department, and IACBE international business accreditation.',
    ctaLabel: 'View Accreditations',
    ctaLink: '/about#accreditations',
    verificationNote: 'Verified institutional accreditations under Samagra Sikshana Samithi Trust.',
  },
  {
    id: 'campus-visit',
    category: 'Campus Experience',
    message:
      'Prospective students and parents are invited to visit the ABBS Campus on Andrahalli Main Road, Off Magadi Road, Bengaluru.',
    ctaLabel: 'Book Campus Visit',
    ctaLink: '/contact#visit-form',
    verificationNote: 'Prior appointment recommended via +91 9090909090 or 1234Abc@gmail.com.',
  },
];

export interface InstitutionalHighlight {
  id: string;
  label: string;
  value: string;
  subtext: string;
  verificationStatus: 'Verified Official Record' | 'Configurable / Subject to Batch Verification';
}

export const INSTITUTIONAL_HIGHLIGHTS: InstitutionalHighlight[] = [
  {
    id: 'naac',
    label: 'NAAC Accreditation',
    value: 'Grade "A"',
    subtext: 'Accredited by the National Assessment and Accreditation Council (3rd Cycle) · UGC 2(f) & 12(b) Recognized',
    verificationStatus: 'Verified Official Record',
  },
  {
    id: 'programs',
    label: 'Academic Programs',
    value: '10 Degrees',
    subtext: 'Spanning Management, Commerce, Computer Applications, Life Sciences, Liberal Arts & Doctoral Research',
    verificationStatus: 'Verified Official Record',
  },
  {
    id: 'accreditations',
    label: 'Global & Statutory Approvals',
    value: 'NBA · IACBE · AICTE',
    subtext: 'NBA-accredited MBA department, IACBE (USA) business accreditation, and AICTE approval',
    verificationStatus: 'Verified Official Record',
  },
  {
    id: 'established',
    label: 'Institutional Foundation',
    value: 'Est. 2008',
    subtext: 'Founded by Dr. B. Vijaypal Reddy under Samagra Sikshana Samithi Trust (SSST, Est. 1996) in Bengaluru',
    verificationStatus: 'Verified Official Record',
  },
];

export const OFFICIAL_CONTACT = {
  institutionName: 'Acharya Bangalore B-School (ABBS)',
  trustName: 'Samagra Sikshana Samithi Trust (SSST)',
  foundedYear: 2008,
  addressLine1: 'Andrahalli Main Road, Off Magadi Road',
  addressLine2: 'Bengaluru, Karnataka 560091, India',
  fullAddress: 'Andrahalli Main Road, Off Magadi Road, Bengaluru, Karnataka 560091, India',
  phones: ['+91 9090909090', '+91 80 2324 5516'],
  primaryPhoneTel: '+919090909090',
  secondaryPhoneTel: '+918023245516',
  email: '1234Abc@gmail.com',
  website: 'https://www.abbs.edu.in/',
  officeHoursNote:
    'Office visiting hours are subject to academic calendar schedules. Please call +91 9090909090 prior to visiting.',
  googleMapsDirectionsUrl:
    'https://www.google.com/maps/search/?api=1&query=Acharya+Bangalore+B-School+Andrahalli+Main+Road+Bengaluru+560091',
};

export const ACADEMIC_PROGRAMS: AcademicProgram[] = [
  {
    slug: 'mba',
    code: 'PG-MBA-01',
    title: 'Master of Business Administration (MBA)',
    shortTitle: 'MBA',
    level: 'Postgraduate',
    discipline: 'Management',
    specializations: [
      'General Management',
      'Business Analytics',
      'Entrepreneurship & Startups',
      'Finance, Marketing & Human Resources (University Core Tracks)',
    ],
    duration: '2 Years (4 Semesters · Full-Time)',
    durationVerification: 'Verified',
    affiliationAndApproval:
      'Affiliated to Bangalore University · Approved by AICTE · Accredited by NBA & IACBE (USA)',
    eligibility:
      'Bachelor’s degree in any discipline from a recognized university with a minimum aggregate of 50% marks (45% for SC/ST/Cat-I candidates of Karnataka) and a valid score in CAT / MAT / XAT / CMAT / KMAT / Karnataka PGCET / ABBSSAT.',
    eligibilityVerification: 'Verified',
    overview:
      'The flagship Master of Business Administration (MBA) at Acharya Bangalore B-School integrates analytical rigor, case-method pedagogy, and corporate immersion. Accredited by the National Board of Accreditation (NBA) and IACBE (USA), the curriculum prepares graduates for strategic decision-making across established enterprises and high-growth ventures.',
    academicHighlight: 'NBA Accredited Department · Case-Method & Live Industry Projects',
    curriculum: [
      {
        term: 'Year 1 · Semesters I & II',
        focus: 'Core Management Foundations & Quantitative Decision Science',
        subjects: [
          'Managerial Economics & Macroeconomic Policy',
          'Financial Reporting, Cost & Corporate Finance',
          'Organizational Behavior & Strategic Human Resource Management',
          'Quantitative Techniques, Statistics & Business Research Methods',
          'Marketing Management & Consumer Insights',
          'Operations Management & Supply Chain Systems',
        ],
      },
      {
        term: 'Summer Immersion',
        focus: 'Mandatory Corporate Internship & Field Dissertation',
        subjects: [
          'Industry Problem Formulation & Corporate Mentorship',
          'Applied Organizational Study & Executive Assessment',
        ],
      },
      {
        term: 'Year 2 · Semesters III & IV',
        focus: 'Specialization Tracks: General, Business Analytics & Entrepreneurship',
        subjects: [
          'Strategic Management & Corporate Governance',
          'Business Analytics Track: Predictive Modelling, Data Visualization & Decision Systems',
          'Entrepreneurship Track: Venture Ideation, New Enterprise Finance & Family Business Strategy',
          'General & Functional Electives: Corporate Valuation, Brand Architecture, Global Trade',
          'Capstone Master Thesis & Industry Defense',
        ],
        verificationNote:
          'Exact elective offerings per semester are governed by Bangalore University / Autonomous Board of Studies notifications.',
      },
    ],
    curriculumNote:
      'Core syllabus aligns with Bangalore University & AICTE postgraduate management standards. Detailed semester credit matrix is shared in the official academic handbook upon admission enquiry.',
    learningOutcomes: [
      'Synthesize complex financial, operational, and market data to formulate resilient corporate strategies.',
      'Apply predictive analytics and structured problem-solving frameworks to real-world business scenarios.',
      'Design, pitch, and scale entrepreneurial ventures through incubation mentorship at ABBS.',
      'Lead cross-functional teams with ethical governance and global cultural fluency.',
    ],
    careerOpportunities: [
      'Management Consultant & Strategy Associate',
      'Business Intelligence & Analytics Manager',
      'Corporate Finance & Investment Analyst',
      'Product & Brand Marketing Manager',
      'Founder / Venture Operations Lead',
    ],
    admissionProcess: [
      'Submit the online or campus Admissions Application along with academic transcripts.',
      'Provide valid national/state entrance test scorecards (CAT, MAT, XAT, CMAT, KMAT, PGCET, or ABBSSAT).',
      'Participate in the Group Discussion / Micro-Presentation and Personal Interview (PI) panel.',
      'Receive provisional admission offer and complete document verification at the Bengaluru campus.',
    ],
    faqs: [
      {
        question: 'Which entrance examinations are accepted for MBA admission at ABBS?',
        answer:
          'ABBS accepts valid scores from CAT, XAT, MAT, CMAT, KMAT, Karnataka PGCET, and the institution’s ABBSSAT assessment.',
      },
      {
        question: 'Is the MBA department accredited?',
        answer:
          'Yes. The MBA program at ABBS is approved by AICTE, affiliated to Bangalore University, and accredited by both the National Board of Accreditation (NBA) and IACBE (USA).',
      },
      {
        question: 'Where can I obtain the verified fee structure for the current academic intake?',
        answer:
          'Tuition fees vary between Government Quota (PGCET) and Management Quota seats. Please submit an enquiry or contact 1234Abc@gmail.com for the official signed fee schedule.',
      },
    ],
    visualTheme: 'management',
  },
  {
    slug: 'pgdm',
    code: 'PG-PGDM-02',
    title: 'Post Graduate Diploma in Management (PGDM — Global & BFSI)',
    shortTitle: 'PGDM (Global / BFSI)',
    level: 'Postgraduate',
    discipline: 'Management',
    specializations: [
      'PGDM Global',
      'PGDM Banking, Financial Services & Insurance (BFSI)',
    ],
    duration: '2 Years (Full-Time Autonomous Program)',
    durationVerification: 'Verified',
    affiliationAndApproval: 'Approved by AICTE, Ministry of Education, Govt. of India',
    eligibility:
      'Bachelor’s degree (minimum 3 years duration) in any discipline from a recognized university with at least 50% aggregate marks (45% for reserved categories) and a valid national management entrance score.',
    eligibilityVerification: 'Verified',
    overview:
      'The AICTE-approved Post Graduate Diploma in Management (PGDM) offers agile, industry-synchronized tracks in Global Management and Banking, Financial Services & Insurance (BFSI). Designed with direct corporate advisory input, the program emphasizes professional certifications, financial markets proficiency, and global business perspectives.',
    academicHighlight: 'AICTE Approved Autonomous Curriculum · Global & BFSI Focus',
    curriculum: [
      {
        term: 'Foundation & Core Modules',
        focus: 'Executive Communication, Managerial Economics & Financial Architecture',
        subjects: [
          'Corporate Financial Statements & Managerial Accounting',
          'Global Macroeconomic Environment & Geopolitics of Trade',
          'Quantitative Methods & Spreadsheet Modelling for Managers',
          'Marketing Strategy & Customer Value Management',
        ],
      },
      {
        term: 'PGDM — Global Track',
        focus: 'International Trade, Cross-Border Strategy & Global Supply Chains',
        subjects: [
          'International Business Strategy & Foreign Market Entry',
          'Global Logistics, Export-Import Documentation & Trade Finance',
          'Cross-Cultural Negotiation & International Corporate Law',
        ],
        verificationNote: 'International study immersion components are subject to prevailing cohort guidelines.',
      },
      {
        term: 'PGDM — BFSI Track',
        focus: 'Banking Operations, Capital Markets, Risk & Fintech Ecosystems',
        subjects: [
          'Commercial & Retail Banking Operations',
          'Investment Banking, Equity Research & Portfolio Management',
          'Risk Management, Basel Norms & Insurance Underwriting',
          'Financial Technology (Fintech) & Digital Payment Architectures',
        ],
      },
    ],
    curriculumNote:
      'Detailed trimester/semester module list and value-added certification calendar are provided directly by the PGDM Admissions Office.',
    learningOutcomes: [
      'Master banking regulations, credit risk appraisal, and capital market instruments in the BFSI track.',
      'Evaluate international market entry, global supply chains, and foreign exchange exposure in the Global track.',
      'Build executive communication, corporate negotiation, and analytical modelling capabilities.',
    ],
    careerOpportunities: [
      'Credit Risk & Treasury Analyst (BFSI)',
      'Wealth Management & Investment Advisory Associate',
      'International Business Development Manager',
      'Global Supply Chain & Trade Operations Analyst',
      'Corporate Banking Relationship Manager',
    ],
    admissionProcess: [
      'Complete the PGDM application form and submit entrance exam credentials.',
      'Attend the Case Analysis and Personal Interview with the PGDM selection panel.',
      'Confirm seat registration upon verification of undergraduate marksheets.',
    ],
    faqs: [
      {
        question: 'How does the PGDM differ from the university-affiliated MBA?',
        answer:
          'PGDM is an AICTE-approved autonomous diploma program allowing rapid curriculum updates in specialized tracks such as Global Business and BFSI, whereas the MBA follows the university degree structure.',
      },
      {
        question: 'Are final-year undergraduate students eligible to apply?',
        answer:
          'Yes, students appearing for their final semester bachelor’s examinations may apply provisionally, subject to meeting the minimum aggregate criteria upon graduation.',
      },
    ],
    visualTheme: 'pgdm',
  },
  {
    slug: 'mca',
    code: 'PG-MCA-03',
    title: 'Master of Computer Applications (MCA)',
    shortTitle: 'MCA',
    level: 'Postgraduate',
    discipline: 'Computer Applications',
    specializations: [
      'Software Engineering & Cloud Architecture',
      'Full-Stack Enterprise Development',
      'Data Science & Intelligent Systems',
    ],
    duration: '2 Years (4 Semesters) — Subject to current university regulation confirmation',
    durationVerification: 'Information to be confirmed',
    affiliationAndApproval: 'Information to be confirmed with ABBS Admissions Office for current intake',
    eligibility:
      'BCA / Bachelor’s degree in Computer Science Engineering or equivalent degree, or B.Sc. / B.Com. / B.A. with Mathematics at 10+2 level or at Graduation level with minimum 50% aggregate marks (45% for reserved categories), subject to KEA PGCET / KMAT / AICTE norms.',
    eligibilityVerification: 'Information to be confirmed',
    overview:
      'The Master of Computer Applications (MCA) equips postgraduate students with advanced competencies in algorithms, enterprise software engineering, database systems, cloud computing, and machine learning. Students gain hands-on experience in dedicated computing laboratories and capstone software projects.',
    academicHighlight: 'Advanced Systems Architecture · Capstone Software Engineering Lab',
    curriculum: [
      {
        term: 'Year 1 · Core Computing',
        focus: 'Data Structures, Operating Systems, Databases & Object-Oriented Engineering',
        subjects: [
          'Advanced Data Structures & Algorithm Design',
          'Relational & NoSQL Database Management Systems',
          'Operating Systems, Computer Networks & Distributed Computing',
          'Object-Oriented Software Engineering with Java & Python',
        ],
      },
      {
        term: 'Year 2 · Advanced & Applied Track',
        focus: 'Cloud Native Development, AI/ML & Full-Semester Industry Project',
        subjects: [
          'Full-Stack Web & Enterprise Application Frameworks',
          'Cloud Computing, DevOps & Microservices Architecture',
          'Machine Learning & Predictive Data Analytics',
          'Major Industry Software Project & Dissertation',
        ],
        verificationNote: 'Current session syllabus and elective choices to be confirmed with the Department of Computer Applications.',
      },
    ],
    curriculumNote:
      'Prospective applicants should verify the current semester credit structure and entrance exam codes (PGCET / KMAT) with the ABBS Admissions Desk.',
    learningOutcomes: [
      'Architect, develop, and test scalable full-stack and cloud-native software systems.',
      'Design optimized database schemas and data processing pipelines.',
      'Apply software engineering lifecycle methodologies (Agile, CI/CD, DevSecOps) in team environments.',
    ],
    careerOpportunities: [
      'Software Development Engineer (SDE)',
      'Cloud & DevOps Systems Engineer',
      'Full-Stack Application Architect',
      'Database Administrator & Data Engineer',
      'QA Automation & Systems Analyst',
    ],
    admissionProcess: [
      'Submit academic transcripts and entrance test score (PGCET / KMAT as applicable).',
      'Complete technical counselling and document verification with the Department of Computer Applications.',
    ],
    faqs: [
      {
        question: 'Can non-CS graduates apply for MCA?',
        answer:
          'Eligibility for graduates from B.Sc., B.Com., or B.A. streams requires Mathematics at the 10+2 or undergraduate level, alongside bridge courses as prescribed by university norms. Please confirm your specific transcript eligibility with the Admissions Office.',
      },
    ],
    visualTheme: 'computing',
  },
  {
    slug: 'mcom',
    code: 'PG-MCOM-04',
    title: 'Master of Commerce (M.Com)',
    shortTitle: 'M.Com',
    level: 'Postgraduate',
    discipline: 'Commerce and Finance',
    specializations: [
      'Accounting & Taxation',
      'Finance & Banking',
    ],
    duration: '2 Years (4 Semesters)',
    durationVerification: 'Verified',
    affiliationAndApproval: 'Affiliated to Bangalore University · NAAC "A" Grade Institution',
    eligibility:
      'B.Com / BBA / BBS or equivalent degree from a recognized university with minimum aggregate marks as prescribed by Bangalore University.',
    eligibilityVerification: 'Verified',
    overview:
      'The Master of Commerce (M.Com) program provides rigorous postgraduate training in corporate accounting, direct and indirect taxation, financial markets, forensic auditing, and empirical commerce research. Ideal for aspiring financial analysts, corporate controllers, and academic researchers.',
    academicHighlight: 'Advanced Corporate Accounting, Taxation & Financial Research',
    curriculum: [
      {
        term: 'Semesters I & II',
        focus: 'Monetary System, Advanced Financial Management & Macro-Commerce',
        subjects: [
          'Monetary System & International Financial Institutions',
          'Advanced Cost & Management Accounting',
          'Macroeconomics for Business Decisions',
          'Information Systems & Quantitative Research Methodology',
        ],
      },
      {
        term: 'Semesters III & IV',
        focus: 'Corporate Tax Planning, Auditing, Financial Derivatives & Dissertation',
        subjects: [
          'Direct & Indirect Tax Planning (GST & Corporate Tax)',
          'Security Analysis, Portfolio Management & Derivatives',
          'International Accounting Standards (IFRS / Ind AS)',
          'Empirical Commerce Dissertation & Viva Voce',
        ],
      },
    ],
    curriculumNote:
      'Follows the Bangalore University Department of Commerce postgraduate curriculum framework.',
    learningOutcomes: [
      'Evaluate corporate financial statements under Ind AS and IFRS frameworks.',
      'Structure compliant corporate tax planning and statutory audit workflows.',
      'Conduct quantitative research in capital markets, banking, and commerce policy.',
    ],
    careerOpportunities: [
      'Corporate Finance & Tax Consultant',
      'Statutory & Internal Audit Associate',
      'Equity & Fixed-Income Research Analyst',
      'Commerce Lecturer & Academic Researcher (NET/SET Pathway)',
    ],
    admissionProcess: [
      'Submit B.Com / BBA undergraduate marksheets via the ABBS Admissions Portal.',
      'Complete merit verification and personal counselling.',
    ],
    faqs: [
      {
        question: 'Does M.Com support preparation for UGC-NET and professional accounting exams?',
        answer:
          'Yes, the curriculum covers core accounting, taxation, and research methodology topics directly aligned with UGC-NET/JRF in Commerce and corporate finance roles.',
      },
    ],
    visualTheme: 'commerce',
  },
  {
    slug: 'bba',
    code: 'UG-BBA-05',
    title: 'Bachelor of Business Administration (BBA — General, Aviation Management, Business Analytics)',
    shortTitle: 'BBA',
    level: 'Undergraduate',
    discipline: 'Management',
    specializations: [
      'BBA General Management',
      'BBA Aviation Management',
      'BBA Business Analytics',
    ],
    duration: '3 Years / 4 Years Honours (As per prevailing University / NEP regulations)',
    durationVerification: 'Verified',
    affiliationAndApproval: 'Affiliated to Bangalore University · IACBE Accredited Business School',
    eligibility:
      'Pass in Two-Year Pre-University Course (PUC) of Karnataka State or 10+2 / Higher Secondary examination from any recognized Board/Council in any stream.',
    eligibilityVerification: 'Verified',
    overview:
      'The Bachelor of Business Administration (BBA) at ABBS builds a strong foundation in enterprise management while offering specialized tracks in General Management, Aviation Management, and Business Analytics. Students engage in case studies, industrial visits, business simulations, and student-led management conclaves.',
    academicHighlight: 'Three Distinct Tracks: General, Aviation Management & Business Analytics',
    curriculum: [
      {
        term: 'Foundation Year (Semesters I & II)',
        focus: 'Principles of Management, Financial Accounting & Business Economics',
        subjects: [
          'Management Principles & Organizational Behavior',
          'Financial Accounting & Corporate Reporting',
          'Microeconomics & Business Environment',
          'Business Mathematics, Statistics & Corporate Communication',
        ],
      },
      {
        term: 'Intermediate Year (Semesters III & IV)',
        focus: 'Core Functional Management & Track Foundations',
        subjects: [
          'Cost & Management Accounting',
          'Marketing Management & Human Resource Management',
          'Aviation Track: Airport Operations, Airline Management & Aviation Safety Regulations',
          'Business Analytics Track: R/Python for Data Analysis, SQL & Business Visualization',
        ],
      },
      {
        term: 'Advanced Year (Semesters V & VI / Honours)',
        focus: 'Strategic Management, Track Electives & Industry Internship',
        subjects: [
          'Financial Management, Business Law & Income Tax',
          'Aviation Track: Air Cargo Logistics, Crew Resource Management & Terminal Operations',
          'Business Analytics Track: Predictive Analytics, Marketing Analytics & FinTech Systems',
          'Live Corporate Internship & Project Report',
        ],
      },
    ],
    curriculumNote:
      'Track availability and semester-wise specialization papers are governed by Bangalore University and institutional academic guidelines.',
    learningOutcomes: [
      'Understand core business functions across finance, marketing, operations, and human resources.',
      'Acquire specialized domain fluency in airport/airline operations (Aviation track) or data-driven decision systems (Business Analytics track).',
      'Develop leadership, public speaking, and team collaboration skills through management clubs.',
    ],
    careerOpportunities: [
      'Business Analyst & Operations Executive',
      'Airport Ground Operations & Airline Management Executive (Aviation Track)',
      'Marketing, Sales & Client Servicing Associate',
      'Human Resource & Talent Acquisition Coordinator',
      'Pathway to MBA / PGDM & Entrepreneurial Ventures',
    ],
    admissionProcess: [
      'Apply online or in person with 10th and 12th / II PUC marksheets.',
      'Select preferred track (General, Aviation Management, or Business Analytics) during admission counselling.',
      'Complete admission formalities and fee payment upon document verification.',
    ],
    faqs: [
      {
        question: 'Can students from Science, Commerce, or Arts in 10+2 apply for BBA?',
        answer:
          'Yes. Candidates who have passed 10+2 / II PUC in Science, Commerce, or Arts from a recognized board are eligible to apply for all BBA tracks.',
      },
      {
        question: 'What distinguishes BBA Aviation Management at ABBS?',
        answer:
          'BBA Aviation Management blends core business administration degrees with specialized modules in airport management, airline operations, cargo logistics, and aviation regulatory compliance.',
      },
    ],
    visualTheme: 'bba',
  },
  {
    slug: 'bca-ai-ml',
    code: 'UG-BCA-06',
    title: 'Bachelor of Computer Applications (BCA with AI and Machine Learning)',
    shortTitle: 'BCA (AI & ML)',
    level: 'Undergraduate',
    discipline: 'Computer Applications',
    specializations: [
      'Artificial Intelligence & Machine Learning',
      'Full-Stack Software Development',
      'Cloud & Data Engineering Foundations',
    ],
    duration: '3 Years / 4 Years Honours (As per University framework)',
    durationVerification: 'Verified',
    affiliationAndApproval: 'Affiliated to Bangalore University · AICTE Approved',
    eligibility:
      'Pass in 10+2 / II PUC or equivalent examination (or 3-year Polytechnic Engineering Diploma) from a recognized board as per Bangalore University eligibility norms.',
    eligibilityVerification: 'Verified',
    overview:
      'The Bachelor of Computer Applications (BCA) with Artificial Intelligence and Machine Learning combines core computer science fundamentals—programming, data structures, databases, and networks—with applied tracks in AI, neural networks, data analytics, and modern web engineering.',
    academicHighlight: 'Integrated AI & Machine Learning Lab Modules with Core BCA',
    curriculum: [
      {
        term: 'Year 1 · Programming & Mathematical Foundations',
        focus: 'Problem Solving, Discrete Mathematics & Data Structures',
        subjects: [
          'Programming in C & Object-Oriented Programming in C++/Java',
          'Data Structures & Algorithmic Thinking',
          'Discrete Mathematical Structures & Statistical Foundations for AI',
          'Digital Electronics & Computer Architecture',
        ],
      },
      {
        term: 'Year 2 · Databases, Web & Python for Data Science',
        focus: 'Database Systems, Operating Systems & Machine Learning Fundamentals',
        subjects: [
          'Database Management Systems (SQL) & Software Engineering',
          'Operating Systems (Linux/Unix) & Computer Networks',
          'Python Programming for Data Science & Exploratory Data Analysis',
          'Supervised & Unsupervised Machine Learning Algorithms',
        ],
      },
      {
        term: 'Year 3 · Applied AI, Deep Learning & Capstone Project',
        focus: 'Neural Networks, Cloud Deployment & Full-Stack Capstone',
        subjects: [
          'Deep Learning Foundations, Natural Language Processing & Computer Vision',
          'Full-Stack Web Application Development',
          'Cloud Computing & AI Model Deployment',
          'Major Software / AI Engineering Project',
        ],
      },
    ],
    curriculumNote:
      'Core BCA subjects follow Bangalore University regulations, augmented by value-added AI and Machine Learning certification modules.',
    learningOutcomes: [
      'Write clean, modular code in Python, Java, C, and modern JavaScript frameworks.',
      'Build, train, and evaluate machine learning models on real-world datasets.',
      'Design full-stack web applications backed by relational and cloud databases.',
    ],
    careerOpportunities: [
      'Junior AI / Machine Learning Engineer',
      'Full-Stack Software Developer',
      'Data Analyst & Business Intelligence Developer',
      'Cloud Support & Systems Associate',
      'Higher Studies in MCA / MS in Computer Science & AI',
    ],
    admissionProcess: [
      'Submit 10+2 / II PUC academic records via the online enquiry or application form.',
      'Attend admission counselling to review the AI & ML specialization track.',
    ],
    faqs: [
      {
        question: 'Is prior coding experience required before joining BCA with AI & ML?',
        answer:
          'No prior coding experience is mandatory. Semester I begins with foundational programming logic in C and Python before progressing to data structures and machine learning.',
      },
    ],
    visualTheme: 'bca',
  },
  {
    slug: 'bcom-acca-cma-fintech',
    code: 'UG-BCOM-07',
    title: 'Bachelor of Commerce (B.Com with ACCA, CMA, and Fintech)',
    shortTitle: 'B.Com (ACCA / CMA / Fintech)',
    level: 'Undergraduate',
    discipline: 'Commerce and Finance',
    specializations: [
      'B.Com with ACCA (Association of Chartered Certified Accountants, UK)',
      'B.Com with US CMA (Certified Management Accountant)',
      'B.Com with Fintech & Financial Markets',
      'B.Com General / Corporate Accounting',
    ],
    duration: '3 Years / 4 Years Honours (As per University norms)',
    durationVerification: 'Verified',
    affiliationAndApproval: 'Affiliated to Bangalore University · NAAC "A" Grade Accredited',
    eligibility:
      'Pass in 10+2 / II PUC or equivalent examination from a recognized board/council.',
    eligibilityVerification: 'Verified',
    overview:
      'The Bachelor of Commerce (B.Com) program at ABBS bridges university commerce education with global finance credentials. Students can opt for professional tracks integrated with ACCA (UK), CMA (USA), or Financial Technology (Fintech), preparing them for multinational audit firms, corporate finance desks, and digital financial ecosystems.',
    academicHighlight: 'Global Finance Credentials: ACCA, US CMA & Fintech Tracks',
    curriculum: [
      {
        term: 'Core Commerce & Accounting Pillars',
        focus: 'Financial Reporting, Corporate Law, Costing & Taxation',
        subjects: [
          'Advanced Financial & Corporate Accounting',
          'Cost Accounting, Management Control & Auditing',
          'Indian Taxation System (Income Tax & GST Practice)',
          'Business Regulations, Company Law & Banking Operations',
        ],
      },
      {
        term: 'ACCA & CMA Professional Alignment Track',
        focus: 'International Financial Reporting (IFRS), Performance & Strategic Finance',
        subjects: [
          'International Financial Reporting Standards (IFRS)',
          'Strategic Business Leader & Financial Management Alignment',
          'Cost & Performance Management (US CMA Part 1 & Part 2 Alignment)',
        ],
        verificationNote:
          'External professional body registration, examination fees, and paper exemption rules are governed by ACCA / IMA guidelines; confirm exact coaching coverage with the Department of Commerce.',
      },
      {
        term: 'Fintech & Digital Finance Track',
        focus: 'Financial Analytics, Digital Banking & Algorithmic Markets',
        subjects: [
          'Financial Modelling using Spreadsheets & Quantitative Tools',
          'Fintech Ecosystems, Digital Payments & Blockchain in Finance',
          'Capital Markets, Derivatives & Wealth Tech',
        ],
      },
    ],
    curriculumNote:
      'Students earn the Bangalore University B.Com degree alongside structured coaching for their chosen professional specialization.',
    learningOutcomes: [
      'Prepare and audit financial statements in accordance with Indian and international accounting standards.',
      'Progress toward globally recognized ACCA or CMA certifications alongside undergraduate studies.',
      'Apply financial modelling and Fintech tools to modern corporate treasury and banking workflows.',
    ],
    careerOpportunities: [
      'Audit & Assurance Associate (Big 4 & Global Accounting Firms)',
      'Management Accountant & Financial Planning Analyst (FP&A)',
      'Taxation & Statutory Compliance Specialist',
      'Fintech Operations & Financial Data Analyst',
    ],
    admissionProcess: [
      'Submit 10+2 / II PUC marksheets and select preferred track (ACCA, CMA, or Fintech).',
      'Complete counselling regarding professional body registration and fee structure.',
    ],
    faqs: [
      {
        question: 'Are ACCA or CMA examination registration fees included in tuition?',
        answer:
          'Fee structures for ACCA, CMA, and Fintech tracks differ based on coaching modules and external professional body fees. Please request the detailed B.Com track fee sheet from 1234Abc@gmail.com.',
      },
    ],
    visualTheme: 'bcom',
  },
  {
    slug: 'bsc-life-sciences',
    code: 'UG-BSC-08',
    title: 'Bachelor of Science (B.Sc. — Biotechnology, Microbiology, Forensic Science)',
    shortTitle: 'B.Sc. Life & Forensic Sciences',
    level: 'Undergraduate',
    discipline: 'Science',
    specializations: [
      'Biotechnology',
      'Microbiology',
      'Forensic Science',
      'Genetics & Biochemistry (Subject to University Combinations)',
    ],
    duration: '3 Years / 4 Years Honours (Subject to University regulation confirmation)',
    durationVerification: 'Information to be confirmed',
    affiliationAndApproval: 'Affiliated to Bangalore University',
    eligibility:
      'Pass in 10+2 / II PUC Science stream with Biology / Chemistry / Physics (specific subject prerequisites depend on chosen discipline combination) from a recognized board.',
    eligibilityVerification: 'Verified',
    overview:
      'The Bachelor of Science (B.Sc.) programs at ABBS cultivate scientific inquiry and laboratory precision across Biotechnology, Microbiology, and Forensic Science. Supported by dedicated wet laboratories, instrumentation rooms, and research-active faculty, students train for careers in biopharmaceuticals, clinical diagnostics, quality assurance, and forensic investigation.',
    academicHighlight: 'Dedicated Life-Science Laboratories & Experimental Research Projects',
    curriculum: [
      {
        term: 'Biotechnology Stream',
        focus: 'Cell Biology, Molecular Genetics, Recombinant DNA & Bioprocess Technology',
        subjects: [
          'Cell Biology, Biomolecules & Enzymology',
          'Molecular Biology & Genetic Engineering',
          'Plant, Animal & Industrial Bioprocess Biotechnology',
          'Immunology & Bioinformatics Fundamentals',
        ],
      },
      {
        term: 'Microbiology Stream',
        focus: 'Bacteriology, Virology, Medical & Industrial Microbiology',
        subjects: [
          'Microbial Diversity, Physiology & Metabolism',
          'Medical Microbiology, Pathology & Clinical Diagnostics',
          'Food, Dairy & Agricultural Microbiology',
          'Fermentation Technology & Microbial Quality Control',
        ],
      },
      {
        term: 'Forensic Science Stream',
        focus: 'Crime Scene Investigation, Toxicology, Ballistics & DNA Profiling',
        subjects: [
          'Principles of Forensic Science & Criminalistics',
          'Forensic Chemistry, Toxicology & Questioned Documents',
          'Forensic Biology, Serology & DNA Fingerprinting',
          'Digital Forensics & Instrumental Methods of Analysis',
        ],
        verificationNote:
          'Exact major/minor combinations for the current academic session are subject to Bangalore University notifications.',
      },
    ],
    curriculumNote:
      'Includes mandatory laboratory practicals in every semester. Confirm current major/minor combinations with the Department of Life Sciences.',
    learningOutcomes: [
      'Perform aseptic microbiological techniques, PCR, electrophoresis, and analytical assays safely and accurately.',
      'Analyze biological, chemical, and forensic evidence using scientific instrumentation and documented protocols.',
      'Design and document independent undergraduate scientific research projects.',
    ],
    careerOpportunities: [
      'Biotech Research & Bioprocess Associate',
      'Clinical & Quality Control Microbiologist',
      'Forensic Laboratory Analyst & Crime Scene Investigator',
      'Pharmaceutical R&D & Regulatory Affairs Executive',
      'Postgraduate Pathways (M.Sc. / Integrated Ph.D. in Life & Forensic Sciences)',
    ],
    admissionProcess: [
      'Submit 10+2 / II PUC Science marksheets (Physics, Chemistry, Biology).',
      'Confirm available B.Sc. subject combinations with the Life Sciences Admissions Counselor.',
    ],
    faqs: [
      {
        question: 'Does ABBS have on-campus laboratories for Biotechnology and Microbiology?',
        answer:
          'Yes, the Bengaluru campus features dedicated life-science laboratories equipped for microbiology culturing, molecular biology, biochemistry, and analytical experiments.',
      },
    ],
    visualTheme: 'science',
  },
  {
    slug: 'ba-humanities',
    code: 'UG-BA-09',
    title: 'Bachelor of Arts (BA — Journalism, Psychology & Liberal Arts)',
    shortTitle: 'BA',
    level: 'Undergraduate',
    discipline: 'Arts',
    specializations: [
      'Journalism & Mass Communication',
      'Psychology',
      'English & Humanities (Confirm active combinations for current academic year)',
    ],
    duration: '3 Years / 4 Years Honours (As per University framework)',
    durationVerification: 'Verified',
    affiliationAndApproval: 'Affiliated to Bangalore University',
    eligibility:
      'Pass in 10+2 / II PUC or equivalent examination in any stream (Arts, Commerce, or Science) from a recognized board.',
    eligibilityVerification: 'Verified',
    overview:
      'The Bachelor of Arts (BA) program at ABBS fosters critical thinking, media literacy, behavioral understanding, and persuasive communication. With disciplines spanning Journalism, Psychology, and the Humanities, graduates are prepared for careers in digital media, corporate communications, counseling pathways, public policy, and civil services.',
    academicHighlight: 'Media Studio Practice, Behavioral Psychology & Critical Writing',
    curriculum: [
      {
        term: 'Media & Journalism Studies',
        focus: 'Reporting, Broadcast Production, Digital Media & Media Law',
        subjects: [
          'Introduction to Mass Communication & Journalism Ethics',
          'Print, Broadcast & Digital News Production',
          'Public Relations, Corporate Communication & Advertising Strategy',
        ],
      },
      {
        term: 'Psychological Sciences',
        focus: 'Cognitive, Developmental, Social & Organizational Psychology',
        subjects: [
          'Foundations of General & Experimental Psychology',
          'Developmental & Lifespan Psychology',
          'Social, Counseling & Organizational Behavior',
          'Psychological Assessment & Experimental Practicum',
        ],
      },
      {
        term: 'Humanities & Research Synthesis',
        focus: 'Critical Writing, Social Inquiry & Field Internship',
        subjects: [
          'Academic Writing, Literature & Cultural Studies',
          'Social Research Methods & Media/Community Internship',
        ],
        verificationNote:
          'Specific subject combinations offered in the current intake must be confirmed with the Admissions Office.',
      },
    ],
    curriculumNote:
      'Subject combinations follow Bangalore University undergraduate Arts regulations.',
    learningOutcomes: [
      'Produce researched journalism, multimedia storytelling, and strategic corporate communications.',
      'Apply foundational psychological theories and behavioral research methods ethically.',
      'Articulate complex social, cultural, and policy arguments in written and oral formats.',
    ],
    careerOpportunities: [
      'Journalist, Content Strategist & Digital Media Producer',
      'Corporate Communications & Public Relations Specialist',
      'Human Resources & Behavioral Assessment Associate',
      'Postgraduate Pathways in Clinical/Counseling Psychology, Mass Comm, MSW, or Civil Services',
    ],
    admissionProcess: [
      'Submit 10+2 / II PUC transcripts via the ABBS Admissions Portal.',
      'Verify active BA subject combinations during personal admission counseling.',
    ],
    faqs: [
      {
        question: 'Which subject combinations are available in the BA program?',
        answer:
          'ABBS offers combinations incorporating Journalism & Mass Communication, Psychology, and Humanities subjects under Bangalore University. Please confirm the exact combinations open for the current academic session with the Admissions Office.',
      },
    ],
    visualTheme: 'arts',
  },
  {
    slug: 'phd-management',
    code: 'DOC-PHD-10',
    title: 'Ph.D. in Management',
    shortTitle: 'Ph.D. in Management',
    level: 'Doctoral',
    discipline: 'Management',
    specializations: [
      'Finance & Accounting',
      'Marketing & Consumer Behavior',
      'Human Resource Management & Organizational Behavior',
      'Strategic Management, Operations & Entrepreneurship',
    ],
    duration: 'Minimum 3 Years (Full-Time / Part-Time as per University Doctoral Regulations)',
    durationVerification: 'Information to be confirmed',
    affiliationAndApproval: 'Recognized Research Centre (Affiliated University Doctoral Framework)',
    eligibility:
      'Master’s degree (MBA / PGDM equivalent / M.Com or allied discipline) with a minimum of 55% aggregate marks (50% for reserved categories as per UGC norms) and qualification in UGC-NET / JRF / University Ph.D. Entrance Test.',
    eligibilityVerification: 'Information to be confirmed',
    overview:
      'The Doctoral Program (Ph.D. in Management) at Acharya Bangalore B-School supports scholars pursuing original empirical and theoretical research in management sciences. Guided by recognized doctoral supervisors, scholars engage in advanced econometrics, qualitative inquiry, policy evaluation, and peer-reviewed scholarly publishing.',
    academicHighlight: 'Supervised Doctoral Research · Econometrics & Peer-Reviewed Publication',
    curriculum: [
      {
        term: 'Phase I · Doctoral Coursework',
        focus: 'Research Methodology, Quantitative Econometrics & Domain Literature Review',
        subjects: [
          'Advanced Research Methodology & Philosophy of Management Science',
          'Multivariate Data Analysis, Econometrics & Qualitative Methods',
          'Research & Publication Ethics (RPE - UGC Mandated)',
          'Domain-Specific Specialization Seminar & Comprehensive Exam',
        ],
      },
      {
        term: 'Phase II · Proposal Defense & Empirical Fieldwork',
        focus: 'Synopsis Approval, Data Collection & Biannual Doctoral Committee Reviews',
        subjects: [
          'Research Proposal Defense before Doctoral Advisory Committee',
          'Primary/Secondary Data Collection & Empirical Modelling',
          'Publication in Scopus / ABDC / UGC-CARE Indexed Journals',
        ],
      },
      {
        term: 'Phase III · Thesis Submission & Viva Voce',
        focus: 'Pre-Submission Seminar, External Adjudication & Public Defense',
        subjects: [
          'Pre-Submission Colloquium at ABBS Research Centre',
          'Final Doctoral Thesis Submission & Viva Voce Defense',
        ],
        verificationNote:
          'Doctoral seat availability, guide allocation, and entrance notification dates are governed by university research announcements.',
      },
    ],
    curriculumNote:
      'Prospective doctoral candidates should contact the ABBS Research & Innovation Cell to verify current supervisor vacancies and university Ph.D. notification schedules.',
    learningOutcomes: [
      'Design and execute rigorous, original scholarly research addressing contemporary management challenges.',
      'Publish peer-reviewed articles in internationally indexed management journals (Scopus, Web of Science, ABDC).',
      'Contribute to academic teaching, executive training, and corporate or public policy advisory.',
    ],
    careerOpportunities: [
      'Professor & Academic Faculty in Business Schools & Universities',
      'Principal Economist & Corporate Strategy Researcher',
      'Public Policy Think-Tank Fellow',
      'Research Director in Management Consulting & Analytics',
    ],
    admissionProcess: [
      'Monitor official University Ph.D. notification and submit a preliminary Research Interest Note to ABBS.',
      'Qualify through UGC-NET/JRF or the University Doctoral Entrance Test.',
      'Present the research synopsis before the Doctoral Interview & Guide Allocation Committee.',
    ],
    faqs: [
      {
        question: 'How do I check current supervisor availability for Ph.D. in Management?',
        answer:
          'Vacancies under recognized Ph.D. guides depend on current scholar allocations. Please submit an enquiry specifying your research domain so the Research Cell can share current availability.',
      },
    ],
    visualTheme: 'doctoral',
  },
];

export interface LeadershipMember {
  name: string;
  role: string;
  unit: string;
  bio: string;
  verificationSource: string;
}

export const LEADERSHIP_TEAM: LeadershipMember[] = [
  {
    name: 'Dr. B. Vijaypal Reddy',
    role: 'Founder & Chairman',
    unit: 'Samagra Sikshana Samithi Trust (SSST) & ABBS',
    bio: 'Established the Samagra Sikshana Samithi Trust in 1996 and founded Acharya Bangalore B-School in 2008 with a vision to build an institution anchored in academic rigor, ethical governance, and industry relevance.',
    verificationSource: 'Verified Institutional Profile (abbs.edu.in)',
  },
  {
    name: 'Mrs. Poornima Reddy',
    role: 'Management Trustee & Managing Director',
    unit: 'Samagra Sikshana Samithi Trust (SSST)',
    bio: 'Leads institutional quality initiatives, campus infrastructure stewardship, student welfare frameworks, and national and international accreditation milestones across ABBS.',
    verificationSource: 'Verified Institutional Profile (abbs.edu.in)',
  },
  {
    name: 'Mr. Ajitesh Basani',
    role: 'Chief Executive Officer (CEO) & Executive Director',
    unit: 'Acharya Bangalore B-School',
    bio: 'Spearheads strategic growth, global university partnerships, entrepreneurship incubation initiatives, digital transformation, and corporate engagement across ABBS.',
    verificationSource: 'Verified Institutional Profile (abbs.edu.in)',
  },
  {
    name: 'Dr. H. R. Venkatesha',
    role: 'Director — MBA & Senior Academic Mentor',
    unit: 'Department of Management Studies',
    bio: 'Guides postgraduate management curriculum architecture, NBA and IACBE accreditation standards, case-method pedagogy, and doctoral research at ABBS.',
    verificationSource: 'Verified Institutional Profile (abbs.edu.in)',
  },
  {
    name: 'Dr. Vijaya Bhaskar',
    role: 'Principal',
    unit: 'Acharya Bangalore B-School',
    bio: 'Oversees undergraduate and postgraduate academic administration, university examination governance, faculty development, and statutory compliance.',
    verificationSource: 'Verified Institutional Profile (abbs.edu.in)',
  },
  {
    name: 'Dr. Geevarghis GN',
    role: 'Dean — Academics',
    unit: 'Academic Council & Quality Assurance',
    bio: 'Coordinates outcome-based education (OBE) frameworks, interdisciplinary curriculum delivery, and academic audit processes across departments.',
    verificationSource: 'Verified Institutional Profile (abbs.edu.in)',
  },
  {
    name: 'Dr. Madhumita Ghosh Dastidar',
    role: 'Dean — Life Sciences',
    unit: 'Department of Biotechnology, Microbiology & Forensic Science',
    bio: 'Leads undergraduate scientific instruction, wet-laboratory safety and instrumentation standards, and student research projects in the Life Sciences wing.',
    verificationSource: 'Verified Institutional Profile (abbs.edu.in)',
  },
];

export interface AccreditationRecord {
  title: string;
  authority: string;
  status: string;
  scope: string;
  verificationNote: string;
}

export const ACCREDITATIONS_LIST: AccreditationRecord[] = [
  {
    title: 'NAAC Grade "A" Accreditation',
    authority: 'National Assessment and Accreditation Council (NAAC)',
    status: 'Accredited (3 Cycles)',
    scope: 'Institution-wide quality assessment covering curricular aspects, teaching-learning, research, and governance.',
    verificationNote: 'Verified from official ABBS institutional disclosures.',
  },
  {
    title: 'NBA Accreditation (MBA Department)',
    authority: 'National Board of Accreditation (NBA), India',
    status: 'Accredited Program',
    scope: 'Applies specifically to the Master of Business Administration (MBA) program for outcome-based management education.',
    verificationNote: 'Program-specific accreditation; scope applies to the MBA department.',
  },
  {
    title: 'IACBE International Accreditation',
    authority: 'International Accreditation Council for Business Education (USA)',
    status: 'Accredited Member',
    scope: 'International specialized accreditation for business and management programs at ABBS.',
    verificationNote: 'Verified international business school accreditation.',
  },
  {
    title: 'AICTE Statutory Approval',
    authority: 'All India Council for Technical Education, Ministry of Education',
    status: 'Approved',
    scope: 'Statutory approval for technical and management programs (MBA, PGDM, BCA/MCA as applicable).',
    verificationNote: 'Annual Extension of Approval (EoA) maintained as per AICTE norms.',
  },
  {
    title: 'UGC 2(f) & 12(b) Recognition & Bangalore University Affiliation',
    authority: 'University Grants Commission & Bangalore University',
    status: 'Recognized & Affiliated (Autonomous Status Profile)',
    scope: 'Degree programs affiliated with Bangalore University and recognized under UGC Sections 2(f) and 12(b).',
    verificationNote: 'Verify program-specific autonomous vs university examination scheme with the Admissions Office.',
  },
];

export interface CampusFacility {
  id: string;
  title: string;
  category: 'Academic' | 'Laboratories' | 'Innovation' | 'Student Life' | 'Residential & Sports';
  summary: string;
  specifications: string[];
  visualType:
    | 'library'
    | 'computer-lab'
    | 'lifescience-lab'
    | 'incubation'
    | 'auditorium'
    | 'sports'
    | 'hostel'
    | 'clubs'
    | 'cultural';
  caption: string;
}

export const CAMPUS_FACILITIES: CampusFacility[] = [
  {
    id: 'knowledge-resource-center',
    title: 'Central Library & Knowledge Resource Centre',
    category: 'Academic',
    summary:
      'Houses an extensive collection of management, commerce, computer science, and life-science volumes, national and international peer-reviewed journals, digital databases (DELNET, e-journals), and quiet reading commons.',
    specifications: [
      'Print textbooks, reference encyclopedias, and bound periodicals',
      'Digital repository access for research scholars and postgraduate students',
      'Dedicated thesis archive and quiet study carrels',
    ],
    visualType: 'library',
    caption: 'Illustrative architectural representation — Central Library & Digital Knowledge Commons',
  },
  {
    id: 'computer-laboratories',
    title: 'Computing & Analytics Laboratories',
    category: 'Laboratories',
    summary:
      'High-speed networked computing centres supporting BCA (AI & ML), MCA, and Business Analytics coursework with modern software development toolchains, database servers, and statistical packages.',
    specifications: [
      'Workstations configured for Python, Java, R, SQL, and full-stack development',
      'High-speed campus fiber backbone and Wi-Fi coverage',
      'Dedicated lab sessions with technical lab instructors',
    ],
    visualType: 'computer-lab',
    caption: 'Illustrative representation — Networked Computing & AI/ML Laboratory',
  },
  {
    id: 'lifescience-laboratories',
    title: 'Biotechnology, Microbiology & Forensic Laboratories',
    category: 'Laboratories',
    summary:
      'Specialized wet laboratories equipped for microbial culturing, molecular biology, biochemistry, genetic analysis, and forensic examination for B.Sc. students.',
    specifications: [
      'Aseptic laminar airflow cabinets, autoclaves, and incubators',
      'PCR cyclers, spectrophotometers, electrophoresis units, and compound microscopes',
      'Strict laboratory safety protocols and supervised experimental blocks',
    ],
    visualType: 'lifescience-lab',
    caption: 'Illustrative representation — Life Sciences & Analytical Instrumentation Suite',
  },
  {
    id: 'incubation-entrepreneurship',
    title: 'ABBS Incubation & Entrepreneurship Cell',
    category: 'Innovation',
    summary:
      'Supports student founders, early-stage prototypes, and business plan competitions with faculty mentorship, industry pitch clinics, and startup advisory.',
    specifications: [
      'Co-working and ideation zones for student venture teams',
      'Mentorship clinics on venture validation, IP literacy, and seed pitching',
      'Integration with MBA Entrepreneurship and undergraduate innovation clubs',
    ],
    visualType: 'incubation',
    caption: 'Illustrative representation — Entrepreneurship & Venture Incubation Studio',
  },
  {
    id: 'auditorium-seminar-halls',
    title: 'Main Auditorium & Executive Seminar Halls',
    category: 'Academic',
    summary:
      'Acoustically treated auditorium and tiered seminar halls hosting international conferences, CEO leadership lectures, convocation ceremonies, and academic colloquia.',
    specifications: [
      'Modern audio-visual projection and lecture capture systems',
      'Tiered seating for corporate townhalls and symposiums',
      'Multiple departmental seminar rooms for case discussions',
    ],
    visualType: 'auditorium',
    caption: 'Illustrative architectural representation — Main Convocation & Symposium Auditorium',
  },
  {
    id: 'sports-fitness',
    title: 'Sports Grounds, Indoor Arena & Gymnasium',
    category: 'Residential & Sports',
    summary:
      'Comprehensive outdoor and indoor athletic infrastructure promoting physical wellness, inter-collegiate tournaments, and team leadership.',
    specifications: [
      'Outdoor courts and fields for cricket, football, basketball, and volleyball',
      'Indoor recreation zone for table tennis, chess, carrom, and badminton',
      'Multi-station fitness gymnasium for students',
    ],
    visualType: 'sports',
    caption: 'Illustrative representation — Campus Athletics & Sports Facilities',
  },
  {
    id: 'student-hostels',
    title: 'On-Campus & Managed Student Hostels',
    category: 'Residential & Sports',
    summary:
      'Separate, secure residential facilities for men and women providing a supportive living-learning community near the Andrahalli Main Road campus.',
    specifications: [
      '24/7 security supervision, biometric/register access, and resident wardens',
      'Hygienic dining hall serving nutritious vegetarian and regional meals',
      'Wi-Fi connectivity, study areas, and medical first-aid support',
    ],
    visualType: 'hostel',
    caption: 'Illustrative representation — Student Residential & Dining Commons',
  },
  {
    id: 'student-clubs',
    title: 'Academic, Toastmasters & Special-Interest Clubs',
    category: 'Student Life',
    summary:
      'Student-governed clubs spanning Finance, Marketing, HR, Analytics, Coding, Eco-Sustainability, Literary Arts, and Community Social Responsibility (CSR).',
    specifications: [
      'Peer-led workshops, case competitions, and stock-market simulations',
      'Communication & leadership development through Toastmasters and debate forums',
      'Social outreach, blood donation drives, and environmental stewardship',
    ],
    visualType: 'clubs',
    caption: 'Illustrative representation — Student Societies & Leadership Conclaves',
  },
  {
    id: 'cultural-events',
    title: 'Regalia & Annual Cultural Festivals',
    category: 'Student Life',
    summary:
      'Vibrant inter-collegiate management and cultural festivals celebrating music, theatre, fine arts, choreography, and student creativity.',
    specifications: [
      'Annual inter-collegiate management and cultural fest',
      'Ethnic day celebrations, literary fests, and performing arts showcases',
      'Student organizing committees managing sponsorship, logistics, and hospitality',
    ],
    visualType: 'cultural',
    caption: 'Illustrative representation — Annual Cultural & Management Festival Stage',
  },
];
