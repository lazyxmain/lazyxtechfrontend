import LegalLayout from '../components/LegalLayout';
import { useSEO } from '../lib/seo';

export default function Terms() {
  useSEO({
    title: 'Terms & Conditions — LazyXTech',
    description:
      'Terms governing use of the LazyXTech website and the scope of our digital product and software development services.',
    path: '/terms',
  });

  return (
    <LegalLayout eyebrow="Legal" title="Terms & Conditions" updated="November 19, 2026">
      <p>
        These terms govern your use of the LazyXTech website. By using this site, you agree to
        them.
      </p>

      <h2>1. Services</h2>
      <p>
        LazyXTech provides digital product and software development services, including website
        development, web applications, e-commerce development and backend/API development. The
        specific scope, timeline and fees for any engagement are defined in a separate written
        agreement between you and us — not on this website.
      </p>

      <h2>2. Project Inquiries</h2>
      <p>
        Submitting an inquiry through this website does not create a client relationship or
        contract. It is a request for conversation. We respond to genuine inquiries at our
        discretion.
      </p>

      <h2>3. Website Content</h2>
      <p>
        Project previews shown on this website are concept explorations, not client case studies,
        and are labeled as such. We make no claim of client endorsements, results or figures
        unless explicitly verified and stated.
      </p>

      <h2>4. Intellectual Property</h2>
      <p>
        All website content, design and branding on this site belong to LazyXTech. Project
        methodologies described here are ours; ownership of anything we build for you is defined in
        your project agreement.
      </p>

      <h2>5. Acceptable Use</h2>
      <p>
        You agree not to misuse this website — including attempting unauthorized access,
        submitting false information, or using it to distribute harmful or unlawful content.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        This website is provided &quot;as is&quot;. To the maximum extent permitted by law,
        LazyXTech is not liable for indirect or consequential damages arising from your use of
        this website.
      </p>

      <h2>7. Governing Law</h2>
      <p>
        These terms are governed by applicable Indian law, without prejudice to mandatory consumer
        protections in your country of residence.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions about these terms? Reach us through the contact section of this website.
      </p>
    </LegalLayout>
  );
}
