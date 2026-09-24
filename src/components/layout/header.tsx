"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "@/components/ui/image";
import { usePathname } from "next/navigation";
import { Phone, Mail, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const FacebookIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C20.007 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    const base = href.split("#")[0];
    if (base === "/") return pathname === "/";
    return pathname === base || pathname.startsWith(base + "/");
  };

  const logoFilter =
    "brightness(0) saturate(100%) invert(18%) sepia(48%) saturate(1540%) hue-rotate(159deg) brightness(94%) contrast(96%)";

  return (
    <header className="w-full font-['Plus_Jakarta_Sans',sans-serif] relative z-50">
      {/* Top Bar - Phone on mobile/tablet, full details on lg */}
      <div className="block w-full bg-black text-white text-[13px] sm:text-[14px] font-semibold leading-[21.84px] py-[8px] sm:py-[10px]">
        <div className="max-w-[1521px] mx-auto w-full flex items-center justify-between px-4 sm:px-6 lg:px-[124px] overflow-hidden">
          {/* Left Side: Contact Details */}
          <div className="flex items-center gap-3 lg:gap-6">
            <a
              href="tel:0434161161"
              className="flex items-center gap-2 hover:text-[#ffb400] transition-colors whitespace-nowrap"
            >
              <Phone size={14} className="stroke-[2.5]" />
              <span>Call us: 0434 161 161</span>
            </a>
            <a
              href="mailto:Enquiries@precisecarpetcleaning.com.au"
              className="hidden lg:flex items-center gap-2 hover:text-[#ffb400] transition-colors"
            >
              <Mail size={14} className="stroke-[2.5]" />
              <span>Enquiries@precisecarpetcleaning.com.au</span>
            </a>
          </div>

          {/* Right Side: Social Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="mailto:Enquiries@precisecarpetcleaning.com.au"
              className="lg:hidden text-white hover:text-[#ffb400] transition-colors"
              aria-label="Email"
            >
              <Mail size={14} className="stroke-[2.5]" />
            </a>
            <a
              href="https://www.facebook.com/precisecarpetcleaningservices"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#ffb400] transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com/precisecarpetcleaningservices"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#ffb400] transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - White background, dark text */}
      <div className="w-full bg-white h-[70px] sm:h-[76px] lg:h-[105px] flex items-center justify-between px-4 sm:px-6 lg:px-[124px] max-w-[1920px] mx-auto ">
        {/* Logo Left */}
        <Link href="/" className="relative w-[145px] sm:w-[175px] h-[48px] sm:h-[56px]">
          <Image
            src="/logo.svg"
            alt="Precise Carpet Cleaning Services"
            fill
            sizes="(max-width: 640px) 145px, 175px"
            style={{ filter: logoFilter }}
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center gap-8 text-[#171206] font-semibold text-[16px]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-1 pb-1.5 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:rounded-full after:bg-[#ffb400] after:origin-left after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive(link.href)
                    ? "text-[#ffb400] after:scale-x-100"
                    : "hover:text-[#ffb400] after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="group relative flex items-center bg-[#0b4255] text-white rounded-[12px] h-[61px] min-w-[176px] pr-3 transition-all duration-300"
          >
            <div className="bg-white rounded-[8px] h-[53px] flex items-center justify-center absolute left-[4px] z-0 transition-all duration-700 ease-in-out w-[52px] group-hover:w-[calc(100%-8px)]" />
            <Star className="w-[20px] h-[20px] text-[#ffb400] fill-[#ffb400] absolute left-[18px] z-10" />
            <span className="relative z-10 ml-[64px] pr-4 font-semibold text-[16px] whitespace-nowrap transition-colors duration-300 group-hover:text-[#ffb400]">
              Get a quote
            </span>
          </Link>
        </div>

        {/* Hamburger Button - Always dark on non-homepage */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 -mr-1 focus:outline-none z-50 flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          aria-label="Toggle Navigation"
        >
          <span
            className={`w-7 h-[2.5px] rounded-full transition-all duration-300 ease-in-out origin-center bg-[#0b4255] ${
              isMobileMenuOpen ? "rotate-45 translate-y-[8px]" : ""
            }`}
          />
          <span
            className={`w-7 h-[2.5px] rounded-full transition-all duration-300 ease-in-out bg-[#0b4255] ${
              isMobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
            }`}
          />
          <span
            className={`w-7 h-[2.5px] rounded-full transition-all duration-300 ease-in-out origin-center bg-[#0b4255] ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""
            }`}
          />
        </button>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                key="mobile-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden
                className="lg:hidden fixed top-[110px] sm:top-[116px] left-0 right-0 bottom-0 z-40 bg-black/40 backdrop-blur-[3px]"
              />

              {/* Menu card */}
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, y: -14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.96 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="lg:hidden fixed top-[116px] sm:top-[122px] left-4 right-4 sm:left-6 sm:right-6 z-50 mx-auto w-auto max-w-[380px]"
              >
                <div className="overflow-hidden rounded-[20px] border border-black/[0.06] bg-white/95 p-2.5 shadow-[0_24px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl">
                  <nav className="flex flex-col gap-0.5">
                    {navLinks.map((link) => {
                      const active = isActive(link.href);
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center justify-between rounded-[14px] px-4 py-3 text-[15px] font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] ${
                            active
                              ? "bg-[#ffb400]/15 text-[#ffb400]"
                              : "text-[#171206] hover:bg-[#ffb400]/10 hover:text-[#ffb400]"
                          }`}
                        >
                          {link.name}
                          {active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[#ffb400]" />
                          )}
                        </Link>
                      );
                    })}
                  </nav>

                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-3 flex h-[46px] items-center justify-center rounded-[14px] bg-[#0b4255] text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[#0e5469] active:scale-[0.98]"
                  >
                    Get a quote
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
