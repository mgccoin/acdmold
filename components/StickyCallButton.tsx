import { Phone, MessageCircle } from 'lucide-react';
import { business } from '@/lib/business';

export default function StickyCallButton() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-brand-700 bg-brand-700 shadow-[0_-4px_20px_-8px_rgba(0,0,0,0.25)] md:hidden">
      <a
        href={business.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 px-4 py-4 font-semibold text-white"
        aria-label={`Call ${business.name} now at ${business.phoneDisplay}`}
      >
        <Phone className="h-5 w-5" />
        Call Now · {business.phoneDisplay}
      </a>
      <a
        href={`sms:${business.phone}`}
        className="flex items-center justify-center gap-2 border-l border-brand-600 bg-brand-800 px-5 py-4 text-white"
        aria-label="Text us"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
    </div>
  );
}
