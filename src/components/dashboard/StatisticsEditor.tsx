"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { DashboardButton } from "./DashboardButton";
import { DashboardInput } from "./DashboardInput";

export function StatisticsEditor({
  value,
  onChange,
}: {
  value: Record<string, string | number>;
  onChange: (value: Record<string, string | number>) => void;
}) {
  const [label, setLabel] = useState("");
  const [stat, setStat] = useState("");
  const [error, setError] = useState("");
  const rows = Object.entries(value);

  const add = () => {
    const key = label.trim();
    if (!key || !stat.trim()) {
      setError("عنوان و مقدار هر دو لازم‌اند.");
      return;
    }
    if (Object.hasOwn(value, key)) {
      setError("این عنوان از قبل وجود دارد.");
      return;
    }
    onChange({ ...value, [key]: stat.trim() });
    setLabel("");
    setStat("");
    setError("");
  };

  return (
    <section className="rounded-2xl border border-[var(--dashboard-line)] bg-white/50 p-4 sm:p-5">
      <div className="mb-4">
        <h2 className="text-sm font-black">آمار نمایش‌داده‌شده در سایت</h2>
        <p className="mt-1 text-xs leading-6 text-[var(--dashboard-muted)]">
          عنوان و مقدار هر شاخص را ویرایش یا شاخص تازه‌ای اضافه کنید.
        </p>
      </div>
      {rows.length > 0 && (
        <div className="space-y-2">
          {rows.map(([key, current]) => (
            <div
              key={key}
              className="grid gap-2 rounded-xl border border-[var(--dashboard-line)] bg-white p-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-center"
            >
              <label className="text-[11px] font-bold">
                عنوان
                <DashboardInput
                  aria-label={`عنوان شاخص ${key}`}
                  className="mt-1"
                  value={key}
                  onChange={(event) => {
                    const nextKey = event.target.value;
                    if (!nextKey.trim() || (nextKey !== key && Object.hasOwn(value, nextKey)))
                      return;
                    const next = Object.fromEntries(
                      rows.map(([oldKey, oldValue]) => [
                        oldKey === key ? nextKey : oldKey,
                        oldValue,
                      ])
                    );
                    onChange(next);
                  }}
                />
              </label>
              <label className="text-[11px] font-bold">
                مقدار
                <DashboardInput
                  aria-label={`مقدار شاخص ${key}`}
                  className="mt-1"
                  value={String(current)}
                  onChange={(event) => {
                    const nextValue =
                      typeof current === "number" && event.target.value !== ""
                        ? Number(event.target.value)
                        : event.target.value;
                    onChange({ ...value, [key]: nextValue });
                  }}
                />
              </label>
              <DashboardButton
                aria-label={`حذف شاخص ${key}`}
                variant="ghost"
                size="sm"
                className="text-red-700 hover:bg-red-50"
                onClick={() => {
                  const next = { ...value };
                  delete next[key];
                  onChange(next);
                }}
              >
                <Trash2 className="h-4 w-4" />
                حذف
              </DashboardButton>
            </div>
          ))}
        </div>
      )}
      <div className="mt-3 grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end">
        <label className="text-[11px] font-bold">
          عنوان تازه
          <DashboardInput
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            className="mt-1"
            placeholder="مثلاً رضایت مراجعان"
          />
        </label>
        <label className="text-[11px] font-bold">
          مقدار
          <DashboardInput
            value={stat}
            onChange={(event) => setStat(event.target.value)}
            className="mt-1"
            placeholder="مثلاً ۹۸٪"
          />
        </label>
        <DashboardButton variant="secondary" onClick={add}>
          <Plus className="h-4 w-4" />
          افزودن شاخص
        </DashboardButton>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs text-red-700">
          {error}
        </p>
      )}
    </section>
  );
}
