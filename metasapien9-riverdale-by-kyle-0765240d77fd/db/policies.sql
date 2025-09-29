-- Enable RLS
alter table destinations enable row level security;
alter table hotels enable row level security;
alter table inquiries enable row level security;
alter table bookings enable row level security;
alter table media_gallery enable row level security;
alter table site_settings enable row level security;
alter table profiles enable row level security;

-- Profiles: users can read/update their own row
create policy if not exists profiles_self_read on profiles
for select using (auth.uid() = id);

create policy if not exists profiles_self_upsert on profiles
for insert with check (auth.uid() = id);

create policy if not exists profiles_self_update on profiles
for update using (auth.uid() = id);

-- Destinations: public read active rows
create policy if not exists destinations_public_read on destinations
for select using (status = 'active');

-- Hotels: public read active rows
create policy if not exists hotels_public_read on hotels
for select using (status = 'active');

-- Inquiries: allow public insert (customers submitting forms)
create policy if not exists inquiries_public_insert on inquiries
for insert with check (true);

-- Inquiries: no public select/update/delete by default (admins via service role bypass RLS)

-- Bookings: no public access

-- Media gallery: public read
create policy if not exists media_public_read on media_gallery
for select using (true);

-- Site settings: public read
create policy if not exists site_settings_public_read on site_settings
for select using (true);
