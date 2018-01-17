var pg = require('pg');
var conString = "postgres://team4884:team4password@team4db.coo42kldzrsk.us-east-1.rds.amazonaws.com:5432/team4BACS488";

var client = new pg.Client(conString);
client.connect();

client.query("INSERT INTO surveyq (questionnum, question) values(1, 'Do you like coffee?')");
