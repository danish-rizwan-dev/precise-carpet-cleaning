"use client";

import FaqPage from "@/components/homepage/faq";
import Image from "next/image";
import ScrollReveal, { WordReveal } from "@/components/ui/scrollReveal";

const OFFERS = [
  {
    id: 1,
    slug: "lounge-steam-cleaning-10-off",
    image: "/cleaningoffers/steamclean.png",
    title: "10% off any lounge steam cleaning",
    description:
      "Give your lounge a fresh, deep clean while enjoying great savings.",
  },
  {
    id: 2,
    slug: "free-enzyme-pet-odour-treatment",
    image: "/cleaningoffers/freeenzymepet.png",
    title: "FREE Enzyme pet odour treatment",
    description:
      "Say goodbye to lingering pet smells with our deep enzyme treatment.",
  },
  {
    id: 3,
    slug: "book-carpet-rug-upholstery-free-scotchgard",
    image: "/cleaningoffers/bookcarpetrug.png",
    title: "Book Carpet, Rug & Upholstery – Get FREE Scotchgard!",
    description: "Deep clean your home and keep it looking fresh for longer.",
  },
  {
    id: 5,
    slug: "pet-children-friendly-chemicals",
    image: "/cleaningoffers/petfrirendly.png",
    title: "Pet & Children Friendly Chemicals",
    description:
      "Gentle yet effective cleaning solutions that are carefully chosen to be safer for children, pets and your home.",
  },
  {
    id: 6,
    slug: "leather-cleaning-complimentary-protection",
    image: "/cleaningoffers/leatherclean.png",
    title:
      "With every leather cleaning service, you'll receive a complimentary leather protection treatment.",
    description:
      "Keep your leather looking fresh, conditioned and protected for longer.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      {/* Upper Offers Section */}
      <section className="w-full bg-white pt-4 pb-12 px-4 sm:px-8 md:pt-8 md:pb-24 md:px-12 flex flex-col items-center justify-center">
        {/* Header Container */}
        <div className="max-w-[1272px] w-full text-center mb-8 sm:mb-12 md:mb-[72px]">
          <WordReveal className="text-3xl sm:text-4xl md:text-[48px] lg:text-[60px] font-extrabold text-[#171206] tracking-tight leading-tight mb-3">
           Our Services
          </WordReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] font-medium text-[#171206]/70 max-w-[524px] mx-auto">
             Our professional cleaning services are designed to keep your home consistently clean, comfortable, and stress-free.
            </p>
          </ScrollReveal>
        </div>

        {/* Offers Grid */}
        <div className="w-full max-w-[1272px] flex flex-wrap justify-center gap-6 sm:gap-8">
          {OFFERS.map((offer) => (
            <div
              key={offer.id}
              className="group w-[400px] min-h-[380px] sm:min-h-[428px] bg-[#f5f5f5] hover:bg-[#0b4255] rounded-[32px] px-6 py-8 sm:p-8 flex flex-col items-center justify-start text-center transition-all duration-300 hover:shadow-xl relative overflow-hidden"
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
                  priority={offer.id <= 3}
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
          ))}
        </div>
      </section>

      {/* Recover Your Time Section */}
      <section className="bg-white pt-0 pb-12 md:pt-2 md:pb-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 md:px-14">
          {/* Top Features Strip */}
          <div className="mb-16 grid grid-cols-1 sm:grid-cols-3 items-center gap-5 sm:gap-8">
            <div className="mx-auto flex w-full max-w-[230px] items-center gap-3 sm:max-w-none sm:justify-center">
              <div className="relative h-[57px] w-[57px] shrink-0">
                <Image
                  src="/hero/sameDaysvg.svg"
                  alt="Same day cleaning"
                  fill
                  className="object-contain"
                />
              </div>
              <span
                className="font-semibold text-[16px] leading-tight text-[rgb(91,89,85)] sm:text-[20px] sm:leading-[31.2px]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Same day cleaning
              </span>
            </div>

            <div className="mx-auto flex w-full max-w-[230px] items-center gap-3 sm:max-w-none sm:justify-center">
              <div className="relative h-[57px] w-[57px] shrink-0">
                <Image
                  src="/hero/safeCleaning.svg"
                  alt="Safe Chemicals"
                  fill
                  className="object-contain"
                />
              </div>
              <span
                className="font-semibold text-[16px] leading-tight text-[rgb(91,89,85)] sm:text-[20px] sm:leading-[31.2px]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
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
                  alt="24/7 availability"
                  fill
                  className="object-contain"
                />
              </div>
              <span
                className="font-semibold text-[16px] leading-tight text-[rgb(91,89,85)] sm:text-[20px] sm:leading-[31.2px]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                24/7 availability
              </span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Image */}
            <div className="relative mx-auto h-[411px] w-full max-w-[651px] overflow-hidden rounded-[40px]">
              <Image
                src="/ourServices/recoveryourtime.webp"
                alt="Professional carpet cleaner at work"
                fill
                sizes="(max-width: 1024px) 100vw, 512px"
                className="object-cover"
                priority
              />
            </div>

            {/* Right Column - Text & Features */}
            <div className="flex flex-col">
              <h2
                className="text-[40px] font-bold leading-[1.15] tracking-[-1.5px] text-[#171206] sm:text-[50px] md:text-[60px] md:leading-[69.6px]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Leave the Carpet
                <br />
                Cleaning to Us
              </h2>

              <p
                className="mt-6 text-[18px] font-medium leading-[28.08px] text-[#5b5955]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Let our professional team handle the hard work, so you can spend
                your time on what matters most. Enjoy cleaner carpets without
                the hassle.
              </p>

              {/* Sub-features list */}
              <div className="mt-8 flex flex-col gap-6">
                {/* Feature 1 */}
                <div className="flex items-start gap-4">
                  <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-xl bg-[#0f3d4c] text-white">
                    {/* Clock / Time Icon */}
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="text-[18px] font-bold text-[#171206]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Save Time Every Week
                    </h3>
                    <p
                      className="mt-1 text-[15px] font-medium leading-[22px] text-[#5b5955]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Professional cleaning takes the hard work off your hands,
                      giving you more time for family, work, or simply relaxing.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-4">
                  <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-xl bg-[#0f3d4c] text-white">
                    {/* Satisfaction / Badge Icon */}
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="text-[18px] font-bold text-[#171206]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Satisfaction Guaranteed
                    </h3>
                    <p
                      className="mt-1 text-[15px] font-medium leading-[22px] text-[#5b5955]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      We tackle built-up dirt, stains and odours to leave your
                      carpets looking fresh, feeling clean and ready to enjoy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqPage />
    </main>
  );
}
