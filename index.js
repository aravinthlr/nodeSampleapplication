const express = require('express');
const app = express();
const secretPassword = 'MR.Secret';
const fileSystem = require('fs');
const bodyParser = require("body-parser"); // Body parser for fetch posted data
const jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json()); // Body parser use JSON data
app.use(express.static('public'));


app.get('/login', function (req, res) {
    res.sendFile('/partials/login.html', {
        root: __dirname
    });
});

app.post('/login', function (req, res) {
    console.log(req.body);
    var token = jwt.sign({
        name: req.body.username
    }, secretPassword, {
        expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({
        auth: true,
        token: token
    });
});


app.use('/', function (req, res, next) {
    console.log(req.get('token'));
    if (!req.get('token')) {
        res.sendFile('/partials/login.html', {
            root: __dirname
        });
    } else next();
});



app.get('/home', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000);
