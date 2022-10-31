const MoviesModel = require("../models/moviesModel");
const Joi = require("joi");
const supertest = require('supertest');



module.exports = class MoviesController {

   static async getMovies(req, res, next) {
      console.log('[Movies Controller] getMovies');
      try {
         const movies = await MoviesModel.getMovies();
         if (!movies) {
            res.status(404).json(`Não existe filme cadastrado.`);
         }
         movies.forEach(movie => {
            console.log(`[Movie controller: retorno do banco] ${movie.name}`);
         });
         res.status(200).json(movies);
      } catch (error) {
         console.log(`[Movies Controller Error] ${error}`);
         res.status(500).json({ error: error })
      }
   }
   static async getMovie(req, res, next){
      console.log('[movies controller] getMovie');
      try {
          const movie = await MoviesModel.getMovie(); 
          if(!movie){
            res.status(400).json("Esse filme não existe com o id procurado");
          }
          console.log(`[Movie controller: retorno o filme do banco]${movie.name}`)
          res.status(200).json(movie);       
      } catch (error) {
        console.log(`[Movies Controller Error] ${error}`);
        res.status(500).json({error:error})       
      }
   }

   static async postMovie(req, res, next){
      console.log('[movies controller] postMovie')
      try {
         console.log(req.body)
         const schema = Joi.object().keys({
            name:Joi.string().required().min(1).max(50),
            director:Joi.string().required().min(1).max(50),
            link: Joi.string().required().min(1).max(150)
          });
   
          const resultSchema = schema.validate(req.body);
          console.log(resultSchema.error.details[0].message);
          if (resultSchema.error) {
           return res.status(400)
           .send(resultSchema.error.details[0].message)
          }
         let result = await MoviesModel.postMovie(req.body)
         res.status(200).json({result:result})
      } catch (error) {
          console.log(`[movies controller Error] ${error}`)
          res.status(500).json({error:error})         
      }
   }

   static async selectMovieById(req, res, next){
      console.log('[movies controller] selectMovieById')
      try {
         console.log(req.params.id)
         let result = await MoviesModel.selecMovie(req.params.id);
         res.status(200).json({result:result})
      } catch (error) {
       console.log(`[movies controller Error] ${error}`)
       res.status(500).json({error:error})
      }
   }
   static async updateMovieById(req, res, next){
      console.log('[movies controller] updateMovieById')
      try {
         console.log(req.body)
         console.log(req.params.id)
         const schema = Joi.object().keys({
            name:Joi.string().required().min(1).max(50),
            director:Joi.string().required().min(1).max(50),
            link: Joi.string().required().min(1).max(150)
          });
   
          const resultSchema = schema.validate(req.body);
          console.log(resultSchema.error.details[0].message);
          if (resultSchema.error) {
           return res.status(400)
           .send(resultSchema.error.details[0].message)
          }
         let result = await MoviesModel.updateMovieById(req.params.id, 
         req.body);
         res.status(200).json(result)
      } catch (error) {
         console.log('[movies controller Error] ${error}')
         res.status(500).json({error:error})
      }
   }
   static async deleteMovieById(req, res, next){
      console.log('[movies controller] deleteMovieById')
      try {
         let result = await MoviesModel.deleteMovieById(req.params.id);
         res.status(200).json(result)
      } catch (error) {
         console.log(`[Movies controller error] ${error}`)
         res.status(500).json({error:error})
      }
   }
}