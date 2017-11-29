var express = require('express')
var router = express.Router();
var pool = require('../modules/pools');


router.get('/', function (req, res) {
    pool.connect(function (err, db, done) {
        if (err) {
            //error connecting to database
            console.log('there was an error connecting: ', err);
            res.sendStatus(500);
        } else {
            //connected to database
            db.query('QUERY HERE', function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('error making query', errorMakingQuery);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
});

router.post('/', function (req, res) {
    pool.connect(function (err, db, done) {
        if (err) {
            //error connecting to database
            console.log('there was an error connecting: ', err);
            res.sendStatus(500);
        } else {
            //connected to database
            db.query(`QUERY HERE`, function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('error making query', errorMakingQuery);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});

router.put('/:id', function (req, res) {
    pool.connect(function (err, db, done) {
        if (err) {
            //error connecting to database
            console.log('there was an error connecting: ', err);
            res.sendStatus(500);
        } else {
            //connected to database
            db.query(`QUERY HERE`, function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('error making query', errorMakingQuery);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});


router.delete('/:id', function (req, res) {
    pool.connect(function (err, db, done) {
        if (err) {
            //error connecting to database
            console.log('there was an error connecting: ', err);
            res.sendStatus(500);
        } else {
            //connected to database
            db.query(`QUERY HERE`, function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('error making query', errorMakingQuery);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});


module.exports = router;