const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const models = require('../models');
const jwt = require('jsonwebtoken');



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


router.get('/', (req, res) => {

    models.User.findAll({ 
        include: [{
            model: models.Car, 
            as: 'cars',
            include: [{
               model: models.Photo,
               as: 'photos'
            }]
        }] 
    })
    .then((users) => {
        res.send(users)
    })
    

})

module.exports = router