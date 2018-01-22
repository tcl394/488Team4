var main = require("./main")

module.exports = function(){
  var express = require('express');
  var router = express.Router();
  router.get("/test", main.get);
  return router;
}
