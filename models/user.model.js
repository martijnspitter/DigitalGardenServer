const sql = require('./db.js');

// constructor
const User = function(user) {
	this.username = user.title;
	this.password = user.password;
};

User.create = (newUser, result) => {
	sql.query('INSERT INTO user SET ?', newUser, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(
				{
					message: 'Failed! Username is already in use!'
				},
				null
			);
			return;
		}

		console.log('created user: ', { id: res.insertId, ...newUser });
		result(null, { id: res.insertId, ...newUser });
	});
};

User.findOne = (username, result) => {
	sql.query(`SELECT * FROM user WHERE username = '${username}'`, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(err, null);
			return;
		}

		if (res.length) {
			console.log('found user: ', res[0]);
			result(null, res[0]);
			return;
		}

		// not found Customer with the id
		result({ kind: 'not_found' }, null);
	});
};

module.exports = User;
