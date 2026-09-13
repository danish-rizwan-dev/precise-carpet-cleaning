import Image from "next/image";
import Link from "next/link";
import { Phone, Star } from "lucide-react";

const SERVICES = [
  {
    id: 1,
    title: "Carpet Cleaning",
    description:
      "Say goodbye to stubborn stains and dirt with our professional carpet cleaning service.",
    image: "/ourServices/carpetcleaning.png",
  },
  {
    id: 2,
    title: "Sofa & Couch Cleaning",
    description:
      "Restore the beauty and comfort of your sofas and couches with our specialised cleaning techniques.",
    image: "/ourServices/sofaandcouch.png",
  },
  {
    id: 3,
    title: "Leather Furniture Cleaning",
    description:
      "Preserve the luxurious look and feel of your leather furniture with our expert cleaning and conditioning.",
    image: "/ourServices/leathercleaning.png",
  },
  {
    id: 4,
    title: "Rug Cleaning",
    description:
      "From delicate area rugs to sturdy floor coverings, we'll leave your rugs looking vibrant and fresh.",
    image: "/ourServices/rugcleaing.png",
  },
  {
    id: 5,
    title: "Mattress Cleaning",
    description:
      "Ensure a clean and hygienic sleeping environment with our thorough mattress cleaning service.",
    image: "/ourServices/mattrecesclean.png",
  },
  {
    id: 6,
    title: "Tile & Grout Cleaning",
    description:
      "Deep clean your tiles and grout, removing built-up dirt, stains and grime to restore a fresh, brighter finish.",
    image: "/ourServices/tilegroutcleaning.png",
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-8 md:py-24 md:px-12 flex flex-col items-center justify-center font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-[1272px] w-full flex flex-col items-center">
        {/* Section Header */}
        <div className="max-w-[715px] w-full text-center mb-12 md:mb-16">
          <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] font-bold text-[#171206] tracking-[-1.5px] leading-[1.16] mb-4">
            Our services
          </h2>
          <p className="text-[16px] sm:text-[18px] font-medium text-[#5B5955] leading-[28.08px] max-w-[650px] mx-auto">
            Our services cater to both residential and commercial clients,
            ensuring that homes and businesses alike enjoy a clean environment.
          </p>
        </div>

        {/* Services 3-Column Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 justify-items-center mb-16">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="w-full max-w-[408px] flex flex-col items-start text-left"
            >
              {/* Image Container */}
              <div className="w-full h-[315px] relative rounded-[28px] overflow-hidden mb-6 bg-gray-100 shadow-sm">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text Container */}
              <div className="flex flex-col items-start px-1">
                <h3 className="text-[24px] font-bold text-[#171206] leading-[37.44px] tracking-[-0.5px] mb-2">
                  {service.title}
                </h3>
                <p className="text-[18px] font-medium text-[#5B5955] leading-[28.08px]">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 -mb-14">
          {/* Call Us Button */}
          <a
            href="tel:0434161161"
            className="group relative flex items-center bg-[#0b4255] text-white rounded-[12px] h-[61px] min-w-[230px] transition-all duration-300 overflow-hidden"
          >
            <div className="bg-white rounded-[8px] absolute left-[4px] inset-y-[4px] z-0 transition-all duration-700 ease-in-out w-[53px] group-hover:w-[calc(100%-8px)]" />
            <Phone className="w-[20px] h-[20px] text-[#ffb400] fill-[#ffb400] absolute left-[21px] z-10 top-1/2 -translate-y-1/2" />
            <span className="relative z-10 ml-[64px] pr-6 font-semibold text-[16px] whitespace-nowrap transition-colors duration-300 group-hover:text-[#0b4255]">
              Call us: 0434 161 161
            </span>
          </a>

          {/* Get Free Quote Button */}
          <Link
            href="/contact"
            className="group relative flex items-center bg-[#0b4255] text-white rounded-[12px] h-[61px] min-w-[206px] transition-all duration-300 overflow-hidden"
          >
            <div className="bg-white rounded-[8px] absolute left-[4px] inset-y-[4px] z-0 transition-all duration-700 ease-in-out w-[53px] group-hover:w-[calc(100%-8px)]" />
            <Star className="w-[20px] h-[20px] text-[#ffb400] fill-[#ffb400] absolute left-[21px] z-10 top-1/2 -translate-y-1/2" />
            <span className="relative z-10 ml-[64px] pr-6 font-semibold text-[16px] whitespace-nowrap transition-colors duration-300 group-hover:text-[#0b4255]">
              Get a free quote
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
