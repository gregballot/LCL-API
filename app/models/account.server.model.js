/*
** Account model : account.server.model.js
**
** LCL Back-end
** ballot_g
*/

var mongoose = require('mongoose');
var Account = mongoose.model('Account');
var Customer = mongoose.model('Customer');

var _ceiling = 20000;
var _overdraft = -200;
var _rate = 4.2;

// todo account operations

var linkAccountToUser = function(name, id, callback) {
    Customer.findOne({name: name}, function(err, customer) {
	    if (!customer) {
		callback(false);
	    } else {
		if (customer.accounts == null)
		    customer.accounts[0] = id;
		else
		    customer.accounts += id;
		customer.save(function(err, acc, count) {
			if (err)
			    callback(false);
			else
			    callback(true);
		    });		   
	    }
	});
};

exports.createAccount = function(req, res) {
    Account.findOne({ customer_name: req.param('customer_name'), name: req.param('name') }, function(error, account) {
	    res.writeHead(200, {
		    'Content-Type': 'application/json; charset=utf-8'
		});
	    if (!account) {
		console.log("Creating account");
		account = new Account({
			customer_name:	req.param('customer_name'),
			name:		req.param('name'),
			ceiling:	_ceiling,
			overdraft:	_overdraft,
			rate:		_rate,
			updated_at:	Date.now()
		    }).save(function(err, acc, count) {
			    linkAccountToUser(req.param('customer_name'), acc._id, function(success) {
				    if (!success) {
					res.status(503).send();
				    } else {
					res.end(JSON.stringify(acc));
				    }
				});
			});
	    } else {
		res.end(JSON.stringify(account));
	    }
	});
};

exports.createMoney = function(req, res) {

}