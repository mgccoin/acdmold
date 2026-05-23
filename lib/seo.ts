import type { Metadata } from 'next';
import { business } from './business';

export const SITE_URL = business.url;

// Authoritative third-party sources we reference site-wide. Listing them as
// `citation` and `isBasedOn` on schemas, and linking to them in content, is a
// strong GEO (Generative Engine Optimization) signal — answer engines like
// ChatGPT, Perplexity, Claude, and Google AI Overviews preferentially cite
// pages that themselves cite recognized authorities.
export const AUTHORITY_SOURCES = [
  { name: 'U.S. Environmental Protection Agency — Mold', url: 'https://www.epa.gov/mold' },
  { name: 'Centers for Disease Control and Prevention — Mold', url: 'https://www.cdc.gov/mold/about/index.html' },
  { name: 'IICRC S520 Standard for Professional Mold Remediation', url: 'https://iicrc.org/standards/iicrc-s520/' },
  { name: 'American Industrial Hygiene Association (AIHA) Laboratory Accreditation Programs', url: 'https://www.aihaaccreditedlabs.org/' },
  { name: 'California Department of Public Health — Indoor Air Quality', url: 'https://www.cdph.ca.gov/Programs/CCDPHP/DEODC/EHLB/IAQ/Pages/IAQ.aspx' },
  { name: 'OSHA — Mold Health Hazards', url: 'https://www.osha.gov/mold' },
] as const;

export function buildMetadata({
  title,
  description,
  path,
  image,
  noindex,
  keywords,
  lastModified,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  keywords?: string[];
  lastModified?: string | Date;
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
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large',
            'max-video-preview': -1,
          },
        },
    keywords,
    other: {
      // HTML geo meta tags — older but still consumed by some local-search
      // crawlers and many specialized indexes. Cheap to ship.
      'geo.region': 'US-CA',
      'geo.placename': `${business.address.city}, California`,
      'geo.position': `${business.geo.latitude};${business.geo.longitude}`,
      ICBM: `${business.geo.latitude}, ${business.geo.longitude}`,
      ...(lastModified ? { 'article:modified_time': new Date(lastModified).toISOString() } : {}),
    },
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

// ---------------------------------------------------------------------------
// JSON-LD helpers
// ---------------------------------------------------------------------------

export function localBusinessJsonLd(extra?: { areaServed?: string[] }) {
  return {
    '@context': 'https://schema.org',
    // Multi-type so we satisfy both LocalBusiness search and the more specific
    // ProfessionalService / HomeAndConstructionBusiness verticals used by
    // Google + AI engines for service-area businesses.
    '@type': ['LocalBusiness', 'ProfessionalService', 'HomeAndConstructionBusiness'],
    '@id': `${SITE_URL}#business`,
    name: business.name,
    legalName: business.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: [
      `${SITE_URL}/images/storefront.png`,
      `${SITE_URL}/images/og/default.png`,
    ],
    telephone: business.phone,
    email: business.email,
    priceRange: '$$',
    description: business.shortDescription,
    foundingDate: new Date(new Date().getFullYear() - business.yearsInBusiness, 0, 1)
      .toISOString()
      .slice(0, 10),
    slogan: business.tagline,
    knowsLanguage: ['en', 'es'],
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
    // Defines the actual service polygon as a circle around HQ — a stronger
    // local-search signal than areaServed alone, especially for AI engines
    // answering "near me" queries.
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: business.geo.latitude,
        longitude: business.geo.longitude,
      },
      geoRadius: `${business.serviceRadiusMiles * 1609}`,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address.full)}`,
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
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: Object.values(business.social),
    areaServed: extra?.areaServed?.map((a) => ({ '@type': 'City', name: a })) ?? [
      { '@type': 'City', name: 'Encino' },
      { '@type': 'City', name: 'Los Angeles' },
      { '@type': 'AdministrativeArea', name: 'Los Angeles County' },
      { '@type': 'AdministrativeArea', name: 'Ventura County' },
    ],
    makesOffer: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mold Testing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mold Inspection' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mold Remediation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Post-Remediation Clearance Testing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Emergency Mold Services' } },
    ],
    paymentAccepted: 'Cash, Check, Visa, MasterCard, American Express, Discover, ACH',
    currenciesAccepted: 'USD',
  };
}

export function serviceJsonLd({
  name,
  description,
  url,
  areaServed,
  priceRange,
  category,
}: {
  name: string;
  description: string;
  url: string;
  areaServed?: string;
  priceRange?: string;
  category?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: { '@id': `${SITE_URL}#business` },
    areaServed: areaServed
      ? [
          { '@type': 'City', name: areaServed },
          { '@type': 'AdministrativeArea', name: 'Los Angeles County' },
          { '@type': 'AdministrativeArea', name: 'Ventura County' },
        ]
      : [
          { '@type': 'AdministrativeArea', name: 'Los Angeles County' },
          { '@type': 'AdministrativeArea', name: 'Ventura County' },
        ],
    serviceType: name,
    category: category ?? 'Mold Remediation',
    ...(priceRange ? { offers: { '@type': 'Offer', priceRange, priceCurrency: 'USD' } } : {}),
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
    legalName: business.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description: business.shortDescription,
    sameAs: Object.values(business.social),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: business.phone,
        contactType: 'customer service',
        areaServed: ['US-CA'],
        availableLanguage: ['English', 'Spanish'],
        contactOption: 'TollFree',
      },
      {
        '@type': 'ContactPoint',
        telephone: business.phone,
        contactType: 'emergency',
        areaServed: ['US-CA'],
        availableLanguage: ['English', 'Spanish'],
        hoursAvailable: '24/7',
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// New GEO-optimized schemas
// ---------------------------------------------------------------------------

// WebPage with Speakable — flags Q&A / definition sections for voice and AI
// assistants. Speakable is currently used by Google Assistant and is consumed
// as a signal by other answer engines.
export function webPageJsonLd({
  url,
  name,
  description,
  lastReviewed,
  speakableSelectors = ['h1', 'h2', '.lead', '.faq-question', '.faq-answer'],
}: {
  url: string;
  name: string;
  description: string;
  lastReviewed?: string | Date;
  speakableSelectors?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url.startsWith('http') ? url : SITE_URL + url}#webpage`,
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    name,
    description,
    isPartOf: { '@id': `${SITE_URL}#website` },
    about: { '@id': `${SITE_URL}#business` },
    inLanguage: 'en-US',
    publisher: { '@id': `${SITE_URL}#organization` },
    primaryImageOfPage: `${SITE_URL}/images/og/default.png`,
    lastReviewed: lastReviewed
      ? new Date(lastReviewed).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: speakableSelectors,
    },
    reviewedBy: {
      '@type': 'Person',
      name: 'ACD Mold Lead Inspector',
      jobTitle: 'ACAC Council-Certified Microbial Investigator (CMI)',
      worksFor: { '@id': `${SITE_URL}#business` },
    },
  };
}

// Article schema — gives every long-form programmatic page Author + Publisher
// + datePublished + dateModified, the bedrock E-E-A-T signal that AI engines
// use to decide whether to cite a page.
export function articleJsonLd({
  url,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  wordCount,
}: {
  url: string;
  headline: string;
  description: string;
  image?: string;
  datePublished?: string | Date;
  dateModified?: string | Date;
  wordCount?: number;
}) {
  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
  const img = image ?? '/images/og/default.png';
  const published = datePublished
    ? new Date(datePublished).toISOString()
    : new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString();
  const modified = dateModified ? new Date(dateModified).toISOString() : new Date().toISOString();
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${fullUrl}#article`,
    mainEntityOfPage: { '@id': `${fullUrl}#webpage` },
    headline: headline.slice(0, 110),
    description,
    image: img.startsWith('http') ? img : `${SITE_URL}${img}`,
    author: {
      '@type': 'Organization',
      name: business.name,
      url: SITE_URL,
    },
    publisher: { '@id': `${SITE_URL}#organization` },
    datePublished: published,
    dateModified: modified,
    ...(wordCount ? { wordCount } : {}),
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    citation: AUTHORITY_SOURCES.map((s) => ({
      '@type': 'CreativeWork',
      name: s.name,
      url: s.url,
    })),
  };
}

// Review schema — surfaces individual testimonials. Helps AI engines pull
// real customer quotes when answering "is ACD Mold any good?" type queries.
export function reviewJsonLd(
  reviews: { author: string; location: string; quote: string; rating?: number; date?: string }[]
) {
  return reviews.map((r) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@id': `${SITE_URL}#business` },
    author: { '@type': 'Person', name: r.author, address: r.location },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: r.rating ?? 5,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: r.quote,
    datePublished: r.date ?? new Date().toISOString().slice(0, 10),
    publisher: { '@id': `${SITE_URL}#organization` },
  }));
}

// HowTo schema — for the "What to expect at your appointment" / process
// sections. AI engines love step-by-step structured data for procedural
// queries ("how does a mold inspection work?").
export function howToJsonLd({
  name,
  description,
  steps,
  totalTime,
  estimatedCost,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
  estimatedCost?: { min: number; max: number };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    ...(totalTime ? { totalTime } : {}),
    ...(estimatedCost
      ? {
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: 'USD',
            value: { '@type': 'QuantitativeValue', minValue: estimatedCost.min, maxValue: estimatedCost.max },
          },
        }
      : {}),
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

// DefinedTerm schema — AI engines treat these as canonical answers to "what
// is X" queries. We expose key mold-industry terms once site-wide.
export function definedTermSetJsonLd() {
  const terms = [
    {
      term: 'Stachybotrys chartarum',
      definition:
        'A greenish-black mold species, commonly called "black mold," that thrives on cellulose materials kept wet for 7+ days. Linked to mycotoxin exposure and elevated respiratory symptoms.',
    },
    {
      term: 'AIHA-LAP Accredited Laboratory',
      definition:
        'A microbial laboratory accredited by the American Industrial Hygiene Association Laboratory Accreditation Programs, the gold standard for defensible mold sample analysis in the United States.',
    },
    {
      term: 'IICRC S520',
      definition:
        'The Institute of Inspection, Cleaning and Restoration Certification Standard for Professional Mold Remediation. The recognized procedural standard governing containment, PPE, and clearance for mold remediation projects in the United States.',
    },
    {
      term: 'Air-O-Cell Cassette',
      definition:
        'A spore-trap air-sampling cassette drawn at 15 liters per minute against a sticky slide, then analyzed under microscope at an AIHA-accredited laboratory to identify and count airborne mold spore types.',
    },
    {
      term: 'Post-Remediation Verification (PRV)',
      definition:
        'An independent third-party visual and air-quality inspection confirming that a completed mold remediation project meets the IICRC S520 clearance criteria and the affected area is safe to reoccupy.',
    },
    {
      term: 'Condition 1, 2, 3 (IICRC)',
      definition:
        'IICRC S520 classifications: Condition 1 (normal fungal ecology), Condition 2 (settled spores from a Condition 3 source), and Condition 3 (actual mold growth). Goal of remediation is to return Condition 2 and 3 spaces to Condition 1.',
    },
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${SITE_URL}#mold-glossary`,
    name: 'ACD Mold Glossary of Mold Inspection & Remediation Terms',
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.definition,
      inDefinedTermSet: { '@id': `${SITE_URL}#mold-glossary` },
    })),
  };
}

// WebSite schema with SearchAction — standard sitelinks search box signal.
export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    url: SITE_URL,
    name: business.name,
    description: business.shortDescription,
    publisher: { '@id': `${SITE_URL}#organization` },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/service-area?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
