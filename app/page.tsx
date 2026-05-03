import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import ServiceCards from '@/components/ServiceCards';
import ProcessSteps from '@/components/ProcessSteps';
import CTASection from '@/components/CTASection';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
import CityGrid from '@/components/CityGrid';
import { buildMetadata, faqJsonLd } from '@/lib/seo';
import { business } from '@/lib/business';

export const metadata = buildMetadata({
  title: `${business.name} | Mold Testing, Inspection & Remediation Across Los Angeles`,
  description: `${business.shortDescription} Same-day appointments, AIHA-accredited lab results, IICRC-certified crews. Call ${business.phoneDisplay}.`,
  path: '/',
  image: '/images/og/home.png',
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

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Certified · Local · Same-Day Available"
        title="Trusted Mold Testing, Inspection & Remediation Across Southern California"
        subtitle="ACD Mold provides ACAC-certified inspections, AIHA-accredited lab testing, and IICRC S520 compliant remediation across Los Angeles and Ventura County. Honest answers, transparent pricing, and a workmanship guarantee on every project."
        imageSrc="/images/hero/main-hero.png"
        imageAlt="ACD Mold inspector using thermal imaging camera in a Southern California home"
      />
      <TrustBar />
      <ServiceCards />
      <ProcessSteps />
      <Testimonials />
      <CityGrid />
      <FAQ items={homeFaqs} />
      <CTASection />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(homeFaqs)) }}
      />
    </>
  );
}
