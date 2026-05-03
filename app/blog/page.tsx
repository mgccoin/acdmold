import Link from 'next/link';
import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Mold Resources & Guides',
  description: 'Free mold resources from ACD Mold: guides, checklists, and articles for California homeowners and property managers.',
  path: '/blog',
});

const posts = [
  { slug: 'signs-of-hidden-mold', title: '7 Signs of Hidden Mold in a California Home', summary: 'How to spot mold before it spreads — without tearing apart your walls.' },
  { slug: 'mold-vs-mildew', title: 'Mold vs Mildew: What is the Difference?', summary: 'And when each one is actually dangerous.' },
  { slug: 'after-water-damage-checklist', title: 'After Water Damage: 48-Hour Mold Prevention Checklist', summary: 'The first 48 hours determine whether you have a drying job or a remediation job.' },
  { slug: 'choosing-a-mold-inspector', title: 'How to Choose a Mold Inspector in California', summary: '5 credentials to verify before you book.' },
  { slug: 'is-black-mold-really-toxic', title: 'Is Black Mold Really Toxic?', summary: 'What the science actually says about Stachybotrys.' },
  { slug: 'attic-mold-causes', title: 'Why Attic Mold Keeps Coming Back', summary: 'And how to fix the underlying ventilation problem for good.' },
];

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Resources' }]} />
      <Hero
        eyebrow="Free Resources"
        title="Mold Knowledge for California Homeowners"
        subtitle="Honest, science-based guides written by certified mold inspectors and remediators. No scare tactics, no upsells — just the information you need."
        imageSrc="/images/hero/blog-hero.png"
        imageAlt="ACD Mold resources"
      />
      <section className="section bg-white">
        <div className="container-prose">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <div key={p.slug} className="card">
                <div className="font-display text-lg font-bold text-brand-900">{p.title}</div>
                <p className="mt-2 text-sm text-slate-600">{p.summary}</p>
                <span className="mt-4 inline-block text-xs font-semibold text-brand-700">Coming Soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
