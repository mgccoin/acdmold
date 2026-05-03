import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Hero from '@/components/Hero';
import Breadcrumbs from '@/components/Breadcrumbs';
import LeadForm from '@/components/LeadForm';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { business } from '@/lib/business';

export const metadata = buildMetadata({
  title: 'Contact ACD Mold – Schedule Your Mold Inspection',
  description: `Contact ACD Mold for certified mold testing, inspection, and remediation across Los Angeles + Ventura County. Call ${business.phoneDisplay} or book online for a same-day appointment.`,
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Contact' }]} />
      <Hero
        eyebrow="We answer our own phones"
        title="Talk to a Certified Mold Inspector Today"
        subtitle="Same-day appointments available. Call us, send a message, or stop by our Encino headquarters. We confirm every appointment with a 2-hour arrival window."
        imageSrc="/images/hero/contact-hero.png"
        imageAlt="ACD Mold technician answering phone"
        primaryCtaLabel="Send a Message"
      />

      <section className="section bg-white">
        <div className="container-prose grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="card">
              <h2 className="font-display text-2xl font-bold text-brand-900">Contact Information</h2>
              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">Phone</div>
                    <a href={business.phoneHref} className="text-base font-semibold text-brand-900 hover:text-brand-700">
                      {business.phoneDisplay}
                    </a>
                    <div className="text-xs text-slate-500">24/7 emergency line</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">Email</div>
                    <a href={`mailto:${business.email}`} className="text-base font-semibold text-brand-900 hover:text-brand-700">
                      {business.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">Address</div>
                    <div className="text-base font-semibold text-brand-900">{business.address.full}</div>
                    <div className="text-xs text-slate-500">Encino, CA</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">Hours</div>
                    <div className="text-base font-semibold text-brand-900">{business.hours.weekday}</div>
                    <div className="text-xs text-slate-500">{business.hours.emergency}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="card">
              <h2 className="font-display text-2xl font-bold text-brand-900">Request a Quote</h2>
              <p className="mt-2 text-sm text-slate-600">
                Fill out the form and a certified inspector will respond within 30 minutes during business hours. Submissions are saved to our lead system instantly.
              </p>
              <div className="mt-6">
                <LeadForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }])),
        }}
      />
    </>
  );
}
