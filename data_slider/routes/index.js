var express = require('express');

var database = require ('../config/database');

const SparkPost = require('sparkpost')
const client = new SparkPost('149766bdfb389444dbef57ba524cea1695ca1f3d')



module.exports = function(passport){

  var router = express.Router();


  router.get('/login', function(req, res, next) {
    console.log(req.user);
    return res.render('login', { title: 'Log In'});

  });

  // POST /login
  router.post('/login', passport.authenticate('local-login', {
          successRedirect : '/dashboard', // redirect to the secure dashboard section
          failureRedirect : '/invalid_login', // redirect to invalid login page if login fails
          failureFlash : true // allow flash messages
      }));

  // POST /edit_account
  router.post('/edit_account', isLoggedIn, function(req, res, next) {
    if (req.body.firstname && req.body.lastname && req.body.address
    && req.body.city && req.body.state && req.body.zip) {
      console.log(req.body.firstname + req.body.lastname + req.body.address
      + req.body.city + req.body.state + req.body.zip);

      database.updateAccount(req.body.firstname, req.body.lastname, req.body.address, req.body.city, req.body.state, req.body.zip, req.user);



      res.redirect('/dashboard');

    } else {
      var err = new Error('Email and password are required.');
      err.status = 401;
      return next(err);
    }
  });

  // POST /survey
  router.post('/survey', function(req, res, next) {
    var q1a;
    var q2a;
    var q3a;
    var q4a;

    console.log(req.body.Black);
    if (req.body.Black = "on"){
      q1a = "a";
    }else if
    (req.body.Black = "on"){
      q1b = "b";
    }
    else if
    (req.body.Black = "on"){
      q1c = "c";
    }
    else if
    (req.body.Black = "on"){
      q1d = "d";
    }

    });

  // POST /refer
  router.post('/refer', isLoggedIn, function(req, res, next) {
    if (req.body.firstname && req.body.lastname && req.body.email) {

      database.addReferral(req.user, req.body.email, req.body.firstname, req.body.lastname);

      res.render('refer_success', { title: 'Referral Added', referredname: req.body.firstname});

    } else {
      var err = new Error('BAD');
      err.status = 401;
      return next(err);
    }

client.transmissions.send({
  content: {
    from: 'teresacarlsonleggett@gmail.com',
    subject: 'Hello from node-sparkpost',
    html: '<p>Hello world</p>'
  },
  recipients: [
    {address: 'tylerwleggett@gmail.com'}
  ]
})
.then(data => {
  console.log('Woohoo! You just sent your first mailing!')
  console.log(data)
})
.catch(err => {
  console.log('Whoops! Something went wrong')
  console.log(err)
})
  });




  router.get('/dashboard', isLoggedIn, function(req, res, next) {
    console.log('The session ID is: ' + req.user);
    database.findByEmail(req.user, res, dashboardCallback);

  });

  router.get('/survey', function(req, res, next) {
    return res.render('survey', { title: 'Synek Survey'});
  });


  router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });

  router.get('/not-authenticated', function(req, res) {
        return res.render('not-authenticated', { title: 'Not Authenticated'});
    });
    router.get('/invalid_login', function(req, res) {
          return res.render('invalidLogin', { title: 'Invalid Login'});
      });


      router.get('/refer', isLoggedIn, function(req, res, next) {
        console.log(req.user);
        return res.render('Refer', { title: 'Add Referrals'});

      });

      router.get('/edit_account', isLoggedIn, function(req, res, next) {
        database.findByEmail(req.user, res, editCallback);

      });

    function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/not-authenticated');
  }

    return router;


}

function dashboardCallback(res, userObject){
  return res.render('dashboard', { title: 'Dashboard', fname: userObject.firstname, name: userObject.firstname, lname: userObject.lastname, address1: userObject.address,
  city: userObject.city, state: userObject.state, zip: userObject.zip, email: userObject.email });
}

function editCallback(res, userObject){
  return res.render('edit_account', { title: 'Edit Account Info', firstname: userObject.firstname, lastname: userObject.lastname, email: userObject.email,
address: userObject.address, city: userObject.city, state: userObject.state, zip: userObject.zip});
}


console.log('userObject');
