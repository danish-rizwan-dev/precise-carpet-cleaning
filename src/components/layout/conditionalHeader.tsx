"use client";

import { usePathname } from "next/navigation";
import Header from "./header";

export default function ConditionalHeader() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/pricing") return null;
  return <Header />;
}
