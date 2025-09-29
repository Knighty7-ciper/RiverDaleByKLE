-- RIVERDALE TRAVEL - COMPLETE DATABASE SCHEMA
-- World-class luxury travel booking system with admin panel
-- Email: bknglabs.dev@gmail.com

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- CORE CONTENT MANAGEMENT TABLES
-- =============================================

-- Site settings (admin editable)
CREATE TABLE site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  setting_type VARCHAR(50) DEFAULT 'text', -- text, number, boolean, json
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID
);

-- Countries for destinations
CREATE TABLE countries (
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
CREATE TABLE destinations (
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
CREATE TABLE packages (
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
CREATE TABLE package_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Day-by-day itineraries (like Trophilia)
CREATE TABLE package_itineraries (
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
CREATE TABLE package_inclusions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  item TEXT NOT NULL,
  included BOOLEAN NOT NULL, -- true = included, false = excluded
  category VARCHAR(100), -- accommodation, meals, transport, activities, etc
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- CUSTOMER & INQUIRY MANAGEMENT
-- =============================================

-- Customer inquiries with verification system
CREATE TABLE inquiries (
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
  inquiry_status VARCHAR(30) DEFAULT 'pending', -- pending, contacted, quoted, confirmed, cancelled
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
CREATE TABLE inquiry_responses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  inquiry_id UUID NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
  admin_user_id UUID,
  response_type VARCHAR(50) NOT NULL, -- phone_call, email, quotation, confirmation
  message TEXT,
  quotation_amount DECIMAL(12,2),
  quotation_valid_until DATE,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customer database
CREATE TABLE customers (
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

-- Payment tracking (manual until Pesapal integration)
CREATE TABLE payment_records (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  inquiry_id UUID NOT NULL REFERENCES inquiries(id),
  verification_id VARCHAR(20) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'KES',
  payment_method VARCHAR(50), -- bank_transfer, mpesa, cash, pesapal
  payment_status VARCHAR(30) DEFAULT 'pending', -- pending, partial, paid, refunded
  payment_reference TEXT,
  admin_verified_by UUID,
  admin_notes TEXT,
  payment_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- EMAIL & NOTIFICATION SYSTEM
-- =============================================

-- Email logs and notifications
CREATE TABLE email_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  recipient_email VARCHAR(255) NOT NULL,
  sender_email VARCHAR(255) DEFAULT 'bknglabs.dev@gmail.com',
  subject VARCHAR(500) NOT NULL,
  message_body TEXT NOT NULL,
  email_type VARCHAR(50) NOT NULL, -- inquiry_confirmation, admin_alert, quotation, payment_reminder
  inquiry_id UUID REFERENCES inquiries(id),
  status VARCHAR(20) DEFAULT 'sent', -- sent, failed, pending
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notification queue for admin alerts
CREATE TABLE notification_queue (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  notification_type VARCHAR(50) NOT NULL, -- new_inquiry, payment_received, urgent_follow_up
  recipient_email VARCHAR(255) NOT NULL,
  title VARCHAR(300) NOT NULL,
  message TEXT NOT NULL,
  inquiry_id UUID REFERENCES inquiries(id),
  processed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- =============================================
-- ADMIN PANEL MANAGEMENT
-- =============================================

-- Admin users
CREATE TABLE admin_users (
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
CREATE TABLE admin_activity_log (
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
CREATE TABLE dashboard_metrics (
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

-- Countries
CREATE INDEX idx_countries_slug ON countries(slug);
CREATE INDEX idx_countries_featured ON countries(featured) WHERE featured = true;

-- Destinations
CREATE INDEX idx_destinations_country_id ON destinations(country_id);
CREATE INDEX idx_destinations_slug ON destinations(slug);
CREATE INDEX idx_destinations_featured ON destinations(featured) WHERE featured = true;

-- Packages
CREATE INDEX idx_packages_destination_id ON packages(destination_id);
CREATE INDEX idx_packages_slug ON packages(slug);
CREATE INDEX idx_packages_type ON packages(package_type);
CREATE INDEX idx_packages_featured ON packages(featured) WHERE featured = true;
CREATE INDEX idx_packages_active ON packages(active) WHERE active = true;

-- Package Images
CREATE INDEX idx_package_images_package_id ON package_images(package_id);
CREATE INDEX idx_package_images_featured ON package_images(is_featured) WHERE is_featured = true;

-- Inquiries
CREATE INDEX idx_inquiries_verification_id ON inquiries(verification_id);
CREATE INDEX idx_inquiries_email ON inquiries(customer_email);
CREATE INDEX idx_inquiries_status ON inquiries(inquiry_status);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at);
CREATE INDEX idx_inquiries_package_id ON inquiries(package_id);

-- Email Logs
CREATE INDEX idx_email_logs_recipient ON email_logs(recipient_email);
CREATE INDEX idx_email_logs_type ON email_logs(email_type);
CREATE INDEX idx_email_logs_inquiry_id ON email_logs(inquiry_id);

-- Admin Activity
CREATE INDEX idx_admin_activity_user_id ON admin_activity_log(admin_user_id);
CREATE INDEX idx_admin_activity_created_at ON admin_activity_log(created_at);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on sensitive tables
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_log ENABLE ROW LEVEL SECURITY;

-- Public read access for content tables
CREATE POLICY "Public read access" ON countries FOR SELECT USING (active = true);
CREATE POLICY "Public read access" ON destinations FOR SELECT USING (active = true);
CREATE POLICY "Public read access" ON packages FOR SELECT USING (active = true);
CREATE POLICY "Public read access" ON package_images FOR SELECT USING (true);
CREATE POLICY "Public read access" ON package_itineraries FOR SELECT USING (true);
CREATE POLICY "Public read access" ON package_inclusions FOR SELECT USING (true);
CREATE POLICY "Public read access" ON site_settings FOR SELECT USING (true);

-- Inquiry policies
CREATE POLICY "Anyone can create inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Customers can view their own inquiries" ON inquiries 
  FOR SELECT USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Admin-only policies for management tables
CREATE POLICY "Admin only access" ON admin_users FOR ALL USING (
  current_setting('request.jwt.claims', true)::json->>'role' = 'admin'
);

-- =============================================
-- INITIAL SITE SETTINGS
-- =============================================

INSERT INTO site_settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'Riverdale Travel', 'text', 'Website name'),
('site_tagline', 'Discover Kenya''s Hidden Gems', 'text', 'Website tagline'),
('contact_email', 'bknglabs.dev@gmail.com', 'text', 'Main contact email'),
('contact_phone', '+254 700 123 456', 'text', 'Main contact phone'),
('whatsapp_number', '+254 722 000 911', 'text', 'WhatsApp contact number'),
('office_address', 'Nairobi, Kenya', 'text', 'Office location'),
('emergency_contact', '+254 722 000 911', 'text', '24/7 emergency contact'),
('booking_email', 'bknglabs.dev@gmail.com', 'text', 'Booking inquiries email'),
('admin_notification_email', 'bknglabs.dev@gmail.com', 'text', 'Admin notification email'),
('currency_symbol', 'KES', 'text', 'Default currency'),
('timezone', 'Africa/Nairobi', 'text', 'Default timezone'),
('max_inquiry_days', '365', 'number', 'Maximum days ahead for inquiries'),
('auto_quote_enabled', 'false', 'boolean', 'Enable automatic quotations'),
('maintenance_mode', 'false', 'boolean', 'Site maintenance mode');

-- =============================================
-- REAL WORLD DATA - KENYA FOCUS
-- =============================================

-- Insert Kenya as primary country
INSERT INTO countries (name, slug, description, featured_image, currency, timezone, featured, active) VALUES
('Kenya', 'kenya', 'Experience the magic of Kenya with its world-renowned wildlife, stunning landscapes, and rich cultural heritage. From the Great Migration in Maasai Mara to the pristine beaches of the coast.', '/kenya-landscape.png', 'KES', 'Africa/Nairobi', true, true),
('Tanzania', 'tanzania', 'Discover Tanzania''s incredible wildlife and natural wonders, including the Serengeti, Ngorongoro Crater, and Mount Kilimanjaro.', '/tanzania-landscape.png', 'TZS', 'Africa/Dar_es_Salaam', true, true),
('Uganda', 'uganda', 'The Pearl of Africa offers mountain gorillas, diverse wildlife, and stunning landscapes from the Rwenzori Mountains to Lake Victoria.', '/uganda-landscape.png', 'UGX', 'Africa/Kampala', false, true),
('Rwanda', 'rwanda', 'Land of a Thousand Hills featuring mountain gorillas, beautiful lakes, and a remarkable conservation success story.', '/rwanda-landscape.png', 'RWF', 'Africa/Kigali', false, true);

-- Insert major Kenyan destinations
INSERT INTO destinations (country_id, name, slug, description, short_description, featured_image, best_time_to_visit, climate_info, featured, active) VALUES
((SELECT id FROM countries WHERE slug = 'kenya'), 'Maasai Mara National Reserve', 'maasai-mara', 'World-famous for the Great Migration, Maasai Mara offers unparalleled wildlife viewing with lions, leopards, cheetahs, elephants, and over 450 bird species in 1,510 square kilometers of pristine savannah.', 'Witness the Great Migration and Big Five in Kenya''s most famous reserve', '/maasai-mara-safari.png', 'July to October (Great Migration), January to March (calving season)', 'Semi-arid with two rainy seasons. Temperatures range from 12°C to 30°C', true, true),

((SELECT id FROM countries WHERE slug = 'kenya'), 'Amboseli National Park', 'amboseli', 'Famous for its large elephant herds and spectacular views of Mount Kilimanjaro, Amboseli offers incredible photography opportunities and diverse ecosystems from wetlands to savannah.', 'Elephants against the backdrop of Mount Kilimanjaro', '/amboseli-elephants-kilimanjaro.png', 'June to October, January to February', 'Semi-arid climate with temperatures from 16°C to 35°C', true, true),

((SELECT id FROM countries WHERE slug = 'kenya'), 'Diani Beach', 'diani-beach', 'Kenya''s premier beach destination featuring 25km of pristine white sand beaches, coral reefs perfect for diving and snorkeling, and luxury beachfront accommodations along the Indian Ocean.', 'Pristine white sand beaches and coral reefs', '/diani-beach-kenya.png', 'December to March, July to October', 'Tropical climate with temperatures from 22°C to 32°C', true, true),

((SELECT id FROM countries WHERE slug = 'kenya'), 'Mount Kenya National Park', 'mount-kenya', 'Africa''s second-highest peak offering world-class trekking, diverse ecosystems from bamboo forests to alpine zones, and unique wildlife including the endangered Mount Kenya mouse-shrew.', 'Trekking Africa''s second-highest peak', '/mount-kenya-hikers.png', 'January to February, August to September', 'Alpine climate varying from tropical at base to arctic at summit', false, true),

((SELECT id FROM countries WHERE slug = 'kenya'), 'Lake Nakuru National Park', 'lake-nakuru', 'Famous for millions of flamingos creating a pink spectacle, this alkaline lake park also protects black and white rhinos, Rothschild giraffes, and over 400 bird species.', 'Millions of flamingos and rhino sanctuary', '/lake-nakuru-flamingos.png', 'June to September, January to March', 'Semi-arid with temperatures from 10°C to 28°C', false, true),

((SELECT id FROM countries WHERE slug = 'kenya'), 'Samburu National Reserve', 'samburu', 'Home to unique wildlife species including Grevy''s zebra, reticulated giraffe, and Somali ostrich. The Ewaso Ng''iro River creates an oasis in this semi-arid landscape.', 'Unique wildlife in semi-arid landscapes', '/samburu-wildlife.png', 'June to October, December to March', 'Semi-arid with temperatures from 18°C to 35°C', false, true);

-- Success message
SELECT 'Riverdale Travel database schema created successfully! Ready for world-class luxury travel booking system.' as status;
