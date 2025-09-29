-- 00_schema.sql
-- Transactional schema: extensions, tables, constraints, functions, triggers, RLS (policies),
-- sample seed rows (optional), and non-CONCURRENT indexes (only when acceptable).
-- NOTE: Do NOT include CREATE INDEX CONCURRENTLY here. Run 01_post_indexes_non_transactional.sql after.

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Tables (drop in correct order for idempotency if you need)
DROP TABLE IF EXISTS audit_log CASCADE;
DROP TABLE IF EXISTS notification_queue CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS customer_reviews CASCADE;
DROP TABLE IF EXISTS inquiries CASCADE;
DROP TABLE IF EXISTS packages CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS hotels CASCADE;
DROP TABLE IF EXISTS destinations CASCADE;

-- destinations
CREATE TABLE destinations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    location text,
    country text,
    price_from numeric(12,2),
    duration text,
    max_group_size int,
    rating numeric(3,1),
    reviews_count int NOT NULL DEFAULT 0 CHECK (reviews_count >= 0),
    image_url text,
    category text,
    featured boolean NOT NULL DEFAULT false,
    featured_image text,
    packages_count int NOT NULL DEFAULT 0 CHECK (packages_count >= 0),
    status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'draft')),
    created_at timestamptz NOT NULL DEFAULT now()
);

-- hotels
CREATE TABLE hotels (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    location text,
    country text,
    price_per_night numeric(12,2),
    rating numeric(3,1),
    reviews_count int NOT NULL DEFAULT 0 CHECK (reviews_count >= 0),
    image_url text,
    category text,
    amenities text[] NOT NULL DEFAULT '{}',
    featured boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- packages
CREATE TABLE packages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    slug text UNIQUE,
    description text,
    duration text,
    base_price numeric(12,2),
    rating numeric(3,1),
    best_time text,
    difficulty text CHECK (difficulty IN ('Easy', 'Moderate', 'Challenging', 'Expert')),
    max_group_size int,
    images text[] NOT NULL DEFAULT '{}',
    highlights text[] NOT NULL DEFAULT '{}',
    itinerary jsonb NOT NULL DEFAULT '[]'::jsonb,
    inclusions text[] NOT NULL DEFAULT '{}',
    exclusions text[] NOT NULL DEFAULT '{}',
    destination_id uuid REFERENCES destinations(id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- inquiries
CREATE TABLE inquiries (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    verification_id text UNIQUE,
    customer_name text NOT NULL,
    customer_email text NOT NULL,
    customer_phone text NOT NULL,
    package_id uuid REFERENCES packages(id) ON DELETE SET NULL,
    package_name text,
    package_price numeric(12,2),
    preferred_start_date date,
    group_size int,
    special_requests text,
    inquiry_status text NOT NULL DEFAULT 'pending' CHECK (inquiry_status IN ('pending', 'contacted', 'quoted', 'confirmed', 'cancelled')),
    adults int NOT NULL DEFAULT 0 CHECK (adults >= 0),
    children int NOT NULL DEFAULT 0 CHECK (children >= 0),
    quoted_amount numeric(12,2),
    admin_notes text,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- customer_reviews
CREATE TABLE customer_reviews (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    package_id uuid REFERENCES packages(id) ON DELETE SET NULL,
    customer_name text NOT NULL,
    customer_email text,
    customer_location text,
    title text NOT NULL,
    content text NOT NULL,
    rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
    travel_date date,
    admin_approved boolean NOT NULL DEFAULT false,
    verified boolean NOT NULL DEFAULT false,
    featured boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- notification_queue
CREATE TABLE notification_queue (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    notification_type text NOT NULL CHECK (notification_type IN ('new_review', 'inquiry_received', 'booking_confirmed', 'payment_received')),
    recipient_email text NOT NULL,
    title text NOT NULL,
    message text NOT NULL,
    review_id uuid REFERENCES customer_reviews(id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- bookings
CREATE TABLE bookings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_id uuid REFERENCES inquiries(id) ON DELETE SET NULL,
    package_id uuid REFERENCES packages(id) ON DELETE SET NULL,
    customer_name text,
    customer_email text,
    customer_phone text,
    start_date date,
    end_date date,
    adults int NOT NULL DEFAULT 0 CHECK (adults >= 0),
    children int NOT NULL DEFAULT 0 CHECK (children >= 0),
    total_amount numeric(12,2),
    status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'paid', 'cancelled', 'completed')),
    created_at timestamptz NOT NULL DEFAULT now()
);

-- admin_users
CREATE TABLE admin_users (
    user_id uuid PRIMARY KEY,
    role text NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin', 'manager')),
    created_at timestamptz NOT NULL DEFAULT now()
);

-- audit_log
CREATE TABLE IF NOT EXISTS audit_log (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name text NOT NULL,
    record_id uuid,
    action text NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
    old_values jsonb,
    new_values jsonb,
    user_id uuid,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- FUNCTIONS & TRIGGERS

-- generate_verification_id: safer implementation using advisory lock to avoid race conditions
CREATE OR REPLACE FUNCTION generate_verification_id()
RETURNS TRIGGER AS $$
DECLARE
    today_date text := to_char(CURRENT_DATE, 'YYYYMMDD');
    seq_id bigint;
    new_verification_id text;
BEGIN
    -- Use an advisory lock for sequence generation per day (key derived from date)
    PERFORM pg_advisory_xact_lock(hashtext('verification_id_' || today_date));

    SELECT COALESCE(MAX(CAST(SPLIT_PART(verification_id, '-', 3) AS INTEGER)), 0)
    INTO seq_id
    FROM inquiries
    WHERE verification_id LIKE 'RVD-' || today_date || '-%';

    seq_id := seq_id + 1;
    new_verification_id := 'RVD-' || today_date || '-' || LPAD(seq_id::text, 4, '0');

    NEW.verification_id := new_verification_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql VOLATILE;

DROP TRIGGER IF EXISTS trigger_generate_verification_id ON inquiries;
CREATE TRIGGER trigger_generate_verification_id
    BEFORE INSERT ON inquiries
    FOR EACH ROW
    WHEN (NEW.verification_id IS NULL)
    EXECUTE FUNCTION generate_verification_id();

-- update_destination_packages_count: defensive version preventing negative counts and NULL destination_id handling
CREATE OR REPLACE FUNCTION update_destination_packages_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        IF NEW.destination_id IS NOT NULL THEN
            UPDATE destinations SET packages_count = COALESCE(packages_count,0) + 1 WHERE id = NEW.destination_id;
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        IF OLD.destination_id IS NOT NULL THEN
            UPDATE destinations SET packages_count = GREATEST(COALESCE(packages_count,0) - 1, 0) WHERE id = OLD.destination_id;
        END IF;
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.destination_id IS DISTINCT FROM NEW.destination_id THEN
            IF OLD.destination_id IS NOT NULL THEN
                UPDATE destinations SET packages_count = GREATEST(COALESCE(packages_count,0) - 1, 0) WHERE id = OLD.destination_id;
            END IF;
            IF NEW.destination_id IS NOT NULL THEN
                UPDATE destinations SET packages_count = COALESCE(packages_count,0) + 1 WHERE id = NEW.destination_id;
            END IF;
        END IF;
    END IF;
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_packages_count ON packages;
CREATE TRIGGER trigger_update_packages_count
    AFTER INSERT OR UPDATE OR DELETE ON packages
    FOR EACH ROW
    EXECUTE FUNCTION update_destination_packages_count();

-- Simple audit trigger for key tables (example: packages)
CREATE OR REPLACE FUNCTION audit_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_log(table_name, record_id, action, new_values, user_id)
        VALUES (TG_TABLE_NAME, NEW.id, 'INSERT', to_jsonb(NEW), NULL);
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log(table_name, record_id, action, old_values, new_values, user_id)
        VALUES (TG_TABLE_NAME, NEW.id, 'UPDATE', to_jsonb(OLD), to_jsonb(NEW), NULL);
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_log(table_name, record_id, action, old_values, user_id)
        VALUES (TG_TABLE_NAME, OLD.id, 'DELETE', to_jsonb(OLD), NULL);
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Attach audit trigger to packages (extend to other tables as desired)
DROP TRIGGER IF EXISTS trigger_audit_packages ON packages;
CREATE TRIGGER trigger_audit_packages
    AFTER INSERT OR UPDATE OR DELETE ON packages
    FOR EACH ROW
    EXECUTE FUNCTION audit_changes();

-- RLS: Enable on tables
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Public read: only active destinations, hotels and packages visible
CREATE POLICY "public_read_destinations" ON destinations FOR SELECT USING (status = 'active');
CREATE POLICY "public_read_hotels" ON hotels FOR SELECT USING (true);
CREATE POLICY "public_read_packages" ON packages FOR SELECT USING (true);
CREATE POLICY "public_read_reviews" ON customer_reviews FOR SELECT USING (admin_approved = true);

-- Public insert for inquiries & reviews but validate via WITH CHECK to reduce spoof/bad data
CREATE POLICY "public_insert_inquiries" ON inquiries FOR INSERT WITH CHECK (
    customer_name IS NOT NULL AND customer_email IS NOT NULL
);
CREATE POLICY "public_insert_reviews" ON customer_reviews FOR INSERT WITH CHECK (
    customer_name IS NOT NULL AND rating BETWEEN 1 AND 5 AND title IS NOT NULL AND content IS NOT NULL
);

-- Admin full access: use an explicit helper that checks admin_users table
-- helper function to check admin membership (stable, security definer)
CREATE OR REPLACE FUNCTION is_admin(user_uuid uuid) RETURNS boolean
LANGUAGE sql SECURITY DEFINER AS $$
    SELECT EXISTS (SELECT 1 FROM admin_users WHERE user_id = user_uuid);
$$;

REVOKE EXECUTE ON FUNCTION is_admin(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION is_admin(uuid) TO authenticated;

-- Admin policies using helper
CREATE POLICY "admin_all_destinations" ON destinations FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "admin_all_hotels" ON hotels FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "admin_all_packages" ON packages FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "admin_all_inquiries" ON inquiries FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "admin_all_reviews" ON customer_reviews FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "admin_all_bookings" ON bookings FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "admin_all_notifications" ON notification_queue FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "admin_all_admin_users" ON admin_users FOR ALL USING (is_admin(auth.uid()));

-- Optional sample seed data: insert core destinations & hotels (you included these as real data)
-- It's safer to insert AFTER RLS policies are set and when run by a privileged user (service_role)
-- Consider running the seed step using service_role or separately in migration pipeline.

-- ADMIN USER INSERT (run after auth.users exists and as a privileged user)
-- The following is idempotent and will update role if present.
INSERT INTO admin_users (user_id, role)
SELECT u.id, 'super_admin' FROM auth.users u WHERE u.email = 'bknglabs.dev@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET role = EXCLUDED.role;

-- Non-concurrent index examples (safe inside a transaction only if you accept locks):
-- NOTE: If you want zero-downtime, do NOT create these here; instead create them in the non-transactional file using CONCURRENTLY.
CREATE INDEX IF NOT EXISTS idx_destinations_country ON destinations(country);
CREATE INDEX IF NOT EXISTS idx_packages_destination_id ON packages(destination_id);
CREATE INDEX IF NOT EXISTS idx_packages_slug ON packages(slug);

-- End of transactional schema file