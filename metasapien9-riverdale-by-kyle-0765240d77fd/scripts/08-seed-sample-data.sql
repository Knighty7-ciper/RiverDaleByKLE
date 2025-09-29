-- Insert sample countries
INSERT INTO countries (name, code, description) VALUES
('Kenya', 'KE', 'Home to the Great Migration and diverse wildlife including the Big Five'),
('Tanzania', 'TZ', 'Famous for Serengeti National Park and Mount Kilimanjaro'),
('Uganda', 'UG', 'The Pearl of Africa with mountain gorillas and diverse landscapes'),
('Rwanda', 'RW', 'Land of a thousand hills with mountain gorillas and beautiful scenery');

-- Insert sample destinations
INSERT INTO destinations (country_id, name, slug, description, short_description) VALUES
((SELECT id FROM countries WHERE code = 'KE'), 'Maasai Mara', 'maasai-mara', 'World-famous for the Great Migration and abundant wildlife', 'Witness the Great Migration'),
((SELECT id FROM countries WHERE code = 'KE'), 'Amboseli National Park', 'amboseli', 'Famous for large elephant herds and views of Mount Kilimanjaro', 'Elephants with Kilimanjaro backdrop'),
((SELECT id FROM countries WHERE code = 'KE'), 'Diani Beach', 'diani-beach', 'Pristine white sand beaches on the Indian Ocean coast', 'Tropical beach paradise'),
((SELECT id FROM countries WHERE code = 'TZ'), 'Serengeti National Park', 'serengeti', 'Endless plains teeming with wildlife and the Great Migration', 'The Great Migration epicenter'),
((SELECT id FROM countries WHERE code = 'TZ'), 'Ngorongoro Crater', 'ngorongoro', 'UNESCO World Heritage site with incredible wildlife density', 'Natural wonder crater'),
((SELECT id FROM countries WHERE code = 'UG'), 'Bwindi Impenetrable Forest', 'bwindi', 'Home to mountain gorillas in ancient rainforest', 'Mountain gorilla trekking');

-- Insert sample safari packages
INSERT INTO packages (destination_id, name, slug, type, short_description, full_description, duration_days, duration_nights, price_usd, max_participants) VALUES
((SELECT id FROM destinations WHERE slug = 'maasai-mara'), 'Maasai Mara Great Migration Safari', 'maasai-mara-migration-safari', 'safari', 'Witness the spectacular Great Migration in Maasai Mara', 'Experience one of nature''s greatest spectacles as millions of wildebeest and zebras cross the Mara River. This safari includes game drives, cultural visits, and luxury accommodation.', 4, 3, 1299.00, 8),
((SELECT id FROM destinations WHERE slug = 'amboseli'), 'Amboseli Elephant Safari', 'amboseli-elephant-safari', 'safari', 'Get up close with elephants against Kilimanjaro backdrop', 'Explore Amboseli National Park, famous for its large elephant herds and stunning views of Mount Kilimanjaro. Perfect for photography enthusiasts.', 3, 2, 899.00, 6),
((SELECT id FROM destinations WHERE slug = 'serengeti'), 'Serengeti Classic Safari', 'serengeti-classic-safari', 'safari', 'Classic Serengeti experience with Big Five', 'Discover the endless plains of Serengeti with excellent chances of seeing the Big Five. Includes hot air balloon safari option.', 5, 4, 1899.00, 8);

-- Insert sample hotel packages
INSERT INTO packages (destination_id, name, slug, type, short_description, full_description, duration_days, duration_nights, price_usd, max_participants) VALUES
((SELECT id FROM destinations WHERE slug = 'diani-beach'), 'Diani Beach Resort Getaway', 'diani-beach-resort', 'hotel', 'Luxury beach resort experience on pristine white sands', 'Relax at a luxury beachfront resort with world-class amenities, water sports, and spa treatments. Perfect for honeymoons and family vacations.', 5, 4, 799.00, 4);
