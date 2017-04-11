const express = require('express'),
      config = require('config'),
      cors = require('cors'),
      morgan = require('morgan'),
      path = require('path'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser');

// use bluebird for mongoose promises
mongoose.Promise = require('bluebird');

// connect to the database
mongoose.connect(config.database);

// on error
mongoose.connection.on('error', (err) => {
    console.info('Database error: ' + err);
});

// port number
const port = process.env.PORT || config.port;

// create express app
const app = express();

// user route
const users = require('./routes/users');

// use morgan logger except during testing
if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('combined'));
}

// CORS middleware
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'client')));

// body parser
app.use(bodyParser.json());

app.use('/api/users', users);

// fall through any unmatched routes
app.use((req, res) => {
    res.sendStatus(404);
});

//server start
app.listen(port, () => {
    console.info('Server listening on port %s', port);
});