
/*
 * QUERIES
 */
 
 -- at least 2 queries: GROUP BY, HAVING, aggregates

-- Get all items ordered by price (low to high & high to low)
-- Low to High
select i.name, i.description, i.price from Item i ORDER BY i.price ASC;
-- High to Low
select i.name, i.description, i.price from Item i ORDER BY i.price DESC;

-- Get number of unique items in each warehouse, ordered by number of unique items, descending
select w.name, COUNT(*) from ItemInWarehouse i, Warehouse w Where i.warehouse_id=w.warehouse_id GROUP BY i.warehouse_id ORDER BY COUNT(*) DESC;
 
-- Get number of profiles for each member
Select m.member_id, COUNT(p.name) FROM Member m, Profile p WHERE m.member_id=p.member_id GROUP BY m.member_id;

-- Get Number of items in each member's cart
Select s.member_id, c.cart_id, COUNT(c.item_id) FROM ShoppingCart s, ItemInCart c WHERE s.cart_id=c.cart_id GROUP BY c.cart_id ORDER BY COUNT(c.item_id) DESC;

-- Get total number of items in a member's cart
 Select s.member_id, c.cart_id, SUM(c.quantity) as 'Total Number of Items' FROM ShoppingCart s, ItemInCart c WHERE s.cart_id=c.cart_id GROUP BY c.cart_id;

 -- at least 2 nested queries: IN, op ANY, op ALL 

-- user info for users with more than 3 past orders, oldest users first
select p.name, m.email, m.points, m.create_date from Profile p 
inner join Member m on p.member_id = m.member_id 
where 3 < any (
    select count(*) from TransactionRecord tr where tr.member_id = p.member_id
)
order by m.create_date;

-- items that have a price higher than the average for all products, highest prices first
select * from Item i 
where i.price > all (
    select avg(price) from Item 
)
order by i.price desc;

-- items that are not currently in any member's cart
select i.price, i.name from Item i
where i.item_id not in (
    select ic.item_id from ItemInCart ic where i.item_id = ic.item_id 
);

-- items that are currently "well-stocked" in a warehouse (500 or more units)
select * from Item i 
where i.item_id in (
    select iw.item_id from ItemInWarehouse iw 
    where iw.item_id = i.item_id and
    iw.units_in_stock >= 500
);

-- Total aggregate cost of goods in each unique warehouse using the view
SELECT
	warehouse_name, 
    COUNT(item_name) AS Number_Of_Unique_Items, 
    SUM(warehouse_item_cost) AS Total_Warehouse_Item_Cost 
FROM v_item_warehouse_price_cost 
GROUP BY warehouse_name 
ORDER BY warehouse_name ASC;