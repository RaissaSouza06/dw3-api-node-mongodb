import express from "express";

//importando o mongoose
import mongose from 'mongoose';

//importando o model de games
import Game from "./models/Games.js"

//importando o model de usuários
import User from "./models/Users.js";

//importando as rotas (routes) de games
import gameRoutes from "./routes/gameRoutes.js";

//importando as rotas de usuarios
import userRoutes from "./routes/userRoutes.js";

const app = express();

// configurações do express
// permite o uso de json na aplicação
app.use(express.json())

// ativando a utilização das rotas de games
app.use('/', gameRoutes)

// ativando a utilização das rotas de usuário
app.use('/', userRoutes)

//inicando a conexão com o bando de dados mongoDB
mongose.connect("mongodb://127.0.0.1:27017/api-the-games-novo")
// endereço do banco-nome do banco que vai ser criado

// rodando a API na porta 4000
const port = 4000; // variavel chamado port
app.listen(port, (error) => {
    if (error){
        console.log(error)
    } else {
        console.log(`API rodando em http://localhost:${port}`)
    }
}) //se der erro, ele imprime o erro, se der certo, ele mostra http...
// para testar: npm start