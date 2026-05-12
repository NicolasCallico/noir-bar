-- ============================================================
-- SCHEMA COMPLETO PARA NOIR BAR / SISTEMA QR GASTRONÓMICO
-- ============================================================

create extension if not exists pgcrypto;

-- ============================================================
-- 1. CONFIGURACIÓN DEL LOCAL
-- ============================================================

create table if not exists venue_settings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text,
  whatsapp text,
  instagram text,
  address text,
  hero_image_url text,
  primary_color text default '#C8A96B',
  show_unavailable boolean default true,
  created_at timestamptz default now()
);

-- ============================================================
-- 2. CATEGORÍAS DEL MENÚ
-- ============================================================

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venue_settings(id) on delete cascade,
  name text not null,
  slug text not null,
  icon text default '🍽️',
  "order" int default 0,
  created_at timestamptz default now()
);

-- ============================================================
-- 3. PRODUCTOS
-- ============================================================

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venue_settings(id) on delete cascade,
  category_id uuid references categories(id) on delete set null,
  name text not null,
  description text,
  price numeric(10,2) not null,
  original_price numeric(10,2),
  image_url text,
  emoji text default '🍽️',
  badge text check (badge in ('gold', 'new', 'hot', '')) default '',
  available boolean default true,
  created_at timestamptz default now()
);

-- ============================================================
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
  status text check (
    status in ('new', 'confirmed', 'cancelled')
  ) default 'new',
  created_at timestamptz default now()
);

-- ============================================================
-- 5. PROMOCIONES
-- ============================================================

create table if not exists promotions (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venue_settings(id) on delete cascade,
  name text not null,
  description text,
  time_range text,
  active boolean default true,
  created_at timestamptz default now()
);

-- ============================================================
-- ENABLE RLS
-- ============================================================

alter table venue_settings enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table reservations enable row level security;
alter table promotions enable row level security;

-- ============================================================
-- ELIMINAR POLICIES SI YA EXISTEN
-- ============================================================

drop policy if exists "Lectura pública venue" on venue_settings;
drop policy if exists "Lectura pública categorías" on categories;
drop policy if exists "Lectura pública productos" on products;
drop policy if exists "Lectura pública promociones" on promotions;

drop policy if exists "Insertar reservas" on reservations;

drop policy if exists "Admin venue" on venue_settings;
drop policy if exists "Admin categorías" on categories;
drop policy if exists "Admin productos" on products;
drop policy if exists "Admin reservas" on reservations;
drop policy if exists "Admin promociones" on promotions;

-- ============================================================
-- POLICIES PÚBLICAS
-- ============================================================

create policy "Lectura pública venue"
on venue_settings
for select
using (true);

create policy "Lectura pública categorías"
on categories
for select
using (true);

create policy "Lectura pública productos"
on products
for select
using (true);

create policy "Lectura pública promociones"
on promotions
for select
using (true);

-- ============================================================
-- RESERVAS PÚBLICAS
-- ============================================================

create policy "Insertar reservas"
on reservations
for insert
with check (true);

-- ============================================================
-- ADMIN FULL ACCESS
-- ============================================================

create policy "Admin venue"
on venue_settings
for all
using (auth.role() = 'authenticated');

create policy "Admin categorías"
on categories
for all
using (auth.role() = 'authenticated');

create policy "Admin productos"
on products
for all
using (auth.role() = 'authenticated');

create policy "Admin reservas"
on reservations
for all
using (auth.role() = 'authenticated');

create policy "Admin promociones"
on promotions
for all
using (auth.role() = 'authenticated');

-- ============================================================
-- DATOS DEMO
-- ============================================================

insert into venue_settings (
  id,
  slug,
  name,
  tagline,
  whatsapp,
  instagram,
  address
)
values (
  'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  'noir-bar',
  'Noir Bar',
  'Cocktails artesanales & gastronomía de autor',
  '5491112345678',
  'noirbar.ba',
  'Palermo, Buenos Aires'
)
on conflict (slug) do nothing;

-- ============================================================
-- CATEGORÍAS DEMO
-- ============================================================

insert into categories (
  venue_id,
  name,
  slug,
  icon,
  "order"
)
select *
from (
  values
    ('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::uuid, 'Cocktails', 'cocktails', '🍸', 1),
    ('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::uuid, 'Vinos', 'vinos', '🍷', 2),
    ('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::uuid, 'Cervezas', 'cervezas', '🍺', 3),
    ('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::uuid, 'Comidas', 'comidas', '🍽️', 4),
    ('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::uuid, 'Postres', 'postres', '🍮', 5)
) as v(venue_id, name, slug, icon, "order")
where not exists (
  select 1
  from categories c
  where c.slug = v.slug
  and c.venue_id = v.venue_id
);

-- ============================================================
-- PROMOCIÓN DEMO
-- ============================================================

insert into promotions (
  venue_id,
  name,
  description,
  time_range,
  active
)
select
  'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  'Happy Hour',
  'Cocktails 2×1',
  'Lunes a jueves, 18:00 – 20:00 hs',
  true
where not exists (
  select 1
  from promotions
  where name = 'Happy Hour'
  and venue_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
);