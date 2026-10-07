export const business = {
  name: 'ACD Mold',
  legalName: 'ACD Mold Inspection & Remediation',
  // Canonical host. The live site serves on www (the apex 308-redirects to it),
  // so every canonical tag, sitemap <loc>, robots host, OG url and JSON-LD @id
  // must use www to agree with the host Google actually fetches.
  url: 'https://www.acdmold.com',
  phone: '+14243527039',
  phoneDisplay: '(424) 352-7039',
  phoneHref: 'tel:+14243527039',
  email: 'info@acdmold.com',
  address: {
    street: '17209 Ventura Blvd',
    city: 'Encino',
    region: 'CA',
    postalCode: '91316',
    country: 'US',
    full: '17209 Ventura Blvd, Encino, CA 91316',
  },
  hours: {
    weekday: 'Mon-Sun 7:00 AM – 9:00 PM',
    open: '07:00',
    close: '21:00',
    days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    emergency: '24/7 Emergency Mold Response Available',
  },
  geo: {
    latitude: 34.1581,
    longitude: -118.5009,
  },
  // sameAs is built from these. Only list profiles ACD actually owns and that
  // resolve to a real, claimed page — a dead/guessed URL is worse than none for
  // entity resolution. TODO(owner): add the verified Google Business Profile
  // "share" URL and real Facebook/Instagram/Yelp pages once they exist.
  social: {} as Record<string, string>,
  // TODO(owner): verify each certification against its issuer (IICRC, ACAC,
  // EPA Lead-Safe firm registry, NORMI) and supply the holder name + credential
  // number so it can be linked for verification. Removed "CDPH Certified Indoor
  // Air Quality" — CDPH runs an IAQ *guidance* program and issues no such
  // certification, so advertising it is a false credential.
  certifications: [
    'IICRC Certified Mold Remediation',
    'ACAC CMI Certified Mold Inspector',
    'EPA Lead-Safe Certified Firm',
    'NORMI Certified Mold Professional',
  ],
  yearsInBusiness: 12,
  projectsCompleted: 8500,
  averageRating: 4.9,
  reviewCount: 612,
  serviceRadiusMiles: 60,
  tagline: 'Certified Mold Testing & Inspection Across Los Angeles County',
  shortDescription:
    'ACD Mold provides certified mold inspection and AIHA-accredited lab testing across Los Angeles County and Ventura County, and coordinates remediation through licensed, insured partner crews with independent post-remediation clearance. Same-day appointments and plain-English, lab-verified reports.',
};

export type Business = typeof business;
