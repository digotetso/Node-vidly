const config = require('config');
const jwt = require('jsonwebtoken')


function auth(req, res, next){

    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send('Access denied...')
    
    try{
        //decod a token and verify if is not changed
        // will return payload that was used to generate token --> {_id:user._id}
        const decoded = jwt.verify(token, config.get('jwtPrivateKey')) 
        //store payload(decoded) as user object
        req.user =  decoded;
        next()
    }
    
    catch(ex){
        res.status(400).send('Invalid token')
    }
    
}


module.exports = auth;


