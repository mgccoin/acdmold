import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';
import FAQ from '@/components/FAQ';
import Breadcrumbs from '@/components/Breadcrumbs';
import { services } from '@/lib/services';
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import { business } from '@/lib/business';

export const metadata = buildMetadata({
  title: 'Mold Testing, Inspection & Remediation Services',
  description: `Complete list of ACD Mold services across Los Angeles and Ventura County. Mold testing, inspection, remediation, post-remediation, and 24/7 emergency response. Call ${business.phoneDisplay}.`,
  path: '/services',
  image: '/images/og/services.png',
});

const faqs = [
  { q: 'Which service do I need first?', a: 'In most cases, start with an inspection. The inspector will tell you whether testing or remediation is appropriate, and what the scope should be.' },
  { q: 'Do you bundle inspection and remediation?', a: 'We can, but we are also happy to be the third-party clearance inspector on remediation work other contractors perform.' },
  { q: 'What areas do you serve?', a: `ACD Mold serves over 150 cities across Los Angeles County and Ventura County, with a service radius of ${business.serviceRadiusMiles}+ miles from our Encino headquarters.` },
];

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Services' }]} />
      <Hero
        eyebrow="Complete Mold Service Catalog"
        title="Every Mold Service You Need — Under One Certified Roof"
        subtitle="From a single bathroom inspection to a 200,000 sq ft warehouse remediation, ACD Mold has the certifications, equipment, and crew size to handle it. Browse our full service catalog below."
        imageSrc="/images/hero/services-hero.png"
        imageAlt="ACD Mold technician with full PPE during remediation"
        primaryCtaLabel="Get a Free Quote"
      />

      <section className="section bg-white">
        <div className="container-prose space-y-12">
          {services.map((s) => (
            <div key={s.slug} className="grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200">
                  <Image src={s.heroImage} alt={s.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
                </div>
              </div>
              <div className="lg:col-span-7">
                <span className="text-sm font-semibold uppercase tracking-wider text-brand-700">Service</span>
                <h2 className="mt-1 font-display text-2xl font-bold text-brand-900 sm:text-3xl">{s.name}</h2>
                <p className="mt-2 text-slate-600">{s.longDescription}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {s.subServices.slice(0, 6).map((ss) => (
                    <li key={ss.slug}>
                      <Link href={`/services/${s.slug}/${ss.slug}`} className="flex items-start gap-2 text-sm text-slate-700 hover:text-brand-700">
                        <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
                        {ss.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/services/${s.slug}`} className="btn-primary">
                    See {s.name} Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FAQ items={faqs} />
      <CTASection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }]),
            faqJsonLd(faqs),
          ]),
        }}
      />
    </>
  );
}
