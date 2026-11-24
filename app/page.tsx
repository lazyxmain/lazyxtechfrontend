import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { WhyUs } from '@/components/sections/why-us';
import { Process } from '@/components/sections/process';
import { Support } from '@/components/sections/support';
import { TechStack } from '@/components/sections/tech-stack';
import { About } from '@/components/sections/about';
import { FAQ } from '@/components/sections/faq';
import { CTASection } from '@/components/sections/cta';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';
import { FAQS } from '@/lib/site';

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Navbar />
      <main className="relative">
        <Hero />
        <Services />
        <WhyUs />
        <Process />
        <Support />
        <TechStack />
        <About />
        <FAQ />
        <CTASection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
