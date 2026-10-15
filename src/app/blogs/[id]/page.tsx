import type { Metadata } from "next";
import { articlesData } from "@/data/articles";
import BlogPostClient from "./blogPostClient";

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

  return {
    title: article.title,
    description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogPostClient id={id} />;
}
