import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-6xl font-bold text-foreground mb-4">۴۰۴</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          صفحه یافت نشد
        </h2>
        <p className="text-foreground/60 mb-8 max-w-md">
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است.
        </p>
        <Link href="/">
          <Button>بازگشت به خانه</Button>
        </Link>
      </div>
    </Container>
  );
}
