var pg = require('pg');
var conString = "postgres://team4884:team4password@team4db.coo42kldzrsk.us-east-1.rds.amazonaws.com:5432/team4BACS488";
var format = require('pg-format');
var client = new pg.Client(conString);
client.connect();


module.exports = {

  getRow: function(req, res, n){

    var selectQuestions = format('SELECT * from surveyq');

    newn = n - 1;

      client.query(selectQuestions, function (err, result) {
          if (err) {
            console.log(err)
          }
              console.log(result.rows[newn]);
              return res.json({result:result.rows[newn]});
        });

  }
}
