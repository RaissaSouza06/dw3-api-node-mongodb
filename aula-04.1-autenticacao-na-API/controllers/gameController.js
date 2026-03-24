// importando o service 
import gameService from "../services/gameService.js";

// importando o ObjecteId
import { ObjectId } from "mongodb";

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
        const {title, year, price, descriptions} = req.body
        await gameService.Create(title, year, price, descriptions)
        // await é mt usado em operações usando banco de dados
        // res.sendStatus(201) - api só retorna o status, sem json
        res.status(201).json({message: 'O jogo foi cadastrado com sucesso'})
        // cod. 201 - CREATED  - um novo recurso foi criado no servidor 
    } catch (error) {
        console.log(error)
        res.status(500).json({error : 'Erro interno do servidor, não foi possivel cadastrar o jogos'})
    }
}

// função para deletar um jogo
const deleteGame = async (req,res) => {
    try {
        // fazendo a validação do mongodb (abrir cmd e dar "npm install mongodb")
        const id = req.params.id // id esta vindo da url 
        if (ObjectId.isValid(id)) {// validação do id
            await gameService.Delete(id)
            res.status(204).json({message: 'O jogo foi excluido com sucesso'})
            // cod. 204 = no content
        } else {
            res.status(400).json({error: 'Ocorreu um erro na válidação da ID.'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error : 'Erro interno do servidor'})
    }
}

// função para alterar um jogo
const updateGame = async (req,res) => {
    try {
        const id = req.params.id
        if (ObjectId.isValid(id)) {
            const {title, year, price, descriptions} = req.body
            await gameService.Update(id, title, year, price, descriptions)
            res.status(200).json({message: 'Jogo atualizado com sucesso'})
        } else {
            res.status(400).json({error: 'Ocorreu um erro na válidação da ID.'})    
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Erro interno do servidor.'})
    }
}


export default { getAllGames, createGame, deleteGame, updateGame}