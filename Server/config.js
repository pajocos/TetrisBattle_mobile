/**
 * Created by paulo on 09/12/2016.
 */

module.exports = {
    sqlConfig : {
        user: 'postgres',
        database: 'tetrisbattle',
        password: 'pjpc031094',
        host: 'localhost',
        port: 5432,
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    }
};