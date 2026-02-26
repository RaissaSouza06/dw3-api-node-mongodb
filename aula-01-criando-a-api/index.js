import express from "express";

//importando o mongoose
import mongose from 'mongoose';

//importando o modelo
import Game from "./models/Games.js"

//importando as rotas (routes)
import gameRoutes from "./routes/gameRoutes.js";

const app = express();

// configurações do express
// permite o uso de json na aplicação
app.use(express.json())

// ativando a utilização das rotas
app.use('/', gameRoutes)

//inicando a conexão com o bando de dados mongoDB
mongose.connect("mongodb://127.0.0.1:27017/api-the-games")
// endereço do banco-nome do banco que vai ser criado


// app.get("/", (req,res) => {
//     //res.status(200).json({"message" : "API rodando com sucesso!"})
//     const games = [
//         {
//             title: "Game 1",
//             year: "2020",
//             platform: "PC",
//             price: 20
//         }, 
//         {
//             title: "Game 2",
//             year: "2024",
//             platform: "Xbox",
//             price: 30
//         }
//     ]
//     res.status(200).json(games)
// });
// cliente manda um requesicao do tipo get p rota principal da API, 
// a API retorna um json e um status code



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