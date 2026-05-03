export const business = {
  name: 'ACD Mold',
  legalName: 'ACD Mold Inspection & Remediation',
  url: 'https://acdmold.com',
  phone: '+14243527034',
  phoneDisplay: '(424) 352-7034',
  phoneHref: 'tel:+14243527034',
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
  social: {
    google: 'https://g.page/acdmold',
    facebook: 'https://facebook.com/acdmold',
    instagram: 'https://instagram.com/acdmold',
    yelp: 'https://yelp.com/biz/acd-mold-encino',
  },
  certifications: [
    'IICRC Certified Mold Remediation',
    'ACAC CMI Certified Mold Inspector',
    'EPA Lead-Safe Certified Firm',
    'NORMI Certified Mold Professional',
    'CDPH Certified Indoor Air Quality',
  ],
  yearsInBusiness: 12,
  projectsCompleted: 8500,
  averageRating: 4.9,
  reviewCount: 612,
  serviceRadiusMiles: 60,
  tagline: 'Trusted Mold Testing, Inspection & Remediation Across Southern California',
  shortDescription:
    'ACD Mold provides certified mold testing, inspection, and remediation across Los Angeles and Ventura County. Same-day appointments, lab-verified results, and licensed remediation crews.',
};

export type Business = typeof business;
