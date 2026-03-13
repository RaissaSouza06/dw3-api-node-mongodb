// poder pegar o express do routes
import express from 'express';
import gameController from '../controllers/gameController.js';

const gameRoutes = express.Router()
// na camada de routes é armazenada os endpoints, as urls da API

// endpoint para listar todos os games
gameRoutes.get("/games", gameController.getAllGames)

// endpoint para cadastrar um game
gameRoutes.post("/games", gameController.createGame)

// endpoint para excluir um game
gameRoutes.delete("/games/:id", gameController.deleteGame) // id é um parametro obrigatório

// endpoint para alterar um game
gameRoutes.put("/games/:id", gameController.updateGame) // id é um parametro obrigatório

export default gameRoutes;