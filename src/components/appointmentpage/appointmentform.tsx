"use client";

import { useState } from "react";
import { sendContactEmail } from "@/lib/contactEmail";

const CalendarIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#A0A0A0"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#A0A0A0"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default function BookCleaningSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    time: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("sending");
    setErrorMessage("");

    const body = [
      "NEW APPOINTMENT",
      "Precise Carpet Cleaning",
      "------------------------------",
      `Name: ${formData.firstName} ${formData.lastName}`,
      `Email: ${formData.email || "-"}`,
      `Phone: ${formData.phone}`,
      `Address: ${formData.address}`,
      "------------------------------",
      `Date: ${formData.date || "-"}`,
      `Time: ${formData.time || "-"}`,
    ].join("\n");

    try {
      await sendContactEmail({
        subject: "New Appointment Request - Precise Carpet Cleaning",
        body,
        replyTo: formData.email,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <section className="w-full min-h-screen py-16 px-4 sm:px-8 font-['Plus_Jakarta_Sans',sans-serif] bg-white flex flex-col items-center justify-center">
        <div className="w-full max-w-[700px] flex flex-col items-center justify-center gap-4 rounded-[24px] border border-[#FEBF03]/40 bg-[#FEBF03]/10 px-6 py-16 text-center shadow-[0px_20px_50px_rgba(0,0,0,0.06)]">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FEBF03"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <h3 className="text-[26px] font-bold text-[#171206]">Request received!</h3>
          <p className="max-w-[420px] text-[15px] text-[#5B5955]">
            Thanks{formData.firstName ? ` ${formData.firstName}` : ""} — your booking
            request is with our team. We&apos;ll confirm your appointment shortly. A
            confirmation has also been sent to your email.
          </p>
          <button
            type="button"
            onClick={() => {
              setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                address: "",
                date: "",
                time: "",
              });
              setStatus("idle");
            }}
            className="mt-2 h-[46px] cursor-pointer rounded-[12px] bg-[#2b80f7] px-6 font-medium text-[15px] text-white transition-colors hover:bg-[#eabb00] hover:text-black"
          >
            Book another appointment
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen py-16 px-4 sm:px-8 font-['Plus_Jakarta_Sans',sans-serif] bg-white flex flex-col items-center justify-center">
      {/* Header */}
      <div className="text-center max-w-[650px] mb-12">
        <h1 className="text-[48px] sm:text-[60px] font-bold text-[#171206] tracking-[-2px] leading-[1.1] mb-4">
          Book Your Cleaning
        </h1>
        <p className="text-[16px] sm:text-[18px] font-normal text-[#5B5955] leading-[26px]">
          Book your cleaning in a few clicks. Choose a service, pick
          <br className="hidden sm:block" /> a time, and we’ll take care of the rest.
        </p>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-[700px] bg-white rounded-[24px] p-6 sm:p-10 shadow-[0px_20px_50px_rgba(0,0,0,0.06)] border border-gray-100">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Name Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
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
                className="w-full h-[52px] px-4 rounded-[12px] border border-gray-200 bg-white text-[15px] text-[#171206] placeholder-gray-400 focus:outline-none focus:border-[#2b80f7] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
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
                className="w-full h-[52px] px-4 rounded-[12px] border border-gray-200 bg-white text-[15px] text-[#171206] placeholder-gray-400 focus:outline-none focus:border-[#2b80f7] transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-[#171206]">
              Your Email
            </label>
            <input
              type="email"
              placeholder="Type your mail address"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full h-[52px] px-4 rounded-[12px] border border-gray-200 bg-white text-[15px] text-[#171206] placeholder-gray-400 focus:outline-none focus:border-[#2b80f7] transition-colors"
            />
          </div>

          {/* Contact Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-[#171206]">
                Your Number
              </label>
              <input
                type="tel"
                placeholder="XXX-XXX-XXX"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full h-[52px] px-4 rounded-[12px] border border-gray-200 bg-white text-[15px] text-[#171206] placeholder-gray-400 focus:outline-none focus:border-[#2b80f7] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-[#171206]">
                Your Address
              </label>
              <input
                type="text"
                placeholder="New York, NY 10020"
                required
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full h-[52px] px-4 rounded-[12px] border border-gray-200 bg-white text-[15px] text-[#171206] placeholder-gray-400 focus:outline-none focus:border-[#2b80f7] transition-colors"
              />
            </div>
          </div>

          {/* Schedule Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-[#171206]">
                Date
              </label>
              <div className="relative w-full">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full h-[52px] px-4 pr-10 rounded-[12px] border border-gray-200 bg-white text-[15px] text-[#171206] focus:outline-none focus:border-[#2b80f7] transition-colors [&::-webkit-calendar-picker-indicator]:opacity-0 z-10 relative cursor-pointer"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-0">
                  <CalendarIcon />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-[#171206]">
                Time
              </label>
              <div className="relative w-full">
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  className="w-full h-[52px] px-4 pr-10 rounded-[12px] border border-gray-200 bg-white text-[15px] text-[#171206] focus:outline-none focus:border-[#2b80f7] transition-colors [&::-webkit-calendar-picker-indicator]:opacity-0 z-10 relative cursor-pointer"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-0">
                  <ClockIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          {status === "error" && (
            <p className="text-[13px] font-medium text-red-500">{errorMessage}</p>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full h-[52px] bg-[#2b80f7] hover:bg-[#eabb00] hover:text-black text-white font-medium text-[16px] rounded-[12px] transition-colors duration-200 mt-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </section>
  );
}