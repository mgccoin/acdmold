import type { GeneratedContent, ContentSection } from './content';

// ---------------------------------------------------------------------------
// Curated page content (Layer 2).
//
// Hand-built, accuracy-reviewed content for a priority set of city×service
// pages. These OVERRIDE the programmatic generator (lib/content.ts) on the
// specific routes below, so our highest-value pages are genuinely
// differentiated and grounded in EPA/CDC/CDPH/IICRC guidance instead of
// templated filler. Everything else keeps using the generator.
//
// To add a page: drop a `<citySlug>__<serviceSlug>.json` file in lib/curated/
// (shape = GeneratedContent without wordCount) and register it in RAW below.
// ---------------------------------------------------------------------------

import altadenaInspection from './curated/altadena__mold-inspection.json';
import beverlyHillsInspection from './curated/beverly-hills__mold-inspection.json';
import burbankInspection from './curated/burbank__mold-inspection.json';
import culverCityTesting from './curated/culver-city__mold-testing.json';
import encinoInspection from './curated/encino__mold-inspection.json';
import encinoTesting from './curated/encino__mold-testing.json';
import glendaleInspection from './curated/glendale__mold-inspection.json';
import longBeachInspection from './curated/long-beach__mold-inspection.json';
import losAngelesInspection from './curated/los-angeles__mold-inspection.json';
import losAngelesTesting from './curated/los-angeles__mold-testing.json';
import pacificPalisadesInspection from './curated/pacific-palisades__mold-inspection.json';
import pasadenaInspection from './curated/pasadena__mold-inspection.json';
import santaMonicaTesting from './curated/santa-monica__mold-testing.json';
import shermanOaksInspection from './curated/sherman-oaks__mold-inspection.json';
import studioCityInspection from './curated/studio-city__mold-inspection.json';
import woodlandHillsInspection from './curated/woodland-hills__mold-inspection.json';

type RawPage = Omit<GeneratedContent, 'wordCount'>;

// Keyed by `${citySlug}/${serviceSlug}`.
const RAW: Record<string, RawPage> = {
  'altadena/mold-inspection': altadenaInspection,
  'beverly-hills/mold-inspection': beverlyHillsInspection,
  'burbank/mold-inspection': burbankInspection,
  'culver-city/mold-testing': culverCityTesting,
  'encino/mold-inspection': encinoInspection,
  'encino/mold-testing': encinoTesting,
  'glendale/mold-inspection': glendaleInspection,
  'long-beach/mold-inspection': longBeachInspection,
  'los-angeles/mold-inspection': losAngelesInspection,
  'los-angeles/mold-testing': losAngelesTesting,
  'pacific-palisades/mold-inspection': pacificPalisadesInspection,
  'pasadena/mold-inspection': pasadenaInspection,
  'santa-monica/mold-testing': santaMonicaTesting,
  'sherman-oaks/mold-inspection': shermanOaksInspection,
  'studio-city/mold-inspection': studioCityInspection,
  'woodland-hills/mold-inspection': woodlandHillsInspection,
};

function countWords(page: RawPage): number {
  const parts: string[] = [
    page.intro,
    ...page.sections.flatMap((s: ContentSection) => [...s.paragraphs, ...(s.list ?? [])]),
    ...page.faqs.flatMap((f) => [f.q, f.a]),
  ];
  return parts.join(' ').split(/\s+/).filter(Boolean).length;
}

export const curatedContent: Record<string, GeneratedContent> = Object.fromEntries(
  Object.entries(RAW).map(([key, page]) => [key, { ...page, wordCount: countWords(page) }])
);

export function getCuratedContent(citySlug: string, serviceSlug: string): GeneratedContent | undefined {
  return curatedContent[`${citySlug}/${serviceSlug}`];
}

export const curatedCount = Object.keys(curatedContent).length;
