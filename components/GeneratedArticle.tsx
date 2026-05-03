import Link from 'next/link';
import { Phone, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import type { GeneratedContent } from '@/lib/content';
import { business } from '@/lib/business';

export default function GeneratedArticle({
  content,
  related,
  serviceLabel,
  cityName,
}: {
  content: GeneratedContent;
  related?: { label: string; href: string }[];
  serviceLabel?: string;
  cityName?: string;
}) {
  return (
    <section className="bg-white">
      <div className="container-prose grid gap-10 py-12 lg:grid-cols-12 lg:py-16">
        <article className="prose-content lg:col-span-8">
          <p className="lead text-lg text-slate-700">{content.intro}</p>
          {content.sections.map((s, i) => (
            <section key={i}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {s.list && (
                <ul>
                  {s.list.map((li, k) => (
                    <li key={k}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 shadow-soft">
              <div className="flex items-center gap-2 text-brand-700">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-xs font-semibold uppercase tracking-wider">Free Consultation</span>
              </div>
              <h3 className="mt-2 font-display text-xl font-bold text-brand-900">
                {cityName ? `Get help in ${cityName} today` : 'Get help today'}
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Speak with a certified mold inspector. Same-day appointments available across Los Angeles + Ventura County.
              </p>
              <a href={business.phoneHref} className="btn-primary mt-4 w-full">
                <Phone className="h-4 w-4" /> {business.phoneDisplay}
              </a>
              <Link href="/contact" className="mt-2 block w-full rounded-full border border-brand-200 px-4 py-2 text-center text-sm font-semibold text-brand-700 hover:bg-brand-50">
                Book Online
              </Link>
            </div>

            {related && related.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-700">
                  {serviceLabel ?? 'Related Services'}
                </div>
                <ul className="space-y-2 text-sm">
                  {related.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        className="group flex items-start gap-2 rounded-lg px-2 py-1.5 text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
                      >
                        <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-brand-400 transition group-hover:translate-x-0.5" />
                        <span>{r.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-700">
                <MapPin className="h-3.5 w-3.5" /> Visit Us
              </div>
              <div className="font-semibold text-brand-900">{business.name}</div>
              <div className="text-slate-600">{business.address.full}</div>
              <div className="mt-2 text-slate-600">{business.hours.weekday}</div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
