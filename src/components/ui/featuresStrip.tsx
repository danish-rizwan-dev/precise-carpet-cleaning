import Image from "@/components/ui/image";

const FEATURES = [
  {
    icon: "/hero/sameDaysvg.svg",
    alt: "Same day cleaning icon",
    label: (
      <>
        Same day cleaning
      </>
    ),
  },
  {
    icon: "/hero/safeCleaning.svg",
    alt: "Safe chemicals icon",
    label: (
      <>
        Safe Chemicals
        <br />
        for Kids &amp; Pets
      </>
    ),
  },
  {
    icon: "/hero/24hours.svg",
    alt: "24/7 availability icon",
    label: <>24/7 availability</>,
  },
];

export default function FeaturesStrip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid grid-cols-1 items-center gap-5 sm:grid-cols-3 sm:gap-8 ${className}`}
    >
      {FEATURES.map((feature) => (
        <div
          key={feature.alt}
          className="mx-auto flex w-full max-w-[230px] items-center gap-3 sm:max-w-none sm:justify-center"
        >
          <div className="relative h-[57px] w-[57px] shrink-0">
            <Image
              src={feature.icon}
              alt={feature.alt}
              width={57}
              height={57}
              className="object-contain"
            />
          </div>
          <span
            className="font-semibold text-[16px] leading-tight text-[rgb(91, 89, 85)] sm:text-[20px] sm:leading-[31.2px]"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            {feature.label}
          </span>
        </div>
      ))}
    </div>
  );
}
