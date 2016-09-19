var async = require('async');
var userModel = require("../models/user.js");
var appController = require("./appController.js");

var user = {
	createUser : function(params, res) {
		userModel.createUser(params, function(err, rows){
			var apiResponse = appController.responsify(err, rows);
			console.log(apiResponse);
			res(apiResponse);
		});
	},
	verifyemail : function(authToken, res) {
		userModel.verifyemail(authToken, function(err, rows){
			var apiResponse = appController.responsify(err, rows);
			console.log(apiResponse);
			res(apiResponse);
		});
	},

	verifyOtp : function(authToken, userId, res) {
		userModel.verifyOtp(authToken, userId, function(err, rows){
			var apiResponse = appController.responsify(err, rows);
			console.log(apiResponse);
			res(apiResponse);
		});
	},
    
	login : function(params, callback) {
		userModel.login(params, function(err, rows){
			if(err) callback(err);
			appController.responsify(err, rows, function(response){
				callback(null, response);
			})
		});
	},
	checkUserName : function(username, callback) {
		userModel.checkUserName(username, function(err, rows){
			if(err) callback(err);
			appController.responsify(err, rows, function(response){
				callback(null, response);
			})
		});
	}
}

module.exports = user;