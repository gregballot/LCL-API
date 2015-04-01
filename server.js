/*
** LCL Hub project
** server.js - Server entry point
*/

require('./db');

var port = 21996;
var express = require('./config/express');
var app = express();

app.listen(port);
module.exports = app;
console.log('Server running on a AWS server on port:' + port);
