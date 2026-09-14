"use client";

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

export default function Footer() {
  return (
    <>
      {/* 2. CALL TO ACTION SECTION */}
      <section className="w-full relative mt-4 md:mt-8">
        {/* Main CTA Content */}
        <div className="w-full bg-[#0B4255] py-20 md:py-[135px] px-6 sm:px-8 relative overflow-hidden flex flex-col items-center justify-center">
          {/* Left Floating Image */}
          <img
            src="/FAQS/vacumecleaner.png"
            alt="Vacuum Cleaner"
            className="hidden lg:block absolute left-[8%] top-[25%] w-[240px] object-contain animate-float"
          />

          {/* Right Floating Image (Delayed Animation) */}
          <img
            src="/FAQS/sofa.png"
            alt="Sofa and Vacuum"
            className="hidden lg:block absolute right-[8%] bottom-[15%] w-[260px] object-contain animate-float-delayed"
          />

          <div className="max-w-[700px] mx-auto text-center relative z-10 flex flex-col items-center gap-4 md:gap-[20px]">
            <h2 className="text-[32px] sm:text-[50px] md:text-[60px] font-bold text-white tracking-[-1px] md:tracking-[-1.5px] leading-[1.1] md:leading-[1.16]">
              Let’s Get Your Carpets
              <br />
              Fresh Again
            </h2>
            <p className="text-[16px] md:text-[18px] font-normal text-white/90 leading-[1.5] md:leading-[1.6] max-w-[560px]">
              Leave the cleaning to our professionals and enjoy a cleaner,
              fresher home without the hassle.
            </p>
            <a
              href="tel:0434161161"
              className="group relative flex items-center   text-white rounded-[12px] h-[61px] transition-all duration-300 overflow-hidden w-fit mt-6 md:mt-4"
            >
              {/* Expandable White Background Box */}
              <div className="bg-white rounded-[8px] absolute left-[4px] inset-y-[4px] z-0 transition-all duration-700 ease-in-out w-[49px] group-hover:w-[calc(100%-8px)]" />

              {/* Icon Container */}
              <div className="absolute left-[17px] z-10 top-1/2 -translate-y-1/2 text-[#0B4255]">
                <PhoneIcon />
              </div>

              {/* Button Text */}
              <span className="relative z-10 ml-[64px] pr-6 font-bold text-[16px] md:text-[19px] whitespace-nowrap transition-colors duration-700 group-hover:text-[#0B4255]">
                Book Your Cleaning Today
              </span>
            </a>{" "}
          </div>
        </div>
      </section>

      <footer className="w-full bg-white pt-12 lg:pt-20 pb-10 px-6 sm:px-8 font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="max-w-[1200px] mx-auto flex flex-col">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-8 mb-10 lg:mb-16">
            {/* Logo & Description Container */}
            <div className="flex flex-col max-w-full lg:w-[370.47px] shrink-0 gap-6 lg:gap-8">
              {/* Logo on top for mobile (flex-col-reverse handles switching order) */}
              <div className="flex flex-col-reverse lg:flex-col gap-6 lg:gap-8">
                <p className="text-[#5B5955] text-[16px] sm:text-[18px] font-normal leading-[26px] sm:leading-[28.08px]">
                  We provide professional cleaning with attention to detail,
                  making your space shine every day.
                </p>

                <img
                  src="/logo.svg"
                  alt="Precise Carpet Cleaning Services"
                  className="w-[200px] sm:w-[233.56px] h-[65px] sm:h-[76px] object-contain -ml-1 lg:ml-[6.22px]"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(18%) sepia(48%) saturate(1540%) hue-rotate(159deg) brightness(94%) contrast(96%)",
                  }}
                />
              </div>
            </div>

            {/* Right Column: Navigation Links */}
            <div className="w-full lg:w-[600px] shrink-0 mt-4 lg:mt-0">
              {/* Grid layout: 2 columns on mobile, 3 columns on desktop */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4">
                {/* Company Links */}
                <div className="flex flex-col gap-4 lg:gap-5">
                  <h4 className="text-[#757575] text-[16px] sm:text-[18px] font-normal mb-1">
                    Company
                  </h4>
                  <a
                    href="#"
                    className="text-[#171206] text-[15px] sm:text-[16px] font-medium hover:text-[#ff0000] transition-colors"
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    className="text-[#171206] text-[15px] sm:text-[16px] font-medium hover:text-[#ff0000] transition-colors"
                  >
                    About Us
                  </a>
                </div>

                {/* More Links */}
                <div className="flex flex-col gap-4 lg:gap-5">
                  <h4 className="text-[#757575] text-[16px] sm:text-[18px] font-normal mb-1">
                    More
                  </h4>
                  <a
                    href="#"
                    className="text-[#171206] text-[15px] sm:text-[16px] font-medium hover:text-[#ff0000] transition-colors"
                  >
                    Services
                  </a>
                  <a
                    href="#"
                    className="text-[#171206] text-[15px] sm:text-[16px] font-medium hover:text-[#ff0000] transition-colors"
                  >
                    Contact
                  </a>
                </div>

                {/* Legal & Policy Links */}
                <div className="flex flex-col gap-4 lg:gap-5 col-span-2 lg:col-span-1 mt-2 lg:mt-0">
                  <h4 className="text-[#757575] text-[16px] sm:text-[18px] font-normal mb-1">
                    Legal & Policy
                  </h4>
                  <a
                    href="#"
                    className="text-[#171206] text-[15px] sm:text-[16px] font-medium hover:text-[#ff0000] transition-colors"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="#"
                    className="text-[#171206] text-[15px] sm:text-[16px] font-medium hover:text-[#ff0000] transition-colors"
                  >
                    Terms and Conditions
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Copyright & Credits */}
          <div className="flex flex-col items-start lg:flex-row lg:items-center justify-between pt-6 lg:pt-8 border-t border-[#F3F4F6] gap-3">
            <p className="text-[#5B5955] text-[14px] sm:text-[15px] font-normal text-left">
              © 2026 Precise Carpet Cleaning Services.
            </p>
            <a
              href="https://triolzs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2196F3] text-[14px] sm:text-[15px] font-medium hover:underline text-left"
            >
              Powered by Triolzs.com
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
