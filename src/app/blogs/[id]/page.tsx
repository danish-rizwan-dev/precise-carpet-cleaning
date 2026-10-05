import type { Metadata } from "next";
import { articlesData } from "@/data/articles";
import BlogPostClient from "./blogPostClient";
import site from "@/content/site.json";

export function generateStaticParams() {
  return Object.keys(articlesData).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = articlesData[id];
  if (!article) return {};

  const firstParagraph = article.sections[0]?.content ?? article.title;
  const description =
    firstParagraph.length > 157
      ? `${firstParagraph.slice(0, 157).trimEnd()}…`
      : firstParagraph;

  const published = new Date(article.date);
  const publishedTime = Number.isNaN(published.getTime())
    ? undefined
    : published.toISOString();

  return {
    title: article.title,
    description,
    alternates: {
      canonical: `/blogs/${article.id}/`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description,
      publishedTime,
      images: [{ url: article.image }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = articlesData[id];
  const base = site.url.replace(/\/$/, "");

  const publishedDate = new Date(article?.date ?? "");
  const datePublished = Number.isNaN(publishedDate.getTime())
    ? undefined
    : publishedDate.toISOString();

  const jsonLd = article
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        image: [`${base}${article.image}`],
        ...(datePublished ? { datePublished } : {}),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${base}/blogs/${article.id}/`,
        },
        author: {
          "@type": "Organization",
          name: site.name,
        },
        publisher: {
          "@type": "Organization",
          name: site.name,
          logo: {
            "@type": "ImageObject",
            url: `${base}/logo.svg`,
          },
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogPostClient id={id} />
    </>
  );
}
