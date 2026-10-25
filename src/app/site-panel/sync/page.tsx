"use client";

import {
  CheckCircle2,
  Clock3,
  Database,
  LoaderCircle,
  RefreshCw,
  TriangleAlert,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { DashboardButton } from "@/components/dashboard/DashboardButton";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ResourceState } from "@/components/dashboard/ResourceState";
import { dashboardApi, isApiError } from "@/lib/dashboard/api";
import { formatDate, formatToman } from "@/lib/dashboard/format";
import type { PriceSyncStatus } from "@/lib/dashboard/types";

export default function DashboardSyncPage() {
  const [status, setStatus] = useState<PriceSyncStatus | null>(null);
  const [error, setError] = useState("");
  const [running, setRunning] = useState(false);
  const load = useCallback(async () => {
    try {
      setStatus(await dashboardApi.syncStatus());
      setError("");
    } catch (caught) {
      setError(
        isApiError(caught) && caught.status === 404
          ? "هنوز اجرای همگام‌سازی در سرور ثبت نشده است."
          : isApiError(caught)
            ? caught.message
            : "وضعیت همگام‌سازی دریافت نشد."
      );
    }
  }, []);
  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [load]);
  const run = async () => {
    setRunning(true);
    setError("");
    try {
      setStatus(await dashboardApi.runSync());
    } catch (caught) {
      setError(isApiError(caught) ? caught.message : "اجرای همگام‌سازی انجام نشد.");
      await load();
    } finally {
      setRunning(false);
    }
  };
  return (
    <DashboardShell
      eyebrow="عملیات"
      title="همگام‌سازی قیمت"
      description="آخرین اجرای تبدیل قیمت‌های پایه دلاری را ببینید یا یک اجرای کنترل‌شده جدید آغاز کنید."
    >
      {!status && error ? (
        <div className="space-y-4">
          <ResourceState kind="empty" message={error} />
          <div className="flex justify-center">
            <DashboardButton onClick={() => void run()} disabled={running}>
              {running ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              اجرای اولین همگام‌سازی
            </DashboardButton>
          </div>
        </div>
      ) : !status ? (
        <ResourceState kind="loading" />
      ) : (
        <div className="space-y-5">
          <div className="dashboard-panel rounded-[2rem] p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${status.status === "succeeded" ? "bg-emerald-100 text-emerald-700" : status.status === "failed" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}
                  >
                    {status.status === "succeeded" ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : status.status === "failed" ? (
                      <TriangleAlert className="h-5 w-5" />
                    ) : (
                      <Clock3 className="h-5 w-5" />
                    )}
                  </span>
                  <div>
                    <p className="text-xs text-[var(--dashboard-muted)]">وضعیت آخرین اجرا</p>
                    <h2 className="mt-1 text-2xl font-black">
                      {status.status === "succeeded"
                        ? "موفق"
                        : status.status === "failed"
                          ? "ناموفق"
                          : "در حال اجرا"}
                    </h2>
                  </div>
                </div>
                <p className="text-sm text-[var(--dashboard-muted)]">
                  ارائه‌دهنده: <strong>{status.provider || "ثبت نشده"}</strong>
                </p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div className="rounded-2xl bg-[var(--dashboard-ink)] p-5 text-white">
                  <p className="text-xs text-white/60">نرخ استفاده‌شده</p>
                  <p className="mt-2 text-xl font-black">{formatToman(status.rate)}</p>
                </div>
                <DashboardButton
                  onClick={() => void run()}
                  disabled={running || status.status === "running"}
                >
                  {running ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  اجرای همگام‌سازی
                </DashboardButton>
              </div>
            </div>
            {error ? (
              <p
                role="alert"
                className="mt-6 flex gap-2 rounded-2xl bg-red-50 p-4 text-sm leading-7 text-red-700"
              >
                <TriangleAlert className="mt-1 h-4 w-4 shrink-0" />
                {error}
              </p>
            ) : null}
            {status.error ? (
              <p className="mt-6 flex gap-2 rounded-2xl bg-red-50 p-4 text-sm leading-7 text-red-700">
                <TriangleAlert className="mt-1 h-4 w-4 shrink-0" />
                {status.error}
              </p>
            ) : null}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Metric label="خدمات به‌روز شده" value={status.updated_services} />
            <Metric label="پکیج‌های به‌روز شده" value={status.updated_packages} />
            <Metric label="محصولات به‌روز شده" value={status.updated_products} />
          </div>
          <div className="dashboard-panel rounded-[2rem] p-6">
            <div className="flex items-center gap-3">
              <Database className="h-5 w-5 text-[var(--dashboard-accent)]" />
              <h2 className="font-black">ردپای اجرا</h2>
            </div>
            <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs text-[var(--dashboard-muted)]">شروع</dt>
                <dd className="mt-1 font-bold">{formatDate(status.started_at)}</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--dashboard-muted)]">پایان</dt>
                <dd className="mt-1 font-bold">{formatDate(status.finished_at)}</dd>
              </div>
            </dl>
            <p className="mt-6 rounded-2xl border border-dashed border-[var(--dashboard-line)] p-4 text-xs leading-7 text-[var(--dashboard-muted)]">
              اجرای دستی فقط قیمت‌های وب‌سایت و تاریخچه همین بخش را به‌روز می‌کند. اطلاعات مالی
              کلینیک تغییر نمی‌کند.
            </p>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="dashboard-panel rounded-[1.5rem] p-5">
      <p className="text-xs text-[var(--dashboard-muted)]">{label}</p>
      <p className="mt-3 text-2xl font-black">{value.toLocaleString("fa-IR")}</p>
    </div>
  );
}
