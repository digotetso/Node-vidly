//To login
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')


const { User} = require('./../models/user')


// router.get('/', async (req, res) => {
//    const users =  await User.find()
//    res.send(users);
// });

router.post('/', async (req, res) => {
  
  const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Invalid password or email.')

   let validaPassword = await bcrypt.compare(req.body.password, user.password)
   if(!validaPassword) return res.status(400).send('Invalid password or email.')

   //for valid password
   //generate user passport ---> generate jsonwebtoken
   const token = user.generateWebToken();

    
  res.send(token)
});


function validate(user) {
    const schema = {
      password: Joi.string().min(3).max(1024).required(),
      email: Joi.string().min(5).max(255).required().email()
      
    };
  
    return Joi.validate(user, schema);
  }

  


module.exports = router;