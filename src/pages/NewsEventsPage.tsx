import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { NEWS_AND_EVENTS, type NewsEventItem } from '../data/extendedData';
import { SEOHead } from '../components/SEOHead';

const EVENT_TYPES = [
  'All',
  'Admissions Notice',
  'Academic Conference',
  'Industry Lecture',
  'Campus Life',
] as const;

export const NewsEventsPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<(typeof EVENT_TYPES)[number]>('All');

  const filteredEvents: NewsEventItem[] =
    selectedType === 'All'
      ? NEWS_AND_EVENTS
      : NEWS_AND_EVENTS.filter((item) => item.type === selectedType);

  return (
    <>
      <SEOHead
        title="News, Conferences & Campus Events | Acharya Bangalore B-School (ABBS)"
        description="Stay updated with academic conferences, C-suite leadership lectures, Regalia cultural fest, and admissions counselling schedules at Acharya Bangalore B-School, Bengaluru."
      />

      {/* Page Hero */}
      <section className="bg-[#07111E] text-white py-14 lg:py-20 border-b border-stone-800">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#E5C675] font-semibold">
              Institutional Calendar &amp; Updates
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-white leading-tight">
              News, Symposiums &amp; Campus Events
            </h1>
            <p className="text-base text-stone-300 leading-relaxed">
              Explore academic conferences, practitioner leadership lectures, student conclaves, and
              official admissions updates at Acharya Bangalore B-School.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white border-b border-stone-200 py-5">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div
            className="flex flex-wrap items-center gap-1.5"
            role="group"
            aria-label="Filter news and events by category"
          >
            {EVENT_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                aria-pressed={selectedType === type}
                className={`px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  selectedType === type
                    ? 'bg-[#0B192C] text-white'
                    : 'bg-[#FAF8F5] text-stone-700 border border-stone-200 hover:border-stone-400'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="text-xs text-stone-500">
            Official dates for semester-specific events are confirmed by the Academic Office
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8 space-y-6">
          {filteredEvents.map((event) => (
            <article
              key={event.id}
              className="bg-white border border-stone-200 p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                  <span className="font-semibold text-[#B48327] uppercase tracking-wider">
                    {event.type}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" aria-hidden="true" />
                    <span>{event.dateLabel}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" aria-hidden="true" />
                    <span>{event.location}</span>
                  </span>
                </div>

                <h2 className="text-2xl font-serif font-semibold text-[#0B192C]">{event.title}</h2>
                <p className="text-sm text-stone-600 leading-relaxed">{event.summary}</p>
              </div>

              <div className="shrink-0">
                <Link
                  to={event.actionRoute}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider bg-[#0B192C] text-white hover:bg-[#162B49] whitespace-nowrap"
                >
                  <span>{event.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};
