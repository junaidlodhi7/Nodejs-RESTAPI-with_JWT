var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken');
var config = require('./config');
var User   = require('./models/user');


router.use(function timeLog(req, res, next) {
  	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	var decoded = jwt.verify(token, config.secret, function(err, decoded) {
		  if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
          
        return res.token = decoded;  
        next();
      }
	});
});

/// this about page is protected and only users which are authenticated can access this
router.get('/about', function(req, res) {
  res.send('About page');
});


module.exports = router;