const { MySQLDBHandler } = require('./mysqlDBHandler');
const { MongoDBHandler } = require('./mongoDBHandler');

/*
 * Singleton instance for re-use across routes
 */
let DBHandlerInstance;

if(process.env.MONGO) {
    DBHandlerInstance = new MongoDBHandler({
        uri: process.env.ATLAS_URI
    });
}
// use mysql, default setting
else {
    DBHandlerInstance = new MySQLDBHandler({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
}

module.exports = { DBHandlerInstance };