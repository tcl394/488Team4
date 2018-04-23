var path = require("path");


module.exports = {

  get: function(req, res){
    res.render(path.join(__dirname + '/../public/views/login.pug'));

  }

}
