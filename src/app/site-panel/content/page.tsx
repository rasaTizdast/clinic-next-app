"use client";

import { useEffect, useState } from "react";
import { ContentManager } from "@/components/dashboard/ContentManager";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ResourceState } from "@/components/dashboard/ResourceState";
import { dashboardApi, isApiError } from "@/lib/dashboard/api";
import type { TeamMember, Testimonial } from "@/lib/dashboard/types";

export default function ContentPage() {
  const [data, setData] = useState<{ team: TeamMember[]; testimonials: Testimonial[] } | null>(
    null
  );
  const [error, setError] = useState("");
  useEffect(() => {
    Promise.all([dashboardApi.team(), dashboardApi.testimonials()])
      .then(([team, testimonials]) => setData({ team, testimonials }))
      .catch((caught) => setError(isApiError(caught) ? caught.message : "محتوای سایت دریافت نشد."));
  }, []);
  return (
    <DashboardShell
      eyebrow="اعتماد و اعتبار"
      title="تیم و دیدگاه‌ها"
      description="اعضای تیم و تجربه‌های منتشرشده مراجعان را بسازید، ویرایش کنید و از سایت پنهان کنید."
    >
      {error ? (
        <ResourceState kind="error" message={error} />
      ) : !data ? (
        <ResourceState kind="loading" />
      ) : (
        <ContentManager initialTeam={data.team} initialTestimonials={data.testimonials} />
      )}
    </DashboardShell>
  );
}
