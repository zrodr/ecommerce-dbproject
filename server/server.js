/* 
 * Node dependencies
*/
const path = require('path');
const express = require('express');
const app = express();
require('dotenv').config()

const { DBController, SQLConnectionError } = require('./db/DBController')

/* 
 * Global Middleware
*/
app.use(express.static(path.join(__dirname, 'public')));

/* 
 * Set up ejs templating
*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'html'));

const controller = new DBController();

app.get('/', async (req, res, next) => {
    let queryResults;

    try {
        await controller.initDatabase(
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            process.env.DB_NAME,
        );

        const exampleQuery1 = await controller.runQuery(`select * from Item`);
        console.log(exampleQuery1);

        const exampleQuery2 = await controller.runPreparedQuery(
            'select * from Item where price < ? and item_id in (?, ?, ?)',
            500, 11, 13, 15
        );
        console.log(exampleQuery2);

        queryResults = exampleQuery1;
    }
    catch (err) {
        return next(err);
    }

    res.render('index', { queryResults });
});

app.use((err, req, res, next) => {
    console.log(`[ERROR]: ${err.toString()}`);
    let cause = err instanceof SQLConnectionError ? 'connecting to db' : 'running query';

    res.send(`Error occurred while ${cause}. Check server console for details.`);
});

app.listen(3000, () => {
    console.log(`Listening on port 3000`);
});