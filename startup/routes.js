const express = require('express')
const genres = require('./../routes/genres');
const customer = require('./../routes/customers');
const movies = require('./../routes/movies');
const rentals = require('./../routes/rentals');
const users = require('./../routes/user');
const auth = require('./../routes/auth')
const error = require('./../middleware/error')



module.exports = function(app) {
    app.use(express.json()) //wow! you cannot!! do post request without this guy, found the hard way
    app.use('/api/genres', genres);
    app.use('/api/customers',customer )
    app.use('/api/movies', movies)
    app.use('/api/rentals', rentals)
    app.use('/api/users', users)
    app.use('/api/auth', auth)
    app.use(error) //Express error middleware
    
}