
insert into Member (password, email, create_date, points) values
   ('muQ7Cl5mglFJ', 'lmushet0@tamu.edu','2020-08-14', 99), 
   ('aacfepWwwG', 'efourman1@forbes.com','2020-03-13', 49), 
   ('CS3myVisIu7', 'fdalligan2@blog.com','2019-11-05', 96), 
   ('qjEUo4', 'dchinn3@phoca.cz','2020-07-13', 74), 
   ('AkrMJUf', 'pedworthie4@amazon.co.uk','2019-10-28', 5), 
   ('V9AuSDXlj', 'rkalinsky5@godaddy.com','2020-08-07', 11), 
   ('evT2xY', 'lradsdale6@phpbb.com','2020-07-02', 65), 
   ('ngZPoOo', 'awimpress7@army.mil','2019-08-28', 81), 
   ('57ju0v', 'mfeldbaum8@nytimes.com','2020-11-07', 74), 
   ('ETtif28ON9d6', 'ajewise9@cbsnews.com','2021-02-27', 38), 
   ('CNZO7Nxlx', 'agradona@cbsnews.com','2020-07-03', 32), 
   ('jvAbxXtJC9HI', 'agrigorianb@4shared.com','2019-06-20', 47), 
   ('FbBaY4T7Om', 'ejanneyc@tamu.edu','2020-07-13', 57), 
   ('n1dHYsg5qO', 'eghiriardellid@drupal.org','2019-09-15', 66), 
   ('yKkbf2Xw', 'messamee@is.gd','2019-12-18', 41);

insert into Warehouse (name) values
('New York'),
('Orlando'),
('Boston'),
('Miami'),
('San Francisco'),
('Los Angeles'),
('Chicago'),
('Kansas City'),
('Denver'),
('Dallas'),
('Houston'),
('Austin'),
('Salt Lake City'),
('Seattle'),
('Oklahoma City');

insert into Item (name, description, price) values
('Custom Liquid Cooled Gaming PC', 'Can run any game in 4K @ 60fps', 5000),
('Nintendo Switch', 'Portable gaming console', 400),
('Mechanical Keyboard', 'Cherry MX Red Lubed Switches', 200),
('Headphones', '7.1 Surround Sound', 150),
('Microphone', 'Noise canelling microphone', 100),
('Gaming Monitor', '1920x1080, 360hz refresh rate', 250),
('RGB Lighting Kit', 'Improves FPS', 50),
('Speakers', '2 speakers with a subwoofer', 400),
('Mouse pad', 'XL mousepad', 50),
('RAM', '16GB 3800Mhz', 140),
('SSD', '1TB', 150),
('Motherboard', 'Z-690', 500),
('Racing wheel', 'F1 wheel', 1500),
('Mouse', '16000 dpi', 50),
('Wireless charger', '45W', 35);

insert into ItemInWarehouse (item_id, warehouse_id, units_in_stock) values
(1, 1, 1000),
(2, 1, 500),
(3, 1, 550),
(4, 1, 750),
(2, 2, 5000),
(2, 3, 100),
(3, 2, 550),
(4, 2, 480),
(3, 3, 500),
(14, 4, 784),
(2, 4, 2000),
(3, 4, 600),
(4, 4, 650),
(5, 5, 950),
(6, 6, 850),
(7, 7, 7890),
(8, 8, 500),
(9, 9, 200),
(10, 10, 450),
(11, 11, 350),
(12, 12, 850),
(13, 13, 750),
(14, 14, 4450),
(15, 15, 5520);

insert into ShoppingCart (subtotal, member_id) values
  (2000, 1),
  (85, 2),
  (290, 3),
  (650, 4),
  (640, 5),
  (1550, 6),
  (1535, 7),
  (600, 8),
  (5400, 9),
  (5000, 10),
  (5200, 11),
  (5050, 12),
  (7000, 13),
  (2085, 14),
  (2650, 15);

insert into ItemInCart (item_id, cart_id, quantity) values
   (1, 1, 2), 
   (2, 1, 1), 
   (3, 1, 6), 
   (4, 1, 4), 
   (5, 1, 2),
   (2, 2, 1), 
   (3, 2, 6), 
   (4, 2, 4), 
   (5, 2, 2),
   (2, 3, 1), 
   (3, 3, 6), 
   (4, 4, 4), 
   (5, 5, 2), 
   (2, 5, 1), 
   (3, 5, 6), 
   (4, 5, 4), 
   (5, 6, 2),
   (6, 6, 3), 
   (7, 7, 7), 
   (8, 8, 4), 
   (9, 9, 1), 
   (10, 10, 4), 
   (11, 11, 2), 
   (12, 12, 4), 
   (13, 13, 8), 
   (14, 14, 5), 
   (15, 15, 4);
   
insert into Profile (name, phone_number, street_name, city, state, zip_code, member_id) values 
   ('Rikki Skinley', '202-640-2224', 'Schlimgen','Washington', 'DC', '20062', 1),
   ('John Paulmann', '330-647-4709', 'Bunting','Akron', 'OH', '44329', 1),
   ('Stinky Doe', '806-273-5459', 'Harbort','Amarillo', 'TX', '79116', 1),
   ('TP Prestner', '812-254-4276', 'Fallview','Bloomington', 'IN', '47405', 1),
   ('Carmita Grisent', '310-420-7496', 'Garrison','Anaheim', 'CA', '92805', 1),
   ('Randy Paulmann', '330-647-4709', 'Bunting','Akron', 'OH', '44329', 2),
	('Stinky Carmita', '330-647-4709', 'Bunting','Akron', 'OH', '44329', 2),
   ('Grisent Eakens', '806-273-5459', 'Harbort','Amarillo', 'TX', '79116', 3), 
   ('Eakens Prestner', '812-254-4276', 'Fallview','Bloomington', 'IN', '47405', 3),
   ('Carmita Bau', '310-420-7496', 'Garrison','Anaheim', 'CA', '92805', 2),
   ('Stinky Eakens', '806-273-5459', 'Harbort','Amarillo', 'TX', '79116', 3), 
   ('Noelle Prestner', '812-254-4276', 'Fallview','Bloomington', 'IN', '47405', 4),
   ('Carmita Grisenthwaite', '310-420-7496', 'Garrison','Anaheim', 'CA', '92805', 5),
   ('Tomi Connors', '202-871-0179', 'Banding','Washington', 'DC', '20078', 6),
   ('Carolus Ferrucci', '719-868-0801', 'Nancy','Colorado Springs', 'CO', '80930', 7), 
   ('Enrico Whaplington', '334-200-7561', 'Holy Cross','Montgomery', 'AL', '36125', 8), 
   ('Julieta Goodlatt', '281-233-2360', 'Warrior','Pasadena', 'TX', '77505', 9),
   ('Ynes Crigane', '302-727-9824', 'Del Sol','Wilmington', 'DL', '19886', 10), 
   ('Chandler Briscam', '352-258-7344', '4th','Ocala', 'FL', '34479', 11), 
   ('Valentia Rapper', '253-443-4352', 'Forster','Kent', 'WA', '98042', 12), 
   ('Chris Palay', '713-533-2264', 'Spohn','Houston', 'TX', '77234', 13), 
   ('Barnaby Carslake', '919-636-1035', 'Express','Raleigh', 'NC', '27615', 14), 
   ('Marketa McLese', '303-587-7149', 'Autumn Leaf','Denver', 'CO', '80262', 15);

insert into TransactionRecord (order_date, deliver_date, member_id) values
   ('2020-09-14','2020-09-18', 1), 
   ('2020-04-13','2020-04-18', 2), 
   ('2019-12-05','2019-12-14', 3), 
   ('2020-08-13','2020-08-20', 4), 
   ('2019-11-28','2019-11-30', 5), 
   ('2020-09-07','2020-09-15', 6), 
   ('2020-08-02','2020-08-24', 7), 
   ('2019-09-28','2019-10-05', 8), 
   ('2020-12-07','2021-01-10', 9), 
   ('2021-03-27','2021-03-29', 10), 
   ('2020-08-03','2020-08-14', 11), 
   ('2019-07-20','2019-07-26', 12), 
   ('2020-08-13','2020-08-18', 13), 
   ('2019-10-15','2019-10-21', 14), 
   ('2020-01-18','2020-01-25', 15),
   ('2020-04-13','2020-04-18', 1), 
   ('2019-12-05','2019-12-12', 1), 
   ('2020-08-13','2020-08-23', 1),
   ('2020-08-13','2020-08-15', 2), 
   ('2019-10-15','2019-10-26', 2), 
   ('2020-01-18','2020-01-15', 2),
   ('2020-09-07','2020-09-30', 3), 
   ('2020-08-02','2020-08-15', 5), 
   ('2019-09-28','2019-10-12', 7), 
   ('2020-12-07','2021-01-12', 4), 
   ('2021-03-27','2021-03-24', 6);