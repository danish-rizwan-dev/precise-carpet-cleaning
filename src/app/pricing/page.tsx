"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Home, Building2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import HomePageHeader from "@/components/layout/homepageHeader";
import { WordReveal } from "@/components/ui/scrollReveal";
import ScrollReveal from "@/components/ui/scrollReveal";

const PRICING_CARDS = [
  {
    id: 1,
    title: "2 Bedroom",
    price: "$79",
  },
  {
    id: 2,
    title: "3 Bedroom",
    price: "$119",
  },
  {
    id: 3,
    title: "4 Bedroom",
    price: "$179",
  },
];

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] as const },
    },
  };

  return (
    <main className="w-full overflow-x-hidden bg-white">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative min-h-[500px] w-full overflow-hidden bg-black font-['Plus_Jakarta_Sans',sans-serif] sm:min-h-[600px] lg:min-h-[700px]"
      >
        <div className="absolute inset-x-0 top-0 z-50">
          <HomePageHeader />
        </div>

        {/* Edge-to-edge Hero Background */}
        <motion.div
          aria-hidden="true"
          style={{ y: backgroundY, scale: backgroundScale }}
          className="absolute inset-0 z-0 origin-center will-change-transform"
        >
          <Image
            src="/pricing/heroimg.png"
            alt="Hero Background"
            fill
            priority
            className="object-cover object-[55%_60%] sm:object-center"
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(11,66,85,0.95) 0%, rgba(11,66,85,0.5) 30%, transparent 50%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-[100px] sm:h-[150px] pointer-events-none bg-gradient-to-t from-white to-transparent" />
        </motion.div>

        {/* Hero Content */}
        <section className="relative z-10 flex min-h-[500px] w-full flex-col justify-center text-white sm:min-h-[600px] lg:min-h-[700px]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-14 pb-16 sm:pb-20 pt-[120px] sm:pt-[160px] md:pt-[200px]"
          >
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 max-w-[650px]">
              <motion.div variants={itemVariants}>
                <WordReveal
                  as="h1"
                  className="text-[36px] sm:text-[48px] md:text-[58px] lg:text-[72px] font-bold leading-[1.08] tracking-[-1px] sm:tracking-[-2px] lg:tracking-[-3px] text-white"
                >
                  Our Pricing
                </WordReveal>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-[16px] sm:text-[18px] md:text-[20px] font-medium leading-[1.4] text-[#e5eaec]"
              >
                High-quality carpet cleaning at fair and transparent prices. Choose the option that suits your home or business.
              </motion.p>

              {/* Residential / Commercial Toggle Bar */}
              <motion.div variants={itemVariants} className="mt-2 sm:mt-4">
                <div
                  className="inline-flex items-center gap-1.5 sm:gap-3 lg:gap-5 bg-[#0b4255] p-[5px] sm:p-[8px] lg:p-[10px] rounded-[14px] sm:rounded-[18px] lg:rounded-[20px] border border-white/10"
                >
                  <button
                    type="button"
                    onClick={() => setActiveTab("residential")}
                    className={`flex items-center gap-2 sm:gap-3 lg:gap-3 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 lg:py-4 rounded-[10px] sm:rounded-[14px] lg:rounded-[16px] font-semibold text-[14px] sm:text-[16px] lg:text-[20px] transition-all duration-300 ${
                      activeTab === "residential"
                        ? "bg-white text-[#0b4255] shadow-md"
                        : "bg-transparent text-white hover:text-white/80"
                    }`}
                  >
                    <Home className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#ffb400]" />
                    <span>Residential</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("commercial")}
                    className={`flex items-center gap-2 sm:gap-3 lg:gap-3 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 lg:py-4 rounded-[10px] sm:rounded-[14px] lg:rounded-[16px] font-semibold text-[14px] sm:text-[16px] lg:text-[20px] transition-all duration-300 ${
                      activeTab === "commercial"
                        ? "bg-white text-[#0b4255] shadow-md"
                        : "bg-transparent text-white hover:text-white/80"
                    }`}
                  >
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#ffb400]" />
                    <span>Commercial</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Pricing Section */}
      <section className="w-full bg-white py-10 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-center">

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 sm:gap-8 w-full mb-12 sm:mb-16 md:mb-20">
            {PRICING_CARDS.map((card, idx) => (
              <ScrollReveal key={card.id} delay={idx * 0.1} className="w-full max-w-[360px]">
                <div
                  className="flex flex-col items-center justify-between border-[2px] sm:border-[3px] border-[#0b4255]/50 bg-white p-6 sm:p-8 rounded-[32px] sm:rounded-[44px] transition-all duration-300 hover:shadow-xl hover:border-[#0b4255]"
                  style={{ width: "100%", maxWidth: "360px", minHeight: "280px" }}
                >
                  {/* Title */}
                  <h3
                    className="text-center font-bold text-[#0b4255] tracking-[-0.5px] text-[20px] sm:text-[22px] md:text-[24px]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {card.title}
                  </h3>

                  {/* Price */}
                  <div className="my-2 sm:my-4 flex items-start justify-center gap-1">
                    <span
                      className="text-[#0b4255] text-[18px] sm:text-[20px] md:text-[22px] font-extrabold mt-1 sm:mt-2"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      From
                    </span>
                    <div
                      className="font-bold text-[#0b4255] tracking-[-1.58px]"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "clamp(56px, 10vw, 76px)",
                        lineHeight: "1",
                      }}
                    >
                      {card.price}
                    </div>
                  </div>

                  {/* Button */}
                  <Link
                    href="/contact"
                    className="group relative flex h-[50px] sm:h-[56px] md:h-[61px] w-[160px] sm:w-[180px] md:w-[200px] items-center overflow-hidden rounded-[10px] sm:rounded-[12px] bg-[#0b4255] text-white transition-all duration-300"
                  >
                    <div className="absolute left-[4px] inset-y-[4px] z-0 w-[42px] sm:w-[48px] md:w-[53px] rounded-[8px] bg-white transition-all duration-500 ease-in-out group-hover:w-[calc(100%-8px)]" />
                    <div className="relative z-10 my-[4px] ml-[4px] flex h-[42px] sm:h-[48px] md:h-[53px] w-[42px] sm:w-[48px] md:w-[53px] shrink-0 items-center justify-center rounded-[8px] bg-white">
                      <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-[#ffb400] text-[#ffb400]" />
                    </div>
                    <span className="relative z-10 ml-2 sm:ml-3 pr-2 sm:pr-3 text-[13px] sm:text-[14px] md:text-[15px] font-semibold whitespace-nowrap transition-colors duration-300 group-hover:text-[#0b4255]">
                      Enquire Now
                    </span>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Features Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-5 sm:gap-6 md:gap-8 w-full">
            <div className="flex items-center justify-center sm:justify-center gap-4">
              <div className="relative h-[48px] w-[48px] sm:h-[48px] sm:w-[48px] md:h-[64px] md:w-[64px] shrink-0">
                <Image
                  src="/hero/sameDaysvg.svg"
                  alt="Same day cleaning"
                  fill
                  className="object-contain"
                />
              </div>
              <span
                className="text-[16px] sm:text-[16px] md:text-[20px] font-semibold leading-[24px] sm:leading-[24px] md:leading-[30px] text-[#5b5955]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Same day cleaning
              </span>
            </div>

            <div className="flex items-center justify-center sm:justify-center gap-4">
              <div className="relative h-[48px] w-[48px] sm:h-[48px] sm:w-[48px] md:h-[64px] md:w-[64px] shrink-0">
                <Image
                  src="/hero/safeCleaning.svg"
                  alt="Safe Chemicals"
                  fill
                  className="object-contain"
                />
              </div>
              <span
                className="text-[16px] sm:text-[16px] md:text-[20px] font-semibold leading-[24px] sm:leading-[24px] md:leading-[30px] text-[#5b5955]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Safe Chemicals
                <br />
                for Kids &amp; Pets
              </span>
            </div>

            <div className="flex items-center justify-center sm:justify-center gap-4">
              <div className="relative h-[48px] w-[48px] sm:h-[48px] sm:w-[48px] md:h-[64px] md:w-[64px] shrink-0">
                <Image
                  src="/hero/24hours.svg"
                  alt="24/7 availability"
                  fill
                  className="object-contain"
                />
              </div>
              <span
                className="text-[16px] sm:text-[16px] md:text-[20px] font-semibold leading-[24px] sm:leading-[24px] md:leading-[30px] text-[#5b5955]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                24/7 availability
              </span>
            </div>
          </div>

          {/* CTA Banner */}
          <Link
            href="/contact"
            className="mt-10 sm:mt-12 md:mt-16 relative w-full aspect-[371/557] sm:aspect-auto sm:h-[200px] md:h-[260px] rounded-[20px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden flex items-center justify-center group cursor-pointer mx-auto"
          >
            {/* Mobile Image */}
            <Image
              src="/pricing/barMobileView.png"
              alt="Ready for Cleaner Carpets"
              fill
              className="object-contain object-center sm:hidden"
              priority
            />
            {/* Desktop Image */}
            <Image
              src="/pricing/bar.png"
              alt="Ready for Cleaner Carpets"
              fill
              className="object-contain object-center hidden sm:block"
              priority
            />
          </Link>

        </div>
      </section>
    </main>
  );
}
