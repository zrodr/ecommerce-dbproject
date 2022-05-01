const express = require('express');
const app = express();
require('dotenv').config()

const DBController = require('./db/DBController')

let controller = new DBController();

app.get('/', async (req, res, next) => {
    try {
        await controller.initDatabase(
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            process.env.DB_NAME,
        );

        const exampleQuery1 = await controller.runQuery('select * from Item');
        console.log(exampleQuery1);

        const exampleQuery2 = await controller.runPreparedQuery(
            'select * from Item where price < ? and item_id in (?, ?, ?)',
            500, 11, 13, 15
        );
        console.log(exampleQuery2);
    }
    catch (err) {
        return next(err);
    }

    res.send('Successfully connected to DB!');
});

app.use((err, req, res, next) => {
    console.log(`[ERROR]: ${err.message}`);
    res.send('Error occurred. Check server console for details.');
});

app.listen(3000, () => {
    console.log(`Listening on port 3000`);
});