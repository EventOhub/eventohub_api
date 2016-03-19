var appModel = require("../models/appModel.js");

var geolocationModel = {
	getLocation : function(callback) {
		var qry = "SELECT country, state, city FROM countries INNER JOIN states on (states.country_id = countries.country_id)";
		qry += " INNER JOIN cities on (cities.state_id = states.state_id)";
		appModel.query(qry, function(err, data){
			console.log(data);
			if(err) callback(err);
			callback(null, data)
		});
	}
}

module.exports = geolocationModel;
