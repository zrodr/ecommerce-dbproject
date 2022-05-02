const mysql = require('mysql2/promise');

class SQLConnectionError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConnectionError';
    }
}

class SQLQueryError extends Error {
    constructor(message) {
        super(message);
        this.name = 'QueryError';
    }
}

class DBController {
    constructor() {
        this.connection = null;
        this.hasInitialized = false;
    }

    /*
     * @param {string}  user        credentials for local mysql installation
     * @param {string}  password    credentials for local mysql installation
     * @param {string}  database    database to connect to
    */
    async initDatabase(user, password, database) {
        if (this.hasInitialized) return;

        try {
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
            throw new SQLConnectionError(err.message);
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
            throw new SQLQueryError(err.message);
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
            throw new SQLQueryError(err.message);
        }
    }
}

module.exports = { DBController, SQLConnectionError, SQLQueryError };