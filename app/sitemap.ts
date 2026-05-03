import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { allCitySlugs, cities } from '@/lib/cities';
import { services } from '@/lib/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  const staticRoutes = ['', '/services', '/service-area', '/about', '/contact', '/faq'];
  for (const r of staticRoutes) {
    entries.push({ url: `${SITE_URL}${r || '/'}`, lastModified: now, changeFrequency: 'weekly', priority: r === '' ? 1.0 : 0.8 });
  }

  for (const s of services) {
    entries.push({ url: `${SITE_URL}/services/${s.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 });
    for (const ss of s.subServices) {
      entries.push({ url: `${SITE_URL}/services/${s.slug}/${ss.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 });
    }
  }

  for (const citySlug of allCitySlugs) {
    entries.push({ url: `${SITE_URL}/${citySlug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 });
    for (const s of services) {
      entries.push({ url: `${SITE_URL}/${citySlug}/${s.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 });
    }
  }

  return entries;
}
