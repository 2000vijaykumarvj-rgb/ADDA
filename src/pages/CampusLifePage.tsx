import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Maximize2, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { CAMPUS_FACILITIES, type CampusFacility } from '../data/abbsData';
import { CampusVisual } from '../components/CampusVisual';
import { SEOHead } from '../components/SEOHead';

const FACILITY_CATEGORIES = [
  'All',
  'Academic',
  'Laboratories',
  'Innovation',
  'Student Life',
  'Residential & Sports',
] as const;

export const CampusLifePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof FACILITY_CATEGORIES)[number]>('All');
  const [lightboxFacility, setLightboxFacility] = useState<CampusFacility | null>(null);

  const filteredFacilities =
    selectedCategory === 'All'
      ? CAMPUS_FACILITIES
      : CAMPUS_FACILITIES.filter((item) => item.category === selectedCategory);

  const currentIndex = lightboxFacility
    ? filteredFacilities.findIndex((f) => f.id === lightboxFacility.id)
    : -1;

  const handlePrev = () => {
    if (currentIndex <= 0) {
      setLightboxFacility(filteredFacilities[filteredFacilities.length - 1]);
    } else {
      setLightboxFacility(filteredFacilities[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex >= filteredFacilities.length - 1) {
      setLightboxFacility(filteredFacilities[0]);
    } else {
      setLightboxFacility(filteredFacilities[currentIndex + 1]);
    }
  };

  React.useEffect(() => {
    if (!lightboxFacility) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxFacility(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxFacility, currentIndex, filteredFacilities]);

  return (
    <>
      <SEOHead
        title="Campus Life, Laboratories, Library & Hostels | Acharya Bangalore B-School"
        description="Explore the ABBS Bengaluru campus: Central Library, AI & Computing Labs, Biotechnology & Forensic Science Wet Labs, Incubation Studio, Auditorium, Sports, Hostels, and Regalia Fest."
      />

      {/* Hero Section */}
      <section className="bg-[#07111E] text-white py-14 lg:py-20 border-b border-stone-800">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#E5C675] font-semibold">
              Andrahalli Main Road, Off Magadi Road · Bengaluru
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-white leading-tight">
              Campus Life, Laboratories &amp; Student Infrastructure
            </h1>
            <p className="text-base text-stone-300 leading-relaxed">
              The Acharya Bangalore B-School campus brings together academic resource centres,
              computing and life-science laboratories, startup incubation spaces, athletic grounds,
              residential hostels, and vibrant student-led cultural societies.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="bg-white border-b border-stone-200 py-5 sticky top-14 lg:top-16 z-20">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div
            className="flex flex-wrap items-center gap-1.5"
            role="group"
            aria-label="Filter campus facilities by category"
          >
            {FACILITY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={`px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#0B192C] text-white'
                    : 'bg-[#FAF8F5] text-stone-700 border border-stone-200 hover:border-stone-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-stone-500">
            Click any facility card to open the detailed architectural gallery view
          </div>
        </div>
      </section>

      {/* Facilities & Visual Gallery Grid */}
      <section className="py-14 lg:py-20 bg-[#FAF8F5] border-b border-stone-200">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFacilities.map((facility) => (
              <article
                key={facility.id}
                className="bg-white border border-stone-200 flex flex-col justify-between hover:border-[#0B192C] transition-colors"
              >
                <div>
                  <div className="relative">
                    <CampusVisual
                      variant={facility.visualType}
                      alt={facility.title}
                      caption={facility.caption}
                      aspectRatio="4:3"
                    />
                    <button
                      type="button"
                      onClick={() => setLightboxFacility(facility)}
                      aria-label={`Inspect ${facility.title} in gallery lightbox`}
                      className="absolute top-3 right-3 bg-[#07111E]/85 text-white px-3 py-1.5 text-xs font-medium inline-flex items-center gap-1.5 border border-stone-600 hover:bg-[#0B192C] cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Inspect</span>
                    </button>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="text-xs uppercase tracking-wider font-semibold text-[#B48327]">
                      {facility.category}
                    </div>
                    <h2 className="text-2xl font-serif font-semibold text-[#0B192C]">
                      {facility.title}
                    </h2>
                    <p className="text-xs text-stone-600 leading-relaxed">{facility.summary}</p>

                    <div className="pt-3 border-t border-stone-100">
                      <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-1.5">
                        Key Specifications &amp; Highlights
                      </div>
                      <ul className="space-y-1 text-xs text-stone-700">
                        {facility.specifications.map((spec) => (
                          <li key={spec}>· {spec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Accessible Lightbox Modal */}
      {lightboxFacility && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
        >
          <div className="bg-white border border-stone-300 max-w-4xl w-full overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-[#07111E] text-white border-b border-stone-800">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-[#E5C675]">
                  {lightboxFacility.category} · Campus Gallery View
                </div>
                <h2 id="lightbox-title" className="text-xl font-serif font-semibold">
                  {lightboxFacility.title}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous facility in gallery"
                  className="p-2 border border-stone-700 text-stone-300 hover:text-white cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next facility in gallery"
                  className="p-2 border border-stone-700 text-stone-300 hover:text-white cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxFacility(null)}
                  aria-label="Close gallery lightbox"
                  className="p-2 border border-stone-700 text-stone-300 hover:text-white cursor-pointer ml-2"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <CampusVisual
                  variant={lightboxFacility.visualType}
                  alt={lightboxFacility.title}
                  caption={lightboxFacility.caption}
                  aspectRatio="16:9"
                  eager={true}
                />
              </div>
              <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-4 bg-[#FAF8F5]">
                <div className="space-y-3">
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {lightboxFacility.summary}
                  </p>
                  <div className="space-y-1.5 pt-2">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#0B192C]">
                      Facility Features
                    </div>
                    <ul className="space-y-1 text-xs text-stone-600">
                      {lightboxFacility.specifications.map((s) => (
                        <li key={s}>· {s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="pt-4 border-t border-stone-200 text-[11px] text-stone-500">
                  Visual Disclosure: {lightboxFacility.caption}. Schedule an in-person campus visit
                  to inspect all laboratories and residential facilities first-hand.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campus Visit CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="bg-[#0B192C] text-white p-8 lg:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs uppercase tracking-widest text-[#E5C675] font-semibold">
                Experience ABBS in Person
              </div>
              <h2 className="text-3xl font-serif font-semibold">
                Schedule a Guided Tour of Our Laboratories &amp; Campus
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Meet with faculty coordinators and tour the Central Library, Computing Labs, Life
                Science Suites, and Hostels on Andrahalli Main Road, Bengaluru.
              </p>
            </div>
            <Link
              to="/contact#visit-form"
              className="self-start lg:self-auto inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider bg-[#C59B27] text-[#07111E] hover:bg-[#d6ad38] whitespace-nowrap"
            >
              <span>Book a Campus Visit</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
