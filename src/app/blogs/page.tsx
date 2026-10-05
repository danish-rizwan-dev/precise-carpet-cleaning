import type { Metadata } from "next";
import BlogsClient from "./blogsClient";

export const metadata: Metadata = {
  title: "Cleaning Tips & Articles",
  description:
    "From daily upkeep to deep cleaning tips, our articles help you make informed decisions about maintaining a healthier home.",
  alternates: {
    canonical: "/blogs/",
  },
  openGraph: {
    title: "Cleaning Tips & Articles",
    description:
      "From daily upkeep to deep cleaning tips, our articles help you make informed decisions about maintaining a healthier home.",
  },
};

export default function BlogsPage() {
  return <BlogsClient />;
}
