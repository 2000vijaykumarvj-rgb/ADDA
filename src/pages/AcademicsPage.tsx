import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, X, ArrowRight, CheckCircle2, Info } from 'lucide-react';
import { ACADEMIC_PROGRAMS } from '../data/abbsData';
import { filterPrograms, type ProgramLevel, type ProgramDiscipline } from '../utils/catalogLogic';
import { CampusVisual } from '../components/CampusVisual';
import { SEOHead } from '../components/SEOHead';

const LEVELS: Array<'All' | ProgramLevel> = ['All', 'Postgraduate', 'Undergraduate', 'Doctoral'];
const DISCIPLINES: Array<'All' | ProgramDiscipline> = [
  'All',
  'Management',
  'Commerce and Finance',
  'Computer Applications',
  'Science',
  'Arts',
];

export const AcademicsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialLevel = (searchParams.get('level') as ProgramLevel) || 'All';
  const initialDiscipline = (searchParams.get('discipline') as ProgramDiscipline) || 'All';

  const [selectedLevel, setSelectedLevel] = useState<'All' | ProgramLevel>(
    LEVELS.includes(initialLevel) ? initialLevel : 'All'
  );
  const [selectedDiscipline, setSelectedDiscipline] = useState<'All' | ProgramDiscipline>(
    DISCIPLINES.includes(initialDiscipline) ? initialDiscipline : 'All'
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  React.useEffect(() => {
    const paramLevel = (searchParams.get('level') as ProgramLevel) || 'All';
    const paramDisc = (searchParams.get('discipline') as ProgramDiscipline) || 'All';
    const paramQ = searchParams.get('q') || '';
    setSelectedLevel(LEVELS.includes(paramLevel) ? paramLevel : 'All');
    setSelectedDiscipline(DISCIPLINES.includes(paramDisc) ? paramDisc : 'All');
    setSearchQuery(paramQ);
  }, [searchParams]);

  const updateUrlFilters = (
    nextLevel: 'All' | ProgramLevel,
    nextDisc: 'All' | ProgramDiscipline,
    nextQ: string
  ) => {
    const nextParams: Record<string, string> = {};
    if (nextLevel !== 'All') nextParams.level = nextLevel;
    if (nextDisc !== 'All') nextParams.discipline = nextDisc;
    if (nextQ.trim()) nextParams.q = nextQ.trim();
    setSearchParams(nextParams, { replace: true });
  };

  const filteredPrograms = useMemo(
    () =>
      filterPrograms(ACADEMIC_PROGRAMS, {
        level: selectedLevel,
        discipline: selectedDiscipline,
        searchQuery,
      }),
    [selectedLevel, selectedDiscipline, searchQuery]
  );

  const handleResetFilters = () => {
    setSelectedLevel('All');
    setSelectedDiscipline('All');
    setSearchQuery('');
    setSearchParams({}, { replace: true });
  };

  return (
    <>
      <SEOHead
        title="Academic Programs & Course Catalog | Acharya Bangalore B-School (ABBS)"
        description="Browse Postgraduate (MBA, PGDM, MCA, M.Com), Undergraduate (BBA, BCA AI & ML, B.Com ACCA/CMA/Fintech, B.Sc., BA), and Ph.D. programs at ABBS Bengaluru."
      />

      {/* Page Header */}
      <section className="bg-[#0B192C] text-white py-14 lg:py-20 border-b border-stone-800">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#E5C675] font-semibold">
              Academic Catalog · Postgraduate · Undergraduate · Doctoral
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-white">
              Schools, Programs &amp; Specializations
            </h1>
            <p className="text-base text-stone-300 leading-relaxed">
              Explore all 10 degree and diploma programs offered at Acharya Bangalore B-School. Each
              program page provides detailed information on specializations, duration, eligibility,
              curriculum modules, career pathways, and verified admission steps.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Controls */}
      <section className="py-10 bg-white border-b border-stone-200 sticky top-14 lg:top-16 z-20">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="lg:col-span-5 relative">
              <label htmlFor="catalog-search" className="sr-only">
                Search academic programs by keyword, specialization, or career role
              </label>
              <Search
                className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="catalog-search"
                type="text"
                role="searchbox"
                value={searchQuery}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchQuery(val);
                  updateUrlFilters(selectedLevel, selectedDiscipline, val);
                }}
                placeholder="Search by program, specialization (e.g., Aviation, ACCA, AI, Forensic)..."
                className="w-full pl-10 pr-9 py-2.5 text-sm bg-[#FAF8F5] border border-stone-300 text-stone-900 focus:border-[#0B192C] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    updateUrlFilters(selectedLevel, selectedDiscipline, '');
                  }}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Level Filter Buttons */}
            <div
              className="lg:col-span-7 flex flex-wrap items-center justify-start lg:justify-end gap-1.5"
              role="group"
              aria-label="Filter by Academic Level"
            >
              {LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => {
                    setSelectedLevel(lvl);
                    updateUrlFilters(lvl, selectedDiscipline, searchQuery);
                  }}
                  aria-pressed={selectedLevel === lvl}
                  className={`px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    selectedLevel === lvl
                      ? 'bg-[#0B192C] text-white'
                      : 'bg-[#FAF8F5] text-stone-700 border border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Discipline Filter Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-stone-100">
            <div
              className="flex flex-wrap items-center gap-1.5"
              role="group"
              aria-label="Filter by Discipline"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 mr-1">
                Discipline:
              </span>
              {DISCIPLINES.map((disc) => (
                <button
                  key={disc}
                  type="button"
                  onClick={() => {
                    setSelectedDiscipline(disc);
                    updateUrlFilters(selectedLevel, disc, searchQuery);
                  }}
                  aria-pressed={selectedDiscipline === disc}
                  className={`px-3 py-1 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    selectedDiscipline === disc
                      ? 'bg-[#B48327] text-white font-semibold'
                      : 'bg-[#FAF8F5] text-stone-700 hover:bg-stone-200/70'
                  }`}
                >
                  {disc}
                </button>
              ))}
            </div>

            <div className="text-xs text-stone-500 font-mono-tabular">
              Showing {filteredPrograms.length} of {ACADEMIC_PROGRAMS.length} Programs
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Results */}
      <section className="py-12 lg:py-16 bg-[#FAF8F5]">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          {filteredPrograms.length === 0 ? (
            <div className="bg-white border border-stone-200 p-12 text-center space-y-4">
              <h2 className="text-2xl font-serif font-semibold text-[#0B192C]">
                No matching academic programs found
              </h2>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                No programs matched &ldquo;{searchQuery}&rdquo; with level &ldquo;{selectedLevel}
                &rdquo; and discipline &ldquo;{selectedDiscipline}&rdquo;.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#0B192C] text-white hover:bg-[#162B49] cursor-pointer"
              >
                Reset All Search &amp; Filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredPrograms.map((program) => (
                <article
                  key={program.slug}
                  className="bg-white border border-stone-200 grid grid-cols-1 lg:grid-cols-12 overflow-hidden hover:border-[#0B192C] transition-colors"
                >
                  <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-stone-200">
                    <CampusVisual
                      variant={program.visualTheme}
                      alt={program.title}
                      aspectRatio="4:3"
                      className="h-full"
                    />
                  </div>

                  <div className="lg:col-span-8 p-6 lg:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                        <span className="font-semibold text-[#B48327] uppercase tracking-wider">
                          {program.level}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{program.discipline}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">{program.code}</span>
                        <span aria-hidden="true">·</span>
                        <span>{program.duration}</span>
                      </div>

                      <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-[#0B192C]">
                        <Link to={`/academics/${program.slug}`} className="hover:underline">
                          {program.title}
                        </Link>
                      </h2>

                      <p className="text-sm text-stone-600 leading-relaxed">{program.overview}</p>

                      <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="bg-[#FAF8F5] p-3.5 border border-stone-200">
                          <div className="font-semibold text-[#0B192C] uppercase tracking-wider mb-1">
                            Specializations &amp; Tracks
                          </div>
                          <p className="text-stone-700 leading-relaxed">
                            {program.specializations.join(' · ')}
                          </p>
                        </div>

                        <div className="bg-[#FAF8F5] p-3.5 border border-stone-200">
                          <div className="font-semibold text-[#0B192C] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                            <span>Approval &amp; Eligibility Status</span>
                            {program.eligibilityVerification === 'Verified' ? (
                              <CheckCircle2
                                className="w-3.5 h-3.5 text-emerald-700 shrink-0"
                                aria-hidden="true"
                              />
                            ) : (
                              <Info
                                className="w-3.5 h-3.5 text-amber-700 shrink-0"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                          <p className="text-stone-700 leading-relaxed">
                            {program.affiliationAndApproval}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
                      <div className="text-xs text-stone-500">
                        Career Pathways: {program.careerOpportunities.slice(0, 3).join(' · ')}
                      </div>

                      <div className="flex items-center gap-3">
                        <Link
                          to={`/academics/${program.slug}#program-enquiry`}
                          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider border border-stone-300 text-[#0B192C] hover:border-[#0B192C] whitespace-nowrap"
                        >
                          Enquire
                        </Link>
                        <Link
                          to={`/academics/${program.slug}`}
                          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#0B192C] text-white hover:bg-[#162B49] inline-flex items-center gap-1.5 whitespace-nowrap"
                        >
                          <span>View Curriculum &amp; Details</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
