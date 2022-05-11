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
const { 
    initDatabaseConnection, 
    runQueryFromForm, 
    insertNewItem 
} = require('./middleware/db-util');

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
    const mongoServer = process.env.MONGO ? true : false;
    const queryResults = req.queryResults;

    res.render('queries', { mongoServer, queryResults });
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
    const cause = err instanceof ConnectionError ? 'connecting to db' : 'running query';

    res.send(`Error occurred while ${cause}. Check server console for details.`);
});

app.listen(3000, () => {
    const db = process.env.MONGO ? 'mongo' : 'mysql';
    console.log(`Listening on port 3000. Using ${db} database`);
});