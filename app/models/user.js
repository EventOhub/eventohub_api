var appModel = require("../models/appModel.js"),
	constants = require('../lib/constants.js'),
	email = require('../lib/email.js'),
	uuid = require('node-uuid'),
	crypto = require('crypto'),
	moment = require('moment'),
	table  = "user",
	verificationTableName = 'verification';

var userModel = {
	createUser : function(params, callback) {
		var qryData = {
			"table" : "user",
			"values" : {
				"username"    : params.username,
				"password"    : userModel.getHash(params.password),
				"userType"    : params.userType,
				"name"        : params.name,
				"countryCode" : params.countryCode,
				"phoneNumber" : params.phoneNumber
			}
		}
		userModel.checkUser(params.username, params.phoneNumber, function(err, data){
			if(err) callback(err);
			if(data.length > 0){
				callback(null, "User already exists with this phoneNumber or email")
			}else{
				appModel.insertQueryBuilder(qryData,function(err, qry){
					appModel.query(qry, function(err, data){
						if(err) callback(err);
						var verificationUUID = uuid.v1() + "-" + data.insertId;
						var verificationData = {
							"table" : "verification",
							"values" : {
								"user_id"    		 : data.insertId,
								"emailStartTime"     : moment().format('YYYY-MM-DD hh:mm:ss'),
								"authToken"          : verificationUUID
							}
						}
						appModel.insertQueryBuilder(verificationData,function(err, verificationQry){
							appModel.query(verificationQry, function(err, data){
								if(err) callback(err);
								userModel.sendEmail(params.username, verificationUUID, function(emailErr, emailResponse){
									if(err) callback(null, emailErr);
									var result = {
										"insertId" : data.insertId
									}
									callback(null, result)
								});
							});	
						});	
					});
				});		
			}
		});
	},

	checkUser : function(username, phoneNumber, callback){
		var checkUserQry = "SELECT username from " + table;
		checkUserQry += " where username = '" + username + "' or phoneNumber = " + phoneNumber; 
		appModel.query(checkUserQry, function(err, data){
			if(err) callback(err);
			console.log(data);
			callback(null, data)
		});
	},

	verifyemail : function(authToken, callback){
		var authTokenArr = authToken.split("-");
		var userId = authTokenArr[authTokenArr.length - 1];
		var verifyemailQuery  = "SELECT count(id) AS cnt from " + verificationTableName;
			verifyemailQuery += " WHERE authToken = '" + authToken + "' AND user_id = " + userId;
			verifyemailQuery += " AND isEmailVerified = 'N' AND emailStartTime >= DATE_SUB(NOW(), INTERVAL " + constants.EMAIL_VERFICATION_TIME + " HOUR)"; 
			verifyemailQuery += " LIMIT 1";
		
		appModel.query(verifyemailQuery, function(err, data){
			console.log();
			if(err) callback(err);
			if(data[0]['cnt'] > 0){
				var verifedUpdateEmail = "UPDATE verification SET isEmailVerified = 'Y'"
				   verifedUpdateEmail += " WHERE authToken = '" + authToken + "' AND user_id = " + userId;
				   appModel.query(verifedUpdateEmail, function(err, data){
						if(err) callback(err);
						callback(null, "Email is verified successfully.");
				   });
			}else{
				callback(null, "Token either invalid or expired.");
			}
		});
	},

	sendEmail : function(username, authToken, callback){
		console.log(constants.eventohub_config);
		var to = username
		var subject = "Email Verification"
		var text = 'https://' + constants.EVENTOHUB_CONFIG.host + constants.EVENTOHUB_CONFIG.verification_api + "?" + authToken;
		var html = "<a href =" + text + ">" + text + "</a>";
		email.sendMail(to, subject, text, html, function(err, emailResponse) {
			if(err) callback(err);
			callback(null, emailResponse);
		});
	},

	getHash: function (pass) {
		var hash = crypto.createHash('sha1').update(constants.SALT + pass).digest('hex');
		return hash;
	},
}
module.exports = userModel;
