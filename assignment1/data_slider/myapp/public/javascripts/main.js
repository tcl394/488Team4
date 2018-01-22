var pg = require('pg');
var conString = "postgres://team4884:team4password@team4db.coo42kldzrsk.us-east-1.rds.amazonaws.com:5432/team4BACS488";

const express = require('express');
const app = express();
var format = require('pg-format');
app.get('/image.png', function (req, res) {
    res.sendfile(path.resolve('./assignment1/question.jpeg'));
});
app.get('/', (req, res) => res.sendFile('display.html', { root: '/Users/teresaleggett/Documents/GitHub/488Team4/assignment1/'}));

app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.use(express.static('public'));

app.close();

var client = new pg.Client(conString);
client.connect();

var selectQuestions = format('SELECT * from surveyq');

function getData(){

  client.query(selectQuestions, function (err, result) {
      if (err) {
        console.log(err)
      }

      for (var i = 0; i<8; i ++){

          return result.rows[i];

        }
        client.end();
    })

};
