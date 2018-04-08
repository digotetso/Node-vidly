const Joi = require('joi');
const mongoose = require('mongoose')
const {genreSchema, Genre} = require('./genre')



// create a schema 
const movieSchema = new mongoose.Schema({
title: {
      type:String,
      required: true,
      minlength: 5,
      maxlength: 50
  },
  genre: {
      type: genreSchema,
      required: true
    },
  numberInStock: {
      type: Number,
      required: true,
      max: 255,
      min: 0
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    max: 255,
    min: 0
}
})
//create class or Model 
const Movies = mongoose.model('Movie', movieSchema)

function validateMovie(movie) {
    const schema = {
      title: Joi.string().min(5).required(),
      genreId: Joi.objectId().required(), // here joi grown against MovieSchema
      numberInStock: Joi.number().min(0).max(255).required(),
      dailyRentalRate: Joi.number().min(0).max(255).required(),
      
    };
  
    return Joi.validate(movie, schema);
  }

  

  exports.validate = validateMovie;
  exports.Movies = Movies;