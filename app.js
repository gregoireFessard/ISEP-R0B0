var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require ('mysql');
var index = require('./routes/index');

var app = express();

process.on('uncaughtException', UncaughtExceptionHandler);

function UncaughtExceptionHandler(err)
{
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
	   console.log('Error when trying to connect to MySQL :');
	console.log(err);
   // Start the app when connection is ready
 }
});

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


app.use(bodyParser.json())

app.use(session({ secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false ,
    cookie: { maxAge: 3600000,secure: false, httpOnly: true }
  })
);

app.get('/sim',function(req,res){
	console.log("New user on a simulation !");
	res.redirect('/?sim=1');
});

app.get('/tan',function(req,res){
	console.log("New user on a tangible object !");
	res.redirect('/?sim=0');
});

app.get('/user',function(req,res){
	console.log("recuperating old user");
	req.session.userID = parseInt(req.query.userid,10);
	connection.query('SELECT simorobj FROM userlist WHERE userid=' + mysql.escape(req.session.userID),function(err,result){
		if (err){
			console.log(err);
		}
		console.log("user :");
		console.log(req.session.userID);
		console.log("sim :");
		console.log(result[0].simorobj);
		req.session.sim = result[0].simorobj;
		res.redirect('/');
	});
	
});

app.get('/', function(req, res) { // set session variable : userID,
	simorobj = true;
	if (req.query.sim)
		simorobj = req.query.sim;
	console.log(req.session);
	console.log("new main page opened");
	if (!req.session.userID)
	{
		var user = [];
		user.push([simorobj]);
		
		connection.query('INSERT INTO userlist (simorobj) VALUES ?',[user],function(err,result0){
			if (err){
				console.log(err);
			}
			req.session.userID = result0.insertId;
			req.simorobj = simorobj;
			connection.query('SELECT * FROM exerciselist',function(err,result1){
				if (err){
					console.log(err);
				}
				req.exerciselist = result1;
				req.workspacexml = null;
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
	else
	{
		connection.query('SELECT simorobj FROM userlist WHERE userid='+mysql.escape(req.session.userID),function(err,result0){
			if (err){
				console.log(err);
			}
			if (result0[0])
			{
				req.simorobj = result0[0].simorobj;
				connection.query('SELECT * FROM exerciselist',function(err,result1){
					if (err){
						console.log(err);
					}
					req.exerciselist = result1;
					req.workspacexml = null;
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
			else
			{
				console.log("ERROR, USER DOES NOT EXIST");
			}
			
			
		});
		
	}
	
	/*
	if (!req.session.userID)
	{
		simorobj = req.query.sim;
		
		var user =[];
		user.push([simorobj]);
		connection.query('INSERT INTO userlist (simorobj) VALUES ?',[user],function(err,result){
			if (err){
				console.log(err);
			}
			req.session.userID = result.insertId;
			req.session.sim = simorobj;
			console.log("1");
		});
	}
	else
	{ 
		connection.query('SELECT xml FROM block WHERE userid=' + mysql.escape(req.session.userID) + ' AND exerciseid=1',function(err,result){
			if (result[0]){
				req.session.workspacexml = result[0].xml;
			}
		});
	}
	if (!req.session.exerciselist)
	{
		connection.query('SELECT * FROM exerciselist',function(err,result){
			if (err){
				console.log(err);
			}
			req.session.exerciselist = result;
			console.log(req.session);
		});
	}
	console.log(req.session);
	*/
	
});


app.get('/pageChange',function(req,res) {
	connection.query('SELECT xml FROM block WHERE userid=' + mysql.escape(req.session.userID) +' AND exerciseid=' + mysql.escape(parseInt(req.query.currentExerciseId,10)),function(err,result){
		if (err){
			console.log(err);
		}
		var ret = null
		if (result[0])
			ret = result[0].xml;
	});
});

app.post('/blocklogging',function(req,res){
	console.log("-----New block event-------");
    var jsondata = req.body;
	var values = [];
	var id;
	var type;
	blockLogValues = [];
	console.log("logging blocklog");
	console.log(jsondata);
	console.log(jsondata.type);
	console.log(jsondata.newParentId);
	if (jsondata.newParentId)
	{
		console.log("combination");
		jsondata.type = "combine";
	}
	else if (!jsondata.newCoordinate && jsondata.type == 'move')
	{
		console.log("ERROR, CANNOT PROCEED EVENT FOR : ");
		console.log(jsondata);
	}
	blockLogValues.push([req.session.userID,jsondata.currentExercise,jsondata.blockId,jsondata.type,jsondata.time]);
	console.log("adding :");
	console.log(blockLogValues);
	var blocklogID = null;
	connection.query('INSERT INTO blocklog (userid,exerciseid,blockid,logtype,logtime) VALUES ?',[blockLogValues],function(err,result){
		if (err){
			console.log(err);
		}
		console.log("blocklog added, id:");
		//console.log(result);
		console.log(result.insertId);
		blocklogID = result.insertId;
		switch(jsondata.type){
			case 'create':
				console.log("logging blockcreate");
				values.push([blocklogID,jsondata.xml]);
				console.log("adding :");
				console.log(values);
				connection.query('INSERT INTO blockcreate (createid,xml) VALUES ?',[values],function(err,result){
					if (err){
						console.log(err);
					}
					console.log("blockcreate logged");
				});
				break;
				
			case 'move':
				console.log("logging blockmove");
				values.push([blocklogID,jsondata.newCoordinate]);
				console.log("adding :");
				console.log(values);
				connection.query('INSERT INTO blockmove (moveid,newcoordinate) VALUES ?',[values],function(err,result){
					if (err){
						console.log(err);
					}
					console.log("blockmove logged");
				});
				break;
				
			case 'combine':
				console.log("logging blockcombine");
				if (jsondata.newInputName)
				{
					values.push([blocklogID,jsondata.newParentId,jsondata.newInputName]);
				}
				else
				{
					values.push([blocklogID,jsondata.newParentId,null]);
				}
				console.log("adding :");
				console.log(values);
				connection.query('INSERT INTO blockcombine (combineid,newparentid,newinputname) VALUES ?',[values],function(err,result){
					if (err){
						console.log(err);
					}
					console.log("blockmove logged");
				});
				break;
				
			case 'delete':
				console.log("logging blockdelete");
				values.push([blocklogID,JSON.stringify(jsondata.ids)]);
				console.log("adding :");
				console.log(values);			
				connection.query('INSERT INTO blockdelete (deleteid,delids) VALUES ?',[values],function(err,result){
					if (err){
						console.log(err);
					}
					console.log("blockdelete logged");
				});					
				break;
				
			case 'change':
				console.log("logging blockchange");
				values.push([blocklogID,jsondata.name,jsondata.newValue]);
				console.log("adding :");
				console.log(values);
				connection.query('INSERT INTO blockchange (changeid,vartype,var) VALUES ?',[values],function(err,result){
					if (err){
						console.log(err);
					}
					console.log("blockchange logged");
				});					
				break;
				
			default:
				console.log("ERROR, type of event not recognized :");
				console.log(jsondata.type);
		}
		console.log("---block event logged----");	
	});
	blockValues = [];
	console.log("--------logging xml-------");
	blockValues.push([req.session.userID,jsondata.currentExercise,jsondata.workspacexml]);
	connection.query('REPLACE INTO block (userid,exerciseid,xml) VALUES ?',[blockValues],function(err,result){
		if (err){
			console.log(err);
		}
		console.log("block added");
		console.log("-------xml done-------");
	});
	console.log("-----------------Done logging------------");
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
