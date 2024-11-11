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

  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
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
  ('Short Masculino Preto', 'Short masculino, confortavel e leve, ideal para o dia a dia.', 39.90),
  ('Polo Masculina', 'Polo masculina manga curta ideal para situacoes arrumadas.', 149.90),
  ('Jaqueta de Couro Preta', 'Jaqueta de couro sintetico com design moderno.', 299.90),
  ('Vestido Floral Midi', 'Vestido com estampa floral, perfeito para ocasioes especiais.', 179.90),
  ('Tenis Casual Branco', 'Tenis confortável em estilo casual para uso diario.', 199.90);

INSERT INTO products_images (url, product_id) VALUES 
  ('https://shop2gether.fbitsstatic.net/img/p/short-masculino-long-drewstring-preto-230941/649396.jpg?w=486&h=650&v=202410231216', 1),
  ('https://shop2gether.fbitsstatic.net/img/p/polo-masculina-manga-curta-basica-preto-231578/651917-5.jpg?w=486&h=650&v=202410301023', 2),
  ('https://shop2gether.fbitsstatic.net/img/p/jaqueta-masculina-lokis-preto-206841/556267.jpg?w=486&h=650&v=no-value', 3),
  ('https://shop2gether.fbitsstatic.net/img/p/vestido-midi-floral-pintado-azul-214024/581941.jpg?w=486&h=650&v=no-value', 4),
  ('https://shop2gether.fbitsstatic.net/img/p/tenis-masculino-branco-194338/506778.jpg?w=486&h=650&v=no-value', 5);
