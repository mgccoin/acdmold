'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { business } from '@/lib/business';
import { services } from '@/lib/services';

const mainNav = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services', hasDropdown: true },
  { href: '/service-area', label: 'Service Area' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="container-prose flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
              <path
                d="M12 2c2.5 4 6 6 6 11a6 6 0 1 1-12 0c0-5 3.5-7 6-11Z"
                fill="currentColor"
              />
              <circle cx="12" cy="13" r="2" fill="#fff" opacity="0.6" />
            </svg>
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold text-brand-900">ACD Mold</div>
            <div className="text-[10px] uppercase tracking-wider text-brand-700">Inspection · Testing · Remediation</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) =>
            item.hasDropdown ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                {servicesOpen && (
                  <div className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-1">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                      <div className="grid grid-cols-2 gap-4">
                        {services.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="rounded-xl p-3 transition hover:bg-brand-50"
                          >
                            <div className="font-semibold text-brand-900">{s.name}</div>
                            <div className="mt-1 text-xs text-slate-600">{s.tagline}</div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 border-t border-slate-100 pt-4 text-center text-xs text-slate-500">
                        <Link href="/services" className="font-semibold text-brand-700 hover:text-brand-900">
                          See all services →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={business.phoneHref}
            className="hidden items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 sm:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {business.phoneDisplay}
          </a>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-brand-900 lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="container-prose flex flex-col py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-1 gap-1 rounded-xl bg-brand-50/60 p-3">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  onClick={() => setOpen(false)}
                  className="rounded px-2 py-2 text-sm text-brand-800 hover:bg-white"
                >
                  → {s.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
