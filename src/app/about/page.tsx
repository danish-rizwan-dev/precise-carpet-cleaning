import type { Metadata } from "next";
import AboutClient from "./aboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Precise Carpet Cleaning — Sydney's trusted carpet, rug and upholstery cleaning professionals, trusted by homes and businesses.",
  alternates: {
    canonical: "/about/",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
