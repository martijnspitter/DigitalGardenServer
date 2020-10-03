const User = require('../models/user.model');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const config = require('../config/auth.config');

exports.signup = (req, res) => {
	// Save User to Database

	User.create(
		{
			username: req.body.username,
			password: bcrypt.hashSync(req.body.password, 8)
		},
		(err, data) => {
			if (err)
				res.status(500).send({
					message: err.message || 'Some error occurred while creating the Customer.'
				});
			else res.send({ message: 'User Created' });
		}
	);
};

exports.signin = (req, res) => {
	User.findOne(req.body.username, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Customer with id ${req.body.username}.`
				});
			} else {
				res.status(500).send({
					message: 'Error retrieving Customer with id ' + req.body.username
				});
			}
		}

		var passwordIsValid = bcrypt.compareSync(req.body.password, data.password);

		if (!passwordIsValid) {
			return res.status(401).send({
				accessToken: null,
				message: 'Invalid Password!'
			});
		}
		var token = jwt.sign({ id: data.id }, config.secret, {
			expiresIn: 86400 // 24 hours
		});

		res.status(200).send({
			id: data.id,
			username: data.username,
			token: token
		});
	});
};
