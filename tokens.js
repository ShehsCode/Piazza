   const jsonwebtoken = require('jsonwebtoken')

   function verifyToken(req, res, next){
       const token = req.header('auth-token')
       if(!token) return res.status(401).send({message:'You are not supposed to be in here! >:O'})
   
       try{
           const authorised = jsonwebtoken.verify(token, process.env.SUPERSECRET_TOKEN)
           req.user = authorised
           next()
       } catch(err){
           res.status(401).send({message:'Your token is invalid! >:('})
       }
   }
   
   module.exports = verifyToken