import Hero from '@/components/Hero';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Mold Inspection & Remediation FAQs',
  description: 'Answers to the most common mold testing, inspection, and remediation questions in California. From cost to insurance to health risks — answered by certified ACD Mold professionals.',
  path: '/faq',
});

const faqs = [
  { q: 'How do I know if I have mold?', a: 'Common signs include visible discoloration on walls or ceilings, a persistent musty odor, condensation on windows, and unexplained allergy or respiratory symptoms that improve when you leave the property. If any of these apply, an inspection can confirm or rule out mold definitively.' },
  { q: 'How fast does mold grow after water damage?', a: 'In Southern California climates, mold can begin to germinate within 24–48 hours of water intrusion on porous materials. This is why emergency response matters — the first 48 hours determine whether you have a drying project or a remediation project.' },
  { q: 'Is mold actually dangerous?', a: 'Mold exposure affects everyone differently. Most healthy adults experience allergy-like symptoms; sensitive individuals (children, elderly, asthmatics, immunocompromised) can experience more severe respiratory and immune reactions. Certain species like Stachybotrys produce mycotoxins that increase the risk significantly.' },
  { q: 'How much does a mold inspection cost?', a: 'Standard residential mold inspections run $295–$595 across Southern California depending on home size and scope. Adding lab testing typically adds $95 per surface sample or $145–$195 per air sample.' },
  { q: 'How much does mold remediation cost?', a: 'Small isolated jobs (one bathroom, under 10 sq ft) typically run $1,500–$3,500. Mid-size projects (one room) run $3,500–$7,500. Whole-home or post-flood projects can range $7,500–$30,000+.' },
  { q: 'Will my homeowners insurance cover mold?', a: 'Coverage depends on your specific policy and the cause. Mold caused by sudden covered events (burst pipes, storms) is often covered. Mold from long-term humidity or maintenance is usually not. We help document the loss either way.' },
  { q: 'Should I hire the same company for inspection and remediation?', a: 'Many homeowners prefer separate companies for the inspection and remediation roles to avoid conflict of interest. ACD Mold offers both, but we will recommend a third-party clearance test if we did the remediation.' },
  { q: 'Can I just clean mold myself?', a: 'Small surface mold (under 10 sq ft) on non-porous materials can usually be cleaned by a homeowner with proper PPE. Larger areas, porous materials, or any suspicion of toxic species should be handled by certified professionals to prevent cross-contamination.' },
  { q: 'How long does mold remediation take?', a: 'Most small remediations take 1–3 days. Whole-room projects take 3–5 days. Major water-damage projects with structural drying take 5–10 days. Independent clearance testing follows.' },
  { q: 'Do I need to leave during remediation?', a: 'Small contained jobs usually allow you to stay. Larger or whole-home projects may require relocation for 2–7 days. We give you specific guidance for your situation in writing.' },
  { q: 'What is "black mold"?', a: 'Black mold typically refers to Stachybotrys chartarum, a moisture-loving species that produces mycotoxins. It requires elevated containment and PPE during remediation but is otherwise removable like any other species.' },
  { q: 'Do you offer financing?', a: 'Yes, we offer financing options through partner lenders for remediation projects over $2,500. Insurance claim assignment of benefits is also available when applicable.' },
  { q: 'How long are lab results?', a: 'Standard turnaround at AIHA-accredited labs is 3–5 business days. Rush 24-hour processing is available for an additional fee, useful for real estate transactions.' },
  { q: 'What is post-remediation clearance?', a: 'An independent third-party verification (visual + air sampling) that the remediation was successful. Most insurance carriers and informed property owners require it before final payment.' },
  { q: 'Can mold come back after remediation?', a: 'Properly remediated mold should not return as long as the underlying moisture source has been corrected. We document the source and recommend the necessary repairs in every report.' },
];

export default function FaqPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'FAQ' }]} />
      <Hero
        eyebrow="Knowledge Base"
        title="Mold Testing & Remediation – Frequently Asked Questions"
        subtitle="Honest, plain-English answers to the questions Southern California homeowners and property managers ask us most often. Still have a question? Call us anytime."
        imageSrc="/images/hero/faq-hero.png"
        imageAlt="ACD Mold inspector explaining results to homeowner"
      />
      <FAQ items={faqs} title="All Mold FAQs" />
      <CTASection />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            faqJsonLd(faqs),
            breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'FAQ', url: '/faq' }]),
          ]),
        }}
      />
    </>
  );
}
