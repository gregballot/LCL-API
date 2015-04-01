/*
** Express configuration file : express.js
**
** LCL Back-end
** ballot_g
*/

var express = require("express");
module.exports = function() {
    var app = express();

    /*
    ** setting front end specifications
    */
    app.set("views", "./app/views");
    app.set("view engine", "ejs");

    /*
    ** Loading all routes
    */
    require("../app/routes/index.server.routes.js")(app);
    require("../app/routes/customer.server.routes.js")(app);
    require("../app/routes/question.server.routes.js")(app);
    require("../app/routes/account.server.routes.js")(app);
    require("../app/routes/beacon.server.routes.js")(app);
    
    return app;
};
