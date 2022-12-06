const app = require('./src/config/server')
const routes = require('./src/app/routes/routes');
const express = require("express")
const bodyParser = require('body-parser');
const { ReadPreference } = require('mongodb');

console.log('[Index] criando rota /api/moradores');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
routes.getMoradorDeRua(app);
routes.postMoradorDeRua(app);
routes.getMoradorDeRuaPorId(app);
routes.atualizarMoradorDeRuaPorId(app);
routes.deletarMoradorDeRuaPorId(app);
routes.autenticarUsuario(app);
routes.criarUsuario(app);