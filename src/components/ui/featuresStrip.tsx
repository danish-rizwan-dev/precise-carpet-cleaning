import Image from "@/components/ui/image";
import FEATURES from "@/content/features.json";

export default function FeaturesStrip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-3 sm:items-center sm:gap-8 sm:overflow-visible sm:pb-0 ${className}`}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {FEATURES.map((feature) => (
        <div
          key={feature.alt}
          className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center sm:mx-auto sm:w-full sm:max-w-none sm:flex-row sm:justify-center sm:gap-3 sm:text-left"
        >
          <div className="relative h-[46px] w-[46px] shrink-0 sm:h-[57px] sm:w-[57px]">
            <Image
              src={feature.icon}
              alt={feature.alt}
              width={57}
              height={57}
              className="h-full w-full object-contain"
            />
          </div>
          <span
            className="font-semibold text-[14px] leading-tight text-[rgb(91, 89, 85)] sm:text-[20px] sm:leading-[31.2px]"
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
