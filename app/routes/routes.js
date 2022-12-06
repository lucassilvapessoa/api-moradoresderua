const { get } = require("mongoose");
const Moradores = require("../controllers/MoradorDeRuaController");

module.exports = {
  getMoradorDeRua: (app) => {
    app.get('/api/moradores',Moradores.getMoradores);
  },
  postMoradorDeRua:(app) =>{
    app.post('/api/moradores', Moradores.postMorador);
  },
  getMoradorDeRuaPorId:(app) =>{
     app.get('/api/moradores/:id', Moradores.getMoradorPorId)
  },
  atualizarMoradorDeRuaPorId:(app) =>{
    app.put('/api/moradores/:id', Moradores.atualizarMoradorPorId)
  },
  deletarMoradorDeRuaPorId:(app) =>{
    app.delete('/api/moradores/:id', Moradores.deletarMoradorPorId)
  },

  autenticarUsuario:(app) =>{
   app.post('/api/autenticarusuario', Moradores.autenticarUsuario);
  },
  
  criarUsuario:(app) =>{
    app.post('/api/cadastrarusuario', Moradores.criarUsuario);
  },

}
