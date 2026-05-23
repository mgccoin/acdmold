import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  buildMetadata,
  breadcrumbJsonLd,
  webPageJsonLd,
  SITE_URL,
} from '@/lib/seo';
import { getRecentPosts } from '@/lib/blog';

export const metadata = buildMetadata({
  title: 'Mold Resources & Guides — Los Angeles County, CA',
  description:
    'In-depth, science-based mold testing, inspection, and remediation guides for Los Angeles County and Ventura County homeowners. Costs, insurance, health, certifications — written and reviewed by certified inspectors.',
  path: '/blog',
  keywords: [
    'mold inspection guide Los Angeles',
    'mold remediation cost California',
    'black mold information',
    'mold homeowners insurance California',
    'mold inspector hiring guide',
    'mold after wildfire',
    'Stachybotrys facts',
  ],
});

export default function BlogPage() {
  const posts = getRecentPosts();

  return (
    <>
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Resources' }]} />
      <Hero
        eyebrow="Free Resources"
        title="Mold Knowledge for Los Angeles County Homeowners"
        subtitle="Honest, science-based guides written and reviewed by ACAC-certified mold inspectors and IICRC-certified remediators. No scare tactics, no upsells — just the information you need to make confident decisions."
        imageSrc="/images/hero/blog-hero.png"
        imageAlt="ACD Mold knowledge base for Los Angeles County homeowners"
      />

      <section className="section bg-white">
        <div className="container-prose">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-700">
              Editorial Standards
            </span>
            <h2 className="h-sectionTitle mt-2">
              Reviewed by certified mold professionals
            </h2>
            <p className="mt-4 text-slate-600">
              Every article in this library is written and reviewed by an ACAC Council-Certified Microbial Investigator
              (CMI) and IICRC-certified Applied Microbial Remediation Technician (AMRT). We cite the U.S. EPA, CDC,
              IICRC S520 Standard, AIHA, and the California Department of Public Health throughout. If you find an
              error, email <a href="mailto:info@acdmold.com" className="text-brand-700 underline">info@acdmold.com</a>{' '}
              and we will correct it.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {posts.map((p, i) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className={`group block ${i === 0 ? 'lg:col-span-2' : ''}`}
              >
                <article
                  className={`flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition hover:border-brand-300 hover:shadow-lg ${
                    i === 0 ? 'lg:grid lg:grid-cols-5 lg:gap-0' : ''
                  }`}
                >
                  <div
                    className={`relative ${
                      i === 0 ? 'lg:col-span-2' : ''
                    } aspect-[16/9] overflow-hidden bg-gradient-to-br from-brand-100 via-brand-50 to-accent-50`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-brand-300/60" />
                    </div>
                    <div className="absolute left-4 top-4">
                      <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-700 backdrop-blur">
                        {p.category}
                      </span>
                    </div>
                  </div>
                  <div className={`flex flex-1 flex-col p-6 ${i === 0 ? 'lg:col-span-3 lg:p-8' : ''}`}>
                    <h3
                      className={`font-display font-bold leading-tight text-brand-900 group-hover:text-brand-700 ${
                        i === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'
                      }`}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                      {p.excerpt}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <time dateTime={p.publishedDate}>
                          {new Date(p.publishedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{p.readingTimeMinutes} min read</span>
                      </div>
                    </div>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                      Read article <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Blog',
              '@id': `${SITE_URL}/blog#blog`,
              name: 'ACD Mold Resources',
              description:
                'In-depth mold testing, inspection, and remediation guides for Los Angeles County homeowners.',
              url: `${SITE_URL}/blog`,
              publisher: { '@id': `${SITE_URL}#organization` },
              inLanguage: 'en-US',
              blogPost: posts.map((p) => ({
                '@type': 'BlogPosting',
                '@id': `${SITE_URL}/blog/${p.slug}#blogposting`,
                headline: p.title.slice(0, 110),
                description: p.description,
                url: `${SITE_URL}/blog/${p.slug}`,
                datePublished: new Date(p.publishedDate).toISOString(),
                dateModified: new Date(p.updatedDate ?? p.publishedDate).toISOString(),
                author: { '@type': 'Organization', name: 'ACD Mold' },
              })),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              itemListElement: posts.map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `${SITE_URL}/blog/${p.slug}`,
                name: p.title,
              })),
            },
            webPageJsonLd({
              url: '/blog',
              name: 'Mold Resources & Guides — Los Angeles County, CA',
              description:
                'Science-based mold testing, inspection, and remediation guides for Los Angeles County.',
            }),
            breadcrumbJsonLd([
              { name: 'Home', url: '/' },
              { name: 'Resources', url: '/blog' },
            ]),
          ]),
        }}
      />
    </>
  );
}
