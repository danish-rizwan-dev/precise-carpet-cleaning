import Image from "next/image";
import ScrollReveal, { WordReveal } from "../ui/scrollReveal";

const TEAM_MEMBERS = [
  {
    name: "Michael Carter",
    role: "Lead Cleaning Specialist",
    image: "/about/trust/Michael.webp",
  },
  {
    name: "Daniel Brooks",
    role: "Senior Cleaning Technician",
    image: "/about/trust/daniel.webp",
  },
  {
    name: "James Wilson",
    role: "Residential Cleaning Expert",
    image: "/about/trust/James.webp",
  },
  {
    name: "Andrew Collins",
    role: "Quality Control Supervisor",
    image: "/about/trust/Andrew.webp",
  },
  {
    name: "Robert Hayes",
    role: "Operations & Field Manager",
    image: "/about/trust/Robert.webp",
  },
  {
    name: "Matthew Turner",
    role: "Deep Cleaning Specialist",
    image: "/about/trust/Matthew.webp",
  },
  {
    name: "Jason Miller",
    role: "Floor & Surface Care Technician",
    image: "/about/trust/Jason.webp",
  },
  {
    name: "David Thompson",
    role: "Move-In / Move-Out Cleaning Lead",
    image: "/about/trust/David.webp",
  },
];

export default function PeopleYouCanTrustSection() {
  return (
    <section className="w-full max-w-[1272px] mx-auto py-16 px-4 sm:px-8 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header Container */}
      <div className="text-center max-w-[680px] mx-auto mb-12 sm:mb-16">
        <WordReveal className="text-[40px] sm:text-[50px] lg:text-[60px] font-bold text-[#171206] tracking-[-1.5px] leading-[1.16] lg:leading-[69.6px] mb-4">People You Can Trust</WordReveal>
        <ScrollReveal delay={0.15}><p className="text-[16px] sm:text-[18px] font-medium text-[#5B5955] leading-[28.08px]">Our dedicated team consists of highly trained professionals who take immense pride in their work and strive to deliver exceptional results.</p></ScrollReveal>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 justify-items-center">
        {TEAM_MEMBERS.map((member, idx) => (
          <ScrollReveal key={idx} className="flex flex-col w-full max-w-[300px]" delay={idx * 0.06}>
            {/* Image Card Container - Clean Rounded Borders (No Clouds) */}
            <div className="w-[300px] h-[315px] relative rounded-[24px] overflow-hidden bg-[#e0e0e0] mb-4 group shrink-0">
              <Image
                src={member.image}
                alt={member.name}
                width={300}
                height={315}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Member Info */}
            <h3 className="text-[24px] font-bold text-[#171206] tracking-[-0.5px] leading-[37.44px]">
              {member.name}
            </h3>
            <p className="text-[18px] font-medium text-[#5B5955] leading-[28.08px]">
              {member.role}
            </p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
