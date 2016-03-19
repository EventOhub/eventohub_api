var express = require('express');
var router = express.Router();
var geolocationController = require("../app/controllers/geolocation.js")

/* GET home page. */
router.get('/location', function(req, res, next) {
  geolocationController.getLocation(function(err, response) {
  	res.send(response);
  })
});



module.exports = router;
