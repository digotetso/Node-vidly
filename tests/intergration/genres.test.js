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
        let token;
        let name;

        async function exec() {
           return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({name: name})
        }
        
        beforeEach(() => {
            token = new User().generateWebToken()
            name = 'GenreScifi'
            
        })
        it('Should return 401 if the user is not logged in', async () => {
            token = '';
            const res = await exec()
            expect(res.status).toBe(401)
        })

        it('Should return 400 if genre is less than 5 characters', async () => {
           name = '1234' 

           const res = await exec()

           expect(res.status).toBe(400)
        })

        it('Should return 400 if genre is greater than 50 characters', async () => {

           name = new Array(52).join('a') // place a between 52 array elements ---> 51 a's

           const res = await exec()
           
           expect(res.status).toBe(400)
        })

        it('Should save a genre if input is valid', async () => {

                name = 'GenreScifi'
                await exec()

                const genre = await Genre.find({name:name})
                expect(genre).not.toBeNull()
        })
        
        it('Should have genre in body of reponse', async () => {
            name = 'GenreScifi'

            const res = await exec()

            expect(res.body.GenreScifi).not.toBeNull()
            expect(res.body).toHaveProperty('_id')
            expect(res.body).toHaveProperty('name','GenreScifi' )
                
        })
    })
});




