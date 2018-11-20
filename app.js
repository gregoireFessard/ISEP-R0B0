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
					connection.query('SELECT xml FROM workspacexml WHERE userid=' + mysql.escape(req.session.userID) + ' AND exerciseid=1',function(err,result2){
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
						connection.query('SELECT xml FROM workspacexml WHERE userid=' + mysql.escape(req.session.userID) + ' AND exerciseid=1',function(err,result2){
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
app.get('/pageChange',function(req,res){ // a refaire
	// Get the xml code for the workspace of the next page
	connection.query('SELECT xml FROM workspacexml WHERE userid=' + mysql.escape(req.session.userID) +' AND exerciseid=' + mysql.escape(parseInt(req.query.currentExerciseId,10) + ' DESC LIMIT 1'),function(err,result){
		if (err){
			console.log(err);
		}
		console.log(result);
		console.log("new xml for workspace :",result[0]);
		var ret = null
		if (result[0])
			ret = result[0].xml;
		res.send(ret);
	});
	
});

app.post('/createblock',function(req,res){
	var val = [[req.body.userID,req.body.currentExerciseID,req.body.group,req.body.blockId,req.body.type,req.body.time]];
	console.log("new create");
	connection.query('INSERT INTO eventworkspace (userid,exerciseid,groupid,blocklyid,logtype,logtime) VALUES ?',[val],function(err,result){
		if (err){
			console.log(err);
		}
		var val2 = [[result.insertId,req.body.xml]];
		connection.query('INSERT INTO blockcreate (createid,xml) VALUES ?',[val2],function(err,result){
			if (err){
				console.log(err);
			}
			console.log("done create");
		});
	});
	res.end('end');
});

app.post('/moveBlock',function(req,res){
	var val = [[req.body.userID,req.body.currentExerciseID,req.body.group,req.body.blockId,req.body.type,req.body.time]];
	console.log("new move");
	connection.query('INSERT INTO eventworkspace (userid,exerciseid,groupid,blocklyid,logtype,logtime) VALUES ?',[val],function(err,result){
		if (err){
			console.log(err);
		}
		var val2 = [[result.insertId,req.body.newCoordinate]];
		connection.query('INSERT INTO blockmove (moveid,newcoordinate) VALUES ?',[val2],function(err,result){
			if (err){
				console.log(err);
			}
			console.log("done move");
		});
	});
	res.end('end');
});

app.post('/combineBlock',function(req,res){
	var val = [[req.body.userID,req.body.currentExerciseID,req.body.group,req.body.blockId,req.body.type,req.body.time]];
	console.log("new combine");
	connection.query('INSERT INTO eventworkspace (userid,exerciseid,groupid,blocklyid,logtype,logtime) VALUES ?',[val],function(err,result){
		if (err){
			console.log(err);
		}
		var val2 = [[result.insertId,req.body.newParentId,req.body.newInputName]];
		connection.query('INSERT INTO blockcombine (combineid,newparentid,newinputname) VALUES ?',[val2],function(err,result){
			if (err){
				console.log(err);
			}
			console.log("done combine");
		});
	});
	res.end('end');
});

app.post('/changeBlock',function(req,res){
	var val = [[req.body.userID,req.body.currentExerciseID,req.body.group,req.body.blockId,req.body.type,req.body.time]];
	console.log("new change");
	connection.query('INSERT INTO eventworkspace (userid,exerciseid,groupid,blocklyid,logtype,logtime) VALUES ?',[val],function(err,result){
		if (err){
			console.log(err);
		}
		var val2 = [[result.insertId,req.body.name,req.body.newValue]];
		connection.query('INSERT INTO blockchange (changeid,vartype,var) VALUES ?',[val2],function(err,result){
			if (err){
				console.log(err);
			}
			console.log("done change");
		});
	});
});

app.post('/deleteBlock',function(req,res){
	var val = [[req.body.userID,req.body.currentExerciseID,req.body.group,req.body.blockId,req.body.type,req.body.time]];
	console.log("new delete");
	connection.query('INSERT INTO eventworkspace (userid,exerciseid,groupid,blocklyid,logtype,logtime) VALUES ?',[val],function(err,result){
		if (err){
			console.log(err);
		}
		var val2 = [[result.insertId,JSON.stringify(req.body.ids)]];
		connection.query('INSERT INTO blockdelete (deleteid,delids) VALUES ?',[val2],function(err,result){
			if (err){
				console.log(err);
			}
			console.log("done delete");
		});
	});
	res.end('end');
});

app.post('/varEvent',function(req,res){
	var val = [[req.body.userID,req.body.currentExerciseID,req.body.group,req.body.varId,req.body.type,req.body.time]];
	console.log("new var");
	connection.query('INSERT INTO eventworkspace (userid,exerciseid,groupid,blocklyid,logtype,logtime) VALUES ?',[val],function(err,result){
		if (err){
			console.log(err);
		}
		var val2 = [[result.insertId,req.body.varName]];
		connection.query('INSERT INTO varlog (varlogid,var) VALUES ?',[val2],function(err,result){
			if (err){
				console.log(err);
			}
			console.log("done var");
		});
	});
	res.end('end');
});

app.post('/categoryEvent',function(req,res){
	console.log("new category");
	var val = [[req.body.userID,req.body.currentExerciseID,req.body.group,req.body.newValue,req.body.type,req.body.time]];
	connection.query('INSERT INTO eventworkspace (userid,exerciseid,groupid,blocklyid,logtype,logtime) VALUES ?',[val],function(err,result){
		if (err){
			console.log(err);
		}
		console.log("done category");
	});
	res.end('end');
});

app.post('/mousePosition',function(req,res){
	console.log("new mousePosition");
	var val = [[req.body.userID,req.body.currentExerciseID,req.body.x,req.body.y,req.body.time]];
	console.log(val);
	connection.query('INSERT INTO mousepos (userid,exerciseid,xposition,yposition,mptime) VALUES ?',[val],function(err,result){
		if (err){
			console.log(err);
		}
		console.log("done mousePosition");
	});
	res.end('end');	
});

app.post('/currentExercise',function(req,res){
	console.log("new currentExercise");
	var val = [[req.body.userID,req.body.currentExerciseID,req.body.time]];
	connection.query('INSERT INTO currentex (userid,exerciseid,cptime) VALUES ?',[val],function(err,result){
		if (err){
			console.log(err);
		}
		console.log("done currentExercise");
		console.log("new workspacexml");
		var val2 = [[req.body.userID,req.body.currentExerciseID,req.body.action,req.body.workspacexml,req.body.time]];
		connection.query('INSERT INTO workspacexml (userid,exerciseid,action,xml,blocktime) VALUES ?',[val2],function(err,result){
			if (err){
				console.log(err);
			}
			console.log("done workspacexml");
		});
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
