var appModel = require("../models/appModel.js"),
	async   = require('async'),
	constants = require('../lib/constants.js'),
	email = require('../lib/email.js'),
	sms = require('../lib/sms.js'),
	uuid = require('node-uuid'),
	otplib = require('otplib'),
	crypto = require('crypto'),
	moment = require('moment'),
	transactionModel = require("../models/transactionModel.js"),
	table  = "user",
	verificationTableName = 'verification';

var userModel = {
	createUser : function(params, callback) {
		var qryData = {
			"table" : "temp_user",
			"values" : {
				"username"    : params.username,
				"password"    : userModel.getHash(params.password),
				"userType"    : params.userType,
				"name"        : params.name,
				"countryCode" : params.countryCode,
				"phoneNumber" : params.phoneNumber,
                "emailId"     : params.emailId
			}
		}
		userModel.checkUser(params.username, params.phoneNumber, function(err, data){
			if(err) callback(err);
			if(data.length > 0){
				callback(null, "User already exists with this phoneNumber or email")
			}else{
				var transaction = new transactionModel.begin(function(err){
					async.waterfall([
						function(cb) {
							appModel.insertQueryBuilder(qryData,function(err, qry){
								transaction.query(qry, function(err, data) {
									if (err) { return cb(err); }
									cb(null, data);
								});
							});	
						},
						function(data, cb) {
							var number = "+" + params.countryCode + params.phoneNumber;
							var secret = otplib.totp.utils.generateSecret();
							var verification_otp = otplib.totp.generate(secret);
							var otpVerificationData = {
								"table" : "otpVerification",
								"values" : {  
									"otp"          : verification_otp,
									"expireTime"   : moment().add(constants.OTP_EXPIRY, 'minutes').format('YYYY-MM-DD hh:mm:ss')
								}
							}
							appModel.insertQueryBuilder(otpVerificationData,function(err, qry){
								transaction.query(qry, function(err, otpData) {
									if (err) { return cb(err); }
									number = "+917875553879";
									sms.sendSMS(number, verification_otp, function (smsErr, smsResponse) {
										if(err) cb(null, smsErr);
										cb(null, data.insertId, otpData.insertId);
									});
								});
							});	
						},
						function(userId, otpID, cb) {
							var verificationUUID = uuid.v1() + "-" + userId;
							var verificationData = {
								"table" : "verification",
								"values" : {
									"user_id"    		 : userId,
									"otpVerification_id" : otpID,
									"emailStartTime"     : moment().format('YYYY-MM-DD hh:mm:ss'),
									"authToken"          : verificationUUID
								}
							}
							appModel.insertQueryBuilder(verificationData,function(err, qry){
								transaction.query(qry, function(err, data) {
									if (err) { return cb(err); }
									userModel.sendEmail(params.username, verificationUUID, function(emailErr, emailResponse){
										if (err) { return cb(emailErr); }
										var result = {
											"insertId" : userId
										}
										cb(null, result);
									});
								});
							});	
						},
					], function (err, result) {
					    if (err) {
							transaction.rollback(function(){
								console.log(err);
								callback(err);
							});
						} else {
							transaction.commit(function(){
								callback(null, result);
							});
						}
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
