-- Enable required extensions
create extension if not exists pgcrypto;

-- Enums
create type inquiry_status as enum ('pending','contacted','quoted','confirmed','cancelled');
create type booking_status as enum ('pending','confirmed','cancelled','refunded');

-- Profiles (RBAC)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin','editor','viewer')) default 'viewer',
  full_name text,
  created_at timestamptz not null default now()
);

-- Destinations
create table if not exists destinations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  location text,
  country text,
  category text,
  price_from numeric,
  duration text,
  max_group_size int,
  rating numeric,
  reviews_count int,
  image_url text,
  featured_image text,
  featured boolean not null default false,
  packages_count int not null default 0,
  status text not null default 'active',
  created_at timestamptz not null default now()
);
create index if not exists idx_destinations_created_at on destinations(created_at desc);
create index if not exists idx_destinations_status on destinations(status);
create index if not exists idx_destinations_country on destinations(country);
create index if not exists idx_destinations_category on destinations(category);

-- Hotels
create table if not exists hotels (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  destination_id uuid references destinations(id) on delete set null,
  description text,
  rating numeric,
  price_from numeric,
  status text not null default 'active',
  image_url text,
  created_at timestamptz not null default now()
);
create index if not exists idx_hotels_destination on hotels(destination_id);

-- Inquiries
create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  verification_id text unique not null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  package_id text,
  package_name text,
  package_price numeric,
  adults int not null default 0,
  children int not null default 0,
  quoted_amount numeric,
  inquiry_status inquiry_status not null default 'pending',
  preferred_start_date date,
  special_requests text,
  admin_notes text,
  created_at timestamptz not null default now()
);
create index if not exists idx_inquiries_created_at on inquiries(created_at desc);
create index if not exists idx_inquiries_status on inquiries(inquiry_status);
create index if not exists idx_inquiries_email on inquiries(customer_email);

-- Bookings
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid references inquiries(id) on delete set null,
  customer_name text not null,
  customer_email text not null,
  total_amount numeric not null default 0,
  status booking_status not null default 'pending',
  notes text,
  created_at timestamptz not null default now()
);
create index if not exists idx_bookings_created_at on bookings(created_at desc);
create index if not exists idx_bookings_status on bookings(status);

-- Notification queue (for admin alerts, review approvals, etc.)
create table if not exists notification_queue (
  id uuid primary key default gen_random_uuid(),
  notification_type text not null,
  recipient_email text,
  title text,
  message text,
  review_id uuid,
  created_at timestamptz not null default now(),
  processed_at timestamptz
);

-- Media gallery
create table if not exists media_gallery (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  category text,
  url text not null,
  created_at timestamptz not null default now()
);
create index if not exists idx_media_category on media_gallery(category);
create index if not exists idx_media_created_at on media_gallery(created_at desc);

-- Site settings (singleton row)
create table if not exists site_settings (
  id int primary key default 1,
  company_name text,
  phone_primary text,
  phone_secondary text,
  email_primary text,
  email_secondary text,
  address text,
  city text,
  country text,
  website text,
  description text,
  social_facebook text,
  social_instagram text,
  social_twitter text,
  updated_at timestamptz not null default now()
);
insert into site_settings (id) values (1) on conflict (id) do nothing;
