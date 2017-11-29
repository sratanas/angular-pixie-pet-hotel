var pg = require('pg');

var config = {
    database: 'INSERT DATABASE NAME HERE',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillies: 3000,
};
  
var pool = new pg.Pool(config);

module.exports = pool