-- Create countries table
CREATE TABLE countries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  code VARCHAR(3) NOT NULL UNIQUE, -- ISO country code (KE, TZ, etc.)
  description TEXT,
  flag_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Countries are viewable by everyone" ON countries
  FOR SELECT USING (true);

-- Create policy for authenticated users to insert/update
CREATE POLICY "Countries are editable by authenticated users" ON countries
  FOR ALL USING (auth.role() = 'authenticated');
