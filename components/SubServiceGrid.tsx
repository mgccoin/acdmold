import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/lib/services';

export default function SubServiceGrid({ service, citySlug }: { service: Service; citySlug?: string }) {
  return (
    <section className="section bg-slate-50">
      <div className="container-prose">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-700">Sub-Services</span>
          <h2 className="h-sectionTitle mt-2">{service.name} – Specialty Services</h2>
          <p className="mt-4 text-slate-600">
            Choose the specific sub-service that matches your situation. Each is performed by certified specialists with the right tools, training, and lab support.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.subServices.map((ss) => {
            const href = citySlug
              ? `/${citySlug}/${service.slug}/${ss.slug}`
              : `/services/${service.slug}/${ss.slug}`;
            return (
              <Link key={ss.slug} href={href} className="card group flex h-full flex-col">
                <div className="font-display text-lg font-bold text-brand-900 group-hover:text-brand-700">{ss.name}</div>
                <p className="mt-2 flex-1 text-sm text-slate-600">{ss.shortDescription}</p>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="rounded-full bg-brand-50 px-2 py-1 font-semibold text-brand-700">{ss.pricing.split(' ')[0]}</span>
                  <span className="flex items-center gap-1 font-semibold text-brand-700">
                    Learn more <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
