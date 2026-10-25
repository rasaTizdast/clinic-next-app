"use client";

import { Check, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { dashboardApi, isApiError } from "@/lib/dashboard/api";
import type { SiteSettings } from "@/lib/dashboard/types";
import { DashboardButton } from "./DashboardButton";
import { DashboardInput } from "./DashboardInput";
import { StatisticsEditor } from "./StatisticsEditor";

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [form, setForm] = useState(initial);
  const [phones, setPhones] = useState(initial.phone_numbers.join("\n"));
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const set = (key: keyof SiteSettings, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));
  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setNotice("");
    setError("");
    try {
      const next = await dashboardApi.updateSettings({
        address: form.address,
        phone_numbers: phones
          .split(/\r?\n|,/)
          .map((phone) => phone.trim())
          .filter(Boolean),
        working_hours: form.working_hours,
        about_title: form.about_title,
        about_text: form.about_text,
        hero_image_url: form.hero_image_url,
        about_image_url: form.about_image_url,
        statistics: form.statistics,
      });
      setForm(next);
      setPhones(next.phone_numbers.join("\n"));
      setNotice("تنظیمات با موفقیت ذخیره شد.");
    } catch (caught) {
      setError(isApiError(caught) ? caught.message : "ذخیره تنظیمات انجام نشد.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <form onSubmit={save} className="dashboard-panel rounded-[2rem] p-5 sm:p-7">
      <div className="grid gap-5 lg:grid-cols-2">
        <Field
          label="آدرس کلینیک"
          value={form.address}
          onChange={(value) => set("address", value)}
          multiline
        />
        <Field
          label="شماره‌های تماس"
          value={phones}
          onChange={setPhones}
          multiline
          hint="هر شماره را در یک خط بنویسید."
        />
        <Field
          label="ساعات کاری"
          value={form.working_hours}
          onChange={(value) => set("working_hours", value)}
        />
        <Field
          label="عنوان درباره ما"
          value={form.about_title}
          onChange={(value) => set("about_title", value)}
        />
        <Field
          label="آدرس تصویر هیرو"
          value={form.hero_image_url}
          onChange={(value) => set("hero_image_url", value)}
          type="url"
        />
        <Field
          label="آدرس تصویر درباره ما"
          value={form.about_image_url}
          onChange={(value) => set("about_image_url", value)}
          type="url"
        />
        <div className="lg:col-span-2">
          <Field
            label="متن درباره ما"
            value={form.about_text}
            onChange={(value) => set("about_text", value)}
            multiline
          />
        </div>
        <div className="lg:col-span-2">
          <StatisticsEditor
            value={form.statistics}
            onChange={(statistics) => setForm((current) => ({ ...current, statistics }))}
          />
        </div>
      </div>
      {error && (
        <p
          role="alert"
          className="mt-5 rounded-xl bg-red-50 px-3 py-3 text-xs leading-6 font-semibold text-red-700"
        >
          {error}
        </p>
      )}
      {notice && (
        <p
          role="status"
          className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-3 text-xs font-semibold text-emerald-700"
        >
          <Check className="h-4 w-4" />
          {notice}
        </p>
      )}
      <div className="mt-6 flex justify-end">
        <DashboardButton type="submit" size="lg" disabled={saving}>
          {saving ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          ذخیره تغییرات
        </DashboardButton>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
  type = "text",
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  type?: string;
  hint?: string;
}) {
  const className =
    "dashboard-focus mt-2 w-full rounded-xl border border-[var(--dashboard-line)] bg-white px-3 py-3 text-sm outline-none transition focus:border-[var(--dashboard-accent)]";
  return (
    <label className="block text-sm font-bold">
      {label}
      {multiline ? (
        <textarea
          rows={4}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={className}
        />
      ) : (
        <DashboardInput
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-2"
        />
      )}
      {hint && (
        <span className="mt-1 block text-[11px] font-normal text-[var(--dashboard-muted)]">
          {hint}
        </span>
      )}
    </label>
  );
}
