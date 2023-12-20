const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    comment_post: {
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: 'Post',
    },
    comment_body: {
        type: String,
        require:true,
        min:3,
        max:256
    },
    comment_owner: {
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: 'users',
    },
    comment_timestamp:{
        type:Date,
        default:Date.now(),
    }
})

module.exports = mongoose.model('comments', commentSchema)