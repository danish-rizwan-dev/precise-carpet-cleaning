"use client";

import Link from "next/link";
import Image from "@/components/ui/image";

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

export default function NotFoundPage() {
  return (
    <section className="w-full min-h-screen py-16 px-4 sm:px-8 font-['Plus_Jakarta_Sans',sans-serif] bg-white flex flex-col items-center justify-center">
      <div className="flex flex-col items-center text-center max-w-[600px]">
        {/* 404 Illustration Image */}
        <div className="relative mb-8 w-full max-w-[400px] h-auto flex justify-center">
          <Image
            src="/404error.png"
            alt="404 Page Not Found"
            width={400}
            height={260}
            priority
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Heading & Subtext */}
        <h1 className="text-[40px] sm:text-[52px] font-bold text-[#171206] tracking-[-1.5px] leading-[1.1] mb-4">
          Page not found!
        </h1>
        <p className="text-[15px] sm:text-[16px] text-[#5B5955] leading-[24px] max-w-[480px] mb-8">
          Looks like the page you&apos;re trying to find doesn&apos;t exist anymore, got
          moved, or was deleted. Double-check the URL or head back home!
        </p>

        {/* Interactive Button */}
        <Link
          href="/"
          className="group relative flex items-center bg-[#0b4255] text-white rounded-[12px] h-[61px] min-w-[215px] transition-all duration-300 overflow-hidden"
        >
          <div className="bg-white rounded-[8px] absolute left-[4px] inset-y-[4px] z-0 transition-all duration-700 ease-in-out w-[53px] group-hover:w-[calc(100%-8px)]" />
          <ArrowLeftIcon className="w-[20px] h-[20px] text-[#0b4255] absolute left-[21px] z-10 top-1/2 -translate-y-1/2 transition-colors duration-300" />
          <span className="relative z-10 ml-[64px] pr-6 font-semibold text-[16px] whitespace-nowrap transition-colors duration-300 group-hover:text-[#0b4255]">
            Back to Homepage
          </span>
        </Link>
      </div>
    </section>
  );
}
