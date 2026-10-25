"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ResourceState } from "@/components/dashboard/ResourceState";
import { SettingsForm } from "@/components/dashboard/SettingsForm";
import { dashboardApi, isApiError } from "@/lib/dashboard/api";
import type { SiteSettings } from "@/lib/dashboard/types";

export default function DashboardSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    dashboardApi
      .settings()
      .then(setSettings)
      .catch((caught) => setError(isApiError(caught) ? caught.message : "تنظیمات دریافت نشد."));
  }, []);
  return (
    <DashboardShell
      eyebrow="هویت سایت"
      title="تنظیمات سایت"
      description="اطلاعاتی که در صفحات عمومی سایت دیده می‌شوند را با یک فرم خوانا و قابل بازبینی مدیریت کنید."
    >
      {error ? (
        <ResourceState kind="error" message={error} />
      ) : !settings ? (
        <ResourceState kind="loading" />
      ) : (
        <SettingsForm initial={settings} />
      )}
    </DashboardShell>
  );
}
