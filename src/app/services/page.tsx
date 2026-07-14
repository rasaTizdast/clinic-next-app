import type { Metadata } from "next";
import { ServicesPageClient } from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "خدمات",
  description: "لیست خدمات تخصصی زیبایی، پوست و مو کلینیک زیبایی باران",
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
