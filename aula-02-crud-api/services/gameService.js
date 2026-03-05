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

    // método para excluir o jogo
    async Delete(id) {
        try {
            // excluindo o jogo pelo id
            await Game.findByIdAndDelete(id) 
            console.log(`O game com a id: ${id} foi deletado.`)
        } catch (error) {
            console.log(error)
        }
    }

    // método para alterar o jogo
    async Update(id, title, platform, year, price) {
        try {
            // alterando o jogo pela id 
            await Game.findByIdAndUpdate(id, {
                title, 
                platform,
                year, 
                price
            })
            console.log(`O jogo com a id ${id} foi alterado`)
        } catch (error) {
            console.log(error)
        }
    }
}

// exportando a classe 
export default new gameService()