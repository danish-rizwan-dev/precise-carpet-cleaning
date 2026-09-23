"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, Trash2, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
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
        className="relative min-h-[550px] w-full overflow-hidden bg-[#0b4255] font-['Plus_Jakarta_Sans',sans-serif] sm:min-h-[600px] lg:min-h-[700px]"
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
            src="/pricing/heroimg.png"
            alt="Hero Background"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Brand-teal blue-green overlay fade from left */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0b4255]/95 via-[#0b4255]/65 to-transparent" />
        </motion.div>

        {/* Hero Content */}
        <section className="relative z-10 flex min-h-[550px] w-full flex-col justify-center text-white sm:min-h-[600px] lg:min-h-[700px]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-14 pb-20 pt-[160px] sm:pt-[200px] md:pt-[240px]"
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
                <div
                  className="inline-flex items-center gap-2 sm:gap-4 bg-[#0b4255] p-[8px] rounded-[18px] border border-white/10"
                  style={{ borderRadius: "17.65px" }}
                >
                  {/* Residential Option */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("residential")}
                    className={`flex items-center gap-2.5 px-6 py-3 rounded-[14px] font-semibold text-[16px] transition-all duration-300 ${
                      activeTab === "residential"
                        ? "bg-white text-[#0b4255] shadow-md"
                        : "bg-transparent text-white hover:text-white/80"
                    }`}
                    style={{ borderRadius: "14.71px" }}
                  >
                    <Home className="w-5 h-5 text-[#ffb400]" />
                    <span>Residential</span>
                  </button>

                  {/* Commercial Option */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("commercial")}
                    className={`flex items-center gap-2.5 px-6 py-3 rounded-[14px] font-semibold text-[16px] transition-all duration-300 ${
                      activeTab === "commercial"
                        ? "bg-white text-[#0b4255] shadow-md"
                        : "bg-transparent text-white hover:text-white/80"
                    }`}
                    style={{ borderRadius: "14.71px" }}
                  >
                    <Trash2 className="w-5 h-5 text-[#ffb400]" />
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
          <div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full mb-16 sm:mb-20">
            {PRICING_CARDS.map((card, idx) => (
              <ScrollReveal
                key={card.id}
                delay={idx * 0.1}
                className="w-full max-w-[360px]"
              >
                <div
                  className="flex flex-col items-center justify-between border border-[#0b4255]/30 bg-white p-8 rounded-[44px] transition-all duration-300 hover:shadow-xl hover:border-[#0b4255]"
                  style={{
                    width: "100%",
                    maxWidth: "360px",
                    minHeight: "331px",
                  }}
                >
                  {/* Title */}
                  <h3
                    className="text-center font-bold text-[#0b4255] tracking-[-0.5px] mt-2"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "24px",
                      lineHeight: "37.44px",
                    }}
                  >
                    {card.title}
                  </h3>

                  {/* Price Section */}
                  <div className="my-2 flex items-baseline justify-center gap-2 text-center">
                    <span
                      className="text-[#0b4255] text-[18px] font-semibold"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      From
                    </span>
                    <div
                      className="font-bold text-[#0b4255] tracking-[-1.58px]"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "76px",
                        lineHeight: "1",
                      }}
                    >
                      {card.price}
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
          <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-3 sm:gap-8 w-full">
            <div className="flex items-center justify-center gap-3">
              <div className="relative h-[48px] w-[48px] shrink-0">
                <Image
                  src="/hero/sameDaysvg.svg"
                  alt="Same day cleaning"
                  fill
                  className="object-contain"
                />
              </div>
              <span
                className="text-[16px] font-medium leading-[24px] text-[#5b5955]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Same day cleaning
              </span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="relative h-[48px] w-[48px] shrink-0">
                <Image
                  src="/hero/safeCleaning.svg"
                  alt="Safe Chemicals"
                  fill
                  className="object-contain"
                />
              </div>
              <span
                className="text-[16px] font-medium leading-[24px] text-[#5b5955]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Safe Chemicals
                <br />
                for Kids &amp; Pets
              </span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="relative h-[48px] w-[48px] shrink-0">
                <Image
                  src="/hero/24hours.svg"
                  alt="24/7 availability"
                  fill
                  className="object-contain"
                />
              </div>
              <span
                className="text-[16px] font-medium leading-[24px] text-[#5b5955]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                24/7 availability
              </span>
            </div>
          </div>

          {/* CTA Banner */}
          <Link
            href="/contact"
            className="mt-12 sm:mt-16 relative w-full h-[200px] sm:h-[260px] rounded-[32px] overflow-hidden flex items-center group cursor-pointer"
          >
            <Image
              src="/pricing/bar.png"
              alt="Ready for Cleaner Carpets"
              fill
              className="object-cover object-center"
              priority
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
