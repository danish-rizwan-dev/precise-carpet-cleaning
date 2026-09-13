'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const STEPS = [
  {
    id: 0,
    title: '1. Book Your Service',
    description: 'Choose your carpet cleaning service, select a convenient date, and tell us what your carpets need.',
    image: '/howitworks/crouselmobile.jpg',
  },
  {
    id: 1,
    title: '2. We Deep Clean',
    description: 'Our professionals use specialised equipment and proven cleaning methods to lift dirt, stains, odours and built-up grime.',
    image: '/howitworks/preciseVaccume.jpg',
  },
  {
    id: 2,
    title: '3. Enjoy Fresh Carpets',
    description: 'Sit back and enjoy cleaner, fresher carpets that look better and feel great underfoot.',
    image: '/howitworks/crouselthreeimggirl.png',
  },
];

const STATS = [
  { value: '4.7', label: 'Average Rating' },
  { value: '1.2k+', label: 'Happy Clients' },
  { value: '300+', label: 'Regular Clients' },
  { value: '100%', label: 'Background-Checked Staff' },
];

const ACCORDION_DATA = [
  {
    title: 'Save Time Every Week',
    description: 'Hiring a professional to clean your space effectively frees up your valuable time for work, family, or relaxation.',
    image: '/howitworks/sofagirl.png',
  },
  {
    title: 'Feel Safe Letting Us In',
    description: 'Our trusted and professional cleaners treat your home with care, ensuring a safe and reliable cleaning experience every time.',
    image: '/howitworks/handshakeimggirls.png',
  },
  {
    title: 'Simple, Stress-Free Booking',
    description: 'Booking with us is quick and easy. Choose your service, pick a time that works for you, and we\'ll take care of the rest.',
    image: '/howitworks/mobileprecise.png',
  },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState(0);

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
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progressFill {
          0% { width: 0%; opacity: 0.4; }
          100% { width: 100%; opacity: 1; }
        }
        .animate-progress {
          animation: progressFill 5s linear forwards;
        }
      `}} />

      <div className="max-w-[1272px] w-full flex flex-col items-center">
        
        {/* --- PART 1: HOW IT WORKS CAROUSEL --- */}
        <div className="max-w-[597px] w-full text-center mb-12 sm:mb-16">
          <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] font-bold text-[#171206] tracking-[-1.5px] leading-[1.16] mb-4">
            How Precise Carpet Cleaning Works
          </h2>
          <p className="text-[16px] sm:text-[18px] font-medium text-[#5B5955] leading-[28.08px]">
            Book your carpet cleaning in a few simple steps and let our trained professionals take care of the rest.
          </p>
        </div>

        <div className="w-full max-w-[1176px] flex flex-col relative">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mb-12 relative z-20">
            {STEPS.map((step, idx) => {
              const isActive = activeTab === idx;
              return (
                <div
                  key={step.id}
                  onClick={() => handleTabClick(idx)}
                  className="flex flex-col items-start cursor-pointer group"
                >
                  <h3 className={`text-[20px] font-semibold leading-[31.2px] transition-colors duration-300 mb-2 ${
                    isActive ? 'text-[#171206]' : 'text-[#a1a1aa] group-hover:text-[#5B5955]'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-[16px] font-medium leading-[26px] transition-colors duration-300 mb-4 ${
                    isActive ? 'text-[#5B5955]' : 'text-[#a1a1aa]/70'
                  }`}>
                    {step.description}
                  </p>

                  <div className="w-full max-w-[200px] h-[2px] bg-[#f0f0f0] rounded-full overflow-hidden relative mt-auto">
                    {isActive && (
                      <div
                        key={progressKey}
                        className="absolute top-0 left-0 h-full bg-[#ffb400]/50 animate-progress"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full relative flex flex-col rounded-b-[18px] overflow-hidden">
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

            <div className="w-full bg-[#0B4255] md:absolute md:bottom-0 md:left-0 z-20 min-h-[169px] rounded-b-[18px] md:rounded-[18px] flex items-center justify-center py-8 px-6 md:px-12">
              <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
                {STATS.map((stat, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-center md:items-start text-white ${
                      idx !== 0 ? 'md:pl-10' : ''
                    }`}
                  >
                    <span className="font-bold text-[32px] sm:text-[40px] leading-[50px] tracking-[-1px] mb-1">
                      {stat.value}
                    </span>
                    <span className="font-medium text-[16px] sm:text-[20px] leading-[31.2px] text-white/90 text-center md:text-left">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- PART 2: SAVE YOUR TIME SECTION --- */}
        <div className="w-full max-w-[1176px] flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-8 mt-24 md:mt-32">
          
          {/* Left Side: Accordion Image */}
          <div className="w-full lg:w-[611px] h-[400px] sm:h-[550px] relative shrink-0 bg-gray-100 rounded-[18px] overflow-hidden order-2 lg:order-1">
            {ACCORDION_DATA.map((item, idx) => (
              <Image
                key={idx}
                src={item.image}
                alt={item.title}
                fill
                className={`object-cover transition-opacity duration-700 ease-in-out ${
                  activeAccordion === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
            ))}
          </div>

          {/* Right Side: Text & Accordion */}
          <div className="w-full lg:w-[520px] flex flex-col lg:mt-[40px] order-1 lg:order-2">
            <h2 className="text-[40px] md:text-[60px] font-bold text-[#171206] tracking-[-1.5px] leading-[1.16] mb-4">
              Save Your Time
            </h2>
            <p className="text-[16px] md:text-[18px] font-medium text-[#5B5955] leading-[28.08px] mb-8">
              We clean so you don’t have to. Get your valuable time back for work, family, or much-needed rest.
            </p>

            <div className="flex flex-col w-full">
              {ACCORDION_DATA.map((item, idx) => {
                const isOpen = activeAccordion === idx;
                return (
                  <div 
                    key={idx} 
                    className="flex flex-col border-t border-gray-200 py-5 cursor-pointer group"
                    onClick={() => setActiveAccordion(idx)}
                  >
                    <h3 className={`text-[18px] md:text-[20px] font-bold leading-[30.4px] transition-colors duration-300 ${
                      isOpen ? 'text-[#171206]' : 'text-[#171206]/70 group-hover:text-[#171206]'
                    }`}>
                      {item.title}
                    </h3>
                    
                    <div 
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-[15px] md:text-[16px] font-normal leading-[24.96px] text-[#5B5955]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* Bottom border for the last item */}
              <div className="border-t border-gray-200" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}