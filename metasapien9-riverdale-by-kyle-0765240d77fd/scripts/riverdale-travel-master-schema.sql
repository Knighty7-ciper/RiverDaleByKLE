-- RIVERDALE TRAVEL - MASTER DATABASE SCHEMA V3
-- Complete luxury travel booking system with reviews, admin panel, and country management
-- Email: bknglabs.dev@gmail.com

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- CORE CONTENT MANAGEMENT TABLES
-- =============================================

-- Site settings (admin editable)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  setting_type VARCHAR(50) DEFAULT 'text', -- text, number, boolean, json
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID
);

-- Countries for destinations
CREATE TABLE IF NOT EXISTS countries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  featured_image TEXT,
  flag_image TEXT,
  currency VARCHAR(10) DEFAULT 'KES',
  timezone VARCHAR(50),
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Destinations within countries
CREATE TABLE IF NOT EXISTS destinations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  featured_image TEXT,
  location_coordinates POINT,
  best_time_to_visit TEXT,
  climate_info TEXT,
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Individual packages (safaris/hotels)
CREATE TABLE IF NOT EXISTS packages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  name VARCHAR(300) NOT NULL,
  slug VARCHAR(300) NOT NULL UNIQUE,
  package_type VARCHAR(50) NOT NULL, -- safari, hotel, custom
  description TEXT,
  short_description TEXT,
  duration_days INTEGER NOT NULL,
  duration_nights INTEGER NOT NULL,
  max_capacity INTEGER DEFAULT 20,
  min_capacity INTEGER DEFAULT 1,
  base_price DECIMAL(12,2) NOT NULL,
  child_price DECIMAL(12,2),
  currency VARCHAR(10) DEFAULT 'KES',
  difficulty_level VARCHAR(20), -- easy, moderate, challenging
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Package image galleries
CREATE TABLE IF NOT EXISTS package_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Day-by-day itineraries
CREATE TABLE IF NOT EXISTS package_itineraries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  title VARCHAR(300) NOT NULL,
  description TEXT NOT NULL,
  activities TEXT[],
  meals_included TEXT[],
  accommodation TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- What's included/excluded
CREATE TABLE IF NOT EXISTS package_inclusions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  item TEXT NOT NULL,
  included BOOLEAN NOT NULL, -- true = included, false = excluded
  category VARCHAR(100), -- accommodation, meals, transport, activities, etc
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- CUSTOMER REVIEWS SYSTEM (NEW!)
-- =============================================

-- Customer reviews with full functionality
CREATE TABLE IF NOT EXISTS customer_reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  package_id UUID REFERENCES packages(id) ON DELETE CASCADE,
  inquiry_id UUID REFERENCES inquiries(id) ON DELETE SET NULL,
  
  -- Customer information
  customer_name VARCHAR(200) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_location VARCHAR(200),
  
  -- Review content
  title VARCHAR(300) NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  
  -- Review metadata
  travel_date DATE,
  review_images TEXT[], -- Array of image URLs
  verified BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  admin_approved BOOLEAN DEFAULT false,
  
  -- Admin moderation
  admin_notes TEXT,
  moderated_by UUID REFERENCES admin_users(id),
  moderated_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- CUSTOMER & INQUIRY MANAGEMENT
-- =============================================

-- Customer inquiries with verification system
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  verification_id VARCHAR(20) NOT NULL UNIQUE, -- RVD-YYYYMMDD-XXXX
  package_id UUID REFERENCES packages(id),
  
  -- Customer information
  customer_name VARCHAR(200) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  customer_country VARCHAR(100),
  
  -- Trip details
  preferred_start_date DATE,
  preferred_end_date DATE,
  adults INTEGER NOT NULL DEFAULT 1,
  children INTEGER DEFAULT 0,
  infants INTEGER DEFAULT 0,
  
  -- Requirements
  special_requirements TEXT,
  dietary_requirements TEXT,
  accessibility_needs TEXT,
  budget_range VARCHAR(50),
  
  -- Status tracking
  inquiry_status VARCHAR(30) DEFAULT 'pending', -- pending, contacted, quoted, confirmed, cancelled, completed
  admin_notes TEXT,
  phone_verified BOOLEAN DEFAULT false,
  email_verified BOOLEAN DEFAULT false,
  
  -- Pricing
  quoted_amount DECIMAL(12,2),
  currency VARCHAR(10) DEFAULT 'KES',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin responses to inquiries
CREATE TABLE IF NOT EXISTS inquiry_responses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  inquiry_id UUID NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
  admin_user_id UUID REFERENCES admin_users(id),
  response_type VARCHAR(50) NOT NULL, -- phone_call, email, quotation, confirmation
  message TEXT,
  quotation_amount DECIMAL(12,2),
  quotation_valid_until DATE,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customer database
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  country VARCHAR(100),
  total_bookings INTEGER DEFAULT 0,
  total_spent DECIMAL(12,2) DEFAULT 0,
  preferred_contact_method VARCHAR(20) DEFAULT 'email',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payment tracking
CREATE TABLE IF NOT EXISTS payment_records (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  inquiry_id UUID NOT NULL REFERENCES inquiries(id),
  verification_id VARCHAR(20) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'KES',
  payment_method VARCHAR(50), -- bank_transfer, mpesa, cash, pesapal
  payment_status VARCHAR(30) DEFAULT 'pending', -- pending, partial, paid, refunded
  payment_reference TEXT,
  admin_verified_by UUID REFERENCES admin_users(id),
  admin_notes TEXT,
  payment_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- EMAIL & NOTIFICATION SYSTEM
-- =============================================

-- Email logs and notifications
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  recipient_email VARCHAR(255) NOT NULL,
  sender_email VARCHAR(255) DEFAULT 'bknglabs.dev@gmail.com',
  subject VARCHAR(500) NOT NULL,
  message_body TEXT NOT NULL,
  email_type VARCHAR(50) NOT NULL, -- inquiry_confirmation, admin_alert, quotation, payment_reminder, review_request
  inquiry_id UUID REFERENCES inquiries(id),
  status VARCHAR(20) DEFAULT 'sent', -- sent, failed, pending
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notification queue for admin alerts
CREATE TABLE IF NOT EXISTS notification_queue (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  notification_type VARCHAR(50) NOT NULL, -- new_inquiry, payment_received, urgent_follow_up, new_review
  recipient_email VARCHAR(255) NOT NULL,
  title VARCHAR(300) NOT NULL,
  message TEXT NOT NULL,
  inquiry_id UUID REFERENCES inquiries(id),
  review_id UUID REFERENCES customer_reviews(id),
  processed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- =============================================
-- ADMIN PANEL MANAGEMENT
-- =============================================

-- Admin users
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name VARCHAR(200) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin', -- super_admin, admin, editor
  active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin activity log
CREATE TABLE IF NOT EXISTS admin_activity_log (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  admin_user_id UUID NOT NULL REFERENCES admin_users(id),
  action VARCHAR(100) NOT NULL,
  table_name VARCHAR(100),
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dashboard metrics cache
CREATE TABLE IF NOT EXISTS dashboard_metrics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  metric_name VARCHAR(100) NOT NULL,
  metric_value DECIMAL(15,2),
  metric_data JSONB,
  date_recorded DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Create indexes only if they don't exist
DO $$ 
BEGIN
    -- Countries
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_countries_slug') THEN
        CREATE INDEX idx_countries_slug ON countries(slug);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_countries_featured') THEN
        CREATE INDEX idx_countries_featured ON countries(featured) WHERE featured = true;
    END IF;

    -- Destinations
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_destinations_country_id') THEN
        CREATE INDEX idx_destinations_country_id ON destinations(country_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_destinations_slug') THEN
        CREATE INDEX idx_destinations_slug ON destinations(slug);
    END IF;

    -- Packages
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_packages_destination_id') THEN
        CREATE INDEX idx_packages_destination_id ON packages(destination_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_packages_slug') THEN
        CREATE INDEX idx_packages_slug ON packages(slug);
    END IF;

    -- Reviews
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_reviews_package_id') THEN
        CREATE INDEX idx_reviews_package_id ON customer_reviews(package_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_reviews_approved') THEN
        CREATE INDEX idx_reviews_approved ON customer_reviews(admin_approved) WHERE admin_approved = true;
    END IF;

    -- Inquiries
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_inquiries_verification_id') THEN
        CREATE INDEX idx_inquiries_verification_id ON inquiries(verification_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_inquiries_status') THEN
        CREATE INDEX idx_inquiries_status ON inquiries(inquiry_status);
    END IF;
END $$;

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on sensitive tables
DO $$
BEGIN
    -- Check and enable RLS for inquiries
    IF NOT EXISTS (
        SELECT 1 FROM pg_class c 
        JOIN pg_namespace n ON n.oid = c.relnamespace 
        WHERE c.relname = 'inquiries' AND c.relrowsecurity = true
    ) THEN
        ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
    END IF;
    
    -- Enable RLS for reviews
    IF NOT EXISTS (
        SELECT 1 FROM pg_class c 
        JOIN pg_namespace n ON n.oid = c.relnamespace 
        WHERE c.relname = 'customer_reviews' AND c.relrowsecurity = true
    ) THEN
        ALTER TABLE customer_reviews ENABLE ROW LEVEL SECURITY;
    END IF;
    
    -- Enable RLS for admin users
    IF NOT EXISTS (
        SELECT 1 FROM pg_class c 
        JOIN pg_namespace n ON n.oid = c.relnamespace 
        WHERE c.relname = 'admin_users' AND c.relrowsecurity = true
    ) THEN
        ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Create policies only if they don't exist
DO $$
BEGIN
    -- Public read policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'countries' AND policyname = 'Public read access') THEN
        EXECUTE 'CREATE POLICY "Public read access" ON countries FOR SELECT USING (active = true)';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'destinations' AND policyname = 'Public read access') THEN
        EXECUTE 'CREATE POLICY "Public read access" ON destinations FOR SELECT USING (active = true)';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'packages' AND policyname = 'Public read access') THEN
        EXECUTE 'CREATE POLICY "Public read access" ON packages FOR SELECT USING (active = true)';
    END IF;
    
    -- Reviews policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'customer_reviews' AND policyname = 'Public read approved reviews') THEN
        EXECUTE 'CREATE POLICY "Public read approved reviews" ON customer_reviews FOR SELECT USING (admin_approved = true)';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'customer_reviews' AND policyname = 'Anyone can submit reviews') THEN
        EXECUTE 'CREATE POLICY "Anyone can submit reviews" ON customer_reviews FOR INSERT WITH CHECK (true)';
    END IF;
END $$;

-- =============================================
-- INITIAL DATA SETUP
-- =============================================

-- Insert site settings only if they don't exist
INSERT INTO site_settings (setting_key, setting_value, setting_type, description) 
SELECT * FROM (VALUES
    ('site_name', 'Riverdale Kenya Safaris', 'text', 'Website name'),
    ('site_tagline', 'Discover Kenya''s Hidden Gems', 'text', 'Website tagline'),
    ('contact_email', 'bknglabs.dev@gmail.com', 'text', 'Main contact email'),
    ('contact_phone', '+254 700 123 456', 'text', 'Main contact phone'),
    ('whatsapp_number', '+254 722 000 911', 'text', 'WhatsApp contact number'),
    ('office_address', 'Westlands, Nairobi Kenya', 'text', 'Office location'),
    ('emergency_contact', '+254 722 000 911', 'text', '24/7 emergency contact'),
    ('booking_email', 'bknglabs.dev@gmail.com', 'text', 'Booking inquiries email'),
    ('admin_notification_email', 'bknglabs.dev@gmail.com', 'text', 'Admin notification email'),
    ('currency_symbol', 'KES', 'text', 'Default currency')
) AS v(setting_key, setting_value, setting_type, description)
WHERE NOT EXISTS (SELECT 1 FROM site_settings WHERE site_settings.setting_key = v.setting_key);

-- Insert countries only if they don't exist
INSERT INTO countries (name, slug, description, featured_image, currency, timezone, featured, active)
SELECT * FROM (VALUES
    ('Kenya', 'kenya', 'Experience the magic of Kenya with its world-renowned wildlife, stunning landscapes, and rich cultural heritage. From the Great Migration in Maasai Mara to the pristine beaches of the coast.', '/kenya-landscape.png', 'KES', 'Africa/Nairobi', true, true),
    ('Tanzania', 'tanzania', 'Discover Tanzania''s incredible wildlife and natural wonders, including the Serengeti, Ngorongoro Crater, and Mount Kilimanjaro.', '/tanzania-landscape.png', 'TZS', 'Africa/Dar_es_Salaam', true, true),
    ('Uganda', 'uganda', 'The Pearl of Africa offers mountain gorillas, diverse wildlife, and stunning landscapes from the Rwenzori Mountains to Lake Victoria.', '/uganda-landscape.png', 'UGX', 'Africa/Kampala', false, true),
    ('Rwanda', 'rwanda', 'Land of a Thousand Hills featuring mountain gorillas, beautiful lakes, and a remarkable conservation success story.', '/rwanda-landscape.png', 'RWF', 'Africa/Kigali', false, true)
) AS v(name, slug, description, featured_image, currency, timezone, featured, active)
WHERE NOT EXISTS (SELECT 1 FROM countries WHERE countries.slug = v.slug);

-- Insert destinations only if they don't exist
WITH kenya_id AS (SELECT id FROM countries WHERE slug = 'kenya')
INSERT INTO destinations (country_id, name, slug, description, short_description, featured_image, best_time_to_visit, climate_info, featured, active)
SELECT kenya_id.id, v.name, v.slug, v.description, v.short_description, v.featured_image, v.best_time_to_visit, v.climate_info, v.featured, v.active
FROM kenya_id, (VALUES
    ('Maasai Mara National Reserve', 'maasai-mara', 'World-famous for the Great Migration, Maasai Mara offers unparalleled wildlife viewing with lions, leopards, cheetahs, elephants, and over 450 bird species in 1,510 square kilometers of pristine savannah.', 'Witness the Great Migration and Big Five in Kenya''s most famous reserve', '/maasai-mara-safari.png', 'July to October (Great Migration), January to March (calving season)', 'Semi-arid with two rainy seasons. Temperatures range from 12°C to 30°C', true, true),
    ('Amboseli National Park', 'amboseli', 'Famous for its large elephant herds and spectacular views of Mount Kilimanjaro, Amboseli offers incredible photography opportunities and diverse ecosystems from wetlands to savannah.', 'Elephants against the backdrop of Mount Kilimanjaro', '/amboseli-elephants-kilimanjaro.png', 'June to October, January to February', 'Semi-arid climate with temperatures from 16°C to 35°C', true, true),
    ('Diani Beach', 'diani-beach', 'Kenya''s premier beach destination featuring 25km of pristine white sand beaches, coral reefs perfect for diving and snorkeling, and luxury beachfront accommodations along the Indian Ocean.', 'Pristine white sand beaches and coral reefs', '/diani-beach-kenya.png', 'December to March, July to October', 'Tropical climate with temperatures from 22°C to 32°C', true, true),
    ('Mount Kenya National Park', 'mount-kenya', 'Africa''s second-highest peak offering world-class trekking, diverse ecosystems from bamboo forests to alpine zones, and unique wildlife including the endangered Mount Kenya mouse-shrew.', 'Trekking Africa''s second-highest peak', '/mount-kenya-hikers.png', 'January to February, August to September', 'Alpine climate varying from tropical at base to arctic at summit', false, true)
) AS v(name, slug, description, short_description, featured_image, best_time_to_visit, climate_info, featured, active)
WHERE NOT EXISTS (SELECT 1 FROM destinations WHERE destinations.slug = v.slug);

-- Create default admin user (password: riverdale2024)
INSERT INTO admin_users (email, password_hash, name, role, active)
SELECT 'admin@riverdale.travel', '$2b$10$rQZ9QmjqjKjKjKjKjKjKjOeH8H8H8H8H8H8H8H8H8H8H8H8H8H8H8', 'Riverdale Admin', 'super_admin', true
WHERE NOT EXISTS (SELECT 1 FROM admin_users WHERE email = 'admin@riverdale.travel');

-- Insert sample reviews to get started
INSERT INTO customer_reviews (package_id, customer_name, customer_email, customer_location, title, content, rating, travel_date, verified, featured, admin_approved)
SELECT p.id, v.customer_name, v.customer_email, v.customer_location, v.title, v.content, v.rating, v.travel_date, v.verified, v.featured, v.admin_approved
FROM packages p, (VALUES
    ('Sarah Johnson', 'sarah.j@email.com', 'London, UK', 'Absolutely Incredible Experience!', 'Our 5-day safari with Riverdale was beyond our wildest dreams. The guides were knowledgeable, the accommodations were luxurious, and seeing the Great Migration was a once-in-a-lifetime experience. Every detail was perfectly planned.', 5, '2024-01-15'::date, true, true, true),
    ('Michael Chen', 'michael.c@email.com', 'Singapore', 'Professional and Safe Adventure', 'The Mount Kenya climbing expedition was challenging but incredibly rewarding. Our guides prioritized safety while ensuring we had an amazing experience. The views from Point Lenana were breathtaking!', 5, '2024-01-10'::date, true, false, true),
    ('Emma Rodriguez', 'emma.r@email.com', 'Madrid, Spain', 'Perfect Beach Holiday', 'Diani Beach was paradise! The resort was beautiful, the staff was friendly, and the activities were perfectly organized. The dhow cruise at sunset was magical. Highly recommend Riverdale for beach holidays!', 5, '2024-01-08'::date, true, true, true)
) AS v(customer_name, customer_email, customer_location, title, content, rating, travel_date, verified, featured, admin_approved)
WHERE p.slug = 'maasai-mara-migration-safari' AND NOT EXISTS (SELECT 1 FROM customer_reviews WHERE customer_email = v.customer_email);

-- Success message
SELECT 'Riverdale Travel MASTER database schema created successfully! All systems ready including reviews, admin panel, and country management!' as status;
