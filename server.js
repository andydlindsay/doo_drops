const express = require('express'),
      config = require('config'),
      cors = require('cors'),
      morgan = require('morgan'),
      path = require('path');

// port number
const port = process.env.PORT || config.port;

// create express app
const app = express();

// use morgan logger except during testing
if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('combined'));
}

// CORS middleware
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'client')));

// fall through any unmatched routes
app.use((req, res) => {
    res.sendStatus(404);
});

//server start
app.listen(port, () => {
    console.info('Server listening on port %s', port);
});