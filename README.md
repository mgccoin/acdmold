# ACD Mold — SEO + GEO-Optimized Website

A production-ready Next.js 15 website for **ACD Mold** (Encino, CA) built for maximum SEO performance on Google **and** AI search surfaces (ChatGPT, Gemini, Perplexity, Claude). The site programmatically generates **1,580+ unique static pages** covering every combination of (city × service × sub-service) across the entire Los Angeles + Ventura County service area.

## What's included

### Programmatic SEO

- **140+ city landing pages** — one per California city in the service area
- **5 service hubs** + **27 sub-service detail pages**
- **700+ city × service combinations** (`/encino/mold-remediation`, `/long-beach/mold-inspection`, etc.)
- **700+ city × service × sub-service combinations** (statically generated for the lead sub-service per service per city; the rest are SSR-on-demand via `dynamicParams = true`)
- **Every page generates 1,700+ words of unique content** using a deterministic, seeded content generator that varies sections, examples, FAQs, and statistics by `(city, service, sub-service)` triple

### Generative Engine Optimization (GEO)

- `/llms.txt` summary file at the standard location for ChatGPT/Claude/Perplexity crawlers
- Explicit `robots.txt` allowlist for `GPTBot`, `Google-Extended`, `PerplexityBot`, `ClaudeBot`, `CCBot`, `Applebot`, `Bingbot`
- Comprehensive JSON-LD structured data on every page: `LocalBusiness`, `Organization`, `Service`, `BreadcrumbList`, `FAQPage`, `AggregateRating`, `OpeningHoursSpecification`, `GeoCoordinates`
- Plain-language H2 sub-headers and definitive intros optimized for AI answer extraction
- Per-city natural language about housing stock, climate, neighborhoods, and ZIP codes for genuine local relevance

### UX / UI

- Modern Tailwind CSS design with custom brand palette
- Responsive top utility bar (desktop) + sticky mobile call/text button (mobile)
- Sticky header with services dropdown
- Hero with thermal-imaging photography
- Service cards with custom AI-generated imagery
- 4-step process visualization
- Animated FAQ accordion
- Testimonials grid
- Comprehensive city directory grouped by region

### Contact + Conversion

- Sticky **Call Now** + **Text** buttons fixed at the bottom of every mobile screen
- Click-to-call telephone links throughout
- Contact form with city/service pre-selectors
- 24/7 emergency phone presence
- Click-to-call branded CTA on every section

### Generated images

The website ships with 25 professionally generated photos (storefront, team, hero, service cards) under `/public/images/`. They use AI imagery and can be swapped for real photos at any time.

---

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) icons
- Inter + Plus Jakarta Sans (Google Fonts via `next/font`)

---

## Project structure

```
acd mold/
├── app/
│   ├── layout.tsx                      # Root layout with global metadata + JSON-LD
│   ├── page.tsx                        # Homepage
│   ├── globals.css                     # Tailwind + custom design tokens
│   ├── about/page.tsx                  # About us
│   ├── contact/page.tsx                # Contact form
│   ├── faq/page.tsx                    # Master FAQ (15 questions, FAQ schema)
│   ├── service-area/page.tsx           # All 140+ cities grouped by region
│   ├── services/
│   │   ├── page.tsx                    # Service catalog hub
│   │   ├── [service]/page.tsx          # Service hub (e.g. /services/mold-testing)
│   │   └── [service]/[subservice]/page.tsx
│   ├── [city]/
│   │   ├── page.tsx                    # City landing (e.g. /encino)
│   │   ├── [service]/page.tsx          # City × service (e.g. /encino/mold-remediation)
│   │   └── [service]/[subservice]/page.tsx
│   ├── blog/page.tsx                   # Resources hub (placeholders)
│   ├── privacy/page.tsx
│   ├── not-found.tsx
│   ├── sitemap.ts                      # Generates sitemap.xml
│   ├── robots.ts                       # robots.txt with AI-bot allowlist
│   └── llms.txt/route.ts               # /llms.txt for AI crawlers
├── components/
│   ├── Header.tsx                      # Sticky nav with services dropdown
│   ├── TopBar.tsx                      # Desktop utility bar (phone, hours, address)
│   ├── Footer.tsx                      # Multi-column footer
│   ├── Hero.tsx                        # Reusable hero block
│   ├── ServiceCards.tsx                # 5 service cards (city-aware)
│   ├── SubServiceGrid.tsx              # Sub-service grid
│   ├── CityGrid.tsx                    # Region-grouped city links
│   ├── ProcessSteps.tsx                # 4-step process
│   ├── Testimonials.tsx                # 6 testimonials
│   ├── TrustBar.tsx                    # Cert badges row
│   ├── CTASection.tsx                  # Call-to-action block
│   ├── FAQ.tsx                         # Accordion FAQ
│   ├── Breadcrumbs.tsx                 # Visual + JSON-LD breadcrumbs
│   ├── GeneratedArticle.tsx            # 1700+ word article renderer
│   └── StickyCallButton.tsx            # Mobile-only sticky call/text button
├── lib/
│   ├── business.ts                     # All business data (name, phone, address)
│   ├── cities.ts                       # 140+ cities with ZIPs, climate, neighborhoods
│   ├── services.ts                     # 5 services with 27 sub-services
│   ├── content.ts                      # Programmatic 1700+ word content generator
│   ├── seo.ts                          # Metadata + JSON-LD helpers
│   └── seed.ts                         # Deterministic seeded RNG
├── public/
│   ├── favicon.svg
│   ├── site.webmanifest
│   └── images/                         # 25 AI-generated images
└── README.md
```

---

## Running locally

Requires **Node 20+** (tested on Node 22).

```bash
npm install
npm run dev          # Dev server on http://localhost:3000
npm run build        # Production build (~3 minutes for 1,586 pages)
npm run start        # Production server
```

To run on a different port:

```bash
$env:PORT=3210; npm run start    # Windows PowerShell
PORT=3210 npm run start          # macOS / Linux
```

---

## Lead capture → Google Sheets

Form submissions on `/contact` flow into your Google Sheet:
[ORGANIC LEADS RIKO](https://docs.google.com/spreadsheets/d/1yKPZ_-5oqV2PBj8hlwFikznDCiiHBkWC5uHhVsHfzjc/edit)

### One-time setup

1. **Open the sheet** and rename the first tab to `Leads` (the script will create it if missing).
2. **Extensions → Apps Script.**
3. **Replace** the default `Code.gs` contents with the contents of [`scripts/google-apps-script-lead-webhook.gs`](./scripts/google-apps-script-lead-webhook.gs). Save.
4. **Project Settings → Script Properties** → add:
   - `SHARED_SECRET` = (any long random string — generate one with `openssl rand -hex 32` or just type 40 characters)
   - `NOTIFY_EMAIL` = `info@acdmold.com` (optional — sends you an email on every lead)
5. **Deploy → New deployment** → type **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone** (required so the website can POST)
6. Copy the Web App URL it gives you.
7. Create a `.env.local` file at the project root:
   ```env
   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbx.../exec
   LEAD_WEBHOOK_SECRET=the-same-string-you-set-in-script-properties
   ```
8. Restart the dev server (or redeploy production) so the new env vars load.

### Test it

Visit `/contact`, submit the form, and you should see a row appear in the sheet within 1–2 seconds. The script also sends an email to `NOTIFY_EMAIL` if set.

### What ships built-in

- ✅ Server-side validation (name, email, phone format)
- ✅ Honeypot spam field (invisible to humans, bots fill it)
- ✅ Per-IP rate limit (3 submissions / 10 min)
- ✅ Shared-secret auth so randos can't post fake leads to your sheet
- ✅ Captures: timestamp, name, email, phone, city, service, message, IP, user-agent, referrer
- ✅ Inline success state (form replaced with a confirmation card)
- ✅ Inline error state with field-level highlighting
- ✅ Loading state on the submit button (spinner)
- ✅ Falls back to "call us" message if the webhook is unreachable

### Reuse the form anywhere

```tsx
import LeadForm from '@/components/LeadForm';

<LeadForm defaultCity="Encino" defaultService="Mold Inspection" compact />
```

---

## Customization

### Update business info

Edit `lib/business.ts`:

```ts
export const business = {
  name: 'ACD Mold',
  phone: '+14243527034',
  phoneDisplay: '(424) 352-7034',
  address: { street: '17209 Ventura Blvd', city: 'Encino', region: 'CA', postalCode: '91316', ... },
  ...
};
```

### Add or edit cities

Edit `lib/cities.ts` — each city is created with the `C(...)` helper. Provide ZIP codes, neighborhoods, and climate data for richer per-city content.

### Add or edit services / sub-services

Edit `lib/services.ts` — services define `name`, `slug`, `tagline`, `longDescription`, FAQs, and a `subServices` array. Each sub-service automatically gets its own page at `/services/<service>/<subservice>` and `/<city>/<service>/<subservice>`.

### Replace AI images with real photos

Drop your photos into `public/images/services/`, `public/images/hero/`, `public/images/about/`, or `public/images/og/` using the same filenames as the existing placeholders. No code changes needed.

### Update the verification token

In `app/layout.tsx`, set the Google Search Console verification token:

```ts
verification: {
  google: 'your-google-site-verification-token',
},
```

---

## Deploying

### Vercel (recommended)

```bash
npx vercel --prod
```

Set the project root and let Vercel auto-detect Next.js. The 1,586 static pages will be served from Vercel's CDN with sub-100ms TTFB worldwide.

### Other hosts

Any Node 20+ host works (Cloudflare Pages, Netlify, Render, AWS Amplify). Run `npm run build` then `npm run start`.

### After deploy

1. Submit `/sitemap.xml` to **Google Search Console**, **Bing Webmaster Tools**.
2. Verify `/llms.txt` is accessible — this helps GPT/Claude/Perplexity index your site.
3. Claim your **Google Business Profile** with the same NAP (Name, Address, Phone) used in `lib/business.ts`.
4. Submit citations to **Yelp**, **Apple Maps**, **Bing Places**, **NextDoor Business**.
5. Set up Schema validation at https://validator.schema.org/ for a sample of city + service pages.

---

## SEO checklist

- [x] Unique title + meta description per page
- [x] Canonical URLs
- [x] Open Graph + Twitter Card metadata
- [x] JSON-LD (LocalBusiness, Service, FAQPage, BreadcrumbList, Organization)
- [x] AggregateRating + OpeningHoursSpecification + GeoCoordinates
- [x] Comprehensive sitemap.xml with all static + dynamic routes
- [x] robots.txt with explicit AI bot allowlist (GPTBot, Google-Extended, ClaudeBot, PerplexityBot)
- [x] /llms.txt for AI crawlers
- [x] H1 → H2 → H3 hierarchy on every page
- [x] Internal linking from every page to relevant city/service pages
- [x] Image alt text everywhere
- [x] 1,700+ words of unique content per programmatic page
- [x] Mobile-first responsive design
- [x] Sticky mobile call button for conversion
- [x] Click-to-call (`tel:` links) throughout
- [x] Page speed: 100 kB First Load JS, AVIF/WebP image optimization

---

## License

Proprietary — © ACD Mold Inspection & Remediation. All rights reserved.
