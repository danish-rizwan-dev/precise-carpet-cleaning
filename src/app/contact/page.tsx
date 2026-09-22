"use client";

import { useState } from "react";
import ScrollReveal, { WordReveal } from "@/components/ui/scrollReveal";

const PhoneIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FEBF03"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LocationIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FEBF03"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FEBF03"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#171206"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export default function GetInTouchSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceType: "Home", // "Home" or "Business"
    topic: "",
    comments: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="w-full max-w-[1272px] mx-auto py-12 sm:py-16 px-4 sm:px-8 font-['Plus_Jakarta_Sans',sans-serif] bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16 w-full">
        {/* Left Side Content & Info */}
        <div className="w-full lg:max-w-[500px] flex flex-col justify-between lg:min-h-[585px] gap-8 lg:gap-0">
          <div>
            <WordReveal className="inline-block text-[36px] min-[400px]:text-[44px] sm:text-[60px] lg:text-[72px] font-bold text-[#171206] tracking-[-2px] sm:tracking-[-4px] leading-[1.15] lg:leading-[82.8px] mb-4 break-words">
              Get in Touch
            </WordReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-[15px] sm:text-[18px] font-medium text-[#5B5955] leading-[26px] sm:leading-[28.08px] max-w-[420px]">
                Have questions or need to book a cleaning? Contact us anytime,
                and we'll respond quickly to you.
              </p>
            </ScrollReveal>
          </div>

          {/* Left Bottom Details Box */}
          <ScrollReveal delay={0.25} className="w-full">
            <div className="flex flex-col items-start gap-[18px] justify-center w-full lg:max-w-[500px]">
              <div className="flex items-center gap-3 w-full min-w-0">
                <div className="shrink-0">
                  <PhoneIcon />
                </div>
                <span className="text-[15px] sm:text-[16px] font-medium text-[#171206]">
                  0434 161 161
                </span>
              </div>

              <div className="flex items-center gap-3 w-full min-w-0">
                <div className="shrink-0">
                  <LocationIcon />
                </div>
                <span className="text-[15px] sm:text-[16px] font-medium text-[#171206]">
                  New South Wales (NSW)
                </span>
              </div>

              <div className="flex items-center gap-3 w-full min-w-0">
                <div className="shrink-0">
                  <MailIcon />
                </div>
                <a
                  href="mailto:precisecarpetcleaningservices@gmail.com"
                  className="text-[15px] sm:text-[16px] font-medium text-[#171206] hover:underline break-all min-w-0"
                >
                  precisecarpetcleaningservices@gmail.com
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Side Form Card */}
        <ScrollReveal
          delay={0.3}
          direction="right"
          className="w-full lg:w-[562px]"
        >
          <div className="w-full lg:w-[562px] lg:min-h-[585px] bg-white rounded-[22px] p-5 sm:p-[28px] shadow-[0px_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-start gap-[24px]">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-[20px] w-full"
            >
              {/* Name Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-[14px] font-semibold text-[#171206]">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Peter"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full h-[48px] px-4 rounded-[12px] border border-gray-200 bg-[#FAFAFA] text-[15px] text-[#171206] placeholder-gray-400 focus:outline-none focus:border-[#FEBF03] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <label className="text-[14px] font-semibold text-[#171206]">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Thomson"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full h-[48px] px-4 rounded-[12px] border border-gray-200 bg-[#FAFAFA] text-[15px] text-[#171206] placeholder-gray-400 focus:outline-none focus:border-[#FEBF03] transition-colors"
                  />
                </div>
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-[14px] font-semibold text-[#171206]">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="Type your mail address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full h-[48px] px-4 rounded-[12px] border border-gray-200 bg-[#FAFAFA] text-[15px] text-[#171206] placeholder-gray-400 focus:outline-none focus:border-[#FEBF03] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <label className="text-[14px] font-semibold text-[#171206]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Type your phone number"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full h-[48px] px-4 rounded-[12px] border border-gray-200 bg-[#FAFAFA] text-[15px] text-[#171206] placeholder-gray-400 focus:outline-none focus:border-[#FEBF03] transition-colors"
                  />
                </div>
              </div>

              {/* Home / Business Selection */}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[14px] font-semibold text-[#171206]">
                  Is this for your home or business?
                </label>
                <div className="flex items-center gap-6 mt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-[15px] text-[#171206]">
                    <input
                      type="radio"
                      name="serviceType"
                      value="Home"
                      checked={formData.serviceType === "Home"}
                      onChange={(e) =>
                        setFormData({ ...formData, serviceType: e.target.value })
                      }
                      className="w-4 h-4 accent-[#FEBF03] cursor-pointer"
                    />
                    Home
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-[15px] text-[#171206]">
                    <input
                      type="radio"
                      name="serviceType"
                      value="Business"
                      checked={formData.serviceType === "Business"}
                      onChange={(e) =>
                        setFormData({ ...formData, serviceType: e.target.value })
                      }
                      className="w-4 h-4 accent-[#FEBF03] cursor-pointer"
                    />
                    Business
                  </label>
                </div>
              </div>

              {/* Dropdown Field */}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[14px] font-semibold text-[#171206]">
                  How can we help?
                </label>
                <div className="relative w-full">
                  <select
                    value={formData.topic}
                    onChange={(e) =>
                      setFormData({ ...formData, topic: e.target.value })
                    }
                    required
                    className="w-full h-[48px] px-4 pr-10 rounded-[12px] border border-gray-200 bg-[#FAFAFA] text-[15px] text-[#171206] focus:outline-none focus:border-[#FEBF03] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Please select
                    </option>
                    <option value="Carpet cleaning">Carpet cleaning</option>
                    <option value="Couch + sofa cleaning">
                      Couch + sofa cleaning
                    </option>
                    <option value="Leather cleaning + protection">
                      Leather cleaning + protection
                    </option>
                    <option value="Rug cleaning">Rug cleaning</option>
                    <option value="Mattress cleaning">Mattress cleaning</option>
                    <option value="Automotive upholstery">
                      Automotive upholstery
                    </option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDownIcon />
                  </div>
                </div>
              </div>

              {/* Comments Area */}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[14px] font-semibold text-[#171206]">
                  Comments
                </label>
                <textarea
                  rows={4}
                  placeholder="Type a message"
                  required
                  value={formData.comments}
                  onChange={(e) =>
                    setFormData({ ...formData, comments: e.target.value })
                  }
                  className="w-full p-4 rounded-[12px] border border-gray-200 bg-[#FAFAFA] text-[15px] text-[#171206] placeholder-gray-400 focus:outline-none focus:border-[#FEBF03] transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-[50px] px-4 py-[14px] bg-[#2b80f7] hover:bg-[#eabb00] hover:text-black text-white font-semibold text-[15px] rounded-[12px] transition-all duration-200 flex items-center justify-center cursor-pointer mt-2"
              >
                Send Message
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}