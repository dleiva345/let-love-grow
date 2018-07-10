var express = require("express");
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.text());

app.use(express.static(process.cwd() + '/public'));

//mysql connection
var mysql = require('mysql2');

//const connection = mysql.createConnection({
//    host:'ou6zjjcqbi307lip.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//    port: 3306,
//    user:'r0v2n7b4vnjmn7mg',
//    password: 'u1ep4o0id3hsj3ot',
//    database: 'cuf1fe0mumop56af'
//});

const connection = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user:'web',
    password: '1234',
    database: 'user_info'
});


connection.connect(function(err){
    if (err) {
        console.log(err);
    }
    console.time('mysql');
    console.log('Successfully connected to mysql');
});

//mongoDB
//var mongoose = require("mongoose");
//mongoose.Promise = Promise;
//var mongoDBUrl = "mongodb://localhost:27017/between";
//mongoose.connect(mongoDBUrl, function(error)
//	{
//	console.log("Database connected");
//});
//
//const Article = require('./models/Article.js');




//signup
app.post('/signup', function(req,res,next){
    var body = req.body;
    var temp_key='';
    if (body.coupleID) {
        temp_key = body.coupleID;
    } else {
        temp_key = Math.random().toString(36).slice(-5);
    }
    
    connection.query("INSERT INTO user_info.users (couple_key, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)",
        [
        temp_key,
        body.email,
        body.password,
        body.firstName,
        body.lastName
        ], function(){
        console.log("data added successfully")
        res.redirect("/");
    });
})

//login
app.post('/login', function(req,res,next){
    var login_state = JSON.stringify({email: false});
    var loginFail = JSON.parse(login_state);

    connection.query('SELECT * FROM user_info.users WHERE `email` = ? AND `password` = ?', [req.body.email,req.body.password], function (error, results, fields) {
        if(error) {
            console.log(error);
        }
        if (results.length == 1) {
            var foundUser = JSON.stringify(results[0]);
            var userData = JSON.parse(foundUser);
            res.send(userData)
        } else {
            res.send(loginFail);
        }
    });
})

// Default route.
app.use('/', function (req, res) {
    res.sendFile(__dirname+'/public/index.html');
});

//Listening
var PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log("listening on " + PORT);
});