var express = require('express');


module.exports = function(passport){

  var router = express.Router();


  router.get('/login', function(req, res, next) {
    console.log(req.user);
    return res.render('login', { title: 'Log In'});

  });

  // POST /login
  router.post('/login', passport.authenticate('local-login', {
          successRedirect : '/dashboard', // redirect to the secure profile section
          failureRedirect : '/invalid_login', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
      }));

  router.get('/dashboard', isLoggedIn, function(req, res, next) {
    console.log('The session ID is: ' + req.user);
    return res.render('dashboard', { title: 'Dashboard', message: 'Welcome '+ req.user});

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

    function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/not-authenticated');
  }

    return router;
}
