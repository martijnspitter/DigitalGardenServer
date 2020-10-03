module.exports = (app) => {
	const posts = require('../controllers/posts.controller.js');

	// Create a new Customer
	app.post('/api/digitalgarden/newpost', posts.create);

	app.get('/api/digitalgarden/posts', posts.findAll);

	app.put('/api/digitalgarden/posts/:id', posts.update);

	app.delete('/api/digitalgarden/posts/delete/:id', posts.delete);
};
