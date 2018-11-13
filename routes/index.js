var express = require('express');
var fs = require("fs");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
		
    res.render('index', {
        title: 'ISEP-R0B0 | Code Editor',
        fs: fs,
        userID : JSON.stringify(req.session.userID),	// id of the user
		exerciselist: JSON.stringify(req.exerciselist), // list of all exercise
		workspacexml: JSON.stringify(req.workspacexml), // xml to load the workspace from database
		simorobj: JSON.stringify(req.simorobj)			// simulation or tangible object
    });
});

module.exports = router;
