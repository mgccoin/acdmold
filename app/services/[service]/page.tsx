import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';
import FAQ from '@/components/FAQ';
import ServiceCards from '@/components/ServiceCards';
import SubServiceGrid from '@/components/SubServiceGrid';
import CityGrid from '@/components/CityGrid';
import GeneratedArticle from '@/components/GeneratedArticle';
import Breadcrumbs from '@/components/Breadcrumbs';
import TrustBar from '@/components/TrustBar';
import { allServiceSlugs, getServiceBySlug } from '@/lib/services';
import { buildMetadata, breadcrumbJsonLd, faqJsonLd, serviceJsonLd, SITE_URL } from '@/lib/seo';
import { generateCityServiceContent } from '@/lib/content';
import { cities } from '@/lib/cities';

export function generateStaticParams() {
  return allServiceSlugs.map((service) => ({ service }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) return {};
  return buildMetadata({
    title: `${s.name} | ${s.tagline}`,
    description: s.metaDescription,
    path: `/services/${slug}`,
    image: s.heroImage,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  // Use first city as a hub-content seed for variety on the service page
  const hub = cities[0]!;
  const content = generateCityServiceContent(hub, service);
  // Override h1/intro for service-only context (no city)
  content.h1 = service.name;
  content.intro = `${service.longDescription} ACD Mold provides ${service.name.toLowerCase()} across over 150 cities in Los Angeles County and Ventura County. This page explains exactly what is included, who it is for, what it costs, and how to schedule.`;

  const related = service.subServices.slice(0, 8).map((ss) => ({
    label: ss.name,
    href: `/services/${service.slug}/${ss.slug}`,
  }));

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
          { name: service.name },
        ]}
      />
      <Hero
        eyebrow={service.tagline}
        title={service.name}
        subtitle={service.longDescription}
        imageSrc={service.heroImage}
        imageAlt={service.name}
      />
      <TrustBar />
      <GeneratedArticle content={content} related={related} serviceLabel="Sub-Services" />
      <SubServiceGrid service={service} />
      <ServiceCards />
      <FAQ items={service.faqs} />
      <CityGrid serviceSlug={service.slug} />
      <CTASection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd({
              name: service.name,
              description: service.metaDescription,
              url: `${SITE_URL}/services/${service.slug}`,
            }),
            breadcrumbJsonLd([
              { name: 'Home', url: '/' },
              { name: 'Services', url: '/services' },
              { name: service.name, url: `/services/${service.slug}` },
            ]),
            faqJsonLd(service.faqs),
          ]),
        }}
      />
    </>
  );
}
