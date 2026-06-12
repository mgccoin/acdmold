'use client';

import Script from 'next/script';
import { useEffect } from 'react';

// Set NEXT_PUBLIC_GA_MEASUREMENT_ID (looks like G-XXXXXXXXXX) in .env.local to
// enable Google Analytics 4. Without it, this component renders nothing.
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function Analytics() {
  // Track every click on a tel:/sms: link as a GA4 event. Mark `phone_call_click`
  // as a Key Event (conversion) in GA4 Admin → Events to measure calls per page.
  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.('a[href^="tel:"], a[href^="sms:"]') as HTMLAnchorElement | null;
      if (!link || !window.gtag) return;
      const href = link.getAttribute('href') ?? '';
      window.gtag('event', href.startsWith('tel:') ? 'phone_call_click' : 'sms_click', {
        link_url: href,
        page_path: window.location.pathname,
      });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
