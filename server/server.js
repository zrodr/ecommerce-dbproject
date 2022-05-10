/* 
 * Node dependencies
*/
const path = require('path');
const express = require('express');
const app = express();
require('dotenv').config();

/* 
 * Custom dependencies
 */
const { ConnectionError } = require('./db/error');
if (process.env.MONGO) {
    // inheritance allows us to reuse this function across both DB handlers
    var { initDatabaseConnection } = require('./middleware/sql-util'); 
    var { insertNewItemMongo, runQueryFromFormMongo } = require('./middleware/mongo-util');
}
else {
    var { 
        initDatabaseConnection, 
        runQueryFromFormSQL, 
        insertNewItemSQL 
    } = require('./middleware/sql-util');
}

/* 
 * Global Middleware
*/
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

/* 
 * Set up ejs templating
*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'html'));

/* 
 * Routes
 */
const renderQueryView = (req, res, next) => {
    const queryResults = req.queryResults;
    res.render('queries', { queryResults });
}

if (process.env.MONGO) {
    app.route('/')
        .get(initDatabaseConnection, renderQueryView)
        .post(runQueryFromFormMongo, renderQueryView);

    app.post('/new-item', insertNewItemMongo, renderQueryView);
}
else { // using default mysql connection
    app.route('/')
        .get(initDatabaseConnection, renderQueryView)
        .post(runQueryFromFormSQL, renderQueryView);

    app.post('/new-item', insertNewItemSQL, renderQueryView);
}

/* 
 * Error handling
 */
app.use((err, req, res, next) => {
    console.log(`[ERROR]: ${err.toString()}`);
    let cause = err instanceof ConnectionError ? 'connecting to db' : 'running query';

    res.send(`Error occurred while ${cause}. Check server console for details.`);
});

app.listen(3000, () => {
    const db = process.env.MONGO ? 'mongo' : 'mysql';
    console.log(`Listening on port 3000. Using ${db} database`);
});