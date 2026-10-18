import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Cpu, FlaskConical, Lightbulb } from 'lucide-react';
import { RESEARCH_PILLARS } from '../data/extendedData';
import { CampusVisual } from '../components/CampusVisual';
import { SEOHead } from '../components/SEOHead';

export const ResearchPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Research, Incubation & Innovation | Acharya Bangalore B-School (ABBS)"
        description="Explore doctoral management research, business incubation, AI/ML capstones, and life-science laboratory research at Acharya Bangalore B-School, Bengaluru."
      />

      {/* Page Hero */}
      <section className="bg-[#07111E] text-white py-14 lg:py-20 border-b border-stone-800">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs uppercase tracking-widest text-[#E5C675] font-semibold">
                Research, Publication &amp; Venture Incubation
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-white leading-tight">
                Advancing Empirical Inquiry &amp; Applied Innovation
              </h1>
              <p className="text-base text-stone-300 leading-relaxed">
                Research at Acharya Bangalore B-School spans doctoral scholarship in management
                sciences, entrepreneurial venture incubation, applied artificial intelligence
                engineering, and experimental life-science investigations.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="border border-stone-700">
                <CampusVisual
                  variant="doctoral"
                  alt="Research and Innovation Colloquium at ABBS"
                  caption="Illustrative visualization — Doctoral Research & Incubation Centre"
                  aspectRatio="4:3"
                  eager={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Pillars */}
      <section className="py-16 lg:py-24 bg-white border-b border-stone-200">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-12 space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
              Research Centres &amp; Wings
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#0B192C]">
              Four Pillars of Institutional Research
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {RESEARCH_PILLARS.map((pillar, index) => {
              const IconComponent =
                index === 0
                  ? BookOpen
                  : index === 1
                  ? Lightbulb
                  : index === 2
                  ? Cpu
                  : FlaskConical;

              return (
                <article
                  key={pillar.id}
                  className="p-8 bg-[#FAF8F5] border border-stone-200 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#B48327]">
                        {pillar.category}
                      </span>
                      <IconComponent className="w-5 h-5 text-[#0B192C]" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-[#0B192C]">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed">{pillar.summary}</p>
                  </div>

                  <div className="pt-4 border-t border-stone-200">
                    <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                      Key Scholarly &amp; Applied Outputs
                    </div>
                    <ul className="space-y-1.5 text-xs text-stone-700">
                      {pillar.outputs.map((out) => (
                        <li key={out}>· {out}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ph.D. & Incubation Callout */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border border-stone-200 p-8 space-y-4">
              <div className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
                Doctoral Studies
              </div>
              <h2 className="text-2xl font-serif font-semibold text-[#0B192C]">
                Ph.D. in Management Program
              </h2>
              <p className="text-xs text-stone-600 leading-relaxed">
                Explore doctoral research opportunities in Finance, Marketing, Organizational
                Behavior, Operations, and Strategy under recognized university supervisors.
              </p>
              <div className="pt-2">
                <Link
                  to="/academics/phd-management"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0B192C] hover:text-[#B48327]"
                >
                  <span>View Ph.D. Program Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="bg-white border border-stone-200 p-8 space-y-4">
              <div className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
                Entrepreneurship &amp; Industry Projects
              </div>
              <h2 className="text-2xl font-serif font-semibold text-[#0B192C]">
                Partner with the ABBS Incubation Cell
              </h2>
              <p className="text-xs text-stone-600 leading-relaxed">
                Corporations, research bodies, and alumni founders can collaborate with our faculty
                and students on sponsored case studies, consulting projects, and incubation clinics.
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0B192C] hover:text-[#B48327]"
                >
                  <span>Contact Research &amp; Incubation Desk</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
