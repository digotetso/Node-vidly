const mongoose = require('mongoose')
const Joi = require('joi')
const config = require('config')
const jwt = require('jsonwebtoken')



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        maxlength: 255,
        minlength: 3

    },
    password: {
        type: String,
        required: true,
        maxlength: 1024,
        minlength: 3
    },
    isAdmin: Boolean
    // roles:[] --> for multiple roles , e.g moderator etc 
    // operations ===> ===> e.g config on ipcore, config on cx600 only etc
 })

//add methods to schema before u a create Model
//place methods code before Model creation
userSchema.methods.generateWebToken = function(){
    const token = jwt.sign({_id: this._id, isAdmin:this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
   }
const User = mongoose.model('User', userSchema)

//userSchema.methods ---> returns object
// set key value in return object --> userSchema.methods.generateToken = function(){}
//note that can not use arrow functuion---> use arrow function for standalone function



function validateUser(user) {
    const schema = {
      name: Joi.string().min(3).max(50).required(),
      password: Joi.string().min(3).max(1024).required(),
      email: Joi.string().min(5).max(255).required().email(),
      
      
    };
  
    return Joi.validate(user, schema);
  }

  

  exports.validate = validateUser;
  exports.User = User;
//   exports.genreSchema = genreSchema;