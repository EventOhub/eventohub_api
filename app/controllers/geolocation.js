var async = require('async');
var geolocationModel = require("../models/geolocation.js");
var appController = require("./appController.js");
var _ = require('underscore');

var geolocation = {
	getLocation : function(callback) {
		geolocationModel.getLocation(function(err, rows){
			var locations = {};
			if(err) callback(err);
			_.each(rows, function(countries){
				if(locations[countries['country']] === undefined){
					locations[countries['country']] = {};
					locations[countries['country']][countries['state']] = [];
					locations[countries['country']][countries['state']].push(countries['city']);
				}else{
					if(locations[countries['country']][countries['state']] === undefined){
						locations[countries['country']][countries['state']] = [];
						locations[countries['country']][countries['state']].push(countries['city']);
					}else
						locations[countries['country']][countries['state']].push(countries['city']);
				}
				
			});
			appController.responsify(err, locations, function(response){
				callback(null, response);
			})
		});
	}
}

module.exports = geolocation;