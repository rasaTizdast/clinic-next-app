export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  duration: string;
  category: "skin" | "hair" | "body" | "face";
  icon: string;
  featured: boolean;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  features: string[];
  popular: boolean;
  category: "basic" | "standard" | "premium";
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  discountType: "percent" | "fixed";
  expiryDate: string;
  serviceIds: string[];
  active: boolean;
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
