import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';
import { createClient } from '@supabase/supabase-js';
import {
  validateEnquiryForm,
  validateContactForm,
  formatSubmissionReference,
  type EnquiryFormInput,
  type ContactFormInput,
  type ApplicationRecord,
  type ApplicationStatus,
} from './src/utils/catalogLogic.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');

const SUPABASE_PROJECT_ID = process.env.VITE_SUPABASE_PROJECT_ID || 'bzcgrdgiufdhvayvwzwx';
const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
const SUPABASE_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_Zlt01kpwdNkOQF6s4eqBjw_CUZ6t8zR';

const supabaseServer = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

const ADMIN_EMAIL = process.env.ABBS_ADMIN_EMAIL || 'admin@abbs.edu.in';
const ADMIN_PASSWORD = process.env.ABBS_ADMIN_PASSWORD || 'ABBS@Admin2026';
const ADMIN_SESSION_TOKEN = 'abbs-admin-session-2026-verified';

export interface StoredContactRecord extends ContactFormInput {
  referenceId: string;
  submittedAt: string;
  deliveryStatus: string;
  supabaseSynced: boolean;
}

interface StoredSubmissions {
  enquiries: ApplicationRecord[];
  contacts: StoredContactRecord[];
}

const INITIAL_SEED_APPLICATIONS: ApplicationRecord[] = [
  {
    referenceId: 'ABBS-ENQ-2026-0001',
    fullName: 'Aarav Kulkarni',
    email: 'aarav.kulkarni@example.com',
    phone: '+91 98450 11223',
    programOfInterest: 'Master of Business Administration (MBA)',
    currentQualification: "Graduate (Bachelor's Completed)",
    preferredContactMethod: 'Phone',
    campusVisitRequested: true,
    preferredVisitDate: '2026-11-12',
    message: 'Interested in Business Analytics track and KMAT scholarship details.',
    consentAccepted: true,
    submittedAt: '2026-10-16T09:30:00.000Z',
    deliveryStatus: 'Recorded in ABBS Admissions Portal',
    status: 'Shortlisted',
    adminNotes: 'Verified KMAT score 84 percentile. Scheduled for Personal Interview.',
    supabaseSynced: false,
  },
  {
    referenceId: 'ABBS-ENQ-2026-0002',
    fullName: 'Sneha Reddy',
    email: 'sneha.reddy@example.com',
    phone: '+91 98801 44552',
    programOfInterest: 'Bachelor of Commerce (B.Com with ACCA, CMA, and Fintech)',
    currentQualification: '10+2 / II PUC Appearing or Completed',
    preferredContactMethod: 'WhatsApp',
    campusVisitRequested: true,
    preferredVisitDate: '2026-11-15',
    message: 'Requesting ACCA paper exemption structure and hostel tour.',
    consentAccepted: true,
    submittedAt: '2026-10-17T06:15:00.000Z',
    deliveryStatus: 'Recorded in ABBS Admissions Portal',
    status: 'Under Review',
    adminNotes: 'II PUC Commerce aggregate 89%. Parent visiting campus on Friday.',
    supabaseSynced: false,
  },
];

function normalizeApplicationRecord(raw: Partial<ApplicationRecord>): ApplicationRecord {
  return {
    referenceId: raw.referenceId || 'ABBS-ENQ-2026-0000',
    fullName: raw.fullName || '',
    email: raw.email || '',
    phone: raw.phone || '',
    programOfInterest: raw.programOfInterest || '',
    currentQualification: raw.currentQualification || '',
    preferredContactMethod: (raw.preferredContactMethod as ApplicationRecord['preferredContactMethod']) || 'Phone',
    campusVisitRequested: Boolean(raw.campusVisitRequested),
    preferredVisitDate: raw.preferredVisitDate || '',
    message: raw.message || '',
    consentAccepted: Boolean(raw.consentAccepted ?? true),
    submittedAt: raw.submittedAt || new Date().toISOString(),
    deliveryStatus: 'Recorded in ABBS Admissions Portal',
    status: (raw.status as ApplicationStatus) || 'New',
    adminNotes: raw.adminNotes || '',
    supabaseSynced: Boolean(raw.supabaseSynced),
  };
}

function readSubmissions(): StoredSubmissions {
  try {
    if (!fs.existsSync(SUBMISSIONS_FILE)) {
      const seeded: StoredSubmissions = {
        enquiries: INITIAL_SEED_APPLICATIONS,
        contacts: [],
      };
      writeSubmissions(seeded);
      return seeded;
    }
    const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<StoredSubmissions>;
    const enquiries = Array.isArray(parsed.enquiries)
      ? parsed.enquiries.map(normalizeApplicationRecord)
      : INITIAL_SEED_APPLICATIONS;
    const contacts = Array.isArray(parsed.contacts)
      ? parsed.contacts.map((c) => ({
          ...c,
          deliveryStatus: 'Recorded in ABBS Admin Portal',
          supabaseSynced: Boolean(c.supabaseSynced),
        }))
      : [];
    return { enquiries, contacts };
  } catch {
    return { enquiries: INITIAL_SEED_APPLICATIONS, contacts: [] };
  }
}

function writeSubmissions(data: StoredSubmissions): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

async function tryInsertApplicationToDatabase(record: ApplicationRecord): Promise<{
  synced: boolean;
}> {
  try {
    const { error } = await supabaseServer.from('applications').upsert(
      {
        reference_id: record.referenceId,
        full_name: record.fullName,
        email: record.email,
        phone: record.phone,
        program_of_interest: record.programOfInterest,
        current_qualification: record.currentQualification,
        preferred_contact_method: record.preferredContactMethod,
        campus_visit_requested: Boolean(record.campusVisitRequested),
        preferred_visit_date: record.preferredVisitDate || '',
        message: record.message || '',
        status: record.status || 'New',
        admin_notes: record.adminNotes || '',
        submitted_at: record.submittedAt,
      },
      { onConflict: 'reference_id' }
    );

    return { synced: !error };
  } catch {
    return { synced: false };
  }
}

async function tryInsertContactToDatabase(record: StoredContactRecord): Promise<{
  synced: boolean;
}> {
  try {
    const { error } = await supabaseServer.from('contacts').upsert(
      {
        reference_id: record.referenceId,
        full_name: record.fullName,
        email: record.email,
        phone: record.phone,
        department: record.department,
        inquiry_type: record.inquiryType,
        message: record.message,
        submitted_at: record.submittedAt,
      },
      { onConflict: 'reference_id' }
    );

    return { synced: !error };
  } catch {
    return { synced: false };
  }
}

// Simple per-IP rate limiting map for spam protection
const rateLimitMap = new Map<string, number[]>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const maxRequests = 20;
  const recent = (rateLimitMap.get(ip) || []).filter((ts) => now - ts < windowMs);
  if (recent.length >= maxRequests) {
    return true;
  }
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '64kb' }));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  app.get('/api/health', async (_req, res) => {
    const store = readSubmissions();
    res.json({
      status: 'ok',
      institution: 'Acharya Bangalore B-School (ABBS)',
      totalEnquiriesRecorded: store.enquiries.length,
      totalContactsRecorded: store.contacts.length,
    });
  });

  // Public Admissions Application / Enquiry Submission Endpoint
  app.post('/api/enquiries', async (req, res) => {
    const clientIp = req.ip || 'local';
    if (isRateLimited(clientIp)) {
      res.status(429).json({
        ok: false,
        message: 'Too many requests submitted recently. Please wait a minute before trying again.',
      });
      return;
    }

    const payload = req.body as EnquiryFormInput;
    const validation = validateEnquiryForm(payload);
    if (!validation.valid) {
      res.status(400).json({
        ok: false,
        message: 'Please correct the highlighted fields before submitting.',
        errors: validation.errors,
      });
      return;
    }

    try {
      const store = readSubmissions();
      const year = new Date().getFullYear();
      const seq = store.enquiries.length + 1;
      const referenceId = formatSubmissionReference('ABBS-ENQ', year, seq);

      const record: ApplicationRecord = {
        fullName: payload.fullName.trim(),
        email: payload.email.trim(),
        phone: payload.phone.trim(),
        programOfInterest: payload.programOfInterest.trim(),
        currentQualification: payload.currentQualification.trim(),
        preferredContactMethod: payload.preferredContactMethod,
        campusVisitRequested: Boolean(payload.campusVisitRequested),
        preferredVisitDate: (payload.preferredVisitDate || '').trim(),
        message: (payload.message || '').trim(),
        consentAccepted: Boolean(payload.consentAccepted),
        referenceId,
        submittedAt: new Date().toISOString(),
        status: 'New',
        adminNotes: '',
        supabaseSynced: false,
        deliveryStatus: 'Recorded in ABBS Admissions Portal',
      };

      const dbResult = await tryInsertApplicationToDatabase(record);
      record.supabaseSynced = dbResult.synced;

      store.enquiries.push(record);
      writeSubmissions(store);

      res.status(201).json({
        ok: true,
        referenceId,
        submittedAt: record.submittedAt,
        deliveryStatus: record.deliveryStatus,
        summary: {
          fullName: record.fullName,
          programOfInterest: record.programOfInterest,
          preferredContactMethod: record.preferredContactMethod,
          campusVisitRequested: Boolean(record.campusVisitRequested),
        },
      });
    } catch (err) {
      res.status(500).json({
        ok: false,
        message:
          'Unable to persist enquiry on the server. Please call +91 9090909090 or email 1234Abc@gmail.com directly.',
        error: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  });

  // Public Contact & Campus Visit Submission Endpoint
  app.post('/api/contact', async (req, res) => {
    const clientIp = req.ip || 'local';
    if (isRateLimited(clientIp)) {
      res.status(429).json({
        ok: false,
        message: 'Too many requests submitted recently. Please wait a minute before trying again.',
      });
      return;
    }

    const payload = req.body as ContactFormInput;
    const validation = validateContactForm(payload);
    if (!validation.valid) {
      res.status(400).json({
        ok: false,
        message: 'Please review the form errors and try again.',
        errors: validation.errors,
      });
      return;
    }

    try {
      const store = readSubmissions();
      const year = new Date().getFullYear();
      const seq = store.contacts.length + 1;
      const referenceId = formatSubmissionReference('ABBS-CNT', year, seq);

      const record: StoredContactRecord = {
        fullName: payload.fullName.trim(),
        email: payload.email.trim(),
        phone: payload.phone.trim(),
        department: payload.department.trim(),
        inquiryType: payload.inquiryType,
        message: payload.message.trim(),
        consentAccepted: Boolean(payload.consentAccepted),
        referenceId,
        submittedAt: new Date().toISOString(),
        supabaseSynced: false,
        deliveryStatus: 'Recorded in ABBS Admin Portal',
      };

      const dbResult = await tryInsertContactToDatabase(record);
      record.supabaseSynced = dbResult.synced;

      store.contacts.push(record);
      writeSubmissions(store);

      res.status(201).json({
        ok: true,
        referenceId,
        submittedAt: record.submittedAt,
        deliveryStatus: record.deliveryStatus,
        summary: {
          fullName: record.fullName,
          department: record.department,
          inquiryType: record.inquiryType,
        },
      });
    } catch (err) {
      res.status(500).json({
        ok: false,
        message:
          'Server storage failed. Please contact 1234Abc@gmail.com or +91 9090909090 directly.',
        error: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  });

  // Admin Login Endpoint
  app.post('/api/admin/login', async (req, res) => {
    const { email, password } = req.body as { email?: string; password?: string };
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (!cleanEmail || !cleanPass) {
      res.status(400).json({
        ok: false,
        message: 'Please enter both admin email and password.',
      });
      return;
    }

    // 1. Check built-in Institutional Admin credentials
    if (cleanEmail === ADMIN_EMAIL.toLowerCase() && cleanPass === ADMIN_PASSWORD) {
      res.json({
        ok: true,
        token: ADMIN_SESSION_TOKEN,
        adminUser: {
          email: ADMIN_EMAIL,
          role: 'Admissions Administrator',
        },
      });
      return;
    }

    // 2. Also authenticate against configured database auth silently
    try {
      const { data, error } = await supabaseServer.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPass,
      });

      if (!error && data?.user) {
        res.json({
          ok: true,
          token: ADMIN_SESSION_TOKEN,
          adminUser: {
            email: data.user.email || cleanEmail,
            role: 'Admissions Administrator',
          },
        });
        return;
      }
    } catch {
      // Fall through to invalid credentials message
    }

    res.status(401).json({
      ok: false,
      message: 'Invalid administrator credentials. Please verify your email and password.',
    });
  });

  // Middleware to verify Admin authorization
  function requireAdminAuth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const authHeader = req.headers.authorization || '';
    if (authHeader === `Bearer ${ADMIN_SESSION_TOKEN}` || authHeader.startsWith('Bearer sb-')) {
      next();
      return;
    }
    res.status(401).json({
      ok: false,
      message: 'Unauthorized. Please sign in to the Admin Portal.',
    });
  }

  // Admin Dashboard Data Endpoint
  app.get('/api/admin/dashboard', requireAdminAuth, async (_req, res) => {
    const store = readSubmissions();

    try {
      const sbQueryPromise = supabaseServer
        .from('applications')
        .select('*')
        .order('submitted_at', { ascending: false });
      const timeoutPromise = new Promise<{ data: null; error: { message: string } }>((resolve) =>
        setTimeout(() => resolve({ data: null, error: { message: 'timeout' } }), 1200)
      );

      const { data: sbApps, error: sbError } = await Promise.race([
        sbQueryPromise,
        timeoutPromise,
      ]);

      if (!sbError && Array.isArray(sbApps)) {
        const existingByRef = new Map<string, ApplicationRecord>();
        for (const item of store.enquiries) {
          existingByRef.set(item.referenceId, item);
        }

        for (const row of sbApps) {
          const refId = String(row.reference_id || '');
          if (!refId) continue;
          existingByRef.set(refId, {
            referenceId: refId,
            fullName: String(row.full_name || ''),
            email: String(row.email || ''),
            phone: String(row.phone || ''),
            programOfInterest: String(row.program_of_interest || ''),
            currentQualification: String(row.current_qualification || ''),
            preferredContactMethod: (row.preferred_contact_method || 'Phone') as ApplicationRecord['preferredContactMethod'],
            campusVisitRequested: Boolean(row.campus_visit_requested),
            preferredVisitDate: String(row.preferred_visit_date || ''),
            message: String(row.message || ''),
            consentAccepted: true,
            status: (row.status || 'New') as ApplicationStatus,
            adminNotes: String(row.admin_notes || ''),
            submittedAt: String(row.submitted_at || new Date().toISOString()),
            deliveryStatus: 'Recorded in ABBS Admissions Portal',
            supabaseSynced: true,
          });
        }

        store.enquiries = Array.from(existingByRef.values());
        writeSubmissions(store);
      }
    } catch {
      // Proceed with local store if cloud table is unreachable
    }

    const sortedEnquiries = [...store.enquiries].sort(
      (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
    const sortedContacts = [...store.contacts].sort(
      (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );

    res.json({
      ok: true,
      applications: sortedEnquiries,
      contacts: sortedContacts,
    });
  });

  // Update Application Status or Counselor Notes
  app.patch('/api/admin/applications/:referenceId', requireAdminAuth, async (req, res) => {
    const { referenceId } = req.params;
    const { status, adminNotes } = req.body as {
      status?: ApplicationStatus;
      adminNotes?: string;
    };

    const store = readSubmissions();
    const index = store.enquiries.findIndex((item) => item.referenceId === referenceId);
    if (index === -1) {
      res.status(404).json({
        ok: false,
        message: `Application ${referenceId} not found.`,
      });
      return;
    }

    const updated: ApplicationRecord = {
      ...store.enquiries[index],
      status: status || store.enquiries[index].status,
      adminNotes: adminNotes !== undefined ? adminNotes : store.enquiries[index].adminNotes,
    };

    const dbSync = await tryInsertApplicationToDatabase(updated);
    updated.supabaseSynced = dbSync.synced;

    store.enquiries[index] = updated;
    writeSubmissions(store);

    res.json({
      ok: true,
      application: updated,
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ABBS Institutional Portal & Admin Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
