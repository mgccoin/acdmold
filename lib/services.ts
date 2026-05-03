export type SubService = {
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
  process: string[];
  pricing: string;
  durationHours: string;
  faqs: { q: string; a: string }[];
};

export type Service = {
  name: string;
  slug: string;
  icon: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  heroImage: string;
  cardImage: string;
  metaDescription: string;
  whyMatters: string[];
  ourApproach: string[];
  certifications: string[];
  faqs: { q: string; a: string }[];
  subServices: SubService[];
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const sub = (
  name: string,
  shortDescription: string,
  longDescription: string,
  benefits: string[],
  process: string[],
  pricing: string,
  durationHours: string,
  faqs: { q: string; a: string }[]
): SubService => ({
  name,
  slug: slugify(name),
  shortDescription,
  longDescription,
  benefits,
  process,
  pricing,
  durationHours,
  faqs,
});

export const services: Service[] = [
  {
    name: 'Mold Testing',
    slug: 'mold-testing',
    icon: 'flask',
    tagline: 'Lab-Verified Mold Testing You Can Trust',
    shortDescription:
      'AIHA-accredited lab analysis with air, surface, and bulk sampling for accurate mold identification and exposure data.',
    longDescription:
      'Mold testing reveals what is actually growing in your home or building, where the spores are coming from, and whether the indoor environment is safe for the people who occupy it. ACD Mold uses calibrated Air-O-Cell cassettes, swab and tape-lift sampling, and AIHA-accredited third-party laboratories so every result is defensible for insurance, real estate, or medical purposes.',
    heroImage: '/images/services/mold-testing-hero.png',
    cardImage: '/images/services/mold-testing-card.png',
    metaDescription:
      'Certified mold testing with AIHA-accredited lab results. Air, surface, and bulk sampling for homes and businesses. Same-day appointments across Southern California.',
    whyMatters: [
      'Identifies hidden mold species before health symptoms escalate',
      'Provides legally defensible documentation for insurance claims and real estate transactions',
      'Confirms whether remediation work was successful and the space is safe to reoccupy',
      'Distinguishes harmless household molds from toxic Stachybotrys, Aspergillus, and Chaetomium',
      'Establishes a baseline indoor air quality reading you can compare against future tests',
    ],
    ourApproach: [
      'Walk-through interview to understand symptoms, prior leaks, and problem areas',
      'Calibrated air sampling (typically 75 L/min for 5 minutes) using fresh Air-O-Cell cassettes',
      'Outdoor control sample to provide a comparative baseline for the lab',
      'Surface samples by swab or tape-lift on visible suspect growth',
      'Chain-of-custody shipment to an AIHA-LAP accredited laboratory',
      'Plain-English written report with raw counts, species, and recommended next steps within 3-5 business days',
    ],
    certifications: ['AIHA-accredited lab partners', 'ACAC CMI-certified samplers', 'IICRC S520 standard adherence'],
    faqs: [
      {
        q: 'How long does mold testing take?',
        a: 'A typical home mold test visit takes 60–90 minutes on site. Lab analysis is returned within 3–5 business days, and rush 24-hour processing is available for an additional fee.',
      },
      {
        q: 'How much does mold testing cost?',
        a: 'Standard mold testing in Southern California ranges from $395 to $695 depending on the number of samples and the size of the property. We provide a flat upfront quote before booking.',
      },
      {
        q: 'Do I need testing if I can already see mold?',
        a: 'Visible mold should usually be removed by trained professionals regardless of testing. However, lab testing is still valuable when you need species identification, insurance documentation, or post-remediation clearance.',
      },
      {
        q: 'Can mold testing detect black mold (Stachybotrys)?',
        a: 'Yes. Our laboratory analysis identifies Stachybotrys chartarum (commonly called black mold) along with all other genera detected in the sample, with concentration counts in spores per cubic meter.',
      },
      {
        q: 'Will you also remediate if you find mold?',
        a: 'We can, but you are not obligated. Many clients prefer the inspector and remediator to be different companies for an unbiased clearance test. We are transparent about both options.',
      },
    ],
    subServices: [
      sub(
        'Mold Air Quality Testing',
        'Indoor air mold spore testing using calibrated Air-O-Cell cassettes and AIHA-accredited lab analysis.',
        'Mold air quality testing measures the concentration of airborne mold spores inside your home or building and compares it against an outdoor baseline. This is the gold standard for confirming whether occupants are being exposed to elevated mold levels and which species are present.',
        ['Identifies invisible airborne contamination', 'Compares indoor vs outdoor spore counts', 'Detects water-damage indicator species like Stachybotrys and Chaetomium', 'Provides a defensible report for insurance or litigation'],
        ['Pre-test interview about symptoms and history', 'Calibrate pump to 15 L/min', 'Collect 5-minute indoor sample per room of concern', 'Collect outdoor control sample upwind of the building', 'Ship to AIHA-LAP accredited lab with chain-of-custody', 'Deliver written report with interpretation'],
        '$395 – $595 for typical residential project (2-3 samples + outdoor control)',
        '1 – 2 hours on site, 3–5 days for lab results',
        [
          { q: 'How many air samples do I need?', a: 'A minimum of one indoor sample per area of concern plus one outdoor control. Most homes need 2–4 samples total for an accurate picture.' },
          { q: 'Is air testing the same as a mold inspection?', a: 'No. Air testing measures spores in the air. A full inspection includes visual assessment, moisture mapping, and infrared imaging in addition to (or instead of) testing.' },
        ]
      ),
      sub(
        'Surface Mold Testing',
        'Swab, tape-lift, and bulk sampling for visible mold growth on walls, ceilings, fabrics, and building materials.',
        'Surface mold testing physically collects spores or fragments from the substrate where they are growing. This is the best method when you can already see suspect staining or fuzzy growth and want to know exactly which species you are dealing with.',
        ['Definitive species identification on the actual material', 'Distinguishes active growth from settled dust', 'Useful for insurance documentation', 'Helps determine whether materials can be cleaned or must be removed'],
        ['Photograph the suspect area with scale reference', 'Sterilize sampling area perimeter', 'Collect swab, tape-lift, or bulk material per the standard appropriate to the substrate', 'Seal in sterile chain-of-custody container', 'Submit to AIHA-LAP accredited lab', 'Deliver report with growth assessment'],
        '$95 per sample (3-sample minimum)',
        '30–60 minutes on site, 3–5 days for lab results',
        [
          { q: 'Do I have to pay per sample?', a: 'Yes, surface samples are priced individually because each one is processed separately by the lab. Most projects need 2–4 surface samples.' },
          { q: 'What is the difference between swab and tape-lift?', a: 'Swabs are best for textured or porous surfaces; tape-lifts are best for smooth surfaces and preserve spore structure for easier identification.' },
        ]
      ),
      sub(
        'Lab-Based Mold Testing',
        'AIHA-accredited third-party laboratory analysis with full chain-of-custody documentation.',
        'All ACD Mold samples are sent to an independent AIHA-LAP accredited laboratory for analysis. We never read our own samples. This separation ensures that results are defensible in court, accepted by insurance carriers, and trusted by physicians.',
        ['Independent third-party verification', 'Court-admissible chain of custody', 'Accepted by major insurance carriers', 'Detailed species and concentration breakdown'],
        ['Field sampling with sealed chain-of-custody', 'Overnight shipping to AIHA-LAP lab', 'Microscopic and (when needed) culture analysis', 'Lab issues raw report with QA/QC data', 'ACD Mold inspector interprets and writes plain-English summary'],
        'Included with all testing packages',
        '3–5 business days standard, 24-hour rush available',
        [
          { q: 'Which labs do you use?', a: 'We rotate among several AIHA-LAP accredited environmental microbiology labs depending on turnaround needs and sample type. All are independent third parties.' },
          { q: 'Can I get the raw lab report?', a: 'Absolutely. We always include the unedited lab report along with our written interpretation.' },
        ]
      ),
      sub(
        'Specialty Mold Testing',
        'Hidden mold, post-remediation clearance, real estate, and insurance-claim mold testing programs.',
        'Specialty testing covers situations that go beyond a routine air sample. Hidden mold testing uses cavity probes, post-remediation clearance verifies cleanup success, and real estate testing produces transaction-ready reports lenders and agents accept.',
        ['Tailored sampling plan for unique situations', 'Cavity probes for hidden growth', 'Clearance protocols meeting IICRC S520 standards', 'Real-estate-friendly report format'],
        ['Pre-visit consultation to define test goals', 'Custom sampling plan (air, surface, cavity, ERMI/HERTSMI as needed)', 'Field collection per protocol', 'Lab analysis', 'Customized report tailored to the audience (insurer, buyer, court, physician)'],
        '$495 – $995 depending on scope',
        '1–3 hours on site, 3–7 days for results',
        [
          { q: 'What is post-remediation clearance testing?', a: 'After a remediation contractor finishes, an independent inspector verifies that spore counts are at or below outdoor baseline and that visible growth has been removed. This is required by most insurance policies before final payment.' },
          { q: 'Do you offer ERMI testing?', a: 'Yes. ERMI (Environmental Relative Moldiness Index) and HERTSMI-2 dust testing are available for clients with chronic inflammatory response syndrome (CIRS) or physician-ordered testing.' },
        ]
      ),
    ],
  },
  {
    name: 'Mold Inspection',
    slug: 'mold-inspection',
    icon: 'search',
    tagline: 'Comprehensive Visual + Moisture Mold Inspections',
    shortDescription:
      'Certified mold inspectors using thermal imaging, moisture meters, and borescopes to find hidden mold and moisture.',
    longDescription:
      'A real mold inspection is more than a flashlight and a clipboard. ACD Mold inspectors arrive with FLIR thermal cameras, calibrated pin and pinless moisture meters, hygrometers, and borescopes to pinpoint moisture intrusion, hidden growth, and the building defects that allowed mold to develop in the first place.',
    heroImage: '/images/services/mold-inspection-hero.png',
    cardImage: '/images/services/mold-inspection-card.png',
    metaDescription:
      'Professional mold inspection with thermal imaging, moisture mapping, and detailed written reports. Same-day appointments across Los Angeles and Ventura County.',
    whyMatters: [
      'Locates the moisture source so the underlying problem actually gets fixed',
      'Identifies mold growth hidden behind drywall, cabinets, and flooring',
      'Distinguishes cosmetic stains from active microbial growth',
      'Produces an objective report you can share with landlords, insurers, or buyers',
      'Provides the scope of work required for accurate remediation bidding',
    ],
    ourApproach: [
      'Pre-visit consultation about symptoms, history, and concerns',
      'Exterior inspection of grading, gutters, roof, and stucco',
      'Interior visual assessment of every room and accessible cavity',
      'Thermal imaging of all suspect walls, ceilings, and floors',
      'Moisture meter readings on building materials with elevated thermal signatures',
      'Borescope inspection of wall cavities when warranted',
      'Detailed written report with annotated photos and prioritized recommendations',
    ],
    certifications: ['ACAC Certified Mold Inspector (CMI)', 'IAC2 Certified Mold Inspector', 'InterNACHI Certified Inspector'],
    faqs: [
      {
        q: 'How long does a mold inspection take?',
        a: 'Most residential inspections take 90 minutes to 3 hours depending on the size of the home and the complexity of the situation. Commercial inspections may take a full day.',
      },
      {
        q: 'Do you charge for the inspection if you find no mold?',
        a: 'Yes. The value of an inspection is in the diagnostic process, not the outcome. A negative finding still saves you thousands compared to unnecessary remediation. Our standard inspection fee is $295–$595.',
      },
      {
        q: 'Will the inspection damage my walls?',
        a: 'Standard inspections are non-invasive. We may request permission for a small (1-inch) borescope hole if cavity inspection is necessary, and we always patch and document any access we create.',
      },
    ],
    subServices: [
      sub(
        'Residential Mold Inspection',
        'Whole-home mold inspection for single-family houses, condos, townhomes, and apartments.',
        'Residential mold inspections cover every accessible area of your home from attic to crawl space. We focus on the wet zones (bathrooms, kitchens, laundry, HVAC closets) plus any historical leak sites and produce a single consolidated report.',
        ['Whole-home thermal scan', 'Moisture mapping of all wet zones', 'Attic and crawl space assessment', 'Plain-English written report'],
        ['Exterior walk-around', 'Room-by-room visual + thermal scan', 'Wet-zone moisture mapping', 'Attic and crawl space inspection', 'Written report within 24–48 hours'],
        '$295 – $595 for typical home',
        '1.5 – 3 hours',
        [
          { q: 'Do you inspect the roof?', a: 'We visually inspect the roof from the eaves and ground using binoculars and document any visible defects. Walking the roof is available for an additional fee when safe.' },
          { q: 'What about my HVAC system?', a: 'We visually inspect accessible plenums, return grilles, and air handlers. Full HVAC interior cleaning is a separate service.' },
        ]
      ),
      sub(
        'Commercial Mold Inspection',
        'Office, retail, restaurant, hotel, school, and warehouse mold inspection programs.',
        'Commercial mold inspections require coordination with property managers, scheduling around tenant operations, and reporting that satisfies insurance and lender requirements. We carry $2M general liability and provide certificates of insurance same-day.',
        ['Tenant-friendly scheduling (after-hours available)', 'Property-management-friendly reporting', 'Insurance and lender ready documentation', 'Multi-unit pricing'],
        ['Pre-inspection coordination with property manager', 'Walk-through with point of contact', 'Comprehensive thermal and moisture survey', 'Tenant interviews when authorized', 'Detailed report with photo log and recommendations'],
        '$0.05 – $0.15 per sq ft (volume discount)',
        '4 – 12 hours depending on size',
        [
          { q: 'Can you inspect occupied tenant spaces?', a: 'Yes. We coordinate notice and entry per CA Civil Code 1954 and can work after hours to minimize disruption.' },
          { q: 'Do you provide certificates of insurance?', a: 'Same-day COIs are standard. We carry $2M general liability and $1M professional liability.' },
        ]
      ),
      sub(
        'Visual Mold Inspection',
        'Targeted visual mold inspection for visible suspect growth on walls, ceilings, baseboards, and cabinets.',
        'When you can already see something suspicious — a dark spot in the corner of the bathroom, fuzzy growth behind the toilet, staining around a window — a visual inspection is often the most cost-effective starting point. We document the extent of visible growth, identify the moisture source, and recommend next steps.',
        ['Cost-effective starting point', 'Same-day appointments', 'Photo-documented findings', 'Clear next-step recommendations'],
        ['Walk-through to identify all visible suspect areas', 'Photographic documentation with scale', 'Moisture meter readings on affected materials', 'Brief written report with recommendations'],
        '$195 – $295',
        '45 – 90 minutes',
        [
          { q: 'Will you take samples during a visual inspection?', a: 'Sampling is optional and quoted separately. Many visual inspections do not require lab work if the source is obvious and the area is small.' },
        ]
      ),
      sub(
        'Moisture & Leak Detection',
        'Thermal imaging, moisture mapping, and hidden leak detection for plumbing, roof, and slab leaks.',
        'Most mold problems start with moisture, and most moisture problems are invisible until the damage is done. Our FLIR thermal cameras and calibrated moisture meters find leaks behind walls, under floors, and inside ceiling cavities so you can fix the source before mold has a chance to grow.',
        ['Non-invasive leak detection', 'FLIR thermal imaging included', 'Pin and pinless moisture readings', 'Plumbing, roof, and slab leak experience'],
        ['Whole-area thermal scan', 'Moisture meter confirmation on hot spots', 'Hygrometer readings on suspect cavities', 'Borescope inspection of cavities when warranted', 'Written report with annotated thermal images'],
        '$295 – $495',
        '1 – 2 hours',
        [
          { q: 'Can you find a slab leak?', a: 'We can identify the thermal signature of an active slab leak and the resulting moisture migration. For pinpointing under the slab, we coordinate with a licensed plumber who specializes in leak detection.' },
        ]
      ),
      sub(
        'Area-Specific Mold Inspection',
        'Targeted inspections for attics, crawl spaces, basements, HVAC, bathrooms, and kitchens.',
        'Sometimes you do not need a whole-home inspection — you need to know whether the attic has roof-leak mold or whether the crawl space humidity is causing growth on the joists. Area-specific inspections focus our certified inspectors on a single zone for a fraction of the cost.',
        ['Targeted scope, lower cost', 'Same expert tools and methodology', 'Specific written report on the area inspected'],
        ['Pre-visit confirmation of scope', 'Detailed assessment of the targeted area', 'Photo and moisture documentation', 'Written report on the specific area'],
        '$195 – $395 per area',
        '45 – 90 minutes',
        [
          { q: 'Can I add a second area later?', a: 'Yes. Many clients start with one area (e.g., attic) and add another (e.g., crawl space) on the same visit. Each additional area is discounted.' },
        ]
      ),
      sub(
        'Mold Damage Assessment',
        'Documentation of mold damage extent, structural impact, and remediation scope for insurance and legal claims.',
        'When you have an insurance claim, a property dispute, or a habitability complaint, you need more than a basic inspection — you need a defensible damage assessment that quantifies what has been affected and what it will take to make it right. Our reports are built to be admissible.',
        ['Defensible insurance documentation', 'Quantified scope of damage', 'Itemized remediation recommendations', 'Court-ready photographic record'],
        ['Damage walk-through with claim number', 'Comprehensive photo and moisture log', 'Structural impact assessment', 'Itemized scope of remediation work', 'Detailed written report formatted for insurance carriers'],
        '$595 – $1,495',
        '2 – 4 hours',
        [
          { q: 'Will you testify if my claim goes to court?', a: 'Yes. Our certified inspectors can serve as expert witnesses with appropriate scheduling and fees.' },
        ]
      ),
    ],
  },
  {
    name: 'Mold Remediation',
    slug: 'mold-remediation',
    icon: 'shield',
    tagline: 'Licensed, Insured Mold Remediation Done Right',
    shortDescription:
      'IICRC S520 compliant mold remediation with full containment, HEPA filtration, and post-remediation clearance.',
    longDescription:
      'Mold remediation is not just cleaning — it is a controlled process of containment, removal, and verification designed to prevent cross-contamination and protect occupants. ACD Mold follows the IICRC S520 standard on every project, from a single-room bathroom remediation to whole-home post-flood cleanup.',
    heroImage: '/images/services/mold-remediation-hero.png',
    cardImage: '/images/services/mold-remediation-card.png',
    metaDescription:
      'Licensed mold remediation following IICRC S520 standards. Full containment, HEPA filtration, and third-party clearance testing. Free estimates across Southern California.',
    whyMatters: [
      'Stops active growth before it spreads to additional building materials',
      'Removes mycotoxins and allergens that cause respiratory and immune symptoms',
      'Restores property value and prevents structural damage',
      'Satisfies insurance, real estate, and code-compliance requirements',
      'Protects occupants — especially children, elderly, and immunocompromised — from ongoing exposure',
    ],
    ourApproach: [
      'IICRC S520 compliant scope of work prepared from inspection findings',
      'Containment installation with 6-mil poly and zipper doors',
      'Negative air pressure with HEPA-filtered air scrubbers (minimum 4 air changes per hour)',
      'Removal of mold-contaminated porous materials',
      'HEPA vacuuming and antimicrobial treatment of remaining structure',
      'Post-remediation visual verification + independent third-party clearance testing',
      'Reconstruction coordination if needed',
    ],
    certifications: ['IICRC AMRT (Applied Microbial Remediation Technician)', 'IICRC WRT (Water Damage Restoration)', 'CSLB licensed C-61/D-64 (limited specialty)'],
    faqs: [
      {
        q: 'How much does mold remediation cost?',
        a: 'Small isolated jobs (one bathroom, under 10 sq ft) typically run $1,500–$3,500. Mid-size projects (one room, 10–30 sq ft) run $3,500–$7,500. Large or whole-home projects can range from $7,500–$30,000+.',
      },
      {
        q: 'Will my insurance cover mold remediation?',
        a: 'Coverage depends on your policy and the cause. Mold caused by a sudden covered event (burst pipe, storm) is usually covered; mold caused by long-term humidity or maintenance issues usually is not. We help you document the claim either way.',
      },
      {
        q: 'How long will I have to stay out of my home?',
        a: 'Most small remediations let occupants stay (with the work area sealed off). Larger projects involving whole rooms or HVAC contamination may require relocation for 2–7 days.',
      },
      {
        q: 'Do you guarantee your work?',
        a: 'Yes. All ACD Mold remediation projects include a written workmanship guarantee plus a third-party clearance test that we are willing to re-do at no charge if the first one fails.',
      },
    ],
    subServices: [
      sub(
        'Residential Mold Remediation',
        'IICRC S520 compliant mold remediation for homes, condos, apartments, and rental properties.',
        'Residential mold remediation requires careful protection of the rest of the home so the cleanup process does not spread spores to clean areas. ACD Mold uses full containment, HEPA filtration, and HEPA vacuuming on every residential project regardless of size.',
        ['Full containment with zipper doors', 'HEPA-filtered negative air machines', 'Antimicrobial treatment of remaining structure', 'Independent clearance testing'],
        ['Pre-work consent and scope sign-off', 'Containment setup and negative air installation', 'Controlled removal of contaminated materials', 'HEPA vacuuming and antimicrobial wipe-down', 'Drying verification', 'Third-party clearance testing'],
        '$1,500 – $15,000 typical residential project',
        '1 – 5 days depending on size',
        [
          { q: 'Will my family need to move out?', a: 'For small contained jobs, you can usually stay. For larger or whole-home jobs, we recommend relocating for 2–5 days. We provide written guidance for your specific situation.' },
        ]
      ),
      sub(
        'Commercial Mold Remediation',
        'Office, retail, restaurant, hotel, school, and warehouse mold remediation with after-hours scheduling.',
        'Commercial mold remediation requires minimizing operational disruption, satisfying landlord and tenant obligations, and maintaining compliance with OSHA and Cal/OSHA standards. ACD Mold offers after-hours and weekend scheduling for businesses that cannot close.',
        ['After-hours and weekend scheduling', 'OSHA compliant work practices', 'Property management coordination', 'Volume pricing for multi-unit projects'],
        ['Coordination with property manager and tenants', 'After-hours containment installation', 'Phased remediation to maintain operations', 'Daily progress reports', 'Third-party clearance with detailed documentation'],
        '$3,500 – $50,000+ depending on size',
        '1 – 14 days',
        [
          { q: 'Can you work overnight?', a: 'Yes. We regularly perform overnight remediation for restaurants, hotels, and offices that cannot close during business hours.' },
        ]
      ),
      sub(
        'Black Mold Remediation',
        'Specialized Stachybotrys (black mold) remediation with enhanced containment and PPE.',
        'Black mold (Stachybotrys chartarum) requires extra precautions because of its mycotoxin production. ACD Mold uses Level III containment, P-100 respirators, full Tyvek suits, and decontamination chambers on all confirmed Stachybotrys projects.',
        ['Level III containment with decon chamber', 'P-100 respirator and full Tyvek PPE', 'Enhanced HEPA filtration', 'Mandatory third-party clearance'],
        ['Confirmed Stachybotrys lab result review', 'Level III containment installation with decon chamber', 'Removal of all affected porous materials', 'HEPA vacuuming and antimicrobial treatment', 'Mandatory third-party clearance testing'],
        '$3,500 – $20,000+',
        '2 – 7 days',
        [
          { q: 'Is black mold really more dangerous?', a: 'Stachybotrys produces mycotoxins that are linked to respiratory, neurological, and immune symptoms in sensitive individuals. The remediation methodology is essentially the same but the precautions are elevated.' },
        ]
      ),
      sub(
        'Mold Removal & Cleanup',
        'Visible mold removal, mold-damaged material removal, and surface cleanup services.',
        'When mold is limited to a small surface area and there is no underlying structural damage, mold removal and cleanup is the most cost-effective path. We HEPA vacuum, treat with EPA-registered antimicrobials, and verify completion visually or with surface sampling.',
        ['Cost-effective for small areas', 'EPA-registered antimicrobials', 'HEPA vacuuming included', 'Optional clearance testing'],
        ['Scope confirmation', 'Mini-containment if needed', 'HEPA vacuuming and antimicrobial wipe-down', 'Removal of damaged porous materials', 'Visual or surface clearance'],
        '$595 – $2,500',
        '2 – 8 hours',
        [
          { q: 'When is removal not enough?', a: 'If the underlying material (drywall, insulation, framing) is saturated or stained through, removal alone will leave hidden contamination. In those cases full remediation is required.' },
        ]
      ),
      sub(
        'Containment & Air Filtration',
        'Mold containment setup, negative air pressure, HEPA air scrubbers, and decontamination chambers.',
        'Containment is what separates professional mold remediation from amateur cleanup. ACD Mold builds 6-mil poly containments with zipper doors, runs HEPA-filtered negative air machines at minimum 4 air changes per hour, and installs decontamination chambers on enhanced-precaution projects.',
        ['6-mil poly with zipper doors', 'Negative air pressure verification', 'HEPA filtration to 0.3 microns', 'Decontamination chambers when needed'],
        ['Site protection of clean areas', 'Containment construction', 'Negative air machine installation and verification', 'Daily monitoring during remediation', 'Controlled tear-down with HEPA vacuuming'],
        'Included in all remediation projects',
        '2 – 6 hours setup',
        [
          { q: 'Can I rent equipment to do this myself?', a: 'You can rent HEPA air scrubbers and dehumidifiers, but the setup, monitoring, and tear-down protocols matter as much as the equipment. DIY containments often spread contamination.' },
        ]
      ),
      sub(
        'Structural Mold Remediation',
        'Drywall, framing, subfloor, joist, and sheathing mold remediation with carpentry repair coordination.',
        'When mold has penetrated the structure of the building — wall cavities, framing, sheathing, subfloors — surface cleaning is not enough. Structural mold remediation removes affected building materials, treats remaining wood with antimicrobials, and coordinates carpentry repairs.',
        ['Affected materials physically removed', 'Wood antimicrobial treatment', 'Carpentry repair coordination', 'Structural drying verification'],
        ['Demo scope marked and photographed', 'Selective demolition under containment', 'Wood treatment with EPA-registered antimicrobial', 'Drying verification with moisture meter readings', 'Reconstruction coordination'],
        '$2,500 – $20,000+',
        '3 – 10 days',
        [
          { q: 'Will my framing need to be replaced?', a: 'Most stained or surface-contaminated framing can be cleaned, treated, and saved. Framing with rot, structural compromise, or saturated cores must be replaced. We document each piece in the report.' },
        ]
      ),
      sub(
        'Attic Mold Remediation',
        'Attic mold removal with roof sheathing treatment, insulation replacement, and ventilation correction.',
        'Attic mold almost always traces back to a moisture problem — roof leak, bath fan venting into the attic, blocked soffit vents, or condensation from poor insulation. Effective attic remediation removes the growth, fixes the moisture source, and improves ventilation to prevent recurrence.',
        ['Roof sheathing treatment', 'Old insulation removal', 'Ventilation assessment and correction', 'Bath fan venting correction'],
        ['Identify and stop moisture source', 'Containment at attic access', 'HEPA vacuum + antimicrobial treatment of sheathing', 'Insulation removal and replacement', 'Ventilation correction', 'Final clearance testing'],
        '$2,500 – $9,500',
        '2 – 5 days',
        [
          { q: 'Will the insulation need to be replaced?', a: 'Contaminated batt or blown-in insulation cannot be effectively cleaned and is removed and replaced. Clean insulation is left in place.' },
        ]
      ),
      sub(
        'Crawl Space Mold Remediation',
        'Crawl space mold removal, vapor barrier installation, and moisture-control encapsulation support.',
        'Crawl space mold problems come from ground moisture, leaking plumbing, and poor ventilation. Effective remediation cleans the framing, replaces contaminated insulation, installs a vapor barrier, and often coordinates with a dehumidifier or encapsulation contractor for long-term moisture control.',
        ['Framing wood treatment', 'Vapor barrier installation', 'Insulation replacement', 'Encapsulation coordination'],
        ['Source moisture identification', 'Crawl space access containment', 'Debris removal', 'Wood antimicrobial treatment', 'Vapor barrier installation', 'Insulation replacement when needed'],
        '$2,500 – $12,000',
        '2 – 5 days',
        [
          { q: 'Do I need full encapsulation?', a: 'Encapsulation is the most effective long-term solution but is also the most expensive. We help you decide based on the moisture source and your budget.' },
        ]
      ),
      sub(
        'Basement Mold Remediation',
        'Basement mold removal, moisture control, and waterproofing-coordination support.',
        'Basement mold is almost always tied to water — hydrostatic pressure pushing through walls, poor exterior drainage, plumbing leaks, or condensation. Long-term success requires both remediation and moisture-source correction.',
        ['Wall and floor cleanup', 'Moisture-source correction guidance', 'Waterproofing coordination', 'Dehumidification recommendations'],
        ['Source assessment', 'Containment of work area', 'Material removal', 'Antimicrobial treatment', 'Dehumidification', 'Final clearance'],
        '$2,500 – $15,000',
        '2 – 6 days',
        [
          { q: 'Should I waterproof first or remediate first?', a: 'Order depends on the source. Active intrusion must be stopped first. We coordinate with waterproofing contractors when needed.' },
        ]
      ),
      sub(
        'Bathroom Mold Remediation',
        'Shower, ceiling, vanity, tile and grout, and exhaust-fan mold remediation.',
        'Bathroom mold is the most common residential mold problem because of the constant moisture and limited ventilation. Effective bathroom remediation removes affected drywall and caulking, treats remaining surfaces, and corrects ventilation to prevent return.',
        ['Tile and grout treatment', 'Caulking removal and replacement', 'Exhaust fan correction', 'Anti-microbial paint when appropriate'],
        ['Mini-containment of bathroom', 'Removal of affected drywall and caulking', 'HEPA vacuuming + antimicrobial', 'Exhaust fan testing and correction', 'Reconstruction coordination'],
        '$1,500 – $5,500',
        '1 – 3 days',
        [
          { q: 'Will the shower need to be retiled?', a: 'Only if the substrate behind the tile is contaminated or rotted. Surface-only cleanup is often sufficient when caught early.' },
        ]
      ),
      sub(
        'Kitchen Mold Remediation',
        'Under-sink, cabinet, dishwasher, refrigerator, and water-line mold cleanup.',
        'Kitchen mold typically appears under sinks, behind appliances, and in cabinet bases due to slow plumbing leaks. Effective remediation removes affected cabinetry, treats the substrate, and coordinates with a plumber to fix the underlying leak.',
        ['Cabinet base removal', 'Plumbing-leak coordination', 'Subfloor inspection', 'Antimicrobial treatment'],
        ['Source identification with plumber if needed', 'Containment under sink or behind appliance', 'Cabinet base removal', 'Subfloor assessment and treatment', 'Reconstruction coordination'],
        '$1,500 – $6,500',
        '1 – 3 days',
        [
          { q: 'Will I need to replace my cabinets?', a: 'Often only the base or back panel is affected and can be replaced. Full cabinet replacement is required only when the boxes themselves are saturated and rotted.' },
        ]
      ),
      sub(
        'HVAC & Air Duct Mold Services',
        'HVAC mold inspection and remediation, air duct mold cleaning, and coil decontamination.',
        'HVAC contamination can spread mold spores to every room in the building. ACD Mold inspects air handlers, evaporator coils, plenums, and ductwork, then performs NADCA-aligned cleaning and antimicrobial treatment when contamination is confirmed.',
        ['Air handler and coil inspection', 'NADCA-aligned duct cleaning', 'Antimicrobial coil treatment', 'Air quality verification'],
        ['HVAC system assessment', 'Containment of vents and registers', 'Coil and plenum cleaning', 'Duct cleaning per NADCA standards', 'Post-cleaning air quality verification'],
        '$895 – $4,500',
        '1 – 2 days',
        [
          { q: 'Do I need to replace flexible ductwork?', a: 'Heavily contaminated flex duct is replaced rather than cleaned because it cannot be effectively decontaminated. Rigid metal ducts are cleaned in place.' },
        ]
      ),
      sub(
        'Water Damage Mold Remediation',
        'Mold cleanup after pipe burst, roof leak, plumbing leak, sewage backup, and storm damage.',
        'Mold typically begins to grow within 24–48 hours of water intrusion. Effective post-water-damage remediation combines emergency drying, mold remediation, and structural repair into a single coordinated project.',
        ['Emergency response (24/7)', 'Combined water and mold protocol', 'Structural drying with desiccant dehumidifiers', 'Insurance documentation'],
        ['Emergency water extraction', 'Structural drying with monitoring', 'Mold remediation under containment', 'Reconstruction coordination', 'Insurance reporting'],
        '$2,500 – $25,000',
        '3 – 10 days',
        [
          { q: 'Should I file a claim before calling you?', a: 'Call us first or simultaneously. Documenting the loss properly from the start makes the claim easier and improves your reimbursement.' },
        ]
      ),
    ],
  },
  {
    name: 'Post-Remediation Services',
    slug: 'post-remediation',
    icon: 'check-circle',
    tagline: 'Independent Clearance Testing & Long-Term Prevention',
    shortDescription:
      'Third-party post-remediation verification, clearance testing, and ongoing mold prevention programs.',
    longDescription:
      'A remediation project is not complete until an independent inspector verifies that the work was successful. ACD Mold provides third-party clearance testing for projects performed by other contractors and ongoing prevention programs to keep mold from coming back.',
    heroImage: '/images/services/post-remediation-hero.png',
    cardImage: '/images/services/post-remediation-card.png',
    metaDescription:
      'Independent post-remediation clearance testing and mold prevention services. AIHA-accredited lab analysis. Required by most insurance carriers.',
    whyMatters: [
      'Verifies remediation contractors completed the work to standard',
      'Required by most insurance carriers before final payment',
      'Provides documented proof for buyers, tenants, and lenders',
      'Catches missed contamination before walls are closed up',
      'Establishes a clean baseline for future testing',
    ],
    ourApproach: [
      'Pre-clearance scope review of the original remediation plan',
      'Visual verification that all noted areas are clean and dry',
      'Air sampling inside containment vs outdoor baseline',
      'Surface sampling on previously contaminated substrates',
      'AIHA-LAP accredited lab analysis',
      'Pass/fail clearance report with recommendations',
    ],
    certifications: ['ACAC CMI Certified Mold Inspector', 'AIHA-LAP accredited lab partners', 'IICRC S520 standard verification'],
    faqs: [
      {
        q: 'Why do I need an independent third party?',
        a: 'A clearance test performed by the same company that did the remediation has an obvious conflict of interest. Most insurance carriers and informed property owners require an independent third party.',
      },
      {
        q: 'What happens if the clearance fails?',
        a: 'The remediation contractor returns to address the missed areas at their cost. We then re-test until the project passes. Failure is rare when the original work is done properly.',
      },
      {
        q: 'How long does clearance take?',
        a: '1–2 hours on site, plus 3–5 business days for lab analysis. Rush 24-hour processing is available.',
      },
    ],
    subServices: [
      sub(
        'Clearance Testing',
        'Independent post-remediation mold clearance testing with AIHA-accredited lab analysis.',
        'Clearance testing is the final step of any professional mold remediation project. We sample inside the still-standing containment to verify spore counts are at or below outdoor baseline and that previously contaminated surfaces are clean.',
        ['Independent third-party verification', 'AIHA-LAP accredited lab', 'Pass/fail report with raw data', 'Insurance carrier accepted format'],
        ['Pre-clearance review of remediation scope', 'Visual verification', 'Air sampling inside containment + outdoor control', 'Surface sampling of previously affected substrates', 'Lab analysis', 'Written clearance report'],
        '$495 – $895',
        '1 – 2 hours on site, 3–5 days for lab',
        [
          { q: 'Can you do clearance for work another company did?', a: 'Yes — and you usually want it that way for the unbiased perspective.' },
        ]
      ),
      sub(
        'Prevention & Maintenance',
        'Ongoing mold prevention plans including humidity control, ventilation, and seasonal inspections.',
        'The cheapest mold problem is the one that never starts. ACD Mold offers prevention plans that include humidity-control recommendations, ventilation assessments, and annual or seasonal mold inspections to catch issues early.',
        ['Humidity control recommendations', 'Ventilation assessment', 'Annual or seasonal inspections', 'Discounted member pricing on testing'],
        ['Initial baseline inspection', 'Customized prevention plan', 'Scheduled follow-up visits', 'Documented findings each visit'],
        '$295 – $895 annual plan',
        '1–2 hours per visit',
        [
          { q: 'Is a prevention plan worth it?', a: 'For homes with prior mold issues, high humidity, or sensitive occupants, an annual plan typically saves thousands by catching problems early.' },
        ]
      ),
    ],
  },
  {
    name: 'Emergency Mold Services',
    slug: 'emergency-mold-services',
    icon: 'phone',
    tagline: '24/7 Emergency Mold Response Across Southern California',
    shortDescription:
      'Same-day emergency mold inspection, testing, and remediation for floods, sewage backups, and urgent contamination.',
    longDescription:
      'Mold emergencies happen — burst pipes at midnight, sewage backups during a holiday weekend, sudden visible black mold growth before a real estate closing. ACD Mold maintains a 24/7 emergency line and dispatches certified inspectors and licensed remediation crews on a same-day basis across Los Angeles and Ventura County.',
    heroImage: '/images/services/emergency-mold-hero.png',
    cardImage: '/images/services/emergency-mold-card.png',
    metaDescription:
      '24/7 emergency mold services. Same-day inspection, testing, and remediation for floods, sewage backups, and urgent contamination. Call (424) 352-7034.',
    whyMatters: [
      'Mold begins to grow within 24–48 hours of water intrusion',
      'Same-day response can prevent thousands of dollars in additional damage',
      'Critical for real-estate transactions with closing deadlines',
      'Required for habitability disputes with strict notice deadlines',
      'Protects vulnerable occupants from acute exposure',
    ],
    ourApproach: [
      '24/7 phone line with on-call certified inspector',
      'Same-day emergency dispatch for confirmed contamination',
      'Emergency containment to prevent cross-contamination',
      'Coordination with plumbers, electricians, and water-extraction crews',
      'Insurance documentation from the first hour',
    ],
    certifications: ['IICRC WRT Water Damage Restoration', 'IICRC AMRT Applied Microbial Remediation', 'CSLB licensed contractor'],
    faqs: [
      {
        q: 'How fast can you arrive?',
        a: 'For confirmed water emergencies, our standard response time is 60–120 minutes within Los Angeles and Ventura County during business hours, and 2–4 hours for after-hours and overnight calls.',
      },
      {
        q: 'Do you charge extra for after-hours service?',
        a: 'After-hours and weekend service includes a modest premium that we disclose before dispatch. Insurance typically covers the additional cost in covered emergencies.',
      },
      {
        q: 'Can you stop water that is still running?',
        a: 'Our crews are trained to safely shut off water at the main and to coordinate with a licensed plumber for active leak repairs.',
      },
    ],
    subServices: [
      sub(
        'Emergency Mold Inspection',
        'Same-day mold inspection for urgent water damage, real estate closings, and habitability disputes.',
        'When you need a certified mold inspection today — for a real estate closing, an insurance claim, or a habitability dispute — ACD Mold dispatches inspectors on a same-day basis with rush 24-hour lab processing if testing is required.',
        ['Same-day dispatch', '24-hour lab rush available', 'Real estate friendly reporting', 'Habitability dispute documentation'],
        ['Emergency phone consultation', 'Same-day or next-day dispatch', 'Comprehensive on-site inspection', 'Rush lab processing if testing is performed', 'Same-week written report'],
        '$395 – $895 + rush fees',
        'Same day on site, 24 hours for rush lab',
        [
          { q: 'Is there a guaranteed arrival time?', a: 'We provide a confirmed arrival window when you book. For confirmed water emergencies we usually arrive within 2 hours during business hours.' },
        ]
      ),
      sub(
        'Emergency Mold Remediation',
        '24/7 emergency mold remediation for flooded homes, sewage backups, and post-storm contamination.',
        'Emergency remediation begins within hours of the call. We extract standing water, set up emergency containment, install desiccant dehumidifiers, and begin removal of contaminated materials before mold has a chance to spread.',
        ['24/7 dispatch', 'Emergency containment', 'Combined water + mold protocol', 'Insurance documentation from hour one'],
        ['Emergency dispatch', 'Water extraction', 'Emergency containment installation', 'Material removal under containment', 'Structural drying with monitoring', 'Standard remediation completion'],
        '$2,500 – $25,000+ depending on extent',
        '3 – 10 days',
        [
          { q: 'Will you coordinate with my insurance adjuster?', a: 'Yes. We document the loss, communicate with adjusters, and provide the photo logs and lab results carriers require.' },
        ]
      ),
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getSubServiceBySlug(serviceSlug: string, subSlug: string): SubService | undefined {
  const service = getServiceBySlug(serviceSlug);
  return service?.subServices.find((ss) => ss.slug === subSlug);
}

export const allServiceSlugs = services.map((s) => s.slug);
export const allSubServicePairs = services.flatMap((s) =>
  s.subServices.map((ss) => ({ service: s.slug, subService: ss.slug }))
);
