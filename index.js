const app = require('./config/server');
const routes = require('./app/routes/routes');
const express = require("express")
require('./app/startup/prod')(app);

console.log('[Index] criando rota /api/filmes');
app.use(express.json());
routes.getMovies(app);
routes.postMovie(app);
routes.getMovieById(app);
routes.updateMovieById(app);
routes.deleteMovieById(app);