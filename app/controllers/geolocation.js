var async = require('async');
var geolocationModel = require("../models/geolocation.js");
var appController = require("./appController.js");
var _ = require('underscore');

var geolocation = {
	getLocation : function(req, res) {
		geolocationModel.getLocation(function(err, rows){
			var apiResponse = appController.responsify(err, data);
			res(apiResponse);
		});
	}
}

module.exports = geolocation;