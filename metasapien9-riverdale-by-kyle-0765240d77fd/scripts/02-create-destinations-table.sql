-- Create destinations table
CREATE TABLE destinations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  hero_image_url TEXT,
  location_coordinates POINT, -- For map integration later
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Destinations are viewable by everyone" ON destinations
  FOR SELECT USING (is_active = true);

CREATE POLICY "Destinations are editable by authenticated users" ON destinations
  FOR ALL USING (auth.role() = 'authenticated');

-- Create index for better performance
CREATE INDEX idx_destinations_country_id ON destinations(country_id);
CREATE INDEX idx_destinations_slug ON destinations(slug);
