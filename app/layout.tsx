import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCallButton from '@/components/StickyCallButton';
import TopBar from '@/components/TopBar';
import { localBusinessJsonLd, organizationJsonLd } from '@/lib/seo';
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
    'mold testing',
    'mold inspection',
    'mold remediation',
    'black mold removal',
    'air quality testing',
    'IICRC mold remediation',
    'AIHA mold lab',
    'Encino mold inspector',
    'Los Angeles mold remediation',
    'Ventura County mold inspection',
    'San Fernando Valley mold testing',
  ],
  category: 'Home Services',
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'replace-with-google-site-verification',
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
      </body>
    </html>
  );
}
