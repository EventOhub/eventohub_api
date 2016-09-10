var express = require('express');
var router = express.Router();
var artistController = require("../app/controllers/artist.js")

/* GET home page. */
router.get('/searchByUser/:userName', function(req, res) {
  artistController.searchByUser(req, function(response) {
  	res.send(response);
  })
});

router.get('/search', function(req, res) {
  artistController.search(req, function(response) {
  	res.send(response);
  })
});



module.exports = router;
