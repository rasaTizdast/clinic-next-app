import { AlertCircle, Inbox, LoaderCircle } from "lucide-react";

export function ResourceState({
  kind,
  message,
}: {
  kind: "loading" | "empty" | "error";
  message?: string;
}) {
  const content = {
    loading: {
      icon: LoaderCircle,
      title: "در حال دریافت اطلاعات",
      text: "لطفاً چند لحظه صبر کنید.",
    },
    empty: {
      icon: Inbox,
      title: "موردی پیدا نشد",
      text: "با تغییر فیلتر یا افزودن داده از سمت بک‌اند ادامه دهید.",
    },
    error: {
      icon: AlertCircle,
      title: "دریافت اطلاعات ناموفق بود",
      text: message ?? "اتصال یا پاسخ سرور را بررسی کنید.",
    },
  }[kind];
  const Icon = content.icon;
  return (
    <div className="dashboard-panel flex min-h-48 flex-col items-center justify-center rounded-[1.75rem] p-8 text-center">
      <Icon
        className={`mb-3 h-8 w-8 ${kind === "loading" ? "animate-spin text-[var(--dashboard-accent)]" : "text-[var(--dashboard-muted)]"}`}
      />
      <h2 className="font-bold">{content.title}</h2>
      <p className="mt-2 text-sm text-[var(--dashboard-muted)]">{content.text}</p>
    </div>
  );
}
