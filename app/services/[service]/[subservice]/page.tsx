import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';
import FAQ from '@/components/FAQ';
import GeneratedArticle from '@/components/GeneratedArticle';
import Breadcrumbs from '@/components/Breadcrumbs';
import TrustBar from '@/components/TrustBar';
import CityGrid from '@/components/CityGrid';
import { allSubServicePairs, getServiceBySlug, getSubServiceBySlug } from '@/lib/services';
import { buildMetadata, breadcrumbJsonLd, faqJsonLd, serviceJsonLd, SITE_URL } from '@/lib/seo';
import { generateCityServiceContent } from '@/lib/content';
import { cities } from '@/lib/cities';

export function generateStaticParams() {
  return allSubServicePairs.map((p) => ({ service: p.service, subservice: p.subService }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string; subservice: string }> }) {
  const { service: ss, subservice: sub } = await params;
  const service = getServiceBySlug(ss);
  const subService = getSubServiceBySlug(ss, sub);
  if (!service || !subService) return {};
  return buildMetadata({
    title: `${subService.name} | ${service.name}`,
    description: subService.shortDescription,
    path: `/services/${ss}/${sub}`,
    image: service.heroImage,
  });
}

export default async function SubServicePage({ params }: { params: Promise<{ service: string; subservice: string }> }) {
  const { service: ss, subservice: sub } = await params;
  const service = getServiceBySlug(ss);
  const subService = getSubServiceBySlug(ss, sub);
  if (!service || !subService) notFound();

  const hub = cities[0]!;
  const content = generateCityServiceContent(hub, service, subService);
  content.h1 = subService.name;
  content.intro = `${subService.longDescription} ACD Mold offers ${subService.name.toLowerCase()} as part of our complete ${service.name.toLowerCase()} program across Los Angeles and Ventura County.`;

  const related = service.subServices
    .filter((s) => s.slug !== subService.slug)
    .slice(0, 6)
    .map((s) => ({ label: s.name, href: `/services/${service.slug}/${s.slug}` }));

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
          { name: service.name, href: `/services/${service.slug}` },
          { name: subService.name },
        ]}
      />
      <Hero
        eyebrow={service.name}
        title={subService.name}
        subtitle={subService.longDescription}
        imageSrc={service.heroImage}
        imageAlt={subService.name}
      />
      <TrustBar />
      <GeneratedArticle content={content} related={related} serviceLabel="Related Sub-Services" />
      <FAQ items={[...subService.faqs, ...service.faqs].slice(0, 8)} />
      <CityGrid serviceSlug={service.slug} />
      <CTASection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd({
              name: `${subService.name} – ${service.name}`,
              description: subService.shortDescription,
              url: `${SITE_URL}/services/${service.slug}/${subService.slug}`,
            }),
            breadcrumbJsonLd([
              { name: 'Home', url: '/' },
              { name: 'Services', url: '/services' },
              { name: service.name, url: `/services/${service.slug}` },
              { name: subService.name, url: `/services/${service.slug}/${subService.slug}` },
            ]),
            faqJsonLd([...subService.faqs, ...service.faqs]),
          ]),
        }}
      />
    </>
  );
}
