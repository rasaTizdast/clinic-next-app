"use client";

import { Eye, EyeOff, ExternalLink, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { CatalogEditor } from "./CatalogEditor";
import { DashboardButton } from "./DashboardButton";
import { PriceEditor } from "./PriceEditor";
import { PackageOptionsEditor } from "./PackageOptionsEditor";
import { dashboardApi, isApiError } from "@/lib/dashboard/api";
import { categoryLabels } from "@/lib/dashboard/format";
import type { SitePackage, SiteProduct, SiteService } from "@/lib/dashboard/types";

type Resource = SiteService | SiteProduct | SitePackage;
type Kind = "service" | "product" | "package";

export function CatalogTable({
  items,
  kind,
  services = [],
  onChange,
}: {
  items: Resource[];
  kind: Kind;
  services?: SiteService[];
  onChange: (item: Resource) => void;
}) {
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const visible = useMemo(
    () =>
      items.filter((item) =>
        `${item.name} ${item.slug}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      ),
    [items, query]
  );
  const toggle = async (item: Resource) => {
    setBusyId(item.id);
    setError("");
    try {
      const payload = { is_active: !item.is_active };
      const next =
        kind === "service"
          ? await dashboardApi.updateService(item.slug, payload)
          : kind === "product"
            ? await dashboardApi.updateProduct(item.slug, payload)
            : await dashboardApi.updatePackage(item.slug, payload);
      onChange(next);
    } catch (caught) {
      setError(isApiError(caught) ? caught.message : "تغییر وضعیت انجام نشد.");
    } finally {
      setBusyId(null);
    }
  };
  return (
    <div className="dashboard-panel overflow-hidden rounded-[2rem]">
      <div className="flex flex-col gap-4 border-b border-[var(--dashboard-line)] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-xs text-[var(--dashboard-muted)]">
            {visible.length.toLocaleString("fa-IR")} مورد نمایش داده می‌شود
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="dashboard-focus flex min-h-11 items-center gap-2 rounded-xl border border-[var(--dashboard-line)] bg-white/70 px-3 text-sm sm:w-72">
            <Search className="h-4 w-4 text-[var(--dashboard-muted)]" />
            <span className="sr-only">جست‌وجو</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="جست‌وجو در کاتالوگ"
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[var(--dashboard-muted)]"
            />
          </label>
          <CatalogEditor kind={kind} services={services} onSaved={onChange} />
        </div>
      </div>
      {error ? (
        <p
          role="alert"
          className="mx-5 mt-4 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700"
        >
          {error}
        </p>
      ) : null}
      {visible.length === 0 ? (
        <div className="p-8 text-center text-sm text-[var(--dashboard-muted)]">
          موردی با این جست‌وجو پیدا نشد.
        </div>
      ) : (
        <div className="divide-y divide-[var(--dashboard-line)]">
          {visible.map((item) => (
            <article
              key={item.id}
              className={`grid gap-4 p-5 sm:p-6 ${item.is_active ? "" : "bg-black/[.025] opacity-70"}`}
            >
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1.1fr)_minmax(16rem,.9fr)] sm:items-center">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="truncate font-black">{item.name}</h2>
                    {"category" in item && (
                      <span className="rounded-full bg-[var(--dashboard-accent)]/10 px-2.5 py-1 text-[11px] font-bold text-[var(--dashboard-accent)]">
                        {categoryLabels[item.category]}
                      </span>
                    )}
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${item.is_active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
                    >
                      {item.is_active ? "فعال" : "پنهان"}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-xs text-[var(--dashboard-muted)]">
                    /{item.slug}
                  </p>
                  {"services" in item && (
                    <p className="mt-3 text-xs leading-6 text-[var(--dashboard-muted)]">
                      {item.services.length.toLocaleString("fa-IR")} خدمت در این پکیج ·{" "}
                      {item.price_options.length.toLocaleString("fa-IR")} گزینه قیمت
                    </p>
                  )}
                  {"source_url" in item && item.source_url && (
                    <a
                      href={item.source_url}
                      target="_blank"
                      rel="noreferrer"
                      className="dashboard-focus mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--dashboard-accent)]"
                    >
                      مشاهده منبع <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <CatalogEditor kind={kind} item={item} services={services} onSaved={onChange} />
                    <DashboardButton
                      size="sm"
                      variant="ghost"
                      disabled={busyId === item.id}
                      onClick={() => void toggle(item)}
                    >
                      {item.is_active ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                      {item.is_active ? "پنهان‌کردن" : "نمایش دوباره"}
                    </DashboardButton>
                  </div>
                </div>
                <PriceEditor resource={item} kind={kind} onSaved={onChange} />
              </div>
              {"price_options" in item && (
                <PackageOptionsEditor
                  item={item}
                  onChange={(price_options) => onChange({ ...item, price_options })}
                />
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
