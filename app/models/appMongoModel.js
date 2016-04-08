var mongodb        = require('mongodb'),
	fs             = require('fs'),
	mongoConf      = require('../config/mongodb.json'),
	env            = process.env.NODE_ENV,
	collectionName = "sessions",
	mongoClient    = mongodb.MongoClient;
	
var url = "mongodb://" + mongoConf[env].host + ":" + mongoConf[env].port + "/" + mongoConf[env].database;   

var mongoConnection = {
	query : function(qry, res){
		mongoClient.connect(url, function(err, db) {
		 	if (err) {
				console.log('Mongo connection error: ' + err);
				res(err);
		 		db.close();
			}else{
				db.collection(mongo.collection).find(mongo.qry, function(err, result){
					db.close();
					if(err) res(err);
					res(null, result);
				});
			}
		});
	},

	insert : function(mongoData, res){
		mongoClient.connect(url, function(err, db) {
		 	if (err) {
				console.log('Mongo connection error: ' + err);
				res(err);
		 		db.close();
			}else{
				db.collection(mongoData.collection).insert(mongoData.qry, function(err, result){
					db.close();
					if(err) res(err);
					res(null, result);
				});
			}
		});
	}
}

module.exports = mongoConnection;