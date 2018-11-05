var express = require('express');
var fs = require("fs");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	
    res.render('index', {
        title: 'ISEP-R0B0 | Code Editor',
        fs: fs,
        userID : JSON.stringify(req.session.userID),
		exerciselist: JSON.stringify(req.session.exerciselist),
		workspacexml: JSON.stringify(req.session.workspacexml)
    });
});

router.post('/', function (req, res, next) {
    var hiddenCode = req.body.pythonCode;
    fs.writeFile("untitled.py", hiddenCode, function (err) {
        if (err) {
            console.log(err);
            res.end('end');
        } else {
            console.log("File successfully created...");
            console.log("Now downloading file...");
            var file = __dirname + "/../untitled.py";
            console.log(file);
            res.download(file);
            console.log("File downloaded...");
            res.end('end');
        }
    });
    
});

module.exports = router;
