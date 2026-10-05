import raw from "@/content/articles.json";

export interface ArticleSection {
  title: string;
  content: string;
}

export interface Article {
  id: string;
  date: string;
  title: string;
  image: string;
  sections: ArticleSection[];
}

export const articlesData = raw.articlesData as unknown as Record<
  string,
  Article
>;
