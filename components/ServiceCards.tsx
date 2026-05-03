import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { services } from '@/lib/services';

export default function ServiceCards({ citySlug }: { citySlug?: string }) {
  return (
    <section className="section bg-white">
      <div className="container-prose">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-700">What We Do</span>
          <h2 className="h-sectionTitle mt-2">Mold Services Built for California Homes & Businesses</h2>
          <p className="mt-4 text-slate-600">
            Every ACD Mold service is performed by ACAC-certified inspectors and IICRC-certified remediators using AIHA-accredited laboratories. From a single bathroom to a 200,000 sq ft commercial facility, we are equipped for it.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const href = citySlug ? `/${citySlug}/${s.slug}` : `/services/${s.slug}`;
            return (
              <Link key={s.slug} href={href} className="group card overflow-hidden p-0">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-100">
                  <Image
                    src={s.cardImage}
                    alt={s.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-brand-900/10 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="font-display text-xl font-bold text-white">{s.name}</div>
                    <div className="text-xs text-brand-100">{s.tagline}</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-slate-600">{s.shortDescription}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand-700 group-hover:text-brand-900">
                    {citySlug ? `See in city` : 'Learn more'}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
