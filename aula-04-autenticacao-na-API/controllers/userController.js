// importando o service
import userService from "../services/userService.js";
// importando o jwt (criação de token)
import jwt from 'jsonwebtoken';
// segredo para gerar o token da API
const JWTSecret = "thegames-secret"

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

// função para autenticar um usuário (função de login)
const loginUser = async(req,res) => {
    try {
        const { email, password } = req.body
        // se o e-mail existe
        if (email != undefined) { //email diferente de vazio
            // buscando o usuário no banco
            const user = await userService.getOne(email)
            // se o usuário for encontrado:
            if (user != undefined){ //verificando se o bd se retornou um usuario ou não
                // verificando se a senha esta correta 
                if (user.password == password){ //  senha do usuario que vem do banco = senha que foi enviada na requisição
                    // CRIAR O TOKEN
                    jwt.sign({id: user._id, email:  user.email}, JWTSecret, {
                    expiresIn: '48h'}, (error, token) => {
                         // falha 
                        if(error){
                            res.status(400).json({error: "Não foi possivel gerar o token da autenticação."})
                        // sucesso
                        } else {
                            res.status(200).json({message: 'Login realizado com sucesso', token : token})
                        }
                    })
                }
            }
        }
    }catch(error){
        console.log(error)
        res.status(500).json({error: "Não foi possivel realizar o login. Erro interno de servidor"})
    }
}

export default { createUser, loginUser }