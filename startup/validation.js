//valid input to api
var Joi = require('joi');

module.exports = function(){
    Joi.objectId = require('joi-objectid')(Joi);
    
}