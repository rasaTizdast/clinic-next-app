import type { Metadata } from "next";
import { DashboardAuth } from "@/components/dashboard/DashboardAuth";

export const metadata: Metadata = {
  title: "مدیریت وب‌سایت",
  description: "اتاق مدیریت وب‌سایت کلینیک زیبایی باران",
};

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <DashboardAuth>
      <div className="dashboard-stage">{children}</div>
    </DashboardAuth>
  );
}
