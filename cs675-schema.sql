use csc775;
 
create table if not exists Member (
	member_id integer not null auto_increment,
	password varchar(64) not null,
	email varchar(64) not null,
	create_date date not null,
	points integer,
	
	primary key (member_id)
);

create table if not exists Warehouse (
	warehouse_id integer not null auto_increment,
	name varchar(64) not null,
	
	primary key (warehouse_id)
);

create table if not exists Item (
	item_id integer not null auto_increment,
	name varchar(32) not null,
	description varchar(128),
	price float not null,
	
	primary key (item_id)
);
CREATE INDEX Idx_Item_Name_Price
ON Item (name,price);

create table if not exists ItemInWarehouse (
	item_id integer not null,
	warehouse_id integer not null,
	units_in_stock integer not null,
	
	primary key (item_id, warehouse_id),
	foreign key (item_id) references Item(item_id),
	foreign key (warehouse_id) references Warehouse(warehouse_id)
);
CREATE INDEX Idx_ItemInWarehouse_ItemID_UnitsInStock
ON ItemInWarehouse (item_id,units_in_stock);

create table if not exists ShoppingCart (
	cart_id integer not null auto_increment,
	subtotal float,
	member_id integer not null,

	primary key (cart_id),
    foreign key (member_id) references Member(member_id) on delete cascade
);

create table if not exists Profile (
	profile_id integer not null auto_increment,
	name varchar(64) not null,
	phone_number varchar(32),
	street_name varchar(64) not null,
	city varchar(32) not null,
	state varchar(2) not null,
	zip_code varchar(5) not null,
	member_id integer not null,

	primary key (profile_id),
	foreign key (member_id) references Member(member_id) on delete cascade
);
CREATE INDEX Idx_Profile_City_Zip
ON Profile (city,zip_code);

create table if not exists TransactionRecord (
	record_id integer not null auto_increment,
	order_date date not null,
	deliver_date date,
	member_id integer not null,

	primary key (record_id),
	foreign key (member_id) references Member(member_id)
);

create table if not exists ItemInCart (
	item_id integer not null,
	cart_id integer not null,
	quantity integer not null,
	
	primary key (item_id, cart_id),
	foreign key (item_id) references Item(item_id),
	foreign key (cart_id) references ShoppingCart(cart_id)
);

CREATE OR REPLACE VIEW V_Item_Warehouse_Price_Cost AS
SELECT 
	I.name AS Item_Name, 
	I.description AS Item_Description,
	W.name AS Warehouse_Name,
	I.price AS Item_Price,
	IW.units_in_stock,
	I.price * IW.units_in_stock AS warehouse_item_cost
FROM 
	Item I 
	INNER JOIN 
	ItemInWarehouse IW 
	ON (I.item_id = IW.item_id)
	INNER JOIN
	Warehouse W
	ON (IW.warehouse_id = W.warehouse_id)
ORDER BY W.name ASC;

