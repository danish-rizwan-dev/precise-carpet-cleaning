"use client";

import Image from "@/components/ui/image";
import ScrollMoveImage from "../ui/scrollMoveImage";
import ScrollReveal, { WordReveal } from "../ui/scrollReveal";
import OFFERS from "@/content/offers.json";
import home from "@/content/home.json";

export default function CleaningOffers() {
  return (
    <div className="w-full flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Upper Offers Section */}
      <section className="w-full bg-[#f2f7f9] py-12 px-4 sm:px-8 md:py-24 md:px-12 flex flex-col items-center justify-center">
        {/* Header Container */}
        <div className="max-w-[1272px] w-full text-center mb-8 sm:mb-12 md:mb-[72px]">
          <WordReveal className="text-3xl sm:text-4xl md:text-[48px] lg:text-[60px] font-extrabold text-[#171206] tracking-tight leading-tight mb-3">
            {home.offersSection.heading}
          </WordReveal>
          <ScrollReveal delay={0.18}>
            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] font-medium text-[#171206]/70 max-w-[524px] mx-auto">
              {home.offersSection.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Offers Grid */}
        <div className="w-full max-w-[1272px] flex flex-wrap justify-center gap-6 sm:gap-8">
          {OFFERS.map((offer) => (
            <ScrollReveal
              key={offer.id}
              className="w-[400px] max-w-full"
              delay={(offer.id - 1) * 0.07}
            >
              <div
                className="group w-[400px] max-w-full min-h-[380px] sm:min-h-[428px] bg-white hover:bg-[#0b4255] rounded-[32px] px-6 py-8 sm:p-8 flex flex-col items-center justify-start text-center transition-all duration-300 hover:shadow-xl relative overflow-hidden"
              >
                {/* Asset Image */}
                <div className="w-[180px] h-[122px] relative flex items-center justify-center shrink-0 mb-4 sm:mb-6">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    width={180}
                    height={122}
                    style={{ width: "auto", height: "auto" }}
                    className="object-contain"
                    priority={offer.id <= 2}
                  />
                </div>

                {/* Content Container */}
                <div className="flex flex-col items-center justify-start max-w-[330px]">
                  <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold text-[#171206] group-hover:text-white leading-[1.3] sm:leading-[37.44px] tracking-[-0.5px] mb-3 sm:mb-4 transition-colors duration-300">
                    {offer.title}
                  </h3>
                  <p className="text-sm sm:text-[14px] font-medium text-[#171206]/80 group-hover:text-white/80 leading-[1.45] sm:leading-[21.84px] transition-colors duration-300">
                    {offer.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Showcase Section */}
      <section className="w-full bg-white py-16 px-6 sm:px-12 lg:py-28 overflow-hidden flex justify-center items-center">
        <div className="max-w-[1272px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Image Tilted Left (Counter-Clockwise) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start relative">
            <ScrollMoveImage className="w-full">
              <div
                className="relative w-full max-w-[427px] h-[300px] sm:h-[353px] rounded-[32px] overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
                style={{ transform: "rotate(-8deg)" }}
              >
                <Image
                  src="/cleaningoffers/carpetcleaning.webp"
                  alt="Expert team carpet cleaning"
                  width={427}
                  height={353}
                  sizes="(max-width: 1024px) 100vw, 427px"
                  className="h-full w-full object-cover"
                />
              </div>
            </ScrollMoveImage>
          </div>

          {/* Right Column: Arrow, Text Content & Bottom Image */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start relative">
            {/* Arrow positioned pointing up & right into the text */}
            <div
              className="hidden lg:block absolute bottom-120 -left-25 w-[180px] h-[100px] pointer-events-none z-30"
              style={{ transform: "scaleX(-1) scaleY(-1) rotate(-20deg)" }}
            >
              <Image
                src="/cleaningoffers/arrow.png"
                alt="Decorative Arrow"
                width={140}
                height={80}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Description Paragraph */}
            <ScrollReveal
              direction="left"
              className="max-w-[612px] mb-10 text-center lg:text-left lg:ml-25 z-20"
            >
              <p className="text-lg sm:text-xl lg:text-[24px] font-bold text-[#171206] leading-[1.45] tracking-tight">
                {home.showcase.paragraph}
              </p>
            </ScrollReveal>
            {/* bottom image tilted right (clockwise)  shift if more right */}
            <div className="w-full flex justify-center lg:justify-end">
              <ScrollMoveImage className="w-full max-w-[560px]">
                {/* Right Column: Image Tilted Right (Clockwise, milder tilt than left image) */}
                <div
                  className="relative w-full max-w-[540px] h-[320px] sm:h-[427px] rounded-[40px] overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105"
                  style={{ transform: "rotate(3deg)" }}
                >
                  <Image
                    src="/cleaningoffers/carpetcleaning2.webp"
                    alt="Upholstery cleaning solution"
                    width={540}
                    height={427}
                    sizes="(max-width: 1024px) 100vw, 540px"
                    className="h-full w-full object-cover"
                  />
                </div>
              </ScrollMoveImage>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
