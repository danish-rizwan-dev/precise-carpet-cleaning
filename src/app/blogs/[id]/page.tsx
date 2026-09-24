"use client";

import Image from "@/components/ui/image";
import Link from "next/link";
import { use } from "react";
import { articlesData } from "@/data/articles";
import ScrollReveal, { WordReveal } from "@/components/ui/scrollReveal";

const ArrowLeftIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const currentId = resolvedParams.id;
  const article = articlesData[currentId] || articlesData["1"];

  // Get next 2 articles for "Read More Article" section
  const otherArticles = Object.values(articlesData)
    .filter((item) => item.id !== currentId)
    .slice(0, 2);

  return (
    <section className="w-full min-h-screen py-16 px-4 sm:px-8 font-['Plus_Jakarta_Sans',sans-serif] bg-white flex flex-col items-center">
      <div className="w-full max-w-[800px] flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center w-full mb-10">
          <span className="text-[14px] font-medium text-[#5B5955] mb-3 block">
            {article.date}
          </span>
          <h1 className="text-[36px] sm:text-[48px] lg:text-[54px] font-bold text-[#171206] tracking-[-1.5px] leading-[1.15] max-w-[760px] mx-auto">
            {article.title}
          </h1>
        </div>

        {/* Hero Image - Standard rounded layout without scalloped edges */}
        <div className="relative w-full h-[360px] sm:h-[480px] mb-14 overflow-hidden rounded-[24px] bg-gray-100">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 800px) 100vw, 800px"
            priority
            className="object-cover"
          />
        </div>

        {/* Article Content Sections */}
        <div className="flex flex-col gap-10 w-full mb-12 text-left">
          {article.sections.map((sec, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.08}><div className="flex flex-col gap-3">
              <h2 className="text-[20px] sm:text-[24px] font-bold text-[#171206] tracking-[-0.5px]">
                {sec.title}
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#5B5955] leading-[26px]">
                {sec.content}
              </p>
            </div></ScrollReveal>
          ))}
        </div>

        {/* Back Button */}
        <div className="w-full flex justify-start mb-20">
          <Link
            href="/blogs"
            className="group relative flex items-center bg-[#0b4255] text-white rounded-[12px] h-[61px] min-w-[190px] transition-all duration-300 overflow-hidden"
          >
            <div className="bg-white rounded-[8px] absolute left-[4px] inset-y-[4px] z-0 transition-all duration-700 ease-in-out w-[53px] group-hover:w-[calc(100%-8px)]" />
            <ArrowLeftIcon className="w-[20px] h-[20px] text-[#0b4255] absolute left-[21px] z-10 top-1/2 -translate-y-1/2 transition-colors duration-300" />
            <span className="relative z-10 ml-[64px] pr-6 font-semibold text-[16px] whitespace-nowrap transition-colors duration-300 group-hover:text-[#0b4255]">
              Back To Blog
            </span>
          </Link>
        </div>
      </div>

      {/* Read More Article Section */}
      <div className="w-full max-w-[1272px] mx-auto pt-10 border-t border-gray-100">
        <WordReveal className="text-[36px] sm:text-[48px] font-bold text-[#171206] tracking-[-1.5px] mb-10 text-left">
          Read More Article
        </WordReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] w-full">
          {otherArticles.map((relArticle) => (
            <Link
              key={relArticle.id}
              href={`/blogs/${relArticle.id}`}
              className="group flex flex-col items-start gap-6 w-full cursor-pointer"
            >
              {/* Card Image Container with Scalloped Top/Bottom Frame */}
              <div
                className="relative w-full h-[320px] sm:h-[417px] overflow-hidden bg-gray-100 rounded-[24px]"
              >
                <Image
                  src={relArticle.image}
                  alt={relArticle.title}
                  width={624}
                  height={417}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 624px"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text Container */}
              <div className="flex flex-col items-start gap-2 w-full">
                <span className="text-[14px] font-medium text-[#5B5955]">
                  {relArticle.date}
                </span>
                <h3 className="text-[20px] sm:text-[24px] font-bold text-[#171206] tracking-[-0.5px] leading-[32px] sm:leading-[37.44px] text-left group-hover:text-[#2b80f7] transition-colors">
                  {relArticle.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}