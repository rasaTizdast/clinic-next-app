"use client";

import { useEffect, useState } from "react";
import { CatalogTable } from "@/components/dashboard/CatalogTable";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ResourceState } from "@/components/dashboard/ResourceState";
import { dashboardApi, isApiError } from "@/lib/dashboard/api";
import type { SiteService } from "@/lib/dashboard/types";

export default function DashboardServicesPage() {
  const [items, setItems] = useState<SiteService[] | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    dashboardApi
      .services()
      .then(setItems)
      .catch((caught) => setError(isApiError(caught) ? caught.message : "خدمات دریافت نشد."));
  }, []);
  const update = (next: SiteService) =>
    setItems((current) =>
      current
        ? current.some((item) => item.id === next.id)
          ? current.map((item) => (item.id === next.id ? next : item))
          : [next, ...current]
        : current
    );
  return (
    <DashboardShell
      eyebrow="کاتالوگ سایت"
      title="خدمات"
      description="صفحه هر خدمت، محتوای نمایشی، تصویر، وضعیت انتشار و قیمت آن را مدیریت کنید."
    >
      {error ? (
        <ResourceState kind="error" message={error} />
      ) : !items ? (
        <ResourceState kind="loading" />
      ) : (
        <CatalogTable
          items={items}
          kind="service"
          onChange={(next) => update(next as SiteService)}
        />
      )}
    </DashboardShell>
  );
}
