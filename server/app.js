const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const userRouter = require('./routes/users')

global.__basedir = __dirname

app.use(cors());
app.use(express.json());
app.use('/user', userRouter)

// static folder
app.use('/uploads', express.static('uploads'));



app.listen(8080, () => {
    console.log('Server listening on port 8080...')
})