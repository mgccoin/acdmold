import Link from 'next/link';
import { citiesByRegion } from '@/lib/cities';
import { MapPin } from 'lucide-react';

export default function CityGrid({ serviceSlug }: { serviceSlug?: string }) {
  const regions = Object.keys(citiesByRegion).sort();

  return (
    <section className="section bg-white">
      <div className="container-prose">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-700">Service Area</span>
          <h2 className="h-sectionTitle mt-2">Trusted Mold Services Across Southern California</h2>
          <p className="mt-4 text-slate-600">
            ACD Mold serves over 150 cities across Los Angeles County and Ventura County. Click your city for local information.
          </p>
        </div>

        <div className="space-y-10">
          {regions.map((region) => (
            <div key={region} id={region.toLowerCase().replace(/\s+/g, '-')}>
              <h3 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-brand-900">
                <MapPin className="h-5 w-5 text-brand-600" /> {region}
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {citiesByRegion[region]
                  ?.slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((city) => {
                    const href = serviceSlug
                      ? `/${city.slug}/${serviceSlug}`
                      : `/${city.slug}`;
                    return (
                      <Link
                        key={city.slug}
                        href={href}
                        className="group rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                      >
                        {city.name}
                      </Link>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
