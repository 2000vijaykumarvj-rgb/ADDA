import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-[1360px] mx-auto px-4 lg:px-8 py-24 text-center space-y-6">
      <SEOHead
        title="404 — Page Not Found | Acharya Bangalore B-School (ABBS)"
        description="The page you requested could not be found on the Acharya Bangalore B-School website."
      />
      <div className="inline-flex items-center justify-center p-3 bg-[#FAF8F5] border border-stone-300 text-[#B48327]">
        <Compass className="w-6 h-6" aria-hidden="true" />
      </div>
      <div className="space-y-2">
        <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#B48327] font-semibold">
          Error 404 · Route Not Found
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-[#0B192C]">
          We Could Not Locate That Page
        </h1>
        <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
          The address you entered may have moved or does not exist. Use the links below to return to
          the Acharya Bangalore B-School homepage or academic catalog.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <Link
          to="/"
          className="px-6 py-3 text-xs font-semibold uppercase tracking-wider bg-[#0B192C] text-white hover:bg-[#162B49] inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Homepage</span>
        </Link>
        <Link
          to="/academics"
          className="px-6 py-3 text-xs font-semibold uppercase tracking-wider border border-[#0B192C] text-[#0B192C] hover:bg-stone-100"
        >
          Explore Academic Programs
        </Link>
      </div>
    </div>
  );
};
