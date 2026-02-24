// importando o mongoose
import mongoose from "mongoose";


const gameSchema = new mongoose.Schema({
    title: String,
    platform: String,
    year: Number,
    price: Number
});

const Game = mongoose.model('Game', gameSchema)
// cria uma coleção chamada Game com base no gameSchema que foi estruturada

export default Game;