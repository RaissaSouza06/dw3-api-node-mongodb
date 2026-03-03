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
        res.status(500).json({error : 'Erro interno do servidor, não foi possivel listar os jogos'})
    }
}

// função para tratar a requisição de cadastrar um jogo
const createGame = async(req,res) =>{
    try{
        // desestruturação
        // const title
        // const platforma -> pode fazer direto
        // coletando os dados do corpo da requisição
        const {title, platform, year, price} = req.body
        await gameService.Create(title, platform, year, price)
        // await é mt usado em operações usando banco de dados
        // res.sendStatus(201) - api só retorna o status, sem json
        res.Status(201).json({message: 'O jogo foi cadastrado com sucesso'})
        // cod. 201 - CREATED  - um novo recurso foi criado no servidor 
    } catch (error) {
        console.log(error)
        res.status(500).json({error : 'Erro interno do servidor, não foi possivel cadastrar o jogos'})
    }
}



export default { getAllGames, createGame }