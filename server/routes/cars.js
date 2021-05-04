const express = require('express');
const router = express.Router();
const models = require('../models');
const jwt = require('jsonwebtoken');
const authenticate = require('../authMiddleWare')


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



module.exports = router