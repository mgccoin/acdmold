import type { City } from './cities';
import type { Service, SubService } from './services';
import { business } from './business';
import { pick, pickN, seededRng, shuffle } from './seed';

export type ContentSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type GeneratedContent = {
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: ContentSection[];
  faqs: { q: string; a: string }[];
  wordCount: number;
};

const CLIMATE_NOTES: Record<City['climate'], string[]> = {
  coastal: [
    'persistent marine-layer humidity that hovers around 70–85% relative humidity for much of the year',
    'salt-laden ocean air that accelerates corrosion on flashing, fasteners, and HVAC condensate pans',
    'June Gloom and morning fog that keep north-facing walls and crawl spaces damp for hours each day',
    'the steady west-to-east on-shore breeze that pushes moist air into attic vents and weep holes',
  ],
  'inland-valley': [
    'wide diurnal temperature swings between hot afternoons and cool nights that drive condensation inside cool wall cavities',
    'long, dry summers followed by intense winter rain events that overwhelm older drainage and roofing systems',
    'high indoor cooling loads that produce condensate on poorly insulated supply ducts',
    'Santa Ana wind events that drive wind-driven rain into stucco penetrations and door thresholds',
  ],
  'high-desert': [
    'extreme temperature swings of 40°F or more between day and night that drive condensation inside conditioned spaces',
    'monsoon-season cloudbursts that can dump an inch of rain in under an hour onto roofs designed for arid conditions',
    'sustained wind events that lift roofing materials and force water under shingle edges',
    'low ambient humidity that masks slow leaks until significant damage has occurred',
  ],
  foothills: [
    'hillside drainage patterns that direct surface and subsurface water toward foundations and crawl-space vents',
    'shaded north-facing slopes that stay damp far longer than flat lots',
    'wildfire and post-fire watershed changes that increase debris flow and runoff intensity',
    'frequent fog drip in canyon micro-climates that keeps siding and roofing wet',
  ],
  'urban-core': [
    'dense building stock with shared walls and shared HVAC systems that allow moisture and spores to travel between units',
    'aging infrastructure with original cast-iron drains and galvanized supply lines reaching the end of their service life',
    'urban heat-island effects that increase A/C runtime and condensate production',
    'limited setbacks that prevent proper exterior moisture management around foundations',
  ],
};

const KEYWORD_POOL = [
  'mold testing',
  'mold inspection',
  'mold remediation',
  'black mold removal',
  'air quality testing',
  'certified mold inspector',
  'IICRC mold remediation',
  'AIHA-accredited mold lab',
  'mold inspection near me',
  'same-day mold testing',
  'water-damage mold cleanup',
  'attic mold removal',
  'crawl space mold',
  'bathroom mold remediation',
  'HVAC mold inspection',
];

const HEALTH_SYMPTOMS = [
  'persistent cough or congestion',
  'unexplained sinus headaches',
  'itchy or watery eyes',
  'asthma flare-ups',
  'fatigue and brain fog',
  'skin rashes or hives',
  'sneezing fits when entering the home',
  'shortness of breath',
];

const COMMON_TRIGGERS = [
  'a slow plumbing leak under a kitchen or bathroom sink',
  'a roof leak from a recent rain event',
  'condensation from an undersized or oversized HVAC system',
  'a slab leak under tile or hardwood flooring',
  'high indoor humidity from poor bathroom ventilation',
  'a washing machine supply hose failure',
  'a refrigerator water-line drip',
  'flooding from a clogged condensate drain',
  'wind-driven rain through an unsealed window',
  'sewer-backup after a heavy storm',
];

const TOOLS = [
  'FLIR thermal imaging cameras to find moisture differentials behind finished surfaces',
  'pin and pinless moisture meters calibrated against known reference materials',
  'Air-O-Cell cassettes drawn at 15 L/min for spore-trap analysis',
  'borescopes for non-destructive inspection of wall cavities',
  'particle counters to confirm HEPA filtration performance',
  'hygrometers to log temperature, dew point, and relative humidity',
  'manometers to verify negative-pressure containment',
  'NADCA-style brushes and vacuum systems for HVAC duct decontamination',
];

const STANDARDS = [
  'IICRC S520 Standard for Professional Mold Remediation',
  'IICRC S500 Standard for Professional Water Damage Restoration',
  'EPA "Mold Remediation in Schools and Commercial Buildings" guidance',
  'OSHA 29 CFR 1910 respiratory protection requirements',
  'ANSI/IICRC S540 Standard for Trauma and Crime Scene Cleanup (referenced for sewage)',
  'CDC and NIOSH indoor environmental quality guidance',
  'Cal/OSHA Title 8 Section 5144 respirator standards',
  'ACAC Council-Certified Microbial Investigator code of practice',
];

// Cited stats that AI engines love to extract verbatim. Sources are real and
// verifiable; we phrase them clearly so an LLM can quote one sentence and
// attribute the underlying authority correctly.
const CITED_STATS = [
  'The U.S. Environmental Protection Agency reports that mold can begin to grow on damp surfaces in as little as 24 to 48 hours after water intrusion (EPA, "Mold Course Chapter 2").',
  'The Centers for Disease Control and Prevention (CDC) confirms that mold exposure can trigger asthma attacks in sensitized individuals and may cause upper respiratory symptoms in otherwise healthy people (CDC, "Basic Facts About Mold and Dampness").',
  'A landmark Institute of Medicine review (2004) found "sufficient evidence" linking indoor mold exposure to upper respiratory symptoms, cough, wheeze, and asthma symptoms in sensitized individuals.',
  'The American Industrial Hygiene Association (AIHA) maintains the AIHA-LAP accreditation that the IICRC S520 Standard and most major insurance carriers recognize as the benchmark for defensible mold sample analysis.',
  'The IICRC S520 Standard requires that all mold remediation establish containment, negative air pressure, and a post-remediation verification protocol before a Condition 3 (active growth) space can be reoccupied.',
  'California Department of Public Health guidance recommends that visible mold growth larger than 10 contiguous square feet be remediated by trained professionals using containment and HEPA filtration.',
];

const TRUST_PROOF = [
  `over ${business.projectsCompleted.toLocaleString()} completed projects across Southern California`,
  `a verified ${business.averageRating}-star rating across ${business.reviewCount}+ public reviews`,
  `${business.yearsInBusiness}+ years of focused mold inspection and remediation experience`,
  'AIHA-accredited third-party laboratory partners on every test',
  'full $2M general liability and workers compensation insurance',
  'IICRC-certified inspectors and remediation technicians on every crew',
  'fully bonded and CSLB-licensed for remediation work in California',
];

function climateLine(city: City, rng: () => number): string {
  return pick(rng, CLIMATE_NOTES[city.climate]);
}

function localFlavor(city: City, rng: () => number): string {
  const neighborhoods = city.notableNeighborhoods.length
    ? `including ${city.notableNeighborhoods.slice(0, 3).join(', ')}`
    : '';
  return `${city.name} ${neighborhoods}`;
}

export function generateCityServiceContent(
  city: City,
  service: Service,
  subService?: SubService
): GeneratedContent {
  const seedKey = `${city.slug}|${service.slug}|${subService?.slug ?? 'main'}`;
  const rng = seededRng(seedKey);

  const focus = subService ?? service;
  const focusName = subService ? subService.name : service.name;
  const longName = subService ? `${subService.name} in ${city.name}, CA` : `${service.name} in ${city.name}, CA`;

  const title = subService
    ? `${subService.name} in ${city.name}, CA | ACD Mold`
    : `${service.name} in ${city.name}, CA | ACD Mold`;

  const metaDescription = `${focus.shortDescription} Serving ${city.name} and ${city.region}. Same-day appointments, AIHA-accredited lab results, IICRC-certified crews. Call ${business.phoneDisplay}.`;

  const h1 = subService
    ? `${subService.name} in ${city.name}, California`
    : `${service.name} Services in ${city.name}, California`;

  const climateNote = climateLine(city, rng);
  const trigger1 = pick(rng, COMMON_TRIGGERS);
  const trigger2 = pick(rng, COMMON_TRIGGERS.filter((t) => t !== trigger1));
  const symptoms = pickN(rng, HEALTH_SYMPTOMS, 3);
  const toolsUsed = pickN(rng, TOOLS, 4);
  const standards = pickN(rng, STANDARDS, 3);
  const proofs = pickN(rng, TRUST_PROOF, 4);
  const keywords = pickN(rng, KEYWORD_POOL, 6);
  const citedStats = pickN(rng, CITED_STATS, 2);

  const intro = [
    `When homeowners and property managers in ${localFlavor(city, rng)} suspect a mold problem, they need certified, lab-verified answers — not guesswork.`,
    `ACD Mold has been providing professional ${focusName.toLowerCase()} across ${city.name} and the broader ${city.region} for ${business.yearsInBusiness}+ years, with ${proofs[0]} and ${proofs[1]}.`,
    `${city.housingNotes} Combined with ${climateNote}, the ${city.name} housing stock presents predictable but often-missed mold risk patterns that our certified inspectors are trained to identify.`,
    `Whether you are dealing with ${trigger1}, ${trigger2}, or a long-running indoor air quality concern, this page explains exactly what ${focusName.toLowerCase()} looks like in ${city.name}, what it costs, what to expect during the appointment, and how to book an ACD Mold inspector today.`,
  ].join(' ');

  const sections: ContentSection[] = [];

  // SECTION 1 — Why this service in this city
  sections.push({
    heading: `Why ${focusName} Matters Specifically in ${city.name}`,
    paragraphs: [
      `${city.name} sits in the ${city.region}, which is shaped by ${climateNote}. That single environmental fact drives the majority of mold complaints we see in this ZIP-code group, and it is the reason cookie-cutter inspection checklists from out-of-area inspectors so often miss the actual problem.`,
      `${city.housingNotes} The most common mold-risk factors we document on inspections in ${city.name} include ${city.moldRiskFactors.join(', ')}. Each of these is solvable, but only after a properly trained inspector identifies which combination is contributing to the visible (or invisible) growth.`,
      `For ${focusName.toLowerCase()} specifically, the ${city.name} micro-climate matters because it determines how quickly small water-intrusion events turn into active mold colonies. In coastal and foothill micro-climates spores can germinate within 24–36 hours; in inland-valley and high-desert areas growth often hides for weeks before becoming visible. ACD Mold tailors every ${focusName.toLowerCase()} appointment in ${city.name} to the specific environmental conditions of your ZIP code.`,
    ],
  });

  // SECTION 2 — What is included
  sections.push({
    heading: `What's Included in Our ${focusName} in ${city.name}`,
    paragraphs: [
      `${subService ? subService.longDescription : service.longDescription}`,
      `Every ${focusName.toLowerCase()} appointment in ${city.name} begins with a written scope of work that you approve before any sampling, demolition, or invoice begins. We use ${toolsUsed[0]} and ${toolsUsed[1]}, and on more complex projects we add ${toolsUsed[2]} and ${toolsUsed[3]} so nothing important is missed.`,
      `Our work follows ${standards[0]}, ${standards[1]}, and ${standards[2]}. Following recognized standards is not optional in California — it is what separates a defensible report from a piece of paper a court or insurance carrier will throw out.`,
    ],
    list: subService?.benefits ?? service.whyMatters.slice(0, 5),
  });

  // SECTION 3 — Process / appointment expectations
  sections.push({
    heading: `What to Expect at Your ${city.name} ${focusName} Appointment`,
    paragraphs: [
      `Booking ACD Mold for ${focusName.toLowerCase()} in ${city.name} is straightforward: you call ${business.phoneDisplay} or book online, we confirm a 2-hour arrival window, and an ACAC-certified inspector arrives in a marked vehicle with all required equipment.`,
      `On arrival the inspector will review the issues that prompted the call, walk the property with you, and explain what they observe in plain English. There is no pressure to add services, no bait-and-switch pricing, and no "free inspection" gimmick that exists only to sell you remediation work you may not need.`,
      `If sampling is part of the scope, samples are sealed in chain-of-custody containers and shipped to an AIHA-LAP accredited laboratory the same day. Standard turnaround is 3–5 business days, with 24-hour rush available for real-estate transactions, insurance deadlines, and habitability disputes.`,
    ],
    list: subService?.process ?? service.ourApproach.slice(0, 6),
  });

  // SECTION 4 — Health & risk (with cited authority stats for GEO)
  sections.push({
    heading: `Health and Property Risks Mold Can Cause in ${city.name}`,
    paragraphs: [
      `Mold exposure does not affect everyone the same way, but the most commonly reported symptoms in ${city.name} households we serve include ${symptoms.join(', ')}. Sensitive individuals — infants, elderly residents, people on immunosuppressive therapy, and anyone with diagnosed asthma — typically react first and most strongly.`,
      `${citedStats[0]} That window is significantly compressed in ${city.name}'s climate, where ${climateNote} accelerates germination on cellulose materials like drywall paper, wood framing, and carpet backing.`,
      `${citedStats[1]} For ${city.name} property owners, this means that a slow leak or unaddressed humidity problem is not just a structural concern — it is a documented indoor air quality risk that licensed inspectors can quantify with AIHA-accredited lab analysis.`,
      `Beyond health, mold quietly destroys property value. Drywall and insulation are inexpensive to replace early but become five-figure remediation projects once contamination reaches framing, sheathing, or HVAC components. Real-estate disclosures in California require known mold contamination to be reported, which means an unaddressed problem will eventually surface — usually at the worst possible moment.`,
      `If you are noticing symptoms only at home, only in one room, or only during certain weather patterns in ${city.name}, those are textbook signs of a localized indoor air quality issue worth investigating before it becomes a remediation problem.`,
    ],
  });

  // SECTION 5 — Property types
  sections.push({
    heading: `Property Types We Service for ${focusName} in ${city.name}`,
    paragraphs: [
      `${city.name}'s housing stock is varied, and ACD Mold is set up to handle every property type in the ${city.region}. We perform ${focusName.toLowerCase()} on single-family homes, condos, townhomes, duplexes, mid-rise apartments, large multifamily complexes, HOA common areas, and commercial buildings ranging from small retail to industrial warehouses.`,
      `${city.notableNeighborhoods.length ? `In ${city.notableNeighborhoods.slice(0, 4).join(', ')} and surrounding neighborhoods, ` : ''}we frequently see properties that share underlying construction patterns from the same era — and therefore share the same mold-risk patterns. Our inspectors recognize these patterns from prior projects in the same ZIP codes (${city.zips.join(', ')}) and can move efficiently from suspicion to confirmed answer.`,
      `If you manage a portfolio of properties in ${city.name} or the surrounding ${city.region}, we offer volume pricing, after-hours scheduling, and consolidated reporting designed for property-management workflows.`,
    ],
  });

  // SECTION 6 — Trust / why ACD
  sections.push({
    heading: `Why ${city.name} Property Owners Choose ACD Mold`,
    paragraphs: [
      `ACD Mold is headquartered at ${business.address.full}, only a short drive from every ${city.name} ZIP code. Local presence matters because it means faster response times, real accountability, and a team that has worked on hundreds of properties in your specific neighborhood.`,
      `Our credentials include ${proofs[2]}, ${proofs[3]}, and ongoing continuing-education training for every inspector and remediation technician on our crew. We invest in our people because the difference between a good inspection and a great one is the experience and judgment of the person holding the meter.`,
      `Most importantly, ACD Mold separates the inspection role from the remediation role wherever possible. When the same company that finds mold also profits from removing it, the temptation to over-diagnose is real. We are transparent about which scope of work we recommend and why, and we are happy to be the third-party clearance inspector on remediation work other contractors perform.`,
    ],
    list: proofs,
  });

  // SECTION 7 — Pricing & timing
  sections.push({
    heading: `${focusName} Cost and Timing in ${city.name}`,
    paragraphs: [
      `Pricing for ${focusName.toLowerCase()} in ${city.name} typically falls in the ${subService?.pricing ?? '$295 – $895'} range, with the variable being the size of the property and the number of samples or rooms involved. We provide a flat written quote before booking and never charge surprise fees on site.`,
      `Standard appointments take ${subService?.durationHours ?? '1 – 3 hours'} on site. When laboratory analysis is part of the scope, results come back in 3–5 business days with rush options available. Remediation projects are scheduled within 24–72 hours of scope sign-off, with emergency response available the same day.`,
      `If your situation involves an active insurance claim, our office staff can communicate directly with your adjuster, provide the photo logs and lab reports carriers require, and help document the loss correctly from day one. Documentation done right at the start typically increases reimbursement and reduces dispute time later.`,
    ],
  });

  // SECTION 8 — Service area sub-paragraph
  const nearbyOptions = `nearby ${city.region} cities including the surrounding communities`;
  sections.push({
    heading: `Service Area: ${city.name} and Beyond`,
    paragraphs: [
      `ACD Mold provides ${focusName.toLowerCase()} throughout ${city.name} (ZIP codes ${city.zips.join(', ')}) and across ${nearbyOptions}. Our service radius from our Encino headquarters extends ${business.serviceRadiusMiles}+ miles in every direction, with no travel surcharges for properties inside that radius.`,
      `Frequently searched ${focusName.toLowerCase()} keywords for ${city.name} include ${keywords.join(', ')} — and we appear at the top of those searches because we genuinely serve every ZIP code listed, not because we are running a fake-address Google Maps spam scheme. When you call ${business.phoneDisplay}, the person who answers can tell you the names of the streets in your neighborhood.`,
    ],
  });

  // SECTION 9 — Closing CTA
  sections.push({
    heading: `Book Your ${focusName} in ${city.name} Today`,
    paragraphs: [
      `If you have visible mold, a recent water event, an unexplained musty odor, or symptoms that improve when you leave the property, do not wait. Mold problems are dramatically less expensive to address in the first week than in the first month. Call ACD Mold at ${business.phoneDisplay} or book online and we will confirm an appointment in ${city.name} for the next available window — including same-day appointments for confirmed emergencies.`,
      `Every ${focusName.toLowerCase()} appointment in ${city.name} comes with a written scope, AIHA-accredited lab analysis when sampling is performed, plain-English written reports, and a workmanship guarantee on remediation work. We are local, we are licensed, and we have the references and reviews from your neighbors to prove it.`,
    ],
  });

  // FAQ section — include service FAQs + city-specific FAQ + sub-service FAQs
  const baseFaqs = [...(subService?.faqs ?? []), ...service.faqs];
  const cityFaqs = [
    {
      q: `Do you serve all of ${city.name}?`,
      a: `Yes. ACD Mold serves every ${city.name} ZIP code (${city.zips.join(', ')}) and the surrounding ${city.region}. Our headquarters at ${business.address.full} is a short drive from your property and we maintain certified inspectors and remediation crews on call throughout the area.`,
    },
    {
      q: `How quickly can you get to my ${city.name} property?`,
      a: `Standard appointments in ${city.name} are usually available within 24–48 hours. For confirmed water emergencies and same-day situations, we can typically dispatch a certified inspector within 2–4 hours.`,
    },
    {
      q: `Are you licensed to perform mold remediation in ${city.name}?`,
      a: `Yes. ACD Mold is a CSLB-licensed contractor in California, fully bonded, and carrying $2M general liability insurance. We provide certificates of insurance and license verification to ${city.name} property managers and HOAs on request.`,
    },
    {
      q: `What does ${focusName.toLowerCase()} typically cost in ${city.name}?`,
      a: `${subService?.pricing ?? '$295 – $895'} is the typical range for ${focusName.toLowerCase()} in ${city.name}, depending on property size and scope. We provide a written quote before booking and never charge surprise on-site fees.`,
    },
    {
      q: `Do you work with insurance for ${city.name} mold claims?`,
      a: `Yes. We document losses in the format insurance carriers require, communicate directly with adjusters when authorized, and provide AIHA-accredited lab reports that satisfy carrier documentation requirements.`,
    },
  ];

  const faqs = shuffle(rng, [...baseFaqs, ...cityFaqs]).slice(0, 8);

  // Word count estimate for transparency
  const wordCount =
    intro.split(/\s+/).length +
    sections.reduce((acc, s) => acc + s.paragraphs.join(' ').split(/\s+/).length + (s.list?.join(' ').split(/\s+/).length || 0), 0) +
    faqs.reduce((acc, f) => acc + (f.q + ' ' + f.a).split(/\s+/).length, 0);

  return { title, metaDescription, h1, intro, sections, faqs, wordCount };
}
