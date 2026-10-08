"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sendToWhatsApp } from "@/lib/whatsapp";
import TOPICS from "@/content/contactTopics.json";

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

type EnquiryFormProps = {
  submitLabel?: string;
  className?: string;
};

/** The full enquiry form used on the contact page and the homepage hero form. */
export default function EnquiryForm({
  submitLabel = "Send Message",
  className = "",
}: EnquiryFormProps) {
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
    <form onSubmit={handleSubmit} className={`flex flex-col gap-[20px] w-full ${className}`}>
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
            className="pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-6px)] rounded-[10px] bg-black shadow-[0px_6px_16px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
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
                  ? "text-white"
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
        className="w-full h-[50px] px-4 py-[14px] bg-black hover:bg-[#0b4255] text-white font-semibold text-[15px] rounded-[12px] transition-all duration-200 flex items-center justify-center cursor-pointer mt-2"
      >
        {submitLabel}
      </button>
    </form>
  );
}
