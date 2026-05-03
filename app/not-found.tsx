import Link from 'next/link';
import { Phone, Home } from 'lucide-react';
import { business } from '@/lib/business';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-prose text-center">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 shadow-soft">
          <div className="font-display text-6xl font-bold text-brand-700">404</div>
          <h1 className="mt-2 font-display text-2xl font-bold text-brand-900">Page not found</h1>
          <p className="mt-3 text-slate-600">
            The page you are looking for could not be located. Try our services or service area pages, or call us directly for help.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-primary">
              <Home className="h-4 w-4" /> Go home
            </Link>
            <a href={business.phoneHref} className="btn-secondary">
              <Phone className="h-4 w-4" /> {business.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
