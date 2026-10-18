import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ArrowUp,
  SlidersHorizontal,
} from 'lucide-react';
import {
  INITIAL_ANNOUNCEMENTS,
  OFFICIAL_CONTACT,
  ACADEMIC_PROGRAMS,
  type AnnouncementConfig,
} from '../data/abbsData';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [announcements, setAnnouncements] = useState<AnnouncementConfig[]>(INITIAL_ANNOUNCEMENTS);
  const [activeAnnouncementIndex, setActiveAnnouncementIndex] = useState(0);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [customNoticeText, setCustomNoticeText] = useState(INITIAL_ANNOUNCEMENTS[0].message);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'about' | 'academics' | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);

    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 480);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
        setConfigModalOpen(false);
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  const currentAnnouncement = announcements[activeAnnouncementIndex] || announcements[0];

  const handleSaveCustomNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNoticeText.trim()) return;
    setAnnouncements((prev) =>
      prev.map((item, idx) =>
        idx === activeAnnouncementIndex ? { ...item, message: customNoticeText.trim() } : item
      )
    );
    setConfigModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#0F172A]">
      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-[#0B192C] focus:text-white focus:px-4 focus:py-2 focus:text-xs focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Configurable Institutional Announcement Bar (Hidden on mobile scroll to respect 15% sticky cap) */}
      {announcementVisible && currentAnnouncement && (
        <div
          className="bg-[#07111E] text-stone-200 border-b border-stone-800 px-4 lg:px-8 py-2 text-xs"
          role="region"
          aria-label="Institutional Announcement"
        >
          <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <span className="font-semibold text-[#E5C675] whitespace-nowrap">
                {currentAnnouncement.category}
              </span>
              <span aria-hidden="true" className="text-stone-500">
                ·
              </span>
              <p className="truncate text-stone-200" title={currentAnnouncement.message}>
                {currentAnnouncement.message}
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <Link
                to={currentAnnouncement.ctaLink}
                className="font-semibold text-[#E5C675] hover:underline whitespace-nowrap"
              >
                {currentAnnouncement.ctaLabel} →
              </Link>
              <button
                type="button"
                onClick={() => {
                  const nextIdx = (activeAnnouncementIndex + 1) % announcements.length;
                  setActiveAnnouncementIndex(nextIdx);
                  setCustomNoticeText(announcements[nextIdx].message);
                }}
                className="hidden sm:inline-block text-stone-400 hover:text-white cursor-pointer whitespace-nowrap font-mono-tabular"
                aria-label="Cycle announcement notice"
              >
                {activeAnnouncementIndex + 1}/{announcements.length} Next
              </button>
              <button
                type="button"
                onClick={() => {
                  setCustomNoticeText(currentAnnouncement.message);
                  setConfigModalOpen(true);
                }}
                className="hidden md:inline-flex items-center gap-1 text-stone-400 hover:text-white cursor-pointer whitespace-nowrap"
                aria-label="Configure announcement bar"
              >
                <SlidersHorizontal className="w-3 h-3" aria-hidden="true" />
                <span>Configure</span>
              </button>
              <button
                type="button"
                onClick={() => setAnnouncementVisible(false)}
                className="text-stone-400 hover:text-white cursor-pointer p-0.5"
                aria-label="Dismiss announcement bar"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Configurable Announcement Dialog */}
      {configModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="config-announcement-title"
        >
          <div className="bg-white border border-stone-300 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h2
                id="config-announcement-title"
                className="text-xl font-serif font-semibold text-[#0B192C]"
              >
                Configure Institutional Announcement Bar
              </h2>
              <button
                type="button"
                onClick={() => setConfigModalOpen(false)}
                aria-label="Close announcement configuration"
                className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Update the active announcement text or switch between verified institutional notices.
              Unverified admission deadlines should never be published without official confirmation.
            </p>
            <div className="flex items-center gap-2">
              {announcements.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveAnnouncementIndex(idx);
                    setCustomNoticeText(item.message);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium border cursor-pointer ${
                    idx === activeAnnouncementIndex
                      ? 'bg-[#0B192C] text-white border-[#0B192C]'
                      : 'bg-[#FAF8F5] text-stone-700 border-stone-300'
                  }`}
                >
                  {item.category}
                </button>
              ))}
            </div>
            <form onSubmit={handleSaveCustomNotice} className="space-y-3">
              <div>
                <label
                  htmlFor="custom-announcement-input"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1"
                >
                  Announcement Copy
                </label>
                <textarea
                  id="custom-announcement-input"
                  rows={3}
                  value={customNoticeText}
                  onChange={(e) => setCustomNoticeText(e.target.value)}
                  className="w-full p-2.5 text-xs border border-stone-300 bg-[#FAF8F5] text-stone-900"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setConfigModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium border border-stone-300 text-stone-700 hover:bg-stone-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-[#0B192C] text-white hover:bg-[#162B49] cursor-pointer"
                >
                  Update Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sticky Top Header — Strictly follows 3-Zone Top Bar Contract */}
      <header
        ref={headerRef}
        className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-stone-200"
      >
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8 h-14 lg:h-16 flex items-center justify-between gap-3 lg:gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <Link
            to="/"
            className="text-base sm:text-lg lg:text-xl font-serif font-bold tracking-tight text-[#0B192C] whitespace-nowrap shrink-0"
          >
            <span className="sm:hidden">ABBS · Bengaluru</span>
            <span className="hidden sm:inline">ABBS · Acharya Bangalore B-School</span>
          </Link>

          {/* Zone 2: Desktop Single-Line Navigation Links with Accessible Dropdowns */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700"
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  isActive
                    ? 'border-[#B48327] text-[#0B192C] font-semibold'
                    : 'border-transparent hover:text-[#0B192C]'
                }`
              }
            >
              Home
            </NavLink>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('about')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                aria-expanded={openDropdown === 'about'}
                aria-haspopup="true"
                onClick={() => setOpenDropdown(openDropdown === 'about' ? null : 'about')}
                className={`py-1 inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
                  ['/about', '/faculty', '/research', '/news-events'].includes(location.pathname)
                    ? 'border-[#B48327] text-[#0B192C] font-semibold'
                    : 'border-transparent hover:text-[#0B192C]'
                }`}
              >
                <span>About</span>
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              </button>

              {openDropdown === 'about' && (
                <div className="absolute left-0 top-full pt-2 w-64 z-50">
                  <div className="bg-white border border-stone-200 shadow-sm py-2">
                    <Link
                      to="/about"
                      className="block px-4 py-2 text-xs font-medium text-stone-700 hover:bg-[#FAF8F5] hover:text-[#0B192C]"
                    >
                      About ABBS &amp; Accreditations
                    </Link>
                    <Link
                      to="/faculty"
                      className="block px-4 py-2 text-xs font-medium text-stone-700 hover:bg-[#FAF8F5] hover:text-[#0B192C]"
                    >
                      Leadership &amp; Faculty Directory
                    </Link>
                    <Link
                      to="/research"
                      className="block px-4 py-2 text-xs font-medium text-stone-700 hover:bg-[#FAF8F5] hover:text-[#0B192C]"
                    >
                      Research &amp; Innovation Cell
                    </Link>
                    <Link
                      to="/news-events"
                      className="block px-4 py-2 text-xs font-medium text-stone-700 hover:bg-[#FAF8F5] hover:text-[#0B192C]"
                    >
                      News, Conferences &amp; Events
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Academics Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('academics')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                aria-expanded={openDropdown === 'academics'}
                aria-haspopup="true"
                onClick={() => setOpenDropdown(openDropdown === 'academics' ? null : 'academics')}
                className={`py-1 inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
                  location.pathname.startsWith('/academics')
                    ? 'border-[#B48327] text-[#0B192C] font-semibold'
                    : 'border-transparent hover:text-[#0B192C]'
                }`}
              >
                <span>Academics</span>
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              </button>

              {openDropdown === 'academics' && (
                <div className="absolute left-0 top-full pt-2 w-80 z-50">
                  <div className="bg-white border border-stone-200 shadow-sm py-2">
                    <Link
                      to="/academics"
                      className="block px-4 py-2 text-xs font-semibold text-[#0B192C] border-b border-stone-100 hover:bg-[#FAF8F5]"
                    >
                      Explore Full Academic Catalog (10 Programs) →
                    </Link>
                    <div className="px-4 pt-2 pb-1 text-[11px] uppercase tracking-wider text-stone-400">
                      Postgraduate
                    </div>
                    {ACADEMIC_PROGRAMS.filter((p) => p.level === 'Postgraduate').map((p) => (
                      <Link
                        key={p.slug}
                        to={`/academics/${p.slug}`}
                        className="block px-4 py-1.5 text-xs text-stone-700 hover:bg-[#FAF8F5] hover:text-[#0B192C]"
                      >
                        {p.shortTitle}
                      </Link>
                    ))}
                    <div className="px-4 pt-2 pb-1 text-[11px] uppercase tracking-wider text-stone-400 border-t border-stone-100 mt-1">
                      Undergraduate &amp; Doctoral
                    </div>
                    {ACADEMIC_PROGRAMS.filter((p) => p.level !== 'Postgraduate').map((p) => (
                      <Link
                        key={p.slug}
                        to={`/academics/${p.slug}`}
                        className="block px-4 py-1.5 text-xs text-stone-700 hover:bg-[#FAF8F5] hover:text-[#0B192C]"
                      >
                        {p.shortTitle}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <NavLink
              to="/admissions"
              className={({ isActive }) =>
                `py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  isActive
                    ? 'border-[#B48327] text-[#0B192C] font-semibold'
                    : 'border-transparent hover:text-[#0B192C]'
                }`
              }
            >
              Admissions
            </NavLink>

            <NavLink
              to="/placements"
              className={({ isActive }) =>
                `py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  isActive
                    ? 'border-[#B48327] text-[#0B192C] font-semibold'
                    : 'border-transparent hover:text-[#0B192C]'
                }`
              }
            >
              Placements
            </NavLink>

            <NavLink
              to="/campus-life"
              className={({ isActive }) =>
                `py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  isActive
                    ? 'border-[#B48327] text-[#0B192C] font-semibold'
                    : 'border-transparent hover:text-[#0B192C]'
                }`
              }
            >
              Campus Life
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  isActive
                    ? 'border-[#B48327] text-[#0B192C] font-semibold'
                    : 'border-transparent hover:text-[#0B192C]'
                }`
              }
            >
              Contact
            </NavLink>

            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  isActive
                    ? 'border-[#B48327] text-[#0B192C] font-semibold'
                    : 'border-transparent hover:text-[#0B192C]'
                }`
              }
            >
              Admin
            </NavLink>
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/admissions#enquiry-form"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#0B192C] hover:bg-[#162B49] transition-colors whitespace-nowrap shrink-0"
            >
              Apply Now
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden p-2 text-[#0B192C] border border-stone-300 bg-white cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Accessible Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="lg:hidden border-t border-stone-200 bg-white px-4 py-5 space-y-4 max-h-[80vh] overflow-y-auto"
          >
            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <Link to="/" className="p-2.5 border border-stone-200 text-[#0B192C]">
                Home
              </Link>
              <Link to="/about" className="p-2.5 border border-stone-200 text-[#0B192C]">
                About ABBS
              </Link>
              <Link to="/academics" className="p-2.5 border border-stone-200 text-[#0B192C]">
                Academics (All)
              </Link>
              <Link to="/admissions" className="p-2.5 border border-stone-200 text-[#0B192C]">
                Admissions
              </Link>
              <Link to="/placements" className="p-2.5 border border-stone-200 text-[#0B192C]">
                Placements
              </Link>
              <Link to="/campus-life" className="p-2.5 border border-stone-200 text-[#0B192C]">
                Campus Life
              </Link>
              <Link to="/faculty" className="p-2.5 border border-stone-200 text-[#0B192C]">
                Faculty
              </Link>
              <Link to="/research" className="p-2.5 border border-stone-200 text-[#0B192C]">
                Research
              </Link>
              <Link to="/news-events" className="p-2.5 border border-stone-200 text-[#0B192C]">
                News &amp; Events
              </Link>
              <Link to="/contact" className="p-2.5 border border-stone-200 text-[#0B192C]">
                Contact Us
              </Link>
              <Link
                to="/admin"
                className="col-span-2 p-2.5 border border-[#C59B27] bg-[#FAF8F5] text-[#0B192C] font-semibold"
              >
                Admissions Admin Portal
              </Link>
            </div>

            <div className="border-t border-stone-200 pt-3">
              <p className="text-xs uppercase tracking-wider text-stone-500 mb-2">
                Direct Program Links
              </p>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {ACADEMIC_PROGRAMS.map((prog) => (
                  <Link
                    key={prog.slug}
                    to={`/academics/${prog.slug}`}
                    className="py-1.5 px-2 bg-[#FAF8F5] text-stone-700 hover:text-[#0B192C] truncate"
                  >
                    {prog.shortTitle}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Institutional Footer */}
      <footer className="bg-[#07111E] text-stone-300 border-t border-stone-800">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
            {/* Column 1: Brand & Address (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-2xl font-serif font-bold text-white tracking-tight">
                Acharya Bangalore B-School
              </div>
              <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
                Established in {OFFICIAL_CONTACT.foundedYear} under the{' '}
                {OFFICIAL_CONTACT.trustName}. An autonomous higher education institution in
                Bengaluru accredited with NAAC Grade &ldquo;A&rdquo;, NBA (MBA Department), and
                IACBE (USA).
              </p>
              <div className="space-y-2 pt-1 text-xs text-stone-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{OFFICIAL_CONTACT.fullAddress}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#C59B27] shrink-0" aria-hidden="true" />
                  <div className="flex items-center gap-2 font-mono-tabular">
                    <a
                      href={`tel:${OFFICIAL_CONTACT.primaryPhoneTel}`}
                      className="hover:text-white underline-offset-4 hover:underline"
                    >
                      {OFFICIAL_CONTACT.phones[0]}
                    </a>
                    <span aria-hidden="true">·</span>
                    <a
                      href={`tel:${OFFICIAL_CONTACT.secondaryPhoneTel}`}
                      className="hover:text-white underline-offset-4 hover:underline"
                    >
                      {OFFICIAL_CONTACT.phones[1]}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#C59B27] shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${OFFICIAL_CONTACT.email}`}
                    className="hover:text-white underline-offset-4 hover:underline"
                  >
                    {OFFICIAL_CONTACT.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Academic Programs (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-xs font-sans uppercase tracking-widest text-[#E5C675] font-semibold">
                Academic Programs
              </h3>
              <ul className="space-y-2 text-xs">
                {ACADEMIC_PROGRAMS.map((prog) => (
                  <li key={prog.slug}>
                    <Link
                      to={`/academics/${prog.slug}`}
                      className="text-stone-300 hover:text-white transition-colors"
                    >
                      {prog.shortTitle} ({prog.level})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Institutional Pages (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-xs font-sans uppercase tracking-widest text-[#E5C675] font-semibold">
                Institution
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    About ABBS
                  </Link>
                </li>
                <li>
                  <Link to="/admissions" className="hover:text-white transition-colors">
                    Admissions Process
                  </Link>
                </li>
                <li>
                  <Link to="/placements" className="hover:text-white transition-colors">
                    Placements &amp; Careers
                  </Link>
                </li>
                <li>
                  <Link to="/campus-life" className="hover:text-white transition-colors">
                    Campus Life &amp; Labs
                  </Link>
                </li>
                <li>
                  <Link to="/faculty" className="hover:text-white transition-colors">
                    Leadership &amp; Faculty
                  </Link>
                </li>
                <li>
                  <Link to="/research" className="hover:text-white transition-colors">
                    Research &amp; Incubation
                  </Link>
                </li>
                <li>
                  <Link to="/news-events" className="hover:text-white transition-colors">
                    News &amp; Events
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Contact &amp; Directions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Official Verification & External Links (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-xs font-sans uppercase tracking-widest text-[#E5C675] font-semibold">
                Official Portal &amp; Governance
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                All statutory disclosures, AICTE Extension of Approval letters, NAAC SSR reports,
                and official fee notifications are maintained by the institution.
              </p>
              <div className="pt-1 flex flex-col gap-2.5 text-xs">
                <a
                  href={OFFICIAL_CONTACT.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#E5C675] hover:underline font-medium"
                >
                  <span>Visit Official Website (abbs.edu.in)</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a
                  href={OFFICIAL_CONTACT.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-stone-300 hover:text-white"
                >
                  <span>Campus Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-400">
            <p>
              © {new Date().getFullYear()} Acharya Bangalore B-School (ABBS), Bengaluru. All rights
              reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/about#accreditations" className="hover:text-white">
                Mandatory Disclosures &amp; Accreditations
              </Link>
              <span aria-hidden="true">·</span>
              <Link to="/admissions#privacy-notice" className="hover:text-white">
                Privacy &amp; Data Protection Policy
              </Link>
              <span aria-hidden="true">·</span>
              <Link to="/contact" className="hover:text-white">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Control */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top of page"
          className="fixed bottom-6 right-6 z-30 p-3 bg-[#0B192C] text-white border border-stone-700 shadow-md hover:bg-[#162B49] transition-colors cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};
