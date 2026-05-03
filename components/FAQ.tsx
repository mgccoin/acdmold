'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ({ items, title = 'Frequently Asked Questions' }: { items: { q: string; a: string }[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section bg-slate-50">
      <div className="container-prose">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-700">FAQ</span>
            <h2 className="h-sectionTitle mt-2">{title}</h2>
            <p className="mt-4 text-slate-600">
              We get the same questions every week. Here are clear, honest answers from our certified mold inspectors and remediation team. Still have a question? Call us anytime.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              {items.map((item, i) => (
                <div key={i}>
                  <button
                    type="button"
                    aria-expanded={open === i}
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition hover:bg-brand-50/60"
                  >
                    <span className="font-semibold text-brand-900">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-brand-700 transition ${open === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {open === i && (
                    <div className="px-6 pb-5 text-sm leading-relaxed text-slate-700">{item.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
