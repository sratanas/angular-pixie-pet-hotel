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
            db.query(`SELECT owners.first_name, owners.last_name, owners.id, pets.pet_name, pets.breed, pets.color  FROM pets
            JOIN owners ON pets.owner_id = owners.id;`, function (errorMakingQuery, result) {
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

router.get('/users', function (req, res) {
    pool.connect(function (err, db, done) {
        if (err) {
            //error connecting to database
            console.log('there was an error connecting: ', err);
            res.sendStatus(500);
        } else {
            //connected to database
            db.query(`SELECT * FROM owners`, function (errorMakingQuery, result) {
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
            db.query(`INSERT INTO pets ("pet_name", "breed", "color", "owner_id")
            VALUES ($1,$2,$3,$4)`,[req.body.name, req.body.breed, req.body.color, req.body.owner_id], function (errorMakingQuery, result) {
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

// router.put('/:id', function (req, res) {
//     pool.connect(function (err, db, done) {
//         if (err) {
//             //error connecting to database
//             console.log('there was an error connecting: ', err);
//             res.sendStatus(500);
//         } else {
//             //connected to database
//             db.query(`QUERY HERE`, function (errorMakingQuery, result) {
//                 done();
//                 if (errorMakingQuery) {
//                     console.log('error making query', errorMakingQuery);
//                 } else {
//                     res.sendStatus(201);
//                 }
//             });
//         }
//     });
// });


// router.delete('/:id', function (req, res) {
//     pool.connect(function (err, db, done) {
//         if (err) {
//             //error connecting to database
//             console.log('there was an error connecting: ', err);
//             res.sendStatus(500);
//         } else {
//             //connected to database
//             db.query(`QUERY HERE`, function (errorMakingQuery, result) {
//                 done();
//                 if (errorMakingQuery) {
//                     console.log('error making query', errorMakingQuery);
//                 } else {
//                     res.sendStatus(201);
//                 }
//             });
//         }
//     });
// });


module.exports = router;