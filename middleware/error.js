const winston = require('winston');

module.exports = function(err, req, res, next){
    //log exception
    //winston.warn, wiston.info --> could any of helper function with accordance to the importance of the message
    winston.error(err.message, err)
    res.status(500).send('Something failed...')
}