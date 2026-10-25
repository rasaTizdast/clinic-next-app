import type {
  ApiErrorShape,
  ContactMessage,
  DashboardUser,
  SitePackagePriceOption,
  SitePackagePriceOptionInput,
  PriceSyncStatus,
  SitePackage,
  SitePackageInput,
  SiteProduct,
  SiteProductInput,
  SiteService,
  SiteServiceInput,
  SiteSettings,
  TeamMember,
  Testimonial,
} from "./types";

// The browser uses /api on its own origin. Next proxies it to Django in local
// development, and Nginx does the same in production.
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");
const DASHBOARD_BASE = `${API_BASE}/api/v2/site-dashboard`;

function csrfToken() {
  if (typeof document === "undefined") return "";
  return (
    document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("csrftoken="))
      ?.split("=")[1] ?? ""
  );
}

async function parseError(response: Response): Promise<ApiErrorShape> {
  let payload: Record<string, unknown> = {};
  try {
    payload = (await response.json()) as Record<string, unknown>;
  } catch {
    // Preserve the HTTP status when the backend returns HTML or an empty body.
  }
  const detail =
    typeof payload.detail === "string" ? payload.detail : "در ارتباط با سرور مشکلی پیش آمد.";
  return { status: response.status, message: detail, fields: payload as ApiErrorShape["fields"] };
}

async function request<T>(path: string, init: RequestInit = {}) {
  const method = init.method ?? "GET";
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  if (init.body && !(init.body instanceof FormData))
    headers.set("Content-Type", "application/json");
  if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
    headers.set("X-CSRFToken", csrfToken());
  }
  const url = path.startsWith("http")
    ? path
    : path.startsWith("/")
      ? `${API_BASE}${path}`
      : `${DASHBOARD_BASE}/${path}`;
  const response = await fetch(url, {
    ...init,
    headers,
    credentials: "include",
  });
  if (!response.ok) throw await parseError(response);
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

async function listRequest<T>(path: string) {
  const items: T[] = [];
  let next: string | null = path;
  while (next) {
    const payload: T[] | { results: T[]; next?: string | null } = await request(next);
    if (Array.isArray(payload)) return [...items, ...payload];
    items.push(...payload.results);
    if (!payload.next) break;
    const parsed: URL = new URL(payload.next, window.location.origin);
    next = `${parsed.pathname}${parsed.search}`;
  }
  return items;
}

export const dashboardApi = {
  login: (username: string, password: string) =>
    request<{ detail?: string }>("login/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),
  logout: () => request<{ detail: string }>("logout/", { method: "POST" }),
  me: () => request<DashboardUser>("me/"),
  services: () => listRequest<SiteService>("services/"),
  packages: () => listRequest<SitePackage>("packages/"),
  products: () => listRequest<SiteProduct>("products/"),
  settings: () => request<SiteSettings>("settings/"),
  updateSettings: (payload: Partial<SiteSettings>) =>
    request<SiteSettings>("settings/", { method: "PATCH", body: JSON.stringify(payload) }),
  syncStatus: () => request<PriceSyncStatus>("price-sync/status/"),
  updateServicePrice: (slug: string, payload: { price?: string; price_usd?: string }) =>
    request<SiteService>(`services/${encodeURIComponent(slug)}/`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  updatePackagePrice: (
    slug: string,
    payload: {
      price?: string;
      price_usd?: string;
      original_price?: string | null;
      original_price_usd?: string | null;
    }
  ) =>
    request<SitePackage>(`packages/${encodeURIComponent(slug)}/`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  updateProductPrice: (slug: string, payload: { price?: string; price_usd?: string }) =>
    request<SiteProduct>(`products/${encodeURIComponent(slug)}/`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  createService: (payload: SiteServiceInput) =>
    request<SiteService>("services/", { method: "POST", body: JSON.stringify(payload) }),
  updateService: (slug: string, payload: Partial<SiteServiceInput>) =>
    request<SiteService>(`services/${encodeURIComponent(slug)}/`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  uploadServiceImage: (slug: string, image: File) => {
    const body = new FormData();
    body.append("image", image);
    return request<SiteService>(`services/${encodeURIComponent(slug)}/image/`, {
      method: "POST",
      body,
    });
  },
  createProduct: (payload: SiteProductInput) =>
    request<SiteProduct>("products/", { method: "POST", body: JSON.stringify(payload) }),
  updateProduct: (slug: string, payload: Partial<SiteProductInput>) =>
    request<SiteProduct>(`products/${encodeURIComponent(slug)}/`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  createPackage: (payload: SitePackageInput) =>
    request<SitePackage>("packages/", { method: "POST", body: JSON.stringify(payload) }),
  updatePackage: (slug: string, payload: Partial<SitePackageInput>) =>
    request<SitePackage>(`packages/${encodeURIComponent(slug)}/`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  createPackagePriceOption: (payload: SitePackagePriceOptionInput) =>
    request<SitePackagePriceOption>("package-price-options/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updatePackagePriceOption: (
    id: number,
    payload: { price?: string; price_usd?: string; is_active?: boolean }
  ) =>
    request<SitePackagePriceOption>(`package-price-options/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  team: () => listRequest<TeamMember>("team/"),
  createTeamMember: (payload: Omit<TeamMember, "id">) =>
    request<TeamMember>("team/", { method: "POST", body: JSON.stringify(payload) }),
  updateTeamMember: (id: number, payload: Partial<Omit<TeamMember, "id">>) =>
    request<TeamMember>(`team/${id}/`, { method: "PATCH", body: JSON.stringify(payload) }),
  testimonials: () => listRequest<Testimonial>("testimonials/"),
  createTestimonial: (payload: Omit<Testimonial, "id">) =>
    request<Testimonial>("testimonials/", { method: "POST", body: JSON.stringify(payload) }),
  updateTestimonial: (id: number, payload: Partial<Omit<Testimonial, "id">>) =>
    request<Testimonial>(`testimonials/${id}/`, { method: "PATCH", body: JSON.stringify(payload) }),
  contactMessages: () => listRequest<ContactMessage>("contact-messages/"),
  updateContactMessage: (id: number, is_handled: boolean) =>
    request<ContactMessage>(`contact-messages/${id}/`, {
      method: "PATCH",
      body: JSON.stringify({ is_handled }),
    }),
  runSync: () => request<PriceSyncStatus>("price-sync/run/", { method: "POST", body: "{}" }),
};

export function isApiError(error: unknown): error is ApiErrorShape {
  return typeof error === "object" && error !== null && "status" in error && "message" in error;
}
