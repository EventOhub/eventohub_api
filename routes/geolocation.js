var express = require('express');
var router = express.Router();
var geolocationController = require("../app/controllers/geolocation.js")

/* GET home page. */
router.get('/location', function(req, res) {
  geolocationController.getLocation(req, function(response) {
  	res.send(response);
  })
});



module.exports = router;
