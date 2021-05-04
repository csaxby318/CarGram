const express = require('express');
const router = express.Router();
const models = require('../models');
const jwt = require('jsonwebtoken');
const authenticate = require('../authMiddleWare')
const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');


router.post('/add-car', (req, res) => {

    const userId = req.body.car.userId
    const year = req.body.car.year
    const make = req.body.car.make
    const model = req.body.car.model

    let car = models.Car.build({
        year: year,
        make: make,
        model: model,
        userId: userId
    })

    car.save().then((savedCar) => {
        console.log(savedCar)
    })
})


router.get('/my-car/:userId', authenticate, (req, res) => {

    const userId = req.params.userId
    console.log(userId)

    models.Car.findAll({
        where: {
            userId: userId
        }
    }).then((cars) => {
        res.json(cars)
    })

})



function uploadFile(req, callback) {
    
    new formidable.IncomingForm().parse(req)
    .on('fileBegin', (name, file) => {

        uniqueFilename = `${uuidv4()}.${file.name.split('.').pop()}`
        file.name = uniqueFilename
        file.path = __basedir + '/uploads/' + file.name
    })
    .on('file', (name, file) => {

        callback(file.name)
    })
}

router.post('/photo-upload', (req, res) => {

    uploadFile(req, (photoURL) => {

        res.send('UPLOAD')
    })
})


module.exports = router