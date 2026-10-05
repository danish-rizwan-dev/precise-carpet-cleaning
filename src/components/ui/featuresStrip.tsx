import Image from "@/components/ui/image";
import FEATURES from "@/content/features.json";

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
            {"labelLine2" in feature && feature.labelLine2 && (
              <>
                <br />
                {feature.labelLine2}
              </>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
