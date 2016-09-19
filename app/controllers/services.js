var async = require('async');
var servicesModel = require("../models/services.js");
var appController = require("./appController.js");
var _ = require('underscore');

var services = {
	getServices : function(req, res) {
		servicesModel.getServices(function(err, rows){
			var apiResponse = appController.responsify(err, rows);
			res(apiResponse);
		});
	}
}

module.exports = services;