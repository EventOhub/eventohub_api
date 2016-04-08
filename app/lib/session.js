var appMongoModel = require("../models/appMongoModel.js"),
	async         = require('async'),
	constants     = require('../lib/constants.js'),
	uuid          = require('node-uuid'),
	_             = require('underscore');

var session = {
	createSession : function(userData, cb) {
		var sessionId = uuid.v1();
		var mongoData = {
			"collection" : "sessions",
			"qry" : {
				"session_id" : sessionId,
				"user_id"   : userData.id,
				"user_name" : userData.name
			}
		}
		appMongoModel.insert(mongoData, function(err, result){
			if(err) cb(err);
			cb(null, sessionId);
		});
	}
}

module.exports = session;
