"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Mail, Star } from "lucide-react";

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
      {/* Top Bar - Hidden on Mobile */}
      <div className="hidden lg:block w-full bg-black text-white text-[14px] font-semibold leading-[21.84px] py-[10px]">
        <div className="max-w-[1521px] mx-auto w-full flex items-center justify-between px-[124px] overflow-hidden">
          {/* Left Side: Contact Details */}
          <div className="flex items-center gap-6">
            <a
              href="tel:0434161161"
              className="flex items-center gap-2 hover:text-[#ffb400] transition-colors"
            >
              <Phone size={14} className="stroke-[2.5]" />
              <span>Call us: 0434 161 161</span>
            </a>
            <a
              href="mailto:Enquiries@precisecarpetcleaning.com.au"
              className="flex items-center gap-2 hover:text-[#ffb400] transition-colors"
            >
              <Mail size={14} className="stroke-[2.5]" />
              <span>Enquiries@precisecarpetcleaning.com.au</span>
            </a>
          </div>

          {/* Right Side: Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/precisecarpetcleaningservices"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#ffb400] transition-colors"
              aria-label="Facebook"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C20.007 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/precisecarpetcleaningservices"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#ffb400] transition-colors"
              aria-label="Instagram"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
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
            sizes="(max-width: 640px) 175px, 145px"
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

        {/* Mobile Dropdown Card */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed left-1/2 -translate-x-1/2 top-[76px] z-40">
            <div
              className="box-sizing-border-box flex flex-col flex-nowrap items-start content-start justify-center p-[20px] gap-[10px] w-[320px] bg-white text-black rounded-[10px] shadow-2xl overflow-y-auto font-sans text-[12px] antialiased"
              style={{
                transformOrigin: "160px 189.812px",
                unicodeBidi: "isolate",
              }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-medium tracking-tight py-2 w-full text-left relative transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:rounded-full after:bg-[#ffb400] after:origin-left after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive(link.href)
                      ? "text-[#ffb400] after:scale-x-100"
                      : "hover:text-[#ffb400] after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
