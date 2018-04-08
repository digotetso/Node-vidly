
const config = require('config');
const winston = require('winston')


module.exports = function(){

    if(!config.get('jwtPrivateKey')){
        //best pratice to use 'throw new Error'(error object) --> we get stack trace than 'throw "error"'(string)
        throw new Error('FATAL ERROR, JWT private key is not set') 
       
}
}