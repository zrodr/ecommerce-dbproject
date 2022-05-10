const mysql = require('mysql2/promise');
const DBHandler = require('./DBHandler').DBHandler;
const { ConnectionError, QueryError } = require('./error');

class MySQLDBHandler extends DBHandler {
    /*
     * @param { object:         credentials for local mysql installation
     *     user: {string}
     *     password: {string}
     *     database: {string}
     * }
     */
    constructor(credentials) {
        super(credentials);
    }

    async initDatabase() {
        if (this.hasInitialized) return;

        try {
            const { user, password, database } = this.credentials;
            const connection = await mysql.createConnection({
                host: 'localhost',
                user,
                password,
                database
            });

            this.connection = connection;
            this.hasInitialized = true;
        }
        catch (err) {
            throw new ConnectionError(err.message);
        }
    }

    /* 
     * @param  {string}         sql          SQL Query to run
     * @return {array | object} results      On select, array of objects matching db rows. On update/insert/delete, ResultSetHeader object 
    */
    async runQuery(sql) {
        if (!this.hasInitialized) return;

        try {
            // results: db contents as array of objects or ResultSetHeader object. 
            // fields: metadata about the table columns
            const [results, fields] = await this.connection.query(sql);
            return results;
        }
        catch (err) {
            throw new QueryError(err.message);
        }
    }

    /* 
     * @param  {string}          sql          SQL Query to run
     * @param  {...*}            args         Used as values for prepared statement         
     * @return {array | object}  results      On select: array of objects matching db rows. On update/insert/delete, ResultSetHeader object.
    */
    async runPreparedQuery(sql, ...args) {
        // are there an equal count of '?' and arguments passed in?
        if (!this.hasInitialized || args.length != sql.split('?').length - 1) return;

        try {
            const [results, fields] = await this.connection.execute(sql, args);
            return results;
        }
        catch (err) {
            throw new QueryError(err.message);
        }
    }
}

module.exports.MySQLDBHandler = MySQLDBHandler;