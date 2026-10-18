import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
} from 'lucide-react';
import { OFFICIAL_CONTACT } from '../data/abbsData';
import { validateContactForm, type ContactFormInput } from '../utils/catalogLogic';
import { SEOHead } from '../components/SEOHead';

interface ContactReceipt {
  referenceId: string;
  submittedAt: string;
  deliveryStatus: string;
  summary: {
    fullName: string;
    department: string;
    inquiryType: string;
  };
}

export const ContactPage: React.FC = () => {
  const location = useLocation();
  const [formData, setFormData] = useState<ContactFormInput>({
    fullName: '',
    email: '',
    phone: '',
    department: location.hash === '#visit-form' ? 'Campus Visit Coordinator' : 'Admissions Office',
    inquiryType: location.hash === '#visit-form' ? 'Campus Visit' : 'General Enquiry',
    message: '',
    consentAccepted: false,
    honeypot: '',
  });

  useEffect(() => {
    if (location.hash === '#visit-form') {
      setFormData((prev) => ({
        ...prev,
        department: 'Campus Visit Coordinator',
        inquiryType: 'Campus Visit',
      }));
    }
  }, [location.hash]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<ContactReceipt | null>(null);

  const handleChange = (field: keyof ContactFormInput, value: string | boolean) => {
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

    const validation = validateContactForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
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
            'Could not record your message. Please call +91 9090909090 or email 1234Abc@gmail.com.'
        );
        setIsSubmitting(false);
        return;
      }

      setReceipt({
        referenceId: data.referenceId,
        submittedAt: data.submittedAt,
        deliveryStatus: data.deliveryStatus,
        summary: data.summary,
      });
    } catch {
      setServerError(
        'Network error connecting to the ABBS server. Please call +91 9090909090 or email 1234Abc@gmail.com directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Contact Us & Campus Directions | Acharya Bangalore B-School (ABBS)"
        description="Contact Acharya Bangalore B-School (ABBS) at Andrahalli Main Road, Off Magadi Road, Bengaluru 560091. Call +91 9090909090 or email 1234Abc@gmail.com."
      />

      {/* Page Hero */}
      <section className="bg-[#07111E] text-white py-14 lg:py-20 border-b border-stone-800">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#E5C675] font-semibold">
              Official Campus Address &amp; Communications
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-white leading-tight">
              Contact Acharya Bangalore B-School
            </h1>
            <p className="text-base text-stone-300 leading-relaxed">
              Reach out to our Admissions Desk, Academic Administration, or Corporate Relations Cell
              in Bengaluru, or schedule an in-person campus visit.
            </p>
          </div>
        </div>
      </section>

      {/* Verified Contact Cards & Directions */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-stone-200">
            {/* Campus Address */}
            <div className="p-6 lg:p-8 border-r border-b border-stone-200 bg-[#FAF8F5] space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#B48327]">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>Campus Address</span>
              </div>
              <h2 className="text-xl font-serif font-semibold text-[#0B192C]">
                Bengaluru Campus
              </h2>
              <p className="text-xs text-stone-700 leading-relaxed">
                {OFFICIAL_CONTACT.addressLine1},<br />
                {OFFICIAL_CONTACT.addressLine2}
              </p>
              <div className="pt-2">
                <a
                  href={OFFICIAL_CONTACT.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B192C] hover:text-[#B48327]"
                >
                  <span>Open Directions in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Click-to-Call Phone Numbers */}
            <div className="p-6 lg:p-8 border-r border-b border-stone-200 bg-[#FAF8F5] space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#B48327]">
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>Telephone Lines</span>
              </div>
              <h2 className="text-xl font-serif font-semibold text-[#0B192C]">
                Admissions &amp; Reception
              </h2>
              <div className="space-y-2 pt-1 text-sm font-mono-tabular">
                <div>
                  <a
                    href={`tel:${OFFICIAL_CONTACT.primaryPhoneTel}`}
                    className="font-semibold text-[#0B192C] hover:text-[#B48327] underline underline-offset-4"
                  >
                    {OFFICIAL_CONTACT.phones[0]}
                  </a>
                  <span className="block text-[11px] font-sans text-stone-500">
                    Primary Admissions Helpline
                  </span>
                </div>
                <div>
                  <a
                    href={`tel:${OFFICIAL_CONTACT.secondaryPhoneTel}`}
                    className="font-semibold text-[#0B192C] hover:text-[#B48327] underline underline-offset-4"
                  >
                    {OFFICIAL_CONTACT.phones[1]}
                  </a>
                  <span className="block text-[11px] font-sans text-stone-500">
                    Campus Landline (Bengaluru)
                  </span>
                </div>
              </div>
            </div>

            {/* Email & Official Web */}
            <div className="p-6 lg:p-8 border-r border-b border-stone-200 bg-[#FAF8F5] space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#B48327]">
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Electronic Mail &amp; Web</span>
              </div>
              <h2 className="text-xl font-serif font-semibold text-[#0B192C]">
                Official Correspondence
              </h2>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-stone-500 block">Admissions Email:</span>
                  <a
                    href={`mailto:${OFFICIAL_CONTACT.email}`}
                    className="text-sm font-semibold text-[#0B192C] hover:text-[#B48327] underline underline-offset-4"
                  >
                    {OFFICIAL_CONTACT.email}
                  </a>
                </div>
                <div className="pt-1">
                  <span className="text-stone-500 block">Official Website:</span>
                  <a
                    href={OFFICIAL_CONTACT.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[#0B192C] hover:text-[#B48327]"
                  >
                    <span>{OFFICIAL_CONTACT.website}</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            {/* Visiting Hours Verification Note */}
            <div className="p-6 lg:p-8 border-r border-b border-stone-200 bg-[#FAF8F5] space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#B48327]">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>Campus Visiting Hours</span>
              </div>
              <h2 className="text-xl font-serif font-semibold text-[#0B192C]">
                Prior Appointment Note
              </h2>
              <p className="text-xs text-stone-600 leading-relaxed">
                {OFFICIAL_CONTACT.officeHoursNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Campus Directions Map Overview */}
      <section id="enquiry-section" className="py-16 lg:py-24 bg-[#FAF8F5]">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Contact & Campus Visit Form (7 cols) */}
            <div className="lg:col-span-7" id="visit-form">
              {receipt ? (
                <div
                  className="bg-white border border-stone-300 p-8 space-y-4"
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="space-y-3">
                      <div className="text-xs uppercase tracking-widest text-emerald-800 font-semibold">
                        Backend Contact Record Confirmed
                      </div>
                      <h3 className="text-2xl font-serif font-semibold text-[#0B192C]">
                        Message Recorded — {receipt.referenceId}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Thank you, {receipt.summary.fullName}. Your {receipt.summary.inquiryType}{' '}
                        directed to the {receipt.summary.department} has been saved in the ABBS
                        backend registry.
                      </p>
                      <div className="p-3.5 bg-[#FAF8F5] border border-stone-200 text-xs text-stone-700">
                        <strong>Delivery Status: </strong>
                        {receipt.deliveryStatus}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setReceipt(null);
                          setFormData((prev) => ({
                            ...prev,
                            message: '',
                            consentAccepted: false,
                          }));
                        }}
                        className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#0B192C] text-white cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-stone-300 p-6 lg:p-8">
                  <div className="mb-6 border-b border-stone-200 pb-4">
                    <p className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
                      Direct Institutional Inquiry &amp; Campus Visit Request
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#0B192C] mt-1">
                      Send a Message or Book a Campus Visit
                    </h2>
                    <p className="text-xs text-stone-600 mt-1">
                      Select &ldquo;Campus Visit&rdquo; below if you wish to schedule a guided tour
                      of the Bengaluru campus.
                    </p>
                  </div>

                  {serverError && (
                    <div
                      className="mb-6 p-4 bg-red-50 border border-red-300 text-xs text-red-900 flex items-start gap-2.5"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="cnt-honeypot">Do not fill</label>
                      <input
                        id="cnt-honeypot"
                        type="text"
                        tabIndex={-1}
                        value={formData.honeypot || ''}
                        onChange={(e) => handleChange('honeypot', e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="cnt-fullName"
                          className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
                        >
                          Full Name <span className="text-red-700">*</span>
                        </label>
                        <input
                          id="cnt-fullName"
                          type="text"
                          required
                          placeholder="Your full name"
                          value={formData.fullName}
                          onChange={(e) => handleChange('fullName', e.target.value)}
                          aria-invalid={Boolean(errors.fullName)}
                          className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border ${
                            errors.fullName ? 'border-red-600' : 'border-stone-300'
                          }`}
                        />
                        {errors.fullName && (
                          <p role="alert" className="mt-1 text-xs text-red-700">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="cnt-email"
                          className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
                        >
                          Email Address <span className="text-red-700">*</span>
                        </label>
                        <input
                          id="cnt-email"
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          aria-invalid={Boolean(errors.email)}
                          className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border ${
                            errors.email ? 'border-red-600' : 'border-stone-300'
                          }`}
                        />
                        {errors.email && (
                          <p role="alert" className="mt-1 text-xs text-red-700">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="cnt-phone"
                          className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
                        >
                          Phone Number <span className="text-red-700">*</span>
                        </label>
                        <input
                          id="cnt-phone"
                          type="tel"
                          required
                          placeholder="+91 98450 00000"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          aria-invalid={Boolean(errors.phone)}
                          className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border font-mono-tabular ${
                            errors.phone ? 'border-red-600' : 'border-stone-300'
                          }`}
                        />
                        {errors.phone && (
                          <p role="alert" className="mt-1 text-xs text-red-700">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="cnt-department"
                          className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
                        >
                          Department / Office <span className="text-red-700">*</span>
                        </label>
                        <select
                          id="cnt-department"
                          value={formData.department}
                          onChange={(e) => handleChange('department', e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-stone-300"
                        >
                          <option value="Admissions Office">Admissions Office</option>
                          <option value="Campus Visit Coordinator">Campus Visit Coordinator</option>
                          <option value="Placement & Career Cell">Placement &amp; Career Cell</option>
                          <option value="Research & Ph.D. Cell">Research &amp; Ph.D. Cell</option>
                          <option value="General Administration">General Administration</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                        Inquiry Category
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {(
                          [
                            'General Enquiry',
                            'Campus Visit',
                            'Academic Collaboration',
                            'Placement Cell',
                          ] as const
                        ).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => handleChange('inquiryType', type)}
                            aria-pressed={formData.inquiryType === type}
                            className={`px-3.5 py-1.5 text-xs font-semibold border cursor-pointer ${
                              formData.inquiryType === type
                                ? 'bg-[#0B192C] text-white border-[#0B192C]'
                                : 'bg-[#FAF8F5] text-stone-700 border-stone-300'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="cnt-message"
                        className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
                      >
                        Message / Preferred Visit Date &amp; Details <span className="text-red-700">*</span>
                      </label>
                      <textarea
                        id="cnt-message"
                        rows={4}
                        required
                        placeholder="Please share your query, program of interest, or preferred date and time for a campus visit..."
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        aria-invalid={Boolean(errors.message)}
                        className={`w-full p-3.5 text-sm bg-[#FAF8F5] border ${
                          errors.message ? 'border-red-600' : 'border-stone-300'
                        }`}
                      />
                      {errors.message && (
                        <p role="alert" className="mt-1 text-xs text-red-700">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-start gap-2.5">
                        <input
                          id="cnt-consent"
                          type="checkbox"
                          checked={formData.consentAccepted}
                          onChange={(e) => handleChange('consentAccepted', e.target.checked)}
                          className="mt-1 w-4 h-4 accent-[#0B192C] cursor-pointer"
                        />
                        <label htmlFor="cnt-consent" className="text-xs text-stone-600 cursor-pointer">
                          I consent to Acharya Bangalore B-School storing and processing this inquiry
                          to respond to my request. <span className="text-red-700">*</span>
                        </label>
                      </div>
                      {errors.consentAccepted && (
                        <p role="alert" className="mt-1 text-xs text-red-700">
                          {errors.consentAccepted}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 text-xs font-semibold uppercase tracking-wider bg-[#0B192C] text-white hover:bg-[#162B49] inline-flex items-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Submit Inquiry</span>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Right Column: How to Reach & Location Guide (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-stone-200 p-6 lg:p-8 space-y-4">
                <div className="text-xs uppercase tracking-widest text-[#B48327] font-semibold">
                  Location &amp; Transit Guide
                </div>
                <h3 className="text-2xl font-serif font-semibold text-[#0B192C]">
                  Reaching ABBS in Bengaluru
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  The Acharya Bangalore B-School campus is situated at{' '}
                  <strong>{OFFICIAL_CONTACT.fullAddress}</strong>, accessible via Magadi Main Road,
                  NICE Ring Road, and Outer Ring Road corridors in West Bengaluru.
                </p>

                <dl className="space-y-3 pt-2 border-t border-stone-200 text-xs">
                  <div>
                    <dt className="font-semibold text-[#0B192C]">Road &amp; Bus Connectivity</dt>
                    <dd className="text-stone-600 mt-0.5">
                      Frequent BMTC buses operate from Majestic (Kempegowda Bus Station) and
                      Vijayanagar toward Magadi Road / Andrahalli Main Road.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#0B192C]">Metro &amp; Rail Access</dt>
                    <dd className="text-stone-600 mt-0.5">
                      Connected via the Namma Metro Purple &amp; Green Line stations with feeder
                      bus and cab availability to Andrahalli Main Road.
                    </dd>
                  </div>
                </dl>

                <div className="pt-3">
                  <a
                    href={OFFICIAL_CONTACT.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-[#0B192C] text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 hover:bg-[#162B49]"
                  >
                    <span>Launch Google Maps Route Planner</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
