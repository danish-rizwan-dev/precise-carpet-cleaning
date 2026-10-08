"use client";

import site from "@/content/site.json";
import contact from "@/content/contact.json";

import ScrollReveal, { WordReveal } from "@/components/ui/scrollReveal";
import EnquiryForm from "@/components/forms/enquiryForm";

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

export default function GetInTouchSection() {
  return (
    <section className="w-full max-w-[1272px] mx-auto py-12 sm:py-16 px-4 sm:px-8 font-['Plus_Jakarta_Sans',sans-serif] bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16 w-full">
        {/* Left Side Content & Info */}
        <div className="w-full lg:max-w-[500px] lg:self-stretch flex flex-col justify-between lg:min-h-[585px] gap-8 lg:gap-0">
          <div>
            <WordReveal className="inline-block text-[36px] min-[400px]:text-[44px] sm:text-[60px] lg:text-[72px] font-bold text-[#171206] tracking-[-2px] sm:tracking-[-4px] leading-[1.15] lg:leading-[82.8px] mb-4 break-words">
              {contact.heading || "Get in Touch"}
            </WordReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-[15px] sm:text-[18px] font-medium text-[#5B5955] leading-[26px] sm:leading-[28.08px] max-w-[420px]">
                {contact.description ||
                  "Have questions or need to book a cleaning? Contact us anytime, and we'll respond quickly to you."}
              </p>
            </ScrollReveal>

            {/* Service Area Map */}
            <ScrollReveal delay={0.25} className="w-full mt-6 sm:mt-8">
              <div className="w-full h-[260px] sm:h-[300px] lg:h-[330px] overflow-hidden rounded-[22px] border border-gray-100 shadow-[0px_20px_50px_rgba(0,0,0,0.05)] bg-[#FAFAFA]">
                <iframe
                  title={contact.mapTitle || "Map"}
                  src={contact.mapEmbedUrl}
                  className="h-full w-full border-0 block"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
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
                  {site.phone}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full min-w-0">
                <div className="shrink-0">
                  <LocationIcon />
                </div>
                <span className="text-[15px] sm:text-[16px] font-medium text-[#171206]">
                  {contact.location || "New South Wales (NSW)"}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full min-w-0">
                <div className="shrink-0">
                  <MailIcon />
                </div>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[15px] sm:text-[16px] font-medium text-[#171206] hover:underline break-all min-w-0"
                >
                  {site.email}
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
            <EnquiryForm />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}