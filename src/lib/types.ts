export type ServiceCategory =
  | "filler-botox"
  | "laser-women"
  | "laser-men"
  | "facial";

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  fromPrice?: boolean;
  category: ServiceCategory;
  subcategory: string;
  featured?: boolean;
}

export type PackageGroup = "carbon" | "laser-women" | "laser-men";

export interface PackageTier {
  label: string;
  price: number;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  group: PackageGroup;
  tiers: PackageTier[];
  popular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  price?: number;
}
