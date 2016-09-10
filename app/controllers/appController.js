'use strict';
var controller = {
    //Common methods accesable to the controllers
    responsify: function (err, data) {
        var response = {};
        if (err) {
            response.status = 'error';
            response.err = err;
        } else {
            response.status = 'success';
            response.err = '';
            response.json = data;
        }
        //console.log('Res: ' + JSON.stringify(response));
        //console.log('record count: ' + response.json.length);
        return response;
    }
};
module.exports = controller;