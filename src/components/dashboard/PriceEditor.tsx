"use client";

import { Check, LoaderCircle, Pencil, X } from "lucide-react";
import { useState } from "react";
import { DashboardButton } from "./DashboardButton";
import { DashboardInput } from "./DashboardInput";
import { dashboardApi, isApiError } from "@/lib/dashboard/api";
import { formatToman, formatUsd } from "@/lib/dashboard/format";
import type { SitePackage, SiteProduct, SiteService } from "@/lib/dashboard/types";

type Resource = SiteService | SiteProduct | SitePackage;
type PricePayload = {
  price?: string;
  price_usd?: string;
  original_price?: string | null;
  original_price_usd?: string | null;
};

export function PriceEditor({
  resource,
  kind,
  onSaved,
}: {
  resource: Resource;
  kind: "service" | "product" | "package";
  onSaved: (next: Resource) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [currency, setCurrency] = useState<"toman" | "usd">("toman");
  const [value, setValue] = useState("");
  const [original, setOriginal] = useState("");
  const [clearOriginal, setClearOriginal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const isPackage = kind === "package";
  const begin = () => {
    setValue(currency === "toman" ? resource.price : resource.price_usd);
    if (isPackage) setOriginal((resource as SitePackage).original_price ?? "");
    setClearOriginal(false);
    setError("");
    setEditing(true);
  };
  const save = async () => {
    if (!value.trim() || !Number.isFinite(Number(value)) || Number(value) < 0) {
      setError("یک قیمت معتبر وارد کنید.");
      return;
    }
    setSaving(true);
    setError("");
    const payload: PricePayload = currency === "toman" ? { price: value } : { price_usd: value };
    if (isPackage && clearOriginal) payload.original_price = null;
    else if (isPackage && original.trim()) payload.original_price = original;
    try {
      const next =
        kind === "service"
          ? await dashboardApi.updateServicePrice(resource.slug, payload)
          : kind === "product"
            ? await dashboardApi.updateProductPrice(resource.slug, payload)
            : await dashboardApi.updatePackagePrice(resource.slug, payload);
      onSaved(next);
      setEditing(false);
    } catch (caught) {
      setError(isApiError(caught) ? caught.message : "ذخیره قیمت انجام نشد.");
    } finally {
      setSaving(false);
    }
  };
  if (!editing)
    return (
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-bold">{formatToman(resource.price)}</p>
          <p className="mt-1 text-xs text-[var(--dashboard-muted)]">
            مبنای دلاری: {formatUsd(resource.price_usd)}
          </p>
        </div>
        <DashboardButton size="sm" variant="secondary" onClick={begin}>
          <Pencil className="h-3.5 w-3.5" />
          ویرایش
        </DashboardButton>
      </div>
    );
  return (
    <div className="rounded-2xl border border-[var(--dashboard-accent)]/40 bg-[var(--dashboard-accent)]/5 p-3">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-bold">قیمت جدید</p>
        <button
          type="button"
          className="dashboard-focus rounded-lg p-1"
          onClick={() => setEditing(false)}
          aria-label="لغو"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="mb-2 grid grid-cols-2 gap-1 rounded-xl bg-white/70 p-1 text-xs">
        <button
          type="button"
          className={`rounded-lg py-2 font-bold ${currency === "toman" ? "bg-[var(--dashboard-ink)] text-white" : "text-[var(--dashboard-muted)]"}`}
          onClick={() => setCurrency("toman")}
        >
          تومان
        </button>
        <button
          type="button"
          className={`rounded-lg py-2 font-bold ${currency === "usd" ? "bg-[var(--dashboard-ink)] text-white" : "text-[var(--dashboard-muted)]"}`}
          onClick={() => setCurrency("usd")}
        >
          دلار
        </button>
      </div>
      <label className="block text-xs font-semibold text-[var(--dashboard-muted)]">
        {currency === "toman" ? "قیمت به تومان" : "قیمت پایه به دلار"}
        <DashboardInput
          value={value}
          onChange={(event) => setValue(event.target.value)}
          inputMode="decimal"
          className="mt-1"
        />
      </label>
      {isPackage && (
        <div className="mt-2">
          <label className="block text-xs font-semibold text-[var(--dashboard-muted)]">
            قیمت قبل از تخفیف (تومان)
            <DashboardInput
              value={original}
              onChange={(event) => {
                setOriginal(event.target.value);
                setClearOriginal(false);
              }}
              inputMode="decimal"
              className="mt-1"
            />
          </label>
          {(resource as SitePackage).original_price !== null && (
            <button
              type="button"
              onClick={() => {
                setOriginal("");
                setClearOriginal(true);
              }}
              className="dashboard-focus mt-2 rounded-lg px-2 py-1 text-[11px] font-semibold text-red-700"
            >
              حذف قیمت قبل از تخفیف
            </button>
          )}
        </div>
      )}
      <p className="mt-2 text-[11px] leading-5 text-[var(--dashboard-muted)]">
        نرخ تبدیل و قیمت جفت‌شده توسط بک‌اند محاسبه می‌شود.
      </p>
      {error && (
        <p role="alert" className="mt-2 text-xs font-semibold text-red-700">
          {error}
        </p>
      )}
      <DashboardButton onClick={save} disabled={saving} className="mt-3 w-full rounded-xl text-xs">
        {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
        ذخیره قیمت
      </DashboardButton>
    </div>
  );
}
