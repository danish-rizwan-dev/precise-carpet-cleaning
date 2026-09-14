"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import HomePageHeader from "../layout/homepageHeader";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // The image extends beyond the hero on every edge, allowing parallax motion
  // without revealing the page background at any viewport size.
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-2%", "4%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.16, 1.03]);

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
    <div
      ref={heroRef}
      className="relative w-full overflow-hidden bg-black font-['Plus_Jakarta_Sans',sans-serif]"
    >
      <div className="absolute inset-x-0 top-0 z-50">
        <HomePageHeader />
      </div>
      <motion.div
        aria-hidden="true"
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute -inset-[10%] z-0 origin-center will-change-transform"
      >
        <Image
          src="/hero/herobackgroundimage.png"
          alt=""
          fill
          priority
          className="object-cover object-[55%_center] sm:object-center"
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/95 via-black/75 to-black/30 sm:from-black/85 sm:via-black/50 sm:to-transparent" />
      </motion.div>

      {/* Upper Hero Section */}
      <section className="relative z-10 flex min-h-[700px] w-full flex-col justify-between overflow-hidden text-white sm:min-h-[760px] lg:min-h-[1000px]">
        {/* Main Hero Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full mx-auto pt-[160px] sm:pt-[220px] md:pt-[250px] px-5 sm:px-8 md:px-14 lg:px-[124px] pb-28 sm:pb-32 max-w-[1920px]"
        >
          <div className="w-full max-w-[1272px] flex flex-col gap-5 sm:gap-6">
            {/* Reviews Top Bar */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-5"
            >
              <div className="flex -space-x-2.5 overflow-hidden h-[46px] items-center">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="relative w-[46px] h-[46px] rounded-full border-2 border-white overflow-hidden shrink-0"
                  >
                    <Image
                      src={`/hero/review${i}.png`}
                      alt="User"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
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
                className="text-[40px] sm:text-[48px] md:text-[58px] lg:text-[72px] font-bold leading-[1.08] tracking-[-1px] sm:tracking-[-2px] lg:tracking-[-3px] text-white"
              >
                Sydney&apos;s Carpet Cleaning Experts
              </motion.h1>

              {/* Subtitle */}
              <motion.h2
                variants={itemVariants}
                className="text-[24px] sm:text-[28px] md:text-[34px] lg:text-[40px] font-semibold leading-[1.25] tracking-tight text-[#e5eaec] mt-1"
              >
                Residential & Commercial <br className="hidden sm:inline" />{" "}
                Carpet Cleaning
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-[16px] sm:text-[17px] md:text-[18px] font-normal leading-[1.4] text-[#e5eaec] mt-1"
              >
                Revitalising carpets & upholstery to their former glory.
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-start gap-3 mt-4 w-full sm:flex-row sm:items-center sm:gap-4"
              >
                {/* Call Us Button */}
                <a
                  href="tel:0434161161"
                  className="group relative flex items-center bg-[#0b4255] text-white rounded-[12px] h-[61px] min-w-[230px] transition-all duration-300 overflow-hidden"
                >
                  <div className="bg-white rounded-[8px] absolute left-[4px] inset-y-[4px] z-0 transition-all duration-700 ease-in-out w-[53px] group-hover:w-[calc(100%-8px)]" />
                  <Phone className="w-[20px] h-[20px] text-[#ffb400] fill-[#ffb400] absolute left-[21px] z-10 top-1/2 -translate-y-1/2" />
                  <span className="relative z-10 ml-[64px] pr-6 font-semibold text-[16px] whitespace-nowrap transition-colors duration-300 group-hover:text-[#0b4255]">
                    Call us: 0434 161 161
                  </span>
                </a>

                {/* Free Quote Button */}
                <Link
                  href="/contact"
                  className="group relative flex items-center bg-[#0b4255] text-white rounded-[12px] h-[61px] min-w-[206px] transition-all duration-300 overflow-hidden"
                >
                  <div className="bg-white rounded-[8px] absolute left-[4px] inset-y-[4px] z-0 transition-all duration-700 ease-in-out w-[53px] group-hover:w-[calc(100%-8px)]" />
                  <Star className="w-[20px] h-[20px] text-[#ffb400] fill-[#ffb400] absolute left-[21px] z-10 top-1/2 -translate-y-1/2" />
                  <span className="relative z-10 ml-[64px] pr-6 font-semibold text-[16px] whitespace-nowrap transition-colors duration-300 group-hover:text-[#0b4255]">
                    Get a free quote
                  </span>
                </Link>
              </motion.div>

              {/* Special Offer Banner */}
              <motion.div
                variants={itemVariants}
                className="relative w-[300px] sm:w-[350px] md:w-[400px] lg:w-[471px] max-w-full h-[112px] sm:h-[133px] md:h-[152px] lg:h-[180px] mt-2"
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

      {/* Features Strip */}
      <section className="relative z-10 bg-[#fff] px-5 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-16 md:px-14">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-5 sm:grid-cols-3 sm:gap-8">
          <div className="mx-auto flex w-full max-w-[230px] items-center gap-3 sm:max-w-none sm:justify-center">
            <div className="relative h-[57px] w-[57px] shrink-0">
              <Image
                src="/hero/sameDaysvg.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <span
              className="font-semibold text-[16px] leading-tight text-[rgb(91, 89, 85)] sm:text-[20px] sm:leading-[31.2px]"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Same day cleaning
            </span>
          </div>

          <div className="mx-auto flex w-full max-w-[230px] items-center gap-3 sm:max-w-none sm:justify-center">
            <div className="relative h-[57px] w-[57px] shrink-0">
              <Image
                src="/hero/safeCleaning.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <span
              className="font-semibold text-[16px] leading-tight text-[rgb(91, 89, 85)] sm:text-[20px] sm:leading-[31.2px]"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Safe Chemicals
              <br />
              for Kids &amp; Pets
            </span>
          </div>

          <div className="mx-auto flex w-full max-w-[230px] items-center gap-3 sm:max-w-none sm:justify-center">
            <div className="relative h-[57px] w-[57px] shrink-0">
              <Image
                src="/hero/24hours.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <span
              className="font-semibold text-[16px] leading-tight text-[rgb(91, 89, 85)] sm:text-[20px] sm:leading-[31.2px]"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              24/7 availability
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
