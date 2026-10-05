import type { Metadata } from "next";
import { servicesData } from "@/data/services";
import ServiceDetailClient from "./serviceDetailClient";

export function generateStaticParams() {
  return Object.keys(servicesData).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const service = servicesData[id];
  if (!service) return {};

  return {
    title: service.title,
    description: service.subtitle,
    alternates: {
      canonical: `/services/${service.id}/`,
    },
    openGraph: {
      title: service.title,
      description: service.subtitle,
      images: [{ url: service.image }],
    },
  };
}

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ServiceDetailClient id={id} />;
}
