const e = require('express');
const Joi = require('joi');
const { ObjectId } = require('mongodb');
const client = require('../../config/dbConnection');

module.exports = class moradoresModel {

    static async getMoradores() {
        console.log(`[getALLmoradores]`);
        const cursor = await client.db("moradorderua").collection("moradores").find();
        const moradores = await cursor.toArray();
        return moradores;
    };

    static async postMorador(newMorador){
       const result =  await client.db("moradorderua")
       .collection("moradores").insertOne(newMorador);
       console.log(`New morador created with the following id:
       ${result.insertId}`)
       return "Insert with sucessed";
    };

    static async selecioneMoradorPorId(_id){
        const morador_id = new ObjectId(_id);
        const result = await client
        .db("moradorderua").collection("moradores").findOne({_id:morador_id})
        return result;
    };

    static async atualizarMoradorPorId(_id, moradorderua) {
            const morador_id = new ObjectId(_id);
            const filter = {_id: morador_id};
            const update = {$set: {nome_morador:moradorderua.nome_morador, 
                atual_situacao: moradorderua.atual_situacao, foto_morador:moradorderua.foto_morador,
                endereco_onde_se_encontra:moradorderua.endereco_onde_se_encontra}};
    
            const result = await client.db("moradorderua")
            .collection("moradores").updateOne(filter, update)
            return "morador atualizada com sucesso";
    }

    static async deletarMoradorPorId(_id){
      
        const morador_id = new ObjectId(_id);
        const filter = {_id: morador_id}
        await client.db("moradorderua")
        .collection("moradores").deleteOne(filter);
        return "morador de rua removido com sucesso;"
    }
    
    static async autenticarUsuario(user){
        console.log(user)
        const result = await client
        .db("moradorderua").collection("user").
        findOne({nome:user.nome,senha:user.senha})
        console.log(result)
        return result;
    }

    static async cadastrarUsuario(newUsuario){
    const usuario = await client.db("moradorderua").collection("user")
    .findOne({nome:newUsuario.nome})
    if (usuario != null){
         return null;
    }else {
        const result =  await client.db("moradorderua")
        .collection("user").insertOne(newUsuario);
        console.log(`New usuario created with the following id:
        ${result.insertId}`)
        return "Insert with sucessed";
    }
     };
  }
