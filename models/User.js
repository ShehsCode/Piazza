const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 50
    },
    email: {
        type: String,
        require: true,
        unique: true,
        min: 10,
        max: 256
    },
    password: {
        type: String,
        require: true,
        min: 10,
        max: 512
    }
})

module.exports = mongoose.model('users', userSchema)