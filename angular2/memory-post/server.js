// Referenced from (https://scotch.io/tutorials/mean-app-with-angular-2-and-the-angular-cli)

// Get dependencies
const cors = require('cors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('./server/passport');

// Get our API routes
const api = require('./server/routes/api');
const login = require('./server/routes/login');

const app = express();

// setting passport
app.use(session({secret: 'secret_code', resave: true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set out api routes
app.use('/api', api);
app.use('/login', login);

// Catch all other routes and return the index file
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.use((req, res, next) => {
	res.status(404).send('Invalid url.');
});
app.use((err, req, res, next) => {
	console.log(err.stack);
	res.status(500).send('Server error!');
});

/**
 * Get port from environment and store in Express
 */
const port = process.env.PORT || '8080';
app.set('port', port);

app.listen(port, () => {
	console.log('Express App on port ' + port);
})

