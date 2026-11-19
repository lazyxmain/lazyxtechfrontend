import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { WhyUs } from '@/components/sections/why-us';
import { Process } from '@/components/sections/process';
import { Work } from '@/components/sections/work';
import { TechStack } from '@/components/sections/tech-stack';
import { About } from '@/components/sections/about';
import { CTASection } from '@/components/sections/cta';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <Process />
      <Work />
      <TechStack />
      <About />
      <CTASection />
      <Contact />
      <Footer />
    </main>
  );
}
