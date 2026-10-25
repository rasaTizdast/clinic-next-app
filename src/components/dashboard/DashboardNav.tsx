"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Boxes,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  Package,
  Settings2,
  UsersRound,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { DashboardUser } from "@/lib/dashboard/types";
import { DashboardButton } from "./DashboardButton";

const links = [
  { href: "/site-panel", label: "نمای کلی", icon: LayoutDashboard },
  { href: "/site-panel/services", label: "خدمات سایت", icon: ClipboardList },
  { href: "/site-panel/packages", label: "پکیج‌ها", icon: Package },
  { href: "/site-panel/products", label: "محصولات", icon: Boxes },
  { href: "/site-panel/content", label: "تیم و دیدگاه‌ها", icon: UsersRound },
  { href: "/site-panel/messages", label: "پیام‌های مراجعان", icon: MessageSquareText },
  { href: "/site-panel/settings", label: "تنظیمات سایت", icon: Settings2 },
  { href: "/site-panel/sync", label: "سلامت همگام‌سازی", icon: BarChart3 },
];

export function DashboardNav({ user, onSignOut }: { user: DashboardUser; onSignOut: () => void }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);
  const nav = (
    <nav className="space-y-1" aria-label="ناوبری داشبورد">
      <p className="mb-3 px-3 text-[11px] font-bold tracking-[0.16em] text-[var(--dashboard-muted)]">
        مدیریت وب‌سایت
      </p>
      {links.map(({ href, label, icon: Icon }) => {
        const active = href === "/site-panel" ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={cn(
              "dashboard-focus flex min-h-11 items-center gap-3 rounded-2xl px-3.5 text-sm font-semibold transition-all duration-200",
              active
                ? "bg-[var(--dashboard-ink)] text-white shadow-lg shadow-black/10"
                : "text-[var(--dashboard-muted)] hover:bg-white/70 hover:text-[var(--dashboard-ink)]"
            )}
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
  return (
    <>
      <button
        ref={menuButton}
        type="button"
        onClick={() => setOpen(true)}
        className="dashboard-focus fixed top-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--dashboard-ink)] text-white shadow-xl lg:hidden"
        aria-label="باز کردن منوی داشبورد"
      >
        <Menu className="h-5 w-5" />
      </button>
      <aside className="hidden w-64 shrink-0 flex-col rounded-[2rem] border border-[var(--dashboard-line)] bg-white/65 p-4 shadow-[0_18px_55px_rgba(70,40,20,.07)] lg:flex">
        <Brand />
        <div className="my-8 flex-1">{nav}</div>
        <Account user={user} onSignOut={onSignOut} />
      </aside>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        >
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="منوی داشبورد"
            className="dashboard-mobile-menu h-full w-[min(86vw,20rem)] bg-[var(--dashboard-paper)] p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
              if (event.key !== "Tab") return;
              const focusable = event.currentTarget.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
              );
              const first = focusable.item(0);
              const last = focusable.item(focusable.length - 1);
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last?.focus();
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first?.focus();
              }
            }}
          >
            <div className="mb-8 flex items-center justify-between">
              <Brand />
              <button
                ref={closeButton}
                type="button"
                className="dashboard-focus rounded-xl p-2"
                onClick={() => setOpen(false)}
                aria-label="بستن منو"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {nav}
            <div className="mt-8">
              <Account user={user} onSignOut={onSignOut} />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

function Brand() {
  return (
    <Link href="/site-panel" className="dashboard-focus flex items-center gap-3 rounded-2xl p-2">
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--dashboard-ink)] text-lg font-black text-white">
        ب
      </span>
      <span>
        <strong className="block text-sm">اتاق مدیریت</strong>
        <span className="text-[11px] text-[var(--dashboard-muted)]">کلینیک زیبایی باران</span>
      </span>
    </Link>
  );
}

function Account({ user, onSignOut }: { user: DashboardUser; onSignOut: () => void }) {
  return (
    <div className="rounded-2xl border border-[var(--dashboard-line)] bg-white/70 p-3">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--dashboard-accent)] text-sm font-bold text-white">
          {user.username.slice(0, 1).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-bold">{user.username}</p>
          <p className="text-[11px] text-[var(--dashboard-muted)]">مدیر محتوای سایت</p>
        </div>
      </div>
      <DashboardButton
        variant="ghost"
        onClick={onSignOut}
        className="mt-3 w-full justify-start text-xs hover:bg-red-50 hover:text-red-700"
      >
        <LogOut className="h-4 w-4" />
        خروج امن
      </DashboardButton>
    </div>
  );
}
