const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const {validate, Customer} = require('./../models/customer')
const authorization = require('./../middleware/auth')




router.get('/', authorization, async (req, res) => {
   const customer =  await Customer.find()
   res.send(customer);
});

router.post('/', authorization, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

    
        try {   
             let customer = new Customer({
                 name:   req.body.name,
                 phone:  req.body.phone,
                 isGold: req.body.isGold
                })
              customer =  await customer.save()
              console.log(customer)
              res.send(customer);             
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