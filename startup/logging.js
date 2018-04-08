const winston = require('winston')
require('express-async-errors');
require('winston-mongodb');

module.exports = function(){
    // At the moment below helper method can only catch 'unhandledException', workaround to catch 'unhadledRection'@#2
winston.handleExceptions(
    new winston.transports.Console({colorize: true , prettyPrint: true}),
    new winston.transports.File({filename: 'uncaughtExceptions.log'})
)

//process is a event emitter --> below we listen or subcribe to 'uncaughtException' event
process.on('unhandledRejection', (ex) => {
   //#2 workaround to catch 'unhadledRection'
   throw ex;
})

winston.add(winston.transports.File, {filename: 'logfile.log'});
winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/vidly',
    level: 'info'
}) //log to MongoBD
}