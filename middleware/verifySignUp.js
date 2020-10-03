const Users = require('../models/user.model');
const sql = require('../models/db.js');

const checkDuplicateUsername = (req, res, next) => {
	// Username
	sql.query('SELECT * FROM user WHERE username=?', req.body.username, function(err, result) {
		console.log(req.body.username);
		console.log(result);
		if (err & (err != 'ER_DUP_ENTRY')) {
			throw err;
		}
		if (err === 'ER_DUP_ENTRY') {
			res.status(400).send({
				message: 'Failed! Username is already in use!'
			});
			return;
		}
		next();
	});
};

const verifySignUp = {
	checkDuplicateUsername: checkDuplicateUsername
};

module.exports = verifySignUp;
