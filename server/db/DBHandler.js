
// 'Abstract' class
class DBHandler {
    /* 
     * @param {
     *   object: { [credential: 'value'] }
     *  } 
     */
    constructor(credentials) {
        this.credentials = credentials;
        this.connection = null;
        this.hasInitialized = false;
    }

    initDatabase() {

    }

    runQuery() {

    }
}

module.exports.DBHandler = DBHandler;