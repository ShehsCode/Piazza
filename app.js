const express = require('express')

const app = express()

const mongoose = require('mongoose')
require('dotenv/config')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const userRoute = require('./routes/users')
app.use('/user', userRoute)

const postRoute = require('./routes/posts')
app.use('/posts', postRoute)

const commentRoute = require('./routes/comments')
app.use('/comments', commentRoute)

const likeRoute = require('./routes/likes')
app.use('/likes', likeRoute)

const dislikeRoute = require('./routes/dislikes')
app.use('/dislikes', dislikeRoute)

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

