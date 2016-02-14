var appModel = require("../models/appModel.js");

var geolocationModel = {
	getStates : function(country_id, callback) {
		qry = "SELECT * FROM states where country_id ="+ country_id;
		appModel.query(qry, function(err, data){
			if(err) callback(err);
			callback(null, data)
		});
	},
	getCities : function(state_id, callback) {
		qry = "SELECT * FROM cities where state_id ="+ state_id;
		appModel.query(qry, function(err, data){
			if(err) callback(err);
			callback(null, data)
		});
	}
}

module.exports = geolocationModel;
