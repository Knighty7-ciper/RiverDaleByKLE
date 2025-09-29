-- Create package inclusions table
CREATE TABLE package_inclusions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  item TEXT NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('included', 'excluded')),
  category VARCHAR(50), -- transport, accommodation, meals, activities, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE package_inclusions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Package inclusions are viewable by everyone" ON package_inclusions
  FOR SELECT USING (true);

CREATE POLICY "Package inclusions are editable by authenticated users" ON package_inclusions
  FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes
CREATE INDEX idx_package_inclusions_package_id ON package_inclusions(package_id);
CREATE INDEX idx_package_inclusions_type ON package_inclusions(type);
