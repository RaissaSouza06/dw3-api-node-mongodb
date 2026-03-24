// Model de usuário
// importando o mongoose
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = mongoose.model("User", userSchema)
//User = nome da coleção

export default User;