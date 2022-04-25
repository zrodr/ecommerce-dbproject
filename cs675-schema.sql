
/*
 * DB TABLE CREATION
 * 
 * Required:
 * 	- at least one index on tables of our choosing
 *
 *	create index <index-name> on db.table(column);
 *
 *	- one view
 *
 *	create view [<view-name>] as
 *	<sql-query> ;
 */

create table if not exists Member (
	member_id integer not null auto_increment,
	password varchar(64) not null,
	email varchar(64) not null,
	create_date date not null,
	points integer,
	
	cart_id integer not null,
	
	primary key (member_id),
	foreign key (cart_id) references ShoppingCart(cart_id) on delete cascade
)

-- Member -> Profile = mandatory one-to-many
-- Member -> ShoppingCart = one-to-one
-- Member -> TransactionRecord = one-to-many

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
)

create table if not exists TransactionRecord (
	record_id integer not null auto_increment,
	order_date date not null,
	deliver_date date,
	
	member_id integer not null,
	
	primary key (record_id),
	foreign key (member_id) references Member(member_id)
)

-- ShoppingCart -> Member = one-to-one
create table if not exists ShoppingCart (
	cart_id integer not null auto_increment,
	subtotal float,
	
	member_id integer not null,
	
	primary key (cart_id),
	foreign key (member_id) references Member(member_id) on delete cascade
)

-- ShoppingCart <-> Item = many-to-many
-- intermediary table: stores which carts are currently holding which item
create table if not exists ItemInCart (
	item_id integer not null,
	cart_id integer not null,
	quantity integer not null,
	
	primary key (item_id, cart_id),
	foreign key (item_id) references Item(item_id),
	foreign key (cart_id) references ShoppingCart(cart_id)
)

create table if not exists Item (
	item_id integer not null auto_increment,
	name varchar(32) not null,
	description varchar(128),
	price float not null,
	
	primary key (item_id)
)

-- Item <-> Warehouse = many-to-many
-- intermediary table: stores which items are in stock at a certain warehouse
create table if not exists ItemInWarehouse (
	item_id integer not null,
	warehouse_id integer not null,
	units_in_stock integer not null,
	
	primary key (item_id, warehouse_id),
	foreign key (item_id) references Item(item_id),
	foreign key (warehouse_id) references Warehouse(warehouse_id)
)

create table if not exists Warehouse (
	warehouse_id integer not null auto_increment,
	name varchar(64) not null,
	
	primary key (warehouse_id)
)
