const winston = require('winston');
const express = require('express');
const app = express();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logger')();

app.listen(3000, () => winston.info('Listening on port 3000 ...'));