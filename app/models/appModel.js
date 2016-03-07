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
		mysqlConnection.getConnection(function(err, connection) {
			connection.query(qry, function(err, rows, fields) {
				if (err) {
					console.log('Query error: ' + err);
					res(err);
				}
				connection.release();
				res(err, rows);
			});
		});
	}
}

module.exports = connection;