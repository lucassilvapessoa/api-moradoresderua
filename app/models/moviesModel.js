const Joi = require('joi');
const { ObjectId } = require('mongodb');
const client = require('../../config/dbConnection');

module.exports = class MoviesModel {

    static async getMovies() {
        console.log(`[getallmovies]`);
        const cursor = await client.db("dsw").collection("movies").find();
        const movies = await cursor.toArray();
        return movies;
    };

    static async postMovie(newMovie){
       const result =  await client.db("dsw")
       const schema = Joi.object().keys({
         name:Joi.string().required().min(1).max(50),
         director:Joi.string().required().min(1).max(50),
         link: Joi.string().required().min(1).max(150)
       })
       .collection("movies").insertOne(newMovie);
       console.log(`New movie created with the following id:
       ${result.insertId}`)
       return "Insert with sucessed";
    };

    static async selecMovie(_id){
        const movie_id = new ObjectId(_id);
        const result = await client
        .db("dsw").collection("movies").findOne({_id:movie_id})
        return result;
    };

    static async updateMovieById(_id, movie) {
        const movie_id = new ObjectId(_id);
        const filter = {_id: movie_id};
        const update = {$set: {name:movie.name, 
        director: movie.director, link:movie.link}};

        const result = await client.db("dsw")
        .collection("movies").updateOne(filter, update)
        return "Update sucessed";
    };

    static async deleteMovieById(_id){
      const movie_id = new ObjectId(_id);
      const filter = {_id: movie_id}
      await client.db("dsw")
      .collection("movies").deleteOne(filter);
      return "movie removed with;"
    }
}