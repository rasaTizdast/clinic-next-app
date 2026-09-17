"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "نام الزامی است";
    if (!phone) newErrors.phone = "شماره تماس الزامی است";
    if (message && message.length < 10) newErrors.message = "پیام باید حداقل ۱۰ کاراکتر باشد";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="py-12 text-center">
        <CheckCircle className="h-14 w-14 text-success mx-auto mb-4" />
        <h3 className="text-xl font-bold text-foreground mb-2">
          پیام شما ارسال شد
        </h3>
        <p className="text-sm text-foreground/40 font-light">
          تیم ما در اسرع وقت با شما تماس خواهد گرفت.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="نام کامل"
        name="name"
        placeholder="نام خود را وارد کنید"
        error={errors.name}
        required
      />
      <Input
        label="شماره تماس"
        name="phone"
        type="tel"
        placeholder="۰۹۱۰۰۳۰۰۸۷۵ / ۰۹۱۰۰۳۰۰۸۷۶ / ۰۹۱۰۰۳۰۰۸۷۷"
        error={errors.phone}
        required
      />
      <Textarea
        label="پیام (اختیاری)"
        name="message"
        placeholder="پیام خود را بنویسید..."
        rows={4}
        error={errors.message}
      />
      <Button
        type="submit"
        className="w-full gap-2 rounded-xl"
      >
        <Send className="h-4 w-4" />
        ارسال پیام
      </Button>
    </form>
  );
}
