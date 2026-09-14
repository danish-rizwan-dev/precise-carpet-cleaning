import Image from "next/image";

const STATS = [
  { value: "4.7", label: "Average Rating" },
  { value: "1.2k+", label: "Homes Cleaned" },
  { value: "300+", label: "Regular Clients" },
  { value: "100%", label: "Background-Checked Staff" },
];

export default function OurStorySection() {
  return (
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
        <div className="w-full h-[400px] sm:h-[480px] lg:h-[530px] relative rounded-[32px] overflow-hidden group">
          <Image
            src="/ourServices/ourstory-left.png"
            alt="Cleaner holding bucket"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
        </div>

        {/* Right Side Stack: Image + Description */}
        <div className="flex flex-col gap-8 justify-between h-full">
          <div className="w-full h-[280px] sm:h-[340px] lg:h-[375px] relative rounded-[32px] overflow-hidden group shrink-0">
            <Image
              src="/ourServices/ourstory-right.png"
              alt="Cleaner wiping banister"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

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
              {stat.value}
            </h3>
            <p className="text-[16px] sm:text-[20px] font-medium text-[#5B5955]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}