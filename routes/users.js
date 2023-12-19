const express = require('express')
const router = express.Router()

const User = require('../models/User')
const {registerValidation, loginValidation} = require('../validation')

const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

// Registration
router.post('/registration', async (req, res) => {
    // Is the user input valid?
    const {error} = registerValidation(req.body)
    if(error){
        return res.status(400).send({message:'This input is invalid! >:('})
    }

    // Is this an extant user?
    const userExtant = await User.findOne({email: req.body.email})
    if(userExtant){
        return res.status(400).send({message:'This user already exists! >:('})
    }

    // Using bcryptjs to add additional layers of complexity and hashing for the password.
    const salt = await bcryptjs.genSalt(5)
    const saltedPassword = await bcryptjs.hash(req.body.password, salt)

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: saltedPassword
    })
    try {
        const newUser = await user.save()
        res.send(newUser)
    } catch(err) {
        res.status(400).send({message:err})
    }
})

// Login 
router.post('/login', async (req, res) => {
    // Is the user login valid?
    const {error} = loginValidation(req.body)
    if(error){
        return res.status(400).send({message:'This login information is not valid! >:('})
    }

    // Do the login details belong to an existing account?
    const userExtant = await User.findOne({email: req.body.email})
    if(!userExtant){
        return res.status(400).send({message:'This username does not exist! >:('})
    }

    // Is the password correct?
    const passwordValid = await bcryptjs.compare(req.body.password, user.password)
    if(!passwordValid){
        return res.status(400).send({message:'This password is incorrect! >:('})
    }
    
    // Upon successful login, generate token.
    const token = jsonwebtoken.sign({_id: user._id}, process.env.SUPERSECRET_TOKEN)
    res.header('auth-token', token).send({'auth-token': token, 'message':'You are now logged in! :)'})
})

module.exports = router