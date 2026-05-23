import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';
import FAQ from '@/components/FAQ';
import ServiceCards from '@/components/ServiceCards';
import GeneratedArticle from '@/components/GeneratedArticle';
import Breadcrumbs from '@/components/Breadcrumbs';
import TrustBar from '@/components/TrustBar';
import ProcessSteps from '@/components/ProcessSteps';
import Testimonials from '@/components/Testimonials';
import { allCitySlugs, getCityBySlug } from '@/lib/cities';
import { services } from '@/lib/services';
import {
  buildMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  localBusinessJsonLd,
  webPageJsonLd,
  articleJsonLd,
  serviceJsonLd,
  SITE_URL,
} from '@/lib/seo';
import { generateCityServiceContent } from '@/lib/content';
import { business } from '@/lib/business';

const RESERVED = new Set([
  'services', 'service-area', 'about', 'contact', 'faq', 'blog', 'privacy',
  'sitemap.xml', 'robots.txt', 'llms.txt', 'api', '_next',
]);

export function generateStaticParams() {
  return allCitySlugs.filter((s) => !RESERVED.has(s)).map((city) => ({ city }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  if (RESERVED.has(slug)) return {};
  const city = getCityBySlug(slug);
  if (!city) return {};
  return buildMetadata({
    title: `Mold Testing, Inspection & Remediation in ${city.name}, CA`,
    description: `Certified mold testing, inspection, and remediation in ${city.name}, ${city.region}, ${city.county} County. Same-day appointments. AIHA-accredited lab. IICRC S520 remediation. Serving ZIPs ${city.zips.join(', ')}. Call ${business.phoneDisplay}.`,
    path: `/${slug}`,
    image: '/images/og/city.png',
    keywords: [
      `mold inspection ${city.name}`,
      `mold testing ${city.name}`,
      `mold remediation ${city.name}`,
      `black mold removal ${city.name}`,
      `mold inspector near me ${city.name}`,
      `${city.name} air quality testing`,
      `emergency mold ${city.name}`,
      `IICRC mold remediation ${city.name}`,
      ...city.zips.map((z) => `mold inspection ${z}`),
    ],
  });
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  if (RESERVED.has(slug)) notFound();
  const city = getCityBySlug(slug);
  if (!city) notFound();

  // Generate hub content for the city using "Mold Inspection" as primary anchor service
  const primary = services.find((s) => s.slug === 'mold-inspection')!;
  const content = generateCityServiceContent(city, primary);
  content.h1 = `Mold Testing, Inspection & Remediation in ${city.name}, CA`;
  content.intro = `Welcome to ACD Mold's ${city.name} resource page. We are certified, locally based, and the area's trusted source for mold testing, mold inspection, and mold remediation across ${city.name} (${city.zips.join(', ')}) and the surrounding ${city.region}. ${content.intro}`;

  const related = services.map((s) => ({ label: `${s.name} in ${city.name}`, href: `/${city.slug}/${s.slug}` }));

  const cityFaqs = [
    { q: `Do you serve all of ${city.name}?`, a: `Yes — every ZIP in ${city.name} (${city.zips.join(', ')}). We dispatch from our Encino headquarters at ${business.address.full}.` },
    { q: `How soon can ACD Mold come to ${city.name}?`, a: `Standard appointments are usually available within 24–48 hours. Same-day emergency service is available for active leaks and time-sensitive real estate situations.` },
    { q: `What does a mold inspection cost in ${city.name}?`, a: `Most ${city.name} residential inspections fall in the $295–$595 range. Lab testing, when added, runs $95–$195 per sample with AIHA-accredited analysis.` },
    { q: `Are you licensed to do mold remediation in ${city.name}?`, a: `Yes. ACD Mold is a CSLB-licensed contractor in California with $2M general liability and full workers compensation. COIs available same-day for property managers and HOAs in ${city.name}.` },
    { q: `Do you handle insurance claims in ${city.name}?`, a: `Yes — we document losses in the format insurance carriers require, communicate with adjusters when authorized, and provide AIHA-accredited lab reports that satisfy claim documentation requirements.` },
  ];

  return (
    <>
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: city.name }]} />
      <Hero
        eyebrow={`Serving ${city.name}, ${city.region}`}
        title={`Mold Testing & Remediation in ${city.name}, CA`}
        subtitle={`Certified ACD Mold inspectors and IICRC-licensed remediation crews serve every ZIP code in ${city.name} (${city.zips.join(', ')}). Same-day appointments, AIHA-accredited lab results, transparent pricing, and a workmanship guarantee on every project.`}
        imageSrc="/images/hero/city-hero.png"
        imageAlt={`Mold inspection in ${city.name}, California`}
      />
      <TrustBar />
      <GeneratedArticle content={content} related={related} serviceLabel={`${city.name} Services`} cityName={city.name} />
      <ServiceCards citySlug={city.slug} />
      <ProcessSteps />
      <Testimonials />
      <FAQ items={cityFaqs} title={`${city.name} Mold Service FAQs`} />
      <CTASection city={city.name} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            localBusinessJsonLd({ areaServed: [city.name, city.region, `${city.county} County`] }),
            serviceJsonLd({
              name: `Mold Testing, Inspection & Remediation in ${city.name}, CA`,
              description: `Certified mold inspection, AIHA-accredited testing, and IICRC S520-compliant remediation in ${city.name}, ${city.region}.`,
              url: `${SITE_URL}/${city.slug}`,
              areaServed: city.name,
              priceRange: '$295 - $30,000',
              category: 'Mold Remediation',
            }),
            breadcrumbJsonLd([
              { name: 'Home', url: '/' },
              { name: 'Service Area', url: '/service-area' },
              { name: city.name, url: `/${city.slug}` },
            ]),
            faqJsonLd(cityFaqs),
            webPageJsonLd({
              url: `/${city.slug}`,
              name: `Mold Testing, Inspection & Remediation in ${city.name}, CA`,
              description: `Certified mold inspection and remediation in ${city.name}, ${city.region}. Same-day appointments, AIHA-accredited lab, IICRC S520 remediation.`,
            }),
            articleJsonLd({
              url: `/${city.slug}`,
              headline: `Mold Testing, Inspection & Remediation in ${city.name}, California`,
              description: `Local mold inspection, testing, and IICRC-certified remediation across ${city.name}, ${city.region} (ZIPs ${city.zips.join(', ')}).`,
              image: '/images/og/city.png',
              wordCount: content.wordCount,
            }),
          ]),
        }}
      />
    </>
  );
}
