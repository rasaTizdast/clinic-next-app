"use client";

import { Check, CheckCheck, Clock3, MessageSquareText, Phone } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { DashboardButton } from "@/components/dashboard/DashboardButton";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ResourceState } from "@/components/dashboard/ResourceState";
import { dashboardApi, isApiError } from "@/lib/dashboard/api";
import { formatDate } from "@/lib/dashboard/format";
import type { ContactMessage } from "@/lib/dashboard/types";

export default function MessagesPage() {
  const [items, setItems] = useState<ContactMessage[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<number | null>(null);
  const [showHandled, setShowHandled] = useState(false);
  useEffect(() => {
    dashboardApi
      .contactMessages()
      .then(setItems)
      .catch((caught) => setError(isApiError(caught) ? caught.message : "پیام‌ها دریافت نشدند."));
  }, []);
  const visible = useMemo(
    () => items?.filter((item) => showHandled || !item.is_handled) ?? [],
    [items, showHandled]
  );
  const toggle = async (item: ContactMessage) => {
    setBusy(item.id);
    setError("");
    try {
      const next = await dashboardApi.updateContactMessage(item.id, !item.is_handled);
      setItems(
        (current) => current?.map((message) => (message.id === next.id ? next : message)) ?? current
      );
    } catch (caught) {
      setError(isApiError(caught) ? caught.message : "وضعیت پیام تغییر نکرد.");
    } finally {
      setBusy(null);
    }
  };
  return (
    <DashboardShell
      eyebrow="صندوق ارتباط"
      title="پیام‌های مراجعان"
      description="درخواست‌های ارسال‌شده از سایت را مرور کنید و پیگیری‌شده‌ها را علامت بزنید."
    >
      {error ? (
        <ResourceState kind="error" message={error} />
      ) : !items ? (
        <ResourceState kind="loading" />
      ) : (
        <div className="dashboard-panel overflow-hidden rounded-[2rem]">
          <header className="flex flex-col gap-3 border-b border-[var(--dashboard-line)] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="text-xs text-[var(--dashboard-muted)]">
                {items.filter((item) => !item.is_handled).length.toLocaleString("fa-IR")} پیام در
                انتظار پیگیری
              </p>
            </div>
            <label className="flex items-center gap-2 text-xs font-bold">
              <input
                type="checkbox"
                checked={showHandled}
                onChange={(event) => setShowHandled(event.target.checked)}
              />
              نمایش پیام‌های پیگیری‌شده
            </label>
          </header>
          {visible.length ? (
            <div className="divide-y divide-[var(--dashboard-line)]">
              {visible.map((item) => (
                <article
                  key={item.id}
                  className={`p-5 sm:p-6 ${item.is_handled ? "bg-emerald-50/35" : ""}`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--dashboard-ink)] text-white">
                          <MessageSquareText className="h-4 w-4" />
                        </span>
                        <h2 className="font-black">{item.full_name}</h2>
                        {item.is_handled ? (
                          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                            پیگیری‌شده
                          </span>
                        ) : (
                          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold text-amber-800">
                            جدید
                          </span>
                        )}
                      </div>
                      <p className="mt-4 text-sm leading-7 whitespace-pre-wrap">
                        {item.message || "پیامی نوشته نشده است."}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-4 text-xs text-[var(--dashboard-muted)]">
                        <a
                          href={`tel:${item.phone}`}
                          className="dashboard-focus inline-flex items-center gap-1.5 font-bold text-[var(--dashboard-accent)]"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          {item.phone}
                        </a>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3 className="h-3.5 w-3.5" />
                          {formatDate(item.created_at)}
                        </span>
                      </div>
                    </div>
                    <DashboardButton
                      size="sm"
                      variant={item.is_handled ? "ghost" : "primary"}
                      disabled={busy === item.id}
                      onClick={() => void toggle(item)}
                    >
                      {item.is_handled ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <CheckCheck className="h-4 w-4" />
                      )}
                      {item.is_handled ? "بازگردانی به انتظار" : "علامت‌گذاری پیگیری"}
                    </DashboardButton>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-sm text-[var(--dashboard-muted)]">
              پیامی در این وضعیت وجود ندارد.
            </div>
          )}
        </div>
      )}
    </DashboardShell>
  );
}
