import User from "../models/Users.js";

class userService {
    // método para cadastrar usuario
    async Create(name, email, password) {
        try {
            const newUser = new User ({
                name,
                email,
                password
            })
            await newUser.save()
            // save() - usado p gravar um registro no bd
        } catch(error){
            console.log(error)
        }
    }

    //método para buscar um usuário
    async getOne(email){
        try {
            // método findOne busca um registro no banco de dados
            const user = await User.findOne({email:email})
            return user
        } catch(error){
            console.log(error)
        }
    }
}

// exportando a classe
export default new userService();