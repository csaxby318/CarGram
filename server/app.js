const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const session = require('express-session')
const userRouter = require('./routes/users')
const carRouter = require('./routes/cars')

global.__basedir = __dirname

app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'somesecret',
    resave: false,
    saveUninitialized: true
}))
app.use('/user', userRouter)
app.use('/cars', carRouter)

// static folder
app.use('/uploads', express.static('uploads'));


app.listen(8080, () => {
    console.log('Server listening on port 8080...')
})