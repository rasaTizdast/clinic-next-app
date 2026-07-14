import type { Metadata } from "next";
import { PackagesPageClient } from "./PackagesPageClient";

export const metadata: Metadata = {
  title: "پکیج‌ها",
  description: "پکیج‌های ویژه مراقبت از پوست کلینیک زیبایی باران",
};

export default function PackagesPage() {
  return <PackagesPageClient />;
}
