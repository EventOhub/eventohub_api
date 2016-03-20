var express = require('express');
var router = express.Router();
var servicesController = require("../app/controllers/services.js")

/* GET home page. */
router.get('/getServices', function(req, res, next) {
  servicesController.getServices(function(err, response) {
  	res.send(response);
  })
});



module.exports = router;
