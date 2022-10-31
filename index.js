const app = require('./config/server');
const routes = require('./app/routes/routes');
const express = require("express")
const bodyParser = require('body-parser')

console.log('[Index] criando rota /api/filmes');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
routes.getMovies(app);
routes.postMovie(app);
routes.getMovieById(app);
routes.updateMovieById(app);
routes.deleteMovieById(app);