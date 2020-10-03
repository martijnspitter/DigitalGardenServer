const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

// Create a connection to the database
const connection = mysql.createConnection({
	host: dbConfig.HOST,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DB
});

// open the MySQL connection
connection.connect((error) => {
	if (error) throw error;
	console.log('Successfully connected to the database.');

	const createPosts = `create table if not exists posts(
    id int primary key auto_increment,
    title varchar(255)not null,
    body text,
    progress int,
		createdAt timestamp not null default current_timestamp,
		updatedAt TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP
)`;

	connection.query(createPosts, function(err, results, fields) {
		if (err) {
			console.log(err.message);
		}
	});

	const createTags = `create table if not exists tags(
    id int primary key auto_increment,
    tag varchar(255)not null UNIQUE
    
)`;

	connection.query(createTags, function(err, results, fields) {
		if (err) {
			console.log(err.message);
		}
	});

	const createUser = `create table if not exists user(
    id int primary key auto_increment,
    username varchar(255)not null unique, 
    password varchar(255)not null unique
    
)`;

	connection.query(createUser, function(err, results, fields) {
		if (err) {
			console.log(err.message);
		}
	});

	const createPostTags = `create table if not exists post_tags(
    post_id INT NOT NULL,
    tag_id INT NOT NULL,
    primary key (post_id, tag_id),
    foreign key (post_id) references posts(id) on delete cascade,
    foreign key (tag_id)  references tags(id) on delete cascade
)`;

	connection.query(createPostTags, function(err, results, fields) {
		if (err) {
			console.log(err.message);
		}
	});
});

module.exports = connection;
