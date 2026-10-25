"use client";

import { useEffect, useState } from "react";
import { CatalogTable } from "@/components/dashboard/CatalogTable";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ResourceState } from "@/components/dashboard/ResourceState";
import { dashboardApi, isApiError } from "@/lib/dashboard/api";
import type { SiteProduct } from "@/lib/dashboard/types";

export default function DashboardProductsPage() {
  const [items, setItems] = useState<SiteProduct[] | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    dashboardApi
      .products()
      .then(setItems)
      .catch((caught) => setError(isApiError(caught) ? caught.message : "محصولات دریافت نشدند."));
  }, []);
  const update = (next: SiteProduct) =>
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
      title="محصولات"
      description="محصول، توضیح، تصویر، وضعیت انتشار و قیمت آن را از همین‌جا مدیریت کنید."
    >
      {error ? (
        <ResourceState kind="error" message={error} />
      ) : !items ? (
        <ResourceState kind="loading" />
      ) : (
        <CatalogTable
          items={items}
          kind="product"
          onChange={(next) => update(next as SiteProduct)}
        />
      )}
    </DashboardShell>
  );
}
