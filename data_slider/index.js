var api = require('./API')();
var routes = require('./routes')();
var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var morgan = require('morgan');

app.use(morgan('dev'));

app.use("/API", api);
app.use("/", routes);

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

var port = "3000";

var http = require('http');
  http.createServer(app).listen(port, function(){
    console.log('Listening on port ' + port);
  });
