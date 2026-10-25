"use client";

import { useEffect, useState } from "react";
import { CatalogTable } from "@/components/dashboard/CatalogTable";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ResourceState } from "@/components/dashboard/ResourceState";
import { dashboardApi, isApiError } from "@/lib/dashboard/api";
import type { SitePackage, SiteService } from "@/lib/dashboard/types";

export default function DashboardPackagesPage() {
  const [items, setItems] = useState<SitePackage[] | null>(null);
  const [services, setServices] = useState<SiteService[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    Promise.all([dashboardApi.packages(), dashboardApi.services()])
      .then(([packages, serviceItems]) => {
        setItems(packages);
        setServices(serviceItems);
      })
      .catch((caught) => setError(isApiError(caught) ? caught.message : "پکیج‌ها دریافت نشدند."));
  }, []);
  const update = (next: SitePackage) =>
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
      title="پکیج‌ها"
      description="محتوا، خدمات مرتبط، وضعیت انتشار و همه قیمت‌های هر پکیج را مدیریت کنید."
    >
      {error ? (
        <ResourceState kind="error" message={error} />
      ) : !items ? (
        <ResourceState kind="loading" />
      ) : (
        <CatalogTable
          items={items}
          kind="package"
          services={services}
          onChange={(next) => update(next as SitePackage)}
        />
      )}
    </DashboardShell>
  );
}
