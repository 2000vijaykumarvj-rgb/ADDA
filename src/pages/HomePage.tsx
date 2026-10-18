import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  SlidersHorizontal,
  Eye,
  EyeOff,
  CheckCircle2,
  Search,
  X,
  MapPin,
} from 'lucide-react';
import {
  ACADEMIC_PROGRAMS,
  INSTITUTIONAL_HIGHLIGHTS,
  CAMPUS_FACILITIES,
  OFFICIAL_CONTACT,
  type InstitutionalHighlight,
} from '../data/abbsData';
import { filterPrograms, type ProgramLevel, type ProgramDiscipline } from '../utils/catalogLogic';
import { CampusVisual } from '../components/CampusVisual';
import { SEOHead } from '../components/SEOHead';

const LEVELS: Array<'All' | ProgramLevel> = ['All', 'Postgraduate', 'Undergraduate', 'Doctoral'];

const DISCIPLINE_CARDS: Array<{
  discipline: ProgramDiscipline;
  shortLabel: string;
  degrees: string;
}> = [
  {
    discipline: 'Management',
    shortLabel: 'School of Management',
    degrees: 'MBA · PGDM · BBA · Ph.D.',
  },
  {
    discipline: 'Commerce and Finance',
    shortLabel: 'Commerce & Global Finance',
    degrees: 'M.Com · B.Com (ACCA / CMA / Fintech)',
  },
  {
    discipline: 'Computer Applications',
    shortLabel: 'Computing & AI Systems',
    degrees: 'MCA · BCA (AI & Machine Learning)',
  },
  {
    discipline: 'Science',
    shortLabel: 'Life & Forensic Sciences',
    degrees: 'B.Sc. Biotech · Microbiology · Forensic',
  },
  {
    discipline: 'Arts',
    shortLabel: 'Humanities, Media & Psychology',
    degrees: 'BA Journalism · Psychology · Liberal Arts',
  },
];

const WHY_ABBS_PILLARS = [
  {
    index: '01',
    title: 'Academic Learning',
    description:
      'Outcome-based curricula across Postgraduate, Undergraduate, and Doctoral levels designed within Bangalore University, AICTE, NBA, and IACBE quality frameworks.',
    linkLabel: 'Explore Academic Catalog',
    linkTo: '/academics',
  },
  {
    index: '02',
    title: 'Industry Exposure',
    description:
      'Regular C-suite colloquia, corporate internships, industrial visits, and practitioner-led modules connecting classroom theory with contemporary enterprise practices.',
    linkLabel: 'View Corporate Interface',
    linkTo: '/placements',
  },
  {
    index: '03',
    title: 'Practical Learning',
    description:
      'Case-study analysis, business simulations, AI/ML computing sprints, and wet-laboratory experiments in Biotechnology, Microbiology, and Forensic Science.',
    linkLabel: 'Inspect Campus Laboratories',
    linkTo: '/campus-life',
  },
  {
    index: '04',
    title: 'Entrepreneurship and Innovation',
    description:
      'On-campus incubation support, venture ideation workshops, and startup mentorship guiding student founders from prototype validation to business pitching.',
    linkLabel: 'Visit Research & Incubation',
    linkTo: '/research',
  },
  {
    index: '05',
    title: 'Student Development',
    description:
      'Structured communication clinics, Toastmasters chapters, quantitative aptitude training, and domain certification pathways (ACCA, US CMA, Fintech, Analytics).',
    linkLabel: 'Meet Faculty & Mentors',
    linkTo: '/faculty',
  },
  {
    index: '06',
    title: 'Campus Experience',
    description:
      'A serene Bengaluru campus on Andrahalli Main Road featuring a central library, specialized laboratories, auditorium, sports grounds, and managed residential hostels.',
    linkLabel: 'Schedule a Campus Visit',
    linkTo: '/contact#visit-form',
  },
];

export const HomePage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<'All' | ProgramLevel>('All');
  const [selectedDiscipline, setSelectedDiscipline] = useState<'All' | ProgramDiscipline>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [highlights, setHighlights] = useState<InstitutionalHighlight[]>(INSTITUTIONAL_HIGHLIGHTS);
  const [isEditingHighlights, setIsEditingHighlights] = useState(false);
  const [showSampleTestimonialsLayout, setShowSampleTestimonialsLayout] = useState(false);

  const filteredPrograms = useMemo(
    () =>
      filterPrograms(ACADEMIC_PROGRAMS, {
        level: selectedLevel,
        discipline: selectedDiscipline,
        searchQuery,
      }),
    [selectedLevel, selectedDiscipline, searchQuery]
  );

  const handleHighlightChange = (id: string, field: 'value' | 'subtext', newValue: string) => {
    setHighlights((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: newValue } : item))
    );
  };

  return (
    <>
      <SEOHead
        title="Acharya Bangalore B-School (ABBS) | Higher Education & Management in Bengaluru"
        description="Explore MBA, PGDM, MCA, M.Com, BBA, BCA (AI & ML), B.Com (ACCA/CMA/Fintech), B.Sc., BA, and Ph.D. programs at Acharya Bangalore B-School (ABBS), Bengaluru."
      />

      {/* C. HERO SECTION */}
      <section className="relative bg-[#07111E] text-white border-b border-stone-800 overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8 py-14 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Editorial Column */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-[#E5C675] font-semibold">
                  <span className="w-8 h-[1px] bg-[#C59B27]" aria-hidden="true" />
                  <span>
                    Acharya Bangalore B-School · Bengaluru · Est. {OFFICIAL_CONTACT.foundedYear}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-serif font-semibold leading-[1.06] tracking-[-0.02em] text-white">
                  Discover Your Potential. Shape Your Future.
                </h1>

                <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl">
                  Explore an education that connects academic excellence, industry exposure,
                  innovation, and personal growth at Acharya Bangalore B-School.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <a
                    href="#explore-programs"
                    className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider bg-[#C59B27] text-[#07111E] hover:bg-[#d6ad38] transition-colors inline-flex items-center gap-2 whitespace-nowrap"
                  >
                    <span>Explore Programs</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <Link
                    to="/admissions#enquiry-form"
                    className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider border border-stone-500 text-white hover:border-white hover:bg-white/5 transition-colors whitespace-nowrap"
                  >
                    Enquire Now
                  </Link>
                  <Link
                    to="/contact#visit-form"
                    className="px-4 py-3.5 text-xs font-medium text-stone-300 hover:text-[#E5C675] transition-colors whitespace-nowrap"
                  >
                    Book a Campus Visit →
                  </Link>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-stone-800/90">
                {/* Direct Level Quick-Jump Strip */}
                <div className="grid grid-cols-3 gap-3">
                  <Link
                    to="/academics?level=Postgraduate"
                    className="p-3 bg-[#0B192C] border border-stone-800 hover:border-[#C59B27] transition-colors group"
                  >
                    <div className="text-[11px] uppercase tracking-wider text-[#E5C675] font-semibold">
                      Postgraduate
                    </div>
                    <div className="text-xs text-stone-200 mt-0.5 font-medium group-hover:text-white">
                      MBA · PGDM · MCA · M.Com
                    </div>
                  </Link>
                  <Link
                    to="/academics?level=Undergraduate"
                    className="p-3 bg-[#0B192C] border border-stone-800 hover:border-[#C59B27] transition-colors group"
                  >
                    <div className="text-[11px] uppercase tracking-wider text-[#E5C675] font-semibold">
                      Undergraduate
                    </div>
                    <div className="text-xs text-stone-200 mt-0.5 font-medium group-hover:text-white">
                      BBA · BCA · B.Com · B.Sc. · BA
                    </div>
                  </Link>
                  <Link
                    to="/academics?level=Doctoral"
                    className="p-3 bg-[#0B192C] border border-stone-800 hover:border-[#C59B27] transition-colors group"
                  >
                    <div className="text-[11px] uppercase tracking-wider text-[#E5C675] font-semibold">
                      Doctoral Research
                    </div>
                    <div className="text-xs text-stone-200 mt-0.5 font-medium group-hover:text-white">
                      Ph.D. in Management
                    </div>
                  </Link>
                </div>

                {/* Operational & Accreditation Strip (Unboxed clean metadata) */}
                <div className="text-xs text-stone-400 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="text-stone-200 font-medium">NAAC Grade &ldquo;A&rdquo; (3 Cycles)</span>
                  <span aria-hidden="true">·</span>
                  <span>NBA Accredited MBA Dept.</span>
                  <span aria-hidden="true">·</span>
                  <span>IACBE (USA) Accredited</span>
                  <span aria-hidden="true">·</span>
                  <span>AICTE Approved</span>
                  <span aria-hidden="true">·</span>
                  <span>Andrahalli Main Road, Bengaluru</span>
                </div>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="border border-stone-700/80 bg-[#0B192C] h-full flex flex-col justify-between">
                <CampusVisual
                  variant="campus-hero"
                  alt="Acharya Bangalore B-School academic quadrangle in Bengaluru"
                  caption="ABBS Academic Campus — Andrahalli Main Road, Off Magadi Road, Bengaluru"
                  aspectRatio="4:3"
                  eager={true}
                />
                <div className="p-5 bg-[#0B192C] border-t border-stone-800 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-2 text-stone-300">
                    <MapPin className="w-4 h-4 text-[#C59B27] shrink-0" aria-hidden="true" />
                    <span>Bengaluru, Karnataka 560091</span>
                  </div>
                  <Link
                    to="/campus-life"
                    className="text-[#E5C675] font-semibold hover:underline whitespace-nowrap"
                  >
                    Explore Campus Tour →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* D. INSTITUTIONAL HIGHLIGHTS (Configurable & Verified) */}
      <section className="border-b border-stone-200 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
                Institutional Profile &amp; Recognitions
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#0B192C] mt-1">
                Verified Institutional Highlights
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsEditingHighlights(!isEditingHighlights)}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-stone-300 text-stone-700 hover:border-[#0B192C] hover:text-[#0B192C] transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isEditingHighlights ? 'Done Configuring' : 'Configure Highlights'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-stone-200">
            {highlights.map((item) => (
              <div
                key={item.id}
                className="p-6 lg:p-8 border-r border-b border-stone-200 flex flex-col justify-between space-y-4 bg-[#FAF8F5]/50"
              >
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                    {item.label}
                  </div>
                  {isEditingHighlights ? (
                    <div className="space-y-2 pt-1">
                      <label htmlFor={`hl-val-${item.id}`} className="sr-only">
                        {item.label} Value
                      </label>
                      <input
                        id={`hl-val-${item.id}`}
                        type="text"
                        value={item.value}
                        onChange={(e) => handleHighlightChange(item.id, 'value', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-lg font-serif font-bold border border-stone-300 bg-white text-[#0B192C]"
                      />
                      <label htmlFor={`hl-sub-${item.id}`} className="sr-only">
                        {item.label} Description
                      </label>
                      <textarea
                        id={`hl-sub-${item.id}`}
                        rows={2}
                        value={item.subtext}
                        onChange={(e) => handleHighlightChange(item.id, 'subtext', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs border border-stone-300 bg-white text-stone-700"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="text-3xl lg:text-4xl font-serif font-bold text-[#0B192C] font-mono-tabular">
                        {item.value}
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">{item.subtext}</p>
                    </>
                  )}
                </div>

                <div className="pt-3 border-t border-stone-200/80 text-[11px] text-stone-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B48327] shrink-0" aria-hidden="true" />
                  <span>{item.verificationStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E. EXPLORE ACADEMIC PROGRAMS */}
      <section id="explore-programs" className="py-16 lg:py-24 border-b border-stone-200 bg-[#FAF8F5]">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
                Academic Schools &amp; Departments
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#0B192C]">
                Explore Academic Programs
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                Select an academic school below or filter by study level and keyword. Every program
                links to a dedicated curriculum, eligibility, and admissions detail page.
              </p>
            </div>
            <Link
              to="/academics"
              className="self-start lg:self-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0B192C] border-b border-[#0B192C] pb-1 hover:text-[#B48327] hover:border-[#B48327] transition-colors whitespace-nowrap"
            >
              <span>Open Full Searchable Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* 5 Visual Discipline Category Selector Cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6"
            role="group"
            aria-label="Select academic discipline category"
          >
            {DISCIPLINE_CARDS.map((card) => {
              const isSelected = selectedDiscipline === card.discipline;
              const count = ACADEMIC_PROGRAMS.filter((p) => p.discipline === card.discipline).length;
              return (
                <button
                  key={card.discipline}
                  type="button"
                  onClick={() =>
                    setSelectedDiscipline(isSelected ? 'All' : card.discipline)
                  }
                  aria-pressed={isSelected}
                  className={`text-left p-4 border transition-colors cursor-pointer flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'bg-[#0B192C] text-white border-[#0B192C]'
                      : 'bg-white text-[#0B192C] border-stone-200 hover:border-[#0B192C]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 w-full">
                    <span
                      className={`text-[11px] uppercase tracking-wider font-semibold ${
                        isSelected ? 'text-[#E5C675]' : 'text-[#B48327]'
                      }`}
                    >
                      {card.discipline}
                    </span>
                    <span
                      className={`text-xs font-mono-tabular ${
                        isSelected ? 'text-stone-300' : 'text-stone-400'
                      }`}
                    >
                      {count} {count === 1 ? 'Program' : 'Programs'}
                    </span>
                  </div>
                  <div>
                    <div className="font-serif font-semibold text-base leading-snug">
                      {card.shortLabel}
                    </div>
                    <div
                      className={`text-[11px] mt-1 ${
                        isSelected ? 'text-stone-300' : 'text-stone-500'
                      }`}
                    >
                      {card.degrees}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Filter & Search Controls */}
          <div className="mb-10 bg-white p-5 border border-stone-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              <div
                className="lg:col-span-6 flex flex-wrap items-center gap-1.5"
                role="group"
                aria-label="Filter by degree level"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 mr-2">
                  Level:
                </span>
                {LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedLevel(lvl)}
                    aria-pressed={selectedLevel === lvl}
                    className={`px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      selectedLevel === lvl
                        ? 'bg-[#0B192C] text-white'
                        : 'bg-[#FAF8F5] text-stone-700 hover:bg-stone-200/70'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
                {selectedDiscipline !== 'All' && (
                  <button
                    type="button"
                    onClick={() => setSelectedDiscipline('All')}
                    className="ml-2 px-2.5 py-1.5 text-xs font-medium text-[#B48327] hover:underline cursor-pointer"
                  >
                    Clear Discipline ({selectedDiscipline}) ×
                  </button>
                )}
              </div>

              <div className="lg:col-span-6 relative">
                <label htmlFor="home-program-search" className="sr-only">
                  Filter academic programs by keyword or specialization
                </label>
                <Search
                  className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="home-program-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Quick search (e.g., MBA, Aviation, ACCA, AI, Biotechnology, Ph.D.)..."
                  className="w-full pl-10 pr-8 py-2 text-xs bg-[#FAF8F5] border border-stone-300 text-stone-900 focus:border-[#0B192C] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear program search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Program Cards Grid */}
          {filteredPrograms.length === 0 ? (
            <div className="bg-white border border-stone-200 p-12 text-center space-y-4">
              <p className="text-lg font-serif text-[#0B192C]">
                No programs match the selected filters ({selectedLevel} · {selectedDiscipline}
                {searchQuery ? ` · "${searchQuery}"` : ''}).
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedLevel('All');
                  setSelectedDiscipline('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#0B192C] text-white cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program) => (
                <article
                  key={program.slug}
                  className="bg-white border border-stone-200 flex flex-col justify-between hover:border-[#0B192C] transition-colors"
                >
                  <div>
                    <Link to={`/academics/${program.slug}`} className="block">
                      <CampusVisual
                        variant={program.visualTheme}
                        alt={`${program.title} academic environment`}
                        aspectRatio="16:9"
                      />
                    </Link>
                    <div className="p-6 space-y-3">
                      {/* Clean unboxed metadata with typographic separators */}
                      <div className="flex items-center gap-2 text-xs text-stone-500">
                        <span className="font-semibold text-[#B48327]">{program.level}</span>
                        <span aria-hidden="true">·</span>
                        <span>{program.discipline}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">{program.code}</span>
                      </div>

                      <h3 className="text-xl font-serif font-semibold text-[#0B192C] leading-snug">
                        <Link to={`/academics/${program.slug}`} className="hover:underline">
                          {program.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                        {program.overview}
                      </p>

                      <div className="pt-2">
                        <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-1">
                          Specializations / Tracks
                        </div>
                        <p className="text-xs text-stone-800 font-medium">
                          {program.specializations.join(' · ')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-stone-200 bg-[#FAF8F5] flex items-center justify-between gap-4">
                    <span className="text-xs text-stone-600 font-mono-tabular truncate">
                      {program.duration.split('(')[0].trim()}
                    </span>
                    <div className="flex items-center gap-3 shrink-0">
                      <Link
                        to={`/academics/${program.slug}#program-enquiry`}
                        className="text-xs font-medium text-stone-600 hover:text-[#0B192C]"
                      >
                        Enquire
                      </Link>
                      <Link
                        to={`/academics/${program.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B192C] hover:text-[#B48327] whitespace-nowrap"
                      >
                        <span>Program Details</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* F. WHY ABBS? */}
      <section className="py-16 lg:py-24 bg-white border-b border-stone-200">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-12 space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
              Educational Philosophy
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#0B192C]">
              Why Study at Acharya Bangalore B-School?
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Our academic model balances foundational scholarship with applied laboratory work,
              corporate internships, and structured personal development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-stone-200">
            {WHY_ABBS_PILLARS.map((pillar) => (
              <div
                key={pillar.index}
                className="p-8 border-r border-b border-stone-200 flex flex-col justify-between space-y-5 bg-white hover:bg-[#FAF8F5] transition-colors"
              >
                <div className="space-y-3">
                  <div className="text-xs font-mono-tabular font-semibold text-[#B48327]">
                    {pillar.index}.
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-[#0B192C]">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{pillar.description}</p>
                </div>
                <div className="pt-2">
                  <Link
                    to={pillar.linkTo}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0B192C] hover:text-[#B48327]"
                  >
                    <span>{pillar.linkLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* G. CAMPUS EXPERIENCE & STUDENT LIFE */}
      <section className="py-16 lg:py-24 bg-[#FAF8F5] border-b border-stone-200">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
                Bengaluru Campus Infrastructure
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#0B192C]">
                Campus Experience, Laboratories &amp; Student Life
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                Located on Andrahalli Main Road off Magadi Road in Bengaluru, the ABBS campus
                supports academic study, scientific experimentation, entrepreneurship, athletics, and
                residential community life.
              </p>
            </div>
            <Link
              to="/campus-life"
              className="self-start lg:self-auto inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#0B192C] text-white hover:bg-[#162B49] transition-colors whitespace-nowrap"
            >
              <span>Explore Campus Gallery &amp; Facilities</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAMPUS_FACILITIES.slice(0, 6).map((facility) => (
              <div
                key={facility.id}
                className="bg-white border border-stone-200 flex flex-col justify-between"
              >
                <div>
                  <CampusVisual
                    variant={facility.visualType}
                    alt={facility.title}
                    caption={facility.caption}
                    aspectRatio="4:3"
                  />
                  <div className="p-6 space-y-2.5">
                    <div className="text-xs text-[#B48327] font-semibold uppercase tracking-wider">
                      {facility.category}
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-[#0B192C]">
                      {facility.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">{facility.summary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* H & I. INDUSTRY, CAREER PREPARATION & STUDENT CLUBS */}
      <section className="py-16 lg:py-24 bg-white border-b border-stone-200">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            <div className="lg:col-span-6 border border-stone-200 bg-[#FAF8F5] flex flex-col justify-between overflow-hidden">
              <div>
                <CampusVisual
                  variant="incubation"
                  alt="Industry Engagement and Career Readiness at ABBS"
                  aspectRatio="16:9"
                />
                <div className="p-8 lg:p-10 space-y-4">
                  <p className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
                    Career Preparation &amp; Corporate Interface
                  </p>
                  <h2 className="text-3xl font-serif font-semibold text-[#0B192C]">
                    Industry Engagement &amp; Placement Support
                  </h2>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    The ABBS Placement &amp; Career Development Cell integrates aptitude training,
                    technical bootcamps, mandatory corporate internships, and pre-placement readiness
                    across every academic department.
                  </p>
                  <ul className="space-y-2 text-xs text-stone-700 pt-2">
                    <li>· Pre-placement training in quantitative aptitude, GD, and personal interviews</li>
                    <li>· Mandatory summer internships and industry-mentored capstone projects</li>
                    <li>· Value-added professional tracks (ACCA, US CMA, Fintech, AI &amp; Analytics)</li>
                    <li>· Transparent placement governance without exaggerated salary guarantees</li>
                  </ul>
                </div>
              </div>
              <div className="px-8 lg:px-10 py-5 border-t border-stone-200 bg-white">
                <Link
                  to="/placements"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0B192C] hover:text-[#B48327]"
                >
                  <span>Review Career Preparation &amp; Placement Framework</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 border border-stone-200 bg-[#FAF8F5] flex flex-col justify-between overflow-hidden">
              <div>
                <CampusVisual
                  variant="cultural"
                  alt="Student Clubs, Cultural Activities and Regalia Fest at ABBS"
                  aspectRatio="16:9"
                />
                <div className="p-8 lg:p-10 space-y-4">
                  <p className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
                    Co-Curricular &amp; Cultural Vibrancy
                  </p>
                  <h2 className="text-3xl font-serif font-semibold text-[#0B192C]">
                    Student Clubs, Societies &amp; Regalia Fest
                  </h2>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Beyond lecture halls and laboratories, students lead specialized academic clubs,
                    Toastmasters speaking forums, community social outreach initiatives, and our annual
                    inter-collegiate management and cultural conclave.
                  </p>
                  <ul className="space-y-2 text-xs text-stone-700 pt-2">
                    <li>· Domain clubs in Finance, Marketing, HR, Analytics, Coding &amp; Bio-Science</li>
                    <li>· Regalia — Annual Inter-Collegiate Management &amp; Cultural Festival</li>
                    <li>· NSS, Eco-Club sustainability drives, and community leadership</li>
                    <li>· Inter-collegiate sports tournaments in cricket, football, basketball &amp; athletics</li>
                  </ul>
                </div>
              </div>
              <div className="px-8 lg:px-10 py-5 border-t border-stone-200 bg-white">
                <Link
                  to="/news-events"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0B192C] hover:text-[#B48327]"
                >
                  <span>Explore Campus Events &amp; Student Activities</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* J. TESTIMONIALS GOVERNANCE SECTION (Hidden by default until verified quotes are supplied) */}
      <section className="py-12 bg-[#FAF8F5] border-b border-stone-200">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="border border-stone-300 bg-white p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
                  Editorial Integrity &amp; Alumni Voices
                </p>
                <h2 className="text-xl font-serif font-semibold text-[#0B192C] mt-0.5">
                  Student &amp; Alumni Testimonials Module
                </h2>
                <p className="text-xs text-stone-600 mt-1">
                  In accordance with institutional content standards, unverified student quotations
                  or synthetic alumni stories are never displayed as factual endorsements.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSampleTestimonialsLayout(!showSampleTestimonialsLayout)}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border border-stone-300 text-stone-700 hover:border-[#0B192C] cursor-pointer whitespace-nowrap"
              >
                {showSampleTestimonialsLayout ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Hide Development Layout Preview</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Preview Sample Layout (Development Mode)</span>
                  </>
                )}
              </button>
            </div>

            {showSampleTestimonialsLayout && (
              <div className="mt-6 pt-6 border-t border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-[#FAF8F5] border border-dashed border-stone-300 space-y-3">
                  <div className="text-[11px] uppercase tracking-wider text-amber-800 font-semibold">
                    [Sample Template Slot #1 — Replace with Verified Alumni Record]
                  </div>
                  <blockquote className="text-sm font-serif italic text-stone-700 leading-relaxed">
                    &ldquo;[Insert verified quotation from consenting ABBS Postgraduate / MBA
                    alumnus detailing specific academic mentorship and capstone project experience.]&rdquo;
                  </blockquote>
                  <div className="text-xs text-stone-500">
                    [Verified Student Name] · [Program &amp; Graduating Batch Year] · [Verified Role &amp; Organization]
                  </div>
                </div>

                <div className="p-5 bg-[#FAF8F5] border border-dashed border-stone-300 space-y-3">
                  <div className="text-[11px] uppercase tracking-wider text-amber-800 font-semibold">
                    [Sample Template Slot #2 — Replace with Verified Undergraduate Record]
                  </div>
                  <blockquote className="text-sm font-serif italic text-stone-700 leading-relaxed">
                    &ldquo;[Insert verified quotation from consenting ABBS Undergraduate (BBA / BCA /
                    B.Com / B.Sc.) student regarding laboratory facilities and faculty guidance.]&rdquo;
                  </blockquote>
                  <div className="text-xs text-stone-500">
                    [Verified Student Name] · [Program &amp; Graduating Batch Year] · [Verified Pathway]
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* K. ADMISSIONS CTA */}
      <section className="py-16 lg:py-24 bg-[#0B192C] text-white">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border border-stone-700 p-8 lg:p-14 bg-[#07111E]">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs uppercase tracking-widest text-[#E5C675] font-semibold">
                Admissions &amp; Academic Counselling
              </p>
              <h2 className="text-3xl sm:text-5xl font-serif font-semibold text-white">
                Your Next Chapter Starts Here.
              </h2>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                Connect with our Admissions Office in Bengaluru to review program eligibility,
                confirm current fee structures, or schedule a guided campus visit with your family.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                to="/admissions"
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider bg-[#C59B27] text-[#07111E] hover:bg-[#d6ad38] transition-colors whitespace-nowrap"
              >
                Explore Admissions
              </Link>
              <Link
                to="/contact#enquiry-section"
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider border border-stone-500 text-white hover:border-white transition-colors whitespace-nowrap"
              >
                Request Information
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
