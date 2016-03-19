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

function begin(callback){
	mysqlConnection.getConnection(function(err, connection){
		conn = connection;
		if (err) {
			console.log('Connection Error: ' + err);
			callback(err);
			return;
		}
		conn.beginTransaction(function(err){
			console.log('Transaction begin');
			callback(err);
		});
	});
	this.query = function(qry, cb){
		console.log('Query: ' + qry);
		conn.query(qry, function(err, result){
			//console.log('\n\nquery err: ' + err + " result is " + JSON.stringify(result) + '\n\n')
			cb(err, result);
		});
	};
	this.commit = function(cb){
		conn.commit(function(err){
			conn.release();
			console.log('Transaction Commit');
			cb(err);
		});
	};
	this.rollback = function(cb){
		conn.rollback(function(){
			conn.release();
			console.log('Transaction Rollback');
			cb(null);
		});
	};
}

module.exports = {begin: begin};