GET http://localhost:3000/api/moradores -> seleciona todos os moradores de rua existentes

POST http://localhost:3000/api/moradores -> deve passar um body com titulo, descricao, foto_peticao, o usuário deve estar logado

GET http://localhost:3000/api/638f4accf791b61fa485020b -> deve passar o id na rota para selecionar um morador

PUT http://localhost:3000/api/peticoes/63715c22ed0a9e93a7397d6c -> deve passar o id na rota para atualizar além de passar o objeto atualizado no body com nome_morador,atual_situacao, foto_morador, endereco_onde_se_encontra

DELETE http://localhost:3000/api/peticoes/638f4accf791b61fa485020b -> deve passar o id na rota para deletar um morador, o usuario deve estar logado
 
POST http://localhost:3000/api/autenticarusuario -> deve passar o nome e senha no body para autenticar(logar) o usuário

http://localhost:3000/api/cadastrarusuario -> deve passar o nome e senha no body para cadastrar o usuário o nome é unico, ou seja, somente um usuário com o nome exato deve existir diferenciando letras maisculas e minusculas
