import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">خدمت یافت نشد</h1>
        <p className="text-foreground/60 mb-8">
          متأسفانه خدمت مورد نظر شما یافت نشد.
        </p>
        <Link href="/services">
          <Button>بازگشت به لیست خدمات</Button>
        </Link>
      </div>
    </div>
  );
}
