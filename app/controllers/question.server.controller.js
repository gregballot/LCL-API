/*
** Question controller : account.server.controller.js
**
** LCL Back-end
** ballot_g
*/

var mailer = require("nodemailer");
var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Customer = mongoose.model('Customer');

exports.askQuestion = function(req, res) {
    Question.findOne({ focused_status: req.param('status') }, function(error, question) {
	    res.writeHead(200, {
		    'Content-Type': 'application/json; charset=utf-8'
		});
	    if (!question) {
		res.status(404).send();
	    } else {
		res.end(question.title);
	    }
	});
};

exports.answerQuestion = function(req, res) {
    var emailContent = "Bonjour " + req.param('name') + ",\n\nNous avons bien pris en compte votre intérêt pour notre offre « LCL à la carte ».\n\nVous trouverez ci-dessous un lien vous conduisant directement vers les renseignements demandés : http://particuliers.lcl.fr/lcl-a-la-carte/\n\nRestant à votre disposition.\n\nBien cordialement,\n\nVotre conseiller LCL\nLCL –Banque et Assurance\n";

    var emailHtml = '<html><p>Bonjour ' + req.param('name') + ',<br /><br />Nous avons bien pris en compte votre intérêt pour notre offre « LCL à la carte ».<br /><br/>Vous trouverez ci-dessous un lien vous conduisant directement vers les renseignements demandés : http://particuliers.lcl.fr/lcl-a-la-carte/<br /><br />Restant à votre disposition.<br /><br />Bien cordialement,<br /><br />Votre conseiller LCL<br /><br />LCL –Banque et Assurance</p><img width="500" src="http://img11.hostingpics.net/pics/255561ban.png" alt="LOGO LCL" /></html>';

    Customer.findOne({ name: req.param('name') }, function(error, customer) {
	    if (!customer) {
		res.status(403).end("error finding user");
	    } else {
		mailer.createTransport("SMTP", {
			service: "Gmail",
			auth: {
			    user: "lcl.innovation.hub@gmail.com",
			    pass: "LCL-innovation42"
			}
		    }).sendMail({
			    from: "LCL <service-client@lcl.fr>",
			    to: req.param('name') + ' <' + customer.email.toString() + '>',
			    subject: "Merci pour l'interêt que vous portez à LCL",
			    text: emailContent,
			    html: emailHtml
			}, function(error, response) {
			    if (error) {
				console.log(error);
			    } else {
				console.log("Message sent: " + response.message);
			    }});
		res.status(200).end("over");
	    }
	});
}