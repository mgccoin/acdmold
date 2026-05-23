/**
 * Blog post data layer for ACD Mold.
 *
 * Each post is a structured object so the renderer can build rich JSON-LD
 * (BlogPosting, FAQPage, Speakable, HowTo, BreadcrumbList) automatically and
 * cross-link to relevant city / service pages for internal-linking GEO.
 *
 * To add a new post: append an entry to `posts` below and it ships everywhere
 * (blog index, sitemap, /llms.txt, related-posts widgets).
 */

export type BlogSection = {
  /** Slug for #anchor links — used in the table of contents */
  id: string;
  heading: string;
  paragraphs?: string[];
  list?: { type: 'ul' | 'ol'; items: string[] };
  table?: { caption?: string; headers: string[]; rows: string[][] };
  callout?: {
    type: 'info' | 'warning' | 'tip' | 'authority';
    title: string;
    text: string;
    sourceUrl?: string;
  };
  quote?: { text: string; author: string; source?: string; sourceUrl?: string };
  howToSteps?: { name: string; text: string }[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  publishedDate: string;
  updatedDate?: string;
  author: { name: string; role: string; url?: string };
  category: string;
  tags: string[];
  readingTimeMinutes: number;
  heroImage: string;
  heroImageAlt: string;
  ogImage?: string;
  intro: string;
  sections: BlogSection[];
  faqs: { q: string; a: string }[];
  relatedCitySlugs?: string[];
  relatedServiceSlugs?: { service: string; sub?: string }[];
  citations: { name: string; url: string }[];
};

const ACAC_AUTHOR = {
  name: 'ACD Mold Editorial Team',
  role: "Reviewed by an ACAC Council-Certified Microbial Investigator (CMI) and IICRC-certified Applied Microbial Remediation Technician (AMRT)",
  url: '/about',
};

export const posts: BlogPost[] = [
  // ===========================================================================
  // POST 1 — Programmatic pricing intent. Targets ~50 "[city] mold inspection
  // cost" queries simultaneously via a single article AI engines can quote.
  // ===========================================================================
  {
    slug: 'mold-inspection-cost-los-angeles-2026',
    title: 'Mold Inspection Cost in Los Angeles County (2026): Real Pricing by City',
    description:
      'What a mold inspection actually costs across Los Angeles County in 2026 — broken down by city, property size, and scope. Real numbers from 8,500+ inspections, with insurance and add-on details.',
    excerpt:
      'A standard residential mold inspection in Los Angeles County runs $295 to $595 in 2026 — but the exact number depends on city, square footage, lab sampling, and whether the property is involved in a real-estate or insurance situation. Here is the full breakdown.',
    publishedDate: '2026-02-04',
    updatedDate: '2026-05-23',
    author: ACAC_AUTHOR,
    category: 'Pricing & Cost Guides',
    tags: ['pricing', 'cost', 'inspection', 'Los Angeles County', 'insurance'],
    readingTimeMinutes: 9,
    heroImage: '/images/blog/mold-inspection-cost-hero.png',
    heroImageAlt: 'Certified mold inspector reviewing a quote with a Los Angeles homeowner',
    ogImage: '/images/og/blog-pricing.png',
    intro:
      'If you have searched "how much does a mold inspection cost in Los Angeles" you have probably seen quotes ranging from "free" to $1,500 — and that range is precisely why most homeowners feel like they are being scammed before they even book the appointment. After 8,500+ inspections across Los Angeles and Ventura County, here is the honest 2026 pricing picture, broken down by city, property type, and the add-ons that actually change the number.',
    sections: [
      {
        id: 'baseline',
        heading: 'The baseline: $295 – $595 for a standard residential mold inspection',
        paragraphs: [
          'A standard ACD Mold residential inspection in Los Angeles County in 2026 falls in the $295 – $595 range. This includes a full walk-through with the homeowner, thermal imaging, moisture-meter measurements, borescope inspection of suspect cavities, photo documentation, and a written report with findings and recommendations.',
          'It does NOT include laboratory testing — that is an add-on, priced per sample (see below). Many homeowners do not actually need lab testing if mold growth is visible and contained, which is something a good inspector will tell you up front instead of automatically billing it.',
        ],
        callout: {
          type: 'tip',
          title: 'Free inspection = sales call',
          text: 'Any company that offers a "free mold inspection" is operating a sales appointment, not an inspection. A certified inspector cannot afford to spend 2–3 hours on site for free — the company is recovering the cost by selling you remediation, often whether you need it or not. Pay the $295 for an honest answer.',
        },
      },
      {
        id: 'by-city',
        heading: 'Mold inspection cost by Los Angeles County city (2026)',
        paragraphs: [
          'Pricing varies modestly by neighborhood — mostly driven by drive time, property size norms in the area, and whether hillside / multi-level construction makes the inspection more involved. The table below reflects the typical mid-range we quote in each city for a 1,500–2,500 sq ft single-family home with no special access challenges.',
        ],
        table: {
          caption:
            'Typical 2026 residential mold inspection pricing for ACD Mold across Los Angeles County and Ventura County. Add lab testing per sample (see next section).',
          headers: ['City', 'Region', 'Typical Inspection Price', 'Notes'],
          rows: [
            ['Beverly Hills', 'Westside', '$395 – $695', 'Larger square footage average; flats vs hills affect pricing'],
            ['Santa Monica', 'Westside', '$395 – $695', 'Marine-layer humidity adds attic/crawl-space steps'],
            ['Pasadena', 'San Gabriel Valley', '$345 – $595', 'Historic plaster homes often need more borescope time'],
            ['Long Beach', 'Harbor Area', '$345 – $595', 'Salt-air-exposed homes; multi-floor adds time'],
            ['Encino', 'San Fernando Valley', '$295 – $495', 'Our home base; minimal drive time'],
            ['Sherman Oaks', 'San Fernando Valley', '$295 – $495', 'Hillside homes may add $50–$100'],
            ['Studio City', 'San Fernando Valley', '$295 – $495', 'Hillside seepage focus areas'],
            ['Burbank', 'San Fernando Valley', '$295 – $495', 'Magnolia Park bungalows have older plumbing'],
            ['Glendale', 'Greater LA', '$295 – $495', 'High-rise condos priced per unit'],
            ['Calabasas', 'Conejo Valley', '$345 – $645', 'Hillside estates with larger square footage'],
            ['Malibu', 'Westside', '$445 – $895', 'Drive time + beachfront salt-air complexity'],
            ['Pacific Palisades', 'Westside', '$445 – $795', 'Post-fire properties may require additional protocols'],
            ['Manhattan Beach', 'South Bay', '$395 – $695', 'Sand-pad crawl spaces add complexity'],
            ['Torrance', 'South Bay', '$295 – $545', 'Standard inland pricing'],
            ['Inglewood', 'South Bay', '$295 – $545', 'Historic homes near LAX may have additional moisture sources'],
            ['Downtown LA / DTLA', 'Greater LA', '$345 – $695', 'High-rise condos priced per unit; lobby coordination'],
            ['Hollywood', 'Greater LA', '$345 – $595', 'Hillside or historic building add-ons'],
            ['Santa Clarita / Valencia', 'Santa Clarita Valley', '$345 – $595', 'Master-planned communities; HOA coordination'],
            ['Thousand Oaks', 'Conejo Valley', '$345 – $595', 'Drive-time-adjusted'],
            ['Ventura / Oxnard', 'Ventura County', '$395 – $695', 'Marine-layer humidity + drive time'],
          ],
        },
      },
      {
        id: 'lab-testing',
        heading: 'Mold lab testing prices (add-on)',
        paragraphs: [
          'Lab testing is the most misunderstood line item in a mold inspection invoice. Tests are NOT priced like inspections — they are priced per sample, and the lab cost is usually a fixed pass-through.',
        ],
        table: {
          headers: ['Sample Type', 'Typical Price', 'Turnaround', 'When to use it'],
          rows: [
            ['Air sample (Air-O-Cell cassette)', '$145 – $195 each', '3–5 business days', 'Suspect hidden mold; pre/post remediation; real-estate closing'],
            ['Surface sample (tape lift)', '$85 – $125 each', '3–5 business days', 'Visible discoloration — confirm it is mold and identify species'],
            ['Swab sample', '$85 – $125 each', '3–5 business days', 'Same as tape lift, for irregular surfaces'],
            ['Bulk sample (drywall, insulation)', '$125 – $175 each', '3–5 business days', 'Identifying contamination depth before remediation'],
            ['Rush 24-hour processing', '+$95 – $145 surcharge', '24 hours', 'Real-estate closings, insurance deadlines, court'],
            ['ERMI / HERTSMI-2 (DNA panel)', '$295 – $395 each', '7–10 days', 'Mold-illness diagnostics under physician care'],
          ],
        },
        callout: {
          type: 'authority',
          title: 'Why AIHA accreditation matters',
          text: 'Always confirm the lab is AIHA-LAP accredited. The American Industrial Hygiene Association Laboratory Accreditation Programs is the recognized standard for defensible mold sample analysis in the United States — courts, insurance carriers, and the IICRC S520 Standard all reference it.',
          sourceUrl: 'https://www.aihaaccreditedlabs.org/',
        },
      },
      {
        id: 'remediation-cost',
        heading: 'What about remediation cost — not just inspection?',
        paragraphs: [
          'Remediation pricing is a different conversation entirely, and any honest answer depends on the size of the contaminated area, the materials involved, and whether structural framing is affected. Across Los Angeles County in 2026, here is the realistic range:',
        ],
        list: {
          type: 'ul',
          items: [
            'Small isolated mold (under 10 sq ft, single bathroom or kitchen area): $1,500 – $3,500',
            'Medium project (one full room, water-damaged drywall and flooring): $3,500 – $7,500',
            'Large project (multiple rooms or whole-floor flood): $7,500 – $18,000',
            'Whole-home post-flood or major-fire restoration: $18,000 – $60,000+',
            'HVAC duct decontamination (NADCA standard): $895 – $2,495 depending on duct length',
            'Crawl space remediation: $1,895 – $5,995 depending on square footage',
            'Attic mold removal: $1,495 – $4,995 with ventilation correction',
            'Post-remediation clearance testing (independent third party): $395 – $695',
          ],
        },
      },
      {
        id: 'insurance',
        heading: 'Does homeowners insurance cover the inspection?',
        paragraphs: [
          'In California, the answer is usually NO for the inspection itself but POSSIBLY YES for remediation — and only when the underlying cause is a covered peril.',
          'A "covered peril" in standard California HO-3 policies includes burst pipes, sudden plumbing failures, washing-machine hose ruptures, water-heater bursts, and storm-driven roof leaks. Long-term humidity, slow-drip plumbing leaks, and maintenance neglect are typically excluded. Many policies also cap mold-specific coverage at $10,000 or require a mold-coverage endorsement.',
          'The practical workflow: pay for the inspection out of pocket, get the written report and lab results documenting the cause, then file the claim with that documentation already in hand. Carriers approve documented losses dramatically faster than undocumented ones.',
        ],
        callout: {
          type: 'warning',
          title: 'Do not start remediation before the carrier inspects',
          text: 'If you tear out drywall before your insurance adjuster sees the damage, your claim can be denied for "spoliation of evidence." Document everything with photos before any demo work begins.',
        },
      },
      {
        id: 'red-flags',
        heading: 'Pricing red flags to watch for',
        list: {
          type: 'ol',
          items: [
            '"Free" mold inspections that immediately produce a multi-thousand-dollar remediation quote.',
            'Inspectors who refuse to provide their certification numbers (ACAC, IICRC) in writing.',
            'Verbal-only quotes — every legitimate inspection ends with a written scope.',
            'Companies that perform BOTH the inspection AND remediation without offering a third-party clearance option.',
            'Pricing based on "square footage of growth" before any inspection has happened.',
            'Pressure to sign a remediation contract on the same visit as the inspection.',
            'Refusal to use an AIHA-accredited third-party lab and instead "analyze samples in-house."',
          ],
        },
      },
      {
        id: 'how-to-book',
        heading: 'How to book a defensible mold inspection in LA County',
        howToSteps: [
          {
            name: 'Confirm the inspector is certified',
            text: 'Ask for the inspector\'s ACAC CMI or CMC certification number and IICRC AMRT certification number. Verify on the ACAC and IICRC public lookup tools.',
          },
          {
            name: 'Get the inspection scope in writing before booking',
            text: 'A real inspection scope includes thermal imaging, moisture metering, borescope-as-needed, and a written report with photos. If sampling is recommended, the lab name (must be AIHA-LAP accredited) goes on the proposal.',
          },
          {
            name: 'Pay the inspection invoice up front',
            text: 'Avoid any company that bundles inspection cost into a "we waive it if you book remediation" offer — that incentive structure creates over-diagnosis.',
          },
          {
            name: 'Receive the written report within 3–5 business days',
            text: 'A defensible report includes photo logs, moisture maps, thermal images, lab results (if applicable), identified moisture sources, scope of recommended remediation if any, and the inspector\'s license/certification numbers.',
          },
          {
            name: 'Get a remediation quote from a SEPARATE company',
            text: 'If remediation is recommended, take the report to one or two remediation companies for quotes. Insist on IICRC S520 compliance and independent post-remediation verification by a third party.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'How much does a mold inspection cost in Los Angeles in 2026?',
        a: 'A standard residential mold inspection in Los Angeles County costs $295 – $595 in 2026. Larger homes, hillside properties, beachfront properties (Malibu, Pacific Palisades, Manhattan Beach), and high-rise condos with lobby coordination can run $395 – $895. Lab testing is a separate per-sample add-on at $85 – $195.',
      },
      {
        q: 'Are "free mold inspections" actually free?',
        a: 'No. A "free mold inspection" is a sales appointment in disguise. The company is recovering the cost by selling you remediation work — often work you do not need. Pay the $295 for an independent, certified inspection from a company whose business model is inspection (not remediation).',
      },
      {
        q: 'How much does it cost to test air for mold?',
        a: 'Air sampling using Air-O-Cell cassettes (the industry standard spore-trap method) runs $145 – $195 per sample at AIHA-LAP accredited labs in California. Most homes need 2–4 samples plus one outdoor control sample. Lab turnaround is 3–5 business days, with 24-hour rush available for an extra $95 – $145.',
      },
      {
        q: 'Will my homeowners insurance pay for a mold inspection?',
        a: 'Usually not for the inspection itself, but possibly for remediation if the underlying cause is a covered peril (burst pipe, washing-machine hose failure, water heater rupture, storm damage). Long-term humidity and maintenance issues are typically excluded. Many California policies cap mold coverage at $10,000 unless you have a specific mold endorsement.',
      },
      {
        q: 'How much does mold remediation cost in Los Angeles?',
        a: 'Small isolated remediation (under 10 sq ft) runs $1,500 – $3,500. A single-room project runs $3,500 – $7,500. Whole-home or post-flood projects range $7,500 – $30,000+. Pricing is driven by square footage of contamination, materials affected, containment requirements, and whether structural framing is involved.',
      },
      {
        q: 'How much does post-remediation clearance testing cost?',
        a: 'Independent third-party post-remediation verification (visual inspection + air sampling) costs $395 – $695 in Los Angeles County. This is the IICRC S520-recognized verification that the remediation was successful and the area is safe to reoccupy. Most reputable remediation contracts and insurance carriers require it.',
      },
    ],
    relatedCitySlugs: [
      'beverly-hills',
      'santa-monica',
      'pasadena',
      'long-beach',
      'encino',
      'malibu',
      'los-angeles',
      'sherman-oaks',
    ],
    relatedServiceSlugs: [
      { service: 'mold-inspection' },
      { service: 'mold-testing' },
      { service: 'mold-remediation' },
      { service: 'post-remediation' },
    ],
    citations: [
      { name: 'AIHA Laboratory Accreditation Programs', url: 'https://www.aihaaccreditedlabs.org/' },
      { name: 'IICRC S520 Standard for Professional Mold Remediation', url: 'https://iicrc.org/standards/iicrc-s520/' },
      { name: 'EPA — Mold Course Chapter 2', url: 'https://www.epa.gov/mold/mold-course-chapter-2' },
      { name: 'California Department of Public Health — Indoor Air Quality', url: 'https://www.cdph.ca.gov/Programs/CCDPHP/DEODC/EHLB/IAQ/Pages/IAQ.aspx' },
    ],
  },

  // ===========================================================================
  // POST 2 — Timely, location-specific, high-authority. Targets 2025 wildfire
  // survivors in Pacific Palisades, Altadena, and surrounding Eaton-fire areas.
  // ===========================================================================
  {
    slug: 'mold-after-2025-la-wildfires',
    title: 'Mold After the 2025 Eaton & Palisades Fires: What LA Survivors Need to Know',
    description:
      'A complete guide for 2025 LA wildfire survivors: how to inspect for hidden mold in fire-damaged and water-damaged homes, what insurance covers, and the testing protocol survivors actually need.',
    excerpt:
      'Fire suppression water, displaced occupancy, and damaged building envelopes have created a second-wave mold crisis across Pacific Palisades, Altadena, and Sierra Madre. This is what survivors need to test for, when, and how to document it for insurance.',
    publishedDate: '2026-01-15',
    updatedDate: '2026-05-23',
    author: ACAC_AUTHOR,
    category: 'Disaster Response',
    tags: ['wildfire', 'Eaton Fire', 'Palisades Fire', 'Altadena', 'Pacific Palisades', 'insurance'],
    readingTimeMinutes: 11,
    heroImage: '/images/blog/wildfire-mold-hero.png',
    heroImageAlt: 'Inspector documenting fire- and water-damaged drywall after the 2025 Altadena fires',
    intro:
      'The January 2025 Palisades and Eaton fires destroyed or damaged more than 16,000 structures across Los Angeles County. A year later, a quieter crisis is unfolding in the homes that survived: tens of thousands of properties absorbed thousands of gallons of fire-suppression water, sat sealed up for months while occupants were displaced, and reopened to find that mold colonies had been quietly establishing themselves in wall cavities, attics, and crawl spaces. This guide is for the survivors of those fires — what to test, when, how to document it for insurance, and which contractors to trust.',
    sections: [
      {
        id: 'why-fire-causes-mold',
        heading: 'Why fire causes mold (it is the water, not the smoke)',
        paragraphs: [
          'Counterintuitively, the biggest mold risk after a wildfire is not the smoke or the heat — it is the water. A single residential structure fire in California is hit with somewhere between 2,500 and 25,000 gallons of pressurized water from LAFD and LACoFD hose lines during suppression. That water saturates drywall, insulation, framing, and subfloor materials within minutes.',
          'In a normal interior water-damage event, drying begins within 24 hours. In a fire-damaged home, the structure is often sealed off for safety inspections, debris-flow assessment, hazardous-materials remediation, and insurance walk-throughs that delay drying by weeks or months. The EPA confirms that mold can begin to grow on damp surfaces in as little as 24 to 48 hours — meaning that by the time most fire survivors are allowed back into their homes, a Condition 3 (active growth) microbial event has already occurred behind the walls.',
        ],
        callout: {
          type: 'authority',
          title: 'EPA on post-disaster mold timing',
          text: 'The U.S. EPA publishes that "if mold growth has occurred or is suspected, the source of moisture must be eliminated and the mold must be cleaned up." After a fire-suppression water event, the source has already been on the materials long enough to germinate.',
          sourceUrl: 'https://www.epa.gov/mold/mold-cleanup-your-home',
        },
      },
      {
        id: 'palisades-eaton-specific',
        heading: 'Palisades and Eaton fire footprints: specific mold risks',
        paragraphs: [
          'Pacific Palisades, Topanga, Mandeville Canyon, and Brentwood (Palisades Fire footprint): hillside drainage patterns concentrate post-fire runoff and ash slurry against foundations and crawl-space vents. Homes that survived the Palisades Fire are seeing canyon-water intrusion into foundations as the post-fire watershed recovers — a moisture source many homeowners are not even aware they have.',
          'Altadena, Sierra Madre, parts of Pasadena (Eaton Fire footprint): tens of thousands of historic Craftsman and Spanish-revival homes were hit with fire-suppression water but survived. Their plaster walls, lath substrates, and original wood subfloors retain moisture far longer than modern drywall — and the moisture sensors most inspectors carry are calibrated for drywall, not plaster.',
          'Across both footprints: ash and char debris that drifted into attic vents and HVAC returns has created a particulate substrate that holds moisture for weeks longer than uncontaminated surfaces would.',
        ],
      },
      {
        id: 'what-to-test',
        heading: 'What you actually need tested',
        list: {
          type: 'ul',
          items: [
            'Air quality sampling in every primary occupied room (bedrooms, family room, kitchen) — minimum 3 samples plus one outdoor control.',
            'Moisture mapping of every wall that took fire-suppression water — pin and pinless meters on a measured grid.',
            'Thermal imaging of all ceilings under attics that took post-fire water intrusion from broken roofing.',
            'Visual + air sampling in the attic if any roofing was breached or replaced.',
            'Crawl space inspection for standing water, condensation, and slurry deposits — especially in Palisades Fire foothill homes.',
            'HVAC system inspection — fire smoke combined with high humidity creates the perfect substrate for system-wide microbial colonization.',
            'Sub-floor inspection in any rooms where the carpet was wet.',
          ],
        },
      },
      {
        id: 'insurance-protocol',
        heading: 'Insurance documentation protocol (do this first)',
        howToSteps: [
          {
            name: 'Photograph everything before any cleanup',
            text: 'Before removing any debris or starting any drying, photograph every affected area from multiple angles. Date-stamp the photos. Carriers deny claims for "spoliation of evidence" when remediation begins before documentation.',
          },
          {
            name: 'Request a covered-peril determination in writing',
            text: 'Ask your adjuster to confirm in writing that fire-suppression water is being treated as part of the covered fire-loss claim. Get it before you spend money on remediation that may not be reimbursed.',
          },
          {
            name: 'Hire an independent (non-remediation) inspector',
            text: 'A third-party ACAC-certified inspector working separately from the remediation contractor produces the most defensible documentation. Insurance carriers regularly contest reports written by the same company that profits from the cleanup.',
          },
          {
            name: 'Demand AIHA-accredited lab analysis',
            text: 'Carriers will reject results from non-accredited labs. Confirm in the report that samples were analyzed at an AIHA-LAP accredited laboratory.',
          },
          {
            name: 'Get the mold scope into the fire claim, not as a separate mold claim',
            text: 'California mold-specific coverage is often capped at $10,000. Fire-coverage limits are typically much higher. Mold caused by fire-suppression water is a fire-loss consequence and should be billed under the fire claim.',
          },
        ],
      },
      {
        id: 'mistakes-to-avoid',
        heading: 'The 5 most expensive mistakes survivors are making',
        list: {
          type: 'ol',
          items: [
            'Letting the same restoration company that did the fire-water extraction also do the mold inspection — there is no incentive to "find" anything that would require a new scope.',
            'Accepting "we dried it, you are fine" without an air quality test. Drying surfaces does not remove existing colonies, it just slows new growth.',
            'Reoccupying before independent post-remediation verification — symptoms in sensitive family members often begin within days of moving back.',
            'Waiting too long to test. Insurance time-bars on fire-related mold claims vary by carrier; do not let your documentation window close.',
            'Trusting drywall replacement alone. Replacing drywall without inspecting (and remediating if needed) the framing behind it locks moisture and growth into the structure.',
          ],
        },
      },
    ],
    faqs: [
      {
        q: 'Will mold from fire-suppression water be covered by my homeowners insurance?',
        a: 'If the mold is documented as a consequence of fire-suppression water from a covered fire-loss event, it should be covered under the fire claim — not the typically-capped mold endorsement. Get this confirmed in writing from your adjuster before scheduling any remediation work.',
      },
      {
        q: 'How long after a fire should I test for mold?',
        a: 'Test as soon as you are allowed back into the property. EPA guidance is that mold can begin growing within 24 – 48 hours of water exposure on cellulose materials — and in fire-suppression scenarios, that water has often been sitting for weeks before reoccupancy. Earlier testing means earlier remediation and lower cost.',
      },
      {
        q: 'Do I need a mold inspection if the restoration company already dried out my home?',
        a: 'Yes. Drying out a structure stops further growth on the surface but does not address colonies that may have already established behind walls, in insulation, or in HVAC components during the displacement period. Independent post-drying air-quality testing is the only way to verify the structure is actually clean.',
      },
      {
        q: 'Can I use the same company for fire restoration and mold remediation?',
        a: 'You can, but using SEPARATE companies (one for restoration, an independent inspector for testing, and ideally a third for remediation) produces dramatically more defensible insurance documentation. Conflict of interest is the most common reason carriers contest mold-related fire claims.',
      },
      {
        q: 'Is post-fire mold dangerous to breathe?',
        a: 'Mold exposure affects everyone differently, but the CDC confirms that mold exposure can trigger asthma attacks in sensitized individuals and cause upper respiratory symptoms in healthy people. Sensitive populations — children, elderly, asthmatics, anyone immunocompromised — should not reoccupy until air quality is verified.',
      },
    ],
    relatedCitySlugs: ['pacific-palisades', 'altadena', 'pasadena', 'sierra-madre', 'malibu', 'topanga'],
    relatedServiceSlugs: [
      { service: 'mold-testing', sub: 'mold-air-quality-testing' },
      { service: 'mold-inspection', sub: 'moisture-leak-detection' },
      { service: 'mold-remediation', sub: 'water-damage-mold-remediation' },
      { service: 'emergency-mold-services' },
    ],
    citations: [
      { name: 'EPA — Mold Cleanup in Your Home', url: 'https://www.epa.gov/mold/mold-cleanup-your-home' },
      { name: 'CDC — Mold After a Disaster', url: 'https://www.cdc.gov/disasters/mold/index.html' },
      { name: 'FEMA — Dealing with Mold and Mildew in Your Flood-Damaged Home', url: 'https://www.fema.gov/sites/default/files/2020-07/fema_dealing-with-mold-and-mildew-in-your-flood-damaged-home.pdf' },
      { name: 'California Department of Insurance — Wildfire Resources', url: 'https://www.insurance.ca.gov/01-consumers/140-catastrophes/WildfireResources.cfm' },
    ],
  },

  // ===========================================================================
  // POST 3 — Definitional content. Targets "is black mold dangerous" + variants.
  // AI engines love clear definitional answers with cited authorities.
  // ===========================================================================
  {
    slug: 'is-black-mold-dangerous-stachybotrys-cdc-epa',
    title: 'Is Black Mold (Stachybotrys) Really Dangerous? What the CDC and EPA Actually Say',
    description:
      'A science-based look at black mold (Stachybotrys chartarum): what it actually is, what the CDC and EPA say about its health effects, and when it requires professional remediation.',
    excerpt:
      'Black mold has been the subject of decades of media-driven panic and decades of corresponding scientific pushback. Here is what the CDC, EPA, and 2004 Institute of Medicine review actually conclude — separated from the marketing.',
    publishedDate: '2026-03-08',
    updatedDate: '2026-05-23',
    author: ACAC_AUTHOR,
    category: 'Health & Science',
    tags: ['black mold', 'Stachybotrys', 'health', 'CDC', 'EPA', 'science'],
    readingTimeMinutes: 8,
    heroImage: '/images/blog/black-mold-hero.png',
    heroImageAlt: 'Microscopic view of Stachybotrys chartarum spores',
    intro:
      '"Black mold" is one of the most-Googled mold terms in the United States and one of the least-accurately-understood. It refers most commonly to Stachybotrys chartarum, a greenish-black mold that grows on cellulose materials kept wet for 7+ days. It is real, it is removable, and — like most environmental health questions — the honest answer about its danger is "it depends, here is what we know, here is what we do not." This guide cuts through the marketing in both directions and gives you what the CDC, EPA, and 2004 Institute of Medicine actually concluded.',
    sections: [
      {
        id: 'what-is-stachybotrys',
        heading: 'What "black mold" actually is',
        paragraphs: [
          'When people say "black mold," they almost always mean Stachybotrys chartarum (sometimes called Stachybotrys atra). It is a slow-growing greenish-black mold that needs sustained wetness on cellulose-rich materials — drywall paper, the paper backing on insulation, wood subfloor, wallpaper, cardboard, paper-faced books and documents.',
          'Important distinction: many other mold species are also dark or black in color — Cladosporium, Aspergillus niger, Alternaria, and Ulocladium can all appear black to the naked eye but are biologically and toxicologically different from Stachybotrys. The only way to confirm species is laboratory analysis at an AIHA-LAP accredited lab.',
        ],
        callout: {
          type: 'authority',
          title: 'CDC definition',
          text: 'The CDC describes Stachybotrys chartarum as "a greenish-black mold that can grow on materials with a high cellulose content—such as drywall, sheetrock, ceiling tiles, and wood—that become chronically moist or water-damaged."',
          sourceUrl: 'https://www.cdc.gov/mold/about/index.html',
        },
      },
      {
        id: 'what-cdc-says',
        heading: 'What the CDC actually says about health effects',
        paragraphs: [
          'The CDC\'s official position is that for most healthy people, mold exposure (including Stachybotrys) causes upper-respiratory symptoms — coughing, sneezing, wheezing, sinus congestion, itchy eyes. For people with allergies, asthma, or compromised immune systems, exposure can trigger more serious reactions including asthma attacks.',
          'The CDC explicitly does NOT support the broader claims sometimes seen in marketing material — that Stachybotrys exposure causes pulmonary hemorrhage, neurological damage, or "mold toxicity syndrome" in otherwise-healthy adults. The agency notes that some studies have suggested links, but the evidence is mixed and far from conclusive.',
        ],
        quote: {
          text: 'A causal link between the presence of the toxic mold (Stachybotrys chartarum) and these conditions has not been proven.',
          author: 'Centers for Disease Control and Prevention',
          source: 'CDC, "Basic Facts About Mold and Dampness"',
          sourceUrl: 'https://www.cdc.gov/mold/about/index.html',
        },
      },
      {
        id: 'what-iom-says',
        heading: 'What the Institute of Medicine review found',
        paragraphs: [
          'The most authoritative scientific synthesis on indoor mold and health is the 2004 Institute of Medicine (now National Academy of Medicine) report Damp Indoor Spaces and Health. After reviewing the available scientific literature, the IOM categorized health outcomes by strength of evidence:',
        ],
        list: {
          type: 'ul',
          items: [
            'SUFFICIENT EVIDENCE of an association with mold/dampness: upper respiratory tract symptoms, cough, wheeze, asthma symptoms in sensitized asthmatics, and hypersensitivity pneumonitis in susceptible persons.',
            'LIMITED OR SUGGESTIVE EVIDENCE: shortness of breath, lower respiratory illness in otherwise-healthy children, asthma development.',
            'INADEQUATE OR INSUFFICIENT EVIDENCE: cancer, neuropsychiatric symptoms, pulmonary hemorrhage in infants, chronic fatigue syndrome.',
          ],
        },
      },
      {
        id: 'who-should-worry',
        heading: 'Who actually needs to worry',
        list: {
          type: 'ul',
          items: [
            'People with diagnosed asthma — exposure can trigger acute attacks.',
            'People with mold allergies (confirmed via allergist testing).',
            'Immunocompromised individuals — chemotherapy patients, organ-transplant recipients, people with HIV/AIDS, people on long-term corticosteroids.',
            'People with cystic fibrosis or other chronic lung disease.',
            'Infants and young children with respiratory conditions.',
            'Anyone living or working in a space with VISIBLE mold growth, especially if symptoms improve when away from the property.',
          ],
        },
      },
      {
        id: 'when-to-remediate',
        heading: 'When professional remediation is actually required',
        paragraphs: [
          'The California Department of Public Health and the EPA both publish guidance that visible mold growth larger than approximately 10 contiguous square feet should be remediated by trained professionals using containment, HEPA filtration, and negative air pressure. This applies regardless of species — Stachybotrys or otherwise.',
          'Below 10 square feet, on non-porous materials, a healthy adult with appropriate PPE (N95 respirator minimum, gloves, eye protection) can usually clean the area with detergent and water per EPA "Mold Remediation in Schools and Commercial Buildings" guidance. The catch: this only works on non-porous materials. Drywall, insulation, wallpaper, carpet, and ceiling tile that have visible growth need to be removed and replaced, not cleaned.',
        ],
        callout: {
          type: 'tip',
          title: 'Bottom line for homeowners',
          text: 'Treat any visible suspected black mold as if it requires professional remediation. The species identification (Stachybotrys vs. Cladosporium vs. anything else) matters less than the size, the substrate, and the health status of the people living in the home. When in doubt, get an inspection.',
        },
      },
      {
        id: 'real-vs-marketing',
        heading: 'Separating real risk from marketing scare tactics',
        paragraphs: [
          'A reputable mold inspection company will not tell you that "black mold will kill you" or "Stachybotrys causes brain damage" — the evidence base does not support those claims. A reputable company will tell you that visible mold growth has a moisture source, that source needs to be corrected, the contaminated material needs to be removed using IICRC S520 procedures, and the work needs to be verified by independent post-remediation testing.',
          'If anyone — inspector, remediator, contractor — tries to upsell you using scare tactics about toxic mold killing your family, get a second opinion. The honest answer is simpler and less scary than the marketing version.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is black mold (Stachybotrys) deadly?',
        a: 'For healthy adults, no — the CDC explicitly states that a causal link between Stachybotrys exposure and serious illness in otherwise-healthy people has not been proven. For sensitive populations (asthmatics, immunocompromised, infants), exposure can trigger serious respiratory reactions and should be avoided. In all cases, visible growth requires professional remediation regardless of species.',
      },
      {
        q: 'Can I tell if mold is "black mold" just by looking at it?',
        a: 'No. Many mold species appear black or dark-greenish — Cladosporium, Aspergillus niger, Alternaria, Ulocladium, and others can be confused with Stachybotrys. Species identification requires laboratory analysis at an AIHA-LAP accredited lab using either spore-trap analysis, surface samples, or DNA-based ERMI / HERTSMI-2 testing.',
      },
      {
        q: 'Should I move out if I find black mold?',
        a: 'Sensitive individuals (children, elderly, asthmatics, immunocompromised) should generally avoid spaces with visible mold growth until remediation is complete. Healthy adults can usually remain in the home if the contaminated area is contained and the remediation crew establishes negative air pressure. Your inspector will give you specific guidance based on the scope and your household composition.',
      },
      {
        q: 'How is black mold removed safely?',
        a: 'IICRC S520-compliant remediation requires containment of the affected area with poly sheeting, negative air pressure using HEPA-filtered air scrubbers, PPE (minimum N95 respirator, Tyvek suit, gloves) for all workers, removal of contaminated porous materials, HEPA vacuuming, and post-remediation verification by an independent third-party inspector before the area is reoccupied.',
      },
      {
        q: 'What is the difference between Stachybotrys and "toxic mold"?',
        a: 'Stachybotrys chartarum produces mycotoxins (specifically trichothecenes) which gives it its "toxic mold" reputation. However, many other species produce mycotoxins as well (Aspergillus, Penicillium, Fusarium), and exposure pathway, dose, and individual susceptibility determine actual health impact much more than species identification alone. The IOM 2004 review found insufficient evidence to support most mycotoxin-related health claims in residential indoor settings.',
      },
    ],
    relatedCitySlugs: ['los-angeles', 'beverly-hills', 'santa-monica', 'pasadena'],
    relatedServiceSlugs: [
      { service: 'mold-remediation', sub: 'black-mold-remediation' },
      { service: 'mold-testing', sub: 'lab-based-mold-testing' },
      { service: 'mold-inspection' },
    ],
    citations: [
      { name: 'CDC — Basic Facts About Mold and Dampness', url: 'https://www.cdc.gov/mold/about/index.html' },
      { name: 'EPA — A Brief Guide to Mold, Moisture, and Your Home', url: 'https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home' },
      { name: 'Institute of Medicine — Damp Indoor Spaces and Health (2004)', url: 'https://nap.nationalacademies.org/catalog/11011/damp-indoor-spaces-and-health' },
      { name: 'WHO Guidelines for Indoor Air Quality: Dampness and Mould', url: 'https://www.who.int/publications/i/item/9789289041683' },
    ],
  },

  // ===========================================================================
  // POST 4 — Insurance intent. Common AI query with no great California-specific
  // answer ranking. Long-form, structured, ready to be cited.
  // ===========================================================================
  {
    slug: 'does-california-homeowners-insurance-cover-mold-2026',
    title: 'Does California Homeowners Insurance Cover Mold Remediation? (2026 Guide)',
    description:
      'A 2026 guide to mold coverage under California homeowners insurance: what is typically covered, what is excluded, how mold endorsements work, and how to file a successful claim.',
    excerpt:
      'Most California homeowners think their insurance covers mold. Most are partly right and largely wrong. Here is exactly what HO-3 policies cover, what is excluded, how the $10,000 mold cap actually works, and how to file a claim that gets paid.',
    publishedDate: '2026-02-22',
    updatedDate: '2026-05-23',
    author: ACAC_AUTHOR,
    category: 'Insurance & Claims',
    tags: ['insurance', 'homeowners insurance', 'California', 'HO-3', 'claims'],
    readingTimeMinutes: 10,
    heroImage: '/images/blog/insurance-mold-hero.png',
    heroImageAlt: 'Homeowner reviewing an insurance policy with a mold inspection report',
    intro:
      'The most common question we get from new clients is some version of "is this going to be covered by my insurance?" The honest answer in California in 2026 is: maybe — and the determining factor is almost always the cause of the moisture, not the mold itself. This guide explains how California HO-3 policies handle mold, when carriers pay, when they do not, and the documentation workflow that gets claims approved.',
    sections: [
      {
        id: 'the-rule',
        heading: 'The fundamental rule: cause determines coverage',
        paragraphs: [
          'California homeowners insurance does not really "cover mold" or "exclude mold" as a category. Carriers cover the consequences of covered perils. If mold is the downstream consequence of a covered peril, mold remediation is typically reimbursable. If mold is the consequence of an excluded peril (long-term humidity, slow leaks, maintenance neglect, flooding from external water sources), it typically is not.',
          'This single rule explains 95% of mold claim outcomes. Get crystal clear on it before you call your carrier.',
        ],
      },
      {
        id: 'usually-covered',
        heading: 'Causes of mold that ARE usually covered',
        list: {
          type: 'ul',
          items: [
            'Sudden burst pipe inside a wall or under a slab.',
            'Washing machine supply-hose rupture.',
            'Water heater tank burst (the leak event, not gradual corrosion).',
            'Dishwasher supply-line failure.',
            'Refrigerator water-line crack.',
            'Sudden plumbing-fixture failure (e.g., toilet supply line, sink trap).',
            'Storm-driven rainwater entering through a roof breach caused by wind, falling tree, or hail.',
            'Fire-suppression water damage from a covered fire-loss event.',
            'Vandalism-related water damage.',
            'Sewer backup IF you have specific sewer-backup coverage endorsement.',
          ],
        },
      },
      {
        id: 'usually-excluded',
        heading: 'Causes of mold that are usually EXCLUDED',
        list: {
          type: 'ul',
          items: [
            'Long-term humidity from poor bathroom ventilation.',
            'Slow leaks under a sink, behind a wall, or in a crawl space that have been ongoing for weeks/months.',
            'Maintenance issues — failed roof flashing, deteriorated caulking, blocked gutters causing repeated water intrusion.',
            'Flooding from external sources (rivers, storm surge, mudslides) — this is FLOOD insurance territory (NFIP or private flood).',
            'Earthquake-caused water-line breaks — covered only if you have separate California Earthquake Authority coverage.',
            'Construction defects (improperly installed windows, missing weather barriers).',
            'Pre-existing mold conditions present before policy inception.',
            'Mold in vacant or unoccupied properties (most policies exclude losses after 30–60 days of vacancy).',
          ],
        },
      },
      {
        id: 'the-cap',
        heading: 'The $10,000 California mold cap (and how to lift it)',
        paragraphs: [
          'Most California HO-3 policies issued after 2002 include a "limited fungi or microbe" coverage provision that caps mold-specific remediation at $10,000 OR a percentage (typically 10%) of dwelling coverage — whichever is less. This cap applies even when mold is the consequence of a covered peril.',
          'There are three ways to break or expand this cap:',
        ],
        list: {
          type: 'ol',
          items: [
            'Mold coverage endorsement — most carriers sell an endorsement that raises the cap to $25,000, $50,000, or $100,000+. If you live in a coastal, hillside, or older-construction property, this is usually worth the $50 – $200 annual premium.',
            'Bill mold consequences under the underlying covered-peril claim, not as a separate "mold claim." For example, fire-suppression water → mold should be part of the fire claim (which has much higher limits), not filed as a $10,000-capped mold claim. The wording on the adjuster\'s loss report matters.',
            'For sudden plumbing failures, push to have the entire scope (drying, demo, remediation, reconstruction) treated as water-damage scope rather than mold scope. Mold-cap exclusions typically apply to remediation-specific work, not to the underlying water-damage scope.',
          ],
        },
        callout: {
          type: 'tip',
          title: 'Public adjusters can help when claims are denied',
          text: 'For mold-related claim denials over $15,000, a California-licensed public adjuster (typical fee: 10–15% of recovery) can often get an initial denial reversed by reframing the claim around the underlying covered peril. Verify their license at the California Department of Insurance before signing.',
        },
      },
      {
        id: 'claim-workflow',
        heading: 'The workflow that gets mold claims paid',
        howToSteps: [
          {
            name: 'Photograph and date-stamp everything before any cleanup',
            text: 'Document the water event, the damaged materials, and any visible mold from multiple angles. Photos are the single most important evidence in a contested claim.',
          },
          {
            name: 'Call your carrier within 24 hours of the discovery',
            text: 'Most California policies require "prompt notice" of a loss. Reporting within 24 hours protects you against a "delayed notice" denial argument.',
          },
          {
            name: 'Hire an independent (non-remediation) inspector',
            text: 'A third-party ACAC-certified inspector working separately from the remediation contractor produces the most defensible report. Carriers regularly contest reports written by the same company that profits from the cleanup.',
          },
          {
            name: 'Get a written cause-of-loss determination',
            text: 'The inspector\'s report must include a specific cause-of-loss determination (e.g., "active drip from copper supply line under kitchen sink, estimated 14–21 days exposure"). This is the document that proves or disproves coverage.',
          },
          {
            name: 'Use an AIHA-LAP accredited lab for any samples',
            text: 'Carrier-side adjusters will reject results from non-accredited labs. The lab name on the chain-of-custody form must be AIHA-LAP accredited.',
          },
          {
            name: 'Submit the claim with documentation already complete',
            text: 'Carriers approve claims dramatically faster when the photo logs, cause-of-loss determination, lab results, and remediation scope are submitted together rather than developed back-and-forth.',
          },
          {
            name: 'Insist on independent post-remediation verification',
            text: 'Whether or not the carrier requires it, do not pay the remediation contractor\'s final invoice until an independent third party has performed visual and air-quality verification per IICRC S520.',
          },
        ],
      },
      {
        id: 'denied-now-what',
        heading: 'If your claim is denied, what to do next',
        list: {
          type: 'ol',
          items: [
            'Request the denial in writing with the specific policy language cited as the basis for denial.',
            'Re-read your policy. Carrier denials are sometimes based on misapplied exclusions that the policy language does not actually support.',
            'File an appeal directly with the carrier — provide additional documentation (additional inspector opinions, repair invoices, plumber statements about cause).',
            'File a complaint with the California Department of Insurance (insurance.ca.gov). Free, takes about 15 minutes, and frequently results in carrier review.',
            'For larger denials, consult with a California-licensed insurance attorney (most offer free initial consultations and work on contingency for bad-faith claims).',
          ],
        },
      },
    ],
    faqs: [
      {
        q: 'Does California homeowners insurance cover mold remediation?',
        a: 'It depends on the cause. Mold caused by a sudden covered peril (burst pipe, washing-machine hose failure, storm damage, fire-suppression water) is typically covered, subject to the $10,000 mold cap unless you have a mold endorsement. Mold caused by long-term humidity, slow leaks, or maintenance issues is typically excluded.',
      },
      {
        q: 'What is the California mold coverage cap?',
        a: 'Most California HO-3 policies include a "limited fungi or microbe" provision capping mold-specific remediation at $10,000, or 10% of dwelling coverage — whichever is less. The cap can be raised with a mold endorsement (typically $25,000 – $100,000+ for $50 – $200 annual premium).',
      },
      {
        q: 'Will my insurance pay for the mold inspection itself?',
        a: 'Usually no for the inspection itself, but yes for remediation work when the underlying cause is covered. Pay for the inspection out of pocket — the written report and lab results are what make the remediation claim defensible.',
      },
      {
        q: 'Can I file a flood-caused mold claim under homeowners insurance?',
        a: 'No. Flooding from external sources (storms, rivers, mudslides, storm surge) is excluded from standard homeowners insurance and requires separate flood insurance (NFIP or private flood). However, water intrusion from a roof breach caused by a covered windstorm event is typically covered under the homeowners policy.',
      },
      {
        q: 'How long do I have to file a mold claim in California?',
        a: 'Most California homeowners policies require "prompt notice" of loss (interpreted as within days to weeks of discovery) and contain a 1-year suit-limitation clause. For specific deadlines, check your policy language and file with your carrier as soon as possible after discovering the damage.',
      },
      {
        q: 'What if my insurance denies my mold claim?',
        a: 'Request the denial in writing with specific policy language cited. Appeal directly with additional documentation. File a complaint with the California Department of Insurance (free, ~15 minutes). For larger denials, consult a California insurance attorney — most work on contingency for bad-faith claims.',
      },
    ],
    relatedCitySlugs: ['los-angeles', 'beverly-hills', 'pasadena', 'long-beach', 'santa-monica'],
    relatedServiceSlugs: [
      { service: 'mold-inspection' },
      { service: 'mold-remediation' },
      { service: 'mold-testing' },
      { service: 'post-remediation' },
    ],
    citations: [
      { name: 'California Department of Insurance — Homeowners Coverage', url: 'https://www.insurance.ca.gov/01-consumers/105-type/95-guides/03-res/' },
      { name: 'California Insurance Code §10081.4 (mold disclosure)', url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=10081.4&lawCode=INS' },
      { name: 'EPA — Mold Remediation in Schools and Commercial Buildings', url: 'https://www.epa.gov/mold/mold-remediation-schools-and-commercial-buildings-guide' },
    ],
  },

  // ===========================================================================
  // POST 5 — Buying-intent listicle. Highest GEO conversion intent — people in
  // active "which inspector should I hire" mode are mid-funnel ready.
  // ===========================================================================
  {
    slug: 'how-to-choose-mold-inspector-los-angeles',
    title: 'How to Choose a Mold Inspector in Los Angeles: 7 Red Flags + 5 Must-Have Certifications',
    description:
      'A practical guide to vetting a mold inspector in Los Angeles County: 5 certifications to verify, 7 red flags to avoid, and the 10 questions to ask before booking.',
    excerpt:
      'California does not have a single mold-inspector license, which means anyone with a business card can call themselves a "mold inspector." Here are the certifications that actually matter, the questions that separate professionals from sales operations, and the red flags that should send you elsewhere.',
    publishedDate: '2026-04-12',
    updatedDate: '2026-05-23',
    author: ACAC_AUTHOR,
    category: 'Hiring & Vetting',
    tags: ['hiring', 'inspector', 'certifications', 'Los Angeles', 'red flags'],
    readingTimeMinutes: 7,
    heroImage: '/images/blog/choose-inspector-hero.png',
    heroImageAlt: 'Homeowner reviewing certification credentials with a mold inspector',
    intro:
      'California does not issue a state-level mold inspector license. There is no required exam, no continuing education mandate, and no enforcement mechanism if an "inspector" misrepresents their qualifications. That regulatory gap is why the Los Angeles mold-services market is so wildly variable — and why doing 15 minutes of vetting before booking saves homeowners thousands of dollars on average. This guide gives you the framework.',
    sections: [
      {
        id: 'certifications',
        heading: 'The 5 certifications that actually matter',
        list: {
          type: 'ol',
          items: [
            'ACAC CMI or CMC — Council-Certified Microbial Investigator or Council-Certified Microbial Consultant. Issued by the American Council for Accredited Certification, requires exam + ongoing CE. Verify at acac.org.',
            'IICRC AMRT — Applied Microbial Remediation Technician. Issued by the Institute of Inspection, Cleaning and Restoration Certification. Required for any remediation work under IICRC S520. Verify at iicrc.org.',
            'CSLB License — California State Licensing Board contractor license (typically B General, or specialty C-32 Parking & Highway Improvement / C-22 Asbestos Abatement for remediation crews handling demolition). Verify at cslb.ca.gov.',
            'AIHA-LAP Laboratory partnership — confirms the inspector\'s analytical lab is American Industrial Hygiene Association Laboratory Accreditation Programs accredited. Verify at aihaaccreditedlabs.org.',
            'Comprehensive General Liability + Workers Compensation Insurance — minimum $1M GL is industry standard for residential, $2M for commercial. Ask for the COI (Certificate of Insurance) BEFORE booking.',
          ],
        },
        callout: {
          type: 'info',
          title: 'Why no California state license?',
          text: 'California considered mold-contractor licensing legislation multiple times (SB 732, SB 916) but never passed. The 2018 ACAC-recognized certifications and IICRC standards are the de facto industry baseline. Other states (Texas, Florida, New York) DO have state licensing — California does not.',
        },
      },
      {
        id: 'red-flags',
        heading: 'The 7 red flags that mean "go elsewhere"',
        list: {
          type: 'ol',
          items: [
            '"Free mold inspection" advertising. Real inspections take 2–3 hours of certified labor — no honest business does that for free. Free inspections are sales appointments in disguise.',
            'Refusal to provide certification numbers in writing. Any inspector who hesitates to send you their ACAC and IICRC numbers in advance is hiding something.',
            'Same-day quote for remediation BEFORE the lab results come back. Honest mold scopes require lab data. Same-day remediation quotes are sales tactics.',
            'The inspection company and the remediation company are the same business with no third-party clearance option. This is the most common conflict of interest in the industry.',
            'Verbal-only quotes. Every legitimate engagement produces a written scope of work signed before any sampling or demo begins.',
            'Scare tactics about "toxic black mold killing your family." CDC and IOM evidence does not support the most alarmist claims. Professional inspectors describe risk in calibrated, evidence-based language.',
            'Pricing based on "square footage of growth" before any inspection has happened, or pricing structures that increase the inspector\'s payment if more mold is "found."',
          ],
        },
      },
      {
        id: 'questions',
        heading: 'The 10 questions to ask before booking',
        list: {
          type: 'ol',
          items: [
            '"What are your specific ACAC and IICRC certification numbers? Can you email them in advance?"',
            '"Is your laboratory AIHA-LAP accredited? What is the lab name and accreditation number?"',
            '"Will the inspection report include thermal imaging, moisture mapping, and photo documentation?"',
            '"Are you separately licensed to perform remediation? Do you offer me the option of having a third-party clearance test if you do the remediation?"',
            '"What is your written scope of work — what is included and what is excluded?"',
            '"What is the all-in price including any lab samples and the written report?"',
            '"What is the standard turnaround time for the written report?"',
            '"Can you provide a Certificate of Insurance for general liability and workers comp before the appointment?"',
            '"How long have you been doing mold inspections in [my specific city]? Can you reference 2–3 recent clients in my area?"',
            '"If remediation is recommended, are you willing to provide the report to other remediation companies for competitive bidding?"',
          ],
        },
      },
      {
        id: 'verification',
        heading: 'How to verify what an inspector tells you',
        howToSteps: [
          {
            name: 'Verify CSLB contractor license',
            text: 'Visit cslb.ca.gov, search by license number or business name. Confirm active status, the specific classifications held, and that the business address matches what was provided.',
          },
          {
            name: 'Verify ACAC certification',
            text: 'Visit acac.org, click "Verify a Certificant," enter the inspector\'s certification number. Confirm credential type (CMI vs CMC vs CIE), expiration date, and that the person\'s name matches.',
          },
          {
            name: 'Verify IICRC certification',
            text: 'Visit iicrc.org, click "Find a Certified Pro," search by name or company. Confirm the AMRT certification is active and that the company holds an IICRC firm certification.',
          },
          {
            name: 'Verify the lab is AIHA accredited',
            text: 'Visit aihaaccreditedlabs.org, search for the lab name. Confirm the lab holds Environmental Microbiology Laboratory Accreditation Program (EMLAP) accreditation for the specific test types (spore-trap, surface, bulk).',
          },
          {
            name: 'Check public reviews critically',
            text: 'Google Business Profile, Yelp, and BBB are the most reliable sources. Look for reviews mentioning specific outcomes, not just star ratings. Be skeptical of companies with 100+ reviews all dated within a few months — that pattern often indicates purchased reviews.',
          },
        ],
      },
      {
        id: 'what-good-looks-like',
        heading: 'What a good inspection actually looks like (timeline)',
        list: {
          type: 'ul',
          items: [
            '0:00 – Inspector arrives in a marked vehicle, shows credentials, walks the home with you to understand the concern.',
            '0:15 – Visual exterior inspection (roof, gutters, grading, hose bibs, sprinkler patterns near foundation).',
            '0:45 – Interior room-by-room walkthrough with thermal imaging on suspect walls and moisture meter on baseline references.',
            '1:30 – Borescope or non-invasive sampling of suspect cavities.',
            '2:00 – Air sampling (if scope includes it): 5–10 minutes per sample, sealed in chain-of-custody containers.',
            '2:30 – Verbal preliminary findings with you in plain English, no pressure to commit to anything.',
            '2:45 – Inspector departs with samples; written report and lab results delivered in 3–5 business days.',
            'Day 5 – Written report arrives via email, you call with questions, inspector explains findings and answers without trying to upsell.',
          ],
        },
      },
    ],
    faqs: [
      {
        q: 'Does California require mold inspectors to be licensed?',
        a: 'No. California does not have a state-level mold inspector license. Industry-standard certifications are ACAC CMI/CMC and IICRC AMRT. Remediation work requires a CSLB contractor license (B General or relevant specialty). Verify any inspector\'s credentials at acac.org, iicrc.org, and cslb.ca.gov before booking.',
      },
      {
        q: 'Should I use the same company for mold inspection and mold remediation?',
        a: 'Using SEPARATE companies for inspection and remediation produces the most defensible documentation and eliminates the inherent conflict of interest (the company finding mold also profits from removing it). If you do use the same company, insist on independent third-party post-remediation clearance testing.',
      },
      {
        q: 'What is the difference between an ACAC CMI and a CMC?',
        a: 'CMI (Council-Certified Microbial Investigator) is the higher-tier inspection credential requiring more advanced education and experience. CMC (Council-Certified Microbial Consultant) is the consultant-level credential. Both require exam, ongoing continuing education, and adherence to ACAC code of practice.',
      },
      {
        q: 'How do I check if a mold inspector is legitimate in Los Angeles?',
        a: 'Verify ACAC certification at acac.org, IICRC certification at iicrc.org, CSLB contractor license at cslb.ca.gov, AIHA lab accreditation at aihaaccreditedlabs.org, and check public reviews on Google Business Profile, Yelp, and the BBB. All four credentials should match what the inspector claimed.',
      },
      {
        q: 'How long should a residential mold inspection take?',
        a: 'A thorough residential mold inspection takes 2 – 3 hours on site for a typical 1,500 – 2,500 sq ft home. Larger homes, hillside properties, or complex multi-level homes can take 3 – 4 hours. Inspections that finish in under 60 minutes typically have skipped thermal imaging, borescope, or moisture-mapping steps.',
      },
    ],
    relatedCitySlugs: ['los-angeles', 'beverly-hills', 'santa-monica', 'pasadena', 'long-beach', 'encino', 'sherman-oaks'],
    relatedServiceSlugs: [
      { service: 'mold-inspection' },
      { service: 'mold-testing' },
      { service: 'post-remediation', sub: 'clearance-testing' },
    ],
    citations: [
      { name: 'American Council for Accredited Certification (ACAC)', url: 'https://www.acac.org/' },
      { name: 'IICRC — Find a Certified Professional', url: 'https://iicrc.org/find-a-pro/' },
      { name: 'California Contractors State License Board (CSLB)', url: 'https://www.cslb.ca.gov/' },
      { name: 'AIHA Accredited Laboratory Search', url: 'https://www.aihaaccreditedlabs.org/' },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export const allPostSlugs = posts.map((p) => p.slug);

/** Recently published posts, sorted newest first. */
export function getRecentPosts(limit?: number): BlogPost[] {
  const sorted = [...posts].sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1));
  return limit ? sorted.slice(0, limit) : sorted;
}

/** Get related posts excluding the current one, prioritizing tag overlap. */
export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return getRecentPosts(limit);
  const others = posts.filter((p) => p.slug !== currentSlug);
  const scored = others
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score || (a.post.publishedDate < b.post.publishedDate ? 1 : -1));
  return scored.slice(0, limit).map((s) => s.post);
}
