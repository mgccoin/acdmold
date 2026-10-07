import Image from 'next/image';
import { Award, ShieldCheck, Users, FlaskConical, Phone } from 'lucide-react';
import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';
import Breadcrumbs from '@/components/Breadcrumbs';
import TrustBar from '@/components/TrustBar';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { business } from '@/lib/business';

export const metadata = buildMetadata({
  title: `About ${business.name} – Certified Mold Inspectors & Remediators`,
  description: `Learn about ACD Mold's certified team, ${business.yearsInBusiness}+ years of experience, and our commitment to honest, science-based mold testing and remediation across Los Angeles and Ventura County.`,
  path: '/about',
  image: '/images/og/about.png',
});

const values = [
  { icon: ShieldCheck, title: 'Honest Diagnostics', text: 'Our fee comes from inspection and testing, not from selling you a removal job — so there is no incentive to over-diagnose. No upselling, no fake urgency, no surprise fees.' },
  { icon: FlaskConical, title: 'Science-Based Methods', text: 'Every result is backed by AIHA-accredited third-party lab analysis and IICRC S520-based protocols.' },
  { icon: Award, title: 'Certified Professionals', text: 'Our inspectors are ACAC certified, and the remediation partners we coordinate are licensed and IICRC AMRT/WRT certified. We invest in continuing education every year.' },
  { icon: Users, title: 'Local Accountability', text: 'We are a service-area business based in Encino — your neighbors are our customers and our reputation is on the line every day.' },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'About' }]} />
      <Hero
        eyebrow={`Established ${new Date().getFullYear() - business.yearsInBusiness}`}
        title="Southern California's Most Trusted Mold Specialists"
        subtitle={`ACD Mold has spent ${business.yearsInBusiness}+ years building a reputation for honest, certified, science-based mold inspection and testing across Los Angeles and Ventura County. We are proud to be the company other contractors call when they need an independent third-party clearance test.`}
        imageSrc="/images/about/team.png"
        imageAlt="ACD Mold inspection team"
      />
      <TrustBar />

      <section className="section bg-white">
        <div className="container-prose grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="h-sectionTitle">Our Story</h2>
            <div className="prose-content mt-4">
              <p>
                ACD Mold was founded by certified building-science and environmental professionals who were tired of seeing Southern California homeowners get bad mold advice from companies that profited from over-diagnosis. We built ACD Mold to do it differently — to test only when testing matters, to inspect with the right tools, and to keep the people diagnosing and verifying the problem separate from the people paid to remove it.
              </p>
              <p>
                Today our work is mold inspection, AIHA-accredited lab testing, and independent post-remediation clearance across Los Angeles County and Ventura County; when removal is needed we coordinate licensed, insured remediation partners and then verify their work. We have completed over {business.projectsCompleted.toLocaleString()} projects, carry a {business.averageRating}-star average rating from {business.reviewCount}+ reviews, and are proud to be the independent clearance inspector other remediation contractors call when their work needs verification.
              </p>
              <p>
                We are a service-area business headquartered at {business.address.full}. We answer our own phones, our own inspectors arrive at appointments, and the person who writes your report is the same person who walked your property.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <Image src="/images/about/storefront.png" alt={`${business.name} storefront in Encino`} width={1000} height={800} className="h-full w-full object-cover" />
            </div>
            <div className="mt-4 rounded-2xl border border-brand-100 bg-brand-50/60 p-6">
              <div className="font-display text-lg font-bold text-brand-900">Our Office</div>
              <div className="mt-1 text-sm text-slate-700">{business.address.full}</div>
              <div className="mt-1 text-sm text-slate-700">{business.hours.weekday}</div>
              <a href={business.phoneHref} className="btn-primary mt-4">
                <Phone className="h-4 w-4" /> {business.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-prose">
          <h2 className="h-sectionTitle text-center">What We Believe</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mt-4 font-display text-lg font-bold text-brand-900">{title}</div>
                <p className="mt-2 text-sm text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-prose">
          <h2 className="h-sectionTitle text-center">Our Certifications</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {business.certifications.map((c) => (
              <span key={c} className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }])),
        }}
      />
    </>
  );
}
