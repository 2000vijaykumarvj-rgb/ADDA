import React, { useState, useEffect, useMemo } from 'react';
import {
  Lock,
  RefreshCw,
  Download,
  Search,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Phone,
  Mail,
  FileText,
  X,
  KeyRound,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import {
  filterApplications,
  computeApplicationMetrics,
  generateApplicationsCsv,
  type ApplicationRecord,
  type ApplicationStatus,
  type ContactFormInput,
} from '../utils/catalogLogic';
import { ACADEMIC_PROGRAMS } from '../data/abbsData';
import { SEOHead } from '../components/SEOHead';

interface StoredContactItem extends ContactFormInput {
  referenceId: string;
  submittedAt: string;
  deliveryStatus: string;
  supabaseSynced: boolean;
}

const STATUS_OPTIONS: ApplicationStatus[] = [
  'New',
  'Under Review',
  'Shortlisted',
  'Contacted',
  'Admitted',
];

const SESSION_STORAGE_KEY = 'abbs_admin_token_v1';
const SESSION_USER_KEY = 'abbs_admin_user_v1';

export const AdminPage: React.FC = () => {
  const [token, setToken] = useState<string>(() => sessionStorage.getItem(SESSION_STORAGE_KEY) || '');
  const [adminEmail, setAdminEmail] = useState<string>(
    () => sessionStorage.getItem(SESSION_USER_KEY) || ''
  );

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data State
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [contacts, setContacts] = useState<StoredContactItem[]>([]);

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [activeTab, setActiveTab] = useState<'applications' | 'contacts'>('applications');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [programFilter, setProgramFilter] = useState<string>('All');

  // Selected Applicant Modal for Notes & Details
  const [selectedApp, setSelectedApp] = useState<ApplicationRecord | null>(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  const fetchDashboardData = async (activeToken: string) => {
    if (!activeToken) return;
    setIsLoadingData(true);
    try {
      const response = await fetch('/api/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${activeToken}`,
        },
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      const data = await response.json();
      if (data.ok) {
        setApplications(data.applications || []);
        setContacts(data.contacts || []);
      }
    } catch {
      // Keep existing state on transient error
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData(token);
    }
  }, [token]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        const { data: sbAuth, error: sbErr } = await supabase.auth.signInWithPassword({
          email: loginEmail.trim(),
          password: loginPassword.trim(),
        });

        if (!sbErr && sbAuth.session) {
          const sbToken = `sb-${sbAuth.session.access_token}`;
          sessionStorage.setItem(SESSION_STORAGE_KEY, sbToken);
          sessionStorage.setItem(SESSION_USER_KEY, sbAuth.user?.email || loginEmail);
          setToken(sbToken);
          setAdminEmail(sbAuth.user?.email || loginEmail);
          setIsLoggingIn(false);
          return;
        }

        setLoginError(
          data.message || 'Invalid credentials. Please verify your administrator email and password.'
        );
        setIsLoggingIn(false);
        return;
      }

      sessionStorage.setItem(SESSION_STORAGE_KEY, data.token);
      sessionStorage.setItem(SESSION_USER_KEY, data.adminUser.email);
      setToken(data.token);
      setAdminEmail(data.adminUser.email);
    } catch {
      setLoginError('Unable to reach authentication server. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    sessionStorage.removeItem(SESSION_USER_KEY);
    supabase.auth.signOut().catch(() => {});
    setToken('');
    setAdminEmail('');
  };

  const handleStatusChange = async (referenceId: string, newStatus: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.referenceId === referenceId ? { ...app, status: newStatus } : app))
    );

    try {
      const res = await fetch(`/api/admin/applications/${encodeURIComponent(referenceId)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.ok && data.application) {
        setApplications((prev) =>
          prev.map((app) => (app.referenceId === referenceId ? data.application : app))
        );
      }
    } catch {
      // Revert or refresh if needed
    }
  };

  const handleSaveNotes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;
    setIsSavingNotes(true);
    try {
      const res = await fetch(
        `/api/admin/applications/${encodeURIComponent(selectedApp.referenceId)}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ adminNotes: notesDraft }),
        }
      );
      const data = await res.json();
      if (data.ok && data.application) {
        setApplications((prev) =>
          prev.map((app) =>
            app.referenceId === selectedApp.referenceId ? data.application : app
          )
        );
        setSelectedApp(null);
      }
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleExportCsv = () => {
    const csvContent = generateApplicationsCsv(filteredApps);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'abbs-admissions-applications.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredApps = useMemo(
    () =>
      filterApplications(applications, {
        searchQuery,
        statusFilter,
        programFilter,
      }),
    [applications, searchQuery, statusFilter, programFilter]
  );

  const metrics = useMemo(() => computeApplicationMetrics(applications), [applications]);

  // 1. RENDER LOGIN SCREEN IF NOT AUTHENTICATED
  if (!token) {
    return (
      <>
        <SEOHead
          title="Admin Portal | Acharya Bangalore B-School (ABBS)"
          description="Administrator portal for Acharya Bangalore B-School admissions and student enquiries."
        />

        <section className="py-16 lg:py-24 bg-[#FAF8F5] min-h-[80vh] flex items-center">
          <div className="max-w-md w-full mx-auto px-4">
            <div className="bg-white border border-stone-300 p-8 space-y-6">
              <div className="space-y-2 border-b border-stone-200 pb-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#B48327] font-semibold">
                  <span>ABBS Admissions Administration</span>
                  <Lock className="w-4 h-4 text-[#0B192C]" aria-hidden="true" />
                </div>
                <h1 className="text-3xl font-serif font-semibold text-[#0B192C]">
                  Admin Portal
                </h1>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Sign in to review student applications, manage admission statuses, and coordinate
                  campus visits.
                </p>
              </div>

              {loginError && (
                <div
                  className="p-3.5 bg-red-50 border border-red-300 text-xs text-red-900 flex items-start gap-2.5"
                  role="alert"
                >
                  <AlertCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="admin-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
                  >
                    Admin Email
                  </label>
                  <input
                    id="admin-email"
                    type="email"
                    required
                    placeholder="admin@abbs.edu.in"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-stone-300 text-stone-900 focus:border-[#0B192C] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="admin-password"
                    className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
                  >
                    Password
                  </label>
                  <input
                    id="admin-password"
                    type="password"
                    required
                    placeholder="Enter admin password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-stone-300 text-stone-900 focus:border-[#0B192C] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider bg-[#0B192C] text-white hover:bg-[#162B49] transition-colors cursor-pointer"
                >
                  {isLoggingIn ? 'Signing In...' : 'Sign In to Admin Portal'}
                </button>
              </form>

              <div className="pt-4 border-t border-stone-200 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>Institutional Admin Access</span>
                  <span>Bengaluru Campus</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setLoginEmail('admin@abbs.edu.in');
                    setLoginPassword('ABBS@Admin2026');
                    setLoginError(null);
                  }}
                  className="w-full py-2 px-3 text-xs font-medium border border-stone-300 bg-[#FAF8F5] text-[#0B192C] hover:border-[#0B192C] inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5 text-[#B48327]" aria-hidden="true" />
                  <span>Fill Default Admin Credentials (admin@abbs.edu.in)</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // 2. RENDER ADMIN DASHBOARD WHEN AUTHENTICATED
  return (
    <>
      <SEOHead
        title="Admin Portal | Acharya Bangalore B-School (ABBS)"
        description="Manage student enquiries and admission applications for Acharya Bangalore B-School."
      />

      {/* Admin Top Header Bar */}
      <section className="bg-[#07111E] text-white py-10 border-b border-stone-800">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#E5C675]">
                <span className="uppercase tracking-widest font-semibold">
                  ABBS Admin Portal
                </span>
                <span aria-hidden="true">·</span>
                <span>Signed in as {adminEmail}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-white">
                Admin Portal — Admissions &amp; Applications
              </h1>
              <p className="text-xs text-stone-300">
                Review incoming student enquiries, update admission statuses, and manage counselling notes.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => fetchDashboardData(token)}
                disabled={isLoadingData}
                className="px-3.5 py-2 text-xs font-semibold border border-stone-600 text-stone-200 hover:border-white inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isLoadingData ? 'animate-spin' : ''}`}
                  aria-hidden="true"
                />
                <span>Refresh</span>
              </button>

              <button
                type="button"
                onClick={handleExportCsv}
                className="px-3.5 py-2 text-xs font-semibold bg-[#C59B27] text-[#07111E] hover:bg-[#d6ad38] inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Export CSV</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="px-3.5 py-2 text-xs font-semibold border border-stone-700 text-stone-300 hover:text-white inline-flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Summary Strip */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-stone-200">
            <div className="p-6 border-r border-b border-stone-200 bg-[#FAF8F5]/60">
              <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                Total Applications Recorded
              </div>
              <div className="text-3xl font-serif font-bold text-[#0B192C] font-mono-tabular mt-1">
                {metrics.total}
              </div>
              <div className="text-xs text-stone-500 mt-1">
                Admissions &amp; Program Enquiries
              </div>
            </div>

            <div className="p-6 border-r border-b border-stone-200 bg-[#FAF8F5]/60">
              <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                New &amp; Under Review
              </div>
              <div className="text-3xl font-serif font-bold text-[#0B192C] font-mono-tabular mt-1">
                {metrics.newCount}
              </div>
              <div className="text-xs text-stone-500 mt-1">Awaiting counselor action</div>
            </div>

            <div className="p-6 border-r border-b border-stone-200 bg-[#FAF8F5]/60">
              <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                Shortlisted &amp; Admitted
              </div>
              <div className="text-3xl font-serif font-bold text-emerald-800 font-mono-tabular mt-1">
                {metrics.shortlistedOrAdmittedCount}
              </div>
              <div className="text-xs text-stone-500 mt-1">Qualified for interview / admission</div>
            </div>

            <div className="p-6 border-r border-b border-stone-200 bg-[#FAF8F5]/60">
              <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                Campus Visits Requested
              </div>
              <div className="text-3xl font-serif font-bold text-[#B48327] font-mono-tabular mt-1">
                {metrics.campusVisitCount}
              </div>
              <div className="text-xs text-stone-500 mt-1">
                Bengaluru campus tours &amp; counselling
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Applications & Contacts Workspace */}
      <section className="py-12 bg-[#FAF8F5] min-h-[60vh]">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8 space-y-6">
          {/* Tabs & Search Controls */}
          <div className="bg-white border border-stone-200 p-5 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div className="flex items-center gap-2" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'applications'}
                  onClick={() => setActiveTab('applications')}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider cursor-pointer ${
                    activeTab === 'applications'
                      ? 'bg-[#0B192C] text-white'
                      : 'bg-[#FAF8F5] text-stone-700 border border-stone-300'
                  }`}
                >
                  Program Applications ({applications.length})
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'contacts'}
                  onClick={() => setActiveTab('contacts')}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider cursor-pointer ${
                    activeTab === 'contacts'
                      ? 'bg-[#0B192C] text-white'
                      : 'bg-[#FAF8F5] text-stone-700 border border-stone-300'
                  }`}
                >
                  Contact &amp; General Inquiries ({contacts.length})
                </button>
              </div>

              <div className="text-xs text-stone-500 font-mono-tabular">
                Showing {filteredApps.length} of {applications.length} Application Records
              </div>
            </div>

            {activeTab === 'applications' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-5 relative">
                  <label htmlFor="admin-search" className="sr-only">
                    Search applicants by name, email, phone, or reference ID
                  </label>
                  <Search
                    className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="admin-search"
                    type="text"
                    placeholder="Search name, email, phone, or ABBS-ENQ reference..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs bg-[#FAF8F5] border border-stone-300 text-stone-900 focus:border-[#0B192C] focus:outline-none"
                  />
                </div>

                <div className="md:col-span-3">
                  <label htmlFor="admin-status-filter" className="sr-only">
                    Filter by application status
                  </label>
                  <select
                    id="admin-status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-stone-300 text-stone-800"
                  >
                    <option value="All">All Statuses</option>
                    {STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>
                        Status: {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-4">
                  <label htmlFor="admin-program-filter" className="sr-only">
                    Filter by academic program
                  </label>
                  <select
                    id="admin-program-filter"
                    value={programFilter}
                    onChange={(e) => setProgramFilter(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-stone-300 text-stone-800"
                  >
                    <option value="All">All Academic Programs</option>
                    {ACADEMIC_PROGRAMS.map((p) => (
                      <option key={p.slug} value={p.title}>
                        {p.shortTitle}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Applications Table */}
          {activeTab === 'applications' ? (
            <div className="bg-white border border-stone-200 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 bg-[#FAF8F5] text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
                    <th className="py-3.5 px-4">Reference &amp; Date</th>
                    <th className="py-3.5 px-4">Applicant Details</th>
                    <th className="py-3.5 px-4">Program &amp; Qualification</th>
                    <th className="py-3.5 px-4">Contact &amp; Visit</th>
                    <th className="py-3.5 px-4">Application Status</th>
                    <th className="py-3.5 px-4">Notes &amp; Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-xs">
                  {filteredApps.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-stone-500">
                        No applications match the current search or filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredApps.map((app) => (
                      <tr key={app.referenceId} className="hover:bg-[#FAF8F5]/60">
                        <td className="py-4 px-4 align-top whitespace-nowrap">
                          <div className="font-mono-tabular font-semibold text-[#0B192C]">
                            {app.referenceId}
                          </div>
                          <div className="text-[11px] text-stone-500 font-mono-tabular mt-0.5">
                            {new Date(app.submittedAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                          <div className="text-[10px] text-stone-500 mt-1 flex items-center gap-1">
                            <CheckCircle2
                              className="w-3 h-3 text-emerald-700"
                              aria-hidden="true"
                            />
                            <span>Verified Record</span>
                          </div>
                        </td>

                        <td className="py-4 px-4 align-top">
                          <div className="font-serif text-base font-semibold text-[#0B192C]">
                            {app.fullName}
                          </div>
                          <div className="space-y-0.5 mt-1 text-stone-600">
                            <a
                              href={`mailto:${app.email}`}
                              className="flex items-center gap-1 hover:text-[#0B192C]"
                            >
                              <Mail className="w-3 h-3 text-[#B48327]" aria-hidden="true" />
                              <span>{app.email}</span>
                            </a>
                            <a
                              href={`tel:${app.phone}`}
                              className="flex items-center gap-1 font-mono-tabular hover:text-[#0B192C]"
                            >
                              <Phone className="w-3 h-3 text-[#B48327]" aria-hidden="true" />
                              <span>{app.phone}</span>
                            </a>
                          </div>
                        </td>

                        <td className="py-4 px-4 align-top max-w-xs">
                          <div className="font-semibold text-[#0B192C] leading-snug">
                            {app.programOfInterest}
                          </div>
                          <div className="text-stone-500 mt-1">
                            Qualification: {app.currentQualification}
                          </div>
                          {app.message && (
                            <p className="text-stone-600 italic mt-1.5 bg-[#FAF8F5] p-2 border border-stone-200">
                              &ldquo;{app.message}&rdquo;
                            </p>
                          )}
                        </td>

                        <td className="py-4 px-4 align-top whitespace-nowrap">
                          <div className="text-stone-800">
                            Preferred: <strong>{app.preferredContactMethod}</strong>
                          </div>
                          <div className="mt-1 text-stone-600">
                            {app.campusVisitRequested ? (
                              <span className="text-[#B48327] font-semibold">
                                Campus Visit{' '}
                                {app.preferredVisitDate ? `(${app.preferredVisitDate})` : 'Requested'}
                              </span>
                            ) : (
                              <span>Standard Counselling</span>
                            )}
                          </div>
                        </td>

                        <td className="py-4 px-4 align-top whitespace-nowrap">
                          <label htmlFor={`status-${app.referenceId}`} className="sr-only">
                            Status for {app.fullName}
                          </label>
                          <select
                            id={`status-${app.referenceId}`}
                            value={app.status}
                            onChange={(e) =>
                              handleStatusChange(
                                app.referenceId,
                                e.target.value as ApplicationStatus
                              )
                            }
                            className="px-2.5 py-1.5 text-xs font-semibold border border-stone-300 bg-white text-[#0B192C] cursor-pointer"
                          >
                            {STATUS_OPTIONS.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="py-4 px-4 align-top">
                          {app.adminNotes && (
                            <p className="text-stone-600 mb-2 max-w-[200px] truncate" title={app.adminNotes}>
                              {app.adminNotes}
                            </p>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedApp(app);
                              setNotesDraft(app.adminNotes || '');
                            }}
                            className="px-3 py-1.5 text-xs font-medium border border-stone-300 text-[#0B192C] hover:border-[#0B192C] inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                          >
                            <FileText className="w-3 h-3 text-[#B48327]" aria-hidden="true" />
                            <span>{app.adminNotes ? 'Edit Notes' : 'Add Note'}</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            /* Contacts Table */
            <div className="bg-white border border-stone-200 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 bg-[#FAF8F5] text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
                    <th className="py-3.5 px-4">Reference</th>
                    <th className="py-3.5 px-4">Sender</th>
                    <th className="py-3.5 px-4">Department &amp; Type</th>
                    <th className="py-3.5 px-4">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-xs">
                  {contacts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-stone-500">
                        No general contact inquiries submitted yet.
                      </td>
                    </tr>
                  ) : (
                    contacts.map((cnt) => (
                      <tr key={cnt.referenceId} className="hover:bg-[#FAF8F5]/60">
                        <td className="py-4 px-4 font-mono-tabular font-semibold text-[#0B192C] whitespace-nowrap">
                          {cnt.referenceId}
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-semibold text-[#0B192C]">{cnt.fullName}</div>
                          <div className="text-stone-500">
                            {cnt.email} · {cnt.phone}
                          </div>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="font-medium text-stone-800">{cnt.department}</div>
                          <div className="text-[#B48327]">{cnt.inquiryType}</div>
                        </td>
                        <td className="py-4 px-4 text-stone-700 leading-relaxed max-w-md">
                          {cnt.message}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Counselor Notes Modal */}
      {selectedApp && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-notes-title"
        >
          <div className="bg-white border border-stone-300 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <div className="text-xs font-mono-tabular text-[#B48327] font-semibold">
                  {selectedApp.referenceId}
                </div>
                <h2 id="modal-notes-title" className="text-xl font-serif font-semibold text-[#0B192C]">
                  Application Details &amp; Counselor Notes — {selectedApp.fullName}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                aria-label="Close applicant notes dialog"
                className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="text-xs text-stone-700 space-y-1 bg-[#FAF8F5] p-3.5 border border-stone-200">
              <div>
                <strong>Program:</strong> {selectedApp.programOfInterest}
              </div>
              <div>
                <strong>Qualification:</strong> {selectedApp.currentQualification}
              </div>
              <div>
                <strong>Contact:</strong> {selectedApp.phone} · {selectedApp.email}
              </div>
            </div>

            <form onSubmit={handleSaveNotes} className="space-y-4">
              <div>
                <label
                  htmlFor="counselor-notes-input"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1"
                >
                  Counselor Evaluation &amp; Follow-up Notes
                </label>
                <textarea
                  id="counselor-notes-input"
                  rows={4}
                  value={notesDraft}
                  onChange={(e) => setNotesDraft(e.target.value)}
                  placeholder="Enter interview remarks, entrance test score details, or follow-up dates..."
                  className="w-full p-3 text-xs border border-stone-300 bg-[#FAF8F5] text-stone-900"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 text-xs font-medium border border-stone-300 text-stone-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingNotes}
                  className="px-4 py-2 text-xs font-semibold bg-[#0B192C] text-white hover:bg-[#162B49] cursor-pointer"
                >
                  {isSavingNotes ? 'Saving...' : 'Save Counselor Note'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
