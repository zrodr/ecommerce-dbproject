const { DBHandlerInstance } = require('../db/config'); // this file assumes that the type of DBHandlerInstance is MongoDBHandler


const insertNewItemMongo = async (req, res, next) => {
    const { name, description, price } = req.body;

    try {
        results = await DBHandlerInstance.runQuery('insert item', name, description, price);
    } 
    catch (err) {
        next(err);
    }
    
    console.log(results);
    req.queryResults = results;

    return next();
}

const runQueryFromFormMongo = async (req, res, next) => {


    req.queryResults = results;

    return next();
}


module.exports = { insertNewItemMongo, runQueryFromFormMongo };