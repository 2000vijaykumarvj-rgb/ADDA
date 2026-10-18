import { supabase } from '../lib/supabase';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, Loader2, PhoneCall, Mail } from 'lucide-react';
import { ACADEMIC_PROGRAMS, OFFICIAL_CONTACT } from '../data/abbsData';
import { validateEnquiryForm, type EnquiryFormInput } from '../utils/catalogLogic';

interface EnquiryFormProps {
  defaultProgram?: string;
  defaultCampusVisit?: boolean;
  heading?: string;
  subheading?: string;
  compact?: boolean;
}

interface SubmissionReceipt {
  referenceId: string;
  submittedAt: string;
  deliveryStatus: string;
  smtpConfigured: boolean;
  summary: {
    fullName: string;
    programOfInterest: string;
    preferredContactMethod: string;
    campusVisitRequested: boolean;
  };
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  defaultProgram = '',
  defaultCampusVisit = false,
  heading = 'Admissions & Program Enquiry',
  subheading = 'Submit your academic details below. Enquiries are validated and logged in the ABBS Admissions Registry.',
  compact = false,
}) => {
  const [formData, setFormData] = useState<EnquiryFormInput>({
    fullName: '',
    email: '',
    phone: '',
    programOfInterest: defaultProgram,
    currentQualification: '',
    preferredContactMethod: 'Phone',
    campusVisitRequested: defaultCampusVisit,
    preferredVisitDate: '',
    message: '',
    consentAccepted: false,
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (defaultProgram) {
      setFormData((prev) => ({ ...prev, programOfInterest: defaultProgram }));
    }
  }, [defaultProgram]);

  const handleChange = (
    field: keyof EnquiryFormInput,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const validation = validateEnquiryForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setServerError(
          data.message ||
            'The server could not confirm your submission. Please verify your inputs or contact 1234Abc@gmail.com directly.'
        );
        setIsSubmitting(false);
        return;
      }

      setReceipt({
        referenceId: data.referenceId,
        submittedAt: data.submittedAt,
        deliveryStatus: data.deliveryStatus,
        smtpConfigured: Boolean(data.smtpConfigured),
        summary: data.summary,
      });
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
    } catch (apiErr) {
      console.warn('API error, falling back directly to Supabase...', apiErr);
      try {
        const seq = Math.floor(1000 + Math.random() * 9000);
        const refId = 'ABBS-ENQ-' + new Date().getFullYear() + '-' + seq;
        const { error: sbError } = await supabase.from('applications').insert({
          reference_id: refId,
          full_name: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          program_of_interest: formData.programOfInterest.trim(),
          current_qualification: formData.currentQualification.trim(),
          preferred_contact_method: formData.preferredContactMethod,
          campus_visit_requested: Boolean(formData.campusVisitRequested),
          preferred_visit_date: formData.preferredVisitDate || '',
          message: formData.message || '',
          status: 'New',
          admin_notes: 'Direct Supabase Portal Client',
          submitted_at: new Date().toISOString(),
        });

        if (!sbError) {
          setReceipt({
            referenceId: refId,
            submittedAt: new Date().toISOString(),
            deliveryStatus: 'Recorded in ABBS Admissions Portal',
            smtpConfigured: false,
            summary: {
              fullName: formData.fullName,
              programOfInterest: formData.programOfInterest,
              preferredContactMethod: formData.preferredContactMethod,
              campusVisitRequested: Boolean(formData.campusVisitRequested),
            },
          });
          setTimeout(() => {
            containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 50);
          return;
        }
      } catch (sbErr) {
        console.error('Supabase fallback error:', sbErr);
      }
      setServerError(
        'Network error while connecting to the ABBS Admissions Server. No enquiry was recorded. Please call +91 9090909090 or email 1234Abc@gmail.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (receipt) {
    return (
      <div
        ref={containerRef}
        className="border border-stone-300 bg-white p-6 md:p-8"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-3 w-full">
            <div className="text-xs uppercase tracking-widest text-emerald-800 font-semibold">
              Backend Submission Confirmed
            </div>
            <h3 className="text-2xl font-serif font-semibold text-[#0B192C]">
              Thank you, {receipt.summary.fullName}
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed">
              Your admission enquiry has been validated and persisted by the ABBS backend server.
              Please retain your reference code for counselling correspondence.
            </p>

            <dl className="border-t border-b border-stone-200 py-4 my-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs text-stone-500">Enquiry Reference ID</dt>
                <dd className="font-mono-tabular font-semibold text-[#0B192C] mt-0.5">
                  {receipt.referenceId}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-stone-500">Program Selected</dt>
                <dd className="font-medium text-stone-900 mt-0.5">
                  {receipt.summary.programOfInterest}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-stone-500">Preferred Contact Channel</dt>
                <dd className="text-stone-800 mt-0.5">{receipt.summary.preferredContactMethod}</dd>
              </div>
              <div>
                <dt className="text-xs text-stone-500">Campus Visit Requested</dt>
                <dd className="text-stone-800 mt-0.5">
                  {receipt.summary.campusVisitRequested ? 'Yes — Campus Tour Requested' : 'Standard Counselling'}
                </dd>
              </div>
            </dl>

            <div className="bg-[#FAF8F5] border border-stone-200 p-3.5 text-xs text-stone-700 leading-relaxed">
              <strong className="font-semibold text-[#0B192C]">Delivery &amp; Service Note: </strong>
              {receipt.deliveryStatus}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setReceipt(null);
                  setFormData((prev) => ({
                    ...prev,
                    fullName: '',
                    email: '',
                    phone: '',
                    message: '',
                    consentAccepted: false,
                  }));
                }}
                className="px-4 py-2 text-xs font-semibold text-[#0B192C] border border-[#0B192C] hover:bg-[#0B192C] hover:text-white transition-colors cursor-pointer"
              >
                Submit Another Enquiry
              </button>
              <a
                href={`tel:${OFFICIAL_CONTACT.primaryPhoneTel}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-700 hover:text-[#0B192C]"
              >
                <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Call {OFFICIAL_CONTACT.phones[0]}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-stone-300 bg-white p-6 md:p-8">
      <div className="mb-6 border-b border-stone-200 pb-4">
        <p className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
          Official Admissions Desk · Bengaluru
        </p>
        <h3 className="text-2xl md:text-3xl font-serif font-semibold text-[#0B192C] mt-1">
          {heading}
        </h3>
        <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">{subheading}</p>
      </div>

      {serverError && (
        <div
          className="mb-6 border border-red-300 bg-red-50 p-4 flex items-start gap-3 text-sm text-red-900"
          role="alert"
        >
          <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-semibold">Submission Error</p>
            <p className="mt-0.5 text-xs leading-relaxed">{serverError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Honeypot anti-spam field */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="abbs-website-url">Leave this field blank</label>
          <input
            id="abbs-website-url"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.honeypot || ''}
            onChange={(e) => handleChange('honeypot', e.target.value)}
          />
        </div>

        <div className={`grid grid-cols-1 ${compact ? '' : 'md:grid-cols-2'} gap-5`}>
          <div>
            <label
              htmlFor="enq-fullName"
              className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
            >
              Full Name <span className="text-red-700">*</span>
            </label>
            <input
              id="enq-fullName"
              name="fullName"
              type="text"
              required
              placeholder="e.g., Rohan Deshmukh"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'err-fullName' : undefined}
              className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border ${
                errors.fullName ? 'border-red-600' : 'border-stone-300 focus:border-[#0B192C]'
              } text-stone-900 focus:outline-none`}
            />
            {errors.fullName && (
              <p id="err-fullName" role="alert" className="mt-1 text-xs text-red-700">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="enq-email"
              className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
            >
              Email Address <span className="text-red-700">*</span>
            </label>
            <input
              id="enq-email"
              name="email"
              type="email"
              required
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'err-email' : undefined}
              className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border ${
                errors.email ? 'border-red-600' : 'border-stone-300 focus:border-[#0B192C]'
              } text-stone-900 focus:outline-none`}
            />
            {errors.email && (
              <p id="err-email" role="alert" className="mt-1 text-xs text-red-700">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className={`grid grid-cols-1 ${compact ? '' : 'md:grid-cols-2'} gap-5`}>
          <div>
            <label
              htmlFor="enq-phone"
              className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
            >
              Phone Number <span className="text-red-700">*</span>
            </label>
            <input
              id="enq-phone"
              name="phone"
              type="tel"
              required
              placeholder="+91 98450 00000"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'err-phone' : undefined}
              className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border font-mono-tabular ${
                errors.phone ? 'border-red-600' : 'border-stone-300 focus:border-[#0B192C]'
              } text-stone-900 focus:outline-none`}
            />
            {errors.phone && (
              <p id="err-phone" role="alert" className="mt-1 text-xs text-red-700">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="enq-program"
              className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
            >
              Program of Interest <span className="text-red-700">*</span>
            </label>
            <select
              id="enq-program"
              name="programOfInterest"
              required
              value={formData.programOfInterest}
              onChange={(e) => handleChange('programOfInterest', e.target.value)}
              aria-invalid={Boolean(errors.programOfInterest)}
              aria-describedby={errors.programOfInterest ? 'err-program' : undefined}
              className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border ${
                errors.programOfInterest ? 'border-red-600' : 'border-stone-300 focus:border-[#0B192C]'
              } text-stone-900 focus:outline-none`}
            >
              <option value="">Select an Academic Program</option>
              <optgroup label="Postgraduate Programs">
                {ACADEMIC_PROGRAMS.filter((p) => p.level === 'Postgraduate').map((prog) => (
                  <option key={prog.slug} value={prog.title}>
                    {prog.shortTitle} — {prog.specializations.slice(0, 3).join(', ')}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Undergraduate Programs">
                {ACADEMIC_PROGRAMS.filter((p) => p.level === 'Undergraduate').map((prog) => (
                  <option key={prog.slug} value={prog.title}>
                    {prog.shortTitle} — {prog.specializations.slice(0, 3).join(', ')}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Doctoral Program">
                {ACADEMIC_PROGRAMS.filter((p) => p.level === 'Doctoral').map((prog) => (
                  <option key={prog.slug} value={prog.title}>
                    {prog.title}
                  </option>
                ))}
              </optgroup>
            </select>
            {errors.programOfInterest && (
              <p id="err-program" role="alert" className="mt-1 text-xs text-red-700">
                {errors.programOfInterest}
              </p>
            )}
          </div>
        </div>

        <div className={`grid grid-cols-1 ${compact ? '' : 'md:grid-cols-2'} gap-5`}>
          <div>
            <label
              htmlFor="enq-qualification"
              className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
            >
              Current Qualification <span className="text-red-700">*</span>
            </label>
            <select
              id="enq-qualification"
              name="currentQualification"
              required
              value={formData.currentQualification}
              onChange={(e) => handleChange('currentQualification', e.target.value)}
              aria-invalid={Boolean(errors.currentQualification)}
              aria-describedby={errors.currentQualification ? 'err-qualification' : undefined}
              className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border ${
                errors.currentQualification
                  ? 'border-red-600'
                  : 'border-stone-300 focus:border-[#0B192C]'
              } text-stone-900 focus:outline-none`}
            >
              <option value="">Select Current Qualification</option>
              <option value="10+2 / II PUC Appearing or Completed">
                10+2 / II PUC (Appearing or Completed)
              </option>
              <option value="Undergraduate Final Year">
                Undergraduate — Final Year Student
              </option>
              <option value="Graduate (Bachelor's Completed)">
                Graduate (Bachelor’s Degree Completed)
              </option>
              <option value="Postgraduate Completed (For Ph.D.)">
                Postgraduate Degree Completed (For Ph.D.)
              </option>
              <option value="Working Professional">
                Working Professional (1+ Years Experience)
              </option>
            </select>
            {errors.currentQualification && (
              <p id="err-qualification" role="alert" className="mt-1 text-xs text-red-700">
                {errors.currentQualification}
              </p>
            )}
          </div>

          <div>
            <fieldset>
              <legend className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                Preferred Contact Method <span className="text-red-700">*</span>
              </legend>
              <div className="grid grid-cols-3 gap-2 pt-0.5">
                {(['Phone', 'Email', 'WhatsApp'] as const).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => handleChange('preferredContactMethod', method)}
                    aria-pressed={formData.preferredContactMethod === method}
                    className={`py-2 px-3 text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                      formData.preferredContactMethod === method
                        ? 'bg-[#0B192C] text-white border-[#0B192C]'
                        : 'bg-[#FAF8F5] text-stone-700 border-stone-300 hover:border-stone-500'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
              {errors.preferredContactMethod && (
                <p role="alert" className="mt-1 text-xs text-red-700">
                  {errors.preferredContactMethod}
                </p>
              )}
            </fieldset>
          </div>
        </div>

        {/* Optional Campus Visit scheduling & Questions */}
        <div className="border border-stone-200 bg-[#FAF8F5] p-4 space-y-3">
          <div className="flex items-center gap-2.5">
            <input
              id="enq-campusVisit"
              type="checkbox"
              checked={Boolean(formData.campusVisitRequested)}
              onChange={(e) => handleChange('campusVisitRequested', e.target.checked)}
              className="w-4 h-4 accent-[#0B192C] cursor-pointer"
            />
            <label htmlFor="enq-campusVisit" className="text-xs font-semibold text-[#0B192C] cursor-pointer">
              I would also like to schedule a guided Campus Visit in Bengaluru
            </label>
          </div>

          <div className={`grid grid-cols-1 ${formData.campusVisitRequested ? 'sm:grid-cols-2' : ''} gap-4 pt-1`}>
            {formData.campusVisitRequested && (
              <div>
                <label htmlFor="enq-visitDate" className="block text-xs text-stone-600 mb-1">
                  Preferred Visit Date (Optional)
                </label>
                <input
                  id="enq-visitDate"
                  type="date"
                  value={formData.preferredVisitDate || ''}
                  onChange={(e) => handleChange('preferredVisitDate', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 text-stone-800"
                />
              </div>
            )}
            <div>
              <label htmlFor="enq-message" className="block text-xs text-stone-600 mb-1">
                Specific Questions (Entrance Exam / Hostel / Fee Structure — Optional)
              </label>
              <input
                id="enq-message"
                type="text"
                placeholder="Optional note or question for the Admissions Counselor..."
                value={formData.message || ''}
                onChange={(e) => handleChange('message', e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 text-stone-800"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-start gap-2.5">
            <input
              id="enq-consent"
              name="consentAccepted"
              type="checkbox"
              checked={formData.consentAccepted}
              onChange={(e) => handleChange('consentAccepted', e.target.checked)}
              aria-invalid={Boolean(errors.consentAccepted)}
              aria-describedby={errors.consentAccepted ? 'err-consent' : undefined}
              className="mt-1 w-4 h-4 accent-[#0B192C] shrink-0 cursor-pointer"
            />
            <label htmlFor="enq-consent" className="text-xs text-stone-600 leading-relaxed cursor-pointer">
              I authorize Acharya Bangalore B-School (ABBS), Bengaluru to contact me via phone,
              email, or WhatsApp regarding admissions, academic programs, and campus visit updates.{' '}
              <span className="text-red-700">*</span>
            </label>
          </div>
          {errors.consentAccepted && (
            <p id="err-consent" role="alert" className="mt-1.5 text-xs text-red-700">
              {errors.consentAccepted}
            </p>
          )}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-stone-200">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#0B192C] hover:bg-[#162B49] disabled:opacity-60 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                <span>Verifying &amp; Recording...</span>
              </>
            ) : (
              <span>Submit Official Enquiry</span>
            )}
          </button>

          <div className="text-xs text-stone-500 flex flex-wrap items-center gap-3">
            <a
              href={`tel:${OFFICIAL_CONTACT.primaryPhoneTel}`}
              className="inline-flex items-center gap-1 hover:text-[#0B192C]"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#B48327]" aria-hidden="true" />
              <span className="font-mono-tabular">{OFFICIAL_CONTACT.phones[0]}</span>
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={`mailto:${OFFICIAL_CONTACT.email}`}
              className="inline-flex items-center gap-1 hover:text-[#0B192C]"
            >
              <Mail className="w-3.5 h-3.5 text-[#B48327]" aria-hidden="true" />
              <span>{OFFICIAL_CONTACT.email}</span>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};
