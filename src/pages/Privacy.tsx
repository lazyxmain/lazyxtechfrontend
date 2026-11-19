import LegalLayout from '../components/LegalLayout';
import { useSEO } from '../lib/seo';

export default function Privacy() {
  useSEO({
    title: 'Privacy Policy — LazyXTech',
    description:
      'How LazyXTech collects, uses and protects information submitted through project inquiries and website browsing.',
    path: '/privacy',
  });

  return (
    <LegalLayout eyebrow="Legal" title="Privacy Policy" updated="November 19, 2026">
      <p>
        LazyXTech (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) respects your privacy. This
        policy explains what information we collect through this website and how it is used.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        When you submit a project inquiry, we collect the details you provide: your name, work
        email, company name, project type, estimated budget and project description. We do not
        collect payment information through this website.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>
        Information from inquiries is used solely to respond to your request, prepare proposals and
        communicate about your project. We do not sell, rent or share your information with third
        parties for marketing purposes.
      </p>

      <h2>3. Storage and Security</h2>
      <p>
        Inquiries are stored in a secured database with access restricted to authorized systems.
        Transmission is encrypted in transit. We apply industry-standard safeguards, though no
        method of transmission over the internet is perfectly secure.
      </p>

      <h2>4. Cookies and Analytics</h2>
      <p>
        This website stores a single preference in your browser (light or dark theme) using local
        storage. This is not a tracking cookie and contains no personal information.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        Depending on your jurisdiction (including GDPR for EU/UK residents), you may request access
        to, correction of, or deletion of the personal information we hold about you. Contact us to
        exercise these rights.
      </p>

      <h2>6. International Visitors</h2>
      <p>
        We work with clients worldwide, including the USA, UK, Canada, Australia, Europe and India.
        Information may be processed in countries other than your own; we handle it consistently
        under this policy regardless of location.
      </p>

      <h2>7. Changes to This Policy</h2>
      <p>
        We may update this policy occasionally. Material changes will be reflected by the
        &quot;last updated&quot; date above.
      </p>

      <h2>8. Contact</h2>
      <p>
        For privacy questions or requests, reach us through the contact section of this website or
        via the official business email listed there.
      </p>
    </LegalLayout>
  );
}
