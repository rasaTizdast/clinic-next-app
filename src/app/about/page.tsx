import type { Metadata } from "next";
import { AboutPageClient } from "./AboutPageClient";

export const metadata: Metadata = {
  title: "درباره ما",
  description: "درباره کلینیک زیبایی باران و تیم متخصص ما بیشتر بدانید",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
