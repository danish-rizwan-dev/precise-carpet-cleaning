'use client';

export default function Footer() {
  return (
    <footer className="w-full bg-white pt-12 lg:pt-20 pb-10 px-6 sm:px-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-[1200px] mx-auto flex flex-col">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-8 mb-10 lg:mb-16">
          
          {/* Logo & Description Container */}
          <div className="flex flex-col max-w-full lg:w-[370.47px] shrink-0 gap-6 lg:gap-8">
            {/* Logo on top for mobile (flex-col-reverse handles switching order) */}
            <div className="flex flex-col-reverse lg:flex-col gap-6 lg:gap-8">
              <p className="text-[#5B5955] text-[16px] sm:text-[18px] font-normal leading-[26px] sm:leading-[28.08px]">
                We provide professional cleaning with attention to detail, making your space shine every day.
              </p>
              
              <img 
                src="/logo.svg"
                alt="Precise Carpet Cleaning Services" 
                className="w-[200px] sm:w-[233.56px] h-[65px] sm:h-[76px] object-contain -ml-1 lg:ml-[6.22px]" 
                style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(48%) saturate(1540%) hue-rotate(159deg) brightness(94%) contrast(96%)' }}
              />
            </div>
          </div>

          {/* Right Column: Navigation Links */}
          <div className="w-full lg:w-[600px] shrink-0 mt-4 lg:mt-0">
            {/* Grid layout: 2 columns on mobile, 3 columns on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4">
              
              {/* Company Links */}
              <div className="flex flex-col gap-4 lg:gap-5">
                <h4 className="text-[#757575] text-[16px] sm:text-[18px] font-normal mb-1">Company</h4>
                <a href="#" className="text-[#171206] text-[15px] sm:text-[16px] font-medium hover:text-[#ff0000] transition-colors">Home</a>
                <a href="#" className="text-[#171206] text-[15px] sm:text-[16px] font-medium hover:text-[#ff0000] transition-colors">About Us</a>
              </div>

              {/* More Links */}
              <div className="flex flex-col gap-4 lg:gap-5">
                <h4 className="text-[#757575] text-[16px] sm:text-[18px] font-normal mb-1">More</h4>
                <a href="#" className="text-[#171206] text-[15px] sm:text-[16px] font-medium hover:text-[#ff0000] transition-colors">Services</a>
                <a href="#" className="text-[#171206] text-[15px] sm:text-[16px] font-medium hover:text-[#ff0000] transition-colors">Contact</a>
              </div>

              {/* Legal & Policy Links */}
              <div className="flex flex-col gap-4 lg:gap-5 col-span-2 lg:col-span-1 mt-2 lg:mt-0">
                <h4 className="text-[#757575] text-[16px] sm:text-[18px] font-normal mb-1">Legal & Policy</h4>
                <a href="#" className="text-[#171206] text-[15px] sm:text-[16px] font-medium hover:text-[#ff0000] transition-colors">Privacy Policy</a>
                <a href="#" className="text-[#171206] text-[15px] sm:text-[16px] font-medium hover:text-[#ff0000] transition-colors">Terms and Conditions</a>
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
  );
}