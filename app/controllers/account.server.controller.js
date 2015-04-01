/*
** Account controller : account.server.controller.js
**
** LCL Back-end
** ballot_g
*/

var mongoose = require('mongoose');
var Account = mongoose.model('Account');

exports.getAllAccounts = function(req, res) {
    Account.find({}, function(error, account) {
	    res.writeHead(200, {
		    'Content-Type': 'application/json; charset=utf-8'
		});
	    if (!account) {
		res.status(404).send();
	    } else {
		res.end(JSON.stringify(account));
	    }
	});
}