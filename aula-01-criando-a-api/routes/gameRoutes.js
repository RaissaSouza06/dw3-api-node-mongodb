// poder pegar o express do routes
import express from 'express';
import gameController from '../controllers/gameController.js';

const gameRoutes = express.Router()
// na camada de routes é armazenada os endpoints, as urls da API

// endpoint para listar todos os games
gameRoutes.get("/games", gameController.getAllGames)

export default gameRoutes;