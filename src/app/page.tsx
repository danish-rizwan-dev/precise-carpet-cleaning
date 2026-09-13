import Hero from "@/components/homepage/heroSection";
import CleaningOffers from "@/components/homepage/cleaningOffers";
import OurServices from "@/components/homepage/ourServices";
import HowItWorks from "@/components/homepage/howItWorks";
import Testimonials from "@/components/homepage/testimonials";
import FAQ from "@/components/homepage/faq";

export default function HomePage() {
  return (
    <main >
      <Hero />
      <CleaningOffers />
      <OurServices />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </main>
  );
}
