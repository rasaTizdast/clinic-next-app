import type { Metadata } from "next";
import { AboutPageClient } from "./AboutPageClient";
import { getPublicTeam } from "@/lib/public-site/api";

export const metadata: Metadata = {
  title: "درباره ما",
  description: "درباره کلینیک زیبایی باران و تیم متخصص ما بیشتر بدانید",
};

export default async function AboutPage() {
  const team = await getPublicTeam();
  return <AboutPageClient team={team} />;
}
