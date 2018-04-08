const mongoose = require('mongoose')
var Joi = require('joi');
const {genreSchema, Genre} = require('./genre')





const rentalSchema = new mongoose.Schema({
    customer:{ 
        type: new mongoose.Schema({
            name: {
                type:String,
                required: true,      
                minlength: 5,
                maxlength: 50,
            },
            phone: {
              type:String,
              required: true,      
              minlength: 5,
              maxlength: 50,
          },
            isGold: {
                type: Boolean,
                default: false,
            }})
    },
    movie: {
        dateOut: {
            type: Date,
            default: Date.now
        },
        type: new mongoose.Schema({
            title: {
                type:String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            genre: {
                type: genreSchema,
              },
            numberInStock: {
                type: Number,
                //required: true,
                max: 255,
                min: 0
            },
            dailyRentalRate: {
              type: Number,
              required: true,
              max: 255,
              min: 0
          }
        }),
        required: true
    
}

})

const Rental = mongoose.model('Rental', rentalSchema)


function validateRental(rental) {
    const schema = {
              movieId: Joi.objectId().min(5),
              customerId: Joi.objectId().min(5).required()
                };
    return Joi.validate(rental, schema);
  }

  

  exports.validate = validateRental;
  exports.Rental = Rental;
