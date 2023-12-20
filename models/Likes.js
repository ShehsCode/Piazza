const mongoose = require('mongoose')

const LikeSchema = new mongoose.Schema({
    like_post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    like_owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Like', LikeSchema)