import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-slate-100 bg-white">
      <div className="container-prose flex items-center gap-1.5 overflow-x-auto py-3 text-xs text-slate-500">
        {items.map((it, i) => (
          <span key={i} className="flex items-center gap-1.5 whitespace-nowrap">
            {it.href ? (
              <Link href={it.href} className="hover:text-brand-700">
                {it.name}
              </Link>
            ) : (
              <span className="font-semibold text-brand-900">{it.name}</span>
            )}
            {i < items.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-slate-300" />}
          </span>
        ))}
      </div>
    </nav>
  );
}
