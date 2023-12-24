const verify = require('../tokens')

const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const Like = require('../models/Likes')

router.put('/like/:postId', verify, async (req, res) => {
    // Does the post exist?
    const post = await Post.findOne({_id: req.params.postId})
    if(!post){
        return res.status(400).send({message:'This user is trying to like something that is not there! :S'})
    }

    // Is the user trying to like their own post?
    if (post.post_owner.toString() === req.user._id.toString()) {
    return res.status(400).send({ message: 'You cannot like your own post! :c' });
    }

    // Has the user liked the post already?
    const like = await Like.findOne({like_owner: req.user._id, like_post: req.params.postId})
    if(like){
        return res.status(400).send({message:'Hey! Stop trying to like a post more than once! >:('})
    }

    // Has the post expired?
    if (post.post_status === 'Expired') {
    return res.status(400).send({ message: 'You cannot comment on an expired post! :o' });
    }

    // Here is the actual liking of the post.
    const newLike = new Like({
        like_owner: req.user._id,
        like_post: req.params.postId
    })

    try{
        const extantLike = await newLike.save()
        res.send({extantLike, message:'Good job liking this post!'})
    }catch(err){
        res.status(400).send({message:'You could not like this post.'})
    }

    // Has the like count gone up?
    try{
        await Post.findOneAndUpdate({_id: req.params.postId}, {$inc: {like_count: 1}})
    }catch(err){
        res.status(400).send({message:'The like count has had an issue. :S'})
    }
})

module.exports = router