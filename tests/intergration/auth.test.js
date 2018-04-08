const {User} = require('./../../models/user')
const {Genre} = require('./../../models/genre')
const request =  require('supertest')
let server;

describe('Auth middleware', () => {
    beforeEach(() => {server = require('./../../index')}) //load in server before each test
    afterEach(async () => {
        await Genre.remove({})
        server.close()
    }) // terminate server after each test

    let token;

    const exec = () => {
        return request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({name: 'genre8'})
    }

    beforeEach(() => {
        let token = new User().generateWebToken()    
    })

    it('Should return 401 if user is not logged in', async () => {

        token = '';
        const res = await exec();

        expect(res.status).toBe(401);
    })

    it('Should return 401 if ***invalid token*** is given', async () => {
        
                token = 'me';

                const res = await exec();
        
                expect(res.status).toBe(400);
       })
      
    it('Should return 200 if valid token is given', async () => {
        
           token = new User().generateWebToken()

            const res = await exec();
    
            expect(res.status).toBe(200);
    })

})