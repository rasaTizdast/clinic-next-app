"use client";

import { DashboardNav } from "./DashboardNav";
import { useDashboardAuth } from "./DashboardAuth";

export function DashboardShell({
  children,
  eyebrow,
  title,
  description,
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
}) {
  const { user, signOut } = useDashboardAuth();
  if (!user) return null;
  return (
    <div className="dashboard-root flex min-h-dvh gap-4 p-3 sm:p-5 lg:p-6" dir="rtl">
      <DashboardNav user={user} onSignOut={signOut} />
      <main className="min-w-0 flex-1 px-1 pt-14 pb-8 sm:px-3 lg:pt-2">
        <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.14em] text-[var(--dashboard-accent)]">
              {eyebrow}
            </p>
            <h1 className="text-3xl font-black tracking-[-0.04em] text-[var(--dashboard-ink)] sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--dashboard-muted)]">
              {description}
            </p>
          </div>
          <span className="hidden rounded-full border border-[var(--dashboard-line)] bg-white/60 px-3 py-2 text-xs text-[var(--dashboard-muted)] sm:block">
            اتصال امن به پنل سایت
          </span>
        </header>
        {children}
      </main>
    </div>
  );
}
