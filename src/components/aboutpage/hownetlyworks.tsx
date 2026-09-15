'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ScrollMoveImage from '../ui/scrollMoveImage';
import CountUp from '../ui/countUp';
import ScrollReveal, { WordReveal } from '../ui/scrollReveal';

const STEPS = [
  {
    id: 0,
    title: '1. Book Your Service',
    description: 'Choose your cleaning service, select a convenient date, and tell us what your space needs.',
    image: '/howitworks/crouselmobile.jpg',
  },
  {
    id: 1,
    title: '2. We Deep Clean',
    description: 'Our professionals use specialized equipment and proven cleaning methods to tackle dirt and built-up grime.',
    image: '/howitworks/preciseVaccume.jpg',
  },
  {
    id: 2,
    title: '3. Enjoy Fresh Carpets',
    description: 'Sit back and enjoy a cleaner, fresher environment that looks and feels great.',
    image: '/howitworks/crouselthreeimggirl.png',
  },
];

const STATS = [
  { value: '4.9', label: 'Average Rating' },
  { value: '1.2k+', label: 'Happy Clients' },
  { value: '300+', label: 'Regular Clients' },
  { value: '100%', label: 'Background-Checked Staff' },
];

export default function HowNetlyWorks() {
  const [activeTab, setActiveTab] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % STEPS.length);
      setProgressKey((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeTab]);

  const handleTabClick = (idx: number) => {
    setActiveTab(idx);
    setProgressKey((prev) => prev + 1);
  };

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-8 md:py-24 md:px-12 flex flex-col items-center font-['Plus_Jakarta_Sans',sans-serif]">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes progressFill {
          0% { width: 0%; opacity: 0.6; }
          100% { width: 100%; opacity: 1; }
        }
        .animate-progress-red {
          animation: progressFill 5s linear forwards;
        }
      `,
        }}
      />

      <div className="max-w-[1272px] w-full flex flex-col items-center">
        {/* --- HEADER --- */}
        <div className="max-w-[680px] w-full text-center mb-12 sm:mb-16">
          <WordReveal className="text-[36px] sm:text-[48px] lg:text-[60px] font-bold text-[#171206] tracking-[-1.5px] leading-[1.16] mb-4">How Netly Works</WordReveal>
          <ScrollReveal delay={0.15}><p className="text-[16px] sm:text-[18px] font-medium text-[#5B5955] leading-[28.08px]">Please select the service you want, choose a date, and let us know how long you need it for in minutes, if you could.</p></ScrollReveal>
        </div>

        {/* --- CAROUSEL STEP CONTENT --- */}
        <div className="w-full max-w-[1176px] flex flex-col relative">
          {/* Step Selectors with Red Progress Bar */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mb-12 relative z-20">
            {STEPS.map((step, idx) => {
              const isActive = activeTab === idx;
              return (
                <div
                  key={step.id}
                  onClick={() => handleTabClick(idx)}
                  className="flex flex-col items-start cursor-pointer group"
                >
                  <h3
                    className={`text-[20px] font-semibold leading-[31.2px] transition-colors duration-300 mb-2 ${
                      isActive ? 'text-[#171206]' : 'text-[#a1a1aa] group-hover:text-[#5B5955]'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-[16px] font-medium leading-[26px] transition-colors duration-300 mb-4 ${
                      isActive ? 'text-[#5B5955]' : 'text-[#a1a1aa]/70'
                    }`}
                  >
                    {step.description}
                  </p>

                  {/* Red Progress Track & Fill */}
                  <div className="w-full max-w-[200px] h-[3px] bg-[#f0f0f0] rounded-full overflow-hidden relative mt-auto">
                    {isActive && (
                      <div
                        key={progressKey}
                        className="absolute top-0 left-0 h-full bg-[#E53E3E] animate-progress-red"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Image Showcase & Floating Stats */}
          <div className="w-full relative flex flex-col rounded-b-[18px] overflow-hidden">
            <ScrollMoveImage className="w-full" y={20}>
              <div className="relative w-full h-[400px] sm:h-[500px] md:h-[650px] bg-gray-100">
                {STEPS.map((step, idx) => (
                  <Image
                    key={step.id}
                    src={step.image}
                    alt={step.title}
                    fill
                    priority={idx === 0}
                    className={`object-cover transition-opacity duration-700 ease-in-out ${
                      activeTab === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  />
                ))}
              </div>
            </ScrollMoveImage>

          
          </div>
        </div>
      </div>
    </section>
  );
}
