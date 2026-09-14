import Image from "next/image";

import ScrollMoveImage from "@/components/ui/scrollMoveImage";
import CountUp from "@/components/ui/countUp";

const STATS = [
  { value: "4.7", label: "Average Rating" },
  { value: "1.2k+", label: "Homes Cleaned" },
  { value: "300+", label: "Regular Clients" },
  { value: "100%", label: "Background-Checked Staff" },
];

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="10" r="10" fill="#FEBF03" />
    <path
      d="M6 10L8.5 12.5L14 7"
      stroke="#171206"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FEATURES = [
  "More free time for family or work",
  "No time spent on chores",
  "Less daily stress",
  "Increased productivity at work",
  "More time for personal hobbies",
];
export default function OurStorySection() {
  return (
    <>
      <section className="w-full max-w-[1272px] mx-auto py-16 px-4 sm:px-8 font-['Plus_Jakarta_Sans',sans-serif] bg-white text-[#171206]">
      {/* Header Container */}
      <div className="text-center max-w-[620px] mx-auto mb-12 sm:mb-16">
        <h2 className="text-[48px] sm:text-[60px] lg:text-[72px] font-bold text-[#171206] tracking-[-4px] leading-[1.15] mb-3">
          Our Story
        </h2>
        <p className="text-[16px] sm:text-[18px] font-medium text-[#5B5955] leading-[28px]">
          We help create cleaner environments that support everyday comfort,
          health, happiness, and inner peace of mind.
        </p>
      </div>

      {/* 2-Column Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mb-16 items-start">
        {/* Left Side Main Image */}
        <ScrollMoveImage className="w-full">
          <div className="w-full h-[400px] sm:h-[480px] lg:h-[530px] relative rounded-[32px] overflow-hidden group">
            <Image
              src="/pricing/ourStoryimg1.png"
              alt="Cleaner holding bucket"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
        </ScrollMoveImage>

        {/* Right Side Stack: Image + Description */}
        <div className="flex flex-col gap-8 justify-between h-full">
          <ScrollMoveImage className="w-full shrink-0">
            <div className="w-full h-[280px] sm:h-[340px] lg:h-[375px] relative rounded-[32px] overflow-hidden group">
              <Image
                src="/pricing/ourStoryimg2.png"
                alt="Cleaner wiping banister"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </ScrollMoveImage>

          <p className="text-[16px] sm:text-[18px] font-medium text-[#171206] leading-[31.2px] text-left">
            Our work goes beyond just surface cleaning. We help create cleaner
            environments that support everyday comfort, health, and peace of
            mind for all. By doing so, we ensure a better quality of life for
            everyone, fostering a strong sense of well-being and community.
          </p>
        </div>
      </div>

      {/* Stats Bar Container */}
      <div className="w-full bg-[#F2F7F9] rounded-[18px] py-[42px] px-6 sm:px-[76px] grid grid-cols-2 lg:grid-cols-4 gap-8 justify-between items-center text-center">
        {STATS.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <h3 className="text-[36px] sm:text-[48px] font-bold text-[#171206] tracking-[-1px] leading-[50px] mb-1">
              <CountUp target={stat.value} />
            </h3>
            <p className="text-[16px] sm:text-[20px] font-medium text-[#5B5955]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
      
      <section className="w-full max-w-[1272px] mx-auto py-16 px-4 sm:px-8 font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Side Image */}
          <div className="w-full lg:w-[641px] h-[380px] sm:h-[500px] lg:h-[550px] relative rounded-[32px] overflow-hidden shrink-0 group">
            <Image
              src="/pricing/consisitentResult.png"
              alt="Consistent Results At Every Visit"
              width={641}
              height={550}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>

          {/* Right Side Content */}
          <div className="w-full max-w-[580px] flex flex-col items-start">
            <h2 className="inline-block text-[40px] sm:text-[50px] lg:text-[60px] font-bold text-[#171206] tracking-[-1.5px] leading-[1.16] lg:leading-[69.6px] mb-4">
              Consistent Results At Every Visit
            </h2>

            <p className="text-[16px] sm:text-[18px] font-medium text-[#5B5955] leading-[28.08px] mb-[32px]">
              We&apos;ve got the right tools and products to give you a way
              deeper clean than your usual DIY stuff.
            </p>

            <ul className="flex flex-col gap-4 w-full">
              {FEATURES.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="shrink-0">
                    <CheckIcon />
                  </span>
                  <span className="text-[18px] font-medium text-[#171206] leading-[28.08px]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
