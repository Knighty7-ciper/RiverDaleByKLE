-- Create package images table
CREATE TABLE package_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  is_hero BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE package_images ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Package images are viewable by everyone" ON package_images
  FOR SELECT USING (true);

CREATE POLICY "Package images are editable by authenticated users" ON package_images
  FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes
CREATE INDEX idx_package_images_package_id ON package_images(package_id);
CREATE INDEX idx_package_images_order ON package_images(display_order);
