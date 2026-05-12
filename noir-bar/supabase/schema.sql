-- ============================================================
-- SCHEMA COMPLETO PARA NOIR BAR / SISTEMA QR GASTRONÓMICO
-- Ejecutar en: Supabase > SQL Editor > New Query
-- ============================================================

-- 1. CONFIGURACIÓN DEL LOCAL
-- ============================================================
create table if not exists venue_settings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,          -- URL del menú: tudominio.com/mi-bar
  name text not null,                 -- "Noir Bar"
  tagline text,                       -- "Cocktails artesanales"
  whatsapp text,                      -- "+5491112345678"
  instagram text,                     -- "noirbar.ba"
  address text,                       -- "Palermo, Buenos Aires"
  hero_image_url text,                -- URL de imagen de portada
  primary_color text default '#C8A96B',
  show_unavailable boolean default true,
  created_at timestamptz default now()
);

-- 2. CATEGORÍAS DEL MENÚ
-- ============================================================
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venue_settings(id) on delete cascade,
  name text not null,                 -- "Cocktails"
  slug text not null,                 -- "cocktails"
  icon text default '🍽️',            -- Emoji del ícono
  "order" int default 0,             -- Orden de aparición
  created_at timestamptz default now()
);

-- 3. PRODUCTOS
-- ============================================================
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venue_settings(id) on delete cascade,
  category_id uuid references categories(id) on delete set null,
  name text not null,
  description text,
  price numeric(10,2) not null,
  original_price numeric(10,2),       -- Para mostrar precio tachado
  image_url text,                     -- URL en Supabase Storage
  emoji text default '🍽️',
  badge text check (badge in ('gold', 'new', 'hot', '')) default '',
  available boolean default true,
  created_at timestamptz default now()
);

-- 4. RESERVAS
-- ============================================================
create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venue_settings(id) on delete cascade,
  name text not null,
  phone text not null,
  people int not null default 2,
  date date not null,
  time text not null,
  is_birthday boolean default false,
  notes text,
  status text check (status in ('new', 'confirmed', 'cancelled')) default 'new',
  created_at timestamptz default now()
);

-- 5. PROMOCIONES
-- ============================================================
create table if not exists promotions (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venue_settings(id) on delete cascade,
  name text not null,                 -- "Happy Hour"
  description text,                  -- "Cocktails 2x1"
  time_range text,                   -- "Lunes a jueves 18-20hs"
  active boolean default true,
  created_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Menú público: lectura libre | Admin: solo autenticados
-- ============================================================

alter table venue_settings enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table reservations enable row level security;
alter table promotions enable row level security;

-- Lectura pública del menú
create policy "Lectura pública venue" on venue_settings for select using (true);
create policy "Lectura pública categorías" on categories for select using (true);
create policy "Lectura pública productos" on products for select using (true);
create policy "Lectura pública promociones" on promotions for select using (true);

-- Inserción de reservas (cualquier visitante)
create policy "Insertar reservas" on reservations for insert with check (true);

-- Admin: full access (autenticados)
create policy "Admin venue" on venue_settings for all using (auth.role() = 'authenticated');
create policy "Admin categorías" on categories for all using (auth.role() = 'authenticated');
create policy "Admin productos" on products for all using (auth.role() = 'authenticated');
create policy "Admin reservas" on reservations for all using (auth.role() = 'authenticated');
create policy "Admin promociones" on promotions for all using (auth.role() = 'authenticated');

-- ============================================================
-- DATOS DE EJEMPLO (Demo)
-- ============================================================

-- Insertar local demo
insert into venue_settings (id, slug, name, tagline, whatsapp, instagram, address)
values (
  'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  'noir-bar',
  'Noir Bar',
  'Cocktails artesanales & gastronomía de autor',
  '5491112345678',
  'noirbar.ba',
  'Palermo, Buenos Aires'
);

-- Categorías demo
insert into categories (venue_id, name, slug, icon, "order") values
  ('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', 'Cocktails', 'cocktails', '🍸', 1),
  ('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', 'Vinos', 'vinos', '🍷', 2),
  ('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', 'Cervezas', 'cervezas', '🍺', 3),
  ('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', 'Comidas', 'comidas', '🍽️', 4),
  ('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', 'Postres', 'postres', '🍮', 5);

-- Promoción demo
insert into promotions (venue_id, name, description, time_range, active) values
  ('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', 'Happy Hour', 'Cocktails 2×1', 'Lunes a jueves, 18:00 – 20:00 hs', true);
