import Hero from "@/components/homepage/heroSection";
import SimpleFormCard from "@/components/forms/simpleFormCard";
import FeaturesStrip from "@/components/ui/featuresStrip";
import CleaningOffers from "@/components/homepage/cleaningOffers";
import OurServices from "@/components/homepage/ourServices";
import HowItWorks from "@/components/homepage/howItWorks";
import Testimonials from "@/components/homepage/testimonials";
import FAQ from "@/components/homepage/faq";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SimpleFormCard />
      <section className="w-full bg-white px-5 pb-12 sm:px-8 sm:pb-16 md:px-14">
        <FeaturesStrip className="mx-auto w-full max-w-[1200px]" />
      </section>
      <CleaningOffers />
      <OurServices />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </main>
  );
}
