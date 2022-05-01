const mysql = require('mysql2/promise');

class DBController {
    constructor() {
        this.connection = null;
        this.hasInitialized = false;
    }

    async initDatabase(user, password, database) {
        if (this.hasInitialized) return;

        try {
            const connection = await mysql.createConnection({
                host:'localhost',
                user,
                password,
                database
            });

            this.connection = connection;
            this.hasInitialized = true; 
        }
        catch (err) {
            throw new Error(err.message);
        }
    }

    async runQuery(sql) {
        try {
            // rows: query result as array of objects 
            // fields: metadata about the table columns
            const [rows, fields] = await this.connection.query(sql);
            return rows;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    
    async runPreparedQuery(sql, ...queryArgs) {
        // are there an equal count of '?' and arguments passed in?
        if (queryArgs.length != sql.split('?').length - 1) {
            return null;
        }

        try {
            const [rows, fields] = await this.connection.execute(sql, queryArgs);
            return rows;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = DBController;