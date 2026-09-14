"use client";

import { useState } from "react";

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
    phone: "",
    address: "",
    date: "",
    time: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full h-[52px] px-4 rounded-[12px] border border-gray-200 bg-white text-[15px] text-[#171206] placeholder-gray-400 focus:outline-none focus:border-[#2b80f7] transition-colors"
              />
            </div>
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
          <button
            type="submit"
            className="w-full h-[52px] bg-[#2b80f7] hover:bg-[#eabb00] hover:text-black text-white font-medium text-[16px] rounded-[12px] transition-colors duration-200 mt-2 cursor-pointer"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </section>
  );
}