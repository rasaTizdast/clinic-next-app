"use client";

import Link from "next/link";
import { ArrowLeft, LockKeyhole, Sparkles } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { dashboardApi, isApiError } from "@/lib/dashboard/api";
import { DashboardButton } from "@/components/dashboard/DashboardButton";
import { DashboardInput } from "@/components/dashboard/DashboardInput";

export default function DashboardLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await dashboardApi.login(username, password);
      router.replace("/site-panel");
    } catch (caught) {
      setError(isApiError(caught) ? caught.message : "ورود انجام نشد. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="dashboard-root min-h-dvh overflow-hidden px-5 py-6 sm:px-8" dir="rtl">
      <div className="mx-auto flex min-h-[calc(100dvh-3rem)] max-w-6xl items-center">
        <div className="grid w-full overflow-hidden rounded-[2.5rem] border border-[var(--dashboard-line)] bg-white/55 shadow-[0_30px_100px_rgba(74,42,20,.12)] lg:grid-cols-[1.05fr_.95fr]">
          <section className="relative hidden min-h-[38rem] overflow-hidden bg-[var(--dashboard-ink)] p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-[var(--dashboard-accent)]/40 blur-3xl" />
            <div className="relative">
              <div className="mb-16 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg font-black text-[var(--dashboard-ink)]">
                  ب
                </span>
                <div>
                  <p className="font-bold">اتاق مدیریت</p>
                  <p className="text-xs text-white/60">کلینیک زیبایی باران</p>
                </div>
              </div>
              <p className="mb-4 text-xs font-bold tracking-[0.18em] text-[var(--dashboard-accent)]">
                WEBSITE CONTROL ROOM
              </p>
              <h1 className="max-w-md text-5xl leading-[1.25] font-black tracking-[-0.05em]">
                هر چیزی که مهم است، یک نگاه فاصله دارد.
              </h1>
              <p className="mt-6 max-w-sm text-sm leading-8 text-white/65">
                قیمت‌ها، محتوا و ارتباط با مراجعان را با آرامش و وضوح مدیریت کنید.
              </p>
            </div>
            <div className="relative flex items-center gap-3 text-xs text-white/60">
              <Sparkles className="h-4 w-4 text-[var(--dashboard-accent)]" />
              طراحی شده برای کار روزمره تیم باران
            </div>
          </section>
          <section className="p-7 sm:p-12 lg:p-16">
            <Link
              href="/"
              className="dashboard-focus mb-14 inline-flex items-center gap-2 rounded-xl text-xs font-bold text-[var(--dashboard-muted)] transition hover:text-[var(--dashboard-ink)]"
            >
              <ArrowLeft className="h-4 w-4" />
              بازگشت به سایت
            </Link>
            <div className="max-w-md">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--dashboard-ink)] text-white shadow-lg">
                <LockKeyhole className="h-6 w-6" />
              </div>
              <p className="mb-2 text-xs font-bold tracking-[0.14em] text-[var(--dashboard-accent)]">
                ورود امن
              </p>
              <h2 className="text-3xl font-black tracking-[-0.04em]">خوش آمدید</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--dashboard-muted)]">
                نام کاربری و رمز اختصاصی مدیریت وب‌سایت را وارد کنید.
              </p>
              <form onSubmit={submit} className="mt-9 space-y-5">
                <label className="block text-sm font-bold">
                  نام کاربری
                  <DashboardInput
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    autoComplete="username"
                    className="mt-2 min-h-12 rounded-2xl px-4"
                  />
                </label>
                <label className="block text-sm font-bold">
                  رمز عبور
                  <DashboardInput
                    required
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    className="mt-2 min-h-12 rounded-2xl px-4"
                  />
                </label>
                {error ? (
                  <p
                    role="alert"
                    className="rounded-xl bg-red-50 px-3 py-3 text-xs leading-6 font-semibold text-red-700"
                  >
                    {error}
                  </p>
                ) : null}
                <DashboardButton type="submit" disabled={loading} size="lg" className="w-full">
                  {loading ? "در حال ورود…" : "ورود به داشبورد"}
                </DashboardButton>
              </form>
              <p className="mt-6 text-center text-[11px] leading-6 text-[var(--dashboard-muted)]">
                این حساب از پنل پذیرش و امور مالی کاملاً مستقل است.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
