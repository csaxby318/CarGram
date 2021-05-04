const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const models = require('../models');
const jwt = require('jsonwebtoken');
const formidable = require('formidable')
const authenticate = require('../authMiddleWare')
const uuid = require('uuid')


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


router.post('/login', (req, res) => {

    const username = req.body.user.username
    const password = req.body.user.password

    models.User.findOne({
        where: {
            username: username
        }
    }).then((user) => {
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                    if (req.session) {
                        req.session.userId = user.id
                        req.session.username = user.username
                        req.session.name = user.name
                        console.log(req.session)
                        // generate a token 
                        // DO NOT put sensitive data into the token
                        const token = jwt.sign({ username: req.session.username, name: req.session.name, userId: req.session.userId}, 'SOMETHINGSECRET')
                        res.json({success: true, token: token, username: req.session.username, name: req.session.name, userId: req.session.userId})
                    }
                } else {
                    res.send('incorrect username/password')
                }
            })
        }).catch((error) => {
            res.send('incorrect username/password')
        })
})


function uploadFile(req, callback) {

    new formidable.IncomingForm().parse(req)
    .on('fileBegin', (name, file) => {

        uniqueFilename = `${uuid()}.${file.name.split('.').pop()}`
        file.name = uniqueFilename
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