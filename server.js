var express = require("express");
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.text());

app.use(express.static(process.cwd() + '/public'));

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//mysql connection //////////////////////////////////////////
var mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host:'ou6zjjcqbi307lip.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//     port: 3306,
//     user:'r0v2n7b4vnjmn7mg',
//     password: 'u1ep4o0id3hsj3ot',
//     database: 'cuf1fe0mumop56af'
// });

const connection = mysql.createConnection({
   host:'localhost',
   port: 3306,
   user:'root',
   password: '1234',
   database: 'user_info'
});


connection.connect(function(err){
    if (err) {
        console.log(err);
    }
    console.time('mysql');
    console.log('MySQL Successfully connected ');
});

//MongoDB connection////////////////////////////
var mongoose = require("mongoose");
mongoose.Promise = Promise;
var mongoDBUrl = "mongodb://localhost:27017/letlovegrow";
// var mongoDBUrl = "mongodb://heroku_0mn17js6:umvht39kmt3dqbdmaqhs54tpl0@ds129831.mlab.com:29831/heroku_0mn17js6"
mongoose.connect(mongoDBUrl, function(error)
	{
	console.log("MongoDB connected");
});

const Album = require('./resources/db/models/AlbumDB.js');
//const Message = require('./resources/db/models/MessageDB.js');
/////////////////////////////////////////////////



//signup with MySQL///////////////////////////
app.post('/signup', function(req,res,next){
    var body = req.body;
    var temp_key='';
    if (body.coupleKey) {
        temp_key = body.coupleID;
    } else {
        temp_key = Math.random().toString(36).slice(-5);
    }
    
    //connection.query("INSERT INTO cuf1fe0mumop56af.users (couple_key, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)",
    connection.query("INSERT INTO user_info.users (couple_key, email, password, first_name, last_name, birthday, anniversary, photo, photo_couple) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
        temp_key,
        body.email,
        body.password,
        body.firstName,
        body.lastName,
        body.birthday,
        body.anniversary,
        body.photo,
        body.photo_couple
        ], function(){
        console.log("signup data added successfully")
        res.redirect("/");
    });
})

//login with MySQL///////////////////////////
app.post('/login', function(req,res,next){
    var login_state = JSON.stringify({email: false});
    var loginFail = JSON.parse(login_state);

    //connection.query('SELECT * FROM cuf1fe0mumop56af.users WHERE `email` = ? AND `password` = ?', [req.body.email,req.body.password], function (error, results, fields) {
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
//////////////////////////////////////////////////////////////////////////////


//Album loading from mongoDB ////////////////////////////////////////////////
//app.post('/albumUpload', function(req,res){
//    var couple_key = JSON.stringify(req.body.couple_key);
//    var newAlbum = {
//        couple_key:couple_key,
//        photo_link:'',
//        date:'',
//        descr:''
//    }
//
//    Album.create(newAlbum, function(err, results){
//        if(err) {
//            console.log(err)
//        }
//		console.log("Record Added");
//    })
//})

//load photo albums from MongoDB with matching couple_key
app.post('/album', function(req, res){
    var couple_key = JSON.stringify(req.body.couple_key);

    Album.find({'couple_key': couple_key}, function(err, results){
        if (err) {
            console.log(err);
        }
        res.send(results)
    })
})
/////////////////////////////////////////////////////////////////////////////


// Default route.
app.use('/', function (req, res) {
    res.sendFile(__dirname+'/public/index.html');
});

//Listening
var PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log("listening on " + PORT);
});