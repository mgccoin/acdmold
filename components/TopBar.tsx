import { Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { business } from '@/lib/business';

export default function TopBar() {
  return (
    <div className="hidden bg-brand-900 text-white md:block">
      <div className="container-prose flex h-10 items-center justify-between text-xs">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-accent-400" />
            {business.address.full}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-accent-400" />
            {business.hours.weekday}
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-accent-400" />
            IICRC + ACAC Certified · Fully Licensed & Insured
          </span>
        </div>
        <a href={business.phoneHref} className="flex items-center gap-1.5 font-semibold hover:text-accent-300">
          <Phone className="h-3.5 w-3.5" />
          {business.phoneDisplay} · 24/7 Emergency
        </a>
      </div>
    </div>
  );
}
