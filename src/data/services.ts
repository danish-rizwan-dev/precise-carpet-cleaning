import raw from "@/content/services.json";

export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  sections: {
    title: string;
    content: string;
    list?: string[];
    subSections?: { title: string; content: string }[];
  }[];
}

export const servicesData = raw.servicesData as unknown as Record<
  string,
  ServiceDetail
>;

export const servicesNav: { title: string; href: string }[] = raw.servicesNav;
