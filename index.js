const express= require('express');
const app = express();
const secretPassword = 'MR.Secret';
const fileSystem = require('fs');
const bodyParser = require("body-parser"); // Body parser for fetch posted data

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); // Body parser use JSON data
app.use(express.static('public'));

app.get('/',function (req, res)  {
    res.sendFile('/partials/login.html', {root: __dirname });
}); 

app.use('/',function(req, res, next) {
    if(1) next();
       else res.send('Trespassed');
});

app.post('/login',function(req, res) {
    console.log(res.body.username);
    res.send('saved successfully');
});

app.get('/home',function(req, res) {
    res.send('Hello World!');
});

app.listen(3000);