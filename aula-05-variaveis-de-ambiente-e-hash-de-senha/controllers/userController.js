// importando o service
import userService from "../services/userService.js";
// importando o jwt (criação de token)
import jwt from 'jsonwebtoken';

//importando o bcypt
import bcrypt from 'bcrypt'

// importando as variaveis de ambiente
import dotenv from "dotenv"
// configurando o dotenv
dotenv.config();

// segredo para gerar o token da API
// const JWTSecret = "thegames-secret"

// acessando a variavel armazenada no .env
const JWTSecret = process.env.JWTSECRET

// função para cadastrar um usuário
const createUser = async(req,res) => {
    try {
        // coletando os dados
        const {name, email, password} = req.body

        // gerando o HASH de senha
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // enviando para cadastrar
        await userService.Create(name, email, hash)
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

                // verificando o HASH DE SENHA
                const correct = bcrypt.compareSync(password, user.password)

                if (correct){ // verificando se o hash foi validado
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
                // senha incorreta
                } else {
                    // cod 401 - unauthorizes - não autorizado 
                    res.status(401).json({error: "Suas credenciais são inválidas. Acesso negado. Tente novamente"})
                } 
            // usuario não encontrado
            } else {
                res.status(404).json({error: "O usuário não foi encontrado"})
            }
        // email invalido ou vazio
        } else {
            res.status(404).json({error: "E-mail inválido ou não informado"})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({error: "Não foi possivel realizar o login. Erro interno de servidor"})
    }
}

export default { createUser, loginUser, JWTSecret }