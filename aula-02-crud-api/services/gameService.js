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

    //Método para cadastrar um game 
    async Create(title, platform, year, price) {
        try{
            const newGame = new Game({ // instancia do model game
            // desestruturação: o que eu enviar aqui vai cadastrar no campo de model
            title,
            platform,
            year,
            price
            })
            // gravando no banco
            await newGame.save() 
            // .save() = método do mongose para cadastrar no banco
        } catch (error){
            console.log(error)
        }
    }
}

// exportando a classe 
export default new gameService()