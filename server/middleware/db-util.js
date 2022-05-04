const { DBHandlerInstance } = require('../db/DBHandler');
/* 
 * Will ensure that database connection is initialized once and only once, 
 * no matter which page is visited first.
 */
const initDatabaseConnection = async (req, res, next) => {
    try {
        await DBHandlerInstance.initDatabase();
    }
    catch (err) {
        return next(err);
    }

    return next();
}

/*
 * Receives data from frontend form through the request object and runs a
 * query based on that selection. Appends the query results to the request  * object to use when rendering the 'queries' view 
 */
const runQueryFromForm = async (req, res, next) => {
    const formData = req.body;
    const querySelection = Object.keys(formData)[0];
    let sql = ''
    console.log(querySelection);
    switch (querySelection) {
        case 'expensive-items':
            sql = `
            select * from Item i 
            where i.price > all (
                select avg(price) from Item 
            )
            order by i.price desc
            `;
            break;
        case 'well-stocked-items':
            sql = `
            select * from Item i 
            where i.item_id in (
                select iw.item_id from ItemInWarehouse iw 
                where iw.item_id = i.item_id and
                iw.units_in_stock >= 500
            )
            `;
            break;
        case 'member-table':
            sql = `select * from Member`;
            break;
        case 'warehouse-table':
            sql = `select * from Warehouse`;
            break;
        case 'item-table':
            sql = `select * from Item`;
            break;
        case 'item-in-warehouse-table':
            sql = `select * from ItemInWarehouse`;
            break;
        case 'shopping-cart-table':
            sql = `select * from ShoppingCart`;
            break;
        case 'profile-table':
            sql = `select * from Profile`;
            break;
        case 'transaction-record-table':
            sql = `select * from TransactionRecord`;
            break;
        case 'item-in-cart-table':
            sql = `select * from ItemInCart`;
            break;
        case 'items-by-price-low-high':
            sql = `
            select i.name, i.description, i.price 
            from Item i ORDER BY i.price ASC
            `;
            break;
        case 'items-by-price-high-low':
            sql = `
            select i.name, i.description, i.price 
            from Item i ORDER BY i.price DESC
            `;
            break;
        case 'unique-items-in-warehouse':
            sql = `
            select w.name, COUNT(*) from ItemInWarehouse i, Warehouse w 
            Where i.warehouse_id=w.warehouse_id GROUP BY i.warehouse_id 
            ORDER BY COUNT(*) DESC
            `;
            break;
        case 'member-num-profiles':
            sql = `
            Select m.member_id, COUNT(p.name) 
            FROM Member m, Profile p WHERE m.member_id=p.member_id 
            GROUP BY m.member_id
            `;
            break;
        case 'member-num-unique-items':
            sql = `
            Select s.member_id, c.cart_id, COUNT(c.item_id) 
            FROM ShoppingCart s, ItemInCart c WHERE s.cart_id=c.cart_id 
            GROUP BY c.cart_id ORDER BY COUNT(c.item_id) DESC
            `;
            break;
        case 'member-num-total-items':
            sql = `
            Select s.member_id, c.cart_id, SUM(c.quantity) as 'Total Number of Items'  
            FROM ShoppingCart s, ItemInCart c WHERE s.cart_id=c.cart_id 
            GROUP BY c.cart_id
            `;
            break;
            default:
                sql = 'select * from Item';
                break;
    }

    let results;
    try {
        results = await DBHandlerInstance.runQuery(sql);
    }
    catch (err) {
        console.log(err);
        return next(err);
    }
            
    req.queryResults = results;
    return next();
}

module.exports = { initDatabaseConnection, runQueryFromForm };