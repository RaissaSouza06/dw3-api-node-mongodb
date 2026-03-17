// importando o service
import userService from "../services/userService.js";

// função para cadastrar um usuário
const createUser = async(req,res) => {
    try {
        // coletando os dados
        const {name, email, password} = req.body
        // enviando para cadastrar
        await userService.Create(name, email, password)
        // retornando uma resposta
        res.status(201).json({ message: "Usuário cadastrado com sucesso"})
        // cod 201 = created
    } catch(error){
        console.log(error)
        res.status(500).json({error: "Não foi possivel cadastrar o usuário. Erro interno do servidor."})
    }
}

export default { createUser }