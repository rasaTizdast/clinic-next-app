"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Boxes,
  ClipboardList,
  Package,
  RefreshCw,
  Settings2,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ResourceState } from "@/components/dashboard/ResourceState";
import { dashboardApi, isApiError } from "@/lib/dashboard/api";
import { formatDate } from "@/lib/dashboard/format";
import type { PriceSyncStatus, SitePackage, SiteProduct, SiteService } from "@/lib/dashboard/types";

export default function DashboardOverviewPage() {
  const [data, setData] = useState<{
    services: SiteService[];
    packages: SitePackage[];
    products: SiteProduct[];
    sync: PriceSyncStatus | null;
  } | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    Promise.all([
      dashboardApi.services(),
      dashboardApi.packages(),
      dashboardApi.products(),
      dashboardApi.syncStatus().catch(() => null),
    ])
      .then(([services, packages, products, sync]) =>
        setData({ services, packages, products, sync })
      )
      .catch((caught) =>
        setError(isApiError(caught) ? caught.message : "اطلاعات داشبورد دریافت نشد.")
      );
  }, []);
  return (
    <DashboardShell
      eyebrow="نمای کلی"
      title="اتاق مدیریت وب‌سایت"
      description="وضعیت کاتالوگ و محتوای قابل مدیریت سایت را از یک نقطه ببینید."
    >
      {error ? (
        <ResourceState kind="error" message={error} />
      ) : !data ? (
        <ResourceState kind="loading" />
      ) : (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Stat
              icon={ClipboardList}
              label="خدمات فعال"
              value={data.services.length}
              tone="rose"
            />
            <Stat icon={Package} label="پکیج‌های سایت" value={data.packages.length} tone="ink" />
            <Stat icon={Boxes} label="محصولات" value={data.products.length} tone="sand" />
            <Stat
              icon={RefreshCw}
              label="آخرین همگام‌سازی"
              value={
                data.sync
                  ? data.sync.status === "succeeded"
                    ? "موفق"
                    : data.sync.status === "failed"
                      ? "ناموفق"
                      : "در حال اجرا"
                  : "ثبت نشده"
              }
              tone="olive"
            />
          </div>
          <div className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
            <section className="dashboard-panel rounded-[2rem] p-6 sm:p-7">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-[var(--dashboard-accent)]">رادار محتوا</p>
                  <h2 className="mt-2 text-xl font-black">امروز روی چه چیزی تمرکز کنیم؟</h2>
                </div>
                <span className="rounded-full bg-[var(--dashboard-ink)] px-3 py-2 text-[11px] font-bold text-white">
                  زنده
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <Quick
                  href="/site-panel/services"
                  icon={ClipboardList}
                  title="قیمت خدمات"
                  text="قیمت‌های به‌روز سایت را بررسی کن"
                />
                <Quick
                  href="/site-panel/packages"
                  icon={Package}
                  title="پکیج‌ها"
                  text="تخفیف‌ها و گزینه‌ها را ببین"
                />
                <Quick
                  href="/site-panel/settings"
                  icon={Settings2}
                  title="اطلاعات سایت"
                  text="آدرس و ساعات کاری را تنظیم کن"
                />
              </div>
            </section>
            <section className="dashboard-panel rounded-[2rem] p-6 sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-[var(--dashboard-accent)]/10 p-2.5 text-[var(--dashboard-accent)]">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-black">همگام‌سازی قیمت</h2>
                  <p className="mt-1 text-xs text-[var(--dashboard-muted)]">آخرین وضعیت ثبت‌شده</p>
                </div>
              </div>
              {data.sync ? (
                <>
                  <p className="text-2xl font-black">
                    {data.sync.rate
                      ? `${Number(data.sync.rate).toLocaleString("fa-IR")} تومان`
                      : "—"}
                  </p>
                  <p className="mt-2 text-xs text-[var(--dashboard-muted)]">
                    {formatDate(data.sync.finished_at ?? data.sync.started_at)}
                  </p>
                  {data.sync.error && (
                    <p className="mt-4 flex gap-2 rounded-xl bg-red-50 p-3 text-xs leading-6 text-red-700">
                      <TriangleAlert className="mt-1 h-4 w-4 shrink-0" />
                      {data.sync.error}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm leading-7 text-[var(--dashboard-muted)]">
                  هنوز اجرای همگام‌سازی در سرور ثبت نشده است.
                </p>
              )}
              <Link
                href="/site-panel/sync"
                className="dashboard-focus mt-5 inline-flex items-center gap-2 rounded-xl text-xs font-bold text-[var(--dashboard-accent)]"
              >
                جزئیات سلامت <ArrowLeft className="h-4 w-4" />
              </Link>
            </section>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof ClipboardList;
  label: string;
  value: string | number;
  tone: string;
}) {
  return (
    <div className="dashboard-panel rounded-[1.5rem] p-5">
      <div
        className={`mb-6 flex h-10 w-10 items-center justify-center rounded-xl ${tone === "ink" ? "bg-[var(--dashboard-ink)] text-white" : "bg-[var(--dashboard-accent)]/10 text-[var(--dashboard-accent)]"}`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-xs text-[var(--dashboard-muted)]">{label}</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  );
}
function Quick({
  href,
  icon: Icon,
  title,
  text,
}: {
  href: string;
  icon: typeof ClipboardList;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="dashboard-focus rounded-2xl border border-[var(--dashboard-line)] bg-white/55 p-4 transition hover:-translate-y-1 hover:bg-white"
    >
      <Icon className="mb-8 h-5 w-5 text-[var(--dashboard-accent)]" />
      <p className="font-bold">{title}</p>
      <p className="mt-1 text-xs leading-6 text-[var(--dashboard-muted)]">{text}</p>
    </Link>
  );
}
