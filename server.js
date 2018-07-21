var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() +1;
var yyyy = today.getFullYear();

var express = require("express");
var app = express();

//for socket.io //////////
var http = require('http').Server(app);
var io = require('socket.io')(http);
console.log(io.path())

// socket.io connection begins
io.on('connection', function(socket) {
    console.log('user connected: ', socket.id);
 
    socket.join(socket.handshake.query.couple_key);
    socket.on('message', function(...args){
        console.log(...args)
        io.to(socket.handshake.query.couple_key).emit('message', ...args);
      });

    // socket.on(socket.handshake.query.couple_key, function(data) {
    //     console.log(data, socket.handshake.query.couple_key, 'something')
    //     socket.emit(socket.handshake.query.couple_key, data)
    // });

    socket.on('disconnect', function(){
      console.log('user disconnected: ', socket.id);
    });
  });
//New connection will be established after successful login
// --> go to app.post('/login', ......

////////////////////////

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

//const connection = mysql.createConnection(process.env.JAWSDB_URL || {
//   host:'localhost',
//   port: 3306,
//   user:'root',
//   password: '1234',
//   database: 'user_info'
//});

const connection = mysql.createConnection({
    host:'ou6zjjcqbi307lip.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port: 3306,
    user:'r0v2n7b4vnjmn7mg',
    password: 'u1ep4o0id3hsj3ot',
    database: 'cuf1fe0mumop56af'
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
// var mongoDBUrl = "mongodb://localhost:27017/letlovegrow";
var mongoDBUrl = "mongodb://heroku_0mn17js6:umvht39kmt3dqbdmaqhs54tpl0@ds129831.mlab.com:29831/heroku_0mn17js6"
mongoose.connect(mongoDBUrl, { useNewUrlParser: true }, function(err){
    if(err){
        console.log(err);
    }
    console.log('MongoDB connected');
} );

const Album = require('./resources/db/models/AlbumDB.js');
const History = require('./resources/db/models/HistoryDB.js');
const HoneyDo = require('./resources/db/models/HoneyDoDB.js');
const Mood = require('./resources/db/models/MoodDB.js');


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

    //connection.query("INSERT INTO users (couple_key, email, password, first_name, last_name, birthday, anniversary, photo, photo_couple) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    connection.query("INSERT INTO cuf1fe0mumop56af.users (couple_key, email, password, first_name, last_name, birthday, anniversary, photo, photo_couple) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
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

        //generate happy mood in MongoDB - You always have to be happy when you login 
            var couple_key = JSON.stringify(temp_key);
            var newMood = {
                couple_key: couple_key,
                email: body.email,
                mood: "happy"
            }
        
            Mood.create(newMood, function(err, results){
                if(err) {
                    console.log(err)
                }
                console.log("Mood Added");
            })

        res.redirect("/");
        }
    );
})

//login with MySQL///////////////////////////
app.post('/login', function(req,res,next){
    var login_state = JSON.stringify({login: false});
    var loginFail = JSON.parse(login_state);

    // connection.query('SELECT * FROM user_info.users WHERE `email` = ? AND `password` = ?', [req.body.email,req.body.password], function (error, results, fields) {
    connection.query('SELECT * FROM cuf1fe0mumop56af.users WHERE `email` = ? AND `password` = ?', [req.body.email,req.body.password], function (error, results, fields) {
        if(error) {
            console.log(error);
        }
        if (results.length == 1) {
            var foundUser = JSON.stringify(results[0]);
            var userData = JSON.parse(foundUser);
            userData.login = true;

            res.send(userData)

        } else {
            res.send(loginFail);
        }
    });

    
})
//////////////////////////////////////////////////////////////////////////////

//Album control from mongoDB ////////////////////////////////////////////////
app.post('/albumModify/:id', function(req,res){
    if (req.body.date) {
        Album.update({'_id' : req.params.id},{ $set: { date: req.body.date }},function(err, data){
            if(err){
                console.log(err);
            } 
        })
    }
    if (req.body.descr) {
        Album.update({'_id' : req.params.id},{ $set: { descr: req.body.descr }},function(err, data){
            if(err){
                    console.log(err);
            } 
        })
    }
    console.log("photo data modified");
})

app.post('/albumDelete/:id', function(req,res){
    Album.remove({'_id' : req.params.id})
    .exec(function(err, data){
		if(err){
			console.log(err);
		} else {
            console.log("The photo is deleted from your album");
        }
	});    
})

app.post('/albumUpload', function(req,res){
    var couple_key = JSON.stringify(req.body.couple_key);
    var newAlbum = {
        couple_key: couple_key,
        photo_link: req.body.photo_link,
        date: req.body.date,
        descr: req.body.descr
    }

    Album.create(newAlbum, function(err, results){
        if(err) {
            console.log(err)
        }
        console.log("Record Added");
    })
})

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


//Add Calendar Event to mongoDB ////////////////////////////////////////////////
app.post('/historyAdd', function(req,res){
    var couple_key = JSON.stringify(req.body.couple_key);
    var newEvent = {
        'couple_key': couple_key,
        'event': req.body.event,
        'date': req.body.date  
    }

    History.create(newEvent, function(err, results){
        if(err) {
            console.log(err)
        }
		console.log("New event Added");
    })
})


app.post('/history', function(req, res){
    var couple_key = JSON.stringify(req.body.couple_key);
    var thisMonth = parseInt(req.body.month)
    History.find({'couple_key': couple_key, 'date': {"$gte": new Date(2018,thisMonth),"$lt": new Date(2018,thisMonth+1)}}, function(err, results){
        if (err) {
            console.log(err);
        }
        res.send(results)
    })
})
/////////////////////////////////////////////////////////////////////


///Mood/////////////////////////////
app.post('/moodUpdate', function(req,res){
    Mood.findOneAndUpdate({'email' : req.body.email},{$set:{mood:req.body.mood}})
    .exec(function(err, data){
		if(err){
			console.log(err);
		} else {
            console.log("Mood is updated");
            res.send(data)
        }
	});    
})

app.post('/mood', function(req,res){
    var couple_key = JSON.stringify(req.body.couple_key);

    Mood.find({'couple_key': couple_key}, function(err, results){
        if (err) {
            console.log(err);
        }
        res.send(results)
    })
})
////////////////////////////////////

//////honey Do////////////////////////
app.post('/honeydoDelete/:id', function(req,res){
    HoneyDo.remove({'_id' : req.params.id})
    .exec(function(err, data){
		if(err){
			console.log(err);
		} else {
            console.log("HoneyDo item is deleted");
            res.send(data)
        }
	});    
})

app.post('/honeydoAdd', function(req,res){
    var couple_key = JSON.stringify(req.body.couple_key);
    var newHoneyDo = {
        couple_key: couple_key,
        honey_do: req.body.honey_do 
    }

    HoneyDo.create(newHoneyDo, function(err, results){
        if(err) {
            console.log(err)
        }
		console.log("New Todo item Added");
    })
})

app.post('/honeyDo', function(req, res){
    var couple_key = JSON.stringify(req.body.couple_key);

    HoneyDo.find({'couple_key': couple_key}, function(err, results){
        if (err) {
            console.log(err);
        }
        res.send(results)
    })
})
//////////////////////////////////


// Default route.
app.use('/', function (req, res) {
    res.sendFile(__dirname+'/public/index.html');
});

//Listening
var PORT = process.env.PORT || 3000;
http.listen(PORT, function(){
    console.log("listening on " + PORT);
});