var pgp = require('pg-promise')(/*options*/)
var db = pgp('postgres://team4884:team4password@team4db.coo42kldzrsk.us-east-1.rds.amazonaws.com:5432/team4BACS488')
var format = require('pg-format');

db.one('SELECT $1 AS value', 123)
 .then(function (data) {
   console.log('DATA:', data.value)
 })
 .catch(function (error) {
   console.log('ERROR:', error)
 });

 var selectQuestions = format('SELECT * from surveyq');


   db.query(selectQuestions, function (err, result) {
       if (err) {
         console.log(err)
       }

       for (var i = 0; i<8; i ++){

           console.log(result.rows[i]);

         }
        
     });
