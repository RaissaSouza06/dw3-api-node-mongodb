//importando o express
import express from 'express';
// carregar o express.Router()
const userRoutes = express.Router();

// importando o controller
import userController from "../controllers/userController.js";

// endpoint para cadastrar usuario
userRoutes.post("/users", userController.createUser)

export default userRoutes;