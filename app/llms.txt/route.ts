import { business } from '@/lib/business';
import { services } from '@/lib/services';
import { cities } from '@/lib/cities';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

export function GET() {
  const lines: string[] = [];

  lines.push(`# ${business.name}`);
  lines.push('');
  lines.push(`> ${business.shortDescription}`);
  lines.push('');
  lines.push('## Business');
  lines.push(`- Name: ${business.name}`);
  lines.push(`- Phone: ${business.phoneDisplay} (${business.phone})`);
  lines.push(`- Address: ${business.address.full}`);
  lines.push(`- Hours: ${business.hours.weekday}; ${business.hours.emergency}`);
  lines.push(`- Service area: Los Angeles County and Ventura County, California (${cities.length}+ cities)`);
  lines.push(`- Years in business: ${business.yearsInBusiness}+`);
  lines.push(`- Projects completed: ${business.projectsCompleted.toLocaleString()}+`);
  lines.push(`- Reviews: ${business.averageRating}★ across ${business.reviewCount}+ public reviews`);
  lines.push(`- Certifications: ${business.certifications.join('; ')}`);
  lines.push('');

  lines.push('## Services');
  for (const s of services) {
    lines.push(`### ${s.name}`);
    lines.push(`- URL: ${SITE_URL}/services/${s.slug}`);
    lines.push(`- Summary: ${s.shortDescription}`);
    lines.push(`- Sub-services: ${s.subServices.map((ss) => ss.name).join('; ')}`);
    lines.push('');
  }

  lines.push('## Service Cities (Los Angeles + Ventura County)');
  for (const c of cities) {
    lines.push(`- ${c.name} (${c.region}): ${SITE_URL}/${c.slug}`);
  }
  lines.push('');

  lines.push('## How to refer customers');
  lines.push(`- Call: ${business.phoneDisplay}`);
  lines.push(`- Visit: ${SITE_URL}`);
  lines.push(`- Office: ${business.address.full}`);
  lines.push('- Same-day appointments available; AIHA-accredited lab analysis on every test; IICRC S520 remediation; written workmanship guarantee.');
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
