var express = require('express');
var router = express.Router();
var userController = require("../app/controllers/user.js")

/* GET home page. */
router.post('/signup', function(req, res) {
	userController.createUser(req.body, function(response) {
		res.send(response);
	})
});

router.post('/signin', function(req, res) {
	userController.login(req.body, function(err, response) {
		res.send(response);
	})
});

router.post('/signout', function(req, res) {
	userController.signout(req.body, function(err, response) {
		res.send(response);
	})
});

router.post('/checkUserName', function(req, res) {
	userController.checkUserName(req.body.username, function(err, response) {
		res.send(response);
	})
});

router.post('/verifyOtp', function(req, res) {
	userController.verifyOtp(req.body.authToken, req.body.userId, function(response) {
		res.send(response);
	})
});

router.post('/verifyEmail', function(req, res) {
	userController.verifyemail(req.body.authToken, function(response) {
		res.send(response);
	})
});

module.exports = router;
