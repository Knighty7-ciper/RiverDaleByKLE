-- Enhanced schema for better content management and image galleries

-- Add image galleries support
CREATE TABLE destination_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE hotel_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add detailed content fields to destinations
ALTER TABLE destinations ADD COLUMN IF NOT EXISTS highlights TEXT[];
ALTER TABLE destinations ADD COLUMN IF NOT EXISTS inclusions TEXT[];
ALTER TABLE destinations ADD COLUMN IF NOT EXISTS exclusions TEXT[];
ALTER TABLE destinations ADD COLUMN IF NOT EXISTS itinerary JSONB;
ALTER TABLE destinations ADD COLUMN IF NOT EXISTS faq JSONB;
ALTER TABLE destinations ADD COLUMN IF NOT EXISTS difficulty_level VARCHAR(50);
ALTER TABLE destinations ADD COLUMN IF NOT EXISTS best_time_to_visit VARCHAR(255);
ALTER TABLE destinations ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'safari';

-- Add detailed content fields to hotels
ALTER TABLE hotels ADD COLUMN IF NOT EXISTS highlights TEXT[];
ALTER TABLE hotels ADD COLUMN IF NOT EXISTS room_types JSONB;
ALTER TABLE hotels ADD COLUMN IF NOT EXISTS policies JSONB;
ALTER TABLE hotels ADD COLUMN IF NOT EXISTS nearby_attractions TEXT[];
ALTER TABLE hotels ADD COLUMN IF NOT EXISTS check_in_time TIME DEFAULT '14:00';
ALTER TABLE hotels ADD COLUMN IF NOT EXISTS check_out_time TIME DEFAULT '11:00';

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_destination_images_destination_id ON destination_images(destination_id);
CREATE INDEX IF NOT EXISTS idx_hotel_images_hotel_id ON hotel_images(hotel_id);
CREATE INDEX IF NOT EXISTS idx_destination_images_primary ON destination_images(is_primary);
CREATE INDEX IF NOT EXISTS idx_hotel_images_primary ON hotel_images(is_primary);
CREATE INDEX IF NOT EXISTS idx_destinations_category ON destinations(category);
