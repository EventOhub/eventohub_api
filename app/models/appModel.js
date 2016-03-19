var mysql 	= require('mysql'),
	fs    	= require('fs'),
 	db_conf = require('../config/database.json'),
	env  	= process.env.NODE_ENV,
	mysqlConnection = mysql.createPool({
		host     : db_conf[env].host,
		user     : db_conf[env].username,
		password : db_conf[env].password,
		database : db_conf[env].database
	});


var connection = {
	query : function(qry, res){
		mysqlConnection.getConnection(function(err, mysqlConnection) {
			mysqlConnection.query(qry, function(err, rows, fields) {
				if (err) {
					console.log('Query error: ' + err);
					res(err);
				}
				mysqlConnection.release();
				res(err, rows);
			});
		});
	},

	insertQueryBuilder : function(data, res){
		var fields = [];
		var values = '';
		var count = 0;
		for (var key in data.values) {
			count ++;
			fields.push(key);
			if (typeof data.values[key] === 'string' && data.values[key] !== 'CURRENT_TIMESTAMP') {
				if ((data.values[key]).indexOf("'") > -1) {
					data.values[key] = (data.values[key]).replace(/'/g, "''"); // escape single quotes
				}
				values += "'" + data.values[key] + "'";
			} else {
				values += data.values[key];
			}
			if (count < Object.keys(data.values).length) {
				values += ",";
			}
		}
		var qry = "INSERT INTO " + data.table + " (" + fields.join(',') + ") VALUES (" + values + ")";
		res(null, qry);
	}
}

module.exports = connection;