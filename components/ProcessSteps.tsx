import { Phone, ClipboardCheck, FlaskConical, ShieldCheck } from 'lucide-react';

const steps = [
  {
    icon: Phone,
    title: '1. Call or Book Online',
    text: 'Tell us what you are seeing or smelling. We confirm a 2-hour arrival window — same-day available for emergencies.',
  },
  {
    icon: ClipboardCheck,
    title: '2. Certified On-Site Inspection',
    text: 'An ACAC-certified inspector arrives with thermal imaging, moisture meters, and sampling equipment.',
  },
  {
    icon: FlaskConical,
    title: '3. AIHA-Accredited Lab Results',
    text: 'Samples ship to an AIHA-LAP accredited lab. Plain-English results delivered in 3–5 business days (24-hour rush available).',
  },
  {
    icon: ShieldCheck,
    title: '4. Remediation & Clearance',
    text: 'If remediation is needed, we follow IICRC S520 with full containment and end with independent third-party clearance testing.',
  },
];

export default function ProcessSteps() {
  return (
    <section className="section">
      <div className="container-prose">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-700">Our Process</span>
          <h2 className="h-sectionTitle mt-2">From Call to Clearance — A Transparent 4-Step Process</h2>
          <p className="mt-4 text-slate-600">
            No bait-and-switch pricing. No surprise add-ons. Every project gets a written scope of work approved before any sampling, demolition, or invoice begins.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                <Icon className="h-6 w-6" />
              </div>
              <div className="mt-4 font-display text-lg font-bold text-brand-900">{title}</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
