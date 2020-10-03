const Post = require('../models/posts.model.js');

// Create and Save a new Posts
exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!'
		});
	}

	// Create a Post
	const post = new Post({
		title: req.body.title,
		body: req.body.body,
		progress: req.body.progress
	});

	// Save Post in the database
	Post.create(post, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Post.'
			});
		else res.send(data);
	});
};

exports.findAll = (req, res) => {
	Post.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving posts.'
			});
		else res.send(data);
	});
};

exports.update = (req, res) => {
	// Validate Request
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!'
		});
	}

	Post.updateById(req.params.id, new Post(req.body), (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Post with id ${req.params.id}.`
				});
			} else {
				res.status(500).send({
					message: 'Error updating Post with id ' + req.params.id
				});
			}
		} else res.send(data);
	});
};

exports.delete = (req, res) => {
	Post.remove(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Post with id ${req.params.id}.`
				});
			} else {
				res.status(500).send({
					message: 'Could not delete Post with id ' + req.params.id
				});
			}
		} else res.send({ message: `Post was deleted successfully!` });
	});
};
