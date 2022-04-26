
/*
 * QUERIES
 */
 
 -- at least 2 queries: GROUP BY, HAVING, aggregates
 
 
 -- at least 2 nested queries: IN, op ANY, op ALL 

-- user info for users with more than 5 past orders, oldest users first
select p.name, m.email, m.points, m.create_date from Profile p 
inner join Member m on p.member_id = m.member_id 
where 5 < any (
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