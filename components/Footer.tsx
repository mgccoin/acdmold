import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Award } from 'lucide-react';
import { business } from '@/lib/business';
import { services } from '@/lib/services';
import { citiesByRegion } from '@/lib/cities';

export default function Footer() {
  const regions = Object.keys(citiesByRegion).sort();

  return (
    <footer className="border-t border-slate-200 bg-brand-950 text-slate-200">
      <div className="container-prose py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
                  <path d="M12 2c2.5 4 6 6 6 11a6 6 0 1 1-12 0c0-5 3.5-7 6-11Z" fill="currentColor" />
                </svg>
              </div>
              <div className="font-display text-xl font-bold text-white">ACD Mold</div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              {business.shortDescription}
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <a href={business.phoneHref} className="flex items-center gap-2 hover:text-accent-300">
                <Phone className="h-4 w-4 text-accent-400" /> {business.phoneDisplay}
              </a>
              <a href={`mailto:${business.email}`} className="flex items-center gap-2 hover:text-accent-300">
                <Mail className="h-4 w-4 text-accent-400" /> {business.email}
              </a>
              <span className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-accent-400" /> {business.address.full}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent-400" /> {business.hours.weekday}
              </span>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="font-display text-sm font-semibold uppercase tracking-wider text-accent-300">Services</div>
            <ul className="mt-4 space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-accent-300">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="font-semibold text-accent-300 hover:text-accent-200">
                  All Services →
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="font-display text-sm font-semibold uppercase tracking-wider text-accent-300">Service Area</div>
            <ul className="mt-4 space-y-2 text-sm">
              {regions.slice(0, 8).map((r) => (
                <li key={r}>
                  <Link href={`/service-area#${r.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-accent-300">
                    {r}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/service-area" className="font-semibold text-accent-300 hover:text-accent-200">
                  All cities →
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="font-display text-sm font-semibold uppercase tracking-wider text-accent-300">Company</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-accent-300">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-accent-300">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-accent-300">FAQ</Link></li>
              <li><Link href="/blog" className="hover:text-accent-300">Resources</Link></li>
              <li><Link href="/privacy" className="hover:text-accent-300">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-4 border-t border-brand-800 pt-8 text-xs text-slate-400 sm:grid-cols-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {business.certifications.map((c) => (
              <span key={c} className="flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-accent-400" /> {c}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 sm:justify-end">
            <ShieldCheck className="h-3.5 w-3.5 text-accent-400" />
            CSLB Licensed · $2M Insured · Bonded
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-2 border-t border-brand-800 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} {business.legalName}. All rights reserved.</span>
          <span>Proudly serving Los Angeles County, Ventura County, and the San Fernando Valley.</span>
        </div>
      </div>
    </footer>
  );
}
