const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('./../middleware/auth')

const validateObjectID = require('./../middleware/validateObjectId')
const {validate, Genre} = require('./../models/genre');
//const asyncMiddleware = require('./../middleware/async') --> wrap route handler, replaced by express-async-errors

//will move crontrol from route handler to our error handling function
require('express-async-errors');





router.get('/',  async (req, res, next) => {
    const genres =  await Genre.find()    
    res.send(genres);
   
});

router.post('/', auth, async (req, res) => {
const { error } = validate(req.body); 

  if(error) return res.status(400).send(error.details[0].message);

   let genre = new Genre({ name: req.body.name });
   genre = await genre.save()
   res.send(genre);             
            
      
});

router.put('/:id', async (req, res) => {
  const genre =  await Genre.findByIdAndUpdate(req.params.id,{name: req.body.name},{new: true})
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
   res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id)
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

router.get('/:id', validateObjectID, async (req, res) => {
  const genre = await Genre.findById(req.params.id)
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});


module.exports = router;