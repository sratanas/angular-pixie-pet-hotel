var pg = require('pg');

var config = {
    database: 'pixie_pet_hotel',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillies: 3000,
};
  
var pool = new pg.Pool(config);

module.exports = pool