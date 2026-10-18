import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, ArrowRight, MapPin } from 'lucide-react';
import {
  LEADERSHIP_TEAM,
  ACCREDITATIONS_LIST,
  CAMPUS_FACILITIES,
  OFFICIAL_CONTACT,
} from '../data/abbsData';
import { CampusVisual } from '../components/CampusVisual';
import { SEOHead } from '../components/SEOHead';

const HISTORY_MILESTONES = [
  {
    year: '1996',
    title: 'Foundation of Samagra Sikshana Samithi Trust (SSST)',
    detail:
      'Established by Dr. B. Vijaypal Reddy with a mandate to advance accessible, quality higher education and health sciences in Karnataka.',
  },
  {
    year: '2008',
    title: 'Establishment of Acharya Bangalore B-School (ABBS)',
    detail:
      'Founded in Bengaluru on Andrahalli Main Road off Magadi Road, launching flagship management and undergraduate degree programs affiliated to Bangalore University.',
  },
  {
    year: 'Multi-Cycle',
    title: 'NAAC Grade "A" Accreditation across Three Cycles',
    detail:
      'Recognized by the National Assessment and Accreditation Council (NAAC) with Grade "A" across three consecutive accreditation cycles, alongside UGC 2(f) & 12(b) recognition.',
  },
  {
    year: 'Global & Program Quality',
    title: 'NBA & IACBE (USA) Accreditations',
    detail:
      'Earned National Board of Accreditation (NBA) recognition for the MBA Department and international business accreditation from IACBE, USA.',
  },
];

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="About ABBS | Vision, Leadership & Accreditations | Acharya Bangalore B-School"
        description="Learn about Acharya Bangalore B-School (ABBS), Bengaluru: institutional history since 2008, Samagra Sikshana Samithi Trust leadership, NAAC Grade A, NBA, IACBE, and AICTE approvals."
      />

      {/* Page Hero */}
      <section className="bg-[#07111E] text-white py-14 lg:py-20 border-b border-stone-800">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="text-xs uppercase tracking-widest text-[#E5C675] font-semibold">
                About the Institution · Bengaluru, India
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-white leading-tight">
                Academic Rigor, Ethical Governance &amp; Industry Relevance Since 2008
              </h1>
              <p className="text-base text-stone-300 leading-relaxed">
                Acharya Bangalore B-School (ABBS) is a higher education and management institution
                located at {OFFICIAL_CONTACT.fullAddress}. Operating under the{' '}
                {OFFICIAL_CONTACT.trustName}, ABBS serves undergraduate, postgraduate, and doctoral
                scholars across Management, Commerce, Computing, Life Sciences, and the Humanities.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-stone-400">
                <MapPin className="w-4 h-4 text-[#C59B27] shrink-0" aria-hidden="true" />
                <span>{OFFICIAL_CONTACT.fullAddress}</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-stone-700">
                <CampusVisual
                  variant="campus-hero"
                  alt="Acharya Bangalore B-School architectural campus perspective"
                  caption="Illustrative architectural view — ABBS Campus, Andrahalli Main Road, Bengaluru"
                  aspectRatio="4:3"
                  eager={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Overview & Vision / Mission */}
      <section className="py-16 lg:py-24 bg-white border-b border-stone-200">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6 space-y-5">
              <p className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
                01 · Institutional Overview
              </p>
              <h2 className="text-3xl font-serif font-semibold text-[#0B192C]">
                An Integrated Multidisciplinary Learning Environment
              </h2>
              <p className="text-sm text-stone-700 leading-relaxed">
                Founded in 2008 by Dr. B. Vijaypal Reddy, Acharya Bangalore B-School has grown from
                a specialized management institute into a multidisciplinary campus offering 10
                distinct academic programs. By bringing together business administration, commerce,
                computer applications, biotechnology, microbiology, forensic science, and liberal
                arts on a single campus, ABBS encourages cross-disciplinary inquiry.
              </p>
              <p className="text-sm text-stone-700 leading-relaxed">
                Our academic philosophy pairs university-approved foundational theory with case
                pedagogy, laboratory experimentation, industry internships, and structured skill
                certifications.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 gap-6">
              <div className="p-8 bg-[#FAF8F5] border border-stone-200 space-y-3">
                <div className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
                  Institutional Vision
                </div>
                <h3 className="text-2xl font-serif font-semibold text-[#0B192C]">
                  Cultivating Responsible Leaders &amp; Innovators
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed">
                  To provide relevant education consistent with the changing world by integrating
                  the best faculties, infrastructure, and corporate practices to develop socially
                  responsible professionals and entrepreneurs.
                </p>
              </div>

              <div className="p-8 bg-[#FAF8F5] border border-stone-200 space-y-3">
                <div className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
                  Institutional Mission
                </div>
                <h3 className="text-2xl font-serif font-semibold text-[#0B192C]">
                  Academic Excellence, Research &amp; Industry Synergy
                </h3>
                <ul className="space-y-2 text-xs text-stone-700 leading-relaxed">
                  <li>· Deliver outcome-based curricula aligned with global industry standards.</li>
                  <li>· Foster a culture of empirical research, critical inquiry, and entrepreneurship.</li>
                  <li>· Empower students from diverse backgrounds with ethical leadership and analytical capabilities.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations & Statutory Approvals */}
      <section id="accreditations" className="py-16 lg:py-24 bg-[#FAF8F5] border-b border-stone-200">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
              02 · Accreditations, Approvals &amp; Scope Verification
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#0B192C]">
              Statutory Recognitions &amp; Quality Assurance
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Each accreditation and statutory approval held by Acharya Bangalore B-School applies
              to specific institutional or programmatic scopes as documented below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACCREDITATIONS_LIST.map((acc) => (
              <div
                key={acc.title}
                className="bg-white border border-stone-200 p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#B48327]">
                      {acc.status}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-[#0B192C]" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-[#0B192C]">{acc.title}</h3>
                  <p className="text-xs font-medium text-stone-800">{acc.authority}</p>
                  <p className="text-xs text-stone-600 leading-relaxed">{acc.scope}</p>
                </div>

                <div className="pt-3 border-t border-stone-200 text-[11px] text-stone-500 flex items-start gap-1.5">
                  <CheckCircle2
                    className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{acc.verificationNote}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 lg:py-24 bg-white border-b border-stone-200">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
                03 · Institutional Governance
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#0B192C]">
                Leadership &amp; Academic Administration
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                Guided by the Samagra Sikshana Samithi Trust and experienced academic administrators
                verified from official institutional records.
              </p>
            </div>
            <Link
              to="/faculty"
              className="self-start lg:self-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0B192C] border-b border-[#0B192C] pb-1 hover:text-[#B48327]"
            >
              <span>View Full Faculty Directory</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEADERSHIP_TEAM.map((leader) => (
              <div
                key={leader.name}
                className="p-6 lg:p-8 bg-[#FAF8F5] border border-stone-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="text-xs uppercase tracking-wider font-semibold text-[#B48327]">
                    {leader.role}
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-[#0B192C]">
                    {leader.name}
                  </h3>
                  <div className="text-xs font-medium text-stone-500">{leader.unit}</div>
                  <p className="text-xs text-stone-700 leading-relaxed pt-2">{leader.bio}</p>
                </div>
                <div className="pt-3 border-t border-stone-200 text-[11px] text-stone-500">
                  Source: {leader.verificationSource}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional History & Academic Philosophy */}
      <section className="py-16 lg:py-24 bg-[#FAF8F5] border-b border-stone-200">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
                04 · Institutional History &amp; Pedagogy
              </p>
              <h2 className="text-3xl font-serif font-semibold text-[#0B192C]">
                Foundational Milestones &amp; Academic Philosophy
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                ABBS structures its teaching methodology around four pedagogical pillars: conceptual
                clarity, empirical case analysis, laboratory &amp; technical practicums, and
                continuous formative assessment.
              </p>
              <div className="p-5 bg-white border border-stone-200 space-y-2 text-xs text-stone-700">
                <div className="font-semibold text-[#0B192C] uppercase tracking-wider">
                  Autonomous &amp; University Framework Note
                </div>
                <p className="leading-relaxed">
                  ABBS offers both Bangalore University affiliated degree programs and AICTE-approved
                  autonomous diploma tracks, alongside NAAC Grade &ldquo;A&rdquo; institutional
                  recognition. Applicants are encouraged to review program-specific curriculum
                  handbooks during admission counselling.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {HISTORY_MILESTONES.map((milestone) => (
                <div
                  key={milestone.title}
                  className="bg-white border border-stone-200 p-6 flex flex-col sm:flex-row gap-4 sm:items-start"
                >
                  <div className="font-mono-tabular text-sm font-bold text-[#B48327] sm:w-36 shrink-0">
                    {milestone.year}
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-serif font-semibold text-[#0B192C]">
                      {milestone.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">{milestone.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Campus Facilities Summary */}
      <section className="py-16 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
                05 · Campus Infrastructure
              </p>
              <h2 className="text-3xl font-serif font-semibold text-[#0B192C]">
                Facilities Supporting Academic &amp; Student Life
              </h2>
            </div>
            <Link
              to="/campus-life"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0B192C] hover:text-[#B48327]"
            >
              <span>View Full Campus Life Page</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAMPUS_FACILITIES.slice(0, 4).map((fac) => (
              <div key={fac.id} className="p-5 bg-[#FAF8F5] border border-stone-200 space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-[#B48327] font-semibold">
                  {fac.category}
                </div>
                <h3 className="text-lg font-serif font-semibold text-[#0B192C]">{fac.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{fac.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
