use trabalho-db;

-- SET FOREIGN_KEY_CHECKS=0;
-- DROP TABLE IF EXISTS products;
-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS products_images;
-- DROP TABLE IF EXISTS orders;
-- DROP TABLE IF EXISTS orders_items;
-- SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE IF NOT EXISTS products (
  id INT NOT NULL PRIMARY KEY auto_increment,
  name VARCHAR(255) NOT NULL, 
  description VARCHAR(255) NOT NULL,
  price DECIMAL(6,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS products_images (
  id INT NOT NULL PRIMARY KEY auto_increment,
  url VARCHAR(255) NOT NULL,
  product_id INT,

  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS users (
  id int(11) NOT NULL PRIMARY KEY auto_increment,
  name VARCHAR(255) NOT NULL, 
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id int(11) NOT NULL PRIMARY KEY auto_increment,
  user_id INT NOT NULL,
  total DECIMAL(6,2) NOT NULL,
  created_at DATETIME NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS orders_items (
  id int(11) NOT NULL PRIMARY KEY auto_increment,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  order_id INT NOT NULL,

  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

INSERT INTO users (name, email, password) VALUES 
  ('Edmar', 'edmar@gmail.com', 'teste123'),
  ('Gabriel', 'gabriel@gmail.com', 'teste123');

INSERT INTO products (name, description, price) VALUES
  ('Smartphone', 'Latest model smartphone with advanced features', 599.99),
  ('Laptop', 'High-performance laptop for work and play', 1299.99),
  ('Novel', 'Bestselling fiction book', 19.99),
  ('T-shirt', '100% cotton t-shirt', 9.99),
  ('Blender', 'High-speed blender for smoothies', 49.99),
  ('Board Game', 'Fun for the whole family', 29.99);

INSERT INTO products_images (url, product_id) VALUES
  ('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9', 1), 
  ('https://images.unsplash.com/photo-1517336714731-489689fd1ca8', 2), 
  ('https://images.unsplash.com/photo-1529655683826-aba9b3e77383', 3), 
  ('https://images.unsplash.com/photo-1536528087222-ef43dd3bb0f3', 4), 
  ('https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2', 5), 
  ('https://images.unsplash.com/photo-1599699935630-52e39b7d1a2b', 6); 
