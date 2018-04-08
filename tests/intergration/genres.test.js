const request = require('supertest')
const {Genre} = require('./../../models/genre')
const {User} = require('./../../models/user')


let server;

describe('api/genres', () => {
    beforeEach(() => {server = require('../../index');})
    afterEach( async () => {
       server.close();
       await Genre.remove({}) // cleanup the db
    })
  //insert multi doc in db
  Genre.collection.insertMany([
      {name: 'genre1'},
      {name: 'genre2'},
      {name: 'genre3'}   
      
  ]);

    describe('/GET', () => {
      it('Should return all genres', async () => {
          const res = await request(server).get('/api/genres');
          expect(res.status).toBe(200)
          expect(res.body.length).toBe(3)
          expect(res.body.some(g => g.name === 'genre1')).toBeTruthy()
      });
    });
     
        
    describe('GET/:id', () => {
        it('Should return genre for a given id', async () => {
            //should create and save doc here for this to work
            const genre = new Genre({name: 'genre1'})
            await genre.save()
            const  res = await request(server).get('/api/genres/' + genre._id)
           // const res = await Genre.collection.findOne({name: 'genre1'})

            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('name', genre.name)

        })
        it('Should return status code 404 if invalid genre id is provided', async () => {
            const  res = await request(server).get('/api/genres/1')
            expect(res.status).toBe(404)
        })
    })

    describe('/POST', () => {
        it('Should return 401 if the user is not logged in', async () => {
           const res =  await request(server).post('/api/genres').send({name: 'Genre1'})
            expect(res.status).toBe(401)
        })

        it('Should return 400 if user provided invalid input', async () => {
            const token = new User().generateWebToken()
            const res = await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({name: '123'})
            expect(res.status).toBe(400)
        })

    })
});




