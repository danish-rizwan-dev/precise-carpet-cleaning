import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Footer from "@/components/layout/footer";
import ConditionalHeader from "@/components/layout/conditionalHeader";
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

const SITE_URL = "https://precisecarpetcleaningservice.framer.website";
const SITE_NAME = "Precise Carpet Cleaning Services";
const DESCRIPTION =
  "Professional carpet, rug and upholstery cleaning for homes and businesses. 4.9★ rated, same day cleaning, safe chemicals for kids & pets.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Precise Carpet Cleaning | Sydney's Carpet Cleaning Experts",
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "carpet cleaning",
    "rug cleaning",
    "upholstery cleaning",
    "sofa cleaning",
    "tile grout cleaning",
    "mattress cleaning",
    "Sydney carpet cleaning",
    "professional cleaning services",
  ],
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DESCRIPTION,
    images: [
      {
        url: "/hero/herobackgroundimage.png",
        width: 1600,
        height: 1000,
        alt: "Precise Carpet Cleaning Services - professional carpet cleaning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DESCRIPTION,
    images: ["/hero/herobackgroundimage.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0e4b5a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} overflow-x-hidden`} style={{ overflowX: "hidden" }}>
      <body className={`${plusJakarta.className} antialiased `}>
        <ConditionalHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
