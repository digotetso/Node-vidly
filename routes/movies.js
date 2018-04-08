const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const {validate, Movies} = require('./../models/movies')
const { Genre} = require('./../models/genre')
const authenticate = require('./../middleware/auth')





router.get('/',authenticate, async (req, res) => {
   const movies =  await Movies.find()
   res.send(movies);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
        const genre = await Genre.findById(req.body.genreId)
        if(!genre) return res.status(400).send('Invalid genre Id')
         try {   
             let movies = new Movies({
                 title:   req.body.title,
                 genre:  {
                    name: genre.name,
                    _id: genre._id
                 },
                 numberInStock: req.body.numberInStock,
                 dailyRentalRate: req.body.dailyRentalRate
                })
              movies =  await movies.save()
              console.log(movies)
              res.send(movies);             
            }
        catch(err) {
            console.log('Could not save doc...', err)
        }
      
});

router.put('/:id', async (req, res) => {
  const customer =  await Genre.findByIdAndUpdate(req.params.id,{name: req.body.name},{new: true})
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  if (!customer) return res.status(404).send('The genre with the given ID was not found.');
   res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id)
  if (!customer) return res.status(404).send('The genre with the given ID was not found.');
  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id)
  if (!customer) return res.status(404).send('The genre with the given ID was not found.');
  res.send(customer);
});



module.exports = router;