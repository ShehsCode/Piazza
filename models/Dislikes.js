const mongoose = require('mongoose')

const DislikeSchema = new mongoose.Schema({
    dislike_post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    dislike_owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Dislike', DislikeSchema)