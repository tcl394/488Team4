var express = require('express');
var database = require('./database');

module.exports = function(){
  var router = express.Router();
  router.get("/getRow", database.getRow)
  router.get("/getData", database.getData)
  return router;
}
