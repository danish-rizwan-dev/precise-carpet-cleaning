"use client";

import { useRef, useState } from "react";
import Image from "@/components/ui/image";
import Link from "next/link";
import { Home, Building2, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WordReveal } from "@/components/ui/scrollReveal";
import ScrollReveal from "@/components/ui/scrollReveal";
import FeaturesStrip from "@/components/ui/featuresStrip";

type PricingCard = {
  id: number;
  title: string;
  price: string;
  range?: string;
  suffix?: string;
  showFrom?: boolean;
};

const RESIDENTIAL_PRICING: PricingCard[] = [
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

const COMMERCIAL_PRICING: PricingCard[] = [
  {
    id: 1,
    title: "Small Space",
    range: "50 sqm – 100 sqm",
    price: "$2.50",
    suffix: "/sqm",
    showFrom: true,
  },
  {
    id: 2,
    title: "Medium Space",
    range: "100 sqm – 400 sqm",
    price: "$1.50",
    suffix: "/sqm",
    showFrom: true,
  },
  {
    id: 3,
    title: "Large Space",
    range: "500 sqm+",
    price: "$0.75",
    suffix: "/sqm",
    showFrom: true,
  },
];

export default function PricingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">(
    "residential",
  );

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
        className="relative min-h-[380px] w-full overflow-hidden bg-[#0b4255] font-['Plus_Jakarta_Sans',sans-serif] sm:min-h-[420px] lg:min-h-[480px]"
      >
        <div className="absolute inset-x-0 top-0 z-50">
        </div>
        {/* Edge-to-edge Hero Background */}
        <motion.div
          aria-hidden="true"
          style={{ y: backgroundY, scale: backgroundScale }}
          className="absolute inset-0 z-0 origin-center will-change-transform"
        >
          <Image
            src="/pricing/heroimg.webp"
            alt="Hero Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Brand-teal blue-green overlay fade from left */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0b4255]/95 via-[#0b4255]/65 to-transparent" />
        </motion.div>

        {/* Hero Content */}
        <section className="relative z-10 flex min-h-[380px] w-full flex-col justify-center text-white sm:min-h-[420px] lg:min-h-[480px]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-14 pb-12 pt-8 sm:pt-10"
          >
            <div className="flex flex-col gap-5 sm:gap-6 max-w-[650px]">
              <motion.div variants={itemVariants}>
                <WordReveal
                  as="h1"
                  className="text-[40px] sm:text-[48px] md:text-[58px] lg:text-[72px] font-bold leading-[1.08] tracking-[-1px] sm:tracking-[-2px] lg:tracking-[-3px] text-white"
                >
                  Our Pricing
                </WordReveal>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-[18px] font-medium leading-[1.5] text-[#e5eaec] max-w-[496px]"
              >
                High-quality carpet cleaning at fair and transparent prices.
                Choose the option that suits your home or business.
              </motion.p>

              {/* Residential / Commercial Toggle Bar */}
              <motion.div variants={itemVariants} className="mt-2">
                <div className="relative grid grid-cols-2 gap-1 w-full max-w-[400px] bg-[#0b4255] p-[10px] rounded-[20px] border border-white/10">
                  {/* Sliding Pill */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute top-[10px] bottom-[10px] left-[10px] w-[calc(50%-12px)] rounded-[16px] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.22)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      transform:
                        activeTab === "commercial"
                          ? "translateX(calc(100% + 4px))"
                          : "translateX(0)",
                    }}
                  />

                  {/* Residential Option */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("residential")}
                    className={`relative z-10 h-[56px] flex items-center justify-center gap-2.5 rounded-[16px] font-semibold text-[17px] cursor-pointer transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      activeTab === "residential"
                        ? "text-[#0b4255]"
                        : "text-white hover:text-white/80"
                    }`}
                  >
                    <Home className="w-[22px] h-[22px] text-[#ffb400]" />
                    <span>Residential</span>
                  </button>

                  {/* Commercial Option */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("commercial")}
                    className={`relative z-10 h-[56px] flex items-center justify-center gap-2.5 rounded-[16px] font-semibold text-[17px] cursor-pointer transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      activeTab === "commercial"
                        ? "text-[#0b4255]"
                        : "text-white hover:text-white/80"
                    }`}
                  >
                    <Building2 className="w-[22px] h-[22px] text-[#ffb400]" />
                    <span>Commercial</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Pricing Section */}
      <section className="w-full bg-white py-16 sm:py-20 md:py-24 px-5 sm:px-8 md:px-14">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-center">
          {/* 3 Pricing Cards Grid */}
          <div
            key={activeTab}
            className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full mb-16 sm:mb-20"
          >
            {(activeTab === "residential"
              ? RESIDENTIAL_PRICING
              : COMMERCIAL_PRICING
            ).map((card, idx) => (
              <ScrollReveal
                key={card.id}
                delay={idx * 0.1}
                className="w-full max-w-[360px]"
              >
                <div
                  className="flex flex-col items-center justify-between border-[3px] border-[#0b4255] bg-white p-6 sm:p-7 rounded-[36px] transition-all duration-300 hover:shadow-xl hover:border-[#0b4255]"
                  style={{
                    width: "100%",
                    maxWidth: "360px",
                    minHeight: "280px",
                  }}
                >
                  {/* Title */}
                  <div className="flex flex-col items-center mt-2">
                    <h3
                      className="text-center font-bold text-[#0b4255] tracking-[-0.5px]"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "22px",
                        lineHeight: "34px",
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={`text-center text-[14px] font-medium text-[#5b5955] min-h-[21px] ${
                        card.range ? "" : "invisible"
                      }`}
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {card.range}
                    </p>
                  </div>

                  {/* Price Section - price always centered, From left, suffix right */}
                  <div className="mt-4 mb-1 flex items-center justify-center">
                    <div className="relative">
                      {card.showFrom !== false && (
                        <span
                          className="absolute right-full top-1/2 -translate-y-[calc(50%+10px)] mr-2.5 text-[#0b4255] text-[18px] font-bold whitespace-nowrap"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          From
                        </span>
                      )}
                      <div
                        className="font-bold text-[#0b4255] tracking-[-1.58px]"
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: "58px",
                          lineHeight: "1",
                        }}
                      >
                        {card.price}
                      </div>
                      {card.suffix && (
                        <span
                          className="absolute left-full bottom-1 ml-2 text-[#0b4255] text-[18px] font-semibold whitespace-nowrap"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {card.suffix}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Button (170px x 53px) */}
                  <Link
                    href="/contact"
                    className="group relative flex h-[53px] w-[170px] items-center rounded-[12px] bg-[#0b4255] text-white transition-all duration-300 overflow-hidden shadow-sm"
                  >
                    {/* Hover Expansion Background */}
                    <div className="absolute inset-y-[4px] left-[4px] z-0 w-[45px] rounded-[8px] bg-white transition-all duration-500 ease-in-out group-hover:w-[calc(100%-8px)]" />

                    {/* Fixed White Star Icon Container */}
                    <div className="relative z-10 my-[4px] ml-[4px] flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-[8px] bg-white">
                      <Star className="h-5 w-5 fill-[#ffb400] text-[#ffb400]" />
                    </div>

                    {/* Button Text */}
                    <span className="relative z-10 pr-3 pl-2 text-[15px] font-semibold text-white transition-colors duration-300 group-hover:text-[#0b4255] whitespace-nowrap">
                      Enquire Now
                    </span>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Features Strip */}
          <FeaturesStrip className="w-full" />

          {/* CTA Banner */}
          <Link
            href="/contact"
            className="mt-12 sm:mt-16 relative w-full aspect-[1024/1536] lg:aspect-auto lg:h-[260px] rounded-[32px] overflow-hidden flex items-center group cursor-pointer"
          >
            <Image
              src="/pricing/barMobileView.webp"
              alt="Ready for Cleaner Carpets"
              fill
              sizes="(max-width: 1024px) 100vw, 0px"
              className="object-cover object-center lg:hidden"
              priority
            />
            <Image
              src="/pricing/bar.webp"
              alt="Ready for Cleaner Carpets"
              fill
              sizes="(max-width: 2048px) 1200px, 1200px"
              className="object-cover object-center hidden lg:block"
              priority
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
