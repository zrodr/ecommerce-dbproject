// We can re-use the DBHandler class methods in this middleware regardless 
// of which db we're using since they expose the same interface
const { DBHandlerInstance } = require('../db/config');

/* 
 * Will ensure that database connection is initialized once and only once, 
 * no matter which page is visited first.
 */
const initDatabaseConnection = async (req, res, next) => {
    try {
        await DBHandlerInstance.initDatabase();
        next();
    }
    catch (err) {
        next(err);
    }
}

/*
 * Receives values to insert from frontend form. Appends the query results (on insert, 
 * a ResultSetHeader object) to the request object to render on the page.
 */
const insertNewItem = async (req, res, next) => {
    const { name, description, price } = req.body;
    
    try {
        req.queryResults = await DBHandlerInstance.runQuery('insert-item',
            name, description, price
        );
        next();
    } catch (err) {
        next(err);
    }
}

/*
 * Receives data from frontend form through the request object and runs a
 * query based on that selection. Appends the query results to the request  
 * object to use when rendering the 'queries' view 
 */
const runQueryFromForm = async (req, res, next) => {
    const querySelection = Object.keys(req.body)[0];

    try {
        req.queryResults = await DBHandlerInstance.runQuery(querySelection);
        next();
    }
    catch (err) {
        next(err);
    }
}

module.exports = { initDatabaseConnection, insertNewItem, runQueryFromForm };