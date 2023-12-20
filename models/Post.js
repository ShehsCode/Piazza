   const { string, number } = require('joi')
const mongoose = require('mongoose')

   const postSchema = mongoose.Schema({
       post_title:{
           type:String,
           require:true,
           min:3,
           max:64,
       },
       post_category:{
           type:[String],
           enum:['Politics', 'Health', 'Sport', 'Tech'],
           required: true,
       },
       post_status:{
           type:String,
           enum:['Live', 'Expired'],
           default:'Live'
       },
       post_timestamp:{
           type:Date,
           default:Date.now(),
       },
       post_expiration:{
           type:Number,
           min:5,
           max:60,
       },
       post_owner:{
        user_id:{
           type:mongoose.Schema.Types.ObjectId, 
           ref: "User",
           require:true,
        },
        post_owner_name:{
           type:String,
           required:true,
        },
       },
       post_body:{
           type:String,
           require:true,
           min:3,
           max:256,
       },
       like_count:{
           type:Number,
           default:0,
       },
       dislike_count:{
        type:Number,
        default:0,
       },
       comment_count:{
           type:Number,
           default:0,
       }
   })
   
   module.exports = mongoose.model('posts', postSchema)