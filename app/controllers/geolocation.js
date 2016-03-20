var async = require('async');
var geolocationModel = require("../models/geolocation.js");
var appController = require("./appController.js");
var _ = require('underscore');

var geolocation = {
	getLocation : function(callback) {
		geolocationModel.getLocation(function(err, rows){
			var locations = {};
			if(err) callback(err);
		
			appController.responsify(err, rows, function(response){
				callback(null, response);
			})
		});
	}
}

module.exports = geolocation;