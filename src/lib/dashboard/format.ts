export function formatToman(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") return "—";
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return String(value);
  return `${new Intl.NumberFormat("fa-IR").format(Math.round(numeric))} تومان`;
}

export function formatUsd(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") return "—";
  return `$${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(Number(value))}`;
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export const categoryLabels: Record<string, string> = {
  face: "صورت",
  skin: "پوست",
  hair: "مو",
  body: "بدن",
};
