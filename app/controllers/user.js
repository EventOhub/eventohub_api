var async = require('async');
var userModel = require("../models/user.js");
var appController = require("./appController.js");

var user = {
	createUser : function(params, callback) {
		userModel.createUser(params, function(err, rows){
			if(err) callback(err);
			appController.responsify(err, rows, function(response){
				callback(null, response);
			})
		});
	},
	verifyemail : function(authToken, callback) {
		userModel.verifyemail(authToken, function(err, rows){
			if(err) callback(err);
			appController.responsify(err, rows, function(response){
				callback(null, response);
			})
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