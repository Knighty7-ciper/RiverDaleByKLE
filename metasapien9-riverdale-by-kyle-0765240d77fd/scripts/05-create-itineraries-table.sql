-- Create itineraries table (day-by-day details)
CREATE TABLE itineraries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  title VARCHAR(300) NOT NULL,
  description TEXT NOT NULL,
  activities TEXT[],
  meals_included TEXT[], -- breakfast, lunch, dinner
  accommodation TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(package_id, day_number)
);

-- Enable RLS
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Itineraries are viewable by everyone" ON itineraries
  FOR SELECT USING (true);

CREATE POLICY "Itineraries are editable by authenticated users" ON itineraries
  FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes
CREATE INDEX idx_itineraries_package_id ON itineraries(package_id);
CREATE INDEX idx_itineraries_day_number ON itineraries(package_id, day_number);
