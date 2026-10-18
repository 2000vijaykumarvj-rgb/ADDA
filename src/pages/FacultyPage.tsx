import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { LEADERSHIP_TEAM } from '../data/abbsData';
import { FACULTY_PROFILES } from '../data/extendedData';
import { SEOHead } from '../components/SEOHead';

const DEPARTMENTS = [
  'All',
  'Management',
  'Commerce and Finance',
  'Computer Applications',
  'Science',
  'Arts',
] as const;

export const FacultyPage: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<(typeof DEPARTMENTS)[number]>('All');

  const filteredFaculty =
    selectedDept === 'All'
      ? FACULTY_PROFILES
      : FACULTY_PROFILES.filter((f) => f.department === selectedDept);

  return (
    <>
      <SEOHead
        title="Leadership & Faculty Directory | Acharya Bangalore B-School (ABBS)"
        description="Meet the institutional leadership and academic department faculty across Management, Commerce, Computer Applications, Life Sciences, and Liberal Arts at ABBS Bengaluru."
      />

      {/* Page Hero */}
      <section className="bg-[#07111E] text-white py-14 lg:py-20 border-b border-stone-800">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#E5C675] font-semibold">
              Academic Leadership &amp; Mentorship
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-white leading-tight">
              Leadership &amp; Faculty Directory
            </h1>
            <p className="text-base text-stone-300 leading-relaxed">
              Acharya Bangalore B-School is guided by scholars, doctoral supervisors, and industry
              practitioners committed to rigorous classroom instruction, empirical research, and
              student mentorship.
            </p>
          </div>
        </div>
      </section>

      {/* Institutional Leadership */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-10 space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
              01 · Executive &amp; Academic Governance
            </p>
            <h2 className="text-3xl font-serif font-semibold text-[#0B192C]">
              Institutional Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEADERSHIP_TEAM.map((leader) => (
              <article
                key={leader.name}
                className="p-6 lg:p-8 bg-[#FAF8F5] border border-stone-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-wider font-semibold text-[#B48327]">
                    {leader.role}
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-[#0B192C]">
                    {leader.name}
                  </h3>
                  <div className="text-xs text-stone-500 font-medium">{leader.unit}</div>
                  <p className="text-xs text-stone-700 leading-relaxed pt-2">{leader.bio}</p>
                </div>

                <div className="pt-3 border-t border-stone-200 text-[11px] text-stone-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                  <span>{leader.verificationSource}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Departmental Faculty & Area Chairs */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
                02 · Academic Departments
              </p>
              <h2 className="text-3xl font-serif font-semibold text-[#0B192C]">
                Senior Faculty &amp; Departmental Area Chairs
              </h2>
              <p className="text-xs text-stone-600 leading-relaxed">
                In adherence to strict institutional accuracy, only verified leadership names are
                published alongside departmental academic chairs. Complete semester-wise faculty
                rosters are shared in the official student handbook.
              </p>
            </div>

            <div
              className="flex flex-wrap items-center gap-1.5"
              role="group"
              aria-label="Filter faculty by department"
            >
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  aria-pressed={selectedDept === dept}
                  className={`px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    selectedDept === dept
                      ? 'bg-[#0B192C] text-white'
                      : 'bg-white text-stone-700 border border-stone-300 hover:border-[#0B192C]'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFaculty.map((fac) => (
              <div
                key={fac.id}
                className="bg-white border border-stone-200 p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="font-semibold text-[#B48327] uppercase tracking-wider">
                      {fac.department}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{fac.qualification}</span>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-[#0B192C]">{fac.name}</h3>
                  <div className="text-xs font-medium text-stone-700">{fac.designation}</div>
                  <p className="text-xs text-stone-600 leading-relaxed pt-1">
                    <span className="font-semibold text-stone-800">Academic Focus: </span>
                    {fac.specialization}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500">
                  Listing Status: {fac.verificationType}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-stone-200 p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-serif font-semibold text-[#0B192C]">
                Doctoral Supervision &amp; Academic Collaborations
              </h3>
              <p className="text-xs text-stone-600">
                Interested in Ph.D. research supervision, visiting faculty appointments, or joint
                research seminars?
              </p>
            </div>
            <Link
              to="/research"
              className="self-start sm:self-auto inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#0B192C] text-white hover:bg-[#162B49] whitespace-nowrap"
            >
              <span>Explore Research &amp; Innovation</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
