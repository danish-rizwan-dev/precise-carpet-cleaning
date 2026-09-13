"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax & Zoom scroll effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

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
      <section className="relative w-full min-h-[700px] sm:min-h-[760px] lg:min-h-[1000px] overflow-hidden bg-black text-white -mt-[130px] lg:-mt-[205px] flex flex-col justify-between">
        {/* Parallax & Zooming Background Image */}
        <motion.div
          style={{ y: backgroundY, scale: backgroundScale }}
          className="absolute inset-0 z-0 h-[115%] origin-center"
        >
          <Image
            src="/hero/herobackgroundimage.png"
            alt="Carpet Cleaning background"
            fill
            priority
            className="object-cover object-[55%_center] sm:object-center"
          />
          {/* Dark gradient overlay from left across the image */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/95 via-black/75 to-black/30 sm:from-black/85 sm:via-black/50 sm:to-transparent" />
        </motion.div>

        {/* Main Hero Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-[1920px] mx-auto pt-[130px] sm:pt-[190px] md:pt-[220px] px-5 sm:px-12 md:px-20 lg:px-[124px] pb-28 sm:pb-32 w-full"
        >
          <div className="max-w-[1272px] w-full flex flex-col gap-5 sm:gap-6">
            
            {/* Reviews Top Bar - Text Below Avatars */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-5"
            >
              <div className="flex -space-x-2.5 overflow-hidden h-[46px] items-center">
                <div className="relative w-[46px] h-[46px] rounded-full border-2 border-white overflow-hidden shrink-0">
                  <Image
                    src="/hero/review1.png"
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-[46px] h-[46px] rounded-full border-2 border-white overflow-hidden shrink-0">
                  <Image
                    src="/hero/review2.png"
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-[46px] h-[46px] rounded-full border-2 border-white overflow-hidden shrink-0">
                  <Image
                    src="/hero/review3.png"
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col text-left mt-1">
                <div className="flex items-center gap-1.5 font-bold text-white text-[18px]">
                  <span>Ratings</span>
                  <Star className="w-[18px] h-[18px] text-[#ffb400] fill-[#ffb400]" />
                  <span>4.9</span>
                </div>
                <span className="text-gray-200 font-medium text-[15px] mt-0.5">
                  Trusted reviews from Google!
                </span>
              </div>
            </motion.div>

            {/* Main Text Content */}
            <div className="w-full max-w-[380px] sm:max-w-[620px] flex flex-col gap-3 sm:gap-4">
              {/* Title */}
              <motion.h1
                variants={itemVariants}
                className="text-[40px] sm:text-[58px] lg:text-[72px] font-bold leading-[1.08] tracking-[-1px] sm:tracking-[-3px] text-white"
              >
                Sydney’s Carpet Cleaning Experts
              </motion.h1>

              {/* Subtitle */}
              <motion.h2
                variants={itemVariants}
                className="text-[24px] sm:text-[34px] lg:text-[40px] font-semibold leading-[1.25] tracking-tight text-[#e5eaec] mt-1"
              >
                Residential & Commercial <br /> Carpet Cleaning
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-[16px] sm:text-[18px] font-normal leading-[1.4] text-[#e5eaec] mt-1"
              >
                Revitalising carpets & upholstery to their former glory.
              </motion.p>

              {/* Buttons Stacking - Custom width per button to match image */}
              <motion.div
                variants={itemVariants}
              className="flex flex-col items-start gap-3 mt-4 w-full sm:flex-row"
              >
                {/* Call Us Button */}
                <a
                  href="tel:0434161161"
                  className="inline-flex items-center bg-[#0b4354] hover:bg-[#072f3b] text-white rounded-[20px] p-[7px] pr-6 transition-colors duration-200 shadow-md w-fit"
                >
                  <div className="bg-white rounded-[14px] w-[58px] h-[58px] flex items-center justify-center shrink-0">
                    <Phone className="w-[26px] h-[26px] text-[#ffb400] fill-[#ffb400]" />
                  </div>
                  <span className="font-bold text-[19px] ml-4 whitespace-nowrap">
                    Call us: 0434 161 161
                  </span>
                </a>

                {/* Free Quote Button */}
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-[#0b4354] hover:bg-[#072f3b] text-white rounded-[20px] p-[7px] pr-6 transition-colors duration-200 shadow-md w-fit"
                >
                  <div className="bg-white rounded-[14px] w-[58px] h-[58px] flex items-center justify-center shrink-0">
                    <Star className="w-[26px] h-[26px] text-[#ffb400] fill-[#ffb400]" />
                  </div>
                  <span className="font-bold text-[19px] ml-4 whitespace-nowrap">
                    Get a free quote
                  </span>
                </Link>
              </motion.div>

              {/* Special Offer Banner (350px x 133px on Mobile) */}
              <motion.div
                variants={itemVariants}
                className="relative w-[350px] max-w-full h-[133px] lg:w-[471px] lg:h-[180px] mt-2"
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

        <div className="absolute inset-x-0 bottom-[-1px] z-20 h-[97px] pointer-events-none" aria-hidden="true">
          <svg className="block h-full w-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-scallop-fill" width="96" height="97" patternUnits="userSpaceOnUse">
                <path d="M0 0C0 26 20 48 48 48S96 26 96 0V97H0Z" fill="#fff" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-scallop-fill)" />
          </svg>
        </div>
      </section>

      <section className="relative z-30 bg-white px-5 pb-10 pt-5 sm:px-12 sm:pb-14 sm:pt-7">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-5 sm:grid-cols-3 sm:gap-8">
          <div className="mx-auto flex w-full max-w-[230px] items-center gap-3 sm:max-w-none sm:justify-center">
            <div className="relative h-[57px] w-[57px] shrink-0">
              <Image src="/hero/sameDaysvg.svg" alt="" fill className="object-contain" />
            </div>
            <span className="font-semibold text-[16px] leading-tight text-[#5b5955] sm:text-[20px] sm:leading-[31.2px]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>Same day cleaning</span>
          </div>

          <div className="mx-auto flex w-full max-w-[230px] items-center gap-3 sm:max-w-none sm:justify-center">
            <div className="relative h-[57px] w-[57px] shrink-0">
              <Image src="/hero/safeCleaning.svg" alt="" fill className="object-contain" />
            </div>
            <span className="font-semibold text-[16px] leading-tight text-[#5b5955] sm:text-[20px] sm:leading-[31.2px]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              Safe Chemicals<br />for Kids &amp; Pets
            </span>
          </div>

          <div className="mx-auto flex w-full max-w-[230px] items-center gap-3 sm:max-w-none sm:justify-center">
            <div className="relative h-[57px] w-[57px] shrink-0">
              <Image src="/hero/24hours.svg" alt="" fill className="object-contain" />
            </div>
            <span className="font-semibold text-[16px] leading-tight text-[#5b5955] sm:text-[20px] sm:leading-[31.2px]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>24/7 availability</span>
          </div>
        </div>
      </section>
    </div>
  );
}
