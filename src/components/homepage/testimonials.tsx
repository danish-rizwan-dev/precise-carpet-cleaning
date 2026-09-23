'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import ScrollMoveImage from '../ui/scrollMoveImage';
import ScrollReveal, { WordReveal } from '../ui/scrollReveal';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Daniel Wilson',
    role: 'Homeowner',
    text: 'We had years of built-up dirt and a few tough stains in our carpets. The difference after cleaning was incredible. It feels like a new home.',
    image: '/testimonials/daniel.jpg',
  },
  {
    id: 2,
    name: 'James Wilson',
    role: 'Homeowner',
    text: 'From booking to completion, everything was easy and hassle-free. The carpets smell fresh, feel cleaner, and the whole room looks better.',
    image: '/testimonials/james.webp',
  },
  {
    id: 3,
    name: 'Sarah',
    role: 'Software Engineer',
    text: 'The carpets look completely refreshed! The team was professional, on time, and did an amazing job removing some really stubborn stains.',
    image: '/testimonials/Sarah.webp',
  },
  {
    id: 4,
    name: 'Michael Thompson',
    role: 'Property Manager',
    text: 'Excellent service from start to finish. The booking was simple, the team arrived on time, and the carpets looked fantastic afterwards.',
    image: '/testimonials/Michael.jpg',
  },
  {
    id: 5,
    name: 'Emily Rogers',
    role: 'Interior Designer',
    text: 'I was genuinely impressed with the attention to detail. The carpets feel fresh, clean, and look noticeably brighter. Highly recommend their service.',
    image: '/testimonials/emily.webp',
  },
];

const FEATURES = [
  'Consistent Results You Can Rely On',
  'Flexible to Fit Your Lifestyle',
  'Results That Feel Different',
  'A Healthier Home Environment',
];

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <circle cx="12" cy="12" r="12" fill="#FFB400" />
    <path d="M7.5 12L10.5 15L16.5 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="#FEBF03" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(0deg)', opacity: 1 }}>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto-scroll animation
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.5;
    let paused = false;

    const animate = () => {
      if (!paused && track) {
        track.scrollLeft += speed;
        // Reset scroll position for infinite loop
        if (track.scrollLeft >= track.scrollWidth - track.clientWidth) {
          track.scrollLeft = 0;
        }
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    const handleMouseEnter = () => { paused = true; };
    const handleMouseLeave = () => { paused = false; };

    track.addEventListener('mouseenter', handleMouseEnter);
    track.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animRef.current!);
      track.removeEventListener('mouseenter', handleMouseEnter);
      track.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Drag to scroll
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !trackRef.current) return;
    const x = e.touches[0].pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handleMouseLeave = () => setIsDragging(false);
    track.addEventListener('mouseleave', handleMouseLeave);
    return () => track.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  return (
    <section className="w-full bg-[#f2f7f9] pt-16 md:pt-24 font-['Plus_Jakarta_Sans',sans-serif]">

      <div className="max-w-[900px] mx-auto text-center px-4 mb-12 md:mb-16">
        <WordReveal className="text-[32px] sm:text-[36px] md:text-[48px] lg:text-[60px] font-bold text-[#171206] tracking-[-1.5px] leading-[1.16] mb-4">Trusted by Happy Customers</WordReveal>
        <ScrollReveal delay={0.2}><p className="text-[14px] sm:text-[16px] md:text-[18px] font-medium text-[#5B5955] leading-[24px] md:leading-[28.08px]">Real experiences from customers who love coming home to cleaner,<br className="hidden sm:inline" />fresher carpets.</p></ScrollReveal>
      </div>

      <div className="w-full pb-32 pt-[60px] overflow-hidden flex flex-col justify-center">

        <div
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          className={`flex gap-6 px-3 overflow-x-auto ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${idx}`}
              className="w-[320px] sm:w-[380px] md:w-[420px] shrink-0 bg-white rounded-[16px] p-8 flex flex-col gap-6 select-none"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              <p className="text-[18px] font-medium text-[#171206] leading-[28.08px] flex-grow">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="flex items-center gap-4 mt-auto pt-2">
                <div className="w-12 h-12 relative rounded-full overflow-hidden bg-gray-200 shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-bold text-[#171206] leading-tight mb-1">
                    {testimonial.name}
                  </span>
                  <span className="text-[14px] font-medium text-[#5B5955] leading-tight">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className="w-full bg-white pt-24 pb-24 flex justify-center">
        <div className="max-w-[1176px] w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 px-4 sm:px-8">
          
          <ScrollReveal direction="left" className="w-full lg:w-[520px] flex flex-col items-start text-left">
          <WordReveal className="text-[36px] sm:text-[44px] md:text-[52px] font-bold text-[#171206] tracking-[-1.5px] leading-[1.16] mb-3">Reliable & On Time</WordReveal>
            <p className="text-[14px] sm:text-[16px] font-medium text-[#5B5955] leading-[24px] mb-6">
              Our cleaners always show up right on time, so your day stays keep on everything running smoothly.
            </p>

          <div className="flex flex-col gap-4">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckIcon />
                <span className="text-[18px] font-medium text-[#171206] leading-[28.08px]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
          </ScrollReveal>

          <ScrollMoveImage className="w-full lg:w-[500px] shrink-0">
            <div className="w-full h-[280px] sm:h-[350px] md:h-[420px] relative bg-gray-100 rounded-[18px] overflow-hidden">
              <Image
                src="/testimonials/vacumecleaner.webp"
                alt="Cleaner working professionally with equipment"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          </ScrollMoveImage>

        </div>
      </div>

    </section>
  );
}
