const sql = require('./db.js');

// constructor
const Post = function(post) {
	this.title = post.title;
	this.body = post.body;
	this.progress = post.progress;
};

Post.create = (newPost, result) => {
	sql.query('INSERT INTO posts SET ?', newPost, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(err, null);
			return;
		}

		console.log('created post: ', { id: res.insertId, ...newPost });
		result(null, { id: res.insertId, ...newPost });
	});
};

Post.getAll = (result) => {
	sql.query('SELECT * FROM posts', (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}

		console.log('posts: ', res);
		result(null, res);
	});
};

Post.updateById = (id, post, result) => {
	id = parseInt(id);
	sql.query(
		'UPDATE posts SET title = ?, body = ?, progress = ? WHERE id = ?',
		[ post.title, post.body, post.progress, id ],
		(err, res) => {
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

			console.log('updated post: ', { id: id, ...post });
			result(null, { id: id, ...post });
		}
	);
};

Post.remove = (id, result) => {
	sql.query('DELETE FROM posts WHERE id = ?', id, (err, res) => {
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

		console.log('deleted post with id: ', id);
		result(null, res);
	});
};

module.exports = Post;
