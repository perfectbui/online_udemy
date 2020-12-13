// const mysql = require('mysql');
// const util = require('util');

// const pool  = mysql.createPool({
//   connectionLimit : 50,
//   host            : 'localhost',
//   user            : 'root',
//   password        : 'password',
//   database        : 'my_db'
// });

// const pool_query = util.promisify(pool.query).bind(pool);

// module.exports = {
//     load(sql) {
//         return pool_query(sql);
//     }
// }

