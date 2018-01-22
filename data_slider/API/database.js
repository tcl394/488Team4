var pg = require('pg');
var conString = "postgres://team4884:team4password@team4db.coo42kldzrsk.us-east-1.rds.amazonaws.com:5432/team4BACS488";
var format = require('pg-format');
var client = new pg.Client(conString);
client.connect();

module.exports = {

  getRow: function(req, res){
    var rowNum = req.query.n;
    var selectQuestions = format('SELECT * from surveyq');

    newn = rowNum - 1;

      client.query(selectQuestions, function (err, result) {
          if (err) {
            console.log(err)
          }
              console.log(result.rows[newn]);
              return res.json({result:result.rows[newn]});
              client.close();
        });
  },

  getData: function (req, res){

    var client = new pg.Client(conString);
    client.connect();

    var selectQuestions = format('SELECT * from surveyq');

    var alldata = [];

      client.query(selectQuestions, function (err, result) {
          if (err) {
            console.log(err)
          }

          for (var i = 0; i<8; i ++){

              alldata.push(res.json({result:result.rows[i]}));
              console.log(result.rows[i]) ;

            }
            console.log(typeof(alldata));
            return alldata;
        });


  }
}
