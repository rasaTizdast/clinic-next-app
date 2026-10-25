"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { dashboardApi, isApiError } from "@/lib/dashboard/api";
import type { DashboardUser } from "@/lib/dashboard/types";

interface AuthContextValue {
  user: DashboardUser | null;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useDashboardAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useDashboardAuth must be used inside DashboardAuth");
  return context;
}

export function DashboardAuth({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/site-panel/login";
  const [user, setUser] = useState<DashboardUser | null>(null);
  const [checking, setChecking] = useState(!isLogin);

  const refresh = useCallback(async () => {
    try {
      setUser(await dashboardApi.me());
    } catch (error) {
      setUser(null);
      if (isApiError(error) && error.status !== 401)
        console.warn("Dashboard session check failed", error.message);
      if (!isLogin) router.replace("/site-panel/login");
    } finally {
      setChecking(false);
    }
  }, [isLogin, router]);

  useEffect(() => {
    if (!isLogin) {
      const timer = window.setTimeout(() => void refresh(), 0);
      return () => window.clearTimeout(timer);
    }
  }, [isLogin, refresh]);

  const signOut = async () => {
    try {
      await dashboardApi.logout();
    } finally {
      setUser(null);
      router.replace("/site-panel/login");
    }
  };

  if (isLogin)
    return (
      <AuthContext.Provider value={{ user, refresh, signOut }}>{children}</AuthContext.Provider>
    );
  if (checking) {
    return (
      <div className="dashboard-root flex min-h-dvh items-center justify-center" dir="rtl">
        <div className="dashboard-panel rounded-[2rem] px-10 py-9 text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[var(--dashboard-line)] border-t-[var(--dashboard-accent)]" />
          <p className="text-sm text-[var(--dashboard-muted)]">در حال بررسی دسترسی شما…</p>
        </div>
      </div>
    );
  }
  return <AuthContext.Provider value={{ user, refresh, signOut }}>{children}</AuthContext.Provider>;
}
