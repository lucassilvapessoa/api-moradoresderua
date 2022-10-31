const { get } = require("mongoose");
const Movies = require("../controllers/moviesController");

module.exports = {
  getMovies: (app) => {
    app.get('/',Movies.getMovies);
  },
  getMovies: (app) => {
    app.get('/api/filmes',Movies.getMovies);
  },
  postMovie:(app) =>{
    app.post('/api/filmes', Movies.postMovie);
  },
  getMovieById:(app) =>{
     app.get('/api/filmes/:id', Movies.selectMovieById)
  },
  updateMovieById:(app) =>{
    app.put('/api/filmes/:id', Movies.updateMovieById)
  },
  deleteMovieById:(app) =>{
    app.delete('/api/filmes/:id', Movies.deleteMovieById)
  }
}
