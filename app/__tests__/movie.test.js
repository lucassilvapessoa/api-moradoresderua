const supertest = require('supertest');
const app = require('../../config/server.js');
const api = '/controllers/moviesController/';
const describe = require('describe');

describe('movie', () => {
  describe('get movie route', () => {
    describe('get all movies', () => {
      it('should return a 200', async () => {
        await supertest(app).get(api).expect(200);
         expect(true).toBe(true);
      });
    });
    describe('given the movie does not exist', () => {
      it('should return a 404', async () => {
        await supertest(app).get(`${api}/222`).expect(404);
        expect(true).toBe(true);
      })
    });
  });
  describe('given the movie does not exist', () => {
    it('should return a 404', async () => {
      await supertest(app).get(`${api}/222`).expect(404);
       expect(true).toBe(true);
    })
  });

});