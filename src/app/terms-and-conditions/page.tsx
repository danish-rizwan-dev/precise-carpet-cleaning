export default function TermsAndConditionsPage() {
  return (
    <section className="w-full min-h-screen py-16 px-4 sm:px-8 font-['Plus_Jakarta_Sans',sans-serif] bg-white flex justify-center">
      <div className="w-full max-w-[800px] flex flex-col items-start">
        {/* Header */}
        <div className="w-full text-center mb-12">
          <p className="text-[14px] sm:text-[15px] font-medium text-[#5B5955] mb-2">
            Last Updated: Sep 24, 2026
          </p>
          <h1 className="text-[48px] sm:text-[60px] lg:text-[64px] font-bold text-[#171206] tracking-[-2px] leading-[1.1]">
            Terms and Conditions
          </h1>
        </div>

        {/* Terms Content */}
        <div className="flex flex-col gap-10 w-full text-[#5B5955] text-[15px] sm:text-[16px] leading-[26px]">
          {/* Section 1 */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#171206] tracking-[-0.5px]">
              1. Acceptance of Terms
            </h2>
            <p>
              By booking a service, filling out a form, or otherwise using the
              services of Precise Carpet Cleaning Services (&quot;we&quot;,
              &quot;us&quot;, &quot;our&quot;), you agree to be bound by these
              Terms and Conditions. If you do not agree, please do not use our
              services.
            </p>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#171206] tracking-[-0.5px]">
              2. Services & Bookings
            </h2>
            <p>
              All bookings are subject to availability. A booking is confirmed
              once we have acknowledged your request and agreed on the service
              date and time. We reserve the right to decline or cancel any
              booking at our discretion.
            </p>
            <p>
              Please provide accurate information about your property, carpet
              type, stains, and any other relevant details when booking so that
              we can deliver the appropriate service.
            </p>
          </div>

          {/* Section 3 */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#171206] tracking-[-0.5px]">
              3. Pricing & Payment
            </h2>
            <p>
              Prices quoted on our website are indicative and may vary based on
              the size, condition, and type of the area being cleaned. The final
              price will be confirmed before or at the time of service.
            </p>
            <p className="font-semibold text-[#171206] mt-2">
              Payment is due:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>On the day of service, unless otherwise agreed in writing</li>
              <li>
                Via the payment methods we accept at the time of booking or
                invoice
              </li>
              <li>
                Without deduction, set-off, or delay unless required by law
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#171206] tracking-[-0.5px]">
              4. Cancellations & Rescheduling
            </h2>
            <p>
              We understand that plans change. Please notify us as early as
              possible if you need to cancel or reschedule. Cancellations made
              with less than 24 hours&apos; notice may incur a call-out fee.
              We reserve the right to reschedule or cancel appointments due to
              unforeseen circumstances, in which case we will notify you as
              soon as possible.
            </p>
          </div>

          {/* Section 5 */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#171206] tracking-[-0.5px]">
              5. Customer Responsibilities
            </h2>
            <p>You agree to:</p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>
                Provide safe and reasonable access to the property at the
                agreed time
              </li>
              <li>
                Secure or remove fragile, valuable, and personal items before
                the service
              </li>
              <li>
                Disclose any known hazards, allergies, or special conditions
                (including pet areas) in advance
              </li>
              <li>
                Ensure pets are secured where reasonably necessary for the
                safety of our staff
              </li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#171206] tracking-[-0.5px]">
              6. Results & Limitations
            </h2>
            <p>
              We use professional-grade equipment and methods to deliver the
              best possible results. However, some stains, odours, wear, and
              damage may be permanent or beyond what cleaning can remedy. We do
              not guarantee the complete removal of all stains or the
              restoration of heavily worn carpets.
            </p>
            <p>
              Any concerns about the outcome of a service must be raised within
              48 hours of the appointment so that we have the opportunity to
              inspect and, where appropriate, re attend.
            </p>
          </div>

          {/* Section 7 */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#171206] tracking-[-0.5px]">
              7. Damage & Liability
            </h2>
            <p>
              We take great care when working on your property. Pre-existing
              damage, delicate materials, and normal wear and tear that are not
              caused by our services are not our responsibility. To the extent
              permitted by law, our total liability for any claim related to a
              service is limited to the amount you paid for that service.
            </p>
          </div>

          {/* Section 8 */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#171206] tracking-[-0.5px]">
              8. Intellectual Property
            </h2>
            <p>
              All content on this website, including text, logos, images, and
              design, belongs to Precise Carpet Cleaning Services or its
              licensors and may not be used without our prior written consent.
            </p>
          </div>

          {/* Section 9 */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#171206] tracking-[-0.5px]">
              9. Governing Law
            </h2>
            <p>
              These Terms and Conditions are governed by the laws of New South
              Wales, Australia, and any disputes will be subject to the
              exclusive jurisdiction of the courts of New South Wales.
            </p>
          </div>

          {/* Section 10 */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#171206] tracking-[-0.5px]">
              10. Changes to These Terms
            </h2>
            <p>
              We may update these Terms and Conditions from time to time.
              Changes will be posted on this page with an updated date, and
              continued use of our services after changes are posted constitutes
              acceptance of the revised terms.
            </p>
          </div>

          {/* Section 11 */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#171206] tracking-[-0.5px]">
              11. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms and Conditions,
              please contact us at Enquiries@precisecarpetcleaning.com.au or
              call 0434 161 161.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
