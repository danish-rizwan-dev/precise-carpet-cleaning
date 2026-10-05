import type { Metadata } from "next";
import ContactClient from "./contactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Precise Carpet Cleaning — call, email or send us a message. We serve homes and businesses across Sydney.",
  alternates: {
    canonical: "/contact/",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
