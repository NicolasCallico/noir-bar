export type Badge = "gold" | "new" | "hot" | "";

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  order: number;
  venue_id: string;
}

export interface Product {
  id: string;
  venue_id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  image_url?: string;
  emoji: string;
  badge: Badge;
  available: boolean;
  created_at: string;
  categories?: Category;
}

export interface Reservation {
  id: string;
  venue_id: string;
  name: string;
  phone: string;
  people: number;
  date: string;
  time: string;
  is_birthday: boolean;
  notes?: string;
  status: "new" | "confirmed" | "cancelled";
  created_at: string;
}

export interface Promotion {
  id: string;
  venue_id: string;
  name: string;
  description: string;
  time_range: string;
  active: boolean;
  created_at: string;
}

export interface VenueSettings {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  whatsapp: string;
  instagram: string;
  address: string;
  hero_image_url?: string;
  logo_image_url?: string;
  primary_color: string;
  show_unavailable: boolean;
}

// Supabase Database type
export type Database = {
  public: {
    Tables: {
      products: { Row: Product; Insert: Omit<Product, "id" | "created_at">; Update: Partial<Product> };
      categories: { Row: Category; Insert: Omit<Category, "id">; Update: Partial<Category> };
      reservations: { Row: Reservation; Insert: Omit<Reservation, "id" | "created_at" | "status">; Update: Partial<Reservation> };
      promotions: { Row: Promotion; Insert: Omit<Promotion, "id" | "created_at">; Update: Partial<Promotion> };
      venue_settings: { Row: VenueSettings; Insert: VenueSettings; Update: Partial<VenueSettings> };
    };
  };
};
