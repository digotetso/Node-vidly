//create the user
const express = require('express');
const router = express.Router();
const _ = require('lodash')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('./../middleware/auth') // authorization not authentication
const admin = require('./../middleware/admin')



const {validate, User} = require('./../models/user')

router.get('/me', auth, async (req, res) => {
   const user =  await User.findById(req.user._id).select('-password')
   res.send(user)
})

router.delete('/:id', [auth, admin], async (req, res) => {
   const user = await User.findByIdAndRemove(req.params.id)
   if(!user) return res.status(404).send('User not found')
   res.send(user)
})

router.get('/', auth, admin, async (req, res) => {
   const users =  await User.find()
   res.send(users);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send('User already registed')

    
    user = new User( _.pick(req.body, ['name', 'password', 'email']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()

    //after registering the user send  below & ---> token as part of header
    const token = user.generateWebToken()
    res.header('x-auth-token', token).send(_.pick(user, ['_id','name', 'email']));             
            
    
      
});




module.exports = router;