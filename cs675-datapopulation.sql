
-- Entities

insert into Member (password, email, create_date, points, cart_id) values 
(), 
();

insert into Profile (
	name, phone_number, street_name, city, state, zip_code, member_id
) values 
(),
();

insert into TransactionRecord (order_date, deliver_date, member_id) values
(),
();

insert into ShoppingCart (subtotal, member_id) values
(),
();

insert into Item (name, description, price) values
(),
();

insert into Warehouse (name) values
(),
();

-- relationship tables

insert into ItemInCart (item_id, cart_id, quantity) values
(),
();

insert into ItemInWarehouse (item_id, warehouse_id, units_in_stock) values
(),
();

