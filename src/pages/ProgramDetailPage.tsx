import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Info, BookOpen, Briefcase, GraduationCap } from 'lucide-react';
import { ACADEMIC_PROGRAMS } from '../data/abbsData';
import { CampusVisual } from '../components/CampusVisual';
import { FAQAccordion } from '../components/FAQAccordion';
import { EnquiryForm } from '../components/EnquiryForm';
import { SEOHead } from '../components/SEOHead';

export const ProgramDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const program = ACADEMIC_PROGRAMS.find((p) => p.slug === slug);

  if (!program) {
    return (
      <div className="max-w-[1360px] mx-auto px-4 lg:px-8 py-20 text-center space-y-5">
        <SEOHead
          title="Program Not Found | Acharya Bangalore B-School (ABBS)"
          description="The requested academic program could not be found in the ABBS catalog."
        />
        <p className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
          Academic Catalog Notice
        </p>
        <h1 className="text-4xl font-serif font-semibold text-[#0B192C]">
          Academic Program Not Found
        </h1>
        <p className="text-sm text-stone-600 max-w-md mx-auto">
          The course URL you followed does not match an active program in our catalog. Explore all
          10 verified undergraduate, postgraduate, and doctoral programs below.
        </p>
        <div>
          <Link
            to="/academics"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider bg-[#0B192C] text-white"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Return to Academic Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPrograms = ACADEMIC_PROGRAMS.filter(
    (p) => p.slug !== program.slug && (p.discipline === program.discipline || p.level === program.level)
  ).slice(0, 3);

  return (
    <>
      <SEOHead
        title={`${program.title} | Admissions & Curriculum | ABBS Bengaluru`}
        description={`${program.overview.slice(0, 150)}...`}
      />

      {/* Breadcrumb & Hero Header */}
      <section className="bg-[#07111E] text-white py-12 lg:py-20 border-b border-stone-800">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="mb-6">
            <Link
              to="/academics"
              className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Back to All Academic Programs</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#E5C675]">
                  <span className="uppercase tracking-widest font-semibold">{program.level}</span>
                  <span aria-hidden="true">·</span>
                  <span>{program.discipline}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">{program.code}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-white leading-tight">
                  {program.title}
                </h1>

                <p className="text-base text-stone-300 leading-relaxed">{program.overview}</p>
              </div>

              <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center gap-4">
                <a
                  href="#program-enquiry"
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-wider bg-[#C59B27] text-[#07111E] hover:bg-[#d6ad38] transition-colors whitespace-nowrap"
                >
                  Apply / Enquire Now
                </a>
                <Link
                  to="/admissions"
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-wider border border-stone-600 text-white hover:border-white transition-colors whitespace-nowrap"
                >
                  View Admissions Guidelines
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-stone-700 bg-[#0B192C]">
                <CampusVisual
                  variant={program.visualTheme}
                  alt={program.title}
                  caption={`${program.shortTitle} · ${program.academicHighlight}`}
                  aspectRatio="4:3"
                  eager={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Specifications Strip */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8 py-8">
          <dl className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-[#FAF8F5] border border-stone-200">
              <dt className="text-xs uppercase tracking-wider text-stone-500 font-semibold flex items-center justify-between">
                <span>Course Duration</span>
                <span className="text-[11px] font-normal text-stone-500">
                  ({program.durationVerification})
                </span>
              </dt>
              <dd className="text-lg font-serif font-semibold text-[#0B192C] mt-1">
                {program.duration}
              </dd>
            </div>

            <div className="p-5 bg-[#FAF8F5] border border-stone-200">
              <dt className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                Affiliation &amp; Statutory Status
              </dt>
              <dd className="text-sm font-medium text-[#0B192C] mt-1.5 leading-snug">
                {program.affiliationAndApproval}
              </dd>
            </div>

            <div className="p-5 bg-[#FAF8F5] border border-stone-200">
              <dt className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                Specializations &amp; Tracks Offered
              </dt>
              <dd className="text-sm font-medium text-[#0B192C] mt-1.5 leading-snug">
                {program.specializations.join(' · ')}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Main Content & Sidebar Enquiry */}
      <section className="py-14 lg:py-20 bg-[#FAF8F5]">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Detailed Academic Information (7 cols) */}
            <div className="lg:col-span-7 space-y-12">
              {/* Eligibility Criteria */}
              <div className="bg-white border border-stone-200 p-6 lg:p-8 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <h2 className="text-2xl font-serif font-semibold text-[#0B192C] flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#B48327]" aria-hidden="true" />
                    <span>Eligibility Criteria</span>
                  </h2>
                  <span className="text-xs text-stone-500 flex items-center gap-1">
                    {program.eligibilityVerification === 'Verified' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                    ) : (
                      <Info className="w-3.5 h-3.5 text-amber-700" aria-hidden="true" />
                    )}
                    <span>{program.eligibilityVerification}</span>
                  </span>
                </div>
                <p className="text-sm text-stone-700 leading-relaxed">{program.eligibility}</p>
                <p className="text-xs text-stone-500 bg-[#FAF8F5] p-3 border border-stone-200">
                  Note: Final admission eligibility is subject to document verification of original
                  marksheets and prevailing university / statutory council norms for the academic
                  intake year.
                </p>
              </div>

              {/* Curriculum Structure */}
              <div className="bg-white border border-stone-200 p-6 lg:p-8 space-y-6">
                <div className="border-b border-stone-200 pb-3">
                  <h2 className="text-2xl font-serif font-semibold text-[#0B192C] flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#B48327]" aria-hidden="true" />
                    <span>Curriculum Architecture &amp; Modules</span>
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">{program.curriculumNote}</p>
                </div>

                <div className="space-y-6">
                  {program.curriculum.map((module) => (
                    <div
                      key={module.term}
                      className="border border-stone-200 bg-[#FAF8F5] p-5 space-y-3"
                    >
                      <div className="text-xs uppercase tracking-wider font-semibold text-[#B48327]">
                        {module.term}
                      </div>
                      <h3 className="text-lg font-serif font-semibold text-[#0B192C]">
                        {module.focus}
                      </h3>
                      <ul className="space-y-1.5 text-xs text-stone-700">
                        {module.subjects.map((subj) => (
                          <li key={subj}>· {subj}</li>
                        ))}
                      </ul>
                      {module.verificationNote && (
                        <p className="text-[11px] text-stone-500 italic pt-2 border-t border-stone-200">
                          {module.verificationNote}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Outcomes & Career Opportunities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-stone-200 p-6 space-y-4">
                  <h2 className="text-xl font-serif font-semibold text-[#0B192C] border-b border-stone-200 pb-2">
                    Program Learning Outcomes
                  </h2>
                  <ul className="space-y-2.5 text-xs text-stone-700 leading-relaxed">
                    {program.learningOutcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2">
                        <span className="text-[#B48327] font-bold">·</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-stone-200 p-6 space-y-4">
                  <h2 className="text-xl font-serif font-semibold text-[#0B192C] border-b border-stone-200 pb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#B48327]" aria-hidden="true" />
                    <span>Career Opportunities</span>
                  </h2>
                  <ul className="space-y-2.5 text-xs text-stone-700 leading-relaxed">
                    {program.careerOpportunities.map((role) => (
                      <li key={role} className="flex items-start gap-2">
                        <span className="text-[#B48327] font-bold">·</span>
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step-by-Step Admission Process */}
              <div className="bg-white border border-stone-200 p-6 lg:p-8 space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-[#0B192C] border-b border-stone-200 pb-3">
                  Admission Process for {program.shortTitle}
                </h2>
                <ol className="space-y-3">
                  {program.admissionProcess.map((step, index) => (
                    <li
                      key={step}
                      className="flex items-start gap-3.5 p-3.5 bg-[#FAF8F5] border border-stone-200 text-xs text-stone-800"
                    >
                      <span className="font-mono-tabular font-bold text-[#B48327] shrink-0">
                        0{index + 1}.
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Frequently Asked Questions */}
              <div className="bg-white border border-stone-200 p-6 lg:p-8">
                <FAQAccordion
                  title={`Frequently Asked Questions — ${program.shortTitle}`}
                  items={program.faqs}
                />
              </div>
            </div>

            {/* Right Column: Sticky Program Enquiry Form (5 cols) */}
            <div className="lg:col-span-5" id="program-enquiry">
              <div className="sticky top-24 space-y-6">
                <EnquiryForm
                  defaultProgram={program.title}
                  heading={`Enquire About ${program.shortTitle}`}
                  subheading={`Request the verified ${program.shortTitle} syllabus, fee structure, and admission counselling schedule.`}
                  compact={true}
                />

                {relatedPrograms.length > 0 && (
                  <div className="bg-white border border-stone-200 p-6 space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
                      Related Programs at ABBS
                    </h3>
                    <div className="divide-y divide-stone-200">
                      {relatedPrograms.map((rel) => (
                        <Link
                          key={rel.slug}
                          to={`/academics/${rel.slug}`}
                          className="py-2.5 block text-sm font-serif font-semibold text-[#0B192C] hover:text-[#B48327]"
                        >
                          {rel.title} →
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
