'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitLead, type LeadFormState } from '@/app/actions/submit-lead';
import { business } from '@/lib/business';

const services = [
  'Mold Inspection',
  'Mold Testing',
  'Mold Remediation',
  'Black Mold Removal',
  'Post-Remediation Clearance',
  'Emergency / Same-day',
  'Other',
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full disabled:cursor-wait disabled:opacity-70">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Sending…
        </>
      ) : (
        'Send Message'
      )}
    </button>
  );
}

export default function LeadForm({
  defaultCity,
  defaultService,
  compact,
}: {
  defaultCity?: string;
  defaultService?: string;
  compact?: boolean;
}) {
  const [state, formAction] = useActionState<LeadFormState | null, FormData>(submitLead, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset();
    }
  }, [state]);

  if (state?.ok) {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-brand-600" />
          <div>
            <h3 className="font-display text-lg font-bold text-brand-900">Request received</h3>
            <p className="mt-1 text-sm text-slate-700">{state.message}</p>
            <p className="mt-3 text-xs text-slate-500">
              Need urgent help? Call <a href={business.phoneHref} className="font-semibold text-brand-700">{business.phoneDisplay}</a>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const fieldErr = state?.fieldErrors ?? {};

  return (
    <form ref={formRef} action={formAction} className={`grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
      {state && !state.ok && state.message && (
        <div className="sm:col-span-2 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      {/* Honeypot — hidden from users, bots fill it */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field id="name" label="Full name" required error={fieldErr.name} />
      <Field id="phone" label="Phone" type="tel" required error={fieldErr.phone} autoComplete="tel" />
      <Field id="email" label="Email" type="email" required error={fieldErr.email} autoComplete="email" />
      <Field id="city" label="City" defaultValue={defaultCity} autoComplete="address-level2" />

      <div className="sm:col-span-2">
        <label htmlFor="service" className="block text-xs font-semibold text-slate-700">
          What do you need?
        </label>
        <select
          id="service"
          name="service"
          defaultValue={defaultService ?? services[0]}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        >
          {services.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        {fieldErr.service && <p className="mt-1 text-xs text-red-600">{fieldErr.service}</p>}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className="block text-xs font-semibold text-slate-700">
          Tell us about the situation
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="When did you first notice the issue? Any visible mold, leaks, or musty smells?"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <div className="sm:col-span-2">
        <SubmitButton />
        <p className="mt-2 text-center text-xs text-slate-500">
          Or call us directly at{' '}
          <a href={business.phoneHref} className="font-semibold text-brand-700">
            {business.phoneDisplay}
          </a>
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  type = 'text',
  required,
  error,
  defaultValue,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
  defaultValue?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
          error ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-brand-500 focus:ring-brand-200'
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
