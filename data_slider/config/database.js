var pg = require('pg');
var conString = "postgres://team4884:team4password@team4db.coo42kldzrsk.us-east-1.rds.amazonaws.com:5432/team4BACS488";
var format = require('pg-format');
var client = new pg.Client(conString);
client.connect();

module.exports = {


  checkLogin: function (email, password, done){

    var makeString = format('SELECT * FROM credentials WHERE email_address = \'%s\' AND pass = \'%s\';', email, password);
    console.log(makeString);
    var findUser = makeString.toString();

      client.query(findUser, function (err, result) {
          if (err){
            console.log('Error here.' + result);
            return done(err);
          }
          else if (typeof result.rows[0] == 'undefined'){
            console.log('Invalid email or password.');
            return done(null, false);
          }
          else{
              console.log('The success is running.')
              return done(null, result.rows[0]);
          }



        });
  },
  findByEmail: function (email){

    var makeString = format('SELECT * FROM credentials WHERE email_address = \'%s\';', email);
    console.log(makeString);
    var findUser = makeString.toString();

      client.query(findUser, function (err, result) {
          if (err){
            console.log('Error here.' + result);
            return done(err);
          }
          else if (typeof result.rows[0] == 'undefined'){
            console.log('Invalid email or password.');
            return done(null, false);
          }
          else{
              console.log(result.rows[0]);
              return done(null, result.rows[0]);
          }



        });
  }
}
