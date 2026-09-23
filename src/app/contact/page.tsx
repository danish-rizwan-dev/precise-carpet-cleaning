"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollReveal, { WordReveal } from "@/components/ui/scrollReveal";
import { sendToWhatsApp } from "@/lib/whatsapp";

const TOPICS = [
  "Carpet cleaning",
  "Couch + sofa cleaning",
  "Leather cleaning + protection",
  "Rug cleaning",
  "Mattress cleaning",
  "Automotive upholstery",
];

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

const ChevronDownIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#171206"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FEBF03"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function GetInTouchSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceType: "Residence", // "Residence" or "Commercial"
    topic: "",
    comments: "",
  });

  const [topicError, setTopicError] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [dropdownOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.topic) {
      setTopicError(true);
      return;
    }

    const message = [
      "✨ *NEW ENQUIRY* ✨",
      "_Precise Carpet Cleaning_",
      "━━━━━━━━━━━━━━━━",
      `👤 *Name:* ${formData.firstName} ${formData.lastName}`,
      `📧 *Email:* ${formData.email || "-"}`,
      `📱 *Phone:* ${formData.phone}`,
      `🏠 *Type:* ${formData.serviceType}`,
      `🧽 *Help with:* ${formData.topic}`,
      "━━━━━━━━━━━━━━━━",
      "💬 *Comments:*",
      formData.comments,
    ].join("\n");

    sendToWhatsApp(message);
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
                and we&apos;ll respond quickly to you.
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
                  href="mailto:Enquiries@precisecarpetcleaning.com.au"
                  className="text-[15px] sm:text-[16px] font-medium text-[#171206] hover:underline break-all min-w-0"
                >
                  Enquiries@precisecarpetcleaning.com.au
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

              {/* Residence / Commercial Toggle */}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[14px] font-semibold text-[#171206]">
                  Is this for your residence or commercial?
                </label>
                <div className="relative grid grid-cols-2 gap-1 w-full sm:w-[340px] bg-[#FAFAFA] border border-gray-200 rounded-[14px] p-1 mt-1">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-6px)] rounded-[10px] bg-[#FEBF03] shadow-[0px_6px_16px_rgba(254,191,3,0.35)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      transform:
                        formData.serviceType === "Commercial"
                          ? "translateX(calc(100% + 4px))"
                          : "translateX(0)",
                    }}
                  />
                  {(["Residence", "Commercial"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, serviceType: type })
                      }
                      className={`relative z-10 h-[42px] rounded-[10px] text-[15px] font-semibold cursor-pointer transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        formData.serviceType === type
                          ? "text-[#171206]"
                          : "text-[#5B5955] hover:text-[#171206]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dropdown Field */}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[14px] font-semibold text-[#171206]">
                  How can we help?
                </label>
                <div className="relative w-full" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((open) => !open)}
                    aria-haspopup="listbox"
                    aria-expanded={dropdownOpen}
                    className={`w-full h-[48px] px-4 pr-10 flex items-center justify-between rounded-[12px] border text-left text-[15px] cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none ${
                      formData.topic ? "text-[#171206]" : "text-gray-400"
                    } ${
                      topicError
                        ? "border-red-300 bg-[#FAFAFA]"
                        : dropdownOpen
                          ? "border-[#FEBF03] bg-white ring-2 ring-[#FEBF03]/15 shadow-[0px_10px_30px_rgba(0,0,0,0.06)]"
                          : "border-gray-200 bg-[#FAFAFA] hover:border-gray-300 focus:border-[#FEBF03] focus:ring-2 focus:ring-[#FEBF03]/15"
                    }`}
                  >
                    <span className="truncate">
                      {formData.topic || "Please select"}
                    </span>
                    <ChevronDownIcon
                      className={`shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        dropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        role="listbox"
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute z-50 mt-2 w-full origin-top overflow-hidden rounded-[12px] border border-gray-100 bg-white py-1.5 shadow-[0px_20px_50px_rgba(0,0,0,0.1)]"
                      >
                        {TOPICS.map((topic) => (
                          <button
                            key={topic}
                            type="button"
                            role="option"
                            aria-selected={formData.topic === topic}
                            onClick={() => {
                              setFormData({ ...formData, topic });
                              setTopicError(false);
                              setDropdownOpen(false);
                            }}
                            className={`flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-[15px] transition-colors duration-200 ${
                              formData.topic === topic
                                ? "bg-[#FEBF03]/10 font-semibold text-[#171206]"
                                : "text-[#171206] hover:bg-[#FEBF03]/10"
                            }`}
                          >
                            {topic}
                            {formData.topic === topic && <CheckIcon />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {topicError && (
                  <p className="text-[13px] font-medium text-red-500">
                    Please select an option
                  </p>
                )}
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