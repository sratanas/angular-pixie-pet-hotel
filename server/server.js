//requires
var express = require('express');
var bodyParser = require('body-parser');
var route = require('./routes/route'); //end requires

var port = process.env.PORT || 5000;
var app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: true }));

//run static files
app.use(express.static('server/public'));

app.listen(port, function () {
    console.log('listening on port ', port);
});


