
class ConnectionError extends Error {
    constructor(message) {
        let dbType;
        process.env.MONGO ? dbType = '(mongo)' : dbType = '(mysql)';
        
        super(`${dbType}: ${message}`);
        this.name = 'ConnectionError';
    }
}

class QueryError extends Error {
    constructor(message) {
        let dbType;
        process.env.MONGO ? dbType = '(mongo)' : dbType = '(mysql)';

        super(`${dbType}: ${message}`);
        this.name = 'QueryError';
    }
}

module.exports = { ConnectionError, QueryError };