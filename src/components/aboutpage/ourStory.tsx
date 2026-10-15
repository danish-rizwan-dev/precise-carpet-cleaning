import Image from "@/components/ui/image";

import ScrollMoveImage from "@/components/ui/scrollMoveImage";
import CountUp from "@/components/ui/countUp";
import about from "@/content/about.json";

const story = about.ourStory;

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

export default function OurStorySection() {
  return (
    <>
      <section id="our-story" className="w-full max-w-[1272px] mx-auto py-16 px-4 sm:px-8 font-['Plus_Jakarta_Sans',sans-serif] bg-white text-[#171206]">
        {/* Header Container */}
        <div className="text-center max-w-[620px] mx-auto mb-12 sm:mb-16">
          <h2 className="text-[48px] sm:text-[60px] lg:text-[72px] font-bold text-[#171206] tracking-[-4px] leading-[1.15] mb-3">
            {story.heading}
          </h2>
          <p className="text-[15px] sm:text-[16px] font-medium text-[#5B5955] leading-[26px]">
            {story.subtitle}
          </p>
        </div>

        {/* Details left + Sticky collage right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start mb-16">
          {/* Left Side: Story Details */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-16 order-2 lg:order-1">
            {story.cards.map((card, idx) => (
              <div
                key={idx}
                className="rounded-[20px] bg-[#F2F7F9] p-5 sm:p-6 lg:bg-transparent lg:p-0"
              >
                <h3 className="text-[12px] font-bold uppercase tracking-[1.2px] text-[#171206] mb-2 lg:hidden">
                  {card.title}
                </h3>
                <p className="text-[16px] sm:text-[18px] font-medium text-[#5B5955] leading-[28.08px] sm:leading-[31.2px]">
                  {card.content}
                </p>
              </div>
            ))}
          </div>

          {/* Right Side: Sticky Image Collage */}
          <div className="w-full order-1 lg:order-2 lg:sticky lg:top-8">
            <ScrollMoveImage className="w-full relative">
              <div className="relative">
                <div className="w-full h-[300px] sm:h-[360px] lg:h-[400px] relative rounded-[32px] overflow-hidden group">
                  <Image
                    src={story.images.story1}
                    alt="Cleaner holding bucket"
                    fill
                    sizes="(max-width: 1024px) 100vw, 572px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>

                <div className="absolute left-0 sm:-left-6 -bottom-5 sm:-bottom-8 z-10 w-[58%] max-w-[300px] h-[150px] sm:h-[175px] lg:h-[190px] rounded-[24px] overflow-hidden ring-4 sm:ring-8 ring-white shadow-[0_18px_40px_rgba(23,18,6,0.18)] group">
                  <Image
                    src={story.images.story2}
                    alt="Cleaner wiping banister"
                    fill
                    sizes="300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </ScrollMoveImage>
          </div>
        </div>

        {/* Stats Bar Container */}
        <div className="w-full bg-[#F2F7F9] rounded-[18px] py-[42px] px-6 sm:px-[76px] grid grid-cols-2 lg:grid-cols-4 gap-8 justify-between items-center text-center">
          {story.stats.map((stat, idx) => (
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
              src={story.images.results}
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
              {story.results.heading}
            </h2>

            <p className="text-[16px] sm:text-[18px] font-medium text-[#5B5955] leading-[28.08px] mb-[32px]">
              {story.results.paragraph}
            </p>

            <ul className="flex flex-col gap-4 w-full">
              {story.results.features.map((feature, idx) => (
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
