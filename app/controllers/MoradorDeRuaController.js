const MoviesModel = require("../models/moradoresModel");
const Joi = require("joi");
const peticoesModel = require("../models/moradoresModel");
const crypto = require('crypto');
const moradoresModel = require("../models/moradoresModel");

module.exports = class PeticaoController {

   static async getMoradores(req, res, next) {
      console.log('[Petições controller] getPetições');
      try {
         const moradores = await moradoresModel.getMoradores();
         if (!moradores) {
            res.status(404).json(`Não existe morador cadastrada.`);
         }
         moradores.forEach(morador => {
            console.log(`[Morador controller: retorno do banco] ${morador.nome}`);
         });
         res.status(200).json(moradores);
      } catch (error) {
         console.log(`[Morador Controller Error] ${error}`);
         res.status(500).json({ error: error })
      }
   }

   static async postMorador(req, res, next){
      console.log('[moradores controller] postMorador')
      try {
         if(req.session && req.session.loggedIn){
            const date = new Date().toUTCString();
            console.log("Usuario logado")
            req.body.data = date;
            const schema = Joi.object().keys({
               nome_morador:Joi.string().required().min(1).max(50),
               atual_situacao:Joi.string().required().min(1).max(50),
               data:Joi.string().required().min(1).max(200),
               foto_morador:Joi.string().required().min(1).max(300),
               endereco_onde_se_encontra:Joi.string().required().min(1).max(200)
             });
            
             const resultSchema = schema.validate(req.body);
             if (resultSchema.error) {
              return res.status(400)
              .send(resultSchema.error.details[0].message)
             }
            let result = await moradoresModel.postMorador(req.body)
            res.status(200).json({result:result})
           } else {
            res.status(500).json("Usuario nao esta logado");
           }
         } catch (error) {
             console.log(`[moradores controller Error] ${error}`)
             res.status(500).json({error:error})         
         }
   }

   static async getMoradorPorId(req, res, next){
      console.log('[peticao controller] getPeticaoPorId')
      try {
         console.log(req.params.id)
         let result = await peticoesModel.selecioneMoradorPorId(req.params.id);
         res.status(200).json({result:result})
      } catch (error) {
       console.log(`[peticao controller Error] ${error}`)
       res.status(500).json({error:error})
      }
   }

   static async atualizarMoradorPorId(req, res, next){
      console.log('[Atualizar morador por id controller] updateMovieById')
      try {
         if(req.session && req.session.loggedIn){
         const date = new Date().toUTCString();
         console.log("Usuario logado")
         req.body.data = date;
         const schema = Joi.object().keys({
            nome_morador:Joi.string().required().min(1).max(50),
            atual_situacao:Joi.string().required().min(1).max(50),
            data:Joi.string().required().min(1).max(200),
            foto_morador:Joi.string().required().min(1).max(300),
            endereco_onde_se_encontra:Joi.string().required().min(1).max(200)
          });
   
          const resultSchema =  schema.validate(req.body);
          if (resultSchema.error) {
           return res.status(400)
           .send(resultSchema.error.details[0].message)
          }
         let result = await peticoesModel.atualizarMoradorPorId(req.params.id, 
         req.body);
         res.status(200).json(result)
         }
         else {
            res.status(500).json("Usuario nao esta logado");
           }
      } catch (error) {
         console.log(`[peticao controller Error] ${error}`)
         res.status(500).json({error:error})   
      }
   
   }

   static async deletarMoradorPorId(req, res, next){
      console.log('[peticoes controller] deleteMovieById')
      try {
         if(req.session && req.session.loggedIn){
         let result = await peticoesModel.deletarMoradorPorId(req.params.id);
         res.status(200).json(result)
         } else {
          res.status(500).json("Usuario deve estar logado para deletar um morado de rua")
          }
       }catch (error) {
         console.log(`[Peticao controller error] ${error}`)
         res.status(500).json({error:error})
      }
   }
   static async autenticarUsuario(req, res, next){
      console.log('[peticoes controller] autenticarUsuario');
      try {
         let user = req.body;
         let passwordCrypto = crypto.createHash('md5').update(user.senha).digest('hex');
         user.senha = passwordCrypto;
         let result = await peticoesModel.autenticarUsuario(user);
         if (result != null){
            req.session.loggedIn = true
            req.session.nome = user.nome;
            res.status(200).json({result:result});
         }else{
            res.status(500).json("Usuario e senha nao encontrados");
         }
      } catch (error) {
         console.log(`[Peticao controller error] ${error}`)
         res.status(500).json({error:error});
      }
   }
   
   static async criarUsuario(req, res, next) {
      console.log('[moradores controller] criarUsuario');
      try {
         let user = req.body;
         let passwordCrypto = crypto.createHash('md5').update(user.senha).digest('hex');
         user.senha = passwordCrypto;
         let result = await peticoesModel.cadastrarUsuario(user);
         if (result != null){
            res.status(200).json("Cadastrado com sucesso")
         }else {
            res.status(500).json("Não é possivel cadastrar pois já existe um login com esse nome");
         }
      } catch (error) {
         console.log(`[PeticaoController error] ${error}`)
         res.status(500).json({error:error});
      }
     }
}