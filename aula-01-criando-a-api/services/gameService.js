// importando o model
import Game from "../models/Games.js"

class gameService {
    // método (serviço) para buscar todos os registros no banco
    // funções assincronas são não  bloqueantes 
    async getAll() { 
        // try trata o sucesso 
        try {
            // .find() -> é um método do mongoose para buscar registros no banco
            const games = await Game.find() // await usado p esperar os jogos retornarem do banco 
            return games 
        // catch trata a falha
        } catch (error) {
            console.log(error)
        }
    }
}

// exportando a classe 
export default new gameService()