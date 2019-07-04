const mongoose  = require('mongoose')

const UserSchema = new mongoose.Schema({
    
    firstname: String ,
    lastname: String,
    image: String ,
    username: String,
    password: String,
    role:{type: String, default: "user"}
})

const User = mongoose.model('users', UserSchema)

module.exports = User           