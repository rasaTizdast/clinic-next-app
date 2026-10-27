import type { Metadata } from "next";
import { ServicesPageClient } from "./ServicesPageClient";
import { getPublicServices } from "@/lib/public-site/api";

export const metadata: Metadata = {
  title: "خدمات",
  description: "لیست خدمات تخصصی زیبایی، پوست و مو کلینیک زیبایی باران",
};

export default async function ServicesPage() {
  const services = await getPublicServices();
  return <ServicesPageClient services={services} />;
}
