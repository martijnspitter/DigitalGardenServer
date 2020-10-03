module.exports = (app) => {
	const tags = require('../controllers/tags.controller.js');

	// Create a new Customer
	app.post('/api/digitalgarden/newtag', tags.create);

	app.post('/api/digitalgarden/posttags/:id', tags.createtags);

	app.get('/api/digitalgarden/tags', tags.findAll);

	app.get('/api/digitalgarden/posttags', tags.findAllPostTags);

	app.put('/api/digitalgarden/tags/:id', tags.update);

	app.delete('/api/digitalgarden/tags/delete/:id', tags.delete);

	app.delete('/api/digitalgarden/posttags/delete/:postid/:tagid', tags.deletePostTags);
};
