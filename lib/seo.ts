import type { Metadata } from 'next';
import { business } from './business';

export const SITE_URL = business.url;

export function buildMetadata({
  title,
  description,
  path,
  image,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const ogImage = image ?? '/images/og/default.png';

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 } },
    openGraph: {
      title,
      description,
      url,
      siteName: business.name,
      type: 'website',
      locale: 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

// JSON-LD helpers ---------------------------------------------------------

export function localBusinessJsonLd(extra?: { areaServed?: string[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}#business`,
    name: business.name,
    legalName: business.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/storefront.png`,
    telephone: business.phone,
    email: business.email,
    priceRange: '$$',
    description: business.shortDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    openingHoursSpecification: business.hours.days.map((d) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: d,
      opens: business.hours.open,
      closes: business.hours.close,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.averageRating,
      reviewCount: business.reviewCount,
    },
    sameAs: Object.values(business.social),
    areaServed: extra?.areaServed?.map((a) => ({ '@type': 'City', name: a })) ?? [
      { '@type': 'City', name: 'Encino' },
      { '@type': 'City', name: 'Los Angeles' },
      { '@type': 'AdministrativeArea', name: 'Los Angeles County' },
      { '@type': 'AdministrativeArea', name: 'Ventura County' },
    ],
  };
}

export function serviceJsonLd({
  name,
  description,
  url,
  areaServed,
}: {
  name: string;
  description: string;
  url: string;
  areaServed?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: { '@id': `${SITE_URL}#business` },
    areaServed: areaServed
      ? { '@type': 'City', name: areaServed }
      : { '@type': 'AdministrativeArea', name: 'Los Angeles County, Ventura County' },
    serviceType: name,
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url.startsWith('http') ? it.url : `${SITE_URL}${it.url}`,
    })),
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: business.name,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    sameAs: Object.values(business.social),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: business.phone,
        contactType: 'customer service',
        areaServed: 'US-CA',
        availableLanguage: ['English', 'Spanish'],
      },
    ],
  };
}
