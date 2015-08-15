// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var jwt = require('jsonwebtoken');
var User = require('./models/user'); 
// configuration =================

var port = process.env.PORT || 8080;
mongoose.connect(process.env.MONGOLAB_URI);
app.set('superSecret', process.end.SECRET);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(callback){
    console.log('yeah');
})
    
app.use(express.static(__dirname + '/app'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'false'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
    
    
    
// =======================
// routes ================
// =======================
// basic route
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// API ROUTES -------------------
var apiRoutes = express.Router();

//route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res){
    User.findOne({
        email: req.body.email
    }, function(err, user){
        if (err) throw err;
        if (!user){
            res.json({success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

          // check if password matches
          if (user.password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {

            // if user is found and password is right
            // create a token
            var token = jwt.sign(user, app.get('superSecret'), {
              expiresInMinutes: 1440 // expires in 24 hours
            });

            // return the information including token as JSON
            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token
            });
          }   

    }

  });
});


//route middleware to verify a token
apiRoutes.use(function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if (token){
        jwt.verify(token, app.get('superSecret'), function(err, decoded){
            if (err){
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            }
            else{
                req.decoded = decoded;
                next();
            }
        })
    } else{
        return res.json({
            success: false,
            message: 'No token provided'
        });
    }
})
        

//route to show random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function(req, res){
    res.json({message: 'Welcome'});
});

//route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res){
    User.find({}, function(err, users){
        res.json(users);
    });
});
app.use('/api', apiRoutes);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);

