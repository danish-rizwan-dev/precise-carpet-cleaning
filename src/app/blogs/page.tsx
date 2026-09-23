"use client";

import Image from "next/image";
import Link from "next/link";
import { articlesData } from "@/data/articles";
import ScrollReveal, { WordReveal } from "@/components/ui/scrollReveal";

const articles = Object.values(articlesData).map(({ id, date, title, image }) => ({
  id,
  date,
  title,
  image,
}));

export default function LatestArticlesSection() {
  return (
    <section className="w-full py-16 px-4 sm:px-8 bg-white font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-[1272px] mx-auto flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center max-w-[750px] mb-16">
          <WordReveal className="text-[48px] sm:text-[60px] lg:text-[72px] font-bold text-[#171206] tracking-[-2px] leading-[1.1] mb-5">
            Latest Articles
          </WordReveal>
          <ScrollReveal delay={0.15}><p className="text-[16px] sm:text-[18px] lg:text-[20px] font-medium text-[#5B5955] leading-[30px]">
            From daily upkeep to deep cleaning tips, our articles help you make
            informed decisions about maintaining a healthier home.
          </p></ScrollReveal>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] w-full justify-items-center">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blogs/${article.id}`}
              className="group flex flex-col items-start justify-between w-full max-w-[624px] min-h-[574px] gap-[40px] cursor-pointer"
            >
              {/* Image Container with Scalloped Edge Effect */}
              <div
                className="relative w-full h-[417px] overflow-hidden bg-gray-100 rounded-[24px]"
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 592px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text Container */}
              <div className="flex flex-col items-start gap-2 w-full">
                <span className="text-[16px] sm:text-[18px] font-semibold text-[#5B5955]">
                  {article.date}
                </span>
                <h3 className="text-[24px] font-bold text-[#171206] tracking-[-0.5px] leading-[37.44px] text-left group-hover:text-[#2b80f7] transition-colors">
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
