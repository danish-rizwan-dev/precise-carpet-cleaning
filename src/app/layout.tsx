import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import site from "@/content/site.json";
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

const SITE_URL = site.url;
const SITE_NAME = site.name;
const DESCRIPTION = site.description;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Precise Carpet Cleaning | Sydney's Carpet Cleaning Experts",
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
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
    <html lang="en" className={plusJakarta.variable}>
      <body className={`${plusJakarta.className} antialiased `}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
