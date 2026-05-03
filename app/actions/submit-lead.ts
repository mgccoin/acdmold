'use server';

import { headers } from 'next/headers';

export type LeadFormState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};

const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL || '';
const SHARED_SECRET = process.env.LEAD_WEBHOOK_SECRET || '';

const SERVICES = [
  'Mold Inspection',
  'Mold Testing',
  'Mold Remediation',
  'Black Mold Removal',
  'Post-Remediation Clearance',
  'Emergency / Same-day',
  'Other',
];

// In-memory rate limit (resets on server restart). Adequate for this form;
// upgrade to Upstash/Redis if you need persistence across deploys.
const submissions = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  submissions.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function sanitize(input: FormDataEntryValue | null, max = 500): string {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[\u0000-\u001f\u007f]/g, '').slice(0, max);
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function isValidPhone(s: string): boolean {
  const digits = s.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

export async function submitLead(
  _prev: LeadFormState | null,
  formData: FormData
): Promise<LeadFormState> {
  // Honeypot — bots fill hidden fields
  const honey = sanitize(formData.get('website'), 100);
  if (honey) {
    return { ok: true, message: 'Thanks — we will be in touch shortly.' };
  }

  const hdrs = await headers();
  const ip =
    hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    hdrs.get('x-real-ip') ||
    'unknown';

  if (isRateLimited(ip)) {
    return {
      ok: false,
      message: 'Too many submissions from your network in the last few minutes. Please call us at (424) 352-7034 if this is urgent.',
    };
  }

  const name = sanitize(formData.get('name'), 100);
  const email = sanitize(formData.get('email'), 200);
  const phone = sanitize(formData.get('phone'), 40);
  const city = sanitize(formData.get('city'), 100);
  const service = sanitize(formData.get('service'), 100);
  const message = sanitize(formData.get('message'), 4000);
  const userAgent = hdrs.get('user-agent')?.slice(0, 300) || '';
  const referer = hdrs.get('referer')?.slice(0, 300) || '';

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = 'Please enter your name.';
  if (!email || !isValidEmail(email)) fieldErrors.email = 'Please enter a valid email.';
  if (!phone || !isValidPhone(phone)) fieldErrors.phone = 'Please enter a valid phone number.';
  if (service && !SERVICES.includes(service)) fieldErrors.service = 'Please select a valid service.';

  if (Object.keys(fieldErrors).length) {
    return { ok: false, message: 'Please fix the highlighted fields.', fieldErrors };
  }

  if (!WEBHOOK_URL) {
    console.error('[submitLead] GOOGLE_SHEETS_WEBHOOK_URL is not configured.');
    return {
      ok: false,
      message: 'Form is temporarily unavailable. Please call us at (424) 352-7034.',
    };
  }

  const payload = {
    secret: SHARED_SECRET,
    timestamp: new Date().toISOString(),
    name,
    email,
    phone,
    city,
    service,
    message,
    ip,
    userAgent,
    referer,
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeout);

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error('[submitLead] Webhook responded non-OK', res.status, body);
      return {
        ok: false,
        message: 'We could not save your message. Please call us at (424) 352-7034.',
      };
    }
  } catch (err) {
    console.error('[submitLead] Webhook fetch failed', err);
    return {
      ok: false,
      message: 'We could not reach our intake system. Please call us at (424) 352-7034 or try again in a moment.',
    };
  }

  return {
    ok: true,
    message: 'Thanks — your request was received. A certified ACD Mold inspector will reach out within 30 minutes during business hours.',
  };
}
