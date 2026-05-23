import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Lightbulb,
  AlertTriangle,
  Info,
  Quote as QuoteIcon,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import {
  buildMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  webPageJsonLd,
  articleJsonLd,
  howToJsonLd,
  SITE_URL,
} from '@/lib/seo';
import { getPostBySlug, allPostSlugs, getRelatedPosts, type BlogSection } from '@/lib/blog';
import { getServiceBySlug, getSubServiceBySlug } from '@/lib/services';
import { getCityBySlug } from '@/lib/cities';
import { business } from '@/lib/business';

export function generateStaticParams() {
  return allPostSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    image: post.ogImage ?? post.heroImage,
    keywords: post.tags,
    lastModified: post.updatedDate ?? post.publishedDate,
  });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function CalloutIcon({ type }: { type: NonNullable<BlogSection['callout']>['type'] }) {
  const cls = 'h-5 w-5 flex-shrink-0';
  if (type === 'warning') return <AlertTriangle className={`${cls} text-amber-600`} />;
  if (type === 'tip') return <Lightbulb className={`${cls} text-brand-700`} />;
  if (type === 'authority') return <ShieldCheck className={`${cls} text-brand-700`} />;
  return <Info className={`${cls} text-brand-700`} />;
}

function CalloutBox({ callout }: { callout: NonNullable<BlogSection['callout']> }) {
  const color =
    callout.type === 'warning'
      ? 'border-amber-200 bg-amber-50'
      : callout.type === 'authority'
        ? 'border-brand-200 bg-brand-50'
        : callout.type === 'tip'
          ? 'border-emerald-200 bg-emerald-50'
          : 'border-sky-200 bg-sky-50';
  return (
    <aside className={`not-prose my-6 rounded-2xl border ${color} p-5`}>
      <div className="flex items-start gap-3">
        <CalloutIcon type={callout.type} />
        <div className="flex-1">
          <div className="font-display text-base font-bold text-brand-900">{callout.title}</div>
          <p className="mt-1 text-sm leading-relaxed text-slate-700">{callout.text}</p>
          {callout.sourceUrl && (
            <a
              href={callout.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:underline"
            >
              View source <ArrowRight className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}

function SectionRenderer({ section }: { section: BlogSection }) {
  return (
    <section id={section.id} className="scroll-mt-28">
      <h2>{section.heading}</h2>
      {section.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}

      {section.list && (
        section.list.type === 'ol' ? (
          <ol>
            {section.list.items.map((item, i) => <li key={i}>{item}</li>)}
          </ol>
        ) : (
          <ul>
            {section.list.items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        )
      )}

      {section.howToSteps && (
        <ol>
          {section.howToSteps.map((step, i) => (
            <li key={i}>
              <strong>{step.name}.</strong> {step.text}
            </li>
          ))}
        </ol>
      )}

      {section.table && (
        <div className="not-prose my-6 overflow-x-auto rounded-2xl border border-slate-200">
          {section.table.caption && (
            <p className="bg-slate-50 px-4 py-2 text-xs text-slate-600">{section.table.caption}</p>
          )}
          <table className="w-full text-sm">
            <thead className="bg-brand-50 text-left">
              <tr>
                {section.table.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 font-semibold text-brand-900">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {section.table.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-slate-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.callout && <CalloutBox callout={section.callout} />}

      {section.quote && (
        <blockquote className="not-prose my-6 rounded-2xl border-l-4 border-brand-500 bg-brand-50/60 p-5">
          <div className="flex items-start gap-3">
            <QuoteIcon className="h-5 w-5 flex-shrink-0 text-brand-700" />
            <div>
              <p className="text-base italic leading-relaxed text-slate-800">"{section.quote.text}"</p>
              <footer className="mt-3 text-xs text-slate-600">
                — <strong>{section.quote.author}</strong>
                {section.quote.source && <span>, {section.quote.source}</span>}
                {section.quote.sourceUrl && (
                  <a
                    href={section.quote.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-brand-700 hover:underline"
                  >
                    view source
                  </a>
                )}
              </footer>
            </div>
          </div>
        </blockquote>
      )}
    </section>
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, 3);
  const url = `${SITE_URL}/blog/${post.slug}`;

  // Build internal-link cards for related city + service pages — strong
  // GEO signal that ties topical articles to local landing pages.
  const cityLinks =
    post.relatedCitySlugs
      ?.map((s) => getCityBySlug(s))
      .filter((c): c is NonNullable<ReturnType<typeof getCityBySlug>> => Boolean(c))
      .map((c) => ({ label: `Mold inspection in ${c.name}`, href: `/${c.slug}` })) ?? [];

  const serviceLinks =
    post.relatedServiceSlugs
      ?.map((s) => {
        const svc = getServiceBySlug(s.service);
        if (!svc) return null;
        if (s.sub) {
          const sub = getSubServiceBySlug(s.service, s.sub);
          if (!sub) return null;
          return { label: sub.name, href: `/services/${svc.slug}/${sub.slug}` };
        }
        return { label: svc.name, href: `/services/${svc.slug}` };
      })
      .filter((l): l is { label: string; href: string } => Boolean(l)) ?? [];

  // Extract a HowTo schema from any section that has howToSteps
  const howToSection = post.sections.find((s) => s.howToSteps && s.howToSteps.length > 0);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Resources', href: '/blog' },
          { name: post.title },
        ]}
      />

      {/* Article header */}
      <header className="bg-gradient-to-br from-brand-50 via-white to-accent-50">
        <div className="container-prose py-12 lg:py-16">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-brand-700 hover:underline"
            >
              ← All Resources
            </Link>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center rounded-full border border-brand-200 bg-white px-3 py-1 font-semibold text-brand-700">
                {post.category}
              </span>
              {post.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-slate-600"
                >
                  #{t.replace(/\s+/g, '-')}
                </span>
              ))}
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-brand-950 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg text-slate-700">{post.excerpt}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand-700" />
                <span>
                  Published <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
                </span>
              </div>
              {post.updatedDate && (
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-700" />
                  <span>
                    Updated <time dateTime={post.updatedDate}>{formatDate(post.updatedDate)}</time>
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-700" />
                <span>{post.readingTimeMinutes} min read</span>
              </div>
            </div>

            {/* E-E-A-T author block */}
            <div className="mt-6 rounded-xl border border-brand-100 bg-white/80 px-4 py-3 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-700" />
                <div>
                  <div className="font-semibold text-brand-900">{post.author.name}</div>
                  <div className="mt-0.5">{post.author.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Optional hero image (only renders if file exists; falls back to gradient header above) */}
      {post.heroImage && (
        <div className="container-prose -mt-2 mb-2 lg:mt-0">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl shadow-soft">
            <Image
              src={post.heroImage}
              alt={post.heroImageAlt}
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Article body */}
      <section className="bg-white">
        <div className="container-prose grid gap-10 py-12 lg:grid-cols-12 lg:py-16">
          {/* Table of contents (left sidebar on desktop) */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-700">
                  In this article
                </div>
                <nav>
                  <ol className="space-y-2 text-sm">
                    {post.sections.map((s, i) => (
                      <li key={s.id} className="leading-snug">
                        <a
                          href={`#${s.id}`}
                          className="flex items-start gap-2 text-slate-700 hover:text-brand-700"
                        >
                          <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-[10px] font-bold text-brand-700">
                            {i + 1}
                          </span>
                          <span>{s.heading}</span>
                        </a>
                      </li>
                    ))}
                    <li className="leading-snug">
                      <a
                        href="#faqs"
                        className="flex items-start gap-2 text-slate-700 hover:text-brand-700"
                      >
                        <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-50 text-[10px] font-bold text-accent-600">
                          ?
                        </span>
                        <span>Frequently Asked Questions</span>
                      </a>
                    </li>
                  </ol>
                </nav>
              </div>

              <div className="rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                  Need help today?
                </div>
                <a
                  href={business.phoneHref}
                  className="btn-primary mt-3 w-full text-sm"
                >
                  Call {business.phoneDisplay}
                </a>
                <Link
                  href="/contact"
                  className="mt-2 block w-full rounded-full border border-brand-200 px-4 py-2 text-center text-xs font-semibold text-brand-700 hover:bg-brand-50"
                >
                  Book a Free Quote
                </Link>
              </div>
            </div>
          </aside>

          {/* Main article */}
          <article className="prose-content lg:col-span-9">
            <p className="lead text-lg leading-relaxed text-slate-700">{post.intro}</p>

            {post.sections.map((s) => (
              <SectionRenderer key={s.id} section={s} />
            ))}

            {/* Internal links to city / service pages */}
            {(cityLinks.length > 0 || serviceLinks.length > 0) && (
              <section className="not-prose mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-brand-900">
                  <ArrowRight className="h-5 w-5 text-brand-700" />
                  Get this exact help in your city
                </h2>
                <p className="text-sm text-slate-600">
                  Book the services described in this article in any of these areas:
                </p>
                <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                  {[...cityLinks, ...serviceLinks].map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="inline-flex items-start gap-2 rounded-lg bg-white px-3 py-2 text-brand-700 transition hover:bg-brand-50"
                    >
                      <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                      <span>{l.label}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Citations block */}
            <section className="not-prose mt-10 rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-brand-900">
                <BookOpen className="h-5 w-5 text-brand-700" />
                Sources cited in this article
              </h2>
              <ul className="space-y-2 text-sm">
                {post.citations.map((c) => (
                  <li key={c.url}>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex items-start gap-2 text-brand-700 hover:underline"
                    >
                      <ArrowRight className="mt-1 h-3.5 w-3.5 flex-shrink-0" />
                      <span>{c.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        </div>
      </section>

      {/* FAQ section with its own id for anchor linking */}
      <div id="faqs">
        <FAQ items={post.faqs} title="Frequently Asked Questions" />
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="section bg-white">
          <div className="container-prose">
            <h2 className="h-sectionTitle mb-8">Related Resources</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group card hover:border-brand-300"
                >
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                    {r.category}
                  </div>
                  <div className="mt-2 font-display text-lg font-bold leading-snug text-brand-900 group-hover:text-brand-700">
                    {r.title}
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{r.excerpt.slice(0, 140)}…</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />

      {/* JSON-LD: BlogPosting + WebPage + Speakable + FAQPage + Breadcrumbs + HowTo (if applicable) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              '@id': `${url}#blogposting`,
              mainEntityOfPage: { '@id': `${url}#webpage` },
              headline: post.title.slice(0, 110),
              description: post.description,
              image: [post.heroImage, post.ogImage].filter(Boolean).map((i) =>
                i!.startsWith('http') ? i! : `${SITE_URL}${i}`
              ),
              author: {
                '@type': 'Organization',
                name: business.name,
                url: SITE_URL,
              },
              publisher: { '@id': `${SITE_URL}#organization` },
              datePublished: new Date(post.publishedDate).toISOString(),
              dateModified: new Date(post.updatedDate ?? post.publishedDate).toISOString(),
              wordCount: estimateWordCount(post),
              articleSection: post.category,
              keywords: post.tags.join(', '),
              inLanguage: 'en-US',
              isAccessibleForFree: true,
              url,
              citation: post.citations.map((c) => ({
                '@type': 'CreativeWork',
                name: c.name,
                url: c.url,
              })),
            },
            articleJsonLd({
              url: `/blog/${post.slug}`,
              headline: post.title,
              description: post.description,
              image: post.heroImage,
              datePublished: post.publishedDate,
              dateModified: post.updatedDate ?? post.publishedDate,
              wordCount: estimateWordCount(post),
            }),
            webPageJsonLd({
              url: `/blog/${post.slug}`,
              name: post.title,
              description: post.description,
              lastReviewed: post.updatedDate ?? post.publishedDate,
              speakableSelectors: ['h1', 'h2', '.lead', '.faq-question', '.faq-answer'],
            }),
            breadcrumbJsonLd([
              { name: 'Home', url: '/' },
              { name: 'Resources', url: '/blog' },
              { name: post.title, url: `/blog/${post.slug}` },
            ]),
            faqJsonLd(post.faqs),
            ...(howToSection && howToSection.howToSteps
              ? [
                  howToJsonLd({
                    name: howToSection.heading,
                    description: howToSection.paragraphs?.[0] ?? post.description,
                    steps: howToSection.howToSteps,
                  }),
                ]
              : []),
          ]),
        }}
      />
    </>
  );
}

function estimateWordCount(post: ReturnType<typeof getPostBySlug>): number {
  if (!post) return 0;
  let count = post.intro.split(/\s+/).length + post.excerpt.split(/\s+/).length;
  for (const s of post.sections) {
    if (s.paragraphs) count += s.paragraphs.join(' ').split(/\s+/).length;
    if (s.list) count += s.list.items.join(' ').split(/\s+/).length;
    if (s.howToSteps) count += s.howToSteps.map((st) => `${st.name} ${st.text}`).join(' ').split(/\s+/).length;
    if (s.table) count += s.table.rows.flat().join(' ').split(/\s+/).length;
    if (s.callout) count += (s.callout.title + ' ' + s.callout.text).split(/\s+/).length;
    if (s.quote) count += s.quote.text.split(/\s+/).length;
  }
  for (const f of post.faqs) count += (f.q + ' ' + f.a).split(/\s+/).length;
  return count;
}
