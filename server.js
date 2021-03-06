/* ==== MODULES ==== */
var express = require('express');
var app = express();
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var mongoose = require('mongoose');

var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');

/* ==== CONFIG ==== */
var port  = process.env.PORT || 8080;
var dbURI = process.env.DB || 'mongodb://localhost/testr'

/* ==== MONGODB ==== */
var User = require('./app/models/User.js');
var Group = require('./app/models/Group.js');
var Listing = require('./app/models/Listing.js');

mongoose.connect(dbURI);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() { console.log("Mongo DB connected!"); });

/* ==== STATIC SERVING ==== */
app.use(express.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users

/* ==== AUTHENTICATION ==== */
// set up our express application
app.use(morgan('dev'));                     // log every request to the console
app.use(cookieParser());                    // read cookies (needed for auth)
app.use(bodyParser());                      // get information from html forms

app.use(session({ secret: 'houseApp' }));   // session secret
app.use(passport.initialize());
app.use(passport.session());                // persistent login sessions
app.use(flash());                           // use connect-flash for flash messages stored in session

app.use(methodOverride());                  // simulate DELETE and PUT

// authentication and routes
require('./app/authentication.js')(app, passport); // authentication
require('./app/mailGun.js')(app); // mailGun
require('./app/routes.js')(app); // routes

// start app
app.listen(port);
console.log('Houseclip started on port ' + port);
exports = module.exports = app;