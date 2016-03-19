var nodemailer = require('nodemailer'),
	constants = require('../lib/constants.js');

var email = {
	sendMail : function(to, subject, text, html, callback){
		mailOptions = email.createMailOptions(to, subject, text, html);
		console.log(mailOptions);
		var smtpTransport = "smtps://" + constants.SMTP_USERNAME + ":" + constants.SMTP_PASSWORD + "@" + constants.SMTP_HOST ; 
		var transporter = nodemailer.createTransport(smtpTransport);
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        return console.log(error);
		    }
		    callback(null, "email Send Succesfully");
		});
	},
	createMailOptions : function(to, subject, text, html){
		var mailOptions = {
		    from: constants.SMTP_USERNAME + '@gmail.com',
		    to: to,
		    subject: subject,
		    text: text,
		    html: html
		}  
		return mailOptions;  
	}
}
module.exports = email;


// var mailOptions = {
//     from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
//     to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world 🐴', // plaintext body
//     html: '<b>Hello world 🐴</b>' // html body
