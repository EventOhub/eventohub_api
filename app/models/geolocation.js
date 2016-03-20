var appModel = require("../models/appModel.js"),
	async   = require('async'),
	constants = require('../lib/constants.js'),
	 _ = require('underscore'),
	uuid = require('node-uuid');

var geolocationModel = {
	getLocation : function(callback) {
		var location = [];
		async.parallel([
			function(cb){
				var qry = "SELECT * FROM countries";
				appModel.query(qry, function(err, countryData){
					if(err) cb(err);
					_.each(countryData, function(coData){
						var UUID = uuid.v4().split("-");
						var UUID = UUID[0] + "-" + constants.COUNTRY_TYPE +"-" + coData['country_id'];
						var tempHash = {
							"id" : UUID,
							"value" : coData['country']
						}
						location.push(tempHash);
					});	
					cb(null, location);
				});
			},
			function(cb){
				var qry = "SELECT * FROM states";
				appModel.query(qry, function(err, stateData){
					if(err) cb(err);
					_.each(stateData, function(stData){
						var UUID = uuid.v4().split("-");
						var UUID = UUID[0] + "-" + constants.STATE_TYPE +"-" + stData['state_id'];
						var tempHash = {
							"id" : UUID,
							"value" : stData['state']
						}
						location.push(tempHash);
					});	
					cb(null, location);
				});
			},function(cb){
				var qry = "SELECT * FROM cities";
				appModel.query(qry, function(err, cityData){
					if(err) cb(err);
					_.each(cityData, function(ciData){
						var UUID = uuid.v4().split("-");
						var UUID = UUID[0] + "-" + constants.CITY_TYPE +"-" + ciData['city_id'];
						var tempHash = {
							"id" : UUID,
							"value" : ciData['city']
						}
						location.push(tempHash);
					});	
					cb(null, location);
				});
			}
		], function (err, result) {
		    if (err) {
				callback(err);
			} else {
				callback(null, _.uniq(_.flatten(result)));
			}
		});	
	}
}

module.exports = geolocationModel;
