import type { Metadata } from "next";
import { PackagesPageClient } from "./PackagesPageClient";
import { getPublicPackages } from "@/lib/public-site/api";

export const metadata: Metadata = {
  title: "پکیج‌ها",
  description: "پکیج‌های ویژه مراقبت از پوست کلینیک زیبایی باران",
};

export default async function PackagesPage() {
  const packages = await getPublicPackages();
  return <PackagesPageClient all={packages} />;
}
