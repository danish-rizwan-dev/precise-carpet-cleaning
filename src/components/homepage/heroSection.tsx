"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  // Stagger animations
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
    <div ref={heroRef} className="w-full font-['Plus_Jakarta_Sans',sans-serif] bg-white">
      {/* Upper Hero Section */}
      <section className="relative w-full min-h-[720px] lg:min-h-[820px] bg-black text-white -mt-[105px] overflow-hidden flex flex-col justify-between">
        {/* Parallax Background Image */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0 -mt-[80px] h-[115%]"
        >
          <Image
            src="/hero/herobackgroundimage.png"
            alt="Carpet Cleaning background"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Dark gradient overlay from left across the image */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
        </motion.div>

        {/* Main Hero Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-[1920px] mx-auto pt-[120px] md:pt-[140px] px-6 sm:px-12 md:px-20 lg:px-[124px] pb-16 w-full"
        >
          <div className="max-w-[1272px] w-full flex flex-col gap-6">
            {/* Reviews Top Bar */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <div className="flex -space-x-3 overflow-hidden h-[48px] items-center">
                <div className="relative w-11 h-11 rounded-full border-2 border-white overflow-hidden shrink-0">
                  <Image
                    src="/hero/review1.png"
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-11 h-11 rounded-full border-2 border-white overflow-hidden shrink-0">
                  <Image
                    src="/hero/review2.png"
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-11 h-11 rounded-full border-2 border-white overflow-hidden shrink-0">
                  <Image
                    src="/hero/review3.png"
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Ratings & Google Text */}
              <div className="flex flex-col text-[14px] leading-[1.4]">
                <div className="flex items-center gap-1.5 font-semibold text-white">
                  <span>Ratings</span>
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>4.9</span>
                </div>
                <span className="text-gray-300 font-medium text-[13px] sm:text-[14px]">
                  Trusted reviews from Google!
                </span>
              </div>
            </motion.div>

            {/* Main Text Content */}
            <div className="w-full max-w-[620px] flex flex-col gap-4">
              {/* Title */}
              <motion.h1
                variants={itemVariants}
                className="text-[44px] sm:text-[58px] lg:text-[72px] font-bold leading-[1.1] tracking-[-2px] sm:tracking-[-4px] text-white"
              >
                Sydney’s Carpet Cleaning Experts
              </motion.h1>

              {/* Subtitle */}
              <motion.h2
                variants={itemVariants}
                className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold leading-[1.25] tracking-[-1px] text-[#e5eaec]"
              >
                Residential & Commercial <br className="hidden sm:inline" /> Carpet Cleaning
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-[16px] sm:text-[18px] font-normal leading-[1.5] text-[#e5eaec]"
              >
                Revitalising carpets & upholstery to their former glory.
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-4 mt-2"
              >
                <a
                  href="tel:0434161161"
                  className="group relative flex items-center bg-[#0b4255] text-white rounded-[12px] h-[61px] overflow-hidden min-w-[230px] transition-all duration-300 shadow-lg"
                >
                  <div className="bg-white rounded-[8px] h-[53px] flex items-center justify-center absolute left-[4px] z-0 transition-all duration-700 ease-in-out w-[52px] group-hover:w-[calc(100%-8px)]" />
                  <Phone className="w-[20px] h-[20px] text-[#ffb400] fill-[#ffb400] absolute left-[18px] z-10" />
                  <span className="relative z-10 ml-[64px] font-semibold text-[16px] whitespace-nowrap transition-colors duration-300 group-hover:text-[#0b4255]">
                    Call us: 0434 161 161
                  </span>
                </a>

                <Link
                  href="/contact"
                  className="group relative flex items-center bg-[#0b4255] text-white rounded-[12px] h-[61px] overflow-hidden min-w-[206px] transition-all duration-300 shadow-lg"
                >
                  <div className="bg-white rounded-[8px] h-[53px] flex items-center justify-center absolute left-[4px] z-0 transition-all duration-700 ease-in-out w-[52px] group-hover:w-[calc(100%-8px)]" />
                  <Star className="w-[20px] h-[20px] text-[#ffb400] fill-[#ffb400] absolute left-[18px] z-10" />
                  <span className="relative z-10 ml-[64px] font-semibold text-[16px] whitespace-nowrap transition-colors duration-300 group-hover:text-[#0b4255]">
                    Get a free quote
                  </span>
                </Link>
              </motion.div>

              {/* 2 Bedroom Special Banner */}
              <motion.div
                variants={itemVariants}
                className="relative w-[380px] sm:w-[450px] lg:w-[471px] h-[140px] sm:h-[170px] lg:h-[180px] mt-2"
              >
                <Image
                  src="/hero/2bedroomSpecial.avif"
                  alt="2 Bedroom Special from $79"
                  fill
                  className="object-contain object-left"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bottom Scalloped Cloud Wave Transition */}
      <div className="relative w-full z-20 -mt-[38px] sm:-mt-[44px] md:-mt-[52px] pointer-events-none overflow-hidden">
        <svg
          className="w-full h-[40px] sm:h-[46px] md:h-[54px] block"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-scallop-wave"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 0 24 C 0 8, 10 0, 24 0 C 38 0, 48 8, 48 24 L 48 48 L 0 48 Z"
                fill="#ffffff"
              />
            </pattern>
          </defs>
          <rect width="100%" height="48" fill="url(#hero-scallop-wave)" />
        </svg>
      </div>

      {/* Bottom Features Strip Section */}
      <section className="w-full bg-white pt-2 pb-10 sm:pb-14 relative z-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-[1200px] mx-auto px-6 flex items-center justify-between gap-6 md:gap-12"
        >
          {/* Item 1: Same day cleaning icon */}
          <div className="flex items-center justify-center flex-1">
            <div className="relative w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] md:w-[64px] md:h-[64px] shrink-0">
              <Image
                src="/hero/sameDaysvg.svg"
                alt="Same day cleaning"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Item 2: Safe Chemicals for Kids & Pets */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-1">
            <div className="relative w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] md:w-[64px] md:h-[64px] shrink-0">
              <Image
                src="/hero/safeCleaning.svg"
                alt="Safe Chemicals for Kids & Pets"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col text-[rgba(91,89,85,1)] font-semibold text-[15px] sm:text-[17px] md:text-[20px] leading-[1.25] text-left">
              <span>Safe Chemicals</span>
              <span>for Kids & Pets</span>
            </div>
          </div>

          {/* Item 3: 24/7 availability calendar icon */}
          <div className="flex items-center justify-center flex-1">
            <div className="relative w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] md:w-[64px] md:h-[64px] shrink-0">
              <Image
                src="/hero/24hours.svg"
                alt="24/7 availability"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
