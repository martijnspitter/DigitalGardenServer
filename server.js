const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
	origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to bezkoder application.' });
});

require('./routes/posts.routes.js')(app);
require('./routes/auth.routes.js')(app);
require('./routes/tag.routes.js')(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
