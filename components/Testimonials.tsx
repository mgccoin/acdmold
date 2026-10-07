import { Star, Quote } from 'lucide-react';

// IMPORTANT: Only real, attributable customer reviews belong here. The previous
// entries were placeholder quotes attributed to named individuals and have been
// removed — publishing invented testimonials is deceptive and an FTC exposure.
// TODO(owner): populate from genuine reviews (ideally synced from the verified
// Google Business Profile, with the reviewer's real display name and a link to
// the live review). Until this array has real entries, the section renders
// nothing rather than showing fabricated social proof.
type Testimonial = { name: string; location: string; quote: string; date: string; sourceUrl?: string };
const testimonials: Testimonial[] = [];

export default function Testimonials() {
  if (testimonials.length === 0) return null;
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
    </section>
  );
}
