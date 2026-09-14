"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "How long does carpet cleaning take?",
    answer:
      "The time depends on the size and condition of your carpets. Most standard cleaning services can be completed efficiently with minimal disruption to your day.",
  },
  {
    question: "How long does it take for carpets to dry?",
    answer:
      "Typically, carpets take between 4 to 6 hours to dry completely, depending on airflow, humidity, and the cleaning method used.",
  },
  {
    question: "Can you remove tough stains and pet odours?",
    answer:
      "Yes. We offer targeted stain removal and specialised enzyme treatments to tackle stubborn stains and lingering pet odours.",
  },
  {
    question: "Do I need to move my furniture before cleaning?",
    answer:
      "We recommend removing small or easily movable items. For larger furniture, our team can work around it where possible to ensure a thorough clean.",
  },
];

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
  >
    <path
      d="M6 9L12 15L18 9"
      stroke="#171206"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      fill="#0B4255"
      stroke="#0B4255"
      strokeWidth="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function FaqPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="w-full bg-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Embedded Styles for Floating Animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 2.5s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 2.5s ease-in-out infinite;
          animation-delay: 1.25s;
        }
      `}</style>

      {/* 1. FAQ SECTION */}
      <section className="w-full py-16 md:py-24 px-6 sm:px-8">
        <div className="max-w-[900px] mx-auto flex flex-col items-center">
          <div className="w-full text-left md:text-center mb-10 md:mb-16">
            <h2 className="text-[32px] sm:text-[48px] md:text-[60px] font-bold text-[#171206] tracking-[-1px] leading-[1.1] mb-4">
              Frequently Asked
              <br className="block md:hidden" /> Questions
            </h2>
            <p className="text-[16px] md:text-[18px] font-normal text-[#5B5955] leading-[24px] md:leading-[28px] max-w-[600px] md:mx-auto">
              Everything you need to know about our professional carpet cleaning
              services.
            </p>
          </div>

          <div className="w-full flex flex-col">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border-b border-[#E5E7EB] py-6 md:py-8"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-start md:items-center justify-between text-left focus:outline-none group cursor-pointer gap-4"
                  >
                    <span className="text-[18px] sm:text-[20px] font-bold text-[#171206] group-hover:text-black leading-[1.4] md:leading-normal pr-4">
                      {faq.question}
                    </span>
                    <div className="shrink-0 mt-1 md:mt-0">
                      <ChevronIcon isOpen={isOpen} />
                    </div>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 mt-3"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[16px] font-normal text-[#5B5955] leading-[24.96px] pr-8">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
