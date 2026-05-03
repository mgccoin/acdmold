import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';
import FAQ from '@/components/FAQ';
import GeneratedArticle from '@/components/GeneratedArticle';
import Breadcrumbs from '@/components/Breadcrumbs';
import TrustBar from '@/components/TrustBar';
import { allCitySlugs, getCityBySlug } from '@/lib/cities';
import { getServiceBySlug, getSubServiceBySlug, services } from '@/lib/services';
import { buildMetadata, breadcrumbJsonLd, faqJsonLd, serviceJsonLd, SITE_URL } from '@/lib/seo';
import { generateCityServiceContent } from '@/lib/content';

const RESERVED = new Set([
  'services', 'service-area', 'about', 'contact', 'faq', 'blog', 'privacy',
  'sitemap.xml', 'robots.txt', 'llms.txt', 'api', '_next',
]);

// To keep build sizes manageable, we statically generate sub-service pages only
// for the most common subservices per city, and rely on dynamic SSR/ISR for the rest.
export function generateStaticParams() {
  const params: { city: string; service: string; subservice: string }[] = [];
  // Only pre-generate the FIRST sub-service of each top service per city to control build size
  // Other sub-service combinations will be served dynamically.
  for (const city of allCitySlugs) {
    if (RESERVED.has(city)) continue;
    for (const service of services) {
      const first = service.subServices[0];
      if (first) {
        params.push({ city, service: service.slug, subservice: first.slug });
      }
    }
  }
  return params;
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; service: string; subservice: string }>;
}) {
  const { city: citySlug, service: serviceSlug, subservice: subSlug } = await params;
  if (RESERVED.has(citySlug)) return {};
  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);
  const sub = getSubServiceBySlug(serviceSlug, subSlug);
  if (!city || !service || !sub) return {};
  return buildMetadata({
    title: `${sub.name} in ${city.name}, CA`,
    description: `${sub.shortDescription} Serving ${city.name}, ${city.region}.`,
    path: `/${citySlug}/${serviceSlug}/${subSlug}`,
    image: service.heroImage,
  });
}

export default async function CitySubServicePage({
  params,
}: {
  params: Promise<{ city: string; service: string; subservice: string }>;
}) {
  const { city: citySlug, service: serviceSlug, subservice: subSlug } = await params;
  if (RESERVED.has(citySlug)) notFound();
  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);
  const sub = getSubServiceBySlug(serviceSlug, subSlug);
  if (!city || !service || !sub) notFound();

  const content = generateCityServiceContent(city, service, sub);

  const related = [
    ...service.subServices
      .filter((s) => s.slug !== sub.slug)
      .slice(0, 5)
      .map((s) => ({ label: `${s.name} in ${city.name}`, href: `/${city.slug}/${service.slug}/${s.slug}` })),
    { label: `All ${service.name} in ${city.name}`, href: `/${city.slug}/${service.slug}` },
    { label: `${city.name} home page`, href: `/${city.slug}` },
  ];

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: city.name, href: `/${city.slug}` },
          { name: service.name, href: `/${city.slug}/${service.slug}` },
          { name: sub.name },
        ]}
      />
      <Hero
        eyebrow={`${sub.name} · ${city.name}, CA`}
        title={`${sub.name} in ${city.name}, California`}
        subtitle={sub.longDescription}
        imageSrc={service.heroImage}
        imageAlt={`${sub.name} in ${city.name}`}
      />
      <TrustBar />
      <GeneratedArticle content={content} related={related} serviceLabel={`More ${service.name}`} cityName={city.name} />
      <FAQ items={content.faqs} title={`${city.name} ${sub.name} FAQs`} />
      <CTASection city={city.name} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd({
              name: `${sub.name} in ${city.name}`,
              description: `${sub.shortDescription} Serving ${city.name}, ${city.region}.`,
              url: `${SITE_URL}/${city.slug}/${service.slug}/${sub.slug}`,
              areaServed: city.name,
            }),
            breadcrumbJsonLd([
              { name: 'Home', url: '/' },
              { name: city.name, url: `/${city.slug}` },
              { name: service.name, url: `/${city.slug}/${service.slug}` },
              { name: sub.name, url: `/${city.slug}/${service.slug}/${sub.slug}` },
            ]),
            faqJsonLd(content.faqs),
          ]),
        }}
      />
    </>
  );
}
