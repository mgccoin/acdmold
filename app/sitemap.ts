import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { allCitySlugs, cities } from '@/lib/cities';
import { services } from '@/lib/services';
import { posts } from '@/lib/blog';

// Reserved slugs that exist as their own routes and are not city pages
const RESERVED = new Set([
  'services',
  'service-area',
  'about',
  'contact',
  'faq',
  'blog',
  'privacy',
  'sitemap.xml',
  'robots.txt',
  'llms.txt',
  'api',
  '_next',
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // ---------- Static marketing pages ----------
  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/service-area', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  ];
  for (const r of staticRoutes) {
    entries.push({
      url: `${SITE_URL}${r.path || '/'}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    });
  }

  // ---------- Blog posts ----------
  // Blog content earns its priority — these are GEO-optimized articles with
  // unique research, citations, and authority signals.
  for (const post of posts) {
    entries.push({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedDate ?? post.publishedDate),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // ---------- Service hubs + sub-service hubs ----------
  for (const s of services) {
    entries.push({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    });
    for (const ss of s.subServices) {
      entries.push({
        url: `${SITE_URL}/services/${s.slug}/${ss.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  // ---------- City pages, city×service, AND every city×sub-service combo ----------
  // Submitting every city×sub-service URL — even those rendered on-demand —
  // is a major GEO signal: AI engines and Google build their understanding of
  // the site's local coverage from the full URL inventory in the sitemap.
  for (const citySlug of allCitySlugs) {
    if (RESERVED.has(citySlug)) continue;

    entries.push({
      url: `${SITE_URL}/${citySlug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    });

    for (const s of services) {
      entries.push({
        url: `${SITE_URL}/${citySlug}/${s.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.75,
      });

      for (const ss of s.subServices) {
        entries.push({
          url: `${SITE_URL}/${citySlug}/${s.slug}/${ss.slug}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      }
    }
  }

  return entries;
}
