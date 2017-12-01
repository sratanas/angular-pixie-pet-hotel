var express = require('express')
var router = express.Router();
var pool = require('../modules/pools');


router.get('/all', function (req, res) { // get request called on ready and when you submit a pet name
    pool.connect(function (err, db, done) {
        if (err) {
            //error connecting to database
            console.log('there was an error connecting: ', err);
            res.sendStatus(500);
        } else {
            //connected to database
            db.query(`SELECT owners.first_name, owners.last_name, owners.id, pets.pet_name, pets.breed, pets.color, pets.id  FROM pets
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

router.get('/owners', function (req, res) { //get request will be called when you submit only a name
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

router.get('/pets', function (req, res) { //get request will be called when you submit only a name
    pool.connect(function (err, db, done) {
        if (err) {
            //error connecting to database
            console.log('there was an error connecting: ', err);
            res.sendStatus(500);
        } else {
            //connected to database
            db.query(`SELECT * FROM pets`, function (errorMakingQuery, result) {
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

router.post('/owners', function (req, res) {
    pool.connect(function (err, db, done) {
        if (err) {
            //error connecting to database
            console.log('there was an error connecting: ', err);
            res.sendStatus(500);
        } else {
            //connected to database
            db.query(`INSERT INTO owners("first_name", "last_name")
            VALUES ($1,$2)`,[req.body.first_name, req.body.last_name], function (errorMakingQuery, result) {
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

router.post('/pets', function (req, res) {
    var newPet = req.body
    pool.connect(function (err, db, done) {
        if (err) {
            //error connecting to database
            console.log('there was an error connecting: ', err);
            res.sendStatus(500);
        } else {
            //connected to database
            db.query(`INSERT INTO pets("pet_name", "breed", "color", "checked_in")
            VALUES ($1,$2, $3, $4)`,[newPet.pet_name, newPet.breed, newPet.color, newPet.checked_in], function (errorMakingQuery, result) {
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


router.delete('/:id', function (req, res) {
    pool.connect(function (err, db, done) {
        if (err) {
            //error connecting to database
            console.log('there was an error connecting: ', err);
            res.sendStatus(500);
        } else {
            //connected to database
            db.query(`DELETE from PETS WHERE id =$1`,[req.params.id], function (errorMakingQuery, result) {
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