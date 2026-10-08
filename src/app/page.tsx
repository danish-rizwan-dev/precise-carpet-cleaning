import type { Metadata } from "next";
import Hero from "@/components/homepage/heroSection";
import GetInTouchSection from "@/components/forms/getInTouchSection";
import CleaningOffers from "@/components/homepage/cleaningOffers";
import OurServices from "@/components/homepage/ourServices";
import HowItWorks from "@/components/homepage/howItWorks";
import Testimonials from "@/components/homepage/testimonials";
import FAQ from "@/components/homepage/faq";
import site from "@/content/site.json";
import FAQS from "@/content/faqs.json";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const base = site.url.replace(/\/$/, "");

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.name,
  image: `${base}/hero/herobackgroundimage.jpg`,
  url: `${base}/`,
  telephone: site.phoneHref,
  email: site.email,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.locality,
    addressRegion: site.region,
    addressCountry: site.country,
  },
  areaServed: {
    "@type": "City",
    name: site.locality,
  },
  sameAs: [site.facebook, site.instagram].filter(Boolean),
  ...(site.reviewCount > 0
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: site.ratingValue,
          reviewCount: site.reviewCount,
        },
      }
    : {}),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <GetInTouchSection />
      <CleaningOffers />
      <OurServices />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </main>
  );
}
