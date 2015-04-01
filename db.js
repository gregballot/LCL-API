/*
** LCL Hub Project
** Super base de données de l'espace
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
** Statuses :
**
** - student
** - mother
** - professionnal
** - lambda
*/

var Customer = new Schema({
	name:		String,
	email:		String,
	agency:		String,
	age:		Number,
	childs_id:	[String],
	accounts:	[String],
	status:		String,
	updated_at:	{ type: Date, default: Date.now }
    });

/*
** Each Account is linked to a customer
*/

var Account = new Schema({
	customer_name:	String,
	name:		String,
	ceiling:	Number,
	overdraft:	Number,
	rate:		Number,
	sold:		{ type: Number, default: 0},
	updated_at:	{ type: Date, default: Date.now }
    });

/*
** Each Customer can answer only once 
*/

var Question = new Schema({
	title:		String,
	focused_status:	String,
	updated_at:	{ type: Date, default: Date.now }
    });

/*
** A profile (customer status) is linked for each Beacon
*/

var Beacon = new Schema({
	usecase:	String,
	major:		String,
	minor:		String,
	profile:	String,
	updated_at:	{ type: Date, default: Date.now }
    });

mongoose.model('Customer', Customer);
mongoose.model('Account', Account);
mongoose.model('Question', Question);
mongoose.model('Beacon', Beacon);
mongoose.connect('mongodb://localhost:27017/api');
