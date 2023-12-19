const express = require('express')
const router = express.Router()

const User = require('../models/User')
const {registerValidation, loginValidation} = require('../validation')

const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

/* router.get('/users', (req,res)=>{
    res.send('This is the users area.')
})

router.get('/sheh', (req,res)=>{
    res.send("You have made it to Sheh's page.")
}) */

module.exports = router