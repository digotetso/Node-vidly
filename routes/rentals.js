

const express = require('express')
const router = express.Router()
const Fawn = require('fawn') // class
const mongoose = require('mongoose')

const {Rental} = require('./../models/rentals')
const {validate} = require('./../models/rentals')
const {Movies} = require('./../models/movies')
const {Customer} = require('./../models/customer')

Fawn.init(mongoose)

router.get('/', async (req, res) => {
    const rentals = await Rental.find()
    res.send(rentals)
})


router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
     

    //find a movie

    const movie = await Movies.findById(req.body.movieId)
    console.log('my movie ', movie)
    if(!movie) return res.status(400).send('Invalid movie Id')
    //find customer
    const customer = await Customer.findById(req.body.customerId)
    if(!customer) return res.status(400).send('Invalid customer  Id')
      
 
                let rental = new Rental({
                    movie: {
                        title: movie.title,
                        _id: movie._id,
                        dailyRentalRate: movie.dailyRentalRate
                    },

                    customer: {
                        name: customer.name,
                        _id: customer._id,
                        phone: customer.phone
                    }
                })
                /*Transation -> to group operation as unit, to make sure either all operations succed or none of 
                 or none of the succeed...
                */
                try{
                    new Fawn.Task()
                            .save('rentals',rental ) //we working with colection directly --> rentals collection
                            .update('movies', {_id:movie._id}, {
                                $inc: {numberInStock: -1}
                            })
                            .run();

                            res.send(rental);                              
                }
                catch(err) {
                        console.log('Somethig failed on the server', err)
                }

      

           
        
  });



  module.exports = router;