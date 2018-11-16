var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
		
    res.render('index', {
        title: 'ISEP-R0B0 | Code Editor',
        userID : JSON.stringify(req.session.userID),	// id of the user
		exerciselist: JSON.stringify(req.exerciselist), // list of all exercise
		workspacexml: JSON.stringify(req.workspacexml), // xml to load the workspace from database
		simorobj: JSON.stringify(req.simorobj),			// simulation or tangible object
		hexFileHeader : JSON.stringify(req.hexFileHeader)
    });
});

router.get('/accueil',function(req,res,next){
	console.log(req.session.simulation);
	res.render('accueil',{
		title: 'ISEP-R0B0 | Accueil',
		simulation : JSON.stringify(req.session.simulation)		
	});	
});

module.exports = router;
