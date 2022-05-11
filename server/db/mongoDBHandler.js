const mongoose = require('mongoose');
const DBHandler = require('./DBHandler').DBHandler;
const { ConnectionError, QueryError } = require('./error');

const Item = require('../models/Item');

class MongoDBHandler extends DBHandler {
    /*
     * @param { object:         credentials for mongo atlas
     *     uri: {string}
     * }
     */
    constructor(credentials) {
        super(credentials);
        this.queries = new MongoQueries();
    }

    initDatabase() {
        if (this.hasInitialized) return;

        const { uri } = this.credentials;
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .catch((err) => {
            throw new ConnectionError(err.message);
        });

        this.hasInitialized = true;
        this.connection = mongoose.connection;

        this.connection.once('open', () => { console.log('connected to mongo atlas'); });
        this.connection.once('error', () => { mongoose.disconnect(); });
    }

    /* 
     * @param {string}  queryName   used to retrieve from MongoQueries object
     * @param {...*}    args        values for insert queries
     */
    runQuery(queryName, ...args) {
        if (!this.hasInitialized) return;

        const handlerFunction = this.queries.getQueryByName(queryName);
        if (!handlerFunction) {
            throw new QueryError(`'${queryName}' query not yet supported!`)
        }

        try {
            return handlerFunction(...args);
        }
        catch(err) { // QueryError thrown from handler functions
            throw err;
        }
    }
}

/* 
 * Wrapper class for a map of < 'name', handler function > to handle running queries against 
 * mongo atlas
 */
class MongoQueries {
    constructor() {
        this.namedQueries = new Map();

        this.namedQueries.set('insert-item', async function(name, description, price) {
            // increment item_id according to current max
            const [ item ] = await Item.find({}).sort({ item_id: -1 }).limit(1).lean();
            
            try {
                return await Item.create({
                    item_id: item.item_id + 1,
                    name,
                    description,
                    price
                });
            } 
            catch (err) {
                throw new QueryError(err.message);
            }
        });

        /* 
         * Aggregate queries
         */
        this.namedQueries.set('items-by-price-high-low', async function() {
            try {
                return await Item.find({}).sort({ price: -1 }).lean();
            } 
            catch (err) {
                throw new QueryError(err.message);
            }
        });
    }

    /* 
     * @param   {string}                name of query in Map
     * @return  {function | undefined}  handler function for the requested query
     */
    getQueryByName(name) {
        return this.namedQueries.get(name);
    }
}

module.exports.MongoDBHandler = MongoDBHandler;