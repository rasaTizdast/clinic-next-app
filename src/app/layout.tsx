import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "کلینیک زیبایی باران | زیبایی و جوانی",
    template: "%s | کلینیک زیبایی باران",
  },
  description:
    "کلینیک زیبایی باران ارائه دهنده خدمات تخصصی زیبایی، پوست و مو با بهترین متخصصان",
  keywords: ["کلینیک زیبایی", "جوانسازی پوست", "لیزر موهای زائد", "بوتاکس", "کلینیک باران"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased selection:bg-primary selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
