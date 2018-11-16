var express = require('express'); 
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require ('mysql');
var index = require('./routes/index');
var fs = require('fs');

var app = express();


process.on('uncaughtException', UncaughtExceptionHandler);

// Prevent the node www from closing when encountering an error
function UncaughtExceptionHandler(err){
    console.log("Uncaught Exception Encountered!!");
    console.log("err: ", err);
    console.log("Stack trace: ", err.stack);
    setInterval(function(){}, 1000);
}

// Configure MySQL connection
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	//database: 'sampledb'
	database: 'isepr0b0'
});

//Establish MySQL connection
connection.connect(function(err) {
   if (!err) {
    console.log('Connected to MySQL');
    // Start the app when connection is ready    
   }
   else {
	   console.log('Error when trying to connect to MySQL :',err);
   // Start the app when connection is ready
 }
});

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

// Creta session variable
app.use(session({ secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false ,
    cookie: { maxAge: 3600000,secure: false, httpOnly: true }
  })
);

// New simulation user
app.get('/sim',function(req,res){
	console.log("New user on a simulation !");
	req.session.simulation = true;
	res.redirect('../accueil');
});

// New Tangible object user
app.get('/tan',function(req,res){
	console.log("New user on a tangible object !");
	req.session.simulation = false;
	res.redirect('../accueil');
});

app.get('/accueil',function(req,res){
	console.log("next");
	res.sendFile(path.join(__dirname+ '/'));
});

// Access an older id
app.get('/user',function(req,res){
	req.session.userID = parseInt(req.query.userid,10);
	console.log("recuperating old user", req.session.userID);
	res.redirect('/');
});

app.post('/newUser',function(req,res){
	console.log(req.body);
	console.log(req.body.fname);
	req.session.fname = req.body.fname;
	req.session.lname = req.body.lname;
	res.redirect('/?simorobj='+req.body.simorobj);
});

// Set session variable : userID and get liste of exercise and xml
app.get('/', function(req, res){ // a simplifier?
	simorobj = true;
	if (req.query.sim) // Set default to simulation
		simorobj = req.query.sim;
		
		
	fs.readFile('./public/runtime.txt','ascii',function read(err,data){
		if (err){
			throw err;
		}
		req.hexFileHeader = data;	
		console.log("new main page opened");
		if (!req.session.userID){
			var user = [];
			user.push([simorobj,req.session.fname,req.session.lname]);
			// Add a new user
			connection.query('INSERT INTO userlist (simorobj,fname,lname) VALUES ?',[user],function(err,result0){
				if (err){
					console.log(err);
				}
				req.session.userID = result0.insertId;
				req.simorobj = simorobj;
				// Get the list of exercise
				connection.query('SELECT * FROM exerciselist',function(err,result1){
					if (err){
						console.log(err);
					}
					req.exerciselist = result1;
					req.workspacexml = null;
					// Get the xml for the workspace if it exists
					connection.query('SELECT xml FROM block WHERE userid=' + mysql.escape(req.session.userID) + ' AND exerciseid=1',function(err,result2){
						if (err){
							console.log(err);
						}
						if (result2[0]){
							req.workspacexml = result2[0].xml;
						}
						res.sendFile(path.join(__dirname+ '/'));
					});
				});
			});
		}
		else if (req.session.userID){
			// Get the simulation or object variable from the existing userID
			connection.query('SELECT simorobj FROM userlist WHERE userid='+mysql.escape(req.session.userID),function(err,result0){
				if (err){
					console.log(err);
				}
				if (result0[0]){
					req.simorobj = result0[0].simorobj;
					// Get the list of exercise
					connection.query('SELECT * FROM exerciselist',function(err,result1){
						if (err){
							console.log(err);
						}
						req.exerciselist = result1;
						req.workspacexml = null;
						// Get the xml workspace if it exist
						connection.query('SELECT xml FROM block WHERE userid=' + mysql.escape(req.session.userID) + ' AND exerciseid=1',function(err,result2){
							if (err){
								console.log(err);
							}
							if (result2[0]){
								req.workspacexml = result2[0].xml;
							}
							res.sendFile(path.join(__dirname+ '/'));
						});
					});
				}
				else{
					res.redirect('/404');
				}
			});
		}
		else{
			res.redirect('/404');
		}
	});
});


// Called when changing exercise page
app.get('/pageChange',function(req,res){
	// Get the xml code for the workspace of the next page
	connection.query('SELECT xml FROM block WHERE userid=' + mysql.escape(req.session.userID) +' AND exerciseid=' + mysql.escape(parseInt(req.query.currentExerciseId,10)),function(err,result){
		if (err){
			console.log(err);
		}
		console.log("new xml for workspace :",result[0]);
		var ret = null
		if (result[0])
			ret = result[0].xml;
		res.send(ret);
	});
});

// Called for a block event
app.post('/blocklogging',function(req,res){
    var jsondata = req.body;
	console.log(jsondata);
	var values = [];
	var id;
	var type;
	blockLogValues = [];
	// Change a move with a newParentId to a combine
	if (jsondata.newParentId){ // a simplifier
		console.log("combination");
		jsondata.type = "combine";
	}
	else if (!jsondata.newCoordinate && jsondata.type == 'move'){ // can be removed?
		console.log("ERROR, CANNOT PROCEED EVENT FOR : ",jsondata);
	}
	blockLogValues.push([req.session.userID,jsondata.currentExercise,jsondata.blockId,jsondata.type,jsondata.time]);
	console.log("Logging new blockLog :",blockLogValues);
	var blocklogID = null;
	// Logging a new blocklog and getting it's id for the next log
	connection.query('INSERT INTO blocklog (userid,exerciseid,blockid,logtype,logtime) VALUES ?',[blockLogValues],function(err,result){
		if (err){
			console.log(err);
		}
		blocklogID = result.insertId;
		switch(jsondata.type){
			case 'create':
				values.push([blocklogID,jsondata.xml]);
				console.log("Logging new blockcreate :",values);
				// Logging a new blocreate
				connection.query('INSERT INTO blockcreate (createid,xml) VALUES ?',[values],function(err,result){
					if (err){
						console.log(err);
					}
				});
				break;
				
			case 'move':
				values.push([blocklogID,jsondata.newCoordinate]);
				console.log("Logging new blockmove :",values);	
				// Logging new blockmove
				connection.query('INSERT INTO blockmove (moveid,newcoordinate) VALUES ?',[values],function(err,result){
					if (err){
						console.log(err);
					}
				});
				break;
				
			case 'combine':
				if (jsondata.newInputName){ // a simplifier
					values.push([blocklogID,jsondata.newParentId,jsondata.newInputName]);
				}
				else{
					values.push([blocklogID,jsondata.newParentId,null]);
				}
				console.log("Logging new blockcombine :",values);
				//logging new blockcomine
				connection.query('INSERT INTO blockcombine (combineid,newparentid,newinputname) VALUES ?',[values],function(err,result){
					if (err){
						console.log(err);
					}
				});
				break;
				
			case 'delete':
				values.push([blocklogID,JSON.stringify(jsondata.ids)]);
				console.log("Logging new blockdelete :",values);
				// Logging new blockdelete
				connection.query('INSERT INTO blockdelete (deleteid,delids) VALUES ?',[values],function(err,result){
					if (err){
						console.log(err);
					}
				});					
				break;
				
			case 'change':
				values.push([blocklogID,jsondata.name,jsondata.newValue]);
				console.log("Logging new blockchange :",values);
				// Logging new blockchange
				connection.query('INSERT INTO blockchange (changeid,vartype,var) VALUES ?',[values],function(err,result){
					if (err){
						console.log(err);
					}
				});					
				break;
				
			default:
				console.log("ERROR, type of event not recognized :",jsondata.type);
		}	
	});
	blockValues = [];
	blockValues.push([req.session.userID,jsondata.currentExercise,jsondata.workspacexml]);
	console.log("Logging new block xml :",blockValues);
	// Logging new block
	connection.query('REPLACE INTO block (userid,exerciseid,xml) VALUES ?',[blockValues],function(err,result){
		if (err){
			console.log(err);
		}
	});
    res.end('end');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/accueil',index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
