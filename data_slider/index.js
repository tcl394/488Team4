var api = require('./API')();

var express = require('express');
var app = express();
var router = express.Router();

var passport = require('passport');
var flash = require('connect-flash');
require('./config/passport')(passport);


var User = require('./models/user');

var bodyParser  = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');


var session = require('express-session');
app.use(session( {
  secret: 'team4',
}));

app.set('view engine', 'pug');

app.use(morgan('dev'));

//app.use("/API", api);


app.use(express.static('./public'));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(flash()); // use connect-flash for flash messages stored in session
app.use(cookieParser()); // read cookies (needed for auth)

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


var routes = require('./routes/index')(passport);
app.use('/', routes);



var port = "3000";

var http = require('http');
  http.createServer(app).listen(port, function(){
    console.log('Listening on port ' + port);
  });
