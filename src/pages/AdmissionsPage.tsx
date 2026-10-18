import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, FileText, CheckCircle2, Info, Calendar } from 'lucide-react';
import { ACADEMIC_PROGRAMS, OFFICIAL_CONTACT } from '../data/abbsData';
import { GENERAL_ADMISSIONS_FAQS } from '../data/extendedData';
import { EnquiryForm } from '../components/EnquiryForm';
import { FAQAccordion } from '../components/FAQAccordion';
import { SEOHead } from '../components/SEOHead';

const ADMISSION_STEPS = [
  {
    step: '01',
    title: 'Program Exploration & Eligibility Review',
    description:
      'Review the academic curriculum, specialization tracks, and minimum qualification norms for your chosen Undergraduate, Postgraduate, or Doctoral program.',
  },
  {
    step: '02',
    title: 'Online Enquiry & Application Submission',
    description:
      'Submit the official Admissions Enquiry Form on this page or register on the ABBS Admissions Portal with your academic marksheets and entrance test scores (where applicable).',
  },
  {
    step: '03',
    title: 'Entrance Score Verification & Personal Interview (PI)',
    description:
      'Postgraduate applicants (MBA/PGDM) undergo entrance score review (CAT / MAT / XAT / CMAT / KMAT / PGCET / ABBSSAT) followed by a Personal Interview. Undergraduate applicants complete academic counselling.',
  },
  {
    step: '04',
    title: 'Offer Letter, Document Verification & Enrolment',
    description:
      'Selected candidates receive a provisional admission offer, complete original transcript verification at the Bengaluru campus, and remit the verified tuition fee.',
  },
];

export const AdmissionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Postgraduate' | 'Undergraduate' | 'Doctoral'>(
    'Postgraduate'
  );
  const [brochureRequested, setBrochureRequested] = useState(false);

  const tabPrograms = ACADEMIC_PROGRAMS.filter((p) => p.level === activeTab);

  return (
    <>
      <SEOHead
        title="Admissions & Application Process | Acharya Bangalore B-School (ABBS)"
        description="Apply to Undergraduate (BBA, BCA, B.Com, B.Sc., BA), Postgraduate (MBA, PGDM, MCA, M.Com), and Ph.D. programs at Acharya Bangalore B-School, Bengaluru."
      />

      {/* Hero Header */}
      <section className="bg-[#07111E] text-white py-14 lg:py-20 border-b border-stone-800">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs uppercase tracking-widest text-[#E5C675] font-semibold">
                Admissions Office · Bengaluru
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-white leading-tight">
                Admissions, Eligibility &amp; Counselling
              </h1>
              <p className="text-base text-stone-300 leading-relaxed max-w-2xl">
                Acharya Bangalore B-School welcomes applications from motivated students across
                India and abroad. Our admissions process evaluates academic merit, analytical
                aptitude, and alignment with your chosen discipline.
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#0B192C] border border-stone-700 p-6 space-y-3">
              <div className="text-xs uppercase tracking-widest text-[#E5C675] font-semibold">
                Direct Admissions Desk
              </div>
              <div className="space-y-2 text-xs text-stone-200">
                <div className="flex items-center gap-2 font-mono-tabular">
                  <Phone className="w-4 h-4 text-[#C59B27]" aria-hidden="true" />
                  <a href={`tel:${OFFICIAL_CONTACT.primaryPhoneTel}`} className="hover:underline">
                    {OFFICIAL_CONTACT.phones[0]}
                  </a>
                  <span>/</span>
                  <a href={`tel:${OFFICIAL_CONTACT.secondaryPhoneTel}`} className="hover:underline">
                    {OFFICIAL_CONTACT.phones[1]}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#C59B27]" aria-hidden="true" />
                  <a href={`mailto:${OFFICIAL_CONTACT.email}`} className="hover:underline">
                    {OFFICIAL_CONTACT.email}
                  </a>
                </div>
                <div className="flex items-start gap-2 pt-1 text-stone-400">
                  <MapPin className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{OFFICIAL_CONTACT.fullAddress}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Application Process */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-10 space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
              Application Roadmap
            </p>
            <h2 className="text-3xl font-serif font-semibold text-[#0B192C]">
              Step-by-Step Admission Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-stone-200">
            {ADMISSION_STEPS.map((item) => (
              <div
                key={item.step}
                className="p-6 lg:p-8 border-r border-b border-stone-200 bg-[#FAF8F5]/60 space-y-3"
              >
                <div className="text-xs font-mono-tabular font-bold text-[#B48327]">
                  STEP {item.step}
                </div>
                <h3 className="text-xl font-serif font-semibold text-[#0B192C]">{item.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Level-Wise Eligibility & Admission Pathways */}
      <section className="py-16 bg-[#FAF8F5] border-b border-stone-200">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
                Eligibility &amp; Level Criteria
              </p>
              <h2 className="text-3xl font-serif font-semibold text-[#0B192C] mt-1">
                Undergraduate, Postgraduate &amp; Doctoral Admissions
              </h2>
            </div>

            <div className="flex items-center gap-2" role="tablist" aria-label="Admission levels">
              {(['Postgraduate', 'Undergraduate', 'Doctoral'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === lvl}
                  onClick={() => setActiveTab(lvl)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === lvl
                      ? 'bg-[#0B192C] text-white'
                      : 'bg-white text-stone-700 border border-stone-300 hover:border-[#0B192C]'
                  }`}
                >
                  {lvl} ({ACADEMIC_PROGRAMS.filter((p) => p.level === lvl).length})
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {tabPrograms.map((prog) => (
              <div
                key={prog.slug}
                className="bg-white border border-stone-200 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              >
                <div className="lg:col-span-4 space-y-1.5">
                  <div className="text-xs text-[#B48327] font-semibold uppercase tracking-wider">
                    {prog.discipline} · <span className="font-mono-tabular">{prog.code}</span>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-[#0B192C]">
                    <Link to={`/academics/${prog.slug}`} className="hover:underline">
                      {prog.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-stone-500 font-mono-tabular">{prog.duration}</p>
                </div>

                <div className="lg:col-span-6 space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                    <span>Eligibility Criteria</span>
                    {prog.eligibilityVerification === 'Verified' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                    ) : (
                      <Info className="w-3.5 h-3.5 text-amber-700" aria-hidden="true" />
                    )}
                    <span className="text-[11px] font-normal text-stone-500">
                      ({prog.eligibilityVerification})
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">{prog.eligibility}</p>
                </div>

                <div className="lg:col-span-2 flex lg:justify-end">
                  <Link
                    to={`/academics/${prog.slug}`}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider border border-[#0B192C] text-[#0B192C] hover:bg-[#0B192C] hover:text-white transition-colors whitespace-nowrap"
                  >
                    Program Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Enquiry Form + Campus Visit & Prospectus Section */}
      <section id="enquiry-form" className="py-16 lg:py-24 bg-white border-b border-stone-200">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <EnquiryForm
                heading="Submit Your Official Admissions Enquiry"
                subheading="Complete all required fields below. Your enquiry will be validated and recorded in our backend registry with an official reference number."
              />
            </div>

            <div className="lg:col-span-5 space-y-6">
              {/* Campus Visit Booking Box */}
              <div className="p-6 lg:p-8 bg-[#FAF8F5] border border-stone-200 space-y-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B48327] font-semibold">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <span>Guided Campus Visits</span>
                </div>
                <h3 className="text-2xl font-serif font-semibold text-[#0B192C]">
                  Visit the ABBS Campus in Bengaluru
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Prospective students and parents are welcome to tour our classrooms, central
                  library, computing and life-science laboratories, and residential hostels at
                  Andrahalli Main Road, Off Magadi Road, Bengaluru.
                </p>
                <p className="text-xs text-stone-700 font-medium">
                  Tip: Check the &ldquo;guided Campus Visit&rdquo; box inside the Admissions Enquiry
                  Form to select your preferred date, or call{' '}
                  <a
                    href={`tel:${OFFICIAL_CONTACT.primaryPhoneTel}`}
                    className="underline font-mono-tabular text-[#0B192C]"
                  >
                    {OFFICIAL_CONTACT.phones[0]}
                  </a>
                  .
                </p>
              </div>

              {/* Official Prospectus / Brochure Verification Section */}
              <div className="p-6 lg:p-8 bg-[#FAF8F5] border border-stone-200 space-y-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-semibold">
                  <FileText className="w-4 h-4 text-[#B48327]" aria-hidden="true" />
                  <span>Academic Prospectus &amp; Fee Schedule</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-[#0B192C]">
                  Request Verified Program Brochure
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  To ensure you receive the current, officially signed curriculum brochure and
                  quota-specific fee structure for your intake year, brochures are dispatched by the
                  Admissions Office upon enquiry registration rather than serving unverified static
                  files.
                </p>
                {brochureRequested ? (
                  <div className="p-3 bg-white border border-stone-300 text-xs text-[#0B192C]">
                    Please complete and submit the Admissions Enquiry Form on this page; your
                    reference ID will include your program prospectus request.
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setBrochureRequested(true);
                      const el = document.getElementById('enq-fullName');
                      el?.focus();
                    }}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider border border-[#0B192C] text-[#0B192C] hover:bg-[#0B192C] hover:text-white transition-colors cursor-pointer"
                  >
                    Request Prospectus via Enquiry Form
                  </button>
                )}
              </div>

              {/* Privacy & Data Protection Notice */}
              <div
                id="privacy-notice"
                className="p-5 bg-white border border-stone-200 text-xs text-stone-500 space-y-1.5"
              >
                <div className="font-semibold text-stone-700 uppercase tracking-wider">
                  Applicant Privacy &amp; Data Protection
                </div>
                <p className="leading-relaxed">
                  Personal contact details submitted through this portal are used exclusively by the
                  Acharya Bangalore B-School Admissions Office for academic counselling and
                  application processing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions FAQs */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-[1000px] mx-auto px-4 lg:px-8">
          <div className="bg-white border border-stone-200 p-6 lg:p-10">
            <FAQAccordion
              title="Frequently Asked Questions on Admissions"
              items={GENERAL_ADMISSIONS_FAQS}
            />
          </div>
        </div>
      </section>
    </>
  );
};
