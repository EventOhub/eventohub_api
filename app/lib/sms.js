var constants = require('../lib/constants.js'),
    client = require('twilio')(constants.TWILIO_ACCOUNT_SID, constants.TWILIO_AUTH_TOKEN);

var sms = {
    sendSMS : function(to, text, callback){
        client.sendMessage({
            to: to, 
            from: '+18452080704',
            body: text // body of the SMS message

        }, function(err, responseData) { //this function is executed when a response is received from Twilio
            if (err) callback(err);
            callback(null, "Sms sent succesfully")
        });
    }
}
module.exports = sms;