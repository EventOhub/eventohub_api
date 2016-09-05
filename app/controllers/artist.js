var async = require('async');
var artistModel = require("../models/artist.js");
var appController = require("./appController.js");
var _ = require('underscore');

var artist = {
	searchByUser : function(req, res) {
		artistModel.searchByUser(req, function(err, data){
			var apiResponse = appController.responsify(err, data);
			res(apiResponse);
		});
	},
	search : function(req, res) {
		artistModel.search(req, function(err, data){
			var apiResponse = appController.responsify(err, data);
			res(apiResponse);
		});
	}
}

module.exports = artist;