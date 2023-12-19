const express = require('express')

const app = express()

const mongoose = require('mongoose')
require('dotenv/config')

// app.arguments('/api/auth', authRoute)

app.get('/', (req, res) => {
    res.send('You made it to the home page, good job!')
})

app.listen(3000, () => {
    console.log("The database is running.")
})

console.log('db connector: ', process.env.CONNECTION_DB)
mongoose.connect(process.env.CONNECTION_DB)
    .then(() => {
        console.log('A connection has been established with the database.')
    })
    .catch((error) => {
        console.error('Error: ', error.message)
    });

