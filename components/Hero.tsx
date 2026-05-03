import Image from 'next/image';
import Link from 'next/link';
import { Phone, ShieldCheck, Star, Clock } from 'lucide-react';
import { business } from '@/lib/business';

export default function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCtaLabel = 'Book a Free Quote',
  primaryCtaHref = '/contact',
  imageSrc = '/images/hero/main-hero.png',
  imageAlt = 'ACD Mold inspector with thermal imaging camera',
  badges = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  badges?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-accent-50">
      <div className="absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(47,157,119,0.15),transparent_50%),radial-gradient(circle_at_80%_60%,rgba(240,180,41,0.12),transparent_50%)]" />
      </div>

      <div className="container-prose grid gap-10 py-12 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <div className="lg:col-span-7">
          {eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700 backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-brand-950 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-700 sm:text-xl">{subtitle}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={business.phoneHref} className="btn-primary">
              <Phone className="h-5 w-5" />
              Call {business.phoneDisplay}
            </a>
            <Link href={primaryCtaHref} className="btn-secondary">
              {primaryCtaLabel}
            </Link>
          </div>

          {badges && (
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1 text-accent-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="mt-1 text-xs font-semibold text-brand-900">{business.averageRating}/5 from {business.reviewCount}+ reviews</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-brand-700">{business.yearsInBusiness}+</div>
                <div className="text-xs text-slate-600">Years Local Experience</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-brand-700">{business.projectsCompleted.toLocaleString()}+</div>
                <div className="text-xs text-slate-600">Projects Completed</div>
              </div>
              <div>
                <div className="flex items-center gap-1 font-display text-base font-bold text-brand-700">
                  <Clock className="h-4 w-4" /> 24/7
                </div>
                <div className="text-xs text-slate-600">Emergency Response</div>
              </div>
            </div>
          )}
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative overflow-hidden rounded-3xl bg-brand-900 shadow-soft">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={900}
              height={1100}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-brand-100 bg-white p-4 shadow-soft sm:block">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-brand-900">IICRC + ACAC Certified</div>
                <div className="text-[10px] text-slate-600">Lab-verified results in 3–5 days</div>
              </div>
            </div>
          </div>
          <div className="absolute -right-4 top-6 hidden rounded-2xl border border-accent-200 bg-white p-4 shadow-soft sm:block">
            <div className="text-xs font-semibold text-brand-900">Same-day appointments</div>
            <div className="mt-1 text-[10px] text-slate-600">Available across LA + Ventura County</div>
          </div>
        </div>
      </div>
    </section>
  );
}
