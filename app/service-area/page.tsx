import Hero from '@/components/Hero';
import CityGrid from '@/components/CityGrid';
import CTASection from '@/components/CTASection';
import Breadcrumbs from '@/components/Breadcrumbs';
import TrustBar from '@/components/TrustBar';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { cities } from '@/lib/cities';

export const metadata = buildMetadata({
  title: 'Service Area – Cities We Serve in California',
  description: `ACD Mold serves over ${cities.length} cities across Los Angeles County and Ventura County. Find your city for local mold testing, inspection, and remediation services.`,
  path: '/service-area',
});

export default function ServiceAreaPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Service Area' }]} />
      <Hero
        eyebrow="Local Mold Specialists"
        title={`Mold Services in ${cities.length}+ Cities Across Southern California`}
        subtitle="ACD Mold dispatches certified inspectors and IICRC-licensed remediation crews from our Encino headquarters across Los Angeles County and Ventura County. Find your city below."
        imageSrc="/images/hero/service-area-hero.png"
        imageAlt="Map of ACD Mold service area"
      />
      <TrustBar />
      <CityGrid />
      <CTASection />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Service Area', url: '/service-area' }])),
        }}
      />
    </>
  );
}
