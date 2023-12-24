const verify = require('../tokens')

const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const Dislike = require('../models/Dislikes')

router.put('/dislike/:postId', verify, async (req, res) => {
    // Does the post exist? Dislike version.
    const post = await Post.findOne({_id: req.params.postId})
    if(!post){
        return res.status(400).send({message:'This user is trying to dislike something that is not there! :S'})
    }

    // Is the owner of the post trying to dislike their own post?
    if (post.post_owner.toString() === req.user._id.toString()) {
    return res.status(400).send({ message: 'You cannot dislike your own post! :c' });
    }
    // Has the user disliked the post already?
    const dislike = await Dislike.findOne({dislike_owner: req.user._id, dislike_post: req.params.postId})
    if(dislike){
        return res.status(400).send({message:'Hey! Stop trying to dislike a post more than once! >:('})
    }

    // Here is the actual disliking of the post.
    const newDislike = new Dislike({
        dislike_owner: req.user._id,
        dislike_post: req.params.postId
    })

    try{
        const extantDislike = await newDislike.save()
        res.send({extantDislike, message:'Good job disliking this post!'})
    }catch(err){
        res.status(400).send({message:'You could not dislike this post.'})
    }

    // Has the dislike count gone up?
    try{
        await Post.findOneAndUpdate({_id: req.params.postId}, {$inc: {dislike_count: 1}})
    }catch(err){
        res.status(400).send({message:'The dislike count has had an issue. :S'})
    }
})
module.exports = router