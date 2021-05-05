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


router.get('/my-car/edit/:carId', (req, res) => {

    const carId = req.params.carId

    models.Car.findOne({
        where: {
            id: carId
        }
    }).then((car) => {
        res.json(car)
    })
})


router.post('/my-car/edit/:carId', (req, res) => {
    
    const carId = req.params.carId
    const year = req.body.car.year
    const make = req.body.car.make
    const model = req.body.car.model

    models.Car.update({
        year: year,
        make: make,
        model: model
    }, {
        where: {
            id: carId
        }
    }).then(updatedCar => {
        console.log(updatedCar)
    })
})


router.post('/my-car/delete/:carId', (req, res) => {
    
    const carId = req.params.carId

    models.Car.destroy({
        where: {
            id: carId
        }
    }).then(deletedCar => {
        console.log(deletedCar)
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
        const photoURL = `http://localhost:8080/uploads/${file.name}`
        callback(photoURL)
    })
}

router.post('/photo-upload/:carId', (req, res) => {

    uploadFile(req, (photoURL) => {
        console.log(photoURL)
        res.send('UPLOAD')

   
    const fileName = photoURL
    const carId = req.params.carId

    let photo = models.Photo.build({
        fileName: fileName,
        carId: carId
    })

    photo.save().then((savedPhoto) => {
        console.log(savedPhoto)
    })
    })
})


router.get('/my-car/photos/:carId', (req, res) => {

    const carId = req.params.carId

    models.Photo.findAll({
        where: {
            carId: carId
        }
    }).then((photos) => {
        res.json(photos)
    })
})

module.exports = router