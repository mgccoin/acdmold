import { Award, ShieldCheck, FlaskConical, Users, Star, MapPin } from 'lucide-react';
import { business } from '@/lib/business';

const items = [
  { icon: Award, label: 'IICRC + ACAC Certified' },
  { icon: FlaskConical, label: 'AIHA-Accredited Lab' },
  { icon: ShieldCheck, label: '$2M Liability Insured' },
  { icon: Users, label: `${business.projectsCompleted.toLocaleString()}+ Projects` },
  { icon: Star, label: `${business.averageRating}★ ${business.reviewCount}+ reviews` },
  { icon: MapPin, label: 'Local SoCal Team' },
];

export default function TrustBar() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="container-prose grid grid-cols-2 gap-3 py-6 sm:grid-cols-3 lg:grid-cols-6">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-xs font-semibold text-slate-700 sm:text-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <Icon className="h-4 w-4" />
            </span>
            {label}
          </div>
        ))}
      </div>
    </section>
  );
}
