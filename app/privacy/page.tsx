import Breadcrumbs from '@/components/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';
import { business } from '@/lib/business';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: `Privacy Policy for ${business.name}.`,
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Privacy' }]} />
      <section className="section bg-white">
        <div className="container-prose max-w-3xl">
          <h1 className="font-display text-3xl font-bold text-brand-900">Privacy Policy</h1>
          <div className="prose-content mt-6">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>{business.name} ("we", "us") respects your privacy. This policy describes what information we collect when you use our website or contact us, and how we use it.</p>
            <h2>Information we collect</h2>
            <p>When you submit a contact form or call us, we collect your name, phone number, email address, property address (if you provide it), and any details you share about your mold concern. We use this information solely to provide the services you requested.</p>
            <h2>Cookies and analytics</h2>
            <p>Our website may use cookies and standard analytics tools (e.g., Google Analytics) to understand how visitors use the site and improve our services. You can disable cookies in your browser settings.</p>
            <h2>Information sharing</h2>
            <p>We do not sell your personal information. We may share information with our independent AIHA-accredited lab partners when they are processing samples on your behalf, with your insurance carrier when you authorize us, or as required by law.</p>
            <h2>Data retention</h2>
            <p>We retain inspection and remediation reports for at least 7 years to support warranty work and insurance documentation. You may request deletion of your contact-form information at any time.</p>
            <h2>Contact</h2>
            <p>To request access, correction, or deletion of your information, contact us at {business.email} or call {business.phoneDisplay}.</p>
          </div>
        </div>
      </section>
    </>
  );
}
