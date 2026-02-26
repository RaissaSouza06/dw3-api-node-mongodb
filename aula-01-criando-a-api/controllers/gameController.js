// importando o service 
import gameService from "../services/gameService.js";

// função para tratar a requisição de LISTAR os jogos
const getAllGames = async (req, res) => {
    try {
        const games = await gameService.getAll() // pede p service executar a função que busca os jogos no bd, pega ele e guarda aqui
        // model ta importado no service, e service no controller
        res.status(200).json({games : games}) // retorna código 200 (requisiçaõ feita c sucesso) e os jogos
    } catch (error) {
        console.log(error)
        res.status(500).json({error : 'Erro interno do servidor'})
    }
}

export default { getAllGames }