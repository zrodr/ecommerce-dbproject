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
            default:
                sql = 'select * from Item';
                break;
    }

    let results;
    try {
        results = await DBHandlerInstance.runQuery(sql);
    }
    catch (err) {
        return next(err);
    }
            
    req.queryResults = results;
    return next();
}

module.exports = { initDatabaseConnection, runQueryFromForm };