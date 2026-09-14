"use client";

import FaqPage from "@/components/homepage/faq";
import Image from "next/image";
import Link from "next/link";
import { FaQ } from "react-icons/fa6";
import ScrollMoveImage from "@/components/ui/scrollMoveImage";

const ClockIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 6V12L16 14"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BadgeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ReviewsImage = () => (
  <div className="mt-1 flex justify-center">
    <Image
      src="/ourServices/reviews.png"
      alt="Reviews Rating"
      width={120}
      height={24}
      className="object-contain"
    />
  </div>
);

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
    slug: "free-stain-removal-carpet-cleaning",
    image: "/cleaningoffers/freestain.png",
    title: "FREE stain removal treatment with every carpet cleaning.",
    description:
      "Give your carpets a deeper clean while tackling those stubborn stains.",
  },
  {
    id: 4,
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
      <section className="w-full bg-[#f2f7f9] py-12 px-4 sm:px-8 md:py-24 md:px-12 flex flex-col items-center justify-center">
        {/* Header Container */}
        <div className="max-w-[1272px] w-full text-center mb-8 sm:mb-12 md:mb-[72px]">
          <h2 className="text-3xl sm:text-4xl md:text-[48px] lg:text-[60px] font-extrabold text-[#171206] tracking-tight leading-tight mb-3">
            Exclusive Cleaning Offers
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] font-medium text-[#171206]/70 max-w-[524px] mx-auto">
            Save more while keeping your home fresh, clean &amp; protected.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="w-full max-w-[1272px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
          {OFFERS.map((offer) => (
            <Link
              key={offer.id}
              href={`/services/${offer.slug}`}
              className="group w-full max-w-[410px] min-h-[380px] sm:min-h-[428px] bg-white hover:bg-[#0b4255] rounded-[32px] px-6 py-8 sm:p-8 flex flex-col items-center justify-start text-center transition-all duration-300 hover:shadow-xl relative overflow-hidden"
            >
              {/* Asset Image */}
              <div className="w-[180px] h-[122px] relative flex items-center justify-center shrink-0 mb-4 sm:mb-6">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  width={180}
                  height={122}
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
            </Link>
          ))}
        </div>
      </section>

      {/* Recover Your Time Section */}
      <section className="w-full bg-white flex flex-col items-center pt-8 pb-[80px] px-4 sm:px-[30px] font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Top Banner Text */}
        <h3 className="text-[20px] md:text-[24px] font-bold text-[#171206] tracking-[-1px] leading-[37.44px] text-center mb-8">
          We&apos;re a top-notch 5-star contractor!
        </h3>

        {/* Logos Section */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-2 w-full max-w-[1000px]">
          {/* Brand 1: ZenZap */}
          <div className="flex flex-col items-center">
            <div className="h-10 relative flex items-center justify-center">
              <Image
                src="/ourServices/zenzap.png"
                alt="ZenZap"
                width={120}
                height={40}
                className="object-contain h-full w-auto"
              />
            </div>
            <ReviewsImage />
          </div>

          {/* Brand 2: Swift */}
          <div className="flex flex-col items-center">
            <div className="h-10 relative flex items-center justify-center">
              <Image
                src="/ourServices/swift.png"
                alt="Swift"
                width={120}
                height={40}
                className="object-contain h-full w-auto"
              />
            </div>
            <ReviewsImage />
          </div>

          {/* Brand 3: Netdot */}
          <div className="flex flex-col items-center">
            <div className="h-10 relative flex items-center justify-center">
              <Image
                src="/ourServices/netdot.png"
                alt="Netdot"
                width={120}
                height={40}
                className="object-contain h-full w-auto"
              />
            </div>
            <ReviewsImage />
          </div>

          {/* Brand 4: Pulse */}
          <div className="flex flex-col items-center">
            <div className="h-10 relative flex items-center justify-center">
              <Image
                src="/ourServices/pulse.png"
                alt="Pulse"
                width={120}
                height={40}
                className="object-contain h-full w-auto"
              />
            </div>
            <ReviewsImage />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-[80px] w-full max-w-[1100px]">
          {/* Left Side: Unmasked Main Image */}
          <ScrollMoveImage className="w-full max-w-[560px] lg:w-[560px] shrink-0">
            <div className="w-full h-[380px] sm:h-[480px] lg:h-[540px] relative overflow-hidden rounded-[24px]">
              <Image
                src="/ourServices/recoveryourtime.png"
                alt="Recover Your Time"
                fill
                className="object-contain rounded-[300px]"
              />
            </div>
          </ScrollMoveImage>

          {/* Right Side: Text & Features */}
          <div className="w-full max-w-[540px] flex flex-col items-start">
            <h2 className="text-[40px] lg:text-[60px] font-bold text-[#171206] tracking-[-1.5px] leading-[1.16] mb-4 text-left">
              Recover Your Time
            </h2>

            <p className="text-[16px] lg:text-[18px] font-medium text-[#5B5955] leading-[28.08px] mb-[40px] text-left">
              We handle all your cleaning, letting you focus on work, family, or
              rest. No more weekends scrubbing.
            </p>

            <div className="flex flex-col gap-[30px] w-full">
              {/* Feature 1 */}
              <div className="flex flex-row items-start gap-[18px]">
                <div className="shrink-0 w-[50px] h-[50px] bg-[#FEBF03] rounded-[14px] flex items-center justify-center mt-1">
                  <ClockIcon />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[#171206] text-[18px] lg:text-[20px] font-bold leading-tight mb-2">
                    Save Time Every Week
                  </h4>
                  <p className="text-[#5B5955] text-[15px] lg:text-[16px] leading-[24.96px]">
                    Cleaning saves you countless hours on tedious chores, giving
                    you more time for work, family, or rest.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-row items-start gap-[18px]">
                <div className="shrink-0 w-[50px] h-[50px] bg-[#FEBF03] rounded-[14px] flex items-center justify-center mt-1">
                  <BadgeIcon />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[#171206] text-[18px] lg:text-[20px] font-bold leading-tight mb-2">
                    Satisfaction Guaranteed
                  </h4>
                  <p className="text-[#5B5955] text-[15px] lg:text-[16px] leading-[24.96px]">
                    If something isn&apos;t quite right, we&apos;ll fix it..
                    Your satisfaction is part of our commitment to quality
                    service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FaqPage/>
    </main>
  );
}