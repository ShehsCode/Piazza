   const { string, number } = require('joi')
const mongoose = require('mongoose')

   const postSchema = mongoose.Schema({
       post_owner:{
           type:mongoose.Schema.Types.ObjectId, 
           ref: "User",
           require:true,
       },
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
       },
    
    // User interaction schema are here!
    interactions: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            interaction_value: {
                type: String,
                enum: ['like', 'dislike', 'comment'],
                required: true,
            },
            time_left_to_expire: {
                type: Number,  // You may adjust the type as needed
            },
        },
    ],
   })

   /* For posts to expire properly, we need the following logic.*/

   postSchema.virtual('expirationTime').get(function () {
    if (this.post_expiration && this.post_status === 'Live') {
        const expirationTimestamp = new Date(this.post_timestamp);
        expirationTimestamp.setMinutes(expirationTimestamp.getMinutes() + this.post_expiration);
        return expirationTimestamp;
    }
    return null;
   });

   /* The following will update post status accordingly depending on expiration time */

   postSchema.pre('save', function (next) {
    if (this.post_expiration && this.post_status === 'Live') {
        const now = new Date();
        const expirationTime = this.expirationTime;
        if (expirationTime && now >= expirationTime) {
            this.post_status = 'Expired';
        }
    }
    next();
   });
   
   module.exports = mongoose.model('posts', postSchema)