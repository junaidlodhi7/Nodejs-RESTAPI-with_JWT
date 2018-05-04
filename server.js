
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./models/user'); // get our mongoose model
var port = process.env.PORT || 1234; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
var api = require('./authentication');
app.use('/api',api);

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

          app.post('/signup', function(req, res) {

            var nick = new User({ 
              name: req.body.name, 
              password: req.body.pass,
              role: req.body.role 
            });

            nick.save(function(err) {
              if (err) throw err;

              console.log('User saved successfully');
             return res.status(200).json({ success: signedup });
            });
          });
          app.post('/login', function(req, res) {
          /////////////
            User.findOne({
              name: req.body.name
            }, function(err, user) {

              if (err) throw err;

              if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
              } else if (user) {

                // check if password matches
                if (user.password != req.body.password) {
                  res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                  // if user is found and password is right
                  // create a token with only our given payload
              // we don't want to pass in the entire user since that has the password
              const payload = {
                name: user.name,
                userid : user._id
              };
                  var token = jwt.sign(payload, config.secret,{ expiresIn: '10h' });

                  // return the information including token as JSON
                  res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                  });
                }   

              }

            });
///////////////
});

app.listen(port);
console.log('Magic happens at http://localhost:' + port);