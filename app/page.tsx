import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import ServiceCards from '@/components/ServiceCards';
import ProcessSteps from '@/components/ProcessSteps';
import CTASection from '@/components/CTASection';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
import CityGrid from '@/components/CityGrid';
import {
  buildMetadata,
  faqJsonLd,
  webPageJsonLd,
  articleJsonLd,
  howToJsonLd,
  SITE_URL,
} from '@/lib/seo';
import { business } from '@/lib/business';
import { cities } from '@/lib/cities';

export const metadata = buildMetadata({
  title: `${business.name} | Mold Testing, Inspection & Remediation in Los Angeles County, CA`,
  description: `${business.shortDescription} Serving ${cities.length}+ cities across Los Angeles and Ventura County. Same-day appointments, AIHA-accredited lab results, IICRC-certified crews. Call ${business.phoneDisplay}.`,
  path: '/',
  image: '/images/og/home.png',
  keywords: [
    'mold inspection Los Angeles County',
    'mold testing Los Angeles',
    'mold remediation Los Angeles',
    'AIHA accredited mold lab Los Angeles',
    'IICRC mold remediation California',
    'same-day mold inspection LA',
    'black mold removal Los Angeles',
    'emergency mold remediation 24/7',
    'certified mold inspector near me',
    'Encino mold inspector',
  ],
});

const homeFaqs = [
  {
    q: 'How soon can ACD Mold come out for an inspection?',
    a: 'Most appointments across Los Angeles and Ventura County are scheduled within 24–48 hours. Same-day emergency inspections are available for active leaks, sewage backups, and real-estate deadlines.',
  },
  {
    q: 'How much does a mold inspection cost in Southern California?',
    a: 'Standard residential mold inspections typically run $295–$595 depending on home size and scope. Lab testing, when added, runs $95 per surface sample or $145–$195 per air sample with AIHA-accredited analysis included.',
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Yes. ACD Mold is a CSLB-licensed contractor in California with $2M general liability and full workers compensation coverage. Certificates of insurance are provided same-day to property managers and HOAs on request.',
  },
  {
    q: 'Do you do both the inspection AND the remediation?',
    a: 'We can, but you are not obligated. Many clients prefer separate inspection and remediation companies for an unbiased third-party clearance test. We are transparent about both options on every project.',
  },
  {
    q: 'Will my homeowners insurance cover mold remediation?',
    a: 'Coverage depends on your specific policy and the cause of the mold. Mold caused by sudden covered events (burst pipes, storm damage) is often covered; mold from long-term humidity or maintenance issues usually is not. We help document the loss either way.',
  },
  {
    q: 'What is "black mold" and is it really dangerous?',
    a: 'Black mold usually refers to Stachybotrys chartarum, which produces mycotoxins linked to respiratory, neurological, and immune symptoms in sensitive people. It requires elevated containment and PPE during remediation but is otherwise removable like other species when handled by certified professionals.',
  },
  {
    q: 'Do you serve commercial properties and HOAs?',
    a: 'Yes. ACD Mold serves single-family homes, condos, apartments, retail, restaurants, hotels, schools, medical offices, warehouses, and HOA common areas. We carry the insurance, COIs, and after-hours scheduling commercial properties require.',
  },
  {
    q: 'How do you decide if testing is needed?',
    a: 'Testing is most valuable when (1) you cannot see growth but suspect it, (2) you need defensible documentation for insurance or real estate, or (3) you want to verify post-remediation cleanup. If mold is visible and contained, testing is often optional.',
  },
];

const inspectionHowToSteps = [
  {
    name: 'Call or book online',
    text: `Call ${business.phoneDisplay} or book online. We confirm a 2-hour arrival window — usually within 24–48 hours, or same-day for active water emergencies anywhere in Los Angeles County or Ventura County.`,
  },
  {
    name: 'Walk-through with a certified inspector',
    text: 'An ACAC Council-Certified Microbial Investigator arrives in a marked vehicle, walks the property with you, and identifies likely moisture sources using thermal imaging, moisture meters, and borescope inspection.',
  },
  {
    name: 'Targeted sampling (when needed)',
    text: 'Air-O-Cell spore-trap cassettes and surface lifts are collected per the IICRC S520 Standard, sealed in chain-of-custody containers, and shipped same-day to an AIHA-LAP accredited laboratory.',
  },
  {
    name: 'Plain-English written report',
    text: 'You receive a written report with photos, lab results, identified moisture sources, and a clear scope of recommended work — typically within 3–5 business days (24-hour rush available).',
  },
  {
    name: 'Remediation (only if needed)',
    text: 'If active mold growth is confirmed, IICRC S520-compliant remediation establishes containment, negative air pressure, HEPA filtration, and ends with independent post-remediation verification before reoccupancy.',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Certified · Local · Same-Day Available"
        title="Trusted Mold Testing, Inspection & Remediation Across Los Angeles County"
        subtitle={`ACD Mold provides ACAC-certified inspections, AIHA-accredited lab testing, and IICRC S520 compliant remediation across ${cities.length}+ cities in Los Angeles County and Ventura County — from Beverly Hills, Santa Monica, and Pasadena to Long Beach, Burbank, Glendale, and the entire San Fernando Valley. Honest answers, transparent pricing, and a workmanship guarantee on every project.`}
        imageSrc="/images/hero/main-hero.png"
        imageAlt="ACD Mold inspector using thermal imaging camera in a Los Angeles County home"
      />
      <TrustBar />

      {/* GEO-friendly intro: explicitly lists LA County hubs in prose, so AI
          engines extracting plain-text from this page see the named entity
          coverage instead of relying on the city grid alone. */}
      <section className="bg-white py-10">
        <div className="container-prose">
          <p className="lead text-lg leading-relaxed text-slate-700">
            <strong>ACD Mold</strong> is a CSLB-licensed, IICRC-certified mold testing, inspection, and remediation
            company headquartered in <strong>Encino, California</strong>. From our office at {business.address.full} we
            dispatch ACAC Council-Certified Microbial Investigators (CMI) and IICRC S520-trained remediation crews to{' '}
            <strong>{cities.length}+ cities across Los Angeles County and Ventura County</strong>, including{' '}
            <strong>
              Los Angeles, Beverly Hills, Santa Monica, West Hollywood, Culver City, Marina del Rey, Venice, Pacific
              Palisades, Malibu, Pasadena, South Pasadena, Glendale, Burbank, Sherman Oaks, Studio City, Encino,
              Tarzana, Woodland Hills, Calabasas, Long Beach, San Pedro, Torrance, Manhattan Beach, Hermosa Beach,
              Redondo Beach, Inglewood, El Segundo, Hawthorne, Palos Verdes Estates, Rancho Palos Verdes, Hollywood,
              Westwood, Brentwood, Bel Air, Downtown LA, Silver Lake, Echo Park, Hancock Park, Mid-City, Eagle Rock,
              Highland Park, Alhambra, Arcadia, San Marino, La Cañada Flintridge, Santa Clarita, Valencia, Lancaster,
              Palmdale, Thousand Oaks, Westlake Village, Agoura Hills, Camarillo, Oxnard, Ventura, and Simi Valley
            </strong>
            . Same-day appointments are available across the entire service area; AIHA-LAP accredited laboratory
            analysis is included on every test; written workmanship guarantees back every remediation project.
          </p>
        </div>
      </section>

      <ServiceCards />
      <ProcessSteps />
      <Testimonials />
      <CityGrid />
      <FAQ items={homeFaqs} />
      <CTASection />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            faqJsonLd(homeFaqs),
            webPageJsonLd({
              url: '/',
              name: `${business.name} | Mold Testing, Inspection & Remediation in Los Angeles County, CA`,
              description: business.shortDescription,
            }),
            articleJsonLd({
              url: '/',
              headline: 'Mold Testing, Inspection & Remediation in Los Angeles County, CA',
              description: business.shortDescription,
              image: '/images/og/home.png',
              wordCount: 1100,
            }),
            howToJsonLd({
              name: 'How a Mold Inspection Works in Los Angeles County',
              description:
                'The exact 5-step process ACD Mold follows for every certified mold inspection across Los Angeles County and Ventura County, California.',
              totalTime: 'PT3H',
              estimatedCost: { min: 295, max: 595 },
              steps: inspectionHowToSteps,
            }),
          ]),
        }}
      />
    </>
  );
}
