-- Seed products data

-- First, clear existing products
DELETE FROM products;

-- Insert Phone products
INSERT INTO products (name, description, price, category, images) VALUES
(
  'iPhone 13 Pro', 
  'The iPhone 13 Pro features a Super Retina XDR display with ProMotion, A15 Bionic chip, and a pro camera system.', 
  450000, 
  'Phones', 
  ARRAY[
    'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg',
    'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
    'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'
  ]
),
(
  'Samsung Galaxy S22', 
  'The Samsung Galaxy S22 features a Dynamic AMOLED display, powerful processor, and advanced camera system.', 
  380000, 
  'Phones', 
  ARRAY[
    'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
    'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg',
    'https://images.pexels.com/photos/3999538/pexels-photo-3999538.jpeg'
  ]
),
(
  'Google Pixel 6', 
  'The Google Pixel 6 features a stunning display, Google Tensor chip, and an advanced camera system.', 
  320000, 
  'Phones', 
  ARRAY[
    'https://images.pexels.com/photos/1337753/pexels-photo-1337753.jpeg',
    'https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg',
    'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg'
  ]
),
(
  'Xiaomi Redmi Note 11', 
  'The Xiaomi Redmi Note 11 features a 90Hz AMOLED display, Snapdragon processor, and 50MP quad camera.', 
  150000, 
  'Phones', 
  ARRAY[
    'https://images.pexels.com/photos/4348393/pexels-photo-4348393.jpeg',
    'https://images.pexels.com/photos/3999538/pexels-photo-3999538.jpeg',
    'https://images.pexels.com/photos/9555099/pexels-photo-9555099.jpeg'
  ]
);

-- Insert Laptop products
INSERT INTO products (name, description, price, category, images) VALUES
(
  'MacBook Pro 16"', 
  'The 16-inch MacBook Pro features an M1 Pro or M1 Max chip, stunning Liquid Retina XDR display, and exceptional performance.', 
  1200000, 
  'Laptops', 
  ARRAY[
    'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg',
    'https://images.pexels.com/photos/129208/pexels-photo-129208.jpeg',
    'https://images.pexels.com/photos/748777/pexels-photo-748777.jpeg'
  ]
),
(
  'Dell XPS 15', 
  'The Dell XPS 15 features a stunning InfinityEdge display, powerful Intel processor, and premium build quality.', 
  950000, 
  'Laptops', 
  ARRAY[
    'https://images.pexels.com/photos/7974/pexels-photo.jpg',
    'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg',
    'https://images.pexels.com/photos/115655/pexels-photo-115655.jpeg'
  ]
),
(
  'Lenovo ThinkPad X1 Carbon', 
  'The Lenovo ThinkPad X1 Carbon features a lightweight design, powerful performance, and business-grade security features.', 
  850000, 
  'Laptops', 
  ARRAY[
    'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg',
    'https://images.pexels.com/photos/6162932/pexels-photo-6162932.jpeg',
    'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg'
  ]
),
(
  'HP Pavilion Gaming Laptop', 
  'The HP Pavilion Gaming Laptop features a powerful processor, dedicated graphics, and immersive display for gaming and content creation.', 
  520000, 
  'Laptops', 
  ARRAY[
    'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
    'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg',
    'https://images.pexels.com/photos/1266982/pexels-photo-1266982.jpeg'
  ]
);

-- Insert Accessories products
INSERT INTO products (name, description, price, category, images) VALUES
(
  'AirPods Pro', 
  'The AirPods Pro feature Active Noise Cancellation, Transparency mode, and a customizable fit.', 
  120000, 
  'Accessories', 
  ARRAY[
    'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg',
    'https://images.pexels.com/photos/4041393/pexels-photo-4041393.jpeg',
    'https://images.pexels.com/photos/3399535/pexels-photo-3399535.jpeg'
  ]
),
(
  'Samsung Galaxy Watch 4', 
  'The Samsung Galaxy Watch 4 features a sleek design, advanced health monitoring, and smart features.', 
  80000, 
  'Accessories', 
  ARRAY[
    'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    'https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg',
    'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg'
  ]
),
(
  'Anker PowerCore 26800mAh', 
  'The Anker PowerCore 26800mAh power bank features a high capacity battery, fast charging, and multiple ports.', 
  25000, 
  'Accessories', 
  ARRAY[
    'https://images.pexels.com/photos/4062467/pexels-photo-4062467.jpeg',
    'https://images.pexels.com/photos/7350146/pexels-photo-7350146.jpeg',
    'https://images.pexels.com/photos/4256976/pexels-photo-4256976.jpeg'
  ]
),
(
  'Logitech MX Master 3', 
  'The Logitech MX Master 3 features an ergonomic design, customizable buttons, and advanced tracking.', 
  35000, 
  'Accessories', 
  ARRAY[
    'https://images.pexels.com/photos/3825290/pexels-photo-3825290.jpeg',
    'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg',
    'https://images.pexels.com/photos/4087429/pexels-photo-4087429.jpeg'
  ]
);