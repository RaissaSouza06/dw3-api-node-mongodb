// poder pegar o express do routes
import express from 'express';
import gameController from '../controllers/gameController.js';

//importando o middleware de autenticação
import Auth from '../middleware/Auth.js';

const gameRoutes = express.Router()
// na camada de routes é armazenada os endpoints, as urls da API

// endpoint para listar todos os games
gameRoutes.get("/games", Auth.Authorization, gameController.getAllGames)

// endpoint para cadastrar um game
gameRoutes.post("/games", Auth.Authorization, gameController.createGame)

// endpoint para excluir um game
gameRoutes.delete("/games/:id", Auth.Authorization, gameController.deleteGame) // id é um parametro obrigatório

// endpoint para alterar um game
gameRoutes.put("/games/:id", Auth.Authorization, gameController.updateGame) // id é um parametro obrigatório

export default gameRoutes;