import type { Metadata } from "next";
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "با کلینیک زیبایی باران تماس بگیرید و وقت رزرو کنید",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
