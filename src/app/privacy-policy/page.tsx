export default function PrivacyPolicyPage() {
  return (
    <section className="w-full min-h-screen py-16 px-4 sm:px-8 font-['Plus_Jakarta_Sans',sans-serif] bg-white flex justify-center">
      <div className="w-full max-w-[800px] flex flex-col items-start">
        {/* Header */}
        <div className="w-full text-center mb-12">
          <p className="text-[14px] sm:text-[15px] font-medium text-[#5B5955] mb-2">
            Last Updated: Jan 19, 2026
          </p>
          <h1 className="text-[48px] sm:text-[60px] lg:text-[64px] font-bold text-[#171206] tracking-[-2px] leading-[1.1]">
            Privacy Policy
          </h1>
        </div>

        {/* Policy Content */}
        <div className="flex flex-col gap-10 w-full text-[#5B5955] text-[15px] sm:text-[16px] leading-[26px]">
          {/* Section 1 */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#171206] tracking-[-0.5px]">
              1. Information We Collect
            </h2>
            <p>
              We may collect personal information such as your name, phone
              number, email address, home address, and service details when you
              book a cleaning service, fill out a contact form, or communicate
              with us.
            </p>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#171206] tracking-[-0.5px]">
              2. How We Use Your Information
            </h2>
            <p>
              By using Neatly&apos;s facilities, you agree to follow the
              guidelines in this Cleaning Policy. Your cooperation helps us
              maintain a clean and healthy environment for everyone. We&apos;re
              dedicated to keeping our spaces in top condition, so you can
              enjoy a comfortable and productive experience.
            </p>

            <p className="font-semibold text-[#171206] mt-2">
              The information we collect is used to:
            </p>

            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>Schedule and manage cleaning appointments</li>
              <li>Communicate with you regarding services or inquiries</li>
              <li>Improve our services and customer experience</li>
              <li>Process payments and send invoices or confirmations</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#171206] tracking-[-0.5px]">
              3. Information Sharing
            </h2>
            <p>
              We respect your privacy and do not sell or rent your personal
              information to third parties. Your information may only be shared
              with trusted team members or service partners when necessary to
              provide the requested cleaning service.
            </p>
          </div>

          {/* Section 4 */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#171206] tracking-[-0.5px]">
              4. Data Protection
            </h2>
            <p>
              We implement reasonable security measures to protect your
              personal information from unauthorized access, loss, or misuse.
              However, no online system can guarantee complete security.
            </p>
          </div>

          {/* Section 5 */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#171206] tracking-[-0.5px]">
              5. Cookies & Website Data
            </h2>
            <p>
              Our website may use cookies or similar technologies to improve
              user experience, analyze website traffic, and remember user
              preferences.
            </p>
          </div>

          {/* Section 6 */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#171206] tracking-[-0.5px]">
              6. Your Rights
            </h2>
            <p>
              You have the right to request access to, correction of, or
              deletion of your personal information at any time. You may contact
              us if you wish to update or remove your information.
            </p>
          </div>

          {/* Section 7 */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#171206] tracking-[-0.5px]">
              7. Third-Party Links
            </h2>
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices or content of those
              external sites.
            </p>
          </div>

          {/* Section 8 */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#171206] tracking-[-0.5px]">
              8. Policy Updates
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page, and continued use of our services
              indicates acceptance of the updated policy.
            </p>
          </div>

          {/* Section 9 */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#171206] tracking-[-0.5px]">
              9. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy or how your
              information is handled, please contact us through our website or
              customer support channels.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}