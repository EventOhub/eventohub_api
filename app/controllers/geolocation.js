var async = require('async');
var geolocationModel = require("../models/geolocation.js");
var appController = require("./appController.js");

var geolocation = {
	getStates : function(country_id, callback) {
		geolocationModel.getStates(country_id, function(err, rows){
			var states = [];
			if(err) callback(err);
			async.forEach(rows, function (row, cb){ 
			    states.push({
			    	"id" : row['state_id'],
			    	"name" : row['state']
			    })
			    cb(); // tell async that the iterator has completed
			}, function(err) {
			    console.log('iterating done');
			});  
			appController.responsify(err, states, function(response){
				callback(null, response);
			})
		});
	},

	getCities : function(state_id, callback) {
		geolocationModel.getCities(state_id, function(err, rows){
			var states = [];
			if(err) callback(err);
			async.forEach(rows, function (row, cb){ 
			    states.push({
			    	"id" : row['city_id'],
			    	"name" : row['city']
			    })
			    cb(); // tell async that the iterator has completed
			}, function(err) {
			    console.log('iterating done');
			});  
			appController.responsify(err, states, function(response){
				callback(null, response);
			})
		});
	}
}

module.exports = geolocation;