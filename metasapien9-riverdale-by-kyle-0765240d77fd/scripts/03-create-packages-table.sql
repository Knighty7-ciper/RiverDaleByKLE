-- Create packages table (safari/hotel offerings)
CREATE TABLE packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  name VARCHAR(300) NOT NULL,
  slug VARCHAR(300) NOT NULL UNIQUE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('safari', 'hotel', 'adventure', 'cultural', 'beach')),
  short_description TEXT,
  full_description TEXT,
  duration_days INTEGER NOT NULL,
  duration_nights INTEGER NOT NULL,
  price_usd DECIMAL(10,2) NOT NULL,
  price_currency VARCHAR(3) DEFAULT 'USD',
  max_participants INTEGER,
  min_participants INTEGER DEFAULT 1,
  difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('easy', 'moderate', 'challenging', 'extreme')),
  best_time_to_visit TEXT,
  hero_image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Packages are viewable by everyone" ON packages
  FOR SELECT USING (is_active = true);

CREATE POLICY "Packages are editable by authenticated users" ON packages
  FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes
CREATE INDEX idx_packages_destination_id ON packages(destination_id);
CREATE INDEX idx_packages_type ON packages(type);
CREATE INDEX idx_packages_slug ON packages(slug);
CREATE INDEX idx_packages_featured ON packages(is_featured) WHERE is_featured = true;
