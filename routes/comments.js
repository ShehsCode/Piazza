const verify = require('../tokens')

const {commentValidation} = require('../validation')

const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const Comment = require('../models/Comments')

router.post('/commentmade/:postId', verify, async (req, res) => {
    // Does the post exist?
    const post = await Post.findOne({_id: req.params.postId})
    if(!post){
        return res.status(400).send({message:'You are trying to comment on something that is not there!'})
    }

    // Is the comment format valid?
    const {error} = commentValidation(req.body)
    if(error){
        return res.status(400).send({message:"There's a problem with the validity of your comment!"})
    }

     // Has the post expired?
    if (post.post_status === 'Expired') {
        return res.status(400).send({ message: 'You cannot comment on an expired post! :o' });
    }

    // Here is the actual commenting.
    const comment = new Comment({
        comment_post: req.params.postId,
        comment_body: req.body.comment_body,
        comment_owner: req.user._id,
    })
    try {
        const extantComment = await comment.save()
        res.send(extantComment)
    } catch(err) {
        res.status(400).send({message:'There was an issue with making your comment!'})
    }
})
module.exports = router
