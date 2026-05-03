import { Phone, Calendar } from 'lucide-react';
import { business } from '@/lib/business';
import Link from 'next/link';

export default function CTASection({ city }: { city?: string }) {
  return (
    <section className="section">
      <div className="container-prose">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 px-8 py-12 text-white shadow-soft sm:px-12 sm:py-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent-400/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-brand-400/30 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h2 className="font-display text-3xl font-bold sm:text-4xl">
                {city ? `Need mold help in ${city} today?` : 'Need mold help today?'}
              </h2>
              <p className="mt-3 text-brand-100">
                Talk to a certified mold inspector in under 10 minutes. Same-day appointments available across Los Angeles + Ventura County. Free phone consultations, transparent pricing, and a written quote before any work begins.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <a href={business.phoneHref} className="btn-accent">
                <Phone className="h-5 w-5" />
                {business.phoneDisplay}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20">
                <Calendar className="h-5 w-5" />
                Book Online
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
