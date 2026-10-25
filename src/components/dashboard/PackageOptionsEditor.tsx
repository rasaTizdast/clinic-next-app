"use client";

import { Check, ChevronDown, ChevronUp, CirclePlus, LoaderCircle, Pencil, X } from "lucide-react";
import { useState } from "react";
import { DashboardButton } from "./DashboardButton";
import { DashboardInput } from "./DashboardInput";
import { dashboardApi, isApiError } from "@/lib/dashboard/api";
import { formatToman, formatUsd } from "@/lib/dashboard/format";
import type { SitePackage, SitePackagePriceOption } from "@/lib/dashboard/types";

export function PackageOptionsEditor({
  item,
  onChange,
}: {
  item: SitePackage;
  onChange: (options: SitePackagePriceOption[]) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  const addOption = async (payload: {
    label: string;
    session_count: number | null;
    gift_session_count: number;
    price: string;
    sort_order: number;
  }) => {
    setError("");
    try {
      const created = await dashboardApi.createPackagePriceOption({
        package: item.id,
        ...payload,
        is_active: true,
      });
      onChange([...item.price_options, created].sort((a, b) => a.sort_order - b.sort_order));
      setAdding(false);
      setExpanded(true);
    } catch (caught) {
      setError(isApiError(caught) ? caught.message : "افزودن گزینه قیمت انجام نشد.");
    }
  };

  return (
    <section className="rounded-2xl border border-[var(--dashboard-line)] bg-white/45 p-3 sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
          className="dashboard-focus inline-flex min-h-10 items-center gap-2 rounded-xl px-2 text-xs font-bold"
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          گزینه‌های قیمت
          <span className="rounded-full bg-[var(--dashboard-ink)]/7 px-2 py-1 text-[10px] text-[var(--dashboard-muted)]">
            {item.price_options.length.toLocaleString("fa-IR")}
          </span>
        </button>
        <DashboardButton size="sm" variant="secondary" onClick={() => setAdding((value) => !value)}>
          {adding ? <X className="h-3.5 w-3.5" /> : <CirclePlus className="h-3.5 w-3.5" />}
          {adding ? "بستن فرم" : "افزودن گزینه"}
        </DashboardButton>
      </div>
      {expanded && item.price_options.length > 0 && (
        <div className="mt-3 space-y-2">
          {item.price_options.map((option) => (
            <OptionRow
              key={option.id}
              option={option}
              onSaved={(next) =>
                onChange(
                  item.price_options.map((current) => (current.id === next.id ? next : current))
                )
              }
            />
          ))}
        </div>
      )}
      {expanded && item.price_options.length === 0 && !adding && (
        <p className="mt-3 rounded-xl border border-dashed border-[var(--dashboard-line)] p-3 text-xs text-[var(--dashboard-muted)]">
          هنوز گزینه قیمتی برای این پکیج ثبت نشده است.
        </p>
      )}
      {adding && <AddOptionForm onAdd={addOption} onCancel={() => setAdding(false)} />}
      {error && (
        <p role="alert" className="mt-3 rounded-xl bg-red-50 p-3 text-xs leading-6 text-red-700">
          {error}
        </p>
      )}
    </section>
  );
}

function OptionRow({
  option,
  onSaved,
}: {
  option: SitePackagePriceOption;
  onSaved: (option: SitePackagePriceOption) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [currency, setCurrency] = useState<"toman" | "usd">("toman");
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    if (!value.trim() || !Number.isFinite(Number(value)) || Number(value) < 0) {
      setError("قیمت باید عددی معتبر و صفر یا بیشتر باشد.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const next = await dashboardApi.updatePackagePriceOption(
        option.id,
        currency === "toman" ? { price: value } : { price_usd: value }
      );
      onSaved(next);
      setEditing(false);
    } catch (caught) {
      setError(isApiError(caught) ? caught.message : "ذخیره قیمت انجام نشد.");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async () => {
    setSaving(true);
    setError("");
    try {
      onSaved(
        await dashboardApi.updatePackagePriceOption(option.id, { is_active: !option.is_active })
      );
    } catch (caught) {
      setError(isApiError(caught) ? caught.message : "تغییر وضعیت انجام نشد.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <article className="grid gap-3 rounded-xl border border-[var(--dashboard-line)] bg-white/75 p-3 sm:grid-cols-[minmax(0,1fr)_minmax(13rem,.7fr)] sm:items-center">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <strong className="text-xs">{option.label}</strong>
          {!option.is_active && (
            <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] text-slate-600">
              غیرفعال در سایت
            </span>
          )}
        </div>
        <p className="mt-1 text-[11px] text-[var(--dashboard-muted)]">
          {option.session_count
            ? `${option.session_count.toLocaleString("fa-IR")} جلسه`
            : "بدون تعداد جلسه"}
          {option.gift_session_count > 0 &&
            ` · ${option.gift_session_count.toLocaleString("fa-IR")} جلسه هدیه`}
        </p>
        {error && (
          <p role="alert" className="mt-2 text-[11px] leading-5 text-red-700">
            {error}
          </p>
        )}
      </div>
      {editing ? (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1 text-[11px]">
            {(["toman", "usd"] as const).map((unit) => (
              <button
                key={unit}
                type="button"
                onClick={() => setCurrency(unit)}
                className={`rounded-md py-1.5 font-bold ${currency === unit ? "bg-white shadow-sm" : "text-[var(--dashboard-muted)]"}`}
              >
                {unit === "toman" ? "تومان" : "دلار"}
              </button>
            ))}
          </div>
          <DashboardInput
            aria-label={`قیمت ${option.label}`}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            inputMode="decimal"
          />
          <div className="flex gap-2">
            <DashboardButton size="sm" onClick={save} disabled={saving}>
              {saving ? (
                <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Check className="h-3.5 w-3.5" />
              )}
              ذخیره
            </DashboardButton>
            <DashboardButton
              size="sm"
              variant="ghost"
              onClick={() => setEditing(false)}
              disabled={saving}
            >
              انصراف
            </DashboardButton>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-2 sm:justify-end">
          <div className="sm:text-left">
            <p className="text-xs font-black">{formatToman(option.price)}</p>
            <p className="mt-1 text-[10px] text-[var(--dashboard-muted)]">
              {formatUsd(option.price_usd)}
            </p>
          </div>
          <DashboardButton
            size="sm"
            variant="secondary"
            onClick={() => {
              setValue(currency === "toman" ? option.price : option.price_usd);
              setEditing(true);
            }}
          >
            <Pencil className="h-3 w-3" />
            ویرایش
          </DashboardButton>
          <DashboardButton size="sm" variant="ghost" onClick={toggleActive} disabled={saving}>
            {saving ? <LoaderCircle className="h-3 w-3 animate-spin" /> : null}
            {option.is_active ? "پنهان‌کردن" : "نمایش‌دادن"}
          </DashboardButton>
        </div>
      )}
    </article>
  );
}

function AddOptionForm({
  onAdd,
  onCancel,
}: {
  onAdd: (payload: {
    label: string;
    session_count: number | null;
    gift_session_count: number;
    price: string;
    sort_order: number;
  }) => Promise<void>;
  onCancel: () => void;
}) {
  const [label, setLabel] = useState("");
  const [sessions, setSessions] = useState("");
  const [gifts, setGifts] = useState("0");
  const [price, setPrice] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!Number.isFinite(Number(price)) || Number(price) < 0) {
      setError("قیمت را به‌صورت عدد معتبر وارد کنید.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await onAdd({
        label: label.trim(),
        session_count: sessions ? Number(sessions) : null,
        gift_session_count: Number(gifts) || 0,
        price,
        sort_order: 0,
      });
    } catch (caught) {
      setError(isApiError(caught) ? caught.message : "افزودن گزینه قیمت انجام نشد.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="mt-3 grid gap-3 rounded-xl border border-[var(--dashboard-accent)]/30 bg-[var(--dashboard-accent)]/5 p-3 sm:grid-cols-2"
    >
      <label className="text-xs font-bold">
        عنوان گزینه
        <DashboardInput
          required
          className="mt-1"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          placeholder="مثلاً ۶ جلسه + ۱ هدیه"
        />
      </label>
      <label className="text-xs font-bold">
        قیمت (تومان)
        <DashboardInput
          required
          inputMode="numeric"
          className="mt-1"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </label>
      <label className="text-xs font-bold">
        تعداد جلسه
        <DashboardInput
          type="number"
          min="0"
          className="mt-1"
          value={sessions}
          onChange={(event) => setSessions(event.target.value)}
        />
      </label>
      <label className="text-xs font-bold">
        جلسه هدیه
        <DashboardInput
          type="number"
          min="0"
          className="mt-1"
          value={gifts}
          onChange={(event) => setGifts(event.target.value)}
        />
      </label>
      {error && (
        <p role="alert" className="text-xs leading-5 text-red-700 sm:col-span-2">
          {error}
        </p>
      )}
      <div className="flex gap-2 sm:col-span-2">
        <DashboardButton type="submit" disabled={saving}>
          {saving ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          افزودن گزینه
        </DashboardButton>
        <DashboardButton variant="ghost" onClick={onCancel} disabled={saving}>
          انصراف
        </DashboardButton>
      </div>
    </form>
  );
}
