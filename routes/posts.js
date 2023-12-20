const express = require('express')
const verify = require('../tokens')
const router = express.Router()
const Post = require('../models/Post')
const {postValidation} = require('../validation')

router.post('/posts', verify, async (req, res) => {
    // Is the post valid?
    const {error} = postValidation(req.body)
    if(error){
        return res.status(400).send({message:error['Your post is not valid!']})
    }

    // This bit creates a new post.
    const post = new Post({
        post_title: req.body.post_title,
        post_category: req.body.post_category,
        post_body: req.body.post_body,
        post_owner: req.user._id
    })
    try {
        const savedPost = await post.save()
        res.send(savedPost)
    } catch(err) {
        res.status(400).send({message:err})
    }
})

module.exports = router