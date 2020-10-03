const sql = require('./db.js');

// constructor
const Tag = function(tag) {
	this.tag = tag.tag;
};

Tag.create = (newTag, result) => {
	sql.query('INSERT INTO tags SET ?', newTag, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(err, null);
			return;
		}

		console.log('created tag: ', { id: res.insertId, ...newTag });
		result(null, { id: res.insertId, ...newTag });
	});
};

Tag.createPostTags = (allTags, result) => {
	sql.query('INSERT IGNORE INTO post_tags (post_id, tag_id) VALUES ?', allTags, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(err, null);
			return;
		}

		console.log('added tags');
		result(null, 'added tags');
	});
};

Tag.getAll = (result) => {
	sql.query('SELECT * FROM tags', (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}

		console.log('tags: ', res);
		result(null, res);
	});
};

Tag.getAllPostTags = (result) => {
	sql.query('SELECT * FROM post_tags', (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}

		console.log('tags: ', res);
		result(null, res);
	});
};

Tag.updateById = (id, tag, result) => {
	id = parseInt(id);
	sql.query('UPDATE tags SET tag = ? WHERE id = ?', [ tag.tag, id ], (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			// not found Post with the id
			result({ kind: 'not_found' }, null);
			return;
		}

		console.log('updated tag: ', { id: id, ...post });
		result(null, { id: id, ...post });
	});
};

Tag.remove = (id, result) => {
	sql.query('DELETE FROM tags WHERE id = ?', id, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			// not found Post with the id
			result({ kind: 'not_found' }, null);
			return;
		}

		console.log('deleted tag with id: ', id);
		result(null, res);
	});
};

Tag.removePostTags = (postid, tagid, result) => {
	console.log(postid);
	console.log(tagid);
	sql.query('DELETE FROM post_tags WHERE post_id = ? AND tag_id = ?', [ postid, tagid ], (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			// not found Post with the id
			result({ kind: 'not_found' }, null);
			return;
		}

		console.log('deleted tag with id: ', tagid);
		result(null, res);
	});
};

module.exports = Tag;
