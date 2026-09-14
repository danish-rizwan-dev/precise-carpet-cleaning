"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { use } from "react";
import { servicesData } from "@/data/services";

const ArrowLeftIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const PhoneIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.02-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5 fill-[#FFC500]" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const testimonials = [
  {
    id: 1,
    quote:
      "I used their cleaning the service, and it looked absolutely fantastic. The property was ready for viewing the very same day.",
    name: "Michael Thompson",
    role: "Real Estate Agent",
    avatar: "/ServicesDetails/1.png",
  },
  {
    id: 2,
    quote:
      "I'm particular about cleanliness, and they met my expectations. Attention to detail was noticeable, especially in the kitchen space.",
    name: "Emily Rogers",
    role: "Interior Designer",
    avatar: "/ServicesDetails/2.png",
  },
  {
    id: 3,
    quote:
      "The team was super friendly and really professional. They went the extra mile to make everything shine. Totally recommend them!",
    name: "James Wilson",
    role: "Project Manager",
    avatar: "/ServicesDetails/3.png",
  },
  {
    id: 4,
    quote:
      "I work long hours and struggle to keep things tidy. This service made it easy, and the cleaner did a fantastic job without rushing.",
    name: "Daniel Carter",
    role: "Software Engineer",
    avatar: "/ServicesDetails/4.jpg",
  },
  {
    id: 5,
    quote:
      "I've tried several cleaning services, but this one is the most reliable. Booking was easy, they were on time, and the house felt clean.",
    name: "Sarah Mitchell",
    role: "Marketing Manager",
    avatar: "/ServicesDetails/5.jpg",
  },
  {
    id: 6,
    quote:
      "Absolutely fantastic service! They transformed my home and the attention to detail was incredible. Highly recommend to everyone.",
    name: "Rachel Adams",
    role: "Business Owner",
    avatar: "/ServicesDetails/6.png",
  },
];

export default function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const service = servicesData[resolvedParams.id];

  if (!service) {
    return (
      <section className="w-full min-h-screen py-16 px-4 font-['Plus_Jakarta_Sans',sans-serif] bg-white flex flex-col items-center justify-center">
        <h1 className="text-[36px] font-bold text-[#171206]">
          Service not found
        </h1>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen py-8 px-4 sm:px-8 font-['Plus_Jakarta_Sans',sans-serif] bg-white flex flex-col items-center">
      <div className="w-full max-w-[1200px] flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center w-full max-w-[1200px] mb-8 py-4">
          {/* Main Heading with dynamic responsive scaling and word spacing */}
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full text-[24px] xs:text-[32px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-bold text-[#171206] tracking-normal text-center mb-4 leading-tight sm:leading-normal"
          >
            FREE Enzyme pet odour treatment
          </motion.h1>

          <p className="text-[15px] sm:text-[18px] text-[#5B5955] leading-[24px] sm:leading-[26px] mb-6 max-w-[800px] mx-auto">
            {service.subtitle}
          </p>

          {/* Top Call Button */}
          <div className="flex justify-center">
            <a
              href="tel:0434161161"
              className="group relative flex items-center bg-[#0b4255] text-white rounded-[12px] h-[61px] px-2 min-w-[220px] transition-all duration-300 overflow-hidden"
            >
              <div className="bg-white rounded-[8px] absolute left-[4px] inset-y-[4px] z-0 transition-all duration-700 ease-in-out w-[53px] group-hover:w-[calc(100%-8px)]" />
              <PhoneIcon className="w-[20px] h-[20px] text-[#FFC500] absolute left-[21px] z-10 top-1/2 -translate-y-1/2 transition-colors duration-300" />
              <span className="relative z-10 ml-[64px] pr-4 font-semibold text-[16px] whitespace-nowrap transition-colors duration-300 group-hover:text-[#0b4255]">
                Call us: 0434 161 161
              </span>
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[260px] sm:h-[480px] lg:h-[540px] mb-12 sm:mb-16 overflow-hidden rounded-[24px] bg-gray-100">
          <Image
            src={service.image}
            alt="FREE Enzyme pet odour treatment"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-start mb-24">
          {/* Article Section */}
          <div className="lg:col-span-7 flex flex-col gap-10 text-left">
            {service.sections.map((section, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                {section.title && (
                  <h2 className="text-[22px] sm:text-[28px] font-bold text-[#171206] tracking-[-0.5px]">
                    {section.title}
                  </h2>
                )}
                {section.content && (
                  <p className="text-[15px] sm:text-[16px] text-[#5B5955] leading-[26px]">
                    {section.content}
                  </p>
                )}
                {section.list && (
                  <ul className="list-disc list-inside flex flex-col gap-2 text-[15px] sm:text-[16px] text-[#5B5955] leading-[26px] pl-2">
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.subSections && (
                  <div className="flex flex-col gap-4 mt-2">
                    {section.subSections.map((sub, i) => (
                      <div key={i}>
                        <h3 className="text-[18px] font-bold text-[#171206]">
                          {sub.title}
                        </h3>
                        <p className="text-[15px] sm:text-[16px] text-[#5B5955] leading-[26px]">
                          {sub.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="w-full flex justify-start pt-4">
              <Link
                href="/services"
                className="group relative flex items-center bg-[#0b4255] text-white rounded-[12px] h-[61px] min-w-[190px] transition-all duration-300 overflow-hidden"
              >
                <div className="bg-white rounded-[8px] absolute left-[4px] inset-y-[4px] z-0 transition-all duration-700 ease-in-out w-[53px] group-hover:w-[calc(100%-8px)]" />
                <ArrowLeftIcon className="w-[20px] h-[20px] text-[#0b4255] absolute left-[21px] z-10 top-1/2 -translate-y-1/2 transition-colors duration-300" />
                <span className="relative z-10 ml-[64px] pr-6 font-semibold text-[16px] whitespace-nowrap transition-colors duration-300 group-hover:text-[#0b4255]">
                  Back To Service
                </span>
              </Link>
            </div>
          </div>

          {/* Sticky Yellow Sidebar */}
          <div className="lg:col-span-5 sticky top-8 self-start">
            <div className="w-full bg-[#FFC500] p-6 sm:p-10 text-center flex flex-col items-center justify-center gap-6 shadow-md rounded-[24px]">
              <h3 className="text-[28px] sm:text-[38px] font-bold text-[#171206] tracking-[-1px]">
                Make A Call
              </h3>
              <p className="text-[15px] text-[#171206]/80 max-w-[280px] leading-[22px]">
                Enjoy life even more! Let our dedicated crew take care of all
                the chores and tasks for you.
              </p>

              <a
                href="tel:0434161161"
                className="group relative flex items-center bg-[#0b4255] text-white rounded-[12px] h-[61px] px-2 min-w-[220px] transition-all duration-300 overflow-hidden mt-2"
              >
                <div className="bg-white rounded-[8px] absolute left-[4px] inset-y-[4px] z-0 transition-all duration-700 ease-in-out w-[53px] group-hover:w-[calc(100%-8px)]" />
                <PhoneIcon className="w-[20px] h-[20px] text-[#FFC500] absolute left-[21px] z-10 top-1/2 -translate-y-1/2 transition-colors duration-300" />
                <span className="relative z-10 ml-[64px] pr-4 font-semibold text-[16px] whitespace-nowrap transition-colors duration-300 group-hover:text-[#0b4255]">
                  Call us: 0434 161 161
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel Section */}
        <div className="w-full pt-12 border-t border-gray-100 flex flex-col items-center overflow-hidden">
          <div className="text-center max-w-[650px] mb-12">
            <h2 className="text-[32px] sm:text-[48px] font-bold text-[#171206] tracking-[-1.5px] leading-[1.1] mb-3">
              Professional Experience
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#5B5955] leading-[24px]">
              After the cleaning, the house didn&apos;t just look clean—it felt
              clean. The air felt fresher, and everything was more comfortable.
            </p>
          </div>

          <div className="w-full relative overflow-hidden py-4">
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -1200 }}
              className="flex gap-6 overflow-x-hidden w-max cursor-grab active:cursor-grabbing"
            >
              {testimonials.map((item, idx) => (
                <div
                  key={idx}
                  className="w-[290px] sm:w-[380px] shrink-0 bg-[#f3f8fa] p-6 sm:p-8 flex flex-col justify-between gap-6 rounded-[24px]"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                    <p className="text-[15px] text-[#171206] leading-[24px] font-normal">
                      &quot;{item.quote}&quot;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gray-200">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[15px] font-bold text-[#171206] leading-tight">
                        {item.name}
                      </span>
                      <span className="text-[13px] text-[#5B5955]">
                        {item.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}