export type DashboardRole = "admin" | "employee";

export interface DashboardUser {
  id: number;
  username: string;
  role: DashboardRole;
  date_joined: string;
}

export interface SiteService {
  id: number;
  name: string;
  slug: string;
  category: "face" | "skin" | "hair" | "body";
  price: string;
  price_usd: string;
  source_category: string;
  short_description: string;
  description: string;
  is_from_price: boolean;
  duration_label: string;
  image_url: string;
  image_object_key: string;
  source_url: string;
  is_active: boolean;
  sort_order: number;
}

export interface SiteProduct {
  id: number;
  name: string;
  slug: string;
  price: string;
  price_usd: string;
  short_description: string;
  image_url: string;
  source_url: string;
  is_active: boolean;
  sort_order: number;
}

export interface SitePackagePriceOption {
  id: number;
  package: number;
  label: string;
  session_count: number | null;
  gift_session_count: number;
  price: string;
  price_usd: string;
  source_url: string;
  sort_order: number;
  is_active: boolean;
}

export interface SitePackagePriceOptionInput {
  package: number;
  label: string;
  session_count: number | null;
  gift_session_count: number;
  price: string;
  price_usd?: string;
  sort_order: number;
  is_active: boolean;
}

export interface SitePackage {
  id: number;
  name: string;
  slug: string;
  price: string;
  price_usd: string;
  original_price: string | null;
  original_price_usd: string | null;
  discount_percent: number;
  tier: "base" | "standard" | "special";
  tagline: string;
  badge: string;
  free_service_count: number;
  services: Array<{ id: number; name: string; slug: string }>;
  price_options: SitePackagePriceOption[];
  source_url: string;
  is_active: boolean;
  sort_order: number;
}

export type SiteServiceInput = Omit<SiteService, "id" | "price_usd" | "image_object_key"> & {
  price: string;
};
export type SiteProductInput = Omit<SiteProduct, "id" | "price_usd"> & { price: string };
export type SitePackageInput = Omit<
  SitePackage,
  "id" | "price_usd" | "original_price_usd" | "discount_percent" | "services" | "price_options"
> & {
  price: string;
  service_ids: number[];
};

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
}

export interface Testimonial {
  id: number;
  customer_name: string;
  label: string;
  text: string;
  is_active: boolean;
  sort_order: number;
}

export interface ContactMessage {
  id: number;
  full_name: string;
  phone: string;
  message: string;
  created_at: string;
  is_handled: boolean;
}

export interface SiteSettings {
  id: number;
  address: string;
  phone_numbers: string[];
  working_hours: string;
  about_title: string;
  about_text: string;
  statistics: Record<string, string | number>;
  hero_image_url: string;
  about_image_url: string;
  updated_at: string;
}

export interface PriceSyncStatus {
  id: number;
  status: "running" | "succeeded" | "failed";
  provider: string;
  rate: string | null;
  started_at: string;
  finished_at: string | null;
  updated_services: number;
  updated_packages: number;
  updated_products: number;
  error: string;
}

export interface ApiErrorShape {
  status: number;
  message: string;
  fields?: Record<string, string | string[]>;
}
