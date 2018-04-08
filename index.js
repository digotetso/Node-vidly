
const express = require('express');
const app = express();
const winston = require('winston')

require('./startup/logging')() // put this first, incase any errors --> log error & terminate process
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()
require('./startup/validation')()



const port = process.env.PORT || 3000;
const server =  app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;