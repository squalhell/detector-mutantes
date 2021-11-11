const winston = require('winston');
const moment = require('moment-timezone');

/*
Levels:
error   -> 0
warn    -> 1
info    -> 2
verbose -> 3
debug   -> 4
silly   -> 5
*/

const config = {
    console: {
        level: process.env.LOG_LEVEL_CONSOLE || 'debug',
        handleExceptions: true,
        format: winston.format.colorize({ all: true })
    }
}

module.exports = winston.createLogger({
    format: winston.format.combine(
        winston.format.printf(msg => `${moment().format()} - ${msg.level}: ${msg.message}`)
    ),
    transports: [
        new winston.transports.Console(config.console)
    ]
});
