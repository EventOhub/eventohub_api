var express = require('express');
var router = express.Router();
var geolocationController = require("../app/controllers/geolocation.js")

/* GET home page. */
router.get('/states/:country_id', function(req, res, next) {
  geolocationController.getStates(req.params.country_id, function(err, response) {
  	res.send(response);
  })
});

router.get('/cities/:state_id', function(req, res, next) {
  geolocationController.getCities(req.params.state_id,function(err, response) {
  	res.send(response);
  })
});

module.exports = router;
