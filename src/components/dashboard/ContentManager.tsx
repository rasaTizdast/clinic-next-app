"use client";

import { Check, Eye, EyeOff, LoaderCircle, Pencil, Plus, Quote, UserRound, X } from "lucide-react";
import { useState } from "react";
import { dashboardApi, isApiError } from "@/lib/dashboard/api";
import type { TeamMember, Testimonial } from "@/lib/dashboard/types";
import { DashboardButton } from "./DashboardButton";
import { DashboardInput } from "./DashboardInput";

export function ContentManager({
  initialTeam,
  initialTestimonials,
}: {
  initialTeam: TeamMember[];
  initialTestimonials: Testimonial[];
}) {
  const [team, setTeam] = useState(initialTeam);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [notice, setNotice] = useState("");
  const updateTeam = (next: TeamMember) =>
    setTeam((current) =>
      current.some((item) => item.id === next.id)
        ? current.map((item) => (item.id === next.id ? next : item))
        : [next, ...current]
    );
  const updateTestimonial = (next: Testimonial) =>
    setTestimonials((current) =>
      current.some((item) => item.id === next.id)
        ? current.map((item) => (item.id === next.id ? next : item))
        : [next, ...current]
    );
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <ResourceSection
        title="اعضای تیم"
        subtitle={`${team.length.toLocaleString("fa-IR")} پروفایل`}
        icon={<UserRound className="h-5 w-5" />}
        action={
          <TeamEditor
            onSaved={(next) => {
              updateTeam(next);
              setNotice("پروفایل تیم ذخیره شد.");
            }}
          />
        }
      >
        {team.map((item) => (
          <ContentCard
            key={item.id}
            title={item.name}
            subtitle={item.role}
            body={item.bio}
            active={item.is_active}
            image={item.image_url}
            actions={
              <>
                <TeamEditor
                  item={item}
                  onSaved={(next) => {
                    updateTeam(next);
                    setNotice("پروفایل تیم ذخیره شد.");
                  }}
                />
                <Visibility
                  active={item.is_active}
                  busyLabel="پروفایل"
                  onToggle={async () =>
                    updateTeam(
                      await dashboardApi.updateTeamMember(item.id, { is_active: !item.is_active })
                    )
                  }
                />
              </>
            }
          />
        ))}
      </ResourceSection>
      <ResourceSection
        title="دیدگاه مراجعان"
        subtitle={`${testimonials.length.toLocaleString("fa-IR")} دیدگاه`}
        icon={<Quote className="h-5 w-5" />}
        action={
          <TestimonialEditor
            onSaved={(next) => {
              updateTestimonial(next);
              setNotice("دیدگاه ذخیره شد.");
            }}
          />
        }
      >
        {testimonials.map((item) => (
          <ContentCard
            key={item.id}
            title={item.customer_name}
            subtitle={item.label}
            body={item.text}
            active={item.is_active}
            actions={
              <>
                <TestimonialEditor
                  item={item}
                  onSaved={(next) => {
                    updateTestimonial(next);
                    setNotice("دیدگاه ذخیره شد.");
                  }}
                />
                <Visibility
                  active={item.is_active}
                  busyLabel="دیدگاه"
                  onToggle={async () =>
                    updateTestimonial(
                      await dashboardApi.updateTestimonial(item.id, { is_active: !item.is_active })
                    )
                  }
                />
              </>
            }
          />
        ))}
      </ResourceSection>
      {notice ? (
        <p
          role="status"
          className="fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-2xl bg-emerald-700 px-4 py-3 text-xs font-bold text-white shadow-xl"
        >
          <Check className="h-4 w-4" />
          {notice}
          <button type="button" onClick={() => setNotice("")} aria-label="بستن">
            <X className="h-4 w-4" />
          </button>
        </p>
      ) : null}
    </div>
  );
}

function ResourceSection({
  title,
  subtitle,
  icon,
  action,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  action: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="dashboard-panel overflow-hidden rounded-[2rem]">
      <header className="flex items-center justify-between gap-4 border-b border-[var(--dashboard-line)] p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--dashboard-accent)]/10 text-[var(--dashboard-accent)]">
            {icon}
          </span>
          <div>
            <h2 className="font-black">{title}</h2>
            <p className="mt-1 text-xs text-[var(--dashboard-muted)]">{subtitle}</p>
          </div>
        </div>
        {action}
      </header>
      <div className="divide-y divide-[var(--dashboard-line)]">{children}</div>
    </section>
  );
}

function ContentCard({
  title,
  subtitle,
  body,
  active,
  image,
  actions,
}: {
  title: string;
  subtitle: string;
  body: string;
  active: boolean;
  image?: string;
  actions: React.ReactNode;
}) {
  return (
    <article className={`p-5 sm:p-6 ${active ? "" : "bg-black/[.025] opacity-65"}`}>
      <div className="flex items-start gap-4">
        {image ? (
          <span
            role="img"
            aria-label={`تصویر ${title}`}
            style={{ backgroundImage: `url(${image})` }}
            className="h-14 w-14 shrink-0 rounded-2xl bg-cover bg-center"
          />
        ) : (
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--dashboard-ink)] text-lg font-black text-white">
            {title.slice(0, 1)}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-black">{title}</h3>
            <span
              className={`rounded-full px-2 py-1 text-[10px] font-bold ${active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
            >
              {active ? "منتشرشده" : "پنهان"}
            </span>
          </div>
          <p className="mt-1 text-xs font-semibold text-[var(--dashboard-accent)]">
            {subtitle || "بدون برچسب"}
          </p>
          <p className="mt-3 line-clamp-3 text-xs leading-6 text-[var(--dashboard-muted)]">
            {body || "توضیحی ثبت نشده است."}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">{actions}</div>
        </div>
      </div>
    </article>
  );
}

function Visibility({
  active,
  busyLabel,
  onToggle,
}: {
  active: boolean;
  busyLabel: string;
  onToggle: () => Promise<void>;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const run = async () => {
    setBusy(true);
    setError("");
    try {
      await onToggle();
    } catch (caught) {
      setError(isApiError(caught) ? caught.message : `وضعیت ${busyLabel} تغییر نکرد.`);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div>
      <DashboardButton size="sm" variant="ghost" disabled={busy} onClick={() => void run()}>
        {active ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
        {active ? "پنهان‌کردن" : "انتشار دوباره"}
      </DashboardButton>
      {error ? <p className="mt-1 text-[10px] text-red-700">{error}</p> : null}
    </div>
  );
}

function TeamEditor({ item, onSaved }: { item?: TeamMember; onSaved: (item: TeamMember) => void }) {
  const empty = { name: "", role: "", bio: "", image_url: "", is_active: true, sort_order: 0 };
  return (
    <Editor
      title={item ? "ویرایش عضو تیم" : "عضو جدید"}
      item={item ?? empty}
      fields={[
        ["name", "نام و نام خانوادگی"],
        ["role", "سمت"],
        ["bio", "معرفی کوتاه"],
        ["image_url", "آدرس تصویر"],
        ["sort_order", "ترتیب نمایش"],
      ]}
      onSave={async (data) => {
        const payload = data as Omit<TeamMember, "id">;
        onSaved(
          item
            ? await dashboardApi.updateTeamMember(item.id, payload)
            : await dashboardApi.createTeamMember(payload)
        );
      }}
    />
  );
}

function TestimonialEditor({
  item,
  onSaved,
}: {
  item?: Testimonial;
  onSaved: (item: Testimonial) => void;
}) {
  const empty = { customer_name: "", label: "", text: "", is_active: true, sort_order: 0 };
  return (
    <Editor
      title={item ? "ویرایش دیدگاه" : "دیدگاه جدید"}
      item={item ?? empty}
      fields={[
        ["customer_name", "نام مراجعه‌کننده"],
        ["label", "برچسب"],
        ["text", "متن دیدگاه"],
        ["sort_order", "ترتیب نمایش"],
      ]}
      onSave={async (data) => {
        const payload = data as Omit<Testimonial, "id">;
        onSaved(
          item
            ? await dashboardApi.updateTestimonial(item.id, payload)
            : await dashboardApi.createTestimonial(payload)
        );
      }}
    />
  );
}

function Editor({
  title,
  item,
  fields,
  onSave,
}: {
  title: string;
  item: Record<string, unknown>;
  fields: string[][];
  onSave: (data: Record<string, unknown>) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(item);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSave({ ...form, sort_order: Number(form.sort_order) || 0 });
      setOpen(false);
    } catch (caught) {
      setError(isApiError(caught) ? caught.message : "ذخیره انجام نشد.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <>
      <DashboardButton
        size="sm"
        variant={"id" in item ? "secondary" : "primary"}
        onClick={() => {
          setForm(item);
          setError("");
          setOpen(true);
        }}
      >
        {"id" in item ? <Pencil className="h-3.5 w-3.5" /> : <Plus className="h-4 w-4" />}
        {"id" in item ? "ویرایش" : "افزودن"}
      </DashboardButton>
      {open ? (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-black/35 p-3 backdrop-blur-sm"
          onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            className="dashboard-panel w-full max-w-xl rounded-[2rem] p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-black">{title}</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="بستن">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={save} className="space-y-4">
              {fields.map(([key, label]) => (
                <label key={key} className="block text-sm font-bold">
                  {label}
                  {key === "bio" || key === "text" ? (
                    <textarea
                      required={key === "text"}
                      rows={4}
                      value={String(form[key] ?? "")}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, [key]: event.target.value }))
                      }
                      className="dashboard-focus mt-2 w-full rounded-xl border border-[var(--dashboard-line)] bg-white p-3 text-sm outline-none"
                    />
                  ) : (
                    <DashboardInput
                      required={key === "name" || key === "customer_name"}
                      type={key === "sort_order" ? "number" : key === "image_url" ? "url" : "text"}
                      value={String(form[key] ?? "")}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, [key]: event.target.value }))
                      }
                      className="mt-2"
                    />
                  )}
                </label>
              ))}
              <label className="flex items-center gap-2 text-sm font-bold">
                <input
                  type="checkbox"
                  checked={Boolean(form.is_active)}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, is_active: event.target.checked }))
                  }
                />
                نمایش در سایت
              </label>
              {error ? (
                <p role="alert" className="rounded-xl bg-red-50 p-3 text-xs text-red-700">
                  {error}
                </p>
              ) : null}
              <div className="flex justify-end gap-2">
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
