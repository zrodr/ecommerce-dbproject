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
        this.queries = new SQLQueries();
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
     * @param  {string}          queryName    Used to retrieve SQL Query from this.queries
     * @param  {...*}            args         Used as values for prepared statements
     * @return {array | object}  results      On select -> array of objects matching db rows,
     *                                        on update/insert/delete -> ResultSetHeader object.
    */
    async runQuery(queryName, ...args) {
        if (!this.hasInitialized) return;

        const sql = this.queries.getQueryByName(queryName);
        if (!sql) {
            throw new QueryError(`'${queryName}' query not yet supported!`);
        }
        // are there an equal count of '?' and arguments passed in?
        if (args.length != sql.split('?').length - 1) {
            throw new QueryError('Prepared query is malformed!');
        }

        try {
            if (args) {
                var [results, fields] = await this.connection.execute(sql, args);
            }
            else {
                var [results, fields] = await this.connection.query(sql)
            }
            return results;
        }
        catch (err) {
            throw new QueryError(err.message);
        }
    }
}

/* 
 * Wrapper class for a map of < 'name', sql string > to handle running queries against 
 * local mysql installations 
 */
class SQLQueries {
    constructor() {
        this.namedQueries = new Map();

        this.namedQueries.set('insert-item',
            `insert into Item (name, description, price) values (?,?,?)`
        );

        // View 
        this.namedQueries.set('total-of-warehouse-items', 
            `select * from V_Item_Warehouse_Price_Cost`
        );

        /* 
         * Aggregate queries
         */
        this.namedQueries.set('items-by-price-low-high',
            `select i.name, i.description, i.price from Item i ORDER BY i.price ASC`
        );
        this.namedQueries.set('items-by-price-high-low',
            `select i.name, i.description, i.price from Item i ORDER BY i.price DESC`
        );
        this.namedQueries.set('unique-items-in-warehouse',
            `select w.name, COUNT(*) from ItemInWarehouse i, Warehouse w 
            Where i.warehouse_id=w.warehouse_id GROUP BY i.warehouse_id 
            ORDER BY COUNT(*) DESC`
        );
        this.namedQueries.set('member-num-profiles',
            `Select m.member_id, COUNT(p.name) 
            FROM Member m, Profile p WHERE m.member_id=p.member_id 
            GROUP BY m.member_id`
        );
        this.namedQueries.set('member-num-unique-items',
            `Select s.member_id, c.cart_id, COUNT(c.item_id) 
            FROM ShoppingCart s, ItemInCart c WHERE s.cart_id=c.cart_id 
            GROUP BY c.cart_id ORDER BY COUNT(c.item_id) DESC`
        );
        this.namedQueries.set('member-num-total-items',
            `Select s.member_id, c.cart_id, SUM(c.quantity) as 'Total Number of Items'  
            FROM ShoppingCart s, ItemInCart c WHERE s.cart_id=c.cart_id 
            GROUP BY c.cart_id`
        );

        /* 
         * Nested queries
         */
        this.namedQueries.set('expensive-items',
            `select * from Item i where i.price > all (
                select avg(price) from Item 
            ) order by i.price desc`
        );
        this.namedQueries.set('well-stocked-items',
            `select * from Item i where i.item_id in (
                select iw.item_id from ItemInWarehouse iw 
                where iw.item_id = i.item_id and
                iw.units_in_stock >= 500
            )`
        );
        this.namedQueries.set('multiple-purchases',
            `select p.name, m.email, m.points, m.create_date from Profile p 
            inner join Member m on p.member_id = m.member_id 
            where 3 < any (
                select count(*) from TransactionRecord tr where tr.member_id = p.member_id
            ) order by m.create_date`
        );
        this.namedQueries.set('non-queued-items', 
            `select i.price, i.name from Item i where i.item_id not in (
                select ic.item_id from ItemInCart ic where i.item_id = ic.item_id 
            )`
        );

        /* 
         * Table dump queries
         */
        this.namedQueries.set('member-table', `select * from Member`);
        this.namedQueries.set('warehouse-table', `select * from Warehouse`);
        this.namedQueries.set('item-table', `select * from Item`);
        this.namedQueries.set('item-in-warehouse-table', `select * from ItemInWarehouse`);
        this.namedQueries.set('shopping-cart-table', `select * from ShoppingCart`);
        this.namedQueries.set('profile-table', `select * from Profile`);
        this.namedQueries.set('transaction-record-table', `select * from TransactionRecord`);
        this.namedQueries.set('item-in-cart-table', `select * from ItemInCart`);
    }

    /* 
     * @param   {string}                name of query in Map
     * @return  {string | undefined}    sql string for the requested query
     */
    getQueryByName(name) {
        return this.namedQueries.get(name);
    }
}

module.exports.MySQLDBHandler = MySQLDBHandler;