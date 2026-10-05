import type { Metadata } from "next";
import PricingClient from "./pricingClient";

export const metadata: Metadata = {
  title: "Pricing & Packages",
  description:
    "Transparent pricing for carpet, rug and upholstery cleaning across Sydney. View our packages and get a free quote.",
  alternates: {
    canonical: "/pricing/",
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
