// MIDDLEWARE C AUTENTICAÇÃO

import jwt from 'jsonwebtoken'
import userController from '../controllers/userController.js'

// Função para verificar a autenticação do usuário
// verificar se ele possui um token
const Authorization = (req,res,next) => {
    // capturar o token do usuário através do cabeçalho da requisição
    const authToken = req.headers ['authorization']
    // verificando se o token existe 
    if (authToken != undefined){
        // bearerToken = token do portador
        // fica ramazenado no navegador, o usuário precisa portar para se identificar
        // split - corta uma string onde tem espaço, no 0 fica o bearer, no 1 fica o token
        const bearerToken = authToken.split(' ')
        const token = bearerToken[1]
        // verificando se o token é valido
        jwt.verify(token, userController.JWTSecret, (error, data) => {
            // se o token for inválido
            if (error) {
                //cod 401 - não autorizado
                res.status(401).json({error: "Acesso não autorizado, Token inválido"})
            // se o token for válido
            } else {
                req.token = token
                req.loggedUser = {
                    id: data.id,
                    email: data.email
                }
                // PROSEGUINDO COM A REQUISIÇÃO
                next()
            }
        })
    // SE O TOKEN NÃO EXISTIR
    } else {
        res.status(401).json({error: "Acesso não autorizado, você não esta autenticado"})
    }
}

export default { Authorization }