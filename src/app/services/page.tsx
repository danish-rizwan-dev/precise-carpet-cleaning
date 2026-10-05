import type { Metadata } from "next";
import ServicesClient from "./servicesClient";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Carpet, rug, upholstery, mattress, tile & grout, stain removal and end-of-lease cleaning services for homes and businesses across Sydney.",
  alternates: {
    canonical: "/services/",
  },
  openGraph: {
    title: "Our Services",
    description:
      "Carpet, rug, upholstery, mattress, tile & grout, stain removal and end-of-lease cleaning services for homes and businesses across Sydney.",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
