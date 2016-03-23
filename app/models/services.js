var appModel = require("../models/appModel.js"),
	async   = require('async'),
	constants = require('../lib/constants.js'),
	 _ = require('underscore');

var servicesModel = {
	getServices : function(callback) {
		var qry = "SELECT id, CONCAT(serviceType, '-',service) AS value from services";
		appModel.query(qry, function(err, data){
			if(err) callback(err);
			callback(null, data);
		});
	}
}

module.exports = servicesModel;
