const Tag = require('../models/tags.model.js');

// Create and Save a new Posts
exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!'
		});
	}

	// Create a Tag
	const tag = new Tag({
		tag: req.body.tag
	});

	// Save Tag in the database
	Tag.create(tag, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Tag.'
			});
		else res.send(data);
	});
};

exports.createtags = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!'
		});
	}

	// Create a Tag
	const body = req.body;
	const allTags = [];
	body.map((tags) => {
		var tag = [ req.params.id, tags.id ];
		allTags.push(tag);
	});

	// Save Tag in the database
	Tag.createPostTags([ allTags ], (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while adding the Tag to Post.'
			});
		else res.send(data);
	});
};

exports.findAll = (req, res) => {
	Tag.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving tags.'
			});
		else res.send(data);
	});
};

exports.findAllPostTags = (req, res) => {
	Tag.getAllPostTags((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving tags.'
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

	Tag.updateById(req.params.id, new Tag(req.body), (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Tag with id ${req.params.id}.`
				});
			} else {
				res.status(500).send({
					message: 'Error updating Tag with id ' + req.params.id
				});
			}
		} else res.send(data);
	});
};

exports.delete = (req, res) => {
	Tag.remove(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Tag with id ${req.params.id}.`
				});
			} else {
				res.status(500).send({
					message: 'Could not delete Tag with id ' + req.params.id
				});
			}
		} else res.send({ message: `Tag was deleted successfully!` });
	});
};

exports.deletePostTags = (req, res) => {
	Tag.removePostTags(req.params.postid, req.params.tagid, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found PostTag with id ${req.params.tagid}.`
				});
			} else {
				res.status(500).send({
					message: 'Could not delete PostTag with id ' + req.params.tagid
				});
			}
		} else res.send({ message: `Tag was deleted successfully!` });
	});
};
