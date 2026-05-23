import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCallButton from '@/components/StickyCallButton';
import TopBar from '@/components/TopBar';
import {
  localBusinessJsonLd,
  organizationJsonLd,
  webSiteJsonLd,
  definedTermSetJsonLd,
} from '@/lib/seo';
import { business } from '@/lib/business';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: {
    default: `${business.name} | ${business.tagline}`,
    template: `%s | ${business.name}`,
  },
  description: business.shortDescription,
  applicationName: business.name,
  authors: [{ name: business.name, url: business.url }],
  generator: 'Next.js',
  keywords: [
    'mold testing Los Angeles',
    'mold inspection Los Angeles County',
    'mold remediation Los Angeles',
    'black mold removal LA',
    'air quality testing Los Angeles',
    'IICRC mold remediation California',
    'AIHA accredited mold lab',
    'Encino mold inspector',
    'Beverly Hills mold inspection',
    'Santa Monica mold testing',
    'Pasadena mold remediation',
    'Long Beach mold removal',
    'San Fernando Valley mold testing',
    'Ventura County mold inspection',
    'mold inspector near me',
    'same-day mold inspection',
    'emergency mold remediation 24/7',
    'Stachybotrys black mold removal',
    'post-remediation clearance testing California',
    'CSLB licensed mold remediation',
  ],
  category: 'Home Services',
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  other: {
    'geo.region': 'US-CA',
    'geo.placename': `${business.address.city}, California`,
    'geo.position': `${business.geo.latitude};${business.geo.longitude}`,
    ICBM: `${business.geo.latitude}, ${business.geo.longitude}`,
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION / _BING_ / _YANDEX_ in .env.local
  // to enable webmaster-tools verification without committing the codes.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? '',
      'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION ?? '',
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#1f7e5f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <TopBar />
        <Header />
        <main id="main" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <StickyCallButton />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetJsonLd()) }}
        />
      </body>
    </html>
  );
}
