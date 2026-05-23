import { Star, Quote } from 'lucide-react';
import { reviewJsonLd } from '@/lib/seo';

const testimonials = [
  {
    name: 'Jessica P.',
    location: 'Sherman Oaks, CA',
    quote: 'After a slab leak we were terrified about hidden mold. ACD found growth behind a kitchen cabinet that two other inspectors had missed. The lab report supported our insurance claim and we got fully reimbursed.',
    date: '2026-02-14',
  },
  {
    name: 'Marcus W.',
    location: 'Long Beach, CA',
    quote: 'I am a property manager for 38 units. ACD has done inspections and remediation for us across three buildings. Their reports are thorough enough that my owners actually read them. Best mold company I have used.',
    date: '2026-01-22',
  },
  {
    name: 'Linda H.',
    location: 'Pasadena, CA',
    quote: 'They came out the same day for a real estate closing. The inspector explained everything in language I could actually understand. We closed on time and I felt confident in the property.',
    date: '2025-12-09',
  },
  {
    name: 'Daniel R.',
    location: 'Encino, CA',
    quote: 'My kid has asthma and we suspected mold in the bathroom. The remediation crew was clean, professional, and finished a day early. Air quality test came back perfectly clear afterward.',
    date: '2025-11-30',
  },
  {
    name: 'Rachel T.',
    location: 'Thousand Oaks, CA',
    quote: 'After the wildfires we needed mold testing on a house we were considering buying. ACD turned around results in 48 hours and walked us through what every number meant.',
    date: '2025-11-04',
  },
  {
    name: 'Brian C.',
    location: 'Studio City, CA',
    quote: 'I called four mold companies. ACD was the only one that did NOT try to immediately upsell me to remediation. Honest, certified, and reasonably priced. Hard to find.',
    date: '2025-10-18',
  },
];

export default function Testimonials() {
  return (
    <section className="section bg-gradient-to-br from-brand-50 to-white">
      <div className="container-prose">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-700">Reviews</span>
          <h2 className="h-sectionTitle mt-2">Trusted by Thousands of Southern California Homeowners</h2>
          <p className="mt-4 text-slate-600">
            We have completed over 8,500 mold projects across Los Angeles and Ventura County. Here is what real clients say about working with us.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="card relative">
              <Quote className="absolute right-4 top-4 h-6 w-6 text-brand-100" />
              <div className="flex items-center gap-1 text-accent-500" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="testimonial-quote mt-3 text-sm leading-relaxed text-slate-700">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 border-t border-slate-100 pt-3 text-xs">
                <div className="font-semibold text-brand-900">{t.name}</div>
                <div className="text-slate-500">{t.location}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            reviewJsonLd(
              testimonials.map((t) => ({
                author: t.name,
                location: t.location,
                quote: t.quote,
                rating: 5,
                date: t.date,
              }))
            )
          ),
        }}
      />
    </section>
  );
}
