import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';
import FAQ from '@/components/FAQ';
import GeneratedArticle from '@/components/GeneratedArticle';
import Breadcrumbs from '@/components/Breadcrumbs';
import TrustBar from '@/components/TrustBar';
import SubServiceGrid from '@/components/SubServiceGrid';
import { allCitySlugs, getCityBySlug, cities } from '@/lib/cities';
import { allServiceSlugs, getServiceBySlug, services } from '@/lib/services';
import { buildMetadata, breadcrumbJsonLd, faqJsonLd, serviceJsonLd, SITE_URL } from '@/lib/seo';
import { generateCityServiceContent } from '@/lib/content';

const RESERVED = new Set([
  'services', 'service-area', 'about', 'contact', 'faq', 'blog', 'privacy',
  'sitemap.xml', 'robots.txt', 'llms.txt', 'api', '_next',
]);

export function generateStaticParams() {
  const params: { city: string; service: string }[] = [];
  for (const city of allCitySlugs) {
    if (RESERVED.has(city)) continue;
    for (const service of allServiceSlugs) {
      params.push({ city, service });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ city: string; service: string }> }) {
  const { city: citySlug, service: serviceSlug } = await params;
  if (RESERVED.has(citySlug)) return {};
  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);
  if (!city || !service) return {};
  return buildMetadata({
    title: `${service.name} in ${city.name}, CA`,
    description: `${service.name} in ${city.name}, ${city.region}. ${service.shortDescription}`,
    path: `/${citySlug}/${serviceSlug}`,
    image: service.heroImage,
  });
}

export default async function CityServicePage({ params }: { params: Promise<{ city: string; service: string }> }) {
  const { city: citySlug, service: serviceSlug } = await params;
  if (RESERVED.has(citySlug)) notFound();
  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);
  if (!city || !service) notFound();

  const content = generateCityServiceContent(city, service);

  const related = [
    ...service.subServices.slice(0, 4).map((ss) => ({
      label: `${ss.name} in ${city.name}`,
      href: `/${city.slug}/${service.slug}/${ss.slug}`,
    })),
    ...services
      .filter((s) => s.slug !== service.slug)
      .map((s) => ({ label: `${s.name} in ${city.name}`, href: `/${city.slug}/${s.slug}` })),
  ];

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: city.name, href: `/${city.slug}` },
          { name: service.name },
        ]}
      />
      <Hero
        eyebrow={`${service.name} · ${city.name}, CA`}
        title={`${service.name} in ${city.name}, California`}
        subtitle={`${service.shortDescription} ACD Mold serves every ZIP in ${city.name} (${city.zips.join(', ')}) with same-day appointments, AIHA-accredited lab results, and IICRC S520 remediation when needed.`}
        imageSrc={service.heroImage}
        imageAlt={`${service.name} in ${city.name}`}
      />
      <TrustBar />
      <GeneratedArticle content={content} related={related} serviceLabel={`More in ${city.name}`} cityName={city.name} />
      <SubServiceGrid service={service} citySlug={city.slug} />
      <FAQ items={content.faqs} title={`${city.name} ${service.name} FAQs`} />
      <CTASection city={city.name} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd({
              name: `${service.name} in ${city.name}`,
              description: `${service.metaDescription} Serving ${city.name}, ${city.region}.`,
              url: `${SITE_URL}/${city.slug}/${service.slug}`,
              areaServed: city.name,
            }),
            breadcrumbJsonLd([
              { name: 'Home', url: '/' },
              { name: city.name, url: `/${city.slug}` },
              { name: service.name, url: `/${city.slug}/${service.slug}` },
            ]),
            faqJsonLd(content.faqs),
          ]),
        }}
      />
    </>
  );
}
