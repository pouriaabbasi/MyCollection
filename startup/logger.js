const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    process.on('unjandledRejection', ex => {
        winston.error(ex.message, ex);
    });
    winston.handleExceptions(
        new winston.transports.File({
            filename: 'uncaughtExceptionFile.log'
        })
    );
    winston.add(winston.transports.MongoDB, {
        db: 'mongodb://localhost/MC',
        level: 'error'
    });
};