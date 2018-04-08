const {User} = require('./../../../models/user');
const auth  = require('./../../../middleware/auth');
const mongoose = require('mongoose');



describe('Auth Middleware', () => {

    it('Should return  a populated req.user if valid webtoken was provided', () => {
       
       const user = {_id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true}
       
        const token = new User(user).generateWebToken()
        
        const req = {
            header: jest.fn().mockReturnValue(token)
        }
        
        
            const res = {}
            const next = jest.fn()
            
            auth(req, res, next)  // look at this in more details
        
            expect(req.user).toMatchObject(user)
    })

})