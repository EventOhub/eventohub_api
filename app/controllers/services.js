var async = require('async');
var servicesModel = require("../models/services.js");
var appController = require("./appController.js");
var _ = require('underscore');

var services = {
	getServices : function(callback) {
		servicesModel.getServices(function(err, rows){
			var locations = {};
			if(err) callback(err);
		
			appController.responsify(err, rows, function(response){
				callback(null, response);
			})
		});
	}
}

module.exports = services;