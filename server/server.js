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
const { DBHandlerInstance, SQLConnectionError } = require('./db/DBHandler');
const { initDatabaseConnection, runQueryFromForm, insertNewItem } = require('./middleware/db-util');

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

app.route('/')
    .get(initDatabaseConnection, renderQueryView)
    .post(runQueryFromForm, renderQueryView);

app.post('/new-item', insertNewItem, renderQueryView);

/* 
 * Error handling
 */
app.use((err, req, res, next) => {
    console.log(`[ERROR]: ${err.toString()}`);
    let cause = err instanceof SQLConnectionError ? 'connecting to db' : 'running query';

    res.send(`Error occurred while ${cause}. Check server console for details.`);
});

app.listen(3000, () => {
    console.log(`Listening on port 3000`);
});