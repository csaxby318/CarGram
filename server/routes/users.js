const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const models = require('../models');
const jwt = require('jsonwebtoken');
const formidable = require('formidable')
const authenticate = require('../authMiddleWare')


router.post('/register', (req, res) => {
    const name = req.body.user.name
    const username = req.body.user.username
    const password = req.body.user.password
    console.log(name, username, password)

    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(password, salt, (error, hash) => {
            if (!error) {
                let user = models.User.build({
                    name: name,
                    username: username,
                    password: hash
                })

                user.save().then((savedUser) => {
                    console.log(savedUser)
                    res.send('Registered')
                })
            }
        })
    })
})


router.post('/login', (req,res) => {

    const username = req.body.user.username
    const password = req.body.user.password

    models.User.findOne({
        where: {
            username: username
        }
    }).then((user) => {
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                    console.log(user.username)
                    // generate a token 
                    // DO NOT put sensitive data into the token
                    const token = jwt.sign({ username: username }, 'SOMETHINGSECRET')
                    res.json({success: true, token: token, username: username})
                } else {
                    res.render('login')
                }
            })
        }).catch((error) => {
            res.render('login')
        })
})


function uploadFile(req, callback) {

    new formidable.IncomingForm().parse(req)
    .on('fileBegin', (name, file) => {
        file.path = __basedir + '/uploads/' + file.name
    })
    .on('file', (name, file) => {
        callback(file.name)
    })
}

router.post('/upload', (req, res) => {

    uploadFile(req, (photoURL) => {
        res.send('UPLOAD')
    })
})

module.exports = router