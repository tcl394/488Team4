var express = require('express');

var database = require ('../config/database');


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

  router.get('/dashboard', isLoggedIn, function(req, res, next) {
    console.log('The session ID is: ' + req.user);

    database.findByEmail(req.user, res, dashboardCallback);

  });

  router.get('/page2', isLoggedIn, function(req, res, next) {
    console.log('The session ID is: ' + req.user);
    return res.render('page2', { title: 'Page 2'});
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


      router.get('/refer', function(req, res, next) {
        console.log(req.user);
        return res.render('Refer', { title: 'Add Referrals'});

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
  return res.render('dashboard', { title: 'Dashboard', message: 'Welcome '+ userObject.email, name: userObject.firstname });
}


console.log('userObject');
