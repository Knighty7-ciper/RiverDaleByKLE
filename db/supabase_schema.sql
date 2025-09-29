-- Supabase schema for Riverdale Safaris (Postgres-compatible)
-- Run in Supabase SQL Editor. Idempotent where possible.

-- Extensions
create extension if not exists pgcrypto;

-- =====================
-- Core Tables
-- =====================

-- Destinations
create table if not exists public.destinations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  location text,
  country text,
  price_from numeric(12,2),
  duration text,
  max_group_size int,
  rating numeric(3,1),
  reviews_count int,
  image_url text,
  category text,
  featured boolean default false,
  featured_image text,
  packages_count int,
  status text default 'active',
  created_at timestamptz default now()
);

-- Hotels
create table if not exists public.hotels (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  location text,
  country text,
  price_per_night numeric(12,2),
  rating numeric(3,1),
  reviews_count int,
  image_url text,
  category text,
  amenities text[] default '{}',
  featured boolean default false,
  created_at timestamptz default now()
);

-- Packages
create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  description text,
  duration text,
  base_price numeric(12,2),
  rating numeric(3,1),
  best_time text,
  difficulty text,
  max_group_size int,
  images text[] default '{}',
  highlights text[] default '{}',
  itinerary jsonb default '[]',
  inclusions text[] default '{}',
  exclusions text[] default '{}',
  destination_id uuid references public.destinations(id) on delete set null,
  created_at timestamptz default now()
);

-- Inquiries
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  verification_id text unique,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  package_id uuid references public.packages(id) on delete set null,
  package_name text,
  package_price numeric(12,2),
  preferred_start_date date,
  group_size int,
  special_requests text,
  inquiry_status text default 'pending' check (inquiry_status in ('pending','contacted','quoted','confirmed','cancelled')),
  adults int default 0,
  children int default 0,
  quoted_amount numeric(12,2),
  admin_notes text,
  created_at timestamptz default now()
);

-- Customer Reviews
create table if not exists public.customer_reviews (
  id uuid primary key default gen_random_uuid(),
  package_id uuid references public.packages(id) on delete set null,
  customer_name text not null,
  customer_email text,
  customer_location text,
  title text not null,
  content text not null,
  rating int not null check (rating between 1 and 5),
  travel_date date,
  admin_approved boolean default false,
  verified boolean default false,
  featured boolean default false,
  created_at timestamptz default now()
);

-- Notification Queue
create table if not exists public.notification_queue (
  id uuid primary key default gen_random_uuid(),
  notification_type text not null,
  recipient_email text not null,
  title text not null,
  message text not null,
  review_id uuid references public.customer_reviews(id) on delete set null,
  created_at timestamptz default now()
);

-- Admin Users (role tagging)
create table if not exists public.admin_users (
  user_id uuid primary key,
  role text default 'admin',
  created_at timestamptz default now()
);

-- Bookings (future-proof real bookings)
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid references public.inquiries(id) on delete set null,
  package_id uuid references public.packages(id) on delete set null,
  customer_name text,
  customer_email text,
  customer_phone text,
  start_date date,
  end_date date,
  adults int default 0,
  children int default 0,
  total_amount numeric(12,2),
  status text default 'pending' check (status in ('pending','confirmed','paid','cancelled')),
  created_at timestamptz default now()
);

-- =====================
-- Indexes
-- =====================
create index if not exists idx_destinations_featured on public.destinations(featured);
create index if not exists idx_destinations_created_at on public.destinations(created_at desc);
create index if not exists idx_destinations_country on public.destinations(country);
create index if not exists idx_hotels_featured on public.hotels(featured);
create index if not exists idx_hotels_created_at on public.hotels(created_at desc);
create index if not exists idx_hotels_country on public.hotels(country);
create index if not exists idx_packages_destination on public.packages(destination_id);
create index if not exists idx_reviews_package on public.customer_reviews(package_id);
create index if not exists idx_reviews_created_at on public.customer_reviews(created_at desc);

-- =====================
-- RLS + Policies (version-safe)
-- =====================
alter table public.destinations enable row level security;
alter table public.hotels enable row level security;
alter table public.packages enable row level security;
alter table public.inquiries enable row level security;
alter table public.customer_reviews enable row level security;
alter table public.notification_queue enable row level security;
alter table public.bookings enable row level security;

-- Helper: create policy if missing
do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='destinations' and policyname='destinations_public_read'
  ) then
    execute 'create policy destinations_public_read on public.destinations for select using (true)';
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='hotels' and policyname='hotels_public_read'
  ) then
    execute 'create policy hotels_public_read on public.hotels for select using (true)';
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='packages' and policyname='packages_public_read'
  ) then
    execute 'create policy packages_public_read on public.packages for select using (true)';
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='customer_reviews' and policyname='reviews_public_read'
  ) then
    execute 'create policy reviews_public_read on public.customer_reviews for select using (admin_approved = true)';
  end if;
end $$;

-- Bookings/select for admins only via service role; no anon policies
-- Inquiries: inserts via service role only (no anon policies by default)

-- =====================
-- Seed Data (multi-country)
-- =====================
-- Countries: Kenya, Tanzania, Uganda, Rwanda

-- Destinations
insert into public.destinations (id, name, description, location, country, price_from, duration, max_group_size, rating, reviews_count, image_url, category, featured, featured_image, packages_count, status)
values
  (gen_random_uuid(),'Maasai Mara Safari','Experience the Great Migration and wildlife in Kenya''s most celebrated reserve.','Maasai Mara','Kenya',45000,'3-5 days',8,4.9,127,'/maasai-mara-safari.png','Safari',true,'/maasai-mara-safari.png',5,'active'),
  (gen_random_uuid(),'Diani Beach Paradise','Pristine white sand beaches with crystal clear waters and world-class water sports.','Diani Beach','Kenya',32000,'4-7 days',12,4.7,89,'/diani-beach-kenya.png','Beach',true,'/diani-beach-kenya.png',3,'active'),
  (gen_random_uuid(),'Amboseli National Park','Elephant herds with the stunning backdrop of Mount Kilimanjaro.','Amboseli','Kenya',38000,'2-4 days',10,4.6,92,'/amboseli-elephants-kilimanjaro.png','Safari',false,'/amboseli-elephants-kilimanjaro.png',2,'active'),
  (gen_random_uuid(),'Serengeti National Park','Witness the Great Migration across the Serengeti–Mara ecosystem.','Serengeti','Tanzania',52000,'3-6 days',10,4.9,98,'/african-lion-pride-golden-hour.jpg','Safari',true,'/african-lion-pride-golden-hour.jpg',4,'active'),
  (gen_random_uuid(),'Ngorongoro Crater','Unparalleled wildlife viewing in a volcanic caldera.','Ngorongoro','Tanzania',60000,'2-3 days',8,4.8,76,'/cheetah-running-savannah.jpg','Safari',false,'/cheetah-running-savannah.jpg',2,'active'),
  (gen_random_uuid(),'Bwindi Gorilla Trekking','Track endangered mountain gorillas in misty forests.','Bwindi','Uganda',95000,'3 days',6,4.8,61,'/mount-kilimanjaro-sunrise.jpg','Adventure',false,'/mount-kilimanjaro-sunrise.jpg',2,'active'),
  (gen_random_uuid(),'Akagera Big Five Safari','Compact Big Five safari in Akagera National Park.','Akagera','Rwanda',68000,'2-4 days',8,4.6,44,'/maasai-mara-sunset-landscape.jpg','Safari',false,'/maasai-mara-sunset-landscape.jpg',2,'active')
on conflict do nothing;

-- Hotels
insert into public.hotels (id, name, description, location, country, price_per_night, rating, reviews_count, image_url, category, amenities, featured)
values
  (gen_random_uuid(),'Sarova Mara Game Camp','Luxury tented camp in the Maasai Mara.','Maasai Mara','Kenya',15000,4.9,342,'/luxury-safari-camp-maasai-mara.jpg','Luxury Safari Lodge',array['Pool','Spa','Restaurant','Game Drives'],true),
  (gen_random_uuid(),'Diani Reef Beach Resort','Beachfront resort with water sports and spa.','Diani Beach','Kenya',12000,4.7,210,'/luxury-beach-resort-diani-kenya.jpg','Beach Resort',array['Beach Access','Water Sports','Spa','Multiple Restaurants'],true),
  (gen_random_uuid(),'Serena Mountain Lodge','Lodge with mountain views and wildlife viewing.','Mount Kenya','Kenya',18000,4.8,125,'/mountain-lodge-kenya-luxury.jpg','Mountain Lodge',array['Mountain Views','Wildlife Viewing','Restaurant','Guided Hikes'],false),
  (gen_random_uuid(),'Ngorongoro Crater Lodge','Opulent lodge with breathtaking crater views.','Ngorongoro','Tanzania',85900,4.9,128,'/african-lion-pride-golden-hour.jpg','Safari Lodge',array['Game Drives','All-inclusive','Butler Service'],true),
  (gen_random_uuid(),'Kigali Boutique Hotel','Stylish city boutique base for gorilla treks.','Kigali','Rwanda',18900,4.6,76,'/maasai-warriors-traditional-dance.jpg','City Hotel',array['Restaurant','WiFi','Airport Transfers'],false),
  (gen_random_uuid(),'Bwindi Forest Lodge','Comfortable base for gorilla trekking.','Bwindi','Uganda',22000,4.7,64,'/cheetah-running-savannah.jpg','Forest Lodge',array['Guided Treks','Restaurant','Bar'],false)
on conflict do nothing;

-- Packages (one per major destination)
with d_mara as (select id from public.destinations where name='Maasai Mara Safari' limit 1),
     d_serengeti as (select id from public.destinations where name='Serengeti National Park' limit 1),
     d_bwindi as (select id from public.destinations where name='Bwindi Gorilla Trekking' limit 1),
     d_akagera as (select id from public.destinations where name='Akagera Big Five Safari' limit 1)
insert into public.packages (
  id, name, slug, description, duration, base_price, rating, best_time, difficulty, max_group_size, images, highlights, itinerary, inclusions, exclusions, destination_id
)
values
  (gen_random_uuid(),'3-Day Maasai Mara Classic','3-day-maasai-mara-classic','Classic Maasai Mara safari with game drives and optional balloon.','3 Days',45000,4.9,'July - October','Easy',8,
   array['/maasai-mara-safari.png','/african-lion-pride-golden-hour.jpg'],
   array['Great Migration','Big Five','Maasai Culture'],
   '[{"day":1,"title":"Arrival & Afternoon Game Drive","description":"Arrive and enjoy first game drive","activities":["Game Drive","Sundowner"]},{"day":2,"title":"Full Day in Maasai Mara","description":"Explore the reserve","activities":["Morning Drive","Balloon (optional)"]},{"day":3,"title":"Morning Drive & Departure","description":"Final game drive and depart","activities":["Morning Drive"]}]'::jsonb,
   array['Park fees','Accommodation','Meals','Guide'],
   array['International flights','Personal insurance'],
   (select id from d_mara)
  ),
  (gen_random_uuid(),'4-Day Serengeti Explorer','4-day-serengeti-explorer','Explore the plains of Serengeti with expert guides.','4 Days',52000,4.8,'July - October','Easy',10,
   array['/african-lion-pride-golden-hour.jpg','/hot-air-balloon-safari-kenya.jpg'],
   array['Migration Views','Predators','Endless Plains'],
   '[{"day":1,"title":"Arusha to Serengeti","description":"Drive or fly into park","activities":["Transfer","Evening Drive"]},{"day":2,"title":"Serengeti Full Day","description":"Wildlife viewing","activities":["Morning Drive","Afternoon Drive"]},{"day":3,"title":"Balloon & Game Drives","description":"Optional balloon","activities":["Balloon","Game Drive"]},{"day":4,"title":"Departure","description":"Exit the park","activities":["Morning Drive","Transfer"]}]'::jsonb,
   array['Park fees','Accommodation','Meals','Guide'],
   array['Flights','Tips'],
   (select id from d_serengeti)
  ),
  (gen_random_uuid(),'3-Day Bwindi Gorillas','3-day-bwindi-gorillas','Gorilla trekking experience in Bwindi.','3 Days',95000,4.7,'June - September','Moderate',6,
   array['/mount-kilimanjaro-sunrise.jpg'],
   array['Gorilla Trek','Forest Trails'],
   '[{"day":1,"title":"Arrival","description":"Reach Bwindi","activities":["Briefing"]},{"day":2,"title":"Trekking Day","description":"Track gorillas","activities":["Trek","Photography"]},{"day":3,"title":"Departure","description":"Return","activities":["Transfer"]}]'::jsonb,
   array['Permits','Guide','Accommodation'],
   array['International flights'],
   (select id from d_bwindi)
  ),
  (gen_random_uuid(),'2-Day Akagera Highlights','2-day-akagera-highlights','Compact Big Five safari in Akagera NP.','2 Days',68000,4.6,'June - October','Easy',8,
   array['/maasai-mara-sunset-landscape.jpg'],
   array['Big Five','Lake Views'],
   '[{"day":1,"title":"Game Drives","description":"Explore the park","activities":["Game Drive"]},{"day":2,"title":"Morning Drive & Exit","description":"Final drive","activities":["Morning Drive"]}]'::jsonb,
   array['Park fees','Guide'],
   array['Flights'],
   (select id from d_akagera)
  )
on conflict do nothing;

-- Reviews (approved)
with p1 as (select id from public.packages where slug='3-day-maasai-mara-classic' limit 1),
     p2 as (select id from public.packages where slug='4-day-serengeti-explorer' limit 1)
insert into public.customer_reviews (id, package_id, customer_name, customer_email, customer_location, title, content, rating, travel_date, admin_approved, verified, featured)
values
  (gen_random_uuid(), (select id from p1), 'Sarah Johnson', 'sarah@example.com', 'London, UK', 'Absolutely Incredible Experience!', 'Saw the Big Five and the guides were amazing. Highly recommend!', 5, '2024-01-15', true, true, true),
  (gen_random_uuid(), (select id from p2), 'Michael Chen', 'michael@example.com', 'Sydney, AU', 'Professional and Safe Adventure', 'Very professional team, we felt safe and had a great time.', 5, '2024-01-10', true, true, false)
  on conflict do nothing;

-- Notification seed
insert into public.notification_queue (id, notification_type, recipient_email, title, message)
values (gen_random_uuid(),'new_review','bknglabs.dev@gmail.com','New Customer Review Submitted','A new review is awaiting approval.')
on conflict do nothing;
