var appModel = require("../models/appModel.js"),
	async   = require('async'),
	constants = require('../lib/constants.js'),
	_ = require('underscore');

var artist = {
	searchByUser : function(req, res) {
		//To do:mysql query

		var data = [{
			name: "Test Vendor",
			rank: 5,
			photo: "https://testurl.com/test.jpg",
			desc: "test desc",
			joining_date: "11/09/2016",
			bookings: 23
		}]
		res(null, data);
	},
	search : function(req, res) {
		// Todo: design the query
		var data = [{
			name: "Test Vendor",
			rank: 5,
			photo: "https://testurl.com/test.jpg",
			desc: "test desc",
			joining_date: "11/09/2016",
			bookings: 23
		}]
		res(null, data);
	}
}

module.exports = artist;
