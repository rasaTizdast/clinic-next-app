import type {
  Package,
  PackageGroup,
  Product,
  Service,
  ServiceCategory,
  TeamMember,
  Testimonial,
} from "@/lib/types";

type Collection<T> = T[] | { results: T[]; next?: string | null };

interface ApiService {
  id: number;
  name: string;
  slug: string;
  category: string;
  source_category: string;
  short_description: string;
  description: string;
  price: string | null;
  image_url: string;
  is_from_price: boolean;
}

interface ApiPackageOption {
  id: number;
  label: string;
  price: string | null;
  sort_order: number;
  is_active: boolean;
}

interface ApiPackage {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  badge: string;
  price: string | null;
  price_options: ApiPackageOption[];
}

interface ApiProduct {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  price: string | null;
  image_url: string;
}

interface ApiTeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image_url: string;
}

interface ApiTestimonial {
  id: number;
  customer_name: string;
  text: string;
}

const apiOrigin = () =>
  (process.env.SITE_API_SERVER_ORIGIN ?? process.env.SITE_API_PROXY_TARGET ?? "http://localhost:8000").replace(
    /\/$/,
    "",
  );

async function request<T>(path: string): Promise<T> {
  const url = path.startsWith("http")
    ? path
    : `${apiOrigin()}/api/v2/${path.replace(/^\//, "")}`;
  const response = await fetch(url, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Public site API request failed: ${response.status} ${path}`);
  }

  return (await response.json()) as T;
}

async function list<T>(path: string): Promise<T[]> {
  const items: T[] = [];
  let next: string | null = path;
  while (next) {
    const payload: Collection<T> = await request<Collection<T>>(next);
    if (Array.isArray(payload)) return [...items, ...payload];
    items.push(...payload.results);
    next = payload.next ?? null;
  }
  return items;
}

function numberValue(value: string | null): number | undefined {
  if (value === null || value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function serviceCategory(source: string, name: string, category: string): ServiceCategory {
  const value = `${source} ${name}`.toLocaleLowerCase("fa");
  if (value.includes("لیزر بانوان")) return "laser-women";
  if (value.includes("لیزر آقایان")) return "laser-men";
  if (value.includes("فیشیال") || value.includes("پاکسازی") || category === "skin") {
    return "facial";
  }
  return "filler-botox";
}

function toService(item: ApiService): Service {
  return {
    id: String(item.id),
    slug: item.slug,
    title: item.name,
    description: item.description || item.short_description,
    price: numberValue(item.price) ?? 0,
    fromPrice: item.is_from_price,
    category: serviceCategory(item.source_category, item.name, item.category),
    subcategory: item.source_category,
    image: item.image_url || undefined,
  };
}

function packageGroup(item: ApiPackage): PackageGroup {
  const value = `${item.name} ${item.tagline}`.toLocaleLowerCase("fa");
  if (value.includes("لیزر بانوان")) return "laser-women";
  if (value.includes("لیزر آقایان")) return "laser-men";
  if (value.includes("کربن")) return "carbon";
  return "other";
}

function toPackage(item: ApiPackage): Package {
  const options = [...item.price_options]
    .filter((option) => option.is_active)
    .sort((left, right) => left.sort_order - right.sort_order);
  const fallbackOption = {
    label: "قیمت فعلی",
    price: numberValue(item.price) ?? 0,
  };

  return {
    id: String(item.id),
    name: item.name,
    description: item.tagline,
    group: packageGroup(item),
    popular: Boolean(item.badge),
    tiers: options.length
      ? options.map((option) => ({ label: option.label, price: numberValue(option.price) ?? 0 }))
      : [fallbackOption],
  };
}

function toProduct(item: ApiProduct): Product {
  return {
    id: String(item.id),
    slug: item.slug,
    title: item.name,
    description: item.short_description,
    longDescription: item.short_description,
    image: item.image_url,
    price: numberValue(item.price),
  };
}

export async function getPublicServices(): Promise<Service[]> {
  return (await list<ApiService>("services/")).map(toService);
}

export async function getPublicService(slug: string): Promise<Service | undefined> {
  try {
    return toService(await request<ApiService>(`services/${encodeURIComponent(slug)}/`));
  } catch {
    return undefined;
  }
}

export async function getPublicPackages(): Promise<Package[]> {
  return (await list<ApiPackage>("packages/")).map(toPackage);
}

export async function getPublicProducts(): Promise<Product[]> {
  return (await list<ApiProduct>("products/")).map(toProduct);
}

export async function getPublicProduct(slug: string): Promise<Product | undefined> {
  try {
    return toProduct(await request<ApiProduct>(`products/${encodeURIComponent(slug)}/`));
  } catch {
    return undefined;
  }
}

export async function getPublicTeam(): Promise<TeamMember[]> {
  return (await list<ApiTeamMember>("team/")).map((item) => ({
    id: String(item.id),
    name: item.name,
    role: item.role,
    bio: item.bio,
    avatar: item.image_url || undefined,
  }));
}

export async function getPublicTestimonials(): Promise<Testimonial[]> {
  return (await list<ApiTestimonial>("testimonials/")).map((item) => ({
    id: String(item.id),
    name: item.customer_name,
    text: item.text,
    rating: 5,
    avatar: undefined,
  }));
}

