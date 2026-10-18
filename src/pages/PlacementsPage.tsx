import React from 'react';
import { Link } from 'react-router-dom';
import { Info, Briefcase, Award, BookOpen, ArrowRight } from 'lucide-react';
import {
  PLACEMENT_PILLARS,
  HISTORICAL_PLACEMENT_CLAIMS_NOTE,
  RECRUITER_SECTORS,
} from '../data/extendedData';
import { SEOHead } from '../components/SEOHead';

export const PlacementsPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Placements, Internships & Career Development | Acharya Bangalore B-School"
        description="Explore career preparation, pre-placement training, mandatory corporate internships, and industry recruitment sectors at Acharya Bangalore B-School (ABBS), Bengaluru."
      />

      {/* Hero Section */}
      <section className="bg-[#07111E] text-white py-14 lg:py-20 border-b border-stone-800">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#E5C675] font-semibold">
              Career Development &amp; Corporate Relations Cell
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-white leading-tight">
              Structured Career Preparation, Internships &amp; Industry Interface
            </h1>
            <p className="text-base text-stone-300 leading-relaxed">
              At Acharya Bangalore B-School, career readiness is integrated into the academic
              lifecycle from the first semester. Through diagnostic skill mapping, technical
              certifications, mandatory corporate internships, and campus recruitment drives, we
              prepare students for meaningful professional trajectories.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Stage Placement & Career Preparation Process */}
      <section className="py-16 lg:py-24 bg-white border-b border-stone-200">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-12 space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
              01 · Placement Methodology
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#0B192C]">
              Four-Stage Career Development Lifecycle
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Our Training and Placement Cell works closely with academic department chairs to align
              student competencies with evolving corporate recruitment standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PLACEMENT_PILLARS.map((pillar) => (
              <div
                key={pillar.step}
                className="p-8 bg-[#FAF8F5] border border-stone-200 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="text-xs font-mono-tabular font-bold text-[#B48327]">
                    STAGE {pillar.step}
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-[#0B192C]">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{pillar.description}</p>
                </div>

                <div className="pt-4 border-t border-stone-200">
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                    Key Deliverables
                  </div>
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    {pillar.deliverables.map((del) => (
                      <li key={del}>· {del}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Development & Internship Architecture */}
      <section className="py-16 lg:py-24 bg-[#FAF8F5] border-b border-stone-200">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 bg-white border border-stone-200 p-8 space-y-3">
              <BookOpen className="w-5 h-5 text-[#B48327]" aria-hidden="true" />
              <h3 className="text-2xl font-serif font-semibold text-[#0B192C]">
                Mandatory Internships &amp; Field Dissertations
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Postgraduate (MBA, PGDM, MCA) and Undergraduate students complete supervised
                corporate internships or laboratory industrial training. Each internship is jointly
                evaluated by a corporate reporting manager and an ABBS faculty guide.
              </p>
            </div>

            <div className="lg:col-span-4 bg-white border border-stone-200 p-8 space-y-3">
              <Award className="w-5 h-5 text-[#B48327]" aria-hidden="true" />
              <h3 className="text-2xl font-serif font-semibold text-[#0B192C]">
                Domain Certifications &amp; Technical Bootcamps
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Students augment university degrees with professional pathways including ACCA (UK),
                US CMA, Financial Modelling, Business Analytics (Python/R/SQL), and Full-Stack Cloud
                Computing workshops.
              </p>
            </div>

            <div className="lg:col-span-4 bg-white border border-stone-200 p-8 space-y-3">
              <Briefcase className="w-5 h-5 text-[#B48327]" aria-hidden="true" />
              <h3 className="text-2xl font-serif font-semibold text-[#0B192C]">
                Corporate Interface &amp; Conclaves
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Industry practitioners participate in curriculum advisory boards, mock interview
                panels, live case competitions, and executive leadership symposiums throughout the
                academic calendar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Sectors & Recruiter Directory */}
      <section className="py-16 lg:py-24 bg-white border-b border-stone-200">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-10 space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
              02 · Industry Domains
            </p>
            <h2 className="text-3xl font-serif font-semibold text-[#0B192C]">
              Recruiting Sectors &amp; Career Functions
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Note: Third-party company logos are withheld unless formal trademark display
              permissions are verified for the current academic session. Below are the primary
              industry verticals engaging with ABBS graduates.
            </p>
          </div>

          <div className="border-t border-stone-300 divide-y divide-stone-200">
            {RECRUITER_SECTORS.map((item) => (
              <div
                key={item.sector}
                className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
              >
                <div className="lg:col-span-4 font-serif text-xl font-semibold text-[#0B192C]">
                  {item.sector}
                </div>
                <div className="lg:col-span-5 text-xs text-stone-600 leading-relaxed">
                  <span className="font-semibold text-stone-800">Typical Graduate Roles: </span>
                  {item.roles}
                </div>
                <div className="lg:col-span-3 text-xs text-[#B48327] font-medium lg:text-right">
                  {item.engagementType}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparent Disclosure on Historical Placement Claims */}
      <section className="py-16 bg-[#FAF8F5] border-b border-stone-200">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="bg-white border border-stone-300 p-6 lg:p-10 space-y-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#B48327] shrink-0 mt-1" aria-hidden="true" />
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
                  Placement Reports &amp; Verification Governance
                </div>
                <h2 className="text-2xl font-serif font-semibold text-[#0B192C]">
                  Supplied Historical Profile Figures &amp; Methodology Notice
                </h2>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {HISTORICAL_PLACEMENT_CLAIMS_NOTE.disclaimer}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {HISTORICAL_PLACEMENT_CLAIMS_NOTE.suppliedMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="p-5 bg-[#FAF8F5] border border-dashed border-stone-300 space-y-1.5"
                >
                  <div className="text-xs text-stone-500">{metric.label}</div>
                  <div className="text-2xl font-serif font-bold text-[#0B192C] font-mono-tabular">
                    {metric.figure}
                  </div>
                  <div className="text-[11px] text-amber-800 font-medium">
                    {metric.qualification}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-stone-600">
                To request the latest batch-specific placement report or connect with the Corporate
                Relations Cell for campus hiring:
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#0B192C] text-white hover:bg-[#162B49]"
              >
                <span>Contact Placement Cell</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
