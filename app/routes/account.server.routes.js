/*
** Server routes : account.server.routes.js
**
** LCL Back-end
** ballot_g
*/

module.exports = function(app) {
    var accountModel = require('../models/account.server.model');
    var accountController = require('../controllers/account.server.controller');

    app.get('/account/create', accountModel.createAccount);
    app.get('/account/all', accountController.getAllAccounts);
};