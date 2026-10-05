import type { Metadata } from "next";
import AppointmentClient from "./appointmentClient";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Book your carpet, rug or upholstery cleaning appointment online in under a minute. Same-day availability across Sydney.",
  alternates: {
    canonical: "/appointment/",
  },
};

export default function AppointmentPage() {
  return <AppointmentClient />;
}
