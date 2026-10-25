"use client";

import { Check, ImageUp, LoaderCircle, Pencil, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { dashboardApi, isApiError } from "@/lib/dashboard/api";
import type { SitePackage, SiteProduct, SiteService } from "@/lib/dashboard/types";
import { DashboardButton } from "./DashboardButton";
import { DashboardInput } from "./DashboardInput";

type Resource = SiteService | SiteProduct | SitePackage;
type Kind = "service" | "product" | "package";

interface FormState {
  name: string;
  slug: string;
  price: string;
  short_description: string;
  description: string;
  category: SiteService["category"];
  source_category: string;
  duration_label: string;
  image_url: string;
  source_url: string;
  is_from_price: boolean;
  tier: SitePackage["tier"];
  tagline: string;
  badge: string;
  free_service_count: string;
  original_price: string;
  sort_order: string;
  is_active: boolean;
  service_ids: number[];
}

function initialForm(kind: Kind, item?: Resource): FormState {
  return {
    name: item?.name ?? "",
    slug: item?.slug ?? "",
    price: item?.price ?? "",
    short_description: item && "short_description" in item ? item.short_description : "",
    description: item && "description" in item ? item.description : "",
    category: item && "category" in item ? item.category : "face",
    source_category: item && "source_category" in item ? item.source_category : "",
    duration_label: item && "duration_label" in item ? item.duration_label : "",
    image_url: item && "image_url" in item ? item.image_url : "",
    source_url: item && "source_url" in item ? item.source_url : "",
    is_from_price: item && "is_from_price" in item ? item.is_from_price : false,
    tier: item && "tier" in item ? item.tier : "base",
    tagline: item && "tagline" in item ? item.tagline : "",
    badge: item && "badge" in item ? item.badge : "",
    free_service_count:
      item && "free_service_count" in item ? String(item.free_service_count) : "0",
    original_price: item && "original_price" in item ? (item.original_price ?? "") : "",
    sort_order: item && "sort_order" in item ? String(item.sort_order) : "0",
    is_active: item && "is_active" in item ? item.is_active : true,
    service_ids: item && "services" in item ? item.services.map((service) => service.id) : [],
  };
}

export function CatalogEditor({
  kind,
  item,
  services = [],
  onSaved,
}: {
  kind: Kind;
  item?: Resource;
  services?: SiteService[];
  onSaved: (resource: Resource) => void;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(() => initialForm(kind, item));
  const [image, setImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const editing = Boolean(item);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", close);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", close);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  const show = () => {
    setForm(initialForm(kind, item));
    setImage(null);
    setError("");
    setOpen(true);
  };
  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.slug.trim() || (!editing && !form.price.trim())) {
      setError("نام، شناسه انگلیسی و قیمت اولیه را کامل کنید.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      let result: Resource;
      if (kind === "service") {
        const payload = {
          name: form.name.trim(),
          slug: form.slug.trim(),
          category: form.category,
          source_category: form.source_category,
          short_description: form.short_description,
          description: form.description,
          duration_label: form.duration_label,
          image_url: form.image_url,
          source_url: form.source_url,
          is_from_price: form.is_from_price,
          is_active: form.is_active,
          sort_order: Number(form.sort_order) || 0,
          ...(!editing ? { price: form.price } : {}),
        };
        result = editing
          ? await dashboardApi.updateService(item!.slug, payload)
          : await dashboardApi.createService({ ...payload, price: form.price });
        if (editing && image) result = await dashboardApi.uploadServiceImage(result.slug, image);
      } else if (kind === "product") {
        const payload = {
          name: form.name.trim(),
          slug: form.slug.trim(),
          short_description: form.short_description,
          image_url: form.image_url,
          source_url: form.source_url,
          is_active: form.is_active,
          sort_order: Number(form.sort_order) || 0,
          ...(!editing ? { price: form.price } : {}),
        };
        result = editing
          ? await dashboardApi.updateProduct(item!.slug, payload)
          : await dashboardApi.createProduct({ ...payload, price: form.price });
      } else {
        const payload = {
          name: form.name.trim(),
          slug: form.slug.trim(),
          tier: form.tier,
          tagline: form.tagline,
          badge: form.badge,
          free_service_count: Number(form.free_service_count) || 0,
          original_price: form.original_price.trim() || null,
          service_ids: form.service_ids,
          source_url: form.source_url,
          is_active: form.is_active,
          sort_order: Number(form.sort_order) || 0,
          ...(!editing ? { price: form.price } : {}),
        };
        result = editing
          ? await dashboardApi.updatePackage(item!.slug, payload)
          : await dashboardApi.createPackage({ ...payload, price: form.price });
      }
      onSaved(result);
      setOpen(false);
    } catch (caught) {
      setError(isApiError(caught) ? caught.message : "ذخیره اطلاعات انجام نشد.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <DashboardButton size="sm" variant={editing ? "secondary" : "primary"} onClick={show}>
        {editing ? <Pencil className="h-3.5 w-3.5" /> : <Plus className="h-4 w-4" />}
        {editing
          ? "ویرایش محتوا"
          : `افزودن ${kind === "service" ? "خدمت" : kind === "product" ? "محصول" : "پکیج"}`}
      </DashboardButton>
      {open ? (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-black/35 p-3 backdrop-blur-sm"
          onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label={editing ? "ویرایش محتوا" : "افزودن محتوا"}
            className="dashboard-panel max-h-[94dvh] w-full max-w-3xl overflow-y-auto rounded-[2rem] p-5 sm:p-7"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[var(--dashboard-accent)]">
                  {editing ? "ویرایش صفحه" : "مورد جدید"}
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  {editing ? item?.name : "ساخت محتوای سایت"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="dashboard-focus rounded-xl p-2"
                aria-label="بستن"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
              <Field
                label="نام"
                value={form.name}
                onChange={(value) => set("name", value)}
                required
              />
              <Field
                label="شناسه انگلیسی"
                value={form.slug}
                onChange={(value) => set("slug", value)}
                required
                disabled={editing}
                dir="ltr"
              />
              {!editing ? (
                <Field
                  label="قیمت اولیه (تومان)"
                  value={form.price}
                  onChange={(value) => set("price", value)}
                  required
                  inputMode="decimal"
                />
              ) : null}
              <Field
                label="ترتیب نمایش"
                value={form.sort_order}
                onChange={(value) => set("sort_order", value)}
                inputMode="numeric"
              />
              {kind === "service" ? (
                <>
                  <Select
                    label="دسته‌بندی"
                    value={form.category}
                    onChange={(value) => set("category", value as SiteService["category"])}
                    options={[
                      ["face", "صورت"],
                      ["skin", "پوست"],
                      ["hair", "مو"],
                      ["body", "بدن"],
                    ]}
                  />
                  <Field
                    label="دسته‌بندی منبع"
                    value={form.source_category}
                    onChange={(value) => set("source_category", value)}
                  />
                  <Field
                    label="مدت زمان"
                    value={form.duration_label}
                    onChange={(value) => set("duration_label", value)}
                  />
                  <Field
                    label="توضیح کوتاه"
                    value={form.short_description}
                    onChange={(value) => set("short_description", value)}
                  />
                  <div className="sm:col-span-2">
                    <TextArea
                      label="توضیحات کامل"
                      value={form.description}
                      onChange={(value) => set("description", value)}
                    />
                  </div>
                  <label className="block text-sm font-bold sm:col-span-2">
                    بارگذاری تصویر خدمت
                    <span className="mt-2 flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border border-dashed border-[var(--dashboard-line)] bg-white px-4 text-xs text-[var(--dashboard-muted)]">
                      <ImageUp className="h-4 w-4" />
                      {image?.name ?? "انتخاب JPEG، PNG یا WebP"}
                    </span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="sr-only"
                      onChange={(event) => setImage(event.target.files?.[0] ?? null)}
                      disabled={!editing}
                    />
                  </label>
                </>
              ) : null}
              {kind === "product" ? (
                <Field
                  label="توضیح کوتاه"
                  value={form.short_description}
                  onChange={(value) => set("short_description", value)}
                />
              ) : null}
              {kind === "package" ? (
                <>
                  <Select
                    label="سطح پکیج"
                    value={form.tier}
                    onChange={(value) => set("tier", value as SitePackage["tier"])}
                    options={[
                      ["base", "پایه"],
                      ["standard", "استاندارد"],
                      ["special", "ویژه"],
                    ]}
                  />
                  <Field
                    label="نشان"
                    value={form.badge}
                    onChange={(value) => set("badge", value)}
                  />
                  <Field
                    label="شعار کوتاه"
                    value={form.tagline}
                    onChange={(value) => set("tagline", value)}
                  />
                  <Field
                    label="تعداد خدمات هدیه"
                    value={form.free_service_count}
                    onChange={(value) => set("free_service_count", value)}
                    inputMode="numeric"
                  />
                  {!editing ? (
                    <Field
                      label="قیمت قبل از تخفیف"
                      value={form.original_price}
                      onChange={(value) => set("original_price", value)}
                      inputMode="decimal"
                    />
                  ) : null}
                  <fieldset className="rounded-2xl border border-[var(--dashboard-line)] bg-white/55 p-4 sm:col-span-2">
                    <legend className="px-2 text-sm font-bold">خدمات داخل پکیج</legend>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {services
                        .filter((service) => service.is_active)
                        .map((service) => (
                          <label
                            key={service.id}
                            className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm"
                          >
                            <input
                              type="checkbox"
                              checked={form.service_ids.includes(service.id)}
                              onChange={(event) =>
                                set(
                                  "service_ids",
                                  event.target.checked
                                    ? [...form.service_ids, service.id]
                                    : form.service_ids.filter((id) => id !== service.id)
                                )
                              }
                            />
                            {service.name}
                          </label>
                        ))}
                    </div>
                  </fieldset>
                </>
              ) : null}
              {kind !== "package" ? (
                <Field
                  label="آدرس تصویر"
                  value={form.image_url}
                  onChange={(value) => set("image_url", value)}
                  type="url"
                  dir="ltr"
                />
              ) : null}
              <Field
                label="آدرس منبع"
                value={form.source_url}
                onChange={(value) => set("source_url", value)}
                type="url"
                dir="ltr"
              />
              <label className="flex items-center gap-3 rounded-xl border border-[var(--dashboard-line)] bg-white/55 px-4 py-3 text-sm font-bold">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(event) => set("is_active", event.target.checked)}
                />
                نمایش در سایت
              </label>
              {kind === "service" ? (
                <label className="flex items-center gap-3 rounded-xl border border-[var(--dashboard-line)] bg-white/55 px-4 py-3 text-sm font-bold">
                  <input
                    type="checkbox"
                    checked={form.is_from_price}
                    onChange={(event) => set("is_from_price", event.target.checked)}
                  />
                  نمایش «از این قیمت»
                </label>
              ) : null}
              {error ? (
                <p
                  role="alert"
                  className="rounded-xl bg-red-50 p-3 text-xs leading-6 font-semibold text-red-700 sm:col-span-2"
                >
                  {error}
                </p>
              ) : null}
              <div className="flex justify-end gap-2 pt-2 sm:col-span-2">
                <DashboardButton variant="ghost" onClick={() => setOpen(false)}>
                  انصراف
                </DashboardButton>
                <DashboardButton type="submit" disabled={saving}>
                  {saving ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  ذخیره
                </DashboardButton>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </>
  );
}

function Field({
  label,
  onChange,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  label: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-bold">
      {label}
      <DashboardInput
        {...props}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-bold">
      {label}
      <textarea
        rows={5}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="dashboard-focus mt-2 w-full rounded-xl border border-[var(--dashboard-line)] bg-white px-3 py-3 text-sm outline-none focus:border-[var(--dashboard-accent)]"
      />
    </label>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[][];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-bold">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="dashboard-focus mt-2 min-h-11 w-full rounded-xl border border-[var(--dashboard-line)] bg-white px-3 text-sm outline-none"
      >
        {options.map(([key, text]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}
